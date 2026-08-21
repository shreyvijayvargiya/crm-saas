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
 * HeroMotionBall — ball + full-width line scan DOWN with scroll.
 * Text ABOVE the moving edge stays hidden; text BELOW stays visible.
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

	/* Ball + line travel top → bottom as you scroll */
	const ballTop = useTransform(p, [0, 1], ["16%", "88%"]);
	const coverHeight = useTransform(p, [0, 1], ["16%", "88%"]);
	const clipPath = useTransform(
		p,
		[0, 1],
		["inset(16% 0 0 0)", "inset(88% 0 0 0)"]
	);
	/* Slight text drift so lines keep meeting the scanning edge */
	const textY = useTransform(p, [0, 1], ["8vh", "-28vh"]);

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
				{/* Text — only the region BELOW the moving ball line shows */}
				<motion.div
					className="pointer-events-none absolute inset-0 flex justify-center px-4"
					style={{
						clipPath,
						WebkitClipPath: clipPath,
					}}
				>
					<motion.div
						style={{ y: textY }}
						className="w-full max-w-5xl pt-[18vh] text-center"
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
				</motion.div>

				{/* Solid cover above the scanning edge */}
				<motion.div
					className="pointer-events-none absolute inset-x-0 top-0 z-10"
					style={{ height: coverHeight, background: bg }}
				/>

				{/* Full-width scanning line — moves with scroll */}
				<motion.div
					className="pointer-events-none absolute inset-x-0 z-20"
					style={{ top: ballTop }}
				>
					<div className="h-px w-full" style={{ background: ink }} />
				</motion.div>

				{/* Ball rides the line downward */}
				<motion.div
					className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
					style={{ top: ballTop }}
				>
					<MotionBall size={56} fill={ballFill} core={ballCore} />
				</motion.div>
			</div>
		</section>
	);
}
