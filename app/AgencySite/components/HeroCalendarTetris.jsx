import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GripHorizontal, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const DAYS = [
	{ id: "mon", label: "Mon", dot: "#ef4444" },
	{ id: "tue", label: "Tue", dot: "#eab308" },
	{ id: "wed", label: "Wed", dot: "#22c55e" },
	{ id: "thu", label: "Thu", dot: "#3b82f6" },
	{ id: "fri", label: "Fri", dot: "#a855f7" },
];

const DAY_START = 9;
const DAY_END = 17;
const HOURS = Array.from({ length: DAY_END - DAY_START + 1 }, (_, i) => DAY_START + i);
const PX_PER_HOUR = 56;
const SNAP = 0.25; // 15 min
const MIN_DUR = 0.5;
const GRID_H = (DAY_END - DAY_START) * PX_PER_HOUR;

const STYLES = {
	deep: { bg: "#c4b5fd", text: "#1e1b4b" },
	interview: { bg: "#fca5a5", text: "#7f1d1d" },
	design: { bg: "#fdba74", text: "#7c2d12" },
	standup: { bg: "#93c5fd", text: "#1e3a8a" },
	lunch: { bg: "#d4d4d8", text: "#27272a" },
	oneone: { bg: "#86efac", text: "#14532d" },
};

const SEED = [
	{ id: "s1", title: "Standup", day: "mon", start: 9, duration: 0.5, kind: "standup" },
	{ id: "s2", title: "Interview", day: "mon", start: 9.5, duration: 1.5, kind: "interview" },
	{ id: "s3", title: "Deep work", day: "mon", start: 13.5, duration: 3, kind: "deep" },
	{ id: "s4", title: "Standup", day: "tue", start: 9, duration: 0.5, kind: "standup" },
	{ id: "s5", title: "Deep work", day: "tue", start: 10, duration: 2.5, kind: "deep" },
	{ id: "s6", title: "Lunch", day: "tue", start: 12.5, duration: 1, kind: "lunch" },
	{ id: "s7", title: "Design review", day: "tue", start: 14, duration: 2, kind: "design" },
	{ id: "s8", title: "Standup", day: "wed", start: 9, duration: 0.5, kind: "standup" },
	{ id: "s9", title: "1:1", day: "wed", start: 10, duration: 1, kind: "oneone" },
	{ id: "s10", title: "Deep work", day: "wed", start: 13.5, duration: 3, kind: "deep" },
	{ id: "s11", title: "Standup", day: "thu", start: 9, duration: 0.5, kind: "standup" },
	{ id: "s12", title: "Interview", day: "thu", start: 10, duration: 1.5, kind: "interview" },
	{ id: "s13", title: "Lunch", day: "thu", start: 12.5, duration: 1, kind: "lunch" },
	{ id: "s14", title: "Design review", day: "thu", start: 14, duration: 2, kind: "design" },
	{ id: "s15", title: "Standup", day: "fri", start: 9, duration: 0.5, kind: "standup" },
	{ id: "s16", title: "Deep work", day: "fri", start: 10, duration: 2.5, kind: "deep" },
	{ id: "s17", title: "1:1", day: "fri", start: 14, duration: 1, kind: "oneone" },
];

function snap(v) {
	return Math.round(v / SNAP) * SNAP;
}

function clampStart(start, duration) {
	const maxStart = DAY_END - duration;
	return Math.min(Math.max(snap(start), DAY_START), maxStart);
}

function clampDuration(start, duration) {
	const max = DAY_END - start;
	return Math.min(Math.max(snap(duration), MIN_DUR), max);
}

function formatHour(h) {
	const hr = Math.floor(h);
	const min = Math.round((h - hr) * 60);
	return `${hr}:${String(min).padStart(2, "0")}`;
}

function formatRange(start, duration) {
	return `${formatHour(start)}–${formatHour(start + duration)}`;
}

function totalHours(events) {
	return events.reduce((a, e) => a + e.duration, 0);
}

function SlotCard({
	event,
	index,
	animateIn,
	active,
	onPointerDownMove,
	onPointerDownResize,
}) {
	const style = STYLES[event.kind] || STYLES.deep;
	const top = (event.start - DAY_START) * PX_PER_HOUR;
	const height = event.duration * PX_PER_HOUR;

	return (
		<motion.div
			layout={false}
			initial={animateIn ? { opacity: 0, y: 18, scale: 0.92 } : false}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			transition={{
				type: "spring",
				stiffness: 320,
				damping: 24,
				delay: animateIn ? index * 0.045 : 0,
			}}
			className={cn(
				"absolute inset-x-1 z-10 flex flex-col overflow-hidden rounded-lg select-none",
				active && "z-30 ring-2 ring-zinc-900/20 shadow-lg"
			)}
			style={{
				top,
				height: Math.max(height, 28),
				backgroundColor: style.bg,
				color: style.text,
				touchAction: "none",
			}}
		>
			{/* Drag body */}
			<div
				className="flex min-h-0 flex-1 cursor-grab flex-col gap-0.5 px-2 pt-1.5 active:cursor-grabbing"
				onPointerDown={(e) => onPointerDownMove(e, event.id)}
			>
				<div className="flex items-start justify-between gap-1">
					<p className="truncate text-[11px] font-semibold leading-tight sm:text-xs">
						{event.title}
					</p>
					<p className="shrink-0 font-mono text-[9px] opacity-70 sm:text-[10px]">
						{formatRange(event.start, event.duration)}
					</p>
				</div>
			</div>

			{/* Resize handle */}
			<button
				type="button"
				aria-label={`Resize ${event.title}`}
				className="flex h-5 w-full shrink-0 cursor-ns-resize items-center justify-center border-t border-black/10 bg-black/[0.06] hover:bg-black/10"
				onPointerDown={(e) => {
					e.stopPropagation();
					onPointerDownResize(e, event.id);
				}}
			>
				<GripHorizontal className="h-3.5 w-3.5 opacity-60" strokeWidth={2.25} />
			</button>
		</motion.div>
	);
}

/**
 * HeroCalendarTetris — week grid with animated slots; drag to move, bottom grip to resize.
 */
export default function HeroCalendarTetris({ className }) {
	const [events, setEvents] = useState(() => SEED.map((e) => ({ ...e })));
	const [playKey, setPlayKey] = useState(0);
	const [animateIn, setAnimateIn] = useState(true);
	const [activeId, setActiveId] = useState(null);

	const gridRef = useRef(null);
	const dragRef = useRef(null);

	const hoursScheduled = useMemo(() => totalHours(events), [events]);

	const replay = useCallback(() => {
		setEvents(SEED.map((e) => ({ ...e })));
		setAnimateIn(true);
		setPlayKey((k) => k + 1);
	}, []);

	useEffect(() => {
		if (!animateIn) return undefined;
		const t = setTimeout(() => setAnimateIn(false), 900);
		return () => clearTimeout(t);
	}, [animateIn, playKey]);

	const hitTest = useCallback((clientX, clientY) => {
		const root = gridRef.current;
		if (!root) return null;
		const cols = root.querySelectorAll("[data-day-col]");
		for (let i = 0; i < cols.length; i++) {
			const col = cols[i];
			const r = col.getBoundingClientRect();
			if (clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom) {
				const y = clientY - r.top;
				const start = DAY_START + y / PX_PER_HOUR;
				return { day: col.getAttribute("data-day-col"), start };
			}
		}
		return null;
	}, []);

	const onPointerDownMove = useCallback(
		(e, id) => {
			e.preventDefault();
			const ev = events.find((x) => x.id === id);
			if (!ev) return;
			const hit = hitTest(e.clientX, e.clientY);
			const offsetHours = hit ? hit.start - ev.start : 0;

			dragRef.current = {
				mode: "move",
				id,
				offsetHours,
				pointerId: e.pointerId,
			};
			setActiveId(id);
			e.currentTarget.setPointerCapture?.(e.pointerId);
		},
		[events, hitTest]
	);

	const onPointerDownResize = useCallback((e, id) => {
		e.preventDefault();
		const ev = events.find((x) => x.id === id);
		if (!ev) return;
		dragRef.current = {
			mode: "resize",
			id,
			startY: e.clientY,
			origDuration: ev.duration,
			origStart: ev.start,
			pointerId: e.pointerId,
		};
		setActiveId(id);
		e.currentTarget.setPointerCapture?.(e.pointerId);
	}, [events]);

	useEffect(() => {
		const onMove = (e) => {
			const drag = dragRef.current;
			if (!drag) return;

			if (drag.mode === "move") {
				const hit = hitTest(e.clientX, e.clientY);
				if (!hit) return;
				setEvents((prev) =>
					prev.map((ev) => {
						if (ev.id !== drag.id) return ev;
						const nextStart = clampStart(hit.start - drag.offsetHours, ev.duration);
						return { ...ev, day: hit.day, start: nextStart };
					})
				);
			} else if (drag.mode === "resize") {
				const deltaHrs = (e.clientY - drag.startY) / PX_PER_HOUR;
				setEvents((prev) =>
					prev.map((ev) => {
						if (ev.id !== drag.id) return ev;
						return {
							...ev,
							duration: clampDuration(drag.origStart, drag.origDuration + deltaHrs),
						};
					})
				);
			}
		};

		const onUp = () => {
			if (!dragRef.current) return;
			dragRef.current = null;
			setActiveId(null);
		};

		window.addEventListener("pointermove", onMove);
		window.addEventListener("pointerup", onUp);
		window.addEventListener("pointercancel", onUp);
		return () => {
			window.removeEventListener("pointermove", onMove);
			window.removeEventListener("pointerup", onUp);
			window.removeEventListener("pointercancel", onUp);
		};
	}, [hitTest]);

	const byDay = useMemo(() => {
		const map = Object.fromEntries(DAYS.map((d) => [d.id, []]));
		events.forEach((e) => {
			if (map[e.day]) map[e.day].push(e);
		});
		return map;
	}, [events]);

	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2 overflow-hidden",
				className
			)}
			aria-label="Calendar Tetris"
		>
			<div
				className="flex min-h-[min(90vh,720px)] items-center justify-center px-3 py-12 sm:px-6"
				style={{
					background:
						"radial-gradient(ellipse at 50% 20%, #ffffff 0%, #f4f4f5 60%, #e4e4e7 100%)",
				}}
			>
				<div className="w-full max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_28px_70px_-36px_rgba(24,24,27,0.45)]">
					{/* Header */}
					<div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
						<h2 className="text-lg font-bold tracking-tight text-zinc-900 sm:text-xl">
							Calendar Tetris
						</h2>
						<span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-800">
							{hoursScheduled.toFixed(hoursScheduled % 1 ? 1 : 0)}h scheduled
						</span>
					</div>

					{/* Grid */}
					<div className="overflow-x-auto px-3 pb-2 sm:px-5">
						<div className="min-w-[640px]">
							{/* Day headers */}
							<div className="mb-2 grid grid-cols-[48px_repeat(5,1fr)] gap-1">
								<div />
								{DAYS.map((d) => (
									<div
										key={d.id}
										className="flex items-center justify-center gap-1.5 py-1 text-xs font-semibold text-zinc-600"
									>
										<span
											className="h-1.5 w-1.5 rounded-full"
											style={{ backgroundColor: d.dot }}
										/>
										{d.label}
									</div>
								))}
							</div>

							<div
								ref={gridRef}
								key={playKey}
								className="relative grid grid-cols-[48px_repeat(5,1fr)] gap-1"
							>
								{/* Time labels */}
								<div className="relative" style={{ height: GRID_H }}>
									{HOURS.slice(0, -1).map((h) => (
										<div
											key={h}
											className="absolute right-2 -translate-y-1/2 font-mono text-[10px] text-zinc-400"
											style={{ top: (h - DAY_START) * PX_PER_HOUR }}
										>
											{formatHour(h)}
										</div>
									))}
								</div>

								{/* Day columns */}
								{DAYS.map((d) => (
									<div
										key={d.id}
										data-day-col={d.id}
										className="relative rounded-lg bg-zinc-50/80"
										style={{ height: GRID_H }}
									>
										{/* Hour lines */}
										{HOURS.slice(0, -1).map((h) => (
											<div
												key={h}
												className="pointer-events-none absolute inset-x-0 border-t border-zinc-200/90"
												style={{ top: (h - DAY_START) * PX_PER_HOUR }}
											/>
										))}
										<div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-zinc-200/90" />

										<AnimatePresence>
											{byDay[d.id].map((ev, i) => (
												<SlotCard
													key={`${playKey}-${ev.id}`}
													event={ev}
													index={i + DAYS.findIndex((x) => x.id === d.id) * 2}
													animateIn={animateIn}
													active={activeId === ev.id}
													onPointerDownMove={onPointerDownMove}
													onPointerDownResize={onPointerDownResize}
												/>
											))}
										</AnimatePresence>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
						<p className="text-xs text-zinc-400">
							Week packed · drag cards · resize from the grip
						</p>
						<button
							type="button"
							onClick={replay}
							className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800"
						>
							<RotateCcw className="h-3.5 w-3.5" strokeWidth={2.25} />
							Replay
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
