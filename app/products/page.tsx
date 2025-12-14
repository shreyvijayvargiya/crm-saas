"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useItems } from "@/lib/hooks/useItems";
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MoreVertical, Eye, Edit, Archive, Search } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function ProductsPage() {
	const router = useRouter();
	const [showAddModal, setShowAddModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState<string>("all");
	const [formData, setFormData] = useState({
		item_code: "",
		item_name: "",
		item_type: "RAW_MATERIAL",
		is_sales_item: false,
		is_purchase_item: false,
		is_manufactured_item: false,
		sales_price: "",
		standard_cost: "",
		description: "",
	});

	const {
		items,
		isLoading,
		createItemAsync,
		isCreating,
		updateItemAsync,
		isUpdating,
		createError,
	} = useItems(filterType);

	const handleAddItem = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.item_code || !formData.item_name) {
			alert("Please fill in all required fields");
			return;
		}

		try {
			const userData = localStorage.getItem("user");
			const userId = userData ? JSON.parse(userData).userId : null;

			await createItemAsync({
				item_code: formData.item_code,
				item_name: formData.item_name,
				item_type: formData.item_type,
				is_sales_item: formData.is_sales_item,
				is_purchase_item: formData.is_purchase_item,
				is_manufactured_item: formData.is_manufactured_item,
				sales_price: formData.sales_price
					? parseFloat(formData.sales_price)
					: 0,
				standard_cost: formData.standard_cost
					? parseFloat(formData.standard_cost)
					: 0,
				description: formData.description || null,
				created_by_user_id: userId,
			});

			setFormData({
				item_code: "",
				item_name: "",
				item_type: "RAW_MATERIAL",
				is_sales_item: false,
				is_purchase_item: false,
				is_manufactured_item: false,
				sales_price: "",
				standard_cost: "",
				description: "",
			});
			setShowAddModal(false);
		} catch (error: any) {
			console.error("Error adding item:", error);
			if (error.code === "23505") {
				alert("Item code already exists. Please use a different code.");
			} else {
				alert("Failed to add item. Please try again.");
			}
		}
	};

	const handleArchive = async (itemId: string) => {
		try {
			await updateItemAsync({
				item_id: itemId,
				active: false,
			});
		} catch (error) {
			console.error("Error archiving item:", error);
			alert("Failed to archive item. Please try again.");
		}
	};

	const formatItemType = (type: string) => {
		return type
			.split("_")
			.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
			.join(" ");
	};

	const filteredItems = items.filter((item) => {
		if (searchTerm) {
			return (
				item.item_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}
		return true;
	});

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div>Loading...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-zinc-50">
			<main className="container mx-auto px-4 py-8">
				<div className="mb-6 flex justify-between items-center">
					<div>
						<h1 className="text-3xl font-bold">Products</h1>
						<p className="text-muted-foreground mt-1">
							Manage your products and inventory items
						</p>
					</div>
					<Button onClick={() => setShowAddModal(true)}>
						<Plus className="h-4 w-4 mr-2" />
						Add Item
					</Button>
				</div>

				{/* Filters */}
				<Card className="mb-6">
					<CardContent className="pt-6">
						<div className="flex gap-4">
							<div className="flex-1">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
									<Input
										placeholder="Search by code or name..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="pl-10"
									/>
								</div>
							</div>
							<div className="w-48">
								<Select value={filterType} onValueChange={setFilterType}>
									<SelectTrigger>
										<SelectValue placeholder="Filter by type" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Types</SelectItem>
										<SelectItem value="RAW_MATERIAL">Raw Material</SelectItem>
										<SelectItem value="SUBASSEMBLY">Subassembly</SelectItem>
										<SelectItem value="HOUSE_KIT">House Kit</SelectItem>
										<SelectItem value="SERVICE">Service</SelectItem>
										<SelectItem value="CONSUMABLE">Consumable</SelectItem>
										<SelectItem value="PACKAGING">Packaging</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>All Items</CardTitle>
						<CardDescription>
							View and manage all products and inventory items
						</CardDescription>
					</CardHeader>
					<CardContent>
						{filteredItems.length === 0 ? (
							<div className="py-8 text-center text-zinc-500">
								No items found. Add your first item to get started.
							</div>
						) : (
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Item Code</TableHead>
										<TableHead>Item Name</TableHead>
										<TableHead>Type</TableHead>
										<TableHead>Sales Price</TableHead>
										<TableHead>Standard Cost</TableHead>
										<TableHead>Flags</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filteredItems.map((item) => (
										<TableRow key={item.item_id}>
											<TableCell className="font-medium">
												{item.item_code}
											</TableCell>
											<TableCell>{item.item_name}</TableCell>
											<TableCell>
												<Badge variant="outline">
													{formatItemType(item.item_type)}
												</Badge>
											</TableCell>
											<TableCell>
												$
												{parseFloat(
													item.sales_price?.toString() || "0"
												).toFixed(2)}
											</TableCell>
											<TableCell>
												$
												{parseFloat(
													item.standard_cost?.toString() || "0"
												).toFixed(2)}
											</TableCell>
											<TableCell>
												<div className="flex gap-1 flex-wrap">
													{item.is_sales_item && (
														<Badge variant="success" className="text-xs">
															Sales
														</Badge>
													)}
													{item.is_purchase_item && (
														<Badge variant="warning" className="text-xs">
															Purchase
														</Badge>
													)}
													{item.is_manufactured_item && (
														<Badge variant="default" className="text-xs">
															Manufactured
														</Badge>
													)}
												</div>
											</TableCell>
											<TableCell>
												<Badge variant={item.active ? "success" : "secondary"}>
													{item.active ? "Active" : "Inactive"}
												</Badge>
											</TableCell>
											<TableCell className="text-right">
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon">
															<MoreVertical className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem
															onClick={() =>
																router.push(`/products/${item.item_id}`)
															}
														>
															<Eye className="h-4 w-4 mr-2" />
															View
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() =>
																router.push(`/products/${item.item_id}/edit`)
															}
														>
															<Edit className="h-4 w-4 mr-2" />
															Edit
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => handleArchive(item.item_id)}
														>
															<Archive className="h-4 w-4 mr-2" />
															{item.active ? "Archive" : "Activate"}
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</CardContent>
				</Card>

				{/* Add Item Modal */}
				<Dialog open={showAddModal} onOpenChange={setShowAddModal}>
					<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
						<DialogHeader>
							<DialogTitle>Add New Item</DialogTitle>
							<DialogDescription>
								Create a new product or inventory item
							</DialogDescription>
						</DialogHeader>
						<form onSubmit={handleAddItem} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="item_code">Item Code *</Label>
									<Input
										id="item_code"
										value={formData.item_code}
										onChange={(e) =>
											setFormData({ ...formData, item_code: e.target.value })
										}
										placeholder="e.g., KIT-HOUSE-2BR60"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="item_type">Item Type *</Label>
									<Select
										value={formData.item_type}
										onValueChange={(value) =>
											setFormData({ ...formData, item_type: value })
										}
									>
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="RAW_MATERIAL">Raw Material</SelectItem>
											<SelectItem value="SUBASSEMBLY">Subassembly</SelectItem>
											<SelectItem value="HOUSE_KIT">House Kit</SelectItem>
											<SelectItem value="SERVICE">Service</SelectItem>
											<SelectItem value="CONSUMABLE">Consumable</SelectItem>
											<SelectItem value="PACKAGING">Packaging</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="item_name">Item Name *</Label>
								<Input
									id="item_name"
									value={formData.item_name}
									onChange={(e) =>
										setFormData({ ...formData, item_name: e.target.value })
									}
									placeholder="e.g., 2 Bedroom 60m² House Kit"
									required
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="sales_price">Sales Price</Label>
									<Input
										id="sales_price"
										type="number"
										step="0.01"
										value={formData.sales_price}
										onChange={(e) =>
											setFormData({ ...formData, sales_price: e.target.value })
										}
										placeholder="0.00"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="standard_cost">Standard Cost</Label>
									<Input
										id="standard_cost"
										type="number"
										step="0.01"
										value={formData.standard_cost}
										onChange={(e) =>
											setFormData({
												...formData,
												standard_cost: e.target.value,
											})
										}
										placeholder="0.00"
									/>
								</div>
							</div>
							<div className="space-y-2">
								<Label>Item Flags</Label>
								<div className="flex gap-4">
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={formData.is_sales_item}
											onChange={(e) =>
												setFormData({
													...formData,
													is_sales_item: e.target.checked,
												})
											}
											className="rounded"
										/>
										<span className="text-sm">Sales Item</span>
									</label>
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={formData.is_purchase_item}
											onChange={(e) =>
												setFormData({
													...formData,
													is_purchase_item: e.target.checked,
												})
											}
											className="rounded"
										/>
										<span className="text-sm">Purchase Item</span>
									</label>
									<label className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={formData.is_manufactured_item}
											onChange={(e) =>
												setFormData({
													...formData,
													is_manufactured_item: e.target.checked,
												})
											}
											className="rounded"
										/>
										<span className="text-sm">Manufactured Item</span>
									</label>
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										setFormData({ ...formData, description: e.target.value })
									}
									rows={3}
									placeholder="Optional description"
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
								<Button type="submit">Add Item</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</main>
		</div>
	);
}
