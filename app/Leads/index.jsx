import {
	Eye,
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
	Users,
	Layers,
	Kanban,
	CheckCircle2,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useTheme } from "../../utils/useTheme";
import { useChartTooltipProps } from "../../utils/chartTooltip";
import { getFocusRingClass } from "../../utils/theme";
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
import { ExportDropdown } from "../../lib/ui/dropdown";
import { INITIAL_LEADS, INITIAL_PIPELINES } from "../CRM/leadsSeedData";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
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
import { Checkbox } from "@/components/ui/checkbox";

const LEAD_AVATARS = [
	"./people/person-1.png",
	"./people/person-2.png",
	"./people/person-3.png",
	"./people/person-4.png",
];

const EMPTY_LEAD_FORM = {
	name: "",
	email: "",
	company: "",
	phone: "",
	source: "Website",
	status: "New",
	notes: "",
	image: LEAD_AVATARS[0],
	files: [],
};

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

const LeadsShadcn = () => {
	// Theme hook
	const router = useRouter();
	const { theme, colorScheme, colors } = useTheme();
	const chartTooltipProps = useChartTooltipProps();

	const [pipelines, setPipelines] = useState(INITIAL_PIPELINES);
	const [allLeads, setAllLeads] = useState(INITIAL_LEADS);
	const [sortConfig, setSortConfig] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newLead, setNewLead] = useState(EMPTY_LEAD_FORM);
	const [selectedLeadIds, setSelectedLeadIds] = useState([]);
	const [dragOverColumn, setDragOverColumn] = useState(null);
	const handleAddLead = () => setIsModalOpen(true);

	const handleModalClose = () => {
		setIsModalOpen(false);
		setNewLead(EMPTY_LEAD_FORM);
	};

	const toggleLeadSelection = (leadId) => {
		setSelectedLeadIds((prev) =>
			prev.includes(leadId)
				? prev.filter((id) => id !== leadId)
				: [...prev, leadId]
		);
	};

	const handleLeadFileChange = (e) => {
		const names = Array.from(e.target.files || []).map((f) => f.name);
		if (names.length) {
			setNewLead((prev) => ({
				...prev,
				files: [...prev.files, ...names],
			}));
		}
	};

	const handleSubmit = () => {
		if (!newLead.name?.trim() || !newLead.email?.trim()) return;
		const leadToAdd = {
			id: String(Date.now()),
			name: newLead.name.trim(),
			email: newLead.email.trim(),
			image: newLead.image || LEAD_AVATARS[0],
			company: newLead.company?.trim() || leadDisplayCompany({ email: newLead.email }),
			phone: newLead.phone,
			source: newLead.source,
			status: newLead.status,
			notes: newLead.notes,
			files: newLead.files,
			lastContacted: new Date().toLocaleDateString("en-US"),
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

	const allVisibleSelected =
		sortedLeads.length > 0 &&
		sortedLeads.every((l) => selectedLeadIds.includes(l.id));

	const toggleSelectAllLeads = () => {
		if (allVisibleSelected) {
			const visible = new Set(sortedLeads.map((l) => l.id));
			setSelectedLeadIds((prev) => prev.filter((id) => !visible.has(id)));
		} else {
			const ids = sortedLeads.map((l) => l.id);
			setSelectedLeadIds((prev) => [...new Set([...prev, ...ids])]);
		}
	};

	const leadStats = useMemo(() => {
		const total = allLeads.length;
		const uniqueAccounts = new Set(
			allLeads.map((l) => leadDisplayCompany(l))
		).size;
		const backlog = pipelines.find((p) => p.id === "new")?.leads.length ?? 0;
		const inProgress =
			pipelines.find((p) => p.id === "contacted")?.leads.length ?? 0;
		const done = pipelines.find((p) => p.id === "rejected")?.leads.length ?? 0;
		const activeInPipeline = backlog + inProgress;
		return { total, uniqueAccounts, activeInPipeline, done };
	}, [allLeads, pipelines]);

	const pipelineStageData = useMemo(
		() =>
			pipelines.map((p) => ({
				name: p.name,
				count: p.leads.length,
			})),
		[pipelines]
	);

	const companyLeadCounts = useMemo(() => {
		const m = {};
		allLeads.forEach((lead) => {
			const label = leadDisplayCompany(lead);
			m[label] = (m[label] || 0) + 1;
		});
		return Object.entries(m)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 10);
	}, [allLeads]);

	const gridStroke = theme === "dark" ? "#3f3f46" : "#e4e4e7";
	const axisStroke = theme === "dark" ? "#71717a" : "#71717a";

	return (
		<div
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar transition-all duration-100 ease-in`}
		>
			{/* Stats + charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
								<Users className="text-blue-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{leadStats.total}</p>
						<p className="text-sm text-muted-foreground mt-1">Total leads</p>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
								<Layers className="text-purple-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{leadStats.uniqueAccounts}</p>
						<p className="text-sm text-muted-foreground mt-1">Unique accounts</p>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-sm border border-amber-500/20">
								<Kanban className="text-amber-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{leadStats.activeInPipeline}</p>
						<p className="text-sm text-muted-foreground mt-1">Active in pipeline</p>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-green-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20">
								<CheckCircle2 className="text-green-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{leadStats.done}</p>
						<p className="text-sm text-muted-foreground mt-1">Closed (Done)</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Leads by pipeline stage</CardTitle>
						<CardDescription>Kanban columns (Backlog, In Progress, Done)</CardDescription>
					</CardHeader>
					<CardContent>
					<ResponsiveContainer width="100%" height={220}>
						<BarChart
							data={pipelineStageData}
							margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
						>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke={gridStroke}
								vertical={false}
							/>
							<XAxis
								dataKey="name"
								stroke={axisStroke}
								fontSize={11}
								tickLine={false}
								axisLine={false}
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
								formatter={(value) => [value, "Leads"]}
							/>
							<Bar
								dataKey="count"
								fill={theme === "dark" ? "#3b82f6" : "#2563eb"}
								radius={[8, 8, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle>Leads by account</CardTitle>
						<CardDescription>Top companies (from company or email domain)</CardDescription>
					</CardHeader>
					<CardContent>
					<ResponsiveContainer width="100%" height={240}>
						<BarChart
							data={companyLeadCounts}
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
								formatter={(value) => [value, "Leads"]}
							/>
							<Bar
								dataKey="count"
								fill={theme === "dark" ? "#a855f7" : "#9333ea"}
								radius={[8, 8, 0, 0]}
							/>
						</BarChart>
					</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

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
						<div className="relative flex gap-2 items-center w-full md:w-auto">
							<Search size={18} className="absolute left-3 text-muted-foreground pointer-events-none" />
							<Input
								type="text"
								placeholder="Search Leads..."
								name="search-leads"
								className="pl-9"
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
						<Button onClick={handleAddLead}>
							<UserPlus size={16} />
							Add Lead
						</Button>
						<ExportDropdown
							onExportCsv={handleExportCSV}
							onExportPdf={handleExportCSV}
							onExportJson={handleExportCSV}
						/>
					</div>
				</div>
			{/* Leads Table - Improved */}
			<Card className="overflow-hidden my-4">
				

				{/* Table */}
				<Table className="w-full">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									<Checkbox
										checked={allVisibleSelected}
										onCheckedChange={toggleSelectAllLeads}
										aria-label="Select all leads"
									/>
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Email
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Contacted At
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.card} divide-y ${colors.border}`}>
							{sortedLeads.length === 0 ? (
								<TableRow>
									<TableCell colSpan="5" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No leads found</p>
									</TableCell>
								</TableRow>
							) : (
								sortedLeads.map((lead) => (
									<TableRow
										key={lead.id}
										className={`${colors.hover} transition-colors cursor-pointer`}
										onClick={() => router.push(`/leads/${lead.id}`)}
									>
										<TableCell
											className="px-6 py-4 whitespace-nowrap"
											onClick={(e) => e.stopPropagation()}
										>
											<Checkbox
												checked={selectedLeadIds.includes(lead.id)}
												onCheckedChange={() => toggleLeadSelection(lead.id)}
												aria-label={`Select ${lead.name}`}
											/>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
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
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{lead.email}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{lead.lastContacted}
											</div>
										</TableCell>
										<TableCell
											className="px-6 py-4 whitespace-nowrap"
											onClick={(e) => e.stopPropagation()}
										>
											<div className="flex items-center gap-1">
												<Button variant="ghost" size="icon" title="Call">
													<Phone size={16} />
												</Button>
												<Button variant="ghost" size="icon" title="Message">
													<MessageCircle size={16} />
												</Button>
												<Button variant="ghost" size="icon" asChild title="View profile">
													<Link href={`/leads/${lead.id}`}>
														<a>
															<Eye size={16} />
														</a>
													</Link>
												</Button>
												<Button variant="ghost" size="icon" title="Edit">
													<Pen size={16} />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													title="Delete"
													onClick={() => handleRemoveLead(lead.id)}
												>
													<Trash size={16} />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
			</Card>
			<div className="flex items-center justify-end my-4 gap-1">
				<Button variant="ghost" size="icon" onClick={() => {}} aria-label="Previous page">
					<ChevronLeft size={18} />
				</Button>
				{Array.from({ length: 5 }, (_, index) => (
					<Button
						key={index}
						variant={index === 0 ? "secondary" : "ghost"}
						size="sm"
						className="min-w-9"
						onClick={() => {}}
					>
						{index + 1}
					</Button>
				))}
				<Button variant="ghost" size="icon" onClick={() => {}} aria-label="Next page">
					<ChevronRight size={18} />
				</Button>
			</div>
			<div className="mt-10 mb-3">
				<h2 className={`text-lg font-semibold ${colors.foreground}`}>Lead board</h2>
				<p className={`text-sm ${colors.mutedForeground} mt-1`}>
					Drag cards between Backlog, In Progress, and Done
				</p>
			</div>
			<div className="flex flex-col lg:flex-row gap-4 lg:items-start pb-2">
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
									<Badge variant="secondary" className="h-7 min-w-[1.75rem] px-1.5 justify-center font-semibold">
										{pipeline.leads.length}
									</Badge>
								</div>
								<div className="flex items-center gap-1 shrink-0">
									<span
										className={`p-1.5 rounded-xl text-zinc-400 ${colors.hoverSecondary}`}
										aria-hidden
									>
										<GripVertical className="w-4 h-4" />
									</span>
									<Button
										type="button"
										variant="outline"
										size="icon"
										className="rounded-full"
										title="Add card"
									>
										<Plus className="w-4 h-4" />
									</Button>
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
												<Badge variant={meta.priority} className="text-[11px] font-medium">
													{meta.priority === "high"
														? "High"
														: meta.priority === "medium"
														? "Medium"
														: "Low"}
												</Badge>
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

			<FormModal
				open={isModalOpen}
				onClose={handleModalClose}
				title="Add new lead"
				subtitle="Capture contact details, source, and attachments"
				onSubmit={handleSubmit}
				saveLabel="Add lead"
				maxWidth="max-w-lg"
			>
				<FormField label="Avatar" hint="Pick a profile image">
					<div className="flex flex-wrap gap-2">
						{LEAD_AVATARS.map((src) => (
							<Button
								key={src}
								type="button"
								variant="ghost"
								size="icon"
								onClick={() => setNewLead((p) => ({ ...p, image: src }))}
								className={cn(
									"rounded-full h-auto w-auto p-0.5 border-2",
									newLead.image === src
										? "border-primary ring-2 ring-primary/30"
										: "border-border hover:bg-accent"
								)}
							>
								<img
									src={src}
									alt=""
									className="w-10 h-10 rounded-full object-cover"
								/>
							</Button>
						))}
					</div>
				</FormField>
				<FormField label="Name" htmlFor="lead-name" required>
					<Input
						id="lead-name"
						type="text"
						value={newLead.name}
						onChange={(e) =>
							setNewLead((p) => ({ ...p, name: e.target.value }))
						}
						required
						placeholder="Full name"
					/>
				</FormField>
				<FormField label="Email" htmlFor="lead-email" required>
					<Input
						id="lead-email"
						type="email"
						value={newLead.email}
						onChange={(e) =>
							setNewLead((p) => ({ ...p, email: e.target.value }))
						}
						required
						placeholder="email@company.com"
					/>
				</FormField>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<FormField label="Company" htmlFor="lead-company">
						<Input
							id="lead-company"
							type="text"
							value={newLead.company}
							onChange={(e) =>
								setNewLead((p) => ({ ...p, company: e.target.value }))
							}
							placeholder="Company name"
						/>
					</FormField>
					<FormField label="Phone" htmlFor="lead-phone">
						<Input
							id="lead-phone"
							type="tel"
							value={newLead.phone}
							onChange={(e) =>
								setNewLead((p) => ({ ...p, phone: e.target.value }))
							}
							placeholder="+1 (555) 000-0000"
						/>
					</FormField>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<FormField label="Source" htmlFor="lead-source">
						<FormSelect
							id="lead-source"
							value={newLead.source}
							onChange={(e) =>
								setNewLead((p) => ({ ...p, source: e.target.value }))
							}
							options={["Website", "Referral", "Outbound", "Event"]}
						/>
					</FormField>
					<FormField label="Status" htmlFor="lead-status">
						<FormSelect
							id="lead-status"
							value={newLead.status}
							onChange={(e) =>
								setNewLead((p) => ({ ...p, status: e.target.value }))
							}
							options={["New", "Qualified", "Contacted", "Nurture"]}
						/>
					</FormField>
				</div>
				<FormField label="Notes" htmlFor="lead-notes">
					<textarea
						id="lead-notes"
						rows={3}
						value={newLead.notes}
						onChange={(e) =>
							setNewLead((p) => ({ ...p, notes: e.target.value }))
						}
						className={cn(
							"flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						)}
						placeholder="Context, next steps, competitor info…"
					/>
				</FormField>
				<FormField label="Attachments" htmlFor="lead-files">
					<Input
						id="lead-files"
						type="file"
						multiple
						onChange={handleLeadFileChange}
						className="text-sm file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground"
					/>
					{newLead.files.length > 0 && (
						<ul className={`mt-2 text-xs ${colors.textSecondary} space-y-1`}>
							{newLead.files.map((f) => (
								<li key={f}>📎 {f}</li>
							))}
						</ul>
					)}
				</FormField>
			</FormModal>
		</div>
	);
};

export default LeadsShadcn;
