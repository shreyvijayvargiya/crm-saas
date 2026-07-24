/**
 * Indie Stripe Billing OS — nav for Stripe SaaS indie hackers.
 */

export const navCategories = [
	{
		id: "main",
		label: "Revenue",
		items: [
			{ id: 1, label: "Revenue", route: "/demo", icon: "DollarSign" },
			{
				id: 15,
				label: "Failed charges",
				route: "/failed-payments",
				icon: "AlertTriangle",
				keywords: ["dunning", "past due", "retry", "stripe"],
			},
		],
	},
	{
		id: "customers",
		label: "Customers",
		items: [
			{ id: 4, label: "Customers", route: "/contacts", icon: "Users" },
		],
	},
	{
		id: "billing",
		label: "Billing",
		items: [
			{ id: 11, label: "Charges", route: "/payments", icon: "CreditCard" },
			{
				id: 41,
				label: "Subscriptions",
				route: "/subscriptions",
				icon: "Repeat",
				keywords: ["mrr", "recurring", "stripe"],
				children: [
					{
						id: 410,
						label: "Overview",
						route: "/subscriptions",
						icon: "Repeat",
						keywords: ["mrr", "churn", "renewals"],
					},
					{
						id: 411,
						label: "Plans",
						route: "/subscriptions/plans",
						icon: "Layers",
						keywords: ["price", "product", "stripe", "mrr"],
					},
				],
			},
		],
	},
	{
		id: "content",
		label: "Launch & reach",
		items: [
			{
				id: 13,
				label: "Content",
				route: "/cms",
				icon: "Megaphone",
				children: [
					{
						id: 131,
						label: "Launch notes",
						route: "/cms",
						icon: "BookOpen",
					},
					{
						id: 132,
						label: "Subscriber emails",
						route: "/cms?section=newsletters",
						icon: "Send",
					},
					{
						id: 133,
						label: "Inbox",
						route: "/email",
						icon: "Mail",
					},
				],
			},
		],
	},
	{
		id: "system",
		label: "Setup",
		items: [
			{
				id: 14,
				label: "Connect Stripe",
				route: "/settings",
				icon: "Cable",
				keywords: ["stripe", "api", "keys"],
			},
			{ id: 20, label: "Notifications", route: "/notifications", icon: "Bell" },
			{ id: 33, label: "Help", route: "/help", icon: "CircleHelp" },
		],
	},
];

export const searchRouteExtras = [];

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
				keywords: [...(child.keywords || []), item.label, "cms", "stripe"],
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
