import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
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
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";

const LEAD_DB = {
	"101": {
		id: "101",
		name: "Alice Brown",
		email: "alice@company.com",
		phone: "+1 (555) 010-3200",
		company: "Cloud Corp",
		title: "VP Engineering",
		location: "Austin, TX",
		image: "./people/person-1.png",
		source: "Website",
		status: "Qualified",
		value: 48000,
		owner: "Alex Chen",
	},
	"102": {
		id: "102",
		name: "Bob Wilson",
		email: "bob@startup.io",
		phone: "+1 (555) 010-4401",
		company: "Startup.io",
		title: "Founder",
		location: "San Francisco, CA",
		image: "./people/person-4.png",
		source: "Referral",
		status: "New",
		value: 12000,
		owner: "Sam Rivera",
	},
};

const TIMELINE = [
	{ id: 1, type: "note", title: "Discovery call completed", body: "Discussed API limits and SSO. Positive signal on security review.", at: "Apr 12, 2026 · 10:20 AM", user: "Alex Chen" },
	{ id: 2, type: "email", title: "Email: Re: Pilot scope", body: "Sent revised timeline for 4-week pilot.", at: "Apr 10, 2026 · 4:05 PM", user: "You" },
	{ id: 3, type: "deal", title: "Deal updated → Qualified", body: "Stage moved from New after MQL score > 80.", at: "Apr 8, 2026 · 9:00 AM", user: "System" },
];

const FILES = [
	{ id: "f1", name: "NDA_CloudCorp.pdf", size: "240 KB" },
	{ id: "f2", name: "Requirements_v2.docx", size: "1.1 MB" },
];

const DEAL_HISTORY = [
	{ id: "dh1", name: "Enterprise FY26", amount: "$48,000", stage: "Qualified", closed: "—" },
	{ id: "dh2", name: "Pilot 2025", amount: "$8,000", stage: "Won", closed: "Dec 2025" },
];

const LeadDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors, scheme } = useTheme();
	const [note, setNote] = useState("");

	const lead = useMemo(() => {
		if (!id) return null;
		return LEAD_DB[String(id)] || {
			id: String(id),
			name: "Lead",
			email: "lead@example.com",
			phone: "—",
			company: "—",
			title: "—",
			location: "—",
			image: "./people/person-2.png",
			source: "—",
			status: "New",
			value: 0,
			owner: "—",
		};
	}, [id]);

	if (!router.isReady || !lead) {
		return (
			<div className={`p-6 ${colors.background}`}>
				<p className={colors.mutedForeground}>Loading…</p>
			</div>
		);
	}

	return (
		<div className={`p-6 max-w-6xl mx-auto ${colors.background} transition-colors min-h-screen`}>
			<div className="flex items-center gap-3 mb-6">
				<Link
					href="/leads"
					className={`inline-flex items-center gap-1.5 text-sm font-medium ${colors.textSecondary} ${colors.hoverSecondary} rounded-xl px-2 py-1`}
				>
					<ArrowLeft className="w-4 h-4" />
					Back to leads
				</Link>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<div className={`lg:col-span-1 rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-6`}>
					<div className="flex flex-col items-center text-center">
						<img
							src={lead.image}
							alt=""
							className={`w-24 h-24 rounded-full border-2 ${colors.border} object-cover`}
						/>
						<h1 className={`text-xl font-semibold mt-4 ${colors.foreground}`}>{lead.name}</h1>
						<p className={`text-sm ${colors.textSecondary}`}>{lead.title}</p>
						<p className={`text-sm mt-1 ${colors.mutedForeground}`}>{lead.company}</p>
						<span
							className={`mt-3 inline-flex text-xs font-medium px-2.5 py-1 rounded-full ${scheme.chip || "bg-zinc-100 dark:bg-zinc-800"} ${colors.foreground}`}
						>
							{lead.status}
						</span>
					</div>
					<ul className={`mt-6 space-y-3 text-sm border-t ${colors.border} pt-6`}>
						<li className="flex items-center gap-2">
							<Mail className={`w-4 h-4 ${colors.textMuted}`} />
							<a href={`mailto:${lead.email}`} className={`${colors.foreground} hover:underline truncate`}>
								{lead.email}
							</a>
						</li>
						<li className="flex items-center gap-2">
							<Phone className={`w-4 h-4 ${colors.textMuted}`} />
							<span className={colors.textSecondary}>{lead.phone}</span>
						</li>
						<li className="flex items-center gap-2">
							<Building2 className={`w-4 h-4 ${colors.textMuted}`} />
							<span className={colors.textSecondary}>{lead.location}</span>
						</li>
						<li className="flex items-center gap-2">
							<Calendar className={`w-4 h-4 ${colors.textMuted}`} />
							<span className={colors.textSecondary}>Source: {lead.source}</span>
						</li>
					</ul>
					<div className={`mt-6 pt-6 border-t ${colors.border}`}>
						<p className={`text-xs font-medium uppercase ${colors.mutedForeground}`}>Owner</p>
						<p className={`text-sm font-medium mt-1 ${colors.foreground}`}>{lead.owner}</p>
						<p className={`text-xs mt-2 ${colors.mutedForeground}`}>
							Pipeline value (demo):{" "}
							<span className={`font-semibold ${colors.foreground}`}>
								${lead.value.toLocaleString()}
							</span>
						</p>
					</div>
				</div>

				<div className="lg:col-span-2 space-y-6">
					<div className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-5`}>
						<h2 className={`text-sm font-semibold ${colors.foreground} flex items-center gap-2`}>
							<Clock className="w-4 h-4" />
							Activity timeline
						</h2>
						<ul className="mt-4 space-y-4">
							{TIMELINE.map((item, i) => (
								<li key={item.id} className="flex gap-3">
									<div className="flex flex-col items-center">
										<span
											className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
												item.type === "email"
													? "bg-sky-500/15 text-sky-600 dark:text-sky-400"
													: item.type === "deal"
													? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
													: "bg-violet-500/15 text-violet-600 dark:text-violet-400"
											}`}
										>
											{item.type === "email" ? (
												<Mail className="w-3.5 h-3.5" />
											) : item.type === "deal" ? (
												<ChevronRight className="w-3.5 h-3.5" />
											) : (
												<MessageSquare className="w-3.5 h-3.5" />
											)}
										</span>
										{i < TIMELINE.length - 1 && (
											<span className={`w-px flex-1 min-h-[2rem] ${colors.border} bg-current opacity-30`} />
										)}
									</div>
									<div className="flex-1 pb-2">
										<p className={`text-sm font-medium ${colors.foreground}`}>{item.title}</p>
										<p className={`text-xs mt-0.5 ${colors.textSecondary}`}>{item.body}</p>
										<p className={`text-[10px] mt-1.5 ${colors.textMuted}`}>
											{item.at} · {item.user}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>

					<div className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-5`}>
						<h2 className={`text-sm font-semibold ${colors.foreground}`}>Notes</h2>
						<textarea
							value={note}
							onChange={(e) => setNote(e.target.value)}
							rows={3}
							placeholder="Add a note…"
							className={`mt-3 w-full rounded-xl border ${colors.border} ${colors.background} ${colors.foreground} px-3 py-2 text-sm placeholder:${colors.textMuted}`}
						/>
						<button
							type="button"
							className={`mt-2 text-xs font-medium px-3 py-1.5 rounded-xl ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
						>
							Save note
						</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-5`}>
							<h2 className={`text-sm font-semibold ${colors.foreground} flex items-center gap-2`}>
								<Paperclip className="w-4 h-4" />
								Attached files
							</h2>
							<ul className="mt-3 space-y-2">
								{FILES.map((f) => (
									<li
										key={f.id}
										className={`flex items-center justify-between text-sm rounded-xl border ${colors.border} px-3 py-2 ${colors.hoverSecondary}`}
									>
										<span className="flex items-center gap-2 min-w-0">
											<FileText className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
											<span className={`truncate ${colors.foreground}`}>{f.name}</span>
										</span>
										<span className={`text-xs ${colors.textMuted}`}>{f.size}</span>
									</li>
								))}
							</ul>
						</div>

						<div className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-5`}>
							<h2 className={`text-sm font-semibold ${colors.foreground}`}>Deal history</h2>
							<table className="w-full text-sm mt-3">
								<thead>
									<tr className={`text-left text-xs ${colors.mutedForeground}`}>
										<th className="pb-2">Deal</th>
										<th className="pb-2">Amount</th>
										<th className="pb-2">Stage</th>
										<th className="pb-2">Closed</th>
									</tr>
								</thead>
								<tbody className={`divide-y ${colors.border}`}>
									{DEAL_HISTORY.map((row) => (
										<tr key={row.id}>
											<td className={`py-2 ${colors.foreground}`}>{row.name}</td>
											<td className={`py-2 ${colors.textSecondary}`}>{row.amount}</td>
											<td className={`py-2 ${colors.textSecondary}`}>{row.stage}</td>
											<td className={`py-2 ${colors.textMuted}`}>{row.closed}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeadDetail;
