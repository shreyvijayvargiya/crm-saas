import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_PROJECTS = [
	{
		id: "w1",
		title: "Rexona Brand Refresh",
		meta: "Branding, Website · 2025",
		src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w2",
		title: "Nike Air Max 2023 Launch",
		meta: "Technology, Advertising · 2023",
		src: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w3",
		title: "Samsung Galaxy Z Series",
		meta: "Product, Campaign · 2024",
		src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w4",
		title: "Apple iPhone 16 Event",
		meta: "Experience Design · 2025",
		src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w5",
		title: "Spotify Wrapped Studio",
		meta: "Motion, Identity · 2024",
		src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w6",
		title: "Airbnb Experiences Hub",
		meta: "Product, UX · 2023",
		src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w7",
		title: "Tesla Cybertruck Reveal",
		meta: "3D, Launch · 2024",
		src: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w8",
		title: "Notion AI Workspace",
		meta: "AI bursting in security",
		src: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w9",
		title: "Linear Issue Tracker",
		meta: "Product Design · 2024",
		src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w10",
		title: "Figma Config Stage",
		meta: "Event, Motion · 2023",
		src: "https://images.unsplash.com/photo-1529626455594-64432c6c4e1b?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w11",
		title: "Stripe Atlas Rebrand",
		meta: "Fintech, Website · 2025",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w12",
		title: "SaaSCRM Template Kit",
		meta: "UI, Next.js · 2026",
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
	},
];

const ease = [0.22, 1, 0.36, 1];

/**
 * HeroWorkList — full-width work rows (title left, meta right).
 * Hover: horizontal highlight bar + centered stacked image preview.
 */
export default function HeroWorkList({
	projects = DEFAULT_PROJECTS,
	brand = "studio.seven",
	heading = "Work",
	isLight = true,
	className,
}) {
	const list = useMemo(
		() => (projects.length ? projects : DEFAULT_PROJECTS),
		[projects]
	);
	const [activeId, setActiveId] = useState(null);

	const activeIndex = useMemo(
		() => list.findIndex((p) => p.id === activeId),
		[list, activeId]
	);
	const active = activeIndex >= 0 ? list[activeIndex] : null;

	/** Previous 1–2 items for depth stack behind the active preview */
	const stackBehind = useMemo(() => {
		if (activeIndex < 0) return [];
		const behind = [];
		if (activeIndex > 0) behind.push(list[activeIndex - 1]);
		if (activeIndex > 1) behind.push(list[activeIndex - 2]);
		return behind;
	}, [activeIndex, list]);

	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2 overflow-hidden",
				isLight ? "bg-zinc-100" : "bg-zinc-950",
				className
			)}
			aria-label="Work list"
			onMouseLeave={() => setActiveId(null)}
		>
			{/* Header */}
			<div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
				<p
					className={cn(
						"text-sm font-semibold tracking-tight",
						isLight ? "text-zinc-900" : "text-zinc-100"
					)}
				>
					{brand}
				</p>
				<nav
					className={cn(
						"hidden gap-5 text-xs sm:flex",
						isLight ? "text-zinc-500" : "text-zinc-400"
					)}
				>
					{["Work", "Studio", "Services", "Contact"].map((item) => (
						<span key={item}>{item}</span>
					))}
				</nav>
			</div>

			<div className="mx-auto max-w-6xl px-5 pb-4 sm:px-8">
				<h2
					className={cn(
						"text-3xl font-medium tracking-tight sm:text-4xl",
						isLight ? "text-zinc-900" : "text-zinc-100"
					)}
				>
					{heading}{" "}
					<span
						className={cn(
							"text-lg font-normal",
							isLight ? "text-zinc-400" : "text-zinc-500"
						)}
					>
						({list.length})
					</span>
				</h2>
			</div>

			{/* Center preview — fixed in section viewport */}
			<div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
				<AnimatePresence mode="wait">
					{active && (
						<motion.div
							key={active.id}
							className="relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[320px] md:w-[320px]"
							initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
							animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
							exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
							transition={{ duration: 0.35, ease }}
						>
							{stackBehind.map((item, i) => (
								<div
									key={item.id}
									className="absolute inset-0 overflow-hidden rounded-lg"
									style={{
										transform: `translate(${(i + 1) * 10}px, ${(i + 1) * 8}px) scale(${1 - (i + 1) * 0.04})`,
										filter: `blur(${4 + i * 3}px)`,
										opacity: 0.45 - i * 0.12,
										zIndex: i,
									}}
								>
									<img
										src={item.src}
										alt=""
										className="h-full w-full object-cover"
										draggable={false}
									/>
								</div>
							))}
							<motion.div
								className={cn(
									"absolute inset-0 z-10 overflow-hidden rounded-lg shadow-2xl",
									isLight ? "shadow-zinc-400/50" : "shadow-black/60"
								)}
								initial={{ y: 12 }}
								animate={{ y: 0 }}
								transition={{ duration: 0.35, ease }}
							>
								<img
									src={active.src}
									alt={active.title}
									className="h-full w-full object-cover"
									draggable={false}
								/>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			{/* List rows */}
			<ul className="relative z-10 mx-auto max-w-6xl pb-16">
				{list.map((project) => {
					const isActive = project.id === activeId;
					return (
						<li key={project.id}>
							<button
								type="button"
								onMouseEnter={() => setActiveId(project.id)}
								onFocus={() => setActiveId(project.id)}
								className={cn(
									"group relative flex w-full items-baseline justify-between gap-6 px-5 py-4 text-left transition-colors sm:px-8 sm:py-5",
									"outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-inset"
								)}
							>
								{/* Horizontal hover bar */}
								<motion.span
									className={cn(
										"pointer-events-none absolute inset-y-0 left-0 right-0 -z-0",
										isLight ? "bg-white" : "bg-zinc-800"
									)}
									initial={false}
									animate={{
										opacity: isActive ? 1 : 0,
										scaleY: isActive ? 1 : 0.85,
									}}
									transition={{ duration: 0.22, ease }}
								/>

								<span
									className={cn(
										"relative z-10 text-sm font-normal tracking-tight sm:text-base md:text-lg",
										isActive
											? isLight
												? "text-zinc-950"
												: "text-white"
											: isLight
												? "text-zinc-500"
												: "text-zinc-400"
									)}
								>
									{project.title}
								</span>
								<span
									className={cn(
										"relative z-10 shrink-0 text-right text-xs sm:text-sm",
										isActive
											? isLight
												? "text-zinc-600"
												: "text-zinc-300"
											: isLight
												? "text-zinc-400"
												: "text-zinc-600"
									)}
								>
									{project.meta}
								</span>
							</button>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
