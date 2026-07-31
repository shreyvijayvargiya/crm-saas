import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Hand } from "lucide-react";
import { cn } from "@/lib/utils";

/** Reuse portrait + gradient assets already used across AgencySite heroes */
const STREAM_IMAGES = [
	{
		id: "tc-1",
		src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
		alt: "Abstract art",
	},
	{
		id: "tc-2",
		src: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80",
		alt: "Purple gradient",
	},
	{
		id: "tc-3",
		src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80",
		alt: "Rainbow soft",
	},
	{
		id: "tc-4",
		src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=600&q=80",
		alt: "Geometry",
	},
	{
		id: "tc-5",
		src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80",
		alt: "Neon trails",
	},
	{
		id: "tc-6",
		src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=600&q=80",
		alt: "Fluid render",
	},
	{
		id: "tc-7",
		src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
		alt: "Studio portrait",
	},
	{
		id: "tc-8",
		src: "https://images.unsplash.com/photo-1529626455594-64432c6c4e1b?auto=format&fit=crop&w=600&q=80",
		alt: "Flowers portrait",
	},
	{
		id: "tc-9",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
		alt: "Fashion editorial",
	},
	{
		id: "tc-10",
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
		alt: "Close-up portrait",
	},
	{
		id: "tc-11",
		src: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=600&q=80",
		alt: "Pastel waves",
	},
	{
		id: "tc-12",
		src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
		alt: "Forest mist",
	},
];

/** Diagonal path: throw (top-left) → mid (large/sharp) → collect (bottom-right) */
const PATH = [
	{ x: 8, y: 18 },
	{ x: 22, y: 28 },
	{ x: 36, y: 40 },
	{ x: 50, y: 52 },
	{ x: 64, y: 64 },
	{ x: 78, y: 74 },
	{ x: 90, y: 84 },
];

function samplePath(t) {
	const clamped = Math.min(Math.max(t, 0), 1);
	const seg = clamped * (PATH.length - 1);
	const i = Math.floor(seg);
	const f = seg - i;
	const a = PATH[i];
	const b = PATH[Math.min(i + 1, PATH.length - 1)];
	return {
		x: a.x + (b.x - a.x) * f,
		y: a.y + (b.y - a.y) * f,
	};
}

const DURATION = 5.2;

/**
 * HeroThrowCollect — images thrown from “A” and collected by the hand
 * along a diagonal path with depth-of-field (scale + blur).
 */
export default function HeroThrowCollect({
	images = STREAM_IMAGES,
	isLight = true,
	className,
}) {
	const items = useMemo(
		() => (images.length ? images : STREAM_IMAGES),
		[images]
	);

	return (
		<section
			className={cn(
				"relative mx-auto w-full max-w-4xl overflow-hidden rounded-3xl px-4 py-10 sm:px-6 sm:py-12",
				isLight ? "bg-zinc-200/80" : "bg-zinc-900",
				className
			)}
			aria-label="Throw and collect image stream"
		>
			<div className="relative mx-auto aspect-[16/10] w-full max-w-3xl sm:aspect-[2/1]">
				{/* Emitter — A */}
				<div
					className={cn(
						"absolute left-[4%] top-[12%] z-20 flex h-10 w-10 items-center justify-center rounded-lg shadow-lg sm:h-11 sm:w-11",
						isLight ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
					)}
					aria-hidden
				>
					<span className="text-sm font-bold tracking-tight">A</span>
				</div>

				{/* Collector — hand */}
				<div
					className={cn(
						"absolute bottom-[8%] right-[4%] z-20 flex h-10 w-10 items-center justify-center rounded-lg shadow-lg sm:h-11 sm:w-11",
						isLight ? "bg-zinc-950 text-white" : "bg-white text-zinc-950"
					)}
					aria-hidden
				>
					<Hand className="h-5 w-5" strokeWidth={2} />
				</div>

				{/* Soft orbs near ends for motion hints */}
				{[0.05, 0.12, 0.88, 0.95].map((t, i) => {
					const p = samplePath(t);
					return (
						<motion.div
							key={`orb-${i}`}
							className="pointer-events-none absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-400/70"
							style={{
								left: `${p.x}%`,
								top: `${p.y}%`,
								filter: `blur(${6 + i}px)`,
							}}
							animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.8, 1.15, 0.8] }}
							transition={{
								duration: 2.4,
								repeat: Infinity,
								delay: i * 0.25,
								ease: "easeInOut",
							}}
						/>
					);
				})}

				{/* Streaming cards */}
				{items.map((item, index) => {
					const delay = (index / items.length) * DURATION;

					return (
						<motion.div
							key={item.id}
							className="pointer-events-none absolute h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-lg sm:h-28 sm:w-28 md:h-32 md:w-32"
							style={{ left: "8%", top: "18%", zIndex: 10 }}
							animate={{
								left: PATH.map((p) => `${p.x}%`),
								top: PATH.map((p) => `${p.y}%`),
								scale: [0.28, 0.55, 1.05, 1.15, 1.05, 0.55, 0.28],
								opacity: [0, 0.85, 1, 1, 1, 0.85, 0],
								filter: [
									"blur(10px)",
									"blur(6px)",
									"blur(0px)",
									"blur(0px)",
									"blur(0px)",
									"blur(6px)",
									"blur(10px)",
								],
								rotate: [-8, -4, 2, 4, -2, 6, 0],
							}}
							transition={{
								duration: DURATION,
								repeat: Infinity,
								ease: "linear",
								delay,
								times: [0, 0.15, 0.35, 0.5, 0.65, 0.85, 1],
							}}
						>
							<img
								src={item.src}
								alt={item.alt}
								draggable={false}
								className="h-full w-full object-cover"
							/>
						</motion.div>
					);
				})}
			</div>

			<p
				className={cn(
					"mt-4 text-center text-xs font-medium uppercase tracking-[0.18em]",
					isLight ? "text-zinc-500" : "text-zinc-500"
				)}
			>
				Throw · Stream · Collect
			</p>
		</section>
	);
}
