import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const TRAVEL = [
	{
		id: "t1",
		place: "Amalfi",
		caption: "It can also take travel apps to the next level…",
		src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80",
		alt: "Amalfi coast cliffs and sea",
	},
	{
		id: "t2",
		place: "Kyoto",
		caption: "Quiet streets, paper lanterns, and golden hour walks…",
		src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80",
		alt: "Kyoto temple path in autumn",
	},
	{
		id: "t3",
		place: "Sahara",
		caption: "Dunes that rewrite the horizon every morning…",
		src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80",
		alt: "Sahara desert dunes",
	},
	{
		id: "t4",
		place: "Bali",
		caption: "Rice terraces and salt air in the same afternoon…",
		src: "https://images.unsplash.com/photo-1537953773345-d172ccf139bb?auto=format&fit=crop&w=1600&q=80",
		alt: "Bali tropical palms and coastline",
	},
	{
		id: "t5",
		place: "Patagonia",
		caption: "Wind, ice, and trails that earn every step…",
		src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
		alt: "Road trip through mountains",
	},
	{
		id: "t6",
		place: "Lisbon",
		caption: "Trams, tiles, and light that never quite ends…",
		src: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1600&q=80",
		alt: "Lisbon yellow tram street",
	},
];

function AnimDot({ color = "#0a0a0a" }) {
	return (
		<motion.div
			className="relative flex h-12 w-12 items-center justify-center"
			aria-hidden
		>
			<motion.span
				className="absolute inset-0 rounded-full"
				style={{ border: `1.5px solid ${color}` }}
				animate={{ scale: [1, 1.55, 1], opacity: [0.45, 0, 0.45] }}
				transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
			/>
			<motion.span
				className="h-3.5 w-3.5 rounded-full"
				style={{ background: color }}
				animate={{ scale: [0.92, 1.08, 0.92] }}
				transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
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

	const seedOpacity = useTransform(reveal, [0, 0.35], [1, 0]);
	const seedScale = useTransform(reveal, [0, 0.5], [1, 0.35]);
	const contentOpacity = useTransform(reveal, [0.2, 0.55], [0, 1]);
	const imageScale = useTransform(reveal, [0, 0.25, 1], [0.06, 0.45, 1]);
	const captionOpacity = useTransform(reveal, [0.55, 0.9], [0, 1]);
	const captionY = useTransform(reveal, [0.55, 1], [16, 0]);
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
					className="relative overflow-hidden shadow-[0_28px_70px_rgba(0,0,0,0.18)] ring-1 ring-black/5"
					style={{
						width: "min(48vw, 300px)",
						height: "min(64vh, 520px)",
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
					<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 pb-5 pt-16">
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
							{item.place}
						</p>
						<p className="mt-1 text-sm font-medium text-white">
							Travel set {String(index + 1).padStart(2, "0")}
						</p>
					</div>
				</div>

				<motion.p
					className="mt-6 max-w-md px-4 text-center font-mono text-[13px] leading-relaxed sm:text-[14px]"
					style={{ color: ink, opacity: captionOpacity, y: captionY }}
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
