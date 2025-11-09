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
	X,
} from "lucide-react";
import React, { useState, useMemo } from "react";
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
import { getFocusRingClass } from "../../utils/theme";

const Sales = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

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

	const [products, setProducts] = useState([
		{
			id: 1,
			name: "Product A",
			soldAt: "October 1, 2023",
			price: 20,
			category: "Electronics",
			description: "High-quality headphones",
		},
		{
			id: 2,
			name: "Product B",
			soldAt: "October 2, 2023",
			price: 15,
			category: "Books",
			description: "A thrilling mystery novel",
		},
		{
			id: 3,
			name: "Product C",
			soldAt: "October 3, 2023",
			price: 30,
			category: "Clothing",
			description: "Stylish winter jacket",
		},
		{
			id: 4,
			name: "Product D",
			soldAt: "October 4, 2023",
			price: 25,
			category: "Home",
			description: "Comfortable sofa",
		},
		{
			id: 5,
			name: "Product E",
			soldAt: "October 5, 2023",
			price: 50,
			category: "Sports",
			description: "Durable running shoes",
		},
	]);

	const [sortOrder, setSortOrder] = useState("asc");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newProduct, setNewProduct] = useState({
		name: "",
		category: "",
		price: "",
		description: "",
	});

	const handleSort = () => {
		setSortOrder(sortOrder === "asc" ? "desc" : "asc");
		setProducts(
			[...products].sort((a, b) =>
				sortOrder === "asc" ? a.price - b.price : b.price - a.price
			)
		);
	};

	const handleAddProduct = (e) => {
		e.preventDefault();
		const productToAdd = {
			...newProduct,
			id: products.length + 1,
			soldAt: new Date().toLocaleDateString(),
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

	// Custom Tooltip for charts
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div
					className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} p-3`}
				>
					<p className={`text-sm font-medium ${colors.foreground} mb-2`}>
						{label}
					</p>
					{payload.map((entry, index) => (
						<div key={index} className="flex items-center gap-2 mb-1">
							<div
								className="w-3 h-3 rounded"
								style={{
									backgroundColor:
										entry.dataKey === "sales"
											? theme === "dark"
												? "#3b82f6"
												: "#3b82f6"
											: theme === "dark"
											? "#10b981"
											: "#10b981",
								}}
							/>
							<span className={`text-sm ${colors.textSecondary}`}>
								{entry.dataKey === "sales" ? "Sales" : "Revenue"}:{" "}
								{entry.dataKey === "sales"
									? entry.value
									: `$${entry.value.toLocaleString()}`}
							</span>
						</div>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<div className={`p-4 ${colors.background} transition-colors`}>
			<div className="flex justify-between gap-4 items-start mb-6 flex-wrap">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
					{/* Total Sales Card */}
					<div
						className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300 group`}
					>
						{/* Background Gradient Shapes */}
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-green-600/10 rounded-full blur-2xl"></div>
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-green-300/15 to-green-500/5 rounded-full blur-xl"></div>
						<div className="absolute top-4 right-4 w-16 h-16 bg-green-500/10 rounded-full blur-lg"></div>

						<div className="relative flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20">
									<DollarSign size={28} className="text-green-500" />
								</div>
								<div>
									<p
										className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
									>
										Total Sales
									</p>
									<p className={`text-2xl font-bold ${colors.foreground}`}>
										{totalSales.toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Total Revenue Card */}
					<div
						className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300 group`}
					>
						{/* Background Gradient Shapes */}
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-2xl"></div>
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-blue-300/15 to-blue-500/5 rounded-full blur-xl"></div>
						<div className="absolute top-4 right-4 w-16 h-16 bg-blue-500/10 rounded-full blur-lg"></div>

						<div className="relative flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
									<Mail size={28} className="text-blue-500" />
								</div>
								<div>
									<p
										className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
									>
										Total Revenue
									</p>
									<p className={`text-2xl font-bold ${colors.foreground}`}>
										${totalRevenue.toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Total Visitors Card */}
					<div
						className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300 group`}
					>
						{/* Background Gradient Shapes */}
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-2xl"></div>
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-purple-300/15 to-purple-500/5 rounded-full blur-xl"></div>
						<div className="absolute top-4 right-4 w-16 h-16 bg-purple-500/10 rounded-full blur-lg"></div>

						<div className="relative flex items-center justify-between">
							<div className="flex items-center gap-4">
								<div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
									<Users size={28} className="text-purple-500" />
								</div>
								<div>
									<p
										className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
									>
										Total Visitors
									</p>
									<p className={`text-2xl font-bold ${colors.foreground}`}>
										{totalVisitors.toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-around items-center gap-2">
					<button
						className={`flex items-center ${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} py-2 px-4 text-xs rounded-xl hover:px-6 transition-all duration-200`}
					>
						<Download size={18} className="mr-2" />
						Download Report
					</button>
					<button
						onClick={() => setIsModalOpen(true)}
						className={`flex items-center ${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded-xl py-2 text-xs px-4 hover:px-6 transition-all duration-200`}
					>
						<PlusCircle size={18} className="mr-2" />
						Add Product
					</button>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div
						className={`${colors.card} rounded-lg p-6 w-1/3 border ${colors.border}`}
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className={`text-xl ${colors.foreground}`}>Add Product</h2>
							<button
								onClick={() => setIsModalOpen(false)}
								className={`${colors.textMuted} ${colors.hoverSecondary} transition-colors`}
							>
								<X size={20} />
							</button>
						</div>
						<form onSubmit={handleAddProduct}>
							<div className="mb-4">
								<label
									className={`block text-sm font-medium mb-1 ${colors.textSecondary}`}
								>
									Product Name
								</label>
								<input
									type="text"
									value={newProduct.name}
									onChange={(e) =>
										setNewProduct({ ...newProduct, name: e.target.value })
									}
									className={`border ${colors.border} ${
										colors.input
									} rounded w-full py-1 px-2 outline-none ${
										colors.hoverSecondary
									} ${colors.background} ${colors.foreground} placeholder:${
										colors.mutedForeground
									} ${getFocusRingClass(colorScheme)}`}
									placeholder="Enter product name"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className={`block text-sm font-medium mb-1 ${colors.textSecondary}`}
								>
									Category
								</label>
								<input
									type="text"
									value={newProduct.category}
									onChange={(e) =>
										setNewProduct({ ...newProduct, category: e.target.value })
									}
									className={`border ${colors.border} ${
										colors.input
									} rounded w-full py-1 px-2 outline-none ${
										colors.hoverSecondary
									} ${colors.background} ${colors.foreground} placeholder:${
										colors.mutedForeground
									} ${getFocusRingClass(colorScheme)}`}
									placeholder="Enter product category"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className={`block text-sm font-medium mb-1 ${colors.textSecondary}`}
								>
									Price
								</label>
								<input
									type="number"
									value={newProduct.price}
									onChange={(e) =>
										setNewProduct({ ...newProduct, price: e.target.value })
									}
									className={`border ${colors.border} ${
										colors.input
									} rounded w-full py-1 px-2 outline-none ${
										colors.hoverSecondary
									} ${colors.background} ${colors.foreground} placeholder:${
										colors.mutedForeground
									} ${getFocusRingClass(colorScheme)}`}
									placeholder="Enter product price"
									required
								/>
							</div>
							<div className="mb-4">
								<label
									className={`block text-sm font-medium mb-1 ${colors.textSecondary}`}
								>
									Description
								</label>
								<textarea
									value={newProduct.description}
									onChange={(e) =>
										setNewProduct({
											...newProduct,
											description: e.target.value,
										})
									}
									className={`border ${colors.border} ${
										colors.input
									} rounded w-full py-1 px-2 outline-none ${
										colors.hoverSecondary
									} ${colors.background} ${colors.foreground} placeholder:${
										colors.mutedForeground
									} ${getFocusRingClass(colorScheme)}`}
									placeholder="Enter product description"
									required
								/>
							</div>
							<button
								type="submit"
								className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} py-1 px-4 rounded transition-colors`}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}

			{/* Sales & Revenue Overview Chart - Full Width */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl p-6 ${colors.shadow}`}
			>
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Sales & Revenue Overview
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Track your sales performance and revenue trends
						</p>
					</div>
					<div className="flex gap-2">
						<button
							onClick={() => setActiveTab("daily")}
							className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
								activeTab === "daily"
									? `${scheme.primary} ${scheme.primaryForeground}`
									: `${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary}`
							}`}
						>
							<span className="flex items-center gap-2">
								<Calendar size={16} /> Daily
							</span>
						</button>
						<button
							onClick={() => setActiveTab("weekly")}
							className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
								activeTab === "weekly"
									? `${scheme.primary} ${scheme.primaryForeground}`
									: `${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary}`
							}`}
						>
							<span className="flex items-center gap-2">
								<BarChart2 size={16} /> Weekly
							</span>
						</button>
						<button
							onClick={() => setActiveTab("monthly")}
							className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
								activeTab === "monthly"
									? `${scheme.primary} ${scheme.primaryForeground}`
									: `${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary}`
							}`}
						>
							<span className="flex items-center gap-2">
								<BsCalendarMonth size={16} /> Monthly
							</span>
						</button>
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

				{/* Legend */}
				<div className="flex items-center justify-center gap-6 mt-4">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded bg-blue-500" />
						<span className={`text-sm ${colors.textSecondary}`}>Sales</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded bg-green-500" />
						<span className={`text-sm ${colors.textSecondary}`}>Revenue</span>
					</div>
				</div>
			</div>
			{/* Products Table - Full Width */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden my-4`}
			>
				<div
					className={`flex items-center justify-between px-6 py-4 border-b ${colors.border}`}
				>
					<div>
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Recently Sold Products
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							View and manage all sold products
						</p>
					</div>
					<button
						className={`text-sm font-medium ${colors.textSecondary} ${colors.hoverSecondary} transition-colors px-3 py-1.5 rounded-xl`}
					>
						View all
					</button>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className={`${colors.muted} border-b ${colors.border}`}>
							<tr>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									ID
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Name
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={handleSort}
								>
									<div className="flex items-center gap-2">
										Price (USD)
										{sortOrder === "asc" ? (
											<ChevronUp className="w-4 h-4" />
										) : (
											<ChevronDown className="w-4 h-4" />
										)}
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Sold At
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Description
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Category
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{products.length === 0 ? (
								<tr>
									<td colSpan="6" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No products found</p>
									</td>
								</tr>
							) : (
								products.map((product) => (
									<tr
										key={product.id}
										className={`${colors.hover} transition-colors cursor-pointer`}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-medium ${colors.foreground}`}
											>
												#{product.id}
											</div>
										</td>
										<td className="px-6 py-4">
											<div
												className={`text-sm font-medium ${colors.foreground}`}
											>
												{product.name}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-semibold ${colors.foreground}`}
											>
												${product.price.toLocaleString()}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{product.soldAt}
											</div>
										</td>
										<td className="px-6 py-4">
											<div
												className={`text-sm ${colors.textSecondary} max-w-md truncate`}
											>
												{product.description}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													product.category === "Electronics"
														? "bg-blue-100 text-blue-800"
														: product.category === "Books"
														? "bg-purple-100 text-purple-800"
														: product.category === "Clothing"
														? "bg-pink-100 text-pink-800"
														: product.category === "Home"
														? "bg-orange-100 text-orange-800"
														: "bg-green-100 text-green-800"
												}`}
											>
												{product.category}
											</span>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Top Countries Section */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} p-6 my-4`}
			>
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Top Countries
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Sales distribution by country
						</p>
					</div>
					<button
						className={`text-sm font-medium ${colors.textSecondary} ${colors.hoverSecondary} transition-colors px-3 py-1.5 rounded-xl`}
					>
						View all
					</button>
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
								className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-2 hidden group-hover:block ${colors.card} ${colors.foreground} text-xs rounded-lg py-1.5 px-3 border ${colors.border} ${colors.shadow} z-10`}
							>
								{country.name}: {country.percentage}%
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sales;
