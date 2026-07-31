import React, { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD_W_MD = 162;

const DEFAULT_ITEMS = [
	{
		id: "pf-1",
		src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
		alt: "Brand motion",
		label: "MMAC Design",
	},
	{
		id: "pf-2",
		src: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=600&q=80",
		alt: "Gradient reel",
		label: "Color study",
	},
	{
		id: "pf-3",
		src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
		alt: "Mountain reel",
		label: "Pour, Breathe",
	},
	{
		id: "pf-4",
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
		alt: "Portrait story",
		label: "Hero film",
	},
	{
		id: "pf-5",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
		alt: "Fashion vertical",
		label: "Muyal",
	},
	{
		id: "pf-6",
		src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
		alt: "Coastal clip",
		label: "Studio reel",
	},
	{
		id: "pf-7",
		src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
		alt: "Studio portrait",
		label: "Campaign",
	},
	{
		id: "pf-8",
		src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80",
		alt: "Abstract motion",
		label: "Launch",
	},
	{
		id: "pf-9",
		src: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=600&q=80",
		alt: "Pastel waves",
		label: "Brand film",
	},
];

function PhoneFace({ item, index, isLight }) {
	return (
		<>
			<img
				src={item.src}
				alt={item.alt || ""}
				className="absolute inset-0 h-full w-full object-cover"
				draggable={false}
				loading={index < 3 ? "eager" : "lazy"}
			/>
			<div
				className={cn(
					"absolute inset-0",
					isLight
						? "bg-gradient-to-t from-black/55 via-transparent to-black/10"
						: "bg-gradient-to-t from-black/65 via-transparent to-black/15"
				)}
			/>
			<div className="absolute inset-0 flex items-center justify-center">
				<span
					className={cn(
						"flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm md:h-11 md:w-11",
						isLight
							? "bg-white/90 text-zinc-900 shadow-lg"
							: "bg-white/15 text-white ring-1 ring-white/25"
					)}
				>
					<Play className="ml-0.5 h-4 w-4 fill-current" />
				</span>
			</div>
			{(item.label || item.alt) && (
				<figcaption className="absolute inset-x-0 bottom-0 px-2.5 pb-2.5 pt-7 text-left text-[10px] font-semibold tracking-wide text-white sm:px-3 sm:pb-3 sm:text-[11px]">
					{item.label || item.alt}
				</figcaption>
			)}
		</>
	);
}

function FanPhoneCard({ item, index, count, progress, isLight }) {
	const center = (count - 1) / 2;
	const offset = index - center;
	const absOff = Math.abs(offset);

	/** Fan spread driven by rotation from shared bottom pivot */
	const startRotate = offset * 11.5;
	const startRotateY = offset * -4.5;
	const endGap = offset * (CARD_W_MD * 0.92);

	const rotate = useTransform(progress, [0, 1], [startRotate, 0]);
	const rotateY = useTransform(progress, [0, 1], [startRotateY, 0]);
	const y = useTransform(progress, [0, 1], [absOff * 6, 0]);
	const scale = useTransform(progress, [0, 0.7, 1], [0.92 - absOff * 0.015, 0.97, 1]);
	const x = useTransform(progress, (p) => {
		const gap = p < 0.55 ? 0 : endGap * ((p - 0.55) / 0.45);
		return `calc(-50% + ${gap}px)`;
	});

	return (
		<motion.figure
			className={cn(
				"absolute bottom-0 left-1/2 w-[128px] overflow-hidden rounded-[1.65rem] border shadow-2xl will-change-transform sm:w-[148px] md:w-[162px]",
				isLight
					? "border-zinc-200/90 bg-white shadow-zinc-400/35"
					: "border-zinc-700/80 bg-zinc-900 shadow-black/55"
			)}
			style={{
				transformOrigin: "50% 100%",
				rotate,
				rotateY,
				x,
				y,
				scale,
				zIndex: 20 - absOff,
			}}
		>
			<div className="relative aspect-[9/16] w-full">
				<PhoneFace item={item} index={index} isLight={isLight} />
			</div>
		</motion.figure>
	);
}

/**
 * HeroPhoneFanScroll — 9 vertical phone reels on a shared bottom pivot.
 * Scroll unwinds rotation (fan → upright row). Motion is angle-first, not track drift.
 */
export default function HeroPhoneFanScroll({
	items = DEFAULT_ITEMS,
	isLight = true,
	className,
	scrollHeightVh = 300,
	headline = "We build brands that are",
	headlineAccent = "clear, cohesive, and built to last.",
}) {
	const sectionRef = useRef(null);
	const list = useMemo(
		() => (items.length ? items : DEFAULT_ITEMS).slice(0, 9),
		[items]
	);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const progress = useSpring(scrollYProgress, {
		stiffness: 85,
		damping: 26,
		restDelta: 0.001,
	});

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Phone fan scroll gallery"
		>
			<div
				className={cn(
					"sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4",
					isLight ? "bg-zinc-50" : "bg-zinc-950"
				)}
			>
				<div className="relative z-10 mb-6 max-w-3xl text-center sm:mb-8">
					<p
						className={cn(
							"text-[11px] font-semibold uppercase tracking-[0.2em]",
							isLight ? "text-zinc-400" : "text-zinc-500"
						)}
					>
						Phone fan
					</p>
					<h2
						className={cn(
							"mt-2 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						{headline}{" "}
						<span className={isLight ? "text-orange-600" : "text-orange-400"}>
							{headlineAccent}
						</span>
					</h2>
				</div>

				<div className="mb-5 h-1 w-36 overflow-hidden rounded-full bg-zinc-500/20 sm:mb-6 sm:w-48">
					<motion.div
						className={cn(
							"h-full origin-left rounded-full",
							isLight
								? "bg-gradient-to-r from-orange-500 to-violet-500"
								: "bg-gradient-to-r from-orange-400 to-violet-400"
						)}
						style={{ scaleX: progress }}
					/>
				</div>

				<div
					className="relative mx-auto w-full max-w-5xl"
					style={{ perspective: "1400px", perspectiveOrigin: "50% 85%" }}
				>
					<div
						className="relative mx-auto h-[min(58vh,520px)] w-full max-w-4xl"
						style={{ transformStyle: "preserve-3d" }}
					>
						{list.map((item, index) => (
							<FanPhoneCard
								key={item.id}
								item={item}
								index={index}
								count={list.length}
								progress={progress}
								isLight={isLight}
							/>
						))}
					</div>
				</div>

				<p
					className={cn(
						"relative z-10 mt-6 text-center text-xs",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					Scroll to unwind the fan · rotation → upright row
				</p>
			</div>
		</section>
	);
}
