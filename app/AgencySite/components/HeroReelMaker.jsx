import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
	{
		id: "capture",
		label: "Capture",
		title: "Film in vertical",
		body: "Snap a 9:16 take with the grid on. Hold for speed ramps — the reel canvas stays locked to Instagram’s safe zones.",
		img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=900&q=80",
		tone: "#f97316",
	},
	{
		id: "text",
		label: "Text",
		title: "Type on the beat",
		body: "Drop kinetic captions that stick to the beat. Scrub words, bounce them in, keep the hero line under the UI chrome.",
		img: "https://images.unsplash.com/photo-1626785774573-4b7993143495?auto=format&fit=crop&w=900&q=80",
		tone: "#ec4899",
	},
	{
		id: "audio",
		label: "Audio",
		title: "Pick a sound",
		body: "Browse trending tracks or hum a hook. Waveform snaps to cuts so every caption lands on the downbeat.",
		img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80",
		tone: "#8b5cf6",
	},
	{
		id: "effects",
		label: "Effects",
		title: "Layer the look",
		body: "Grain, LUTs, stickers — stack light. Preview on a phone frame so nothing surprises you after export.",
		img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
		tone: "#06b6d4",
	},
	{
		id: "export",
		label: "Export",
		title: "Ship the reel",
		body: "One tap to H.264. Cover frame, alt text, and hashtag pack travel with the file — ready for the IG uploader.",
		img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=900&q=80",
		tone: "#22c55e",
	},
];

/**
 * HeroReelMaker — IG reel screens; Apple-style scroll tabs sync to right-side preview.
 */
export default function HeroReelMaker({ className }) {
	const sectionRef = useRef(null);
	const [active, setActive] = useState(0);
	const tabRefs = useRef([]);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start start", "end end"],
	});
	const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

	useEffect(() => {
		const unsub = smooth.onChange((v) => {
			const idx = Math.min(TABS.length - 1, Math.floor(v * TABS.length));
			setActive(idx);
		});
		return unsub;
	}, [smooth]);

	useEffect(() => {
		const el = tabRefs.current[active];
		if (el?.scrollIntoView) {
			el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
		}
	}, [active]);

	const tab = TABS[active];

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${TABS.length * 85}vh` }}
			aria-label="IG reel maker"
		>
			<div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-[#0a0a0b]">
				<div className="flex flex-1 flex-col gap-6 px-4 py-8 sm:flex-row sm:items-center sm:gap-10 sm:px-10 lg:px-16">
					{/* Left copy */}
					<div className="flex min-w-0 flex-1 flex-col justify-center">
						<p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/40">
							Reel maker
						</p>
						<motion.h2
							key={tab.id + "-t"}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							className="mt-3 max-w-md font-serif text-3xl tracking-tight text-white sm:text-5xl"
						>
							{tab.title}
						</motion.h2>
						<motion.p
							key={tab.id + "-b"}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.05 }}
							className="mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-base"
						>
							{tab.body}
						</motion.p>
						<span
							className="mt-6 inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold text-white"
							style={{ backgroundColor: tab.tone }}
						>
							{tab.label}
						</span>
					</div>

					{/* Right phone preview */}
					<div className="relative mx-auto w-[min(56vw,260px)] shrink-0 sm:mx-0">
						<div className="overflow-hidden rounded-[2rem] border border-white/15 bg-zinc-900 shadow-2xl ring-1 ring-white/10">
							<div className="flex items-center justify-between px-4 py-3">
								<span className="text-[10px] font-semibold text-white/50">9:16</span>
								<span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
							</div>
							<div className="relative aspect-[9/16] overflow-hidden">
								{TABS.map((t, i) => (
									<motion.img
										key={t.id}
										src={t.img}
										alt=""
										draggable={false}
										className="absolute inset-0 h-full w-full object-cover"
										animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
										transition={{ duration: 0.45 }}
									/>
								))}
								<div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-16">
									<p className="text-xs font-semibold text-white">{tab.title}</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Apple-style scroll tabs */}
				<div className="border-t border-white/10 bg-black/40 backdrop-blur-md">
					<div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 py-4 scrollbar-none sm:justify-center">
						{TABS.map((t, i) => (
							<button
								key={t.id}
								ref={(el) => {
									tabRefs.current[i] = el;
								}}
								type="button"
								onClick={() => {
									const top = sectionRef.current?.offsetTop || 0;
									const h = sectionRef.current?.offsetHeight || 1;
									window.scrollTo({
										top: top + (i / TABS.length) * h * 0.92,
										behavior: "smooth",
									});
								}}
								className={cn(
									"shrink-0 rounded-full px-4 py-2 text-sm font-medium transition",
									i === active
										? "bg-white text-zinc-900"
										: "bg-white/10 text-white/70 hover:bg-white/15"
								)}
							>
								{t.label}
							</button>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
