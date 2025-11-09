import {
	Eye,
	Mail,
	MessageCircle,
	Pen,
	Phone,
	Trash,
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
	Search,
	UserPlus,
	Download,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Leads = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

	const initialPipelines = [
		{
			id: "new",
			name: "New Leads",
			leads: [
				{
					id: "101",
					name: "Alice Brown",
					email: "alice@company.com",
					company: "Cloud Corp",
					image: "./people/person-1.png",
				},
				{
					id: "103",
					name: "Charlie Green",
					email: "charlie@company.com",
					company: "Tech Innovations",
					image: "./people/person-2.png",
				},
				{
					id: "104",
					name: "Diana Prince",
					email: "diana@company.com",
					company: "Amazon",
					image: "./people/person-3.png",
				},
			],
		},
		{
			id: "contacted",
			name: "Contacted",
			leads: [
				{
					id: "102",
					name: "Bob Wilson",
					email: "bob@startup.io",
					company: "AI Labs",
					image: "./people/person-4.png",
				},
				{
					id: "105",
					name: "Eve Adams",
					email: "eve@company.com",
					company: "Marketing Solutions",
					image: "./people/person-1.png",
				},
				{
					id: "106",
					name: "Frank Castle",
					email: "frank@company.com",
					company: "Finance Corp",
					image: "./people/person-2.png",
				},
			],
		},
		{
			id: "rejected",
			name: "Rejected",
			leads: [
				{
					id: "107",
					name: "John Doe",
					email: "john@company.com",
					company: "Failed Ventures",
					image: "./people/person-2.png",
				},
				{
					id: "108",
					name: "Jane Smith",
					email: "jane@company.com",
					company: "Unsuccessful Inc.",
					image: "./people/person-4.png",
				},
			],
		},
	];

	const initialLeads = [
		{
			id: "101",
			name: "Alice Brown",
			email: "alice@company.com",
			lastContacted: "06/25/2024",
			image: "./people/person-1.png",
		},
		{
			id: "102",
			name: "Bob Wilson",
			email: "bob@startup.io",
			lastContacted: "06/24/2024",
			image: "./people/person-4.png",
		},
		{
			id: "103",
			name: "Charlie Green",
			email: "charlie@company.com",
			lastContacted: "06/23/2024",
			image: "./people/person-2.png",
		},
		{
			id: "104",
			name: "Diana Prince",
			email: "diana@company.com",
			lastContacted: "06/22/2024",
			image: "./people/person-3.png",
		},
		{
			id: "105",
			name: "Eve Adams",
			email: "eve@company.com",
			lastContacted: "06/21/2024",
			image: "./people/person-1.png",
		},
		{
			id: "106",
			name: "Frank Castle",
			email: "frank@company.com",
			lastContacted: "06/20/2024",
			image: "./people/person-2.png",
		},
		{
			id: "107",
			name: "Grace Hopper",
			email: "grace@company.com",
			lastContacted: "06/19/2024",
			image: "./people/person-3.png",
		},
		{
			id: "108",
			name: "Hank Pym",
			email: "hank@company.com",
			lastContacted: "06/18/2024",
			image: "./people/person-1.png",
		},
		{
			id: "109",
			name: "Irene Adler",
			email: "irene@company.com",
			lastContacted: "06/17/2024",
			image: "./people/person-4.png",
		},
		{
			id: "110",
			name: "Jack Sparrow",
			email: "jack@company.com",
			lastContacted: "06/16/2024",
			image: "./people/person-2.png",
		},
		{
			id: "111",
			name: "Lara Croft",
			email: "lara@company.com",
			lastContacted: "06/15/2024",
			image: "./people/person-1.png",
		},
		{
			id: "112",
			name: "John Doe",
			email: "john@company.com",
			lastContacted: "06/14/2024",
			image: "./people/person-2.png",
		},
		{
			id: "113",
			name: "Jane Smith",
			email: "jane@company.com",
			lastContacted: "06/13/2024",
			image: "./people/person-4.png",
		},
	];

	const [pipelines, setPipelines] = useState(initialPipelines);
	const [allLeads, setAllLeads] = useState(initialLeads);
	const [sortConfig, setSortConfig] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newLead, setNewLead] = useState({ name: "", email: "", image: "" });

	const handleAddLead = () => setIsModalOpen(true);

	const handleModalClose = () => {
		setIsModalOpen(false);
		setNewLead({ name: "", email: "", image: "" });
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewLead((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = () => {
		const leadToAdd = {
			id: (Math.random() * 1000).toString(),
			name: newLead.name,
			email: newLead.email,
			image: newLead.image,
			lastContacted: new Date().toISOString().split("T")[0],
		};
		setAllLeads((prevLeads) => [...prevLeads, leadToAdd]);
		toast.success(`Added Lead: ${leadToAdd.name}`);
		handleModalClose();
	};

	const handleRemoveLead = (leadId) => {
		setAllLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== leadId));
		toast.success(`Removed Lead with ID: ${leadId}`);
	};

	const handleExportCSV = () => {
		const csvContent =
			"data:text/csv;charset=utf-8," +
			allLeads
				.map((lead) => `${lead.name},${lead.email},${lead.lastContacted}`)
				.join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "leads.csv");
		document.body.appendChild(link);
		link.click();
		alert("Exported CSV functionality implemented.");
	};

	const handleDragStart = (event, lead) => {
		event.dataTransfer.setData("text/plain", lead.id);
		event.target.style.opacity = "0.5";
	};

	const handleDragEnd = (event) => {
		event.target.style.opacity = "1";
	};

	const handleDrop = (event, pipelineId) => {
		event.preventDefault();
		const leadId = event.dataTransfer.getData("text/plain");
		const leadToMove = allLeads.find((lead) => lead.id === leadId);
		if (leadToMove) {
			setPipelines((prevPipelines) =>
				prevPipelines.map((pipeline) => {
					if (pipeline.id === pipelineId) {
						return { ...pipeline, leads: [...pipeline.leads, leadToMove] };
					}
					return {
						...pipeline,
						leads: pipeline.leads.filter((lead) => lead.id !== leadId),
					};
				})
			);
			toast.success(`Lead with ID: ${leadId} moved to pipeline: ${pipelineId}`);
		}
	};

	const requestSort = (key) => {
		let direction = "ascending";
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "ascending"
		) {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const sortedLeads = useMemo(() => {
		let sortableLeads = [...allLeads];
		if (sortConfig !== null) {
			sortableLeads.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key])
					return sortConfig.direction === "ascending" ? -1 : 1;
				if (a[sortConfig.key] > b[sortConfig.key])
					return sortConfig.direction === "ascending" ? 1 : -1;
				return 0;
			});
		}
		return sortableLeads;
	}, [allLeads, sortConfig]);

	return (
		<div
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar ${colors.background} transition-colors`}
		>
			{/* Leads Table - Improved */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden my-4`}
			>
				{/* Table Header */}
				<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4 border-b ${colors.border} gap-4`}
				>
					<div>
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Recent Leads
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							View and manage all your leads
						</p>
					</div>
					<div className="flex md:justify-end justify-start items-center gap-2 flex-wrap w-full md:w-auto">
						<div
							className={`relative flex gap-2 items-center border ${colors.border} rounded-xl px-3 py-2 ${colors.card} w-full md:w-auto`}
						>
							<Search size={18} className={colors.textSecondary} />
							<input
								type="text"
								placeholder="Search Leads..."
								className={`outline-none flex-1 ${colors.background} ${
									colors.foreground
								} placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
								onChange={(e) => {
									const searchTerm = e.target.value.toLowerCase();
									const filteredLeads =
										searchTerm === ""
											? pipelines[0].leads
											: pipelines[0].leads.filter(
													(lead) =>
														lead.name.toLowerCase().includes(searchTerm) ||
														lead.email.toLowerCase().includes(searchTerm)
											  );
									setAllLeads(filteredLeads);
								}}
							/>
						</div>
						<button
							onClick={handleAddLead}
							className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded-xl text-sm px-4 py-2 transition-all duration-200 font-medium flex items-center gap-2`}
						>
							<UserPlus size={16} />
							Add Lead
						</button>
						<button
							onClick={handleExportCSV}
							className={`border ${colors.border} ${colors.hoverSecondary} ${colors.foreground} rounded-xl px-4 py-2 transition-all duration-200 text-sm font-medium flex items-center gap-2`}
						>
							<Download size={16} />
							Export CSV
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
									<input
										type="checkbox"
										className={getFocusRingClass(colorScheme)}
									/>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("name")}
								>
									<div className="flex items-center gap-2">
										User Info
										{sortConfig?.key === "name" && (
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
									Email
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Contacted At
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{sortedLeads.length === 0 ? (
								<tr>
									<td colSpan="5" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No leads found</p>
									</td>
								</tr>
							) : (
								sortedLeads.map((lead) => (
									<tr
										key={lead.id}
										className={`${colors.hover} transition-colors`}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<input
												type="checkbox"
												className={getFocusRingClass(colorScheme)}
											/>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-3">
												<img
													src={lead.image}
													alt={lead.name}
													className="w-10 h-10 rounded-full border-2 border-zinc-200"
												/>
												<div
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{lead.name}
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{lead.email}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{lead.lastContacted}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Call"
												>
													<Phone size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Message"
												>
													<MessageCircle
														size={16}
														className={colors.textSecondary}
													/>
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="View"
												>
													<Eye size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Edit"
												>
													<Pen size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Delete"
													onClick={() => handleRemoveLead(lead.id)}
												>
													<Trash size={16} className={colors.textSecondary} />
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
			<div className="flex items-center justify-end my-4">
				<ChevronLeft
					size={18}
					className={`cursor-pointer ${colors.textSecondary} transition-colors ${colors.hoverSecondary}`}
					onClick={() => {}}
				/>
				{Array.from({ length: 5 }, (_, index) => (
					<button
						key={index}
						className={`mx-1 px-3 py-1 rounded ${
							colors.hoverSecondary
						} transition-colors ${
							index === 0
								? `${colors.muted} ${colors.foreground}`
								: colors.foreground
						}`}
						onClick={() => {}}
					>
						{index + 1}
					</button>
				))}
				<ChevronRight
					size={18}
					className={`cursor-pointer ${colors.textSecondary} transition-colors ${colors.hoverSecondary}`}
					onClick={() => {}}
				/>
			</div>
			<p className={`my-4 ${colors.foreground}`}>Leads</p>
			<div className="flex md:flex-row flex-col gap-2 md:w-full">
				{pipelines.map((pipeline) => (
					<div
						key={pipeline.id}
						className={`py-4 md:w-3/4 w-full ${colors.card} ${colors.shadow} rounded-lg p-4 border ${colors.border} ${colors.hoverSecondary} hover:px-5 transition-all duration-100 ease-in`}
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => handleDrop(e, pipeline.id)}
					>
						<p className={`font-semibold text-lg ${colors.foreground}`}>
							{pipeline.name}
						</p>
						{pipeline.leads.map((lead) => (
							<div
								key={lead.id}
								draggable
								onDragStart={(e) => handleDragStart(e, lead)}
								onDragEnd={handleDragEnd}
								className={`border ${colors.border} rounded-lg p-3 my-2 ${colors.muted} transition-all duration-200 ease-in-out ${colors.shadow} ${colors.hoverSecondary}`}
							>
								<img
									src={lead.image}
									alt={lead.name}
									className={`w-12 h-12 rounded-full mr-4 border-2 ${colors.border}`}
								/>
								<div className="flex-1">
									<div className={`font-medium ${colors.foreground}`}>
										{lead.name}
									</div>
									<div className={`text-sm ${colors.textSecondary}`}>
										{lead.email}
									</div>
									<div className={`text-xs ${colors.textMuted}`}>
										Company: {lead.company}
									</div>
								</div>
								<div className="text-sm flex items-center gap-2 my-2">
									<Mail size={18} className={colors.textMuted} />
									<MessageCircle size={18} className={colors.textMuted} />
									<Phone size={18} className={colors.textMuted} />
								</div>
							</div>
						))}
					</div>
				))}
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div
						className={`${colors.card} p-6 rounded ${colors.shadow} border ${colors.border}`}
					>
						<h2 className={`text-lg mb-4 ${colors.foreground}`}>
							Add new lead
						</h2>
						<input
							type="text"
							name="name"
							placeholder="Name"
							value={newLead.name}
							onChange={handleInputChange}
							className={`border ${colors.border} ${
								colors.input
							} rounded px-2 py-1 mb-2 w-full outline-none ${
								colors.background
							} ${colors.foreground} placeholder:${
								colors.mutedForeground
							} ${getFocusRingClass(colorScheme)}`}
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={newLead.email}
							onChange={handleInputChange}
							className={`border ${colors.border} ${
								colors.input
							} rounded px-2 py-1 mb-2 w-full outline-none ${
								colors.background
							} ${colors.foreground} placeholder:${
								colors.mutedForeground
							} ${getFocusRingClass(colorScheme)}`}
						/>
						<input
							type="text"
							name="image"
							placeholder="Image URL"
							value={newLead.image}
							onChange={handleInputChange}
							className={`border ${colors.border} ${
								colors.input
							} rounded px-2 py-1 mb-4 w-full outline-none ${
								colors.background
							} ${colors.foreground} placeholder:${
								colors.mutedForeground
							} ${getFocusRingClass(colorScheme)}`}
						/>
						<div className="flex justify-start">
							<button
								onClick={handleSubmit}
								className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded px-2 py-1 mr-2 text-sm transition-colors`}
							>
								Submit
							</button>
							<button
								onClick={handleModalClose}
								className={`${colors.secondary} ${colors.hoverSecondary} ${colors.secondaryForeground} rounded px-2 py-1 text-sm transition-colors`}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Leads;
