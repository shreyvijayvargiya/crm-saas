import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const CONTACTS = [
	{ id: "sneha", handle: "@Snehax", seed: "Sneha" },
	{ id: "manas", handle: "@ManasCode", seed: "Manas" },
	{ id: "aria", handle: "@AriaPay", seed: "Aria" },
	{ id: "leo", handle: "@LeoVault", seed: "Leo" },
	{ id: "mira", handle: "@MiraBTC", seed: "Mira" },
	{ id: "kai", handle: "@KaiWallet", seed: "Kai" },
	{ id: "noah", handle: "@NoahX", seed: "Noah" },
];

const MIN_AMT = 50;
const MAX_AMT = 5000;
const STEP = 50;
const TICKS = 41;

function avatarUrl(seed) {
	return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
		seed
	)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfba`;
}

function AmountRuler({ value, onChange, isLight }) {
	const trackRef = useRef(null);
	const dragging = useRef(false);

	const ratio = (value - MIN_AMT) / (MAX_AMT - MIN_AMT);

	const setFromClientX = (clientX) => {
		const el = trackRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const t = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
		const raw = MIN_AMT + t * (MAX_AMT - MIN_AMT);
		const snapped = Math.round(raw / STEP) * STEP;
		onChange(Math.min(MAX_AMT, Math.max(MIN_AMT, snapped)));
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

	return (
		<div
			ref={trackRef}
			className="relative mx-auto h-12 w-full max-w-[280px] cursor-ew-resize touch-none select-none"
			onPointerDown={(e) => {
				dragging.current = true;
				e.currentTarget.setPointerCapture?.(e.pointerId);
				setFromClientX(e.clientX);
			}}
			role="slider"
			aria-valuemin={MIN_AMT}
			aria-valuemax={MAX_AMT}
			aria-valuenow={value}
			aria-label="Send amount"
			tabIndex={0}
			onKeyDown={(e) => {
				if (e.key === "ArrowRight") onChange(Math.min(MAX_AMT, value + STEP));
				if (e.key === "ArrowLeft") onChange(Math.max(MIN_AMT, value - STEP));
			}}
		>
			<div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-end justify-between">
				{Array.from({ length: TICKS }).map((_, i) => {
					const mid = (TICKS - 1) / 2;
					const dist = Math.abs(i - mid) / mid;
					const h = 8 + (1 - dist) * 18;
					const active = Math.abs(i / (TICKS - 1) - ratio) < 0.035;
					return (
						<span
							key={i}
							className={cn(
								"w-[2px] rounded-full transition-colors",
								active
									? isLight
										? "bg-zinc-900"
										: "bg-white"
									: isLight
										? "bg-zinc-300"
										: "bg-white/35"
							)}
							style={{ height: active ? 28 : h }}
						/>
					);
				})}
			</div>
			<div
				className={cn(
					"pointer-events-none absolute top-1/2 h-8 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
					isLight ? "bg-zinc-900" : "bg-white"
				)}
				style={{ left: `${ratio * 100}%` }}
			/>
		</div>
	);
}

function AvatarCarousel({ selectedId, onSelect, isLight }) {
	const scroller = useRef(null);

	useEffect(() => {
		const el = scroller.current;
		if (!el) return;
		const idx = CONTACTS.findIndex((c) => c.id === selectedId);
		const child = el.children[idx];
		if (child) {
			child.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
		}
	}, [selectedId]);

	return (
		<div
			ref={scroller}
			className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-10 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
		>
			{CONTACTS.map((c) => {
				const on = c.id === selectedId;
				return (
					<button
						key={c.id}
						type="button"
						onClick={() => onSelect(c.id)}
						className="snap-center shrink-0 outline-none"
					>
						<span
							className={cn(
								"block overflow-hidden rounded-full transition-all duration-200",
								on
									? "h-16 w-16 ring-[3px] ring-rose-500"
									: "h-12 w-12 opacity-55"
							)}
						>
							<img src={avatarUrl(c.seed)} alt="" className="h-full w-full object-cover" />
						</span>
					</button>
				);
			})}
		</div>
	);
}

/**
 * HeroPayDrawer — phone mockup, Pay BTC opens send drawer.
 * Avatar X carousel + amount ruler + confirm → infinite send animation.
 */
export default function HeroPayDrawer({ isLight = true, className }) {
	const [open, setOpen] = useState(false);
	const [sent, setSent] = useState(false);
	const [selectedId, setSelectedId] = useState(CONTACTS[0].id);
	const [amount, setAmount] = useState(1000);

	const selected = CONTACTS.find((c) => c.id === selectedId) || CONTACTS[0];

	const openDrawer = () => {
		setSent(false);
		setOpen(true);
	};

	const closeDrawer = () => {
		setOpen(false);
		setSent(false);
	};

	const confirm = () => setSent(true);

	return (
		<section
			className={cn("mx-auto flex w-full max-w-md flex-col items-center px-4 py-10 sm:py-14", className)}
			aria-label="Pay BTC drawer"
		>
			<div
				className={cn(
					"relative w-full max-w-[320px] overflow-hidden rounded-[2.4rem] border-[10px] shadow-2xl",
					isLight
						? "border-zinc-900 bg-zinc-100 shadow-zinc-400/30"
						: "border-zinc-800 bg-zinc-950 shadow-black/50"
				)}
				style={{ aspectRatio: "9 / 19.5" }}
			>
				{/* Status / home chrome */}
				<div
					className={cn(
						"relative flex h-full flex-col",
						isLight ? "bg-zinc-50 text-zinc-900" : "bg-black text-white"
					)}
				>
					<div className="flex items-center justify-between px-5 pt-4 text-[11px] font-medium opacity-60">
						<span>9:41</span>
						<span className="h-4 w-20 rounded-full bg-black/80" />
						<span>●●●</span>
					</div>

					<div className="flex flex-1 flex-col items-center justify-center gap-5 px-6">
						<img
							src={avatarUrl("WalletOwner")}
							alt=""
							className="h-16 w-16 rounded-full"
						/>
						<div className="text-center">
							<p className="text-3xl font-semibold tracking-tight">$50,234.02</p>
							<p className={cn("mt-1 text-sm", isLight ? "text-zinc-500" : "text-zinc-400")}>
								@ManasCodeXert
							</p>
						</div>

						<button
							type="button"
							onClick={openDrawer}
							className={cn(
								"mt-2 rounded-full px-6 py-2.5 text-sm font-semibold",
								isLight
									? "bg-zinc-900 text-white"
									: "bg-white text-zinc-900"
							)}
						>
							Pay BTC
						</button>
					</div>

					{/* Dimmer */}
					<AnimatePresence>
						{open ? (
							<motion.button
								type="button"
								aria-label="Close drawer"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="absolute inset-0 z-20 bg-black/45"
								onClick={closeDrawer}
							/>
						) : null}
					</AnimatePresence>

					{/* Bottom drawer */}
					<AnimatePresence>
						{open ? (
							<motion.div
								initial={{ y: "105%" }}
								animate={{ y: 0 }}
								exit={{ y: "105%" }}
								transition={{ type: "spring", stiffness: 320, damping: 32 }}
								className={cn(
									"absolute inset-x-0 bottom-0 z-30 rounded-t-[1.75rem] px-4 pb-6 pt-3 shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.5)]",
									isLight ? "bg-white text-zinc-900" : "bg-[#1c1c1e] text-white"
								)}
								onClick={(e) => e.stopPropagation()}
							>
								<div
									className={cn(
										"mx-auto mb-3 h-1 w-10 rounded-full",
										isLight ? "bg-zinc-300" : "bg-zinc-600"
									)}
								/>

								<AnimatePresence mode="wait" initial={false}>
									{sent ? (
										<motion.div
											key="sent"
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											exit={{ opacity: 0 }}
											className="flex min-h-[280px] flex-col items-center justify-center gap-4 py-6"
										>
											<motion.div
												className={cn(
													"flex h-20 w-20 items-center justify-center rounded-full",
													isLight ? "bg-zinc-900 text-white" : "bg-white text-zinc-900"
												)}
												animate={{
													y: [0, -10, 0],
													rotate: [0, -8, 8, 0],
													scale: [1, 1.06, 1],
												}}
												transition={{
													duration: 1.6,
													repeat: Infinity,
													ease: "easeInOut",
												}}
											>
												<Send className="h-8 w-8" />
											</motion.div>
											<p className="text-sm font-medium opacity-70">Sending…</p>
											<p className="text-lg font-semibold tabular-nums">
												${amount.toLocaleString()} → {selected.handle}
											</p>
											<button
												type="button"
												onClick={closeDrawer}
												className={cn(
													"mt-2 text-xs font-medium underline-offset-2 hover:underline",
													isLight ? "text-zinc-500" : "text-zinc-400"
												)}
											>
												Done
											</button>
										</motion.div>
									) : (
										<motion.div
											key="form"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
										>
											<p className="mb-4 text-center text-[15px] font-semibold tracking-tight">
												Send Amount
											</p>

											<AvatarCarousel
												selectedId={selectedId}
												onSelect={setSelectedId}
												isLight={isLight}
											/>
											<p
												className={cn(
													"mt-2 text-center text-sm",
													isLight ? "text-zinc-500" : "text-zinc-400"
												)}
											>
												{selected.handle}
											</p>

											<p className="mt-5 text-center text-4xl font-bold tracking-tight tabular-nums">
												${amount.toLocaleString()}
											</p>

											<div className="mt-4 px-1">
												<AmountRuler
													value={amount}
													onChange={setAmount}
													isLight={isLight}
												/>
											</div>

											<button
												type="button"
												onClick={confirm}
												className={cn(
													"mt-6 w-full rounded-full py-3.5 text-[15px] font-semibold",
													isLight
														? "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
														: "bg-[#2c2c2e] text-white hover:bg-[#3a3a3c]"
												)}
											>
												Confirm
											</button>
										</motion.div>
									)}
								</AnimatePresence>
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>
			</div>
		</section>
	);
}
