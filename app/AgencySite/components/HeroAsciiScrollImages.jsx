import React, { useEffect, useMemo, useRef, useState } from "react";
import { useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_IMAGES = [
	{
		src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
		label: "01 · Stack frames",
	},
	{
		src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
		label: "02 · Map scroll index",
	},
	{
		src: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
		label: "03 · ASCII blur overlay",
	},
	{
		src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
		label: "04 · Crossfade stills",
	},
	{
		src: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83b?auto=format&fit=crop&w=1200&q=80",
		label: "05 · Ship ASCII scroll",
	},
];

const ASCII_CHARS = " .:-=+*#%@";

/** Dense ASCII field for the blurry nature overlay */
function buildAsciiField(cols = 48, rows = 28) {
	const lines = [];
	for (let r = 0; r < rows; r++) {
		let line = "";
		for (let c = 0; c < cols; c++) {
			const n =
				Math.sin(r * 0.45 + c * 0.31) * 0.5 +
				Math.cos(c * 0.22 - r * 0.17) * 0.5;
			const idx = Math.floor(((n + 1) / 2) * (ASCII_CHARS.length - 1));
			line += ASCII_CHARS[idx];
		}
		lines.push(line);
	}
	return lines.join("\n");
}

const ASCII_FIELD = buildAsciiField();

function clamp01(v) {
	return Math.max(0, Math.min(1, v));
}

/**
 * HeroAsciiScrollImages — centered column of images.
 * Sticky active image is sharp; previous ones recede with CSS blur + ASCII nature overlay.
 */
export default function HeroAsciiScrollImages({
	images = DEFAULT_IMAGES,
	isLight = true,
	className,
	scrollPerImage = 100,
}) {
	const containerRef = useRef(null);
	const [active, setActive] = useState(0);
	const count = images.length;
	const height = `${Math.max(count, 1) * scrollPerImage + 40}vh`;

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	useEffect(() => {
		const unsub = scrollYProgress.onChange((v) => {
			const t = clamp01(v);
			const idx = Math.min(
				count - 1,
				Math.floor(t * count + (t >= 1 ? 0 : 0.0001))
			);
			setActive(idx);
		});
		return () => unsub();
	}, [scrollYProgress, count]);

	const stack = useMemo(() => images, [images]);

	return (
		<section
			ref={containerRef}
			className={cn("relative w-full", className)}
			style={{
				height,
				width: "100vw",
				marginLeft: "calc(50% - 50vw)",
			}}
			aria-label="ASCII scroll images"
		>
			<div
				className={cn(
					"sticky top-0 flex h-[100vh] w-full flex-col items-center justify-center overflow-hidden",
					isLight ? "bg-zinc-50" : "bg-zinc-950"
				)}
			>
				<p
					className={cn(
						"absolute left-1/2 top-6 z-30 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-[0.2em]",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					Scroll · ascii depth
				</p>

				{/* Centered flex column stack — behind = blurry ascii, front = sharp */}
				<div className="relative flex h-[min(72vh,32rem)] w-full max-w-3xl flex-col items-center justify-center px-4">
					{stack.map((img, i) => {
						const offset = i - active;
						const isActive = i === active;
						const isBehind = i < active;
						const isAhead = i > active;

						/* Behind: recede + blur; ahead: wait below slightly */
						const translateY = isActive
							? 0
							: isBehind
								? -28 - (active - i) * 10
								: 40 + (i - active) * 12;
						const scale = isActive
							? 1
							: isBehind
								? Math.max(0.82, 1 - (active - i) * 0.06)
								: 0.94;
						const z = isActive ? 40 : isBehind ? 10 + i : 5;
						const opacity = isActive
							? 1
							: isBehind
								? Math.max(0.25, 0.7 - (active - i) * 0.15)
								: i === active + 1
									? 0.35
									: 0;

						return (
							<div
								key={img.src + i}
								className="absolute left-1/2 top-1/2 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border shadow-2xl transition-[transform,opacity,filter] duration-500 ease-out"
								style={{
									zIndex: z,
									opacity,
									transform: `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale})`,
									borderColor: isLight
										? "rgba(228,228,231,0.9)"
										: "rgba(63,63,70,0.9)",
									boxShadow: isActive
										? isLight
											? "0 30px 60px -20px rgba(24,24,27,0.25)"
											: "0 30px 60px -20px rgba(0,0,0,0.65)"
										: "none",
									pointerEvents: isActive ? "auto" : "none",
								}}
								aria-hidden={!isActive}
							>
								<div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-200">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={img.src}
										alt={img.label}
										className={cn(
											"h-full w-full object-cover object-top transition-[filter] duration-500",
											isActive
												? "blur-0"
												: "blur-[3px] saturate-50 brightness-90"
										)}
										draggable={false}
									/>

									{/* Blurry ASCII nature overlay — only on non-active (behind) frames */}
									{(isBehind || isAhead) && (
										<pre
											aria-hidden
											className={cn(
												"pointer-events-none absolute inset-0 overflow-hidden whitespace-pre p-2 font-mono text-[7px] leading-[8px] sm:text-[8px] sm:leading-[9px]",
												"mix-blend-soft-light",
												isLight ? "text-zinc-900/55" : "text-zinc-100/50"
											)}
											style={{
												filter: "blur(0.4px)",
												opacity: isBehind ? 0.85 : 0.4,
												backgroundImage: isLight
													? "linear-gradient(to bottom, rgba(250,250,250,0.15), rgba(250,250,250,0.45))"
													: "linear-gradient(to bottom, rgba(9,9,11,0.2), rgba(9,9,11,0.5))",
											}}
										>
											{ASCII_FIELD}
										</pre>
									)}

									{isActive ? null : (
										<div
											className={cn(
												"pointer-events-none absolute inset-0",
												isLight ? "bg-white/25" : "bg-black/35"
											)}
											style={{ backdropFilter: "blur(1px)" }}
										/>
									)}
								</div>

								<div
									className={cn(
										"flex items-center justify-between px-4 py-2.5 text-xs",
										isLight
											? "bg-white text-zinc-600"
											: "bg-zinc-900 text-zinc-300"
									)}
								>
									<span className="font-semibold tracking-tight text-inherit">
										{img.label}
									</span>
									<span className="tabular-nums opacity-60">
										{i + 1} / {count}
									</span>
								</div>
							</div>
						);
					})}
				</div>

				<p
					className={cn(
						"absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center text-xs",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					{stack[active]?.label} · previous frames dissolve into ascii
				</p>
			</div>
		</section>
	);
}
