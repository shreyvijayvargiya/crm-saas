import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	Bell,
	BellOff,
	Camera,
	ChevronLeft,
	CloudSun,
	Ellipsis,
	Image as ImageIcon,
	Lock,
	MessageCircle,
	Music2,
	NotebookPen,
	Plus,
	Settings,
	Trash2,
	Wifi,
	Battery,
	Signal,
	Volume2,
	VolumeX,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1];

const SEED_NOTES = [
	{
		id: "n1",
		title: "Sprint ideas",
		body: "Ship Notes inside the phone hero.\nPolish Dynamic Island.\nKeep interactions snappy.",
		updatedAt: "Yesterday",
	},
	{
		id: "n2",
		title: "Grocery",
		body: "Oat milk\nBasil\nSourdough\nEspresso beans",
		updatedAt: "Mon",
	},
	{
		id: "n3",
		title: "Meeting notes",
		body: "Align on CRM kit pricing.\nAdd more hero demos for Gumroad page.",
		updatedAt: "Sun",
	},
];

const HOME_APPS = [
	{
		id: "notes",
		label: "Notes",
		icon: NotebookPen,
		gradient: "from-amber-300 to-yellow-500",
		iconClass: "text-zinc-900",
	},
	{
		id: "messages",
		label: "Messages",
		icon: MessageCircle,
		gradient: "from-emerald-400 to-green-600",
		iconClass: "text-white",
	},
	{
		id: "camera",
		label: "Camera",
		icon: Camera,
		gradient: "from-zinc-500 to-zinc-700",
		iconClass: "text-white",
	},
	{
		id: "photos",
		label: "Photos",
		icon: ImageIcon,
		gradient: "from-rose-400 via-amber-300 to-sky-400",
		iconClass: "text-white",
	},
	{
		id: "weather",
		label: "Weather",
		icon: CloudSun,
		gradient: "from-sky-400 to-blue-600",
		iconClass: "text-white",
	},
	{
		id: "music",
		label: "Music",
		icon: Music2,
		gradient: "from-rose-500 to-pink-600",
		iconClass: "text-white",
	},
	{
		id: "settings",
		label: "Settings",
		icon: Settings,
		gradient: "from-zinc-400 to-zinc-600",
		iconClass: "text-white",
	},
];

const GRID_IDS = ["notes", "weather", "music", "settings"];
const DOCK_IDS = ["messages", "camera", "photos", "notes"];

function AppleLogo({ className }) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			aria-hidden
		>
			<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
		</svg>
	);
}

function StatusBar({ light = false, silent = false }) {
	return (
		<div
			className={cn(
				"flex items-center justify-between px-5 pt-3 text-[10px] font-semibold",
				light ? "text-zinc-900" : "text-white"
			)}
		>
			<span className="w-12 tabular-nums">9:41</span>
			<div className="flex items-center gap-1.5">
				{silent && (
					<BellOff
						className={cn("h-3 w-3", light ? "text-zinc-500" : "text-orange-300")}
						strokeWidth={2.5}
					/>
				)}
				<Signal className="h-3 w-3" strokeWidth={2.5} />
				<Wifi className="h-3 w-3" strokeWidth={2.5} />
				<Battery className="h-3.5 w-3.5" strokeWidth={2.5} />
			</div>
		</div>
	);
}

function PhoneToast({ toast }) {
	const Icon = toast.icon;
	return (
		<motion.div
			className="pointer-events-none absolute left-1/2 top-12 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-zinc-900/90 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg ring-1 ring-white/10 backdrop-blur"
			initial={{ opacity: 0, y: -8, scale: 0.94 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: -6, scale: 0.96 }}
			transition={{ duration: 0.22, ease }}
		>
			{Icon && <Icon className={cn("h-3.5 w-3.5", toast.iconClass)} />}
			{toast.label}
		</motion.div>
	);
}

function LockScreen({ onUnlock, silent }) {
	const [now] = useState(() => new Date());
	const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
	const date = now.toLocaleDateString([], {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	return (
		<motion.div
			className="absolute inset-0 flex cursor-pointer flex-col"
			style={{
				background:
					"linear-gradient(165deg, #0c4a6e 0%, #0f172a 45%, #1e1b4b 100%)",
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.35, ease }}
			onClick={onUnlock}
			role="button"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") onUnlock();
			}}
			aria-label="Unlock phone"
		>
			<div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-white/90">
				<span className="w-12" />
				<div className="flex items-center gap-1.5">
					{silent && <BellOff className="h-3 w-3 text-orange-300" strokeWidth={2.5} />}
					<Signal className="h-3 w-3" strokeWidth={2.5} />
					<Wifi className="h-3 w-3" strokeWidth={2.5} />
					<Battery className="h-3.5 w-3.5" strokeWidth={2.5} />
				</div>
			</div>

			<div className="mt-10 flex flex-1 flex-col items-center px-4 text-center text-white">
				<Lock className="mb-3 h-4 w-4 text-white/70" />
				<p className="text-[11px] font-medium text-white/80">{date}</p>
				<p className="mt-1 text-5xl font-light tracking-tight">{time}</p>
				<p className="mt-8 max-w-[180px] text-[11px] leading-relaxed text-white/55">
					Swipe up or tap to unlock · Power locks again
				</p>
			</div>

			<div className="flex flex-col items-center gap-3 pb-5">
				<button
					type="button"
					onClick={(e) => {
						e.stopPropagation();
						onUnlock();
					}}
					className="rounded-full bg-white/15 px-4 py-1.5 text-[11px] font-medium text-white ring-1 ring-white/25 backdrop-blur"
				>
					Unlock
				</button>
				<div className="h-1 w-28 rounded-full bg-white/85" />
			</div>
		</motion.div>
	);
}

function SideButton({
	className,
	style,
	ariaLabel,
	onClick,
	pressed,
	children,
}) {
	return (
		<button
			type="button"
			aria-label={ariaLabel}
			aria-pressed={pressed}
			onClick={onClick}
			className={cn(
				"absolute z-30 transition active:brightness-125",
				className
			)}
			style={style}
		>
			{children}
		</button>
	);
}

function AppIcon({ app, onClick, size = "md" }) {
	const Icon = app.icon;
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex flex-col items-center gap-1 active:scale-95"
			aria-label={app.label}
		>
			<span
				className={cn(
					"flex items-center justify-center rounded-[14px] bg-gradient-to-br shadow-md",
					app.gradient,
					size === "sm" ? "h-11 w-11" : "h-12 w-12 sm:h-[52px] sm:w-[52px]"
				)}
			>
				<Icon
					className={cn(
						size === "sm" ? "h-5 w-5" : "h-6 w-6",
						app.iconClass
					)}
					strokeWidth={2}
				/>
			</span>
			<span className="max-w-[58px] truncate text-[9px] font-medium text-white drop-shadow">
				{app.label}
			</span>
		</button>
	);
}

function SimpleAppScreen({ app, onBack, silent }) {
	const Icon = app.icon;
	const copy = {
		messages: {
			title: "Messages",
			lines: ["Alex · See you at 7?", "Sam · Invoice sent ✓", "Team · Demo link"],
		},
		camera: {
			title: "Camera",
			lines: ["Photo · Video · Portrait", "Tap shutter to capture", "Flash · Auto"],
		},
		photos: {
			title: "Photos",
			lines: ["Recents · 248", "Favorites · 12", "Albums · Travel, Food"],
		},
		weather: {
			title: "Weather",
			lines: ["San Francisco", "68° · Partly cloudy", "H:72°  L:58°"],
		},
		music: {
			title: "Music",
			lines: ["Now Playing", "Midnight City — M83", "Up Next · 3 songs"],
		},
		settings: {
			title: "Settings",
			lines: ["Wi‑Fi · Connected", "Bluetooth · On", "Display · Light"],
		},
	}[app.id] || { title: app.label, lines: ["Demo screen"] };

	return (
		<motion.div
			className="absolute inset-0 flex flex-col bg-zinc-950 text-white"
			initial={{ opacity: 0, x: 28 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 16 }}
			transition={{ duration: 0.28, ease }}
		>
			<StatusBar silent={silent} />
			<div className="flex items-center gap-1 px-3 pb-2 pt-2">
				<button
					type="button"
					onClick={onBack}
					className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-1 text-[12px] font-medium text-sky-400"
				>
					<ChevronLeft className="h-4 w-4" />
					Home
				</button>
			</div>
			<div className="flex flex-1 flex-col items-center px-5 pt-6 text-center">
				<span
					className={cn(
						"mb-4 flex h-16 w-16 items-center justify-center rounded-[18px] bg-gradient-to-br shadow-lg",
						app.gradient
					)}
				>
					<Icon className={cn("h-8 w-8", app.iconClass)} />
				</span>
				<p className="text-xl font-semibold tracking-tight">{copy.title}</p>
				<ul className="mt-5 w-full space-y-2 text-left">
					{copy.lines.map((line) => (
						<li
							key={line}
							className="rounded-xl bg-zinc-900 px-3.5 py-2.5 text-[12px] text-zinc-300 ring-1 ring-white/5"
						>
							{line}
						</li>
					))}
				</ul>
			</div>
			<div className="flex justify-center pb-2 pt-3">
				<div className="h-1 w-28 rounded-full bg-white/80" />
			</div>
		</motion.div>
	);
}

function notePreview(body) {
	const line = (body || "").split("\n").find((l) => l.trim()) || "No additional text";
	return line.length > 42 ? `${line.slice(0, 42)}…` : line;
}

function titleFromBody(body) {
	const first = (body || "").split("\n").find((l) => l.trim());
	return first ? first.trim().slice(0, 40) : "New Note";
}

function NotesApp({ onBack, silent }) {
	const [notes, setNotes] = useState(SEED_NOTES);
	const [activeId, setActiveId] = useState(null);
	const active = useMemo(
		() => notes.find((n) => n.id === activeId) || null,
		[notes, activeId]
	);

	const createNote = () => {
		const id = `n${Date.now()}`;
		const next = {
			id,
			title: "New Note",
			body: "",
			updatedAt: "Just now",
		};
		setNotes((prev) => [next, ...prev]);
		setActiveId(id);
	};

	const updateBody = (body) => {
		setNotes((prev) =>
			prev.map((n) =>
				n.id === activeId
					? { ...n, body, title: titleFromBody(body), updatedAt: "Just now" }
					: n
			)
		);
	};

	const deleteActive = () => {
		setNotes((prev) => prev.filter((n) => n.id !== activeId));
		setActiveId(null);
	};

	return (
		<motion.div
			className="absolute inset-0 flex flex-col bg-[#f2f2f7] text-zinc-900"
			initial={{ opacity: 0, x: 28 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 16 }}
			transition={{ duration: 0.28, ease }}
		>
			<StatusBar light silent={silent} />

			<AnimatePresence mode="wait" initial={false}>
				{active ? (
					<motion.div
						key="editor"
						className="flex min-h-0 flex-1 flex-col"
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 12 }}
						transition={{ duration: 0.22, ease }}
					>
						<div className="flex items-center justify-between px-2 py-1.5">
							<button
								type="button"
								onClick={() => setActiveId(null)}
								className="inline-flex items-center gap-0.5 px-1.5 py-1 text-[13px] font-medium text-amber-600"
							>
								<ChevronLeft className="h-4 w-4" />
								Notes
							</button>
							<div className="flex items-center gap-1">
								<button
									type="button"
									onClick={deleteActive}
									className="rounded-full p-1.5 text-amber-600 hover:bg-amber-500/10"
									aria-label="Delete note"
								>
									<Trash2 className="h-4 w-4" />
								</button>
								<button
									type="button"
									className="rounded-full p-1.5 text-amber-600 hover:bg-amber-500/10"
									aria-label="More"
								>
									<Ellipsis className="h-4 w-4" />
								</button>
							</div>
						</div>
						<div className="min-h-0 flex-1 overflow-y-auto px-4 pb-3">
							<p className="mb-2 text-[10px] text-zinc-400">{active.updatedAt}</p>
							<textarea
								value={active.body}
								onChange={(e) => updateBody(e.target.value)}
								placeholder="Start writing…"
								className="h-full min-h-[220px] w-full resize-none bg-transparent text-[14px] leading-relaxed text-zinc-900 outline-none placeholder:text-zinc-400"
								autoFocus
							/>
						</div>
						<div className="flex items-center justify-between border-t border-zinc-200/80 bg-[#f2f2f7] px-4 py-2">
							<span className="text-[10px] text-zinc-400">
								{active.body.length} characters
							</span>
							<button
								type="button"
								onClick={createNote}
								className="rounded-full p-1.5 text-amber-600"
								aria-label="New note"
							>
								<Plus className="h-5 w-5" />
							</button>
						</div>
					</motion.div>
				) : (
					<motion.div
						key="list"
						className="flex min-h-0 flex-1 flex-col"
						initial={{ opacity: 0, x: -16 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -10 }}
						transition={{ duration: 0.22, ease }}
					>
						<div className="flex items-center justify-between px-3 pt-1">
							<button
								type="button"
								onClick={onBack}
								className="inline-flex items-center gap-0.5 px-1 py-1 text-[13px] font-medium text-amber-600"
							>
								<ChevronLeft className="h-4 w-4" />
								Home
							</button>
							<button
								type="button"
								onClick={createNote}
								className="rounded-full p-1.5 text-amber-600"
								aria-label="Compose note"
							>
								<Plus className="h-5 w-5" />
							</button>
						</div>
						<div className="px-4 pb-2 pt-1">
							<p className="text-[28px] font-bold tracking-tight text-zinc-900">
								Notes
							</p>
							<p className="text-[11px] text-zinc-500">
								{notes.length} note{notes.length === 1 ? "" : "s"} · On My iPhone
							</p>
						</div>
						<div className="min-h-0 flex-1 overflow-y-auto px-3 pb-3">
							<div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
								{notes.length === 0 ? (
									<p className="px-4 py-8 text-center text-xs text-zinc-400">
										No Notes
									</p>
								) : (
									notes.map((note, i) => (
										<button
											key={note.id}
											type="button"
											onClick={() => setActiveId(note.id)}
											className={cn(
												"flex w-full flex-col items-start px-3.5 py-2.5 text-left transition hover:bg-zinc-50 active:bg-zinc-100",
												i > 0 && "border-t border-zinc-100"
											)}
										>
											<span className="w-full truncate text-[13px] font-semibold text-zinc-900">
												{note.title || "New Note"}
											</span>
											<span className="mt-0.5 flex w-full gap-2 text-[11px] text-zinc-500">
												<span className="shrink-0 tabular-nums text-zinc-400">
													{note.updatedAt}
												</span>
												<span className="truncate">{notePreview(note.body)}</span>
											</span>
										</button>
									))
								)}
							</div>
						</div>
						<div className="flex justify-center pb-2 pt-1">
							<div className="h-1 w-28 rounded-full bg-zinc-900/80" />
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

function HomeScreen({ onOpenApp, silent }) {
	const gridApps = GRID_IDS.map((id) => HOME_APPS.find((a) => a.id === id)).filter(Boolean);
	const dockApps = DOCK_IDS.map((id) => HOME_APPS.find((a) => a.id === id)).filter(Boolean);

	return (
		<motion.div
			className="absolute inset-0 flex flex-col"
			style={{
				background:
					"linear-gradient(165deg, #1e3a5f 0%, #0f172a 42%, #312e81 78%, #1e1b4b 100%)",
			}}
			initial={{ opacity: 0, scale: 0.96 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.98 }}
			transition={{ duration: 0.35, ease }}
		>
			<StatusBar silent={silent} />
			{/* Dynamic Island spacer */}
			<div className="h-3" />

			<div className="grid flex-1 grid-cols-4 content-start gap-x-2 gap-y-4 px-4 pt-2">
				{gridApps.map((app) => (
					<AppIcon key={app.id} app={app} onClick={() => onOpenApp(app.id)} />
				))}
			</div>

			<div className="mx-3 mb-2 rounded-[22px] bg-white/15 p-2.5 backdrop-blur-md ring-1 ring-white/20">
				<div className="flex items-end justify-around">
					{dockApps.map((app) => (
						<AppIcon
							key={`dock-${app.id}`}
							app={app}
							size="sm"
							onClick={() => onOpenApp(app.id)}
						/>
					))}
				</div>
			</div>
			<div className="flex justify-center pb-2">
				<div className="h-1 w-28 rounded-full bg-white/85" />
			</div>
		</motion.div>
	);
}

/**
 * HeroIPhone — iPhone mockup: boot → home → apps.
 * Side buttons: silent switch, volume, power (lock / unlock).
 */
export default function HeroIPhone({ className }) {
	const [booted, setBooted] = useState(false);
	const [locked, setLocked] = useState(false);
	const [silent, setSilent] = useState(false);
	const [volume, setVolume] = useState(60);
	const [activeAppId, setActiveAppId] = useState(null);
	const [toast, setToast] = useState(null);

	useEffect(() => {
		const id = setTimeout(() => setBooted(true), 1100);
		return () => clearTimeout(id);
	}, []);

	useEffect(() => {
		if (!toast) return undefined;
		const id = setTimeout(() => setToast(null), 1600);
		return () => clearTimeout(id);
	}, [toast]);

	const showToast = useCallback((next) => {
		setToast({ id: Date.now(), ...next });
	}, []);

	const toggleSilent = useCallback(() => {
		if (!booted) return;
		setSilent((prev) => {
			const next = !prev;
			showToast({
				label: next ? "Silent mode on" : "Silent mode off",
				icon: next ? BellOff : Bell,
				iconClass: next ? "text-orange-400" : "text-emerald-400",
			});
			return next;
		});
	}, [booted, showToast]);

	const togglePower = useCallback(() => {
		if (!booted) return;
		setLocked((prev) => {
			const next = !prev;
			if (next) {
				showToast({
					label: "Locked",
					icon: Lock,
					iconClass: "text-zinc-300",
				});
			}
			return next;
		});
	}, [booted, showToast]);

	const bumpVolume = useCallback(
		(delta) => {
			if (!booted) return;
			setVolume((v) => {
				const next = Math.max(0, Math.min(100, v + delta));
				showToast({
					label: next === 0 ? "Muted" : `Volume ${next}%`,
					icon: next === 0 ? VolumeX : Volume2,
					iconClass: "text-sky-300",
					kind: "volume",
				});
				return next;
			});
		},
		[booted, showToast]
	);

	const unlock = useCallback(() => setLocked(false), []);

	const activeApp = HOME_APPS.find((a) => a.id === activeAppId);
	const metal = "linear-gradient(90deg, #52525b, #a1a1aa)";
	const metalRight = "linear-gradient(90deg, #a1a1aa, #52525b)";

	return (
		<section
			className={cn(
				"relative mx-auto flex w-full max-w-md flex-col items-center px-4 py-16 sm:py-20",
				className
			)}
			aria-label="iPhone demo"
		>
			<div className="relative">
				{/* Silent switch — slides toward edge when silent */}
				<SideButton
					ariaLabel={silent ? "Turn silent mode off" : "Turn silent mode on"}
					pressed={silent}
					onClick={toggleSilent}
					className={cn(
						"-left-[3px] top-[92px] h-7 w-[10px] rounded-l-sm",
						silent && "-left-[6px]"
					)}
					style={{
						background: silent
							? "linear-gradient(90deg, #ea580c, #fb923c)"
							: metal,
						boxShadow: silent ? "0 0 8px rgba(249,115,22,0.55)" : undefined,
					}}
				/>

				{/* Volume up */}
				<SideButton
					ariaLabel="Volume up"
					onClick={() => bumpVolume(10)}
					className="-left-[3px] top-[128px] h-12 w-[10px] rounded-l-sm"
					style={{ background: metal }}
				/>

				{/* Volume down */}
				<SideButton
					ariaLabel="Volume down"
					onClick={() => bumpVolume(-10)}
					className="-left-[3px] top-[180px] h-12 w-[10px] rounded-l-sm"
					style={{ background: metal }}
				/>

				{/* Power / lock */}
				<SideButton
					ariaLabel={locked ? "Unlock phone" : "Lock phone"}
					pressed={locked}
					onClick={togglePower}
					className="-right-[3px] top-[150px] h-16 w-[10px] rounded-r-sm"
					style={{ background: metalRight }}
				/>

				{/* Titanium frame */}
				<div
					className="relative rounded-[44px] p-[10px] sm:rounded-[48px] sm:p-[11px]"
					style={{
						background:
							"linear-gradient(145deg, #d4d4d8 0%, #71717a 28%, #3f3f46 55%, #27272a 100%)",
						boxShadow:
							"0 32px 64px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.35)",
					}}
				>
					<div className="relative h-[520px] w-[252px] overflow-hidden rounded-[36px] bg-black sm:h-[560px] sm:w-[270px] sm:rounded-[38px]">
						{/* Dynamic Island */}
						<div className="pointer-events-none absolute left-1/2 top-3 z-40 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black sm:h-[28px] sm:w-[104px]" />

						<AnimatePresence>
							{toast ? <PhoneToast key={toast.id} toast={toast} /> : null}
						</AnimatePresence>

						{/* Volume HUD while adjusting */}
						<AnimatePresence>
							{toast?.kind === "volume" ? (
								<motion.div
									key="vol-hud"
									className="pointer-events-none absolute left-3 top-1/2 z-50 flex h-28 w-1.5 -translate-y-1/2 overflow-hidden rounded-full bg-white/20"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
								>
									<div
										className="mt-auto w-full rounded-full bg-white"
										style={{ height: `${volume}%` }}
									/>
								</motion.div>
							) : null}
						</AnimatePresence>

						<AnimatePresence mode="wait">
							{!booted ? (
								<motion.div
									key="boot"
									className="absolute inset-0 flex items-center justify-center bg-black"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0, scale: 0.92 }}
									transition={{ duration: 0.35, ease }}
								>
									<AppleLogo className="h-14 w-14 text-white" />
								</motion.div>
							) : locked ? (
								<LockScreen
									key="lock"
									onUnlock={unlock}
									silent={silent}
								/>
							) : activeAppId === "notes" ? (
								<NotesApp
									key="notes"
									silent={silent}
									onBack={() => setActiveAppId(null)}
								/>
							) : activeApp ? (
								<SimpleAppScreen
									key={activeApp.id}
									app={activeApp}
									silent={silent}
									onBack={() => setActiveAppId(null)}
								/>
							) : (
								<HomeScreen
									key="home"
									silent={silent}
									onOpenApp={setActiveAppId}
								/>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>

			<p className="mt-8 text-center text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
				Power · Silent · Volume
			</p>
			<p className="mt-2 max-w-xs text-center text-[11px] leading-relaxed text-zinc-500">
				Right side locks. Top-left silent switch. Volume buttons adjust level.
				Tap Notes for the editor.
			</p>
		</section>
	);
}
