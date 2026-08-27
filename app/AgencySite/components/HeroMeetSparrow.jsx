import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** Making-of: scroll paints each SVG part as we explain how Meet Sparrow was built. */
const PARTS = {
	beak: {
		word: "beak",
		fill: "#f59e0b",
		tip: "Beak — first path we drew; scroll unlocks its fill.",
	},
	eye: {
		word: "eye",
		fill: "#0ea5e9",
		tip: "Eye — active highlight follows the current story line.",
	},
	wing: {
		word: "wing",
		fill: "#8b5cf6",
		tip: "Wing — shared PARTS map keeps tip + fill in sync.",
	},
	breast: {
		word: "breast",
		fill: "#f43f5e",
		tip: "Breast — fills accumulate; completed parts stay lit.",
	},
	tail: {
		word: "tail",
		fill: "#14b8a6",
		tip: "Tail — same SVG reused from hover; scroll owns the paint.",
	},
	feet: {
		word: "feet",
		fill: "#eab308",
		tip: "Feet — last beat; full scroll colors the whole bird.",
	},
};

const LINES = [
	{ before: "Start with the ", part: "beak", after: " path — the first fill on scroll," },
	{ before: "wire the bright ", part: "eye", after: " to the active story line," },
	{ before: "paint the ", part: "wing", after: " from the shared PARTS map," },
	{ before: "keep the ", part: "breast", after: " lit once its chapter passes," },
	{ before: "reveal the ", part: "tail", after: " as progress accumulates," },
	{ before: "and lock the ", part: "feet", after: " when the making-of is complete." },
];

const MUTED = "#d4d4d8";
const HEAD_LIT = "#e4e4e7";

/** Same bird SVG as HeroBirdParts — fills accumulate with scroll. */
function BirdSvg({ filled, active }) {
	const color = (key) => {
		if (filled.has(key) || active === key) return PARTS[key].fill;
		return MUTED;
	};
	const headOn = filled.has("eye") || filled.has("beak") || active === "eye" || active === "beak";

	return (
		<svg viewBox="0 0 200 200" className="h-auto w-full" aria-hidden>
			{/* Tail */}
			<path
				d="M20 110 Q8 100 12 88 Q28 95 40 108 Z"
				fill={color("tail")}
				className="transition-colors duration-500"
			/>
			{/* Body / breast */}
			<ellipse
				cx="100"
				cy="118"
				rx="48"
				ry="40"
				fill={color("breast")}
				className="transition-colors duration-500"
			/>
			{/* Wing */}
			<path
				d="M70 100 Q40 95 38 120 Q55 135 85 128 Q78 110 70 100 Z"
				fill={color("wing")}
				className="transition-colors duration-500"
			/>
			{/* Head */}
			<circle
				cx="128"
				cy="78"
				r="28"
				fill={headOn ? HEAD_LIT : MUTED}
				className="transition-colors duration-500"
			/>
			{/* Eye */}
			<circle
				cx="136"
				cy="72"
				r="6"
				fill={color("eye")}
				className="transition-colors duration-500"
			/>
			<circle cx="137.5" cy="71" r="2" fill="#fff" />
			{/* Beak */}
			<path
				d="M154 78 L178 82 L154 90 Z"
				fill={color("beak")}
				className="transition-colors duration-500"
			/>
			{/* Feet */}
			<path
				d="M88 155 L82 178 M88 155 L90 178 M88 155 L96 176 M118 155 L112 178 M118 155 L120 178 M118 155 L126 176"
				stroke={color("feet")}
				strokeWidth="3.5"
				strokeLinecap="round"
				fill="none"
				className="transition-colors duration-500"
			/>
		</svg>
	);
}

/**
 * HeroMeetSparrow — text left, same bird SVG right.
 * Scroll reveals each text line and fills the matching bird part with color.
 * Completed parts stay filled; full scroll → entire bird colorful.
 */
export default function HeroMeetSparrow({
	isLight = true,
	className,
	scrollHeightVh = 280,
}) {
	const sectionRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [complete, setComplete] = useState(false);

	const bg = isLight ? "#fafaf9" : "#0a0a0a";
	const ink = isLight ? "#18181b" : "#fafafa";
	const muted = isLight ? "#71717a" : "#a1a1aa";

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const smooth = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 28,
		restDelta: 0.001,
	});

	useEffect(() => {
		const unsub = smooth.onChange((p) => {
			const clamped = Math.max(0, Math.min(1, p));
			const n = LINES.length;
			const idx = Math.min(n - 1, Math.floor(clamped * n + (clamped >= 1 ? 0 : 0.0001)));
			setActiveIndex(idx);
			setComplete(clamped >= 0.98);
		});
		return unsub;
	}, [smooth]);

	const filled = new Set(
		LINES.slice(0, complete ? LINES.length : activeIndex + 1).map((l) => l.part)
	);
	const activePart = complete ? null : LINES[activeIndex].part;
	const activeLine = LINES[activeIndex];

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Meet the sparrow"
		>
			<div
				className="sticky top-0 flex h-screen items-center overflow-hidden px-5 sm:px-10 lg:px-16"
				style={{ background: bg }}
			>
				<div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-between sm:gap-14">
					{/* Left — scroll-revealed text lines */}
					<div className="w-full max-w-md">
						<p
							className="text-[11px] font-semibold uppercase tracking-[0.28em]"
							style={{ color: muted }}
						>
							Scroll to paint
						</p>
						<h2
							className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl"
							style={{ color: ink }}
						>
							Meet the sparrow
						</h2>

						<div className="mt-8 space-y-3 text-base leading-relaxed sm:text-lg">
							{LINES.map((line, i) => {
								const lit = i <= activeIndex || complete;
								const current = i === activeIndex && !complete;
								const partColor = PARTS[line.part].fill;

								return (
									<motion.p
										key={line.part}
										className="transition-colors duration-300"
										style={{
											color: lit ? ink : `${ink}33`,
											opacity: lit ? 1 : 0.28,
										}}
										animate={
											current
												? { x: 0, opacity: 1 }
												: lit
													? { x: 0, opacity: 1 }
													: { x: -6, opacity: 0.28 }
										}
										transition={{ duration: 0.35 }}
									>
										{line.before}
										<span
											className="font-semibold underline decoration-2 underline-offset-4"
											style={{
												color: lit ? partColor : muted,
												textDecorationColor: lit ? partColor : "transparent",
											}}
										>
											{PARTS[line.part].word}
										</span>
										{line.after}
									</motion.p>
								);
							})}
						</div>

						<p
							className="mt-6 min-h-[2.5rem] font-mono text-[13px] leading-relaxed"
							style={{ color: muted }}
						>
							{complete
								? "Every line lit — the sparrow is fully colored."
								: PARTS[activeLine.part].tip}
						</p>

						{/* Progress ticks */}
						<div className="mt-6 flex items-center gap-1.5">
							{LINES.map((line, i) => {
								const on = i <= activeIndex || complete;
								const current = i === activeIndex && !complete;
								return (
									<span
										key={line.part}
										className="h-1.5 rounded-full transition-all duration-300"
										style={{
											width: current ? 22 : 8,
											background: on ? PARTS[line.part].fill : MUTED,
											opacity: on ? 1 : 0.4,
										}}
									/>
								);
							})}
						</div>
					</div>

					{/* Right — same bird SVG, fills with scroll */}
					<div className="relative w-[min(80vw,320px)] shrink-0 sm:w-[min(40vw,340px)]">
						<BirdSvg filled={filled} active={activePart} />
					</div>
				</div>
			</div>
		</section>
	);
}
