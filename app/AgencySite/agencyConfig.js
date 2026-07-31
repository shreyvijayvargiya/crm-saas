export const AGENCY_THEME_KEY = "componentry-theme";

export const PRODUCT = {
	name: "Componentry",
	tagline: "Sellable UI motion components for Next.js",
	description:
		"A growing library of polished hero and interaction components. Browse live demos, search with ⌘K, buy the kit.",
};

export const CONTACT = {
	email: "shreyvijayvargiya26@gmail.com",
	calcom: "https://cal.com/shrey-vijayvargiya",
	x: "https://x.com/treyvijay",
	xHandle: "@treyvijay",
	linkedin: "https://www.linkedin.com/in/shreyvijayvargiya",
	whatsapp: "+91 7030226230",
};

/** Update these when you publish the Componentry Gumroad / Dodo products */
export const CHECKOUT = {
	usd: "https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template",
	inr: "https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX",
	priceLabel: "$49",
};

export const LLM_SHARE_PROMPT = `Visit this Componentry landing page — a Next.js UI component kit with live motion demos (flipbook, iPhone, narrator voice, scroll heroes, and more). Search components with ⌘K and deep-link via ?c=id.

Summarize what the kit offers for designers and indie founders, and whether buying it is worth it to ship polished marketing heroes quickly.`;

export function getChatGptAskUrl(prompt = LLM_SHARE_PROMPT) {
	return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}

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
