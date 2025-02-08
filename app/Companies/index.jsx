import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { PlusCircle, Search, X } from "lucide-react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "react-toastify";
import { Pagination } from "../../modules";

const Companies = () => {
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
		if (a[sortConfig.key] < b[sortConfig.key]) {
			return sortConfig.direction === "ascending" ? -1 : 1;
		}
		if (a[sortConfig.key] > b[sortConfig.key]) {
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
		<div className="p-4">
			<p className="text-xl">Companies</p>
			<div className="flex items-center mb-4 gap-2">
				<div className="flex gap-1 border border-gray-200 rounded items-center px-2 hover:bg-gray-50 group">
					<Search size={18} className="text-gray-400" />
					<input
						type="text"
						placeholder="Search Companies"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="px-2 py-1 outline-none mr-2 group-hover:bg-gray-50"
					/>
				</div>
				<button
					onClick={() => setIsAddCompanyModalOpen(true)}
					className="bg-gray-800 hover:bg-gray-900 text-white p-2 text-xs rounded flex items-center hover:px-4 transition-all ease-in duration-100"
				>
					<PlusCircle className="mr-1" size={16} /> Add Company
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full border-collapse border border-gray-200 mt-4">
					<thead>
						<tr className="bg-gray-50 bg-opacity-80 hover:bg-gray-50 text-left text-sm text-gray-800">
							<th className="p-2 border border-gray-300">Logo</th>
							<th
								className="p-2 cursor-pointer border border-gray-300"
								onClick={() => requestSort("Name")}
							>
								<div className="flex justify-between items-center">
									<span>Name</span>
									{sortConfig.key === "Name" ? (
										sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} />
										) : (
											<ChevronDown size={16} />
										)
									) : (
										<ChevronUp size={16} />
									)}
								</div>
							</th>
							<th
								className="p-2 cursor-pointer border border-gray-300"
								onClick={() => requestSort("owner")}
							>
								<div className="flex justify-between items-center">
									<span>Owner</span>
									{sortConfig.key === "owner" ? (
										sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} />
										) : (
											<ChevronDown size={16} />
										)
									) : (
										<ChevronUp size={16} />
									)}
								</div>
							</th>

							<th
								className="p-2 cursor-pointer border border-gray-300"
								onClick={() => requestSort("industry")}
							>
								<div className="flex justify-between items-center">
									<span>Industry</span>
									{sortConfig.key === "industry" ? (
										sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} />
										) : (
											<ChevronDown size={16} />
										)
									) : (
										<ChevronUp size={16} />
									)}
								</div>
							</th>
							<th
								className="p-2 cursor-pointer border border-gray-300"
								onClick={() => requestSort("rating")}
							>
								<div className="flex justify-between items-center">
									<span>Rating</span>
									{sortConfig.key === "rating" ? (
										sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} />
										) : (
											<ChevronDown size={16} />
										)
									) : (
										<ChevronUp size={16} />
									)}
								</div>
							</th>
							<th className="p-2 border border-gray-300">Location</th>
							<th className="p-2 border border-gray-300">Actions</th>
						</tr>
					</thead>
					<tbody>
						{sortedCompanies.map((company, index) => (
							<tr key={index} className="hover:bg-gray-50">
								{[
									<img
										src={company.logo}
										alt={company.name}
										className="w-8 h-8 rounded-full"
									/>,
									company.name,
									company.owner,
									company.industry,
									company.rating,
									company.location,
								].map((item, idx) => (
									<td key={idx} className="p-2 border border-gray-300">
										{item}
									</td>
								))}
								<td className="md:py-4 py-6 px-2 flex items-center border-b border-gray-300">
									<FaEdit
										className="cursor-pointer text-gray-400"
										onClick={() => toast.info(`Edit ${company.name}`)}
									/>
									<FaTrash
										className="cursor-pointer text-gray-400"
										onClick={() => toast.info(`Delete ${company.name}`)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{isAddCompanyModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg max-w-xl mx-auto">
						<div className="flex justify-between items-center mb-4">
							<p className="text">Add New Company</p>
							<button
								onClick={() => setIsAddCompanyModalOpen(false)}
								className="bg-gray-50 text-gray-800 p-1 rounded"
							>
								<X className="" size={16} />
							</button>
						</div>
						<input
							type="text"
							placeholder="Name"
							value={newCompany.name}
							onChange={(e) =>
								setNewCompany({ ...newCompany, name: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="text"
							placeholder="Owner"
							value={newCompany.owner}
							onChange={(e) =>
								setNewCompany({ ...newCompany, owner: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="text"
							placeholder="Logo URL"
							value={newCompany.logo}
							onChange={(e) =>
								setNewCompany({ ...newCompany, logo: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="text"
							placeholder="Industry"
							value={newCompany.industry}
							onChange={(e) =>
								setNewCompany({ ...newCompany, industry: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="number"
							placeholder="Rating"
							value={newCompany.rating}
							onChange={(e) =>
								setNewCompany({ ...newCompany, rating: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="text"
							placeholder="Location"
							value={newCompany.location}
							onChange={(e) =>
								setNewCompany({ ...newCompany, location: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<button
							onClick={handleAddCompany}
							className="mt-4 bg-gray-800 hover:bg-gray-900 text-white text-sm px-2 py-1 rounded"
						>
							Add Company
						</button>
					</div>
				</div>
			)}
			<Pagination />
		</div>
	);
};

export default Companies;
