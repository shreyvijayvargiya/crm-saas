import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	ArrowUpCircle,
	ArrowDownCircle,
	Calendar,
	Mail,
	Building2,
	CreditCard,
	MoreHorizontal,
	XCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
	findSubscription,
	findSubscriptionEvents,
	findPlan,
	getUpgradePlans,
} from "../subscriptionsSeedData";
import { useTheme } from "../../../utils/useTheme";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet } from "@/components/ui/sheet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function subscriptionStatusVariant(status) {
	if (status === "Active") return "default";
	if (status === "Trialing") return "secondary";
	if (status === "Past Due") return "destructive";
	if (status === "Canceled") return "outline";
	return "secondary";
}

function eventTypeLabel(type) {
	return type.replace(/_/g, " ");
}

function formatDate(iso) {
	if (!iso) return "—";
	return new Date(iso).toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});
}

export default function SubscriptionDetail() {
	const router = useRouter();
	const { id } = router.query;
	const { colors } = useTheme();

	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
	const [planSheetOpen, setPlanSheetOpen] = useState(false);
	const [selectedPlanId, setSelectedPlanId] = useState("");
	const [cancelAtPeriodEnd, setCancelAtPeriodEnd] = useState(true);

	const subscription = useMemo(() => (id ? findSubscription(id) : null), [id]);
	const events = useMemo(() => (id ? findSubscriptionEvents(id) : []), [id]);
	const currentPlan = useMemo(
		() => (subscription ? findPlan(subscription.planId) : null),
		[subscription]
	);
	const alternatePlans = useMemo(
		() => (subscription ? getUpgradePlans(subscription.planId) : []),
		[subscription]
	);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-muted-foreground">Loading…</p>
			</div>
		);
	}

	if (!subscription) {
		return (
			<div className="space-y-4 p-6">
				<p className="text-muted-foreground">Subscription not found.</p>
				<Button variant="outline" asChild>
					<Link href="/subscriptions">Back to subscriptions</Link>
				</Button>
			</div>
		);
	}

	const selectedPlan = alternatePlans.find((p) => p.id === selectedPlanId);

	return (
		<div className="min-h-screen pb-12">
			<div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/subscriptions">Subscriptions</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{subscription.customerName}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="flex flex-wrap items-start justify-between gap-4">
					<div className="space-y-2">
						<div className="flex flex-wrap items-center gap-3">
							<h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${colors.foreground}`}>
								{subscription.customerName}
							</h1>
							<Badge variant={subscriptionStatusVariant(subscription.status)}>
								{subscription.status}
							</Badge>
						</div>
						<p className={`text-sm ${colors.textSecondary}`}>
							{subscription.planName} · ${subscription.mrr.toFixed(2)} MRR ·{" "}
							{subscription.billingInterval}
						</p>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<MoreHorizontal className="h-4 w-4" />
								Actions
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{subscription.status !== "Canceled" && (
								<DropdownMenuItem onClick={() => setPlanSheetOpen(true)}>
									Change plan
								</DropdownMenuItem>
							)}
							<DropdownMenuItem onClick={() => toast.info("Invoice sent (demo)")}>
								Send invoice
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="text-destructive"
								onClick={() => setCancelDialogOpen(true)}
							>
								<XCircle className="h-4 w-4" />
								Cancel subscription
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Billing history</CardTitle>
								<CardDescription>Renewals, upgrades, and payment events</CardDescription>
							</CardHeader>
							<CardContent>
								{events.length === 0 ? (
									<p className="text-muted-foreground text-sm">No billing events yet.</p>
								) : (
									<ol className="relative border-l border-border ml-3 space-y-6">
										{events.map((event) => (
											<li key={event.id} className="ml-6">
												<span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
												<div className="flex flex-wrap items-start justify-between gap-2">
													<div>
														<p className="font-medium text-sm capitalize">
															{eventTypeLabel(event.eventType)}
														</p>
														<p className="text-sm text-muted-foreground">{event.description}</p>
													</div>
													<time className="text-xs text-muted-foreground whitespace-nowrap">
														{formatDate(event.createdAt)}
													</time>
												</div>
											</li>
										))}
									</ol>
								)}
							</CardContent>
						</Card>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Customer</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3 text-sm">
								<p className="flex items-center gap-2">
									<Mail className="h-4 w-4 text-muted-foreground" />
									{subscription.customerEmail}
								</p>
								{subscription.companyName && (
									<p className="flex items-center gap-2">
										<Building2 className="h-4 w-4 text-muted-foreground" />
										{subscription.companyName}
									</p>
								)}
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Current plan</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								{currentPlan && (
									<>
										<p className="font-medium">{currentPlan.name}</p>
										<p className="text-sm text-muted-foreground">
											${currentPlan.price}/{currentPlan.billingInterval.toLowerCase()}
										</p>
										<div className="flex flex-wrap gap-1">
											{currentPlan.features.map((f) => (
												<Badge key={f} variant="secondary" className="text-[11px] font-normal">
													{f}
												</Badge>
											))}
										</div>
									</>
								)}
								<dl className="space-y-2 border-t pt-3 text-sm">
									<div className="flex items-center gap-2 text-muted-foreground">
										<Calendar className="h-4 w-4" />
										<span>
											Period ends{" "}
											{subscription.currentPeriodEnd
												? new Date(subscription.currentPeriodEnd).toLocaleDateString()
												: "—"}
										</span>
									</div>
									<div className="flex items-center gap-2 text-muted-foreground">
										<CreditCard className="h-4 w-4" />
										<span>MRR ${subscription.mrr.toFixed(2)}</span>
									</div>
								</dl>
								{subscription.status !== "Canceled" && alternatePlans.length > 0 && (
									<Button
										variant="outline"
										size="sm"
										className="w-full mt-2"
										onClick={() => setPlanSheetOpen(true)}
									>
										Change plan
									</Button>
								)}
							</CardContent>
						</Card>

						{subscription.status !== "Canceled" && alternatePlans.length > 0 && (
							<Card>
								<CardHeader>
									<CardTitle>Quick plan change</CardTitle>
								</CardHeader>
								<CardContent className="space-y-3">
									{alternatePlans.slice(0, 2).map((plan) => {
										const isUpgrade = plan.price > (currentPlan?.price ?? 0);
										const Icon = isUpgrade ? ArrowUpCircle : ArrowDownCircle;
										return (
											<div
												key={plan.id}
												className="flex items-center justify-between rounded-lg border p-3"
											>
												<div className="flex items-center gap-2">
													<Icon
														className={`h-4 w-4 ${isUpgrade ? "text-emerald-500" : "text-amber-500"}`}
													/>
													<div>
														<p className="text-sm font-medium">{plan.name}</p>
														<p className="text-xs text-muted-foreground">
															${plan.price}/{plan.billingInterval.toLowerCase()}
														</p>
													</div>
												</div>
												<Button
													size="sm"
													variant="outline"
													onClick={() => {
														setSelectedPlanId(plan.id);
														setPlanSheetOpen(true);
													}}
												>
													{isUpgrade ? "Upgrade" : "Downgrade"}
												</Button>
											</div>
										);
									})}
								</CardContent>
							</Card>
						)}
					</div>
				</div>
			</div>

			<Sheet
				open={planSheetOpen}
				onOpenChange={setPlanSheetOpen}
				title="Change plan"
				description="Select a new plan for this subscription."
			>
				<div className="space-y-4">
					<RadioGroup value={selectedPlanId} onValueChange={setSelectedPlanId}>
						{alternatePlans.map((plan) => {
							const isUpgrade = plan.price > (currentPlan?.price ?? 0);
							return (
								<label
									key={plan.id}
									className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer has-[:checked]:border-primary"
								>
									<RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
									<div className="flex-1">
										<p className="font-medium">{plan.name}</p>
										<p className="text-sm text-muted-foreground">
											${plan.price}/{plan.billingInterval.toLowerCase()} ·{" "}
											{isUpgrade ? "Upgrade" : "Downgrade"}
										</p>
									</div>
								</label>
							);
						})}
					</RadioGroup>
					<Button
						className="w-full"
						disabled={!selectedPlanId}
						onClick={() => {
							toast.success(
								`Plan changed to ${selectedPlan?.name ?? "selected plan"} (demo)`
							);
							setPlanSheetOpen(false);
						}}
					>
						Confirm plan change
					</Button>
				</div>
			</Sheet>

			<Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Cancel subscription?</DialogTitle>
						<DialogDescription>
							This will stop billing for {subscription.customerName}.
						</DialogDescription>
					</DialogHeader>
					<div className="flex items-center justify-between rounded-lg border p-4">
						<div>
							<Label htmlFor="cancel-period-end">Cancel at period end</Label>
							<p className="text-xs text-muted-foreground mt-1">
								Keep access until {subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : "period ends"}
							</p>
						</div>
						<Switch
							id="cancel-period-end"
							checked={cancelAtPeriodEnd}
							onCheckedChange={setCancelAtPeriodEnd}
						/>
					</div>
					<DialogFooter>
						<Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
							Keep subscription
						</Button>
						<Button
							variant="destructive"
							onClick={() => {
								toast.success("Subscription canceled (demo)");
								setCancelDialogOpen(false);
							}}
						>
							Cancel subscription
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
