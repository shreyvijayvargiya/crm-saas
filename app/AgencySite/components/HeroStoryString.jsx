import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Story chapters — making-of for Story String: scroll / hover activates; string + tooltip follow.
 */
const STORIES = [
	{
		id: "list",
		title: "List the chapters",
		tooltip: "Title rows first",
		src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
		alt: "Notebook planning chapter list",
	},
	{
		id: "scroll",
		title: "Bind scroll index",
		tooltip: "useScroll → active row",
		src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
		alt: "Code on a laptop screen",
	},
	{
		id: "hover",
		title: "Prefer hover state",
		tooltip: "Hover overrides scroll",
		src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
		alt: "Hands typing at a desk",
	},
	{
		id: "dot",
		title: "Park the end dot",
		tooltip: "After the active word",
		src: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80",
		alt: "Abstract colorful shapes",
	},
	{
		id: "curve",
		title: "Draw the cubic string",
		tooltip: "SVG path to the card",
		src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
		alt: "Handwritten letter on desk",
	},
	{
		id: "tip",
		title: "Float the tooltip",
		tooltip: "Blue label above the dot",
		src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
		alt: "Whiteboard collaboration",
	},
	{
		id: "ship",
		title: "Ship Story String",
		tooltip: "One sticky making-of",
		src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
		alt: "Laptop with code editor",
	},
];

function buildCurve(x1, y1, x2, y2) {
	const dx = Math.max(x2 - x1, 40);
	const c1x = x1 + dx * 0.35;
	const c1y = y1;
	const c2x = x1 + dx * 0.65;
	const c2y = y2;
	return `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`;
}

/**
 * HeroStoryString — chapter list + image preview.
 * Dot sits just after the active word; tooltip floats above that end; string runs to the image.
 */
export default function HeroStoryString({
	isLight = true,
	className,
	scrollHeightVh = 380,
}) {
	const sectionRef = useRef(null);
	const stageRef = useRef(null);
	const cardRef = useRef(null);
	const wordRefs = useRef([]);
	const lockRef = useRef(false);

	const [scrollIndex, setScrollIndex] = useState(0);
	const [hoverIndex, setHoverIndex] = useState(null);
	const [link, setLink] = useState({
		path: "",
		tip: { x: 0, y: 0 },
		node: { x: 0, y: 0 },
		ready: false,
	});

	const activeIndex = hoverIndex !== null ? hoverIndex : scrollIndex;
	const active = STORIES[activeIndex] || STORIES[0];
	const count = STORIES.length;

	const bg = isLight ? "#eceae6" : "#0c0c0b";
	const ink = isLight ? "#1a1a18" : "#f3f0e8";
	const muted = isLight ? "#9a9690" : "#6b6660";
	const tipBg = "#3b6cff";

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});

	const smooth = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 28,
		restDelta: 0.001,
	});

	const measure = useCallback(() => {
		const stage = stageRef.current;
		const card = cardRef.current;
		const word = wordRefs.current[activeIndex];
		if (!stage || !card || !word) return;

		const s = stage.getBoundingClientRect();
		const w = word.getBoundingClientRect();
		const c = card.getBoundingClientRect();

		/* Dot flush after the last character of the active title */
		const x1 = w.right - s.left + 10;
		const y1 = w.top + w.height / 2 - s.top;

		/* String lands on left-center of the image */
		const x2 = c.left - s.left + 4;
		const y2 = c.top + c.height * 0.5 - s.top;

		setLink({
			path: buildCurve(x1, y1, x2, y2),
			/* Tooltip centered above the word-end / dot */
			tip: { x: x1, y: y1 - 14 },
			node: { x: x1, y: y1 },
			ready: true,
		});
	}, [activeIndex]);

	useLayoutEffect(() => {
		measure();
	}, [measure, active, isLight]);

	useEffect(() => {
		const onResize = () => measure();
		window.addEventListener("resize", onResize);
		const id = window.setInterval(measure, 320);
		return () => {
			window.removeEventListener("resize", onResize);
			window.clearInterval(id);
		};
	}, [measure]);

	useEffect(() => {
		const unsub = smooth.onChange((p) => {
			if (lockRef.current) return;
			const t = Math.max(0, Math.min(1, p));
			const idx = Math.min(count - 1, Math.max(0, Math.round(t * (count - 1))));
			setScrollIndex(idx);
		});
		return unsub;
	}, [smooth, count]);

	useEffect(() => {
		const t = window.setTimeout(measure, 40);
		return () => window.clearTimeout(t);
	}, [activeIndex, measure]);

	const scrollToIndex = (index) => {
		const el = sectionRef.current;
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const absoluteTop = window.scrollY + rect.top;
		const travel = Math.max(el.offsetHeight - window.innerHeight, 0);
		const target = absoluteTop + (index / Math.max(count - 1, 1)) * travel;
		lockRef.current = true;
		setScrollIndex(index);
		window.scrollTo({ top: target, behavior: "smooth" });
		window.setTimeout(() => {
			lockRef.current = false;
		}, 500);
	};

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Story string chapters"
		>
			<div
				ref={stageRef}
				className="sticky top-0 flex h-screen items-center overflow-hidden px-6 sm:px-12 lg:px-16"
				style={{ background: bg, color: ink }}
			>
				<div className="relative z-10 mx-auto flex w-full max-w-6xl items-center gap-10 lg:gap-20">
					{/* Left list — buttons hug text so word-end = node */}
					<div className="relative w-auto max-w-[min(48vw,360px)] shrink-0">
						<p
							className="mb-8 font-sans text-[10px] font-medium uppercase tracking-[0.28em]"
							style={{ color: muted }}
						>
							Chapters
						</p>
						<ul className="relative space-y-1" onMouseLeave={() => setHoverIndex(null)}>
							{STORIES.map((story, i) => {
								const on = i === activeIndex;
								return (
									<li key={story.id} className="relative">
										<button
											type="button"
											onMouseEnter={() => setHoverIndex(i)}
											onFocus={() => setHoverIndex(i)}
											onClick={() => scrollToIndex(i)}
											className={cn(
												"relative inline-block max-w-full py-2.5 pr-4 text-left font-serif text-[clamp(1.15rem,2.4vw,1.65rem)] leading-tight transition-colors duration-200",
												on ? "font-semibold italic" : "font-normal"
											)}
											style={{ color: on ? ink : muted }}
											aria-current={on ? "true" : undefined}
										>
											<span
												ref={(el) => {
													wordRefs.current[i] = el;
												}}
												className="relative inline"
											>
												{story.title}
											</span>
										</button>
									</li>
								);
							})}
						</ul>
					</div>

					{/* Right — fixed frame; images fade in so aspect swaps don’t jump */}
					<div className="relative ml-auto hidden min-w-0 flex-1 justify-end md:flex">
						<div
							ref={cardRef}
							className="relative aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-2xl bg-zinc-300/40 shadow-[0_24px_60px_rgba(0,0,0,0.12)] sm:aspect-[3/4]"
						>
							<div className="absolute left-1/2 top-0 z-20 h-3.5 w-20 -translate-x-1/2 rounded-b-xl bg-black/85" />
							<AnimatePresence mode="sync" initial={false}>
								<motion.img
									key={active.id}
									src={active.src}
									alt={active.alt}
									draggable={false}
									initial={{ opacity: 0, scale: 1.04 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.98 }}
									transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
									className="absolute inset-0 h-full w-full object-cover"
								/>
							</AnimatePresence>
						</div>
					</div>
				</div>

				{/* Mobile image */}
				<div className="absolute inset-x-6 bottom-10 z-10 md:hidden">
					<div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-zinc-300/40 shadow-lg">
						<AnimatePresence mode="sync" initial={false}>
							<motion.img
								key={`m-${active.id}`}
								src={active.src}
								alt={active.alt}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
								className="absolute inset-0 h-full w-full object-cover"
							/>
						</AnimatePresence>
					</div>
				</div>

				{/* Dot (after word) + tooltip (above word end) + string → image */}
				{link.ready ? (
					<div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden>
						<svg className="absolute inset-0 h-full w-full overflow-visible">
							<motion.path
								d={link.path}
								fill="none"
								stroke={ink}
								strokeWidth="1.25"
								strokeLinecap="round"
								initial={false}
								animate={{ d: link.path }}
								transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
							/>
						</svg>

						<motion.span
							className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
							style={{ background: ink, left: link.node.x, top: link.node.y }}
							transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
						/>

						<motion.div
							className="absolute -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-medium text-white shadow-sm"
							style={{
								background: tipBg,
								left: link.tip.x,
								top: link.tip.y,
							}}
							key={active.id}
							initial={{ opacity: 0, y: 4, scale: 0.96 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							transition={{ duration: 0.22 }}
						>
							{active.tooltip}
						</motion.div>
					</div>
				) : null}

				<p
					className="absolute bottom-6 left-6 font-sans text-[10px] uppercase tracking-[0.2em] sm:left-12"
					style={{ color: muted }}
				>
					Scroll or hover · {String(activeIndex + 1).padStart(2, "0")} /{" "}
					{String(count).padStart(2, "0")}
				</p>
			</div>
		</section>
	);
}
