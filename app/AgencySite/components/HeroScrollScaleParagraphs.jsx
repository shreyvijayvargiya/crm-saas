import React, { useEffect, useMemo, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_PARAGRAPHS = [
	"Build reusable motion blocks once, drop them into any landing page, and keep every interaction consistent across your product story.",
	"Scroll drives the narrative — each beat grows larger until it dissolves, making room for the next idea to take the stage.",
	"Scale to two hundred percent, fade to silence, reveal what follows. One sticky viewport, many chapters of type.",
	"Ship the component as a single file: sticky stage, scroll progress, and paragraph choreography you can restyle in minutes.",
];

const SCALE_START = 1;
const SCALE_END = 2;
/** Local progress where fade-out begins (scale already near peak). */
const FADE_START = 0.72;

function clamp01(v) {
	return Math.max(0, Math.min(1, v));
}

/**
 * Map global scroll progress → per-paragraph scale + opacity.
 * Each paragraph owns an equal slice of the scroll. Within its slice:
 * scale 1 → scaleEnd, then opacity → 0 so the next paragraph can take over.
 */
function stylesForParagraph(index, progress, count, scaleEnd, fadeStart) {
	const slice = 1 / Math.max(count, 1);
	const start = index * slice;
	const local = clamp01((progress - start) / slice);

	if (progress < start) {
		return { scale: SCALE_START, opacity: 0 };
	}
	if (progress >= start + slice) {
		return { scale: scaleEnd, opacity: 0 };
	}

	const scale = SCALE_START + local * (scaleEnd - SCALE_START);
	let opacity = 1;
	const fadeAt = Math.min(0.95, Math.max(0.4, fadeStart));
	if (local >= fadeAt) {
		opacity = 1 - (local - fadeAt) / (1 - fadeAt);
	}
	/* Soft entrance for follow-up paragraphs (first starts fully visible) */
	if (index > 0 && local < 0.08) {
		opacity = Math.min(opacity, local / 0.08);
	}

	return { scale, opacity: clamp01(opacity) };
}

/**
 * HeroScrollScaleParagraphs — sticky scroll story where each paragraph
 * scales up to 200%, then fades out to reveal the next.
 */
export default function HeroScrollScaleParagraphs({
	paragraphs = DEFAULT_PARAGRAPHS,
	isLight = true,
	className,
	scrollHeight,
	scaleEnd = SCALE_END,
	fadeStart = FADE_START,
}) {
	const containerRef = useRef(null);
	const nodesRef = useRef([]);
	const rafRef = useRef(null);
	const count = paragraphs.length;

	const height = scrollHeight || `${Math.max(count, 1) * 100 + 80}vh`;

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	const paint = useMemo(
		() => (progress) => {
			const nodes = nodesRef.current;
			for (let i = 0; i < count; i++) {
				const el = nodes[i];
				if (!el) continue;
				const { scale, opacity } = stylesForParagraph(
					i,
					progress,
					count,
					scaleEnd,
					fadeStart
				);
				el.style.transform = `translate(-50%, -50%) scale(${scale})`;
				el.style.opacity = String(opacity);
				el.style.pointerEvents = opacity > 0.05 ? "auto" : "none";
				el.setAttribute("aria-hidden", opacity < 0.05 ? "true" : "false");
			}
		},
		[count, scaleEnd, fadeStart]
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

	return (
		<section
			ref={containerRef}
			className={cn("relative w-full", className)}
			style={{ height }}
			aria-label="Scroll scale paragraphs"
		>
			{/* Full-viewport sticky stage (breaks out of AgencyShell max-width) */}
			<div
				className={cn(
					"sticky top-0 flex h-[100vh] items-center justify-center overflow-hidden px-6 py-16 sm:px-10 sm:py-20",
					isLight ? "bg-zinc-50" : "bg-[#0a0a0a]"
				)}
				style={{
					width: "100vw",
					marginLeft: "calc(50% - 50vw)",
				}}
			>
				<div
					className="relative mx-auto w-full max-w-4xl"
					style={{ minHeight: "14rem" }}
				>
					<p
						className={cn(
							"absolute left-0 top-0 z-10 text-[11px] font-semibold uppercase tracking-[0.2em]",
							isLight ? "text-zinc-400" : "text-zinc-600"
						)}
					>
						Scroll scale
					</p>

					{paragraphs.map((text, i) => {
						const initial = stylesForParagraph(
							i,
							0,
							count,
							scaleEnd,
							fadeStart
						);
						return (
							<p
								key={i}
								ref={(el) => {
									nodesRef.current[i] = el;
								}}
								className={cn(
									"absolute left-1/2 top-1/2 w-full max-w-4xl text-center text-[1.45rem] font-semibold leading-[1.45] tracking-tight sm:text-[1.85rem] md:text-[2.15rem] md:leading-[1.4]",
									isLight ? "text-zinc-950" : "text-white"
								)}
								style={{
									transform: `translate(-50%, -50%) scale(${initial.scale})`,
									opacity: initial.opacity,
									transformOrigin: "center center",
									willChange: "transform, opacity",
								}}
							>
								{text}
							</p>
						);
					})}
				</div>

				<div className="pointer-events-none absolute bottom-10 left-1/2 w-full max-w-xs -translate-x-1/2 px-4">
					<motion.div
						className={cn(
							"h-1 w-full overflow-hidden rounded-full",
							isLight ? "bg-zinc-200" : "bg-zinc-800"
						)}
					>
						<motion.div
							className={cn(
								"h-full origin-left rounded-full",
								isLight ? "bg-zinc-900" : "bg-white"
							)}
							style={{ scaleX: scrollYProgress }}
						/>
					</motion.div>
					<p
						className={cn(
							"mt-3 text-center text-xs",
							isLight ? "text-zinc-400" : "text-zinc-600"
						)}
					>
						Scroll · each paragraph scales to 200% then fades
					</p>
				</div>
			</div>
		</section>
	);
}
