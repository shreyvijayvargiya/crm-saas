import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const PAPER = "#f3efe4";
const PAPER_EDGE = "#e8e2d4";

const DEFAULT_IMAGES = [
	{
		id: "st-1",
		src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
		alt: "Abstract gradient",
	},
	{
		id: "st-2",
		src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
		alt: "Mountain landscape",
	},
	{
		id: "st-3",
		src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80",
		alt: "Color gradient",
	},
	{
		id: "st-4",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
		alt: "Fashion editorial",
	},
	{
		id: "st-5",
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
		alt: "Portrait",
	},
	{
		id: "st-6",
		src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
		alt: "Beach palm",
	},
];

/** Perforated postage-stamp outline (inward semicircle teeth). */
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

function StampCard({
	item,
	clipId,
	isActive,
	layout,
	onClick,
	isLight,
}) {
	return (
		<div
			className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			style={{ zIndex: isActive ? 50 : layout.z }}
		>
			<motion.button
				type="button"
				onClick={onClick}
				className="block cursor-pointer border-0 bg-transparent p-0 outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
				initial={false}
				animate={{
					x: isActive ? 0 : layout.x,
					y: isActive ? 0 : layout.y,
					rotate: isActive ? 0 : layout.rotate,
					scale: isActive ? 1.06 : 1,
				}}
				transition={{ type: "spring", stiffness: 280, damping: 26 }}
				aria-label={`Stamp ${item.alt}`}
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
						<rect
							x={FRAME}
							y={FRAME}
							width={INNER_W}
							height={INNER_H}
							rx="2"
						/>
					</clipPath>
				</defs>

				{/* Paper + perforation fill */}
				<path d={OUTLINE} fill={PAPER} />
				<path
					d={OUTLINE}
					fill="none"
					stroke={PAPER_EDGE}
					strokeWidth="1.2"
				/>

				{/* Paper grain */}
				<rect
					x={FRAME}
					y={FRAME}
					width={INNER_W}
					height={INNER_H}
					fill={PAPER}
					opacity="0.35"
				/>

				{/* Centered image */}
				<image
					href={item.src}
					x={FRAME}
					y={FRAME}
					width={INNER_W}
					height={INNER_H}
					preserveAspectRatio="xMidYMid slice"
					clipPath={`url(#${clipId}-inner)`}
				/>

				{/* Inner frame line */}
				<rect
					x={FRAME + 3}
					y={FRAME + 3}
					width={INNER_W - 6}
					height={INNER_H - 6}
					fill="none"
					stroke={isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)"}
					strokeWidth="0.8"
				/>

				{/* Perforation shadow overlay */}
				<path
					d={OUTLINE}
					fill="none"
					stroke="rgba(0,0,0,0.08)"
					strokeWidth="2"
					clipPath={`url(#${clipId})`}
				/>
			</svg>
			</motion.button>
		</div>
	);
}

/**
 * HeroStampStack — 5–6 postage stamps piled with perforated edges;
 * images centered inside each stamp. Click to bring one to front.
 */
export default function HeroStampStack({
	images = DEFAULT_IMAGES,
	isLight = true,
	className,
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

	const [activeIndex, setActiveIndex] = useState(items.length - 1);

	return (
		<section
			className={cn(
				"relative mx-auto w-full max-w-2xl px-4 py-14 sm:py-16",
				className
			)}
			aria-label="Stamp stack gallery"
		>
			<div className="mb-8 text-center">
				<p
					className={cn(
						"text-[11px] font-semibold uppercase tracking-[0.2em]",
						isLight ? "text-zinc-500" : "text-zinc-500"
					)}
				>
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
				<p
					className={cn(
						"mx-auto mt-2 max-w-sm text-sm",
						isLight ? "text-zinc-500" : "text-zinc-400"
					)}
				>
					Click a stamp to bring it to the front.
				</p>
			</div>

			<div
				className={cn(
					"relative mx-auto h-[360px] overflow-hidden rounded-3xl sm:h-[400px]",
					isLight
						? "bg-gradient-to-br from-zinc-100 via-[#f7f6f2] to-zinc-200/80"
						: "bg-zinc-900"
				)}
			>
				{/* Soft center vignette */}
				<div
					className="pointer-events-none absolute inset-0"
					style={{
						background: isLight
							? "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(255,255,255,0.85), transparent 72%)"
							: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(255,255,255,0.06), transparent 70%)",
					}}
					aria-hidden
				/>

				<div className="relative h-full w-full">
					{items.map((item, i) => (
						<StampCard
							key={item.id}
							item={item}
							clipId={`stamp-clip-${item.id}`}
							layout={layouts[i]}
							isActive={activeIndex === i}
							isLight={isLight}
							onClick={() => setActiveIndex(i)}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
