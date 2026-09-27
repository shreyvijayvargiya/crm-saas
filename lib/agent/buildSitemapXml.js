const { SITE_URL } = require("./site");
const { listBlogPosts } = require("./blogFeed");

/** Marketing and product paths (no /pricing — open source on GitHub). */
const STATIC_PATHS = [
	"/",
	"/docs",
	"/docs/api",
	"/docs/auth",
	"/docs/webhooks",
	"/docs/mcp",
	"/developers",
	"/saascrm",
	"/agents.md",
	"/openapi.json",
	"/openapi.yaml",
	"/llms.txt",
	"/about",
	"/demo",
	"/blueprint",
	"/templates",
	"/templates/clinic",
	"/templates/indie-stripe",
	"/templates/agency",
	"/templates/freelancer",
	"/templates/content-creator",
	"/templates/digital-store",
	"/templates/ecommerce-cms",
	"/demo/template/clinic",
	"/demo/template/indie-stripe",
	"/demo/template/agency",
	"/demo/template/freelancer",
	"/demo/template/ecommerce-cms",
	"/dashboard",
	"/faq",
	"/contact",
	"/prompts",
	"/prompts/saascrm-crm-builder",
	"/prompts/build-an-editable-crm",
	"/prompts/build-a-full-saas-crm",
	"/prompts/calendar-scheduling-app",
	"/prompts/payment-tracking-app",
	"/prompts/kanban-project-management-app",
	"/prompts/invoice-management-app",
	"/blog",
	"/sitemap",
	"/rss.xml",
];

function priorityFor(path) {
	if (path === "/") return "1.0";
	if (path === "/demo" || path === "/templates" || path === "/blueprint") return "0.95";
	if (path.startsWith("/blog/")) return "0.75";
	if (path.startsWith("/docs")) return "0.9";
	return "0.8";
}

function changefreqFor(path) {
	if (path === "/" || path === "/blog" || path.startsWith("/prompts")) return "weekly";
	if (path.startsWith("/blog/")) return "monthly";
	return "monthly";
}

function buildSitemapXml() {
	const posts = listBlogPosts();
	const paths = [
		...STATIC_PATHS,
		...posts.map((p) => `/blog/${p.slug}`),
	];
	const unique = [...new Set(paths)];

	const urls = unique
		.map((path) => {
			const loc = path === "/rss.xml" ? `${SITE_URL}/rss.xml` : `${SITE_URL}${path === "/" ? "/" : path}`;
			return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreqFor(path)}</changefreq>
    <priority>${priorityFor(path)}</priority>
  </url>`;
		})
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

module.exports = { buildSitemapXml, STATIC_PATHS };
