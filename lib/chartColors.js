/** Live chart colors — always reference :root tokens so customizer updates apply. */
export function getChartColor(index = 1) {
	const n = Math.min(5, Math.max(1, Number(index) || 1));
	return `hsl(var(--chart-${n}))`;
}

export const CHART_COLORS = [
	"hsl(var(--chart-1))",
	"hsl(var(--chart-2))",
	"hsl(var(--chart-3))",
	"hsl(var(--chart-4))",
	"hsl(var(--chart-5))",
];

export const CHART_MUTED = "hsl(var(--muted-foreground))";
export const CHART_GRID = "hsl(var(--border))";
export const CHART_AXIS = "hsl(var(--muted-foreground))";
