import React, { useEffect, useMemo, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_SEGMENTS = [
	{
		text: "We built Scroll Read Reveal by mapping scroll progress to characters: each glyph starts dim, then lights as the wheel advances. The accent phrase ",
	},
	{
		text: "useScroll → opacity",
		accent: true,
	},
	{
		text: " is the whole trick — one sticky stage, tokenized text, and a reading line that teaches how the component itself was wired, without changing the UI shell.",
	},
];

const DIM = 0.14;
const FULL = 1;

function buildTokens(segments) {
	const tokens = [];
	segments.forEach((seg, segIdx) => {
		const chars = seg.text.split("");
		chars.forEach((char, charIdx) => {
			tokens.push({
				char,
				accent: !!seg.accent,
				key: `${segIdx}-${charIdx}`,
			});
		});
	});
	return tokens;
}

function opacityForIndex(index, revealProgress, dim = DIM) {
	const delta = revealProgress - index;
	if (delta >= 1) return FULL;
	if (delta <= 0) return dim;
	return dim + delta * (FULL - dim);
}

/**
 * HeroScrollReadReveal — scroll progress reveals text character-by-character.
 * Revealed = full opacity; upcoming = dimmed for a focused reading line.
 */
export default function HeroScrollReadReveal({
	segments = DEFAULT_SEGMENTS,
	isLight = true,
	className,
	scrollHeight = "280vh",
	dimOpacity = DIM,
	accentClass,
}) {
	const containerRef = useRef(null);
	const tokens = useMemo(() => buildTokens(segments), [segments]);
	const rafRef = useRef(null);
	const spansRef = useRef([]);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 0.15", "end 0.85"],
	});

	const paint = useMemo(
		() => (revealProgress) => {
			const spans = spansRef.current;
			for (let i = 0; i < tokens.length; i++) {
				const el = spans[i];
				if (!el) continue;
				const opacity = opacityForIndex(i, revealProgress, dimOpacity);
				const dimmed = opacity < FULL - 0.02;
				el.style.opacity = String(opacity);
				if (tokens[i].accent) {
					el.style.color = dimmed
						? isLight
							? "rgba(99,102,241,0.35)"
							: "rgba(165,180,252,0.35)"
						: isLight
							? "#6366f1"
							: "#a5b4fc";
				}
			}
		},
		[tokens, dimOpacity, isLight]
	);

	/* FM6: scrollYProgress.onChange — useMotionValueEvent is FM7+ */
	useEffect(() => {
		const unsubscribe = scrollYProgress.onChange((v) => {
			const revealProgress = v * tokens.length;
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			rafRef.current = requestAnimationFrame(() => paint(revealProgress));
		});
		return () => {
			unsubscribe();
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [scrollYProgress, tokens.length, paint]);

	return (
		<section
			ref={containerRef}
			className={cn("relative w-full", className)}
			style={{ height: scrollHeight }}
			aria-label="Scroll read reveal"
		>
			<div
				className={cn(
					"sticky top-0 flex min-h-[88vh] items-center px-4 py-16 sm:px-8 sm:py-20",
					isLight ? "bg-zinc-50" : "bg-[#0a0a0a]"
				)}
			>
				<div className="mx-auto w-full max-w-3xl">
					<p
						className={cn(
							"mb-4 text-[11px] font-semibold uppercase tracking-[0.2em]",
							isLight ? "text-zinc-400" : "text-zinc-600"
						)}
					>
						Scroll read
					</p>

					<p
						className={cn(
							"text-[1.65rem] font-semibold leading-[1.35] tracking-tight sm:text-[1.85rem] md:text-[2rem] md:leading-[1.32]",
							isLight ? "text-zinc-950" : "text-white"
						)}
						aria-live="polite"
					>
						{tokens.map((token, i) => (
							<span
								key={token.key}
								ref={(el) => {
									spansRef.current[i] = el;
								}}
								className={cn(
									token.accent &&
										cn(
											"italic",
											accentClass ||
												(isLight ? "text-indigo-500" : "text-indigo-300")
										)
								)}
								style={{
									opacity: opacityForIndex(i, 0, dimOpacity),
									willChange: "opacity",
								}}
							>
								{token.char}
							</span>
						))}
					</p>

					<motion.div
						className={cn(
							"mt-10 h-1 w-full max-w-xs overflow-hidden rounded-full",
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
							"mt-3 text-xs",
							isLight ? "text-zinc-400" : "text-zinc-600"
						)}
					>
						Scroll to reveal · character opacity follows progress
					</p>
				</div>
			</div>
		</section>
	);
}
