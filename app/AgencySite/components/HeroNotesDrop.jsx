import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const NOTES = [
	{
		id: "n1",
		num: "01",
		body: "Your components feel handmade — rare on the web.",
		icon: "star",
		hang: 28,
	},
	{
		id: "n2",
		num: "02",
		body: "I keep coming back just to scroll the demos. Quiet craft.",
		icon: null,
		hang: 48,
	},
	{
		id: "n3",
		num: "03",
		body: "Finally something that doesn’t look like every AI landing page.",
		icon: "globe",
		hang: 22,
	},
	{
		id: "n4",
		num: "04",
		body: "Dropped this link in our studio chat. Instant yes from design.",
		icon: null,
		hang: 56,
	},
	{
		id: "n5",
		num: "05",
		body: "The little interactions are the whole product. Love it.",
		icon: "heart",
		hang: 34,
	},
	{
		id: "n6",
		num: "06",
		body: "Thank you for making space for small ideas to land.",
		icon: "star",
		hang: 42,
	},
];

function Walker({ className }) {
	return (
		<svg viewBox="0 0 40 48" className={className} aria-hidden>
			{/* Hair */}
			<path d="M10 14 Q12 4 20 6 Q28 4 30 14" fill="#18181b" />
			{/* Head */}
			<circle cx="20" cy="16" r="9" fill="#fafafa" stroke="#18181b" strokeWidth="1.6" />
			{/* Glasses */}
			<circle cx="16" cy="16" r="3.2" fill="none" stroke="#18181b" strokeWidth="1.3" />
			<circle cx="24" cy="16" r="3.2" fill="none" stroke="#18181b" strokeWidth="1.3" />
			<path d="M19.2 16 H20.8" stroke="#18181b" strokeWidth="1.2" />
			{/* Smile */}
			<path d="M17 20 Q20 22.5 23 20" fill="none" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" />
			{/* Body */}
			<path d="M20 25 V36" stroke="#18181b" strokeWidth="1.8" strokeLinecap="round" />
			<path d="M20 28 L12 33" stroke="#18181b" strokeWidth="1.6" strokeLinecap="round" />
			<path d="M20 28 L28 33" stroke="#18181b" strokeWidth="1.6" strokeLinecap="round" />
			<path d="M20 36 L14 46" stroke="#18181b" strokeWidth="1.6" strokeLinecap="round" />
			<path d="M20 36 L26 46" stroke="#18181b" strokeWidth="1.6" strokeLinecap="round" />
		</svg>
	);
}

function NoteIcon({ type }) {
	if (type === "globe") {
		return (
			<svg width="28" height="28" viewBox="0 0 28 28" className="mx-auto mt-3 opacity-80" aria-hidden>
				<circle cx="14" cy="14" r="10" fill="none" stroke="#18181b" strokeWidth="1.4" />
				<path d="M4 14 H24 M14 4 V24" stroke="#18181b" strokeWidth="1.2" />
				<path d="M7 8 Q14 12 21 8 M7 20 Q14 16 21 20" fill="none" stroke="#18181b" strokeWidth="1.1" />
			</svg>
		);
	}
	if (type === "heart") {
		return (
			<svg width="24" height="22" viewBox="0 0 24 22" className="mx-auto mt-3 opacity-80" aria-hidden>
				<path
					d="M12 20 S2 12 2 7 A5 5 0 0 1 12 7 A5 5 0 0 1 22 7 C22 12 12 20 12 20 Z"
					fill="none"
					stroke="#18181b"
					strokeWidth="1.5"
				/>
			</svg>
		);
	}
	return (
		<svg width="22" height="22" viewBox="0 0 22 22" className="mx-auto mt-3 opacity-80" aria-hidden>
			<path
				d="M11 1 L13 8 L20 8 L14.5 12.5 L16.5 20 L11 15.5 L5.5 20 L7.5 12.5 L2 8 L9 8 Z"
				fill="none"
				stroke="#18181b"
				strokeWidth="1.4"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ConfettiBurst({ x, y, show }) {
	const bits = useMemo(
		() =>
			Array.from({ length: 18 }, (_, i) => ({
				id: i,
				dx: Math.cos((i / 18) * Math.PI * 2) * (40 + (i % 5) * 12),
				dy: Math.sin((i / 18) * Math.PI * 2) * (28 + (i % 4) * 10) - 20,
				rot: (i * 37) % 360,
				size: 4 + (i % 3) * 2,
				color: ["#18181b", "#f43f5e", "#fbbf24", "#38bdf8", "#a3e635"][i % 5],
			})),
		[]
	);

	return (
		<AnimatePresence>
			{show ? (
				<div className="pointer-events-none absolute z-30" style={{ left: x, top: y }}>
					{bits.map((b) => (
						<motion.span
							key={b.id}
							className="absolute rounded-[1px]"
							style={{
								width: b.size,
								height: b.size * 0.55,
								background: b.color,
								marginLeft: -b.size / 2,
								marginTop: -b.size / 2,
							}}
							initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
							animate={{
								x: b.dx,
								y: b.dy,
								opacity: 0,
								rotate: b.rot,
								scale: 0.4,
							}}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
						/>
					))}
				</div>
			) : null}
		</AnimatePresence>
	);
}

function StampNote({ note }) {
	return (
		<div
			className="relative w-[128px] bg-white px-3 pb-4 pt-3 font-mono text-[10px] leading-snug text-zinc-800 shadow-[3px_4px_0_rgba(24,24,27,0.12)] sm:w-[148px] sm:text-[11px]"
			style={{
				clipPath:
					"polygon(0% 4%, 4% 0%, 8% 4%, 12% 0%, 16% 4%, 20% 0%, 24% 4%, 28% 0%, 32% 4%, 36% 0%, 40% 4%, 44% 0%, 48% 4%, 52% 0%, 56% 4%, 60% 0%, 64% 4%, 68% 0%, 72% 4%, 76% 0%, 80% 4%, 84% 0%, 88% 4%, 92% 0%, 96% 4%, 100% 0%, 100% 4%, 96% 8%, 100% 12%, 96% 16%, 100% 20%, 96% 24%, 100% 28%, 96% 32%, 100% 36%, 96% 40%, 100% 44%, 96% 48%, 100% 52%, 96% 56%, 100% 60%, 96% 64%, 100% 68%, 96% 72%, 100% 76%, 96% 80%, 100% 84%, 96% 88%, 100% 92%, 96% 96%, 100% 100%, 96% 96%, 92% 100%, 88% 96%, 84% 100%, 80% 96%, 76% 100%, 72% 96%, 68% 100%, 64% 96%, 60% 100%, 56% 96%, 52% 100%, 48% 96%, 44% 100%, 40% 96%, 36% 100%, 32% 96%, 28% 100%, 24% 96%, 20% 100%, 16% 96%, 12% 100%, 8% 96%, 4% 100%, 0% 96%, 4% 92%, 0% 88%, 4% 84%, 0% 80%, 4% 76%, 0% 72%, 4% 68%, 0% 64%, 4% 60%, 0% 56%, 4% 52%, 0% 48%, 4% 44%, 0% 40%, 4% 36%, 0% 32%, 4% 28%, 0% 24%, 4% 20%, 0% 16%, 4% 12%, 0% 8%)",
			}}
		>
			<p className="text-[11px] font-bold tracking-wide">{note.num}</p>
			<p className="mt-2">{note.body}</p>
			{note.icon ? <NoteIcon type={note.icon} /> : null}
		</div>
	);
}

/**
 * HeroNotesDrop — walker moves on a string; scroll drops stamp notes with confetti.
 */
export default function HeroNotesDrop({ isLight = true, className }) {
	const sectionRef = useRef(null);
	const stageRef = useRef(null);
	const [dropped, setDropped] = useState(0);
	const [burst, setBurst] = useState(null);
	const prevDropped = useRef(0);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	const smooth = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 28,
		restDelta: 0.001,
	});

	const walkerX = useTransform(smooth, [0, 1], ["4%", "92%"]);

	useEffect(() => {
		const unsub = smooth.onChange((v) => {
			const count =
				v >= 0.99
					? NOTES.length
					: Math.min(NOTES.length, Math.floor(v * NOTES.length + 0.001));
			setDropped(count);
		});
		return unsub;
	}, [smooth]);

	useEffect(() => {
		if (dropped > prevDropped.current && dropped > 0) {
			const note = NOTES[dropped - 1];
			const stage = stageRef.current;
			if (stage && note) {
				const rect = stage.getBoundingClientRect();
				const pct = (dropped - 0.5) / NOTES.length;
				setBurst({
					id: `${note.id}-${Date.now()}`,
					x: pct * rect.width,
					y: rect.height * 0.38,
				});
				window.setTimeout(() => setBurst(null), 900);
			}
		}
		prevDropped.current = dropped;
	}, [dropped]);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: "280vh" }}
			aria-label="Notes drop clothesline"
		>
			<div
				ref={stageRef}
				className={cn(
					"sticky top-0 h-screen overflow-hidden",
					isLight ? "bg-[#f7f7f5] text-zinc-900" : "bg-zinc-950 text-zinc-100"
				)}
			>
				{/* Grid paper */}
				<div
					className="pointer-events-none absolute inset-0 opacity-50"
					style={{
						backgroundImage: isLight
							? "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)"
							: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
						backgroundSize: "36px 36px",
					}}
					aria-hidden
				/>

				<div className="relative z-10 flex h-full flex-col px-5 pt-8 sm:px-10">
					<div className="flex flex-wrap items-start justify-between gap-4">
						<p
							className={cn(
								"max-w-md font-mono text-[11px] leading-relaxed sm:text-xs",
								isLight ? "text-zinc-500" : "text-zinc-400"
							)}
						>
							Thank you for being here, for encouraging my curiosity, and for giving
							my small ideas a place to land.
						</p>
						<p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] tabular-nums">
							Notes dropped{" "}
							<span className={isLight ? "text-zinc-900" : "text-white"}>
								{String(dropped).padStart(2, "0")} / {String(NOTES.length).padStart(2, "0")}
							</span>
						</p>
					</div>

					<div className="relative mt-[18vh] flex-1">
						{/* String */}
						<svg
							className="pointer-events-none absolute left-0 right-0 top-[12%] z-10 h-8 w-full"
							viewBox="0 0 1000 40"
							preserveAspectRatio="none"
							aria-hidden
						>
							<path
								d="M0 14 Q 250 8 500 18 T 1000 12"
								fill="none"
								stroke={isLight ? "#18181b" : "#e4e4e7"}
								strokeWidth="2.2"
							/>
						</svg>

						{/* Pegs — only where a banner has dropped */}
						{NOTES.map((_, i) => {
							if (dropped <= i) return null;
							const left = `${((i + 0.5) / NOTES.length) * 100}%`;
							return (
								<span
									key={`peg-${i}`}
									className={cn(
										"absolute top-[12%] z-20 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full",
										isLight ? "bg-zinc-900" : "bg-zinc-100"
									)}
									style={{ left }}
								/>
							);
						})}

						{/* Walker */}
						<motion.div
							style={{ left: walkerX }}
							className="absolute top-[12%] z-30 -translate-x-1/2 -translate-y-[88%]"
						>
							<Walker className="h-12 w-10 sm:h-14 sm:w-12" />
						</motion.div>

						{/* Notes */}
						{NOTES.map((note, i) => {
							const left = `${((i + 0.5) / NOTES.length) * 100}%`;
							const show = dropped > i;
							return (
								<div
									key={note.id}
									className="absolute top-[12%] z-20 -translate-x-1/2"
									style={{ left }}
								>
									<AnimatePresence>
										{show ? (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: note.hang, opacity: 1 }}
												transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
												className="mx-auto w-px overflow-hidden"
												style={{ background: isLight ? "#18181b" : "#e4e4e7" }}
											/>
										) : null}
									</AnimatePresence>
									<AnimatePresence>
										{show ? (
											<motion.div
												initial={{ y: -24, opacity: 0, rotate: -6, scale: 0.85 }}
												animate={{ y: 0, opacity: 1, rotate: i % 2 === 0 ? -1.5 : 2, scale: 1 }}
												transition={{
													type: "spring",
													stiffness: 280,
													damping: 16,
													mass: 0.7,
													delay: 0.12,
												}}
												whileHover={{ y: -6, rotate: 0, transition: { type: "spring", stiffness: 400, damping: 18 } }}
												className="origin-top"
											>
												{/* Eyelet */}
												<span
													className={cn(
														"mx-auto mb-1 block h-2.5 w-2.5 rounded-full border-2",
														isLight ? "border-zinc-900 bg-white" : "border-zinc-100 bg-zinc-900"
													)}
												/>
												<StampNote note={note} />
											</motion.div>
										) : null}
									</AnimatePresence>
								</div>
							);
						})}

						{burst ? <ConfettiBurst key={burst.id} x={burst.x} y={burst.y} show /> : null}
					</div>

					<p
						className={cn(
							"pb-8 text-center font-mono text-[10px] uppercase tracking-[0.18em]",
							isLight ? "text-zinc-400" : "text-zinc-500"
						)}
					>
						Scroll to walk the line
					</p>
				</div>
			</div>
		</section>
	);
}
