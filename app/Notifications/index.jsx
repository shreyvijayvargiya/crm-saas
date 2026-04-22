import React, { useMemo, useState } from "react";
import {
	Bell,
	CheckCheck,
	Settings,
	Search,
	List,
	LayoutGrid,
	FileText,
	MessageCircle,
	Users,
} from "lucide-react";
import Image from "next/image";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";
import { toast } from "react-toastify";

const INITIAL_NOTIFICATIONS = [
	{
		id: "n1",
		type: "ticket",
		title: "New Ticket Assigned",
		body: "You have been assigned to ticket #1234 — Website Redesign",
		category: "Ticket",
		time: "5 minutes ago",
		unread: true,
	},
	{
		id: "n2",
		type: "team",
		title: "Joaquina Weisenborn",
		body: "Requesting access permission",
		category: "Team",
		time: "12 pm",
		unread: false,
		avatar: "/people/person-2.png",
		actions: true,
	},
	{
		id: "n3",
		type: "message",
		title: "New Message",
		body: "Sarah Johnson sent you a message about the Q2 roadmap…",
		category: "Message",
		time: "1 hour ago",
		unread: false,
	},
	{
		id: "n4",
		type: "ticket",
		title: "Ticket updated",
		body: "Status changed to In Progress for ticket #1198",
		category: "Ticket",
		time: "3 hours ago",
		unread: true,
	},
	{
		id: "n5",
		type: "message",
		title: "Mention in thread",
		body: "You were mentioned in #product — Design review notes",
		category: "Message",
		time: "Yesterday",
		unread: false,
	},
	{
		id: "n6",
		type: "team",
		title: "Team invite",
		body: "You were added to the Sales workspace",
		category: "Team",
		time: "1 day ago",
		unread: true,
	},
];

const TYPE_ICON = {
	ticket: { Icon: FileText, wrap: "bg-blue-500/15 text-blue-600 dark:text-blue-400" },
	message: { Icon: MessageCircle, wrap: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
	team: { Icon: Users, wrap: "bg-violet-500/15 text-violet-600 dark:text-violet-400" },
};

const Notifications = () => {
	const { colorScheme, colors, scheme } = useTheme();
	const [items, setItems] = useState(INITIAL_NOTIFICATIONS);
	const [query, setQuery] = useState("");
	const [status, setStatus] = useState("all");
	const [typeFilter, setTypeFilter] = useState("all");
	const [compact, setCompact] = useState(false);

	const filtered = useMemo(() => {
		return items.filter((n) => {
			if (status === "unread" && !n.unread) return false;
			if (status === "read" && n.unread) return false;
			if (typeFilter !== "all" && n.type !== typeFilter) return false;
			if (query.trim()) {
				const q = query.toLowerCase();
				return (
					n.title.toLowerCase().includes(q) ||
					n.body.toLowerCase().includes(q) ||
					n.category.toLowerCase().includes(q)
				);
			}
			return true;
		});
	}, [items, query, status, typeFilter]);

	const markAllRead = () => {
		setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
		toast.success("All notifications marked as read");
	};

	const toggleRead = (id) => {
		setItems((prev) =>
			prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n)),
		);
	};

	const handleAccept = (id) => {
		toast.success("Request accepted");
		setItems((prev) => prev.filter((n) => n.id !== id));
	};

	const handleDecline = (id) => {
		toast.info("Request declined");
		setItems((prev) => prev.filter((n) => n.id !== id));
	};

	const selectClass = `rounded-xl border ${colors.border} text-zinc-800 dark:text-zinc-200 bg-zinc-50/50 dark:bg-transparent text-sm px-3 py-2 pr-8 focus:outline-none focus:ring-2 ${getFocusRingClass(colorScheme)}`;

	return (
		<div className={`min-h-screen transition-all duration-100 ease-in pb-12`}>
			<div className="max-w-4xl mx-auto px-4 md:px-6 pt-6 md:pt-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
					<div className="flex items-center gap-3">
						<span className={`p-2.5 rounded-xl ${scheme.primary} ${scheme.primaryForeground}`}>
							<Bell className="w-6 h-6" />
						</span>
						<div>
							<h1 className={`text-2xl font-bold tracking-tight ${colors.foreground}`}>
								Notifications
							</h1>
							<p className={`text-sm ${colors.textSecondary}`}>
								Stay on top of tickets, messages, and team updates
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2 flex-wrap">
						<button
							type="button"
							onClick={markAllRead}
							className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-colors`}
						>
							<CheckCheck className="w-4 h-4" />
							Mark all as read
						</button>
						<button
							type="button"
							className={`p-2.5 rounded-xl border ${colors.border} ${colors.card} ${colors.hoverSecondary} ${colors.foreground}`}
							title="Notification settings"
						>
							<Settings className="w-5 h-5" />
						</button>
					</div>
				</div>

				<div
					className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-4 mb-6 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between`}
				>
					<div className="relative flex-1 min-w-0 max-w-md">
						<Search
							className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
						/>
						<input
							type="search"
							placeholder="Search notifications…"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${colors.border} ${colors.background} ${colors.foreground} text-sm placeholder:${colors.textMuted} focus:outline-none focus:ring-2 ${getFocusRingClass(colorScheme)}`}
						/>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<select
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							className={selectClass}
							aria-label="Status"
						>
							<option value="all">Status: All</option>
							<option value="unread">Unread</option>
							<option value="read">Read</option>
						</select>
						<select
							value={typeFilter}
							onChange={(e) => setTypeFilter(e.target.value)}
							className={selectClass}
							aria-label="Type"
						>
							<option value="all">Type: All</option>
							<option value="ticket">Ticket</option>
							<option value="message">Message</option>
							<option value="team">Team</option>
						</select>
						<div className={`flex rounded-xl border ${colors.border} p-0.5 ${colors.muted}`}>
							<button
								type="button"
								onClick={() => setCompact(false)}
								className={`p-2 rounded-xl transition-colors ${
									!compact ? `${colors.card} shadow-sm ${colors.foreground}` : colors.hoverSecondary
								}`}
								title="Comfortable list"
							>
								<List className="w-4 h-4" />
							</button>
							<button
								type="button"
								onClick={() => setCompact(true)}
								className={`p-2 rounded-xl transition-colors ${
									compact ? `${colors.card} shadow-sm ${colors.foreground}` : colors.hoverSecondary
								}`}
								title="Compact list"
							>
								<LayoutGrid className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>

				<ul className="space-y-2">
					{filtered.length === 0 ? (
						<li
							className={`rounded-xl border ${colors.border} ${colors.card} p-12 text-center ${colors.mutedForeground}`}
						>
							No notifications match your filters.
						</li>
					) : (
						filtered.map((n) => {
							const meta = TYPE_ICON[n.type] || TYPE_ICON.ticket;
							const Icon = meta.Icon;
							return (
								<li
									key={n.id}
									className={`rounded-2xl border ${colors.border} transition-colors ${
										n.unread
											? "bg-amber-50/90 dark:bg-amber-950/25 border-amber-200/60 dark:border-amber-900/40"
											: `${colors.card}`
									} ${compact ? "p-3" : "p-4 md:p-5"} shadow-sm`}
								>
									<div className="flex gap-3 md:gap-4">
										<div className="shrink-0">
											{n.avatar ? (
												<Image
													src={n.avatar}
													alt=""
													width={44}
													height={44}
													className="rounded-full object-cover border-2 border-white dark:border-zinc-800"
												/>
											) : (
												<div
													className={`w-11 h-11 rounded-full flex items-center justify-center ${meta.wrap}`}
												>
													<Icon className="w-5 h-5" />
												</div>
											)}
										</div>
										<div className="flex-1 min-w-0">
											<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
												<div>
													<p className={`font-semibold ${colors.foreground}`}>{n.title}</p>
													<p className={`text-sm mt-0.5 ${colors.textSecondary} line-clamp-2`}>
														{n.body}
													</p>
													{n.actions && (
														<div className="flex gap-2 mt-3">
															<button
																type="button"
																onClick={() => handleAccept(n.id)}
																className={`px-3 py-1.5 rounded-xl text-sm font-medium border ${colors.border} ${colors.card} ${colors.foreground} ${colors.hoverSecondary}`}
															>
																Accept
															</button>
															<button
																type="button"
																onClick={() => handleDecline(n.id)}
																className="px-3 py-1.5 rounded-xl text-sm font-medium border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/60"
															>
																Decline
															</button>
														</div>
													)}
												</div>
												<div className="flex sm:flex-col items-start sm:items-end gap-2 sm:text-right shrink-0">
													<span
														className={`text-xs font-medium px-2 py-0.5 rounded-md ${colors.muted} ${colors.foreground}`}
													>
														{n.category}
													</span>
													<span className={`text-xs whitespace-nowrap ${colors.textMuted}`}>
														{n.time}
													</span>
												</div>
											</div>
											<div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-zinc-200/80 dark:border-zinc-800">
												<button
													type="button"
													onClick={() => toggleRead(n.id)}
													className={`text-xs font-medium px-2 py-1 rounded-xl ${colors.hoverSecondary} ${colors.textSecondary}`}
												>
													{n.unread ? "Mark as read" : "Mark unread"}
												</button>
											</div>
										</div>
									</div>
								</li>
							);
						})
					)}
				</ul>
			</div>
		</div>
	);
};

export default Notifications;
