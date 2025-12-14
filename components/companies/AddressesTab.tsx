"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";

interface Address {
	address_id: string;
	entity_id: string;
	address_type: string;
	street_address: string | null;
	city: string | null;
	state_province: string | null;
	postal_code: string | null;
	country: string | null;
	is_primary: boolean;
}

interface AddressesTabProps {
	entityId: string;
}

export function AddressesTab({ entityId }: AddressesTabProps) {
	const [addresses, setAddresses] = useState<Address[]>([]);
	const [loading, setLoading] = useState(true);
	const [showAddModal, setShowAddModal] = useState(false);
	const [formData, setFormData] = useState({
		address_type: "PRIMARY",
		street_address: "",
		city: "",
		state_province: "",
		postal_code: "",
		country: "",
		is_primary: false,
	});

	useEffect(() => {
		fetchAddresses();
	}, [entityId]);

	const fetchAddresses = async () => {
		try {
			const { data, error } = await supabase
				.from("address")
				.select("*")
				.eq("entity_id", entityId)
				.order("created_at", { ascending: false });

			if (error) throw error;
			setAddresses(data || []);
		} catch (error) {
			console.error("Error fetching addresses:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleAddAddress = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const { error } = await supabase.from("address").insert({
				entity_id: entityId,
				address_type: formData.address_type,
				street_address: formData.street_address || null,
				city: formData.city || null,
				state_province: formData.state_province || null,
				postal_code: formData.postal_code || null,
				country: formData.country || null,
				is_primary: formData.is_primary,
			});

			if (error) throw error;

			setFormData({
				address_type: "PRIMARY",
				street_address: "",
				city: "",
				state_province: "",
				postal_code: "",
				country: "",
				is_primary: false,
			});
			setShowAddModal(false);
			fetchAddresses();
		} catch (error) {
			console.error("Error adding address:", error);
			alert("Failed to add address. Please try again.");
		}
	};

	const handleRemoveAddress = async (addressId: string) => {
		if (!confirm("Are you sure you want to remove this address?")) return;

		try {
			const { error } = await supabase
				.from("address")
				.delete()
				.eq("address_id", addressId);

			if (error) throw error;
			fetchAddresses();
		} catch (error) {
			console.error("Error removing address:", error);
			alert("Failed to remove address. Please try again.");
		}
	};

	if (loading) {
		return <div>Loading addresses...</div>;
	}

	return (
		<Card>
			<CardHeader>
				<div className="flex justify-between items-center">
					<div>
						<CardTitle>Addresses</CardTitle>
						<CardDescription>Manage addresses for this company</CardDescription>
					</div>
					<Button onClick={() => setShowAddModal(true)}>
						<Plus className="h-4 w-4 mr-2" />
						Add Address
					</Button>
				</div>
			</CardHeader>
			<CardContent>
				{addresses.length === 0 ? (
					<div className="py-8 text-center text-zinc-500">
						No addresses found. Add your first address to get started.
					</div>
				) : (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Type</TableHead>
								<TableHead>Address</TableHead>
								<TableHead>City</TableHead>
								<TableHead>Country</TableHead>
								<TableHead>Primary</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{addresses.map((address) => (
								<TableRow key={address.address_id}>
									<TableCell className="font-medium">
										{address.address_type}
									</TableCell>
									<TableCell>
										{address.street_address || "—"}
										{address.postal_code && (
											<span className="text-muted-foreground">
												{" "}
												{address.postal_code}
											</span>
										)}
									</TableCell>
									<TableCell>
										{address.city || "—"}
										{address.state_province && (
											<span className="text-muted-foreground">
												, {address.state_province}
											</span>
										)}
									</TableCell>
									<TableCell>{address.country || "—"}</TableCell>
									<TableCell>
										{address.is_primary ? (
											<Badge variant="success">Yes</Badge>
										) : (
											<Badge variant="secondary">No</Badge>
										)}
									</TableCell>
									<TableCell className="text-right">
										<Button
											variant="ghost"
											size="sm"
											onClick={() => handleRemoveAddress(address.address_id)}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</CardContent>

			{/* Add Address Modal */}
			<Dialog open={showAddModal} onOpenChange={setShowAddModal}>
				<DialogContent className="max-w-2xl">
					<DialogHeader>
						<DialogTitle>Add Address</DialogTitle>
						<DialogDescription>
							Add a new address for this company
						</DialogDescription>
					</DialogHeader>
					<form onSubmit={handleAddAddress} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="address_type">Address Type</Label>
							<Select
								value={formData.address_type}
								onValueChange={(value) =>
									setFormData({ ...formData, address_type: value })
								}
							>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="PRIMARY">Primary</SelectItem>
									<SelectItem value="BILLING">Billing</SelectItem>
									<SelectItem value="SHIPPING">Shipping</SelectItem>
									<SelectItem value="OTHER">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="space-y-2">
							<Label htmlFor="street_address">Street Address</Label>
							<Textarea
								id="street_address"
								value={formData.street_address}
								onChange={(e) =>
									setFormData({ ...formData, street_address: e.target.value })
								}
								rows={2}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="city">City</Label>
								<Input
									id="city"
									value={formData.city}
									onChange={(e) =>
										setFormData({ ...formData, city: e.target.value })
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="state_province">State / Province</Label>
								<Input
									id="state_province"
									value={formData.state_province}
									onChange={(e) =>
										setFormData({ ...formData, state_province: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor="postal_code">Postal Code</Label>
								<Input
									id="postal_code"
									value={formData.postal_code}
									onChange={(e) =>
										setFormData({ ...formData, postal_code: e.target.value })
									}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="country">Country</Label>
								<Input
									id="country"
									value={formData.country}
									onChange={(e) =>
										setFormData({ ...formData, country: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="flex items-center justify-between">
							<div className="space-y-0.5">
								<Label htmlFor="is_primary">Primary Address</Label>
								<p className="text-sm text-muted-foreground">
									Mark this as the primary address
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
								onClick={() => setShowAddModal(false)}
							>
								Cancel
							</Button>
							<Button type="submit">Add Address</Button>
						</DialogFooter>
					</form>
				</DialogContent>
			</Dialog>
		</Card>
	);
}
