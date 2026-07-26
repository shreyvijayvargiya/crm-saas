/**
 * Firestore APIs for SaaS projects.
 *
 * Path:
 *   users/{userId}/projects/{crmType}           — project metadata
 *   users/{userId}/projects/{crmType}/{entity}/{docId} — CRM entity rows
 *
 * crmType is one of FREE_CRM_IDS (6 verticals).
 */

import {
	collection,
	doc,
	getDoc,
	getDocs,
	setDoc,
	updateDoc,
	deleteDoc,
	serverTimestamp,
	query,
	orderBy,
	Timestamp,
} from "firebase/firestore";
import {
	getFirebaseClientDb,
	getFirebaseClientInitError,
} from "./firebaseClient";
import { FREE_CRM_IDS } from "./freeCrmTemplates";
import { getVerticalAstById } from "../asts/crm-verticals";

export const SaaS_CRM_TYPES = FREE_CRM_IDS;

function requireDb() {
	const db = getFirebaseClientDb();
	if (!db) {
		throw new Error(
			getFirebaseClientInitError() ||
				"Firebase is not configured. Add FIREBASE_* to .env.local and restart."
		);
	}
	return db;
}

function assertCrmType(crmType) {
	if (!SaaS_CRM_TYPES.includes(crmType)) {
		throw new Error(
			`Invalid CRM type "${crmType}". Allowed: ${SaaS_CRM_TYPES.join(", ")}`
		);
	}
}

function serializeDoc(snap) {
	if (!snap.exists()) return null;
	const data = snap.data() || {};
	const out = { id: snap.id, ...data };
	Object.keys(out).forEach((key) => {
		const val = out[key];
		if (val instanceof Timestamp) {
			out[key] = val.toDate().toISOString();
		}
	});
	return out;
}

/** Ensure users/{uid} profile doc exists (idempotent). */
export async function upsertUserProfile(user) {
	if (!user?.uid) throw new Error("User required");
	const db = requireDb();
	const ref = doc(db, "users", user.uid);
	const existing = await getDoc(ref);
	const base = {
		email: user.email || null,
		displayName: user.displayName || null,
		photoURL: user.photoURL || null,
		updatedAt: serverTimestamp(),
	};
	if (!existing.exists()) {
		await setDoc(ref, { ...base, createdAt: serverTimestamp() });
	} else {
		await setDoc(ref, base, { merge: true });
	}
	return { id: user.uid, ...base };
}

/** List all CRM projects for a user. */
export async function listUserProjects(userId) {
	if (!userId) return [];
	const db = requireDb();
	const col = collection(db, "users", userId, "projects");
	let snap;
	try {
		snap = await getDocs(query(col, orderBy("createdAt", "desc")));
	} catch {
		snap = await getDocs(col);
	}
	return snap.docs.map(serializeDoc).filter(Boolean);
}

/** Get one project by crmType. */
export async function getUserProject(userId, crmType) {
	assertCrmType(crmType);
	const db = requireDb();
	const snap = await getDoc(doc(db, "users", userId, "projects", crmType));
	return serializeDoc(snap);
}

/**
 * Create a project for a CRM template type.
 * Document id = crmType (one workspace per type per user).
 */
export async function createUserProject(userId, crmType, { name } = {}) {
	if (!userId) throw new Error("userId required");
	assertCrmType(crmType);
	const db = requireDb();
	const existing = await getUserProject(userId, crmType);
	if (existing) {
		throw new Error(
			`You already have a ${existing.name || crmType} project. Open it from your dashboard.`
		);
	}
	const ast = getVerticalAstById(crmType);
	const payload = {
		crmType,
		name: name || ast.meta?.name || crmType,
		tagline: ast.meta?.tagline || "",
		accent: ast.meta?.accent || "zinc",
		icon: ast.meta?.icon || "LayoutDashboard",
		homeRoute: ast.homeRoute || "/dashboard",
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	};
	await setDoc(doc(db, "users", userId, "projects", crmType), payload);
	return getUserProject(userId, crmType);
}

export async function deleteUserProject(userId, crmType) {
	assertCrmType(crmType);
	const db = requireDb();
	await deleteDoc(doc(db, "users", userId, "projects", crmType));
	return { deleted: true, crmType };
}

export async function touchUserProject(userId, crmType) {
	assertCrmType(crmType);
	const db = requireDb();
	await updateDoc(doc(db, "users", userId, "projects", crmType), {
		updatedAt: serverTimestamp(),
		lastOpenedAt: serverTimestamp(),
	});
}

/** Nested entity collection under a project. */
function entityCol(db, userId, crmType, entity) {
	assertCrmType(crmType);
	if (!entity || typeof entity !== "string") {
		throw new Error("entity name required");
	}
	return collection(db, "users", userId, "projects", crmType, entity);
}

export async function listProjectEntities(userId, crmType, entity) {
	const db = requireDb();
	const snap = await getDocs(entityCol(db, userId, crmType, entity));
	return snap.docs.map(serializeDoc).filter(Boolean);
}

export async function getProjectEntity(userId, crmType, entity, entityId) {
	const db = requireDb();
	const snap = await getDoc(
		doc(db, "users", userId, "projects", crmType, entity, entityId)
	);
	return serializeDoc(snap);
}

export async function createProjectEntity(
	userId,
	crmType,
	entity,
	data,
	{ id } = {}
) {
	const db = requireDb();
	const col = entityCol(db, userId, crmType, entity);
	const ref = id ? doc(col, id) : doc(col);
	const payload = {
		...data,
		createdAt: serverTimestamp(),
		updatedAt: serverTimestamp(),
	};
	await setDoc(ref, payload);
	return getProjectEntity(userId, crmType, entity, ref.id);
}

export async function updateProjectEntity(
	userId,
	crmType,
	entity,
	entityId,
	data
) {
	const db = requireDb();
	const ref = doc(db, "users", userId, "projects", crmType, entity, entityId);
	await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
	return getProjectEntity(userId, crmType, entity, entityId);
}

export async function deleteProjectEntity(userId, crmType, entity, entityId) {
	const db = requireDb();
	await deleteDoc(
		doc(db, "users", userId, "projects", crmType, entity, entityId)
	);
	return { deleted: true, id: entityId };
}

/** Entity keys declared on the vertical AST (for seeding / UI). */
export function listAstEntityKeys(crmType) {
	assertCrmType(crmType);
	const ast = getVerticalAstById(crmType);
	return Object.keys(ast.entities || {});
}
