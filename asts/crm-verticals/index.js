/**
 * Registry of CRM vertical ASTs.
 * AI agents: add a new `*.json` here and append it to `verticalAstModules`.
 */

import clinic from "./clinic.json";
import fullKit from "./full-kit.json";
import indieStripe from "./indie-stripe.json";
import agency from "./agency.json";
import freelancer from "./freelancer.json";
import contentCreator from "./content-creator.json";
import digitalStore from "./digital-store.json";
import ecommerceCms from "./ecommerce-cms.json";
import { CRM_VERTICAL_AST_KIND, CRM_VERTICAL_AST_VERSION } from "./schema";

/** Ordered list — drives /demo chooser cards. */
export const verticalAstModules = [
	clinic,
	indieStripe,
	agency,
	freelancer,
	contentCreator,
	digitalStore,
	ecommerceCms,
	fullKit,
];

export const DEFAULT_VERTICAL_ID = "full-kit";

export function listVerticalAsts() {
	return verticalAstModules.map(normalizeVerticalAst);
}

export function getVerticalAstById(id) {
	if (!id) return normalizeVerticalAst(fullKit);
	const found = verticalAstModules.find((ast) => ast.id === id);
	if (!found) {
		if (typeof console !== "undefined" && id !== DEFAULT_VERTICAL_ID) {
			console.warn(`[crm-vertical] Unknown vertical id "${id}", falling back to ${DEFAULT_VERTICAL_ID}`);
		}
		return normalizeVerticalAst(fullKit);
	}
	return normalizeVerticalAst(found);
}

export function normalizeVerticalAst(raw) {
	const ast = raw && typeof raw === "object" ? raw : fullKit;
	return {
		...ast,
		version: ast.version || CRM_VERTICAL_AST_VERSION,
		kind: ast.kind || CRM_VERTICAL_AST_KIND,
		id: ast.id || DEFAULT_VERTICAL_ID,
		meta: {
			name: ast.meta?.name || "CRM",
			tagline: ast.meta?.tagline || "",
			description: ast.meta?.description || "",
			icon: ast.meta?.icon || "LayoutDashboard",
			accent: ast.meta?.accent || "zinc",
			badge: ast.meta?.badge || null,
			audience: ast.meta?.audience || [],
			...ast.meta,
		},
		homeRoute: ast.homeRoute || "/dashboard",
		chooserRoute: ast.chooserRoute || "/demo",
		sidebar: Array.isArray(ast.sidebar) ? ast.sidebar : [],
		pages: Array.isArray(ast.pages) ? ast.pages : [],
		entities: ast.entities || {},
		notes: ast.notes || [],
	};
}

/**
 * Validate a candidate AST (for future AI-generated files).
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function validateVerticalAst(ast) {
	const errors = [];
	if (!ast || typeof ast !== "object") {
		return { ok: false, errors: ["AST must be an object"] };
	}
	if (ast.kind && ast.kind !== CRM_VERTICAL_AST_KIND) {
		errors.push(`kind must be "${CRM_VERTICAL_AST_KIND}"`);
	}
	if (!ast.id || typeof ast.id !== "string") errors.push("id is required");
	if (!ast.meta?.name) errors.push("meta.name is required");
	if (!ast.homeRoute) errors.push("homeRoute is required");
	if (!Array.isArray(ast.sidebar) || ast.sidebar.length === 0) {
		errors.push("sidebar must be a non-empty array");
	}
	return { ok: errors.length === 0, errors };
}
