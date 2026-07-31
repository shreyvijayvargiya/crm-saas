import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_SLIDES = [
	{
		id: "vd-1",
		title: "Hacienda",
		src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1920&q=80",
		thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
		alt: "Studio portrait in yellow",
	},
	{
		id: "vd-2",
		title: "Opaline",
		src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1920&q=80",
		thumb: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=200&q=80",
		alt: "Woman with floral tattoo in soft light",
	},
	{
		id: "vd-3",
		title: "Mirage",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80",
		thumb: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80",
		alt: "Fashion editorial",
	},
	{
		id: "vd-4",
		title: "Canyon",
		src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1920&q=80",
		thumb: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
		alt: "Portrait in field",
	},
	{
		id: "vd-5",
		title: "Velvet",
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1920&q=80",
		thumb: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
		alt: "Close-up portrait",
	},
	{
		id: "vd-6",
		title: "Nocturne",
		src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1920&q=80",
		thumb: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
		alt: "Street portrait",
	},
	{
		id: "vd-7",
		title: "Ember",
		src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80",
		thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
		alt: "City portrait",
	},
];

const ease = [0.22, 1, 0.36, 1];

/**
 * HeroVerticalDock — full-viewport story hero.
 * Vertical thumbnail dock in the center; click swaps background + title
 * with Framer Motion crossfade / scale.
 */
export default function HeroVerticalDock({
	slides = DEFAULT_SLIDES,
	isLight = false,
	className,
}) {
	const list = slides.length ? slides : DEFAULT_SLIDES;
	const [activeIndex, setActiveIndex] = useState(0);
	const active = list[activeIndex];

	return (
		<section
			className={cn(
				"relative left-1/2 h-screen w-screen -translate-x-1/2 overflow-hidden",
				className
			)}
			aria-label="Vertical dock gallery"
		>
			{/* Background layer */}
			<div className="absolute inset-0">
				<AnimatePresence mode="sync" initial={false}>
					<motion.img
						key={active.id}
						src={active.src}
						alt={active.alt || active.title}
						className="absolute inset-0 h-full w-full object-cover"
						initial={{ opacity: 0, scale: 1.08 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 1.02 }}
						transition={{ duration: 0.7, ease }}
					/>
				</AnimatePresence>
				{/* Readability scrim */}
				<div
					className={cn(
						"pointer-events-none absolute inset-0",
						isLight
							? "bg-gradient-to-b from-black/25 via-black/15 to-black/40"
							: "bg-gradient-to-b from-black/35 via-black/20 to-black/50"
					)}
				/>
			</div>

			{/* Center title — behind the dock */}
			<div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
				<AnimatePresence mode="wait" initial={false}>
					<motion.h2
						key={active.id}
						initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
						animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
						exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
						transition={{ duration: 0.45, ease }}
						className="max-w-[90vw] text-center text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
						style={{ textShadow: "0 8px 40px rgba(0,0,0,0.35)" }}
					>
						{active.title}
					</motion.h2>
				</AnimatePresence>
			</div>

			{/* Vertical thumbnail dock — centered */}
			<div className="absolute inset-0 z-20 flex items-center justify-center">
				<nav
					className={cn(
						"flex max-h-[70vh] flex-col gap-2 overflow-y-auto rounded-full border p-2 shadow-2xl backdrop-blur-xl hidescrollbar sm:gap-2.5 sm:p-2.5",
						isLight
							? "border-white/30 bg-black/35"
							: "border-white/20 bg-black/45"
					)}
					aria-label="Slide picker"
				>
					{list.map((slide, index) => {
						const isActive = index === activeIndex;
						return (
							<motion.button
								key={slide.id}
								type="button"
								onClick={() => setActiveIndex(index)}
								className={cn(
									"relative h-11 w-11 shrink-0 overflow-hidden rounded-xl outline-none sm:h-12 sm:w-12",
									"focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40"
								)}
								aria-label={`Show ${slide.title}`}
								aria-current={isActive ? "true" : undefined}
								whileHover={{ scale: 1.06 }}
								whileTap={{ scale: 0.96 }}
							>
								<img
									src={slide.thumb || slide.src}
									alt=""
									draggable={false}
									className="h-full w-full object-cover"
								/>
								{/* Active ring */}
								<motion.span
									className="pointer-events-none absolute inset-0 rounded-xl"
									animate={{
										boxShadow: isActive
											? "inset 0 0 0 2.5px #fff"
											: "inset 0 0 0 0px transparent",
										opacity: isActive ? 1 : 0.35,
									}}
									transition={{ duration: 0.25, ease }}
								/>
							</motion.button>
						);
					})}
				</nav>
			</div>
		</section>
	);
}
