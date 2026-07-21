import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD_WIDTH = 260;
const CARD_HEIGHT = 390;
const GAP = 18;
const LOOP_MS = 100000;

export default function HeroScreenshotCarousel({ screenshots, isLight }) {
	const [paused, setPaused] = useState(false);
	const stageRef = useRef(null);
	const rotationRef = useRef(0);

	const items = useMemo(
		() => [...screenshots, ...screenshots],
		[screenshots]
	);
	const count = items.length;
	const angleStep = 360 / count;
	const radius = Math.round(((CARD_WIDTH + GAP) * count) / (2 * Math.PI));

	useEffect(() => {
		if (paused) return undefined;
		let frameId = 0;
		let last = performance.now();

		const tick = (now) => {
			const delta = now - last;
			last = now;
			rotationRef.current =
				(rotationRef.current + (delta / LOOP_MS) * 360) % 360;
			if (stageRef.current) {
				stageRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
			}
			frameId = requestAnimationFrame(tick);
		};

		frameId = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frameId);
	}, [paused]);

	return (
		<section
			className={cn(
				"relative left-1/2 h-screen w-screen -translate-x-1/2 overflow-hidden",
				isLight ? "bg-zinc-100" : "bg-black"
			)}
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			aria-label="CRM product screenshots"
		>
			<div
				className={cn(
					"pointer-events-none absolute inset-0",
					isLight
						? "bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.95),transparent_58%)]"
						: "bg-[radial-gradient(circle_at_50%_35%,rgba(39,39,42,0.55),transparent_58%)]"
				)}
			/>

			<div
				className="absolute inset-0 flex items-center justify-center"
				style={{
					perspective: "1600px",
					perspectiveOrigin: "50% 48%",
				}}
			>
				<div
					ref={stageRef}
					className="relative will-change-transform"
					style={{
						width: CARD_WIDTH,
						height: CARD_HEIGHT,
						transformStyle: "preserve-3d",
						transform: "rotateY(0deg)",
					}}
				>
					{items.map((screenshot, index) => (
						<div
							key={`${screenshot.src}-${index}`}
							className="absolute left-0 top-0"
							style={{
								width: CARD_WIDTH,
								height: CARD_HEIGHT,
								transform: `rotateY(${index * angleStep}deg) translateZ(${-radius}px)`,
								transformStyle: "preserve-3d",
								backfaceVisibility: "hidden",
							}}
						>
							<Link href={screenshot.href} passHref>
								<a
									tabIndex={index >= screenshots.length ? -1 : undefined}
									aria-hidden={index >= screenshots.length}
									aria-label={`View ${screenshot.label} in the live demo`}
									className="group block h-full w-full"
								>
									<div
										className={cn(
											"relative h-[calc(100%-2rem)] overflow-hidden rounded-2xl border shadow-2xl transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]",
											isLight
												? "border-white/80 bg-white shadow-zinc-400/40"
												: "border-zinc-700/80 bg-zinc-900 shadow-black/70"
										)}
									>
										<img
											src={screenshot.src}
											alt={
												index < screenshots.length ? screenshot.alt : ""
											}
											aria-hidden={index >= screenshots.length}
											loading={index < 3 ? "eager" : "lazy"}
											className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
											width={1919}
											height={958}
											draggable={false}
										/>
										<div className="absolute inset-0 flex items-center justify-center bg-zinc-950/0 transition-colors duration-300 group-hover:bg-zinc-950/40">
											<span className="flex h-12 w-12 translate-y-2 items-center justify-center rounded-full border border-white/50 bg-white/95 text-zinc-900 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:animate-pulse">
												<Eye className="h-5 w-5" />
											</span>
										</div>
									</div>
									<div className="flex h-8 items-center justify-center">
										<span
											className={cn(
												"translate-y-1 text-xs font-semibold tracking-wide opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
												isLight ? "text-zinc-800" : "text-zinc-100"
											)}
										>
											{screenshot.label}
										</span>
									</div>
								</a>
							</Link>
						</div>
					))}
				</div>
			</div>

			<div
				className={cn(
					"pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28",
					isLight
						? "bg-gradient-to-r from-zinc-100 via-zinc-100/70 to-transparent"
						: "bg-gradient-to-r from-black via-black/70 to-transparent"
				)}
			/>
			<div
				className={cn(
					"pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28",
					isLight
						? "bg-gradient-to-l from-zinc-100 via-zinc-100/70 to-transparent"
						: "bg-gradient-to-l from-black via-black/70 to-transparent"
				)}
			/>
			<div
				className={cn(
					"pointer-events-none absolute inset-x-0 bottom-0 h-24",
					isLight
						? "bg-gradient-to-t from-zinc-50 to-transparent"
						: "bg-gradient-to-t from-zinc-950 to-transparent"
				)}
			/>
		</section>
	);
}
