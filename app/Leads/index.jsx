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
	GripVertical,
	Paperclip,
	Plus,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";
import { ExportDropdown } from "../../lib/ui/dropdown";

function initialsFromName(name) {
	const p = String(name ?? "").trim().split(/\s+/);
	if (p.length >= 2) return (p[0][0] + p[1][0]).toUpperCase();
	return String(name ?? "??").slice(0, 2).toUpperCase();
}

/** Company label for Kanban — table rows may omit `company` after sync / drag. */
function leadDisplayCompany(lead) {
	const c = lead?.company;
	if (c != null && String(c).trim() !== "") return String(c).trim();
	const email = lead?.email;
	if (email && String(email).includes("@")) {
		const domain = String(email).split("@")[1];
		if (domain) {
			const part = domain.split(".")[0];
			return part ? part.charAt(0).toUpperCase() + part.slice(1) : "Account";
		}
	}
	const first = lead?.name?.trim()?.split(/\s+/)[0];
	return first || "Account";
}

/** Deterministic mock metrics from lead id + column — data shape unchanged */
function leadKanbanMeta(lead, pipelineId) {
	const n = parseInt(String(lead.id).replace(/\D/g, ""), 10) || 0;
	const isDone = pipelineId === "rejected";
	const progress = isDone ? 100 : Math.min(95, 22 + (n % 58));
	const priority =
		n % 3 === 0 ? "high" : n % 3 === 1 ? "medium" : "low";
	const attachments = 1 + (n % 5);
	const comments = 1 + (n % 12);
	return { progress, priority, attachments, comments };
}

const PRIORITY_CLASS = {
	high: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800/50 dark:bg-rose-950/40 dark:text-rose-200",
	medium:
		"border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800/50 dark:bg-amber-950/40 dark:text-amber-200",
	low: "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300",
};

const AVATAR_STACK = [
	"bg-violet-500 text-white",
	"bg-amber-400 text-amber-950",
	"bg-sky-400 text-sky-950",
];

function RingProgress({ percent, complete }) {
	const r = 16;
	const c = 2 * Math.PI * r;
	const offset = c - (Math.min(100, percent) / 100) * c;
	const stroke = complete ? "#22c55e" : "#f59e0b";
	return (
		<div className="flex items-center gap-2 shrink-0">
			<svg width="40" height="40" className="shrink-0 -rotate-90">
				<circle
					cx="20"
					cy="20"
					r={r}
					fill="none"
					className="stroke-zinc-200 dark:stroke-zinc-700"
					strokeWidth="3"
				/>
				<circle
					cx="20"
					cy="20"
					r={r}
					fill="none"
					stroke={stroke}
					strokeWidth="3"
					strokeLinecap="round"
					strokeDasharray={c}
					strokeDashoffset={offset}
					className="transition-all duration-300"
				/>
			</svg>
			<span
				className={`text-xs font-semibold tabular-nums ${
					complete ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400"
				}`}
			>
				{Math.round(percent)}%
			</span>
		</div>
	);
}

const Leads = () => {
	// Theme hook
	const { colorScheme, colors, scheme } = useTheme();

	const initialPipelines = [
		{
			id: "new",
			name: "Backlog",
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
			name: "In Progress",
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
			name: "Done",
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
	const [dragOverColumn, setDragOverColumn] = useState(null);
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
		const domain =
			newLead.email?.includes("@") &&
			newLead.email.split("@")[1]?.split(".")[0];
		const leadToAdd = {
			id: (Math.random() * 1000).toString(),
			name: newLead.name,
			email: newLead.email,
			image: newLead.image,
			company: domain
				? domain.charAt(0).toUpperCase() + domain.slice(1)
				: "",
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
		event.dataTransfer.effectAllowed = "move";
		const el = event.currentTarget;
		if (el instanceof HTMLElement) el.style.opacity = "0.55";
	};

	const handleDragEnd = (event) => {
		const el = event.currentTarget;
		if (el instanceof HTMLElement) el.style.opacity = "1";
		setDragOverColumn(null);
	};

	const handleColumnDragOver = (event, pipelineId) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = "move";
		setDragOverColumn(pipelineId);
	};

	const handleDrop = (event, pipelineId) => {
		event.preventDefault();
		setDragOverColumn(null);
		const leadId = event.dataTransfer.getData("text/plain");
		let leadToMove = null;
		for (const p of pipelines) {
			const found = p.leads.find((l) => l.id === leadId);
			if (found) {
				leadToMove = found;
				break;
			}
		}
		if (!leadToMove) {
			leadToMove = allLeads.find((lead) => lead.id === leadId);
		}
		if (!leadToMove) return;

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
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar transition-all duration-100 ease-in`}
		>
			{/* Table Header */}
			<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between p-2 gap-4`}
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
								name="search-leads"
								className={`outline-none flex-1 placeholder:${colors.mutedForeground} ${getFocusRingClass(colorScheme)}`}
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
						<ExportDropdown
							onExportCsv={handleExportCSV}
							onExportPdf={handleExportCSV}
							onExportJson={handleExportCSV}
						/>
					</div>
				</div>
			{/* Leads Table - Improved */}
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
												<Link href={`/leads/${lead.id}`} passHref>
													<a
														className={`text-sm font-medium ${colors.foreground} hover:underline`}
													>
														{lead.name}
													</a>
												</Link>
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
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
													title="Call"
												>
													<Phone size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
													title="Message"
												>
													<MessageCircle
														size={16}
														className={colors.textSecondary}
													/>
												</button>
												<Link href={`/leads/${lead.id}`} passHref>
													<a
														className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors inline-flex`}
														title="View profile"
													>
														<Eye size={16} className={colors.textSecondary} />
													</a>
												</Link>
												<button
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
													title="Edit"
												>
													<Pen size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
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
			<div className="mt-10 mb-3">
				<h2 className={`text-lg font-semibold ${colors.foreground}`}>Lead board</h2>
				<p className={`text-sm ${colors.mutedForeground} mt-1`}>
					Drag cards between Backlog, In Progress, and Done
				</p>
			</div>
			<div className="flex flex-col lg:flex-row gap-4 lg:items-start overflow-x-auto pb-2">
				{pipelines.map((pipeline) => {
					const isOver = dragOverColumn === pipeline.id;
					return (
						<div
							key={pipeline.id}
							className="w-full lg:w-[min(100%,320px)] shrink-0 rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 p-3 shadow-sm"
						>
							<div className="flex items-center justify-between gap-2 mb-3 px-0.5">
								<div className="flex items-center gap-2 min-w-0">
									<h3 className={`font-bold text-[15px] ${colors.foreground} truncate`}>
										{pipeline.name}
									</h3>
									<span
										className={`flex h-7 min-w-[1.75rem] px-1.5 items-center justify-center rounded-full text-xs font-semibold bg-zinc-200/90 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200`}
									>
										{pipeline.leads.length}
									</span>
								</div>
								<div className="flex items-center gap-1 shrink-0">
									<span
										className={`p-1.5 rounded-xl text-zinc-400 ${colors.hoverSecondary}`}
										aria-hidden
									>
										<GripVertical className="w-4 h-4" />
									</span>
									<button
										type="button"
										className={`p-1.5 rounded-full border ${colors.border} ${colors.card} ${colors.hoverSecondary} ${colors.foreground}`}
										title="Add card"
									>
										<Plus className="w-4 h-4" />
									</button>
								</div>
							</div>
							<div
								onDragOver={(e) => handleColumnDragOver(e, pipeline.id)}
								onDrop={(e) => handleDrop(e, pipeline.id)}
								className={`min-h-[200px] space-y-3 rounded-xl p-1 transition-colors ${
									isOver
										? "bg-zinc-200/50 dark:bg-zinc-800/80 ring-2 ring-zinc-300 dark:ring-zinc-600"
										: ""
								}`}
							>
								{pipeline.leads.length === 0 && (
									<p className={`text-center text-xs py-8 ${colors.textMuted}`}>
										Drop leads here
									</p>
								)}
								{pipeline.leads.map((lead) => {
									const meta = leadKanbanMeta(lead, pipeline.id);
									const companyLabel = leadDisplayCompany(lead);
									const desc = `Follow up with ${companyLabel} — ${lead.email}`;
									const shortDesc =
										desc.length > 52 ? `${desc.slice(0, 50)}…` : desc;
									const i1 = initialsFromName(lead.name);
									const i2 = initialsFromName(
										companyLabel.split(/\s+/)[0] || "TM"
									);
									const i3 = "M";
									return (
										<div
											key={lead.id}
											draggable
											onDragStart={(e) => handleDragStart(e, lead)}
											onDragEnd={handleDragEnd}
											className="rounded-2xl border border-zinc-200/90 dark:border-zinc-700 bg-white dark:bg-zinc-950 p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
										>
											<Link href={`/leads/${lead.id}`} passHref>
												<a
													className={`block font-semibold text-[15px] leading-snug ${colors.foreground} hover:underline`}
													onClick={(e) => e.stopPropagation()}
													onMouseDown={(e) => e.stopPropagation()}
												>
													{lead.name}
												</a>
											</Link>
											<p className={`text-xs mt-1.5 leading-relaxed ${colors.textSecondary} line-clamp-2`}>
												{shortDesc}
											</p>
											<div className="flex items-center justify-between gap-3 mt-4">
												<div className="flex -space-x-2">
													{[i1, i2, i3].map((ini, idx) => (
														<span
															key={`${lead.id}-av-${idx}`}
															className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold border-2 border-white dark:border-zinc-950 ${AVATAR_STACK[idx % AVATAR_STACK.length]}`}
														>
															{ini}
														</span>
													))}
												</div>
												<RingProgress
													percent={meta.progress}
													complete={pipeline.id === "rejected"}
												/>
											</div>
											<div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
												<span
													className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${PRIORITY_CLASS[meta.priority]}`}
												>
													{meta.priority === "high"
														? "High"
														: meta.priority === "medium"
														? "Medium"
														: "Low"}
												</span>
												<div className={`flex items-center gap-3 text-xs ${colors.textMuted}`}>
													<span className="inline-flex items-center gap-1">
														<Paperclip className="w-3.5 h-3.5" />
														{meta.attachments}
													</span>
													<span className="inline-flex items-center gap-1">
														<MessageCircle className="w-3.5 h-3.5" />
														{meta.comments}
													</span>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
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
