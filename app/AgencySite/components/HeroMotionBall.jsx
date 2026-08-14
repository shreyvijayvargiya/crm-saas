import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const HEADLINE = [
	"GOOD",
	"ANIMATION",
	"ALSO MAKES",
	"THE WHOLE USER",
	"EXPERIENCE",
	"MORE HUMAN",
	"MORE",
	"MEMORABLE",
	"AND EXCITING.",
];

function MotionBall({ size = 56, fill, core }) {
	return (
		<div
			className="relative rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.14)]"
			style={{ width: size, height: size, background: fill }}
		>
			<span
				className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
				style={{ width: size * 0.16, height: size * 0.16, background: core }}
			/>
		</div>
	);
}

/**
 * HeroMotionBall — light theme.
 * Full-width line + ball act as a mask edge:
 * text ABOVE the line is hidden; text BELOW stays visible.
 * Scroll drives the text upward through that edge.
 */
export default function HeroMotionBall({
	isLight = true,
	className,
	scrollHeightVh = 320,
}) {
	const sectionRef = useRef(null);

	const bg = isLight ? "#fafafa" : "#050505";
	const ink = isLight ? "#0a0a0a" : "#f5f5f5";
	const ballFill = isLight ? "#0a0a0a" : "#f5f5f5";
	const ballCore = isLight ? "#fafafa" : "#0a0a0a";

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const p = useSpring(scrollYProgress, {
		stiffness: 85,
		damping: 28,
		restDelta: 0.001,
	});

	/* Ball sits near the top third; text travels up through it */
	const ballTop = "28%";
	const textY = useTransform(p, [0, 1], ["18vh", "-110vh"]);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Motion ball text mask"
		>
			<div
				className="sticky top-0 h-screen overflow-hidden"
				style={{ background: bg, color: ink }}
			>
				{/*
				  Text layer — clipped so only the region BELOW the ball line shows.
				  clip-path top edge matches ballTop (28%).
				*/}
				<div
					className="pointer-events-none absolute inset-0 flex justify-center px-4"
					style={{
						clipPath: "inset(28% 0 0 0)",
						WebkitClipPath: "inset(28% 0 0 0)",
					}}
				>
					<motion.div
						style={{ y: textY }}
						className="w-full max-w-5xl pt-[32vh] text-center"
					>
						{HEADLINE.map((line) => (
							<p
								key={line}
								className="text-[clamp(2.6rem,9.5vw,6.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.03em]"
							>
								{line}
							</p>
						))}
					</motion.div>
				</div>

				{/*
				  Solid cover above the line — guarantees nothing above the ball is visible
				  (extra safety on top of clip-path).
				*/}
				<div
					className="pointer-events-none absolute inset-x-0 top-0 z-10"
					style={{ height: "28%", background: bg }}
				/>

				{/* Full-width scanning line */}
				<div
					className="pointer-events-none absolute inset-x-0 z-20"
					style={{ top: ballTop }}
				>
					<div className="h-px w-full" style={{ background: ink }} />
				</div>

				{/* Ball centered on the line */}
				<div
					className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
					style={{ top: ballTop }}
				>
					<MotionBall size={56} fill={ballFill} core={ballCore} />
				</div>
			</div>
		</section>
	);
}
