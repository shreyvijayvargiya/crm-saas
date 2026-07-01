export const AGENCY_THEME_KEY = "crm-agency-theme";

export const CONTACT = {
	email: "shreyvijayvargiya26@gmail.com",
	calcom: "https://cal.com/shrey-vijayvargiya",
	x: "https://x.com/treyvijay",
	xHandle: "@treyvijay",
	linkedin: "https://www.linkedin.com/in/shreyvijayvargiya",
};

export const CHECKOUT = {
	usd: "https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template",
	inr: "https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX",
};

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
		checkoutUsd: CHECKOUT.usd,
		checkoutInr: CHECKOUT.inr,
		features: [
			"60+ production CRM screens",
			"Next.js · React · Tailwind · shadcn/ui",
			"AI assistant, Agent Ops & SaaS dashboard modules",
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
		checkoutUsd: CHECKOUT.usd,
		checkoutInr: CHECKOUT.inr,
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
		a: "Full React + Next.js source code, 60+ CRM screens with demo data, shadcn/ui components, marketing landing, AI assistant shell, Agent Ops & SaaS dashboard modules, theme customizer, Zod schemas, Design.md, and lifetime updates.",
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
		a: "Yes — open the Demo tab in the bottom nav or visit /demo to explore the full interactive CRM: leads, pipeline, finance, developer tools, and more.",
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
];

export const HOME_FEATURES = [
	{
		title: "60+ CRM screens",
		desc: "Leads, pipeline, deals, finance, dev tools — structured like a real SaaS product, not empty placeholders.",
	},
	{
		title: "Agency-ready foundation",
		desc: "Sell the template to clients or let us extend it — same codebase, faster delivery for startups and mid-size teams.",
	},
	{
		title: "AI & platform modules",
		desc: "Copilot shell, Agent Ops observability, and SaaS billing dashboard included for credible demos.",
	},
	{
		title: "Theme & i18n",
		desc: "Live theme customizer, dark mode, accent schemes, and translation-ready structure out of the box.",
	},
	{
		title: "Charts & analytics",
		desc: "Recharts dashboards so your demo feels operational — not a static mockup.",
	},
	{
		title: "Auth & operations",
		desc: "Login flows, teams, email UI, tasks, calendar, notifications, and integrations pages your buyers expect.",
	},
];

export const SERVICES = [
	{
		title: "Buy the template",
		desc: "Self-serve license with lifetime updates. Rebrand, connect your API, deploy.",
		cta: "View pricing",
		href: "/pricing",
	},
	{
		title: "We build your CRM",
		desc: "Custom modules, integrations, and deployment for startups and agencies who want it done.",
		cta: "Start a project",
		href: "/contact",
	},
	{
		title: "Explore the demo",
		desc: "Walk through every screen before you commit — full interactive app, real navigation.",
		cta: "Open demo",
		href: "/demo",
	},
];
