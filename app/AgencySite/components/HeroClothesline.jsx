import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const WORKS = [
	{
		id: "noon",
		title: "NOON STUDIO",
		meta: "Identity · type",
		note: "A sun-bleached wordmark for a rooftop print shop.",
		src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "orbit",
		title: "PAPER ORBIT",
		meta: "Editorial",
		note: "Folded posters that circle a single sentence.",
		src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "glass",
		title: "GLASS MARKET",
		meta: "Campaign",
		note: "Still life of jars, tickets, and wet type.",
		src: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "ink",
		title: "INK PARADE",
		meta: "Motion",
		note: "Marching glyphs across a clothesline of frames.",
		src: "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "roof",
		title: "ROOF GARDEN",
		meta: "Website",
		note: "A quiet index of plants, tools, and weather.",
		src: "https://images.unsplash.com/photo-1466692476866-aef1dfb1e735?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "signal",
		title: "SIGNAL TOWER",
		meta: "Product",
		note: "Antenna drawings for a small radio brand.",
		src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
	},
	{
		id: "archive",
		title: "SOFT ARCHIVE",
		meta: "System",
		note: "Cards, stamps, and faded catalog numbers.",
		src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
	},
];

function Pin() {
	return (
		<svg width="22" height="28" viewBox="0 0 22 28" fill="none" aria-hidden className="drop-shadow-sm">
			<path
				d="M4 8 C4 3 18 3 18 8 L17 14 C19 16 18 20 11 26 C4 20 3 16 5 14 Z"
				fill="#d6d3d1"
				stroke="#18181b"
				strokeWidth="1.4"
				strokeLinejoin="round"
			/>
			<path d="M8 8 H14" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" />
			<circle cx="11" cy="11" r="1.4" fill="#18181b" />
		</svg>
	);
}

function HangingCard({ work, active, onSelect, index }) {
	return (
		<button
			type="button"
			onClick={() => onSelect(work.id)}
			className="relative shrink-0 outline-none"
			style={{ rotate: `${index % 2 === 0 ? -1.4 : 1.6}deg` }}
		>
			<div className="absolute left-5 top-[-18px] z-10">
				<Pin />
			</div>
			<div className="absolute right-5 top-[-18px] z-10">
				<Pin />
			</div>
			<div
				className={cn(
					"w-[168px] overflow-hidden border-[2.5px] border-zinc-900 bg-[#fafafa] text-left shadow-[3px_4px_0_rgba(24,24,27,0.12)] sm:w-[196px]",
					active && "bg-[#f3ead2]"
				)}
			>
				<div className="border-b-[2.5px] border-zinc-900 px-3 py-2">
					<p className="font-mono text-[11px] font-bold tracking-[0.08em] text-zinc-900 sm:text-xs">
						{work.title}
					</p>
					<p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">{work.meta}</p>
				</div>
				<div className="relative h-[200px] sm:h-[230px]">
					<img
						src={work.src}
						alt=""
						draggable={false}
						className={cn(
							"h-full w-full object-cover",
							active ? "grayscale-[0.25] contrast-110" : "grayscale contrast-125 opacity-90"
						)}
					/>
					<div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(24,24,27,0.04)_4px)] mix-blend-multiply" />
				</div>
			</div>
		</button>
	);
}

/**
 * HeroClothesline — sketch rooftop line with pinned project cards.
 * Vertical scroll drives -x travel + progress.
 */
export default function HeroClothesline({ isLight = true, className }) {
	const sectionRef = useRef(null);
	const trackRef = useRef(null);
	const [travelX, setTravelX] = useState(0);
	const [activeId, setActiveId] = useState(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, restDelta: 0.001 });
	const x = useTransform(smooth, [0, 1], [0, -travelX]);
	const pct = useTransform(smooth, (v) => `${Math.round(v * 100)}%`);

	const [pctLabel, setPctLabel] = useState("0%");
	useEffect(() => {
		const unsub = pct.onChange((v) => setPctLabel(v));
		return unsub;
	}, [pct]);

	useEffect(() => {
		const measure = () => {
			const track = trackRef.current;
			if (!track) return;
			setTravelX(Math.max(track.scrollWidth - window.innerWidth + 48, 0));
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);

	const active = useMemo(() => WORKS.find((w) => w.id === activeId) || null, [activeId]);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: "260vh" }}
			aria-label="Clothesline gallery"
		>
			<div
				className={cn(
					"sticky top-0 h-screen overflow-hidden",
					isLight ? "bg-zinc-50 text-zinc-900" : "bg-zinc-950 text-zinc-100"
				)}
			>
				<div className="relative z-10 flex h-full flex-col justify-center">
					<div className="mb-4 flex items-end justify-between px-6 sm:px-10">
						<div>
							<p className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">Rooftop line</p>
							<h2 className="mt-1 font-serif text-2xl tracking-tight sm:text-3xl">Pinned works</h2>
						</div>
						<div className="text-right font-mono text-[11px] tabular-nums text-zinc-500">
							<p>Scroll progress</p>
							<p className="text-sm font-semibold text-zinc-800">{pctLabel}</p>
						</div>
					</div>

					<div className="mx-6 mb-6 h-[3px] overflow-hidden rounded-full bg-zinc-900/10 sm:mx-10">
						<motion.div className="h-full origin-left bg-zinc-900" style={{ scaleX: smooth }} />
					</div>

					<div className="relative">
						<svg
							className="pointer-events-none absolute left-0 right-0 top-[10px] z-20 h-6 w-full"
							preserveAspectRatio="none"
							aria-hidden
						>
							<path
								d="M0 10 Q 80 4 160 12 T 320 10 T 480 14 T 640 8 T 800 12 T 960 9 T 1120 13 T 1280 10 T 1600 11 T 2000 10"
								fill="none"
								stroke="#18181b"
								strokeWidth="2.2"
							/>
						</svg>

						<div className="overflow-hidden pt-6">
							<motion.div
								ref={trackRef}
								style={{ x }}
								className="flex w-max items-start gap-8 px-[12vw] sm:gap-12 sm:px-[14vw]"
							>
								{WORKS.map((work, index) => (
									<HangingCard
										key={work.id}
										work={work}
										index={index}
										active={activeId === work.id}
										onSelect={(id) => setActiveId((cur) => (cur === id ? null : id))}
									/>
								))}
							</motion.div>
						</div>
					</div>
				</div>

				<AnimatePresence>
					{active ? (
						<motion.aside
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 10 }}
							className="absolute bottom-8 left-1/2 z-30 w-[min(92vw,28rem)] -translate-x-1/2 border-[2.5px] border-zinc-900 bg-[#faf7f0] p-4 shadow-[4px_5px_0_rgba(24,24,27,0.15)]"
						>
							<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{active.meta}</p>
							<h3 className="mt-1 font-serif text-xl text-zinc-900">{active.title}</h3>
							<p className="mt-2 text-sm leading-relaxed text-zinc-600">{active.note}</p>
							<button
								type="button"
								onClick={() => setActiveId(null)}
								className="mt-3 font-mono text-[11px] uppercase tracking-wider text-zinc-500 hover:text-zinc-900"
							>
								Close inspect
							</button>
						</motion.aside>
					) : null}
				</AnimatePresence>
			</div>
		</section>
	);
}
