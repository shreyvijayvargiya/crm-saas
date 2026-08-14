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

const ASCII_CHARS = " ·.:-+=*#%@";

function buildAsciiField(cols = 180, rows = 100) {
	const lines = [];
	for (let r = 0; r < rows; r++) {
		let line = "";
		for (let c = 0; c < cols; c++) {
			const n =
				Math.sin(r * 0.28 + c * 0.19) * 0.45 +
				Math.cos(c * 0.14 - r * 0.11) * 0.35 +
				Math.sin((r + c) * 0.07) * 0.2;
			const idx = Math.floor(((n + 1) / 2) * (ASCII_CHARS.length - 1));
			line += ASCII_CHARS[Math.max(0, Math.min(ASCII_CHARS.length - 1, idx))];
		}
		lines.push(line);
	}
	return lines.join("\n");
}

const ASCII_FIELD = buildAsciiField();

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
 * Full-bleed classy wash: visible soft photo + vignette + dense ASCII across the whole screen.
 */
function AsciiBackdrop({ item, visible, isLight }) {
	return (
		<div
			className="pointer-events-none absolute inset-0 z-0 overflow-hidden transition-opacity duration-700"
			style={{ opacity: visible ? 1 : 0 }}
			aria-hidden
		>
			{/* Photo — full viewport, soft blur, clearly visible */}
			<img
				key={item.id || item.src}
				src={item.src}
				alt=""
				draggable={false}
				className="absolute left-0 top-0 h-full w-full object-cover"
				style={{
					filter: "blur(14px) saturate(0.75) brightness(0.9)",
					transform: "scale(1.14)",
					transformOrigin: "center center",
				}}
			/>

			{/* Radial vignette — keeps center readable without washing the photo out */}
			<div
				className="absolute inset-0"
				style={{
					background: isLight
						? "radial-gradient(ellipse 65% 55% at 50% 42%, rgba(255,255,255,0.22) 0%, rgba(250,249,246,0.4) 45%, rgba(236,234,228,0.72) 100%)"
						: "radial-gradient(ellipse 65% 55% at 50% 42%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.75) 100%)",
				}}
			/>

			{/* Dense ASCII — glyph size scales so lines span the full viewport */}
			<div className="absolute inset-0 overflow-hidden">
				<pre
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						margin: 0,
						padding: 0,
						overflow: "hidden",
						fontFamily:
							"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
						/* 180 cols → nearly 100vw; ~100 rows cover height */
						fontSize: "calc(100vw / 175)",
						lineHeight: 1.02,
						letterSpacing: "0",
						whiteSpace: "pre",
						color: isLight ? "rgba(15,15,15,0.3)" : "rgba(255,255,255,0.28)",
						mixBlendMode: isLight ? "multiply" : "soft-light",
					}}
				>
					{ASCII_FIELD}
				</pre>
			</div>

			{/* Fine film grain */}
			<div
				className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
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
 * Centered image fills a classy full-bleed blur + ASCII backdrop.
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
