import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
	sent: { label: "Sent", color: "hsl(var(--chart-1))" },
	opens: { label: "Opens", color: "hsl(var(--chart-2))" },
	clicks: { label: "Clicks", color: "hsl(var(--chart-3))" },
};

export function CampaignAreaChartCard({
	title = "Campaign performance",
	description = "Sent, opens, and clicks over the reporting period",
	data,
}) {
	return (
		<Card className="pt-0">
			<CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
				<div className="grid flex-1 gap-1">
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[280px] w-full"
				>
					<AreaChart data={data}>
						<defs>
							<linearGradient id="fillSent" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-sent)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-sent)" stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id="fillOpens" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-opens)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-opens)" stopOpacity={0.1} />
							</linearGradient>
							<linearGradient id="fillClicks" x1="0" y1="0" x2="0" y2="1">
								<stop offset="5%" stopColor="var(--color-clicks)" stopOpacity={0.8} />
								<stop offset="95%" stopColor="var(--color-clicks)" stopOpacity={0.1} />
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="dot" />}
						/>
						<Area
							dataKey="clicks"
							type="natural"
							fill="url(#fillClicks)"
							stroke="var(--color-clicks)"
							stackId="a"
						/>
						<Area
							dataKey="opens"
							type="natural"
							fill="url(#fillOpens)"
							stroke="var(--color-opens)"
							stackId="a"
						/>
						<Area
							dataKey="sent"
							type="natural"
							fill="url(#fillSent)"
							stroke="var(--color-sent)"
							stackId="a"
						/>
						<ChartLegend content={<ChartLegendContent />} />
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
