/** Read chart CSS variables set by the theme customizer. */
export function getChartColor(index = 1) {
	if (typeof window === "undefined") {
		return `hsl(var(--chart-${index}))`;
	}
	const value = getComputedStyle(document.documentElement)
		.getPropertyValue(`--chart-${index}`)
		.trim();
	return value ? `hsl(${value})` : `hsl(var(--chart-${index}))`;
}

export const CHART_MUTED = "hsl(var(--muted-foreground))";
