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
	ReferenceLine,
} from "recharts";
import { ResponsiveContainer } from "@/components/ui/responsive-chart";
import { TrendingUp } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { useChartTooltipProps } from "../../../utils/chartTooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getChartColor, CHART_MUTED } from "@/lib/chartColors";

const RevenueForecastSection = ({ data, rangeLabel }) => {
	const { colors } = useTheme();
	const tooltipProps = useChartTooltipProps();
	const chartColor = getChartColor(1);
	const secondaryColor = getChartColor(2);

	const last = data?.length ? data[data.length - 1] : null;
	const prev = data?.length > 1 ? data[data.length - 2] : null;
	const growth =
		last && prev && prev.actual
			? (((last.actual - prev.actual) / prev.actual) * 100).toFixed(1)
			: "0";
	const avgActual =
		data?.length > 0 ? data.reduce((s, d) => s + d.actual, 0) / data.length : 0;

	return (
		<Card>
			<CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 space-y-0 pb-6">
				<div className="flex items-center gap-2">
					<span className="p-2 rounded-xl bg-primary text-primary-foreground">
						<TrendingUp className="w-4 h-4" />
					</span>
					<div>
						<CardTitle className="text-lg">Revenue forecast</CardTitle>
						<CardDescription>Actuals vs model — {rangeLabel}</CardDescription>
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
			</CardHeader>
			<CardContent className="pt-0">
				<div className="h-[320px] w-full">
					<ResponsiveContainer width="100%" height="100%">
						<ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
							<defs>
								<linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor={chartColor} stopOpacity={0.35} />
									<stop offset="100%" stopColor={chartColor} stopOpacity={0} />
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								className="stroke-zinc-200 dark:stroke-zinc-700"
								vertical={false}
							/>
							<XAxis
								dataKey="period"
								tick={{ fill: CHART_MUTED, fontSize: 11 }}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								tick={{ fill: CHART_MUTED, fontSize: 11 }}
								tickLine={false}
								axisLine={false}
								tickFormatter={(v) => `$${v}k`}
							/>
							<Tooltip {...tooltipProps} formatter={(val) => [`$${val}k`, ""]} />
							<Legend wrapperStyle={{ fontSize: "12px" }} />
							<ReferenceLine
								y={avgActual}
								stroke={CHART_MUTED}
								strokeDasharray="4 4"
								label={{
									value: "Avg",
									position: "insideTopRight",
									fill: CHART_MUTED,
									fontSize: 10,
								}}
							/>
							<Area
								type="monotone"
								dataKey="actual"
								name="Actual revenue"
								stroke={chartColor}
								strokeWidth={2}
								fill="url(#actualFill)"
							/>
							<Line
								type="monotone"
								dataKey="forecast"
								name="Forecast"
								stroke={secondaryColor}
								strokeWidth={2}
								dot={{ r: 3 }}
							/>
							<Line
								type="monotone"
								dataKey="target"
								name="Quota target"
								stroke={CHART_MUTED}
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
			</CardContent>
		</Card>
	);
};

export default RevenueForecastSection;
