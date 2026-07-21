import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const STACK_OFFSET = 22;
const STACK_SCALE_STEP = 0.04;
const MAX_VISIBLE_BEHIND = 4;

export default function HeroScreenshotCarousel({ screenshots, isLight }) {
	const sectionRef = useRef(null);
	const activeRef = useRef(0);
	const frameRef = useRef(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const active = screenshots[activeIndex];

	useEffect(() => {
		const updateActiveScreenshot = () => {
			frameRef.current = null;
			const section = sectionRef.current;
			if (!section) return;
			const rect = section.getBoundingClientRect();
			const scrollable = Math.max(section.offsetHeight - window.innerHeight, 1);
			const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
			const nextIndex = Math.min(
				screenshots.length - 1,
				Math.round(progress * (screenshots.length - 1))
			);
			if (nextIndex !== activeRef.current) {
				activeRef.current = nextIndex;
				setActiveIndex(nextIndex);
			}
		};

		const onScroll = () => {
			if (frameRef.current) return;
			frameRef.current = requestAnimationFrame(updateActiveScreenshot);
		};

		updateActiveScreenshot();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frameRef.current) cancelAnimationFrame(frameRef.current);
		};
	}, [screenshots.length]);

	const goToScreenshot = (index) => {
		const section = sectionRef.current;
		if (!section) return;
		const scrollable = section.offsetHeight - window.innerHeight;
		const sectionTop = window.scrollY + section.getBoundingClientRect().top;
		const progress =
			screenshots.length > 1 ? index / (screenshots.length - 1) : 0;
		window.scrollTo({
			top: sectionTop + scrollable * progress,
			behavior: "smooth",
		});
	};

	return (
		<section
			ref={sectionRef}
			className="relative left-1/2 w-[80vw] -translate-x-1/2"
			style={{ height: `${screenshots.length * 100}vh` }}
			aria-label="CRM product screenshots"
		>
			<div className="sticky top-0 flex h-screen items-center overflow-x-hidden overflow-y-visible">
				<div className="relative grid h-full w-full grid-rows-[38%_62%] p-6 sm:p-10 lg:grid-cols-[minmax(18rem,0.75fr)_minmax(0,1.25fr)] lg:grid-rows-1 lg:gap-10">
					<div className="flex items-center justify-center text-left">
						<div className="w-full max-w-md">
							<p
								className={cn(
									"text-xs font-semibold uppercase tracking-[0.18em]",
									isLight ? "text-orange-600" : "text-orange-400"
								)}
							>
								· {String(activeIndex + 1).padStart(2, "0")}
							</p>
							<AnimatePresence exitBeforeEnter initial={false}>
								<motion.div
									key={active.label}
									initial={{ opacity: 0, y: 24 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -18 }}
									transition={{ duration: 0.4, ease: "easeOut" }}
								>
									<h2
										className={cn(
											"mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl",
											isLight ? "text-zinc-950" : "text-white"
										)}
									>
										{active.label}
									</h2>
									<p
										className={cn(
											"mt-4 max-w-sm text-sm leading-relaxed sm:text-base",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										{active.description ||
											`Explore the ${active.label.toLowerCase()} experience included in the SaaSCRM template.`}
									</p>
									<Link href={active.href} passHref>
										<a
											className={cn(
												"mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5",
												isLight
													? "bg-zinc-950 text-white hover:bg-zinc-800"
													: "bg-white text-zinc-950 hover:bg-zinc-100"
											)}
										>
											View {active.label}
											<ArrowRight className="h-4 w-4" />
										</a>
									</Link>
								</motion.div>
							</AnimatePresence>

							<div className="mt-7 flex items-center gap-2">
								{screenshots.map((screenshot, index) => (
									<button
										key={screenshot.src}
										type="button"
										onClick={() => goToScreenshot(index)}
										className={cn(
											"h-1.5 rounded-full transition-all duration-300",
											index === activeIndex
												? isLight
													? "w-8 bg-zinc-900"
													: "w-8 bg-white"
												: isLight
													? "w-3 bg-zinc-300 hover:bg-zinc-400"
													: "w-3 bg-zinc-700 hover:bg-zinc-600"
										)}
										aria-label={`Scroll to ${screenshot.label}`}
									/>
								))}
							</div>
						</div>
					</div>

					<div className="relative flex items-center justify-center p-2 pt-12 sm:p-10 sm:pt-16">
						<div className="relative aspect-[1919/958] w-full max-w-5xl">
							{screenshots.map((screenshot, index) => {
								const depth = activeIndex - index;
								const isPast = index < activeIndex;
								const isActive = index === activeIndex;
								const isFuture = index > activeIndex;
								const isVisible =
									isActive ||
									(isPast && depth <= MAX_VISIBLE_BEHIND);

								const stackY = isFuture
									? 72
									: isVisible
										? -depth * STACK_OFFSET
										: -MAX_VISIBLE_BEHIND * STACK_OFFSET - 20;
								const stackScale = isFuture
									? 0.94
									: isVisible
										? 1 - depth * STACK_SCALE_STEP
										: 0.82;
								const stackOpacity = isFuture
									? 0
									: isVisible
										? Math.max(0.4, 1 - depth * 0.16)
										: 0;

								return (
									<motion.div
										key={screenshot.src}
										initial={false}
										animate={{
											y: stackY,
											scale: stackScale,
											opacity: stackOpacity,
											zIndex: index + 1,
										}}
										transition={{
											type: "spring",
											stiffness: 240,
											damping: 26,
											mass: 0.85,
										}}
										className={cn(
											"absolute inset-0 overflow-hidden rounded-2xl border shadow-2xl",
											isLight
												? "border-white bg-white shadow-zinc-400/40"
												: "border-zinc-700 bg-zinc-900 shadow-black/70",
											!isActive && "pointer-events-none"
										)}
										style={{ transformOrigin: "50% 0%" }}
									>
										<img
											src={screenshot.src}
											alt={screenshot.alt}
											className="h-full w-full object-cover object-top"
											width={1919}
											height={958}
											draggable={false}
										/>
										{isActive ? (
											<Link href={screenshot.href} passHref>
												<a
													className="group absolute inset-0 flex items-center justify-center bg-zinc-950/0 transition-colors duration-300 hover:bg-zinc-950/30"
													aria-label={`View ${screenshot.label}`}
												>
													<span className="flex h-12 w-12 translate-y-2 items-center justify-center rounded-full border border-white/50 bg-white/95 text-zinc-900 opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
														<Eye className="h-5 w-5" />
													</span>
												</a>
											</Link>
										) : null}
									</motion.div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
