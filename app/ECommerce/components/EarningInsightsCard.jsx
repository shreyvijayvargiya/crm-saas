import React from "react";
import { ArrowUp, MoreVertical, Wallet, DollarSign, CreditCard } from "lucide-react";
import { BarChart, Bar, XAxis, Cell } from "recharts";
import { ResponsiveContainer } from "@/components/ui/responsive-chart";
import { useTheme } from "../../../utils/useTheme";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { EARNING_BREAKDOWN, WEEKLY_EARNINGS } from "../ecommerceSeedData";

const iconMap = { Wallet, DollarSign, CreditCard };

const EarningInsightsCard = () => {
	const { colors } = useTheme();

	return (
		<Card className="h-full flex flex-col">
			<CardHeader className="flex-row items-start justify-between gap-3 space-y-0 pb-2">
				<div>
					<CardTitle className="text-lg">Earning insights</CardTitle>
					<CardDescription>Weekly Earning overview</CardDescription>
				</div>
				<Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0">
					<MoreVertical className="h-4 w-4" />
				</Button>
			</CardHeader>

			<CardContent className="flex flex-col flex-1 pt-0">
				<div className="flex flex-wrap items-baseline gap-2">
					<span className={`text-3xl font-bold tracking-tight ${colors.foreground}`}>
						$4.6K
					</span>
					<Badge className="gap-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15 border-transparent">
						<ArrowUp className="w-3.5 h-3.5" />
						+10%
					</Badge>
				</div>
				<p className={`text-sm mt-2 mb-4 ${colors.textSecondary}`}>
					Earning of this week compared to last week. it&apos;s increasing keep it up.
				</p>

				<div className="min-h-[160px] flex-1">
					<ResponsiveContainer width="100%" height={160}>
						<BarChart data={WEEKLY_EARNINGS} margin={{ top: 8, right: 4, left: -16, bottom: 0 }}>
							<XAxis
								dataKey="day"
								axisLine={false}
								tickLine={false}
								tick={{ fontSize: 12, fill: "currentColor" }}
								className={colors.textMuted}
							/>
							<Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={32}>
								{WEEKLY_EARNINGS.map((entry) => (
									<Cell
										key={entry.day}
										fill={entry.highlight ? "hsl(var(--primary))" : "hsl(var(--muted))"}
									/>
								))}
							</Bar>
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className={`mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t ${colors.border}`}>
					{EARNING_BREAKDOWN.map(({ label, value, pct, icon }) => {
						const Icon = iconMap[icon];
						return (
							<div key={label}>
								<div className="flex items-center gap-2 mb-2">
									<span className="flex items-center justify-center w-8 h-8 rounded-xl bg-primary text-primary-foreground">
										<Icon className="w-4 h-4" />
									</span>
									<div className="min-w-0">
										<p className={`text-xs font-medium ${colors.textSecondary}`}>{label}</p>
										<p className={`text-sm font-semibold ${colors.foreground}`}>{value}</p>
									</div>
								</div>
								<div className="h-1.5 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
									<div
										className="h-full rounded-full bg-primary"
										style={{ width: `${pct * 100}%` }}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};

export default EarningInsightsCard;
