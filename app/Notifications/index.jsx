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
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FormSelect from "../../lib/ui/FormSelect";

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
	const { colors } = useTheme();

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

	return (
		<div className={`min-h-screen transition-all duration-100 ease-in pb-12`}>
			<div className="max-w-4xl mx-auto px-4 md:px-6 pt-6 md:pt-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
					<div className="flex items-center gap-3">
						<span className="p-2.5 rounded-xl bg-primary text-primary-foreground">
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
						<Button type="button" onClick={markAllRead}>
							<CheckCheck className="w-4 h-4" />
							Mark all as read
						</Button>
						<Button type="button" variant="outline" size="icon" title="Notification settings">
							<Settings className="w-5 h-5" />
						</Button>
					</div>
				</div>

				<Card className="p-4 mb-6 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
					<div className="relative flex-1 min-w-0 max-w-md">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
						<Input
							type="search"
							placeholder="Search notifications…"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							className="pl-10"
						/>
					</div>
					<div className="flex flex-wrap items-center gap-2">
						<FormSelect
							value={status}
							onChange={(e) => setStatus(e.target.value)}
							options={[
								{ value: "all", label: "Status: All" },
								{ value: "unread", label: "Unread" },
								{ value: "read", label: "Read" },
							]}
						/>
						<FormSelect
							value={typeFilter}
							onChange={(e) => setTypeFilter(e.target.value)}
							options={[
								{ value: "all", label: "Type: All" },
								{ value: "ticket", label: "Ticket" },
								{ value: "message", label: "Message" },
								{ value: "team", label: "Team" },
							]}
						/>
						<div className={`flex rounded-xl border ${colors.border} p-0.5 ${colors.muted}`}>
							<Button
								type="button"
								variant={!compact ? "secondary" : "ghost"}
								size="icon"
								onClick={() => setCompact(false)}
								title="Comfortable list"
							>
								<List className="w-4 h-4" />
							</Button>
							<Button
								type="button"
								variant={compact ? "secondary" : "ghost"}
								size="icon"
								onClick={() => setCompact(true)}
								title="Compact list"
							>
								<LayoutGrid className="w-4 h-4" />
							</Button>
						</div>
					</div>
				</Card>

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
															<Button
																type="button"
																variant="outline"
																size="sm"
																onClick={() => handleAccept(n.id)}
															>
																Accept
															</Button>
															<Button
																type="button"
																variant="destructive"
																size="sm"
																onClick={() => handleDecline(n.id)}
															>
																Decline
															</Button>
														</div>
													)}
												</div>
												<div className="flex sm:flex-col items-start sm:items-end gap-2 sm:text-right shrink-0">
													<Badge variant="secondary">{n.category}</Badge>
													<span className={`text-xs whitespace-nowrap ${colors.textMuted}`}>
														{n.time}
													</span>
												</div>
											</div>
											<div className="flex items-center justify-end gap-1 mt-3 pt-3 border-t border-zinc-200/80 dark:border-zinc-800">
												<Button
													type="button"
													variant="ghost"
													size="sm"
													onClick={() => toggleRead(n.id)}
												>
													{n.unread ? "Mark as read" : "Mark unread"}
												</Button>
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
