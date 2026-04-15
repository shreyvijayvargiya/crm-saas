import React from "react";
import {
	ComposedChart,
	Area,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ReferenceLine,
} from "recharts";
import { TrendingUp } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { useChartTooltipProps } from "../../../utils/chartTooltip";

const RevenueForecastSection = ({ data, rangeLabel }) => {
	const { theme, colors, scheme } = useTheme();
	const tooltipProps = useChartTooltipProps();
	const gridStroke = theme === "dark" ? "#3f3f46" : "#e4e4e7";
	const axisColor = theme === "dark" ? "#a1a1aa" : "#71717a";

	const last = data?.length ? data[data.length - 1] : null;
	const prev = data?.length > 1 ? data[data.length - 2] : null;
	const growth =
		last && prev && prev.actual
			? (((last.actual - prev.actual) / prev.actual) * 100).toFixed(1)
			: "0";
	const avgActual =
		data?.length > 0 ? data.reduce((s, d) => s + d.actual, 0) / data.length : 0;

	return (
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-5 md:p-6`}
		>
			<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
				<div>
					<div className="flex items-center gap-2">
						<span className={`p-2 rounded-xl ${scheme.primary} ${scheme.primaryForeground}`}>
							<TrendingUp className="w-4 h-4" />
						</span>
						<div>
							<h2 className={`text-lg font-semibold ${colors.foreground}`}>Revenue forecast</h2>
							<p className={`text-sm ${colors.textSecondary}`}>
								Actuals vs model — {rangeLabel}
							</p>
						</div>
					</div>
				</div>
				<div className="flex gap-6 text-right">
					<div>
						<p className={`text-xs uppercase tracking-wide ${colors.mutedForeground}`}>Latest actual</p>
						<p className={`text-xl font-bold tabular-nums ${colors.foreground}`}>
							{last?.actual != null ? `$${last.actual}k` : "—"}
						</p>
					</div>
					<div>
						<p className={`text-xs uppercase tracking-wide ${colors.mutedForeground}`}>MoM</p>
						<p className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
							+{growth}%
						</p>
					</div>
				</div>
			</div>
			<div className="h-[320px] w-full">
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
						<defs>
							<linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
								<stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
						<XAxis
							dataKey="period"
							tick={{ fill: axisColor, fontSize: 11 }}
							tickLine={false}
							axisLine={false}
						/>
						<YAxis
							tick={{ fill: axisColor, fontSize: 11 }}
							tickLine={false}
							axisLine={false}
							tickFormatter={(v) => `$${v}k`}
						/>
						<Tooltip {...tooltipProps} formatter={(val) => [`$${val}k`, ""]} />
						<Legend wrapperStyle={{ fontSize: "12px" }} />
						<ReferenceLine
							y={avgActual}
							stroke={theme === "dark" ? "#52525b" : "#d4d4d8"}
							strokeDasharray="4 4"
							label={{
								value: "Avg",
								position: "insideTopRight",
								fill: axisColor,
								fontSize: 10,
							}}
						/>
						<Area
							type="monotone"
							dataKey="actual"
							name="Actual revenue"
							stroke="#2563eb"
							strokeWidth={2}
							fill="url(#actualFill)"
						/>
						<Line
							type="monotone"
							dataKey="forecast"
							name="Forecast"
							stroke="#a855f7"
							strokeWidth={2}
							dot={{ r: 3 }}
						/>
						<Line
							type="monotone"
							dataKey="target"
							name="Quota target"
							stroke="#22c55e"
							strokeWidth={1.5}
							strokeDasharray="5 5"
							dot={false}
						/>
					</ComposedChart>
				</ResponsiveContainer>
			</div>
			<p className={`text-xs mt-3 ${colors.mutedForeground}`}>
				Forecast uses trailing pipeline coverage and seasonality — connect your warehouse to replace mock series.
			</p>
		</div>
	);
};

export default RevenueForecastSection;
