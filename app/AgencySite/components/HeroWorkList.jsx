import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Making-of story: steps used to build this Work List hover preview. */
const DEFAULT_PROJECTS = [
	{
		id: "w1",
		title: "01 · Map the rows",
		meta: "Title left · meta right · full bleed",
		src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w2",
		title: "02 · Track hover id",
		meta: "useState · active row only",
		src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w3",
		title: "03 · Slide the highlight",
		meta: "Framer Motion · layout bar",
		src: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w4",
		title: "04 · Center the image",
		meta: "Absolute · mid viewport stack",
		src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w5",
		title: "05 · Stack depth behind",
		meta: "Previous 1–2 cards · scale & blur",
		src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w6",
		title: "06 · AnimatePresence swap",
		meta: "Enter / exit · soft ease",
		src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w7",
		title: "07 · Fresh Unsplash covers",
		meta: "Story stills · not brand work",
		src: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w8",
		title: "08 · Keep type quiet",
		meta: "No UI chrome · list is the UI",
		src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w9",
		title: "09 · Light / dark skins",
		meta: "Agency theme · zinc surfaces",
		src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w10",
		title: "10 · Ship one file",
		meta: "HeroWorkList.jsx · drop-in",
		src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83b?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w11",
		title: "11 · Wire to catalog",
		meta: "/?c=work-list · componentry",
		src: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80",
	},
	{
		id: "w12",
		title: "12 · Tell the making-of",
		meta: "This list is the story",
		src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
	},
];

const ease = [0.22, 1, 0.36, 1];

/**
 * HeroWorkList — full-width work rows (title left, meta right).
 * Hover: horizontal highlight bar + centered stacked image preview.
 */
export default function HeroWorkList({
	projects = DEFAULT_PROJECTS,
	brand = "componentry",
	heading = "Making Work List",
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
