import React, { useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const ORBIT_IMAGES = [
	{
		id: "or-1",
		src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80",
		alt: "Abstract",
	},
	{
		id: "or-2",
		src: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=500&q=80",
		alt: "Violet",
	},
	{
		id: "or-3",
		src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=500&q=80",
		alt: "Spectrum",
	},
	{
		id: "or-4",
		src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=500&q=80",
		alt: "Geometry",
	},
	{
		id: "or-5",
		src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=500&q=80",
		alt: "Neon",
	},
	{
		id: "or-6",
		src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=500&q=80",
		alt: "Fluid",
	},
	{
		id: "or-7",
		src: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=500&q=80",
		alt: "Pastel",
	},
	
	{
		// Sculpture image 2
		id: "or-8b",
		src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=500&q=80",
		alt: "Sculpture 2",
	},
	{
		id: "or-9",
		src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=500&q=80",
		alt: "Forest",
	},
	{
		id: "or-10",
		src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
		alt: "Portrait",
	},
	{
		id: "or-11",
		src: "https://images.unsplash.com/photo-1529626455594-64432c6c4e1b?auto=format&fit=crop&w=500&q=80",
		alt: "Flowers",
	},
	{
		id: "or-12",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80",
		alt: "Fashion",
	},
];

const PERIOD_MS = 26000;
const RADIUS_X = 280;
const RADIUS_Y = 110;

function OrbitCard({ item, index, count, isLight }) {
	const phase0 = (index / count) * Math.PI * 2;
	const angle = useMotionValue(phase0);

	useEffect(() => {
		let raf = 0;
		const start = performance.now();
		const loop = (now) => {
			const a = phase0 + ((now - start) / PERIOD_MS) * Math.PI * 2;
			angle.set(a);
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [angle, phase0]);

	const x = useTransform(angle, (a) => Math.cos(a) * RADIUS_X);
	const y = useTransform(angle, (a) => Math.sin(a) * RADIUS_Y);
	const depth = useTransform(angle, (a) => Math.sin(a));
	const scale = useTransform(depth, [-1, 1], [0.55, 1.2]);
	const blur = useTransform(depth, [-1, 0, 1], [5, 1.5, 0]);
	const opacity = useTransform(depth, [-1, 1], [0.4, 1]);
	const zIndex = useTransform(depth, [-1, 1], [5, 40]);
	const filter = useTransform(blur, (b) => `blur(${b}px)`);
	const rotate = useTransform(angle, (a) => Math.cos(a) * 10);

	return (
		<motion.div
			className={cn(
				"absolute left-1/2 top-1/2 h-24 w-24 overflow-hidden rounded-2xl shadow-2xl sm:h-28 sm:w-28 md:h-[7.5rem] md:w-[7.5rem]",
				isLight ? "shadow-zinc-500/25" : "shadow-black/70"
			)}
			transformTemplate={({ x: tx, y: ty, scale: s, rotate: r }) =>
				`translate(-50%, -50%) translate(${tx}, ${ty}) scale(${s}) rotate(${r})`
			}
			style={{
				x,
				y,
				scale,
				opacity,
				zIndex,
				filter,
				rotate,
			}}
		>
			<img
				src={item.src}
				alt={item.alt}
				draggable={false}
				className="h-full w-full object-cover"
				loading={index < 4 ? "eager" : "lazy"}
			/>
		</motion.div>
	);
}

/**
 * HeroOrbitRing — infinite radial orbit of images around bold center copy.
 * Cards scale / blur / z-index by depth so they pass in front of & behind the title.
 */
export default function HeroOrbitRing({
	images = ORBIT_IMAGES,
	title = "NEW GRAINIENT",
	subtitle = "COLLECTION ADDED",
	leftCaption = "(50+) Gradients Backgrounds Added",
	rightCaption = "Gradients & AI-Generated Backgrounds",
	isLight = false,
	className,
}) {
	const items = useMemo(
		() => (images.length ? images : ORBIT_IMAGES),
		[images]
	);

	return (
		<section
			className={cn(
				"relative left-1/2 h-[100vh] min-h-[560px] w-screen -translate-x-1/2 overflow-hidden",
				isLight ? "bg-zinc-100" : "bg-black",
				className
			)}
			aria-label="Orbiting image collection"
		>
			<p
				className={cn(
					"pointer-events-none absolute left-4 top-1/2 z-50 hidden max-w-[8.5rem] -translate-y-1/2 text-[10px] font-medium leading-relaxed sm:left-8 sm:block sm:text-xs lg:max-w-[10rem]",
					isLight ? "text-zinc-500" : "text-zinc-400"
				)}
			>
				{leftCaption}
			</p>
			<p
				className={cn(
					"pointer-events-none absolute right-4 top-1/2 z-50 hidden max-w-[8.5rem] -translate-y-1/2 text-right text-[10px] font-medium leading-relaxed sm:right-8 sm:block sm:text-xs lg:max-w-[10rem]",
					isLight ? "text-zinc-500" : "text-zinc-400"
				)}
			>
				{rightCaption}
			</p>

			{/* Orbit plane */}
			<div className="absolute inset-0 flex items-center justify-center">
				<div className="relative h-[320px] w-full max-w-3xl sm:h-[360px]">
					{items.map((item, index) => (
						<OrbitCard
							key={item.id}
							item={item}
							index={index}
							count={items.length}
							isLight={isLight}
						/>
					))}
				</div>
			</div>

			{/* Center title — z-20 so back cards (z~5) sit behind, front (z~40) in front */}
			<div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
				<h2
					className={cn(
						"text-4xl font-black uppercase leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl",
						isLight ? "text-zinc-950" : "text-white"
					)}
				>
					<span className="block">{title}</span>
					<span className="block">{subtitle}</span>
				</h2>
			</div>
		</section>
	);
}
