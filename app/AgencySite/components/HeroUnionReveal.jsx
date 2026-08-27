import React, { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const VIDEO_SRC = "/agency/doodle-6.mp4";
const MESSAGE = "Fade UNI + N, scale the O, keep the doodle fixed — that is how Union Reveal was built.";

/** Display face for UNI / N / O — not the default UI sans */
const DISPLAY_FONT =
	'"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif';

/**
 * Looping doodle cyclist — always playing; size never changes.
 */
function LoopingDoodle({ className }) {
	const videoRef = useRef(null);

	useEffect(() => {
		const v = videoRef.current;
		if (!v) return undefined;
		v.muted = true;
		v.loop = true;
		v.playsInline = true;
		const play = () => {
			const p = v.play();
			if (p && typeof p.catch === "function") p.catch(() => {});
		};
		if (v.readyState >= 2) play();
		v.addEventListener("loadeddata", play);
		return () => v.removeEventListener("loadeddata", play);
	}, []);

	return (
		<video
			ref={videoRef}
			src={VIDEO_SRC}
			muted
			loop
			playsInline
			autoPlay
			preload="auto"
			draggable={false}
			className={cn("h-full w-full bg-transparent object-contain", className)}
			aria-label="Cycling doodle"
		/>
	);
}

/**
 * HeroUnionReveal — UNION with doodle inside O.
 * Scroll fades UNI + N, scales only the outer O letter, shifts the (fixed-size) doodle in X, then shows message below.
 */
export default function HeroUnionReveal({
	isLight = true,
	className,
	scrollHeightVh = 380,
}) {
	const sectionRef = useRef(null);

	const bg = isLight ? "#f4f2ed" : "#0a0a09";
	const ink = isLight ? "#111110" : "#f5f3ee";

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const p = useSpring(scrollYProgress, {
		stiffness: 70,
		damping: 28,
		restDelta: 0.001,
	});

	/* UNI + N fade / drift away */
	const sideOpacity = useTransform(p, [0.05, 0.28], [1, 0]);
	const sideXLeft = useTransform(p, [0.05, 0.3], [0, -40]);
	const sideXRight = useTransform(p, [0.05, 0.3], [0, 40]);

	/* Only the outer O letter scales — video stays put */
	const oLetterScale = useTransform(p, [0.08, 0.55], [1, 12]);
	const oLetterOpacity = useTransform(p, [0.35, 0.58], [1, 0]);

	/* Same doodle: slight X travel with scroll, no scale change */
	const doodleX = useTransform(p, [0.1, 0.75], [0, 56]);

	/* Message under the doodle */
	const msgOpacity = useTransform(p, [0.55, 0.75], [0, 1]);
	const msgY = useTransform(p, [0.55, 0.78], [24, 0]);
	const hintOpacity = useTransform(p, [0, 0.08, 0.2], [1, 0.5, 0]);

	const letterStyle = {
		fontFamily: DISPLAY_FONT,
		fontWeight: 800,
		fontStyle: "italic",
	};

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Union reveal with cycling doodle"
		>
			<div
				className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden"
				style={{ background: bg, color: ink }}
			>
				<div className="relative z-20 flex flex-col items-center">
					{/* Word row */}
					<div className="relative flex items-center justify-center">
						<motion.span
							className="select-none text-[clamp(3.5rem,14vw,8.5rem)] leading-none tracking-[-0.03em]"
							style={{ ...letterStyle, opacity: sideOpacity, x: sideXLeft }}
							aria-hidden
						>
							UNI
						</motion.span>

						{/* O slot — fixed video size; outer letter scales independently */}
						<div
							className="relative mx-[0.02em] flex items-center justify-center"
							style={{
								width: "clamp(3.5rem,14vw,8.5rem)",
								height: "clamp(3.5rem,14vw,8.5rem)",
							}}
						>
							{/* Outer O — scales with scroll */}
							<motion.svg
								viewBox="0 0 120 120"
								className="pointer-events-none absolute inset-0 h-full w-full"
								style={{
									scale: oLetterScale,
									opacity: oLetterOpacity,
									zIndex: 10,
								}}
								aria-hidden
							>
								<circle
									cx="60"
									cy="60"
									r="46"
									fill="none"
									stroke={ink}
									strokeWidth="11"
								/>
							</motion.svg>

							{/* Doodle — fixed size, drifts X with scroll */}
							<motion.div
								className={cn(
									"absolute inset-[16%] z-20 overflow-hidden rounded-full",
									isLight && "mix-blend-multiply"
								)}
								style={{ x: doodleX }}
							>
								<LoopingDoodle />
							</motion.div>

							<span className="sr-only">O</span>
						</div>

						<motion.span
							className="select-none text-[clamp(3.5rem,14vw,8.5rem)] leading-none tracking-[-0.03em]"
							style={{ ...letterStyle, opacity: sideOpacity, x: sideXRight }}
							aria-hidden
						>
							N
						</motion.span>
					</div>

					{/* Message below the doodle */}
					<motion.p
						className="mt-14 max-w-md px-6 text-center text-[15px] leading-relaxed sm:mt-16 sm:text-[17px]"
						style={{
							fontFamily: DISPLAY_FONT,
							opacity: msgOpacity,
							y: msgY,
							color: ink,
						}}
					>
						{MESSAGE}
					</motion.p>
				</div>

				<motion.p
					className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em]"
					style={{
						fontFamily: DISPLAY_FONT,
						opacity: hintOpacity,
						color: isLight ? "#8a8680" : "#7a7570",
					}}
				>
					↓ Scroll — open the O
				</motion.p>
			</div>
		</section>
	);
}
