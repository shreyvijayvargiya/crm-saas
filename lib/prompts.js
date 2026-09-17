import fs from "fs";
import path from "path";

const PROMPTS_DIR = path.join(process.cwd(), "content", "prompts");

/** Hardcoded catalog — frontend-only, no database. */
export const PROMPT_CATALOG = [
	{
		slug: "saascrm-crm-builder",
		title: "Build a SaaS CRM",
		description:
			"Claude + Cursor skill for a frontend-only CRM. Tabs for Next.js App Router and Vite + React — copy the stack that matches your repo.",
		updatedAt: "2026-09-17",
		icon: "sparkles",
		accent: "violet",
		tags: ["Claude", "Cursor", "Next.js", "Vite"],
		eyebrow: "Skill · Next.js + Vite",
		variants: [
			{ id: "nextjs", label: "Next.js", file: "saascrm-nextjs-crm-builder.md" },
			{ id: "vite", label: "Vite", file: "saascrm-vite-crm-builder.md" },
		],
	},
	{
		slug: "build-an-editable-crm",
		title: "Build an Editable CRM",
		description:
			"Airtable / Notion-style tables: inline editing, sheets, kanban, and mock state. Generic business → CRM in one prompt.",
		updatedAt: "2026-09-17",
		icon: "table",
		accent: "sky",
		tags: ["Tables", "Kanban", "Next.js"],
		eyebrow: "Claude + Cursor",
		file: "build-an-editable-crm.md",
	},
	{
		slug: "build-a-full-saas-crm",
		title: "Build a Full SaaS CRM",
		description:
			"The advanced ~1,700-word spec: 60+ pages, 20+ tables, shared snapshot, charts, and a fake activity loop.",
		updatedAt: "2026-09-17",
		icon: "layers",
		accent: "amber",
		tags: ["60+ pages", "20+ tables", "Advanced"],
		eyebrow: "Full kit",
		file: "build-a-full-saas-crm.md",
	},
];

function readPromptFile(filename) {
	return fs.readFileSync(path.join(PROMPTS_DIR, filename), "utf8").replace(/^\uFEFF/, "");
}

export function getPromptSlugs() {
	return PROMPT_CATALOG.map((item) => item.slug);
}

export function getAllPrompts() {
	return PROMPT_CATALOG.map((item) => listItem(item));
}

function loadBody(item) {
	if (item.variants?.length) {
		return {
			variants: item.variants.map((variant) => ({
				id: variant.id,
				label: variant.label,
				content: readPromptFile(variant.file),
			})),
			content: readPromptFile(item.variants[0].file),
		};
	}
	const content = readPromptFile(item.file);
	return { content, variants: null };
}

export function getPromptBySlug(slug) {
	const item = PROMPT_CATALOG.find((entry) => entry.slug === slug);
	if (!item) return null;
	const body = loadBody(item);
	const index = PROMPT_CATALOG.findIndex((entry) => entry.slug === slug);
	const prev = index > 0 ? listItem(PROMPT_CATALOG[index - 1]) : null;
	const next =
		index < PROMPT_CATALOG.length - 1 ? listItem(PROMPT_CATALOG[index + 1]) : null;
	const similar = PROMPT_CATALOG.filter((entry) => entry.slug !== slug).map(listItem);
	return {
		...listItem(item),
		...body,
		prev,
		next,
		similar,
	};
}

function listItem(item) {
	return {
		slug: item.slug,
		title: item.title,
		description: item.description,
		updatedAt: item.updatedAt,
		icon: item.icon,
		accent: item.accent,
		tags: item.tags,
		eyebrow: item.eyebrow,
	};
}
