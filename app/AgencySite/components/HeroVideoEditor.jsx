import React, { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, Plus, Scissors, SkipBack } from "lucide-react";
import { cn } from "@/lib/utils";

const DURATION = 24;
const TRACK_H = 52;
const LABEL_W = 84;

const SEED_SCENES = [
	{
		id: "s1",
		track: "scenes",
		label: "Intro",
		start: 0,
		dur: 5,
		color: "#f97316",
		src: "/screenshots-marketing-page/saas-crm-dashboard.png",
	},
	{
		id: "s2",
		track: "scenes",
		label: "Product",
		start: 5.2,
		dur: 7,
		color: "#6366f1",
		src: "/screenshots-marketing-page/saas-crm-analytics.png",
	},
	{
		id: "s3",
		track: "scenes",
		label: "Pipeline",
		start: 12.5,
		dur: 6,
		color: "#14b8a6",
		src: "/screenshots-marketing-page/saas-crm-sales.png",
	},
	{
		id: "s4",
		track: "scenes",
		label: "Outro",
		start: 18.8,
		dur: 4.5,
		color: "#e11d48",
		src: "/screenshots-marketing-page/saas-crm-scheduler.png",
	},
];

const SEED_OBJECTS = [
	{ id: "o1", track: "objects", label: "Title card", start: 0.4, dur: 3.2, color: "#facc15" },
	{ id: "o2", track: "objects", label: "CTA pill", start: 8, dur: 4, color: "#22d3ee" },
	{ id: "o3", track: "objects", label: "Lower third", start: 14, dur: 5, color: "#a78bfa" },
];

const SEED_FRAMES = [
	{ id: "f1", track: "frames", label: "F01", start: 0, dur: 2, color: "#fb7185" },
	{ id: "f2", track: "frames", label: "F02", start: 2.1, dur: 2.4, color: "#fb923c" },
	{ id: "f3", track: "frames", label: "F03", start: 4.6, dur: 2.2, color: "#fbbf24" },
	{ id: "f4", track: "frames", label: "F04", start: 7, dur: 3, color: "#34d399" },
	{ id: "f5", track: "frames", label: "F05", start: 10.2, dur: 2.8, color: "#60a5fa" },
	{ id: "f6", track: "frames", label: "F06", start: 13.2, dur: 3.4, color: "#c084fc" },
	{ id: "f7", track: "frames", label: "F07", start: 16.8, dur: 3, color: "#f472b6" },
	{ id: "f8", track: "frames", label: "F08", start: 20, dur: 3.5, color: "#94a3b8" },
];

const TRACKS = [
	{ id: "scenes", label: "Scenes" },
	{ id: "frames", label: "Frames" },
	{ id: "objects", label: "Objects" },
];

function formatTime(sec) {
	const s = Math.max(0, sec);
	const m = Math.floor(s / 60);
	const r = s - m * 60;
	return `${String(m).padStart(2, "0")}:${r.toFixed(1).padStart(4, "0")}`;
}

function clamp(n, min, max) {
	return Math.max(min, Math.min(max, n));
}

function clipAtTime(clips, t) {
	return clips.find((c) => t >= c.start && t < c.start + c.dur) || null;
}

/**
 * HeroVideoEditor — frontend timeline editor.
 * Center preview + playhead timeline with draggable scenes / frames / objects.
 */
export default function HeroVideoEditor({ isLight = true, className }) {
	const [clips, setClips] = useState(() => [
		...SEED_SCENES,
		...SEED_FRAMES,
		...SEED_OBJECTS,
	]);
	const [time, setTime] = useState(0);
	const [playing, setPlaying] = useState(false);
	const [selectedId, setSelectedId] = useState("s1");
	const [addCount, setAddCount] = useState(1);

	const rootRef = useRef(null);
	const boardRef = useRef(null);
	const dragRef = useRef(null);
	const rafRef = useRef(null);
	const lastTsRef = useRef(0);
	const [pxPerSec, setPxPerSec] = useState(56);
	const pxPerSecRef = useRef(56);

	const scenes = useMemo(() => clips.filter((c) => c.track === "scenes"), [clips]);
	const activeScene = clipAtTime(scenes, time) || scenes[0];
	const activeObject = clipAtTime(
		clips.filter((c) => c.track === "objects"),
		time
	);
	const selected = clips.find((c) => c.id === selectedId) || null;
	const timelineW = DURATION * pxPerSec;

	useEffect(() => {
		const el = rootRef.current;
		if (!el) return undefined;
		const fit = () => {
			const w = el.getBoundingClientRect().width - 32;
			const next = Math.max(40, (w - LABEL_W) / DURATION);
			pxPerSecRef.current = next;
			setPxPerSec(next);
		};
		fit();
		const ro = new ResizeObserver(fit);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	useEffect(() => {
		if (!playing) {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
			lastTsRef.current = 0;
			return undefined;
		}

		const tick = (ts) => {
			if (!lastTsRef.current) lastTsRef.current = ts;
			const dt = (ts - lastTsRef.current) / 1000;
			lastTsRef.current = ts;
			setTime((prev) => {
				const next = prev + dt;
				if (next >= DURATION) {
					setPlaying(false);
					return DURATION;
				}
				return next;
			});
			rafRef.current = requestAnimationFrame(tick);
		};

		rafRef.current = requestAnimationFrame(tick);
		return () => {
			if (rafRef.current) cancelAnimationFrame(rafRef.current);
		};
	}, [playing]);

	const seekFromClientX = (clientX) => {
		const el = boardRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const x = clientX - rect.left + el.scrollLeft - LABEL_W;
		setTime(clamp(x / pxPerSecRef.current, 0, DURATION));
	};

	const onClipPointerDown = (event, clip) => {
		if (event.button !== 0) return;
		event.preventDefault();
		event.stopPropagation();
		setSelectedId(clip.id);
		setPlaying(false);

		dragRef.current = {
			id: clip.id,
			startX: event.clientX,
			originStart: clip.start,
		};

		const onMove = (moveEvent) => {
			const drag = dragRef.current;
			if (!drag) return;
			const dx = moveEvent.clientX - drag.startX;
			const deltaSec = dx / pxPerSecRef.current;
			setClips((prev) =>
				prev.map((c) => {
					if (c.id !== drag.id) return c;
					const nextStart = clamp(drag.originStart + deltaSec, 0, DURATION - c.dur);
					return { ...c, start: nextStart };
				})
			);
		};

		const onUp = () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			dragRef.current = null;
		};

		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
	};

	const addClip = () => {
		const id = `n${Date.now()}`;
		const start = clamp(time, 0, DURATION - 3);
		const next = {
			id,
			track: "objects",
			label: `Overlay ${addCount}`,
			start,
			dur: 3,
			color: "#38bdf8",
		};
		setAddCount((n) => n + 1);
		setClips((prev) => [...prev, next]);
		setSelectedId(id);
	};

	const splitSelected = () => {
		if (!selected) return;
		const mid = time;
		if (mid <= selected.start + 0.4 || mid >= selected.start + selected.dur - 0.4) return;
		const leftDur = mid - selected.start;
		const right = {
			...selected,
			id: `${selected.id}-b`,
			start: mid,
			dur: selected.dur - leftDur,
			label: `${selected.label} B`,
		};
		setClips((prev) => [
			...prev.map((c) => (c.id === selected.id ? { ...c, dur: leftDur } : c)),
			right,
		]);
	};

	return (
		<section
			ref={rootRef}
			className={cn(
				"relative overflow-hidden border-y",
				isLight ? "border-zinc-200 bg-zinc-100" : "border-zinc-800 bg-zinc-950",
				className
			)}
			style={{
				width: "100vw",
				marginLeft: "calc(50% - 50vw)",
			}}
			aria-label="Video editor"
		>
			{/* Preview */}
			<div className="relative aspect-video w-full overflow-hidden bg-black sm:aspect-[21/9]">
				{activeScene?.src ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={activeScene.src}
						alt={activeScene.label}
						className="h-full w-full object-cover object-top opacity-90"
					/>
				) : (
					<div className="h-full w-full" style={{ background: activeScene?.color || "#111" }} />
				)}

				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

				<div className="absolute left-4 top-4 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
					{activeScene?.label || "Empty"} · {formatTime(time)}
				</div>

				{activeObject ? (
					<div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-zinc-900 shadow-lg">
						{activeObject.label}
					</div>
				) : null}

				<div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
					<button
						type="button"
						onClick={() => {
							setPlaying(false);
							setTime(0);
						}}
						className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25"
						aria-label="Restart"
					>
						<SkipBack className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => setPlaying((p) => !p)}
						className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-zinc-900 shadow-lg"
						aria-label={playing ? "Pause" : "Play"}
					>
						{playing ? <Pause className="h-4 w-4" /> : <Play className="ml-0.5 h-4 w-4" />}
					</button>
					<button
						type="button"
						onClick={addClip}
						className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25"
						aria-label="Add overlay"
					>
						<Plus className="h-4 w-4" />
					</button>
				</div>
			</div>

			{/* Transport + timeline */}
			<div className={cn("border-t px-4 py-4 sm:px-6", isLight ? "border-zinc-200 bg-white" : "border-zinc-800 bg-zinc-900")}>
				<div className="mb-3 flex flex-wrap items-center gap-2">
					<button
						type="button"
						onClick={() => setPlaying((p) => !p)}
						className={cn(
							"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold",
							isLight ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
						)}
					>
						{playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
						{playing ? "Pause" : "Play"}
					</button>
					<button
						type="button"
						onClick={addClip}
						className={cn(
							"inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
							isLight ? "border-zinc-200 text-zinc-700" : "border-zinc-700 text-zinc-200"
						)}
					>
						<Plus className="h-3.5 w-3.5" />
						Add
					</button>
					<button
						type="button"
						onClick={splitSelected}
						className={cn(
							"inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
							isLight ? "border-zinc-200 text-zinc-700" : "border-zinc-700 text-zinc-200"
						)}
					>
						<Scissors className="h-3.5 w-3.5" />
						Split
					</button>
					<span className={cn("ml-auto font-mono text-[11px]", isLight ? "text-zinc-500" : "text-zinc-400")}>
						{formatTime(time)} / {formatTime(DURATION)}
						{selected ? ` · ${selected.label}` : ""}
					</span>
				</div>

				<div
					ref={boardRef}
					className="relative overflow-x-auto pb-2 [scrollbar-width:thin]"
					onPointerDown={(event) => {
						if (event.target === event.currentTarget || event.target.dataset?.ruler) {
							seekFromClientX(event.clientX);
						}
					}}
				>
					<div className="relative min-w-full" style={{ width: timelineW + LABEL_W }}>
						{/* Ruler */}
						<div className="relative mb-2 h-6" data-ruler="1" style={{ marginLeft: LABEL_W, width: timelineW }}>
							{Array.from({ length: DURATION + 1 }).map((_, i) => (
								<div
									key={i}
									className="absolute top-0 h-full"
									style={{ left: i * pxPerSec }}
									data-ruler="1"
								>
									<span
										className={cn(
											"block h-2 w-px",
											isLight ? "bg-zinc-300" : "bg-zinc-600"
										)}
									/>
									<span
										className={cn(
											"mt-0.5 block font-mono text-[9px]",
											isLight ? "text-zinc-400" : "text-zinc-500"
										)}
									>
										{i}s
									</span>
								</div>
							))}
						</div>

						<div className="space-y-1.5">
							{TRACKS.map((track) => (
								<div key={track.id} className="flex items-stretch gap-2">
									<div
										className={cn(
											"sticky left-0 z-20 flex shrink-0 items-center rounded-md px-2 text-[10px] font-semibold uppercase tracking-wide",
											isLight ? "bg-zinc-50 text-zinc-500" : "bg-zinc-800 text-zinc-400"
										)}
										style={{ width: LABEL_W - 8 }}
									>
										{track.label}
									</div>
									<div
										className={cn(
											"relative flex-1 rounded-md",
											isLight ? "bg-zinc-100" : "bg-zinc-800/70"
										)}
										style={{ height: TRACK_H, width: timelineW }}
										onPointerDown={(event) => {
											if (event.target === event.currentTarget) seekFromClientX(event.clientX);
										}}
									>
										{clips
											.filter((c) => c.track === track.id)
											.map((clip) => {
												const active = selectedId === clip.id;
												return (
													<button
														key={clip.id}
														type="button"
														onPointerDown={(event) => onClipPointerDown(event, clip)}
														className={cn(
															"absolute top-1.5 flex h-9 cursor-grab items-center overflow-hidden rounded-md px-2.5 text-left text-[11px] font-semibold text-white shadow-sm active:cursor-grabbing",
															active && "ring-2 ring-white ring-offset-1 ring-offset-zinc-900"
														)}
														style={{
															left: clip.start * pxPerSec,
															width: Math.max(40, clip.dur * pxPerSec),
															background: clip.color,
														}}
													>
														<span className="truncate">{clip.label}</span>
													</button>
												);
											})}
									</div>
								</div>
							))}
						</div>

						{/* Playhead */}
						<div
							className="pointer-events-none absolute bottom-0 top-0 z-30 w-px bg-rose-500"
							style={{ left: time * pxPerSec + LABEL_W }}
						>
							<span className="absolute -top-0.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-sm bg-rose-500" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
