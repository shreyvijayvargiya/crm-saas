"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, ArrowRight } from "lucide-react";

const DEFAULT_TENANT_ID = "00000000-0000-0000-0000-000000000001";

interface AddCompanyWizardProps {
	open: boolean;
	onClose: () => void;
	onSuccess: (entityId: string) => void;
}

export function AddCompanyWizard({
	open,
	onClose,
	onSuccess,
}: AddCompanyWizardProps) {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		// Step 1
		entity_type: "COMPANY" as "COMPANY" | "INDIVIDUAL",
		legal_name: "",
		display_name: "",
		country: "",
		default_currency: "USD",
		// Step 2
		relationship_type: "",
		is_primary: false,
	});

	const handleStep1Submit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.legal_name || !formData.display_name) {
			alert("Please fill in all required fields");
			return;
		}
		setStep(2);
	};

	const handleStep2Submit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.relationship_type) {
			alert("Please select a relationship type");
			return;
		}

		setLoading(true);
		try {
			// Get current user (for MVP, we'll use a default)
			const userData = localStorage.getItem("user");
			const userId = userData ? JSON.parse(userData).userId : null;

			// Step 1: Create Entity
			const { data: entityData, error: entityError } = await supabase
				.from("entity")
				.insert({
					entity_type: formData.entity_type,
					legal_name: formData.legal_name,
					display_name: formData.display_name,
					country: formData.country || null,
					default_currency: formData.default_currency,
					status: "ACTIVE",
					created_by_user_id: userId,
				})
				.select()
				.single();

			if (entityError) throw entityError;

			// Step 2: Create EntityRole
			const { error: roleError } = await supabase.from("entity_role").insert({
				entity_id: entityData.entity_id,
				tenant_id: DEFAULT_TENANT_ID,
				relationship_type: formData.relationship_type,
				is_primary: formData.is_primary,
			});

			if (roleError) throw roleError;

			// Reset form and close
			setFormData({
				entity_type: "COMPANY",
				legal_name: "",
				display_name: "",
				country: "",
				default_currency: "USD",
				relationship_type: "",
				is_primary: false,
			});
			setStep(1);
			onSuccess(entityData.entity_id);
			router.push(`/companies/${entityData.entity_id}`);
		} catch (error) {
			console.error("Error creating company:", error);
			alert("Failed to create company. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleClose = () => {
		setStep(1);
		setFormData({
			entity_type: "COMPANY",
			legal_name: "",
			display_name: "",
			country: "",
			default_currency: "USD",
			relationship_type: "",
			is_primary: false,
		});
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="sm:max-w-[600px]">
				<DialogHeader>
					<DialogTitle>
						{step === 1
							? "Add Company - Basic Details"
							: "Add Company - Relationship"}
					</DialogTitle>
					<DialogDescription>
						{step === 1
							? "Enter the basic information for this company or individual"
							: "Define the business relationship with this company"}
					</DialogDescription>
				</DialogHeader>

				{step === 1 ? (
					<form onSubmit={handleStep1Submit} className="space-y-4">
						<div className="space-y-2">
							<Label>Type</Label>
							<div className="flex gap-4">
								<Button
									type="button"
									variant={
										formData.entity_type === "COMPANY" ? "default" : "outline"
									}
									onClick={() =>
										setFormData({ ...formData, entity_type: "COMPANY" })
									}
									className="flex-1"
								>
									Company
								</Button>
								<Button
									type="button"
									variant={
										formData.entity_type === "INDIVIDUAL"
											? "default"
											: "outline"
									}
									onClick={() =>
										setFormData({ ...formData, entity_type: "INDIVIDUAL" })
									}
									className="flex-1"
								>
									Individual
								</Button>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor="legal_name">Legal Name *</Label>
							<Input
								id="legal_name"
								value={formData.legal_name}
								onChange={(e) =>
									setFormData({ ...formData, legal_name: e.target.value })
								}
								placeholder="Enter legal name"
								required
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="display_name">Display Name *</Label>
							<Input
								id="display_name"
								value={formData.display_name}
								onChange={(e) =>
									setFormData({ ...formData, display_name: e.target.value })
								}
								placeholder="Enter display name"
								required
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="country">Country</Label>
								<Input
									id="country"
									value={formData.country}
									onChange={(e) =>
										setFormData({ ...formData, country: e.target.value })
									}
									placeholder="e.g., USA"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="default_currency">Default Currency</Label>
								<Select
									value={formData.default_currency}
									onValueChange={(value) =>
										setFormData({ ...formData, default_currency: value })
									}
								>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="USD">USD</SelectItem>
										<SelectItem value="EUR">EUR</SelectItem>
										<SelectItem value="GBP">GBP</SelectItem>
										<SelectItem value="AUD">AUD</SelectItem>
										<SelectItem value="CAD">CAD</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>

						<DialogFooter>
							<Button type="button" variant="outline" onClick={handleClose}>
								Cancel
							</Button>
							<Button type="submit">
								Next
								<ArrowRight className="h-4 w-4 ml-2" />
							</Button>
						</DialogFooter>
					</form>
				) : (
					<form onSubmit={handleStep2Submit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="relationship_type">Relationship Type *</Label>
							<Select
								value={formData.relationship_type}
								onValueChange={(value) =>
									setFormData({ ...formData, relationship_type: value })
								}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select relationship type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="CUSTOMER">Customer</SelectItem>
									<SelectItem value="BUILDER">Builder</SelectItem>
									<SelectItem value="CET_SUPPLIER">CET Supplier</SelectItem>
									<SelectItem value="DISTRIBUTOR">Distributor</SelectItem>
									<SelectItem value="MANUFACTURING_PARTNER">
										Manufacturing Partner
									</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label htmlFor="is_primary">Primary Relationship</Label>
								<p className="text-sm text-muted-foreground">
									Mark this as the primary business relationship
								</p>
							</div>
							<Switch
								id="is_primary"
								checked={formData.is_primary}
								onCheckedChange={(checked) =>
									setFormData({ ...formData, is_primary: checked })
								}
							/>
						</div>

						<DialogFooter>
							<Button
								type="button"
								variant="outline"
								onClick={() => setStep(1)}
							>
								<ArrowLeft className="h-4 w-4 mr-2" />
								Back
							</Button>
							<Button type="submit" disabled={loading}>
								{loading ? "Creating..." : "Create Company"}
							</Button>
						</DialogFooter>
					</form>
				)}
			</DialogContent>
		</Dialog>
	);
}
