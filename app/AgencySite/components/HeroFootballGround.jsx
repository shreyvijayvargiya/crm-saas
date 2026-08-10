import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/** Pitch plane tilt (deg) — view from near goal looking downfield */
const PITCH_TILT = 62;

/**
 * 4-3-3 — x/y % on the 3D pitch plane (y: 0 far end, 100 near goal / viewer).
 * Real soccer photos from /public/componentry/players
 */
const TEAM = [
	{
		id: "gk",
		name: "Noah Hale",
		role: "Goalkeeper",
		number: 1,
		x: 50,
		y: 82,
		at: 0.06,
		img: "/componentry/players/p1.jpg",
	},
	{
		id: "lb",
		name: "Mateo Ruiz",
		role: "Left back",
		number: 3,
		x: 14,
		y: 64,
		at: 0.16,
		img: "/componentry/players/p2.jpg",
	},
	{
		id: "lcb",
		name: "Jonas Berg",
		role: "Centre back",
		number: 4,
		x: 36,
		y: 68,
		at: 0.22,
		img: "/componentry/players/p3.jpg",
	},
	{
		id: "rcb",
		name: "Omar Diallo",
		role: "Centre back",
		number: 5,
		x: 64,
		y: 68,
		at: 0.28,
		img: "/componentry/players/p4.jpg",
	},
	{
		id: "rb",
		name: "Kai Nakamura",
		role: "Right back",
		number: 2,
		x: 86,
		y: 64,
		at: 0.34,
		img: "/componentry/players/p5.jpg",
	},
	{
		id: "lcm",
		name: "Elena Vos",
		role: "Midfielder",
		number: 8,
		x: 28,
		y: 44,
		at: 0.44,
		img: "/componentry/players/p6.jpg",
	},
	{
		id: "cm",
		name: "Sam Okonkwo",
		role: "Midfielder",
		number: 6,
		x: 50,
		y: 42,
		at: 0.52,
		img: "/componentry/players/p7.jpg",
	},
	{
		id: "rcm",
		name: "Ivy Chen",
		role: "Midfielder",
		number: 10,
		x: 72,
		y: 44,
		at: 0.6,
		img: "/componentry/players/p8.jpg",
	},
	{
		id: "lw",
		name: "Leo Martins",
		role: "Left wing",
		number: 11,
		x: 18,
		y: 22,
		at: 0.7,
		img: "/componentry/players/p9.jpg",
	},
	{
		id: "st",
		name: "Aria Cole",
		role: "Striker",
		number: 9,
		x: 50,
		y: 14,
		at: 0.8,
		img: "/componentry/players/p10.jpg",
	},
	{
		id: "rw",
		name: "Felix Orth",
		role: "Right wing",
		number: 7,
		x: 82,
		y: 22,
		at: 0.88,
		img: "/componentry/players/p11.jpg",
	},
];

/** Single near goal post + net (viewer stands behind it). */
function GoalPost3D() {
	return (
		<div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-[34%] w-full">
			<svg
				className="h-full w-full drop-shadow-2xl"
				viewBox="0 0 1200 360"
				preserveAspectRatio="xMidYMax meet"
				aria-hidden
			>
				<defs>
					<linearGradient id="postMetal" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#e8edf2" />
						<stop offset="40%" stopColor="#ffffff" />
						<stop offset="100%" stopColor="#b8c4d0" />
					</linearGradient>
					<linearGradient id="netFade" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#f4f8fb" stopOpacity="0.55" />
						<stop offset="100%" stopColor="#f4f8fb" stopOpacity="0.12" />
					</linearGradient>
				</defs>

				{/* Net back plane */}
				<path
					d="M 310 48 L 890 48 L 980 340 L 220 340 Z"
					fill="url(#netFade)"
					opacity="0.35"
				/>

				{/* Mesh */}
				{Array.from({ length: 15 }).map((_, i) => (
					<line
						key={`nv${i}`}
						x1={320 + i * 38}
						y1="52"
						x2={235 + i * 48}
						y2="330"
						stroke="#eef3f7"
						strokeWidth="1.4"
						opacity="0.5"
					/>
				))}
				{Array.from({ length: 9 }).map((_, i) => (
					<path
						key={`nh${i}`}
						d={`M ${305 - i * 10} ${60 + i * 30} Q 600 ${70 + i * 30} ${895 + i * 10} ${60 + i * 30}`}
						fill="none"
						stroke="#eef3f7"
						strokeWidth="1.3"
						opacity="0.42"
					/>
				))}

				{/* Crossbar */}
				<path
					d="M 300 40 L 900 40"
					stroke="url(#postMetal)"
					strokeWidth="18"
					strokeLinecap="round"
				/>
				{/* Left post */}
				<path
					d="M 308 40 L 228 340"
					stroke="url(#postMetal)"
					strokeWidth="16"
					strokeLinecap="round"
				/>
				{/* Right post */}
				<path
					d="M 892 40 L 972 340"
					stroke="url(#postMetal)"
					strokeWidth="16"
					strokeLinecap="round"
				/>
				{/* Ground shadow under posts */}
				<ellipse cx="600" cy="348" rx="420" ry="10" fill="#000" opacity="0.35" />
			</svg>
		</div>
	);
}

function PitchLines() {
	return (
		<svg
			className="pointer-events-none absolute inset-0 h-full w-full"
			viewBox="0 0 100 160"
			preserveAspectRatio="none"
			aria-hidden
		>
			{/* Outer touchlines */}
			<rect
				x="4"
				y="4"
				width="92"
				height="152"
				fill="none"
				stroke="#fff"
				strokeWidth="0.55"
				opacity="0.9"
			/>
			{/* Halfway */}
			<line x1="4" y1="80" x2="96" y2="80" stroke="#fff" strokeWidth="0.45" opacity="0.85" />
			{/* Center circle */}
			<circle cx="50" cy="80" r="14" fill="none" stroke="#fff" strokeWidth="0.45" opacity="0.85" />
			<circle cx="50" cy="80" r="0.9" fill="#fff" />
			{/* Near penalty (viewer / only goal end) */}
			<rect
				x="22"
				y="118"
				width="56"
				height="38"
				fill="none"
				stroke="#fff"
				strokeWidth="0.5"
				opacity="0.9"
			/>
			<rect
				x="34"
				y="138"
				width="32"
				height="18"
				fill="none"
				stroke="#fff"
				strokeWidth="0.45"
				opacity="0.85"
			/>
			{/* Penalty spot */}
			<circle cx="50" cy="132" r="0.8" fill="#fff" />
			{/* Near arc */}
			<path
				d="M 36 118 Q 50 108 64 118"
				fill="none"
				stroke="#fff"
				strokeWidth="0.4"
				opacity="0.75"
			/>
			{/* Far end — just a line (no second goal) */}
			<line x1="4" y1="4" x2="96" y2="4" stroke="#fff" strokeWidth="0.55" opacity="0.7" />
		</svg>
	);
}

function PlayerMarker({ player, visible, hovered, onHover }) {
	/* Scale down slightly as players sit farther up the pitch */
	const depth = 0.55 + (player.y / 100) * 0.55;

	return (
		<AnimatePresence>
			{visible ? (
				<motion.button
					type="button"
					initial={{ opacity: 0, scale: 0.35 }}
					animate={{
						opacity: 1,
						scale: hovered ? depth * 1.2 : depth,
					}}
					exit={{ opacity: 0, scale: 0.3 }}
					transition={{ type: "spring", stiffness: 240, damping: 22 }}
					className="absolute z-20 -translate-x-1/2 outline-none"
					style={{
						left: `${player.x}%`,
						top: `${player.y}%`,
						/* Counter-rotate so figures stand upright on tilted pitch */
						transform: `translateX(-50%) translateY(-100%) rotateX(-${PITCH_TILT}deg)`,
						transformStyle: "preserve-3d",
					}}
					onMouseEnter={() => onHover(player.id)}
					onMouseLeave={() => onHover(null)}
					onFocus={() => onHover(player.id)}
					onBlur={() => onHover(null)}
					aria-label={`${player.name}, ${player.role}`}
				>
					<div className="relative flex flex-col items-center">
						{/* Contact shadow on grass */}
						<span
							className="absolute -bottom-1 left-1/2 h-2 w-10 -translate-x-1/2 rounded-[100%] bg-black/45 blur-[3px]"
							aria-hidden
						/>

						<div
							className={cn(
								"relative overflow-hidden rounded-md border-2 border-white/90 bg-zinc-900 shadow-[0_10px_28px_rgba(0,0,0,0.45)] transition-all duration-200",
								hovered
									? "h-[7.5rem] w-[5.25rem] sm:h-36 sm:w-24"
									: "h-[3.75rem] w-[2.75rem] sm:h-[4.5rem] sm:w-[3.25rem]"
							)}
						>
							<img
								src={player.img}
								alt=""
								draggable={false}
								className="h-full w-full object-cover object-[center_20%]"
							/>
							<span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-1 pb-1 pt-4">
								<span
									className={cn(
										"mx-auto flex items-center justify-center rounded-full bg-emerald-900 font-bold text-white ring-1 ring-white/80",
										hovered ? "h-6 w-6 text-[10px]" : "h-4 w-4 text-[8px]"
									)}
								>
									{player.number}
								</span>
							</span>
						</div>

						<p
							className={cn(
								"mt-1.5 max-w-[7rem] truncate rounded bg-black/60 px-1.5 py-0.5 text-center font-semibold tracking-tight text-white backdrop-blur-sm",
								hovered ? "text-[11px]" : "text-[9px] sm:text-[10px]"
							)}
						>
							{player.name}
						</p>
						{hovered ? (
							<p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-white/75">
								{player.role}
							</p>
						) : null}
					</div>
				</motion.button>
			) : null}
		</AnimatePresence>
	);
}

/**
 * HeroFootballGround — realistic 3D pitch from a single goalmouth; scroll completes the XI.
 */
export default function HeroFootballGround({ className }) {
	const sectionRef = useRef(null);
	const [progress, setProgress] = useState(0);
	const [hovered, setHovered] = useState(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	const smooth = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 28,
		restDelta: 0.001,
	});

	useEffect(() => {
		const unsub = smooth.onChange((v) => setProgress(v));
		return unsub;
	}, [smooth]);

	const revealed = TEAM.filter((p) => progress >= p.at).length;
	const complete = progress >= 0.92;

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: "280vh" }}
			aria-label="3D football ground team reveal"
		>
			<div
				className="sticky top-0 h-screen overflow-hidden"
				style={{
					perspective: "1100px",
					perspectiveOrigin: "50% 85%",
					background:
						"linear-gradient(180deg, #6fa8d8 0%, #a8cce8 18%, #1a5c32 22%, #0d3a1e 100%)",
				}}
			>
				{/* Stadium haze / far end (no second goal) */}
				<div
					className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[28%]"
					style={{
						background:
							"linear-gradient(180deg, #5b8fbf 0%, #8eb8dc 55%, transparent 100%)",
					}}
					aria-hidden
				/>
				<div
					className="pointer-events-none absolute inset-x-[8%] top-[12%] z-0 h-16 rounded-t-[40%] bg-[#2a3544]/50 blur-sm"
					aria-hidden
				/>

				{/* 3D pitch plane */}
				<div
					className="absolute left-1/2 top-[8%] z-10 h-[120%] w-[140%] max-w-none origin-bottom -translate-x-1/2"
					style={{
						transform: `rotateX(${PITCH_TILT}deg)`,
						transformStyle: "preserve-3d",
					}}
				>
					{/* Grass photo + green wash */}
					<div className="absolute inset-0 overflow-hidden rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.55)]">
						<img
							src="/componentry/football-pitch-3d.jpg"
							alt=""
							draggable={false}
							className="absolute inset-0 h-full w-full scale-110 object-cover"
						/>
						<div
							className="absolute inset-0"
							style={{
								background:
									"linear-gradient(180deg, rgba(34,120,58,0.35) 0%, rgba(18,90,40,0.55) 40%, rgba(12,70,32,0.7) 100%)",
								mixBlendMode: "multiply",
							}}
						/>
						{/* Mowing stripes */}
						<div
							className="absolute inset-0 opacity-25"
							style={{
								backgroundImage:
									"repeating-linear-gradient(90deg, transparent 0 7%, rgba(0,0,0,0.22) 7% 14%)",
							}}
							aria-hidden
						/>
						<PitchLines />
					</div>

					{/* Players standing on plane */}
					<div className="absolute inset-[3%] z-20" style={{ transformStyle: "preserve-3d" }}>
						{TEAM.map((player) => (
							<PlayerMarker
								key={player.id}
								player={player}
								visible={progress >= player.at}
								hovered={hovered === player.id}
								onHover={setHovered}
							/>
						))}
					</div>
				</div>

				{/* Only one goal — near post + net */}
				<GoalPost3D />

				{/* Vignette */}
				<div
					className="pointer-events-none absolute inset-0 z-30 bg-gradient-to-t from-black/50 via-transparent to-black/10"
					aria-hidden
				/>

				<div className="absolute left-5 top-6 z-50 sm:left-8">
					<p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
						Goalmouth view · 3D
					</p>
					<h2 className="mt-1 font-serif text-2xl tracking-tight text-white sm:text-3xl">
						Starting XI
					</h2>
					<p className="mt-1 max-w-xs text-sm text-white/70">
						One post. Scroll to complete the team — hover for the standing card.
					</p>
				</div>

				<div className="absolute bottom-5 right-5 z-50 rounded-sm border border-white/15 bg-black/50 px-4 py-3 font-mono backdrop-blur-md sm:right-8">
					<p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200/80">
						Squad
					</p>
					<p className="mt-0.5 text-lg font-semibold tabular-nums text-white">
						{revealed}
						<span className="text-white/45"> / 11</span>
					</p>
					{complete ? (
						<p className="mt-1 text-[11px] text-emerald-300">Team complete</p>
					) : null}
				</div>

				<div className="absolute bottom-5 left-1/2 z-50 w-full max-w-[200px] -translate-x-1/2 px-4">
					<div className="h-1 overflow-hidden rounded-full bg-white/20">
						<motion.div
							className="h-full origin-left rounded-full bg-emerald-300"
							style={{ scaleX: smooth }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
