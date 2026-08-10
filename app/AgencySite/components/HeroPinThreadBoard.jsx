import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CARD_W = 228;
const DRAG_THRESHOLD = 4;

const SEED_CARDS = [
	{
		id: "inkgest",
		title: "INKGEST",
		tag: "Studio",
		ago: "2h ago",
		footer: "RAMP • TRACKED",
		pin: "silver",
		rotate: -5,
		x: 6,
		y: 10,
		z: 12,
		lines: [
			["Brand system sprint", "1", "1,800.00"],
			["Motion kit · 12 loops", "1", "960.00"],
			["Type pairing notes", "1", "120.00"],
		],
		total: "2,880.00",
	},
	{
		id: "northwind",
		title: "NORTHWIND CRM",
		tag: "Seats",
		ago: "5h ago",
		footer: "STRIPE • RECURRING",
		pin: "gold",
		rotate: 4,
		x: 38,
		y: 6,
		z: 13,
		lines: [
			["Pro seats × 14", "14", "1,260.00"],
			["AI assistant add-on", "1", "240.00"],
			["Usage overage", "1", "86.40"],
		],
		total: "1,586.40",
	},
	{
		id: "orbit",
		title: "ORBIT LABS",
		tag: "Vendor",
		ago: "1d ago",
		footer: "ACH • PAID",
		pin: "silver",
		rotate: -3,
		x: 68,
		y: 14,
		z: 11,
		lines: [
			["Edge hosting · Aug", "1", "410.00"],
			["CDN egress 82GB", "1", "64.80"],
			["Preview deploys", "18", "54.00"],
		],
		total: "528.80",
	},
	{
		id: "paperplane",
		title: "PAPERPLANE",
		tag: "Print",
		ago: "3h ago",
		footer: "WISE • TRACKED",
		pin: "silver",
		rotate: 6,
		x: 18,
		y: 48,
		z: 14,
		lines: [
			["Specimen posters A2", "40", "320.00"],
			["Uncoated stock upcharge", "1", "48.00"],
			["Overnight proof", "1", "35.00"],
		],
		total: "403.00",
	},
	{
		id: "dockyard",
		title: "DOCKYARD",
		tag: "Space",
		ago: "8h ago",
		footer: "CARD • OPEN",
		pin: "silver",
		rotate: -7,
		x: 58,
		y: 52,
		z: 15,
		lines: [
			["Hot desk · week 31", "5", "275.00"],
			["Meeting room 2h", "1", "90.00"],
			["Espresso tab", "1", "18.50"],
		],
		total: "383.50",
	},
];

const LINKS = [
	["inkgest", "northwind"],
	["inkgest", "paperplane"],
	["northwind", "orbit"],
	["northwind", "dockyard"],
	["orbit", "dockyard"],
	["paperplane", "dockyard"],
];

function threadPath(x1, y1, x2, y2) {
	const mx = (x1 + x2) / 2;
	const my = (y1 + y2) / 2;
	const dist = Math.hypot(x2 - x1, y2 - y1);
	const sag = Math.min(56, Math.max(18, dist * 0.16));
	return `M ${x1} ${y1} Q ${mx} ${my + sag} ${x2} ${y2}`;
}

function PinHead({ gold }) {
	return (
		<span className="pointer-events-none absolute left-1/2 top-[-10px] z-20 -translate-x-1/2">
			<span
				className={cn(
					"block h-4 w-4 rounded-full border shadow-md",
					gold
						? "border-amber-200 bg-gradient-to-br from-yellow-200 via-amber-400 to-amber-700"
						: "border-zinc-200 bg-gradient-to-br from-zinc-100 via-zinc-300 to-zinc-500"
				)}
				style={{
					boxShadow: gold
						? "0 2px 4px rgba(180,83,9,0.45), inset 0 1px 0 rgba(255,255,255,0.7)"
						: "0 2px 4px rgba(24,24,27,0.35), inset 0 1px 0 rgba(255,255,255,0.8)",
				}}
			/>
			<span className="mx-auto mt-[-2px] block h-2 w-[2px] rounded-full bg-zinc-400/80" />
		</span>
	);
}

function ReceiptCard({ card }) {
	return (
		<div className="relative w-[228px] select-none rounded-sm bg-[#fafafa] px-4 pb-3 pt-5 font-mono text-zinc-900 shadow-[0_10px_28px_-12px_rgba(24,24,27,0.35)] ring-1 ring-zinc-200/80">
			<PinHead gold={card.pin === "gold"} />
			<div className="flex items-start justify-between gap-2">
				<p className="text-[13px] font-bold tracking-wide">{card.title}</p>
				<span className="shrink-0 text-[10px] uppercase text-zinc-500">{card.tag}</span>
			</div>
			<p className="mt-1 text-[10px] text-zinc-500">{card.ago}</p>
			<div className="mt-3 space-y-1.5 text-[10px] leading-snug text-zinc-700">
				{card.lines.map(([label, qty, price]) => (
					<div key={label} className="flex items-start justify-between gap-3">
						<span className="min-w-0">
							{label}
							{qty !== "1" ? (
								<span className="text-zinc-400"> ×{qty}</span>
							) : null}
						</span>
						<span className="shrink-0 tabular-nums">${price}</span>
					</div>
				))}
			</div>
			<div className="my-2 border-t border-dashed border-zinc-300" />
			<div className="flex items-center justify-between text-[11px] font-bold">
				<span>TOTAL</span>
				<span className="tabular-nums">${card.total}</span>
			</div>
			<p className="mt-2 text-[9px] tracking-wide text-zinc-400">{card.footer}</p>
		</div>
	);
}

/**
 * HeroPinThreadBoard — investigation-board receipts with pins + hanging threads.
 * Pointer drag (not FM drag) so left/top + strings stay in sync.
 */
export default function HeroPinThreadBoard({ isLight = true, className }) {
	const boardRef = useRef(null);
	const cardsRef = useRef(SEED_CARDS);
	const dragRef = useRef(null);
	const [cards, setCards] = useState(SEED_CARDS);
	const [size, setSize] = useState({ w: 900, h: 640 });
	const [zTick, setZTick] = useState(20);
	const [draggingId, setDraggingId] = useState(null);

	cardsRef.current = cards;

	const measure = () => {
		const el = boardRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		setSize({ w: r.width, h: r.height });
	};

	useEffect(() => {
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, []);

	const pins = useMemo(() => {
		const map = {};
		cards.forEach((c) => {
			map[c.id] = {
				x: (c.x / 100) * size.w + CARD_W / 2,
				y: (c.y / 100) * size.h + 6,
			};
		});
		return map;
	}, [cards, size]);

	const onPointerDown = (event, id) => {
		if (event.button !== 0) return;
		const board = boardRef.current;
		const card = cardsRef.current.find((item) => item.id === id);
		if (!board || !card) return;

		event.preventDefault();
		event.stopPropagation();
		measure();

		const nextZ = zTick + 1;
		setZTick(nextZ);
		setCards((prev) =>
			prev.map((item) => (item.id === id ? { ...item, z: nextZ } : item))
		);
		setDraggingId(id);

		dragRef.current = {
			id,
			startX: event.clientX,
			startY: event.clientY,
			originX: card.x,
			originY: card.y,
			moved: false,
		};

		const onPointerMove = (moveEvent) => {
			const drag = dragRef.current;
			if (!drag || !boardRef.current) return;
			const rect = boardRef.current.getBoundingClientRect();
			const dxPx = moveEvent.clientX - drag.startX;
			const dyPx = moveEvent.clientY - drag.startY;
			if (Math.hypot(dxPx, dyPx) > DRAG_THRESHOLD) drag.moved = true;

			const nextX = Math.min(78, Math.max(0, drag.originX + (dxPx / rect.width) * 100));
			const nextY = Math.min(70, Math.max(0, drag.originY + (dyPx / rect.height) * 100));

			setCards((prev) =>
				prev.map((item) =>
					item.id === drag.id ? { ...item, x: nextX, y: nextY } : item
				)
			);
		};

		const onPointerUp = () => {
			window.removeEventListener("pointermove", onPointerMove);
			window.removeEventListener("pointerup", onPointerUp);
			window.removeEventListener("pointercancel", onPointerUp);
			dragRef.current = null;
			setDraggingId(null);
		};

		window.addEventListener("pointermove", onPointerMove);
		window.addEventListener("pointerup", onPointerUp);
		window.addEventListener("pointercancel", onPointerUp);
	};

	return (
		<section
			className={cn("relative w-full py-4", className)}
			aria-label="Pin and thread receipt board"
		>
			<div
				ref={boardRef}
				className={cn(
					"relative mx-auto h-[min(78vh,40rem)] w-full max-w-5xl overflow-hidden rounded-3xl border select-none",
					isLight ? "border-zinc-200 bg-[#f3f1ec]" : "border-zinc-800 bg-[#eceae4]"
				)}
				style={{
					backgroundImage:
						"radial-gradient(rgba(24,24,27,0.06) 1px, transparent 1px)",
					backgroundSize: "18px 18px",
				}}
			>
				<svg
					className="pointer-events-none absolute inset-0 z-0 h-full w-full"
					aria-hidden
				>
					{LINKS.map(([a, b]) => {
						const p1 = pins[a];
						const p2 = pins[b];
						if (!p1 || !p2) return null;
						return (
							<path
								key={`${a}-${b}`}
								d={threadPath(p1.x, p1.y, p2.x, p2.y)}
								fill="none"
								stroke="#52525b"
								strokeWidth="1.25"
								strokeLinecap="round"
								opacity="0.72"
							/>
						);
					})}
				</svg>

				{cards.map((card) => (
					<div
						key={card.id}
						role="button"
						tabIndex={0}
						onPointerDown={(event) => onPointerDown(event, card.id)}
						className={cn(
							"absolute touch-none",
							draggingId === card.id ? "cursor-grabbing" : "cursor-grab"
						)}
						style={{
							left: `${card.x}%`,
							top: `${card.y}%`,
							zIndex: card.z,
							transform: `rotate(${card.rotate}deg)`,
						}}
						aria-label={`Drag ${card.title}`}
					>
						<ReceiptCard card={card} />
					</div>
				))}

				<p className="pointer-events-none absolute bottom-4 left-1/2 z-[60] -translate-x-1/2 text-[11px] font-medium tracking-wide text-zinc-500">
					Drag a slip · threads stay pinned
				</p>
			</div>
		</section>
	);
}
