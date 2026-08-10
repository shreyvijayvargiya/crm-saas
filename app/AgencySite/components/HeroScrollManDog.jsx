import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

function ManSvg({ className }) {
	return (
		<svg
			viewBox="0 0 120 220"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
		>
			{/* Head */}
			<circle cx="60" cy="36" r="28" stroke="#111" strokeWidth="3.2" fill="#fff" />
			{/* Hair */}
			<path d="M48 14 Q52 4 56 12" stroke="#111" strokeWidth="2.6" strokeLinecap="round" />
			<path d="M58 12 Q62 2 66 12" stroke="#111" strokeWidth="2.6" strokeLinecap="round" />
			<path d="M68 14 Q74 6 76 16" stroke="#111" strokeWidth="2.6" strokeLinecap="round" />
			{/* Glasses */}
			<circle cx="48" cy="38" r="9" stroke="#111" strokeWidth="2.4" />
			<circle cx="72" cy="38" r="9" stroke="#111" strokeWidth="2.4" />
			<path d="M57 38 H63" stroke="#111" strokeWidth="2.2" />
			{/* Smile */}
			<path d="M52 48 Q60 54 68 48" stroke="#111" strokeWidth="2.2" strokeLinecap="round" />
			{/* Body / shirt */}
			<path
				d="M42 68 H78 L84 118 H36 Z"
				stroke="#111"
				strokeWidth="3"
				fill="#fff"
				strokeLinejoin="round"
			/>
			{/* Arms — lean on text */}
			<path
				d="M42 78 Q18 90 12 108"
				stroke="#111"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			<path
				d="M78 78 Q98 86 108 72"
				stroke="#111"
				strokeWidth="3"
				strokeLinecap="round"
			/>
			{/* Legs crossed */}
			<path
				d="M48 118 L42 190"
				stroke="#111"
				strokeWidth="3.2"
				strokeLinecap="round"
			/>
			<path
				d="M68 118 L78 168 L58 190"
				stroke="#111"
				strokeWidth="3.2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			{/* Shoes */}
			<path d="M34 190 H50" stroke="#111" strokeWidth="3.2" strokeLinecap="round" />
			<path d="M52 190 H70" stroke="#111" strokeWidth="3.2" strokeLinecap="round" />
		</svg>
	);
}

function DogSvg({ className }) {
	return (
		<svg
			viewBox="0 0 220 200"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden
		>
			<defs>
				<linearGradient id="dogFur" x1="0" y1="0" x2="0.4" y2="1">
					<stop offset="0%" stopColor="#f0c878" />
					<stop offset="45%" stopColor="#e0a84a" />
					<stop offset="100%" stopColor="#c88830" />
				</linearGradient>
				<linearGradient id="dogChest" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#fff8ee" />
					<stop offset="100%" stopColor="#f0e0c8" />
				</linearGradient>
			</defs>
			{/* Body */}
			<ellipse cx="118" cy="128" rx="68" ry="48" fill="url(#dogFur)" />
			{/* Chest */}
			<ellipse cx="108" cy="138" rx="36" ry="34" fill="url(#dogChest)" />
			{/* Hind */}
			<ellipse cx="168" cy="142" rx="28" ry="32" fill="#d49238" />
			{/* Tail */}
			<path
				d="M188 120 Q210 96 204 78"
				fill="none"
				stroke="#d49238"
				strokeWidth="14"
				strokeLinecap="round"
			/>
			{/* Front paws */}
			<ellipse cx="88" cy="168" rx="14" ry="10" fill="#f5e6c8" />
			<ellipse cx="118" cy="170" rx="14" ry="10" fill="#f5e6c8" />
			{/* Head */}
			<ellipse cx="72" cy="78" rx="42" ry="40" fill="url(#dogFur)" />
			{/* Snout */}
			<ellipse cx="48" cy="92" rx="22" ry="16" fill="#fff6ea" />
			{/* Ears */}
			<path d="M48 48 Q42 18 68 38 Z" fill="#c88830" />
			<path d="M92 42 Q108 12 112 48 Z" fill="#c88830" />
			{/* Eyes looking up-left */}
			<ellipse cx="58" cy="72" rx="5" ry="6" fill="#1a1a1a" />
			<ellipse cx="78" cy="70" rx="5" ry="6" fill="#1a1a1a" />
			<circle cx="59.5" cy="70" r="1.6" fill="#fff" />
			<circle cx="79.5" cy="68" r="1.6" fill="#fff" />
			{/* Nose */}
			<ellipse cx="38" cy="90" rx="8" ry="6" fill="#2a2a2a" />
			{/* Mouth */}
			<path
				d="M40 98 Q48 106 56 98"
				fill="none"
				stroke="#2a2a2a"
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
}

/**
 * HeroScrollManDog — sticky scroll stage.
 * Text + man exit left; dog stays and scales up.
 */
export default function HeroScrollManDog({ isLight = true, className }) {
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	const smooth = useSpring(scrollYProgress, {
		stiffness: 80,
		damping: 28,
		restDelta: 0.001,
	});

	const exitX = useTransform(smooth, [0, 0.75], ["0%", "-120%"]);
	const exitOpacity = useTransform(smooth, [0, 0.55, 0.75], [1, 1, 0]);
	const dogScale = useTransform(smooth, [0, 1], [1, 2.35]);
	const dogY = useTransform(smooth, [0, 1], ["0%", "8%"]);
	const hintOpacity = useTransform(smooth, [0, 0.12], [1, 0]);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: "240vh" }}
			aria-label="Scroll man and dog"
		>
			<div
				className={cn(
					"sticky top-0 flex h-screen items-center overflow-hidden",
					isLight ? "bg-[#f7f7f5] text-zinc-900" : "bg-zinc-950 text-white"
				)}
			>
				{/* Grid */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.45]"
					style={{
						backgroundImage: isLight
							? "linear-gradient(rgba(0,0,0,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.045) 1px, transparent 1px)"
							: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
						backgroundSize: "48px 48px",
					}}
					aria-hidden
				/>

				<div className="relative z-10 mx-auto flex w-full max-w-6xl items-end justify-between gap-4 px-6 sm:px-10">
					{/* Text + man leave left */}
					<motion.div
						style={{ x: exitX, opacity: exitOpacity }}
						className="relative flex min-w-0 flex-1 items-end gap-2 sm:gap-4"
					>
						<div className="pb-2">
							<h2 className="font-sans text-[clamp(2.75rem,9vw,6.5rem)] font-black leading-[0.92] tracking-tight">
								<span className="block">Studio®</span>
								<span className="block">builds</span>
								<span className="block">things.</span>
							</h2>
							<p
								className={cn(
									"mt-5 text-[11px] font-medium uppercase tracking-[0.22em] sm:text-xs",
									isLight ? "text-zinc-400" : "text-zinc-500"
								)}
							>
								Craft · Engineer / Designer / Open-source
							</p>
						</div>
						<ManSvg className="mb-6 hidden h-[min(42vh,280px)] w-auto shrink-0 sm:block" />
					</motion.div>

					{/* Dog stays + scales */}
					<motion.div
						style={{ scale: dogScale, y: dogY }}
						className="relative z-20 mb-4 origin-bottom shrink-0 sm:mb-6"
					>
						<DogSvg className="h-[min(36vh,240px)] w-auto sm:h-[min(42vh,280px)]" />
					</motion.div>
				</div>

				{/* Man on mobile under text */}
				<motion.div
					style={{ x: exitX, opacity: exitOpacity }}
					className="absolute bottom-[18%] left-8 sm:hidden"
				>
					<ManSvg className="h-36 w-auto" />
				</motion.div>

				<motion.p
					style={{ opacity: hintOpacity }}
					className={cn(
						"absolute bottom-8 left-6 text-xs font-medium tracking-wide sm:left-10",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					↓ Scroll
				</motion.p>
			</div>
		</section>
	);
}
