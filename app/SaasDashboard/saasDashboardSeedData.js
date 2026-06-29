export const ORGANIZATIONS = [
	{
		id: "org_acme",
		name: "Acme Corp",
		slug: "acme",
		plan: "Business",
		seats: 15,
		usedSeats: 11,
		mrr: 588,
		initials: "AC",
		color: "bg-blue-600",
	},
	{
		id: "org_nova",
		name: "Nova Labs",
		slug: "nova-labs",
		plan: "Pro",
		seats: 5,
		usedSeats: 4,
		mrr: 196,
		initials: "NL",
		color: "bg-violet-600",
	},
	{
		id: "org_stellar",
		name: "Stellar AI",
		slug: "stellar",
		plan: "Enterprise",
		seats: 50,
		usedSeats: 38,
		mrr: 2400,
		initials: "SA",
		color: "bg-emerald-600",
	},
];

export const ORG_ROLES = [
	{
		id: "owner",
		label: "Owner",
		description: "Full access including billing, danger zone, and org deletion",
	},
	{
		id: "admin",
		label: "Admin",
		description: "Manage members, seats, and integrations — no billing ownership transfer",
	},
	{
		id: "member",
		label: "Member",
		description: "Pipeline-first workspace — deals, tasks, and AI features",
	},
	{
		id: "viewer",
		label: "Viewer",
		description: "Read-only analytics and reports — no edits or AI runs",
	},
];

export const ORG_MEMBERS = [
	{
		id: "mem_1",
		name: "Sarah Chen",
		email: "sarah@acme.com",
		role: "owner",
		avatar: "./people/person-1.png",
		lastActive: "2026-06-27T10:30:00Z",
		status: "active",
	},
	{
		id: "mem_2",
		name: "Marcus Webb",
		email: "marcus@acme.com",
		role: "admin",
		avatar: "./people/person-2.png",
		lastActive: "2026-06-27T09:15:00Z",
		status: "active",
	},
	{
		id: "mem_3",
		name: "Elena Rodriguez",
		email: "elena@acme.com",
		role: "member",
		avatar: "./people/person-3.png",
		lastActive: "2026-06-26T18:42:00Z",
		status: "active",
	},
	{
		id: "mem_4",
		name: "James Park",
		email: "james@acme.com",
		role: "member",
		avatar: "./people/person-4.png",
		lastActive: "2026-06-27T08:00:00Z",
		status: "active",
	},
	{
		id: "mem_5",
		name: "Priya Sharma",
		email: "priya@acme.com",
		role: "viewer",
		avatar: "./people/person-5.png",
		lastActive: "2026-06-25T14:20:00Z",
		status: "active",
	},
	{
		id: "mem_6",
		name: "Alex Turner",
		email: "alex@startup.io",
		role: "member",
		avatar: null,
		lastActive: null,
		status: "pending",
	},
];

export const BILLING_PLANS = [
	{
		id: "starter",
		name: "Starter",
		pricePerSeat: 19,
		seats: 3,
		maxSeats: 5,
		features: ["5K AI tokens/mo", "Basic CRM", "Email support"],
	},
	{
		id: "pro",
		name: "Pro",
		pricePerSeat: 49,
		seats: 10,
		maxSeats: 25,
		features: ["50K AI tokens/mo", "Advanced analytics", "Priority support", "Webhooks"],
		current: false,
	},
	{
		id: "business",
		name: "Business",
		pricePerSeat: 49,
		seats: 15,
		maxSeats: 50,
		features: ["200K AI tokens/mo", "SSO", "Audit log", "Custom roles", "API access"],
		current: true,
	},
	{
		id: "enterprise",
		name: "Enterprise",
		pricePerSeat: 99,
		seats: 50,
		maxSeats: 500,
		features: ["Unlimited tokens", "Dedicated CSM", "SLA", "VPC deploy", "SCIM"],
	},
];

export const USAGE_METERS = {
	tokens: { used: 142_800, limit: 200_000, unit: "tokens", label: "AI tokens" },
	apiCalls: { used: 48_920, limit: 100_000, unit: "calls", label: "API calls" },
	storage: { used: 4.2, limit: 10, unit: "GB", label: "Storage" },
	seats: { used: 11, limit: 15, unit: "seats", label: "Seats" },
};

export const USAGE_DAILY = [
	{ date: "Jun 21", tokens: 18200, apiCalls: 6200, cost: 4.82 },
	{ date: "Jun 22", tokens: 22100, apiCalls: 7100, cost: 5.91 },
	{ date: "Jun 23", tokens: 19800, apiCalls: 6800, cost: 5.24 },
	{ date: "Jun 24", tokens: 25400, apiCalls: 8200, cost: 6.78 },
	{ date: "Jun 25", tokens: 20100, apiCalls: 6900, cost: 5.41 },
	{ date: "Jun 26", tokens: 18900, apiCalls: 6400, cost: 5.02 },
	{ date: "Jun 27", tokens: 18300, apiCalls: 6320, cost: 4.89 },
];

export const AI_COST_BY_USER = [
	{ user: "Sarah C.", tokens: 38400, cost: 12.4, runs: 142 },
	{ user: "Marcus W.", tokens: 31200, cost: 9.8, runs: 98 },
	{ user: "Elena R.", tokens: 28900, cost: 8.2, runs: 76 },
	{ user: "James P.", tokens: 24100, cost: 6.9, runs: 64 },
	{ user: "Priya S.", tokens: 8200, cost: 2.1, runs: 28 },
	{ user: "System", tokens: 12000, cost: 3.4, runs: 45 },
];

export const AI_COST_BY_FEATURE = [
	{ feature: "Lead enrichment", tokens: 42000, cost: 14.2, pct: 29 },
	{ feature: "Email drafting", tokens: 35800, cost: 11.8, pct: 25 },
	{ feature: "Deal scoring", tokens: 28400, cost: 8.4, pct: 20 },
	{ feature: "Support triage", tokens: 19200, cost: 5.9, pct: 13 },
	{ feature: "Report summary", tokens: 12400, cost: 3.8, pct: 9 },
	{ feature: "Other", tokens: 5000, cost: 1.5, pct: 4 },
];

export const MODEL_ROUTING_RULES = [
	{
		id: "rule_1",
		task: "Simple Q&A",
		complexity: "low",
		classifier: "token_count < 500",
		model: "gpt-4o-mini",
		provider: "openai",
		avgCost: 0.002,
		routePct: 42,
	},
	{
		id: "rule_2",
		task: "Lead enrichment",
		complexity: "medium",
		classifier: "requires_tools && entity_count <= 3",
		model: "claude-haiku-3.5",
		provider: "anthropic",
		avgCost: 0.008,
		routePct: 28,
	},
	{
		id: "rule_3",
		task: "Complex reasoning",
		complexity: "high",
		classifier: "chain_of_thought || multi_step",
		model: "gpt-4o",
		provider: "openai",
		avgCost: 0.034,
		routePct: 18,
	},
	{
		id: "rule_4",
		task: "Long context",
		complexity: "high",
		classifier: "context_tokens > 32k",
		model: "gemini-1.5-pro",
		provider: "gemini",
		avgCost: 0.028,
		routePct: 12,
	},
];

export const MODEL_OPTIONS = [
	{
		id: "gpt-4o",
		label: "GPT-4o",
		provider: "openai",
		inputPer1k: 0.005,
		outputPer1k: 0.015,
		context: "128K",
	},
	{
		id: "gpt-4o-mini",
		label: "GPT-4o Mini",
		provider: "openai",
		inputPer1k: 0.00015,
		outputPer1k: 0.0006,
		context: "128K",
	},
	{
		id: "claude-sonnet-4",
		label: "Claude Sonnet 4",
		provider: "anthropic",
		inputPer1k: 0.003,
		outputPer1k: 0.015,
		context: "200K",
	},
	{
		id: "claude-haiku-3.5",
		label: "Claude Haiku 3.5",
		provider: "anthropic",
		inputPer1k: 0.0008,
		outputPer1k: 0.004,
		context: "200K",
	},
	{
		id: "gemini-2.0-flash",
		label: "Gemini 2.0 Flash",
		provider: "gemini",
		inputPer1k: 0.0001,
		outputPer1k: 0.0004,
		context: "1M",
	},
];

export const PROMPT_PAIRS = [
	{
		id: "pv_a",
		version: "v4.1",
		label: "Current (production)",
		content: `You are an AI assistant for Acme Corp's CRM.
Route simple queries to lightweight models. Use tools for lead lookup.
Always include company context. Max 100 words unless asked for detail.
Respect token budget — summarize when approaching limits.`,
	},
	{
		id: "pv_b",
		version: "v4.0",
		label: "Previous",
		content: `You are an AI assistant for Acme Corp's CRM.
Use tools for lead lookup. Always include company context.
Max 150 words unless asked for detail.`,
	},
];

export const STREAM_DEMO_CHUNKS = [
	"Analyzing lead context for ",
	"**Acme Corp**",
	" — last activity 3 days ago.\n\n",
	"Based on firmographic data and engagement score (82/100), ",
	"I recommend a personalized follow-up emphasizing ",
	"the **Enterprise plan** trial they requested.\n\n",
	"Suggested next steps:\n",
	"1. Schedule demo with Marcus (decision maker)\n",
	"2. Send case study from similar SaaS vertical\n",
	"3. Offer extended 21-day trial\n\n",
	"*Draft email ready — 847 tokens used, $0.012 estimated cost.*",
];

export const MEMBER_PIPELINE_DEALS = [
	{ id: "d1", name: "Acme Enterprise", stage: "Proposal", value: 48000, probability: 65 },
	{ id: "d2", name: "Nova Labs Pro", stage: "Discovery", value: 12000, probability: 40 },
	{ id: "d3", name: "Stellar AI Pilot", stage: "Negotiation", value: 96000, probability: 80 },
	{ id: "d4", name: "BrightPath Starter", stage: "Qualified", value: 5800, probability: 25 },
];

export const VIEWER_ANALYTICS = {
	mrr: 588,
	growth: 8.4,
	activeUsers: 9,
	aiRuns: 453,
	avgCostPerRun: 0.089,
};

export const STRIPE_PORTAL_SECTIONS = [
	{ id: "subscription", label: "Current subscription", value: "Business · 15 seats · $735/mo" },
	{ id: "payment", label: "Payment method", value: "Visa ···· 4242 · Exp 09/27" },
	{ id: "invoices", label: "Latest invoice", value: "INV-2026-06 · $735.00 · Paid Jun 1" },
	{ id: "usage", label: "Usage this period", value: "142.8K / 200K AI tokens" },
];
