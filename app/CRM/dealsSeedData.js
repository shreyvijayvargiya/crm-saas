/** Shared deal seed data — used by Deals list, Pipelines, and detail lookups. */

export const STAGE_META = {
	prospect: {
		label: "Prospect",
		className:
			"bg-sky-500/12 text-sky-800 dark:text-sky-200 border-sky-500/20",
	},
	qualified: {
		label: "Qualified",
		className:
			"bg-blue-500/12 text-blue-800 dark:text-blue-200 border-blue-500/20",
	},
	proposal: {
		label: "Proposal",
		className:
			"bg-amber-500/12 text-amber-900 dark:text-amber-100 border-amber-500/20",
	},
	won: {
		label: "Won",
		className:
			"bg-emerald-500/12 text-emerald-900 dark:text-emerald-100 border-emerald-500/20",
	},
	lost: {
		label: "Lost",
		className:
			"bg-rose-500/12 text-rose-900 dark:text-rose-100 border-rose-500/20",
	},
};

export const INITIAL_DEALS = [
	{
		id: "d1",
		name: "Northwind expansion",
		company: "Northwind Ltd",
		value: 42000,
		stage: "qualified",
		closeDate: "Apr 28, 2026",
		rep: "Alex Chen",
	},
	{
		id: "d2",
		name: "API enterprise tier",
		company: "Cloud Corp",
		value: 89000,
		stage: "prospect",
		closeDate: "May 15, 2026",
		rep: "Sam Rivera",
	},
	{
		id: "d3",
		name: "Retail rollout",
		company: "ShopCo",
		value: 120000,
		stage: "qualified",
		closeDate: "Jun 1, 2026",
		rep: "Jordan Lee",
	},
	{
		id: "d4",
		name: "Manufacturing pilot",
		company: "Fabrikam",
		value: 54000,
		stage: "prospect",
		closeDate: "Jul 10, 2026",
		rep: "Mia Patel",
	},
	{
		id: "d5",
		name: "FinTech integration",
		company: "Stripe-ish",
		value: 210000,
		stage: "proposal",
		closeDate: "May 30, 2026",
		rep: "Alex Chen",
	},
	{
		id: "d6",
		name: "Healthcare RFP",
		company: "Medline",
		value: 175000,
		stage: "proposal",
		closeDate: "Jun 20, 2026",
		rep: "Sam Rivera",
	},
	{
		id: "d7",
		name: "Logistics Q4",
		company: "FastShip",
		value: 67000,
		stage: "won",
		closeDate: "Apr 9, 2026",
		rep: "Jordan Lee",
	},
	{
		id: "d8",
		name: "Startup pilot",
		company: "TinyApps",
		value: 8000,
		stage: "lost",
		closeDate: "Apr 8, 2026",
		rep: "Mia Patel",
	},
	{
		id: "d9",
		name: "Enterprise FY26",
		company: "Cloud Corp",
		value: 48000,
		stage: "qualified",
		closeDate: "Jun 30, 2026",
		rep: "Alex Chen",
	},
	{
		id: "d10",
		name: "Agency retainer Q3",
		company: "Agency Co.",
		value: 18000,
		stage: "prospect",
		closeDate: "Aug 1, 2026",
		rep: "Alex Chen",
	},
];

export function findDealSeed(id) {
	return INITIAL_DEALS.find((d) => d.id === String(id)) || null;
}
