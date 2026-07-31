import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	Activity,
	ChevronLeft,
	Heart,
	Music2,
	Snowflake,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const APPS = [
	{
		id: "weather",
		label: "Weather",
		icon: Snowflake,
		accent: "text-sky-300",
		screen: {
			title: "12°",
			subtitle: "Partly cloudy",
			detail: "Feels like 10° · H:14° L:8°",
		},
	},
	{
		id: "activity",
		label: "Activity",
		icon: Activity,
		accent: "text-rose-400",
		screen: {
			title: "Move",
			subtitle: "420 / 600 kcal",
			detail: "Exercise 28 min · Stand 9 hrs",
		},
	},
	{
		id: "music",
		label: "Music",
		icon: Music2,
		accent: "text-rose-300",
		screen: {
			title: "Now Playing",
			subtitle: "Midnight City",
			detail: "M83 · Hurry Up, We're Dreaming",
		},
	},
	{
		id: "heart",
		label: "Heart",
		icon: Heart,
		accent: "text-red-400",
		screen: {
			title: "72 BPM",
			subtitle: "Resting heart rate",
			detail: "Range today 58–118",
		},
	},
];

const BAND_GREEN =
	"linear-gradient(90deg, #0a2e22 0%, #145c42 14%, #1f8a62 36%, #2aa574 50%, #1f8a62 64%, #145c42 86%, #0a2e22 100%)";

function AppleLogo({ className }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden
		>
			<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
		</svg>
	);
}

/** SVG dial — ticks + hands share the same center (100,100) */
function LiveClock() {
	const [now, setNow] = useState(() => new Date());

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(id);
	}, []);

	const h = now.getHours() % 12;
	const m = now.getMinutes();
	const s = now.getSeconds();
	const hourDeg = h * 30 + m * 0.5;
	const minuteDeg = m * 6 + s * 0.1;
	const secondDeg = s * 6;

	const cx = 100;
	const cy = 100;

	return (
		<svg
			viewBox="0 0 200 200"
			className="h-full w-full"
			aria-hidden
		>
			{/* Minute / hour ticks around true center */}
			{Array.from({ length: 60 }, (_, i) => {
				const isHour = i % 5 === 0;
				const len = isHour ? 12 : 5;
				const width = isHour ? 2.4 : 1;
				const outer = 88;
				const inner = outer - len;
				const rad = ((i * 6 - 90) * Math.PI) / 180;
				const x1 = cx + Math.cos(rad) * inner;
				const y1 = cy + Math.sin(rad) * inner;
				const x2 = cx + Math.cos(rad) * outer;
				const y2 = cy + Math.sin(rad) * outer;
				return (
					<line
						key={i}
						x1={x1}
						y1={y1}
						x2={x2}
						y2={y2}
						stroke="white"
						strokeWidth={width}
						strokeLinecap="round"
						opacity={isHour ? 1 : 0.45}
					/>
				);
			})}

			{/* Hour hand */}
			<g transform={`rotate(${hourDeg} ${cx} ${cy})`}>
				<line
					x1={cx}
					y1={cy + 8}
					x2={cx}
					y2={cy - 42}
					stroke="white"
					strokeWidth="5"
					strokeLinecap="round"
				/>
			</g>

			{/* Minute hand */}
			<g transform={`rotate(${minuteDeg} ${cx} ${cy})`}>
				<line
					x1={cx}
					y1={cy + 10}
					x2={cx}
					y2={cy - 62}
					stroke="white"
					strokeWidth="4"
					strokeLinecap="round"
				/>
			</g>

			{/* Second hand */}
			<g transform={`rotate(${secondDeg} ${cx} ${cy})`}>
				<line
					x1={cx}
					y1={cy + 16}
					x2={cx}
					y2={cy - 72}
					stroke="#f97316"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
			</g>

			{/* Pivot */}
			<circle cx={cx} cy={cy} r="5" fill="#f97316" />
			<circle cx={cx} cy={cy} r="2.2" fill="white" />
		</svg>
	);
}

function BandStrip({ position }) {
	const isTop = position === "top";
	return (
		<div
			className={cn(
				"relative z-0 w-[148px] sm:w-[168px]",
				isTop ? "h-36 rounded-t-[36px] sm:h-44" : "h-36 rounded-b-[36px] sm:h-44"
			)}
			style={{
				background: BAND_GREEN,
				boxShadow: isTop
					? "inset 10px 0 18px rgba(0,0,0,0.35), inset -10px 0 18px rgba(0,0,0,0.35), inset 0 12px 16px rgba(255,255,255,0.08)"
					: "inset 10px 0 18px rgba(0,0,0,0.35), inset -10px 0 18px rgba(0,0,0,0.35), inset 0 -12px 16px rgba(0,0,0,0.25)",
			}}
		>
			{/* Center ridge highlight (silicone curve) */}
			<div
				className="pointer-events-none absolute inset-y-0 left-1/2 w-[42%] -translate-x-1/2 opacity-50"
				style={{
					background:
						"linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 45%, rgba(255,255,255,0.28) 50%, rgba(255,255,255,0.22) 55%, transparent 100%)",
				}}
			/>
			{/* Soft holes / texture suggestion */}
			<div
				className={cn(
					"pointer-events-none absolute left-1/2 h-2 w-8 -translate-x-1/2 rounded-full opacity-30",
					isTop ? "bottom-6" : "top-6"
				)}
				style={{ background: "rgba(0,0,0,0.35)" }}
			/>
			{/* Lug flare where band meets case */}
			<div
				className={cn(
					"pointer-events-none absolute left-1/2 h-4 w-[108%] -translate-x-1/2",
					isTop ? "bottom-0" : "top-0"
				)}
				style={{
					background: isTop
						? "linear-gradient(to top, rgba(0,0,0,0.35), transparent)"
						: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
				}}
			/>
		</div>
	);
}

function ComplicationButton({ app, onClick }) {
	const Icon = app.icon;
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800/90 text-white shadow-inner ring-1 ring-white/10 transition-transform active:scale-90"
			aria-label={app.label}
		>
			<Icon className={cn("h-4 w-4", app.accent)} strokeWidth={2} />
		</button>
	);
}

function AppScreen({ app, onBack }) {
	const Icon = app.icon;
	return (
		<motion.div
			className="absolute inset-0 flex flex-col bg-black px-3 py-3"
			initial={{ opacity: 0, scale: 0.92, x: 24 }}
			animate={{ opacity: 1, scale: 1, x: 0 }}
			exit={{ opacity: 0, scale: 0.96, x: 16 }}
			transition={{ duration: 0.3, ease }}
		>
			<button
				type="button"
				onClick={onBack}
				className="mb-2 inline-flex items-center gap-0.5 self-start rounded-full bg-zinc-800/80 px-2 py-1 text-[10px] font-medium text-orange-400"
			>
				<ChevronLeft className="h-3 w-3" />
				Back
			</button>
			<div className="flex flex-1 flex-col items-center justify-center text-center">
				<Icon className={cn("mb-2 h-7 w-7", app.accent)} />
				<p className="text-2xl font-semibold tracking-tight text-white">
					{app.screen.title}
				</p>
				<p className="mt-1 text-xs text-zinc-300">{app.screen.subtitle}</p>
				<p className="mt-3 text-[10px] leading-relaxed text-zinc-500">
					{app.screen.detail}
				</p>
			</div>
		</motion.div>
	);
}

/**
 * HeroAppleWatch — centered watch mockup with realistic green band.
 * Boot Apple logo → live analog face → 4 complication apps with back nav.
 */
export default function HeroAppleWatch({ className }) {
	const [booted, setBooted] = useState(false);
	const [activeApp, setActiveApp] = useState(null);

	useEffect(() => {
		const id = setTimeout(() => setBooted(true), 1000);
		return () => clearTimeout(id);
	}, []);

	const app = APPS.find((a) => a.id === activeApp);

	return (
		<section
			className={cn(
				"relative mx-auto flex w-full max-w-lg flex-col items-center px-4 py-16 sm:py-20",
				className
			)}
			aria-label="Apple Watch demo"
		>
			<div className="relative flex flex-col items-center">
				<BandStrip position="top" />

				{/* Watch body overlaps band slightly */}
				<div className="relative z-10 -my-5">
					{/* Digital Crown */}
					<div
						className="absolute -right-[12px] top-[56px] z-20 h-10 w-[12px] rounded-r-md sm:top-[62px]"
						style={{
							background:
								"linear-gradient(90deg, #3f3f46 0%, #d4d4d8 45%, #71717a 100%)",
							boxShadow: "2px 0 6px rgba(0,0,0,0.4)",
						}}
					/>
					{/* Side button */}
					<div
						className="absolute -right-[9px] top-[116px] z-20 h-8 w-[9px] rounded-r-sm sm:top-[126px]"
						style={{
							background:
								"linear-gradient(90deg, #27272a 0%, #71717a 50%, #3f3f46 100%)",
						}}
					/>

					{/* Case */}
					<div
						className="relative rounded-[44px] p-[11px] sm:rounded-[48px] sm:p-3"
						style={{
							background:
								"linear-gradient(145deg, #71717a 0%, #27272a 38%, #09090b 100%)",
							boxShadow:
								"0 28px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.4)",
						}}
					>
						<div className="relative h-[236px] w-[192px] overflow-hidden rounded-[34px] bg-black sm:h-[256px] sm:w-[208px] sm:rounded-[36px]">
							<AnimatePresence mode="wait">
								{!booted ? (
									<motion.div
										key="boot"
										className="absolute inset-0 flex items-center justify-center bg-black"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										transition={{ duration: 0.35, ease }}
									>
										<AppleLogo className="h-12 w-12 text-white" />
									</motion.div>
								) : app ? (
									<AppScreen
										key={app.id}
										app={app}
										onBack={() => setActiveApp(null)}
									/>
								) : (
									<motion.div
										key="face"
										className="absolute inset-0"
										initial={{ opacity: 0, scale: 0.94 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.96 }}
										transition={{ duration: 0.4, ease }}
									>
										<div className="absolute left-2.5 top-2.5 z-30">
											<ComplicationButton
												app={APPS[0]}
												onClick={() => setActiveApp(APPS[0].id)}
											/>
										</div>
										<div className="absolute right-2.5 top-2.5 z-30">
											<ComplicationButton
												app={APPS[1]}
												onClick={() => setActiveApp(APPS[1].id)}
											/>
										</div>
										<div className="absolute bottom-2.5 left-2.5 z-30">
											<ComplicationButton
												app={APPS[2]}
												onClick={() => setActiveApp(APPS[2].id)}
											/>
										</div>
										<div className="absolute bottom-2.5 right-2.5 z-30">
											<ComplicationButton
												app={APPS[3]}
												onClick={() => setActiveApp(APPS[3].id)}
											/>
										</div>

										{/* Square clock area — perfect center for SVG dial */}
										<div className="absolute inset-0 flex items-center justify-center p-7 sm:p-8">
											<div className="aspect-square h-full max-h-full w-auto">
												<LiveClock />
											</div>
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>

				<BandStrip position="bottom" />
			</div>

			<p className="mt-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
				Boot · Face · Complications
			</p>
		</section>
	);
}
