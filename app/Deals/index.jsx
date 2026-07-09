import React, { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
	Search,
	Handshake,
	ChevronUp,
	ChevronDown,
	LayoutGrid,
	Eye,
	Pen,
	Trash2,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { STAGE_META } from "../CRM/dealsSeedData";
import { useCrmData } from "../../utils/CrmDataContext";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const STAGE_FILTERS = [
	{ id: "all", label: "All" },
	{ id: "prospect", label: "Prospect" },
	{ id: "qualified", label: "Qualified" },
	{ id: "proposal", label: "Proposal" },
	{ id: "won", label: "Won" },
	{ id: "lost", label: "Lost" },
];

const EMPTY_EDIT_DEAL = {
	name: "",
	company: "",
	value: "",
	stage: "prospect",
	closeDate: "",
	rep: "",
};

const Deals = () => {
	const { colors } = useTheme();
	const { deals, setDeals, setPipelineDeals } = useCrmData();
	const [search, setSearch] = useState("");
	const [stageFilter, setStageFilter] = useState("all");
	const [sortKey, setSortKey] = useState("closeDate");
	const [sortDir, setSortDir] = useState("ascending");
	const [isEditOpen, setIsEditOpen] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const [editDeal, setEditDeal] = useState(EMPTY_EDIT_DEAL);

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		let rows = deals.filter((d) => {
			const matchesSearch =
				!q ||
				d.name.toLowerCase().includes(q) ||
				d.company.toLowerCase().includes(q) ||
				d.rep.toLowerCase().includes(q) ||
				STAGE_META[d.stage]?.label.toLowerCase().includes(q);
			const matchesStage =
				stageFilter === "all" || d.stage === stageFilter;
			return matchesSearch && matchesStage;
		});
		const mul = sortDir === "ascending" ? 1 : -1;
		rows = [...rows].sort((a, b) => {
			if (sortKey === "value") return (a.value - b.value) * mul;
			if (sortKey === "name") return a.name.localeCompare(b.name) * mul;
			if (sortKey === "closeDate")
				return String(a.closeDate).localeCompare(String(b.closeDate)) * mul;
			if (sortKey === "rep") return a.rep.localeCompare(b.rep) * mul;
			return 0;
		});
		return rows;
	}, [deals, search, stageFilter, sortKey, sortDir]);

	const toggleSort = (key) => {
		if (sortKey === key) {
			setSortDir((d) => (d === "ascending" ? "descending" : "ascending"));
		} else {
			setSortKey(key);
			setSortDir("ascending");
		}
	};

	const SortIcon = ({ column }) =>
		sortKey === column ? (
			sortDir === "ascending" ? (
				<ChevronUp className="w-4 h-4" />
			) : (
				<ChevronDown className="w-4 h-4" />
			)
		) : null;

	const openEdit = (deal) => {
		setEditingId(deal.id);
		setEditDeal({
			name: deal.name,
			company: deal.company,
			value: String(deal.value),
			stage: deal.stage,
			closeDate: deal.closeDate,
			rep: deal.rep,
		});
		setIsEditOpen(true);
	};

	const closeEdit = () => {
		setIsEditOpen(false);
		setEditingId(null);
		setEditDeal(EMPTY_EDIT_DEAL);
	};

	const handleSaveEdit = () => {
		if (!editingId || !editDeal.name?.trim()) return;
		setDeals((prev) =>
			prev.map((d) =>
				d.id === editingId
					? {
							...d,
							name: editDeal.name.trim(),
							company: editDeal.company.trim(),
							value: Number(editDeal.value) || 0,
							stage: editDeal.stage,
							closeDate: editDeal.closeDate,
							rep: editDeal.rep,
					  }
					: d
			)
		);
		toast.success("Deal updated");
		closeEdit();
	};

	const handleDelete = (dealId) => {
		setDeals((prev) => prev.filter((d) => d.id !== dealId));
		setPipelineDeals((prev) => prev.filter((d) => d.id !== dealId));
		toast.success("Deal removed");
	};

	return (
		<div
			className={`p-6 ${colors.primaryBackground} transition-colors min-h-screen`}
		>
			<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-2 gap-4 mb-4">
				<div>
					<h1 className={`text-lg font-semibold ${colors.foreground}`}>
						Deals
					</h1>
					<p className={`text-sm ${colors.mutedForeground} mt-1 max-w-xl`}>
						All opportunities in one place. Stage matches your pipeline; use the
						board for drag-and-drop.
					</p>
					<p className={`text-xs mt-2 ${colors.mutedForeground}`}>
						<Link href="/pipelines" passHref>
							<a
								className={`font-medium ${colors.foreground} hover:underline inline-flex items-center gap-1`}
							>
								<LayoutGrid className="w-3.5 h-3.5" />
								Open pipeline board
							</a>
						</Link>
					</p>
				</div>
				<div
					className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${colors.border} ${colors.muted}`}
				>
					<Handshake className={`w-4 h-4 ${colors.textMuted}`} />
					<span className={`text-xs ${colors.mutedForeground}`}>Total</span>
					<span className={`text-sm font-semibold ${colors.foreground}`}>
						{filtered.length}
					</span>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4 px-2">
				<div className="relative flex gap-2 items-center flex-1 max-w-md">
					<Search
						size={18}
						className="absolute left-3 text-muted-foreground pointer-events-none"
					/>
					<Input
						type="search"
						placeholder="Search deals, company, rep…"
						className="pl-9"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex flex-wrap items-center justify-end gap-1.5">
					{STAGE_FILTERS.map((f) => {
						const on = stageFilter === f.id;
						return (
							<Button
								key={f.id}
								type="button"
								variant={on ? "default" : "outline"}
								size="sm"
								onClick={() => setStageFilter(f.id)}
							>
								{f.label}
							</Button>
						);
					})}
				</div>
			</div>

			<Card className="overflow-hidden">
				<Table className="w-full text-sm">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => toggleSort("name")}
								>
									<div className="flex items-center gap-2">
										Deal
										<SortIcon column="name" />
									</div>
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Company
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Status
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-right text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => toggleSort("value")}
								>
									<div className="flex items-center justify-end gap-2">
										Value
										<SortIcon column="value" />
									</div>
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => toggleSort("closeDate")}
								>
									<div className="flex items-center gap-2">
										Close date
										<SortIcon column="closeDate" />
									</div>
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => toggleSort("rep")}
								>
									<div className="flex items-center gap-2">
										Assigned rep
										<SortIcon column="rep" />
									</div>
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`divide-y ${colors.border}`}>
							{filtered.map((row) => {
								const sm = STAGE_META[row.stage] || STAGE_META.prospect;
								return (
									<TableRow
										key={row.id}
										className={`${colors.hover} transition-colors`}
									>
										<TableCell
											className={`px-6 py-4 font-medium ${colors.foreground}`}
										>
											{row.name}
										</TableCell>
										<TableCell className={`px-6 py-4 ${colors.textSecondary}`}>
											{row.company}
										</TableCell>
										<TableCell className="px-6 py-4">
											<Badge className={sm.className}>{sm.label}</Badge>
										</TableCell>
										<TableCell
											className={`px-6 py-4 text-right tabular-nums font-medium ${colors.foreground}`}
										>
											${row.value.toLocaleString()}
										</TableCell>
										<TableCell className={`px-6 py-4 ${colors.textSecondary}`}>
											{row.closeDate}
										</TableCell>
										<TableCell className={`px-6 py-4 ${colors.textSecondary}`}>
											{row.rep}
										</TableCell>
										<TableCell className="px-6 py-4">
											<div className="flex items-center gap-1">
												<Button
													variant="ghost"
													size="icon"
													asChild
													title="View deal"
												>
													<Link href={`/deals/${row.id}`}>
														<a>
															<Eye size={16} />
														</a>
													</Link>
												</Button>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													onClick={() => openEdit(row)}
													title="Edit deal"
												>
													<Pen size={16} />
												</Button>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													onClick={() => handleDelete(row.id)}
													className="text-rose-600 dark:text-rose-400"
													title="Delete deal"
												>
													<Trash2 size={16} />
												</Button>
											</div>
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				{filtered.length === 0 && (
					<p className={`px-6 py-12 text-center text-sm ${colors.mutedForeground}`}>
						No deals match your search or filter.
					</p>
				)}
			</Card>

			<FormModal
				open={isEditOpen}
				onClose={closeEdit}
				title="Edit deal"
				subtitle="Update opportunity details"
				onSubmit={handleSaveEdit}
				saveLabel="Save changes"
				maxWidth="max-w-md"
			>
				<FormField label="Deal name" htmlFor="edit-deal-name" required>
					<Input
						id="edit-deal-name"
						type="text"
						value={editDeal.name}
						onChange={(e) =>
							setEditDeal((p) => ({ ...p, name: e.target.value }))
						}
						required
					/>
				</FormField>
				<FormField label="Company" htmlFor="edit-deal-company">
					<Input
						id="edit-deal-company"
						type="text"
						value={editDeal.company}
						onChange={(e) =>
							setEditDeal((p) => ({ ...p, company: e.target.value }))
						}
					/>
				</FormField>
				<div className="grid grid-cols-2 gap-4">
					<FormField label="Value ($)" htmlFor="edit-deal-value">
						<Input
							id="edit-deal-value"
							type="number"
							min="0"
							value={editDeal.value}
							onChange={(e) =>
								setEditDeal((p) => ({ ...p, value: e.target.value }))
							}
						/>
					</FormField>
					<FormField label="Stage" htmlFor="edit-deal-stage">
						<FormSelect
							id="edit-deal-stage"
							value={editDeal.stage}
							onChange={(e) =>
								setEditDeal((p) => ({ ...p, stage: e.target.value }))
							}
							options={STAGE_FILTERS.filter((f) => f.id !== "all").map((f) => ({
								value: f.id,
								label: f.label,
							}))}
						/>
					</FormField>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<FormField label="Close date" htmlFor="edit-deal-close">
						<Input
							id="edit-deal-close"
							type="text"
							value={editDeal.closeDate}
							onChange={(e) =>
								setEditDeal((p) => ({ ...p, closeDate: e.target.value }))
							}
							placeholder="Apr 28, 2026"
						/>
					</FormField>
					<FormField label="Assigned rep" htmlFor="edit-deal-rep">
						<Input
							id="edit-deal-rep"
							type="text"
							value={editDeal.rep}
							onChange={(e) =>
								setEditDeal((p) => ({ ...p, rep: e.target.value }))
							}
						/>
					</FormField>
				</div>
			</FormModal>
		</div>
	);
};

export default Deals;
