import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const PORTRAIT =
	"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80";

const STORY = {
	greeting: "Dear reader,",
	paras: [
		"I keep a small notebook for days that refuse to end on time — the ones where the clock softens and a single conversation stretches across an afternoon like wet ink.",
		"This year I learned that the best work arrives the way paper does: scored once, folded twice, and opened again when someone is ready to look closely.",
		"If you are holding this letter on a screen, treat the scroll as a crease. What was sealed becomes readable only as you move.",
	],
	closing: "Keep the fold soft. Keep the story unfinished on purpose.",
	sign: "M. Ellery",
	role: "Letterpress & late nights",
	mark: "Studio Fold®",
};

const PAPER_GRAIN_LIGHT = `url("data:image/svg+xml,${encodeURIComponent(
	`<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
		<filter id='n'>
			<feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/>
			<feColorMatrix values='0 0 0 0 0.55  0 0 0 0 0.52  0 0 0 0 0.48  0 0 0 0.18 0'/>
		</filter>
		<rect width='100%' height='100%' filter='url(%23n)'/>
	</svg>`
)}")`;

const PAPER_GRAIN_DARK = `url("data:image/svg+xml,${encodeURIComponent(
	`<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
		<filter id='n'>
			<feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/>
			<feColorMatrix values='0 0 0 0 0.92  0 0 0 0 0.9  0 0 0 0 0.86  0 0 0 0.12 0'/>
		</filter>
		<rect width='100%' height='100%' filter='url(%23n)'/>
	</svg>`
)}")`;

function PaperSkin({ children, className, rounded, paperBg, grain, ink }) {
	return (
		<div
			className={cn("relative h-full w-full overflow-hidden", className)}
			style={{
				backgroundColor: paperBg,
				backgroundImage: grain,
				backgroundBlendMode: "multiply",
				color: ink,
				borderBottomLeftRadius: rounded ? 3 : 0,
				borderBottomRightRadius: rounded ? 3 : 0,
			}}
		>
			{children}
		</div>
	);
}

/**
 * HeroFoldPaper — tri-fold letter opens / closes with scroll.
 * Light theme: light stage + cream paper + dark ink.
 * Dark theme: charcoal stage + dark paper + light ink.
 */
export default function HeroFoldPaper({
	isLight = true,
	className,
	scrollHeightVh = 320,
}) {
	const sectionRef = useRef(null);
	const [phase, setPhase] = useState("Closed");

	const stage = isLight ? "#e4e2dd" : "#0c0c0b";
	const paperBg = isLight ? "#f8f5ed" : "#1a1916";
	const ink = isLight ? "#1c1b19" : "#f3f0e8";
	const muted = isLight ? "#6a6660" : "#a39e96";
	const hint = isLight ? "#6a6660" : "#9a9590";
	const crease = isLight ? "rgba(0,0,0,0.14)" : "rgba(255,255,255,0.12)";
	const shade = isLight ? "rgba(0,0,0,0.16)" : "rgba(0,0,0,0.45)";
	const grain = isLight ? PAPER_GRAIN_LIGHT : PAPER_GRAIN_DARK;
	const rule = isLight ? "bg-black/20" : "bg-white/20";

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const p = useSpring(scrollYProgress, {
		stiffness: 95,
		damping: 28,
		restDelta: 0.001,
	});

	const topRotate = useTransform(p, [0, 0.55, 1], [-172, -38, 0]);
	const bottomRotate = useTransform(p, [0, 0.45, 1], [172, 52, 10]);
	const foldShadow = useTransform(p, [0, 0.5, 1], [0.5, 0.26, 0.07]);
	const stackLift = useTransform(p, [0, 1], [14, 0]);
	const hintOpacity = useTransform(p, [0, 0.12, 0.28], [1, 0.65, 0]);

	useEffect(() => {
		const unsub = p.onChange((v) => {
			if (v < 0.18) setPhase("Closed");
			else if (v > 0.82) setPhase("Open");
			else setPhase("Folding");
		});
		return unsub;
	}, [p]);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Folding paper letter"
			data-theme={isLight ? "light" : "dark"}
		>
			<div
				className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-4"
				style={{ background: stage }}
			>
				<div
					className="pointer-events-none absolute inset-0 opacity-55"
					style={{
						background: isLight
							? "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.7) 0%, transparent 58%)"
							: "radial-gradient(ellipse at 50% 40%, rgba(255,255,255,0.05) 0%, transparent 55%)",
					}}
					aria-hidden
				/>

				<p
					className="absolute left-6 top-8 z-20 font-serif text-[11px] uppercase tracking-[0.24em] sm:left-10"
					style={{ color: hint }}
				>
					Letterfold
				</p>
				<motion.p
					className="absolute right-6 top-8 z-20 font-serif text-[11px] tracking-[0.18em] sm:right-10"
					style={{ color: hint, opacity: hintOpacity }}
				>
					↓ Scroll to unfold
				</motion.p>

				<motion.div
					className="relative z-10 w-full max-w-[min(92vw,400px)]"
					style={{
						perspective: 1600,
						perspectiveOrigin: "50% 42%",
						y: stackLift,
					}}
				>
					<div
						className="relative mx-auto"
						style={{
							transformStyle: "preserve-3d",
							height: "min(76vh, 620px)",
							width: "100%",
						}}
					>
						{/* TOP third */}
						<motion.div
							className="absolute inset-x-0 top-0 z-30"
							style={{
								height: "33.334%",
								transformOrigin: "50% 100%",
								rotateX: topRotate,
								transformStyle: "preserve-3d",
							}}
						>
							<div
								className="absolute inset-0"
								style={{
									backfaceVisibility: "hidden",
									WebkitBackfaceVisibility: "hidden",
									transformStyle: "preserve-3d",
								}}
							>
								<PaperSkin paperBg={paperBg} grain={grain} ink={ink}>
									<div className="flex h-full flex-col items-center px-7 pt-6 sm:px-9 sm:pt-8">
										<img
											src={PORTRAIT}
											alt=""
											className="h-12 w-12 rounded-full object-cover ring-1 ring-black/10 sm:h-14 sm:w-14"
											draggable={false}
										/>
										<p
											className="mt-4 w-full text-center font-serif text-[12px] leading-relaxed"
											style={{ color: muted }}
										>
											{STORY.greeting}
										</p>
										<p
											className="mt-2 w-full text-justify font-serif text-[11.5px] leading-[1.55] sm:text-[13px]"
											style={{ color: ink }}
										>
											{STORY.paras[0]}
										</p>
									</div>
									<motion.div
										className="pointer-events-none absolute inset-x-0 bottom-0 h-9"
										style={{
											opacity: foldShadow,
											background: `linear-gradient(to top, ${shade}, transparent)`,
										}}
										aria-hidden
									/>
								</PaperSkin>
							</div>
							<div
								className="absolute inset-0"
								style={{
									transform: "rotateX(180deg)",
									backfaceVisibility: "hidden",
									WebkitBackfaceVisibility: "hidden",
								}}
								aria-hidden
							>
								<PaperSkin paperBg={paperBg} grain={grain} ink={ink} />
							</div>
							<div
								className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px"
								style={{ background: crease }}
							/>
						</motion.div>

						{/* MIDDLE third */}
						<div
							className="absolute inset-x-0 z-20 overflow-hidden"
							style={{
								top: "33.334%",
								height: "33.334%",
								boxShadow: isLight
									? "0 6px 20px rgba(0,0,0,0.07)"
									: "0 8px 28px rgba(0,0,0,0.4)",
							}}
						>
							<PaperSkin paperBg={paperBg} grain={grain} ink={ink}>
								<div className="flex h-full flex-col justify-center px-7 sm:px-9">
									<p
										className="w-full text-justify font-serif text-[11.5px] leading-[1.55] sm:text-[13px]"
										style={{ color: ink }}
									>
										{STORY.paras[1]}
									</p>
									<p
										className="mt-3 w-full text-justify font-serif text-[11.5px] leading-[1.55] sm:text-[13px]"
										style={{ color: ink }}
									>
										{STORY.paras[2]}
									</p>
								</div>
								<motion.div
									className="pointer-events-none absolute inset-x-0 top-0 h-7"
									style={{
										opacity: foldShadow,
										background: `linear-gradient(to bottom, ${shade}, transparent)`,
									}}
									aria-hidden
								/>
								<motion.div
									className="pointer-events-none absolute inset-x-0 bottom-0 h-7"
									style={{
										opacity: foldShadow,
										background: `linear-gradient(to top, ${shade}, transparent)`,
									}}
									aria-hidden
								/>
							</PaperSkin>
							<div
								className="pointer-events-none absolute inset-x-0 top-0 h-px"
								style={{ background: crease }}
							/>
							<div
								className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
								style={{ background: crease }}
							/>
						</div>

						{/* BOTTOM third */}
						<motion.div
							className="absolute inset-x-0 bottom-0 z-10"
							style={{
								height: "33.334%",
								transformOrigin: "50% 0%",
								rotateX: bottomRotate,
								transformStyle: "preserve-3d",
							}}
						>
							<div
								className="absolute inset-0"
								style={{
									backfaceVisibility: "hidden",
									WebkitBackfaceVisibility: "hidden",
								}}
							>
								<PaperSkin paperBg={paperBg} grain={grain} ink={ink} rounded>
									<div className="flex h-full flex-col items-center justify-between px-7 py-5 sm:px-9 sm:py-6">
										<p
											className="w-full text-center font-serif text-[11.5px] italic leading-relaxed sm:text-[12.5px]"
											style={{ color: muted }}
										>
											{STORY.closing}
										</p>
										<div className="flex w-full flex-col items-center">
											<p
												className="text-[26px] leading-none sm:text-[32px]"
												style={{
													fontFamily: "Georgia, 'Times New Roman', serif",
													fontStyle: "italic",
													color: ink,
												}}
											>
												{STORY.sign}
											</p>
											<p
												className="mt-2 font-serif text-[10px] tracking-[0.14em]"
												style={{ color: muted }}
											>
												{STORY.role}
											</p>
											<p
												className="mt-1 font-serif text-[11px] font-medium tracking-wide"
												style={{ color: ink }}
											>
												{STORY.mark}
											</p>
										</div>
									</div>
									<motion.div
										className="pointer-events-none absolute inset-x-0 top-0 h-9"
										style={{
											opacity: foldShadow,
											background: `linear-gradient(to bottom, ${shade}, transparent)`,
										}}
										aria-hidden
									/>
								</PaperSkin>
							</div>
							<div
								className="absolute inset-0"
								style={{
									transform: "rotateX(180deg)",
									backfaceVisibility: "hidden",
									WebkitBackfaceVisibility: "hidden",
								}}
								aria-hidden
							>
								<PaperSkin paperBg={paperBg} grain={grain} ink={ink} rounded />
							</div>
						</motion.div>
					</div>
				</motion.div>

				<div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
					<div className={cn("h-px w-14 sm:w-20", rule)} />
					<span
						className="min-w-[4.5rem] text-center font-serif text-[10px] uppercase tracking-[0.2em]"
						style={{ color: hint }}
					>
						{phase === "Closed" ? "Folded" : phase === "Open" ? "Open" : "Folding"}
					</span>
					<div className={cn("h-px w-14 sm:w-20", rule)} />
				</div>
			</div>
		</section>
	);
}
