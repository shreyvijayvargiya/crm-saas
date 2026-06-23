import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PieChart as PieIcon } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { useChartTooltipProps } from "../../../utils/chartTooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const COLORS = ["#3b82f6", "#8b5cf6", "#14b8a6", "#f59e0b", "#ec4899", "#64748b"];

const LeadSourceSection = ({ data }) => {
	const { colors } = useTheme();
	const tooltipProps = useChartTooltipProps();
	const total = data.reduce((s, d) => s + d.value, 0);

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="flex-row items-center gap-2 space-y-0 pb-4">
				<span className="p-2 rounded-xl bg-primary text-primary-foreground">
					<PieIcon className="w-4 h-4" />
				</span>
				<div>
					<CardTitle className="text-lg">Lead source breakdown</CardTitle>
					<CardDescription>Attributed pipeline by channel</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col md:flex-row items-center gap-6 flex-1 min-h-[280px] pt-0">
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
							className={cn(
								"flex items-center justify-between gap-2 text-sm rounded-xl border px-3 py-2",
								colors.border,
								colors.muted + "/50"
							)}
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
			</CardContent>
		</Card>
	);
};

export default LeadSourceSection;
