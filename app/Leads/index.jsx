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
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import colors from "tailwindcss/colors";

const Leads = () => {
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
		<div className="p-6 overflow-y-scroll max-h-screen hidescrollbar">
			<div className="flex justify-between items-center flex-wrap my-4">
				<p className="">Recent Leads</p>
				<div className="flex md:justify-end justify-start items-center gap-2 flex-wrap">
					<div className="flex gap-2 items-center border rounded px-2 py-1 ">
						<Search size={18} color={colors.zinc[500]} />
						<input
							type="text"
							placeholder="Search Leads..."
							className="outline-none"
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
						className="bg-zinc-800 hover:bg-zinc-900 rounded text-white text-xs px-4 py-2 transition-all duration-100 ease-in hover:px-6"
					>
						Add Lead
					</button>
					<button
						onClick={handleExportCSV}
						className="border-zinc-900 border hover:text-white hover:bg-zinc-900 rounded text-zinc-800 px-4 py-2 transition-all duration-100 ease-in hover:px-6 text-xs"
					>
						Export CSV
					</button>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border">
					<thead className="hover:bg-zinc-50">
						<tr>
							<th className="py-2 px-4 border-b text-left">
								<input type="checkbox" />
							</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("name")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">User Info</span>
									{sortConfig?.direction === "ascending" ? (
										<ChevronUp size={16} color={colors.zinc[500]} />
									) : (
										<ChevronDown size={16} color={colors.zinc[500]} />
									)}
								</div>
							</th>
							<th className="py-2 px-4 border-b text-left cursor-pointer">
								<div className="flex justify-between items-center">
									<span className="ml-2">Email</span>
								</div>
							</th>
							<th className="py-2 px-4 border-b text-left cursor-pointer">
								<div className="flex justify-between items-center">
									<span className="ml-2">Contacted at</span>
								</div>
							</th>
							<th className="py-2 px-4 border-b text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{sortedLeads.map((lead) => (
							<tr key={lead.id} className="hover:bg-zinc-50">
								<td className="py-2 px-4">
									<input type="checkbox" className="mr-2" />
								</td>
								<td className="py-2 px-4 flex items-center gap-2">
									<img
										src={lead.image}
										alt={lead.name}
										className="w-10 h-10 rounded-full mr-2"
									/>
									<span>{lead.name}</span>
								</td>
								<td className="py-2 px-4">{lead.email}</td>
								<td className="py-2 px-4">{lead.lastContacted}</td>
								<td className="py-1 px-4 flex items-center gap-2">
									<Phone size={16} color={colors.zinc[700]} />
									<MessageCircle size={16} color={colors.zinc[700]} />
									<Eye size={16} color={colors.zinc[700]} />
									<Pen size={16} color={colors.zinc[700]} />
									<Trash
										size={16}
										color={colors.zinc[700]}
										onClick={() => handleRemoveLead(lead.id)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-end my-4">
				<ChevronLeft
					size={18}
					color={colors.zinc[500]}
					className="cursor-pointer"
					onClick={() => {}}
				/>
				{Array.from({ length: 5 }, (_, index) => (
					<button
						key={index}
						className={`mx-1 px-3 py-1 rounded hover:bg-zinc-50 ${
							index === 0 ? "bg-zinc-100 text-zinc-800" : "text-zinc-700"
						}`}
						onClick={() => {}}
					>
						{index + 1}
					</button>
				))}
				<ChevronRight
					size={18}
					color={colors.zinc[500]}
					className="cursor-pointer"
					onClick={() => {}}
				/>
			</div>
			<p className="my-4">Leads</p>
			<div className="flex md:flex-row flex-col gap-2 md:w-full">
				{pipelines.map((pipeline) => (
					<div
						key={pipeline.id}
						className="py-4 md:w-3/4 w-full bg-white shadow-lg rounded-lg p-4 border hover:px-5 transition-all duration-100 ease-in"
						onDragOver={(e) => e.preventDefault()}
						onDrop={(e) => handleDrop(e, pipeline.id)}
					>
						<p className="font-semibold text-lg text-zinc-800">
							{pipeline.name}
						</p>
						{pipeline.leads.map((lead) => (
							<div
								key={lead.id}
								draggable
								onDragStart={(e) => handleDragStart(e, lead)}
								onDragEnd={handleDragEnd}
								className="border rounded-lg p-3 my-2 bg-zinc-50 bg-opacity-50 transition-all duration-200 ease-in-out hover:shadow-xl hover:bg-zinc-50"
							>
								<img
									src={lead.image}
									alt={lead.name}
									className="w-12 h-12 rounded-full mr-4 border-2 border-zinc-200"
								/>
								<div className="flex-1">
									<div className="font-medium text-zinc-900">{lead.name}</div>
									<div className="text-sm text-zinc-600">{lead.email}</div>
									<div className="text-xs text-zinc-500">
										Company: {lead.company}
									</div>
								</div>
								<div className="text-sm flex items-center gap-2 my-2">
									<Mail size={18} color={colors.zinc[400]} />
									<MessageCircle size={18} color={colors.zinc[400]} />
									<Phone size={18} color={colors.zinc[400]} />
								</div>
							</div>
						))}
					</div>
				))}
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg">
						<h2 className="text-lg mb-4">Add new lead</h2>
						<input
							type="text"
							name="name"
							placeholder="Name"
							value={newLead.name}
							onChange={handleInputChange}
							className="border rounded px-2 py-1 mb-2 w-full"
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={newLead.email}
							onChange={handleInputChange}
							className="border rounded px-2 py-1 mb-2 w-full"
						/>
						<input
							type="text"
							name="image"
							placeholder="Image URL"
							value={newLead.image}
							onChange={handleInputChange}
							className="border rounded px-2 py-1 mb-4 w-full"
						/>
						<div className="flex justify-start">
							<button
								onClick={handleSubmit}
								className="bg-zinc-800 text-white rounded px-2 py-1 mr-2 text-sm"
							>
								Submit
							</button>
							<button
								onClick={handleModalClose}
								className="bg-zinc-100 rounded px-2 py-1 text-sm"
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
