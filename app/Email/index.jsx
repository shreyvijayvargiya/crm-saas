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
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useCrmData } from "../../utils/CrmDataContext";

const textareaClass = cn(
	"flex min-h-24 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
);


const Email = () => {
	const { emailThreads: THREADS } = useCrmData();
	const { colors } = useTheme();
	const [activeId, setActiveId] = useState(THREADS[0]?.id);
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
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
							<Input
								type="search"
								placeholder="Search mail…"
								className="pl-9"
							/>
						</div>
						<div className="flex gap-1 mt-2">
							<Button type="button" size="sm" className="flex-1">
								<Inbox className="w-3.5 h-3.5" />
								Primary
							</Button>
							<Button type="button" variant="outline" size="sm" className="flex-1">
								<Star className="w-3.5 h-3.5" />
								Starred
							</Button>
						</div>
					</div>
					<ul className="overflow-y-auto max-h-[40vh] lg:max-h-none lg:h-[calc(100%-5.5rem)]">
						{THREADS.map((t) => (
							<li key={t.id}>
								<Button
									type="button"
									variant="ghost"
									onClick={() => setActiveId(t.id)}
									className={`w-full h-auto justify-start text-left px-3 py-3 rounded-none border-b ${colors.border} transition-colors ${
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
								</Button>
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
						<Button
							type="button"
							variant="ghost"
							size="icon"
							aria-label="More"
						>
							<MoreHorizontal className="w-5 h-5" />
						</Button>
					</div>

					<div className={`flex-1 overflow-y-auto px-4 py-4 space-y-4 ${colors.background}`}>
						{active.messages.map((msg) => (
							<Card key={msg.id} className={`p-4 ${colors.shadow}`}>
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
									<Button type="button" variant="outline" size="sm">
										<Reply className="w-3.5 h-3.5" />
										Reply
									</Button>
									<Button type="button" variant="outline" size="sm">
										<Forward className="w-3.5 h-3.5" />
										Forward
									</Button>
								</div>
							</Card>
						))}
					</div>

					<div className={`p-4 ${colors.card}`}>
						<div className="flex items-center gap-2 mb-2">
							<div className={`flex items-center gap-1 text-xs ${colors.textSecondary}`}>
								<Mail className="w-3.5 h-3.5" />
								<span>New message</span>
								<ChevronDown className="w-3.5 h-3.5" />
							</div>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								className="ml-auto"
							>
								<Paperclip className="w-3.5 h-3.5" />
								Attach
							</Button>
						</div>
						<textarea
							value={body}
							onChange={(e) => setBody(e.target.value)}
							rows={4}
							placeholder="Write your message…"
							className={textareaClass}
						/>
						<div className="flex justify-end mt-3">
							<Button type="button">
								<Send className="w-4 h-4" />
								Send
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Email;
