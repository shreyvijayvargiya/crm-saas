/**
 * Nav helpers. Sidebar categories come from the active CRM vertical AST
 * (`asts/crm-verticals`). This file keeps CMD+K extras + search utilities.
 */

import { getVerticalAstById, DEFAULT_VERTICAL_ID } from "../asts/crm-verticals";

/** @deprecated Prefer useCrmVertical().navCategories — kept for static imports */
export const navCategories = getVerticalAstById(DEFAULT_VERTICAL_ID).sidebar;

/** Nested routes surfaced in CMD+K search (not top-level sidebar items). */
export const searchRouteExtras = [
	{
		id: 401,
		label: "Marketing Segments",
		route: "/marketing/segments",
		icon: "Filter",
		section: "sales",
		keywords: ["audience", "filters", "marketing"],
	},
	{
		id: 402,
		label: "Marketing Forms",
		route: "/marketing/forms",
		icon: "FileInput",
		section: "sales",
		keywords: ["embed", "lead capture", "marketing"],
	},
	{
		id: 411,
		label: "Subscription Plans",
		route: "/subscriptions/plans",
		icon: "Layers",
		section: "finance",
		keywords: ["billing", "mrr", "plans", "recurring"],
	},
	{
		id: 431,
		label: "Scheduler apps",
		route: "/scheduler/apps",
		icon: "Plug2",
		section: "operations",
		keywords: ["connect", "social", "oauth", "platforms", "scheduler"],
	},
	{
		id: 242,
		label: "E-commerce Orders",
		route: "/e-commerce/orders",
		icon: "Package",
		section: "sales",
		keywords: ["store", "orders", "e-commerce"],
	},
	{
		id: 900,
		label: "Choose CRM vertical",
		route: "/demo",
		icon: "LayoutGrid",
		section: "main",
		keywords: ["preset", "vertical", "ast", "stripe", "agency"],
	},
];

export function getNavSections(categories) {
	return (categories || []).map(({ id, label }) => ({ key: id, label }));
}

export const navSections = getNavSections(navCategories);

export function getSearchNavItems(categories = navCategories) {
	const fromSidebar = (categories || []).flatMap((category) =>
		(category.items || []).flatMap((item) => {
			const parent = { ...item, section: category.id };
			const kids = (item.children || []).map((child) => ({
				...child,
				section: category.id,
				keywords: [...(child.keywords || []), item.label],
			}));
			return [parent, ...kids];
		})
	);
	return [...fromSidebar, ...searchRouteExtras];
}

export function filterSearchNavItems(items, query) {
	const q = query.trim().toLowerCase();
	if (!q) return items;
	return items.filter(
		(item) =>
			item.label.toLowerCase().includes(q) ||
			item.route.toLowerCase().includes(q) ||
			(item.keywords || []).some((keyword) => keyword.toLowerCase().includes(q))
	);
}

export function groupSearchNavItems(items, categories = navCategories) {
	return getNavSections(categories)
		.map((section) => ({
			...section,
			items: items.filter((item) => item.section === section.key),
		}))
		.filter((section) => section.items.length > 0);
}
