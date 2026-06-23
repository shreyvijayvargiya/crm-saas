import {
	BarChart2,
	Calendar,
	Mail,
	DollarSign,
	Users,
	ChevronUp,
	ChevronDown,
	Download,
	PlusCircle,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsCalendarMonth } from "react-icons/bs";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormModal, FormField } from "../../lib/ui/modal";
import { INITIAL_SALES } from "../CRM/salesSeedData";
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

const Sales = () => {
	const router = useRouter();
	// Theme hook
	const { theme, colors } = useTheme();

	const [salesData] = useState({
		daily: [
			{ date: "Mon", sales: 30, revenue: 500 },
			{ date: "Tue", sales: 45, revenue: 700 },
			{ date: "Wed", sales: 20, revenue: 400 },
			{ date: "Thu", sales: 55, revenue: 900 },
			{ date: "Fri", sales: 40, revenue: 650 },
			{ date: "Sat", sales: 35, revenue: 580 },
			{ date: "Sun", sales: 50, revenue: 820 },
		],
		weekly: [
			{ date: "Week 1", sales: 200, revenue: 3200 },
			{ date: "Week 2", sales: 300, revenue: 4800 },
			{ date: "Week 3", sales: 250, revenue: 4000 },
			{ date: "Week 4", sales: 350, revenue: 5600 },
		],
		monthly: [
			{ date: "Jan", sales: 1000, revenue: 16000 },
			{ date: "Feb", sales: 1200, revenue: 19200 },
			{ date: "Mar", sales: 1500, revenue: 24000 },
			{ date: "Apr", sales: 1300, revenue: 20800 },
			{ date: "May", sales: 1400, revenue: 22400 },
			{ date: "Jun", sales: 1600, revenue: 25600 },
		],
	});
	const [topCountries] = useState([
		{ name: "USA", percentage: 40 },
		{ name: "Germany", percentage: 30 },
		{ name: "China", percentage: 20 },
	]);

	const [activeTab, setActiveTab] = useState("daily");

	const [products, setProducts] = useState(INITIAL_SALES);
	const [sortConfig, setSortConfig] = useState({ key: "soldAt", direction: "descending" });
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		category: "",
		price: "",
		description: "",
	});

	const requestSort = (key) => {
		setSortConfig((prev) => {
			if (prev?.key === key) {
				return {
					key,
					direction: prev.direction === "ascending" ? "descending" : "ascending",
				};
			}
			return { key, direction: "ascending" };
		});
	};

	const sortedProducts = useMemo(() => {
		const rows = [...products];
		if (!sortConfig) return rows;
		const mul = sortConfig.direction === "ascending" ? 1 : -1;
		return rows.sort((a, b) => {
			if (sortConfig.key === "name") {
				return a.name.localeCompare(b.name) * mul;
			}
			if (sortConfig.key === "price") {
				return (a.price - b.price) * mul;
			}
			if (sortConfig.key === "soldAt") {
				return String(a.soldAt).localeCompare(String(b.soldAt)) * mul;
			}
			return 0;
		});
	}, [products, sortConfig]);

	const SortIcon = ({ column }) =>
		sortConfig?.key === column ? (
			sortConfig.direction === "ascending" ? (
				<ChevronUp className="w-4 h-4" />
			) : (
				<ChevronDown className="w-4 h-4" />
			)
		) : null;

	const handleAddProduct = () => {
		const productToAdd = {
			...newProduct,
			id: String(products.length + 1),
			soldAt: new Date().toISOString().slice(0, 10),
			soldAtLabel: new Date().toLocaleDateString("en-US", {
				month: "long",
				day: "numeric",
				year: "numeric",
			}),
			price: Number(newProduct.price) || 0,
			customer: "New customer",
			quantity: 1,
			invoiceId: null,
		};
		setProducts([...products, productToAdd]);
		setNewProduct({ name: "", category: "", price: "", description: "" });
		setIsModalOpen(false);
	};

	// Get current chart data based on active tab
	const chartData = useMemo(() => {
		return salesData[activeTab] || salesData.daily;
	}, [activeTab, salesData]);

	// Calculate totals
	const totalSales = useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.sales, 0);
	}, [chartData]);

	const totalRevenue = useMemo(() => {
		return chartData.reduce((acc, curr) => acc + (curr.revenue || 0), 0);
	}, [chartData]);

	const totalVisitors = topCountries.reduce(
		(acc, curr) => acc + curr.percentage,
		0
	);

	const categoryBadgeClass = (category) =>
		cn(
			category === "Electronics" && "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-800/50",
			category === "Books" && "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-800/50",
			category === "Clothing" && "bg-pink-100 text-pink-800 border-pink-200 dark:bg-pink-950/40 dark:text-pink-200 dark:border-pink-800/50",
			category === "Home" && "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-800/50",
			!["Electronics", "Books", "Clothing", "Home"].includes(category) &&
				"bg-green-100 text-green-800 border-green-200 dark:bg-green-950/40 dark:text-green-200 dark:border-green-800/50"
		);

	// Custom Tooltip for charts
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<Card className="p-3 shadow-md">
					<p className="text-sm font-medium mb-2">{label}</p>
					{payload.map((entry, index) => (
						<div key={index} className="flex items-center gap-2 mb-1">
							<div
								className="w-3 h-3 rounded"
								style={{
									backgroundColor:
										entry.dataKey === "sales" ? "#3b82f6" : "#10b981",
								}}
							/>
							<span className="text-sm text-muted-foreground">
								{entry.dataKey === "sales" ? "Sales" : "Revenue"}:{" "}
								{entry.dataKey === "sales"
									? entry.value
									: `$${entry.value.toLocaleString()}`}
							</span>
						</div>
					))}
				</Card>
			);
		}
		return null;
	};

	return (
		<div className={`p-4 transition-all duration-100 ease-in`}>
			<div className="flex justify-between gap-4 items-start mb-6 flex-wrap">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
					<Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-green-600/10 rounded-full blur-2xl"></div>
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-green-300/15 to-green-500/5 rounded-full blur-xl"></div>
						<div className="absolute top-4 right-4 w-16 h-16 bg-green-500/10 rounded-full blur-lg"></div>
						<CardContent className="relative p-6">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20">
									<DollarSign size={28} className="text-green-500" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground mb-1">
										Total Sales
									</p>
									<p className="text-2xl font-bold">
										{totalSales.toLocaleString()}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-2xl"></div>
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-blue-300/15 to-blue-500/5 rounded-full blur-xl"></div>
						<div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/10 rounded-full blur-lg"></div>
						<CardContent className="relative p-6">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
									<Mail size={28} className="text-blue-500" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground mb-1">
										Total Revenue
									</p>
									<p className="text-2xl font-bold">
										${totalRevenue.toLocaleString()}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300 group">
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-2xl"></div>
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-purple-300/15 to-purple-500/5 rounded-full blur-xl"></div>
						<div className="absolute top-4 right-4 w-16 h-16 bg-purple-500/10 rounded-full blur-lg"></div>
						<CardContent className="relative p-6">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
									<Users size={28} className="text-purple-500" />
								</div>
								<div>
									<p className="text-sm font-medium text-muted-foreground mb-1">
										Total Visitors
									</p>
									<p className="text-2xl font-bold">
										{totalVisitors.toLocaleString()}
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
				<div className="flex justify-around items-center gap-2">
					<Button>
						<Download size={18} />
						Download Report
					</Button>
					<Button onClick={() => setIsModalOpen(true)}>
						<PlusCircle size={18} />
						Add Product
					</Button>
				</div>
			</div>

			<FormModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				title="Add Product"
				subtitle="Add a new product to recently sold"
				onSubmit={handleAddProduct}
				saveLabel="Submit"
				maxWidth="max-w-md"
			>
				<FormField label="Product Name" htmlFor="product-name" required>
					<Input
						id="product-name"
						type="text"
						value={newProduct.name}
						onChange={(e) =>
							setNewProduct({ ...newProduct, name: e.target.value })
						}
						placeholder="Enter product name"
						required
					/>
				</FormField>
				<FormField label="Category" htmlFor="product-category" required>
					<Input
						id="product-category"
						type="text"
						value={newProduct.category}
						onChange={(e) =>
							setNewProduct({ ...newProduct, category: e.target.value })
						}
						placeholder="Enter product category"
						required
					/>
				</FormField>
				<FormField label="Price" htmlFor="product-price" required>
					<Input
						id="product-price"
						type="number"
						value={newProduct.price}
						onChange={(e) =>
							setNewProduct({ ...newProduct, price: e.target.value })
						}
						placeholder="Enter product price"
						required
					/>
				</FormField>
				<FormField label="Description" htmlFor="product-description" required>
					<textarea
						id="product-description"
						value={newProduct.description}
						onChange={(e) =>
							setNewProduct({
								...newProduct,
								description: e.target.value,
							})
						}
						className={cn(
							"flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						)}
						placeholder="Enter product description"
						required
					/>
				</FormField>
			</FormModal>

			<Card className="p-6">
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className="text-lg font-semibold">Sales & Revenue Overview</h2>
						<p className="text-sm text-muted-foreground mt-1">
							Track your sales performance and revenue trends
						</p>
					</div>
					<div className="flex gap-2">
						<Button
							variant={activeTab === "daily" ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveTab("daily")}
						>
							<Calendar size={16} /> Daily
						</Button>
						<Button
							variant={activeTab === "weekly" ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveTab("weekly")}
						>
							<BarChart2 size={16} /> Weekly
						</Button>
						<Button
							variant={activeTab === "monthly" ? "default" : "outline"}
							size="sm"
							onClick={() => setActiveTab("monthly")}
						>
							<BsCalendarMonth size={16} /> Monthly
						</Button>
					</div>
				</div>

				{/* Chart */}
				<div className="w-full h-80">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={chartData}
							margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
						>
							<defs>
								<linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor={theme === "dark" ? "#3b82f6" : "#3b82f6"}
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor={theme === "dark" ? "#3b82f6" : "#3b82f6"}
										stopOpacity={0.1}
									/>
								</linearGradient>
								<linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor={theme === "dark" ? "#10b981" : "#10b981"}
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor={theme === "dark" ? "#10b981" : "#10b981"}
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke={theme === "dark" ? "#3f3f46" : "#e4e4e7"}
								vertical={false}
							/>
							<XAxis
								dataKey="date"
								stroke={theme === "dark" ? "#71717a" : "#71717a"}
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								stroke={theme === "dark" ? "#71717a" : "#71717a"}
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Area
								type="monotone"
								dataKey="sales"
								stroke={theme === "dark" ? "#3b82f6" : "#3b82f6"}
								fillOpacity={1}
								fill="url(#colorSales)"
								stackId="1"
							/>
							<Area
								type="monotone"
								dataKey="revenue"
								stroke={theme === "dark" ? "#10b981" : "#10b981"}
								fillOpacity={1}
								fill="url(#colorRevenue)"
								stackId="1"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>

				<div className="flex items-center justify-center gap-6 mt-4">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded bg-blue-500" />
						<span className="text-sm text-muted-foreground">Sales</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded bg-green-500" />
						<span className="text-sm text-muted-foreground">Revenue</span>
					</div>
				</div>
			</Card>
			<Card className="overflow-hidden my-4">
				<CardHeader className="flex-row items-center justify-between space-y-0 border-b">
					<div>
						<CardTitle>Recently Sold Products</CardTitle>
						<CardDescription>View and manage all sold products</CardDescription>
					</div>
					<Button variant="ghost" size="sm">
						View all
					</Button>
				</CardHeader>
				<Table className="w-full">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									ID
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("name")}
								>
									<div className="flex items-center gap-2">
										Name
										<SortIcon column="name" />
									</div>
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("price")}
								>
									<div className="flex items-center gap-2">
										Price (USD)
										<SortIcon column="price" />
									</div>
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("soldAt")}
								>
									<div className="flex items-center gap-2">
										Sold At
										<SortIcon column="soldAt" />
									</div>
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Description
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Category
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.card} divide-y ${colors.border}`}>
							{sortedProducts.length === 0 ? (
								<TableRow>
									<TableCell colSpan="6" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No products found</p>
									</TableCell>
								</TableRow>
							) : (
								sortedProducts.map((product) => (
									<TableRow
										key={product.id}
										className={`${colors.hover} transition-colors cursor-pointer`}
										onClick={() => router.push(`/sales/${product.id}`)}
									>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-medium ${colors.foreground}`}
											>
												#{product.id}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4">
											<Link href={`/sales/${product.id}`} passHref>
												<a
													className={`text-sm font-medium ${colors.foreground} hover:underline`}
												>
													{product.name}
												</a>
											</Link>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-semibold ${colors.foreground}`}
											>
												${product.price.toLocaleString()}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{product.soldAtLabel || product.soldAt}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4">
											<div
												className={`text-sm ${colors.textSecondary} max-w-md truncate`}
											>
												{product.description}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<Badge variant="outline" className={categoryBadgeClass(product.category)}>
												{product.category}
											</Badge>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
			</Card>

			<Card className="p-6 my-4">
				<div className="flex items-center justify-between mb-4">
					<div>
						<CardTitle>Top Countries</CardTitle>
						<CardDescription className="mt-1">
							Sales distribution by country
						</CardDescription>
					</div>
					<Button variant="ghost" size="sm">
						View all
					</Button>
				</div>
				<div className="space-y-4">
					{topCountries.map((country) => (
						<div key={country.name} className="relative group">
							<div
								className={`flex justify-between items-center mb-2 ${colors.foreground}`}
							>
								<span className="text-sm font-medium">{country.name}</span>
								<span className="text-sm font-semibold">
									{country.percentage}%
								</span>
							</div>
							<div
								className={`${colors.muted} rounded-full h-2 overflow-hidden`}
							>
								<div
									className={`h-full rounded-full transition-all duration-300 ${
										theme === "dark" ? "bg-blue-500" : "bg-blue-600"
									}`}
									style={{ width: `${country.percentage}%` }}
								/>
							</div>
							<div
								className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 hidden group-hover:block ${colors.card} ${colors.foreground} text-xs rounded-xl py-1.5 px-3 border ${colors.border} ${colors.shadow} z-10`}
							>
								{country.name}: {country.percentage}%
							</div>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
};

export default Sales;
