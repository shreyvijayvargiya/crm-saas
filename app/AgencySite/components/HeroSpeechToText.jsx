import React, { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const CHARS = [
	"S", "A", "T", "Q", "G", "E", "B", "R", "N", "K",
	"2", "8", "3", "7", "9", "4",
	"#", "%", "@", "<", ">", "{", "}", "*", "+", "=",
	"M", "L", "Y", "W", "X", "Z", "H", "P",
];

const WORDS = [
	"hello", "world", "listen", "speak", "token", "stream",
	"voice", "notes", "clear", "audio", "parse", "live",
];

const BAR_COUNT = 56;

function buildAmplitudes(n = BAR_COUNT) {
	const amps = [];
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1);
		const env =
			0.22 +
			0.55 * Math.sin(t * Math.PI) +
			0.28 * Math.abs(Math.sin(t * Math.PI * 4.2 + 0.4)) +
			0.18 * Math.abs(Math.sin(t * Math.PI * 11.5));
		amps.push(Math.min(1, Math.max(0.08, env)));
	}
	return amps;
}

const AMPS = buildAmplitudes();

function buildGlyphs() {
	return CHARS.map((ch, i) => {
		const col = i % 6;
		const row = Math.floor(i / 6);
		return {
			id: `${ch}-${i}`,
			ch,
			x: 6 + col * 15,
			y: 10 + row * 16,
			size: 14 + (i % 5) * 4,
			rot: (i % 9) * 7 - 24,
			spread: 40 + (i % 8) * 18,
			rise: -8 - (i % 5) * 6,
		};
	});
}

const GLYPHS = buildGlyphs();

/**
 * HeroSpeechToText — scroll-driven STT card.
 * Right: waveform intensifies + words throw in with scroll (not initially).
 * Left: label / status drifts reverse on scroll-up (opposite of progress).
 */
export default function HeroSpeechToText({ className, scrollHeightVh = 260 }) {
	const sectionRef = useRef(null);
	const glyphs = useMemo(() => GLYPHS, []);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const p = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 28,
		restDelta: 0.001,
	});

	/* Right panel — waveform + thrown words grow with scroll */
	const waveX = useTransform(p, [0, 1], ["8%", "0%"]);
	const waveScale = useTransform(p, [0, 0.35, 1], [0.72, 1, 1.06]);
	const waveAmp = useTransform(p, [0, 0.2, 1], [0.25, 0.7, 1]);
	const throwOpacity = useTransform(p, [0.12, 0.35], [0, 1]);
	const throwX = useTransform(p, [0.1, 0.85], [-48, 0]);

	/* Left — reverse on scroll (moves opposite direction) */
	const leftX = useTransform(p, [0, 1], ["0%", "-18%"]);
	const leftOpacity = useTransform(p, [0, 0.5, 1], [1, 0.85, 0.55]);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Speech to text visualization"
		>
			<div className="sticky top-0 flex h-screen items-center overflow-hidden bg-[#f4f4f5] px-4 sm:px-8">
				<div className="relative z-10 mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_24px_60px_-28px_rgba(24,24,27,0.35)]">
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

					<div className="relative grid min-h-[300px] grid-cols-1 sm:min-h-[340px] sm:grid-cols-2">
						{/* Left — drifts reverse as you scroll */}
						<motion.div
							className="relative flex flex-col justify-center border-b border-zinc-100 px-6 py-10 sm:border-b-0 sm:border-r sm:px-8"
							style={{ x: leftX, opacity: leftOpacity }}
						>
							<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
								Input stream
							</p>
							<h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
								Speak freely.
							</h3>
							<p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
								Scroll to push the waveform right and throw tokens into the transcript.
								Scroll up and this side drifts back.
							</p>
							<div className="mt-6 flex flex-wrap gap-2">
								{WORDS.slice(0, 5).map((w, i) => (
									<LeftChip key={w} word={w} progress={p} index={i} />
								))}
							</div>
						</motion.div>

						{/* Right — waveform + thrown glyphs (appear with scroll) */}
						<div className="relative overflow-hidden px-3 py-8 sm:px-4">
							<motion.div
								className="w-full"
								style={{ x: waveX, scale: waveScale }}
							>
								<div className="h-24 w-full sm:h-28">
									<div className="flex h-full w-full items-stretch gap-px">
										{AMPS.map((amp, i) => (
											<WaveBar key={i} amp={amp} progress={waveAmp} index={i} />
										))}
									</div>
								</div>
							</motion.div>

							<motion.div
								className="relative mt-4 h-[160px] w-full sm:h-[180px]"
								style={{ opacity: throwOpacity, x: throwX }}
							>
								{glyphs.map((g, i) => (
									<ThrownGlyph key={g.id} g={g} progress={p} index={i} />
								))}
							</motion.div>
						</div>
					</div>

					<div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3">
						<p className="font-mono text-[11px] text-zinc-400">
							scroll · waveform · tokenize
						</p>
						<p className="text-[11px] font-medium text-zinc-500">Live transcript</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function LeftChip({ word, progress, index }) {
	const x = useTransform(progress, [0, 1], [0, -12 - index * 6]);
	const opacity = useTransform(progress, [0, 0.6, 1], [1, 0.7, 0.35]);
	return (
		<motion.span
			className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-[11px] text-zinc-600"
			style={{ x, opacity }}
		>
			{word}
		</motion.span>
	);
}

function WaveBar({ amp, progress, index }) {
	const height = useTransform(progress, (v) => {
		const h = (12 + amp * 28) * (0.35 + v * 0.65) + Math.sin(index * 0.4) * v * 8;
		return `${Math.min(96, Math.max(8, h))}%`;
	});
	return (
		<motion.span
			className="block min-w-0 flex-1 self-center rounded-full bg-zinc-900"
			style={{ height }}
		/>
	);
}

function ThrownGlyph({ g, progress, index }) {
	const appear = useTransform(progress, [0.15 + (index % 8) * 0.04, 0.45 + (index % 8) * 0.03], [0, 1]);
	const x = useTransform(progress, [0.15, 0.9], [-g.spread, g.spread * 0.15]);
	const y = useTransform(progress, [0.2, 1], [12, g.rise]);
	const rotate = useTransform(progress, [0.2, 1], [0, g.rot]);

	return (
		<motion.span
			className="absolute font-mono font-semibold text-zinc-800"
			style={{
				left: `${g.x}%`,
				top: `${g.y}%`,
				fontSize: g.size,
				opacity: appear,
				x,
				y,
				rotate,
			}}
		>
			{g.ch}
		</motion.span>
	);
}
