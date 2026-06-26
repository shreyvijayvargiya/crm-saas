import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
	Headphones,
	Laptop,
	MoreVertical,
	Plus,
	Search,
	Smartphone,
	Upload,
	Watch,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import FormSelect from "../../../lib/ui/FormSelect";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	ECOMMERCE_PRODUCTS,
	PRODUCT_CATEGORIES,
	PRODUCT_STATUSES,
} from "../ecommerceSeedData";

const CATEGORY_ICONS = {
	Smartphone: Smartphone,
	Laptop: Laptop,
	Headphone: Headphones,
	Smartwatch: Watch,
};

const ProductsTable = () => {
	const router = useRouter();
	const { colors } = useTheme();

	const [products, setProducts] = useState(ECOMMERCE_PRODUCTS);
	const [searchTerm, setSearchTerm] = useState("");
	const [categoryFilter, setCategoryFilter] = useState("All");
	const [stockFilter, setStockFilter] = useState("All");
	const [statusFilter, setStatusFilter] = useState("All");
	const [rowsPerPage, setRowsPerPage] = useState("5");
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedIds, setSelectedIds] = useState([]);

	const filteredProducts = useMemo(() => {
		let list = [...products];

		if (categoryFilter !== "All") {
			list = list.filter((p) => p.category === categoryFilter);
		}
		if (stockFilter === "In Stock") {
			list = list.filter((p) => p.inStock);
		} else if (stockFilter === "Out of Stock") {
			list = list.filter((p) => !p.inStock);
		}
		if (statusFilter !== "All") {
			list = list.filter((p) => p.status === statusFilter);
		}
		if (searchTerm.trim()) {
			const q = searchTerm.toLowerCase();
			list = list.filter(
				(p) =>
					p.name.toLowerCase().includes(q) ||
					p.brand.toLowerCase().includes(q) ||
					p.category.toLowerCase().includes(q)
			);
		}

		return list;
	}, [products, categoryFilter, stockFilter, statusFilter, searchTerm]);

	const pageSize = Number(rowsPerPage) || 5;
	const totalPages = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
	const safePage = Math.min(currentPage, totalPages);
	const pageStart = (safePage - 1) * pageSize;
	const pageProducts = filteredProducts.slice(pageStart, pageStart + pageSize);

	const allPageSelected =
		pageProducts.length > 0 && pageProducts.every((p) => selectedIds.includes(p.id));

	const toggleAllPage = (checked) => {
		if (checked) {
			setSelectedIds((prev) => [...new Set([...prev, ...pageProducts.map((p) => p.id)])]);
		} else {
			const pageIds = new Set(pageProducts.map((p) => p.id));
			setSelectedIds((prev) => prev.filter((id) => !pageIds.has(id)));
		}
	};

	const toggleRow = (id, checked) => {
		setSelectedIds((prev) =>
			checked ? [...prev, id] : prev.filter((item) => item !== id)
		);
	};

	const toggleStock = (id, inStock) => {
		setProducts((prev) =>
			prev.map((p) => (p.id === id ? { ...p, inStock } : p))
		);
	};

	const handleExport = () => {
		toast.success(`Exported ${filteredProducts.length} products (demo).`);
	};

	return (
		<Card className="p-4 md:p-5 space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
				<FormSelect
					value={categoryFilter}
					onChange={(e) => {
						setCategoryFilter(e.target.value);
						setCurrentPage(1);
					}}
					options={["All", ...PRODUCT_CATEGORIES]}
					placeholder="Select Category"
				/>
				<FormSelect
					value={stockFilter}
					onChange={(e) => {
						setStockFilter(e.target.value);
						setCurrentPage(1);
					}}
					options={["All", "In Stock", "Out of Stock"]}
					placeholder="Select Stock"
				/>
				<FormSelect
					value={statusFilter}
					onChange={(e) => {
						setStatusFilter(e.target.value);
						setCurrentPage(1);
					}}
					options={["All", ...PRODUCT_STATUSES]}
					placeholder="Select Status"
				/>
			</div>

			<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
				<div className="relative w-full lg:max-w-sm">
					<Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
					<Input
						type="text"
						value={searchTerm}
						onChange={(e) => {
							setSearchTerm(e.target.value);
							setCurrentPage(1);
						}}
						placeholder="Search product"
						className="pl-9"
					/>
				</div>

				<div className="flex flex-wrap items-center gap-2">
					<FormSelect
						value={rowsPerPage}
						onChange={(e) => {
							setRowsPerPage(e.target.value);
							setCurrentPage(1);
						}}
						options={["5", "10", "25"]}
						className="w-[72px]"
					/>
					<Button type="button" variant="outline" onClick={handleExport}>
						<Upload className="h-4 w-4" />
						Export
					</Button>
					<Button type="button" onClick={() => toast.info("Add product form (demo).")}>
						<Plus className="h-4 w-4" />
						Add Product
					</Button>
				</div>
			</div>

			<div className={`rounded-xl border overflow-x-auto ${colors.border}`}>
				<Table>
					<TableHeader className={colors.hoverSecondary}>
						<TableRow>
							<TableHead className="w-10 px-4">
								<Checkbox
									checked={allPageSelected}
									onCheckedChange={toggleAllPage}
									aria-label="Select all on page"
								/>
							</TableHead>
							<TableHead className="px-4">Product</TableHead>
							<TableHead className="px-4">Category</TableHead>
							<TableHead className="px-4">Stock</TableHead>
							<TableHead className="px-4">Amount</TableHead>
							<TableHead className="px-4">QTY</TableHead>
							<TableHead className="px-4">Status</TableHead>
							<TableHead className="px-4 w-10" />
						</TableRow>
					</TableHeader>
					<TableBody>
						{pageProducts.length > 0 ? (
							pageProducts.map((product) => {
								const CategoryIcon = CATEGORY_ICONS[product.category] ?? Smartphone;
								return (
									<TableRow
										key={product.id}
										className={cn("cursor-pointer", colors.hoverSecondary)}
										onClick={() => router.push(`/e-commerce/products/${product.id}`)}
									>
										<TableCell
											className="px-4"
											onClick={(e) => e.stopPropagation()}
										>
											<Checkbox
												checked={selectedIds.includes(product.id)}
												onCheckedChange={(checked) =>
													toggleRow(product.id, checked)
												}
												aria-label={`Select ${product.name}`}
											/>
										</TableCell>
										<TableCell className="px-4">
											<div className="flex items-center gap-3 min-w-[200px]">
												<img
													src={product.imageURL}
													alt=""
													className="h-10 w-10 rounded-lg object-cover border border-border shrink-0"
												/>
												<div>
													<p className="font-medium">{product.name}</p>
													<p className={`text-xs ${colors.mutedForeground}`}>
														{product.brand}
													</p>
												</div>
											</div>
										</TableCell>
										<TableCell className="px-4">
											<div className="flex items-center gap-2">
												<CategoryIcon className="h-4 w-4 text-muted-foreground" />
												<span>{product.category}</span>
											</div>
										</TableCell>
										<TableCell
											className="px-4"
											onClick={(e) => e.stopPropagation()}
										>
											<Switch
												checked={product.inStock}
												onCheckedChange={(checked) =>
													toggleStock(product.id, checked)
												}
												aria-label={`Toggle stock for ${product.name}`}
											/>
										</TableCell>
										<TableCell className="px-4 font-medium">
											${product.price}
										</TableCell>
										<TableCell className="px-4 tabular-nums">
											{product.quantity}
										</TableCell>
										<TableCell className="px-4">
											<Badge
												variant="secondary"
												className={cn(
													"border-transparent",
													product.status === "Publish"
														? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
														: "bg-rose-500/15 text-rose-600 dark:text-rose-400"
												)}
											>
												{product.status}
											</Badge>
										</TableCell>
										<TableCell
											className="px-4"
											onClick={(e) => e.stopPropagation()}
										>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														type="button"
														variant="ghost"
														size="icon"
														className="h-8 w-8"
													>
														<MoreVertical className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() =>
															router.push(`/e-commerce/products/${product.id}`)
														}
													>
														View details
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => toast.info("Edit product (demo).")}
													>
														Edit
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell
									colSpan={8}
									className={`px-4 py-10 text-center text-sm ${colors.mutedForeground}`}
								>
									No products match your filters.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<p className={`text-sm ${colors.mutedForeground}`}>
					{filteredProducts.length === 0
						? "Showing 0 entries"
						: `Showing ${pageStart + 1} to ${Math.min(
								pageStart + pageSize,
								filteredProducts.length
							)} of ${filteredProducts.length} entries`}
				</p>
				<div className="flex items-center gap-1">
					<Button
						type="button"
						variant="outline"
						size="sm"
						disabled={safePage <= 1}
						onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
					>
						Previous
					</Button>
					{Array.from({ length: Math.min(totalPages, 2) }, (_, i) => i + 1).map(
						(page) => (
							<Button
								key={page}
								type="button"
								size="sm"
								variant={safePage === page ? "default" : "outline"}
								onClick={() => setCurrentPage(page)}
							>
								{page}
							</Button>
						)
					)}
					{totalPages > 2 && (
						<span className={`px-2 text-sm ${colors.mutedForeground}`}>…</span>
					)}
					<Button
						type="button"
						variant="outline"
						size="sm"
						disabled={safePage >= totalPages}
						onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
					>
						Next
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default ProductsTable;
