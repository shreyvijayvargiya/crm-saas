import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PlusCircle, Search, X } from "lucide-react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { Pagination } from "../../modules";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Companies = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

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

	return (
		<div className={`p-6 ${colors.background} transition-colors`}>
			{/* Companies Table - Improved */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden my-4`}
			>
				{/* Table Header */}
				<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4 border-b ${colors.border} gap-4`}
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
								className={`outline-none flex-1 ${colors.background} ${
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
					</div>
				</div>

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
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Edit"
													onClick={() => toast.info(`Edit ${company.name}`)}
												>
													<FaEdit size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
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
