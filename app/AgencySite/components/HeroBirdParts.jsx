import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PARTS = {
	beak: {
		word: "beak",
		fill: "#f59e0b",
		tip: "Beak — short and stout for cracking seeds.",
		cx: "62%",
		cy: "38%",
	},
	eye: {
		word: "eye",
		fill: "#0ea5e9",
		tip: "Eye — wide field of view to spot movement.",
		cx: "48%",
		cy: "32%",
	},
	wing: {
		word: "wing",
		fill: "#8b5cf6",
		tip: "Wing — primary feathers drive lift on takeoff.",
		cx: "38%",
		cy: "52%",
	},
	breast: {
		word: "breast",
		fill: "#f43f5e",
		tip: "Breast — warm plumage for insulation.",
		cx: "52%",
		cy: "58%",
	},
	tail: {
		word: "tail",
		fill: "#14b8a6",
		tip: "Tail — steers and brakes in short flights.",
		cx: "18%",
		cy: "62%",
	},
	feet: {
		word: "feet",
		fill: "#eab308",
		tip: "Feet — perching grip with three toes forward.",
		cx: "55%",
		cy: "82%",
	},
};

const LINES = [
	{ before: "Watch the ", part: "beak", after: " tip seed into the air," },
	{ before: "then catch the bright ", part: "eye", after: " tracking crumbs," },
	{ before: "feel the ", part: "wing", after: " fold tight against the breeze," },
	{ before: "the warm ", part: "breast", after: " holding steady heat," },
	{ before: "a fan of ", part: "tail", after: " feathers for balance," },
	{ before: "and tiny ", part: "feet", after: " locked on the branch." },
];

function BirdSvg({ active }) {
	const base = "#d4d4d8";
	const fill = (key) => (active === key ? PARTS[key].fill : base);

	return (
		<svg viewBox="0 0 200 200" className="h-auto w-full" aria-hidden>
			{/* Tail */}
			<path
				d="M20 110 Q8 100 12 88 Q28 95 40 108 Z"
				fill={fill("tail")}
				className="transition-colors duration-300"
			/>
			{/* Body / breast */}
			<ellipse
				cx="100"
				cy="118"
				rx="48"
				ry="40"
				fill={fill("breast")}
				className="transition-colors duration-300"
			/>
			{/* Wing */}
			<path
				d="M70 100 Q40 95 38 120 Q55 135 85 128 Q78 110 70 100 Z"
				fill={fill("wing")}
				className="transition-colors duration-300"
			/>
			{/* Head */}
			<circle
				cx="128"
				cy="78"
				r="28"
				fill={active === "eye" || active === "beak" ? "#e4e4e7" : base}
				className="transition-colors duration-300"
			/>
			{/* Eye */}
			<circle
				cx="136"
				cy="72"
				r="6"
				fill={fill("eye")}
				className="transition-colors duration-300"
			/>
			<circle cx="137.5" cy="71" r="2" fill="#fff" />
			{/* Beak */}
			<path
				d="M154 78 L178 82 L154 90 Z"
				fill={fill("beak")}
				className="transition-colors duration-300"
			/>
			{/* Feet */}
			<path
				d="M88 155 L82 178 M88 155 L90 178 M88 155 L96 176 M118 155 L112 178 M118 155 L120 178 M118 155 L126 176"
				stroke={fill("feet")}
				strokeWidth="3.5"
				strokeLinecap="round"
				fill="none"
				className="transition-colors duration-300"
			/>
		</svg>
	);
}

/**
 * HeroBirdParts — paragraph with blue hot-words; hover paints bird parts + tooltip.
 */
export default function HeroBirdParts({ className }) {
	const [active, setActive] = useState(null);
	const part = active ? PARTS[active] : null;

	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2 overflow-hidden",
				className
			)}
			aria-label="Bird anatomy hover"
		>
			<div className="flex min-h-[min(88vh,680px)] flex-col items-center justify-center gap-10 bg-[#fafaf9] px-5 py-16 sm:flex-row sm:gap-14 sm:px-12">
				{/* Copy */}
				<div className="max-w-md">
					<p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
						Field notes
					</p>
					<h2 className="mt-2 font-serif text-3xl tracking-tight text-zinc-900">
						Meet the sparrow
					</h2>
					<p className="mt-6 space-y-1 text-base leading-relaxed text-zinc-600 sm:text-lg">
						{LINES.map((line) => (
							<span key={line.part} className="block">
								{line.before}
								<button
									type="button"
									className={cn(
										"font-semibold underline decoration-2 underline-offset-4 transition",
										active === line.part
											? "text-sky-600 decoration-sky-600"
											: "text-sky-500 decoration-sky-300 hover:text-sky-700"
									)}
									onMouseEnter={() => setActive(line.part)}
									onMouseLeave={() => setActive(null)}
									onFocus={() => setActive(line.part)}
									onBlur={() => setActive(null)}
								>
									{PARTS[line.part].word}
								</button>
								{line.after}
							</span>
						))}
					</p>
				</div>

				{/* Bird */}
				<div className="relative w-[min(80vw,300px)]">
					<BirdSvg active={active} />
					<AnimatePresence>
						{part ? (
							<motion.div
								key={part.word}
								initial={{ opacity: 0, y: 6 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 4 }}
								className="pointer-events-none absolute z-20 w-[min(70vw,180px)] -translate-x-1/2 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-center text-[12px] font-medium leading-snug text-zinc-700 shadow-lg"
								style={{ left: part.cx, top: part.cy, marginTop: "-4.5rem" }}
							>
								{part.tip}
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
