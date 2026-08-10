import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Single red wool spool (left half of the dual-spool SVG). */
function WoolSpool({ className }) {
	return (
		<svg
			viewBox="48 0 180 512"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
		>
			<path
				fill="#D1D3D4"
				d="M185.961,0H83.654c-4.597,0-8.322,3.727-8.322,8.322v30.192h118.953V8.322 C194.284,3.727,190.558,0,185.961,0z"
			/>
			<rect x="75.337" y="19.257" fill="#BCBEC0" width="118.956" height="27.696" />
			<path
				fill="#D1D3D4"
				d="M194.284,473.485H75.332v30.192c0,4.597,3.727,8.322,8.322,8.322h102.307 c4.597,0,8.322-3.727,8.322-8.322V473.485z"
			/>
			<rect x="75.337" y="465.048" fill="#BCBEC0" width="118.956" height="27.696" />
			<path
				fill="#E44F50"
				d="M212.02,473.485H58.068c-5.379,0-9.741-4.362-9.741-9.741V48.257c0-5.379,4.362-9.741,9.741-9.741 H212.02c5.379,0,9.741,4.362,9.741,9.741v415.487C221.762,469.123,217.401,473.485,212.02,473.485z"
			/>
			<path
				fill="#DD263D"
				d="M212.082,38.515h-46.687c5.379,0,9.741,4.362,9.741,9.741v415.487c0,5.381-4.362,9.741-9.741,9.741 h46.687c5.381,0,9.741-4.361,9.741-9.741V48.257C221.824,42.876,217.462,38.515,212.082,38.515z"
			/>
			<path
				fill="#DD263D"
				d="M218.426,431.864l-83.823,33.267c-3.529,1.4-5.681,4.775-5.702,8.354h33.676l59.186-23.489V431.23 C220.651,431.227,219.522,431.43,218.426,431.864z"
			/>
			<path
				fill="#DD263D"
				d="M51.719,226.53l118.302-47.872c4.629-1.873,6.862-7.144,4.99-11.774 c-1.872-4.628-7.142-6.862-11.774-4.99l-114.911,46.5v18.798c0.001,0,0.002,0,0.004,0C49.46,227.193,50.607,226.979,51.719,226.53z"
			/>
			<path
				fill="#DD263D"
				d="M51.719,117.078l80.183-32.448c4.63-1.874,6.862-7.144,4.99-11.774 c-1.874-4.628-7.143-6.863-11.774-4.99L48.326,98.944v18.798c0.001,0,0.002,0,0.004,0C49.46,117.741,50.607,117.528,51.719,117.078 z"
			/>
			<path
				fill="#DD263D"
				d="M51.719,263.015l170.043-68.811v-18.797c-1.13-0.001-2.28,0.211-3.393,0.661l-170.043,68.81v18.799 c0.001,0,0.002,0,0.004,0C49.46,263.677,50.607,263.464,51.719,263.015z"
			/>
			<path
				fill="#DD263D"
				d="M51.719,299.497l170.043-68.81v-18.797c-1.13-0.001-2.28,0.211-3.393,0.661L48.326,281.363v18.798 c0.001,0,0.002,0,0.004,0C49.46,300.16,50.607,299.947,51.719,299.497z"
			/>
			<path
				fill="#DD263D"
				d="M51.719,153.563l170.043-68.81V65.956c-1.13-0.001-2.28,0.211-3.393,0.661L48.326,135.427v18.798 c0.001,0,0.002,0,0.004,0C49.46,154.225,50.607,154.013,51.719,153.563z"
			/>
			<path
				fill="#DD263D"
				d="M84.434,339.719c-4.629,1.873-6.862,7.144-4.99,11.774c1.424,3.518,4.809,5.652,8.385,5.652 c1.13,0,2.277-0.213,3.389-0.663l130.544-52.827v-18.797c-1.13-0.001-2.28,0.211-3.393,0.661L84.434,339.719z"
			/>
			<path
				fill="#DD263D"
				d="M51.719,190.046l170.043-68.81V102.44c-1.13-0.001-2.28,0.211-3.393,0.661L48.326,171.911v18.798 c0.001,0,0.002,0,0.004,0C49.46,190.709,50.607,190.496,51.719,190.046z"
			/>
			<path
				fill="#DD263D"
				d="M221.762,394.309c-1.13-0.001-2.28,0.211-3.393,0.662l-102.183,41.35 c-4.63,1.873-6.862,7.144-4.99,11.774c1.424,3.518,4.809,5.652,8.385,5.652c1.13,0,2.277-0.213,3.389-0.663l98.792-39.976V394.309z"
			/>
			<path
				fill="#DD263D"
				d="M51.719,408.949l170.043-68.81v-18.797c-1.13-0.001-2.28,0.21-3.393,0.661l-170.043,68.81v18.798 c0.001,0,0.002,0,0.004,0C49.46,409.611,50.607,409.399,51.719,408.949z"
			/>
			<path
				fill="#DD263D"
				d="M221.762,357.827c-1.13-0.001-2.28,0.21-3.393,0.661l-170.043,68.81v18.798c0.001,0,0.002,0,0.004,0 c1.13,0,2.277-0.213,3.389-0.663l170.043-68.81V357.827z"
			/>
			<path
				fill="#DD263D"
				d="M51.719,335.981l170.043-68.81v-18.796c-1.13-0.001-2.28,0.211-3.393,0.662L48.326,317.845v18.798 c0.001,0,0.002,0,0.004,0C49.46,336.644,50.607,336.431,51.719,335.981z"
			/>
			<path
				fill="#DD263D"
				d="M110.94,38.515L48.326,63.852V82.65c0.001,0,0.002,0,0.004,0c1.13,0,2.277-0.213,3.389-0.663 l86.718-35.09c3.517-1.423,5.646-4.808,5.647-8.381C144.084,38.515,110.94,38.515,110.94,38.515z"
			/>
		</svg>
	);
}

function TShirt({ className }) {
	return (
		<svg
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
			aria-hidden
		>
			<path
				fill="#ff80ca"
				d="M206.36,19.48l-2.56,5.12L255,135.533L306.2,24.6l-2.56-5.12 c-3.413-7.68-11.093-11.947-18.773-11.947h-58.88C217.453,7.533,209.773,11.8,206.36,19.48"
			/>
			<path
				fill="#ff0095"
				d="M383,502.467V161.133c0,0,2.56-60.587,25.6-68.267c0,0,3.413-18.773-76.8-42.667l-25.6-25.6l0,0 L255,135.533L203.8,24.6l-25.6,25.6c-80.213,23.893-76.8,42.667-76.8,42.667c23.893,7.68,25.6,68.267,25.6,68.267v341.333H383z"
			/>
			<path
				fill="#ff0095"
				d="M127,161.133c0,0-1.707-59.733-24.747-68.267H101.4L7.533,212.333L67.267,255L127,223.427V161.133z"
			/>
			<path
				fill="#ff0095"
				d="M383,161.133c0,0,1.707-59.733,24.747-68.267h0.853l93.867,119.467L442.733,255L383,223.427 V161.133z"
			/>
			<polygon fill="#ff0095" points="238.787,100.547 203.8,118.467 178.2,50.2 203.8,24.6" />
			<polygon fill="#ff0095" points="271.213,100.547 306.2,118.467 331.8,50.2 306.2,24.6" />
			<path
				fill="#ff0aca"
				d="M144.067,229.4v273.067H127v-281.6h8.533C139.8,220.867,144.067,225.133,144.067,229.4"
			/>
			<path
				fill="#ff0aca"
				d="M7.533,212.333L101.4,92.867h0.853c5.12,1.707,9.387,6.827,12.8,12.8L24.6,220.867L7.533,212.333z"
			/>
			<path
				fill="#ff80ca"
				d="M365.933,229.4v273.067H383v-281.6h-8.533C370.2,220.867,365.933,225.133,365.933,229.4"
			/>
			<path
				fill="#ff80ca"
				d="M502.467,212.333L408.6,92.867h-0.853c-5.12,1.707-9.387,6.827-12.8,12.8l90.453,115.2 L502.467,212.333z"
			/>
			<polygon fill="#f2fafd" points="161.133,502.467 212.333,502.467 212.333,468.333 161.133,468.333" />
			<polygon
				fill="#f2fafd"
				points="348.867,237.933 323.267,255 297.667,237.933 297.667,186.733 348.867,186.733"
			/>
			<path
				fill="#1a1a1a"
				d="M263.533,169.667c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533 S263.533,164.547,263.533,169.667"
			/>
			<path
				fill="#1a1a1a"
				d="M263.533,203.8c0,5.12-3.413,8.533-8.533,8.533s-8.533-3.413-8.533-8.533c0-5.12,3.413-8.533,8.533-8.533 S263.533,198.68,263.533,203.8"
			/>
		</svg>
	);
}

/** Short feed from spool into the tee (not a cross-stage journey). */
const FEED_D = "M 20 260 C 60 240, 100 220, 140 200";

/** Weave lines that print the shirt body as scroll progresses. */
const WEAVE = [
	{ d: "M 120 180 H 390", at: [0.05, 0.22] },
	{ d: "M 100 220 H 410", at: [0.12, 0.3] },
	{ d: "M 95 260 H 415", at: [0.2, 0.4] },
	{ d: "M 100 300 H 410", at: [0.28, 0.48] },
	{ d: "M 110 340 H 400", at: [0.36, 0.56] },
	{ d: "M 120 380 H 390", at: [0.44, 0.64] },
	{ d: "M 130 420 H 380", at: [0.52, 0.72] },
	{ d: "M 140 460 H 370", at: [0.6, 0.8] },
	{ d: "M 155 500 H 355", at: [0.68, 0.88] },
];

function WeaveLine({ d, smooth, range }) {
	const length = useTransform(smooth, range, [0, 1]);
	return (
		<motion.path
			d={d}
			fill="none"
			stroke="#E44F50"
			strokeWidth="3.5"
			strokeLinecap="round"
			opacity={0.85}
			style={{ pathLength: length }}
		/>
	);
}

function PrintEdge({ printY, smooth }) {
	const top = useTransform(printY, (v) => `${v * 100}%`);
	const opacity = useTransform(smooth, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
	return (
		<motion.div
			className="pointer-events-none absolute left-1/2 z-30 h-0.5 w-[72%] -translate-x-1/2 rounded-full bg-[#E44F50] shadow-[0_0_12px_rgba(228,79,80,0.8)]"
			style={{ top, opacity }}
		/>
	);
}

/**
 * HeroThreadShirt — spool feeds the tee; scroll prints/weaves the shirt in place (fast).
 */
export default function HeroThreadShirt({ isLight = true, className }) {
	const sectionRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	const smooth = useSpring(scrollYProgress, {
		stiffness: 160,
		damping: 26,
		restDelta: 0.001,
	});

	const spoolSpin = useTransform(smooth, [0, 1], [0, -420]);
	const printY = useTransform(smooth, [0, 0.85], [0, 1]);
	const shirtClip = useTransform(
		printY,
		(v) => `inset(0 0 ${((1 - v) * 100).toFixed(2)}% 0)`
	);
	const shirtOpacity = useTransform(smooth, [0, 0.08], [0.15, 1]);
	const feedLength = useTransform(smooth, [0, 0.2], [0, 1]);
	const hintOpacity = useTransform(smooth, [0, 0.1], [1, 0]);
	const doneOpacity = useTransform(smooth, [0.88, 1], [0, 1]);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: "160vh" }}
			aria-label="Thread printing a t-shirt"
		>
			<div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-transparent">
				<motion.p
					style={{ opacity: hintOpacity }}
					className={cn(
						"absolute left-1/2 top-8 z-20 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.24em]",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					Scroll to print
				</motion.p>

				<div className="relative z-10 flex w-full max-w-lg items-center justify-center gap-3 px-6 sm:gap-5 sm:px-10">
					<div className="relative z-20 w-[18%] max-w-[70px] shrink-0 sm:max-w-[84px]">
						<motion.div style={{ rotate: spoolSpin }}>
							<WoolSpool className="h-auto w-full drop-shadow-sm" />
						</motion.div>
						<svg
							className="pointer-events-none absolute left-full top-1/2 h-16 w-24 -translate-y-1/2 overflow-visible sm:w-28"
							viewBox="0 0 160 400"
							aria-hidden
						>
							<motion.path
								d={FEED_D}
								fill="none"
								stroke="#E44F50"
								strokeWidth="4"
								strokeLinecap="round"
								style={{ pathLength: feedLength }}
							/>
						</svg>
					</div>

					<div className="relative z-10 w-[58%] max-w-[280px]">
						<div
							className={cn(
								"absolute inset-0 opacity-[0.12]",
								isLight ? "brightness-0" : "brightness-200"
							)}
							aria-hidden
						>
							<TShirt className="h-auto w-full" />
						</div>

						<motion.div
							className="relative overflow-hidden"
							style={{
								opacity: shirtOpacity,
								clipPath: shirtClip,
							}}
						>
							<TShirt className="h-auto w-full drop-shadow-md" />
							<svg
								viewBox="0 0 512 512"
								className="pointer-events-none absolute inset-0 h-full w-full"
								aria-hidden
							>
								{WEAVE.map((row, i) => (
									<WeaveLine
										key={i}
										d={row.d}
										smooth={smooth}
										range={row.at}
									/>
								))}
							</svg>
						</motion.div>

						<PrintEdge printY={printY} smooth={smooth} />
					</div>
				</div>

				<motion.p
					style={{ opacity: doneOpacity }}
					className={cn(
						"mt-8 text-center text-sm font-medium tracking-tight",
						isLight ? "text-[#c2185b]" : "text-pink-300"
					)}
				>
					Shirt printed
				</motion.p>

				<div className="absolute bottom-10 left-1/2 z-20 w-full max-w-xs -translate-x-1/2 px-4">
					<div
						className={cn(
							"h-1 overflow-hidden rounded-full",
							isLight ? "bg-zinc-200/70" : "bg-zinc-800/70"
						)}
					>
						<motion.div
							className="h-full origin-left rounded-full bg-[#E44F50]"
							style={{ scaleX: smooth }}
						/>
					</div>
					<p
						className={cn(
							"mt-2 text-center font-mono text-[10px] uppercase tracking-[0.18em]",
							isLight ? "text-zinc-400" : "text-zinc-600"
						)}
					>
						Feed · weave · print
					</p>
				</div>
			</div>
		</section>
	);
}
