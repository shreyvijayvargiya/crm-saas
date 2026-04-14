import React from "react";
import { ArrowUp, FolderDown, DollarSign, LineChart, GitBranch } from "lucide-react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../../utils/useTheme";

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
	const { colors, scheme } = useTheme();

	return (
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-5 h-full flex flex-col`}
		>
			<div className="flex items-start justify-between gap-3 mb-4">
				<div>
					<h2 className={`text-lg font-semibold ${colors.foreground}`}>
						Earning Reports
					</h2>
					<p className={`text-sm mt-0.5 ${colors.textSecondary}`}>Last 28 days</p>
				</div>
				<button
					type="button"
					className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-xl border ${colors.border} ${colors.hoverSecondary} transition-colors ${colors.foreground}`}
				>
					<FolderDown className="w-4 h-4" />
					Export
				</button>
			</div>

			<div className="flex flex-wrap items-baseline gap-2 mb-4">
				<span className={`text-3xl font-bold tracking-tight ${colors.foreground}`}>
					$1,468
				</span>
				<span className="inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
					<ArrowUp className="w-3.5 h-3.5" />
					+4.2%
				</span>
			</div>

			<div className="flex flex-col xl:flex-row gap-6 flex-1 min-h-0">
				<div className="flex-1 min-h-[200px]">
					<ResponsiveContainer width="100%" height="100%" minHeight={200}>
						<BarChart data={barData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
							<defs>
								<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
									<stop offset="0%" stopColor="#27272a" />
									<stop offset="100%" stopColor="#52525b" />
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
							<Tooltip
								cursor={{ fill: "transparent" }}
								contentStyle={{
									borderRadius: "8px",
									border: "1px solid hsl(var(--border, 0 0% 90%))",
								}}
							/>
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
								<span
									className={`flex items-center justify-center w-8 h-8 rounded-xl ${scheme.primary} ${scheme.primaryForeground}`}
								>
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
							<div className={`h-1.5 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700`}>
								<div
									className={`h-full rounded-full ${scheme.primary}`}
									style={{ width: `${pct * 100}%` }}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default EarningReportsCard;
