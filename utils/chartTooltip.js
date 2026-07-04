/**
 * Recharts <Tooltip /> props wired to shadcn :root tokens
 * (background, border, foreground, shadow) so customizer updates apply.
 */
export function useChartTooltipProps() {
	return {
		contentStyle: {
			backgroundColor: "hsl(var(--popover))",
			border: "1px solid hsl(var(--border))",
			borderRadius: "var(--radius)",
			boxShadow: "var(--shadow-elevation)",
			color: "hsl(var(--popover-foreground))",
		},
		labelStyle: {
			color: "hsl(var(--muted-foreground))",
			fontSize: 12,
			fontWeight: 500,
			marginBottom: 4,
		},
		itemStyle: {
			color: "hsl(var(--popover-foreground))",
			fontSize: 12,
		},
		wrapperStyle: { outline: "none" },
	};
}
