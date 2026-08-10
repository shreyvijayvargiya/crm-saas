import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const CANS = [
	{
		id: "original",
		name: "Original",
		flavor: "Salted classic",
		color: "#e11d48",
		label: "#fef2f2",
		img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "sour",
		name: "Sour Cream",
		flavor: "Onion swirl",
		color: "#16a34a",
		label: "#f0fdf4",
		img: "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "bbq",
		name: "BBQ",
		flavor: "Smoke & spice",
		color: "#b45309",
		label: "#fffbeb",
		img: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "cheddar",
		name: "Cheddar",
		flavor: "Sharp melt",
		color: "#ca8a04",
		label: "#fefce8",
		img: "https://images.unsplash.com/photo-1613919113640-25732ec08d63?auto=format&fit=crop&w=600&q=80",
	},
	{
		id: "hot",
		name: "Hot & Spicy",
		flavor: "Chili kick",
		color: "#dc2626",
		label: "#fff1f2",
		img: "https://images.unsplash.com/photo-1621939514645-3f4c6f0b0b5a?auto=format&fit=crop&w=600&q=80",
	},
];

function Can({ can, rotateY, active }) {
	return (
		<motion.div
			className="relative mx-auto h-[min(58vh,420px)] w-[min(46vw,200px)]"
			style={{
				rotateY,
				transformStyle: "preserve-3d",
				perspective: 800,
			}}
		>
			<div
				className={cn(
					"absolute inset-0 overflow-hidden rounded-[40%_40%_28%_28%/12%_12%_10%_10%] border-2 shadow-2xl transition-opacity",
					active ? "opacity-100" : "opacity-40"
				)}
				style={{
					background: `linear-gradient(160deg, ${can.color} 0%, #1c1917 120%)`,
					borderColor: "rgba(255,255,255,0.25)",
				}}
			>
				{/* Lid */}
				<div
					className="absolute inset-x-[8%] top-[3%] h-[10%] rounded-full"
					style={{ background: "linear-gradient(180deg,#f5f5f4,#a8a29e)" }}
				/>
				{/* Label band */}
				<div
					className="absolute inset-x-[6%] top-[28%] bottom-[18%] flex flex-col items-center justify-center px-3 text-center"
					style={{ backgroundColor: can.label }}
				>
					<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
						Stack
					</p>
					<p className="mt-1 text-lg font-black tracking-tight" style={{ color: can.color }}>
						{can.name}
					</p>
					<p className="mt-1 text-[11px] text-zinc-600">{can.flavor}</p>
					<img
						src={can.img}
						alt=""
						draggable={false}
						className="mt-3 h-16 w-16 rounded-full object-cover ring-2 ring-black/10"
					/>
				</div>
				{/* Specular */}
				<div className="pointer-events-none absolute inset-y-[12%] left-[10%] w-[14%] rounded-full bg-white/20 blur-[2px]" />
			</div>
		</motion.div>
	);
}

/**
 * HeroPringlesScroll — centered cans; scroll rotates and swaps flavors.
 */
export default function HeroPringlesScroll({ className }) {
	const sectionRef = useRef(null);
	const [idx, setIdx] = useState(0);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 28 });
	const rotateY = useTransform(smooth, [0, 1], [0, 360 * CANS.length]);

	useEffect(() => {
		const unsub = smooth.onChange((v) => {
			setIdx(Math.min(CANS.length - 1, Math.floor(v * CANS.length)));
		});
		return unsub;
	}, [smooth]);

	const can = CANS[idx];

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: "280vh" }}
			aria-label="Pringles scroll cans"
		>
			<div
				className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden"
				style={{
					background: `radial-gradient(ellipse at 50% 40%, ${can.color}33 0%, #fafaf9 50%, #e7e5e4 100%)`,
				}}
			>
				<p className="absolute left-1/2 top-8 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
					Scroll to spin
				</p>

				<div style={{ perspective: "1000px" }}>
					<Can can={can} rotateY={rotateY} active />
				</div>

				<div className="mt-8 text-center">
					<p className="text-2xl font-black tracking-tight text-zinc-900">{can.name}</p>
					<p className="mt-1 text-sm text-zinc-500">{can.flavor}</p>
					<div className="mt-4 flex justify-center gap-2">
						{CANS.map((c, i) => (
							<span
								key={c.id}
								className={cn(
									"h-2 w-2 rounded-full transition",
									i === idx ? "scale-125" : "opacity-40"
								)}
								style={{ backgroundColor: c.color }}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
