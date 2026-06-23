import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../../utils/useTheme";

const metrics = [
	{
		label: "Daily active users",
		value: "3,450",
		change: 12.1,
		positive: true,
	},
	{
		label: "Weekly sessions",
		value: "1,342",
		change: 9.8,
		positive: false,
	},
	{
		label: "Duration",
		value: "5.2min",
		change: 7.7,
		positive: true,
	},
	{
		label: "Conversion Rate",
		value: "2.8%",
		change: 4.3,
		positive: true,
	},
];

const MetricSummaryCards = () => {
	const { colors } = useTheme();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
			{metrics.map((m) => (
				<Card key={m.label}>
					<CardContent className="p-5">
						<p className={`text-sm font-medium ${colors.textSecondary}`}>{m.label}</p>
						<div className="mt-3 flex items-end justify-between gap-2">
							<p className={`text-2xl font-bold tracking-tight ${colors.foreground}`}>
								{m.value}
							</p>
							<Badge
								className={`gap-0.5 shrink-0 border-transparent ${
									m.positive
										? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15"
										: "bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-500/15"
								}`}
							>
								{m.positive ? (
									<ArrowUp className="w-3.5 h-3.5" />
								) : (
									<ArrowDown className="w-3.5 h-3.5" />
								)}
								{m.positive ? "+" : "−"}
								{Math.abs(m.change)}%
							</Badge>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
};

export default MetricSummaryCards;
