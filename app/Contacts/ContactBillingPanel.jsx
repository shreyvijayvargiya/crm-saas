import React, { useMemo } from "react";
import Link from "next/link";
import {
	CreditCard,
	ExternalLink,
	Mail,
	RefreshCw,
	Repeat,
	XCircle,
} from "lucide-react";
import { toast } from "sonner";
import { StripeDemoBadge } from "@/components/stripe/StripeChrome";
import { useTheme } from "../../utils/useTheme";
import { useCrmData } from "../../utils/CrmDataContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

function statusBadgeClass(status) {
	const s = String(status || "").toLowerCase();
	if (s === "active" || s === "completed" || s === "paid" || s === "succeeded") {
		return "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50";
	}
	if (s === "trialing" || s === "pending") {
		return "bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800/50";
	}
	if (s === "past due" || s === "failed" || s === "canceled" || s === "cancelled") {
		return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800/50";
	}
	return "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700";
}

function formatMoney(amount) {
	const n = Number(amount);
	if (Number.isNaN(n)) return String(amount ?? "—");
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 2,
	}).format(n);
}

/**
 * Stripe customer billing hero for contact profiles (frontend demo only).
 */
export default function ContactBillingPanel({ record }) {
	const { colors } = useTheme();
	const { subscriptions, payments } = useCrmData();

	const email = String(record?.email || "").toLowerCase();
	const contactId = String(record?.id || "");

	const contactSubs = useMemo(() => {
		return (subscriptions || []).filter(
			(sub) =>
				String(sub.contactId || "") === contactId ||
				String(sub.customerEmail || "").toLowerCase() === email
		);
	}, [subscriptions, contactId, email]);

	const contactPayments = useMemo(() => {
		return (payments || []).filter(
			(pay) =>
				String(pay.contactId || "") === contactId ||
				String(pay.customerEmail || "").toLowerCase() === email
		);
	}, [payments, contactId, email]);

	const primarySub = contactSubs[0];
	const failed = contactPayments.filter((p) => p.status === "Failed");
	const mrrTotal = contactSubs
		.filter((sub) => ["Active", "Trialing", "Past Due"].includes(sub.status))
		.reduce((sum, sub) => sum + (Number(sub.mrr) || 0), 0);
	const cusId =
		record?.stripeCustomerId || primarySub?.stripeCustomerId || "cus_demo";
	const nextRenewal = primarySub?.currentPeriodEnd
		? new Date(primarySub.currentPeriodEnd).toLocaleDateString()
		: "—";
	const paymentMethod =
		contactPayments.find((p) => p.status === "Completed")?.paymentMethod ||
		"Visa ···· 4242";

	return (
		<div className="space-y-4">
			{failed.length > 0 ? (
				<div className="flex flex-col gap-2 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-950/30 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-start gap-2">
						<XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
						<div>
							<p className="text-sm font-semibold text-red-800 dark:text-red-300">
								{failed.length} failed charge{failed.length > 1 ? "s" : ""}
							</p>
							<p className="text-xs text-red-700/80 dark:text-red-400/80">
								Card declined — retry or email this customer from the dunning queue.
							</p>
						</div>
					</div>
					<div className="flex gap-2">
						<Button
							size="sm"
							variant="outline"
							onClick={() => toast.message("Demo — Stripe PaymentIntent retry")}
						>
							<RefreshCw className="mr-1 h-3.5 w-3.5" />
							Retry
						</Button>
						<Button asChild size="sm">
							<Link href="/failed-payments">
								<a>Open queue</a>
							</Link>
						</Button>
					</div>
				</div>
			) : null}

			<Card className={colors.shadow}>
				<CardContent className="p-5 sm:p-6">
					<div className="flex flex-wrap items-start justify-between gap-3">
						<div>
							<div className="mb-1 flex flex-wrap items-center gap-2">
								<h2
									className={cn(
										"text-sm font-semibold flex items-center gap-2",
										colors.foreground
									)}
								>
									<img
										src="/companies/stripe.png"
										alt=""
										className="h-4 w-4 rounded-sm object-contain"
									/>
									Stripe customer
								</h2>
								<StripeDemoBadge />
							</div>
							<p className={cn("font-mono text-xs", colors.mutedForeground)}>
								{cusId}
							</p>
						</div>
						<div className="flex flex-wrap gap-2">
							<Button
								size="sm"
								variant="outline"
								className="rounded-full"
								onClick={() =>
									toast.message("Demo — opens customer in Stripe Dashboard")
								}
							>
								Open in Stripe
								<ExternalLink className="ml-1.5 h-3.5 w-3.5" />
							</Button>
							<Button
								size="sm"
								variant="outline"
								className="rounded-full"
								onClick={() => toast.message("Demo — send invoice UI")}
							>
								Send invoice
							</Button>
							<Button
								size="sm"
								variant="ghost"
								className="rounded-full"
								onClick={() =>
									toast.message("Demo — cancel at period end")
								}
							>
								Cancel at period end
							</Button>
						</div>
					</div>

					<div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
						{[
							{
								label: "Status",
								node: primarySub ? (
									<Badge
										variant="outline"
										className={statusBadgeClass(primarySub.status)}
									>
										{primarySub.status}
									</Badge>
								) : (
									<span className={cn("text-sm", colors.textSecondary)}>No plan</span>
								),
							},
							{ label: "Plan", value: primarySub?.planName || "—" },
							{ label: "MRR", value: mrrTotal ? formatMoney(mrrTotal) : "—" },
							{ label: "Next renewal", value: nextRenewal },
							{ label: "Payment method", value: paymentMethod },
							{
								label: "Subscription",
								value: primarySub?.stripeSubscriptionId || "—",
								mono: true,
							},
						].map((item) => (
							<div
								key={item.label}
								className={cn("rounded-xl border p-3", colors.border)}
							>
								<p
									className={cn(
										"text-[10px] uppercase tracking-wide",
										colors.textMuted
									)}
								>
									{item.label}
								</p>
								<div className="mt-1.5">
									{item.node || (
										<p
											className={cn(
												"text-sm font-semibold truncate",
												item.mono && "font-mono text-xs",
												colors.foreground
											)}
										>
											{item.value}
										</p>
									)}
								</div>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			<Card className={colors.shadow}>
				<CardContent className="p-5 sm:p-6">
					<h3
						className={cn(
							"text-sm font-semibold flex items-center gap-2",
							colors.foreground
						)}
					>
						<Repeat className="h-4 w-4" />
						Subscriptions
					</h3>
					{contactSubs.length === 0 ? (
						<p className={cn("mt-4 text-sm", colors.mutedForeground)}>
							No subscriptions linked to this customer yet.
						</p>
					) : (
						<div className="mt-4 overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Plan</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>MRR</TableHead>
										<TableHead>Period end</TableHead>
										<TableHead className="text-right">Open</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{contactSubs.map((sub) => (
										<TableRow key={sub.id}>
											<TableCell className="font-medium">{sub.planName}</TableCell>
											<TableCell>
												<Badge
													variant="outline"
													className={statusBadgeClass(sub.status)}
												>
													{sub.status}
												</Badge>
											</TableCell>
											<TableCell>{formatMoney(sub.mrr)}</TableCell>
											<TableCell className={colors.textSecondary}>
												{sub.currentPeriodEnd
													? new Date(sub.currentPeriodEnd).toLocaleDateString()
													: "—"}
											</TableCell>
											<TableCell className="text-right">
												<Button asChild size="sm" variant="ghost">
													<Link href={`/subscriptions/${sub.id}`}>
														<a>View</a>
													</Link>
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}
				</CardContent>
			</Card>

			<Card className={colors.shadow}>
				<CardContent className="p-5 sm:p-6">
					<div className="flex flex-wrap items-center justify-between gap-2">
						<h3
							className={cn(
								"text-sm font-semibold flex items-center gap-2",
								colors.foreground
							)}
						>
							<CreditCard className="h-4 w-4" />
							Charge history
						</h3>
						<Button
							size="sm"
							variant="ghost"
							onClick={() => toast.message("Demo — email receipt")}
						>
							<Mail className="mr-1 h-3.5 w-3.5" />
							Email receipt
						</Button>
					</div>
					{contactPayments.length === 0 ? (
						<p className={cn("mt-4 text-sm", colors.mutedForeground)}>
							No charges for this customer in the demo seed.
						</p>
					) : (
						<div className="mt-4 overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Charge</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Date</TableHead>
										<TableHead>Method</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{contactPayments.map((pay) => (
										<TableRow key={pay.id}>
											<TableCell className="font-mono text-xs">
												{pay.transactionId}
											</TableCell>
											<TableCell className="font-medium">
												{formatMoney(pay.amount)}
											</TableCell>
											<TableCell>
												<Badge
													variant="outline"
													className={statusBadgeClass(pay.status)}
												>
													{pay.status}
												</Badge>
											</TableCell>
											<TableCell className={colors.textSecondary}>
												{pay.date}
											</TableCell>
											<TableCell className={colors.textSecondary}>
												{pay.paymentMethod}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					)}
					<div className="mt-4 flex justify-end">
						<Button asChild size="sm" variant="outline">
							<Link href="/payments">
								<a>All charges</a>
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
