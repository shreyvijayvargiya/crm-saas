/** Mock report datasets — swap for API responses */

export const RANGE_LABELS = {
	"7d": "Last 7 days",
	"30d": "Last 30 days",
	"90d": "Last 90 days",
	qtd: "Quarter to date",
	ytd: "Year to date",
	custom: "Custom range",
};

const FORECAST_BASE = [
	{ period: "Jan", actual: 92, forecast: 88, target: 95 },
	{ period: "Feb", actual: 98, forecast: 96, target: 98 },
	{ period: "Mar", actual: 105, forecast: 102, target: 102 },
	{ period: "Apr", actual: 112, forecast: 110, target: 108 },
	{ period: "May", actual: 118, forecast: 115, target: 115 },
	{ period: "Jun", actual: 124, forecast: 122, target: 120 },
];

const SOURCE_BASE = [
	{ name: "Website / organic", value: 342 },
	{ name: "Paid search", value: 186 },
	{ name: "Referral & partner", value: 218 },
	{ name: "LinkedIn outbound", value: 156 },
	{ name: "Events & webinars", value: 124 },
	{ name: "Other", value: 74 },
];

const REP_BASE = [
	{ name: "Alex Chen", deals: 14, pipeline: 420000, revenue: 380000, winRate: 34, avgDeal: 27100, activities: 128 },
	{ name: "Sam Rivera", deals: 11, pipeline: 310000, revenue: 298000, winRate: 29, avgDeal: 27100, activities: 102 },
	{ name: "Jordan Lee", deals: 9, pipeline: 265000, revenue: 241000, winRate: 27, avgDeal: 26800, activities: 96 },
	{ name: "Morgan Patel", deals: 12, pipeline: 355000, revenue: 312000, winRate: 31, avgDeal: 26000, activities: 115 },
	{ name: "Casey Kim", deals: 8, pipeline: 198000, revenue: 176000, winRate: 25, avgDeal: 22000, activities: 88 },
	{ name: "Riley Brooks", deals: 7, pipeline: 172000, revenue: 154000, winRate: 24, avgDeal: 22000, activities: 79 },
];

function scale(n, factor) {
	return Math.round(n * factor);
}

/** Slight variation by preset so the UI feels reactive (demo only) */
export function getForecastSeries(preset) {
	const f =
		preset === "7d"
			? 0.28
			: preset === "30d"
			? 0.55
			: preset === "90d"
			? 0.82
			: preset === "qtd"
			? 0.92
			: 1;
	return FORECAST_BASE.map((row) => ({
		...row,
		actual: scale(row.actual, f),
		forecast: scale(row.forecast, f),
		target: scale(row.target, f),
	}));
}

export function getLeadSources(preset) {
	const bump = preset === "ytd" ? 1.08 : preset === "7d" ? 0.85 : 1;
	return SOURCE_BASE.map((row) => ({
		...row,
		value: Math.round(row.value * bump),
	}));
}

export function getRepPerformance(preset) {
	const bump = preset === "qtd" ? 0.92 : preset === "7d" ? 0.72 : 1;
	return REP_BASE.map((row) => ({
		...row,
		deals: Math.max(1, Math.round(row.deals * bump)),
		pipeline: Math.round(row.pipeline * bump),
		revenue: Math.round(row.revenue * bump),
		activities: Math.round(row.activities * bump),
	}));
}

export function getFunnelSteps(preset) {
	const f =
		preset === "7d"
			? 0.15
			: preset === "30d"
			? 0.42
			: preset === "90d"
			? 0.78
			: 1;
	const base = [
		{ label: "Inbound leads", count: 1240 },
		{ label: "Qualified (MQL/SQL)", count: 720 },
		{ label: "Opportunity created", count: 410 },
		{ label: "Proposal / pricing", count: 186 },
		{ label: "Closed won", count: 62 },
	];
	const scaled = base.map((row) => ({
		...row,
		count: Math.max(1, Math.round(row.count * f)),
	}));
	const top = scaled[0].count;
	return scaled.map((row) => ({
		...row,
		pct: Math.round((row.count / top) * 100),
	}));
}

export function getExecutiveKpis(preset) {
	const f =
		preset === "7d"
			? 0.12
			: preset === "30d"
			? 0.35
			: preset === "90d"
			? 0.72
			: preset === "qtd"
			? 0.88
			: 1;
	return {
		totalRevenue: Math.round(1_661_000 * f),
		pipeline: Math.round(2_840_000 * f),
		newLeads: Math.round(428 * f),
		forecastAccuracy: preset === "7d" ? 94.2 : preset === "30d" ? 91.5 : 89.8,
	};
}
