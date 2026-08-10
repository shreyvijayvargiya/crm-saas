import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	BookOpen,
	Check,
	Loader2,
	Mail,
	MessageCircle,
	NotebookPen,
	Search,
	Send,
	Slack,
	X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
	{
		id: "research",
		kind: "auto",
		title: "Researching launch brief",
		detail: "Scanning deck, moodboard, and last week’s notes…",
		doneTitle: "Research complete",
		doneDetail: "3 sources · 12 takeaways ready.",
		Icon: Search,
		accent: "violet",
	},
	{
		id: "notion",
		kind: "approve",
		title: "Add notes to Notion",
		detail: "Create a page in Launch / Summer drop with research summary.",
		Icon: NotebookPen,
		accent: "zinc",
	},
	{
		id: "email-hubspot",
		kind: "approve",
		title: "Email HubSpot subscribers",
		detail: "Send “Summer drop is live” to the CRM list (2,418 contacts).",
		Icon: Mail,
		accent: "orange",
	},
	{
		id: "email-gumroad",
		kind: "approve",
		title: "Email Gumroad buyers",
		detail: "Notify customers who bought the Componentry kit.",
		Icon: BookOpen,
		accent: "pink",
	},
	{
		id: "email-beehiiv",
		kind: "approve",
		title: "Email Beehiiv newsletter",
		detail: "Publish & send to the weekly design list.",
		Icon: Mail,
		accent: "emerald",
	},
	{
		id: "email-loops",
		kind: "approve",
		title: "Email Loops audience",
		detail: "Transactional blast for waitlist upgrades.",
		Icon: Mail,
		accent: "sky",
	},
	{
		id: "slack",
		kind: "approve",
		title: "Message Slack #launches",
		detail: "Post the short update with link + owner tags.",
		Icon: Slack,
		accent: "violet",
	},
	{
		id: "whatsapp",
		kind: "approve",
		title: "WhatsApp studio group",
		detail: "Send the same blurb to the WhatsApp ops channel.",
		Icon: MessageCircle,
		accent: "emerald",
	},
];

const ACCENT = {
	violet: "bg-violet-500/15 text-violet-600 dark:text-violet-300",
	zinc: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-200",
	orange: "bg-orange-500/15 text-orange-600 dark:text-orange-300",
	pink: "bg-pink-500/15 text-pink-600 dark:text-pink-300",
	emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-300",
	sky: "bg-sky-500/15 text-sky-600 dark:text-sky-300",
};

function ActionCard({
	step,
	status,
	confirmCancel,
	onApprove,
	onCancel,
	onConfirmCancel,
	onKeep,
	isLight,
}) {
	const Icon = step.Icon;
	const busy = status === "running";
	const done = status === "done";
	const skipped = status === "skipped";

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className={cn(
				"rounded-2xl border p-3.5 shadow-sm",
				isLight ? "border-zinc-200 bg-white" : "border-zinc-800 bg-zinc-900"
			)}
		>
			<div className="flex items-start gap-3">
				<span
					className={cn(
						"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
						ACCENT[step.accent] || ACCENT.zinc
					)}
				>
					{busy ? (
						<Loader2 className="h-4 w-4 animate-spin" />
					) : done ? (
						<Check className="h-4 w-4" />
					) : (
						<Icon className="h-4 w-4" />
					)}
				</span>
				<div className="min-w-0 flex-1">
					<p
						className={cn(
							"text-sm font-semibold tracking-tight",
							isLight ? "text-zinc-900" : "text-white",
							skipped && "line-through opacity-50"
						)}
					>
						{done && step.doneTitle ? step.doneTitle : step.title}
					</p>
					<p
						className={cn(
							"mt-0.5 text-[12px] leading-snug",
							isLight ? "text-zinc-500" : "text-zinc-400"
						)}
					>
						{done && step.doneDetail ? step.doneDetail : step.detail}
					</p>

					{confirmCancel ? (
						<div
							className={cn(
								"mt-3 rounded-xl px-3 py-2.5 text-[12px]",
								isLight ? "bg-rose-50 text-rose-800" : "bg-rose-950/40 text-rose-200"
							)}
						>
							<p className="font-medium">Cancel this step?</p>
							<p className="mt-0.5 opacity-80">It will be skipped and we’ll continue.</p>
							<div className="mt-2.5 flex gap-2">
								<button
									type="button"
									onClick={onConfirmCancel}
									className="rounded-full bg-rose-600 px-3 py-1.5 text-[11px] font-semibold text-white"
								>
									Yes, cancel
								</button>
								<button
									type="button"
									onClick={onKeep}
									className={cn(
										"rounded-full px-3 py-1.5 text-[11px] font-semibold",
										isLight ? "bg-white text-zinc-700 ring-1 ring-zinc-200" : "bg-zinc-800 text-zinc-200"
									)}
								>
									Keep going
								</button>
							</div>
						</div>
					) : null}

					{step.kind === "approve" && status === "pending" && !confirmCancel ? (
						<div className="mt-3 flex gap-2">
							<button
								type="button"
								onClick={onApprove}
								className={cn(
									"inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold",
									isLight ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
								)}
							>
								<Check className="h-3.5 w-3.5" />
								Approve
							</button>
							<button
								type="button"
								onClick={onCancel}
								className={cn(
									"inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-semibold",
									isLight
										? "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
										: "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
								)}
							>
								<X className="h-3.5 w-3.5" />
								Cancel
							</button>
						</div>
					) : null}

					{done ? (
						<p className="mt-2 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
							Done · next step unlocked
						</p>
					) : null}
					{skipped ? (
						<p className="mt-2 text-[11px] font-medium text-zinc-400">Skipped</p>
					) : null}
				</div>
			</div>
		</motion.div>
	);
}

/**
 * HeroAIApprovalChat — multi-step agent actions with Approve / Cancel (+ confirm).
 */
export default function HeroAIApprovalChat({ isLight = true, className }) {
	const [started, setStarted] = useState(false);
	const [index, setIndex] = useState(0);
	const [statuses, setStatuses] = useState(() =>
		Object.fromEntries(STEPS.map((s) => [s.id, "idle"]))
	);
	const [confirmId, setConfirmId] = useState(null);
	const [finished, setFinished] = useState(false);
	const bottomRef = useRef(null);

	const setStatus = (id, status) =>
		setStatuses((prev) => ({ ...prev, [id]: status }));

	const advance = () => {
		setConfirmId(null);
		setIndex((i) => {
			const next = i + 1;
			if (next >= STEPS.length) {
				setFinished(true);
				return i;
			}
			return next;
		});
	};

	useEffect(() => {
		if (!started || finished) return undefined;
		const step = STEPS[index];
		if (!step) return undefined;

		if (step.kind === "auto") {
			setStatus(step.id, "running");
			const t = window.setTimeout(() => {
				setStatus(step.id, "done");
				window.setTimeout(advance, 500);
			}, 1600);
			return () => window.clearTimeout(t);
		}

		if (statuses[step.id] === "idle") {
			setStatus(step.id, "pending");
		}
		return undefined;
	}, [started, index, finished]);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
	}, [index, statuses, confirmId, finished]);

	const approve = (id) => {
		setStatus(id, "running");
		window.setTimeout(() => {
			setStatus(id, "done");
			window.setTimeout(advance, 450);
		}, 900);
	};

	const restart = () => {
		setStarted(true);
		setFinished(false);
		setConfirmId(null);
		setIndex(0);
		setStatuses(Object.fromEntries(STEPS.map((s) => [s.id, "idle"])));
	};

	const visible = STEPS.slice(0, index + 1).filter((s) => statuses[s.id] !== "idle");

	return (
		<section
			className={cn("mx-auto w-full max-w-lg px-4 py-10 sm:py-14", className)}
			aria-label="AI approval chatbot"
		>
			<div
				className={cn(
					"overflow-hidden rounded-[1.75rem] border shadow-[0_24px_60px_-28px_rgba(15,23,42,0.4)]",
					isLight ? "border-zinc-200 bg-zinc-50" : "border-zinc-800 bg-zinc-950"
				)}
			>
				{/* Header */}
				<div
					className={cn(
						"flex items-center gap-3 border-b px-4 py-3",
						isLight ? "border-zinc-200 bg-white" : "border-zinc-800 bg-zinc-900"
					)}
				>
					<span
						className={cn(
							"flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold",
							isLight ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
						)}
					>
						AI
					</span>
					<div className="min-w-0 flex-1">
						<p className={cn("text-sm font-semibold", isLight ? "text-zinc-900" : "text-white")}>
							Launch agent
						</p>
						<p className={cn("text-[11px]", isLight ? "text-zinc-400" : "text-zinc-500")}>
							Needs your approval on each action
						</p>
					</div>
					{started ? (
						<button
							type="button"
							onClick={restart}
							className={cn(
								"text-[11px] font-medium",
								isLight ? "text-zinc-400 hover:text-zinc-700" : "text-zinc-500 hover:text-zinc-300"
							)}
						>
							Restart
						</button>
					) : null}
				</div>

				{/* Feed */}
				<div className="max-h-[32rem] space-y-3 overflow-y-auto px-4 py-4">
					<div
						className={cn(
							"rounded-2xl rounded-tl-md px-3.5 py-2.5 text-sm leading-relaxed",
							isLight ? "bg-white text-zinc-700 ring-1 ring-zinc-200" : "bg-zinc-900 text-zinc-200 ring-1 ring-zinc-800"
						)}
					>
						I’ll run the launch checklist: research, Notion notes, emails across
						HubSpot / Gumroad / Beehiiv / Loops, then Slack + WhatsApp. Approve or
						cancel each step.
					</div>

					{!started ? (
						<button
							type="button"
							onClick={restart}
							className={cn(
								"inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
								isLight ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
							)}
						>
							<Send className="h-3.5 w-3.5" />
							Start checklist
						</button>
					) : null}

					<AnimatePresence initial={false}>
						{visible.map((step) => (
							<ActionCard
								key={step.id}
								step={step}
								status={statuses[step.id]}
								confirmCancel={confirmId === step.id}
								isLight={isLight}
								onApprove={() => approve(step.id)}
								onCancel={() => setConfirmId(step.id)}
								onKeep={() => setConfirmId(null)}
								onConfirmCancel={() => {
									setStatus(step.id, "skipped");
									advance();
								}}
							/>
						))}
					</AnimatePresence>

					{finished ? (
						<motion.div
							initial={{ opacity: 0, y: 8 }}
							animate={{ opacity: 1, y: 0 }}
							className={cn(
								"rounded-2xl px-3.5 py-3 text-sm",
								isLight
									? "bg-emerald-50 text-emerald-900 ring-1 ring-emerald-100"
									: "bg-emerald-950/40 text-emerald-100 ring-1 ring-emerald-900"
							)}
						>
							All steps handled. Launch checklist finished.
						</motion.div>
					) : null}
					<div ref={bottomRef} />
				</div>
			</div>
		</section>
	);
}
