import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_TEXT =
	"A kinetic typography experiment where scattered letters swirl into a tornado vortex before settling into readable paragraph text on a clean white background.";

function seededRandom(seed) {
	let s = seed % 2147483647;
	if (s <= 0) s += 2147483646;
	return () => {
		s = (s * 16807) % 2147483647;
		return (s - 1) / 2147483646;
	};
}

function buildLetterData(text) {
	const rand = seededRandom(42);
	const chars = text.split("");
	const letterCount = chars.filter((c) => c !== " ").length;
	let letterIdx = 0;

	return chars.map((char, index) => {
		if (char === " ") {
			return { char, index, isSpace: true };
		}

		const t = letterIdx / Math.max(letterCount - 1, 1);
		letterIdx += 1;

		const funnel = 0.12 + Math.pow(1 - t, 1.4) * 0.88;
		const splash = t > 0.82 ? (t - 0.82) / 0.18 : 0;
		const radius = (36 + funnel * 170 + splash * 140) * (0.5 + rand() * 0.95);
		const angle = t * Math.PI * 9 + rand() * Math.PI * 2;

		return {
			char,
			index,
			isSpace: false,
			vortex: {
				x: Math.cos(angle) * radius * (0.5 + splash * 1.3),
				y: (t - 0.5) * 440 + (rand() - 0.5) * 30,
				rotate: (rand() - 0.5) * 420,
				opacity: 0.28 + rand() * 0.72,
				size: 15 + rand() * 20,
			},
			stagger: t * 0.45 + rand() * 0.2,
		};
	});
}

/**
 * HeroKineticType — letters swirl in a tornado, then visibly fly into
 * paragraph positions (measured FLIP-style transition).
 */
export default function HeroKineticType({
	text = DEFAULT_TEXT,
	isLight = true,
	className,
	autoPlay = true,
	cycleMs = 9000,
}) {
	const letters = useMemo(() => buildLetterData(text), [text]);
	const nonSpace = useMemo(() => letters.filter((l) => !l.isSpace), [letters]);

	const stageRef = useRef(null);
	const measureRef = useRef(null);

	const [phase, setPhase] = useState("vortex"); // vortex | settle
	const [targets, setTargets] = useState({});
	const [spinning, setSpinning] = useState(true);

	const settled = phase === "settle";

	const measureTargets = useCallback(() => {
		const stage = stageRef.current;
		const measure = measureRef.current;
		if (!stage || !measure) return;

		const stageBox = stage.getBoundingClientRect();
		const originX = stageBox.left + stageBox.width / 2;
		const originY = stageBox.top + stageBox.height / 2;
		const next = {};

		measure.querySelectorAll("[data-letter-index]").forEach((el) => {
			const idx = el.getAttribute("data-letter-index");
			const box = el.getBoundingClientRect();
			next[idx] = {
				x: box.left + box.width / 2 - originX,
				y: box.top + box.height / 2 - originY,
				size: parseFloat(window.getComputedStyle(el).fontSize) || 18,
			};
		});

		setTargets(next);
	}, []);

	useLayoutEffect(() => {
		measureTargets();
		window.addEventListener("resize", measureTargets);
		return () => window.removeEventListener("resize", measureTargets);
	}, [measureTargets, text]);

	/* When settling, remeasure then stop spin so flight paths are clear */
	useEffect(() => {
		if (settled) {
			setSpinning(false);
			const id = requestAnimationFrame(() => measureTargets());
			return () => cancelAnimationFrame(id);
		}
		setSpinning(true);
		return undefined;
	}, [settled, measureTargets]);

	useEffect(() => {
		if (!autoPlay) return undefined;
		const id = setInterval(() => {
			setPhase((p) => (p === "vortex" ? "settle" : "vortex"));
		}, cycleMs);
		return () => clearInterval(id);
	}, [autoPlay, cycleMs]);

	const goVortex = () => setPhase("vortex");
	const goSettle = () => {
		measureTargets();
		setPhase("settle");
	};

	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-16 sm:py-24",
				isLight ? "bg-white" : "bg-zinc-950",
				className
			)}
			aria-label="Kinetic typography"
		>
			<div className="relative mx-auto flex min-h-[560px] w-full max-w-3xl flex-col items-center px-6">
				{/*
				  Invisible measurement paragraph — same copy/typography as final text
				  so we know where each letter should land.
				*/}
				<div
					ref={stageRef}
					className="relative flex min-h-[420px] w-full flex-1 items-center justify-center"
				>
					<p
						ref={measureRef}
						aria-hidden
						className={cn(
							"pointer-events-none absolute left-1/2 top-1/2 z-0 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 text-center text-lg leading-relaxed sm:text-xl sm:leading-relaxed",
							"opacity-0"
						)}
					>
						{letters.map((item) =>
							item.isSpace ? (
								<span key={`m-s-${item.index}`}>{" "}</span>
							) : (
								<span
									key={`m-${item.index}`}
									data-letter-index={item.index}
									className="inline-block"
								>
									{item.char}
								</span>
							)
						)}
					</p>

					{/* Animated letters — single layer, vortex → paragraph flight */}
					<div className="absolute inset-0 z-10 overflow-visible">
						{nonSpace.map((item) => {
							const v = item.vortex;
							const target = targets[String(item.index)];
							const toX = settled && target ? target.x : v.x;
							const toY = settled && target ? target.y : v.y;
							const toSize = settled && target ? target.size : v.size;
							const toRotate = settled ? 0 : v.rotate;
							const toOpacity = settled ? 1 : v.opacity;

							return (
								<motion.span
									key={item.index}
									className={cn(
										"absolute left-1/2 top-1/2 origin-center font-sans font-medium leading-none",
										isLight ? "text-zinc-900" : "text-zinc-100"
									)}
									transformTemplate={({ x, y, rotate }) =>
										`translate(-50%, -50%) translate(${x}, ${y}) rotate(${rotate})`
									}
									initial={false}
									animate={{
										x: toX,
										y: toY,
										rotate: toRotate,
										opacity: toOpacity,
										fontSize: toSize,
									}}
									transition={{
										type: "spring",
										stiffness: settled ? 100 : 80,
										damping: settled ? 16 : 14,
										mass: 0.9,
										delay: settled
											? 0.05 + item.stagger * 0.7
											: item.stagger * 0.3,
									}}
								>
									<motion.span
										className="block will-change-transform"
										animate={
											spinning && !settled
												? { rotate: 360 }
												: { rotate: 0 }
										}
										transition={
											spinning && !settled
												? {
														duration: 5.5 + (item.index % 6) * 0.35,
														repeat: Infinity,
														ease: "linear",
												  }
												: {
														duration: 0.5,
														ease: [0.22, 1, 0.36, 1],
												  }
										}
									>
										{item.char}
									</motion.span>
								</motion.span>
							);
						})}
					</div>
				</div>

				<p className="sr-only">{text}</p>

				{/* Controls */}
				<div className="relative z-20 mt-6 flex items-center gap-3 pb-2">
					<button
						type="button"
						onClick={goVortex}
						className={cn(
							"rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
							!settled
								? isLight
									? "bg-zinc-900 text-white"
									: "bg-white text-zinc-900"
								: isLight
									? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
									: "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
						)}
					>
						Vortex
					</button>
					<button
						type="button"
						onClick={goSettle}
						className={cn(
							"rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
							settled
								? isLight
									? "bg-zinc-900 text-white"
									: "bg-white text-zinc-900"
								: isLight
									? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
									: "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
						)}
					>
						Settle
					</button>
				</div>
			</div>
		</section>
	);
}
