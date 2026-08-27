import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const TRAVEL = [
	{
		id: "t1",
		place: "Stage",
		caption: "Pin a full-bleed Unsplash frame and let travel dots own the scroll story…",
		src: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
		alt: "Bright studio workspace",
	},
	{
		id: "t2",
		place: "Dots",
		caption: "Animate pulsing dots that scale with local progress instead of fake place names…",
		src: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1600&q=80",
		alt: "Abstract color field",
	},
	{
		id: "t3",
		place: "Cursor",
		caption: "Add a soft cursor glyph that drifts while the frame crossfades…",
		src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
		alt: "Team planning on a whiteboard",
	},
	{
		id: "t4",
		place: "Caption",
		caption: "Write one making-of line per frame so scroll reads like a build log…",
		src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80",
		alt: "Notebook and pen on a desk",
	},
	{
		id: "t5",
		place: "Spring",
		caption: "Spring the progress so stopping mid-travel still feels intentional…",
		src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
		alt: "Code editor on a monitor",
	},
	{
		id: "t6",
		place: "Ship",
		caption: "Keep the same motion shell — only the places and captions became the making-of…",
		src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
		alt: "Laptop on a wooden desk",
	},
];

function AnimDot({ color = "#0a0a0a" }) {
	return (
		<motion.div
			className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24"
			aria-hidden
		>
			<motion.span
				className="absolute inset-0 rounded-full"
				style={{ border: `2px solid ${color}` }}
				animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
				transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
			/>
			<motion.span
				className="absolute inset-[18%] rounded-full opacity-30"
				style={{ border: `1.5px solid ${color}` }}
				animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
				transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut", delay: 0.25 }}
			/>
			<motion.span
				className="h-5 w-5 rounded-full sm:h-6 sm:w-6"
				style={{ background: color }}
				animate={{ scale: [0.9, 1.12, 0.9] }}
				transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
			/>
		</motion.div>
	);
}

function AnimCursor({ color = "#0a0a0a" }) {
	return (
		<motion.div
			className="relative"
			animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
			transition={{ duration: 2.1, repeat: Infinity, ease: "easeInOut" }}
		>
			<svg width="44" height="44" viewBox="0 0 54 54" fill="none" aria-hidden>
				<path
					d="M12 8 L12 40 L22 32 L28 46 L34 43 L28 29 L40 29 Z"
					fill={color}
					stroke="rgba(0,0,0,0.08)"
					strokeWidth="1.2"
					strokeLinejoin="round"
				/>
			</svg>
		</motion.div>
	);
}

/**
 * Full-bleed wash: photo + ASCII as CSS background layers (edge-to-edge).
 * No separate <pre> overlay — pattern is painted in CSS so width always completes.
 */
function AsciiBackdrop({ item, visible, isLight }) {
	const ink = isLight ? "rgba(18,18,18,0.26)" : "rgba(255,255,255,0.24)";
	const vignette = isLight
		? "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(255,255,255,0.16) 0%, rgba(250,249,246,0.32) 48%, rgba(236,234,228,0.65) 100%)"
		: "radial-gradient(ellipse 70% 60% at 50% 42%, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.4) 48%, rgba(0,0,0,0.7) 100%)";

	const asciiGrid = `
		repeating-linear-gradient(0deg, transparent 0 4px, ${ink} 4px 5px),
		repeating-linear-gradient(90deg, transparent 0 6px, ${ink} 6px 7px)
	`;

	const asciiDots = isLight
		? "radial-gradient(circle, rgba(15,15,15,0.22) 0.65px, transparent 0.7px)"
		: "radial-gradient(circle, rgba(255,255,255,0.22) 0.65px, transparent 0.7px)";

	return (
		<div
			className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700"
			style={{ opacity: visible ? 1 : 0 }}
			aria-hidden
		>
			{/* Photo as CSS background — full bleed */}
			<div
				className="absolute inset-0 h-full w-full"
				style={{
					backgroundImage: `url(${item.src})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					filter: "blur(13px) saturate(0.78) brightness(0.9)",
					transform: "scale(1.14)",
					transformOrigin: "center center",
				}}
			/>

			{/* ASCII grid + vignette as CSS on top of the photo layer — 100vw × 100vh */}
			<div
				className="absolute inset-0 h-full w-full"
				style={{
					backgroundImage: `${vignette}, ${asciiGrid}, ${asciiDots}`,
					backgroundSize: "100% 100%, auto, 8px 10px",
					backgroundPosition: "center, 0 0, 0 0",
					backgroundRepeat: "no-repeat, repeat, repeat",
					mixBlendMode: isLight ? "multiply" : "soft-light",
				}}
			/>

			<div
				className="absolute inset-0 h-full w-full opacity-[0.08] mix-blend-overlay"
				style={{
					backgroundImage:
						"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
					backgroundSize: "160px 160px",
				}}
			/>
		</div>
	);
}

function TravelSlide({ item, index, total, progress, ink }) {
	const reveal = useTransform(progress, (p) => {
		const active = p * Math.max(total - 1, 1);
		const d = Math.abs(active - index);
		if (d >= 0.55) return 0;
		return 0.5 + 0.5 * Math.cos((d / 0.55) * Math.PI);
	});

	/* Dot stays visible until image grows out of it */
	const seedOpacity = useTransform(reveal, [0, 0.28, 0.5], [1, 0.55, 0]);
	const seedScale = useTransform(reveal, [0, 0.55], [1, 0.2]);
	/* Image only appears / scales up from the dot — capped ~25% of the screen */
	const contentOpacity = useTransform(reveal, [0.12, 0.42], [0, 1]);
	const imageScale = useTransform(reveal, [0, 0.22, 0.7, 1], [0.04, 0.35, 0.92, 1]);
	const captionOpacity = useTransform(reveal, [0.5, 0.85], [0, 1]);
	const captionY = useTransform(reveal, [0.5, 1], [14, 0]);
	const cursorOpacity = useTransform(reveal, [0.35, 0.7], [0, 1]);

	return (
		<div className="relative flex h-screen w-screen shrink-0 items-center justify-center">
			<motion.div
				className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
				style={{ opacity: seedOpacity, scale: seedScale }}
			>
				<AnimDot color={ink} />
			</motion.div>

			<motion.div
				className="relative z-20 flex flex-col items-center px-4"
				style={{ opacity: contentOpacity, scale: imageScale }}
			>
				<div
					className="relative overflow-hidden shadow-[0_28px_70px_rgba(0,0,0,0.22)] ring-1 ring-white/10"
					style={{
						width: "min(25vw, 260px)",
						height: "min(38vh, 400px)",
						borderRadius: 28,
					}}
				>
					<img
						src={item.src}
						alt={item.alt}
						draggable={false}
						className="h-full w-full object-cover"
						loading={index < 2 ? "eager" : "lazy"}
					/>
					<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent px-4 pb-5 pt-16">
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
							{item.place}
						</p>
						<p className="mt-1 text-sm font-medium text-white">
							Travel set {String(index + 1).padStart(2, "0")}
						</p>
					</div>
				</div>

				<motion.p
					className="mt-6 max-w-md px-4 text-center font-mono text-[13px] leading-relaxed text-white sm:text-[14px]"
					style={{ opacity: captionOpacity, y: captionY }}
				>
					{item.caption}
				</motion.p>
			</motion.div>

			<motion.div
				className="pointer-events-none absolute left-[72%] top-1/2 z-20 -translate-y-1/2"
				style={{ opacity: cursorOpacity, scale: imageScale }}
			>
				<AnimCursor color={ink} />
			</motion.div>
		</div>
	);
}

/**
 * HeroTravelDotScroll — vertical scroll pans travel dots.
 * Centered image fills a classy full-bleed blur + CSS ASCII backdrop.
 */
export default function HeroTravelDotScroll({
	items = TRAVEL,
	isLight = true,
	className,
	scrollHeightVh = 420,
}) {
	const list = useMemo(() => (items.length ? items : TRAVEL), [items]);
	const sectionRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);

	const bg = isLight ? "#efece6" : "#050505";
	const ink = isLight ? "#0a0a0a" : "#f5f5f5";

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const progress = useSpring(scrollYProgress, {
		stiffness: 70,
		damping: 26,
		restDelta: 0.001,
	});

	const x = useTransform(progress, [0, 1], ["0vw", `-${(list.length - 1) * 100}vw`]);

	useEffect(() => {
		const unsub = progress.onChange((p) => {
			const active = p * Math.max(list.length - 1, 1);
			const idx = Math.min(list.length - 1, Math.max(0, Math.round(active)));
			setActiveIndex(idx);
		});
		return unsub;
	}, [progress, list.length]);

	const current = list[activeIndex] || list[0];

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Travel image scroll gallery"
		>
			<div className="sticky top-0 h-screen w-full overflow-hidden" style={{ background: bg }}>
				<AsciiBackdrop item={current} visible isLight={isLight} />

				<motion.div
					style={{ x }}
					className="relative z-10 flex h-full w-max flex-row will-change-transform"
				>
					{list.map((item, index) => (
						<TravelSlide
							key={item.id || index}
							item={item}
							index={index}
							total={list.length}
							progress={progress}
							ink={ink}
						/>
					))}
				</motion.div>
			</div>
		</section>
	);
}
