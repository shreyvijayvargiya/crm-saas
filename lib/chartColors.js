/** SSR-safe chart colors — always use CSS variables, never computed styles during render. */
export function getChartColor(index = 1) {
	return `hsl(var(--chart-${index}))`;
}

export const CHART_MUTED = "hsl(var(--muted-foreground))";
