import React, { useMemo, useState } from "react";
import {
	motion,
	useMotionValue,
	useTransform,
	AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Heart, X } from "lucide-react";

/** Unsplash gradient / abstract color fields */
const DEFAULT_CARDS = [
	{
		id: "sw-1",
		src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80",
		alt: "Soft rainbow gradient",
		title: "Aurora",
		subtitle: "Warm light, soft fade",
	},
	{
		id: "sw-2",
		src: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=900&q=80",
		alt: "Purple blue gradient",
		title: "Violet dusk",
		subtitle: "Deep indigo wash",
	},
	{
		id: "sw-3",
		src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
		alt: "Abstract fluid gradient",
		title: "Fluid form",
		subtitle: "Painted color fields",
	},
	{
		id: "sw-4",
		src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=900&q=80",
		alt: "Geometric gradient shapes",
		title: "Geometry",
		subtitle: "Bold color blocks",
	},
	{
		id: "sw-5",
		src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=900&q=80",
		alt: "Neon light trails",
		title: "Neon trails",
		subtitle: "Electric motion blur",
	},
	{
		id: "sw-6",
		src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=80",
		alt: "3D fluid render",
		title: "Silk wave",
		subtitle: "Liquid chrome glow",
	},
	{
		id: "sw-7",
		src: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=900&q=80",
		alt: "Pastel gradient waves",
		title: "Pastel tide",
		subtitle: "Candy soft tones",
	},
];

const SWIPE_THRESHOLD = 110;
const EXIT_X = 480;
const STACK_ROTATIONS = [-7, 5, -4, 6, -3, 4, -5];

function SwipeCard({ card, stackIndex, isTop, onSwipe, isLight, exitDirection }) {
	const x = useMotionValue(0);
	const dragRotate = useTransform(x, [-220, 0, 220], [-16, 0, 16]);
	const likeOpacity = useTransform(x, [36, 110], [0, 1]);
	const nopeOpacity = useTransform(x, [-110, -36], [1, 0]);

	const baseRotate = STACK_ROTATIONS[stackIndex % STACK_ROTATIONS.length] || 0;
	const scale = 1 - stackIndex * 0.045;
	const y = stackIndex * 12;

	const handleDragEnd = (_, info) => {
		if (!isTop) return;
		const { offset, velocity } = info;
		if (offset.x > SWIPE_THRESHOLD || velocity.x > 550) {
			onSwipe("right");
		} else if (offset.x < -SWIPE_THRESHOLD || velocity.x < -550) {
			onSwipe("left");
		}
	};

	const exitX =
		Math.abs(x.get()) > 24
			? x.get() > 0
				? EXIT_X
				: -EXIT_X
			: exitDirection === "right"
				? EXIT_X
				: -EXIT_X;

	return (
		<motion.div
			className={cn(
				"absolute inset-0 origin-bottom overflow-hidden rounded-3xl border shadow-2xl",
				isLight
					? "border-white/80 bg-white shadow-zinc-400/35"
					: "border-white/10 bg-zinc-900 shadow-black/55",
				isTop ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
			)}
			style={{
				x: isTop ? x : 0,
				rotate: isTop ? dragRotate : baseRotate,
				zIndex: 30 - stackIndex,
			}}
			initial={false}
			animate={{
				scale,
				y,
				rotate: isTop ? undefined : baseRotate,
				opacity: 1,
			}}
			exit={{
				x: exitX,
				opacity: 0,
				rotate: exitX > 0 ? 22 : -22,
				transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
			}}
			transition={{ type: "spring", stiffness: 280, damping: 26 }}
			drag={isTop ? "x" : false}
			dragConstraints={{ left: 0, right: 0 }}
			dragElastic={0.92}
			onDragEnd={handleDragEnd}
		>
			<img
				src={card.src}
				alt={card.alt || card.title}
				draggable={false}
				className="pointer-events-none h-full w-full select-none object-cover"
			/>

			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/20" />

			{isTop && (
				<>
					<motion.div
						style={{ opacity: likeOpacity }}
						className="pointer-events-none absolute left-5 top-6 -rotate-12 rounded-lg border-[3px] border-emerald-400 px-3 py-1 text-lg font-black uppercase tracking-wider text-emerald-400"
					>
						Like
					</motion.div>
					<motion.div
						style={{ opacity: nopeOpacity }}
						className="pointer-events-none absolute right-5 top-6 rotate-12 rounded-lg border-[3px] border-rose-400 px-3 py-1 text-lg font-black uppercase tracking-wider text-rose-400"
					>
						Nope
					</motion.div>
				</>
			)}

			<div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-6">
				<p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
					{card.subtitle}
				</p>
				<h3 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
					{card.title}
				</h3>
			</div>
		</motion.div>
	);
}

/**
 * HeroSwipeCards — Bumble-style swipe deck of Unsplash gradients.
 * Stacked with index-based rotation; swipe L/R (or buttons) for next;
 * restarts from the beginning after the last card.
 */
export default function HeroSwipeCards({
	cards = DEFAULT_CARDS,
	isLight = false,
	className,
}) {
	const deck = useMemo(() => (cards.length ? cards : DEFAULT_CARDS), [cards]);
	const [index, setIndex] = useState(0);
	const [lastDir, setLastDir] = useState("left");
	const [hasSwiped, setHasSwiped] = useState(false);

	/** Top card + up to 2 behind (with wrap for seamless loop peek). */
	const stack = useMemo(() => {
		const depth = Math.min(3, deck.length);
		return Array.from({ length: depth }, (_, i) => ({
			card: deck[(index + i) % deck.length],
			stackIndex: i,
			key: `${deck[(index + i) % deck.length].id}-${index}-${i}`,
		}));
	}, [deck, index]);

	const advance = (direction) => {
		setLastDir(direction);
		setHasSwiped(true);
		setIndex((prev) => (prev + 1) % deck.length);
	};

	const top = stack[0];

	return (
		<section
			className={cn(
				"relative mx-auto flex w-full max-w-md flex-col items-center px-4 py-10 sm:py-14",
				className
			)}
			aria-label="Swipeable gradient cards"
		>
			<p
				className={cn(
					"mb-2 text-xs font-semibold uppercase tracking-[0.18em]",
					isLight ? "text-pink-600" : "text-pink-400"
				)}
			>
				Swipe deck
			</p>
			<h2
				className={cn(
					"mb-8 text-center text-2xl font-bold tracking-tight sm:text-3xl",
					isLight ? "text-zinc-950" : "text-white"
				)}
			>
				Swipe gradients
			</h2>

			<div className="relative h-[440px] w-full max-w-[320px] sm:h-[500px] sm:max-w-[340px]">
				{stack
					.slice(1)
					.reverse()
					.map(({ card, stackIndex, key }) => (
						<SwipeCard
							key={key}
							card={card}
							stackIndex={stackIndex}
							isTop={false}
							onSwipe={() => {}}
							isLight={isLight}
							exitDirection={lastDir}
						/>
					))}

				<AnimatePresence mode="wait">
					{top && (
						<SwipeCard
							key={`top-${top.card.id}-${index}`}
							card={top.card}
							stackIndex={0}
							isTop
							onSwipe={advance}
							isLight={isLight}
							exitDirection={lastDir}
						/>
					)}
				</AnimatePresence>
			</div>

			<div className="mt-8 flex items-center gap-5">
				<button
					type="button"
					onClick={() => advance("left")}
					className={cn(
						"flex h-14 w-14 items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-105 active:scale-95",
						isLight
							? "border-rose-200 bg-white text-rose-500 shadow-rose-200/50"
							: "border-rose-500/40 bg-zinc-900 text-rose-400 shadow-black/40"
					)}
					aria-label="Pass"
				>
					<X className="h-6 w-6" strokeWidth={2.5} />
				</button>
				<button
					type="button"
					onClick={() => advance("right")}
					className={cn(
						"flex h-14 w-14 items-center justify-center rounded-full border shadow-lg transition-transform hover:scale-105 active:scale-95",
						isLight
							? "border-emerald-200 bg-white text-emerald-500 shadow-emerald-200/50"
							: "border-emerald-500/40 bg-zinc-900 text-emerald-400 shadow-black/40"
					)}
					aria-label="Like"
				>
					<Heart className="h-6 w-6" fill="currentColor" />
				</button>
			</div>

			<p
				className={cn(
					"mt-4 text-center text-xs",
					isLight ? "text-zinc-500" : "text-zinc-500"
				)}
			>
				{hasSwiped
					? `${lastDir === "right" ? "Liked" : "Passed"} · `
					: "Drag left or right · "}
				{(index % deck.length) + 1} / {deck.length} · restarts at end
			</p>
		</section>
	);
}
