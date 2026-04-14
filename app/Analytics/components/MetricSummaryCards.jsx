import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

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

const MetricSummaryCards = ({ colors }) => (
	<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
		{metrics.map((m) => (
			<div
				key={m.label}
				className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-5`}
			>
				<p className={`text-sm font-medium ${colors.textSecondary}`}>{m.label}</p>
				<div className="mt-3 flex items-end justify-between gap-2">
					<p className={`text-2xl font-bold tracking-tight ${colors.foreground}`}>
						{m.value}
					</p>
					<span
						className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${
							m.positive
								? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
								: "bg-rose-500/15 text-rose-600 dark:text-rose-400"
						}`}
					>
						{m.positive ? (
							<ArrowUp className="w-3.5 h-3.5" />
						) : (
							<ArrowDown className="w-3.5 h-3.5" />
						)}
						{m.positive ? "+" : "−"}
						{Math.abs(m.change)}%
					</span>
				</div>
			</div>
		))}
	</div>
);

export default MetricSummaryCards;
