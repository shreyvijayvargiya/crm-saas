import React from "react";
import { Filter } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";

const SalesFunnelSection = ({ steps }) => {
	const { colors, scheme } = useTheme();
	const max = steps[0]?.count || 1;

	return (
		<div className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-5 md:p-6 h-full flex flex-col`}>
			<div className="flex items-center gap-2 mb-5">
				<span className={`p-2 rounded-xl ${scheme.primary} ${scheme.primaryForeground}`}>
					<Filter className="w-4 h-4" />
				</span>
				<div>
					<h2 className={`text-lg font-semibold ${colors.foreground}`}>Sales funnel</h2>
					<p className={`text-sm ${colors.textSecondary}`}>Volume by stage (period)</p>
				</div>
			</div>
			<div className="space-y-4 flex-1">
				{steps.map((step, i) => (
					<div key={step.label}>
						<div className="flex items-center justify-between text-xs mb-1">
							<span className={`font-medium ${colors.foreground}`}>{step.label}</span>
							<span className={`tabular-nums ${colors.textMuted}`}>
								{step.count.toLocaleString()} · {step.pct}%
							</span>
						</div>
						<div className={`h-2.5 rounded-full overflow-hidden ${colors.muted}`}>
							<div
								className={`h-full rounded-full transition-all ${
									i === 0
										? "bg-blue-500"
										: i === 1
										? "bg-violet-500"
										: i === 2
										? "bg-teal-500"
										: i === 3
										? "bg-amber-500"
										: "bg-emerald-500"
								}`}
								style={{ width: `${(step.count / max) * 100}%` }}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SalesFunnelSection;
