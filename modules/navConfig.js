/**
 * Single source of truth for sidebar navigation and CMD+K search.
 * Add new routes here — both Sidebar and Navbar search read from this file.
 */

export const navCategories = [
	{
		id: "main",
		label: "Main",
		items: [
			{ id: 1, label: "Dashboard", route: "/", icon: "Home" },
			{ id: 16, label: "Analytics", route: "/analytics", icon: "BarChart3" },
			{ id: 25, label: "Reports", route: "/reports", icon: "FileBarChart" },
			{ id: 26, label: "Activity", route: "/activity", icon: "Activity" },
		],
	},
	{
		id: "sales",
		label: "Sales & CRM",
		items: [
			{ id: 2, label: "Leads", route: "/leads", icon: "User" },
			{ id: 3, label: "Sales", route: "/sales", icon: "DollarSign" },
			{ id: 18, label: "Pipeline", route: "/pipelines", icon: "Layers" },
			{ id: 21, label: "Deals", route: "/deals", icon: "CircleDollarSign" },
			{ id: 4, label: "Contacts", route: "/contacts", icon: "Contact" },
			{ id: 7, label: "Companies", route: "/companies", icon: "Users" },
			{ id: 24, label: "E-commerce", route: "/e-commerce", icon: "ShoppingCart" },
			{ id: 40, label: "Marketing", route: "/marketing", icon: "Megaphone" },
		],
	},
	{
		id: "operations",
		label: "Operations",
		items: [
			{ id: 6, label: "Tasks", route: "/tasks", icon: "ListTodo" },
			{ id: 15, label: "Calendar", route: "/calendar", icon: "Calendar" },
			{ id: 19, label: "Email", route: "/email", icon: "Mail" },
			{ id: 12, label: "Projects", route: "/projects", icon: "FolderClosed" },
			{ id: 34, label: "Files", route: "/files", icon: "FolderOpen" },
			{ id: 28, label: "Support", route: "/support", icon: "Headphones" },
		],
	},
	{
		id: "finance",
		label: "Finance",
		items: [
			{ id: 23, label: "Products", route: "/products", icon: "Package" },
			{ id: 8, label: "Invoices", route: "/invoices", icon: "FileText" },
			{ id: 11, label: "Payments", route: "/payments", icon: "CreditCard" },
			{ id: 41, label: "Subscriptions", route: "/subscriptions", icon: "Repeat" },
		],
	},
	{
		id: "developer",
		label: "Developer",
		items: [
			{ id: 5, label: "Integrations", route: "/integrations", icon: "Cable" },
			{ id: 9, label: "Webhooks", route: "/webhooks", icon: "Webhook" },
			{ id: 10, label: "Api Keys", route: "/api-keys", icon: "Key" },
			{ id: 13, label: "CMS", route: "/cms", icon: "FileText" },
			{ id: 29, label: "API Logs", route: "/api-logs", icon: "ScrollText" },
		],
	},
	{
		id: "authentication",
		label: "Authentication",
		items: [
			{ id: 101, label: "Login", route: "/login", icon: "LogIn" },
			{ id: 102, label: "Sign up", route: "/signup", icon: "UserPlus" },
			{ id: 103, label: "Forgot password", route: "/forgot-password", icon: "KeyRound" },
			{ id: 104, label: "Change password", route: "/change-password", icon: "Lock" },
			{ id: 105, label: "UI components", route: "/ui-components", icon: "Palette" },
		],
	},
	{
		id: "system",
		label: "System",
		items: [
			{ id: 17, label: "Teams", route: "/teams", icon: "UsersRound" },
			{ id: 30, label: "Users", route: "/users", icon: "UserCog" },
			{ id: 31, label: "Roles", route: "/roles", icon: "Shield" },
			{ id: 32, label: "Audit log", route: "/audit-log", icon: "History" },
			{ id: 20, label: "Notifications", route: "/notifications", icon: "Bell" },
			{ id: 33, label: "Help", route: "/help", icon: "CircleHelp" },
			{ id: 14, label: "Settings", route: "/settings", icon: "Settings" },
			{ id: 22, label: "About", route: "/about", icon: "Info" },
		],
	},
];

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
		id: 242,
		label: "E-commerce Orders",
		route: "/e-commerce/orders",
		icon: "Package",
		section: "sales",
		keywords: ["store", "orders", "e-commerce"],
	},
];

export const navSections = navCategories.map(({ id, label }) => ({ key: id, label }));

export function getSearchNavItems() {
	const fromSidebar = navCategories.flatMap((category) =>
		category.items.map((item) => ({
			...item,
			section: category.id,
		}))
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
