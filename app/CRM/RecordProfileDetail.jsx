import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
	ArrowLeft,
	Mail,
	Phone,
	Building2,
	Calendar,
	Paperclip,
	FileText,
	MessageSquare,
	Clock,
	ChevronRight,
	Activity,
	StickyNote,
	Handshake,
	FolderOpen,
	Plus,
	Download,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { getRecordBundle } from "./recordDetailData";

const STAGE_META = {
	prospect: {
		label: "Prospect",
		className:
			"bg-sky-500/12 text-sky-800 dark:text-sky-200 border-sky-500/25",
	},
	qualified: {
		label: "Qualified",
		className:
			"bg-blue-500/12 text-blue-800 dark:text-blue-200 border-blue-500/25",
	},
	proposal: {
		label: "Proposal",
		className:
			"bg-amber-500/12 text-amber-900 dark:text-amber-100 border-amber-500/25",
	},
	won: {
		label: "Won",
		className:
			"bg-emerald-500/12 text-emerald-900 dark:text-emerald-100 border-emerald-500/25",
	},
	lost: {
		label: "Lost",
		className:
			"bg-rose-500/12 text-rose-900 dark:text-rose-100 border-rose-500/25",
	},
};

function TimelineIcon({ type }) {
	if (type === "email")
		return (
			<span className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-sky-500/15 text-sky-600 dark:text-sky-400">
				<Mail className="w-3.5 h-3.5" />
			</span>
		);
	if (type === "deal")
		return (
			<span className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
				<ChevronRight className="w-3.5 h-3.5" />
			</span>
		);
	if (type === "call")
		return (
			<span className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-orange-500/15 text-orange-700 dark:text-orange-300">
				<Phone className="w-3.5 h-3.5" />
			</span>
		);
	return (
		<span className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-violet-500/15 text-violet-600 dark:text-violet-400">
			<MessageSquare className="w-3.5 h-3.5" />
		</span>
	);
}

const TABS = [
	{ id: "activity", label: "Activity", icon: Activity },
	{ id: "notes", label: "Notes", icon: StickyNote },
	{ id: "deals", label: "Deals", icon: Handshake },
	{ id: "files", label: "Files", icon: FolderOpen },
];

/**
 * @param {object} props
 * @param {"lead"|"contact"} props.kind
 * @param {object} props.record — name, email, phone, company, title, location, image, owner, + lead: source, status, value
 * @param {string} props.backHref
 * @param {string} props.backLabel
 */
const RecordProfileDetail = ({ kind, record, backHref, backLabel }) => {
	const { colors, scheme } = useTheme();
	const [activeTab, setActiveTab] = useState("activity");
	const bundle = useMemo(
		() => getRecordBundle(kind, record.id),
		[kind, record.id]
	);
	const [notes, setNotes] = useState(() => bundle.notesSeed);
	const [draftNote, setDraftNote] = useState("");

	useEffect(() => {
		setNotes([...(bundle.notesSeed || [])]);
		setDraftNote("");
	}, [bundle.key]);

	const addNote = () => {
		const t = draftNote.trim();
		if (!t) return;
		setNotes((prev) => [
			{
				id: `local-${Date.now()}`,
				body: t,
				at: new Date().toLocaleString(undefined, {
					dateStyle: "medium",
					timeStyle: "short",
				}),
				author: "You",
			},
			...prev,
		]);
		setDraftNote("");
	};

	const subtitle =
		kind === "lead" ? String(record.source || "—") : record.lifecycle || "Contact";

	return (
		<div
			className={`p-4 sm:p-6 max-w-7xl mx-auto ${colors.background} transition-colors min-h-screen`}
		>
			<div className="flex flex-wrap items-center gap-3 mb-6">
				<Link href={backHref} passHref>
					<a
						className={`inline-flex items-center gap-1.5 text-sm font-medium ${colors.textSecondary} ${colors.hoverSecondary} rounded-xl px-2 py-1`}
					>
						<ArrowLeft className="w-4 h-4" />
						{backLabel}
					</a>
				</Link>
			</div>

			<div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
				{/* Profile column */}
				<div className="xl:col-span-4 space-y-4">
					<div
						className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-6`}
					>
						<div className="flex flex-col sm:flex-row xl:flex-col items-center sm:items-start xl:items-center text-center xl:text-center gap-4">
							<img
								src={record.image}
								alt=""
								className={`w-28 h-28 rounded-full border-2 ${colors.border} object-cover shrink-0`}
							/>
							<div className="min-w-0 flex-1">
								<h1
									className={`text-xl font-semibold ${colors.foreground} break-words`}
								>
									{record.name}
								</h1>
								<p className={`text-sm ${colors.textSecondary} mt-0.5`}>
									{record.title}
								</p>
								<p className={`text-sm mt-1 ${colors.mutedForeground}`}>
									{record.company}
								</p>
								<p
									className={`text-xs mt-2 ${colors.mutedForeground} uppercase tracking-wide`}
								>
									{subtitle}
								</p>
								{kind === "lead" && (
									<span
										className={`mt-3 inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${
											scheme.chip || "bg-zinc-100 dark:bg-zinc-800"
										} ${colors.foreground}`}
									>
										{record.status}
									</span>
								)}
							</div>
						</div>

						<div
							className={`mt-6 flex flex-wrap gap-2 justify-center xl:justify-center`}
						>
							<a
								href={`mailto:${record.email}`}
								className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border ${colors.border} ${colors.hoverSecondary} ${colors.foreground}`}
							>
								<Mail className="w-3.5 h-3.5" />
								Email
							</a>
							{record.phone && record.phone !== "—" ? (
								<a
									href={`tel:${String(record.phone).replace(/\D/g, "")}`}
									className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border ${colors.border} ${colors.hoverSecondary} ${colors.foreground}`}
								>
									<Phone className="w-3.5 h-3.5" />
									Call
								</a>
							) : (
								<span
									className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border ${colors.border} opacity-50 cursor-not-allowed`}
								>
									<Phone className="w-3.5 h-3.5" />
									Call
								</span>
							)}
							<button
								type="button"
								className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
							>
								<Plus className="w-3.5 h-3.5" />
								Log activity
							</button>
						</div>

						<ul
							className={`mt-6 space-y-3 text-sm border-t ${colors.border} pt-6`}
						>
							<li className="flex items-start gap-2">
								<Mail className={`w-4 h-4 mt-0.5 shrink-0 ${colors.textMuted}`} />
								<a
									href={`mailto:${record.email}`}
									className={`${colors.foreground} hover:underline break-all`}
								>
									{record.email}
								</a>
							</li>
							<li className="flex items-center gap-2">
								<Phone className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
								<span className={colors.textSecondary}>{record.phone}</span>
							</li>
							<li className="flex items-center gap-2">
								<Building2 className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
								<span className={colors.textSecondary}>{record.location}</span>
							</li>
							<li className="flex items-center gap-2">
								<Calendar className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
								<span className={colors.textSecondary}>
									{kind === "lead"
										? `Source: ${record.source}`
										: `Added ${record.createdAt || "—"}`}
								</span>
							</li>
						</ul>
						<div className={`mt-6 pt-6 border-t ${colors.border}`}>
							<p className={`text-xs font-medium uppercase ${colors.mutedForeground}`}>
								Owner
							</p>
							<p className={`text-sm font-medium mt-1 ${colors.foreground}`}>
								{record.owner}
							</p>
							{kind === "lead" && (
								<p className={`text-xs mt-2 ${colors.mutedForeground}`}>
									Pipeline value:{" "}
									<span className={`font-semibold ${colors.foreground}`}>
										${Number(record.value || 0).toLocaleString()}
									</span>
								</p>
							)}
							<p className={`text-xs mt-3 ${colors.mutedForeground}`}>
								<Link href="/deals" passHref>
									<a className={`font-medium ${colors.foreground} hover:underline`}>
										View all deals
									</a>
								</Link>
								{" · "}
								<Link href="/pipelines" passHref>
									<a className={`font-medium ${colors.foreground} hover:underline`}>
										Pipeline board
									</a>
								</Link>
							</p>
						</div>
					</div>
				</div>

				{/* Main: tabs */}
				<div className="xl:col-span-8 space-y-4">
					<div
						className={`flex flex-wrap gap-1 p-1 rounded-xl border ${colors.border} ${colors.card}`}
					>
						{TABS.map(({ id, label, icon: Icon }) => {
							const on = activeTab === id;
							return (
								<button
									key={id}
									type="button"
									onClick={() => setActiveTab(id)}
									className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
										on
											? `${scheme.primary} ${scheme.primaryForeground}`
											: `${colors.mutedForeground} ${colors.hoverSecondary} ${colors.foreground}`
									}`}
								>
									<Icon className="w-4 h-4 shrink-0" />
									{label}
								</button>
							);
						})}
					</div>

					{activeTab === "activity" && (
						<div
							className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-5 sm:p-6`}
						>
							<h2
								className={`text-sm font-semibold ${colors.foreground} flex items-center gap-2`}
							>
								<Clock className="w-4 h-4" />
								Activity timeline
							</h2>
							<ul className="mt-5 space-y-0">
								{bundle.timeline.map((item, i) => (
									<li key={item.id} className="flex gap-3">
										<div className="flex flex-col items-center">
											<TimelineIcon type={item.type} />
											{i < bundle.timeline.length - 1 && (
												<span
													className={`w-px flex-1 min-h-[2.5rem] bg-current opacity-20 ${colors.border}`}
												/>
											)}
										</div>
										<div className="flex-1 pb-6">
											<p className={`text-sm font-medium ${colors.foreground}`}>
												{item.title}
											</p>
											<p className={`text-xs mt-1 ${colors.textSecondary}`}>
												{item.body}
											</p>
											<p className={`text-[10px] mt-2 ${colors.textMuted}`}>
												{item.at} · {item.user}
											</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					)}

					{activeTab === "notes" && (
						<div
							className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-5 sm:p-6`}
						>
							<h2
								className={`text-sm font-semibold ${colors.foreground} flex items-center gap-2`}
							>
								<StickyNote className="w-4 h-4" />
								Notes
							</h2>
							<div className="mt-4">
								<textarea
									value={draftNote}
									onChange={(e) => setDraftNote(e.target.value)}
									rows={3}
									placeholder="Add a note…"
									className={`w-full rounded-xl border ${colors.border} ${colors.background} ${colors.foreground} px-3 py-2 text-sm placeholder:opacity-50`}
								/>
								<button
									type="button"
									onClick={addNote}
									className={`mt-2 text-xs font-medium px-3 py-2 rounded-xl ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
								>
									Save note
								</button>
							</div>
							<ul className="mt-6 space-y-3">
								{notes.map((n) => (
									<li
										key={n.id}
										className={`rounded-xl border ${colors.border} px-4 py-3 ${colors.muted}`}
									>
										<p className={`text-sm ${colors.foreground}`}>{n.body}</p>
										<p className={`text-[10px] mt-2 ${colors.textMuted}`}>
											{n.at} · {n.author}
										</p>
									</li>
								))}
							</ul>
						</div>
					)}

					{activeTab === "deals" && (
						<div
							className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} overflow-hidden`}
						>
							<div className={`px-5 py-4 border-b ${colors.border}`}>
								<h2
									className={`text-sm font-semibold ${colors.foreground} flex items-center gap-2`}
								>
									<Handshake className="w-4 h-4" />
									Deals
								</h2>
								<p className={`text-xs mt-1 ${colors.mutedForeground}`}>
									Opportunities associated with this record.
								</p>
							</div>
							<div className="overflow-x-auto">
								{bundle.deals.length === 0 ? (
									<p
										className={`px-5 py-10 text-sm text-center ${colors.mutedForeground}`}
									>
										No deals yet.{" "}
										<Link href="/pipelines" passHref>
											<a className={`underline ${colors.foreground}`}>
												Create one on the pipeline
											</a>
										</Link>
										.
									</p>
								) : (
									<table className="w-full text-sm">
										<thead>
											<tr
												className={`text-left text-xs uppercase tracking-wide ${colors.mutedForeground} border-b ${colors.border}`}
											>
												<th className="px-5 py-3 font-medium">Deal</th>
												<th className="px-5 py-3 font-medium">Stage</th>
												<th className="px-5 py-3 font-medium text-right">
													Value
												</th>
												<th className="px-5 py-3 font-medium">Close</th>
												<th className="px-5 py-3 font-medium">Rep</th>
											</tr>
										</thead>
										<tbody className={`divide-y ${colors.border}`}>
											{bundle.deals.map((row) => {
												const sm =
													STAGE_META[row.stage] || STAGE_META.prospect;
												return (
													<tr
														key={row.id}
														className={`${colors.hoverSecondary} transition-colors`}
													>
														<td
															className={`px-5 py-3 font-medium ${colors.foreground}`}
														>
															{row.name}
														</td>
														<td className="px-5 py-3">
															<span
																className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-md border ${sm.className}`}
															>
																{sm.label}
															</span>
														</td>
														<td
															className={`px-5 py-3 text-right tabular-nums ${colors.textSecondary}`}
														>
															${row.amount.toLocaleString()}
														</td>
														<td className={`px-5 py-3 ${colors.textMuted}`}>
															{row.closeDate}
														</td>
														<td className={`px-5 py-3 ${colors.textSecondary}`}>
															{row.rep}
														</td>
													</tr>
												);
											})}
										</tbody>
									</table>
								)}
							</div>
						</div>
					)}

					{activeTab === "files" && (
						<div
							className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-5 sm:p-6`}
						>
							<h2
								className={`text-sm font-semibold ${colors.foreground} flex items-center gap-2`}
							>
								<Paperclip className="w-4 h-4" />
								Attached files
							</h2>
							{bundle.files.length === 0 ? (
								<p className={`mt-4 text-sm ${colors.mutedForeground}`}>
									No files attached.
								</p>
							) : (
								<ul className="mt-4 space-y-2">
									{bundle.files.map((f) => (
										<li
											key={f.id}
											className={`flex items-center justify-between gap-3 text-sm rounded-xl border ${colors.border} px-4 py-3 ${colors.hoverSecondary}`}
										>
											<span className="flex items-center gap-3 min-w-0">
												<FileText
													className={`w-4 h-4 shrink-0 ${colors.textMuted}`}
												/>
												<span className={`truncate ${colors.foreground}`}>
													{f.name}
												</span>
											</span>
											<span className="flex items-center gap-3 shrink-0">
												<span className={`text-xs ${colors.textMuted}`}>
													{f.size}
												</span>
												<button
													type="button"
													className={`p-1.5 rounded-xl ${colors.hoverSecondary} ${colors.mutedForeground}`}
													title="Download"
												>
													<Download className="w-4 h-4" />
												</button>
											</span>
										</li>
									))}
								</ul>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default RecordProfileDetail;
