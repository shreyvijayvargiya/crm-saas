/**
 * Limited CRM page + block catalog for the Admin Form Builder.
 * Only these modules/components can be composed (CRM, not a freeform website).
 */

export const ADMIN_PAGE_CATALOG = [
	{ id: "dashboard", label: "Dashboard", icon: "Home", section: "Main", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "analytics", label: "Analytics", icon: "BarChart3", section: "Main", defaultBlocks: ["stats", "chart", "table"] },
	{ id: "reports", label: "Reports", icon: "FileBarChart", section: "Main", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "activity", label: "Activity", icon: "Activity", section: "Main", defaultBlocks: ["toolbar", "table"] },
	{ id: "leads", label: "Leads", icon: "User", section: "Sales & CRM", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "sales", label: "Sales", icon: "DollarSign", section: "Sales & CRM", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "pipeline", label: "Pipeline", icon: "Layers", section: "Sales & CRM", defaultBlocks: ["stats", "kanban"] },
	{ id: "deals", label: "Deals", icon: "CircleDollarSign", section: "Sales & CRM", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "contacts", label: "Contacts", icon: "Contact", section: "Sales & CRM", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "companies", label: "Companies", icon: "Users", section: "Sales & CRM", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "e-commerce", label: "E-commerce", icon: "ShoppingCart", section: "Sales & CRM", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "marketing", label: "Marketing", icon: "Megaphone", section: "Sales & CRM", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "tasks", label: "Tasks", icon: "ListTodo", section: "Operations", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "calendar", label: "Calendar", icon: "Calendar", section: "Operations", defaultBlocks: ["toolbar", "table"] },
	{ id: "scheduler", label: "Scheduler", icon: "CalendarClock", section: "Operations", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "email", label: "Email", icon: "Mail", section: "Operations", defaultBlocks: ["toolbar", "table"] },
	{ id: "projects", label: "Projects", icon: "FolderClosed", section: "Operations", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "files", label: "Files", icon: "FolderOpen", section: "Operations", defaultBlocks: ["toolbar", "table"] },
	{ id: "support", label: "Support", icon: "Headphones", section: "Operations", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "products", label: "Products", icon: "Package", section: "Finance", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "invoices", label: "Invoices", icon: "FileText", section: "Finance", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "payments", label: "Payments", icon: "CreditCard", section: "Finance", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "subscriptions", label: "Subscriptions", icon: "Repeat", section: "Finance", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "integrations", label: "Integrations", icon: "Cable", section: "Developer", defaultBlocks: ["toolbar", "table"] },
	{ id: "webhooks", label: "Webhooks", icon: "Webhook", section: "Developer", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "api-keys", label: "API Keys", icon: "Key", section: "Developer", defaultBlocks: ["toolbar", "table"] },
	{ id: "cms", label: "CMS", icon: "FileText", section: "Developer", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "api-logs", label: "API Logs", icon: "ScrollText", section: "Developer", defaultBlocks: ["toolbar", "table"] },
	{ id: "teams", label: "Teams", icon: "UsersRound", section: "System", defaultBlocks: ["stats", "toolbar", "table"] },
	{ id: "users", label: "Users", icon: "UserCog", section: "System", defaultBlocks: ["toolbar", "table"] },
	{ id: "roles", label: "Roles", icon: "Shield", section: "System", defaultBlocks: ["toolbar", "table"] },
	{ id: "audit-log", label: "Audit log", icon: "History", section: "System", defaultBlocks: ["toolbar", "table"] },
	{ id: "notifications", label: "Notifications", icon: "Bell", section: "System", defaultBlocks: ["toolbar", "table"] },
	{ id: "settings", label: "Settings", icon: "Settings", section: "System", defaultBlocks: ["stats", "table"] },
	{ id: "help", label: "Help", icon: "CircleHelp", section: "System", defaultBlocks: ["table"] },
	{ id: "about", label: "About", icon: "Info", section: "System", defaultBlocks: ["stats"] },
];

/** Limited CRM building blocks — not a free website builder. */
export const ADMIN_BLOCK_TYPES = [
	{
		id: "stats",
		label: "Stats cards",
		description: "KPI row above the table",
	},
	{
		id: "toolbar",
		label: "Search + filters",
		description: "Search input and filter dropdowns",
	},
	{
		id: "table",
		label: "Data table",
		description: "Main records table with columns",
	},
	{
		id: "chart",
		label: "Chart card",
		description: "Simple analytics chart placeholder",
	},
	{
		id: "kanban",
		label: "Kanban board",
		description: "Pipeline-style columns",
	},
];

const SAMPLE_ROWS = {
	leads: [
		{ name: "Ava Chen", status: "New", owner: "Sam", value: "$4,200" },
		{ name: "Jordan Lee", status: "Qualified", owner: "Alex", value: "$9,800" },
		{ name: "Priya Shah", status: "Contacted", owner: "Sam", value: "$2,100" },
	],
	default: [
		{ name: "Record A", status: "Active", owner: "You", value: "—" },
		{ name: "Record B", status: "Pending", owner: "Team", value: "—" },
		{ name: "Record C", status: "Closed", owner: "You", value: "—" },
	],
};

const DEFAULT_COLUMNS = [
	{ id: "name", label: "Name", type: "text" },
	{ id: "status", label: "Status", type: "badge" },
	{ id: "owner", label: "Owner", type: "text" },
	{ id: "value", label: "Value", type: "text" },
];

export function createId(prefix = "id") {
	return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createBlock(type, pageLabel = "Records") {
	const id = createId(type);
	switch (type) {
		case "stats":
			return {
				id,
				type: "stats",
				items: [
					{ id: createId("kpi"), label: "Total", value: "128" },
					{ id: createId("kpi"), label: "Active", value: "64" },
					{ id: createId("kpi"), label: "Conversion", value: "18%" },
					{ id: createId("kpi"), label: "Revenue", value: "$42k" },
				],
			};
		case "toolbar":
			return {
				id,
				type: "toolbar",
				searchPlaceholder: `Search ${pageLabel.toLowerCase()}…`,
				filters: ["Status", "Owner"],
			};
		case "table":
			return {
				id,
				type: "table",
				name: pageLabel,
				columns: DEFAULT_COLUMNS.map((col) => ({ ...col, id: createId("col") })),
				rows: SAMPLE_ROWS.default,
			};
		case "chart":
			return {
				id,
				type: "chart",
				title: `${pageLabel} trend`,
				bars: [40, 65, 45, 80, 55, 90, 70],
			};
		case "kanban":
			return {
				id,
				type: "kanban",
				columns: [
					{ id: createId("col"), label: "New", cards: ["Lead A", "Lead B"] },
					{ id: createId("col"), label: "In progress", cards: ["Lead C"] },
					{ id: createId("col"), label: "Won", cards: ["Lead D"] },
				],
			};
		default:
			return { id, type };
	}
}

export function createPageFromTemplate(templateId, customLabel) {
	const template = ADMIN_PAGE_CATALOG.find((page) => page.id === templateId);
	if (!template) return null;
	const label = customLabel || template.label;
	return {
		id: createId("page"),
		templateId: template.id,
		label,
		icon: template.icon,
		section: template.section,
		children: [],
		blocks: template.defaultBlocks.map((blockType) => createBlock(blockType, label)),
	};
}

export function flattenPages(pages, depth = 0, out = []) {
	pages.forEach((page) => {
		out.push({ ...page, depth });
		if (page.children?.length) flattenPages(page.children, depth + 1, out);
	});
	return out;
}

export function findPage(pages, pageId) {
	for (const page of pages) {
		if (page.id === pageId) return page;
		const nested = findPage(page.children || [], pageId);
		if (nested) return nested;
	}
	return null;
}

export function updatePageInTree(pages, pageId, updater) {
	return pages.map((page) => {
		if (page.id === pageId) return updater(page);
		return {
			...page,
			children: updatePageInTree(page.children || [], pageId, updater),
		};
	});
}

export function removePageFromTree(pages, pageId) {
	return pages
		.filter((page) => page.id !== pageId)
		.map((page) => ({
			...page,
			children: removePageFromTree(page.children || [], pageId),
		}));
}

export function buildAdminAst(pages, meta = {}) {
	return {
		version: 1,
		kind: "saas-crm-admin",
		generatedAt: new Date().toISOString(),
		meta: {
			name: meta.name || "My CRM Admin",
			...meta,
		},
		pages: pages.map(serializePage),
	};
}

function serializePage(page) {
	return {
		id: page.id,
		templateId: page.templateId,
		label: page.label,
		route: `/${page.templateId}`,
		blocks: page.blocks,
		children: (page.children || []).map(serializePage),
	};
}

export function createInitialAdminTree() {
	return [
		createPageFromTemplate("leads"),
		createPageFromTemplate("analytics"),
	].filter(Boolean);
}

/**
 * Turn AI / API form JSON into live builder page state (ids + sample rows).
 */
export function hydrateAdminFormFromAi(form) {
	const hydrateBlock = (block, pageLabel) => {
		const base = createBlock(block.type, pageLabel);
		if (block.type === "stats" && Array.isArray(block.items)) {
			return {
				...base,
				items: block.items.slice(0, 4).map((item) => ({
					id: createId("kpi"),
					label: item.label || "Metric",
					value: item.value || "0",
				})),
			};
		}
		if (block.type === "toolbar") {
			return {
				...base,
				searchPlaceholder: block.searchPlaceholder || base.searchPlaceholder,
				filters: Array.isArray(block.filters) && block.filters.length
					? block.filters
					: base.filters,
			};
		}
		if (block.type === "table") {
			return {
				...base,
				name: block.name || pageLabel,
				columns:
					Array.isArray(block.columns) && block.columns.length
						? block.columns.map((col) => ({
								id: createId("col"),
								label: col.label || "Column",
								type: col.type || "text",
							}))
						: base.columns,
			};
		}
		if (block.type === "chart") {
			return {
				...base,
				title: block.title || base.title,
			};
		}
		if (block.type === "kanban") {
			return {
				...base,
				columns:
					Array.isArray(block.columns) && block.columns.length
						? block.columns.map((col) => ({
								id: createId("col"),
								label: col.label || "Stage",
								cards: Array.isArray(col.cards) ? col.cards : ["Card"],
							}))
						: base.columns,
			};
		}
		return base;
	};

	const hydratePage = (raw) => {
		const template = ADMIN_PAGE_CATALOG.find((page) => page.id === raw.templateId);
		const label = raw.label || template?.label || raw.templateId;
		return {
			id: createId("page"),
			templateId: raw.templateId,
			label,
			icon: template?.icon || "FileText",
			section: template?.section || "Main",
			blocks: (raw.blocks || []).map((block) => hydrateBlock(block, label)),
			children: (raw.children || []).map(hydratePage),
		};
	};

	const pages = (form?.pages || []).map(hydratePage).filter((page) => page.templateId);
	return {
		name: form?.name || "AI CRM Admin",
		pages,
		source: form?.source,
		notice: form?.notice,
	};
}
