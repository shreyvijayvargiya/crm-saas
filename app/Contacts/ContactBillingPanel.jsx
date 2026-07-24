import React, { useMemo } from "react";
import Link from "next/link";
import {
	CreditCard,
	ExternalLink,
	Repeat,
	AlertCircle,
} from "lucide-react";
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
 * Stripe-shaped billing panel for contact profiles (frontend demo only).
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
	const mrrTotal = contactSubs
		.filter((sub) => ["Active", "Trialing", "Past Due"].includes(sub.status))
		.reduce((sum, sub) => sum + (Number(sub.mrr) || 0), 0);

	return (
		<div className="space-y-4">
			<Card className={colors.shadow}>
				<CardContent className="p-5 sm:p-6">
					<div className="flex flex-wrap items-start justify-between gap-3">
						<div>
							<h2
								className={cn(
									"text-sm font-semibold flex items-center gap-2",
									colors.foreground
								)}
							>
								<CreditCard className="h-4 w-4" />
								Stripe billing
							</h2>
							<p className={cn("mt-1 text-xs", colors.mutedForeground)}>
								Demo data shaped like Stripe customers, subscriptions, and charges.
								Wire your keys later — no webhooks in this template.
							</p>
						</div>
						<Button asChild size="sm" variant="outline" className="rounded-full">
							<Link href="/settings">
								<a className="inline-flex items-center gap-1.5">
									Connect Stripe
									<ExternalLink className="h-3.5 w-3.5" />
								</a>
							</Link>
						</Button>
					</div>

					<div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
						<div
							className={cn(
								"rounded-xl border p-3",
								colors.border
							)}
						>
							<p className={cn("text-[10px] uppercase tracking-wide", colors.textMuted)}>
								Status
							</p>
							<div className="mt-1.5">
								{primarySub ? (
									<Badge
										variant="outline"
										className={statusBadgeClass(primarySub.status)}
									>
										{primarySub.status}
									</Badge>
								) : (
									<span className={cn("text-sm", colors.textSecondary)}>No plan</span>
								)}
							</div>
						</div>
						<div className={cn("rounded-xl border p-3", colors.border)}>
							<p className={cn("text-[10px] uppercase tracking-wide", colors.textMuted)}>
								Plan
							</p>
							<p className={cn("mt-1.5 text-sm font-semibold", colors.foreground)}>
								{primarySub?.planName || "—"}
							</p>
						</div>
						<div className={cn("rounded-xl border p-3", colors.border)}>
							<p className={cn("text-[10px] uppercase tracking-wide", colors.textMuted)}>
								MRR
							</p>
							<p className={cn("mt-1.5 text-sm font-semibold", colors.foreground)}>
								{mrrTotal ? formatMoney(mrrTotal) : "—"}
							</p>
						</div>
						<div className={cn("rounded-xl border p-3", colors.border)}>
							<p className={cn("text-[10px] uppercase tracking-wide", colors.textMuted)}>
								Customer
							</p>
							<p
								className={cn(
									"mt-1.5 truncate font-mono text-xs",
									colors.textSecondary
								)}
							>
								{record?.stripeCustomerId || primarySub?.stripeCustomerId || "cus_demo"}
							</p>
						</div>
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
							No subscriptions linked to this contact yet.
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
					<h3
						className={cn(
							"text-sm font-semibold flex items-center gap-2",
							colors.foreground
						)}
					>
						<CreditCard className="h-4 w-4" />
						Payment history
					</h3>
					{contactPayments.length === 0 ? (
						<div
							className={cn(
								"mt-4 flex items-start gap-2 rounded-xl border px-4 py-3 text-sm",
								colors.border,
								colors.mutedForeground
							)}
						>
							<AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
							No charges for this contact in the demo seed.
						</div>
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
								<a>All payments</a>
							</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
