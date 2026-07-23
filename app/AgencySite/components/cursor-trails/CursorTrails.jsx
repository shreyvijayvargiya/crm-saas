import React, { useCallback, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	BarChart3,
	Briefcase,
	CalendarClock,
	Contact,
	FileText,
	LayoutDashboard,
	Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCursorTrail } from "./useCursorTrail";

function TrailShell({
	containerRef,
	onMouseMove,
	className,
	children,
	trail,
	renderItem,
}) {
	return (
		<div
			ref={containerRef}
			className={cn("relative", className)}
			onMouseMove={(event) => onMouseMove(event.clientX, event.clientY)}
		>
			<div
				className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
				aria-hidden
			>
				<AnimatePresence>
					{trail.map((item, index) => (
						<div
							key={item.id}
							className="absolute"
							style={{
								left: `${item.x}%`,
								top: `${item.y}%`,
								transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
								zIndex: index + 1,
							}}
						>
							<motion.div
								initial={{ opacity: 0, y: -8, scale: 0.92 }}
								animate={
									item.phase === "dropping"
										? { opacity: 0, y: 10, scale: 0.96 }
										: { opacity: 0.92, y: 0, scale: 1 }
								}
								exit={{ opacity: 0, y: 10 }}
								transition={{
									duration: item.phase === "dropping" ? 0.55 : 0.25,
									delay: item.phase === "dropping" ? index * 0.02 : 0,
									ease: [0.22, 1, 0.36, 1],
								}}
							>
								{renderItem(item, index)}
							</motion.div>
						</div>
					))}
				</AnimatePresence>
			</div>
			<div className="relative z-10">{children}</div>
		</div>
	);
}

/** CursorImageTrail — CRM screenshot cards follow the cursor, then drop and fade. */
export function CursorImageTrail({
	images = [],
	isLight,
	className,
	children,
}) {
	const pool = useMemo(() => {
		if (!Array.isArray(images) || !images.length) return [];
		const next = [];
		while (next.length < 10) next.push(...images);
		return next.slice(0, 10);
	}, [images]);

	const buildItem = useCallback(
		(image) => ({
			src: image.src,
			alt: image.alt || image.label || "",
		}),
		[]
	);

	const { containerRef, trail, onMouseMove } = useCursorTrail({
		items: pool,
		limit: 10,
		buildItem,
	});

	return (
		<TrailShell
			containerRef={containerRef}
			onMouseMove={onMouseMove}
			className={className}
			trail={trail}
			renderItem={(item) => (
				<div
					className={cn(
						"w-[9.5rem] overflow-hidden rounded-xl border shadow-xl sm:w-[11rem]",
						isLight
							? "border-white/80 bg-white shadow-zinc-400/40"
							: "border-zinc-700/80 bg-zinc-900 shadow-black/50"
					)}
				>
					<img
						src={item.src}
						alt=""
						className="aspect-[16/10] h-auto w-full object-cover object-top"
						draggable={false}
					/>
				</div>
			)}
		>
			{children}
		</TrailShell>
	);
}

export const DEFAULT_CURSOR_TEXTS = [
	"Leads",
	"Analytics",
	"Sales",
	"CRM",
	"CMS",
	"boring tasks",
	"Admin",
];

const TEXT_STYLES = [
	{
		fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
		className: "italic tracking-tight",
		size: "text-3xl sm:text-4xl",
	},
	{
		fontFamily: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
		className: "uppercase tracking-[0.18em]",
		size: "text-2xl sm:text-3xl",
	},
	{
		fontFamily:
			"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
		className: "tracking-normal",
		size: "text-2xl sm:text-3xl",
	},
	{
		fontFamily: '"Archivo Black", Impact, Haettenschweiler, sans-serif',
		className: "uppercase tracking-wide",
		size: "text-3xl sm:text-5xl",
	},
	{
		fontFamily: '"Fraunces", "Palatino Linotype", Palatino, serif',
		className: "tracking-tight",
		size: "text-3xl sm:text-4xl",
	},
	{
		fontFamily: '"Caveat", "Segoe Print", "Comic Sans MS", cursive',
		className: "tracking-normal",
		size: "text-4xl sm:text-5xl",
	},
	{
		fontFamily: '"IBM Plex Sans", "Trebuchet MS", sans-serif',
		className: "uppercase tracking-[0.08em]",
		size: "text-2xl sm:text-3xl",
	},
];

/** CursorTextTrail — bold words with distinct fonts follow the cursor. Max 7. */
export function CursorTextTrail({
	texts = DEFAULT_CURSOR_TEXTS,
	isLight,
	className,
	children,
}) {
	const pool = useMemo(() => {
		const source =
			Array.isArray(texts) && texts.length ? texts : DEFAULT_CURSOR_TEXTS;
		return source
			.map((text) => String(text ?? "").trim())
			.filter(Boolean)
			.slice(0, 7);
	}, [texts]);

	useEffect(() => {
		if (typeof document === "undefined") return;
		const id = "cursor-text-trail-fonts";
		if (document.getElementById(id)) return;
		const link = document.createElement("link");
		link.id = id;
		link.rel = "stylesheet";
		link.href =
			"https://fonts.googleapis.com/css2?family=Archivo+Black&family=Caveat:wght@700&family=Fraunces:opsz,wght@9..144,700&family=IBM+Plex+Sans:wght@700&family=Playfair+Display:ital,wght@1,700&family=Space+Grotesk:wght@700&display=swap";
		document.head.appendChild(link);
	}, []);

	const buildItem = useCallback(
		(text, index) => ({
			text,
			style: TEXT_STYLES[index % TEXT_STYLES.length],
		}),
		[]
	);

	const { containerRef, trail, onMouseMove } = useCursorTrail({
		items: pool,
		limit: 7,
		buildItem,
	});

	return (
		<TrailShell
			containerRef={containerRef}
			onMouseMove={onMouseMove}
			className={className}
			trail={trail}
			renderItem={(item) => (
				<span
					className={cn(
						"inline-block select-none font-bold leading-none",
						item.style.size,
						item.style.className,
						isLight ? "text-zinc-800/80" : "text-white/85"
					)}
					style={{ fontFamily: item.style.fontFamily }}
				>
					{item.text}
				</span>
			)}
		>
			{children}
		</TrailShell>
	);
}

export const DEFAULT_CURSOR_EMOJIS = [
	"📊",
	"💼",
	"🚀",
	"📈",
	"🗂️",
	"⚡",
	"✅",
];

/** CursorEmojiTrail — emoji trail behind the cursor. Max 7. */
export function CursorEmojiTrail({
	emojis = DEFAULT_CURSOR_EMOJIS,
	className,
	children,
}) {
	const pool = useMemo(() => {
		const source =
			Array.isArray(emojis) && emojis.length ? emojis : DEFAULT_CURSOR_EMOJIS;
		return source
			.map((emoji) => String(emoji ?? "").trim())
			.filter(Boolean)
			.slice(0, 7);
	}, [emojis]);

	const buildItem = useCallback((emoji) => ({ emoji }), []);

	const { containerRef, trail, onMouseMove } = useCursorTrail({
		items: pool,
		limit: 7,
		buildItem,
	});

	return (
		<TrailShell
			containerRef={containerRef}
			onMouseMove={onMouseMove}
			className={className}
			trail={trail}
			renderItem={(item) => (
				<span className="select-none text-4xl leading-none sm:text-5xl">
					{item.emoji}
				</span>
			)}
		>
			{children}
		</TrailShell>
	);
}

export const DEFAULT_CURSOR_ICONS = [
	LayoutDashboard,
	BarChart3,
	Briefcase,
	Users,
	Contact,
	FileText,
	CalendarClock,
];

/** CursorIconTrail — Lucide icons follow the cursor. Max 7. */
export function CursorIconTrail({
	icons = DEFAULT_CURSOR_ICONS,
	isLight,
	className,
	children,
}) {
	const pool = useMemo(() => {
		const source =
			Array.isArray(icons) && icons.length ? icons : DEFAULT_CURSOR_ICONS;
		return source.filter(Boolean).slice(0, 7);
	}, [icons]);

	const buildItem = useCallback((Icon) => ({ Icon }), []);

	const { containerRef, trail, onMouseMove } = useCursorTrail({
		items: pool,
		limit: 7,
		buildItem,
	});

	return (
		<TrailShell
			containerRef={containerRef}
			onMouseMove={onMouseMove}
			className={className}
			trail={trail}
			renderItem={(item) => {
				const Icon = item.Icon;
				return (
					<span
						className={cn(
							"flex h-12 w-12 items-center justify-center rounded-xl border shadow-lg sm:h-14 sm:w-14",
							isLight
								? "border-zinc-200 bg-white text-zinc-800"
								: "border-zinc-700 bg-zinc-900 text-zinc-100"
						)}
					>
						{Icon ? (
							<Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
						) : null}
					</span>
				);
			}}
		>
			{children}
		</TrailShell>
	);
}
