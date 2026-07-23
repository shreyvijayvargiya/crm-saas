/**
 * OpenRouter generator for Admin Form Builder JSON (form-compatible AST).
 */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openrouter/free";
const AI_TIMEOUT_MS = Number(process.env.OPENROUTER_ADMIN_BUILDER_TIMEOUT_MS) || 8000;

const ALLOWED_PAGES = [
	"dashboard",
	"analytics",
	"reports",
	"activity",
	"leads",
	"sales",
	"pipeline",
	"deals",
	"contacts",
	"companies",
	"e-commerce",
	"marketing",
	"tasks",
	"calendar",
	"scheduler",
	"email",
	"projects",
	"files",
	"support",
	"products",
	"invoices",
	"payments",
	"subscriptions",
	"integrations",
	"webhooks",
	"api-keys",
	"cms",
	"api-logs",
	"teams",
	"users",
	"roles",
	"audit-log",
	"notifications",
	"settings",
	"help",
	"about",
];

const ALLOWED_BLOCKS = ["stats", "toolbar", "table", "chart", "kanban"];
const ALLOWED_COLUMN_TYPES = ["text", "badge", "number", "date"];

const PAGE_LABELS = {
	dashboard: "Dashboard",
	analytics: "Analytics",
	reports: "Reports",
	activity: "Activity",
	leads: "Leads",
	sales: "Sales",
	pipeline: "Pipeline",
	deals: "Deals",
	contacts: "Contacts",
	companies: "Companies",
	"e-commerce": "E-commerce",
	marketing: "Marketing",
	tasks: "Tasks",
	calendar: "Calendar",
	scheduler: "Scheduler",
	email: "Email",
	projects: "Projects",
	files: "Files",
	support: "Support",
	products: "Products",
	invoices: "Invoices",
	payments: "Payments",
	subscriptions: "Subscriptions",
	integrations: "Integrations",
	webhooks: "Webhooks",
	"api-keys": "API Keys",
	cms: "CMS",
	"api-logs": "API Logs",
	teams: "Teams",
	users: "Users",
	roles: "Roles",
	"audit-log": "Audit log",
	notifications: "Notifications",
	settings: "Settings",
	help: "Help",
	about: "About",
};

function clean(value, max = 120) {
	return String(value ?? "")
		.replace(/[<>`]/g, "")
		.replace(/\s+/g, " ")
		.trim()
		.slice(0, max);
}

function extractJson(content) {
	const text = String(content ?? "").trim();
	const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
	const candidate = fenced?.[1] || text;
	const start = candidate.indexOf("{");
	const end = candidate.lastIndexOf("}");
	if (start < 0 || end <= start) throw new Error("Invalid JSON response");
	return JSON.parse(candidate.slice(start, end + 1));
}

function guessPagesFromPrompt(prompt) {
	const lower = prompt.toLowerCase();
	const hits = ALLOWED_PAGES.filter((id) => {
		const label = PAGE_LABELS[id].toLowerCase();
		return lower.includes(id) || lower.includes(label);
	});
	if (hits.length) return hits.slice(0, 8);
	if (/notion|agency|agencies/.test(lower)) {
		return ["leads", "contacts", "companies", "deals", "pipeline", "invoices", "cms"];
	}
	if (/saas|startup|b2b/.test(lower)) {
		return ["leads", "deals", "pipeline", "analytics", "subscriptions", "support"];
	}
	return ["leads", "contacts", "deals", "tasks", "analytics"];
}

function defaultBlocksFor(templateId) {
	if (templateId === "pipeline") return ["stats", "kanban"];
	if (templateId === "analytics") return ["stats", "chart", "table"];
	if (templateId === "dashboard") return ["stats", "chart", "table"];
	if (["calendar", "email", "files", "help"].includes(templateId)) {
		return ["toolbar", "table"];
	}
	return ["stats", "toolbar", "table"];
}

function defaultColumnsFor(templateId) {
	const map = {
		leads: [
			{ label: "Name", type: "text" },
			{ label: "Company", type: "text" },
			{ label: "Status", type: "badge" },
			{ label: "Value", type: "text" },
		],
		contacts: [
			{ label: "Name", type: "text" },
			{ label: "Email", type: "text" },
			{ label: "Company", type: "text" },
			{ label: "Status", type: "badge" },
		],
		deals: [
			{ label: "Deal", type: "text" },
			{ label: "Stage", type: "badge" },
			{ label: "Owner", type: "text" },
			{ label: "Value", type: "text" },
		],
		invoices: [
			{ label: "Number", type: "text" },
			{ label: "Customer", type: "text" },
			{ label: "Amount", type: "text" },
			{ label: "Status", type: "badge" },
		],
		cms: [
			{ label: "Title", type: "text" },
			{ label: "Status", type: "badge" },
			{ label: "Author", type: "text" },
			{ label: "Updated", type: "date" },
		],
	};
	return (
		map[templateId] || [
			{ label: "Name", type: "text" },
			{ label: "Status", type: "badge" },
			{ label: "Owner", type: "text" },
			{ label: "Updated", type: "date" },
		]
	);
}

function buildBlockSkeleton(type, templateId, label) {
	switch (type) {
		case "stats":
			return {
				type: "stats",
				items: [
					{ label: "Total", value: "128" },
					{ label: "Active", value: "64" },
					{ label: "This week", value: "18" },
					{ label: "Revenue", value: "$24k" },
				],
			};
		case "toolbar":
			return {
				type: "toolbar",
				searchPlaceholder: `Search ${label.toLowerCase()}…`,
				filters: ["Status", "Owner"],
			};
		case "table":
			return {
				type: "table",
				name: label,
				columns: defaultColumnsFor(templateId),
			};
		case "chart":
			return {
				type: "chart",
				title: `${label} trend`,
			};
		case "kanban":
			return {
				type: "kanban",
				columns: [
					{ label: "New", cards: ["Item A", "Item B"] },
					{ label: "In progress", cards: ["Item C"] },
					{ label: "Won", cards: ["Item D"] },
				],
			};
		default:
			return { type: "table", name: label, columns: defaultColumnsFor(templateId) };
	}
}

export function buildFallbackAdminForm(prompt) {
	const pages = guessPagesFromPrompt(prompt).map((templateId) => {
		const label = PAGE_LABELS[templateId] || templateId;
		return {
			templateId,
			label,
			blocks: defaultBlocksFor(templateId).map((type) =>
				buildBlockSkeleton(type, templateId, label)
			),
			children: [],
		};
	});

	return {
		name: clean(prompt, 48) || "AI CRM Admin",
		pages,
		source: "fallback",
	};
}

function normalizeBlock(raw, templateId, pageLabel) {
	const type = ALLOWED_BLOCKS.includes(raw?.type) ? raw.type : null;
	if (!type) return null;

	if (type === "stats") {
		const items = Array.isArray(raw.items)
			? raw.items
					.map((item) => ({
						label: clean(item?.label, 32) || "Metric",
						value: clean(item?.value, 24) || "0",
					}))
					.slice(0, 4)
			: [];
		return {
			type,
			items: items.length
				? items
				: buildBlockSkeleton("stats", templateId, pageLabel).items,
		};
	}

	if (type === "toolbar") {
		const filters = Array.isArray(raw.filters)
			? raw.filters.map((f) => clean(f, 24)).filter(Boolean).slice(0, 4)
			: ["Status", "Owner"];
		return {
			type,
			searchPlaceholder:
				clean(raw.searchPlaceholder, 60) ||
				`Search ${pageLabel.toLowerCase()}…`,
			filters: filters.length ? filters : ["Status"],
		};
	}

	if (type === "table") {
		const columns = Array.isArray(raw.columns)
			? raw.columns
					.map((col) => ({
						label: clean(col?.label || col?.name, 40) || "Column",
						type: ALLOWED_COLUMN_TYPES.includes(col?.type) ? col.type : "text",
					}))
					.slice(0, 8)
			: defaultColumnsFor(templateId);
		return {
			type,
			name: clean(raw.name, 40) || pageLabel,
			columns: columns.length ? columns : defaultColumnsFor(templateId),
		};
	}

	if (type === "chart") {
		return {
			type,
			title: clean(raw.title, 60) || `${pageLabel} trend`,
		};
	}

	if (type === "kanban") {
		const columns = Array.isArray(raw.columns)
			? raw.columns
					.map((col) => ({
						label: clean(col?.label, 32) || "Stage",
						cards: Array.isArray(col?.cards)
							? col.cards.map((c) => clean(c, 40)).filter(Boolean).slice(0, 4)
							: ["Card"],
					}))
					.slice(0, 4)
			: buildBlockSkeleton("kanban", templateId, pageLabel).columns;
		return { type, columns };
	}

	return null;
}

function normalizePage(raw, used = new Set()) {
	const templateId = ALLOWED_PAGES.includes(raw?.templateId)
		? raw.templateId
		: ALLOWED_PAGES.find(
				(id) =>
					id === String(raw?.label || "").toLowerCase() ||
					PAGE_LABELS[id].toLowerCase() ===
						String(raw?.label || "").toLowerCase()
			);

	if (!templateId || used.has(templateId)) return null;
	used.add(templateId);

	const label = clean(raw?.label, 40) || PAGE_LABELS[templateId];
	let blocks = Array.isArray(raw?.blocks)
		? raw.blocks
				.map((block) => normalizeBlock(block, templateId, label))
				.filter(Boolean)
				.slice(0, 6)
		: [];

	if (!blocks.length) {
		blocks = defaultBlocksFor(templateId).map((type) =>
			buildBlockSkeleton(type, templateId, label)
		);
	}

	const childUsed = new Set(used);
	const children = Array.isArray(raw?.children)
		? raw.children
				.map((child) => normalizePage(child, childUsed))
				.filter(Boolean)
				.slice(0, 4)
		: [];

	return { templateId, label, blocks, children };
}

export function normalizeAdminFormJson(ai, fallback) {
	if (!ai || typeof ai !== "object") return fallback;

	const used = new Set();
	const pages = Array.isArray(ai.pages)
		? ai.pages.map((page) => normalizePage(page, used)).filter(Boolean).slice(0, 10)
		: [];

	if (!pages.length) return fallback;

	return {
		name: clean(ai.name, 60) || fallback.name,
		pages,
		source: "ai",
	};
}

async function requestFromOpenRouter(prompt, fallback) {
	const apiKey = process.env.OPENROUTER_API_KEY;
	if (!apiKey) return { ...fallback, notice: "OPENROUTER_API_KEY is not configured." };

	const model =
		process.env.OPENROUTER_ADMIN_BUILDER_MODEL ||
		process.env.OPENROUTER_BLUEPRINT_MODEL ||
		process.env.OPENROUTER_MODEL ||
		DEFAULT_MODEL;

	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), AI_TIMEOUT_MS);

	const systemPrompt = `You generate CRM Admin Form Builder JSON only. No markdown, no code, no explanation.
Return a single JSON object matching this schema exactly:
{
  "name": "string",
  "pages": [
    {
      "templateId": "one of: ${ALLOWED_PAGES.join(",")}",
      "label": "string",
      "blocks": [
        {"type":"stats","items":[{"label":"","value":""}]},
        {"type":"toolbar","searchPlaceholder":"","filters":["Status"]},
        {"type":"table","name":"","columns":[{"label":"","type":"text|badge|number|date"}]},
        {"type":"chart","title":""},
        {"type":"kanban","columns":[{"label":"","cards":[""]}]}
      ],
      "children": []
    }
  ]
}
Rules:
- Only use allowed templateId values.
- Only use block types: ${ALLOWED_BLOCKS.join(", ")}.
- 3–8 pages max. Prefer CRM modules that match the user request.
- Each list page should usually include stats + toolbar + table.
- Pipeline pages may use kanban. Analytics may use chart.
- Nested children only when clearly nested (e.g. marketing forms under marketing).
- Sample KPI values and column labels should fit the business described.`;

	try {
		const response = await fetch(OPENROUTER_URL, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${apiKey}`,
				"Content-Type": "application/json",
				"HTTP-Referer":
					process.env.OPENROUTER_SITE_URL || "https://saascrm.site",
				"X-Title": process.env.OPENROUTER_APP_NAME || "SaaSCRM Admin Builder",
			},
			body: JSON.stringify({
				model,
				messages: [
					{ role: "system", content: systemPrompt },
					{
						role: "user",
						content: `Build the admin form JSON for this CRM request:\n${clean(prompt, 800)}`,
					},
				],
				temperature: 0.2,
				max_tokens: 1600,
			}),
			signal: controller.signal,
		});

		const payload = await response.json().catch(() => ({}));
		if (!response.ok) throw new Error("OpenRouter request failed");

		const parsed = extractJson(payload.choices?.[0]?.message?.content);
		const normalized = normalizeAdminFormJson(parsed, fallback);
		return {
			...normalized,
			model: payload.model || model,
		};
	} catch {
		return {
			...fallback,
			notice:
				"The free AI model was busy, so we filled the form from a local template.",
		};
	} finally {
		clearTimeout(timer);
	}
}

export async function generateAdminFormFromPrompt(prompt) {
	const text = clean(prompt, 800);
	if (text.length < 12) {
		throw new Error("Describe your CRM in at least 12 characters.");
	}
	const fallback = buildFallbackAdminForm(text);
	return requestFromOpenRouter(text, fallback);
}
