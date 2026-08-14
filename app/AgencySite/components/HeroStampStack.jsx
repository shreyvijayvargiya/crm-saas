import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const PAPER = "#f3efe4";
const PAPER_EDGE = "#e8e2d4";

const DEFAULT_IMAGES = [
	{
		id: "st-1",
		src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
		alt: "Abstract gradient",
	},
	{
		id: "st-2",
		src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
		alt: "Mountain landscape",
	},
	{
		id: "st-3",
		src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
		alt: "Color gradient",
	},
	{
		id: "st-4",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
		alt: "Fashion editorial",
	},
	{
		id: "st-5",
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
		alt: "Portrait",
	},
	{
		id: "st-6",
		src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
		alt: "Beach palm",
	},
];

function stampPath(w, h, teethX, teethY, r) {
	const parts = [];
	const stepX = w / teethX;
	const stepY = h / teethY;
	parts.push(`M 0 ${r}`);
	for (let i = 0; i < teethX; i++) {
		const x0 = i * stepX;
		const x1 = (i + 0.5) * stepX;
		const x2 = (i + 1) * stepX;
		parts.push(`L ${x0} 0 Q ${x1} ${r} ${x2} 0`);
	}
	for (let i = 0; i < teethY; i++) {
		const y0 = i * stepY;
		const y1 = (i + 0.5) * stepY;
		const y2 = (i + 1) * stepY;
		parts.push(`L ${w} ${y0} Q ${w - r} ${y1} ${w} ${y2}`);
	}
	for (let i = teethX; i > 0; i--) {
		const x2 = i * stepX;
		const x1 = (i - 0.5) * stepX;
		const x0 = (i - 1) * stepX;
		parts.push(`L ${x2} ${h} Q ${x1} ${h - r} ${x0} ${h}`);
	}
	for (let i = teethY; i > 0; i--) {
		const y2 = i * stepY;
		const y1 = (i - 0.5) * stepY;
		const y0 = (i - 1) * stepY;
		parts.push(`L 0 ${y2} Q ${r} ${y1} 0 ${y0}`);
	}
	parts.push("Z");
	return parts.join(" ");
}

const STAMP_W = 260;
const STAMP_H = 300;
const FRAME = 22;
const OUTLINE = stampPath(STAMP_W, STAMP_H, 13, 15, 6);
const INNER_W = STAMP_W - FRAME * 2;
const INNER_H = STAMP_H - FRAME * 2;

const DEFAULT_LAYOUT = [
	{ rotate: -12, x: -22, y: -6 },
	{ rotate: 10, x: 18, y: -12 },
	{ rotate: -6, x: -10, y: 8 },
	{ rotate: 14, x: 24, y: 2 },
	{ rotate: -3, x: 0, y: -2 },
	{ rotate: 7, x: -16, y: 6 },
];

function StampCard({ item, clipId, isActive, layout, isLight }) {
	return (
		<div
			className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			style={{ zIndex: isActive ? 50 : layout.z }}
		>
			<motion.div
				className="block"
				initial={false}
				animate={{
					x: isActive ? 0 : layout.x,
					y: isActive ? 0 : layout.y,
					rotate: isActive ? 0 : layout.rotate,
					scale: isActive ? 1.08 : 0.92,
					opacity: isActive ? 1 : 0.55,
				}}
				transition={{ type: "spring", stiffness: 260, damping: 26 }}
			>
				<svg
					viewBox={`0 0 ${STAMP_W} ${STAMP_H}`}
					className={cn(
						"h-[200px] w-[172px] sm:h-[240px] sm:w-[206px]",
						isLight
							? "drop-shadow-[0_14px_32px_rgba(0,0,0,0.14)]"
							: "drop-shadow-[0_18px_36px_rgba(0,0,0,0.35)]"
					)}
					aria-hidden
				>
					<defs>
						<clipPath id={clipId}>
							<path d={OUTLINE} />
						</clipPath>
						<clipPath id={`${clipId}-inner`}>
							<rect x={FRAME} y={FRAME} width={INNER_W} height={INNER_H} rx="2" />
						</clipPath>
					</defs>
					<path d={OUTLINE} fill={PAPER} />
					<path d={OUTLINE} fill="none" stroke={PAPER_EDGE} strokeWidth="1.2" />
					<image
						href={item.src}
						x={FRAME}
						y={FRAME}
						width={INNER_W}
						height={INNER_H}
						preserveAspectRatio="xMidYMid slice"
						clipPath={`url(#${clipId}-inner)`}
					/>
					<rect
						x={FRAME + 3}
						y={FRAME + 3}
						width={INNER_W - 6}
						height={INNER_H - 6}
						fill="none"
						stroke="rgba(0,0,0,0.06)"
						strokeWidth="0.8"
					/>
				</svg>
			</motion.div>
		</div>
	);
}

/**
 * HeroStampStack — postage pile.
 * Scroll cycles stamp images; drag the reveal handle to open a full-bleed photo
 * that grows to the parent container height when fully opened.
 */
export default function HeroStampStack({
	images = DEFAULT_IMAGES,
	isLight = true,
	className,
	scrollHeightVh = 280,
}) {
	const items = useMemo(
		() => (images.length ? images : DEFAULT_IMAGES).slice(0, 6),
		[images]
	);
	const layouts = useMemo(
		() =>
			items.map((_, i) => ({
				...DEFAULT_LAYOUT[i % DEFAULT_LAYOUT.length],
				z: i + 1,
			})),
		[items]
	);

	const sectionRef = useRef(null);
	const stageRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [dragging, setDragging] = useState(false);

	const reveal = useMotionValue(0.18);
	const revealSpring = useSpring(reveal, { stiffness: 120, damping: 24 });
	const [revealAmt, setRevealAmt] = useState(0.18);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const smooth = useSpring(scrollYProgress, {
		stiffness: 80,
		damping: 28,
		restDelta: 0.001,
	});

	useEffect(() => {
		const unsub = smooth.onChange((p) => {
			const idx = Math.min(
				items.length - 1,
				Math.max(0, Math.round(p * (items.length - 1)))
			);
			setActiveIndex(idx);
		});
		return unsub;
	}, [smooth, items.length]);

	useEffect(() => {
		const unsub = revealSpring.onChange((v) => setRevealAmt(v));
		return unsub;
	}, [revealSpring]);

	const current = items[activeIndex] || items[0];
	const fullyOpen = revealAmt > 0.92;

	const onPointerDown = (e) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		setDragging(true);
	};

	const onPointerMove = (e) => {
		if (!dragging || !stageRef.current) return;
		const rect = stageRef.current.getBoundingClientRect();
		const next = Math.max(0.08, Math.min(1, (e.clientY - rect.top) / rect.height));
		reveal.set(next);
	};

	const onPointerUp = () => {
		setDragging(false);
		const v = reveal.get();
		reveal.set(v > 0.55 ? 1 : 0.18);
	};

	const stageHeight = fullyOpen ? "100%" : "min(70vh, 520px)";

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Postage stamp pile"
		>
			<div
				className={cn(
					"sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4",
					isLight ? "bg-[#f7f6f2]" : "bg-zinc-950"
				)}
			>
				<div className="mb-6 text-center">
					<p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
						Stamp stack
					</p>
					<h2
						className={cn(
							"mt-1 text-2xl font-bold tracking-tight sm:text-3xl",
							isLight ? "text-zinc-950" : "text-white"
						)}
					>
						Postage pile
					</h2>
					<p className="mx-auto mt-2 max-w-sm text-sm text-zinc-500">
						Scroll to change the stamp · drag down to reveal
					</p>
				</div>

				{/* Stage — grows to full parent height when reveal is fully open */}
				<div
					ref={stageRef}
					className={cn(
						"relative w-full max-w-3xl overflow-hidden rounded-3xl transition-[height] duration-500 ease-out",
						isLight ? "bg-zinc-200/70" : "bg-zinc-900"
					)}
					style={{
						height: fullyOpen ? "calc(100vh - 8rem)" : stageHeight,
						maxHeight: fullyOpen ? "100%" : undefined,
					}}
				>
					{/* Revealed full-bleed image behind / under drag */}
					<div
						className="absolute inset-x-0 top-0 overflow-hidden"
						style={{ height: `${revealAmt * 100}%` }}
					>
						<img
							key={current.id}
							src={current.src}
							alt=""
							className="h-full w-full object-cover"
							draggable={false}
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/25" />
					</div>

					{/* Stamp pile sits in the remaining area */}
					<div
						className="absolute inset-x-0 bottom-0 flex items-center justify-center"
						style={{ height: `${Math.max(28, (1 - revealAmt) * 100)}%` }}
					>
						<div className="relative h-[280px] w-full sm:h-[320px]">
							{items.map((item, i) => (
								<StampCard
									key={item.id}
									item={item}
									clipId={`stamp-clip-${item.id}`}
									layout={layouts[i]}
									isActive={activeIndex === i}
									isLight={isLight}
								/>
							))}
						</div>
					</div>

					{/* Drag handle */}
					<div
						className="absolute inset-x-0 z-30 flex cursor-ns-resize touch-none flex-col items-center"
						style={{ top: `calc(${revealAmt * 100}% - 18px)` }}
						onPointerDown={onPointerDown}
						onPointerMove={onPointerMove}
						onPointerUp={onPointerUp}
						onPointerCancel={onPointerUp}
						role="slider"
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={Math.round(revealAmt * 100)}
						aria-label="Drag to reveal background"
					>
						<div className="h-1 w-full bg-black/20" />
						<div className="mt-1 rounded-full border border-zinc-300 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600 shadow-md">
							{fullyOpen ? "Full reveal" : "Drag"}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
