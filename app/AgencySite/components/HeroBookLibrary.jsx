import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Cool blue / cream / navy spines — matches newsletter-archive look. */
const SPINE_COLORS = [
	{ bg: "#071833", ink: "#e8eef8", edge: "#040e1f", pages: "#ebe6dc" },
	{ bg: "#1a4fd4", ink: "#f4f7ff", edge: "#0f3399", pages: "#f2eee6" },
	{ bg: "#7eb6f0", ink: "#0b1f4a", edge: "#4a8fd4", pages: "#f7f4ee" },
	{ bg: "#f4f1ea", ink: "#0b1f4a", edge: "#d4cfc4", pages: "#fffdf8" },
	{ bg: "#0a0a0a", ink: "#f4f1ea", edge: "#1c1c1c", pages: "#e8e4da" },
	{ bg: "#143a94", ink: "#eef3ff", edge: "#0c2668", pages: "#efebe3" },
	{ bg: "#a8c8ec", ink: "#0b1f4a", edge: "#6f9dcf", pages: "#f8f5ef" },
	{ bg: "#f7f5f0", ink: "#122047", edge: "#ddd8ce", pages: "#ffffff" },
	{ bg: "#2563eb", ink: "#eff6ff", edge: "#1d4ed8", pages: "#f1ede5" },
	{ bg: "#0f274f", ink: "#dbe7f8", edge: "#08162e", pages: "#e9e4da" },
];

const MARKS = ["grid", "star", "bars", "dot", "compass", "slash"];

const BOOK_TITLES = [
	["Close your laptop, Claude can take it from here", "JUN 12, 2024"],
	["My whole AI setup, on your desk in one afternoon", "JUN 5, 2024"],
	["I automated my Meta ads in 20 minutes", "MAY 29, 2024"],
	["Claude now handles my email triage", "MAY 22, 2024"],
	["1 broad agent beats 8 specialist ones", "MAY 22, 2024"],
	["Ship a research brief before standup", "MAY 15, 2024"],
	["The weekly ops loop I actually stick to", "MAY 8, 2024"],
	["Prompt libraries that don't rot", "MAY 1, 2024"],
	["From messy Drive to a calm archive", "APR 24, 2024"],
	["What I measure when AI starts writing", "APR 17, 2024"],
	["A founder playbook for tool sprawl", "APR 10, 2024"],
	["Less dashboard, more decisions", "APR 3, 2024"],
	["Voice notes that become SOPs overnight", "MAR 27, 2024"],
	["Stop rewriting the same brief every Monday", "MAR 20, 2024"],
	["How we staffed a content system with one agent", "MAR 13, 2024"],
	["The calendar that finally stuck", "MAR 6, 2024"],
	["Client decks without the Sunday scramble", "FEB 28, 2024"],
	["When to trust the model with money numbers", "FEB 21, 2024"],
	["A quieter CRM for people who hate CRMs", "FEB 14, 2024"],
	["Inbox zero is a trap — here's the loop instead", "FEB 7, 2024"],
	["Design systems that agents can actually use", "JAN 31, 2024"],
	["Shipping the boring admin layer first", "JAN 24, 2024"],
	["Why I keep templates boring on purpose", "JAN 17, 2024"],
	["One workspace for budget → PDF → sign", "JAN 10, 2024"],
	["Bank statements without five exports", "JAN 3, 2024"],
	["PIN links beat shared Drive chaos", "DEC 27, 2023"],
	["Teach the assistant your payees once", "DEC 20, 2023"],
	["Tax estimates with bracket tables, not vibes", "DEC 13, 2023"],
	["The shelf of every edition we kept", "DEC 6, 2023"],
	["What changed after twelve template sales", "NOV 29, 2023"],
	["Build the vertical, rent the skeleton", "NOV 22, 2023"],
	["A calm interface for noisy workflows", "NOV 15, 2023"],
];

const DEFAULT_BOOKS = BOOK_TITLES.map(([title, date], i) => ({
	id: `b${i + 1}`,
	title,
	date,
	href: "#",
	mark: MARKS[i % MARKS.length],
}));

function SpineMark({ type, color }) {
	const stroke = color;
	if (type === "star") {
		return (
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
				<path
					d="M7 1.5 L8.2 5.2 L12 5.4 L9 7.9 L9.9 11.6 L7 9.6 L4.1 11.6 L5 7.9 L2 5.4 L5.8 5.2 Z"
					stroke={stroke}
					strokeWidth="1.1"
					strokeLinejoin="round"
				/>
			</svg>
		);
	}
	if (type === "bars") {
		return (
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
				<path d="M3 10 V6 M7 10 V3.5 M11 10 V7" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
			</svg>
		);
	}
	if (type === "dot") {
		return (
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
				<circle cx="7" cy="7" r="3.2" stroke={stroke} strokeWidth="1.2" />
				<circle cx="7" cy="7" r="1" fill={stroke} />
			</svg>
		);
	}
	if (type === "compass") {
		return (
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
				<path d="M7 1.8 V12.2 M1.8 7 H12.2" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
				<path d="M7 3.2 L9.4 7 L7 10.8 L4.6 7 Z" stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
			</svg>
		);
	}
	if (type === "slash") {
		return (
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
				<circle cx="7" cy="7" r="4.2" stroke={stroke} strokeWidth="1.2" />
				<path d="M4.2 9.8 L9.8 4.2" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
			</svg>
		);
	}
	return (
		<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
			{[3, 7, 11].map((x) =>
				[3, 7, 11].map((y) => (
					<circle key={`${x}-${y}`} cx={x} cy={y} r="1" fill={stroke} />
				))
			)}
		</svg>
	);
}

/**
 * True CSS 3D book: spine + pages + cover faces with preserve-3d.
 */
function BookSpine({ book, palette, width, depth, height, hovered, onHover, rotateY }) {
	const short =
		book.title.length > 36 ? `${book.title.slice(0, 34).trim()}…` : book.title;
	const halfW = width / 2;
	const halfD = depth / 2;

	return (
		<a
			href={book.href || "#"}
			className="relative shrink-0 outline-none"
			style={{
				width,
				height,
				zIndex: hovered ? 40 : 1,
				perspective: 900,
			}}
			onMouseEnter={() => onHover(book.id)}
			onMouseLeave={() => onHover(null)}
			onFocus={() => onHover(book.id)}
			onBlur={() => onHover(null)}
			aria-label={`${book.title} — ${book.date}`}
		>
			<AnimatePresence>
				{hovered ? (
					<motion.div
						initial={{ opacity: 0, y: 10, x: "-50%" }}
						animate={{ opacity: 1, y: 0, x: "-50%" }}
						exit={{ opacity: 0, y: 8, x: "-50%" }}
						transition={{ duration: 0.18 }}
						className="pointer-events-none absolute left-1/2 top-[-4.5rem] z-50 w-max max-w-[230px] rounded-md bg-zinc-950 px-3 py-2 text-left shadow-xl"
					>
						<p className="text-[12px] font-medium leading-snug text-white">{book.title}</p>
						<p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
							{book.date}
						</p>
					</motion.div>
				) : null}
			</AnimatePresence>

			{/* Scene: perspective parent already on <a>; this is the 3D object */}
			<motion.div
				className="relative h-full w-full"
				animate={{
					y: hovered ? -18 : 0,
					rotateY: hovered ? rotateY * 0.25 : rotateY,
					z: hovered ? 42 : 0,
				}}
				transition={{ type: "spring", stiffness: 280, damping: 24 }}
				style={{
					transformStyle: "preserve-3d",
					transformOrigin: "center center",
				}}
			>
				{/* Spine (front) */}
				<div
					className="absolute inset-0 flex flex-col overflow-hidden"
					style={{
						width,
						height,
						transform: `translateZ(${halfD}px)`,
						background: `linear-gradient(90deg, ${palette.edge} 0%, ${palette.bg} 12%, ${palette.bg} 86%, rgba(255,255,255,0.14) 94%, ${palette.edge} 100%)`,
						boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.2)",
						backfaceVisibility: "hidden",
					}}
				>
					<div
						className="h-[2px] w-full shrink-0 opacity-60"
						style={{
							background:
								"linear-gradient(90deg, transparent, rgba(255,255,255,0.45), transparent)",
						}}
					/>
					<div className="flex min-h-0 flex-1 flex-col items-center justify-between px-[16%] pb-4 pt-5">
						<p
							className="max-h-[74%] overflow-hidden text-center text-[10px] font-semibold leading-tight tracking-wide sm:text-[11px]"
							style={{
								color: palette.ink,
								writingMode: "vertical-rl",
								transform: "rotate(180deg)",
								textOrientation: "mixed",
							}}
						>
							{short}
						</p>
						<div className="mt-3 opacity-85">
							<SpineMark type={book.mark || "grid"} color={palette.ink} />
						</div>
					</div>
				</div>

				{/* Pages (right face) */}
				<div
					aria-hidden
					className="absolute"
					style={{
						width: depth,
						height,
						left: (width - depth) / 2,
						top: 0,
						transform: `rotateY(90deg) translateZ(${halfW}px)`,
						background: `repeating-linear-gradient(
							90deg,
							${palette.pages} 0px,
							${palette.pages} 2px,
							#d4cec2 2px,
							#d4cec2 3px
						)`,
						boxShadow: "inset 3px 0 8px rgba(0,0,0,0.12)",
						backfaceVisibility: "hidden",
					}}
				/>

				{/* Left board edge */}
				<div
					aria-hidden
					className="absolute"
					style={{
						width: depth,
						height,
						left: (width - depth) / 2,
						top: 0,
						transform: `rotateY(-90deg) translateZ(${halfW}px)`,
						background: `linear-gradient(180deg, ${palette.edge}, ${palette.bg})`,
						backfaceVisibility: "hidden",
					}}
				/>

				{/* Top face */}
				<div
					aria-hidden
					className="absolute"
					style={{
						width,
						height: depth,
						left: 0,
						top: (height - depth) / 2,
						transform: `rotateX(90deg) translateZ(${height / 2}px)`,
						background: `linear-gradient(90deg, ${palette.edge}, ${palette.pages} 35%, ${palette.pages})`,
						backfaceVisibility: "hidden",
					}}
				/>

				{/* Bottom face */}
				<div
					aria-hidden
					className="absolute"
					style={{
						width,
						height: depth,
						left: 0,
						top: (height - depth) / 2,
						transform: `rotateX(-90deg) translateZ(${height / 2}px)`,
						background: `linear-gradient(90deg, ${palette.edge}, #cfc8bb)`,
						backfaceVisibility: "hidden",
					}}
				/>

				{/* Back cover */}
				<div
					aria-hidden
					className="absolute inset-0"
					style={{
						width,
						height,
						transform: `rotateY(180deg) translateZ(${halfD}px)`,
						background: palette.edge,
						backfaceVisibility: "hidden",
					}}
				/>

				{/* Floor contact shadow */}
				<div
					aria-hidden
					className="pointer-events-none absolute left-1/2 rounded-full bg-zinc-900/30 blur-[5px]"
					style={{
						bottom: -10,
						width: width + depth,
						height: 10,
						marginLeft: -(width + depth) / 2,
						opacity: hovered ? 0.55 : 0.32,
					}}
				/>
			</motion.div>
		</a>
	);
}

/**
 * HeroBookLibrary — CSS 3D newsletter spines on a shelf.
 * Vertical scroll drives horizontal (-x); books fan with rotateY toward center.
 */
export default function HeroBookLibrary({
	books = DEFAULT_BOOKS,
	isLight = true,
	className,
	title = "Newsletter Archive",
	subtitle = "Every edition of AI with Remy. Practical workflows, tools, and playbooks for founders and business leaders.",
	scrollHeightVh = 340,
}) {
	const items = useMemo(() => (books.length ? books : DEFAULT_BOOKS), [books]);
	const sectionRef = useRef(null);
	const trackRef = useRef(null);
	const [travelX, setTravelX] = useState(0);
	const [hoveredId, setHoveredId] = useState(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	const x = useTransform(smoothProgress, [0, 1], [0, -travelX]);

	useEffect(() => {
		const measure = () => {
			const track = trackRef.current;
			if (!track) return;
			const overflow = Math.max(track.scrollWidth - window.innerWidth, 0);
			setTravelX(overflow);
		};
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	}, [items.length]);

	const sizes = useMemo(
		() =>
			items.map((_, i) => {
				const width = 38 + ((i * 19) % 28); // 38–65
				const depth = 14 + ((i * 11) % 12); // 14–25 page thickness
				const height = 340 + ((i * 23) % 90); // varied heights
				return { width, depth, height };
			}),
		[items]
	);

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label={title}
		>
			<div
				className={cn(
					"sticky top-0 flex h-screen flex-col justify-center overflow-hidden",
					isLight ? "bg-[#fbfbfd]" : "bg-zinc-950"
				)}
			>
				<div className="relative z-10 mx-auto max-w-2xl px-6 text-center sm:px-10">
					<h2
						className={cn(
							"text-3xl font-bold tracking-tight sm:text-4xl",
							isLight ? "text-zinc-950" : "text-white"
						)}
					>
						{title}
					</h2>
					<p
						className={cn(
							"mx-auto mt-3 max-w-xl text-[15px] leading-relaxed sm:text-base",
							isLight ? "text-zinc-500" : "text-zinc-400"
						)}
					>
						{subtitle}
					</p>
				</div>

				<div className="relative mt-8 w-full sm:mt-12">
					{/* Shelf plane with slight 3D tilt */}
					<div
						aria-hidden
						className="pointer-events-none absolute inset-x-0 bottom-[8%] h-[48%]"
						style={{
							background: isLight
								? "linear-gradient(180deg, transparent 0%, rgba(226,232,240,0.4) 40%, rgba(186,198,214,0.55) 100%)"
								: "linear-gradient(180deg, transparent 0%, rgba(39,39,42,0.55) 50%, rgba(24,24,27,0.9) 100%)",
							transform: "perspective(900px) rotateX(12deg)",
							transformOrigin: "center bottom",
						}}
					/>

					<div
						className="relative overflow-hidden pb-10 pt-20"
						style={{ perspective: "1600px", perspectiveOrigin: "50% 55%" }}
					>
						<motion.div
							ref={trackRef}
							style={{
								x,
								transformStyle: "preserve-3d",
							}}
							className="flex w-max flex-row items-end gap-[2px] px-[10vw] sm:gap-[3px] sm:px-[14vw]"
						>
							{items.map((book, index) => {
								const palette = SPINE_COLORS[index % SPINE_COLORS.length];
								const mid = (items.length - 1) / 2;
								/* Fan toward center — stronger on the wings */
								const t = (index - mid) / Math.max(mid, 1);
								const rotateY = t * -22;
								const { width, depth, height } = sizes[index];
								return (
									<BookSpine
										key={book.id || index}
										book={book}
										palette={palette}
										width={width}
										depth={depth}
										height={height}
										hovered={hoveredId === book.id}
										onHover={setHoveredId}
										rotateY={rotateY}
									/>
								);
							})}
						</motion.div>
					</div>

					<div
						aria-hidden
						className={cn(
							"mx-auto h-[4px] w-[min(94vw,1200px)] rounded-full",
							isLight
								? "bg-gradient-to-r from-transparent via-zinc-300 to-transparent shadow-[0_12px_30px_rgba(15,23,42,0.1)]"
								: "bg-gradient-to-r from-transparent via-zinc-600 to-transparent"
						)}
					/>
				</div>

				<p
					className={cn(
						"mt-5 text-center text-[11px] font-medium uppercase tracking-[0.18em]",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					Scroll to browse · Hover a spine
				</p>
			</div>
		</section>
	);
}
