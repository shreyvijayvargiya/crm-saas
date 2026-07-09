import React, { useMemo, useState } from "react";
import {
	BadgeDollarSign,
	Box,
	PackagePlus,
	Search,
	Plus,
	TrendingUp,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from "@/components/ui/table";

const textareaClass = cn(
	"flex min-h-24 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
);

import { useCrmData } from "../../utils/CrmDataContext";

const Products = () => {
	const { colors } = useTheme();

	const { products, setProducts } = useCrmData();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		sku: "",
		planTier: "Starter",
		category: "CRM Suite",
		price: "",
		currency: "USD",
		billingInterval: "Monthly",
		trialDays: "14",
		maxSeats: "5",
		taxRate: "18",
		visibility: "Public",
		featureInput: "",
		status: "Active",
	});

	const totalProducts = products.length;
	const activeProducts = useMemo(
		() => products.filter((p) => p.status === "Active").length,
		[products]
	);
	const archivedProducts = useMemo(
		() => products.filter((p) => p.status === "Archived").length,
		[products]
	);
	const monthlyRevenue = useMemo(() => {
		return products
			.filter((p) => p.status === "Active" && p.billingInterval === "Monthly")
			.reduce((sum, p) => sum + p.price * p.unitsSold, 0);
	}, [products]);

	const filteredProducts = useMemo(() => {
		let filtered = [...products];

		if (statusFilter !== "All") {
			filtered = filtered.filter((p) => p.status === statusFilter);
		}

		if (searchTerm.trim()) {
			const query = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(query) ||
					p.sku.toLowerCase().includes(query) ||
					p.category.toLowerCase().includes(query) ||
					p.planTier.toLowerCase().includes(query)
			);
		}

		return filtered.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
	}, [products, searchTerm, statusFilter]);

	const resetForm = () => {
		setNewProduct({
			name: "",
			sku: "",
			planTier: "Starter",
			category: "CRM Suite",
			price: "",
			currency: "USD",
			billingInterval: "Monthly",
			trialDays: "14",
			maxSeats: "5",
			taxRate: "18",
			visibility: "Public",
			featureInput: "",
			status: "Active",
		});
	};

	const handleAddProduct = (e) => {
		e.preventDefault();

		if (!newProduct.name || !newProduct.sku || !newProduct.price || !newProduct.category) {
			toast.error("Please fill name, SKU, category, and price.");
			return;
		}

		const parsedPrice = Number(newProduct.price);
		const parsedTrial = Number(newProduct.trialDays);
		const parsedSeats = Number(newProduct.maxSeats);
		const parsedTaxRate = Number(newProduct.taxRate);

		if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
			toast.error("Enter a valid price.");
			return;
		}

		if (Number.isNaN(parsedTrial) || parsedTrial < 0) {
			toast.error("Enter valid trial days.");
			return;
		}

		if (Number.isNaN(parsedSeats) || parsedSeats < 0) {
			toast.error("Enter valid seat limit.");
			return;
		}

		if (Number.isNaN(parsedTaxRate) || parsedTaxRate < 0) {
			toast.error("Enter valid tax rate.");
			return;
		}

		const features = newProduct.featureInput
			.split(",")
			.map((item) => item.trim())
			.filter(Boolean);

		const productToAdd = {
			id: `prd_${Date.now()}`,
			name: newProduct.name.trim(),
			sku: newProduct.sku.trim(),
			planTier: newProduct.planTier,
			category: newProduct.category.trim(),
			price: parsedPrice,
			currency: newProduct.currency,
			billingInterval: newProduct.billingInterval,
			trialDays: parsedTrial,
			maxSeats: parsedSeats,
			taxRate: parsedTaxRate,
			visibility: newProduct.visibility,
			features,
			status: newProduct.status,
			unitsSold: 0,
			updatedAt: new Date().toISOString().slice(0, 10),
		};

		setProducts((prev) => [productToAdd, ...prev]);
		setIsAddModalOpen(false);
		resetForm();
		toast.success("Product added.");
	};

	return (
		<div className="space-y-5 p-5">
			<div className="flex flex-col gap-1">
				<h1 className={`text-xl font-semibold ${colors.foreground}`}>Products</h1>
				<p className={`text-sm ${colors.mutedForeground}`}>
					Manage your SaaS product catalog, pricing, and lifecycle from one place.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<p className="text-xs text-muted-foreground">Total Products</p>
							<Box className="h-4 w-4 text-muted-foreground" />
						</div>
						<p className={`mt-2 text-2xl font-semibold ${colors.foreground}`}>{totalProducts}</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<p className="text-xs text-muted-foreground">Active</p>
							<PackagePlus className="h-4 w-4 text-muted-foreground" />
						</div>
						<p className={`mt-2 text-2xl font-semibold ${colors.foreground}`}>{activeProducts}</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<p className="text-xs text-muted-foreground">Archived</p>
							<BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
						</div>
						<p className={`mt-2 text-2xl font-semibold ${colors.foreground}`}>{archivedProducts}</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<div className="flex items-center justify-between">
							<p className="text-xs text-muted-foreground">MRR (Demo)</p>
							<TrendingUp className="h-4 w-4 text-muted-foreground" />
						</div>
						<p className={`mt-2 text-2xl font-semibold ${colors.foreground}`}>
							${monthlyRevenue.toLocaleString()}
						</p>
					</CardContent>
				</Card>
			</div>

			<Card className="p-3">
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div className="relative w-full md:max-w-sm">
						<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
						<Input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search by name, SKU, tier, or category"
							className="pl-9"
						/>
					</div>

					<div className="flex items-center gap-2">
						<FormSelect
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							options={["All", "Active", "Archived"]}
						/>

						<Button onClick={() => setIsAddModalOpen(true)}>
							<Plus className="h-4 w-4" />
							Add Product
						</Button>
					</div>
				</div>

				<div className={`mt-3 rounded-xl border ${colors.border}`}>
					<Table className="min-w-full text-left text-sm">
						<TableHeader className={`${colors.hoverSecondary}`}>
							<TableRow className={`${colors.textSecondary}`}>
								<TableHead className="px-4 py-3 font-medium">Product</TableHead>
								<TableHead className="px-4 py-3 font-medium">Tier</TableHead>
								<TableHead className="px-4 py-3 font-medium">Pricing</TableHead>
								<TableHead className="px-4 py-3 font-medium">Trial / Seats</TableHead>
								<TableHead className="px-4 py-3 font-medium">Visibility</TableHead>
								<TableHead className="px-4 py-3 font-medium">Status</TableHead>
								<TableHead className="px-4 py-3 font-medium">Updated</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.foreground}`}>
							{filteredProducts.length > 0 ? (
								filteredProducts.map((product) => (
									<TableRow
										key={product.id}
										className={` ${colors.hoverSecondary}`}
									>
										<TableCell className="px-4 py-3">
											<div className="flex flex-col">
												<span className="font-medium">{product.name}</span>
												<span className={`text-xs ${colors.mutedForeground}`}>
													{product.sku} . {product.category}
												</span>
											</div>
										</TableCell>
										<TableCell className="px-4 py-3">
											{product.planTier}
										</TableCell>
										<TableCell className="px-4 py-3">
											<div className="flex flex-col">
												<span>
													{product.currency} {product.price}
												</span>
												<span className={`text-xs ${colors.mutedForeground}`}>
													{product.billingInterval}
												</span>
											</div>
										</TableCell>
										<TableCell className="px-4 py-3">
											<div className="flex flex-col">
												<span>{product.trialDays}d trial</span>
												<span className={`text-xs ${colors.mutedForeground}`}>
													{product.maxSeats > 0 ? `${product.maxSeats} seats` : "Custom seats"}
												</span>
											</div>
										</TableCell>
										<TableCell className="px-4 py-3">
											<span className={`text-xs ${colors.mutedForeground}`}>
												{product.visibility}
											</span>
										</TableCell>
										<TableCell className="px-4 py-3">
											<Badge
												variant="secondary"
												className={cn(
													product.status === "Active"
														? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-transparent"
														: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-300 border-transparent"
												)}
											>
												{product.status}
											</Badge>
										</TableCell>
										<TableCell className={`px-4 py-3 text-xs ${colors.mutedForeground}`}>
											{product.updatedAt}
										</TableCell>
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={7}
										className={`px-4 py-8 text-center text-sm ${colors.mutedForeground}`}
									>
										No products found for selected filters.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</div>
			</Card>

			<FormModal
				open={isAddModalOpen}
				onClose={() => {
					setIsAddModalOpen(false);
					resetForm();
				}}
				onSubmit={handleAddProduct}
				title="Add SaaS Product"
				subtitle="Define pricing, billing, seats, and visibility before publishing."
				saveLabel="Create Product"
				maxWidth="max-w-4xl"
			>
				<Card className="border-none">
					<p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
						Basic Details
					</p>
					<div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
						<FormField label="Product name" htmlFor="product-name">
							<Input
								id="product-name"
								type="text"
								placeholder="e.g. Growth CRM"
								value={newProduct.name}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, name: e.target.value }))
								}
							/>
						</FormField>
						<FormField label="SKU" htmlFor="product-sku">
							<Input
								id="product-sku"
								type="text"
								placeholder="e.g. CRM-GROWTH-002"
								value={newProduct.sku}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, sku: e.target.value }))
								}
							/>
						</FormField>
						<FormField label="Plan tier" htmlFor="product-tier">
							<FormSelect
								id="product-tier"
								value={newProduct.planTier}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, planTier: e.target.value }))
								}
								options={[
									"Starter",
									"Growth",
									"Business",
									"Enterprise",
									"One-time",
								]}
							/>
						</FormField>
						<div className="md:col-span-3">
							<FormField label="Category" htmlFor="product-category">
								<Input
									id="product-category"
									type="text"
									placeholder="e.g. CRM Suite, Service, Add-on"
									value={newProduct.category}
									onChange={(e) =>
										setNewProduct((prev) => ({ ...prev, category: e.target.value }))
									}
								/>
							</FormField>
						</div>
					</div>
				</Card>

				<Card className="border-none">
					<p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
						Pricing and Billing
					</p>
					<div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
						<FormField label="Billing interval" htmlFor="product-interval">
							<FormSelect
								id="product-interval"
								value={newProduct.billingInterval}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, billingInterval: e.target.value }))
								}
								options={["Monthly", "Quarterly", "Yearly", "One-time"]}
							/>
						</FormField>
						<FormField label="Price" htmlFor="product-price">
							<Input
								id="product-price"
								type="number"
								placeholder="0.00"
								value={newProduct.price}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, price: e.target.value }))
								}
							/>
						</FormField>
						<FormField label="Currency" htmlFor="product-currency">
							<FormSelect
								id="product-currency"
								value={newProduct.currency}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, currency: e.target.value }))
								}
								options={["USD", "INR", "EUR"]}
							/>
						</FormField>
					</div>
				</Card>

				<Card className="border-none">
					<p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
						Access and Limits
					</p>
					<div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
						<FormField label="Visibility" htmlFor="product-visibility">
							<FormSelect
								id="product-visibility"
								value={newProduct.visibility}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, visibility: e.target.value }))
								}
								options={["Public", "Private", "Internal"]}
							/>
						</FormField>
						<FormField label="Trial days" htmlFor="product-trial">
							<Input
								id="product-trial"
								type="number"
								placeholder="0"
								value={newProduct.trialDays}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, trialDays: e.target.value }))
								}
							/>
						</FormField>
						<FormField label="Max seats" htmlFor="product-seats">
							<Input
								id="product-seats"
								type="number"
								placeholder="0 for unlimited"
								value={newProduct.maxSeats}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, maxSeats: e.target.value }))
								}
							/>
						</FormField>
						<FormField label="Tax rate %" htmlFor="product-tax">
							<Input
								id="product-tax"
								type="number"
								placeholder="18"
								value={newProduct.taxRate}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, taxRate: e.target.value }))
								}
							/>
						</FormField>
					</div>
				</Card>

				<Card className="border-none">
					<p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
						Product Features
					</p>
					<div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
						<div className="md:col-span-2">
							<FormField label="Key features (comma separated)" htmlFor="product-features">
								<textarea
									id="product-features"
									placeholder="Leads, Pipelines, Automation, Reporting"
									value={newProduct.featureInput}
									onChange={(e) =>
										setNewProduct((prev) => ({ ...prev, featureInput: e.target.value }))
									}
									className={textareaClass}
								/>
							</FormField>
						</div>
						<FormField
							label="Status"
							htmlFor="product-status"
							hint="Active products are available for checkout."
						>
							<FormSelect
								id="product-status"
								value={newProduct.status}
								onChange={(e) =>
									setNewProduct((prev) => ({ ...prev, status: e.target.value }))
								}
								options={["Active", "Archived"]}
							/>
						</FormField>
					</div>
				</Card>
			</FormModal>
		</div>
	);
};

export default Products;
