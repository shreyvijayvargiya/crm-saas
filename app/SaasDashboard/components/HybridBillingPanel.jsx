import React, { useState } from "react";
import {
	ArrowDown,
	ArrowUp,
	CreditCard,
	ExternalLink,
	Gauge,
	Minus,
	Plus,
	Receipt,
	Zap,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useChartTooltipProps } from "../../../utils/chartTooltip";
import { useTheme } from "../../../utils/useTheme";
import {
	BILLING_PLANS,
	STRIPE_PORTAL_SECTIONS,
	USAGE_DAILY,
	USAGE_METERS,
} from "../saasDashboardSeedData";

function UsageGauge({ meter }) {
	const pct = Math.min(100, Math.round((meter.used / meter.limit) * 100));
	const isHigh = pct >= 85;
	const isMid = pct >= 70 && pct < 85;

	const barColor = isHigh
		? "bg-red-500"
		: isMid
			? "bg-amber-500"
			: "bg-primary";

	const displayUsed =
		meter.unit === "GB"
			? `${meter.used} ${meter.unit}`
			: meter.used >= 1000
				? `${(meter.used / 1000).toFixed(1)}k`
				: meter.used;

	const displayLimit =
		meter.unit === "GB"
			? `${meter.limit} ${meter.unit}`
			: meter.limit >= 1000
				? `${(meter.limit / 1000).toFixed(0)}k`
				: meter.limit;

	return (
		<div className="rounded-xl border p-4">
			<div className="flex items-center justify-between">
				<p className="text-sm font-medium">{meter.label}</p>
				<Gauge className="h-4 w-4 text-muted-foreground" />
			</div>
			<div className="mt-3 flex items-baseline gap-1">
				<span className="text-2xl font-bold tabular-nums">{displayUsed}</span>
				<span className="text-sm text-muted-foreground">/ {displayLimit}</span>
			</div>
			<div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
				<div
					className={cn("h-full rounded-full transition-all", barColor)}
					style={{ width: `${pct}%` }}
				/>
			</div>
			<p className="mt-2 text-[11px] text-muted-foreground">
				{pct}% used
				{isHigh && (
					<span className="ml-1 font-medium text-red-600 dark:text-red-400">
						· Approaching limit
					</span>
				)}
			</p>
		</div>
	);
}

function StripePortalEmbed() {
	return (
		<Card className="overflow-hidden">
			<CardHeader className="border-b bg-[#f6f9fc] dark:bg-zinc-900 pb-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#635bff] text-white text-xs font-bold">
							S
						</div>
						<div>
							<CardTitle className="text-sm font-semibold text-[#0a2540] dark:text-zinc-100">
								Stripe Customer Portal
							</CardTitle>
							<CardDescription className="text-xs">
								Embedded billing portal — no redirect
							</CardDescription>
						</div>
					</div>
					<Badge variant="outline" className="gap-1 text-[10px]">
						<ExternalLink className="h-3 w-3" />
						Embedded
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="bg-[#f6f9fc] dark:bg-zinc-950 p-0">
				<div className="border-b bg-white dark:bg-zinc-900 px-6 py-4">
					<p className="text-lg font-semibold text-[#0a2540] dark:text-zinc-100">
						Manage your subscription
					</p>
					<p className="text-sm text-[#425466] dark:text-zinc-400">
						Update payment method, view invoices, or change your plan
					</p>
				</div>
				<div className="space-y-0 divide-y divide-[#e6ebf1] dark:divide-zinc-800">
					{STRIPE_PORTAL_SECTIONS.map((section) => (
						<div
							key={section.id}
							className="flex items-center justify-between bg-white dark:bg-zinc-900 px-6 py-4"
						>
							<div>
								<p className="text-sm font-medium text-[#0a2540] dark:text-zinc-200">
									{section.label}
								</p>
								<p className="text-sm text-[#425466] dark:text-zinc-400">{section.value}</p>
							</div>
							<Button
								size="sm"
								variant="outline"
								className="border-[#e6ebf1] text-[#635bff] hover:bg-[#f6f9fc]"
								onClick={() => toast.info(`Stripe portal: ${section.label}`)}
							>
								Manage
							</Button>
						</div>
					))}
				</div>
				<div className="border-t bg-white dark:bg-zinc-900 px-6 py-4">
					<Button
						className="w-full bg-[#635bff] hover:bg-[#5851ea] text-white"
						onClick={() => toast.success("Opening Stripe portal session (demo)")}
					>
						<Receipt className="h-4 w-4" />
						View all invoices
					</Button>
				</div>
			</CardContent>
		</Card>
	);
}

export default function HybridBillingPanel() {
	const chartTooltipProps = useChartTooltipProps();
	const { theme } = useTheme();
	const gridStroke = theme === "dark" ? "hsl(240 4% 16%)" : "hsl(240 5% 90%)";

	const currentPlan = BILLING_PLANS.find((p) => p.current) ?? BILLING_PLANS[2];
	const [seats, setSeats] = useState(currentPlan.seats);

	const seatCost = currentPlan.pricePerSeat * seats;

	return (
		<div className="space-y-6">
			{/* Per-seat plan management */}
			<Card>
				<CardHeader className="pb-3">
					<div className="flex items-center gap-2">
						<CreditCard className="h-4 w-4 text-primary" />
						<CardTitle className="text-base font-semibold">Per-seat plan management</CardTitle>
					</div>
					<CardDescription>
						Upgrade, downgrade, and adjust seats — hybrid with usage-based AI metering
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 lg:grid-cols-4">
						{BILLING_PLANS.map((plan) => (
							<div
								key={plan.id}
								className={cn(
									"relative rounded-xl border p-4 transition-all",
									plan.current
										? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
										: "hover:border-muted-foreground/30"
								)}
							>
								{plan.current && (
									<Badge className="absolute -top-2 right-3 text-[9px]">Current</Badge>
								)}
								<p className="text-sm font-semibold">{plan.name}</p>
								<p className="mt-1">
									<span className="text-2xl font-bold">${plan.pricePerSeat}</span>
									<span className="text-xs text-muted-foreground"> / seat / mo</span>
								</p>
								<ul className="mt-3 space-y-1">
									{plan.features.map((f) => (
										<li key={f} className="text-[11px] text-muted-foreground">
											· {f}
										</li>
									))}
								</ul>
								<Button
									size="sm"
									variant={plan.current ? "outline" : "default"}
									className="mt-4 w-full"
									disabled={plan.current}
									onClick={() => toast.info(`Switch to ${plan.name} (demo)`)}
								>
									{plan.current ? "Current plan" : plan.pricePerSeat > currentPlan.pricePerSeat ? (
										<>
											<ArrowUp className="h-3 w-3" /> Upgrade
										</>
									) : (
										<>
											<ArrowDown className="h-3 w-3" /> Downgrade
										</>
									)}
								</Button>
							</div>
						))}
					</div>

					{/* Seat adjuster */}
					<div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/20 p-4">
						<div>
							<p className="text-sm font-semibold">Adjust seats — {currentPlan.name}</p>
							<p className="text-xs text-muted-foreground">
								${currentPlan.pricePerSeat}/seat · max {currentPlan.maxSeats} seats
							</p>
						</div>
						<div className="flex items-center gap-4">
							<div className="flex items-center gap-2 rounded-lg border bg-background px-2">
								<Button
									size="icon"
									variant="ghost"
									className="h-8 w-8"
									disabled={seats <= 1}
									onClick={() => setSeats((s) => Math.max(1, s - 1))}
								>
									<Minus className="h-4 w-4" />
								</Button>
								<span className="w-8 text-center text-lg font-bold tabular-nums">{seats}</span>
								<Button
									size="icon"
									variant="ghost"
									className="h-8 w-8"
									disabled={seats >= currentPlan.maxSeats}
									onClick={() => setSeats((s) => Math.min(currentPlan.maxSeats, s + 1))}
								>
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<div className="text-right">
								<p className="text-xs text-muted-foreground">Monthly total</p>
								<p className="text-xl font-bold tabular-nums">${seatCost}</p>
							</div>
							<Button onClick={() => toast.success(`Updated to ${seats} seats`)}>
								Update seats
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Usage metering */}
			<div className="grid gap-4 lg:grid-cols-2">
				<Card>
					<CardHeader className="pb-3">
						<div className="flex items-center gap-2">
							<Zap className="h-4 w-4 text-primary" />
							<CardTitle className="text-base font-semibold">Usage-based metering</CardTitle>
						</div>
						<CardDescription>Live gauges — tokens, API calls, storage, seats</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-3 sm:grid-cols-2">
						{Object.values(USAGE_METERS).map((meter) => (
							<UsageGauge key={meter.label} meter={meter} />
						))}
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="pb-3">
						<CardTitle className="text-base font-semibold">Daily usage trend</CardTitle>
						<CardDescription>Token consumption & cost · 7 days</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="h-[260px] w-full">
							<ResponsiveContainer width="100%" height="100%">
								<AreaChart data={USAGE_DAILY}>
									<defs>
										<linearGradient id="usageTokenGrad" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
											<stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
										</linearGradient>
									</defs>
									<CartesianGrid stroke={gridStroke} strokeDasharray="4 4" vertical={false} />
									<XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
									<YAxis
										tick={{ fontSize: 11 }}
										axisLine={false}
										tickLine={false}
										tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
									/>
									<Tooltip {...chartTooltipProps} />
									<Area
										type="monotone"
										dataKey="tokens"
										name="Tokens"
										stroke="hsl(var(--primary))"
										strokeWidth={2}
										fill="url(#usageTokenGrad)"
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Stripe portal */}
			<StripePortalEmbed />
		</div>
	);
}
