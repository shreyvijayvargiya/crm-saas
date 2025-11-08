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
import React, { useState } from "react";
import { BsCalendarMonth } from "react-icons/bs";
import {
	BarChart,
	LineChart,
	Line,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const Sales = () => {
	const [salesData, setSalesData] = useState({
		daily: [
			{ name: "Day 1", sales: 30 },
			{ name: "Day 2", sales: 45 },
			{ name: "Day 3", sales: 20 },
		],
		weekly: [
			{ name: "Week 1", sales: 200 },
			{ name: "Week 2", sales: 300 },
			{ name: "Week 3", sales: 250 },
		],
		monthly: [
			{ name: "Month 1", sales: 1000 },
			{ name: "Month 2", sales: 1200 },
			{ name: "Month 3", sales: 1500 },
		],
	});
	const [topCountries] = useState([
		{ name: "USA", percentage: 40 },
		{ name: "Germany", percentage: 30 },
		{ name: "China", percentage: 20 },
	]);

	const [revenueData, setRevenueData] = useState({
		oneMonth: [
			{ name: "Week 1", revenue: 500 },
			{ name: "Week 2", revenue: 700 },
			{ name: "Week 3", revenue: 600 },
			{ name: "Week 4", revenue: 800 },
			{ name: "Week 5", revenue: 900 },
		],
		threeMonths: [
			{ name: "Month 1", revenue: 2000 },
			{ name: "Month 2", revenue: 2500 },
			{ name: "Month 3", revenue: 3000 },
			{ name: "Month 4", revenue: 3500 },
			{ name: "Month 5", revenue: 4000 },
		],
		sixMonths: [
			{ name: "Month 1", revenue: 4000 },
			{ name: "Month 2", revenue: 4500 },
			{ name: "Month 3", revenue: 5000 },
			{ name: "Month 4", revenue: 5500 },
			{ name: "Month 5", revenue: 6000 },
		],
		oneYear: [
			{ name: "Year 1", revenue: 12000 },
			{ name: "Year 2", revenue: 15000 },
			{ name: "Year 3", revenue: 18000 },
			{ name: "Year 4", revenue: 21000 },
			{ name: "Year 5", revenue: 24000 },
		],
	});

	const [activeSalesTab, setActiveSalesTab] = useState("daily");
	const [activeRevenueTab, setActiveRevenueTab] = useState("oneMonth");

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

	// Calculate totals
	const totalSales = salesData.daily.reduce((acc, curr) => acc + curr.sales, 0);
	const totalRevenue = revenueData.oneMonth.reduce(
		(acc, curr) => acc + curr.revenue,
		0
	);
	const totalVisitors = topCountries.reduce(
		(acc, curr) => acc + curr.percentage,
		0
	);

	return (
		<div className="p-4">
			<div className="flex justify-between gap-2 items-center mb-4 flex-wrap">
				<div className="flex justify-start items-center gap-4 flex-wrap">
					<div className="flex items-center bg-white border border-zinc-100 rounded-xl py-4 px-8 gap-4 hover:bg-zinc-50 hover:px-12 transition-all duration-100 ease-in">
						<DollarSign size={32} className="mr-2 text-green-500" />
						<div>
							<p className="text-sm">Total Sales</p>
							<p className="text-lg font-bold">{totalSales}</p>
						</div>
					</div>
					<div className="flex items-center bg-white border border-zinc-100 rounded-xl py-4 px-8 gap-4 hover:bg-zinc-50 hover:px-12 transition-all duration-100 ease-in">
						<Mail size={32} className="mr-2 text-blue-500" />
						<div>
							<p className="text-sm">Total Revenue</p>
							<p className="text-lg font-bold">${totalRevenue}</p>
						</div>
					</div>
					<div className="flex items-center bg-white border border-zinc-100 rounded-xl py-4 px-8 gap-4 hover:bg-zinc-50 hover:px-12 transition-all duration-100 ease-in">
						<Users size={32} className="mr-2 text-purple-500" />
						<div>
							<p className="text-sm">Total Visitors</p>
							<p className="text-lg font-bold">{totalVisitors}</p>
						</div>
					</div>
				</div>
				<div className="flex justify-around items-center gap-2">
					<button className="flex items-center bg-zinc-800 text-white py-2 px-4 text-xs rounded-xl hover:bg-zinc-900 hover:px-6 transition-all duration-200">
						<Download size={18} className="mr-2" />
						Download Report
					</button>
					<button
						onClick={() => setIsModalOpen(true)}
						className="flex items-center bg-zinc-800 text-white rounded-xl py-2 text-xs px-4 hover:px-6 hover:bg-zinc-900 transition-all duration-200"
					>
						<PlusCircle size={18} className="mr-2" />
						Add Product
					</button>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white rounded-lg p-6 w-1/3">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-xl">Add Product</h2>
							<button onClick={() => setIsModalOpen(false)}>
								<X size={20} className="text-zinc-500" />
							</button>
						</div>
						<form onSubmit={handleAddProduct}>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">
									Product Name
								</label>
								<input
									type="text"
									value={newProduct.name}
									onChange={(e) =>
										setNewProduct({ ...newProduct, name: e.target.value })
									}
									className="border border-zinc-300 rounded w-full py-1 px-2 outline-none hover:bg-zinc-50"
									placeholder="Enter product name"
									required
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">
									Category
								</label>
								<input
									type="text"
									value={newProduct.category}
									onChange={(e) =>
										setNewProduct({ ...newProduct, category: e.target.value })
									}
									className="border border-zinc-300 rounded w-full py-1 px-2 outline-none hover:bg-zinc-50"
									placeholder="Enter product category"
									required
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">Price</label>
								<input
									type="number"
									value={newProduct.price}
									onChange={(e) =>
										setNewProduct({ ...newProduct, price: e.target.value })
									}
									className="border border-zinc-300 rounded w-full py-1 px-2 outline-none hover:bg-zinc-50"
									placeholder="Enter product price"
									required
								/>
							</div>
							<div className="mb-4">
								<label className="block text-sm font-medium mb-1">
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
									className="border border-zinc-300 rounded w-full py-1 px-2 outline-none hover:bg-zinc-50"
									placeholder="Enter product description"
									required
								/>
							</div>
							<button
								type="submit"
								className="bg-zinc-800 text-white py-1 px-4 rounded"
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}

			<div className="flex md:flex-row flex-col justify-between items-start gap-2">
				<div className="md:w-1/2 w-full bg-white rounded-xl border border-zinc-100 p-4">
					<div className="flex justify-between items-center p-5">
						<p className="text-xl">Sales Dashboard</p>
						<div className="flex space-x-2 mb-2">
							<button
								onClick={() => setActiveSalesTab("daily")}
								className={`px-2 py-1 text-sm rounded ${
									activeSalesTab === "daily"
										? "bg-zinc-800 text-white"
										: "bg-zinc-50"
								}`}
							>
								<span className="flex items-center">
									<Calendar size={16} className="mr-1" /> Daily
								</span>
							</button>
							<button
								onClick={() => setActiveSalesTab("weekly")}
								className={`px-2 py-1 text-sm rounded ${
									activeSalesTab === "weekly"
										? "bg-zinc-800 text-white"
										: "bg-zinc-50"
								}`}
							>
								<span className="flex items-center">
									<BarChart2 size={16} className="mr-1" /> Weekly
								</span>
							</button>
							<button
								onClick={() => setActiveSalesTab("monthly")}
								className={`px-2 py-1 text-sm rounded ${
									activeSalesTab === "monthly"
										? "bg-zinc-800 text-white"
										: "bg-zinc-50"
								}`}
							>
								<span className="flex items-center">
									<BsCalendarMonth size={16} className="mr-1" /> Monthly
								</span>
							</button>
						</div>
					</div>
					<ResponsiveContainer width="100%" height={300}>
						{activeSalesTab === "daily" && (
							<LineChart data={salesData.daily}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="sales" stroke="#8884d8" />
							</LineChart>
						)}
						{activeSalesTab === "weekly" && (
							<LineChart data={salesData.weekly}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="sales" stroke="#82ca9d" />
							</LineChart>
						)}
						{activeSalesTab === "monthly" && (
							<LineChart data={salesData.monthly}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="sales" stroke="#ffc658" />
							</LineChart>
						)}
					</ResponsiveContainer>
				</div>
				<div className="md:w-1/2 w-full p-2 border bg-white rounded-xl">
					<div className="flex justify-between items-center p-5">
						<p className="text-xl mt-4">Revenue Overview</p>
						<div className="flex space-x-2 mb-3">
							<button
								onClick={() => setActiveRevenueTab("oneMonth")}
								className={`px-2 py-1 text-sm rounded ${
									activeRevenueTab === "oneMonth"
										? "bg-zinc-800 text-white"
										: "bg-zinc-50"
								}`}
							>
								<Mail size={16} className="inline-block mr-1" /> 1 Month
							</button>
							<button
								onClick={() => setActiveRevenueTab("threeMonths")}
								className={`px-2 py-1 text-sm rounded ${
									activeRevenueTab === "threeMonths"
										? "bg-zinc-800 text-white"
										: "bg-zinc-50"
								}`}
							>
								<Mail size={16} className="inline-block mr-1" /> 3 Months
							</button>
							<button
								onClick={() => setActiveRevenueTab("sixMonths")}
								className={`px-2 py-1 text-sm rounded ${
									activeRevenueTab === "sixMonths"
										? "bg-zinc-800 text-white"
										: "bg-zinc-50"
								}`}
							>
								<Mail size={16} className="inline-block mr-1" /> 6 Months
							</button>
							<button
								onClick={() => setActiveRevenueTab("oneYear")}
								className={`px-2 py-1 text-sm rounded ${
									activeRevenueTab === "oneYear"
										? "bg-zinc-800 text-white"
										: "bg-zinc-50"
								}`}
							>
								<Mail size={16} className="inline-block mr-1" /> 1 Year
							</button>
						</div>
					</div>
					<ResponsiveContainer width="100%" height={300}>
						{activeRevenueTab === "oneMonth" && (
							<BarChart data={revenueData.oneMonth}>
								<CartesianGrid strokeDasharray="1 1" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="revenue" fill="#8884d8" barSize={20} />{" "}
								{/* Reduced bar width */}
							</BarChart>
						)}
						{activeRevenueTab === "threeMonths" && (
							<BarChart data={revenueData.threeMonths}>
								<CartesianGrid strokeDasharray="1 1" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="revenue" fill="#82ca9d" barSize={20} />{" "}
								{/* Reduced bar width */}
							</BarChart>
						)}
						{activeRevenueTab === "sixMonths" && (
							<BarChart data={revenueData.sixMonths}>
								<CartesianGrid strokeDasharray="1 1" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="revenue" fill="#ffc658" barSize={20} />{" "}
								{/* Reduced bar width */}
							</BarChart>
						)}
						{activeRevenueTab === "oneYear" && (
							<BarChart data={revenueData.oneYear}>
								<CartesianGrid strokeDasharray="1 1" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="revenue" fill="#ff7300" barSize={20} />{" "}
								{/* Reduced bar width */}
							</BarChart>
						)}
					</ResponsiveContainer>
				</div>
			</div>
			<div className="flex justify-start gap-2 items-start">
				<div className="md:w-1/2 w-full my-4 bg-white border border-zinc-100 rounded-xl p-4">
					<div className="flex justify-between items-center my-4">
						<p className="">Recently sold products</p>
						<button className="text-xs underline hover:text-zinc-400 text-zinc-300">
							View all
						</button>
					</div>
					<table className="min-w-full border-collapse border border-zinc-100 ">
						<thead>
							<tr className="bg-zinc-50 bg-opacity-80 hover:bg-zinc-100">
								<th className="p-2 text-left font-semibold text-sm">ID</th>
								<th className="p-2 text-left font-semibold text-sm">Name</th>
								<th className="p-2 text-left font-semibold text-sm">
									<div className="flex items-center">
										<span>Price (USD)</span>
										<button onClick={handleSort} className="ml-2">
											{sortOrder === "asc" ? (
												<ChevronUp size={16} />
											) : (
												<ChevronDown size={16} />
											)}
										</button>
									</div>
								</th>
								<th className="p-2 text-left font-semibold text-sm">Sold At</th>
								<th className="p-2 text-left font-semibold text-sm">
									Description
								</th>
								<th className="p-2 text-left font-semibold text-sm">
									Category
								</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr
									key={product.id}
									className="border-b border-zinc-200 hover:bg-zinc-50"
								>
									<td className="p-2">{product.id}</td>
									<td className="p-2">{product.name}</td>
									<td className="p-2">${product.price}</td>
									<td className="p-2">{product.soldAt}</td>
									<td className="p-2">{product.description}</td>
									<td className="p-2">{product.category}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="md:w-1/2 w-full p-4 bg-white border border-zinc-100 rounded-xl my-4">
					<div className="flex justify-between items-center my-4">
						<p className="">Top countries</p>
						<button className="text-xs underline hover:text-zinc-400 text-zinc-300">
							View all
						</button>
					</div>
					<div className="">
						{topCountries.map((country) => (
							<div key={country.name} className="mb-2 relative group">
								<div className="flex justify-between">
									<span>{country.name}</span>
									<span>{country.percentage}%</span>
								</div>
								<div className="bg-zinc-50 rounded-full h-4">
									<div
										className="bg-indigo-300 h-4 rounded-full"
										style={{ width: `${country.percentage}%` }}
									/>
								</div>
								<div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
									{country.name}: {country.percentage}%
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sales;
