import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const VB_W = 900;
const VB_H = 280;
const PAD = 48;
const MID_Y = VB_H / 2;
const SAMPLES = 160;

/** Deterministic scribble offsets along X — tangled loops. */
function scribbleY(t) {
	const x = t * Math.PI * 2;
	return (
		Math.sin(x * 2.4) * 52 +
		Math.sin(x * 6.8 + 0.8) * 34 +
		Math.sin(x * 14.2 + 1.4) * 18 +
		Math.cos(x * 9.1 + 0.3) * 24 +
		Math.sin(x * 28 + 0.5) * 9 +
		Math.sin(x * 4.1 + Math.sin(x * 3)) * 20
	);
}

function buildPoints() {
	const pts = [];
	for (let i = 0; i <= SAMPLES; i++) {
		const t = i / SAMPLES;
		const x = PAD + t * (VB_W - PAD * 2);
		const y = MID_Y + scribbleY(t);
		pts.push({ x, y, t });
	}
	return pts;
}

function pointsToPath(points) {
	if (!points.length) return "";
	let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
	for (let i = 1; i < points.length; i++) {
		const p = points[i];
		const prev = points[i - 1];
		const cpx = (prev.x + p.x) / 2;
		d += ` Q ${cpx.toFixed(2)} ${prev.y.toFixed(2)} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
	}
	return d;
}

/**
 * HeroCalmDrag — scribbled calmness line.
 * Drag the handle right: passed portion straightens; the rest stays tangled.
 */
export default function HeroCalmDrag({ isLight = true, className }) {
	const base = useMemo(() => buildPoints(), []);
	const svgRef = useRef(null);
	const dragging = useRef(false);
	const [progress, setProgress] = useState(0);

	const dragX = PAD + progress * (VB_W - PAD * 2);

	const drawn = useMemo(() => {
		return base.map((p) => {
			if (p.x <= dragX) {
				return { ...p, y: MID_Y };
			}
			return p;
		});
	}, [base, dragX]);

	const pathD = useMemo(() => pointsToPath(drawn), [drawn]);

	const handleY = MID_Y;

	const setFromClientX = (clientX) => {
		const svg = svgRef.current;
		if (!svg) return;
		const rect = svg.getBoundingClientRect();
		const x = ((clientX - rect.left) / rect.width) * VB_W;
		const t = (x - PAD) / (VB_W - PAD * 2);
		setProgress(Math.min(1, Math.max(0, t)));
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

	const calmPct = Math.round(progress * 100);
	const stroke = isLight ? "#09090b" : "#fafafa";

	
	return (
		<section
			className={cn(
				"mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-14 sm:py-20",
				className
			)}
			aria-label="Calm drag scribble"
		>
			<div className="text-center">
				<h2
					className={cn(
						"text-2xl font-semibold tracking-tight sm:text-3xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					How calm are you today?
				</h2>
				<p
					className={cn(
						"mt-2 text-sm",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					Drag →
				</p>
			</div>

			<div
				className={cn(
					"mt-10 w-full rounded-[1.5rem] px-2 py-8 sm:px-6",
					isLight ? "bg-[#f7f7f7]" : "bg-zinc-900"
				)}
			>
				<svg
					ref={svgRef}
					viewBox={`0 0 ${VB_W} ${VB_H}`}
					className="h-auto w-full touch-none select-none"
					role="slider"
					aria-valuemin={0}
					aria-valuemax={100}
					aria-valuenow={calmPct}
					aria-label="Calmness"
					tabIndex={0}
					onKeyDown={(e) => {
						if (e.key === "ArrowRight") setProgress((p) => Math.min(1, p + 0.04));
						if (e.key === "ArrowLeft") setProgress((p) => Math.max(0, p - 0.04));
					}}
					onPointerDown={(e) => {
						if (e.target.tagName === "circle" || e.currentTarget === e.target) {
							dragging.current = true;
							setFromClientX(e.clientX);
						}
					}}
				>
					<path
						d={pathD}
						fill="none"
						stroke={stroke}
						strokeWidth="4.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<circle
						cx={dragX}
						cy={handleY}
						r="14"
						fill={stroke}
						className="cursor-ew-resize"
						onPointerDown={(e) => {
							e.preventDefault();
							dragging.current = true;
							e.currentTarget.setPointerCapture?.(e.pointerId);
							setFromClientX(e.clientX);
						}}
					/>
					{/* Hit area */}
					<circle
						cx={dragX}
						cy={handleY}
						r="28"
						fill="transparent"
						className="cursor-ew-resize"
						onPointerDown={(e) => {
							e.preventDefault();
							dragging.current = true;
							setFromClientX(e.clientX);
						}}
					/>
				</svg>

				<p
					className={cn(
						"mt-2 text-center font-mono text-xs tabular-nums",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					{calmPct}% calm
				</p>
			</div>
		</section>
	);
}
