/**
 * Single source of truth for sidebar navigation and CMD+K search.
 * Indie Stripe-ready CRM — slim nav for contacts, billing, and CMS.
 */

export const navCategories = [
	{
		id: "main",
		label: "Main",
		items: [
			{ id: 1, label: "Dashboard", route: "/demo", icon: "Home" },
		],
	},
	{
		id: "crm",
		label: "Customers",
		items: [
			{ id: 4, label: "Contacts", route: "/contacts", icon: "Contact" },
		],
	},
	{
		id: "billing",
		label: "Billing",
		items: [
			{ id: 11, label: "Payments", route: "/payments", icon: "CreditCard" },
			{ id: 41, label: "Subscriptions", route: "/subscriptions", icon: "Repeat" },
		],
	},
	{
		id: "content",
		label: "Content",
		items: [
			{
				id: 13,
				label: "CMS",
				route: "/cms",
				icon: "FileText",
				children: [
					{
						id: 131,
						label: "Blogs",
						route: "/cms",
						icon: "BookOpen",
					},
					{
						id: 132,
						label: "Newsletters",
						route: "/cms?section=newsletters",
						icon: "Send",
					},
					{
						id: 133,
						label: "Emails",
						route: "/email",
						icon: "Mail",
					},
				],
			},
		],
	},
	{
		id: "system",
		label: "System",
		items: [
			{ id: 14, label: "Settings", route: "/settings", icon: "Settings" },
			{ id: 20, label: "Notifications", route: "/notifications", icon: "Bell" },
			{ id: 33, label: "Help", route: "/help", icon: "CircleHelp" },
		],
	},
];

/** Nested routes surfaced in CMD+K search (not top-level sidebar items). */
export const searchRouteExtras = [
	{
		id: 411,
		label: "Subscription Plans",
		route: "/subscriptions/plans",
		icon: "Layers",
		section: "billing",
		keywords: ["billing", "mrr", "plans", "recurring", "stripe"],
	},
	{
		id: 412,
		label: "Connect Stripe",
		route: "/settings",
		icon: "Cable",
		section: "system",
		keywords: ["stripe", "payments", "connect", "billing"],
	},
];

export const navSections = navCategories.map(({ id, label }) => ({ key: id, label }));

export function getSearchNavItems() {
	const fromSidebar = navCategories.flatMap((category) =>
		category.items.flatMap((item) => {
			const parent = {
				...item,
				section: category.id,
			};
			const kids = (item.children || []).map((child) => ({
				...child,
				section: category.id,
				keywords: [...(child.keywords || []), item.label, "cms"],
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

export function groupSearchNavItems(items) {
	return navSections
		.map((section) => ({
			...section,
			items: items.filter((item) => item.section === section.key),
		}))
		.filter((section) => section.items.length > 0);
}
