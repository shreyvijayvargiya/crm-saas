import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "#F97316";

const SCRIPT =
	"Hey Myriam, I hope you're doing well. Just a quick note about the launch — the decks are ready and the moodboard is pinned on the board.";

const WORDS = SCRIPT.split(/\s+/);

/** Rough per-word durations (ms) — longer for punctuation-ish ends. */
function wordDuration(word, index) {
	const base = 220 + word.length * 28;
	const pause = /[,.—]$/.test(word) || index === WORDS.length - 1 ? 180 : 40;
	return base + pause;
}

const DURATIONS = WORDS.map(wordDuration);
const TOTAL_MS = DURATIONS.reduce((a, b) => a + b, 0);

function formatTime(ms) {
	const s = Math.min(TOTAL_MS, Math.max(0, ms)) / 1000;
	const m = Math.floor(s / 60);
	const r = Math.floor(s % 60);
	return `${m}:${String(r).padStart(2, "0")}`;
}

const BAR_COUNT = 28;
const BAR_HEIGHTS = Array.from({ length: BAR_COUNT }, (_, i) => {
	const t = i / (BAR_COUNT - 1);
	const envelope = Math.sin(t * Math.PI);
	const ripple = 0.45 + 0.55 * Math.abs(Math.sin(i * 1.7));
	return Math.max(0.12, envelope * ripple);
});

function Waveform({ playing, progress }) {
	return (
		<div className="flex h-7 flex-1 items-center justify-center gap-[3px] px-1" aria-hidden>
			{BAR_HEIGHTS.map((h, i) => {
				const lit = i / BAR_COUNT <= progress;
				return (
					<motion.span
						key={i}
						className="w-[2.5px] rounded-full bg-white sm:w-[3px]"
						style={{ originY: 0.5 }}
						animate={
							playing
								? {
										height: [
											`${h * 10}px`,
											`${h * 26}px`,
											`${h * 14}px`,
											`${h * 22}px`,
											`${h * 10}px`,
										],
										opacity: lit ? 1 : 0.35,
								  }
								: {
										height: `${Math.max(4, h * 16)}px`,
										opacity: lit ? 0.95 : 0.3,
								  }
						}
						transition={
							playing
								? {
										duration: 0.9 + (i % 5) * 0.08,
										repeat: Infinity,
										ease: "easeInOut",
										delay: (i % 7) * 0.04,
								  }
								: { duration: 0.2 }
						}
					/>
				);
			})}
		</div>
	);
}

function TetherLines({ speaking }) {
	return (
		<div className="relative flex h-10 items-stretch justify-center gap-10 sm:h-12 sm:gap-14" aria-hidden>
			{[0, 1, 2].map((i) => (
				<div key={i} className="relative w-px overflow-hidden">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `repeating-linear-gradient(to bottom, ${ACCENT}55 0 4px, transparent 4px 9px)`,
						}}
					/>
					<AnimatePresence>
						{speaking ? (
							<motion.span
								key="pulse"
								className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full"
								style={{ background: ACCENT, boxShadow: `0 0 12px ${ACCENT}` }}
								initial={{ y: -4, opacity: 0 }}
								animate={{ y: [0, 40, 48], opacity: [0, 1, 0] }}
								exit={{ opacity: 0 }}
								transition={{
									duration: 1.1,
									repeat: Infinity,
									ease: "easeInOut",
									delay: i * 0.18,
								}}
							/>
						) : null}
					</AnimatePresence>
				</div>
			))}
		</div>
	);
}

/**
 * HeroWaveTranscript — orange audio pill (play / waveform / timer)
 * tethered to a karaoke transcript bubble. Lines pulse while speaking.
 */
export default function HeroWaveTranscript({ isLight = true, className }) {
	const [playing, setPlaying] = useState(false);
	const [elapsed, setElapsed] = useState(0);
	const startRef = useRef(0);
	const baseRef = useRef(0);
	const rafRef = useRef(0);
	const utterRef = useRef(null);

	const spokenCount = useMemo(() => {
		let t = 0;
		for (let i = 0; i < DURATIONS.length; i++) {
			t += DURATIONS[i];
			if (elapsed < t) return i;
		}
		return WORDS.length;
	}, [elapsed]);

	const progress = Math.min(1, elapsed / TOTAL_MS);

	const stopSpeech = () => {
		if (typeof window !== "undefined" && window.speechSynthesis) {
			window.speechSynthesis.cancel();
		}
		utterRef.current = null;
	};

	const tick = () => {
		const now = performance.now();
		const next = Math.min(TOTAL_MS, baseRef.current + (now - startRef.current));
		setElapsed(next);
		if (next >= TOTAL_MS) {
			setPlaying(false);
			stopSpeech();
			return;
		}
		rafRef.current = requestAnimationFrame(tick);
	};

	const play = () => {
		if (elapsed >= TOTAL_MS) {
			setElapsed(0);
			baseRef.current = 0;
		} else {
			baseRef.current = elapsed;
		}
		startRef.current = performance.now();
		setPlaying(true);
		rafRef.current = requestAnimationFrame(tick);

		if (typeof window !== "undefined" && window.speechSynthesis) {
			stopSpeech();
			const remaining = WORDS.slice(
				elapsed >= TOTAL_MS
					? 0
					: (() => {
							let t = 0;
							for (let i = 0; i < DURATIONS.length; i++) {
								t += DURATIONS[i];
								if (elapsed < t) return i;
							}
							return 0;
					  })()
			).join(" ");
			const u = new SpeechSynthesisUtterance(remaining || SCRIPT);
			u.rate = 1.02;
			u.pitch = 1;
			utterRef.current = u;
			window.speechSynthesis.speak(u);
		}
	};

	const pause = () => {
		setPlaying(false);
		cancelAnimationFrame(rafRef.current);
		stopSpeech();
	};

	useEffect(() => {
		return () => {
			cancelAnimationFrame(rafRef.current);
			stopSpeech();
		};
	}, []);

	return (
		<section
			className={cn(
				"mx-auto flex w-full max-w-lg flex-col items-center px-4 py-12 sm:py-16",
				className
			)}
			aria-label="Wave transcript player"
		>
			<div
				className={cn(
					"w-full rounded-[2rem] px-4 py-10 sm:px-8",
					isLight ? "bg-[#fff7ed]" : "bg-zinc-900"
				)}
			>
				{/* Audio pill */}
				<div
					className="mx-auto flex w-full max-w-sm items-center gap-2 rounded-full px-2 py-2 shadow-[0_12px_40px_-16px_rgba(249,115,22,0.65)]"
					style={{ background: ACCENT }}
				>
					<button
						type="button"
						onClick={() => (playing ? pause() : play())}
						className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-orange-500 shadow-sm"
						aria-label={playing ? "Pause" : "Play"}
					>
						{playing ? (
							<Pause className="h-4 w-4 fill-current" />
						) : (
							<Play className="h-4 w-4 fill-current pl-0.5" />
						)}
					</button>

					<Waveform playing={playing} progress={progress} />

					<span className="shrink-0 pr-3 font-mono text-sm font-semibold tabular-nums text-white">
						{formatTime(elapsed)}
					</span>
				</div>

				<TetherLines speaking={playing} />

				{/* Transcript bubble */}
				<div
					className={cn(
						"mx-auto w-full max-w-sm rounded-2xl px-5 py-4 text-[15px] leading-relaxed shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] sm:text-base",
						isLight ? "bg-white text-zinc-900" : "bg-zinc-950 text-zinc-100"
					)}
				>
					<p>
						{WORDS.map((word, i) => {
							const spoken = i < spokenCount;
							const current = playing && i === spokenCount;
							return (
								<span key={`${word}-${i}`}>
									<motion.span
										className={cn(
											"inline transition-colors duration-200",
											spoken
												? isLight
													? "text-zinc-900"
													: "text-white"
												: isLight
													? "text-zinc-300"
													: "text-zinc-600",
											current && "text-orange-500"
										)}
										animate={current ? { opacity: [1, 0.55, 1] } : { opacity: 1 }}
										transition={current ? { duration: 0.7, repeat: Infinity } : undefined}
									>
										{word}
									</motion.span>
									{i < WORDS.length - 1 ? " " : ""}
								</span>
							);
						})}
					</p>
				</div>

				<div
					className="mx-auto mt-8 h-0.5 w-24 rounded-full"
					style={{ background: ACCENT }}
					aria-hidden
				/>
			</div>
		</section>
	);
}
