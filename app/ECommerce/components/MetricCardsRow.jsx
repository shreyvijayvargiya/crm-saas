import React from "react";
import * as lucideIcons from "lucide-react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "../../../utils/useTheme";
import { ECOMMERCE_METRICS } from "../ecommerceSeedData";

const MetricCardsRow = () => {
	const { colors } = useTheme();

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
			{ECOMMERCE_METRICS.map((m) => {
				const Icon = lucideIcons[m.icon];
				return (
					<Card key={m.id}>
						<CardContent className="p-5">
							<div className="flex items-start justify-between gap-2">
								<span
									className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.muted}`}
								>
									{Icon ? <Icon className="h-4 w-4" /> : null}
								</span>
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
									{m.change}%
								</Badge>
							</div>
							<p className={`mt-4 text-2xl font-bold tracking-tight ${colors.foreground}`}>
								{m.value}
							</p>
							<p className={`text-sm ${colors.textSecondary}`}>{m.label}</p>
							<Badge variant="secondary" className="mt-3 text-[11px] font-normal">
								{m.period}
							</Badge>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
};

export default MetricCardsRow;
