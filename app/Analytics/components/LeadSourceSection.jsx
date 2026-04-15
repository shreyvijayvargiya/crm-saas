import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PieChart as PieIcon } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { useChartTooltipProps } from "../../../utils/chartTooltip";

const COLORS = ["#3b82f6", "#8b5cf6", "#14b8a6", "#f59e0b", "#ec4899", "#64748b"];

const LeadSourceSection = ({ data }) => {
	const { colors, scheme } = useTheme();
	const tooltipProps = useChartTooltipProps();
	const total = data.reduce((s, d) => s + d.value, 0);

	return (
		<div className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-5 md:p-6 h-full flex flex-col`}>
			<div className="flex items-center gap-2 mb-4">
				<span className={`p-2 rounded-xl ${scheme.primary} ${scheme.primaryForeground}`}>
					<PieIcon className="w-4 h-4" />
				</span>
				<div>
					<h2 className={`text-lg font-semibold ${colors.foreground}`}>Lead source breakdown</h2>
					<p className={`text-sm ${colors.textSecondary}`}>Attributed pipeline by channel</p>
				</div>
			</div>
			<div className="flex flex-col md:flex-row items-center gap-6 flex-1 min-h-[280px]">
				<div className="w-full md:w-1/2 h-[220px]">
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								innerRadius="58%"
								outerRadius="82%"
								paddingAngle={2}
								dataKey="value"
								nameKey="name"
							>
								{data.map((_, i) => (
									<Cell key={i} fill={COLORS[i % COLORS.length]} stroke="none" />
								))}
							</Pie>
							<Tooltip
								{...tooltipProps}
								formatter={(val, _n, p) => [
									`${val} (${total ? ((val / total) * 100).toFixed(1) : 0}%)`,
									p.payload.name,
								]}
							/>
							<Legend wrapperStyle={{ fontSize: "11px" }} />
						</PieChart>
					</ResponsiveContainer>
				</div>
				<ul className="w-full md:w-1/2 space-y-2">
					{data.map((row, i) => (
						<li
							key={row.name}
							className={`flex items-center justify-between gap-2 text-sm rounded-xl border ${colors.border} px-3 py-2 ${colors.muted}/50`}
						>
							<span className="flex items-center gap-2 min-w-0">
								<span
									className="w-2.5 h-2.5 rounded-full shrink-0"
									style={{ backgroundColor: COLORS[i % COLORS.length] }}
								/>
								<span className={`truncate ${colors.foreground}`}>{row.name}</span>
							</span>
							<span className={`font-semibold tabular-nums ${colors.foreground}`}>
								{total ? ((row.value / total) * 100).toFixed(0) : 0}%
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default LeadSourceSection;
