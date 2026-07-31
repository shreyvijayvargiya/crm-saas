import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT = "#ea580c";

const VOICE_STYLES = [
	"Informative",
	"Warm",
	"Bright",
	"Calm",
	"Firm",
	"Soft",
	"Upbeat",
	"Narrative",
];

/** Google-style Gemini TTS voice names (demo catalog) */
const VOICE_NAMES = [
	"Zephyr",
	"Puck",
	"Charon",
	"Kore",
	"Fenrir",
	"Leda",
	"Orus",
	"Aoede",
	"Callirrhoe",
	"Autonoe",
	"Enceladus",
	"Iapetus",
	"Umbriel",
	"Algieba",
	"Despina",
	"Erinome",
	"Algenib",
	"Rasalgethi",
	"Laomedeia",
	"Achernar",
	"Alnilam",
	"Schedar",
	"Gacrux",
	"Pulcherrima",
	"Achird",
	"Zubenelgenubi",
	"Vindemiatrix",
	"Sadachbia",
	"Sadaltager",
	"Sulafat",
];

const VOICES = VOICE_NAMES.map((name, i) => ({
	id: name.toLowerCase(),
	name,
	style: VOICE_STYLES[i % VOICE_STYLES.length],
	pitch: 0.85 + (i % 7) * 0.05,
	rate: 0.92 + (i % 5) * 0.04,
	avatar: `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(
		name
	)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfba`,
}));

const RECENT_IDS = ["zephyr", "puck", "charon", "kore", "fenrir", "leda", "orus"];

const SAMPLE_LINE =
	"Hello — this is your AI narrator for audio and video translation.";

const ease = [0.22, 1, 0.36, 1];

function VoiceAvatar({
	voice,
	selected,
	size = "md",
	showLabel = false,
	playing = false,
	onClick,
}) {
	const dim =
		size === "sm"
			? "h-11 w-11"
			: size === "lg"
				? "h-14 w-14"
				: "h-12 w-12 sm:h-[52px] sm:w-[52px]";

	return (
		<button
			type="button"
			onClick={onClick}
			className="group flex flex-col items-center gap-1.5 focus:outline-none"
			aria-label={`${voice.name}, ${voice.style}`}
			aria-pressed={selected}
		>
			<span className="relative">
				<span
					className={cn(
						"block overflow-hidden rounded-full bg-[#cfe8f6] transition",
						dim,
						selected
							? "ring-2 ring-[#ea580c] ring-offset-2 ring-offset-white"
							: "ring-0 group-hover:ring-2 group-hover:ring-zinc-200 group-hover:ring-offset-2 group-hover:ring-offset-white"
					)}
				>
					<img
						src={voice.avatar}
						alt=""
						className="h-full w-full object-cover"
						draggable={false}
					/>
				</span>
				{playing && (
					<span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#ea580c] text-white shadow">
						<Volume2 className="h-3 w-3" />
					</span>
				)}
			</span>
			{showLabel && (
				<span
					className={cn(
						"max-w-[72px] truncate text-center text-[11px] leading-tight",
						selected
							? "font-medium text-[#ea580c]"
							: "text-zinc-500 group-hover:text-zinc-700"
					)}
					title={voice.name}
				>
					{voice.name.length > 11 ? `${voice.name.slice(0, 10)}…` : voice.name}
				</span>
			)}
		</button>
	);
}

/**
 * HeroNarratorVoice — AI audio/video translation narrator picker.
 * Collapsed: recent avatars + Pick beats. Expanded: full voice grid + preview speech.
 */
export default function HeroNarratorVoice({
	isLight = true,
	className,
	sampleText = SAMPLE_LINE,
}) {
	const [open, setOpen] = useState(false);
	const [selectedId, setSelectedId] = useState("charon");
	const [playingId, setPlayingId] = useState(null);
	const utterRef = useRef(null);

	const byId = useMemo(() => {
		const map = {};
		VOICES.forEach((v) => {
			map[v.id] = v;
		});
		return map;
	}, []);

	const selected = byId[selectedId] || VOICES[2];
	const recent = RECENT_IDS.map((id) => byId[id]).filter(Boolean);
	const extraCount = Math.max(0, VOICES.length - recent.length);

	const stopSpeech = useCallback(() => {
		if (typeof window !== "undefined" && window.speechSynthesis) {
			window.speechSynthesis.cancel();
		}
		utterRef.current = null;
		setPlayingId(null);
	}, []);

	useEffect(() => () => stopSpeech(), [stopSpeech]);

	const speakVoice = useCallback(
		(voice) => {
			if (typeof window === "undefined" || !window.speechSynthesis) {
				setPlayingId(voice.id);
				window.setTimeout(() => setPlayingId(null), 1800);
				return;
			}
			stopSpeech();
			const utter = new SpeechSynthesisUtterance(
				`${voice.name}. ${voice.style} voice. ${sampleText}`
			);
			utter.pitch = voice.pitch;
			utter.rate = voice.rate;
			utter.onend = () => setPlayingId(null);
			utter.onerror = () => setPlayingId(null);
			utterRef.current = utter;
			setPlayingId(voice.id);
			window.speechSynthesis.speak(utter);
		},
		[sampleText, stopSpeech]
	);

	const selectVoice = useCallback(
		(voice) => {
			setSelectedId(voice.id);
			speakVoice(voice);
		},
		[speakVoice]
	);

	const togglePreview = () => {
		if (playingId === selected.id) stopSpeech();
		else speakVoice(selected);
	};

	return (
		<section
			className={cn(
				"relative mx-auto w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-14",
				className
			)}
			aria-label="Narrator voice picker"
		>
			<div
				className={cn(
					"rounded-2xl border p-5 sm:p-6",
					isLight
						? "border-zinc-200 bg-white shadow-sm"
						: "border-zinc-800 bg-zinc-950 shadow-sm"
				)}
			>
				<p
					className={cn(
						"text-sm font-medium",
						isLight ? "text-zinc-500" : "text-zinc-400"
					)}
				>
					Narrator voice
				</p>

				{/* Recent / quick row */}
				<div className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4">
					{recent.map((voice) => (
						<VoiceAvatar
							key={voice.id}
							voice={voice}
							size="sm"
							selected={selectedId === voice.id}
							playing={playingId === voice.id}
							onClick={() => selectVoice(voice)}
						/>
					))}
				</div>

				{/* Pick beats toggle */}
				<div className="mt-5">
					<button
						type="button"
						onClick={() => setOpen((v) => !v)}
						className={cn(
							"inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition",
							open
								? "border-[#ea580c] bg-[#ea580c]/10 text-[#c2410c]"
								: "border-[#ea580c]/70 text-[#ea580c] hover:bg-[#ea580c]/5"
						)}
						aria-expanded={open}
					>
						{open ? "Hide beats" : "Pick beats"}
						<span className="text-[#f97316]/80">+{extraCount || 20}</span>
					</button>

					<div className="mt-2.5 flex flex-wrap items-center gap-3">
						<p className={cn("text-sm", isLight ? "text-zinc-800" : "text-zinc-200")}>
							<span className="font-semibold">{selected.name}</span>
							<span className={isLight ? "text-zinc-400" : "text-zinc-500"}>
								{" "}
								· {selected.style}
							</span>
						</p>
						<button
							type="button"
							onClick={togglePreview}
							className={cn(
								"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition",
								isLight
									? "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
									: "bg-zinc-900 text-zinc-200 hover:bg-zinc-800"
							)}
						>
							{playingId === selected.id ? (
								<>
									<Pause className="h-3 w-3" />
									Stop
								</>
							) : (
								<>
									<Play className="h-3 w-3" />
									Preview
								</>
							)}
						</button>
					</div>
				</div>

				{/* Expanded catalog */}
				<AnimatePresence initial={false}>
					{open && (
						<motion.div
							key="grid"
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.35, ease }}
							className="overflow-hidden"
						>
							<div
								className={cn(
									"mt-5 rounded-2xl border p-4 sm:p-5",
									isLight
										? "border-zinc-200 bg-white"
										: "border-zinc-800 bg-zinc-900/40"
								)}
							>
								<p
									className={cn(
										"mb-4 text-xs font-medium uppercase tracking-[0.14em]",
										isLight ? "text-zinc-400" : "text-zinc-500"
									)}
								>
									AI speech · audio & video translation
								</p>
								<div className="grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-9">
									{VOICES.map((voice, i) => (
										<motion.div
											key={voice.id}
											initial={{ opacity: 0, y: 8 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: Math.min(i * 0.015, 0.35), duration: 0.25, ease }}
											className="flex justify-center"
										>
											<VoiceAvatar
												voice={voice}
												selected={selectedId === voice.id}
												playing={playingId === voice.id}
												showLabel
												onClick={() => selectVoice(voice)}
											/>
										</motion.div>
									))}
								</div>

								{playingId && (
									<p
										className={cn(
											"mt-4 flex items-center justify-center gap-2 text-center text-xs",
											isLight ? "text-zinc-500" : "text-zinc-400"
										)}
									>
										<span
											className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
											style={{ background: ACCENT }}
										/>
										Playing {byId[playingId]?.name} sample for translation preview
									</p>
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<p className="mt-4 text-center text-[11px] uppercase tracking-[0.16em] text-zinc-500">
				Narrator · Pick beats · Speech preview
			</p>
		</section>
	);
}
