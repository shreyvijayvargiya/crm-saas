import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	motion,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_IMAGES = [
	{
		id: "ph-1",
		src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80",
		alt: "Bouquet of colorful flowers",
	},
	{
		id: "ph-2",
		src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
		alt: "Studio portrait",
	},
	{
		id: "ph-3",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
		alt: "Fashion editorial",
	},
	{
		id: "ph-4",
		src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
		alt: "Portrait in field",
	},
	{
		id: "ph-5",
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
		alt: "Close-up portrait",
	},
	{
		id: "ph-6",
		src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
		alt: "Street portrait",
	},
	{
		id: "ph-7",
		src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
		alt: "City portrait",
	},
	{
		id: "ph-8",
		src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
		alt: "Editorial portrait",
	},
];

const FRAME_OPTIONS = [
	{ id: "white", label: "White", color: "#f4f4f5" },
	{ id: "grey", label: "Grey", color: "#a1a1aa" },
	{ id: "tan", label: "Tan", color: "#d6c3a8" },
	{ id: "black", label: "Black", color: "#18181b" },
];

const GLOW_OPTIONS = [
	{ id: "blue", label: "Blue", color: "#3b82f6" },
	{ id: "green", label: "Green", color: "#22c55e" },
	{ id: "yellow", label: "Yellow", color: "#eab308" },
	{ id: "pink", label: "Pink", color: "#ec4899" },
	{ id: "purple", label: "Purple", color: "#a855f7" },
];

const PHONE_W = 280;
const PHONE_H = 560;
const BEZEL = 11;
const SCREEN_W = PHONE_W - BEZEL * 2;
const SCREEN_H = PHONE_H - BEZEL * 2;
/** Cards sized to fill the phone screen when active */
const CARD_W = SCREEN_W;
const CARD_H = SCREEN_H;
const CARD_GAP = 28;
const ACTIVE_SCALE = 1;

function PhoneFrame({ frameColor, isLight }) {
	const isDarkFrame = frameColor === "#18181b";
	return (
		<div
			className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
			aria-hidden
		>
			{/*
			  True see-through screen: chassis uses border only (no fill),
			  so images behind show through the hole.
			*/}
			<div
				className="relative transition-colors duration-300"
				style={{
					width: PHONE_W,
					height: PHONE_H,
					borderRadius: 48,
					border: `${BEZEL}px solid ${frameColor}`,
					background: "transparent",
					boxShadow: isLight
						? `0 24px 60px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(0,0,0,0.06)`
						: `0 24px 60px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.1)`,
				}}
			>
				{/* Inner screen edge */}
				<div
					className="absolute inset-0 overflow-hidden"
					style={{ borderRadius: 37 }}
				>
					{/* Dynamic Island */}
					<div
						className="absolute left-1/2 top-3 z-10 h-7 w-[92px] -translate-x-1/2 rounded-full"
						style={{
							background: "#09090b",
							boxShadow: isDarkFrame
								? "inset 0 0 0 1px rgba(255,255,255,0.08)"
								: "0 1px 2px rgba(0,0,0,0.35)",
						}}
					/>
					{/* Home indicator */}
					<div className="absolute bottom-2.5 left-1/2 z-10 h-1 w-28 -translate-x-1/2 rounded-full bg-white/45" />
				</div>
			</div>
		</div>
	);
}

function ScrollImageCard({ item, index, total, progress, isLight }) {
	const center = total <= 1 ? 0 : index / (total - 1);
	const span = total <= 1 ? 0.5 : 0.75 / Math.max(total - 1, 1);
	const dim = isLight ? 0.4 : 0.28;

	const opacity = useTransform(
		progress,
		[
			center - span * 1.5,
			center - span * 0.35,
			center,
			center + span * 0.35,
			center + span * 1.5,
		],
		[dim, 0.55, 1, 0.55, dim]
	);
	const scale = useTransform(
		progress,
		[center - span, center, center + span],
		[0.82, ACTIVE_SCALE, 0.82]
	);
	const filter = useTransform(
		progress,
		[center - span, center, center + span],
		[
			`blur(14px) brightness(${isLight ? 0.85 : 0.55})`,
			"blur(0px) brightness(1)",
			`blur(14px) brightness(${isLight ? 0.85 : 0.55})`,
		]
	);

	return (
		<motion.div
			className="relative shrink-0 overflow-hidden rounded-[32px] will-change-transform"
			style={{
				width: CARD_W,
				height: CARD_H,
				opacity,
				scale,
				filter,
			}}
		>
			<img
				src={item.src}
				alt={item.alt || ""}
				draggable={false}
				className="h-full w-full object-cover"
				loading={index < 3 ? "eager" : "lazy"}
			/>
		</motion.div>
	);
}

function SwatchRow({ label, options, value, onChange, isLight }) {
	return (
		<div className="flex items-center gap-2.5">
			<span
				className={cn(
					"text-[10px] font-semibold uppercase tracking-[0.14em]",
					isLight ? "text-zinc-500" : "text-zinc-400"
				)}
			>
				{label}
			</span>
			<div className="flex items-center gap-1.5">
				{options.map((opt) => {
					const active = value === opt.id;
					return (
						<button
							key={opt.id}
							type="button"
							onClick={() => onChange(opt.id)}
							title={opt.label}
							aria-label={`${label} ${opt.label}`}
							aria-pressed={active}
							className={cn(
								"h-5 w-5 rounded-full transition-transform duration-200",
								active ? "scale-110 ring-2 ring-offset-2" : "hover:scale-105",
								active
									? isLight
										? "ring-zinc-400 ring-offset-white"
										: "ring-zinc-300 ring-offset-zinc-950"
									: ""
							)}
							style={{
								background: opt.color,
								boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.15)",
							}}
						/>
					);
				})}
			</div>
		</div>
	);
}

/**
 * HeroPhoneScroll — sticky iPhone lens over a flex image strip.
 * Vertical scroll drives -x; the centered card fills the transparent phone screen.
 */
export default function HeroPhoneScroll({
	images = DEFAULT_IMAGES,
	isLight = false,
	className,
	scrollHeightVh = 320,
}) {
	const items = useMemo(
		() => (images.length ? images : DEFAULT_IMAGES),
		[images]
	);

	const sectionRef = useRef(null);
	const [frameId, setFrameId] = useState("white");
	const [glowId, setGlowId] = useState("purple");

	const frameColor =
		FRAME_OPTIONS.find((f) => f.id === frameId)?.color || "#f4f4f5";
	const glowColor =
		GLOW_OPTIONS.find((g) => g.id === glowId)?.color || "#a855f7";

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const progress = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 28,
		restDelta: 0.001,
	});

	const travelX = useMemo(() => {
		if (items.length <= 1) return 0;
		return (items.length - 1) * (CARD_W + CARD_GAP);
	}, [items.length]);

	const x = useTransform(progress, [0, 1], [0, -travelX]);

	const [pad, setPad] = useState(200);

	useEffect(() => {
		const update = () => setPad(window.innerWidth / 2 - CARD_W / 2);
		update();
		window.addEventListener("resize", update);
		return () => window.removeEventListener("resize", update);
	}, []);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Phone scroll gallery"
		>
			<div
				className={cn(
					"sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden transition-colors duration-300",
					isLight ? "bg-zinc-100" : "bg-black"
				)}
			>
				<div className="relative mb-4 w-full flex-1">
					{/* Glow BEHIND images so the screen hole stays clear */}
					<div
						className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
						aria-hidden
					>
						<div
							className="rounded-[3.5rem] opacity-60 blur-3xl transition-colors duration-500"
							style={{
								width: PHONE_W + 64,
								height: PHONE_H + 64,
								background: glowColor,
								boxShadow: `0 0 100px 40px ${glowColor}`,
							}}
						/>
					</div>

					{/* Scrolling image strip — visible through phone hole + on sides */}
					<div className="absolute inset-0 z-10 flex items-center overflow-hidden">
						<motion.div
							className="flex flex-row items-center"
							style={{
								x,
								gap: CARD_GAP,
								paddingLeft: pad,
								paddingRight: pad,
							}}
						>
							{items.map((item, index) => (
								<ScrollImageCard
									key={item.id || item.src || index}
									item={item}
									index={index}
									total={items.length}
									progress={progress}
									isLight={isLight}
								/>
							))}
						</motion.div>
					</div>

					{/* Bezel only (transparent center) */}
					<PhoneFrame frameColor={frameColor} isLight={isLight} />
				</div>

				<div
					className={cn(
						"relative z-30 mb-8 flex flex-wrap items-center justify-center gap-5 rounded-full border px-5 py-3 shadow-lg backdrop-blur-md sm:gap-8",
						isLight
							? "border-zinc-200/80 bg-white/80 shadow-zinc-300/40"
							: "border-zinc-700/80 bg-zinc-900/80 shadow-black/40"
					)}
				>
					<SwatchRow
						label="Frame"
						options={FRAME_OPTIONS}
						value={frameId}
						onChange={setFrameId}
						isLight={isLight}
					/>
					<div
						className={cn(
							"hidden h-6 w-px sm:block",
							isLight ? "bg-zinc-200" : "bg-zinc-700"
						)}
					/>
					<SwatchRow
						label="Glow"
						options={GLOW_OPTIONS}
						value={glowId}
						onChange={setGlowId}
						isLight={isLight}
					/>
				</div>
			</div>
		</section>
	);
}
