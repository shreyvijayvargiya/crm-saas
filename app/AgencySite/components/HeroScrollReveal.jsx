import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LucideProjector, RocketIcon, TrainFront } from "lucide-react";
import { cn } from "@/lib/utils";
import { CursorImageTrail } from "./cursor-trails";

function ScreenshotPanel({ screenshot, index, isLight, onActivate }) {
	const ref = useRef(null);
	const [expanded, setExpanded] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return undefined;

		const observer = new IntersectionObserver(
			([entry]) => {
				const visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
				setExpanded(visible);
				if (visible) onActivate(index);
			},
			{ threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [index, onActivate]);

	return (
		<div
			ref={ref}
			className="relative flex h-[135vh] items-start"
			aria-label={screenshot.label}
		>
			<div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
				<motion.div
					initial={false}
					animate={{
						scale: expanded ? 1 : 0.78,
						width: expanded ? "90vw" : "min(70vw, 52rem)",
						height: expanded ? "90vh" : "min(52vh, 26rem)",
						opacity: expanded ? 1 : 0.45,
					}}
					transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
					className={cn(
						"relative rounded-2xl overflow-hidden border shadow-2xl will-change-transform",
						isLight
							? "border-zinc-200 bg-white shadow-zinc-400/30"
							: "border-zinc-800 bg-zinc-900 shadow-black/50"
					)}
				>
					<img
						src={screenshot.src}
						alt={screenshot.alt}
						className="h-full w-full object-cover object-top rounded-2xl"
						width={1919}
						height={958}
						draggable={false}
						loading={index < 2 ? "eager" : "lazy"}
					/>
					<div
						className={cn(
							"pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
							isLight ? "from-zinc-950/20" : "from-black/45"
						)}
					/>
				</motion.div>
			</div>
		</div>
	);
}

const HEADING_WORDS = ["CRM", "for", "businesses"];

export default function HeroScrollReveal({ screenshots, isLight }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const active = screenshots[activeIndex] || screenshots[0];
	const handleActivate = useCallback((index) => {
		setActiveIndex(index);
	}, []);

	return (
		<section
			className="relative left-1/2 w-screen -translate-x-1/2"
			aria-label="CRM product scroll story"
		>
			{/* Intro heading — image cursor trail only */}
			<CursorImageTrail
				images={screenshots}
				isLight={isLight}
				className="relative flex h-screen flex-col items-center justify-center px-6 text-center"
			>
				<motion.p
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className={cn(
						"mb-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Built for <RocketIcon /> startups, <TrainFront /> agencies,{" "}
					<LucideProjector /> freelancers
				</motion.p>

				<h2 className="mx-auto max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
					{HEADING_WORDS.map((word, index) => (
						<motion.span
							key={word}
							initial={{ opacity: 0, y: 48, filter: "blur(10px)" }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							viewport={{ once: true }}
							transition={{
								duration: 0.7,
								delay: 0.12 + index * 0.14,
								ease: [0.22, 1, 0.36, 1],
							}}
							className={cn(
								"mr-[0.28em] inline-block last:mr-0",
								index === 0
									? "bg-gradient-to-br from-zinc-500 via-emerald-400 to-rose-500 bg-clip-text text-transparent"
									: isLight
										? "text-zinc-950"
										: "text-white"
							)}
						>
							{word}
						</motion.span>
					))}
				</h2>

				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.55, delay: 0.55 }}
					className={cn(
						"mx-auto mt-6 max-w-md text-sm leading-relaxed sm:text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Scroll to explore dashboards, analytics, leads, sales, and more —
					each screen opens full-bleed as it enters view.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.55, delay: 0.7 }}
					className="mt-8"
				>
					<a
						href="#crm-scroll-gallery"
						className={cn(
							"inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition hover:-translate-y-0.5",
							isLight
								? "border-zinc-300 bg-white text-zinc-800 shadow-sm hover:border-zinc-400"
								: "border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-500"
						)}
					>
						See product screens
						<ArrowRight className="h-3.5 w-3.5" />
					</a>
				</motion.div>

				<motion.div
					aria-hidden
					animate={{ y: [0, 8, 0], opacity: [0.35, 0.85, 0.35] }}
					transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
					className={cn(
						"absolute bottom-10 left-1/2 h-8 w-px -translate-x-1/2",
						isLight ? "bg-zinc-400" : "bg-zinc-600"
					)}
				/>
			</CursorImageTrail>

			{/* Gallery + sticky left-bottom caption */}
			<div id="crm-scroll-gallery" className="relative">
				<div className="pointer-events-none sticky top-1/2 z-30 flex w-full justify-center px-4 sm:px-8 -translate-y-1/2">
					<AnimatePresence exitBeforeEnter initial={false}>
						<motion.div
							key={active?.label}
							initial={{ opacity: 0, y: 16, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: -10, scale: 0.98 }}
							transition={{ duration: 0.35, ease: "easeOut" }}
							className={cn(
								"pointer-events-auto w-max max-w-[min(19rem,calc(100vw-2rem))] rounded-2xl border p-4 shadow-xl backdrop-blur-md",
								isLight
									? "border-zinc-200/90 bg-white/50 shadow-zinc-300/40"
									: "border-zinc-700/80 bg-zinc-950/50 shadow-black/40"
							)}
						>
							<p
								className={cn(
									"text-[10px] font-semibold uppercase tracking-[0.2em]",
									isLight ? "text-zinc-600" : "text-zinc-400"
								)}
							>
								{String(activeIndex + 1).padStart(2, "0")} /{" "}
								{String(screenshots.length).padStart(2, "0")}
							</p>
							<h3
								className={cn(
									"mt-1.5 text-lg font-bold tracking-tight",
									isLight ? "text-zinc-950" : "text-white"
								)}
							>
								{active?.label}
							</h3>
							<p
								className={cn(
									"mt-1.5 text-xs leading-relaxed",
									isLight ? "text-zinc-600" : "text-zinc-400"
								)}
							>
								{active?.description}
							</p>
							<Link href={active?.href || "/demo"} passHref>
								<a
									className={cn(
										"mt-3 inline-flex items-center gap-1.5 text-xs font-semibold",
										isLight ? "text-zinc-900 bg-zinc-100/90 px-3 py-2 rounded-full hover:bg-white" : "text-zinc-100 bg-zinc-900/90 px-3 py-2 rounded-full hover:bg-zinc-900/80"
									)}
								>
									Open {active?.label}
									<ArrowRight className="h-3.5 w-3.5" />
								</a>
							</Link>
						</motion.div>
					</AnimatePresence>
				</div>

				<div className="-mt-28">
					{screenshots.map((screenshot, index) => (
						<ScreenshotPanel
							key={screenshot.src}
							screenshot={screenshot}
							index={index}
							isLight={isLight}
							onActivate={handleActivate}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
