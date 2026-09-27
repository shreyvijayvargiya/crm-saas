/** Canonical public origin — keep in sync with `components/seo/SiteSeo.jsx`. */
const SITE_URL = "https://saascrm.site";
const BRAND_NAME = "SaaSCRM";
const BRAND_TAGLINE =
	"The first open-source CRM for business, founders, and vibe coders — Next.js admin dashboards, CMS, and sales pipelines";

const CONTACT = {
	email: "shreyvijayvargiya26@gmail.com",
	calcom: "https://cal.com/shrey-vijayvargiya",
	x: "https://x.com/treyvijay",
	linkedin: "https://www.linkedin.com/in/shreyvijayvargiya",
};

function absoluteUrl(path = "/") {
	if (!path || path === "/") return `${SITE_URL}/`;
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function normalizeAgentPath(pathname = "/") {
	if (!pathname) return "/";
	let next = pathname.split("?")[0].split("#")[0];
	if (next.length > 1 && next.endsWith("/")) next = next.slice(0, -1);
	if (next.endsWith(".md")) {
		next = next.slice(0, -3);
		if (next === "/index" || next === "") next = "/";
	}
	return next || "/";
}

function markdownAlternatePath(pathname = "/") {
	const next = normalizeAgentPath(pathname);
	if (next === "/") return "/index.md";
	return `${next}.md`;
}

module.exports = {
	SITE_URL,
	BRAND_NAME,
	BRAND_TAGLINE,
	CONTACT,
	absoluteUrl,
	normalizeAgentPath,
	markdownAlternatePath,
};
