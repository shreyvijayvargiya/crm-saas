import React from "react";
import { Filter } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SalesFunnelSection = ({ steps }) => {
	const { colors } = useTheme();
	const max = steps[0]?.count || 1;

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="flex-row items-center gap-2 space-y-0 pb-5">
				<span className="p-2 rounded-xl bg-primary text-primary-foreground">
					<Filter className="w-4 h-4" />
				</span>
				<div>
					<CardTitle className="text-lg">Sales funnel</CardTitle>
					<CardDescription>Volume by stage (period)</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="space-y-4 flex-1 pt-0">
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
			</CardContent>
		</Card>
	);
};

export default SalesFunnelSection;
