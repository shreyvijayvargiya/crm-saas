/** Shared company seed data — used by Companies list and detail lookups. */

export function companySlug(name) {
	return String(name)
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

export const INITIAL_COMPANIES = [
	{
		id: "hubspot",
		name: "HubSpot",
		owner: "Alice Johnson",
		logo: "./companies/hubspot.png",
		industry: "Technology",
		rating: 4.5,
		location: "New York",
	},
	{
		id: "slack",
		name: "Slack",
		owner: "Bob Brown",
		logo: "./companies/slack.png",
		industry: "Communication",
		rating: 4.0,
		location: "San Francisco",
	},
	{
		id: "stripe",
		name: "Stripe",
		owner: "Charlie Smith",
		logo: "./companies/stripe.png",
		industry: "Finance",
		rating: 4.8,
		location: "Los Angeles",
	},
	{
		id: "tiktok",
		name: "TikTok",
		owner: "David Wilson",
		logo: "./companies/tiktok.png",
		industry: "Entertainment",
		rating: 4.7,
		location: "Los Angeles",
	},
	{
		id: "zendesk",
		name: "Zendesk",
		owner: "Eve Davis",
		logo: "./companies/zendesk.png",
		industry: "Customer Service",
		rating: 4.6,
		location: "Chicago",
	},
	{
		id: "zapier",
		name: "Zapier",
		owner: "Frank Miller",
		logo: "./companies/slack.png",
		industry: "Automation",
		rating: 4.9,
		location: "Austin",
	},
	{
		id: "airbnb",
		name: "Airbnb",
		owner: "Grace Lee",
		logo: "./companies/slack.png",
		industry: "Hospitality",
		rating: 4.5,
		location: "San Francisco",
	},
	{
		id: "spotify",
		name: "Spotify",
		owner: "Henry Adams",
		logo: "./companies/hubspot.png",
		industry: "Music",
		rating: 4.8,
		location: "Stockholm",
	},
	{
		id: "linkedin",
		name: "LinkedIn",
		owner: "Ivy Green",
		logo: "./companies/zendesk.png",
		industry: "Social Media",
		rating: 4.3,
		location: "Sunnyvale",
	},
	{
		id: "adobe",
		name: "Adobe",
		owner: "Jack White",
		logo: "./companies/stripe.png",
		industry: "Software",
		rating: 4.6,
		location: "San Jose",
	},
	{
		id: "netflix",
		name: "Netflix",
		owner: "Kathy Brown",
		logo: "./companies/tiktok.png",
		industry: "Entertainment",
		rating: 4.7,
		location: "Los Gatos",
	},
];

export function findCompanySeed(id) {
	return INITIAL_COMPANIES.find((c) => c.id === String(id)) || null;
}
