/**
 * Firebase web SDK (client config) for Next.js API routes → Firestore.
 * Uses the same Project settings → Your apps → Web app config (apiKey, appId, …).
 *
 * Env (from Firebase Console):
 *   FIREBASE_API_KEY
 *   FIREBASE_AUTH_DOMAIN
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_STORAGE_BUCKET
 *   FIREBASE_MESSAGING_SENDER_ID
 *   FIREBASE_APP_ID
 *
 * Firestore rules must allow creates on `free_crm_downloads` (or authenticated writes).
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

let lastError = null;

function getFirebaseConfig() {
	const apiKey = (process.env.FIREBASE_API_KEY || "").trim();
	const authDomain = (process.env.FIREBASE_AUTH_DOMAIN || "").trim();
	const projectId = (process.env.FIREBASE_PROJECT_ID || "").trim();
	const storageBucket = (process.env.FIREBASE_STORAGE_BUCKET || "").trim();
	const messagingSenderId = (process.env.FIREBASE_MESSAGING_SENDER_ID || "").trim();
	const appId = (process.env.FIREBASE_APP_ID || "").trim();

	if (!apiKey || !projectId || !appId) {
		return null;
	}

	if (apiKey.includes("BEGIN PRIVATE KEY") || projectId.includes(":web:")) {
		lastError =
			"Wrong Firebase env values — use the Web app config (apiKey AIza…, appId 1:…:web:…, projectId like my-app), not a service account.";
		return null;
	}

	return {
		apiKey,
		authDomain: authDomain || `${projectId}.firebaseapp.com`,
		projectId,
		storageBucket: storageBucket || `${projectId}.appspot.com`,
		messagingSenderId,
		appId,
	};
}

export function getFirebaseApp() {
	const config = getFirebaseConfig();
	if (!config) {
		if (!lastError) {
			lastError =
				"Missing FIREBASE_API_KEY / FIREBASE_PROJECT_ID / FIREBASE_APP_ID in .env";
		}
		console.warn(`[firebase] ${lastError}`);
		return null;
	}

	try {
		if (getApps().length) return getApp();
		const app = initializeApp(config);
		lastError = null;
		console.info(`[firebase] Web app ready · ${config.projectId}`);
		return app;
	} catch (err) {
		lastError = err?.message || String(err);
		console.error("[firebase] init failed", lastError);
		return null;
	}
}

export function getFirebaseInitError() {
	return lastError;
}

/**
 * Store a free CRM download lead in Firestore.
 * Collection: free_crm_downloads
 */
export async function saveFreeCrmDownloadLead({
	email,
	templateId,
	templateName,
	userAgent,
}) {
	const app = getFirebaseApp();
	if (!app) {
		return {
			saved: false,
			reason: "firebase_not_configured",
			detail: lastError,
		};
	}

	const db = getFirestore(app);
	const ref = await addDoc(collection(db, "free_crm_downloads"), {
		email: String(email).trim().toLowerCase(),
		templateId,
		templateName: templateName || templateId,
		source: "saascrm-free-templates",
		userAgent: userAgent || null,
		createdAt: serverTimestamp(),
	});

	return { saved: true, id: ref.id };
}
