import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULTS = {
	clouds: 80,
	storm: 100,
	sun: 15,
	wind: 40,
	heat: 20,
};

const CONTROLS = [
	{ id: "clouds", label: "Clouds" },
	{ id: "storm", label: "Storm" },
	{ id: "sun", label: "Sun" },
	{ id: "wind", label: "Wind" },
	{ id: "heat", label: "Heat" },
];

function WeatherSlider({ label, value, onChange }) {
	const trackRef = useRef(null);
	const dragging = useRef(false);
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	const setFromClientX = (clientX) => {
		const el = trackRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const t = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
		onChangeRef.current(Math.round(t * 100));
	};

	useEffect(() => {
		const onMove = (e) => {
			if (!dragging.current) return;
			setFromClientX(e.clientX);
		};
		const onUp = () => {
			dragging.current = false;
		};
		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
		};
	}, []);

	return (
		<div
			ref={trackRef}
			role="slider"
			aria-label={label}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={value}
			tabIndex={0}
			className="relative h-12 w-full max-w-md cursor-ew-resize touch-none select-none overflow-hidden rounded-full bg-[#ececec] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.04)]"
			onPointerDown={(e) => {
				dragging.current = true;
				e.currentTarget.setPointerCapture?.(e.pointerId);
				setFromClientX(e.clientX);
			}}
			onKeyDown={(e) => {
				if (e.key === "ArrowRight") onChange(Math.min(100, value + 2));
				if (e.key === "ArrowLeft") onChange(Math.max(0, value - 2));
			}}
		>
			<div
				className="absolute inset-y-0 left-0 rounded-l-full bg-[#d4d4d4]"
				style={{ width: `${value}%` }}
			/>
			<div
				className="absolute top-1.5 bottom-1.5 w-px -translate-x-1/2 bg-white"
				style={{ left: `${value}%` }}
			/>
			<div className="pointer-events-none relative z-10 flex h-full items-center justify-between px-5">
				<span className="text-[15px] font-medium tracking-tight text-zinc-800">{label}</span>
				<span className="text-[15px] font-medium tabular-nums tracking-tight text-zinc-800">
					{value}%
				</span>
			</div>
		</div>
	);
}

function RainLayer({ intensity, wind }) {
	const drops = useMemo(() => {
		const n = Math.round(28 + intensity * 1.1);
		return Array.from({ length: n }, (_, i) => ({
			id: i,
			left: `${(i * 41 + (i % 7) * 3) % 100}%`,
			delay: (i % 14) * 0.09,
			duration: 0.45 + ((i * 13) % 50) / 100,
			len: 14 + (i % 6) * 5,
			opacity: 0.12 + (i % 5) * 0.04,
		}));
	}, [intensity]);

	if (intensity < 3) return null;
	const skew = -6 - wind * 0.2;

	return (
		<div
			className="pointer-events-none absolute inset-0 overflow-hidden"
			style={{ ["--rain-skew"]: `${skew}deg` }}
			aria-hidden
		>
			{drops.map((d) => (
				<span
					key={d.id}
					className="absolute top-[-12%] w-px rounded-full"
					style={{
						left: d.left,
						height: d.len,
						opacity: d.opacity * (0.5 + intensity / 100),
						background:
							"linear-gradient(180deg, transparent 0%, rgba(220,230,245,0.85) 45%, transparent 100%)",
						animation: `weather-rain ${d.duration}s linear ${d.delay}s infinite`,
					}}
				/>
			))}
		</div>
	);
}

function CloudSvg({ dark = false, uid = "c0" }) {
	const softId = `cloudSoft-${uid}`;
	const stormId = `cloudStorm-${uid}`;
	const blurId = `cloudBlur-${uid}`;
	const fill = dark ? `url(#${stormId})` : `url(#${softId})`;
	return (
		<svg viewBox="0 0 420 180" className="h-full w-full overflow-visible" aria-hidden>
			<defs>
				<linearGradient id={softId} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
					<stop offset="55%" stopColor="#e8eef6" stopOpacity="0.78" />
					<stop offset="100%" stopColor="#c5d0e0" stopOpacity="0.55" />
				</linearGradient>
				<linearGradient id={stormId} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#6b7c94" stopOpacity="0.85" />
					<stop offset="50%" stopColor="#3d4a5e" stopOpacity="0.8" />
					<stop offset="100%" stopColor="#1e2838" stopOpacity="0.7" />
				</linearGradient>
				<filter id={blurId} x="-20%" y="-40%" width="140%" height="180%">
					<feGaussianBlur stdDeviation="6" />
				</filter>
			</defs>
			<g filter={`url(#${blurId})`}>
				<ellipse cx="120" cy="110" rx="90" ry="42" fill={fill} />
				<ellipse cx="190" cy="88" rx="78" ry="48" fill={fill} />
				<ellipse cx="260" cy="105" rx="95" ry="44" fill={fill} />
				<ellipse cx="155" cy="125" rx="70" ry="32" fill={fill} />
				<ellipse cx="300" cy="120" rx="62" ry="30" fill={fill} />
			</g>
		</svg>
	);
}

function CloudLayer({ amount, storm }) {
	if (amount < 4) return null;
	const dark = storm > 45;
	const banks = [
		{ x: "-4%", y: "6%", w: 520, h: 200, dur: 48, drift: 40 },
		{ x: "28%", y: "2%", w: 580, h: 220, dur: 62, drift: -28 },
		{ x: "55%", y: "10%", w: 500, h: 190, dur: 55, drift: 34 },
		{ x: "10%", y: "22%", w: 440, h: 170, dur: 70, drift: -22 },
		{ x: "62%", y: "26%", w: 460, h: 175, dur: 58, drift: 26 },
	];
	const show = Math.ceil((amount / 100) * banks.length);

	return (
		<div className="pointer-events-none absolute inset-0" aria-hidden>
			{banks.slice(0, show).map((b, i) => (
				<motion.div
					key={i}
					className="absolute"
					style={{
						left: b.x,
						top: b.y,
						width: b.w,
						height: b.h,
						opacity: Math.min(0.95, 0.35 + amount / 140),
					}}
					animate={{ x: [0, b.drift, 0] }}
					transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
				>
					<CloudSvg dark={dark} uid={`bank-${i}`} />
				</motion.div>
			))}
			{/* Atmospheric haze under cloud deck */}
			<div
				className="absolute inset-x-0 top-[8%] h-[42%]"
				style={{
					opacity: amount / 160,
					background: dark
						? "linear-gradient(180deg, rgba(20,28,40,0.45) 0%, transparent 100%)"
						: "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 100%)",
				}}
			/>
		</div>
	);
}

function SunLayer({ amount }) {
	if (amount < 2) return null;
	const o = amount / 100;
	return (
		<div className="pointer-events-none absolute inset-0" aria-hidden>
			<svg
				className="absolute left-[8%] top-[6%] h-[55vmin] w-[55vmin] max-h-[420px] max-w-[420px]"
				viewBox="0 0 400 400"
				style={{ opacity: o }}
			>
				<defs>
					<radialGradient id="sunCore" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#fff8e1" stopOpacity="1" />
						<stop offset="28%" stopColor="#ffe082" stopOpacity="0.95" />
						<stop offset="55%" stopColor="#ffb300" stopOpacity="0.45" />
						<stop offset="100%" stopColor="#ff9800" stopOpacity="0" />
					</radialGradient>
					<radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
						<stop offset="0%" stopColor="#fff3c4" stopOpacity="0.55" />
						<stop offset="40%" stopColor="#ffcc80" stopOpacity="0.22" />
						<stop offset="100%" stopColor="#ff9800" stopOpacity="0" />
					</radialGradient>
					<filter id="sunSoft" x="-40%" y="-40%" width="180%" height="180%">
						<feGaussianBlur stdDeviation="8" />
					</filter>
				</defs>
				{/* Outer atmospheric glow */}
				<circle cx="200" cy="200" r="190" fill="url(#sunHalo)" filter="url(#sunSoft)" />
				{/* Soft corona rings */}
				{[120, 150, 175].map((r, i) => (
					<circle
						key={r}
						cx="200"
						cy="200"
						r={r}
						fill="none"
						stroke="rgba(255,236,179,0.12)"
						strokeWidth={18 - i * 4}
						filter="url(#sunSoft)"
					/>
				))}
				{/* Core disc */}
				<motion.circle
					cx="200"
					cy="200"
					r="52"
					fill="url(#sunCore)"
					animate={{ r: [50, 54, 50] }}
					transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
				/>
			</svg>
			{/* Sky warm wash from sun position */}
			<div
				className="absolute inset-0"
				style={{
					background: `radial-gradient(ellipse 70% 55% at 22% 20%, rgba(255,214,140,${
						o * 0.42
					}) 0%, rgba(255,180,90,${o * 0.12}) 35%, transparent 65%)`,
				}}
			/>
		</div>
	);
}

function WindLayer({ amount }) {
	if (amount < 5) return null;
	const bands = useMemo(
		() =>
			Array.from({ length: 7 }, (_, i) => ({
				id: i,
				y: 14 + i * 11,
				h: 1.5 + (i % 3) * 0.8,
				delay: i * 0.55,
				dur: 5.5 - amount * 0.025,
				opacity: 0.06 + (i % 3) * 0.03,
			})),
		[amount]
	);

	return (
		<div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
			<svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
				<defs>
					<linearGradient id="windFade" x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="white" stopOpacity="0" />
						<stop offset="35%" stopColor="white" stopOpacity="0.55" />
						<stop offset="70%" stopColor="white" stopOpacity="0.35" />
						<stop offset="100%" stopColor="white" stopOpacity="0" />
					</linearGradient>
					<filter id="windBlur">
						<feGaussianBlur stdDeviation="1.2" />
					</filter>
				</defs>
				{bands.map((b) => (
					<motion.path
						key={b.id}
						d={`M -20 ${b.y}% Q 25 ${b.y - 1.2}%, 50 ${b.y}%, 75 ${b.y + 1}%, 120 ${b.y}%`}
						fill="none"
						stroke="url(#windFade)"
						strokeWidth={b.h}
						filter="url(#windBlur)"
						opacity={b.opacity * (amount / 70)}
						initial={{ pathLength: 0, x: "-15%" }}
						animate={{ pathLength: [0.2, 1, 0.3], x: ["-15%", "15%", "40%"] }}
						transition={{
							duration: Math.max(2.2, b.dur),
							repeat: Infinity,
							ease: "easeInOut",
							delay: b.delay,
						}}
					/>
				))}
			</svg>
			{/* Sheer mist sheets */}
			{[0, 1, 2].map((i) => (
				<motion.div
					key={`mist-${i}`}
					className="absolute h-[18%] w-[55%] rounded-[100%]"
					style={{
						top: `${18 + i * 22}%`,
						left: "-20%",
						opacity: (amount / 280) * (1 - i * 0.15),
						background:
							"linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)",
						filter: "blur(18px)",
					}}
					animate={{ x: ["0%", "140%"] }}
					transition={{
						duration: 9 - amount * 0.04,
						repeat: Infinity,
						ease: "linear",
						delay: i * 2.4,
					}}
				/>
			))}
		</div>
	);
}

function HeatLayer({ amount }) {
	if (amount < 4) return null;
	return (
		<div
			className="pointer-events-none absolute inset-0 mix-blend-soft-light"
			style={{
				opacity: amount / 110,
				background:
					"linear-gradient(180deg, rgba(255,160,80,0.12) 0%, rgba(255,100,45,0.28) 50%, rgba(90,30,15,0.22) 100%)",
			}}
			aria-hidden
		>
			<svg className="absolute inset-0 h-full w-full opacity-50" aria-hidden>
				<defs>
					<filter id="heatWarp">
						<feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="3">
							<animate
								attributeName="baseFrequency"
								dur="8s"
								values="0.008;0.012;0.008"
								repeatCount="indefinite"
							/>
						</feTurbulence>
						<feDisplacementMap in="SourceGraphic" scale="12" />
					</filter>
				</defs>
				<rect width="100%" height="100%" fill="rgba(255,140,60,0.15)" filter="url(#heatWarp)" />
			</svg>
		</div>
	);
}

/**
 * HeroWeatherSliders — full-bleed sky mixer.
 * Clouds / Storm / Sun / Wind / Heat drive the scene.
 */
export default function HeroWeatherSliders({ className }) {
	const [values, setValues] = useState(DEFAULTS);

	const set = (id) => (v) => setValues((prev) => ({ ...prev, [id]: v }));

	const sky = useMemo(() => {
		const { sun, clouds, storm, heat } = values;
		const bright = sun * 0.55 - clouds * 0.25 - storm * 0.2 + heat * 0.15;
		const top = bright > 20 ? "#5b8fd4" : bright > 0 ? "#3d5f8a" : "#1a2740";
		const mid = bright > 20 ? "#8eb8e8" : bright > 0 ? "#4a6a90" : "#243552";
		const bot = heat > 50 ? "#c4784a" : bright > 15 ? "#c5d8ef" : "#6a7f96";
		return `linear-gradient(180deg, ${top} 0%, ${mid} 48%, ${bot} 100%)`;
	}, [values]);

	return (
		<section
			className={cn(
				"relative left-1/2 flex min-h-[85vh] w-screen -translate-x-1/2 items-center justify-center overflow-hidden",
				className
			)}
			style={{ background: sky }}
			aria-label="Weather sliders"
		>
			<style>{`
				@keyframes weather-rain {
					0% { transform: translateY(0) skewX(var(--rain-skew, -12deg)); }
					100% { transform: translateY(110vh) skewX(var(--rain-skew, -12deg)); }
				}
				@keyframes weather-wind {
					0% { left: -10%; opacity: 0; }
					15% { opacity: 0.7; }
					100% { left: 110%; opacity: 0; }
				}
				@keyframes weather-heat {
					0%, 100% { transform: translateX(0) scaleY(1); }
					50% { transform: translateX(2%) scaleY(1.02); }
				}
			`}</style>

			<SunLayer amount={values.sun} />
			<CloudLayer amount={values.clouds} storm={values.storm} />
			<RainLayer intensity={values.storm} wind={values.wind} />
			<WindLayer amount={values.wind} />
			<HeatLayer amount={values.heat} />

			{/* Soft vignette */}
			<div
				className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]"
				aria-hidden
			/>

			<div className="relative z-10 flex w-full max-w-md flex-col items-stretch gap-3 px-4 py-10 sm:gap-3.5">
				{CONTROLS.map((c) => (
					<WeatherSlider
						key={c.id}
						label={c.label}
						value={values[c.id]}
						onChange={set(c.id)}
					/>
				))}
			</div>
		</section>
	);
}
