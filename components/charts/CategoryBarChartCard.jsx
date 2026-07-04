import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import { cn } from "@/lib/utils";

export function CategoryBarChartCard({
	title,
	description,
	data,
	dataKey = "count",
	xKey = "name",
	valueLabel = "Count",
	color = "hsl(var(--chart-1))",
	className,
	xTickAngle = 0,
	heightClass = "h-[250px]",
}) {
	const chartConfig = {
		[dataKey]: {
			label: valueLabel,
			color,
		},
	};

	return (
		<Card className={cn("py-0", className)}>
			<CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5">
					<CardTitle>{title}</CardTitle>
					{description ? (
						<CardDescription>{description}</CardDescription>
					) : null}
				</div>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className={cn("aspect-auto w-full", heightClass)}
				>
					<BarChart
						accessibilityLayer
						data={data}
						margin={{ left: 12, right: 12, bottom: xTickAngle ? 24 : 8 }}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey={xKey}
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							angle={xTickAngle}
							textAnchor={xTickAngle ? "end" : "middle"}
							interval={0}
							height={xTickAngle ? 48 : undefined}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Bar
							dataKey={dataKey}
							fill={`var(--color-${dataKey})`}
							radius={[6, 6, 0, 0]}
							maxBarSize={40}
						/>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
