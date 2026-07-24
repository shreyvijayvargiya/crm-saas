import React, { useMemo } from "react";
import Link from "next/link";
import { AlertTriangle, Mail, RefreshCw } from "lucide-react";
import { toast } from "sonner";
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
import { useCrmData } from "../../utils/CrmDataContext";

function formatMoney(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(Number(amount) || 0);
}

/**
 * Failed charges / dunning queue — core indie Stripe workflow (UI only).
 */
export default function FailedPayments() {
	const { payments, subscriptions } = useCrmData();

	const rows = useMemo(() => {
		const failed = payments.filter((p) => p.status === "Failed");
		const pastDue = subscriptions.filter((s) => s.status === "Past Due");
		return { failed, pastDue };
	}, [payments, subscriptions]);

	return (
		<div className="space-y-6 p-4 sm:p-6">
			<SiteSeo
				title="Failed charges – Indie Stripe Billing OS"
				description="Dunning queue for failed Stripe charges and past-due subscriptions."
				path="/failed-payments"
			/>

			<div className="flex flex-wrap items-center gap-2">
				<h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
					Failed charges
				</h1>
				<StripeDemoBadge />
			</div>
			<p className="text-sm text-zinc-500 dark:text-zinc-400">
				When a card fails, work the queue here instead of tab-switching to Stripe Dashboard.
			</p>

			<StripeConnectBanner />

			<div className="grid gap-3 sm:grid-cols-2">
				<Card>
					<CardContent className="flex items-center gap-3 p-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-600">
							<AlertTriangle className="h-5 w-5" />
						</div>
						<div>
							<p className="text-xs uppercase tracking-wide text-zinc-500">Failed charges</p>
							<p className="text-2xl font-bold">{rows.failed.length}</p>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex items-center gap-3 p-4">
						<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
							<AlertTriangle className="h-5 w-5" />
						</div>
						<div>
							<p className="text-xs uppercase tracking-wide text-zinc-500">Past due subs</p>
							<p className="text-2xl font-bold">{rows.pastDue.length}</p>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-base">Charge failures</CardTitle>
				</CardHeader>
				<CardContent>
					{rows.failed.length === 0 ? (
						<p className="text-sm text-zinc-500">No failed charges.</p>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Customer</TableHead>
									<TableHead>Charge ID</TableHead>
									<TableHead>Reason</TableHead>
									<TableHead>Amount</TableHead>
									<TableHead className="text-right">Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{rows.failed.map((pay) => (
									<TableRow key={pay.id}>
										<TableCell>
											<p className="font-medium">{pay.customer}</p>
											<p className="text-xs text-zinc-500">{pay.customerEmail}</p>
										</TableCell>
										<TableCell className="font-mono text-xs">
											{pay.transactionId}
										</TableCell>
										<TableCell>
											<Badge variant="outline" className="border-red-200 text-red-700">
												card_declined
											</Badge>
										</TableCell>
										<TableCell className="font-semibold text-red-600">
											{formatMoney(pay.amount)}
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-1">
												<Button
													size="sm"
													variant="outline"
													onClick={() =>
														toast.message("Demo — wire Stripe PaymentIntent retry")
													}
												>
													<RefreshCw className="mr-1 h-3.5 w-3.5" />
													Retry
												</Button>
												<Button
													size="sm"
													variant="ghost"
													onClick={() =>
														toast.message("Demo — open past_due email template")
													}
												>
													<Mail className="mr-1 h-3.5 w-3.5" />
													Email
												</Button>
												{pay.contactId ? (
													<Button asChild size="sm" variant="ghost">
														<Link href={`/contacts/${pay.contactId}`}>
															<a>Open</a>
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

			<Card>
				<CardHeader>
					<CardTitle className="text-base">Past due subscriptions</CardTitle>
				</CardHeader>
				<CardContent>
					{rows.pastDue.length === 0 ? (
						<p className="text-sm text-zinc-500">No past due subscriptions.</p>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Customer</TableHead>
									<TableHead>Plan</TableHead>
									<TableHead>MRR</TableHead>
									<TableHead>Stripe sub</TableHead>
									<TableHead className="text-right">Open</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{rows.pastDue.map((sub) => (
									<TableRow key={sub.id}>
										<TableCell>
											<p className="font-medium">{sub.customerName}</p>
											<p className="text-xs text-zinc-500">{sub.customerEmail}</p>
										</TableCell>
										<TableCell>{sub.planName}</TableCell>
										<TableCell>{formatMoney(sub.mrr)}</TableCell>
										<TableCell className="font-mono text-xs">
											{sub.stripeSubscriptionId || sub.id}
										</TableCell>
										<TableCell className="text-right">
											<div className="flex justify-end gap-1">
												<Button asChild size="sm" variant="ghost">
													<Link href={`/subscriptions/${sub.id}`}>
														<a>Subscription</a>
													</Link>
												</Button>
												{sub.contactId ? (
													<Button asChild size="sm" variant="outline">
														<Link href={`/contacts/${sub.contactId}`}>
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
		</div>
	);
}
