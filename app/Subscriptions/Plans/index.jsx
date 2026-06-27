import React, { useMemo, useState } from "react";
import { Plus, Search, LayoutGrid, List } from "lucide-react";
import { toast } from "sonner";
import SubscriptionsLayout from "../SubscriptionsLayout";
import { useSubscriptionPlans } from "../../../hooks/useSubscriptionPlans";
import { FormModal, FormField } from "../../../lib/ui/modal";
import FormSelect from "../../../lib/ui/FormSelect";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

const EMPTY_PLAN = {
	name: "",
	sku: "",
	tier: "Starter",
	price: "",
	billingInterval: "Monthly",
	status: "Active",
};

const SubscriptionPlans = () => {
	const { plans, isLoading, source, createPlan } = useSubscriptionPlans();
	const [searchTerm, setSearchTerm] = useState("");
	const [viewMode, setViewMode] = useState("table");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newPlan, setNewPlan] = useState(EMPTY_PLAN);

	const filtered = useMemo(() => {
		return plans.filter(
			(p) =>
				!searchTerm ||
				p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				p.sku.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [plans, searchTerm]);

	const handleCreate = async () => {
		if (!newPlan.name.trim() || !newPlan.sku.trim()) {
			toast.error("Name and SKU are required");
			return;
		}
		try {
			const created = await createPlan(newPlan);
			toast.success(`Plan "${created.name}" created`);
			setIsModalOpen(false);
			setNewPlan(EMPTY_PLAN);
		} catch (err) {
			toast.error(err.message || "Failed to create plan");
		}
	};

	return (
		<SubscriptionsLayout
			title="Plans"
			description="Subscription plan definitions — pricing tiers, features, and billing intervals."
		>
			<Card>
				<CardHeader className="space-y-4">
					<div className="flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
						<div>
							<CardTitle>Plan catalog</CardTitle>
							<CardDescription>
								{filtered.length} plans
								{source === "pro" ? " · live database" : source === "demo" ? " · demo data" : ""}
							</CardDescription>
						</div>
						<div className="flex items-center gap-2">
							<div className="flex rounded-lg border p-0.5">
								<Button
									size="sm"
									variant={viewMode === "table" ? "default" : "ghost"}
									className="h-8 px-2"
									onClick={() => setViewMode("table")}
								>
									<List className="h-4 w-4" />
								</Button>
								<Button
									size="sm"
									variant={viewMode === "grid" ? "default" : "ghost"}
									className="h-8 px-2"
									onClick={() => setViewMode("grid")}
								>
									<LayoutGrid className="h-4 w-4" />
								</Button>
							</div>
							<Button size="sm" onClick={() => setIsModalOpen(true)}>
								<Plus className="h-4 w-4" />
								New plan
							</Button>
						</div>
					</div>
					<div className="relative max-w-sm">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search plans…"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-9"
						/>
					</div>
				</CardHeader>
				<CardContent className={viewMode === "table" ? "p-0" : "pt-0"}>
					{viewMode === "grid" ? (
						<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
							{filtered.map((plan) => (
								<Card
									key={plan.id}
									className={cn(
										"transition-colors hover:border-primary/40",
										plan.status === "Archived" && "opacity-70"
									)}
								>
									<CardContent className="p-6 space-y-4">
										<div className="flex items-start justify-between gap-2">
											<div>
												<p className="font-semibold text-lg">{plan.name}</p>
												<p className="text-xs text-muted-foreground">{plan.tier} tier</p>
											</div>
											<Badge variant={plan.status === "Active" ? "default" : "secondary"}>
												{plan.status}
											</Badge>
										</div>
										<p className="text-3xl font-bold tabular-nums">
											${plan.price}
											<span className="text-sm font-normal text-muted-foreground">
												/{plan.billingInterval.toLowerCase()}
											</span>
										</p>
										<div className="flex flex-wrap gap-1">
											{plan.features.map((f) => (
												<Badge key={f} variant="secondary" className="text-[11px] font-normal">
													{f}
												</Badge>
											))}
										</div>
										<p className="text-xs text-muted-foreground">
											{plan.activeSubscriptions} active subscriptions · {plan.maxSeats} seats max
										</p>
									</CardContent>
								</Card>
							))}
						</div>
					) : (
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Plan</TableHead>
									<TableHead>SKU</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Interval</TableHead>
									<TableHead>Features</TableHead>
									<TableHead className="text-right">Active subs</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered.map((plan) => (
									<TableRow key={plan.id}>
										<TableCell>
											<div>
												<p className="font-medium">{plan.name}</p>
												<p className="text-xs text-muted-foreground">{plan.tier} tier</p>
											</div>
										</TableCell>
										<TableCell className="font-mono text-xs text-muted-foreground">
											{plan.sku}
										</TableCell>
										<TableCell className="tabular-nums font-medium">
											${plan.price.toLocaleString()} {plan.currency}
										</TableCell>
										<TableCell>
											<Badge variant="outline">{plan.billingInterval}</Badge>
										</TableCell>
										<TableCell>
											<div className="flex flex-wrap gap-1 max-w-xs">
												{plan.features.map((feature) => (
													<Badge key={feature} variant="secondary" className="text-[11px] font-normal">
														{feature}
													</Badge>
												))}
											</div>
										</TableCell>
										<TableCell className="text-right tabular-nums">
											{plan.activeSubscriptions.toLocaleString()}
										</TableCell>
										<TableCell>
											<Badge variant={plan.status === "Active" ? "default" : "secondary"}>
												{plan.status}
											</Badge>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}
				</CardContent>
			</Card>

			<FormModal
				open={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setNewPlan(EMPTY_PLAN);
				}}
				title="New plan"
				subtitle="Define a subscription tier — add features after creation."
				onSubmit={handleCreate}
				saveLabel="Create plan"
			>
				<FormField label="Plan name" required>
					<Input
						value={newPlan.name}
						onChange={(e) => setNewPlan((p) => ({ ...p, name: e.target.value }))}
					/>
				</FormField>
				<FormField label="SKU" required>
					<Input
						value={newPlan.sku}
						onChange={(e) => setNewPlan((p) => ({ ...p, sku: e.target.value }))}
						placeholder="CRM-TIER-001"
					/>
				</FormField>
				<div className="grid grid-cols-2 gap-4">
					<FormField label="Tier">
						<FormSelect
							value={newPlan.tier}
							onChange={(e) => setNewPlan((p) => ({ ...p, tier: e.target.value }))}
							options={["Starter", "Growth", "Enterprise", "Legacy"]}
						/>
					</FormField>
					<FormField label="Price (USD)">
						<Input
							type="number"
							value={newPlan.price}
							onChange={(e) => setNewPlan((p) => ({ ...p, price: e.target.value }))}
						/>
					</FormField>
				</div>
				<FormField label="Billing interval">
					<FormSelect
						value={newPlan.billingInterval}
						onChange={(e) => setNewPlan((p) => ({ ...p, billingInterval: e.target.value }))}
						options={["Monthly", "Yearly"]}
					/>
				</FormField>
				<div className="flex items-center justify-between rounded-lg border p-4">
					<Label htmlFor="plan-active">Active on creation</Label>
					<Switch
						id="plan-active"
						checked={newPlan.status === "Active"}
						onCheckedChange={(checked) =>
							setNewPlan((p) => ({ ...p, status: checked ? "Active" : "Archived" }))
						}
					/>
				</div>
			</FormModal>
		</SubscriptionsLayout>
	);
};

export default SubscriptionPlans;
