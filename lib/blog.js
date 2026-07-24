import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureBlogDir() {
	if (!fs.existsSync(BLOG_DIR)) {
		fs.mkdirSync(BLOG_DIR, { recursive: true });
	}
}

/** @returns {string[]} */
export function getBlogSlugs() {
	ensureBlogDir();
	return fs
		.readdirSync(BLOG_DIR)
		.filter((file) => file.endsWith(".md"))
		.map((file) => file.replace(/\.md$/, ""));
}

/**
 * @param {string} slug
 * @returns {{ slug: string, content: string, meta: Record<string, string> }}
 */
export function getBlogPostBySlug(slug) {
	const fullPath = path.join(BLOG_DIR, `${slug}.md`);
	const raw = fs.readFileSync(fullPath, "utf8");
	const { data, content } = matter(raw);
	return {
		slug,
		content: content.trim(),
		meta: {
			title: data.title || slug,
			description: data.description || "",
			date: data.date ? String(data.date) : "",
			author: data.author || "Shrey",
			image: data.image || "/screenshots-marketing-page/saas-crm-dashboard.png",
			imageAlt: data.imageAlt || data.title || "Blog cover",
			keywords: data.keywords || "CRM, SAAS CRM, admin dashboard",
		},
	};
}

/** @returns {Array<{ slug: string, meta: Record<string, string> }>} */
export function getAllBlogPosts() {
	return getBlogSlugs()
		.map((slug) => {
			const post = getBlogPostBySlug(slug);
			return { slug: post.slug, meta: post.meta };
		})
		.sort((a, b) => {
			const da = a.meta.date || "";
			const db = b.meta.date || "";
			return db.localeCompare(da);
		});
}
