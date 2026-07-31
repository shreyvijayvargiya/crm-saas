import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Frame 1 — stacked cards that assemble one-by-one */
const STACK_FRAMES = [
	{
		id: "s1",
		src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
		alt: "Studio portrait",
		rotate: -8,
	},
	{
		id: "s2",
		src: "https://via.placeholder.com/800x800?text=Image+Not+Found",
		alt: "Image not found",
		rotate: 6,
	},
	{
		id: "s3",
		src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
		alt: "Fashion editorial",
		rotate: -4,
	},
	{
		id: "s4",
		src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
		alt: "Portrait in field",
		rotate: 5,
	},
	{
		id: "s5",
		src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
		alt: "Close-up portrait",
		rotate: -6,
	},
	{
		id: "s6",
		src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
		alt: "Editorial portrait",
		rotate: 3,
	},
];

/** Frame 2 — full-screen cinematic set of 6 */
const SCENE_FRAMES = [
	{
		id: "f1",
		src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
		alt: "Abstract art",
		label: "Abstract",
	},
	{
		id: "f2",
		src: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80",
		alt: "Purple gradient",
		label: "Violet",
	},
	{
		id: "f3",
		src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80",
		alt: "Rainbow soft blur",
		label: "Spectrum",
	},
	{
		id: "f4",
		src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80",
		alt: "Geometric shapes",
		label: "Geometry",
	},
	{
		id: "f5",
		src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1200&q=80",
		alt: "Neon trails",
		label: "Neon",
	},
	{
		id: "f6",
		src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=80",
		alt: "Fluid render",
		label: "Fluid",
	},
];

const STACK_STEP_MS = 520;
const STACK_HOLD_MS = 900;
const SCENE_STEP_MS = 480;
const SCENE_HOLD_MS = 1600;
const LOOP_PAUSE_MS = 1100;

const ease = [0.22, 1, 0.36, 1];

const SCENE_LAYOUT = [
	{ col: "1 / 3", row: "1 / 3", delay: 0 },
	{ col: "3 / 4", row: "1 / 2", delay: 0.08 },
	{ col: "4 / 5", row: "1 / 2", delay: 0.16 },
	{ col: "3 / 5", row: "2 / 3", delay: 0.24 },
	{ col: "1 / 2", row: "3 / 4", delay: 0.32 },
	{ col: "2 / 5", row: "3 / 4", delay: 0.4 },
];

/**
 * HeroStoryFilm — component “movie”:
 * Frame 1: center card stack assembles one-by-one with rotation.
 * Frame 2: full-screen scene slides over frame 1; 6 images animate in with delays.
 * Loops like a silent film reel.
 */
export default function HeroStoryFilm({
	stackImages = STACK_FRAMES,
	sceneImages = SCENE_FRAMES,
	isLight = false,
	className,
	autoPlay = true,
}) {
	const stack = useMemo(
		() => (stackImages.length ? stackImages : STACK_FRAMES).slice(0, 6),
		[stackImages]
	);
	const scene = useMemo(
		() => (sceneImages.length ? sceneImages : SCENE_FRAMES).slice(0, 6),
		[sceneImages]
	);

	/** 'stack' | 'scene' */
	const [frame, setFrame] = useState("stack");
	/** How many stack cards are visible (1..stack.length) */
	const [stackCount, setStackCount] = useState(0);
	/** How many scene tiles are visible (0..scene.length) */
	const [sceneCount, setSceneCount] = useState(0);

	useEffect(() => {
		if (!autoPlay) return undefined;

		let cancelled = false;
		const timers = [];

		const wait = (ms) =>
			new Promise((resolve) => {
				const id = setTimeout(resolve, ms);
				timers.push(id);
			});

		const run = async () => {
			while (!cancelled) {
				/* —— Frame 1: assemble stack —— */
				setFrame("stack");
				setSceneCount(0);
				setStackCount(0);
				await wait(280);

				for (let i = 1; i <= stack.length; i++) {
					if (cancelled) return;
					setStackCount(i);
					await wait(STACK_STEP_MS);
				}

				await wait(STACK_HOLD_MS);
				if (cancelled) return;

				/* —— Frame 2: full-screen over frame 1 —— */
				setFrame("scene");
				setSceneCount(0);
				await wait(420);

				for (let i = 1; i <= scene.length; i++) {
					if (cancelled) return;
					setSceneCount(i);
					await wait(SCENE_STEP_MS);
				}

				await wait(SCENE_HOLD_MS);
				if (cancelled) return;

				/* Exit scene, loop */
				setSceneCount(0);
				await wait(LOOP_PAUSE_MS);
			}
		};

		run();

		return () => {
			cancelled = true;
			timers.forEach(clearTimeout);
		};
	}, [autoPlay, stack.length, scene.length]);

	return (
		<section
			className={cn(
				"relative left-1/2 h-[100vh] min-h-[560px] w-screen -translate-x-1/2 overflow-hidden",
				isLight ? "bg-zinc-100" : "bg-zinc-950",
				className
			)}
			aria-label="Story film animation"
		>
			{/* —— FRAME 1: stacking cards —— */}
			<motion.div
				className="absolute inset-0 z-10 flex flex-col items-center justify-center"
				animate={{
					scale: frame === "scene" ? 0.92 : 1,
					opacity: frame === "scene" ? 0.45 : 1,
					filter: frame === "scene" ? "blur(4px)" : "blur(0px)",
				}}
				transition={{ duration: 0.7, ease }}
			>
				<p
					className={cn(
						"mb-8 text-xs font-semibold uppercase tracking-[0.2em]",
						isLight ? "text-zinc-500" : "text-zinc-500"
					)}
				>
					Scene 01 · Assemble
				</p>

				<div className="relative h-[280px] w-[200px] sm:h-[340px] sm:w-[240px]">
					<AnimatePresence>
						{stack.slice(0, stackCount).map((card, index) => {
							const offset = index - (stackCount - 1) / 2;
							return (
								<motion.div
									key={card.id}
									className={cn(
										"absolute inset-0 overflow-hidden rounded-2xl border shadow-2xl",
										isLight
											? "border-white/80 shadow-zinc-400/40"
											: "border-white/10 shadow-black/50"
									)}
									style={{ zIndex: index + 1 }}
									initial={{
										opacity: 0,
										scale: 0.55,
										y: 80,
										rotate: card.rotate * 2,
										x: offset * 40,
									}}
									animate={{
										opacity: 1,
										scale: 1,
										y: offset * -6,
										x: offset * 10,
										rotate: card.rotate,
									}}
									exit={{ opacity: 0, scale: 0.8, y: -40 }}
									transition={{
										type: "spring",
										stiffness: 280,
										damping: 22,
										mass: 0.8,
									}}
								>
									<img
										src={card.src}
										alt={card.alt}
										draggable={false}
										className="h-full w-full object-cover"
									/>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>

				<p
					className={cn(
						"mt-8 text-sm tabular-nums",
						isLight ? "text-zinc-400" : "text-zinc-600"
					)}
				>
					{Math.min(stackCount, stack.length)} / {stack.length}
				</p>
			</motion.div>

			{/* —— FRAME 2: full-screen montage over frame 1 —— */}
			<AnimatePresence>
				{frame === "scene" && (
					<motion.div
						key="scene-frame"
						className={cn(
							"absolute inset-0 z-20 flex flex-col",
							isLight ? "bg-zinc-50" : "bg-black"
						)}
						initial={{ y: "100%", opacity: 0.6 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: "-12%", opacity: 0 }}
						transition={{ duration: 0.75, ease }}
					>
						<div className="flex items-center justify-between px-5 py-4 sm:px-8">
							<p
								className={cn(
									"text-xs font-semibold uppercase tracking-[0.2em]",
									isLight ? "text-zinc-500" : "text-zinc-400"
								)}
							>
								Scene 02 · Mosaic
							</p>
							<p
								className={cn(
									"text-xs tabular-nums",
									isLight ? "text-zinc-400" : "text-zinc-600"
								)}
							>
								{Math.min(sceneCount, scene.length)} / {scene.length}
							</p>
						</div>

						<div className="grid flex-1 grid-cols-4 grid-rows-3 gap-2 px-3 pb-3 sm:gap-3 sm:px-5 sm:pb-5">
							{scene.map((item, index) => {
								const layout = SCENE_LAYOUT[index] || SCENE_LAYOUT[0];
								const visible = index < sceneCount;

								return (
									<motion.div
										key={item.id}
										className="relative overflow-hidden rounded-xl sm:rounded-2xl"
										style={{
											gridColumn: layout.col,
											gridRow: layout.row,
										}}
										initial={false}
										animate={
											visible
												? {
														opacity: 1,
														scale: 1,
														y: 0,
														filter: "blur(0px)",
												  }
												: {
														opacity: 0,
														scale: 0.86,
														y: 36,
														filter: "blur(8px)",
												  }
										}
										transition={{
											duration: 0.55,
											ease,
											delay: visible ? layout.delay : 0,
										}}
									>
										<img
											src={item.src}
											alt={item.alt}
											draggable={false}
											className="h-full w-full object-cover"
										/>
										<motion.div
											className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
											initial={false}
											animate={{ opacity: visible ? 1 : 0 }}
										/>
										{visible && (
											<motion.span
												className="absolute bottom-3 left-3 text-xs font-semibold uppercase tracking-wider text-white sm:bottom-4 sm:left-4 sm:text-sm"
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: 0.2, duration: 0.4, ease }}
											>
												{item.label}
											</motion.span>
										)}
									</motion.div>
								);
							})}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Progress bar — filmic tick */}
			<div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-0.5 bg-white/10">
				<motion.div
					className="h-full bg-gradient-to-r from-orange-400 via-pink-500 to-violet-500"
					animate={{
						width:
							frame === "stack"
								? `${(stackCount / stack.length) * 50}%`
								: `${50 + (sceneCount / scene.length) * 50}%`,
					}}
					transition={{ duration: 0.35, ease }}
				/>
			</div>
		</section>
	);
}
