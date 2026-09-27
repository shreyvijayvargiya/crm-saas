const fs = require("fs");
const path = require("path");
const { SITE_URL } = require("./site");

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function escapeXml(value) {
	return String(value || "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function parseFrontmatter(raw) {
	const match = String(raw).match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!match) return { data: {}, body: String(raw) };
	const data = {};
	for (const line of match[1].split(/\r?\n/)) {
		const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
		if (!kv) continue;
		let value = kv[2].trim();
		if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
			value = value.slice(1, -1);
		}
		data[kv[1]] = value;
	}
	return { data, body: match[2].trim() };
}

function listBlogPosts() {
	if (!fs.existsSync(BLOG_DIR)) return [];
	return fs
		.readdirSync(BLOG_DIR)
		.filter((file) => file.endsWith(".md"))
		.map((file) => {
			const slug = file.replace(/\.md$/, "");
			const raw = fs.readFileSync(path.join(BLOG_DIR, slug + ".md"), "utf8");
			const { data } = parseFrontmatter(raw);
			return {
				slug,
				title: data.title || slug,
				description: data.description || "",
				date: data.date || "",
				author: data.author || "Shrey",
				image: data.image || "",
			};
		})
		.sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

function rfc822Date(iso) {
	if (!iso) return new Date().toUTCString();
	const d = new Date(`${iso}T00:00:00.000Z`);
	if (Number.isNaN(d.getTime())) return new Date().toUTCString();
	return d.toUTCString();
}

function buildBlogRss(posts = listBlogPosts()) {
	const newest = posts[0]?.date || "";
	const items = posts
		.map((post) => {
			const url = `${SITE_URL}/blog/${post.slug}`;
			const enclosure = post.image
				? `\n      <enclosure url="${escapeXml(
						post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`
				  )}" type="image/jpeg" />`
				: "";
			return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822Date(post.date)}</pubDate>
      <author>shreyvijayvargiya26@gmail.com (${escapeXml(post.author)})</author>
      <description>${escapeXml(post.description)}</description>${enclosure}
    </item>`;
		})
		.join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>SaaSCRM Blog — Open-source CRM for founders &amp; vibe coders</title>
    <link>${SITE_URL}/blog</link>
    <description>The first open-source Next.js CRM template for business, founders, and vibe coders — guides on templates, AI agents, clinic CRM, and shipping faster.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822Date(newest)}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;
}

function getBlogMarkdownBySlug(slug) {
	if (!slug || !/^[a-z0-9-]+$/.test(slug)) return null;
	const file = path.join(BLOG_DIR, `${slug}.md`);
	if (!fs.existsSync(file)) return null;
	return fs.readFileSync(file, "utf8");
}

function buildBlogIndexMarkdown(posts = listBlogPosts()) {
	const list = posts
		.map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}) — ${post.description}`)
		.join("\n");
	return `# SaaSCRM blog

Notes on CRM templates, admin dashboards, and shipping faster: ${SITE_URL}/blog

RSS feed: ${SITE_URL}/rss.xml

## Posts

${list}
`;
}

module.exports = {
	listBlogPosts,
	buildBlogRss,
	getBlogMarkdownBySlug,
	buildBlogIndexMarkdown,
};
