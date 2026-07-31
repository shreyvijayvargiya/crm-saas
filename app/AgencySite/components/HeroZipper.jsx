import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_REVEAL = {
	src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80",
	alt: "Reveal artwork",
	title: "What's underneath",
	subtitle: "Drag the pull tab left → right to unzip.",
};

function buildFlapClips(openPct, gapPct) {
	const x = Math.max(0, Math.min(100, openPct * 100));
	const gap = openPct <= 0.001 ? 0 : Math.max(4, gapPct);
	const half = gap / 2;
	const cy = 50;

	if (openPct <= 0.001) {
		return {
			top: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
			bottom: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
		};
	}

	return {
		top: `polygon(0 0, 100% 0, 100% ${cy}%, ${x}% ${cy}%, ${x}% ${cy - half}%, 0 ${cy - half}%)`,
		bottom: `polygon(0 100%, 100% 100%, 100% ${cy}%, ${x}% ${cy}%, ${x}% ${cy + half}%, 0 ${cy + half}%)`,
	};
}

/** Teeth only on the still-closed span (right of pull) — never over the reveal. */
function ZipperTeeth({ openPct, isLight }) {
	const openX = openPct * 100;
	const closedW = 100 - openX;
	if (closedW <= 0.5) return null;

	const toothCount = Math.max(6, Math.floor((closedW / 100) * 48));
	const stroke = isLight ? "#3f3f46" : "#e4e4e7";
	const seam = isLight ? "#52525b" : "#d4d4d8";

	return (
		<svg
			className="pointer-events-none absolute inset-0 z-[22] h-full w-full"
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
			aria-hidden
		>
			<line
				x1={openX}
				y1="50"
				x2="100"
				y2="50"
				stroke={seam}
				strokeWidth="0.22"
			/>
			{Array.from({ length: toothCount }).map((_, i) => {
				const tx = openX + (i / toothCount) * closedW;
				return (
					<g key={i}>
						<line
							x1={tx}
							y1="49.35"
							x2={tx + 0.55}
							y2="48.65"
							stroke={stroke}
							strokeWidth="0.12"
						/>
						<line
							x1={tx}
							y1="50.65"
							x2={tx + 0.55}
							y2="51.35"
							stroke={stroke}
							strokeWidth="0.12"
						/>
					</g>
				);
			})}
		</svg>
	);
}

function ZipperPull({ openPct, isLight, onPointerDown, showHint }) {
	const left = `${openPct * 100}%`;

	return (
		<motion.div
			role="slider"
			aria-label="Zipper pull tab"
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={Math.round(openPct * 100)}
			tabIndex={0}
			onPointerDown={onPointerDown}
			className="absolute z-40 touch-none cursor-ew-resize"
			style={{
				left,
				top: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			<div
				className={cn(
					"flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-lg sm:h-14 sm:w-14",
					isLight
						? "border-zinc-400 bg-gradient-to-br from-zinc-100 to-zinc-300 shadow-zinc-400/40"
						: "border-zinc-500 bg-gradient-to-br from-zinc-600 to-zinc-800 shadow-black/50"
				)}
			>
				<div
					className={cn(
						"h-3 w-6 rounded-sm border",
						isLight
							? "border-zinc-500 bg-zinc-400"
							: "border-zinc-300 bg-zinc-500"
					)}
				/>
			</div>
			{showHint && (
				<span
					className={cn(
						"absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest",
						isLight ? "text-zinc-500" : "text-zinc-400"
					)}
				>
					Drag →
				</span>
			)}
		</motion.div>
	);
}

function RevealDimensions({ openPct, gapPct, panelW, panelH }) {
	if (openPct <= 0.02 || panelW <= 0 || panelH <= 0) return null;

	const revealW = Math.round(openPct * panelW);
	const revealH = Math.round((gapPct / 100) * panelH);
	const centerX = (openPct * 100) / 2;
	const cy = 50;

	return (
		<div
			className="pointer-events-none absolute z-10 flex flex-col items-center justify-center"
			style={{
				left: `${centerX}%`,
				top: `${cy}%`,
				width: `${openPct * 100}%`,
				height: `${gapPct}%`,
				transform: "translate(0, -50%)",
			}}
		>
			<div className="rounded-lg border border-white/25 bg-black/45 px-3 py-2 text-center backdrop-blur-sm">
				<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
					Revealed
				</p>
				<p className="mt-0.5 font-mono text-sm font-bold tabular-nums text-white sm:text-base">
					{revealW} × {revealH} px
				</p>
				<p className="mt-0.5 font-mono text-[10px] tabular-nums text-white/55">
					{Math.round(openPct * 100)}% × {Math.round(gapPct)}%
				</p>
			</div>
		</div>
	);
}

/**
 * HeroZipper — horizontal center zipper, closed by default.
 * Drag left → right to open; only the unzipped span reveals content behind.
 */
export default function HeroZipper({
	reveal = DEFAULT_REVEAL,
	isLight = true,
	className,
	maxGapPct = 32,
}) {
	const trackRef = useRef(null);
	const dragging = useRef(false);
	const [openPct, setOpenPct] = useState(0);
	const [panelSize, setPanelSize] = useState({ w: 0, h: 0 });

	const gapPct = openPct * maxGapPct;
	const clips = buildFlapClips(openPct, gapPct);
	const isClosed = openPct <= 0.02;

	useEffect(() => {
		const el = trackRef.current;
		if (!el) return;

		const update = () => {
			const { width, height } = el.getBoundingClientRect();
			setPanelSize({ w: width, h: height });
		};

		update();
		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const setFromClientX = useCallback((clientX) => {
		const el = trackRef.current;
		if (!el) return;
		const { left, width } = el.getBoundingClientRect();
		const next = Math.max(0, Math.min(1, (clientX - left) / width));
		setOpenPct(next);
	}, []);

	const onPointerDown = useCallback(
		(e) => {
			e.preventDefault();
			dragging.current = true;
			e.currentTarget.setPointerCapture(e.pointerId);
			setFromClientX(e.clientX);
		},
		[setFromClientX]
	);

	const onPointerMove = useCallback(
		(e) => {
			if (!dragging.current) return;
			setFromClientX(e.clientX);
		},
		[setFromClientX]
	);

	const onPointerUp = useCallback(() => {
		dragging.current = false;
	}, []);

	const flapClass = isLight ? "bg-zinc-100" : "bg-zinc-900";

	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2 px-4 py-10 sm:py-14",
				className
			)}
			aria-label="Zipper reveal"
		>
			<div className="mx-auto max-w-3xl text-center">
				<p
					className={cn(
						"text-[11px] font-semibold uppercase tracking-[0.2em]",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					Zipper reveal
				</p>
				<h2
					className={cn(
						"mt-2 text-2xl font-bold tracking-tight sm:text-3xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					Pull to peek behind
				</h2>
			</div>

			<div
				ref={trackRef}
				className={cn(
					"relative mx-auto mt-8 h-[min(68vh,560px)] w-full max-w-2xl overflow-hidden rounded-2xl border shadow-2xl select-none touch-none",
					isLight
						? "border-zinc-200 bg-zinc-100 shadow-zinc-300/40"
						: "border-zinc-800 bg-zinc-950 shadow-black/40"
				)}
				onPointerMove={onPointerMove}
				onPointerUp={onPointerUp}
				onPointerCancel={onPointerUp}
				onPointerDown={(e) => {
					if (e.target.closest("[data-zip-pull]")) return;
					onPointerDown(e);
				}}
			>
				<div className="absolute inset-0 z-0">
					<img
						src={reveal.src}
						alt={reveal.alt || ""}
						className="h-full w-full object-cover"
						draggable={false}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
					<div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
						<p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
							{reveal.title}
						</p>
						<p className="mt-3 max-w-sm text-lg font-bold leading-snug text-white sm:text-2xl">
							{reveal.subtitle}
						</p>
					</div>
				</div>

				<RevealDimensions
					openPct={openPct}
					gapPct={gapPct}
					panelW={panelSize.w}
					panelH={panelSize.h}
				/>

				<div
					className={cn("absolute inset-0 z-20", flapClass)}
					style={{
						clipPath: clips.top,
						backgroundImage: isLight
							? "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 6px)"
							: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px)",
					}}
				/>

				<div
					className={cn("absolute inset-0 z-20", flapClass)}
					style={{
						clipPath: clips.bottom,
						backgroundImage: isLight
							? "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 6px)"
							: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.03) 3px, rgba(255,255,255,0.03) 6px)",
					}}
				/>

				{/* Closed seam — only on fabric to the right of the pull */}
				{openPct > 0.02 && openPct < 0.995 && (
					<div
						className="pointer-events-none absolute z-[21] h-px"
						style={{
							left: `${openPct * 100}%`,
							right: 0,
							top: "50%",
							transform: "translateY(-50%)",
							background: isLight
								? "linear-gradient(to right, #71717a, #a1a1aa 40%, #71717a)"
								: "linear-gradient(to right, #52525b, #a1a1aa 40%, #52525b)",
						}}
					/>
				)}

				<ZipperTeeth openPct={openPct} isLight={isLight} />

				<div data-zip-pull>
					<ZipperPull
						openPct={openPct}
						isLight={isLight}
						onPointerDown={onPointerDown}
						showHint={isClosed}
					/>
				</div>

				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-1 bg-black/10">
					<div
						className={cn(
							"h-full origin-left",
							isLight ? "bg-orange-500" : "bg-orange-400"
						)}
						style={{ width: `${openPct * 100}%` }}
					/>
				</div>
			</div>

			<p
				className={cn(
					"mt-4 text-center text-xs",
					isLight ? "text-zinc-400" : "text-zinc-500"
				)}
			>
				{isClosed
					? "Drag left → right anywhere on the panel to unzip"
					: `${Math.round(openPct * 100)}% open · ${Math.round(openPct * panelSize.w)} × ${Math.round((gapPct / 100) * panelSize.h)} px revealed`}
			</p>
		</section>
	);
}
