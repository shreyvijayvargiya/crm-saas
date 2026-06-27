import React, { useMemo, useState } from "react";
import * as lucideIcons from "lucide-react";
import {
	ArrowDown,
	ArrowUp,
	Search,
	Eye,
	MoreHorizontal,
	RefreshCw,
} from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Legend,
} from "recharts";
import SubscriptionsLayout from "./SubscriptionsLayout";
import {
	SUBSCRIPTION_METRICS,
	SUBSCRIPTIONS,
	SUBSCRIPTION_MRR_TREND,
	SUBSCRIPTION_STATUS_BREAKDOWN,
	SUBSCRIPTION_STATUS_OPTIONS,
} from "./subscriptionsSeedData";
import DateRangeFilter from "../Analytics/components/DateRangeFilter";
import { ExportDropdown } from "../../lib/ui/dropdown";
import FormSelect from "../../lib/ui/FormSelect";
import { useTheme } from "../../utils/useTheme";
import { useChartTooltipProps } from "../../utils/chartTooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

const PIE_COLORS = [
	"hsl(var(--primary))",
	"hsl(var(--chart-2))",
	"hsl(var(--chart-3))",
	"hsl(var(--chart-4))",
	"hsl(var(--chart-5))",
];

function subscriptionStatusVariant(status) {
	if (status === "Active") return "default";
	if (status === "Trialing") return "secondary";
	if (status === "Past Due") return "destructive";
	if (status === "Canceled") return "outline";
	return "secondary";
}

const Subscriptions = () => {
	const router = useRouter();
	const { colors } = useTheme();
	const chartTooltipProps = useChartTooltipProps();

	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [range, setRange] = useState("30d");
	const [showCustomRange, setShowCustomRange] = useState(false);
	const [customFrom, setCustomFrom] = useState("");
	const [customTo, setCustomTo] = useState("");
	const [selectedIds, setSelectedIds] = useState([]);

	const filtered = useMemo(() => {
		return SUBSCRIPTIONS.filter((s) => {
			const matchesSearch =
				!searchTerm ||
				s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(s.companyName ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
				s.planName.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = statusFilter === "All" || s.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [searchTerm, statusFilter]);

	const allSelected = filtered.length > 0 && selectedIds.length === filtered.length;

	return (
		<SubscriptionsLayout>
			<Card>
				<CardContent className="p-4">
					<DateRangeFilter
						value={range}
						onChange={setRange}
						showCustom={showCustomRange}
						onToggleCustom={setShowCustomRange}
						customFrom={customFrom}
						customTo={customTo}
						onCustomChange={(field, val) =>
							field === "from" ? setCustomFrom(val) : setCustomTo(val)
						}
					/>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				{SUBSCRIPTION_METRICS.map((m) => {
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

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>MRR trend</CardTitle>
						<CardDescription>Monthly recurring revenue over time</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-64 w-full">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={SUBSCRIPTION_MRR_TREND}>
									<CartesianGrid strokeDasharray="3 3" className="stroke-border" />
									<XAxis dataKey="month" tick={{ fontSize: 12 }} />
									<YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
									<Tooltip {...chartTooltipProps} formatter={(v) => [`$${v.toLocaleString()}`, "MRR"]} />
									<Area
										type="monotone"
										dataKey="mrr"
										stroke="hsl(var(--primary))"
										fill="hsl(var(--primary))"
										fillOpacity={0.15}
										strokeWidth={2}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Status breakdown</CardTitle>
						<CardDescription>Subscriptions by status</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-64 w-full">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={SUBSCRIPTION_STATUS_BREAKDOWN}
										dataKey="count"
										nameKey="status"
										cx="50%"
										cy="50%"
										innerRadius={50}
										outerRadius={80}
										paddingAngle={2}
									>
										{SUBSCRIPTION_STATUS_BREAKDOWN.map((_, i) => (
											<Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
										))}
									</Pie>
									<Tooltip {...chartTooltipProps} />
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader className="space-y-4">
					<div className="flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
						<div>
							<CardTitle>Subscriptions</CardTitle>
							<CardDescription>
								{filtered.length} subscriptions
								{selectedIds.length > 0 ? ` · ${selectedIds.length} selected` : ""}
							</CardDescription>
						</div>
						<ExportDropdown
							onExportCsv={() => toast.success(`Exported ${filtered.length} subscriptions as CSV`)}
							onExportPdf={() => toast.success(`Exported ${filtered.length} subscriptions as PDF`)}
							onExportJson={() => toast.success(`Exported ${filtered.length} subscriptions as JSON`)}
						/>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<div className="relative flex-1 min-w-[200px] max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search customers or plans…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>
						<FormSelect
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							options={SUBSCRIPTION_STATUS_OPTIONS}
							className="w-36"
						/>
					</div>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-10">
									<Checkbox
										checked={allSelected}
										onCheckedChange={() =>
											setSelectedIds(allSelected ? [] : filtered.map((s) => s.id))
										}
									/>
								</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Plan</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">MRR</TableHead>
								<TableHead>Renews</TableHead>
								<TableHead className="w-10" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.map((sub) => (
								<TableRow key={sub.id}>
									<TableCell onClick={(e) => e.stopPropagation()}>
										<Checkbox
											checked={selectedIds.includes(sub.id)}
											onCheckedChange={() =>
												setSelectedIds((prev) =>
													prev.includes(sub.id)
														? prev.filter((x) => x !== sub.id)
														: [...prev, sub.id]
												)
											}
										/>
									</TableCell>
									<TableCell
										className="cursor-pointer"
										onClick={() => router.push(`/subscriptions/${sub.id}`)}
									>
										<div>
											<p className="font-medium">{sub.customerName}</p>
											<p className="text-xs text-muted-foreground">{sub.companyName}</p>
										</div>
									</TableCell>
									<TableCell
										className="text-muted-foreground cursor-pointer"
										onClick={() => router.push(`/subscriptions/${sub.id}`)}
									>
										{sub.planName}
									</TableCell>
									<TableCell
										className="cursor-pointer"
										onClick={() => router.push(`/subscriptions/${sub.id}`)}
									>
										<Badge variant={subscriptionStatusVariant(sub.status)}>{sub.status}</Badge>
									</TableCell>
									<TableCell
										className="text-right tabular-nums font-medium cursor-pointer"
										onClick={() => router.push(`/subscriptions/${sub.id}`)}
									>
										${sub.mrr.toLocaleString(undefined, { minimumFractionDigits: 2 })}
									</TableCell>
									<TableCell
										className="text-sm text-muted-foreground cursor-pointer"
										onClick={() => router.push(`/subscriptions/${sub.id}`)}
									>
										{sub.currentPeriodEnd
											? new Date(sub.currentPeriodEnd).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
													year: "numeric",
												})
											: "—"}
									</TableCell>
									<TableCell onClick={(e) => e.stopPropagation()}>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem onClick={() => router.push(`/subscriptions/${sub.id}`)}>
													<Eye className="h-4 w-4" />
													View details
												</DropdownMenuItem>
												<DropdownMenuItem
													onClick={() => toast.info(`Renewal triggered for ${sub.customerName} (demo)`)}
												>
													<RefreshCw className="h-4 w-4" />
													Process renewal
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													className="text-destructive"
													onClick={() => toast.error(`Cancel ${sub.customerName} (demo)`)}
												>
													Cancel subscription
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Churn by month</CardTitle>
					<CardDescription>Canceled subscriptions per month</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-48 w-full">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={[
									{ month: "Jan", churn: 4 },
									{ month: "Feb", churn: 3 },
									{ month: "Mar", churn: 5 },
									{ month: "Apr", churn: 2 },
									{ month: "May", churn: 6 },
									{ month: "Jun", churn: 4 },
								]}
							>
								<CartesianGrid strokeDasharray="3 3" className="stroke-border" />
								<XAxis dataKey="month" tick={{ fontSize: 12 }} />
								<YAxis tick={{ fontSize: 12 }} />
								<Tooltip {...chartTooltipProps} />
								<Bar dataKey="churn" name="Churned" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</SubscriptionsLayout>
	);
};

export default Subscriptions;
