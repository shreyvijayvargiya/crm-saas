import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const CHARS = [
	"S", "A", "T", "Q", "G", "E", "B", "R", "N", "K",
	"2", "8", "3", "7", "9", "4",
	"#", "%", "@", "<", ">", "{", "}", "*", "+", "=",
	"M", "L", "Y", "W", "X", "Z", "H", "P",
];

const BAR_COUNT = 64;

/** Deterministic audio-like envelope samples (0–1). */
function buildAmplitudes(n = BAR_COUNT) {
	const amps = [];
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1);
		const env =
			0.22 +
			0.55 * Math.sin(t * Math.PI) +
			0.28 * Math.abs(Math.sin(t * Math.PI * 4.2 + 0.4)) +
			0.18 * Math.abs(Math.sin(t * Math.PI * 11.5)) +
			0.12 * Math.abs(Math.cos(t * Math.PI * 7.3 + 1.1));
		amps.push(Math.min(1, Math.max(0.08, env)));
	}
	return amps;
}

const AMPS = buildAmplitudes();

function buildGlyphs() {
	return CHARS.map((ch, i) => {
		const col = i % 7;
		const row = Math.floor(i / 7);
		const jx = Math.sin(i * 2.1) * 18;
		const jy = Math.cos(i * 1.7) * 14;
		return {
			id: `${ch}-${i}`,
			ch,
			x: 8 + col * 13 + jx * 0.35,
			y: 12 + row * 18 + jy * 0.4,
			size: 14 + (i % 5) * 5 + (i % 3) * 2,
			rot: (i % 9) * 8 - 28,
			delay: (i % 11) * 0.07,
			opacity: 0.35 + (i % 5) * 0.12,
			duration: 2.4 + (i % 6) * 0.35,
		};
	});
}

const GLYPHS = buildGlyphs();

/**
 * HeroSpeechToText — light theme: edge-to-edge waveform → glyphs thrown right.
 */
export default function HeroSpeechToText({ className }) {
	const glyphs = useMemo(() => GLYPHS, []);

	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2 overflow-hidden",
				className
			)}
			aria-label="Speech to text visualization"
		>
			<div className="relative flex min-h-[min(72vh,560px)] items-center justify-center bg-[#f4f4f5] px-4 py-16 sm:px-8">
				<div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_24px_60px_-28px_rgba(24,24,27,0.35)]">
					<div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3">
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-400">
							Speech → text
						</p>
						<span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500">
							<span className="relative flex h-1.5 w-1.5">
								<span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
								<span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
							</span>
							Listening
						</span>
					</div>

					<div className="relative grid min-h-[280px] grid-cols-1 sm:min-h-[320px] sm:grid-cols-2">
						{/* Left — waveform flush to pane edges */}
						<div className="relative flex items-center border-b border-zinc-100 sm:border-b-0 sm:border-r">
							<div className="w-full px-0 py-10">
								<div className="h-28 w-full px-0 sm:h-36">
									{/* Fixed height track so scaleY bars fill vertically from center */}
									<div className="flex h-full w-full items-stretch gap-px">
										{AMPS.map((amp, i) => (
											<motion.span
												key={i}
												className="block min-w-0 flex-1 self-center rounded-full bg-zinc-900"
												animate={{
													height: [
														`${12 + amp * 28}%`,
														`${28 + amp * 72}%`,
														`${18 + amp * 40}%`,
														`${34 + amp * 60}%`,
														`${12 + amp * 28}%`,
													],
												}}
												transition={{
													duration: 0.9 + (i % 7) * 0.05,
													repeat: Infinity,
													ease: "easeInOut",
													delay: (i % 12) * 0.03,
												}}
											/>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Right — thrown glyphs */}
						<div className="relative overflow-hidden px-2 py-6 sm:px-3">
							<motion.div
								className="pointer-events-none absolute left-0 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-900/[0.06] blur-2xl"
								animate={{ scale: [0.85, 1.3, 0.85], opacity: [0.35, 0.7, 0.35] }}
								transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
								aria-hidden
							/>

							<div className="relative h-[220px] w-full sm:h-[260px]">
								{glyphs.map((g) => (
									<motion.span
										key={g.id}
										className="absolute font-mono font-semibold text-zinc-800"
										style={{
											left: `${g.x}%`,
											top: `${g.y}%`,
											fontSize: g.size,
										}}
										animate={{
											opacity: [0, g.opacity, g.opacity * 0.9, 0],
											x: [-36, 0, 10, 18],
											y: [10, 0, -6, -2],
											scale: [0.35, 1.08, 1, 0.92],
											rotate: [0, g.rot, g.rot * 0.9, g.rot * 1.1],
										}}
										transition={{
											duration: g.duration,
											delay: g.delay,
											repeat: Infinity,
											ease: "easeOut",
											times: [0, 0.22, 0.65, 1],
										}}
									>
										{g.ch}
									</motion.span>
								))}
							</div>
						</div>
					</div>

					<div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3">
						<p className="font-mono text-[11px] text-zinc-400">
							waveform · tokenize · stream
						</p>
						<p className="text-[11px] font-medium text-zinc-500">Live transcript</p>
					</div>
				</div>
			</div>
		</section>
	);
}
