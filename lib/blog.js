import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
const PUBLISH_TZ = "Asia/Kolkata";

function ensureBlogDir() {
	if (!fs.existsSync(BLOG_DIR)) {
		fs.mkdirSync(BLOG_DIR, { recursive: true });
	}
}

/** Calendar day as YYYY-MM-DD in the publish timezone (IST). */
function calendarDay(now = new Date(), timeZone = PUBLISH_TZ) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(now);
}

function formatMetaDate(date) {
	if (!date) return "";
	if (date instanceof Date && !Number.isNaN(date.getTime())) {
		return calendarDay(date);
	}
	const raw = String(date);
	const match = raw.match(/^(\d{4}-\d{2}-\d{2})/);
	return match ? match[1] : raw;
}

/**
 * Future-dated posts stay hidden in production until their `date` (IST).
 * Visible in `next dev` so drafts can be previewed.
 */
export function isBlogPostLive(meta, now = new Date()) {
	if (process.env.NODE_ENV !== "production") return true;
	if (process.env.SHOW_SCHEDULED_POSTS === "1") return true;
	const day = String(meta?.date || "").slice(0, 10);
	if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return true;
	return day <= calendarDay(now);
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
	const tags = Array.isArray(data.tags)
		? data.tags.map(String).filter(Boolean)
		: typeof data.tags === "string"
			? data.tags
					.split(",")
					.map((tag) => tag.trim())
					.filter(Boolean)
			: [];
	const faq = Array.isArray(data.faq)
		? data.faq
				.map((item) => ({
					q: String(item?.q || item?.question || "").trim(),
					a: String(item?.a || item?.answer || "").trim(),
				}))
				.filter((item) => item.q && item.a)
		: [];
	const keywords =
		data.keywords ||
		(tags.length ? tags.join(", ") : "CRM, SAAS CRM, admin dashboard");
	return {
		slug,
		content: content.trim(),
		meta: {
			title: data.title || slug,
			metaTitle: data.metaTitle || data.title || slug,
			description: data.description || "",
			date: formatMetaDate(data.date),
			author: data.author || "Shrey",
			image: data.image || "/screenshots-marketing-page/saas-crm-dashboard.png",
			imageAlt: data.imageAlt || data.title || "Blog cover",
			keywords,
			tags,
			faq,
		},
	};
}

/**
 * @param {{ includeScheduled?: boolean }} [options]
 * @returns {Array<{ slug: string, meta: Record<string, string> }>}
 */
export function getAllBlogPosts({ includeScheduled = false } = {}) {
	return getBlogSlugs()
		.map((slug) => {
			const post = getBlogPostBySlug(slug);
			return { slug: post.slug, meta: post.meta };
		})
		.filter((post) => includeScheduled || isBlogPostLive(post.meta))
		.sort((a, b) => {
			const da = a.meta.date || "";
			const db = b.meta.date || "";
			return db.localeCompare(da);
		});
}

export const BLOG_ISR_SECONDS = 60;
