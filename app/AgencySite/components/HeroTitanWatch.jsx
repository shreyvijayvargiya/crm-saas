import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const GOLD = "#c9a227";
const GOLD_DARK = "#9a7b1a";
const GOLD_LIGHT = "#e8c84a";

function TitanLogo({ className }) {
	return (
		<svg viewBox="0 0 48 20" className={className} aria-hidden>
			<circle cx="10" cy="10" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.2" />
			<text
				x="10"
				y="13.5"
				textAnchor="middle"
				fontSize="9"
				fontWeight="700"
				fill="#1a1a1a"
				fontFamily="Georgia, serif"
			>
				T
			</text>
			<text
				x="28"
				y="13"
				fontSize="7.5"
				fontWeight="700"
				letterSpacing="0.12em"
				fill="#1a1a1a"
				fontFamily="system-ui, sans-serif"
			>
				TITAN
			</text>
		</svg>
	);
}

function LiveDial() {
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

	const day = now
		.toLocaleDateString("en-US", { weekday: "short" })
		.toUpperCase()
		.slice(0, 3);
	const date = now.getDate();

	const cx = 100;
	const cy = 100;

	return (
		<svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
			<defs>
				<radialGradient id="dial-shade" cx="50%" cy="45%" r="55%">
					<stop offset="0%" stopColor="#fafafa" />
					<stop offset="100%" stopColor="#e8e8e8" />
				</radialGradient>
			</defs>

			<circle cx={cx} cy={cy} r="92" fill="url(#dial-shade)" />

			{/* Hour dots */}
			{Array.from({ length: 12 }, (_, i) => {
				if (i % 3 === 0) return null;
				const rad = ((i * 30 - 90) * Math.PI) / 180;
				const r = 78;
				return (
					<circle
						key={`dot-${i}`}
						cx={cx + Math.cos(rad) * r}
						cy={cy + Math.sin(rad) * r}
						r="2.2"
						fill={GOLD}
					/>
				);
			})}

			{/* Numerals 12, 3, 6, 9 */}
			{[
				{ n: "12", x: cx, y: 28 },
				{ n: "3", x: 172, y: cy + 5 },
				{ n: "6", x: cx, y: 178 },
				{ n: "9", x: 28, y: cy + 5 },
			].map(({ n, x, y }) => (
				<text
					key={n}
					x={x}
					y={y}
					textAnchor="middle"
					fontSize="14"
					fontWeight="600"
					fill="#2a2a2a"
					fontFamily="Georgia, 'Times New Roman', serif"
				>
					{n}
				</text>
			))}

			{/* Brand */}
			<g transform="translate(68, 38)">
				<TitanLogo className="h-4 w-[72px]" />
			</g>

			{/* Date window at 3 o'clock */}
			<g transform="translate(138, 88)">
				<rect
					x="0"
					y="0"
					width="38"
					height="22"
					rx="2"
					fill="white"
					stroke="#ccc"
					strokeWidth="0.6"
				/>
				<text
					x="19"
					y="15"
					textAnchor="middle"
					fontSize="8.5"
					fontWeight="700"
					fill="#1a1a1a"
					fontFamily="system-ui, sans-serif"
					letterSpacing="0.04em"
				>
					{day} {date}
				</text>
			</g>

			{/* Hour hand */}
			<g transform={`rotate(${hourDeg} ${cx} ${cy})`}>
				<line
					x1={cx}
					y1={cy + 12}
					x2={cx}
					y2={cy - 38}
					stroke={GOLD_DARK}
					strokeWidth="3.2"
					strokeLinecap="round"
				/>
			</g>

			{/* Minute hand */}
			<g transform={`rotate(${minuteDeg} ${cx} ${cy})`}>
				<line
					x1={cx}
					y1={cy + 14}
					x2={cx}
					y2={cy - 54}
					stroke={GOLD}
					strokeWidth="2.2"
					strokeLinecap="round"
				/>
			</g>

			{/* Second hand */}
			<g transform={`rotate(${secondDeg} ${cx} ${cy})`}>
				<line
					x1={cx}
					y1={cy + 18}
					x2={cx}
					y2={cy - 62}
					stroke={GOLD_LIGHT}
					strokeWidth="0.8"
					strokeLinecap="round"
				/>
			</g>

			<circle cx={cx} cy={cy} r="3.5" fill={GOLD_DARK} />
			<circle cx={cx} cy={cy} r="1.5" fill="#fafafa" />
		</svg>
	);
}

function SteppedLug({ side }) {
	const isLeft = side === "left";
	return (
		<div
			className={cn(
				"absolute top-1/2 z-0 h-[52px] w-[18px] -translate-y-1/2 sm:h-[58px] sm:w-[20px]",
				isLeft ? "-left-[14px] sm:-left-[16px]" : "-right-[14px] sm:-right-[16px]"
			)}
			style={{
				background: `linear-gradient(${isLeft ? "90deg" : "270deg"}, ${GOLD_LIGHT}, ${GOLD}, ${GOLD_DARK})`,
				boxShadow: isLeft
					? "inset 2px 0 4px rgba(255,255,255,0.35), inset -1px 0 3px rgba(0,0,0,0.2)"
					: "inset -2px 0 4px rgba(255,255,255,0.35), inset 1px 0 3px rgba(0,0,0,0.2)",
				clipPath: isLeft
					? "polygon(100% 0, 100% 100%, 0 85%, 0 15%)"
					: "polygon(0 0, 0 100%, 100% 85%, 100% 15%)",
			}}
		>
			{/* Stepped ridges */}
			{[0, 1, 2].map((i) => (
				<div
					key={i}
					className="absolute inset-y-[18%] w-px bg-black/15"
					style={{ [isLeft ? "left" : "right"]: `${28 + i * 22}%` }}
				/>
			))}
		</div>
	);
}

function LeatherStrap({ position }) {
	const isTop = position === "top";
	return (
		<div
			className={cn(
				"relative z-0 w-[108px] sm:w-[120px]",
				isTop ? "h-32 rounded-t-2xl sm:h-36" : "h-32 rounded-b-2xl sm:h-36"
			)}
			style={{
				background:
					"linear-gradient(90deg, #1a1a1a 0%, #2d2d2d 18%, #252525 50%, #2d2d2d 82%, #1a1a1a 100%)",
				boxShadow: isTop
					? "inset 0 8px 12px rgba(255,255,255,0.04), inset 0 -4px 8px rgba(0,0,0,0.4)"
					: "inset 0 -8px 12px rgba(255,255,255,0.04), inset 0 4px 8px rgba(0,0,0,0.4)",
			}}
		>
			{/* Pebble grain texture */}
			<div
				className="pointer-events-none absolute inset-0 opacity-40"
				style={{
					backgroundImage:
						"radial-gradient(circle at 20% 30%, rgba(255,255,255,0.06) 0.5px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(0,0,0,0.15) 0.5px, transparent 1px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.04) 0.5px, transparent 1px)",
					backgroundSize: "8px 8px, 6px 6px, 10px 10px",
				}}
			/>
			{/* Subtle stitch line */}
			<div
				className={cn(
					"absolute left-3 right-3 h-px bg-zinc-600/30",
					isTop ? "bottom-4" : "top-4"
				)}
			/>
		</div>
	);
}

/**
 * HeroTitanWatch — classic analog Titan-style dress watch with live hands,
 * date window, gold case, stepped lugs, and black leather strap.
 */
export default function HeroTitanWatch({ className, isLight = true }) {
	return (
		<section
			className={cn(
				"relative mx-auto flex w-full max-w-md flex-col items-center px-4 py-16 sm:py-20",
				className
			)}
			aria-label="Titan watch demo"
		>
			<div className="mb-6 text-center">
				<p
					className={cn(
						"text-[11px] font-semibold uppercase tracking-[0.2em]",
						isLight ? "text-zinc-500" : "text-zinc-500"
					)}
				>
					Analog watch
				</p>
				<h2
					className={cn(
						"mt-1 text-2xl font-bold tracking-tight sm:text-3xl",
						isLight ? "text-zinc-950" : "text-white"
					)}
				>
					Titan classic
				</h2>
			</div>

			<div className="relative flex flex-col items-center">
				<LeatherStrap position="top" />

				<div className="relative z-10 -my-4">
					<SteppedLug side="left" />
					<SteppedLug side="right" />

					{/* Crown */}
					<div
						className="absolute -right-[10px] top-1/2 z-20 h-4 w-[10px] -translate-y-1/2 rounded-r-sm sm:h-5 sm:w-[11px]"
						style={{
							background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD_LIGHT}, ${GOLD})`,
							boxShadow: "1px 0 3px rgba(0,0,0,0.35)",
						}}
					>
						<div
							className="absolute inset-y-1 left-0.5 right-0.5 opacity-50"
							style={{
								background:
									"repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.25) 1px, rgba(0,0,0,0.25) 2px)",
							}}
						/>
					</div>

					{/* Gold case */}
					<div
						className="relative rounded-full p-[10px] sm:p-[11px]"
						style={{
							background: `linear-gradient(145deg, ${GOLD_LIGHT} 0%, ${GOLD} 35%, ${GOLD_DARK} 70%, #7a6215 100%)`,
							boxShadow:
								"0 24px 48px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -2px 0 rgba(0,0,0,0.25)",
						}}
					>
						{/* Bezel ring */}
						<div
							className="rounded-full p-[3px]"
							style={{
								background: `linear-gradient(160deg, ${GOLD_LIGHT}, ${GOLD_DARK})`,
							}}
						>
							<div className="relative h-[168px] w-[168px] overflow-hidden rounded-full bg-[#f5f5f5] sm:h-[188px] sm:w-[188px]">
								<div className="absolute inset-2">
									<LiveDial />
								</div>
								{/* Glass highlight */}
								<div
									className="pointer-events-none absolute inset-0 rounded-full"
									style={{
										background:
											"linear-gradient(135deg, rgba(255,255,255,0.35) 0%, transparent 42%, transparent 58%, rgba(255,255,255,0.08) 100%)",
									}}
								/>
							</div>
						</div>
					</div>
				</div>

				<LeatherStrap position="bottom" />
			</div>

			<p className="mt-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
				Live · Date · Leather strap
			</p>
		</section>
	);
}
