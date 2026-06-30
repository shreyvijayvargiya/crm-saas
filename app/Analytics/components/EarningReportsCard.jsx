import React from "react";
import { ArrowUp, FolderDown, DollarSign, LineChart, GitBranch } from "lucide-react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from "recharts";
import { ResponsiveContainer } from "@/components/ui/responsive-chart";
import { useTheme } from "../../../utils/useTheme";
import { useChartTooltipProps } from "../../../utils/chartTooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getChartColor, CHART_MUTED } from "@/lib/chartColors";

const barData = [
	{ day: "Mo", v: 42 },
	{ day: "Tu", v: 55 },
	{ day: "We", v: 38 },
	{ day: "Th", v: 62 },
	{ day: "Fr", v: 48 },
	{ day: "Sa", v: 35 },
	{ day: "Su", v: 28 },
];

const sideRows = [
	{ label: "Earnings", value: "$545.69", pct: 0.7, Icon: DollarSign },
	{ label: "Profit", value: "$256.34", pct: 0.4, Icon: LineChart },
	{ label: "Expense", value: "$74.19", pct: 0.8, Icon: GitBranch },
];

const EarningReportsCard = () => {
	const { colors } = useTheme();
	const tooltipProps = useChartTooltipProps();
	const chartColor = getChartColor();

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="flex-row items-start justify-between gap-3 space-y-0 pb-4">
				<div>
					<CardTitle className="text-lg">Earning Reports</CardTitle>
					<CardDescription>Last 28 days</CardDescription>
				</div>
				<Button type="button" variant="outline" size="sm" className="gap-2">
					<FolderDown className="w-4 h-4" />
					Export
				</Button>
			</CardHeader>

			<CardContent className="flex flex-col flex-1 min-h-0 pt-0">
				<div className="flex flex-wrap items-baseline gap-2 mb-4">
					<span className={`text-3xl font-bold tracking-tight ${colors.foreground}`}>
						$1,468
					</span>
					<Badge className="gap-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 border-transparent">
						<ArrowUp className="w-3.5 h-3.5" />
						+4.2%
					</Badge>
				</div>

				<div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
					<div className="flex-1 min-h-[200px]">
						<ResponsiveContainer width="100%" height="100%" minHeight={200}>
							<BarChart data={barData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
								<defs>
									<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor={chartColor} />
										<stop offset="100%" stopColor={CHART_MUTED} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="3 3"
									vertical={false}
									className="stroke-zinc-200 dark:stroke-zinc-700"
								/>
								<XAxis
									dataKey="day"
									axisLine={false}
									tickLine={false}
									tick={{ fontSize: 12, fill: "currentColor" }}
									className={colors.textMuted}
								/>
								<YAxis hide />
								<Tooltip cursor={{ fill: "transparent" }} {...tooltipProps} />
								<Bar
									dataKey="v"
									fill="url(#barGradient)"
									radius={[6, 6, 0, 0]}
									maxBarSize={36}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>

					<div className="xl:w-52 shrink-0 space-y-5">
						{sideRows.map(({ label, value, pct, Icon }) => (
							<div key={label}>
								<div className="flex items-center gap-2 mb-2">
									<span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground">
										<Icon className="w-4 h-4" />
									</span>
									<div className="min-w-0 flex-1">
										<p className={`text-xs font-medium ${colors.textSecondary}`}>
											{label}
										</p>
										<p className={`text-sm font-semibold ${colors.foreground}`}>
											{value}
										</p>
									</div>
								</div>
								<div className="h-1.5 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
									<div
										className="h-full rounded-full bg-primary"
										style={{ width: `${pct * 100}%` }}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default EarningReportsCard;
