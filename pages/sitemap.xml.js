import { SITEMAP_PATHS } from "../app/AgencySite/sitemapConfig";

const DEFAULT_SITE_URL = "https://saascrm.site";

function escapeXml(value) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function buildSitemap(baseUrl) {
	const urls = SITEMAP_PATHS.map((path) => {
		const priority =
			path === "/" ? "1.0" : path === "/blueprint" || path === "/pricing" ? "0.9" : "0.7";
		const changefreq =
			path === "/" || path === "/blueprint" ? "weekly" : "monthly";
		return `  <url>
    <loc>${escapeXml(`${baseUrl}${path}`)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
	}).join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function getServerSideProps({ res }) {
	const baseUrl = (
		process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL
	).replace(/\/+$/, "");

	res.setHeader("Content-Type", "application/xml; charset=utf-8");
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=86400, stale-while-revalidate=604800"
	);
	res.write(buildSitemap(baseUrl));
	res.end();

	return { props: {} };
}

export default function SitemapXml() {
	return null;
}
