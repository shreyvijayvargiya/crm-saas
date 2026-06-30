import React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ResponsiveContainer } from "@/components/ui/responsive-chart";
import { Brain, GitBranch, Users, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useChartTooltipProps } from "../../../utils/chartTooltip";
import {
	AI_COST_BY_FEATURE,
	AI_COST_BY_USER,
	MODEL_ROUTING_RULES,
} from "../saasDashboardSeedData";

const FEATURE_COLORS = [
	"hsl(var(--primary))",
	"hsl(262 83% 58%)",
	"hsl(173 80% 40%)",
	"hsl(24 95% 53%)",
	"hsl(221 83% 53%)",
	"hsl(142 76% 36%)",
];

const PROVIDER_DOT = {
	openai: "bg-emerald-500",
	anthropic: "bg-orange-500",
	gemini: "bg-blue-500",
};

const COMPLEXITY_STYLE = {
	low: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
	medium: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
	high: "bg-red-500/15 text-red-700 dark:text-red-300",
};

export default function AiMeteringPanel() {
	const chartTooltipProps = useChartTooltipProps();

	return (
		<div className="space-y-6">
			<Card className="border-violet-500/20 bg-gradient-to-br from-violet-500/5 to-card">
				<CardHeader className="pb-2">
					<div className="flex items-center gap-2">
						<Brain className="h-4 w-4 text-violet-600" />
						<CardTitle className="text-base font-semibold">AI cost metering</CardTitle>
					</div>
					<CardDescription>
						Per-user, per-org, per-feature breakdown — classify by complexity, route to the right
						model
					</CardDescription>
				</CardHeader>
			</Card>

			<div className="grid gap-4 lg:grid-cols-2">
				{/* Per-user */}
				<Card>
					<CardHeader className="pb-2">
						<div className="flex items-center gap-2">
							<Users className="h-4 w-4 text-primary" />
							<CardTitle className="text-base font-semibold">Cost by user</CardTitle>
						</div>
						<CardDescription>Token spend attributed per team member</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[280px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={AI_COST_BY_USER} layout="vertical" margin={{ left: 4 }} barSize={16}>
									<CartesianGrid strokeDasharray="4 4" horizontal={false} className="stroke-muted" />
									<XAxis
										type="number"
										tickFormatter={(v) => `$${v}`}
										tick={{ fontSize: 11 }}
										axisLine={false}
										tickLine={false}
									/>
									<YAxis
										type="category"
										dataKey="user"
										width={72}
										tick={{ fontSize: 11 }}
										axisLine={false}
										tickLine={false}
									/>
									<Tooltip
										{...chartTooltipProps}
										formatter={(v, name) => [
											name === "cost" ? `$${v}` : v.toLocaleString(),
											name === "cost" ? "Cost" : "Tokens",
										]}
									/>
									<Bar dataKey="cost" name="cost" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</div>
						<Table className="mt-4">
							<TableHeader>
								<TableRow className="hover:bg-transparent">
									<TableHead className="text-[10px]">User</TableHead>
									<TableHead className="text-right text-[10px]">Runs</TableHead>
									<TableHead className="text-right text-[10px]">Tokens</TableHead>
									<TableHead className="text-right text-[10px]">Cost</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{AI_COST_BY_USER.map((row) => (
									<TableRow key={row.user}>
										<TableCell className="text-sm font-medium">{row.user}</TableCell>
										<TableCell className="text-right tabular-nums text-sm">{row.runs}</TableCell>
										<TableCell className="text-right tabular-nums text-sm text-muted-foreground">
											{(row.tokens / 1000).toFixed(1)}k
										</TableCell>
										<TableCell className="text-right tabular-nums text-sm font-medium text-primary">
											${row.cost.toFixed(2)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Per-feature */}
				<Card>
					<CardHeader className="pb-2">
						<div className="flex items-center gap-2">
							<Layers className="h-4 w-4 text-primary" />
							<CardTitle className="text-base font-semibold">Cost by feature</CardTitle>
						</div>
						<CardDescription>Which product surfaces consume the most AI budget</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[200px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={AI_COST_BY_FEATURE}
										dataKey="cost"
										nameKey="feature"
										cx="50%"
										cy="50%"
										innerRadius={48}
										outerRadius={72}
										paddingAngle={2}
										strokeWidth={0}
									>
										{AI_COST_BY_FEATURE.map((_, i) => (
											<Cell key={i} fill={FEATURE_COLORS[i % FEATURE_COLORS.length]} />
										))}
									</Pie>
									<Tooltip {...chartTooltipProps} formatter={(v) => [`$${v}`, "Cost"]} />
								</PieChart>
							</ResponsiveContainer>
						</div>
						<div className="mt-4 space-y-2">
							{AI_COST_BY_FEATURE.map((row, i) => (
								<div key={row.feature} className="flex items-center gap-3">
									<span
										className="h-2.5 w-2.5 shrink-0 rounded-full"
										style={{ backgroundColor: FEATURE_COLORS[i % FEATURE_COLORS.length] }}
									/>
									<span className="flex-1 text-sm">{row.feature}</span>
									<span className="text-xs text-muted-foreground tabular-nums">{row.pct}%</span>
									<span className="text-sm font-medium tabular-nums">${row.cost.toFixed(2)}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Model routing */}
			<Card>
				<CardHeader className="pb-3">
					<div className="flex items-center gap-2">
						<GitBranch className="h-4 w-4 text-primary" />
						<CardTitle className="text-base font-semibold">Model routing rules</CardTitle>
					</div>
					<CardDescription>
						Classify requests by complexity → route to the appropriate model (LushBinary pattern)
					</CardDescription>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/30 hover:bg-muted/30">
								<TableHead>Task type</TableHead>
								<TableHead>Complexity</TableHead>
								<TableHead>Classifier rule</TableHead>
								<TableHead>Model</TableHead>
								<TableHead className="text-right">Avg cost</TableHead>
								<TableHead className="text-right">Traffic</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{MODEL_ROUTING_RULES.map((rule) => (
								<TableRow key={rule.id}>
									<TableCell className="font-medium">{rule.task}</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={cn("capitalize", COMPLEXITY_STYLE[rule.complexity])}
										>
											{rule.complexity}
										</Badge>
									</TableCell>
									<TableCell>
										<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
											{rule.classifier}
										</code>
									</TableCell>
									<TableCell>
										<span className="flex items-center gap-2 text-sm">
											<span
												className={cn(
													"h-2 w-2 rounded-full",
													PROVIDER_DOT[rule.provider]
												)}
											/>
											{rule.model}
										</span>
									</TableCell>
									<TableCell className="text-right tabular-nums text-sm">
										${rule.avgCost.toFixed(3)}
									</TableCell>
									<TableCell className="text-right">
										<div className="flex items-center justify-end gap-2">
											<div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
												<div
													className="h-full rounded-full bg-primary"
													style={{ width: `${rule.routePct}%` }}
												/>
											</div>
											<span className="text-xs tabular-nums text-muted-foreground">
												{rule.routePct}%
											</span>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
