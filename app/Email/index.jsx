import React, { useState } from "react";
import {
	Mail,
	Send,
	Inbox,
	Star,
	Search,
	Paperclip,
	ChevronDown,
	Reply,
	Forward,
	MoreHorizontal,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const THREADS = [
	{
		id: "t1",
		subject: "Re: Enterprise pilot timeline",
		preview: "Thanks for the updated scope — we can start the week of Apr 21…",
		from: "Sarah Chen",
		fromEmail: "sarah@acme.com",
		time: "10:42 AM",
		unread: true,
		starred: true,
		messages: [
			{
				id: "m1",
				from: "Sarah Chen",
				fromEmail: "sarah@acme.com",
				to: "you@crm.io",
				time: "Apr 14, 2026 · 10:42 AM",
				body: "Thanks for the updated scope — we can start the week of Apr 21 if legal signs by Friday. Can you confirm SSO metadata format?",
			},
			{
				id: "m2",
				from: "You",
				fromEmail: "you@crm.io",
				to: "sarah@acme.com",
				time: "Apr 14, 2026 · 11:05 AM",
				body: "Confirmed — we’ll send SAML metadata today EOD. I’ve attached the checklist for your IT team.",
			},
			{
				id: "m3",
				from: "Sarah Chen",
				fromEmail: "sarah@acme.com",
				to: "you@crm.io",
				time: "Apr 14, 2026 · 11:18 AM",
				body: "Perfect. Looping in @james from IT for the firewall allowlist.",
			},
		],
	},
	{
		id: "t2",
		subject: "Invoice #INV-2408 — paid",
		preview: "Payment received. Receipt attached for your records.",
		from: "billing@northwind.io",
		fromEmail: "billing@northwind.io",
		time: "Yesterday",
		unread: false,
		starred: false,
		messages: [
			{
				id: "m1",
				from: "Northwind Billing",
				fromEmail: "billing@northwind.io",
				to: "you@crm.io",
				time: "Apr 13, 2026 · 4:02 PM",
				body: "Payment received for invoice INV-2408. Receipt attached.",
			},
		],
	},
	{
		id: "t3",
		subject: "Product roadmap Q2",
		preview: "Sharing the deck we discussed on the call…",
		from: "Alex Rivera",
		fromEmail: "alex@startup.io",
		time: "Mon",
		unread: true,
		starred: false,
		messages: [
			{
				id: "m1",
				from: "Alex Rivera",
				fromEmail: "alex@startup.io",
				to: "you@crm.io",
				time: "Apr 12, 2026 · 9:00 AM",
				body: "Sharing the deck we discussed on the call — focus slides 4–8 for integrations.",
			},
		],
	},
];

const Email = () => {
	const { colorScheme, colors, scheme } = useTheme();
	const [activeId, setActiveId] = useState(THREADS[0].id);
	const [body, setBody] = useState("");
	const active = THREADS.find((t) => t.id === activeId) || THREADS[0];

	return (
		<div className={`min-h-screen transition-colors flex flex-col`}>
			<div className={`border-b ${colors.border} px-6 py-4`}>
				<h1 className={`text-2xl font-semibold ${colors.foreground}`}>Inbox</h1>
				<p className={`text-sm ${colors.mutedForeground} mt-0.5`}>
					Static UI mock — wire to your provider when ready
				</p>
			</div>

			<div className="flex flex-1 flex-col lg:flex-row min-h-[calc(100vh-8rem)]">
				{/* Sidebar list */}
				<aside
					className={`w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r ${colors.border} ${colors.card}`}
				>
					<div className={`p-3 border-b ${colors.border}`}>
						<div className="relative">
							<Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${colors.textMuted}`} />
							<input
								type="search"
								placeholder="Search mail…"
								className={`w-full pl-9 pr-3 py-2 rounded-xl text-sm border ${colors.border} ${colors.background} ${colors.foreground} focus:outline-none focus:ring-2 ${getFocusRingClass(colorScheme)}`}
							/>
						</div>
						<div className="flex gap-1 mt-2">
							<button
								type="button"
								className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-medium ${scheme.primary} ${scheme.primaryForeground}`}
							>
								<Inbox className="w-3.5 h-3.5" />
								Primary
							</button>
							<button
								type="button"
								className={`flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 rounded-xl text-xs font-medium border ${colors.border} ${colors.hoverSecondary} ${colors.foreground}`}
							>
								<Star className="w-3.5 h-3.5" />
								Starred
							</button>
						</div>
					</div>
					<ul className="overflow-y-auto max-h-[40vh] lg:max-h-none lg:h-[calc(100%-5.5rem)]">
						{THREADS.map((t) => (
							<li key={t.id}>
								<button
									type="button"
									onClick={() => setActiveId(t.id)}
									className={`w-full text-left px-3 py-3 border-b ${colors.border} transition-colors ${
										activeId === t.id ? `${colors.muted} ${colors.foreground}` : `${colors.hoverSecondary}`
									}`}
								>
									<div className="flex items-start justify-between gap-2">
										<span
											className={`text-sm font-medium truncate ${t.unread ? "font-semibold" : ""} ${colors.foreground}`}
										>
											{t.from}
										</span>
										<span className={`text-[10px] shrink-0 ${colors.textMuted}`}>{t.time}</span>
									</div>
									<p className={`text-xs font-medium mt-0.5 truncate ${colors.foreground}`}>
										{t.subject}
									</p>
									<p className={`text-[11px] mt-0.5 line-clamp-2 ${colors.textSecondary}`}>{t.preview}</p>
								</button>
							</li>
						))}
					</ul>
				</aside>

				{/* Thread + compose */}
				<div className="flex-1 flex flex-col min-w-0">
					<div className={`flex items-center justify-between px-4 py-3 border-b ${colors.border} ${colors.card}`}>
						<div className="min-w-0">
							<h2 className={`text-lg font-semibold truncate ${colors.foreground}`}>{active.subject}</h2>
							<p className={`text-xs ${colors.textSecondary}`}>
								{active.messages.length} messages in thread
							</p>
						</div>
						<button
							type="button"
							className={`p-2 rounded-xl ${colors.hoverSecondary} ${colors.foreground}`}
							aria-label="More"
						>
							<MoreHorizontal className="w-5 h-5" />
						</button>
					</div>

					<div className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 ${colors.background}`}>
						{active.messages.map((msg) => (
							<div
								key={msg.id}
								className={`rounded-xl border ${colors.border} ${colors.card} p-4 ${colors.shadow}`}
							>
								<div className="flex flex-wrap items-start justify-between gap-2 mb-2">
									<div>
										<p className={`text-sm font-semibold ${colors.foreground}`}>{msg.from}</p>
										<p className={`text-[11px] ${colors.textMuted}`}>
											{msg.fromEmail} → {msg.to}
										</p>
									</div>
									<span className={`text-[11px] ${colors.textMuted}`}>{msg.time}</span>
								</div>
								<p className={`text-sm leading-relaxed whitespace-pre-wrap ${colors.textSecondary}`}>
									{msg.body}
								</p>
								<div className="flex gap-2 mt-3">
									<button
										type="button"
										className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-xl border ${colors.border} ${colors.hoverSecondary}`}
									>
										<Reply className="w-3.5 h-3.5" />
										Reply
									</button>
									<button
										type="button"
										className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-xl border ${colors.border} ${colors.hoverSecondary}`}
									>
										<Forward className="w-3.5 h-3.5" />
										Forward
									</button>
								</div>
							</div>
						))}
					</div>

					<div className={`border-t ${colors.border} p-4 ${colors.card}`}>
						<div className="flex items-center gap-2 mb-2">
							<div className={`flex items-center gap-1 text-xs ${colors.textSecondary}`}>
								<Mail className="w-3.5 h-3.5" />
								<span>New message</span>
								<ChevronDown className="w-3.5 h-3.5" />
							</div>
							<button
								type="button"
								className={`ml-auto inline-flex items-center gap-1 text-xs ${colors.textMuted} ${colors.hoverSecondary} px-2 py-1 rounded`}
							>
								<Paperclip className="w-3.5 h-3.5" />
								Attach
							</button>
						</div>
						<textarea
							value={body}
							onChange={(e) => setBody(e.target.value)}
							rows={4}
							placeholder="Write your message…"
							className={`w-full rounded-xl border ${colors.border} ${colors.background} ${colors.foreground} px-3 py-2 text-sm placeholder:${colors.textMuted} focus:outline-none focus:ring-2 ${getFocusRingClass(colorScheme)}`}
						/>
						<div className="flex justify-end mt-3">
							<button
								type="button"
								className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
							>
								<Send className="w-4 h-4" />
								Send
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Email;
