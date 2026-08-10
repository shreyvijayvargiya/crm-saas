import React, { useEffect, useMemo, useRef } from "react";
import { useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_TEXT =
	"Open wide. Scroll deeper into the story — the mouth expands until it fills the frame, and the words wait inside.";

/** Max pupil travel up (SVG units) — partial, never to the eyelid */
const PUPIL_LIFT = 7;

function clamp01(v) {
	return Math.max(0, Math.min(1, v));
}

function lerp(a, b, t) {
	return a + (b - a) * t;
}

/**
 * HeroScrollFaceMouth — sticky face from SVG (hair, bun, ring eyes).
 * Scroll opens the mouth (line → tall oval → huge scale to fill 100vh),
 * pupils glance up a little, eyes shrink slightly, text appears inside.
 * Sticky stage breaks out to full viewport width.
 */
export default function HeroScrollFaceMouth({
	text = DEFAULT_TEXT,
	isLight = false,
	className,
	scrollHeight = "260vh",
	mouthScaleEnd = 16,
	eyeScaleEnd = 0.78,
	pupilLift = PUPIL_LIFT,
}) {
	const containerRef = useRef(null);
	const eyesRef = useRef(null);
	const pupilLeftRef = useRef(null);
	const pupilRightRef = useRef(null);
	const mouthRef = useRef(null);
	const mouthEllipseRef = useRef(null);
	const textRef = useRef(null);
	const labelRef = useRef(null);
	const barRef = useRef(null);
	const rafRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const paint = useMemo(
		() => (p) => {
			const t = clamp01(p);

			/* 0–0.28: mouth opens from a thin line into the tall oval */
			const openT = clamp01(t / 0.28);
			/* 0.18–1: mouth scales to fill the viewport */
			const scaleT = clamp01((t - 0.18) / 0.82);
			const eyeT = clamp01(t / 0.85);
			const textT = clamp01((t - 0.22) / 0.45);
			/* Pupils ease up with scroll, settle back to center on scroll-up */
			const pupilT = clamp01(t / 0.55);

			const eyeScale = lerp(1, eyeScaleEnd, eyeT);
			const mouthScale = lerp(1, mouthScaleEnd, scaleT * scaleT);
			/* Closed → SVG open mouth (rx=35, ry=45) */
			const mouthRy = lerp(4, 45, openT);
			const mouthRx = lerp(28, 35, openT);
			const pupilY = lerp(0, -pupilLift, pupilT);

			if (eyesRef.current) {
				eyesRef.current.setAttribute(
					"transform",
					`translate(150 120) scale(${eyeScale})`
				);
			}
			if (pupilLeftRef.current) {
				pupilLeftRef.current.setAttribute("cy", String(pupilY));
			}
			if (pupilRightRef.current) {
				pupilRightRef.current.setAttribute("cy", String(pupilY));
			}
			if (mouthRef.current) {
				mouthRef.current.setAttribute(
					"transform",
					`translate(150 190) scale(${mouthScale})`
				);
			}
			if (mouthEllipseRef.current) {
				mouthEllipseRef.current.setAttribute("ry", String(mouthRy));
				mouthEllipseRef.current.setAttribute("rx", String(mouthRx));
			}
			if (textRef.current) {
				textRef.current.style.opacity = String(textT);
				textRef.current.style.transform = `translate(-50%, -50%) scale(${lerp(
					0.92,
					1,
					textT
				)})`;
			}
			if (labelRef.current) {
				labelRef.current.style.opacity = String(1 - clamp01(t * 1.4));
			}
			if (barRef.current) {
				barRef.current.style.transform = `scaleX(${t})`;
			}
		},
		[eyeScaleEnd, mouthScaleEnd, pupilLift]
	);

	/* FM6: scrollYProgress.onChange — useMotionValueEvent is FM7+ */
	useEffect(() => {
		paint(0);
		const unsubscribe = scrollYProgress.onChange((v) => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			rafRef.current = requestAnimationFrame(() => paint(v));
		});
		return () => {
			unsubscribe();
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [scrollYProgress, paint]);

	const bg = isLight ? "bg-zinc-50" : "bg-black";

	return (
		<section
			ref={containerRef}
			className={cn("relative w-full", className)}
			style={{ height: scrollHeight }}
			aria-label="Scroll face mouth reveal"
		>
			{/* Full-viewport sticky stage (breaks out of AgencyShell max-width) */}
			<div
				className={cn("sticky top-0 h-[100vh] overflow-hidden", bg)}
				style={{
					width: "100vw",
					marginLeft: "calc(50% - 50vw)",
				}}
			>
				{/* White copy on top of the black mouth fill */}
				<div
					ref={textRef}
					className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex w-[min(90vw,32rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center px-4 text-center"
					style={{ opacity: 0, willChange: "opacity, transform" }}
				>
					<p className="text-center text-base font-semibold leading-relaxed tracking-tight text-white sm:text-lg md:text-2xl md:leading-snug">
						{text}
					</p>
				</div>

				<svg
					className="absolute inset-0 z-10 h-full w-full"
					viewBox="-20 -10 340 340"
					preserveAspectRatio="xMidYMid meet"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden
				>
					{/* Face */}
					<circle cx="150" cy="170" r="100" fill="#E8D8D0" />

					{/* Hair */}
					<path
						d="M50 170 C50 80 95 40 150 40 C205 40 250 80 250 170 L250 250 L50 250 Z"
						fill="#000"
					/>

					{/* Face overlay */}
					<circle cx="150" cy="170" r="95" fill="#E8D8D0" />

					{/* Bun + pins (static) */}
					<circle cx="150" cy="35" r="18" fill="#000" />
					<line
						x1="130"
						y1="25"
						x2="145"
						y2="35"
						stroke="#7A3A3A"
						strokeWidth="2"
					/>
					<line
						x1="170"
						y1="25"
						x2="155"
						y2="35"
						stroke="#7A3A3A"
						strokeWidth="2"
					/>

					{/* Eyes — scale from center; pupils lift on scroll */}
					<g ref={eyesRef} transform="translate(150 120) scale(1)">
						{/* Left eye */}
						<circle
							cx={-35}
							cy={0}
							r={35}
							fill="none"
							stroke="#D36A6A"
							strokeWidth={3}
						/>
						<line
							x1={-50}
							y1={0}
							x2={-20}
							y2={0}
							stroke="#000"
							strokeWidth={3}
						/>
						<circle
							ref={pupilLeftRef}
							cx={-35}
							cy={0}
							r={5}
							fill="#000"
						/>

						{/* Right eye */}
						<circle
							cx={35}
							cy={0}
							r={35}
							fill="none"
							stroke="#D36A6A"
							strokeWidth={3}
						/>
						<line
							x1={20}
							y1={0}
							x2={50}
							y2={0}
							stroke="#000"
							strokeWidth={3}
						/>
						<circle
							ref={pupilRightRef}
							cx={35}
							cy={0}
							r={5}
							fill="#000"
						/>
					</g>

					{/* Mouth — opens then scales to fill frame */}
					<g ref={mouthRef} transform="translate(150 190) scale(1)">
						<ellipse
							ref={mouthEllipseRef}
							cx={0}
							cy={0}
							rx={28}
							ry={4}
							fill="#000"
						/>
					</g>
				</svg>

				<p
					ref={labelRef}
					className={cn(
						"absolute left-4 top-6 z-20 text-[11px] font-semibold uppercase tracking-[0.2em] sm:left-8",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					Scroll face
				</p>

				<div className="pointer-events-none absolute bottom-8 left-1/2 z-20 w-full max-w-xs -translate-x-1/2 px-4">
					<div
						className={cn(
							"h-1 w-full overflow-hidden rounded-full",
							isLight ? "bg-zinc-200" : "bg-zinc-800"
						)}
					>
						<div
							ref={barRef}
							className={cn(
								"h-full origin-left rounded-full",
								isLight ? "bg-zinc-900" : "bg-white"
							)}
							style={{ transform: "scaleX(0)", willChange: "transform" }}
						/>
					</div>
					<p
						className={cn(
							"mt-3 text-center text-xs",
							isLight ? "text-zinc-400" : "text-zinc-600"
						)}
					>
						Scroll to reveal more
					</p>
				</div>
			</div>
		</section>
	);
}
