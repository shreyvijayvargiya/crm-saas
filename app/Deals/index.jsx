import React, { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
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
import { getFocusRingClass } from "../../utils/theme";
import { INITIAL_DEALS, STAGE_META } from "../CRM/dealsSeedData";
import { FormModal, FormField, formInputClass } from "../../lib/ui/modal";

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
	const { colorScheme, colors, scheme } = useTheme();
	const [deals, setDeals] = useState(INITIAL_DEALS);
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
				<div
					className={`relative flex gap-2 items-center border ${colors.border} rounded-xl px-3 py-2 ${colors.card} flex-1 max-w-md`}
				>
					<Search className={colors.textSecondary} size={18} />
					<input
						type="search"
						placeholder="Search deals, company, rep…"
						className={`outline-none flex-1 bg-transparent ${colors.foreground} placeholder:opacity-60 ${getFocusRingClass(colorScheme)}`}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex flex-wrap items-center justify-end gap-1.5">
					{STAGE_FILTERS.map((f) => {
						const on = stageFilter === f.id;
						return (
							<button
								key={f.id}
								type="button"
								onClick={() => setStageFilter(f.id)}
								className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
									on
										? `${scheme.primary} ${scheme.primaryForeground} border-transparent`
										: `${colors.border} ${colors.foreground} ${colors.hoverSecondary}`
								}`}
							>
								{f.label}
							</button>
						);
					})}
				</div>
			</div>

			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
			>
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead className={`${colors.muted} border-b ${colors.border}`}>
							<tr>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => toggleSort("name")}
								>
									<div className="flex items-center gap-2">
										Deal
										<SortIcon column="name" />
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Company
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Status
								</th>
								<th
									className={`px-6 py-3 text-right text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => toggleSort("value")}
								>
									<div className="flex items-center justify-end gap-2">
										Value
										<SortIcon column="value" />
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => toggleSort("closeDate")}
								>
									<div className="flex items-center gap-2">
										Close date
										<SortIcon column="closeDate" />
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => toggleSort("rep")}
								>
									<div className="flex items-center gap-2">
										Assigned rep
										<SortIcon column="rep" />
									</div>
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`divide-y ${colors.border}`}>
							{filtered.map((row) => {
								const sm = STAGE_META[row.stage] || STAGE_META.prospect;
								return (
									<tr
										key={row.id}
										className={`${colors.hover} transition-colors`}
									>
										<td
											className={`px-6 py-4 font-medium ${colors.foreground}`}
										>
											{row.name}
										</td>
										<td className={`px-6 py-4 ${colors.textSecondary}`}>
											{row.company}
										</td>
										<td className="px-6 py-4">
											<span
												className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-md border ${sm.className}`}
											>
												{sm.label}
											</span>
										</td>
										<td
											className={`px-6 py-4 text-right tabular-nums font-medium ${colors.foreground}`}
										>
											${row.value.toLocaleString()}
										</td>
										<td className={`px-6 py-4 ${colors.textSecondary}`}>
											{row.closeDate}
										</td>
										<td className={`px-6 py-4 ${colors.textSecondary}`}>
											{row.rep}
										</td>
										<td className="px-6 py-4">
											<div className="flex items-center gap-1">
												<Link href={`/deals/${row.id}`} passHref>
													<a
														className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors inline-flex`}
														title="View deal"
													>
														<Eye size={16} className={colors.textSecondary} />
													</a>
												</Link>
												<button
													type="button"
													onClick={() => openEdit(row)}
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
													title="Edit deal"
												>
													<Pen size={16} className={colors.textSecondary} />
												</button>
												<button
													type="button"
													onClick={() => handleDelete(row.id)}
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors text-rose-600 dark:text-rose-400`}
													title="Delete deal"
												>
													<Trash2 size={16} />
												</button>
											</div>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{filtered.length === 0 && (
					<p className={`px-6 py-12 text-center text-sm ${colors.mutedForeground}`}>
						No deals match your search or filter.
					</p>
				)}
			</div>

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
					<input
						id="edit-deal-name"
						type="text"
						value={editDeal.name}
						onChange={(e) =>
							setEditDeal((p) => ({ ...p, name: e.target.value }))
						}
						required
						className={formInputClass(colorScheme, colors)}
					/>
				</FormField>
				<FormField label="Company" htmlFor="edit-deal-company">
					<input
						id="edit-deal-company"
						type="text"
						value={editDeal.company}
						onChange={(e) =>
							setEditDeal((p) => ({ ...p, company: e.target.value }))
						}
						className={formInputClass(colorScheme, colors)}
					/>
				</FormField>
				<div className="grid grid-cols-2 gap-4">
					<FormField label="Value ($)" htmlFor="edit-deal-value">
						<input
							id="edit-deal-value"
							type="number"
							min="0"
							value={editDeal.value}
							onChange={(e) =>
								setEditDeal((p) => ({ ...p, value: e.target.value }))
							}
							className={formInputClass(colorScheme, colors)}
						/>
					</FormField>
					<FormField label="Stage" htmlFor="edit-deal-stage">
						<select
							id="edit-deal-stage"
							value={editDeal.stage}
							onChange={(e) =>
								setEditDeal((p) => ({ ...p, stage: e.target.value }))
							}
							className={formInputClass(colorScheme, colors)}
						>
							{STAGE_FILTERS.filter((f) => f.id !== "all").map((f) => (
								<option key={f.id} value={f.id}>
									{f.label}
								</option>
							))}
						</select>
					</FormField>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<FormField label="Close date" htmlFor="edit-deal-close">
						<input
							id="edit-deal-close"
							type="text"
							value={editDeal.closeDate}
							onChange={(e) =>
								setEditDeal((p) => ({ ...p, closeDate: e.target.value }))
							}
							className={formInputClass(colorScheme, colors)}
							placeholder="Apr 28, 2026"
						/>
					</FormField>
					<FormField label="Assigned rep" htmlFor="edit-deal-rep">
						<input
							id="edit-deal-rep"
							type="text"
							value={editDeal.rep}
							onChange={(e) =>
								setEditDeal((p) => ({ ...p, rep: e.target.value }))
							}
							className={formInputClass(colorScheme, colors)}
						/>
					</FormField>
				</div>
			</FormModal>
		</div>
	);
};

export default Deals;
