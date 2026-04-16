import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
	Search,
	Handshake,
	ChevronUp,
	ChevronDown,
	LayoutGrid,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const STAGE_META = {
	prospect: {
		label: "Prospect",
		className:
			"bg-sky-500/12 text-sky-800 dark:text-sky-200 border-sky-500/20",
	},
	qualified: {
		label: "Qualified",
		className:
			"bg-blue-500/12 text-blue-800 dark:text-blue-200 border-blue-500/20",
	},
	proposal: {
		label: "Proposal",
		className:
			"bg-amber-500/12 text-amber-900 dark:text-amber-100 border-amber-500/20",
	},
	won: {
		label: "Won",
		className:
			"bg-emerald-500/12 text-emerald-900 dark:text-emerald-100 border-emerald-500/20",
	},
	lost: {
		label: "Lost",
		className:
			"bg-rose-500/12 text-rose-900 dark:text-rose-100 border-rose-500/20",
	},
};

/** Aligned with pipeline Kanban; table adds close date & full rep name. */
const DEALS = [
	{
		id: "d1",
		name: "Northwind expansion",
		company: "Northwind Ltd",
		value: 42000,
		stage: "qualified",
		closeDate: "Apr 28, 2026",
		rep: "Alex Chen",
	},
	{
		id: "d2",
		name: "API enterprise tier",
		company: "Cloud Corp",
		value: 89000,
		stage: "prospect",
		closeDate: "May 15, 2026",
		rep: "Sam Rivera",
	},
	{
		id: "d3",
		name: "Retail rollout",
		company: "ShopCo",
		value: 120000,
		stage: "qualified",
		closeDate: "Jun 1, 2026",
		rep: "Jordan Lee",
	},
	{
		id: "d4",
		name: "Manufacturing pilot",
		company: "Fabrikam",
		value: 54000,
		stage: "prospect",
		closeDate: "Jul 10, 2026",
		rep: "Mia Patel",
	},
	{
		id: "d5",
		name: "FinTech integration",
		company: "Stripe-ish",
		value: 210000,
		stage: "proposal",
		closeDate: "May 30, 2026",
		rep: "Alex Chen",
	},
	{
		id: "d6",
		name: "Healthcare RFP",
		company: "Medline",
		value: 175000,
		stage: "proposal",
		closeDate: "Jun 20, 2026",
		rep: "Sam Rivera",
	},
	{
		id: "d7",
		name: "Logistics Q4",
		company: "FastShip",
		value: 67000,
		stage: "won",
		closeDate: "Apr 9, 2026",
		rep: "Jordan Lee",
	},
	{
		id: "d8",
		name: "Startup pilot",
		company: "TinyApps",
		value: 8000,
		stage: "lost",
		closeDate: "Apr 8, 2026",
		rep: "Mia Patel",
	},
	{
		id: "d9",
		name: "Enterprise FY26",
		company: "Cloud Corp",
		value: 48000,
		stage: "qualified",
		closeDate: "Jun 30, 2026",
		rep: "Alex Chen",
	},
	{
		id: "d10",
		name: "Agency retainer Q3",
		company: "Agency Co.",
		value: 18000,
		stage: "prospect",
		closeDate: "Aug 1, 2026",
		rep: "Alex Chen",
	},
];

const Deals = () => {
	const { colorScheme, colors, scheme } = useTheme();
	const [search, setSearch] = useState("");
	const [sortKey, setSortKey] = useState("closeDate");
	const [sortDir, setSortDir] = useState("ascending");

	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		let rows = DEALS.filter(
			(d) =>
				!q ||
				d.name.toLowerCase().includes(q) ||
				d.company.toLowerCase().includes(q) ||
				d.rep.toLowerCase().includes(q) ||
				STAGE_META[d.stage]?.label.toLowerCase().includes(q)
		);
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
	}, [search, sortKey, sortDir]);

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

	return (
		<div
			className={`p-6 ${colors.primaryBackground} transition-colors min-h-screen`}
		>
			<div
					className={`flex flex-col lg:flex-row items-start lg:items-center justify-between p-2 gap-4`}
				>
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
						className={`flex flex-wrap items-center gap-3 w-full lg:w-auto`}
					>
						<div
							className={`relative flex gap-2 items-center border ${colors.border} rounded-xl px-3 py-2 ${colors.card} flex-1 min-w-[200px]`}
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
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
				{filtered.length === 0 && (
					<p className={`px-6 py-12 text-center text-sm ${colors.mutedForeground}`}>
						No deals match your search.
					</p>
				)}
			</div>
		</div>
	);
};

export default Deals;
