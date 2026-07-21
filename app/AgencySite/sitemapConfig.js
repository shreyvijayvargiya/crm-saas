export const SITEMAP_GROUPS = [
	{
		title: "SaaSCRM",
		description: "Public website, product information, and free planning tools.",
		links: [
			{ label: "Home", href: "/" },
			{ label: "AI CRM Builder", href: "/blueprint" },
			{ label: "Live CRM demo", href: "/demo" },
			{ label: "Pricing", href: "/pricing" },
			{ label: "FAQ", href: "/faq" },
			{ label: "Contact", href: "/contact" },
			{ label: "Sitemap", href: "/sitemap" },
		],
	},
	{
		title: "Dashboard & insights",
		description: "Overview, analytics, reporting, and activity screens.",
		links: [
			{ label: "Dashboard", href: "/demo" },
			{ label: "Analytics", href: "/analytics" },
			{ label: "Reports", href: "/reports" },
			{ label: "Activity", href: "/activity" },
		],
	},
	{
		title: "Sales & CRM",
		description: "Customer acquisition, sales pipeline, and account management.",
		links: [
			{ label: "Leads", href: "/leads" },
			{ label: "Sales", href: "/sales" },
			{ label: "Pipelines", href: "/pipelines" },
			{ label: "Deals", href: "/deals" },
			{ label: "Contacts", href: "/contacts" },
			{ label: "Companies", href: "/companies" },
			{ label: "E-commerce", href: "/e-commerce" },
			{ label: "Orders", href: "/e-commerce/orders" },
			{ label: "Marketing", href: "/marketing" },
			{ label: "Marketing segments", href: "/marketing/segments" },
			{ label: "Marketing forms", href: "/marketing/forms" },
		],
	},
	{
		title: "Operations",
		description: "Daily work, scheduling, projects, documents, and support.",
		links: [
			{ label: "Tasks", href: "/tasks" },
			{ label: "Calendar", href: "/calendar" },
			{ label: "Content scheduler", href: "/scheduler" },
			{ label: "Connected scheduler apps", href: "/scheduler/apps" },
			{ label: "Email", href: "/email" },
			{ label: "Projects", href: "/projects" },
			{ label: "Files", href: "/files" },
			{ label: "Support", href: "/support" },
		],
	},
	{
		title: "Finance",
		description: "Products, invoices, payments, and recurring revenue.",
		links: [
			{ label: "Products", href: "/products" },
			{ label: "Invoices", href: "/invoices" },
			{ label: "Payments", href: "/payments" },
			{ label: "Subscriptions", href: "/subscriptions" },
			{ label: "Subscription plans", href: "/subscriptions/plans" },
		],
	},
	{
		title: "Developer & content",
		description: "Integrations, APIs, webhooks, and content management.",
		links: [
			{ label: "Integrations", href: "/integrations" },
			{ label: "Webhooks", href: "/webhooks" },
			{ label: "API keys", href: "/api-keys" },
			{ label: "API logs", href: "/api-logs" },
			{ label: "CMS", href: "/cms" },
		],
	},
	{
		title: "Administration",
		description: "Workspace users, security, preferences, and help.",
		links: [
			{ label: "Teams", href: "/teams" },
			{ label: "Users", href: "/users" },
			{ label: "Roles", href: "/roles" },
			{ label: "Audit log", href: "/audit-log" },
			{ label: "Notifications", href: "/notifications" },
			{ label: "Settings", href: "/settings" },
			{ label: "Help", href: "/help" },
			{ label: "About", href: "/about" },
			{ label: "UI components", href: "/ui-components" },
		],
	},
	{
		title: "Authentication",
		description: "Buyer-ready account and password screens.",
		links: [
			{ label: "Log in", href: "/login" },
			{ label: "Sign up", href: "/signup" },
			{ label: "Forgot password", href: "/forgot-password" },
			{ label: "Change password", href: "/change-password" },
		],
	},
];

export const SITEMAP_PATHS = Array.from(
	new Set(SITEMAP_GROUPS.flatMap((group) => group.links.map((link) => link.href)))
);
