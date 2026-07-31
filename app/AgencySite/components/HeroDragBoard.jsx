import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const DEFAULT_LAYOUT = [
	{ x: 4, y: 8, w: 26, rotate: -6 },
	{ x: 62, y: 5, w: 24, rotate: 5 },
	{ x: 70, y: 40, w: 22, rotate: -3 },
	{ x: 48, y: 56, w: 22, rotate: 7 },
	{ x: 6, y: 46, w: 24, rotate: -4 },
	{ x: 34, y: 16, w: 20, rotate: 3 },
	{ x: 36, y: 58, w: 22, rotate: -5 },
];

const DRAG_THRESHOLD = 6;

function BoardCard({ item, isLight, zIndex, onPointerDown }) {
	return (
		<button
			type="button"
			data-board-card
			onPointerDown={onPointerDown}
			className={cn(
				"absolute cursor-grab touch-none active:cursor-grabbing",
				"flex flex-col items-stretch gap-1.5"
			)}
			style={{
				left: `${item.x}%`,
				top: `${item.y}%`,
				width: `${item.w}%`,
				zIndex,
				transform: `rotate(${item.rotate}deg)`,
			}}
			aria-label={`Open ${item.label}`}
		>
			<span
				className={cn(
					"overflow-hidden rounded-2xl border shadow-lg transition-shadow duration-200 hover:shadow-xl",
					isLight
						? "border-zinc-200/90 bg-white shadow-zinc-300/50"
						: "border-zinc-700/80 bg-zinc-900 shadow-black/50"
				)}
			>
				<img
					src={item.src}
					alt={item.alt || item.label}
					className="pointer-events-none aspect-[4/3] h-auto w-full object-cover object-top"
					draggable={false}
				/>
			</span>
			<span
				className={cn(
					"truncate px-0.5 text-left text-[10px] font-medium tracking-wide",
					isLight ? "text-zinc-600" : "text-zinc-400"
				)}
			>
				{item.label}
			</span>
		</button>
	);
}

/**
 * HeroDragBoard — interactive CRM screenshot kitchen board.
 * Drag cards around the dotted canvas, click to expand in the center.
 */
export default function HeroDragBoard({
	screenshots = [],
	isLight,
	title = "Explore the CRM board",
	description = "Grab any screen, drag it around, and click to preview UI layouts from the Componentry kit.",
	ctaLabel = "Browse components",
	ctaHref = "/#catalog",
}) {
	const boardRef = useRef(null);
	const dragRef = useRef(null);
	const itemsRef = useRef([]);
	const [, setZCounter] = useState(20);
	const [expandedId, setExpandedId] = useState(null);

	const initialItems = useMemo(
		() =>
			screenshots.slice(0, 7).map((shot, index) => {
				const layout = DEFAULT_LAYOUT[index % DEFAULT_LAYOUT.length];
				return {
					id: shot.src || `crm-card-${index}`,
					src: shot.src,
					alt: shot.alt,
					label: shot.label,
					href: shot.href,
					description: shot.description,
					x: layout.x,
					y: layout.y,
					w: layout.w,
					rotate: layout.rotate,
					z: 10 + index,
				};
			}),
		[screenshots]
	);

	const [items, setItems] = useState(initialItems);
	itemsRef.current = items;

	useEffect(() => {
		setItems(initialItems);
	}, [initialItems]);

	useEffect(() => {
		if (!expandedId) return undefined;
		const onKeyDown = (event) => {
			if (event.key === "Escape") setExpandedId(null);
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [expandedId]);

	const expanded = items.find((item) => item.id === expandedId);

	const bringToFront = (id) => {
		setZCounter((current) => {
			const next = current + 1;
			setItems((cards) =>
				cards.map((card) => (card.id === id ? { ...card, z: next } : card))
			);
			return next;
		});
	};

	const onPointerDown = (event, id) => {
		if (event.button !== 0) return;
		const board = boardRef.current;
		if (!board) return;
		const card = itemsRef.current.find((item) => item.id === id);
		if (!card) return;

		event.preventDefault();
		bringToFront(id);

		dragRef.current = {
			id,
			startClientX: event.clientX,
			startClientY: event.clientY,
			originX: card.x,
			originY: card.y,
			moved: false,
		};

		const onPointerMove = (moveEvent) => {
			const drag = dragRef.current;
			if (!drag || !boardRef.current) return;

			const rect = boardRef.current.getBoundingClientRect();
			const dxPx = moveEvent.clientX - drag.startClientX;
			const dyPx = moveEvent.clientY - drag.startClientY;
			if (Math.hypot(dxPx, dyPx) > DRAG_THRESHOLD) drag.moved = true;

			const dxPct = (dxPx / rect.width) * 100;
			const dyPct = (dyPx / rect.height) * 100;
			const nextX = Math.min(78, Math.max(0, drag.originX + dxPct));
			const nextY = Math.min(72, Math.max(0, drag.originY + dyPct));

			setItems((cards) =>
				cards.map((entry) =>
					entry.id === drag.id ? { ...entry, x: nextX, y: nextY } : entry
				)
			);
		};

		const onPointerUp = () => {
			const drag = dragRef.current;
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);
			if (drag && !drag.moved) setExpandedId(drag.id);
			dragRef.current = null;
		};

		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
		window.addEventListener("pointercancel", onPointerUp);
	};

	return (
		<section className="relative left-1/2 w-[95vw] max-w-[95%] -translate-x-1/2">
			<div
				ref={boardRef}
				className={cn(
					"relative mx-auto h-[min(72vh,36rem)] w-full overflow-hidden rounded-[1.75rem] border select-none",
					isLight
						? "border-zinc-200/80 bg-white"
						: "border-zinc-800 bg-[#111111]"
				)}
				style={{
					backgroundImage: isLight
						? `radial-gradient(circle at 50% 100%, rgba(251,146,60,0.1), transparent 45%),
               radial-gradient(rgba(24,24,27,0.1) 1px, transparent 1px)`
						: `radial-gradient(circle at 50% 100%, rgba(251,146,60,0.18), transparent 40%),
               radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)`,
					backgroundSize: "auto, 18px 18px",
					backgroundColor: isLight ? "#ffffff" : "#111111",
				}}
			>
				{items.map((item) => (
					<BoardCard
						key={item.id}
						item={item}
						isLight={isLight}
						zIndex={item.z}
						onPointerDown={(event) => onPointerDown(event, item.id)}
					/>
				))}

				<p
					className={cn(
						"pointer-events-none absolute bottom-4 left-1/2 z-[5] w-[min(90%,28rem)] -translate-x-1/2 text-center text-[11px] sm:text-xs",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					Tip: grab any CRM screen and drag it around the board · click to
					preview
				</p>
			</div>

			<div className="mx-auto mt-6 max-w-xl text-center">
				<Card
					className={cn(
						"p-5 sm:p-6",
						isLight
							? "border-zinc-200 bg-white shadow-sm"
							: "border-zinc-800 bg-zinc-900/60"
					)}
				>
					<h3
						className={cn(
							"text-lg font-bold tracking-tight sm:text-xl",
							isLight ? "text-zinc-950" : "text-white"
						)}
					>
						{title}
					</h3>
					<p
						className={cn(
							"mx-auto mt-2 max-w-md text-sm leading-relaxed",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						{description}
					</p>
					<div className="mt-5 flex justify-center">
						<Button
							asChild
							className={cn(
								"rounded-full px-5",
								isLight
									? "bg-zinc-900 text-white hover:bg-zinc-800"
									: "bg-zinc-100 text-zinc-900 hover:bg-white"
							)}
						>
							<Link href={ctaHref} passHref>
								<a className="inline-flex items-center gap-2">
									{ctaLabel}
									<ArrowRight className="h-4 w-4" />
								</a>
							</Link>
						</Button>
					</div>
				</Card>
			</div>

			<AnimatePresence>
				{expanded ? (
					<motion.div
						className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<button
							type="button"
							aria-label="Close preview"
							className={cn(
								"absolute inset-0",
								isLight ? "bg-zinc-900/35" : "bg-black/70"
							)}
							onClick={() => setExpandedId(null)}
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.92, y: 16 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.94, y: 10 }}
							transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
							className={cn(
								"relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center overflow-hidden rounded-2xl border shadow-2xl",
								isLight
									? "border-zinc-200 bg-white"
									: "border-zinc-700 bg-zinc-950"
							)}
						>
							<button
								type="button"
								onClick={() => setExpandedId(null)}
								className={cn(
									"absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur",
									isLight
										? "border-zinc-200 bg-white/90 text-zinc-800"
										: "border-zinc-700 bg-zinc-900/90 text-zinc-100"
								)}
								aria-label="Close"
							>
								<X className="h-4 w-4" />
							</button>
							<img
								src={expanded.src}
								alt={expanded.alt || expanded.label}
								className="max-h-[62vh] w-full object-cover object-top"
							/>
							<div className="flex w-full flex-col items-center gap-3 px-5 py-4 text-center">
								<p
									className={cn(
										"text-xs font-medium tracking-wide",
										isLight ? "text-zinc-500" : "text-zinc-400"
									)}
								>
									{expanded.label}
								</p>
								<Button
									asChild
									className={cn(
										"rounded-full px-5",
										isLight
											? "bg-zinc-900 text-white hover:bg-zinc-800"
											: "bg-zinc-100 text-zinc-900 hover:bg-white"
									)}
								>
									<Link href={expanded.href || ctaHref} passHref>
										<a className="inline-flex items-center gap-2">
											{expanded.href ? `Open ${expanded.label}` : ctaLabel}
											<ArrowRight className="h-4 w-4" />
										</a>
									</Link>
								</Button>
							</div>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</section>
	);
}
