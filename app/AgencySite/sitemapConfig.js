export const SITEMAP_GROUPS = [
	{
		title: "SaaSCRM",
		description: "Public website, product information, and free planning tools.",
		links: [
			{ label: "Home", href: "/" },
			{ label: "AI CRM Builder", href: "/blueprint" },
			{ label: "Free CRM templates", href: "/templates" },
			{ label: "Indie Stripe CRM (free)", href: "/templates/indie-stripe" },
			{ label: "Agency CRM (free)", href: "/templates/agency" },
			{ label: "Freelancer CRM (free)", href: "/templates/freelancer" },
			{ label: "Content Creator CRM (free)", href: "/templates/content-creator" },
			{ label: "Digital Store CRM (free)", href: "/templates/digital-store" },
			{ label: "Ecommerce CMS (free)", href: "/templates/ecommerce-cms" },
			{ label: "CRM Admin Composer", href: "/admin-builder" },
			{ label: "Blog", href: "/blog" },
			{ label: "Live CRM demo", href: "/demo" },
			{ label: "Demo · Indie Stripe", href: "/demo/template/indie-stripe" },
			{ label: "Demo · Agency", href: "/demo/template/agency" },
			{ label: "Demo · Freelancer", href: "/demo/template/freelancer" },
			{ label: "Demo · Ecommerce CMS", href: "/demo/template/ecommerce-cms" },
			{ label: "Dashboard", href: "/dashboard" },
			{ label: "Pricing", href: "/pricing" },
			{ label: "FAQ", href: "/faq" },
			{ label: "Contact", href: "/contact" },
			{ label: "SaaSCRM developer docs", href: "/docs" },
			{ label: "SaaSCRM API docs", href: "/docs/api" },
			{ label: "SaaSCRM auth docs", href: "/docs/auth" },
			{ label: "SaaSCRM webhooks docs", href: "/docs/webhooks" },
			{ label: "SaaSCRM MCP server", href: "/docs/mcp" },
			{ label: "SaaSCRM brand", href: "/saascrm" },
			{ label: "SaaSCRM agent instructions", href: "/agents.md" },
			{ label: "Sitemap", href: "/sitemap" },
		],
	},
	{
		title: "Blog",
		description: "SEO notes on CRM, admin dashboards, and shipping faster.",
		/** Filled at build time via getSitemapGroups(blogPosts) — keep a static fallback. */
		links: [
			{ label: "All posts", href: "/blog" },
			{
				label: "Best CRM for small businesses and startups",
				href: "/blog/best-crm-for-small-businesses-and-startups",
			},
			{
				label: "Finance CRM for an Australian accounting client",
				href: "/blog/building-finance-crm-for-australian-client",
			},
			{
				label: "6 CRM templates you can demo today",
				href: "/blog/six-crm-templates-you-can-demo-today",
			},
			{
				label: "Plan your CRM in 2 minutes with AI Builder",
				href: "/blog/plan-your-crm-in-2-minutes-with-ai-builder",
			},
			{
				label: "Why your business needs a CRM",
				href: "/blog/why-your-business-needs-a-crm",
			},
			{
				label: "Why I keep building CRM templates",
				href: "/blog/why-i-keep-building-crm-templates",
			},
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

/**
 * Merge live blog posts into the Blog group (newest first).
 * @param {Array<{ slug: string, meta: { title?: string } }>} [blogPosts]
 */
export function getSitemapGroups(blogPosts = []) {
	if (!blogPosts.length) return SITEMAP_GROUPS;

	const blogLinks = [
		{ label: "All posts", href: "/blog" },
		...blogPosts.map((post) => ({
			label: post.meta?.title || post.slug,
			href: `/blog/${post.slug}`,
		})),
	];

	return SITEMAP_GROUPS.map((group) =>
		group.title === "Blog" ? { ...group, links: blogLinks } : group
	);
}

export const SITEMAP_PATHS = Array.from(
	new Set(SITEMAP_GROUPS.flatMap((group) => group.links.map((link) => link.href)))
);
