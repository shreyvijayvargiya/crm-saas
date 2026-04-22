import React, { useMemo, useState } from "react";
import {
	BadgeDollarSign,
	Box,
	PackagePlus,
	Search,
	Plus,
	X,
	TrendingUp,
} from "lucide-react";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";

const initialProducts = [
	{
		id: "prd_001",
		name: "Starter CRM",
		sku: "CRM-STARTER-001",
		planTier: "Starter",
		category: "CRM Suite",
		price: 49,
		currency: "USD",
		billingInterval: "Monthly",
		trialDays: 7,
		maxSeats: 5,
		taxRate: 18,
		visibility: "Public",
		features: ["Leads", "Pipelines", "Email Sync"],
		status: "Active",
		unitsSold: 214,
		updatedAt: "2026-04-18",
	},
	{
		id: "prd_002",
		name: "Growth CRM",
		sku: "CRM-GROWTH-002",
		planTier: "Growth",
		category: "CRM Suite",
		price: 129,
		currency: "USD",
		billingInterval: "Monthly",
		trialDays: 14,
		maxSeats: 20,
		taxRate: 18,
		visibility: "Public",
		features: ["Automation", "Advanced Reports", "Priority Support"],
		status: "Active",
		unitsSold: 139,
		updatedAt: "2026-04-20",
	},
	{
		id: "prd_003",
		name: "Enterprise CRM",
		sku: "CRM-ENT-003",
		planTier: "Enterprise",
		category: "CRM Suite",
		price: 699,
		currency: "USD",
		billingInterval: "Yearly",
		trialDays: 30,
		maxSeats: 200,
		taxRate: 18,
		visibility: "Private",
		features: ["SSO", "Audit Logs", "Dedicated CSM"],
		status: "Active",
		unitsSold: 42,
		updatedAt: "2026-04-19",
	},
	{
		id: "prd_004",
		name: "Onboarding Package",
		sku: "CRM-OB-004",
		planTier: "One-time",
		category: "Service",
		price: 499,
		currency: "USD",
		billingInterval: "One-time",
		trialDays: 0,
		maxSeats: 0,
		taxRate: 18,
		visibility: "Public",
		features: ["Data migration", "Team setup"],
		status: "Archived",
		unitsSold: 27,
		updatedAt: "2026-04-16",
	},
];

const Products = () => {
	const { colors, scheme } = useTheme();

	const [products, setProducts] = useState(initialProducts);
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
				<div className={`rounded-xl border ${colors.border} ${colors.card} p-4`}>
					<div className="flex items-center justify-between">
						<p className={`text-xs ${colors.mutedForeground}`}>Total Products</p>
						<Box className={`h-4 w-4 ${colors.mutedForeground}`} />
					</div>
					<p className={`mt-2 text-2xl font-semibold ${colors.foreground}`}>
						{totalProducts}
					</p>
				</div>
				<div className={`rounded-xl border ${colors.border} ${colors.card} p-4`}>
					<div className="flex items-center justify-between">
						<p className={`text-xs ${colors.mutedForeground}`}>Active</p>
						<PackagePlus className={`h-4 w-4 ${colors.mutedForeground}`} />
					</div>
					<p className={`mt-2 text-2xl font-semibold ${colors.foreground}`}>
						{activeProducts}
					</p>
				</div>
				<div className={`rounded-xl border ${colors.border} ${colors.card} p-4`}>
					<div className="flex items-center justify-between">
						<p className={`text-xs ${colors.mutedForeground}`}>Archived</p>
						<BadgeDollarSign className={`h-4 w-4 ${colors.mutedForeground}`} />
					</div>
					<p className={`mt-2 text-2xl font-semibold ${colors.foreground}`}>
						{archivedProducts}
					</p>
				</div>
				<div className={`rounded-xl border ${colors.border} ${colors.card} p-4`}>
					<div className="flex items-center justify-between">
						<p className={`text-xs ${colors.mutedForeground}`}>MRR (Demo)</p>
						<TrendingUp className={`h-4 w-4 ${colors.mutedForeground}`} />
					</div>
					<p className={`mt-2 text-2xl font-semibold ${colors.foreground}`}>
						${monthlyRevenue.toLocaleString()}
					</p>
				</div>
			</div>

			<div className={`rounded-xl border ${colors.border} ${colors.card} p-3`}>
				<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<div className="relative w-full md:max-w-sm">
						<Search className={`absolute left-3 top-2.5 h-4 w-4 ${colors.mutedForeground}`} />
						<input
							type="text"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder="Search by name, SKU, tier, or category"
							className={`h-9 w-full rounded-xl border ${colors.border} ${colors.primaryBackground} ${colors.foreground} pl-9 pr-3 text-sm outline-none`}
						/>
					</div>

					<div className="flex items-center gap-2">
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className={`h-9 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
						>
							<option>All</option>
							<option>Active</option>
							<option>Archived</option>
						</select>

						<button
							onClick={() => setIsAddModalOpen(true)}
							className={`inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
						>
							<Plus className="h-4 w-4" />
							Add Product
						</button>
					</div>
				</div>

				<div className={`mt-3 overflow-x-auto rounded-xl border ${colors.border}`}>
					<table className="min-w-full text-left text-sm">
						<thead className={`${colors.hoverSecondary}`}>
							<tr className={`${colors.textSecondary}`}>
								<th className="px-4 py-3 font-medium">Product</th>
								<th className="px-4 py-3 font-medium">Tier</th>
								<th className="px-4 py-3 font-medium">Pricing</th>
								<th className="px-4 py-3 font-medium">Trial / Seats</th>
								<th className="px-4 py-3 font-medium">Visibility</th>
								<th className="px-4 py-3 font-medium">Status</th>
								<th className="px-4 py-3 font-medium">Updated</th>
							</tr>
						</thead>
						<tbody className={`${colors.foreground}`}>
							{filteredProducts.length > 0 ? (
								filteredProducts.map((product) => (
									<tr
										key={product.id}
										className={`border-t ${colors.border} ${colors.hoverSecondary}`}
									>
										<td className="px-4 py-3">
											<div className="flex flex-col">
												<span className="font-medium">{product.name}</span>
												<span className={`text-xs ${colors.mutedForeground}`}>
													{product.sku} . {product.category}
												</span>
											</div>
										</td>
										<td className="px-4 py-3">
											{product.planTier}
										</td>
										<td className="px-4 py-3">
											<div className="flex flex-col">
												<span>
													{product.currency} {product.price}
												</span>
												<span className={`text-xs ${colors.mutedForeground}`}>
													{product.billingInterval}
												</span>
											</div>
										</td>
										<td className="px-4 py-3">
											<div className="flex flex-col">
												<span>{product.trialDays}d trial</span>
												<span className={`text-xs ${colors.mutedForeground}`}>
													{product.maxSeats > 0 ? `${product.maxSeats} seats` : "Custom seats"}
												</span>
											</div>
										</td>
										<td className="px-4 py-3">
											<span className={`text-xs ${colors.mutedForeground}`}>
												{product.visibility}
											</span>
										</td>
										<td className="px-4 py-3">
											<span
												className={`rounded-full px-2 py-1 text-xs ${
													product.status === "Active"
														? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
														: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-300"
												}`}
											>
												{product.status}
											</span>
										</td>
										<td className={`px-4 py-3 text-xs ${colors.mutedForeground}`}>
											{product.updatedAt}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan={7}
										className={`px-4 py-8 text-center text-sm ${colors.mutedForeground}`}
									>
										No products found for selected filters.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>

			{isAddModalOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className={`w-full max-w-4xl rounded-2xl border ${colors.border} ${colors.card} p-0 shadow-2xl`}>
						<div className={`flex items-start justify-between border-b ${colors.border} p-5`}>
							<div>
								<h2 className={`text-lg font-semibold ${colors.foreground}`}>
									Add SaaS Product
								</h2>
								<p className={`mt-1 text-xs ${colors.mutedForeground}`}>
									Define pricing, billing, seats, and visibility before publishing.
								</p>
							</div>
							<button
								onClick={() => {
									setIsAddModalOpen(false);
									resetForm();
								}}
								className={`rounded-xl p-1.5 ${colors.hoverSecondary}`}
							>
								<X className={`h-4 w-4 ${colors.foreground}`} />
							</button>
						</div>

						<form onSubmit={handleAddProduct} className="space-y-5 p-5">
							<div className={`rounded-xl border ${colors.border} p-4`}>
								<p className={`text-xs font-semibold uppercase tracking-wide ${colors.mutedForeground}`}>
									Basic Details
								</p>
								<div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Product name</span>
										<input
											type="text"
											placeholder="e.g. Growth CRM"
											value={newProduct.name}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, name: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										/>
									</label>
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>SKU</span>
										<input
											type="text"
											placeholder="e.g. CRM-GROWTH-002"
											value={newProduct.sku}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, sku: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										/>
									</label>
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Plan tier</span>
										<select
											value={newProduct.planTier}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, planTier: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										>
											<option>Starter</option>
											<option>Growth</option>
											<option>Business</option>
											<option>Enterprise</option>
											<option>One-time</option>
										</select>
									</label>
									<label className="md:col-span-3 flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Category</span>
										<input
											type="text"
											placeholder="e.g. CRM Suite, Service, Add-on"
											value={newProduct.category}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, category: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										/>
									</label>
								</div>
							</div>

							<div className={`rounded-xl border ${colors.border} p-4`}>
								<p className={`text-xs font-semibold uppercase tracking-wide ${colors.mutedForeground}`}>
									Pricing and Billing
								</p>
								<div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Billing interval</span>
										<select
											value={newProduct.billingInterval}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, billingInterval: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										>
											<option>Monthly</option>
											<option>Quarterly</option>
											<option>Yearly</option>
											<option>One-time</option>
										</select>
									</label>
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Price</span>
										<input
											type="number"
											placeholder="0.00"
											value={newProduct.price}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, price: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										/>
									</label>
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Currency</span>
										<select
											value={newProduct.currency}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, currency: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										>
											<option>USD</option>
											<option>INR</option>
											<option>EUR</option>
										</select>
									</label>
								</div>
							</div>

							<div className={`rounded-xl border ${colors.border} p-4`}>
								<p className={`text-xs font-semibold uppercase tracking-wide ${colors.mutedForeground}`}>
									Access and Limits
								</p>
								<div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-4">
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Visibility</span>
										<select
											value={newProduct.visibility}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, visibility: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										>
											<option>Public</option>
											<option>Private</option>
											<option>Internal</option>
										</select>
									</label>
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Trial days</span>
										<input
											type="number"
											placeholder="0"
											value={newProduct.trialDays}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, trialDays: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										/>
									</label>
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Max seats</span>
										<input
											type="number"
											placeholder="0 for unlimited"
											value={newProduct.maxSeats}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, maxSeats: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										/>
									</label>
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Tax rate %</span>
										<input
											type="number"
											placeholder="18"
											value={newProduct.taxRate}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, taxRate: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										/>
									</label>
								</div>
							</div>

							<div className={`rounded-xl border ${colors.border} p-4`}>
								<p className={`text-xs font-semibold uppercase tracking-wide ${colors.mutedForeground}`}>
									Product Features
								</p>
								<div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
									<label className="md:col-span-2 flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>
											Key features (comma separated)
										</span>
										<textarea
											placeholder="Leads, Pipelines, Automation, Reporting"
											value={newProduct.featureInput}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, featureInput: e.target.value }))
											}
											className={`min-h-24 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 py-2 text-sm ${colors.foreground} outline-none`}
										/>
									</label>
									<label className="flex flex-col gap-1.5">
										<span className={`text-xs ${colors.mutedForeground}`}>Status</span>
										<select
											value={newProduct.status}
											onChange={(e) =>
												setNewProduct((prev) => ({ ...prev, status: e.target.value }))
											}
											className={`h-10 rounded-xl border ${colors.border} ${colors.primaryBackground} px-3 text-sm ${colors.foreground} outline-none`}
										>
											<option>Active</option>
											<option>Archived</option>
										</select>
										<p className={`mt-1 text-xs ${colors.mutedForeground}`}>
											Active products are available for checkout.
										</p>
									</label>
								</div>
							</div>

							<div className={`flex items-center justify-between border-t ${colors.border} pt-4`}>
								<p className={`text-xs ${colors.mutedForeground}`}>
									All fields can be edited later from product settings.
								</p>
								<div className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => {
											setIsAddModalOpen(false);
											resetForm();
										}}
										className={`rounded-xl border px-3 py-2 text-sm ${colors.border} ${colors.foreground} ${colors.hoverSecondary}`}
									>
										Cancel
									</button>
								<button
									type="submit"
									className={`rounded-xl px-3 py-2 text-sm font-medium ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
								>
									Create Product
								</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default Products;
