import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Each scene: Tailwind bg + text colors, headline, and exit→enter transition kind.
 * Transitions: wipe | swipe | doors | pixels | stagger | blend | mix
 */
const DEFAULT_SCENES = [
	{
		id: "s1",
		text: "Build.",
		bg: "bg-zinc-950",
		fg: "text-zinc-50",
		transition: "wipe",
	},
	{
		id: "s2",
		text: "Ship.",
		bg: "bg-orange-500",
		fg: "text-white",
		transition: "doors",
	},
	{
		id: "s3",
		text: "Scale.",
		bg: "bg-emerald-500",
		fg: "text-emerald-950",
		transition: "swipe",
	},
	{
		id: "s4",
		text: "Automate.",
		bg: "bg-violet-600",
		fg: "text-violet-100",
		transition: "pixels",
	},
	{
		id: "s5",
		text: "Close.",
		bg: "bg-rose-500",
		fg: "text-rose-50",
		transition: "stagger",
	},
	{
		id: "s6",
		text: "Repeat.",
		bg: "bg-sky-400",
		fg: "text-sky-950",
		transition: "blend",
	},
	{
		id: "s7",
		text: "CRM.",
		bg: "bg-amber-300",
		fg: "text-amber-950",
		transition: "mix",
	},
	{
		id: "s8",
		text: "SaaSCRM",
		bg: "bg-indigo-950",
		fg: "text-indigo-200",
		transition: "wipe",
	},
];

const HOLD_MS = 2200;
const ease = [0.76, 0, 0.24, 1];

function SceneText({ text, fg, variant }) {
	if (variant === "stagger") {
		const chars = text.split("");
		return (
			<span className={cn("inline-flex flex-wrap justify-center", fg)}>
				{chars.map((ch, i) => (
					<motion.span
						key={`${ch}-${i}`}
						className="inline-block"
						initial={{ y: "110%", opacity: 0, rotate: 8 }}
						animate={{ y: "0%", opacity: 1, rotate: 0 }}
						exit={{ y: "-110%", opacity: 0, rotate: -6 }}
						transition={{
							duration: 0.55,
							ease,
							delay: 0.08 + i * 0.045,
						}}
					>
						{ch === " " ? "\u00A0" : ch}
					</motion.span>
				))}
			</span>
		);
	}

	if (variant === "pixels") {
		return (
			<motion.span
				className={cn("block", fg)}
				initial={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
				animate={{
					opacity: 1,
					scale: 1,
					filter: "blur(0px)",
				}}
				exit={{
					opacity: 0,
					scale: 0.92,
					filter: "blur(10px)",
				}}
				transition={{ duration: 0.7, ease }}
				style={{ imageRendering: "pixelated" }}
			>
				{text}
			</motion.span>
		);
	}

	return (
		<motion.span
			className={cn("block", fg)}
			initial={{ opacity: 0, y: 24 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -16 }}
			transition={{ duration: 0.5, ease, delay: 0.12 }}
		>
			{text}
		</motion.span>
	);
}

/** Overlay layers that sell the transition type while the next scene mounts */
function TransitionOverlay({ kind, bgClass }) {
	if (kind === "wipe") {
		return (
			<motion.div
				className={cn("absolute inset-0 z-30", bgClass)}
				initial={{ clipPath: "inset(0 0 0 0)" }}
				animate={{ clipPath: "inset(0 0 0 100%)" }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.75, ease }}
			/>
		);
	}

	if (kind === "doors") {
		return (
			<>
				<motion.div
					className={cn("absolute inset-y-0 left-0 z-30 w-1/2", bgClass)}
					initial={{ x: "0%" }}
					animate={{ x: "-100%" }}
					transition={{ duration: 0.7, ease }}
				/>
				<motion.div
					className={cn("absolute inset-y-0 right-0 z-30 w-1/2", bgClass)}
					initial={{ x: "0%" }}
					animate={{ x: "100%" }}
					transition={{ duration: 0.7, ease }}
				/>
			</>
		);
	}

	if (kind === "swipe") {
		return (
			<motion.div
				className={cn("absolute inset-0 z-30", bgClass)}
				initial={{ x: "0%" }}
				animate={{ x: "-100%" }}
				transition={{ duration: 0.65, ease }}
			/>
		);
	}

	if (kind === "pixels") {
		const cells = Array.from({ length: 48 }, (_, i) => i);
		return (
			<div className="absolute inset-0 z-30 grid grid-cols-8 grid-rows-6">
				{cells.map((i) => (
					<motion.div
						key={i}
						className={cn(bgClass)}
						initial={{ opacity: 1, scale: 1 }}
						animate={{ opacity: 0, scale: 0.6 }}
						transition={{
							duration: 0.35,
							ease,
							delay: (i % 8) * 0.03 + Math.floor(i / 8) * 0.04,
						}}
					/>
				))}
			</div>
		);
	}

	if (kind === "mix") {
		return (
			<>
				<motion.div
					className={cn("absolute inset-0 z-30 mix-blend-multiply", bgClass)}
					initial={{ opacity: 1, scale: 1 }}
					animate={{ opacity: 0, scale: 1.2 }}
					transition={{ duration: 0.8, ease }}
				/>
				<motion.div
					className="absolute inset-0 z-30 bg-white mix-blend-overlay"
					initial={{ opacity: 0.5 }}
					animate={{ opacity: 0 }}
					transition={{ duration: 0.8, ease }}
				/>
			</>
		);
	}

	if (kind === "blend") {
		return (
			<motion.div
				className={cn("absolute inset-0 z-30", bgClass)}
				initial={{ opacity: 1, filter: "blur(0px)" }}
				animate={{ opacity: 0, filter: "blur(24px)" }}
				transition={{ duration: 0.9, ease }}
			/>
		);
	}

	/* stagger — soft curtain strips */
	return (
		<div className="absolute inset-0 z-30 flex">
			{Array.from({ length: 6 }, (_, i) => (
				<motion.div
					key={i}
					className={cn("h-full flex-1", bgClass)}
					initial={{ y: "0%" }}
					animate={{ y: "-105%" }}
					transition={{ duration: 0.55, ease, delay: i * 0.06 }}
				/>
			))}
		</div>
	);
}

function sceneVariants(kind) {
	switch (kind) {
		case "swipe":
			return {
				initial: { x: "100%" },
				animate: { x: "0%" },
				exit: { x: "-30%", opacity: 0.4 },
			};
		case "wipe":
			return {
				initial: { clipPath: "inset(0 100% 0 0)" },
				animate: { clipPath: "inset(0 0% 0 0)" },
				exit: { opacity: 0.5 },
			};
		case "blend":
			return {
				initial: { opacity: 0, filter: "blur(20px)", scale: 1.04 },
				animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
				exit: { opacity: 0, filter: "blur(16px)" },
			};
		case "mix":
			return {
				initial: { opacity: 0, scale: 1.12, rotate: -2 },
				animate: { opacity: 1, scale: 1, rotate: 0 },
				exit: { opacity: 0, scale: 0.96 },
			};
		case "doors":
			return {
				initial: { scale: 0.94, opacity: 0 },
				animate: { scale: 1, opacity: 1 },
				exit: { scale: 1.02, opacity: 0.3 },
			};
		case "pixels":
			return {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
			};
		case "stagger":
		default:
			return {
				initial: { opacity: 0, y: 40 },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: -24 },
			};
	}
}

/**
 * HeroTextReel — mobile-style text “movie”.
 * Large 8xl headlines, Tailwind scene colors, slideshow transitions
 * (wipe, doors, swipe, pixels, stagger, blend, mix) between scenes.
 */
export default function HeroTextReel({
	scenes = DEFAULT_SCENES,
	className,
	autoPlay = true,
	holdMs = HOLD_MS,
}) {
	const list = useMemo(() => (scenes.length ? scenes : DEFAULT_SCENES), [scenes]);
	const [index, setIndex] = useState(0);
	const [overlayKey, setOverlayKey] = useState(0);

	const scene = list[index];
	const prevBg = list[(index - 1 + list.length) % list.length]?.bg || scene.bg;
	const variants = sceneVariants(scene.transition);

	useEffect(() => {
		if (!autoPlay) return undefined;
		const id = setInterval(() => {
			setOverlayKey((k) => k + 1);
			setIndex((i) => (i + 1) % list.length);
		}, holdMs);
		return () => clearInterval(id);
	}, [autoPlay, holdMs, list.length]);

	return (
		<section
			className={cn(
				"relative left-1/2 h-[100vh] min-h-[520px] w-screen -translate-x-1/2 overflow-hidden",
				className
			)}
			aria-label="Text scene reel"
		>
			{/* Persistent underlay so transitions have a color to wipe over */}
			<div className={cn("absolute inset-0", prevBg)} />

			<AnimatePresence mode="sync">
				<motion.div
					key={scene.id}
					className={cn(
						"absolute inset-0 flex items-center justify-center px-6",
						scene.bg
					)}
					initial={variants.initial}
					animate={variants.animate}
					exit={variants.exit}
					transition={{ duration: 0.75, ease }}
				>
					<h2
						className={cn(
							"max-w-[95vw] text-center text-6xl font-black tracking-tight sm:text-7xl md:text-8xl lg:text-9xl",
							scene.fg
						)}
					>
						<SceneText
							text={scene.text}
							fg={scene.fg}
							variant={scene.transition}
						/>
					</h2>
				</motion.div>
			</AnimatePresence>

			{/* Transition chrome using previous scene color */}
			<AnimatePresence>
				<motion.div key={`ov-${overlayKey}-${scene.id}`} className="pointer-events-none">
					{index > 0 || overlayKey > 0 ? (
						<TransitionOverlay kind={scene.transition} bgClass={prevBg} />
					) : null}
				</motion.div>
			</AnimatePresence>

			{/* Scene dots + label */}
			<div className="absolute bottom-8 left-0 right-0 z-40 flex flex-col items-center gap-3">
				<p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70 mix-blend-difference">
					{scene.transition}
				</p>
				<div className="flex items-center gap-2">
					{list.map((s, i) => (
						<button
							key={s.id}
							type="button"
							aria-label={`Go to scene ${i + 1}`}
							onClick={() => {
								setOverlayKey((k) => k + 1);
								setIndex(i);
							}}
							className={cn(
								"h-1.5 rounded-full transition-all",
								i === index
									? "w-6 bg-white"
									: "w-1.5 bg-white/40 hover:bg-white/70"
							)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
