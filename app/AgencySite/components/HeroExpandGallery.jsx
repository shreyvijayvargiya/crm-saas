import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
	{
		id: "ex-1",
		number: "01",
		category: "Cycling",
		title: "Push past the climb.",
		caption:
			"Feel the road, the wind, and the rhythm of every pedal stroke on open terrain.",
		src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1400&q=80",
		alt: "Cyclist on the road",
	},
	{
		id: "ex-2",
		number: "02",
		category: "Running",
		title: "Outrun yesterday.",
		caption:
			"Miles turn into momentum when focus, breath, and stride finally align.",
		src: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1400&q=80",
		alt: "Runner on a trail",
	},
	{
		id: "ex-3",
		number: "03",
		category: "Swimming",
		title: "Find your rhythm in the deep.",
		caption:
			"When the water wraps around you and the noise falls away, the only sound left is your breath.",
		src: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1400&q=80",
		alt: "Swimmer underwater",
	},
	{
		id: "ex-4",
		number: "04",
		category: "Dance",
		title: "Move like nobody's watching.",
		caption:
			"Expression becomes freedom the moment music and motion become one language.",
		src: "https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?auto=format&fit=crop&w=1400&q=80",
		alt: "Dancer in motion",
	},
	{
		id: "ex-5",
		number: "05",
		category: "Skiing",
		title: "Carve your own line.",
		caption:
			"Speed, snow, and silence — every turn is a decision written on the mountain.",
		src: "https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1400&q=80",
		alt: "Skier on a slope",
	},
];

const ease = [0.22, 1, 0.36, 1];

/**
 * HeroExpandGallery — flex accordion image panels.
 * Click a strip to expand it; heading + caption fade in on the active card.
 */
export default function HeroExpandGallery({
	items = DEFAULT_ITEMS,
	isLight = false,
	className,
	collapsedFlex = 0.7,
	expandedFlex = 4.5,
}) {
	const list = items.length ? items : DEFAULT_ITEMS;
	const [activeIndex, setActiveIndex] = useState(
		() => Math.min(2, list.length - 1)
	);

	return (
		<section
			className={cn(
				"relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14",
				className
			)}
			aria-label="Expanding image gallery"
		>
			<div
				className={cn(
					"flex h-[420px] w-full gap-2 overflow-hidden rounded-3xl p-2 sm:h-[480px] sm:gap-3 sm:p-3 md:h-[520px]",
					isLight ? "bg-zinc-200/60" : "bg-black"
				)}
			>
				{list.map((item, index) => {
					const isActive = index === activeIndex;

					return (
						<motion.button
							key={item.id || index}
							type="button"
							onClick={() => setActiveIndex(index)}
							className={cn(
								"relative h-full min-w-0 overflow-hidden rounded-2xl text-left outline-none",
								"focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2",
								isLight
									? "focus-visible:ring-offset-zinc-100"
									: "focus-visible:ring-offset-black"
							)}
							initial={false}
							animate={{
								flexGrow: isActive ? expandedFlex : collapsedFlex,
								flexShrink: 1,
								flexBasis: 0,
							}}
							transition={{ duration: 0.55, ease }}
							aria-pressed={isActive}
							aria-label={`${item.category}: ${item.title}`}
						>
							{/* Image */}
							<img
								src={item.src}
								alt={item.alt || item.title}
								draggable={false}
								className={cn(
									"absolute inset-0 h-full w-full object-cover transition-[filter] duration-500",
									isActive
										? "grayscale-0"
										: "grayscale brightness-75"
								)}
								loading={index < 3 ? "eager" : "lazy"}
							/>

							{/* Scrims */}
							<div
								className={cn(
									"pointer-events-none absolute inset-0 transition-opacity duration-400",
									isActive
										? "bg-gradient-to-t from-black/75 via-black/20 to-black/30"
										: "bg-black/35"
								)}
							/>

							{/* Number — always visible */}
							<span
								className={cn(
									"absolute left-3 top-3 z-10 text-xs font-medium tracking-wide text-white/80 sm:left-4 sm:top-4 sm:text-sm"
								)}
							>
								{item.number || String(index + 1).padStart(2, "0")}
							</span>

							{/* Category — active only */}
							<AnimatePresence>
								{isActive && (
									<motion.span
										key="category"
										initial={{ opacity: 0, y: -8 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -6 }}
										transition={{ duration: 0.35, ease, delay: 0.08 }}
										className="absolute right-3 top-3 z-10 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/85 sm:right-4 sm:top-4 sm:text-xs"
									>
										{item.category}
									</motion.span>
								)}
							</AnimatePresence>

							{/* Heading + caption + CTA — active only */}
							<AnimatePresence>
								{isActive && (
									<motion.div
										key="copy"
										initial={{ opacity: 0, y: 18 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: 12 }}
										transition={{ duration: 0.4, ease, delay: 0.12 }}
										className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6"
									>
										<h3
											className={cn(
												"max-w-md text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-[2rem]",
												"font-serif"
											)}
											style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
										>
											{item.title}
										</h3>
										{item.caption && (
											<motion.p
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.35, ease, delay: 0.2 }}
												className="mt-2 max-w-sm text-xs leading-relaxed text-white/75 sm:text-sm"
											>
												{item.caption}
											</motion.p>
										)}
										{item.href ? (
											<motion.a
												href={item.href}
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.35, ease, delay: 0.28 }}
												onClick={(e) => e.stopPropagation()}
												className="mt-4 inline-flex items-center rounded-full border border-white/50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10"
											>
												Explore now
											</motion.a>
										) : (
											<motion.span
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.35, ease, delay: 0.28 }}
												className="mt-4 inline-flex items-center rounded-full border border-white/50 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white"
											>
												Explore now
											</motion.span>
										)}
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					);
				})}
			</div>
		</section>
	);
}
