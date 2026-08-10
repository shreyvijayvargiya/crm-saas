import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const MARKERS = [
	{
		id: "nuptse",
		label: "Nuptse",
		meta: "7,861 m",
		blurb: "The dark ridge that walls the Western Cwm.",
		x: "14%",
		y: "48%",
		at: 0.12,
		rotate: -4,
	},
	{
		id: "icefall",
		label: "Khumbu Icefall",
		meta: "Route start",
		blurb: "Broken glacier where every climb begins to feel real.",
		x: "36%",
		y: "70%",
		at: 0.28,
		rotate: 3,
	},
	{
		id: "cwm",
		label: "Western Cwm",
		meta: "Valley of silence",
		blurb: "A white amphitheater between Everest, Lhotse, and Nuptse.",
		x: "48%",
		y: "58%",
		at: 0.45,
		rotate: -2,
	},
	{
		id: "lhotse",
		label: "Lhotse",
		meta: "8,516 m",
		blurb: "Everest’s sharp southern neighbor — the fourth highest peak.",
		x: "68%",
		y: "42%",
		at: 0.62,
		rotate: 5,
	},
	{
		id: "plume",
		label: "Summit plume",
		meta: "Jet stream",
		blurb: "Snow ripped off the top when winds cross 100+ km/h.",
		x: "58%",
		y: "26%",
		at: 0.78,
		rotate: -3,
	},
	{
		id: "everest",
		label: "Mount Everest",
		meta: "8,848.86 m",
		blurb: "Sagarmatha · Chomolungma — the roof of the world.",
		x: "55%",
		y: "32%",
		at: 0.9,
		rotate: 2,
	},
];

const ASCII_CHARS = " .:-=+*#%@";

function buildAsciiField(cols = 72, rows = 40) {
	const lines = [];
	for (let r = 0; r < rows; r++) {
		let line = "";
		for (let c = 0; c < cols; c++) {
			const n =
				Math.sin(r * 0.38 + c * 0.27) * 0.5 +
				Math.cos(c * 0.19 - r * 0.21) * 0.5;
			const idx = Math.floor(((n + 1) / 2) * (ASCII_CHARS.length - 1));
			line += ASCII_CHARS[idx];
		}
		lines.push(line);
	}
	return lines.join("\n");
}

const ASCII_FIELD = buildAsciiField();

function PaperMarker({ m, hot, on }) {
	return (
		<div className="absolute" style={{ left: m.x, top: m.y }}>
			<AnimatePresence>
				{on ? (
					<motion.div
						initial={{ opacity: 0, y: -12 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -8 }}
						transition={{ type: "spring", stiffness: 280, damping: 22 }}
						className="relative -translate-x-1/2"
					>
						{/* Pin head */}
						<span
							className={cn(
								"relative z-20 mx-auto block h-3 w-3 rounded-full border-2 shadow-md",
								hot
									? "border-[#f4efe6] bg-[#c45c4a]"
									: "border-white/70 bg-white/50"
							)}
						>
							{hot ? (
								<span className="absolute inset-0 animate-ping rounded-full bg-[#c45c4a]/40" />
							) : null}
						</span>

						{/* String */}
						<div
							className="mx-auto h-7 w-px origin-top bg-gradient-to-b from-[#c45c4a]/80 to-[#c45c4a]/20"
							aria-hidden
						/>

						{/* Hanging paper card */}
						<motion.div
							initial={false}
							animate={
								hot
									? { rotate: [m.rotate - 1.5, m.rotate + 2, m.rotate - 1.5] }
									: { rotate: m.rotate }
							}
							transition={
								hot
									? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
									: { duration: 0.35 }
							}
							className={cn(
								"relative w-[min(68vw,200px)] origin-top rounded-[2px] border px-3 py-2.5 shadow-[2px_6px_18px_-4px_rgba(0,0,0,0.45)]",
								hot
									? "border-[#d4cfc4] bg-[#f7f2e8] text-[#1c2430]"
									: "border-white/30 bg-[#f7f2e8]/75 text-[#1c2430]/70"
							)}
						>
							<span
								className="absolute -top-1 left-1/2 h-2 w-8 -translate-x-1/2 rounded-[1px] bg-[#e8e0d0]/90 shadow-sm"
								aria-hidden
							/>
							<p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#6b7c8f]">
								{m.meta}
							</p>
							<p className="mt-0.5 font-serif text-[13px] font-semibold tracking-tight">
								{m.label}
							</p>
							{hot ? (
								<p className="mt-1.5 text-[11px] leading-snug text-[#3d4a5c]">
									{m.blurb}
								</p>
							) : null}
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}

/**
 * HeroEverestScroll — cool ASCII-blurred Everest pan; paper hang markers.
 */
export default function HeroEverestScroll({ className }) {
	const sectionRef = useRef(null);
	const trackRef = useRef(null);
	const [progress, setProgress] = useState(0);
	const [activeId, setActiveId] = useState(null);
	const [travelX, setTravelX] = useState(0);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	const smooth = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 30,
		restDelta: 0.001,
	});

	const imgX = useTransform(smooth, [0, 1], [0, -travelX]);
	const titleOpacity = useTransform(smooth, [0, 0.15], [1, 0]);

	useEffect(() => {
		const measure = () => {
			const track = trackRef.current;
			if (!track) return;
			const overflow = Math.max(track.scrollWidth - window.innerWidth, 0);
			setTravelX(overflow);
		};
		measure();
		window.addEventListener("resize", measure);
		const img = trackRef.current?.querySelector("img");
		img?.addEventListener("load", measure);
		return () => {
			window.removeEventListener("resize", measure);
			img?.removeEventListener("load", measure);
		};
	}, []);

	useEffect(() => {
		const unsub = smooth.onChange((v) => {
			setProgress(v);
			const visible = [...MARKERS].reverse().find((m) => v >= m.at);
			setActiveId(visible?.id || null);
		});
		return unsub;
	}, [smooth]);

	const pct = Math.round(progress * 100);
	const active = MARKERS.find((m) => m.id === activeId);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: "300vh" }}
			aria-label="Mount Everest scroll story"
		>
			<div className="sticky top-0 h-screen overflow-hidden bg-[#071018]">
				<motion.div
					ref={trackRef}
					className="absolute inset-y-0 left-0 flex h-full will-change-transform"
					style={{ x: imgX }}
				>
					<div className="relative h-full" style={{ minWidth: "175vw" }}>
						<img
							src="/componentry/everest.jpg"
							alt="Mount Everest panorama"
							draggable={false}
							decoding="async"
							className="h-full w-full max-w-none select-none object-cover object-center"
							style={{
								filter:
									"blur(1.4px) contrast(1.15) saturate(0.55) brightness(0.85) hue-rotate(195deg)",
							}}
						/>

						{/* Cool cyan wash */}
						<div
							className="pointer-events-none absolute inset-0 bg-[#0a2a3d]/45 mix-blend-multiply"
							aria-hidden
						/>
						<div
							className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6ec8ff]/15 via-transparent to-[#041018]/70"
							aria-hidden
						/>

						{/* ASCII nature overlay */}
						<pre
							className="pointer-events-none absolute inset-0 overflow-hidden whitespace-pre font-mono text-[9px] leading-[9px] tracking-tight text-cyan-100/25 mix-blend-overlay sm:text-[10px] sm:leading-[10px]"
							aria-hidden
						>
							{ASCII_FIELD}
							{"\n"}
							{ASCII_FIELD}
						</pre>

						{/* Soft pixel / scan feel */}
						<div
							className="pointer-events-none absolute inset-0 opacity-[0.12]"
							style={{
								backgroundImage:
									"repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.35) 2px, rgba(0,0,0,0.35) 3px)",
							}}
							aria-hidden
						/>

						<div className="pointer-events-none absolute inset-0 z-20">
							{MARKERS.map((m) => (
								<PaperMarker
									key={m.id}
									m={m}
									on={progress >= m.at - 0.04}
									hot={activeId === m.id}
								/>
							))}
						</div>
					</div>
				</motion.div>

				<div
					className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#041018]/90 via-transparent to-[#041018]/40"
					aria-hidden
				/>

				<motion.div
					style={{ opacity: titleOpacity }}
					className="absolute inset-x-0 top-[14%] z-30 px-6 text-center text-white"
				>
					<p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/70">
						Himalaya · ascii survey
					</p>
					<h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-6xl">
						Mount Everest
					</h2>
					<p className="mx-auto mt-3 max-w-md text-sm text-white/65 sm:text-base">
						Scroll to pan — field notes hang from the ridge.
					</p>
				</motion.div>

				<div className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between gap-4 px-5 pb-7 sm:px-10">
					<div className="min-w-0 rounded-sm border border-white/10 bg-[#0a1520]/70 px-4 py-3 font-mono backdrop-blur-sm">
						<p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/70">
							Field note
						</p>
						<p className="mt-0.5 truncate text-sm font-semibold text-white">
							{active ? active.label : "Approach from the west"}
						</p>
						<p className="mt-0.5 text-[11px] text-white/55">
							{active ? active.meta : "Pan begins"}
						</p>
					</div>

					<div className="shrink-0 rounded-sm border border-white/10 bg-[#0a1520]/70 px-4 py-3 text-right font-mono backdrop-blur-sm">
						<p className="text-[11px] tabular-nums text-white/60">Travel</p>
						<p className="text-lg font-semibold tabular-nums text-white">{pct}%</p>
						<div className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-white/15">
							<motion.div
								className="h-full origin-left rounded-full bg-cyan-300/80"
								style={{ scaleX: smooth }}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
