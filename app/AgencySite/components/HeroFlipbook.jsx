import React, { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Each spread = open book with distinct left + right pages.
 * Forward: right page flips from spine (origin left).
 * Backward: left page flips from spine (origin right).
 */
const SPREADS = [
	{
		id: "innovation",
		left: {
			text: "If you want innovation, you must give people room to fail safely",
			textColor: "dark",
			gradient: "linear-gradient(180deg, #7ec8e3 0%, #f5d0c8 55%, #faf6f2 100%)",
			image:
				"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
			imageClass: "object-cover object-[center_70%] opacity-40 mix-blend-multiply",
		},
		right: {
			text: "The teamwork graph is about seeing how work, people, and goals connect in one view",
			textColor: "light",
			image:
				"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
			imageClass: "object-cover object-center",
		},
	},
	{
		id: "starters",
		left: {
			text: "Starters",
			subtext: "Caprese bruschetta · Burrata · Calamari fritti · Soup of the day",
			textColor: "dark",
			theme: "menu-light",
		},
		right: {
			text: "From $8",
			subtext: "Seasonal plates to share. Ask about allergen-friendly options.",
			textColor: "dark",
			image:
				"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80",
			imageClass: "object-cover object-center",
			overlay: "rgba(255,255,255,0.72)",
		},
	},
	{
		id: "mains",
		left: {
			text: "Main dishes",
			subtext: "Puttanesca · Margherita · Branzino · Ribeye 12oz",
			textColor: "light",
			theme: "menu-dark",
		},
		right: {
			text: "Chef's picks tonight",
			subtext: "Wood-fired pizza and line-caught fish. Pair with house wine.",
			textColor: "light",
			image:
				"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
			imageClass: "object-cover object-center",
			overlay: "rgba(0,0,0,0.45)",
		},
	},
	{
		id: "dessert",
		left: {
			text: "Dessert & drinks",
			subtext: "Matcha ice cream · Tiramisu · Mojito · Espresso martini",
			textColor: "dark",
			gradient: "linear-gradient(165deg, #fef3c7 0%, #fde68a 40%, #faf8f5 100%)",
		},
		right: {
			text: "See you at the table",
			subtext: "Casa Verde · Farm to table since 1992",
			textColor: "light",
			image:
				"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
			imageClass: "object-cover object-center",
			overlay: "rgba(0,0,0,0.4)",
		},
	},
];

const ease = [0.65, 0, 0.35, 1];

function BookSpine() {
	return (
		<>
			{/* Wide gutter valley — darkest at center fold */}
			<div
				className="pointer-events-none absolute inset-y-0 left-1/2 z-40 w-[14%] -translate-x-1/2"
				style={{
					background:
						"linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.14) 38%, rgba(0,0,0,0.42) 49%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.42) 51%, rgba(0,0,0,0.14) 62%, rgba(0,0,0,0) 100%)",
				}}
			/>
			{/* Crisp center crease */}
			<div
				className="pointer-events-none absolute inset-y-0 left-1/2 z-50 w-px -translate-x-1/2"
				style={{
					background:
						"linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.08))",
				}}
			/>
		</>
	);
}

function PageSide({ side, edge = "left", className }) {
	const isDarkText = side.textColor === "dark";
	const isMenuDark = side.theme === "menu-dark";
	const isMenuLight = side.theme === "menu-light";

	return (
		<div
			className={cn(
				"relative h-full w-full overflow-hidden",
				edge === "left" ? "rounded-l-[28px] sm:rounded-l-[32px]" : "rounded-r-[28px] sm:rounded-r-[32px]",
				isMenuDark && "bg-zinc-950",
				isMenuLight && "bg-[#faf8f5]",
				className
			)}
			style={side.gradient && !side.image ? { background: side.gradient } : undefined}
		>
			{side.image && (
				<img
					src={side.image}
					alt=""
					className={cn("absolute inset-0 h-full w-full", side.imageClass || "object-cover")}
					draggable={false}
				/>
			)}
			{side.overlay && (
				<div className="absolute inset-0" style={{ background: side.overlay }} />
			)}

			{/* Page curl shadow toward spine */}
			<div
				className={cn(
					"pointer-events-none absolute inset-y-0 z-10 w-[22%]",
					edge === "left" ? "right-0" : "left-0"
				)}
				style={{
					background:
						edge === "left"
							? "linear-gradient(270deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)"
							: "linear-gradient(90deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)",
				}}
			/>

			<div className="relative z-20 flex h-full flex-col p-6 sm:p-8 md:p-10">
				<p
					className={cn(
						"max-w-[95%] font-serif text-xl font-bold leading-[1.25] tracking-tight sm:text-2xl md:text-[1.65rem] md:leading-[1.2]",
						isDarkText ? "text-zinc-900" : "text-white",
						isMenuDark && "text-zinc-50",
						isMenuLight && "text-zinc-900"
					)}
				>
					{side.text}
				</p>
				{side.subtext && (
					<p
						className={cn(
							"mt-3 max-w-[90%] text-xs leading-relaxed sm:text-sm",
							isDarkText ? "text-zinc-700/90" : "text-white/85",
							isMenuDark && "text-zinc-400",
							isMenuLight && "text-zinc-600"
						)}
					>
						{side.subtext}
					</p>
				)}
			</div>
		</div>
	);
}

function Spread({ spread, className }) {
	return (
		<div className={cn("flex h-full w-full", className)}>
			<div className="h-full w-1/2">
				<PageSide side={spread.left} edge="left" />
			</div>
			<div className="h-full w-1/2">
				<PageSide side={spread.right} edge="right" />
			</div>
		</div>
	);
}

/**
 * HeroFlipbook — open-book spread with left/right content and spine gutter.
 */
export default function HeroFlipbook({
	spreads = SPREADS,
	isLight = true,
	className,
}) {
	const list = spreads.length ? spreads : SPREADS;
	const [index, setIndex] = useState(0);
	const [dir, setDir] = useState(1);
	const [flipping, setFlipping] = useState(false);

	const canPrev = index > 0 && !flipping;
	const canNext = index < list.length - 1 && !flipping;

	const current = list[index];

	const go = useCallback(
		(nextDir) => {
			if (flipping) return;
			const next = index + nextDir;
			if (next < 0 || next >= list.length) return;
			setDir(nextDir);
			setFlipping(true);
			setIndex(next);
		},
		[index, list.length, flipping]
	);

	const finishFlip = useCallback(() => setFlipping(false), []);

	const flipDuration = 0.9;
	const fromIndex = dir > 0 ? index - 1 : index + 1;
	const turningSide =
		dir > 0 ? list[fromIndex]?.right : list[fromIndex]?.left;

	return (
		<section
			className={cn(
				"relative mx-auto w-full max-w-5xl px-4 py-14 sm:px-6 sm:py-16",
				className
			)}
			aria-label="Flipbook spread"
		>
			<div className="mb-6 text-center">
				<p
					className={cn(
						"text-[11px] font-semibold uppercase tracking-[0.2em]",
						isLight ? "text-zinc-500" : "text-zinc-500"
					)}
				>
					Flipbook
				</p>
				<h2
					className={cn(
						"mt-1 text-2xl font-bold tracking-tight sm:text-3xl",
						isLight ? "text-zinc-950" : "text-white"
					)}
				>
					Open spread
				</h2>
			</div>

			<div className="relative flex items-center justify-center gap-2 sm:gap-4">
				<button
					type="button"
					onClick={() => canPrev && go(-1)}
					disabled={!canPrev}
					className={cn(
						"z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-md transition disabled:opacity-30",
						isLight
							? "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
							: "border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
					)}
					aria-label="Previous spread"
				>
					<ChevronLeft className="h-5 w-5" />
				</button>

				<div
					className="relative w-full max-w-4xl overflow-visible py-2"
					style={{ perspective: "2400px", perspectiveOrigin: "50% 50%" }}
				>
					<div
						className={cn(
							"relative aspect-[16/10] w-full overflow-hidden rounded-[28px] shadow-2xl sm:aspect-[2/1] sm:rounded-[32px]",
							isLight ? "shadow-zinc-400/35" : "shadow-black/55"
						)}
						style={{ transformStyle: "preserve-3d" }}
					>
						{/* Base spread (destination while flipping, current when idle) */}
						<div className="absolute inset-0" style={{ zIndex: 1 }}>
							<Spread spread={current} />
						</div>

						<BookSpine />

						{/* Turning page half */}
						<AnimatePresence initial={false}>
							{flipping && dir > 0 && turningSide && (
								<motion.div
									key={`flip-r-${fromIndex}-to-${index}`}
									className="absolute right-0 top-0 h-full w-1/2"
									style={{
										transformStyle: "preserve-3d",
										transformOrigin: "0% 50%",
										zIndex: 8,
									}}
									initial={{ rotateY: 0 }}
									animate={{ rotateY: -180 }}
									transition={{ duration: flipDuration, ease }}
									onAnimationComplete={(def) => {
										if (def === "animate") finishFlip();
									}}
								>
									<div
										className="absolute inset-0 h-full w-full"
										style={{
											backfaceVisibility: "hidden",
											WebkitBackfaceVisibility: "hidden",
										}}
									>
										<PageSide side={turningSide} edge="right" />
									</div>
									{/* Back of page (reverse side) */}
									<div
										className="absolute inset-0 h-full w-full"
										style={{
											transform: "rotateY(180deg)",
											backfaceVisibility: "hidden",
											WebkitBackfaceVisibility: "hidden",
											background: "#f4f4f0",
										}}
									>
										<div className="flex h-full items-center justify-center p-6">
											<p className="text-center font-serif text-sm text-zinc-400">
												· · ·
											</p>
										</div>
									</div>
									{/* Edge shadow while turning */}
									<div
										className="pointer-events-none absolute inset-y-0 left-0 w-8"
										style={{
											background:
												"linear-gradient(90deg, rgba(0,0,0,0.35), transparent)",
										}}
									/>
								</motion.div>
							)}

							{flipping && dir < 0 && turningSide && (
								<motion.div
									key={`flip-l-${fromIndex}-to-${index}`}
									className="absolute left-0 top-0 h-full w-1/2"
									style={{
										transformStyle: "preserve-3d",
										transformOrigin: "100% 50%",
										zIndex: 8,
									}}
									initial={{ rotateY: 0 }}
									animate={{ rotateY: 180 }}
									transition={{ duration: flipDuration, ease }}
									onAnimationComplete={(def) => {
										if (def === "animate") finishFlip();
									}}
								>
									<div
										className="absolute inset-0 h-full w-full"
										style={{
											backfaceVisibility: "hidden",
											WebkitBackfaceVisibility: "hidden",
										}}
									>
										<PageSide side={turningSide} edge="left" />
									</div>
									<div
										className="absolute inset-0 h-full w-full"
										style={{
											transform: "rotateY(180deg)",
											backfaceVisibility: "hidden",
											WebkitBackfaceVisibility: "hidden",
											background: "#f4f4f0",
										}}
									>
										<div className="flex h-full items-center justify-center p-6">
											<p className="text-center font-serif text-sm text-zinc-400">
												· · ·
											</p>
										</div>
									</div>
									<div
										className="pointer-events-none absolute inset-y-0 right-0 w-8"
										style={{
											background:
												"linear-gradient(270deg, rgba(0,0,0,0.35), transparent)",
										}}
									/>
								</motion.div>
							)}
						</AnimatePresence>

						{/* Click zones */}
						<button
							type="button"
							className="absolute inset-y-0 left-0 z-50 w-1/2 cursor-w-resize bg-transparent"
							onClick={() => canPrev && go(-1)}
							aria-label="Flip previous spread"
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 z-50 w-1/2 cursor-e-resize bg-transparent"
							onClick={() => canNext && go(1)}
							aria-label="Flip next spread"
						/>
					</div>
				</div>

				<button
					type="button"
					onClick={() => canNext && go(1)}
					disabled={!canNext}
					className={cn(
						"z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border shadow-md transition disabled:opacity-30",
						isLight
							? "border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50"
							: "border-zinc-700 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
					)}
					aria-label="Next spread"
				>
					<ChevronRight className="h-5 w-5" />
				</button>
			</div>

			<div className="mt-5 flex justify-center">
				<span
					className={cn(
						"rounded-full px-3 py-1 text-xs font-medium tabular-nums",
						isLight ? "bg-zinc-900 text-white" : "bg-zinc-100 text-zinc-900"
					)}
				>
					{index + 1} / {list.length}
				</span>
			</div>
		</section>
	);
}
