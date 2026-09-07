export const AGENCY_THEME_KEY = "crm-agency-theme";

export const CONTACT = {
	email: "shreyvijayvargiya26@gmail.com",
	calcom: "https://cal.com/shrey-vijayvargiya",
	x: "https://x.com/treyvijay",
	xHandle: "@treyvijay",
	linkedin: "https://www.linkedin.com/in/shreyvijayvargiya",
	whatsapp: "+91 7030226230",
};

export const CHECKOUT = {
	usd: "https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template",
	inr: "https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX",
};

/** Prompt for Ask AI / Copy CTAs — paste into any LLM or open via Ask AI dropdown. */
export const LLM_SHARE_PROMPT = `Visit https://saascrm.site and evaluate SaaSCRM — a Next.js CRM / Admin / CMS frontend template with 60+ screens, agentic AI chatbot, theme customizer, and production-ready UI (React, Tailwind, shadcn/ui).

Summarize:
1. What it offers for startups, agencies, and indie hackers
2. How the free AI CRM Builder (/blueprint) helps plan a CRM in 2 minutes
3. Whether the $49 template is worth buying for shipping an admin dashboard quickly
4. Suggested next steps to customize it for my business

Be specific and practical.`;

/** Opens ChatGPT with the prompt filled (and typically auto-sent) via ?q=. */
export function getChatGptAskUrl(prompt = LLM_SHARE_PROMPT) {
	return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}

/**
 * “Ask AI” destinations for LlmShareActions dropdown.
 * `copyFirst: true` copies the prompt then opens a blank chat (Claude has no reliable ?q=).
 */
export function getLlmAskTargets(prompt = LLM_SHARE_PROMPT) {
	const q = encodeURIComponent(prompt);
	return [
		{
			id: "chatgpt",
			label: "Ask ChatGPT",
			href: `https://chatgpt.com/?q=${q}`,
			copyFirst: false,
		},
		{
			id: "claude",
			label: "Ask Claude",
			href: "https://claude.ai/new",
			copyFirst: true,
		},
		{
			id: "perplexity",
			label: "Ask Perplexity",
			href: `https://www.perplexity.ai/search/new?q=${q}`,
			copyFirst: false,
		},
		{
			id: "gemini",
			label: "Ask Gemini",
			href: `https://gemini.google.com/app?q=${q}`,
			copyFirst: false,
		},
		{
			id: "grok",
			label: "Ask Grok",
			href: `https://x.com/i/grok?text=${q}`,
			copyFirst: false,
		},
	];
}

/** Sibling CRM templates — landing page “check our other templates” grid. */
export const OTHER_TEMPLATES = [
	{
		id: "inkgest",
		name: "CRM Template",
		tagline: "Indie SaaS admin — MRR, subscribers, billing",
		image: "/inkgest-crm.png",
		imageAlt: "Inkgest CRM template dashboard preview",
		demoUrl: "https://crm-template.buildsaas.dev/",
		gumroadUrl: "https://shreyvijayvargiya.gumroad.com/l/inkgest-saas-admin-template",
	},
	{
		id: "freelancer",
		name: "Freelancer CRM",
		tagline: "Clients, projects, invoices for freelancers",
		image: "/freelance-crm.png",
		imageAlt: "Freelancer CRM template preview",
		demoUrl: "https://freelance-crm-template.buildsaas.dev/",
		gumroadUrl: "https://shreyvijayvargiya.gumroad.com/l/freelancer-crm-template",
	},
	{
		id: "real-estate",
		name: "Real Estate CRM",
		tagline: "EstateOS — listings, leads, and closings",
		image: "/real-estate-crm.png",
		imageAlt: "Real Estate CRM template preview",
		demoUrl: "https://realestate-crm-template.buildsaas.dev/",
		gumroadUrl:
			"https://shreyvijayvargiya.gumroad.com/l/estate-os-real-estate-crm-template",
	},
];

export const AI_BUILD_PROMPTS = [
	{
		category: "New CRM module",
		icon: "LayoutDashboard",
		prompt:
			"Add a Quotes page like Invoices with KPI cards, filters, a table, and create/edit modal.",
		result: "Route, app module, navigation, demo data, and theme-ready UI",
		tags: ["Thin route", "shadcn table", "Seed data"],
		accent: {
			light: "border-blue-200 bg-blue-50 text-blue-600",
			dark: "border-blue-500/30 bg-blue-500/10 text-blue-400",
		},
	},
	{
		category: "Record detail",
		icon: "ContactRound",
		prompt:
			"Create a customer success detail page with health score, renewals, tickets, notes, and activity tabs.",
		result: "Consistent profile shell, related records, tabs, and empty states",
		tags: ["Detail shell", "CRM tabs", "Responsive"],
		accent: {
			light: "border-violet-200 bg-violet-50 text-violet-600",
			dark: "border-violet-500/30 bg-violet-500/10 text-violet-400",
		},
	},
	{
		category: "Brand & UI",
		icon: "Palette",
		prompt:
			"Rebrand the CRM for a recruiting SaaS while keeping dark mode and the live theme customizer working.",
		result: "Token-based colors, existing shadcn variants, and matching app chrome",
		tags: ["Design.md", "Theme tokens", "No hardcoding"],
		accent: {
			light: "border-pink-200 bg-pink-50 text-pink-600",
			dark: "border-pink-500/30 bg-pink-500/10 text-pink-400",
		},
	},
	{
		category: "Advanced workflow",
		icon: "Workflow",
		prompt:
			"Build a CRM automation page with trigger and action steps using the existing campaign builder patterns.",
		result: "A focused frontend workflow that reuses proven project components",
		tags: ["Reuse patterns", "Frontend only", "Toast feedback"],
		accent: {
			light: "border-emerald-200 bg-emerald-50 text-emerald-600",
			dark: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
		},
	},
];

export const PRICING_TIERS = [
	{
		id: "template",
		name: "CRM Template",
		tagline: "Ship your CRM UI in days, not months",
		priceUsd: "$49",
		priceInr: "₹920+",
		period: "one-time · lifetime updates",
		featured: false,
		cta: "Buy template",
		pointerTitle: "Buy template (USD)",
		pointerColor: "#3b82f6",
		checkoutUsd: CHECKOUT.usd,
		checkoutInr: CHECKOUT.inr,
		image:
			"https://ovevcjixqq.ufs.sh/f/9pIU2Of3sxTfU9NP1Drb7rxhdGYe1SLHVu92gAbfPX6ytMjc",
		features: [
			"60+ production CRM screens",
			"Next.js · React · Tailwind · shadcn/ui",
			"Agentic AI chatbot with OpenRouter + tool-calling",
			"Marketing landing + lead capture API",
			"Zod schemas + Drizzle SQL reference",
			"6 months priority email support",
			"MIT license for commercial use",
		],
	},
	{
		id: "template-figma",
		name: "Template + Figma",
		tagline: "Design system handoff included",
		priceUsd: "$79",
		priceInr: "Via Dodo link",
		period: "one-time",
		featured: true,
		cta: "Get template + Figma",
		pointerTitle: "Get template + Figma",
		pointerColor: "#a855f7",
		checkoutUsd: CHECKOUT.usd,
		checkoutInr: CHECKOUT.inr,
		image:
			"https://ovevcjixqq.ufs.sh/f/9pIU2Of3sxTf0oTGf0ItJ0bOPyYln79LjfwsKrFWgTAe4Emd",
		features: [
			"Everything in CRM Template",
			"Figma component kit (request via receipt)",
			"Matching tokens, spacing & typography",
			"Faster white-label rebranding",
		],
	},
	{
		id: "custom-build",
		name: "Custom CRM Build",
		tagline: "We build & deploy for your startup or agency",
		priceUsd: "From $2,000",
		priceInr: "Custom quote",
		period: "project-based",
		featured: false,
		cta: "Book a call",
		pointerTitle: "Book a call",
		pointerColor: "#14b8a6",
		href: "/contact",
		features: [
			"Template as foundation — tailored to your workflow",
			"Custom modules, branding & API integration",
			"Auth, billing & multi-tenant when you need it",
			"Handoff docs + optional retainer support",
			"Ideal for startups & mid-size agencies",
		],
	},
];

export const FAQ_ITEMS = [
	{
		q: "What do I get when I buy the template?",
		a: "Full React + Next.js source code, 60+ CRM screens with demo data, shadcn/ui components, marketing landing, agentic AI chatbot (OpenRouter + tool-calling), theme customizer, Zod schemas, Design.md, and lifetime updates.",
	},
	{
		q: "Can I use this in commercial client projects?",
		a: "Yes. The template ships with an MIT license — use it in your own SaaS, client work, or agency deliverables. Team or white-label licensing is available on request.",
	},
	{
		q: "Do you build custom CRMs for startups?",
		a: "Yes. We use this template as a battle-tested foundation and extend it with your data model, branding, integrations, and deployment. Book a call via the contact page to scope timeline and budget.",
	},
	{
		q: "What's the difference between USD and INR checkout?",
		a: "Same source ZIP and lifetime updates. Gumroad (USD) accepts card and PayPal. Dodo (INR) supports UPI, cards, and net banking for India-based buyers.",
	},
	{
		q: "Is there a live demo before I buy?",
		a: "Yes — open the Demo tab in the top nav or visit /demo to explore the full interactive CRM, including the AI chatbot sidebar: ask questions, create records, and see live UI updates.",
	},
	{
		q: "How do I get the Figma files?",
		a: "Purchase Template + Figma ($79 on Gumroad) or the INR listing, then email your receipt to shreyvijayvargiya26@gmail.com for Figma access.",
	},
	{
		q: "What stack does the template use?",
		a: "Next.js 12, React 17, Tailwind CSS 3.4, shadcn/ui (Radix), Recharts, Framer Motion, TanStack Table, Zod, and i18n-ready structure.",
	},
	{
		q: "Do you offer support after purchase?",
		a: "Six months of priority email support for bugs and setup questions. Custom build clients get a dedicated handoff and optional retainer.",
	},
	{
		q: "Do you have an agency CRM for leads, clients, projects, and invoices?",
		a: "Yes. SaaSCRM ships agency client management software — leads, pipeline, projects, and invoices in one Next.js kit. Read https://saascrm.site/blog/agency-crm and demo https://saascrm.site/templates/agency.",
	},
	{
		q: "Can I migrate Excel or Google Sheets into a CRM?",
		a: "Yes. Audit, clean, and map the spreadsheet first, then import a test batch. Read https://saascrm.site/blog/excel-to-crm-migration and plan the entities with https://saascrm.site/blueprint.",
	},
	{
		q: "Where can I read more CRM guides from SaaSCRM?",
		a: "The blog is at https://saascrm.site/blog. Start with https://saascrm.site/blog/free-crm-and-top-crm-directory, https://saascrm.site/blog/excel-to-crm-migration, https://saascrm.site/blog/best-crm-for-small-businesses-and-startups, https://saascrm.site/blog/why-your-business-needs-a-crm, https://saascrm.site/blog/six-crm-templates-you-can-demo-today, and https://saascrm.site/blog/plan-your-crm-in-2-minutes-with-ai-builder.",
	},
];

export const HOME_FEATURES = [
	{
		title: "60+ CRM screens",
		icon: "LayoutDashboard",
		iconClass: {
			light: "border-blue-200 bg-blue-50 text-blue-600",
			dark: "border-blue-500/30 bg-blue-500/10 text-blue-400",
		},
		desc: "Leads, pipeline, deals, finance, dev tools — structured like a real SaaS product, not empty placeholders.",
	},
	{
		title: "Agency-ready foundation",
		icon: "Building2",
		iconClass: {
			light: "border-violet-200 bg-violet-50 text-violet-600",
			dark: "border-violet-500/30 bg-violet-500/10 text-violet-400",
		},
		desc: "Sell the template to clients or let us extend it — same codebase, faster delivery for startups and mid-size teams.",
	},
	{
		title: "Agentic AI chatbot",
		icon: "Bot",
		iconClass: {
			light: "border-violet-200 bg-violet-50 text-violet-600",
			dark: "border-violet-500/30 bg-violet-500/10 text-violet-400",
		},
		desc: "First agentic CRM copilot — ask questions, research accounts, create invoices, and mutate live data via OpenRouter tool-calling.",
	},
	{
		title: "Theme & i18n",
		icon: "Palette",
		iconClass: {
			light: "border-pink-200 bg-pink-50 text-pink-600",
			dark: "border-pink-500/30 bg-pink-500/10 text-pink-400",
		},
		desc: "Live theme customizer, dark mode, accent schemes, and translation-ready structure out of the box.",
	},
	{
		title: "Charts & analytics",
		icon: "BarChart3",
		iconClass: {
			light: "border-amber-200 bg-amber-50 text-amber-600",
			dark: "border-amber-500/30 bg-amber-500/10 text-amber-400",
		},
		desc: "Recharts dashboards so your demo feels operational — not a static mockup.",
	},
	{
		title: "Auth & operations",
		icon: "ShieldCheck",
		iconClass: {
			light: "border-teal-200 bg-teal-50 text-teal-600",
			dark: "border-teal-500/30 bg-teal-500/10 text-teal-400",
		},
		desc: "Login flows, teams, email UI, tasks, calendar, notifications, and integrations pages your buyers expect.",
	},
];

export const SERVICES = [
	{
		title: "Buy the template",
		desc: "Self-serve license with lifetime updates. Rebrand, connect your API, deploy.",
		cta: "View pricing",
		href: "/pricing",
		pointerTitle: "View pricing",
		pointerColor: "#3b82f6",
		image:
			"https://ovevcjixqq.ufs.sh/f/9pIU2Of3sxTfU9NP1Drb7rxhdGYe1SLHVu92gAbfPX6ytMjc",
	},
	{
		title: "We build your CRM",
		desc: "Custom modules, integrations, and deployment for startups and agencies who want it done.",
		cta: "Start a project",
		href: "/contact",
		pointerTitle: "Start a project",
		pointerColor: "#14b8a6",
		image:
			"https://ovevcjixqq.ufs.sh/f/9pIU2Of3sxTf0oTGf0ItJ0bOPyYln79LjfwsKrFWgTAe4Emd",
	},
	{
		title: "Explore the demo",
		desc: "Walk through every screen before you commit — full interactive app, real navigation.",
		cta: "Open demo",
		href: "/demo",
		pointerTitle: "Open demo",
		pointerColor: "#a855f7",
		image:
			"https://ovevcjixqq.ufs.sh/f/9pIU2Of3sxTfU9NP1Drb7rxhdGYe1SLHVu92gAbfPX6ytMjc",
	},
];
