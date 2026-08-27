import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Making-of glossary — rail curtains open each step of how Time Glossary was built.
 */
const ENTRIES = [
	{
		id: "railmap",
		word: "railmap",
		pos: "n",
		prev: null,
		body: "the first sketch of this glossary — two vertical rails, a center story panel, and a bottom marker that would later follow scroll.",
	},
	{
		id: "cellstrip",
		word: "cellstrip",
		pos: "n",
		prev: "railmap",
		body: "a slim 12px rail cell: same width forever so the curtain can rise without the layout jumping.",
	},
	{
		id: "curtain",
		word: "curtain",
		pos: "n",
		prev: "cellstrip",
		body: "a soft scaleY fill from the top of each rail cell — active cells open fully; neighbors lift a little to hint at what’s next.",
	},
	{
		id: "snapopen",
		word: "snapopen",
		pos: "v",
		prev: "curtain",
		body: "to animate the curtain with a short spring (0.2s) so clicking a rail feels like a page turning, not a menu expanding.",
	},
	{
		id: "storypanel",
		word: "storypanel",
		pos: "n",
		prev: "snapopen",
		body: "the center block: previous word above, giant serif headword, then a body sentence that explains how this piece was made.",
	},
	{
		id: "prevlink",
		word: "prevlink",
		pos: "n",
		prev: "storypanel",
		body: "the italic crumb above each entry — a chain so the making-of reads as one continuous glossary instead of isolated cards.",
	},
	{
		id: "scrollsync",
		word: "scrollsync",
		pos: "v",
		prev: "prevlink",
		body: "to map window scroll progress onto the active index so the curtains and the bottom marker move together as you travel the section.",
	},
	{
		id: "markerdot",
		word: "markerdot",
		pos: "n",
		prev: "scrollsync",
		body: "the bottom progress tick that slides under the rails — proof that scroll and click share one source of truth.",
	},
	{
		id: "locktick",
		word: "locktick",
		pos: "v",
		prev: "markerdot",
		body: "to briefly lock scroll-driven updates after a click so the curtain you chose doesn’t fight the wheel mid-animation.",
	},
	{
		id: "leftright",
		word: "leftright",
		pos: "n",
		prev: "locktick",
		body: "splitting entries across two rails so the vocabulary feels architectural — like columns in a dictionary, not a single long list.",
	},
	{
		id: "serifink",
		word: "serifink",
		pos: "n",
		prev: "leftright",
		body: "choosing editorial type and a warm paper background so the component reads as a book, even though it’s pure React.",
	},
	{
		id: "accentpos",
		word: "accentpos",
		pos: "n",
		prev: "serifink",
		body: "the tiny italic part-of-speech mark beside each headword — a reminder that every entry is a defined step in the build.",
	},
	{
		id: "nearhint",
		word: "nearhint",
		pos: "n",
		prev: "accentpos",
		body: "neighbors of the active cell lift their curtains partially so the rails feel alive before you click.",
	},
	{
		id: "paperbg",
		word: "paperbg",
		pos: "n",
		prev: "nearhint",
		body: "a fixed cream stage (#f7f5f0) that keeps the glossary independent of the rest of the agency chrome.",
	},
	{
		id: "springpin",
		word: "springpin",
		pos: "v",
		prev: "paperbg",
		body: "to pin the sticky stage for hundreds of vh so each glossary word owns a slice of the scroll story.",
	},
	{
		id: "entrychain",
		word: "entrychain",
		pos: "n",
		prev: "springpin",
		body: "wiring every prev field so AnimatePresence can exit one definition and enter the next without a hard cut.",
	},
	{
		id: "clickpath",
		word: "clickpath",
		pos: "n",
		prev: "entrychain",
		body: "clicking a rail cell sets the active index and scrolls the window to that slice — curtains and story stay in sync.",
	},
	{
		id: "hoverwash",
		word: "hoverwash",
		pos: "n",
		prev: "clickpath",
		body: "a quiet hover tint on inactive cells so the rails invite the cursor without stealing focus from the headword.",
	},
	{
		id: "makestory",
		word: "makestory",
		pos: "v",
		prev: "hoverwash",
		body: "to replace invented time-words with a vocabulary of how this component itself was built — still told through curtains.",
	},
	{
		id: "onesource",
		word: "onesource",
		pos: "n",
		prev: "makestory",
		body: "keeping ENTRIES as the only content array: rails, panel, marker, and scroll all read from the same list.",
	},
	{
		id: "noextraui",
		word: "noextraui",
		pos: "n",
		prev: "onesource",
		body: "shipping without cards or chrome — the curtains and type are the interface, so storytelling stays inside the motion.",
	},
	{
		id: "agencydrop",
		word: "agencydrop",
		pos: "v",
		prev: "noextraui",
		body: "to drop HeroTimeGlossary into the componentry catalog at /?c=time-glossary with zero layout changes.",
	},
	{
		id: "scrollown",
		word: "scrollown",
		pos: "v",
		prev: "agencydrop",
		body: "to finish the making-of by scrolling the last entries — each curtain close is also the next definition opening.",
	},
	{
		id: "glossary",
		word: "glossary",
		pos: "n",
		prev: "scrollown",
		body: "what this file became: not a poem about dusk, but a dictionary of how we opened soft curtains over a sticky story stage.",
	},
	{
		id: "handback",
		word: "handback",
		pos: "v",
		prev: "glossary",
		body: "to return the component to the page as a reusable block — same rails, same curtains, new story about its own creation.",
	},
	{
		id: "keepfold",
		word: "keepfold",
		pos: "v",
		prev: "handback",
		body: "to leave the UI untouched on purpose — only the words changed, so the animation remains the teacher.",
	},
	{
		id: "readagain",
		word: "readagain",
		pos: "v",
		prev: "keepfold",
		body: "to scroll once more from railmap to readagain and feel the curtains prove every step they describe.",
	},
	{
		id: "shipfile",
		word: "shipfile",
		pos: "v",
		prev: "readagain",
		body: "to commit one file: HeroTimeGlossary.jsx — motion intact, vocabulary rewritten as the making-of.",
	},
	{
		id: "nextpiece",
		word: "nextpiece",
		pos: "n",
		prev: "shipfile",
		body: "the habit we carry to the next component: keep the animation, change only the story it tells.",
	},
	{
		id: "curtainend",
		word: "curtainend",
		pos: "n",
		prev: "nextpiece",
		body: "the last soft drop of the rail curtain — the glossary closes, and the page continues with the next made story.",
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
	const [activeIndex, setActiveIndex] = useState(1); /* start on second making-of entry */
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
