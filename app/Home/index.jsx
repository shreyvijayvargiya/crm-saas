import React, { useMemo } from "react";
import Link from "next/link";
import {
	AlertTriangle,
	ArrowRight,
	CreditCard,
	DollarSign,
	ExternalLink,
	RefreshCw,
	Repeat,
	Users,
} from "lucide-react";
import { toast } from "sonner";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import SiteSeo from "@/components/seo/SiteSeo";
import { StripeConnectBanner, StripeDemoBadge } from "@/components/stripe/StripeChrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { CHART_MUTED } from "@/lib/chartColors";
import { useCrmData } from "../../utils/CrmDataContext";
import { useTheme } from "../../utils/useTheme";
import { SUBSCRIPTION_MRR_TREND } from "../Subscriptions/subscriptionsSeedData";

function formatMoney(amount) {
	const n = Number(amount);
	if (Number.isNaN(n)) return "—";
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(n);
}

function statusClass(status) {
	const s = String(status || "").toLowerCase();
	if (s === "active" || s === "completed") {
		return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400";
	}
	if (s === "trialing" || s === "pending") {
		return "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400";
	}
	if (s === "past due" || s === "failed") {
		return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400";
	}
	return "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300";
}

/**
 * Revenue home for Indie Stripe Billing OS.
 */
export default function Home() {
	const { theme } = useTheme();
	const { subscriptions, payments, contacts } = useCrmData();

	const metrics = useMemo(() => {
		const active = subscriptions.filter((s) => s.status === "Active");
		const trialing = subscriptions.filter((s) => s.status === "Trialing");
		const pastDue = subscriptions.filter((s) => s.status === "Past Due");
		const mrr = [...active, ...trialing, ...pastDue].reduce(
			(sum, s) => sum + (Number(s.mrr) || 0),
			0
		);
		const failed = payments.filter((p) => p.status === "Failed");
		const renewals = subscriptions.filter((s) => {
			if (!s.currentPeriodEnd) return false;
			const end = new Date(s.currentPeriodEnd);
			const now = new Date();
			const inWeek = new Date();
			inWeek.setDate(now.getDate() + 14);
			return end >= now && end <= inWeek && s.status === "Active";
		});
		return {
			mrr,
			active: active.length,
			trialing: trialing.length,
			pastDue: pastDue.length,
			failed,
			renewals,
			customers: contacts.length,
		};
	}, [subscriptions, payments, contacts]);

	const chartStroke = theme === "dark" ? "#a78bfa" : "#7c3aed";

	return (
		<div className="mx-auto space-y-6 p-4 sm:p-6">
			<SiteSeo
				title="Indie Stripe Revenue – Billing OS for SaaS founders"
				description="MRR, failed charges, subscriptions, and Stripe-shaped customers — frontend CRM for indie hackers."
				path="/demo"
				keywords="Stripe CRM, indie hacker billing, MRR dashboard, failed payments, SaaS subscriptions"
			/>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<div className="mb-2 flex flex-wrap items-center gap-2">
						<h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
							Revenue
						</h1>
						<StripeDemoBadge />
					</div>
					<p className="text-sm text-zinc-500 dark:text-zinc-400">
						Built for indie hackers billing on Stripe — customers, MRR, and
						failed charges in one place.
					</p>
				</div>
				<div className="flex flex-wrap gap-2">
					<Button asChild variant="outline" size="sm" className="rounded-full">
						<Link href="/contacts">
							<a>Customers</a>
						</Link>
					</Button>
					<Button asChild size="sm" className="rounded-full">
						<Link href="/failed-payments">
							<a className="inline-flex items-center gap-1.5">
								Failed charges
								<ArrowRight className="h-3.5 w-3.5" />
							</a>
						</Link>
					</Button>
				</div>
			</div>

			<StripeConnectBanner />

			<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
				{[
					{
						label: "MRR",
						value: formatMoney(metrics.mrr),
						hint: "Active + trialing + past due",
						icon: DollarSign,
					},
					{
						label: "Active subs",
						value: String(metrics.active),
						hint: `${metrics.trialing} trialing`,
						icon: Repeat,
					},
					{
						label: "Customers",
						value: String(metrics.customers),
						hint: "Stripe-shaped contacts",
						icon: Users,
					},
					{
						label: "Failed charges",
						value: String(metrics.failed.length),
						hint: "Needs retry / email",
						icon: AlertTriangle,
						danger: metrics.failed.length > 0,
					},
				].map((kpi) => (
					<Card
						key={kpi.label}
						className={cn(
							"border-zinc-200/80 shadow-sm dark:border-zinc-800",
							kpi.danger && "border-red-200 dark:border-red-900/50"
						)}
					>
						<CardContent className="p-4">
							<div className="flex items-start justify-between gap-2">
								<p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
									{kpi.label}
								</p>
								<kpi.icon
									className={cn(
										"h-4 w-4",
										kpi.danger
											? "text-red-500"
											: "text-zinc-400 dark:text-zinc-500"
									)}
								/>
							</div>
							<p
								className={cn(
									"mt-2 text-2xl font-bold tracking-tight",
									kpi.danger
										? "text-red-600 dark:text-red-400"
										: "text-zinc-900 dark:text-zinc-50"
								)}
							>
								{kpi.value}
							</p>
							<p className="mt-1 text-xs text-zinc-500">{kpi.hint}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-4 lg:grid-cols-5">
				<Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800 lg:col-span-3">
					<CardHeader className="pb-2">
						<CardTitle className="text-base">MRR trend</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={220}>
							<AreaChart
								data={SUBSCRIPTION_MRR_TREND}
								margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
							>
								<defs>
									<linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor={chartStroke} stopOpacity={0.3} />
										<stop offset="100%" stopColor={chartStroke} stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="4 4"
									className="stroke-zinc-200 dark:stroke-zinc-800"
									vertical={false}
								/>
								<XAxis
									dataKey="month"
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
									width={40}
								/>
								<Tooltip
									contentStyle={{
										borderRadius: 12,
										border: "1px solid #e4e4e7",
										fontSize: 12,
									}}
									formatter={(value) => [formatMoney(value), "MRR"]}
								/>
								<Area
									type="monotone"
									dataKey="mrr"
									stroke={chartStroke}
									fill="url(#mrrFill)"
									strokeWidth={2}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>

				<Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800 lg:col-span-2">
					<CardHeader className="pb-2">
						<div className="flex items-center justify-between gap-2">
							<CardTitle className="text-base">Renewals (14 days)</CardTitle>
							<Badge variant="secondary">{metrics.renewals.length}</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-2">
						{metrics.renewals.length === 0 ? (
							<p className="text-sm text-zinc-500">No renewals in the next 2 weeks.</p>
						) : (
							metrics.renewals.slice(0, 5).map((sub) => (
								<div
									key={sub.id}
									className="flex items-center justify-between rounded-xl border border-zinc-100 px-3 py-2 dark:border-zinc-800"
								>
									<div className="min-w-0">
										<p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-50">
											{sub.customerName}
										</p>
										<p className="truncate text-xs text-zinc-500">
											{sub.planName} ·{" "}
											{new Date(sub.currentPeriodEnd).toLocaleDateString()}
										</p>
									</div>
									<span className="shrink-0 text-sm font-semibold">
										{formatMoney(sub.mrr)}
									</span>
								</div>
							))
						)}
					</CardContent>
				</Card>
			</div>

			<Card className="border-zinc-200/80 shadow-sm dark:border-zinc-800">
				<CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2 space-y-0 pb-3">
					<div>
						<CardTitle className="flex items-center gap-2 text-base">
							<AlertTriangle className="h-4 w-4 text-red-500" />
							Failed charges queue
						</CardTitle>
						<p className="mt-1 text-xs text-zinc-500">
							The workflow indie hackers leave Stripe Dashboard for — retry or email the customer.
						</p>
					</div>
					<Button asChild size="sm" variant="outline" className="rounded-full">
						<Link href="/failed-payments">
							<a>Open queue</a>
						</Link>
					</Button>
				</CardHeader>
				<CardContent>
					{metrics.failed.length === 0 ? (
						<p className="text-sm text-zinc-500">No failed charges in demo seed.</p>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Customer</TableHead>
									<TableHead>Charge</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead>Date</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{metrics.failed.map((pay) => (
									<TableRow key={pay.id}>
										<TableCell>
											<div>
												<p className="font-medium">{pay.customer}</p>
												<p className="text-xs text-zinc-500">{pay.customerEmail}</p>
											</div>
										</TableCell>
										<TableCell className="font-mono text-xs">
											{pay.transactionId}
										</TableCell>
										<TableCell className="font-semibold text-red-600 dark:text-red-400">
											{formatMoney(pay.amount)}
										</TableCell>
										<TableCell className="text-zinc-500">{pay.date}</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-1">
												<Button
													size="sm"
													variant="outline"
													className="h-8"
													onClick={() =>
														toast.message("Demo only — retry via Stripe later")
													}
												>
													<RefreshCw className="mr-1 h-3.5 w-3.5" />
													Retry
												</Button>
												{pay.contactId ? (
													<Button asChild size="sm" variant="ghost" className="h-8">
														<Link href={`/contacts/${pay.contactId}`}>
															<a>Customer</a>
														</Link>
													</Button>
												) : null}
											</div>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			<div className="grid gap-3 sm:grid-cols-3">
				{[
					{
						href: "/subscriptions/plans",
						title: "Plans & prices",
						desc: "Stripe Products with price_… IDs",
						icon: CreditCard,
					},
					{
						href: "/subscriptions",
						title: "Subscriptions",
						desc: "Active, trialing, past due",
						icon: Repeat,
					},
					{
						href: "/payments",
						title: "All charges",
						desc: "ch_… history across customers",
						icon: DollarSign,
					},
				].map((item) => (
					<Link key={item.href} href={item.href} passHref>
						<a className="block rounded-2xl border border-zinc-200 p-4 transition hover:border-violet-300 hover:bg-violet-50/40 dark:border-zinc-800 dark:hover:border-violet-800 dark:hover:bg-violet-950/20">
							<item.icon className="mb-2 h-4 w-4 text-violet-600 dark:text-violet-400" />
							<p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
								{item.title}
							</p>
							<p className="mt-0.5 text-xs text-zinc-500">{item.desc}</p>
						</a>
					</Link>
				))}
			</div>
		</div>
	);
}
