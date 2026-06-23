import React, { useState } from "react";
import { Bot, Image as ImageIcon, Paperclip, Send, X, ChevronDown } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MODELS = [
	{ id: "gpt-4o", label: "GPT-4o" },
	{ id: "claude-3-5", label: "Claude 3.5" },
	{ id: "gemini-pro", label: "Gemini Pro" },
	{ id: "llama-3", label: "Llama 3" },
];

const SAMPLE_PROMPTS = [
	"Summarize pipeline deals closing this week",
	"Draft a follow-up for cold leads",
	"List overdue tasks for my team",
	"Next steps for the ACME Corp deal",
];

const AIChatSidebar = ({ onClose }) => {
	const { colors } = useTheme();
	const [message, setMessage] = useState("");
	const [model, setModel] = useState(MODELS[0].id);
	const [modelOpen, setModelOpen] = useState(false);

	return (
		<div
			className={`flex h-full w-full min-w-0 flex-col ${colors.primaryBackground} border-0 ${colors.foreground}`}
		>
			<header
				className={`flex shrink-0 items-center justify-between gap-2 border-b ${colors.border} px-3 py-2`}
			>
				<div className="flex min-w-0 items-center gap-2">
					<div
						className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${colors.border} ${colors.secondary} ${colors.secondaryForeground}`}
					>
						<Bot className="h-4 w-4" />
					</div>
					<div className="min-w-0">
						<p className={`truncate text-sm font-semibold ${colors.foreground}`}>
							AI Assistant
						</p>
						<p className={`text-[10px] ${colors.mutedForeground}`}>
							CRM &amp; sales help
						</p>
					</div>
				</div>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={onClose}
					aria-label="Close AI chat"
				>
					<X className="h-4 w-4" />
				</Button>
			</header>

			<div
				className={`min-h-0 flex-1 overflow-y-auto px-3 py-3 hidescrollbar ${colors.muted}`}
			>
				<div
					className={`flex h-full min-h-[120px] flex-col items-center justify-center rounded-xl border border-dashed ${colors.border} px-2 text-center`}
				>
					<Bot className={`mb-2 h-8 w-8 ${colors.textMuted}`} />
					<p className={`text-xs font-medium ${colors.foreground}`}>
						Ask about leads, deals, and tasks
					</p>
					<p className={`mt-1 text-[10px] leading-relaxed ${colors.mutedForeground}`}>
						Connection to a model is not configured. Use the prompts below to get
						started.
					</p>
				</div>
			</div>

			<footer
				className={`shrink-0 space-y-2 border-t ${colors.border} p-2 ${colors.primaryBackground}`}
			>
				<div className="flex flex-nowrap gap-1.5 overflow-x-auto hidescrollbar pb-0.5">
					{SAMPLE_PROMPTS.map((text) => (
						<Button
							key={text}
							type="button"
							variant="outline"
							size="sm"
							onClick={() => setMessage((prev) => (prev ? `${prev} ${text}` : text))}
							className={cn(
								"shrink-0 max-w-[200px] h-auto rounded-full px-2 py-1 text-left text-[10px] leading-tight font-normal",
								colors.mutedForeground
							)}
						>
							{text}
						</Button>
					))}
				</div>

				<div
					className={cn(
						"flex flex-col gap-1 rounded-2xl border p-2 focus-within:ring-2 focus-within:ring-ring",
						colors.border,
						colors.muted
					)}
				>
					<textarea
						rows={3}
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Message…"
						className={`min-h-[72px] w-full resize-none bg-transparent text-xs ${colors.foreground} placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none hidescrollbar`}
					/>
					<div className="flex items-center justify-between gap-1 border-t border-zinc-200/80 pt-2 dark:border-zinc-700/80">
						<div className="flex min-w-0 flex-1 items-center gap-0.5">
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="h-8 w-8 shrink-0"
								aria-label="Add image"
							>
								<ImageIcon className="h-4 w-4" />
							</Button>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								className="h-8 w-8 shrink-0"
								aria-label="Attach file"
							>
								<Paperclip className="h-4 w-4" />
							</Button>
							<div className="relative min-w-0">
								<Button
									type="button"
									variant="outline"
									size="sm"
									onClick={() => setModelOpen((o) => !o)}
									className="max-w-full gap-1 px-2 py-1 text-[10px] h-auto font-normal"
									aria-expanded={modelOpen}
									aria-haspopup="listbox"
								>
									<span className="truncate">
										{MODELS.find((m) => m.id === model)?.label}
									</span>
									<ChevronDown className="h-3 w-3 shrink-0 opacity-60" />
								</Button>
								{modelOpen && (
									<div
										className={`absolute bottom-full left-0 z-10 mb-1 min-w-[10rem] max-h-40 overflow-y-auto rounded-xl border ${colors.border} ${colors.card} py-0.5 shadow-lg`}
										role="listbox"
									>
										{MODELS.map((m) => (
											<Button
												key={m.id}
												type="button"
												variant={model === m.id ? "default" : "ghost"}
												size="sm"
												role="option"
												aria-selected={model === m.id}
												onClick={() => {
													setModel(m.id);
													setModelOpen(false);
												}}
												className="w-full justify-start px-2 py-1.5 text-xs h-auto font-normal"
											>
												{m.label}
											</Button>
										))}
									</div>
								)}
							</div>
						</div>
						<Button
							type="button"
							size="icon"
							className="h-9 w-9 shrink-0"
							aria-label="Send (demo)"
						>
							<Send className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default AIChatSidebar;
