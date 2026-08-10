import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const YEAR = new Date().getFullYear();
const DAYS = 365;

function dayLabel(index) {
	const d = new Date(YEAR, 0, 1);
	d.setDate(d.getDate() + index);
	return d.toLocaleDateString(undefined, {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

/**
 * HeroYearPad — iPhone mockup with 365-day dots; tap opens a writing pad, store as emoji.
 */
export default function HeroYearPad({ className }) {
	const [entries, setEntries] = useState({});
	const [active, setActive] = useState(null);
	const [draft, setDraft] = useState("");
	const [emoji, setEmoji] = useState("📝");

	const filled = useMemo(() => Object.keys(entries).length, [entries]);

	const openDay = (i) => {
		setActive(i);
		const existing = entries[i];
		setDraft(existing?.text || "");
		setEmoji(existing?.emoji || "📝");
	};

	const save = () => {
		if (active == null) return;
		const text = draft.trim();
		if (!text) {
			setEntries((prev) => {
				const next = { ...prev };
				delete next[active];
				return next;
			});
		} else {
			setEntries((prev) => ({
				...prev,
				[active]: { text, emoji },
			}));
		}
		setActive(null);
	};

	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2 overflow-hidden",
				className
			)}
			aria-label="Year pad iPhone"
		>
			<div className="flex min-h-[min(92vh,760px)] flex-col items-center justify-center bg-zinc-100 px-4 py-12">
				<p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
					Year pad · {YEAR}
				</p>
				<p className="mt-2 text-sm text-zinc-500">
					{filled} / {DAYS} days noted
				</p>

				{/* iPhone shell */}
				<div className="relative mt-8 w-[min(92vw,320px)] rounded-[2.6rem] border-[10px] border-zinc-900 bg-zinc-900 shadow-2xl">
					<div className="absolute left-1/2 top-2 z-20 h-5 w-28 -translate-x-1/2 rounded-full bg-black" />
					<div className="overflow-hidden rounded-[1.9rem] bg-[#fafafa]">
						<div className="px-4 pb-3 pt-9">
							<p className="text-center text-xs font-semibold text-zinc-800">
								{YEAR} · daily dots
							</p>
							<p className="mt-0.5 text-center text-[10px] text-zinc-400">
								Tap a day · leave a note as emoji
							</p>
						</div>

						<div className="max-h-[420px] overflow-y-auto px-3 pb-6">
							<div className="grid gap-[3px]" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
								{Array.from({ length: DAYS }, (_, i) => {
									const entry = entries[i];
									return (
										<button
											key={i}
											type="button"
											title={dayLabel(i)}
											onClick={() => openDay(i)}
											className={cn(
												"flex aspect-square items-center justify-center rounded-[3px] text-[9px] transition",
												entry
													? "bg-zinc-900 text-white"
													: "bg-zinc-200/90 hover:bg-zinc-300"
											)}
										>
											{entry ? entry.emoji : ""}
										</button>
									);
								})}
							</div>
						</div>
					</div>
					<div className="mx-auto my-2 h-1 w-28 rounded-full bg-zinc-700" />
				</div>

				{/* Writing pad sheet */}
				<AnimatePresence>
					{active != null ? (
						<>
							<motion.button
								type="button"
								aria-label="Close"
								className="absolute inset-0 z-40 bg-black/35"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								onClick={() => setActive(null)}
							/>
							<motion.div
								initial={{ opacity: 0, y: 24, scale: 0.96 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 16, scale: 0.97 }}
								className="absolute left-1/2 top-1/2 z-50 w-[min(92vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-200 bg-[#fffef8] p-5 shadow-2xl"
							>
								<div className="flex items-start justify-between gap-3">
									<div>
										<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
											Writing pad
										</p>
										<p className="mt-1 text-sm font-semibold text-zinc-900">
											{dayLabel(active)}
										</p>
									</div>
									<button
										type="button"
										onClick={() => setActive(null)}
										className="rounded-full p-1.5 text-zinc-500 hover:bg-zinc-100"
									>
										<X className="h-4 w-4" />
									</button>
								</div>

								<div className="mt-4 flex gap-2">
									{["📝", "😊", "🌧️", "💡", "❤️", "☕"].map((e) => (
										<button
											key={e}
											type="button"
											onClick={() => setEmoji(e)}
											className={cn(
												"flex h-9 w-9 items-center justify-center rounded-full text-lg",
												emoji === e ? "bg-zinc-900 ring-2 ring-zinc-900 ring-offset-2" : "bg-zinc-100"
											)}
										>
											{e}
										</button>
									))}
								</div>

								<textarea
									value={draft}
									onChange={(e) => setDraft(e.target.value)}
									placeholder="What happened today?"
									rows={4}
									className="mt-4 w-full resize-none rounded-2xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-800 outline-none focus:border-zinc-400"
								/>

								<button
									type="button"
									onClick={save}
									className="mt-3 w-full rounded-full bg-zinc-900 py-2.5 text-sm font-semibold text-white"
								>
									Save {emoji}
								</button>
							</motion.div>
						</>
					) : null}
				</AnimatePresence>
			</div>
		</section>
	);
}
