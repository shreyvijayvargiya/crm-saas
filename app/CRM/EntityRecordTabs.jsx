import React, { useEffect, useMemo, useState } from "react";
import {
	Activity,
	StickyNote,
	Clock,
	Mail,
	MessageSquare,
	Phone,
	ChevronRight,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { getEntityBundle } from "./entityDetailData";

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

const EntityRecordTabs = ({ kind, id }) => {
	const { colors, scheme } = useTheme();
	const [activeTab, setActiveTab] = useState("activity");
	const bundle = useMemo(() => getEntityBundle(kind, id), [kind, id]);
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

	const tabs = [
		{ id: "activity", label: "Activity", icon: Activity },
		{ id: "notes", label: "Notes", icon: StickyNote },
	];

	return (
		<>
			<div
				className={`flex flex-wrap gap-1 p-1 rounded-xl border ${colors.border} ${colors.card}`}
			>
				{tabs.map(({ id: tabId, label, icon: Icon }) => {
					const on = activeTab === tabId;
					return (
						<button
							key={tabId}
							type="button"
							onClick={() => setActiveTab(tabId)}
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
						{bundle.activity.map((item, i) => (
							<li key={item.id} className="flex gap-3">
								<div className="flex flex-col items-center">
									<TimelineIcon type={item.type} />
									{i < bundle.activity.length - 1 && (
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
		</>
	);
};

export default EntityRecordTabs;
