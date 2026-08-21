import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Editorial glossary entries — each maps to one vertical rail cell (L then R).
 */
const ENTRIES = [
	{
		id: "noctivert",
		word: "noctivert",
		pos: "v",
		prev: null,
		body: "to turn toward the night as if it were a doorway — leaving the day unfinished on purpose.",
	},
	{
		id: "wintern",
		word: "wintern",
		pos: "v",
		prev: "noctivert",
		body: "to experience the disorienting compression of time during winter evenings, when darkness arrives prematurely and skews the perception of late hours.",
	},
	{
		id: "duskrift",
		word: "duskrift",
		pos: "n",
		prev: "wintern",
		body: "the thin seam between afternoon and evening where plans soften and the clock feels optional.",
	},
	{
		id: "hourfold",
		word: "hourfold",
		pos: "v",
		prev: "duskrift",
		body: "to tuck one hour inside another — a meeting that swallows lunch, a nap that eats an evening.",
	},
	{
		id: "stillwake",
		word: "stillwake",
		pos: "n",
		prev: "hourfold",
		body: "the quiet alertness after midnight when the house has gone soft and thought becomes louder than sound.",
	},
	{
		id: "latemark",
		word: "latemark",
		pos: "n",
		prev: "stillwake",
		body: "a private timestamp you keep for yourself — the real moment something ended, not the one on the calendar.",
	},
	{
		id: "tidewait",
		word: "tidewait",
		pos: "v",
		prev: "latemark",
		body: "to pause without impatience, as if time were water that will return on its own schedule.",
	},
	{
		id: "yearslip",
		word: "yearslip",
		pos: "n",
		prev: "tidewait",
		body: "the sudden feeling that twelve months passed in a hallway you barely remember walking.",
	},
	{
		id: "morrowhue",
		word: "morrowhue",
		pos: "n",
		prev: "yearslip",
		body: "the color of almost-morning — blue-grey light that promises a day before it arrives.",
	},
	{
		id: "clockmelt",
		word: "clockmelt",
		pos: "v",
		prev: "morrowhue",
		body: "to lose the sharp edges of minutes while reading, walking, or talking with someone who matters.",
	},
	{
		id: "echoeve",
		word: "echoeve",
		pos: "n",
		prev: "clockmelt",
		body: "an evening that repeats an earlier one so closely you check the date twice.",
	},
	{
		id: "slownoon",
		word: "slownoon",
		pos: "n",
		prev: "echoeve",
		body: "midday stretched thin by heat or boredom until an hour feels like a season.",
	},
	{
		id: "farelight",
		word: "farelight",
		pos: "n",
		prev: "slownoon",
		body: "the last useful light of the day — when finishing anything feels both urgent and gentle.",
	},
	{
		id: "aftercount",
		word: "aftercount",
		pos: "v",
		prev: "farelight",
		body: "to measure a life in afters: after the call, after the move, after the quiet returned.",
	},
	{
		id: "rimtime",
		word: "rimtime",
		pos: "n",
		prev: "aftercount",
		body: "time spent on the edge of a decision — neither beginning nor ending, just circling.",
	},
	{
		id: "softspan",
		word: "softspan",
		pos: "n",
		prev: "rimtime",
		body: "a stretch of days with no sharp memory, only texture — coffee, weather, and unfinished sentences.",
	},
	{
		id: "dawnborrow",
		word: "dawnborrow",
		pos: "v",
		prev: "softspan",
		body: "to take clarity from early morning and spend it before noon is ready.",
	},
	{
		id: "duskledger",
		word: "duskledger",
		pos: "n",
		prev: "dawnborrow",
		body: "the mental list that appears at twilight — what you did, what you meant to do, what can wait.",
	},
	{
		id: "pausegrain",
		word: "pausegrain",
		pos: "n",
		prev: "duskledger",
		body: "the finest unit of rest: a breath, a blink, a second that refuses to be productive.",
	},
	{
		id: "longminute",
		word: "longminute",
		pos: "n",
		prev: "pausegrain",
		body: "a minute that dilates under worry or wonder until it holds an entire weather system.",
	},
	{
		id: "returntick",
		word: "returntick",
		pos: "v",
		prev: "longminute",
		body: "to come back to a thought on schedule, as if the mind kept its own appointment book.",
	},
	{
		id: "greyhour",
		word: "greyhour",
		pos: "n",
		prev: "returntick",
		body: "the hour without a name between late and early — neither night nor morning, only in-between.",
	},
	{
		id: "keepsake",
		word: "keepsake",
		pos: "n",
		prev: "greyhour",
		body: "a moment you store on purpose so the rest of the week has something warm to lean on.",
	},
	{
		id: "unclock",
		word: "unclock",
		pos: "v",
		prev: "keepsake",
		body: "to step outside measured time for a while — no alarms, no agenda, only attention.",
	},
	{
		id: "storydusk",
		word: "storydusk",
		pos: "n",
		prev: "unclock",
		body: "the hour best for telling something true — when the room softens and listening comes easy.",
	},
	{
		id: "finalight",
		word: "finalight",
		pos: "n",
		prev: "storydusk",
		body: "the last word in a season of waiting — when the page turns and the glossary begins again.",
	},
	{
		id: "inkwait",
		word: "inkwait",
		pos: "v",
		prev: "finalight",
		body: "to hold a thought until the pen catches up — the pause between knowing and writing.",
	},
	{
		id: "loomhour",
		word: "loomhour",
		pos: "n",
		prev: "inkwait",
		body: "an hour that gathers at the edge of the day, thicker than the ones before it.",
	},
	{
		id: "softbell",
		word: "softbell",
		pos: "n",
		prev: "loomhour",
		body: "a reminder that arrives without urgency — more invitation than alarm.",
	},
	{
		id: "driftfold",
		word: "driftfold",
		pos: "v",
		prev: "softbell",
		body: "to let one afternoon crease into the next until the seam is almost invisible.",
	},
	{
		id: "amberrest",
		word: "amberrest",
		pos: "n",
		prev: "driftfold",
		body: "the warm stillness after work when the room glows and nothing needs naming yet.",
	},
	{
		id: "pagewind",
		word: "pagewind",
		pos: "n",
		prev: "amberrest",
		body: "the small draft that turns a corner of paper — a reminder that stories want air.",
	},
	{
		id: "quietspan",
		word: "quietspan",
		pos: "n",
		prev: "pagewind",
		body: "a stretch of days with no announcement — only coffee, weather, and unfinished sentences.",
	},
	{
		id: "rethread",
		word: "rethread",
		pos: "v",
		prev: "quietspan",
		body: "to pick up a conversation weeks later as if the needle never left the cloth.",
	},
];

const BG = "#f7f5f0";
const INK = "#111111";
const MUTED = "#9a9590";
const ACCENT = "#c45c4a";
const HOVER = "#ebe6dc";
const ACTIVE_CELL = "#e4ddd0";
const CURTAIN = "#e8e2d6";

const SNAP = { duration: 0.2, ease: [0.22, 1, 0.36, 1] };
const CELL_W = 12; /* every rail cell same slim width */

function Rail({ items, startIndex, activeIndex, onSelect, side }) {
	if (!items.length) return null;

	return (
		<div
			className="flex h-full min-h-0 w-full overflow-hidden"
			aria-label={`${side} glossary rail`}
		>
			{items.map((entry, i) => {
				const index = startIndex + i;
				const active = index === activeIndex;
				const dist = Math.abs(index - activeIndex);
				const near = dist === 1;

				return (
					<motion.button
						key={entry.id}
						layout
						layoutId={`rail-cell-${entry.id}`}
						type="button"
						title={entry.word}
						aria-label={`Open ${entry.word}`}
						aria-pressed={active}
						onClick={() => onSelect(index)}
						className={cn(
							"group relative h-full shrink-0 overflow-hidden border-r border-black/80 outline-none",
							side === "left" && i === 0 && "border-l border-black/80"
						)}
						style={{ width: CELL_W, minWidth: CELL_W }}
						initial={false}
						transition={{
							layout: SNAP,
							backgroundColor: SNAP,
						}}
						whileHover={{ backgroundColor: active ? ACTIVE_CELL : HOVER }}
						animate={{
							backgroundColor: active ? ACTIVE_CELL : "rgba(0,0,0,0)",
						}}
					>
						<motion.span
							aria-hidden
							className="pointer-events-none absolute inset-0 origin-top"
							style={{ background: CURTAIN }}
							initial={false}
							animate={{
								scaleY: active ? 1 : near ? 0.35 : 0,
								opacity: active ? 1 : near ? 0.45 : 0,
							}}
							transition={SNAP}
						/>

						<motion.span
							aria-hidden
							className="pointer-events-none absolute inset-0 origin-bottom"
							style={{ background: "rgba(196, 92, 74, 0.06)" }}
							initial={false}
							animate={{
								scaleY: active ? 0.2 : 0,
								opacity: active ? 1 : 0,
							}}
							transition={SNAP}
						/>

						<span
							className="pointer-events-none absolute inset-x-0 bottom-3 mx-auto hidden w-[1px] bg-black/35 sm:block"
							style={{
								height: active ? "30%" : "10%",
								opacity: active || near ? 0.7 : 0,
								transition: "height 0.18s ease, opacity 0.12s ease",
							}}
						/>
					</motion.button>
				);
			})}
		</div>
	);
}

function StoryPanel({ entry }) {
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={entry.id}
				initial={{ opacity: 0, y: 6 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -4 }}
				transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
				className="mx-auto w-fit max-w-xl px-6 text-center sm:px-10"
			>
				{entry.prev ? (
					<p
						className="font-serif text-[13px] italic tracking-wide sm:text-sm"
						style={{ color: MUTED }}
					>
						{entry.prev}
					</p>
				) : (
					<p className="h-5" />
				)}

				<h2
					className="mt-5 font-serif text-[clamp(2.75rem,7vw,4.75rem)] font-semibold leading-none tracking-tight"
					style={{ color: INK }}
				>
					{entry.word}
					<span
						className="ml-1 align-super font-serif text-[0.38em] font-normal italic"
						style={{ color: ACCENT }}
					>
						{entry.pos}
					</span>
				</h2>

				<p
					className="mx-auto mt-8 max-w-md text-left font-serif text-[15px] leading-relaxed sm:text-[17px] sm:leading-[1.65]"
					style={{ color: INK }}
				>
					{entry.body}
				</p>
			</motion.div>
		</AnimatePresence>
	);
}

/**
 * HeroTimeGlossary — editorial glossary of time.
 * Left/right vertical rails open story parts on click; bottom marker + window scroll sync active entry.
 */
export default function HeroTimeGlossary({
	isLight = true,
	className,
	scrollHeightVh = 420,
}) {
	const sectionRef = useRef(null);
	const lockRef = useRef(false);
	const [activeIndex, setActiveIndex] = useState(1); /* start on “wintern” */
	const [markerX, setMarkerX] = useState(0);

	const count = ENTRIES.length;
	const entry = ENTRIES[activeIndex] || ENTRIES[0];

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	/* Snappy scroll sync — less lag */
	const smooth = useSpring(scrollYProgress, {
		stiffness: 220,
		damping: 32,
		restDelta: 0.001,
	});

	const setActive = (idx) => {
		setActiveIndex(idx);
	};

	useEffect(() => {
		const unsub = smooth.onChange((p) => {
			const t = Math.max(0, Math.min(1, p));
			setMarkerX(t);
			if (lockRef.current) return;
			const idx = Math.min(count - 1, Math.max(0, Math.round(t * (count - 1))));
			setActive(idx);
		});
		return unsub;
	}, [smooth, count]);

	const scrollToIndex = (index) => {
		const el = sectionRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const absoluteTop = window.scrollY + rect.top;
		const travel = Math.max(el.offsetHeight - window.innerHeight, 0);
		const target = absoluteTop + (index / Math.max(count - 1, 1)) * travel;
		lockRef.current = true;
		setActive(index);
		setMarkerX(index / Math.max(count - 1, 1));
		window.scrollTo({ top: target, behavior: "smooth" });
		window.setTimeout(() => {
			lockRef.current = false;
		}, 320);
	};

	const pageBg = isLight ? BG : "#0c0c0c";
	const ink = isLight ? INK : "#f5f5f0";

	/* Start → 1 box left, rest right. End → all boxes left, none right. */
	const leftItems = ENTRIES.slice(0, activeIndex + 1);
	const rightItems = ENTRIES.slice(activeIndex + 1);
	const leftCount = leftItems.length;
	const rightCount = rightItems.length;
	const leftWidth = leftCount * CELL_W;
	const rightWidth = rightCount * CELL_W;

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Incomplete glossary of time"
		>
			<div
				className="sticky top-0 flex h-screen flex-col overflow-hidden"
				style={{ background: pageBg, color: ink }}
			>
				<div className="relative flex min-h-0 flex-1">
					<motion.div
						className="hidden h-full min-w-0 sm:block"
						layout
						animate={{
							flexGrow: 0,
							flexShrink: 0,
							width: leftWidth,
						}}
						transition={SNAP}
					>
						<Rail
							items={leftItems}
							startIndex={0}
							activeIndex={activeIndex}
							onSelect={scrollToIndex}
							side="left"
						/>
					</motion.div>

					<div className="flex min-w-0 flex-1 flex-col items-center">
						<div className="flex w-full gap-1 overflow-x-auto px-3 py-3 sm:hidden">
							{ENTRIES.map((e, i) => (
								<button
									key={e.id}
									type="button"
									onClick={() => scrollToIndex(i)}
									className="shrink-0 border border-black/70 px-2 py-1 font-serif text-[11px] transition-colors"
									style={{
										background: i === activeIndex ? ACTIVE_CELL : "transparent",
									}}
								>
									{e.word}
								</button>
							))}
						</div>

						<div className="flex w-fit max-w-full flex-1 items-center justify-center py-10">
							<StoryPanel entry={entry} />
						</div>
					</div>

					{rightCount > 0 ? (
						<motion.div
							className="hidden h-full min-w-0 sm:block"
							layout
							initial={false}
							animate={{
								flexGrow: 0,
								flexShrink: 0,
								width: rightWidth,
							}}
							transition={SNAP}
						>
							<Rail
								items={rightItems}
								startIndex={activeIndex + 1}
								activeIndex={activeIndex}
								onSelect={scrollToIndex}
								side="right"
							/>
						</motion.div>
					) : null}
				</div>

				<div className="relative mx-auto w-full max-w-[560px] px-6 pb-6 pt-2">
					<div className="relative h-4 w-full">
						<div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black" />
						<div
							className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-black transition-[left] duration-100 ease-out"
							style={{ left: `${markerX * 100}%` }}
							aria-hidden
						/>
					</div>
					<p
						className="mt-3 text-center font-serif text-[11px] tracking-[0.18em]"
						style={{ color: MUTED }}
					>
						{String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
					</p>
				</div>
			</div>
		</section>
	);
}
