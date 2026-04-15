import { useMemo } from "react";
import { useTheme } from "./useTheme";

/**
 * Recharts <Tooltip /> props that respect light/dark theme (avoids white box in dark mode).
 */
export function useChartTooltipProps() {
	const { theme } = useTheme();
	return useMemo(() => {
		const isDark = theme === "dark";
		return {
			contentStyle: {
				backgroundColor: isDark ? "#18181b" : "#ffffff",
				border: `1px solid ${isDark ? "#3f3f46" : "#e4e4e7"}`,
				borderRadius: "8px",
				boxShadow: isDark
					? "0 10px 15px -3px rgb(0 0 0 / 0.45)"
					: "0 4px 6px -1px rgb(0 0 0 / 0.08)",
			},
			labelStyle: {
				color: isDark ? "#a1a1aa" : "#71717a",
				fontSize: 12,
				fontWeight: 500,
				marginBottom: 4,
			},
			itemStyle: {
				color: isDark ? "#fafafa" : "#18181b",
				fontSize: 12,
			},
			wrapperStyle: { outline: "none" },
		};
	}, [theme]);
}
