import React, { useState, useMemo } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
	PlusCircle,
	Search,
	X,
	ChevronUp,
	ChevronDown,
	Building2,
	Star,
	Layers,
	MapPin,
} from "lucide-react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { ExportDropdown } from "../../lib/ui/dropdown";
import { toast } from "react-toastify";
import { Pagination } from "../../modules";
import { useTheme } from "../../utils/useTheme";
import { useChartTooltipProps } from "../../utils/chartTooltip";
import { getFocusRingClass } from "../../utils/theme";

const Companies = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();
	const chartTooltipProps = useChartTooltipProps();

	const [companies, setCompanies] = useState([
		{
			name: "HubSpot",
			owner: "Alice Johnson",
			logo: "./companies/hubspot.png",
			industry: "Technology",
			rating: 4.5,
			location: "New York",
		},
		{
			name: "Slack",
			owner: "Bob Brown",
			logo: "./companies/slack.png",
			industry: "Communication",
			rating: 4.0,
			location: "San Francisco",
		},
		{
			name: "Stripe",
			owner: "Charlie Smith",
			logo: "./companies/stripe.png",
			industry: "Finance",
			rating: 4.8,
			location: "Los Angeles",
		},
		{
			name: "TikTok",
			owner: "David Wilson",
			logo: "./companies/tiktok.png",
			industry: "Entertainment",
			rating: 4.7,
			location: "Los Angeles",
		},
		{
			name: "Zendesk",
			owner: "Eve Davis",
			logo: "./companies/zendesk.png",
			industry: "Customer Service",
			rating: 4.6,
			location: "Chicago",
		},
		{
			name: "Zapier",
			owner: "Frank Miller",
			logo: "./companies/slack.png",
			industry: "Automation",
			rating: 4.9,
			location: "Austin",
		},
		{
			name: "Airbnb",
			owner: "Grace Lee",
			logo: "./companies/slack.png",
			industry: "Hospitality",
			rating: 4.5,
			location: "San Francisco",
		},
		{
			name: "Spotify",
			owner: "Henry Adams",
			logo: "./companies/hubspot.png",
			industry: "Music",
			rating: 4.8,
			location: "Stockholm",
		},
		{
			name: "LinkedIn",
			owner: "Ivy Green",
			logo: "./companies/zendesk.png",
			industry: "Social Media",
			rating: 4.3,
			location: "Sunnyvale",
		},
		{
			name: "Adobe",
			owner: "Jack White",
			logo: "./companies/stripe.png",
			industry: "Software",
			rating: 4.6,
			location: "San Jose",
		},
		{
			name: "Netflix",
			owner: "Kathy Brown",
			logo: "./companies/tiktok.png",
			industry: "Entertainment",
			rating: 4.7,
			location: "Los Gatos",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
	const [newCompany, setNewCompany] = useState({
		name: "",
		owner: "",
		logo: "",
		industry: "",
		rating: "",
		location: "",
	});
	const [sortConfig, setSortConfig] = useState({
		key: "name",
		direction: "ascending",
	});

	const handleAddCompany = () => {
		setCompanies((prevCompanies) => [
			...prevCompanies,
			{ ...newCompany, rating: parseFloat(newCompany.rating) },
		]);
		setNewCompany({
			name: "",
			owner: "",
			logo: "",
			industry: "",
			rating: "",
			location: "",
		});
		setIsAddCompanyModalOpen(false);
	};

	const filteredCompanies = companies.filter((company) =>
		company.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const sortedCompanies = [...filteredCompanies].sort((a, b) => {
		const key = sortConfig.key;
		if (key === "rating") {
			return sortConfig.direction === "ascending"
				? a.rating - b.rating
				: b.rating - a.rating;
		}
		if (a[key] < b[key]) {
			return sortConfig.direction === "ascending" ? -1 : 1;
		}
		if (a[key] > b[key]) {
			return sortConfig.direction === "ascending" ? 1 : -1;
		}
		return 0;
	});

	const requestSort = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const handleExportCompaniesCsv = () => {
		const header = "name,owner,industry,rating,location";
		const rows = sortedCompanies.map(
			(c) =>
				`${c.name},${c.owner},${c.industry},${c.rating},${c.location}`
		);
		const csvContent =
			"data:text/csv;charset=utf-8," + [header, ...rows].join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "companies.csv");
		document.body.appendChild(link);
		link.click();
		link.remove();
		toast.success("Exported companies (CSV).");
	};

	const companyStats = useMemo(() => {
		const total = companies.length;
		const avgRating =
			total > 0
				? Math.round(
						(companies.reduce((s, c) => s + c.rating, 0) / total) * 10
				  ) / 10
				: 0;
		const industries = new Set(companies.map((c) => c.industry)).size;
		const locations = new Set(companies.map((c) => c.location)).size;
		return { total, avgRating, industries, locations };
	}, [companies]);

	const industryChartData = useMemo(() => {
		const m = {};
		companies.forEach((c) => {
			m[c.industry] = (m[c.industry] || 0) + 1;
		});
		return Object.entries(m)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count);
	}, [companies]);

	const locationChartData = useMemo(() => {
		const m = {};
		companies.forEach((c) => {
			m[c.location] = (m[c.location] || 0) + 1;
		});
		return Object.entries(m)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 10);
	}, [companies]);

	const gridStroke = theme === "dark" ? "#3f3f46" : "#e4e4e7";
	const axisStroke = theme === "dark" ? "#71717a" : "#71717a";

	return (
		<div className={`p-6 transition-colors`}>
			{/* Stats + charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow}`}
				>
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-2xl" />
					<div className="relative">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
								<Building2 className="text-blue-500" size={20} />
							</div>
						</div>
						<p className={`text-2xl font-bold ${colors.foreground}`}>
							{companyStats.total}
						</p>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Total companies
						</p>
					</div>
				</div>
				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow}`}
				>
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full blur-2xl" />
					<div className="relative">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-sm border border-amber-500/20">
								<Star className="text-amber-500" size={20} />
							</div>
						</div>
						<p className={`text-2xl font-bold ${colors.foreground}`}>
							{companyStats.avgRating}
						</p>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Average rating
						</p>
					</div>
				</div>
				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow}`}
				>
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-2xl" />
					<div className="relative">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
								<Layers className="text-purple-500" size={20} />
							</div>
						</div>
						<p className={`text-2xl font-bold ${colors.foreground}`}>
							{companyStats.industries}
						</p>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Unique industries
						</p>
					</div>
				</div>
				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow}`}
				>
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-teal-600/10 rounded-full blur-2xl" />
					<div className="relative">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 backdrop-blur-sm border border-teal-500/20">
								<MapPin className="text-teal-500" size={20} />
							</div>
						</div>
						<p className={`text-2xl font-bold ${colors.foreground}`}>
							{companyStats.locations}
						</p>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Unique locations
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<div
					className={`${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow}`}
				>
					<p className={`text-sm font-medium ${colors.foreground} mb-1`}>
						Companies by industry
					</p>
					<p className={`text-xs ${colors.mutedForeground} mb-4`}>
						Matches unique industries and totals
					</p>
					<ResponsiveContainer width="100%" height={240}>
						<BarChart
							data={industryChartData}
							margin={{ top: 8, right: 8, left: 0, bottom: 32 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke={gridStroke}
								vertical={false}
							/>
							<XAxis
								dataKey="name"
								stroke={axisStroke}
								fontSize={10}
								tickLine={false}
								axisLine={false}
								interval={0}
								angle={-25}
								textAnchor="end"
								height={48}
							/>
							<YAxis
								stroke={axisStroke}
								fontSize={11}
								tickLine={false}
								axisLine={false}
								allowDecimals={false}
							/>
							<Tooltip
								{...chartTooltipProps}
								formatter={(value) => [value, "Companies"]}
							/>
							<Bar
								dataKey="count"
								fill={theme === "dark" ? "#a855f7" : "#9333ea"}
								radius={[8, 8, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
				<div
					className={`${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow}`}
				>
					<p className={`text-sm font-medium ${colors.foreground} mb-1`}>
						Companies by location
					</p>
					<p className={`text-xs ${colors.mutedForeground} mb-4`}>
						Top cities (unique location count: {companyStats.locations})
					</p>
					<ResponsiveContainer width="100%" height={240}>
						<BarChart
							data={locationChartData}
							margin={{ top: 8, right: 8, left: 0, bottom: 32 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke={gridStroke}
								vertical={false}
							/>
							<XAxis
								dataKey="name"
								stroke={axisStroke}
								fontSize={10}
								tickLine={false}
								axisLine={false}
								interval={0}
								angle={-25}
								textAnchor="end"
								height={48}
							/>
							<YAxis
								stroke={axisStroke}
								fontSize={11}
								tickLine={false}
								axisLine={false}
								allowDecimals={false}
							/>
							<Tooltip
								{...chartTooltipProps}
								formatter={(value) => [value, "Companies"]}
							/>
							<Bar
								dataKey="count"
								fill={theme === "dark" ? "#14b8a6" : "#0d9488"}
								radius={[8, 8, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Companies Table - Improved */}
			{/* Table Header */}
			<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between p-2 gap-4`}
				>
					<div className="flex-1">
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Companies
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							View and manage all your companies
						</p>
					</div>
					<div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
						{/* Search */}
						<div
							className={`relative flex gap-2 items-center border ${colors.border} rounded-xl px-3 py-2 ${colors.card} w-full md:w-auto`}
						>
							<Search className={colors.textSecondary} size={18} />
							<input
								type="text"
								placeholder="Search companies..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className={`outline-none flex-1 ${
									colors.foreground
								} placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
							/>
						</div>
						{/* Add Company Button */}
						<button
							onClick={() => setIsAddCompanyModalOpen(true)}
							className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded-xl text-sm px-4 py-2 transition-all duration-200 font-medium flex items-center gap-2`}
						>
							<PlusCircle size={16} />
							Add Company
						</button>
						<ExportDropdown
							onExportCsv={handleExportCompaniesCsv}
							onExportPdf={handleExportCompaniesCsv}
							onExportJson={handleExportCompaniesCsv}
						/>
					</div>
				</div>
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden my-4`}
			>
				

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className={`${colors.muted} border-b ${colors.border}`}>
							<tr>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Logo
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("name")}
								>
									<div className="flex items-center gap-2">
										Name
										{sortConfig.key === "name" && (
											<>
												{sortConfig.direction === "ascending" ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</>
										)}
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("owner")}
								>
									<div className="flex items-center gap-2">
										Owner
										{sortConfig.key === "owner" && (
											<>
												{sortConfig.direction === "ascending" ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</>
										)}
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("industry")}
								>
									<div className="flex items-center gap-2">
										Industry
										{sortConfig.key === "industry" && (
											<>
												{sortConfig.direction === "ascending" ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</>
										)}
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("rating")}
								>
									<div className="flex items-center gap-2">
										Rating
										{sortConfig.key === "rating" && (
											<>
												{sortConfig.direction === "ascending" ? (
													<ChevronUp className="w-4 h-4" />
												) : (
													<ChevronDown className="w-4 h-4" />
												)}
											</>
										)}
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Location
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{sortedCompanies.length === 0 ? (
								<tr>
									<td colSpan="7" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No companies found</p>
									</td>
								</tr>
							) : (
								sortedCompanies.map((company, index) => (
									<tr
										key={index}
										className={`${colors.hover} transition-colors`}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<img
												src={company.logo}
												alt={company.name}
												className="w-10 h-10 rounded-full border-2 border-zinc-200"
											/>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-medium ${colors.foreground}`}
											>
												{company.name}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{company.owner}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{company.industry}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-1">
												<span
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{company.rating}
												</span>
												<span className={`text-xs ${colors.textMuted}`}>★</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{company.location}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<button
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
													title="Edit"
													onClick={() => toast.info(`Edit ${company.name}`)}
												>
													<FaEdit size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
													title="Delete"
													onClick={() => toast.info(`Delete ${company.name}`)}
												>
													<FaTrash size={16} className={colors.textSecondary} />
												</button>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Add New Company Modal */}
			{isAddCompanyModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={() => setIsAddCompanyModalOpen(false)}
				>
					<div
						className={`${colors.card} rounded-xl ${colors.shadow} max-w-xl w-full overflow-y-auto`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div
							className={`flex items-center justify-between p-6 border-b ${colors.border}`}
						>
							<div>
								<h2 className={`text-xl font-semibold ${colors.foreground}`}>
									Add New Company
								</h2>
								<p className={`text-sm ${colors.mutedForeground} mt-1`}>
									Create a new company in your database
								</p>
							</div>
							<button
								onClick={() => setIsAddCompanyModalOpen(false)}
								className={`p-2 ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								<X className={`w-5 h-5 ${colors.mutedForeground}`} />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-6 space-y-4">
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									placeholder="Enter company name"
									value={newCompany.name}
									onChange={(e) =>
										setNewCompany({ ...newCompany, name: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Owner
								</label>
								<input
									type="text"
									placeholder="Enter owner name"
									value={newCompany.owner}
									onChange={(e) =>
										setNewCompany({ ...newCompany, owner: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Logo URL
								</label>
								<input
									type="text"
									placeholder="https://example.com/logo.png"
									value={newCompany.logo}
									onChange={(e) =>
										setNewCompany({ ...newCompany, logo: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Industry
								</label>
								<input
									type="text"
									placeholder="Enter industry"
									value={newCompany.industry}
									onChange={(e) =>
										setNewCompany({ ...newCompany, industry: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Rating
								</label>
								<input
									type="number"
									placeholder="0.0 - 5.0"
									min="0"
									max="5"
									step="0.1"
									value={newCompany.rating}
									onChange={(e) =>
										setNewCompany({ ...newCompany, rating: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Location
								</label>
								<input
									type="text"
									placeholder="Enter location"
									value={newCompany.location}
									onChange={(e) =>
										setNewCompany({ ...newCompany, location: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
							</div>
						</div>

						{/* Modal Footer */}
						<div
							className={`flex items-center justify-end gap-3 p-6 border-t ${colors.border}`}
						>
							<button
								onClick={() => setIsAddCompanyModalOpen(false)}
								className={`px-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								Cancel
							</button>
							<button
								onClick={handleAddCompany}
								className={`px-4 py-2 text-sm font-medium ${scheme.primaryForeground} ${scheme.primary} ${scheme.primaryHover} rounded-xl transition-colors flex items-center gap-2`}
							>
								<PlusCircle size={16} />
								Add Company
							</button>
						</div>
					</div>
				</div>
			)}
			<Pagination />
		</div>
	);
};

export default Companies;
