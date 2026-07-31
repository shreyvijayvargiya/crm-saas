import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Default Unsplash images — portrait-ish crop for the fan cards. */
const DEFAULT_IMAGES = [
	{
		id: "fan-1",
		src: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=600&q=80",
		alt: "Portrait with flowers",
	},
	{
		id: "fan-2",
		src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
		alt: "Studio portrait",
	},
	{
		id: "fan-3",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
		alt: "Fashion editorial",
	},
	{
		id: "fan-4",
		src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
		alt: "Portrait in field",
	},
	{
		id: "fan-5",
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
		alt: "Close-up portrait",
	},
	{
		id: "fan-6",
		src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
		alt: "Street portrait",
	},
	{
		id: "fan-7",
		src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
		alt: "City portrait",
	},
];

const ROTATE_STEP = 8;
const X_STEP = 52;
const Y_ARC = 10;

/**
 * HeroFanStack — fanned image deck.
 * Cards sit in a flex arc; click any card to bring it to center (0°),
 * with rotate / translate / z-index animated via Framer Motion.
 */
export default function HeroFanStack({
	images = DEFAULT_IMAGES,
	isLight = false,
	className,
}) {
	const items = useMemo(
		() => (images.length ? images : DEFAULT_IMAGES).slice(0, 9),
		[images]
	);
	const [activeIndex, setActiveIndex] = useState(
		() => Math.floor(items.length / 2)
	);

	return (
		<section
			className={cn(
				"relative mx-auto w-full max-w-4xl overflow-visible px-4 py-10 sm:py-14",
				className
			)}
			aria-label="Image fan gallery"
		>
			{/* Soft gradient backdrop like the reference */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 -z-10 rounded-3xl opacity-80 blur-2xl"
				style={{
					background: isLight
						? "radial-gradient(ellipse at 20% 80%, rgba(251,146,60,0.35), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(45,212,191,0.3), transparent 55%)"
						: "radial-gradient(ellipse at 20% 80%, rgba(251,146,60,0.25), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(20,184,166,0.22), transparent 55%)",
				}}
			/>

			<div className="relative mx-auto flex h-[320px] w-full items-center justify-center sm:h-[400px] md:h-[440px]">
				{items.map((item, index) => {
					const offset = index - activeIndex;
					const abs = Math.abs(offset);
					const rotate = offset * ROTATE_STEP;
					const x = offset * X_STEP;
					const y = abs * Y_ARC;
					const scale = offset === 0 ? 1 : Math.max(0.86, 1 - abs * 0.04);
					const zIndex = items.length - abs;

					return (
						<motion.button
							key={item.id || item.src || index}
							type="button"
							layout
							onClick={() => setActiveIndex(index)}
							className={cn(
								"absolute origin-bottom overflow-hidden rounded-2xl border shadow-xl outline-none",
								"focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2",
								offset === 0
									? "cursor-default ring-2 ring-white/40"
									: "cursor-pointer hover:brightness-105",
								isLight
									? "border-white/80 bg-zinc-100 shadow-zinc-400/40"
									: "border-white/10 bg-zinc-900 shadow-black/50"
							)}
							style={{ zIndex }}
							initial={false}
							animate={{
								x,
								y,
								rotate,
								scale,
								opacity: abs > 4 ? 0.35 : 1,
							}}
							transition={{
								type: "spring",
								stiffness: 320,
								damping: 28,
								mass: 0.85,
							}}
							whileHover={
								offset !== 0
									? { scale: scale * 1.03, y: y - 6 }
									: undefined
							}
							whileTap={{ scale: scale * 0.98 }}
							aria-label={
								offset === 0
									? `${item.alt || "Image"} (active)`
									: `Show ${item.alt || "image"}`
							}
							aria-current={offset === 0 ? "true" : undefined}
						>
							<img
								src={item.src}
								alt={item.alt || ""}
								draggable={false}
								className="h-[240px] w-[160px] object-cover sm:h-[300px] sm:w-[200px] md:h-[340px] md:w-[220px]"
								loading="lazy"
							/>
						</motion.button>
					);
				})}
			</div>

			{/* Dot indicators */}
			<div className="mt-6 flex items-center justify-center gap-2">
				{items.map((item, index) => (
					<button
						key={`dot-${item.id || index}`}
						type="button"
						onClick={() => setActiveIndex(index)}
						className={cn(
							"h-2 rounded-full transition-all duration-300",
							index === activeIndex
								? "w-6 bg-orange-500"
								: isLight
									? "w-2 bg-zinc-300 hover:bg-zinc-400"
									: "w-2 bg-zinc-600 hover:bg-zinc-500"
						)}
						aria-label={`Go to image ${index + 1}`}
					/>
				))}
			</div>
		</section>
	);
}
