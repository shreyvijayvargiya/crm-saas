import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Globe, Mic, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const SEED_NOTES = [
	{ id: "1", when: "today", text: "walk the dog", style: "strike" },
	{ id: "2", when: "26/07", text: "Watch Future of AI", style: "muted" },
	{ id: "3", when: "tmrw 16:00", text: "Dreams of Stability", style: "underline" },
	{ id: "4", when: "thu", text: "Buy magnesium", style: "highlight" },
	{ id: "5", when: "12/08", text: "Rooftop", style: "plain" },
	{ id: "6", when: "", text: "Call Maxime", style: "plain" },
];

const PAPERS = [
	{ id: "white", bg: "#fffdf8", swatch: "#ffffff", fold: false },
	{ id: "fold", bg: "#fffdf8", swatch: "#f4f1ea", fold: true },
	{ id: "pink", bg: "#fde8ef", swatch: "#f9c5d5" },
	{ id: "green", bg: "#eaf6ea", swatch: "#c8e6c9" },
	{ id: "blue", bg: "#e7f1f8", swatch: "#bbdefb" },
	{ id: "grey", bg: "#ececec", swatch: "#d4d4d4" },
];

const FONTS = [
	{ id: "mono", label: "Mono", className: "font-mono" },
	{ id: "serif", label: "Serif", className: "font-serif" },
	{ id: "sans", label: "Sans", className: "font-sans" },
	{ id: "system", label: "System", className: "font-sans" },
];

const PENS = ["#111111", "#2563eb", "#ec4899", "#16a34a", "#ef4444", "#dc2626", "#f97316"];
const SIZES = [12, 14, 16, 18, 22];
const MARKERS = ["#facc15", "#38bdf8", "#f9a8d4", "#86efac", "#c4b5fd", "#fdba74"];

const LETTER_ROWS = [
	["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
	["a", "s", "d", "f", "g", "h", "j", "k", "l"],
	["shift", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

const SYMBOL_ROWS = [
	["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
	["-", "/", ":", ";", "(", ")", "€", "&", "@", '"'],
	["#+=", ".", ",", "?", "!", "'", "backspace"],
];

function styleNote(note, highlight) {
	if (note.style === "strike") return "text-zinc-800 line-through decoration-red-500 decoration-2";
	if (note.style === "muted") return "text-zinc-400";
	if (note.style === "underline") return "text-zinc-900 underline decoration-zinc-800 underline-offset-2";
	if (note.style === "highlight") {
		return cn("rounded-md px-1.5 py-0.5 text-zinc-900", highlight);
	}
	return "text-zinc-900";
}

function KeyCap({ label, wide, pressed, onPress, children }) {
	return (
		<button
			type="button"
			onPointerDown={(e) => {
				e.preventDefault();
				onPress?.();
			}}
			className={cn(
				"relative flex h-8 min-w-0 items-center justify-center overflow-hidden rounded-[6px] text-[13px] font-medium text-zinc-800 shadow-sm transition-transform duration-75",
				wide || "flex-1",
				pressed ? "scale-[0.96] bg-white text-zinc-900 shadow-md" : "bg-[#e4e4ea]"
			)}
			style={wide ? { width: wide } : undefined}
		>
			{pressed ? (
				<span
					aria-hidden
					className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
					style={{ animation: "iphone-key-ripple 0.32s ease-out forwards" }}
				/>
			) : null}
			<span className="relative z-10">{children || label}</span>
		</button>
	);
}

function PhoneChrome({ children }) {
	const time = useMemo(() => {
		const d = new Date();
		return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
	}, []);

	return (
		<div className="relative mx-auto h-[min(86vh,43.5rem)] w-auto max-w-[min(92vw,20rem)] aspect-[9/19.5]">
			<div
				className="relative h-full overflow-hidden rounded-[2.35rem] border border-[#e7e1d6] bg-[#efe8dc] p-[7px]"
				style={{
					boxShadow:
						"inset 0 0 0 1px rgba(255,255,255,0.55), 0 28px 60px -24px rgba(24,24,27,0.45)",
				}}
			>
				<div className="relative flex h-full flex-col overflow-hidden rounded-[1.95rem] bg-[#fffdf8]">
					<div className="pointer-events-none absolute left-1/2 top-2 z-30 h-[18px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
					<div className="relative z-20 flex shrink-0 items-center justify-between px-5 pb-0.5 pt-2.5 text-[10px] font-semibold text-zinc-900">
						<span>{time}</span>
						<span className="w-[78px]" />
						<span className="opacity-0">.</span>
					</div>
					<div className="relative min-h-0 flex-1">{children}</div>
					<div className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-[3px] w-24 -translate-x-1/2 rounded-full bg-zinc-900/80" />
				</div>
			</div>
		</div>
	);
}

function NotesDrawer({ open, onClose, prefs, setPrefs }) {
	return (
		<AnimatePresence>
			{open ? (
				<>
					<button
						type="button"
						aria-label="Close drawer"
						className="absolute inset-0 z-30 bg-black/10"
						onClick={onClose}
					/>
					<motion.div
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ type: "spring", stiffness: 380, damping: 34 }}
						className="absolute inset-x-0 bottom-0 z-40 max-h-[72%] overflow-y-auto rounded-t-[1.6rem] bg-[#ffe14a] px-4 pb-8 pt-4"
					>
						<div className="mx-auto mb-3 h-1 w-10 rounded-full bg-black/20" />

						<p className="mb-2 font-mono text-[11px]">Paper</p>
						<div className="mb-4 flex gap-2">
							{PAPERS.map((p) => (
								<button
									key={p.id}
									type="button"
									onClick={() => setPrefs((s) => ({ ...s, paper: p.id }))}
									className={cn(
										"relative h-10 w-10 overflow-hidden rounded-md border border-black/10",
										prefs.paper === p.id && "ring-2 ring-black"
									)}
									style={{ background: p.swatch }}
									aria-label={p.id}
								>
									{p.fold ? (
										<span className="absolute right-0 top-0 h-0 w-0 border-b-[12px] border-l-[12px] border-b-transparent border-l-zinc-300" />
									) : null}
								</button>
							))}
						</div>

						<p className="mb-2 font-mono text-[11px]">Font</p>
						<div className="mb-4 flex gap-4 text-sm">
							{FONTS.map((f) => (
								<button
									key={f.id}
									type="button"
									onClick={() => setPrefs((s) => ({ ...s, font: f.id }))}
									className={cn(
										f.className,
										prefs.font === f.id && "underline decoration-2 underline-offset-4"
									)}
								>
									{f.label}
								</button>
							))}
						</div>

						<p className="mb-2 font-mono text-[11px]">Pen</p>
						<div className="mb-4 flex items-center gap-2">
							{PENS.map((c) => (
								<button
									key={c}
									type="button"
									onClick={() => setPrefs((s) => ({ ...s, pen: c }))}
									className={cn(
										"h-7 w-7 rounded-full",
										prefs.pen === c && "ring-2 ring-red-500 ring-offset-2 ring-offset-[#ffe14a]"
									)}
									style={{ background: c }}
								/>
							))}
						</div>

						<p className="mb-2 font-mono text-[11px]">Size</p>
						<div className="mb-4 flex items-end gap-3">
							{SIZES.map((s, i) => (
								<button
									key={s}
									type="button"
									onClick={() => setPrefs((p) => ({ ...p, size: s }))}
									className={cn(
										"text-zinc-900",
										prefs.size === s ? "opacity-100" : "opacity-40"
									)}
									style={{ fontSize: 10 + i * 4 }}
								>
									{i === SIZES.length - 1 ? "✱" : "•"}
								</button>
							))}
						</div>

						<p className="mb-2 font-mono text-[11px]">Marker</p>
						<div className="flex items-end gap-2">
							{MARKERS.map((c) => (
								<button
									key={c}
									type="button"
									onClick={() => setPrefs((s) => ({ ...s, marker: c, highlight: true }))}
									className="flex flex-col items-center"
									style={{ transform: prefs.marker === c ? "translateY(-6px)" : undefined }}
								>
									<span className="h-3 w-5 rounded-t-sm" style={{ background: c }} />
									<span className="h-8 w-5 rounded-b-sm bg-[#f5d76e]" />
									<span className="h-2 w-5 rounded-b-sm bg-zinc-900" />
								</button>
							))}
						</div>
					</motion.div>
				</>
			) : null}
		</AnimatePresence>
	);
}

/**
 * HeroIPhoneNotesPad — light cream iPhone writing pad.
 * List + yellow style drawer + on-screen keyboard driven by Mac key events.
 */
export default function HeroIPhoneNotesPad({ className }) {
	const [screen, setScreen] = useState("list");
	const [drawer, setDrawer] = useState(false);
	const [draft, setDraft] = useState("Watch shrek 3");
	const [when, setWhen] = useState("soon");
	const [layout, setLayout] = useState("letters");
	const [shift, setShift] = useState(false);
	const [pressed, setPressed] = useState("");
	const [notes, setNotes] = useState(SEED_NOTES);
	const [prefs, setPrefs] = useState({
		paper: "white",
		font: "system",
		pen: "#111111",
		size: 16,
		marker: "#f9a8d4",
		highlight: true,
	});

	const paper = PAPERS.find((p) => p.id === prefs.paper) || PAPERS[0];
	const font = FONTS.find((f) => f.id === prefs.font) || FONTS[3];
	const highlightBg = { backgroundColor: `${prefs.marker}99` };

	const flash = (id) => {
		setPressed(id);
		window.setTimeout(() => {
			setPressed((cur) => (cur === id ? "" : cur));
		}, 220);
	};

	const typeValue = (value) => {
		if (value === "backspace") {
			setDraft((t) => t.slice(0, -1));
			return;
		}
		if (value === "return" || value === "enter") {
			setDraft((t) => `${t}\n`);
			return;
		}
		if (value === "space") {
			setDraft((t) => `${t} `);
			return;
		}
		if (value === "shift") {
			setShift((s) => !s);
			return;
		}
		if (value === "abc" || value === "ABC") {
			setLayout("letters");
			return;
		}
		if (value === "#+=") {
			setLayout("symbols");
			return;
		}
		setDraft((t) => t + value);
	};

	useEffect(() => {
		if (screen !== "compose") return undefined;

		const onDown = (event) => {
			if (event.metaKey || event.ctrlKey || event.altKey) return;
			const key = event.key;
			if (key === "Escape") {
				setScreen("list");
				return;
			}
			if (key === "Backspace") {
				event.preventDefault();
				flash("backspace");
				typeValue("backspace");
				return;
			}
			if (key === "Enter") {
				event.preventDefault();
				flash("return");
				typeValue("return");
				return;
			}
			if (key === " ") {
				event.preventDefault();
				flash("space");
				typeValue("space");
				return;
			}
			if (key === "Shift") {
				setShift(true);
				flash("shift");
				return;
			}
			if (key.length === 1) {
				event.preventDefault();
				const next = shift || event.shiftKey ? key : key.toLowerCase();
				flash(key.toLowerCase());
				typeValue(next);
			}
		};

		const onUp = (event) => {
			if (event.key === "Shift") setShift(false);
		};

		window.addEventListener("keydown", onDown);
		window.addEventListener("keyup", onUp);
		return () => {
			window.removeEventListener("keydown", onDown);
			window.removeEventListener("keyup", onUp);
		};
	}, [screen, shift]);

	const commitNote = () => {
		const text = draft.trim();
		if (!text) {
			setScreen("list");
			return;
		}
		setNotes((prev) => [
			{
				id: String(Date.now()),
				when: when === "soon" ? "soon" : "someday",
				text,
				style: prefs.highlight ? "highlight" : "plain",
			},
			...prev,
		]);
		setDraft("");
		setScreen("list");
	};

	const rows = layout === "letters" ? LETTER_ROWS : SYMBOL_ROWS;

	return (
		<section
			className={cn(
				"flex w-full flex-col items-center justify-center px-4 py-10",
				className
			)}
			style={{ background: "#cfd8c8" }}
			aria-label="iPhone notes pad"
		>
			<style>{`
				@keyframes iphone-key-ripple {
					0% { transform: translate(-50%, -50%) scale(0.35); opacity: 1; background: #fff; }
					70% { opacity: 0.85; }
					100% { transform: translate(-50%, -50%) scale(3.4); opacity: 0; }
				}
			`}</style>
			<PhoneChrome>
				<div
					className="relative flex h-full min-h-0 flex-col"
					style={{ background: paper.bg }}
				>
					{screen === "list" ? (
						<>
							<div className="min-h-0 flex-1 overflow-y-auto px-4 pb-16 pt-1">
								<ul className="space-y-2.5">
									{notes.map((note) => (
										<li key={note.id} className="grid grid-cols-[4.75rem_1fr] items-baseline gap-1.5">
											<span className="font-mono text-[10px] text-zinc-400">{note.when}</span>
											<span
												className={cn("text-[14px] leading-snug", font.className, styleNote(note, ""))}
												style={{
													color: prefs.pen,
													...(note.style === "highlight" ? highlightBg : null),
												}}
											>
												{note.text}
											</span>
										</li>
									))}
								</ul>
							</div>

							<div className="absolute bottom-5 right-3 z-20 flex items-center gap-2">
								<button
									type="button"
									onClick={() => setDrawer(true)}
									className="flex h-10 w-10 items-center justify-center rounded-full bg-[#ffe14a] text-zinc-900 shadow-md"
									aria-label="Open style drawer"
								>
									<Palette className="h-4 w-4" />
								</button>
								<button
									type="button"
									onClick={() => {
										setDraft("");
										setScreen("compose");
									}}
									className="rounded-full bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-md"
								>
									Write
								</button>
							</div>
						</>
					) : (
						<div className="flex min-h-0 flex-1 flex-col">
							<div className="flex items-center justify-between px-5 pt-1">
								<span className="text-[11px] font-semibold opacity-0">.</span>
								<button
									type="button"
									onClick={() => setScreen("list")}
									className="text-[13px] font-medium text-zinc-900"
								>
									cancel
								</button>
							</div>

							<div className="min-h-0 flex-1 overflow-y-auto px-4 pt-2">
								<p
									className={cn("whitespace-pre-wrap break-words", font.className)}
									style={{ color: prefs.pen, fontSize: prefs.size }}
								>
									{draft}
									<span className="ml-0.5 inline-block h-4 w-[1px] animate-pulse bg-zinc-900 align-middle" />
								</p>
							</div>

							<div className="flex items-center justify-between px-4 pb-2 pt-1">
								<button
									type="button"
									onClick={() => setWhen("someday")}
									className={cn(
										"rounded-full px-3 py-1 text-sm",
										when === "someday"
											? "bg-white text-zinc-900 shadow"
											: "text-zinc-400"
									)}
								>
									Someday
								</button>
								<button
									type="button"
									onClick={() => setWhen("soon")}
									className={cn(
										"rounded-full px-3 py-1 text-sm",
										when === "soon" ? "bg-white text-zinc-900 shadow" : "text-zinc-400"
									)}
								>
									Soon
								</button>
								<button
									type="button"
									onClick={commitNote}
									className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow"
									aria-label="Save note"
								>
									<Check className="h-4 w-4" />
								</button>
							</div>

							<div className="shrink-0 bg-[#c9c9ce] px-1 pb-6 pt-1">
								<div className="space-y-1">
									{rows.map((row, i) => (
										<div key={i} className="flex justify-center gap-[3px]">
											{i === 1 && layout === "letters" ? <span className="w-2" /> : null}
											{row.map((key) => {
												const display =
													key.length === 1 && layout === "letters" && shift
														? key.toUpperCase()
														: key === "backspace"
															? "⌫"
															: key === "shift"
																? "⇧"
																: key;
												const pressId = key === "backspace" ? "backspace" : key.toLowerCase();
												return (
													<KeyCap
														key={key}
														label={display}
														pressed={pressed === pressId || (key === "shift" && shift)}
														wide={
															key === "shift" || key === "backspace"
																? 34
																: key === "#+="
																	? 34
																	: undefined
														}
														onPress={() => {
															flash(pressId);
															if (key.length === 1 && layout === "letters") {
																typeValue(shift ? key.toUpperCase() : key);
																return;
															}
															typeValue(key);
														}}
													/>
												);
											})}
											{i === 1 && layout === "letters" ? <span className="w-2" /> : null}
										</div>
									))}
									<div className="flex gap-[3px]">
										<KeyCap
											label={layout === "letters" ? "#+=" : "ABC"}
											wide={38}
											pressed={pressed === "#+=" || pressed === "abc"}
											onPress={() =>
												setLayout((m) => (m === "letters" ? "symbols" : "letters"))
											}
										/>
										<KeyCap label="☺" wide={30} onPress={() => typeValue("☺")} />
										<KeyCap
											label="DE EN"
											pressed={pressed === "space"}
											onPress={() => typeValue("space")}
										>
											<span className="text-center text-[11px] text-zinc-600">DE EN</span>
										</KeyCap>
										<KeyCap
											label="⏎"
											wide={38}
											pressed={pressed === "return"}
											onPress={() => typeValue("return")}
										/>
									</div>
								</div>
								<div className="mt-2 flex items-center justify-between px-3 text-zinc-600">
									<Globe className="h-4 w-4" />
									<Mic className="h-4 w-4" />
								</div>
							</div>
						</div>
					)}

					<NotesDrawer
						open={drawer}
						onClose={() => setDrawer(false)}
						prefs={prefs}
						setPrefs={setPrefs}
					/>
				</div>
			</PhoneChrome>
			<p className="mt-4 text-center text-xs text-zinc-600">
				Type on your Mac keyboard · palette button opens the yellow drawer
			</p>
		</section>
	);
}
