import * as React from "react";
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from "recharts";
import { ArrowUp, MoreVertical, Wallet, DollarSign, CreditCard } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTheme } from "../../../utils/useTheme";
import { EARNING_BREAKDOWN, WEEKLY_EARNINGS } from "../ecommerceSeedData";

const iconMap = { Wallet, DollarSign, CreditCard };

const chartConfig = {
	value: { label: "Earnings", color: "hsl(var(--chart-1))" },
};

const EarningInsightsCard = () => {
	const { colors } = useTheme();
	const total = React.useMemo(
		() => WEEKLY_EARNINGS.reduce((acc, curr) => acc + curr.value, 0),
		[]
	);

	return (
		<Card className="flex h-full flex-col py-0">
			<CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5">
					<div className="flex items-start justify-between gap-3">
						<div>
							<CardTitle>Earning insights</CardTitle>
							<CardDescription>Weekly earning overview</CardDescription>
						</div>
						<Button type="button" variant="ghost" size="icon" className="h-8 w-8 shrink-0">
							<MoreVertical className="h-4 w-4" />
						</Button>
					</div>
					<div className="mt-3 flex flex-wrap items-baseline gap-2">
						<span className={`text-3xl font-bold tracking-tight ${colors.foreground}`}>
							$4.6K
						</span>
						<Badge className="gap-0.5 border-transparent bg-emerald-500/15 text-emerald-600 hover:bg-emerald-500/15 dark:text-emerald-400">
							<ArrowUp className="h-3.5 w-3.5" />
							+10%
						</Badge>
					</div>
					<p className={`text-sm ${colors.textSecondary}`}>
						Earning of this week compared to last week. It&apos;s increasing — keep it up.
					</p>
				</div>
				<div className="flex border-t sm:border-t-0 sm:border-l">
					<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-4 sm:px-8 sm:py-6">
						<span className="text-xs text-muted-foreground">Weekly total</span>
						<span className="text-lg font-bold leading-none sm:text-3xl">
							${(total / 1000).toFixed(1)}K
						</span>
					</div>
				</div>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[160px] w-full flex-1"
				>
					<BarChart
						accessibilityLayer
						data={WEEKLY_EARNINGS}
						margin={{ left: 12, right: 12 }}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="day"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									formatter={(value) => [`$${value.toLocaleString()}`, "Earnings"]}
								/>
							}
						/>
						<Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={32}>
							{WEEKLY_EARNINGS.map((entry) => (
								<Cell
									key={entry.day}
									fill={
										entry.highlight
											? "var(--color-value)"
											: "hsl(var(--muted))"
									}
								/>
							))}
						</Bar>
					</BarChart>
				</ChartContainer>

				<div className={`mt-6 grid grid-cols-1 gap-4 border-t pt-4 sm:grid-cols-3 ${colors.border}`}>
					{EARNING_BREAKDOWN.map(({ label, value, pct, icon }) => {
						const Icon = iconMap[icon];
						return (
							<div key={label}>
								<div className="mb-2 flex items-center gap-2">
									<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
										<Icon className="h-4 w-4" />
									</span>
									<div className="min-w-0">
										<p className={`text-xs font-medium ${colors.textSecondary}`}>{label}</p>
										<p className={`text-sm font-semibold ${colors.foreground}`}>{value}</p>
									</div>
								</div>
								<div className="h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
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
