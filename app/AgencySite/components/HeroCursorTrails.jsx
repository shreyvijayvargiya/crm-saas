import React from "react";
import { cn } from "@/lib/utils";
import {
	CursorEmojiTrail,
	CursorIconTrail,
	CursorImageTrail,
	CursorTextTrail,
	DEFAULT_CURSOR_EMOJIS,
	DEFAULT_CURSOR_TEXTS,
} from "./cursor-trails";

/**
 * HeroCursorTrails — showcase panels for emoji / text / icon / image
 * cursor trails (move the mouse inside each panel).
 */
export default function HeroCursorTrails({
	screenshots = [],
	isLight = false,
	className,
}) {
	const panelClass = cn(
		"relative flex min-h-[70vh] w-full flex-col items-center justify-center overflow-hidden px-6 py-16 text-center sm:min-h-[80vh]",
		isLight ? "bg-zinc-100" : "bg-zinc-950"
	);

	const eyebrow = (label) => (
		<p
			className={cn(
				"mb-3 text-[11px] font-semibold uppercase tracking-[0.22em]",
				isLight ? "text-zinc-500" : "text-zinc-500"
			)}
		>
			{label}
		</p>
	);

	const title = (text) => (
		<h2
			className={cn(
				"max-w-xl text-3xl font-bold tracking-tight sm:text-5xl",
				isLight ? "text-zinc-950" : "text-white"
			)}
		>
			{text}
		</h2>
	);

	const hint = (text) => (
		<p
			className={cn(
				"mt-4 max-w-sm text-sm",
				isLight ? "text-zinc-500" : "text-zinc-400"
			)}
		>
			{text}
		</p>
	);

	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2",
				className
			)}
			aria-label="Cursor trail demos"
		>
			{/* Emoji trail */}
			<CursorEmojiTrail
				emojis={DEFAULT_CURSOR_EMOJIS}
				className={panelClass}
			>
				{eyebrow("Cursor · Emoji trail")}
				{title("Move to leave a trail of CRM energy")}
				{hint("Emojis follow your cursor, then drop and fade.")}
			</CursorEmojiTrail>

			{/* Text trail */}
			<CursorTextTrail
				texts={DEFAULT_CURSOR_TEXTS}
				isLight={isLight}
				className={cn(
					panelClass,
					isLight ? "bg-white" : "bg-black"
				)}
			>
				{eyebrow("Cursor · Text trail")}
				{title("Words with distinct fonts chase the pointer")}
				{hint("Leads, Analytics, Sales, CRM — styled type in your wake.")}
			</CursorTextTrail>

			{/* Icon trail */}
			<CursorIconTrail
				isLight={isLight}
				className={cn(
					panelClass,
					isLight ? "bg-zinc-50" : "bg-zinc-900"
				)}
			>
				{eyebrow("Cursor · Icon trail")}
				{title("Lucide icons orbit your mouse")}
				{hint("Dashboard, charts, contacts — UI glyphs that follow you.")}
			</CursorIconTrail>

			{/* Image trail (standalone; also used inside HeroScrollReveal) */}
			{screenshots.length > 0 && (
				<CursorImageTrail
					images={screenshots}
					isLight={isLight}
					className={cn(
						panelClass,
						isLight ? "bg-zinc-200/70" : "bg-zinc-950"
					)}
				>
					{eyebrow("Cursor · Image trail")}
					{title("Screenshots trail behind the cursor")}
					{hint("CRM product shots stack, then fall away as you move.")}
				</CursorImageTrail>
			)}
		</section>
	);
}
