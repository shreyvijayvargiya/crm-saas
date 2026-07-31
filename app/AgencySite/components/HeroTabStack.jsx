import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * HeroTabStack — browser tabs + sticky image stack.
 * Only the active card fills the viewport; scrolling makes the next image
 * slide up from below and cover the previous one (not a flex-col list).
 */
export default function HeroTabStack({ screenshots = [], isLight }) {
	const chromeRef = useRef(null);
	const trackRefs = useRef([]);
	const [chromeHeight, setChromeHeight] = useState(108);
	const [activeIndex, setActiveIndex] = useState(0);

	const items = useMemo(
		() =>
			screenshots.slice(0, 7).map((shot, index) => ({
				...shot,
				number: String(index + 1).padStart(2, "0"),
			})),
		[screenshots]
	);

	const measureChrome = useCallback(() => {
		if (chromeRef.current) {
			setChromeHeight(chromeRef.current.getBoundingClientRect().height);
		}
	}, []);

	const updateActive = useCallback(() => {
		let next = 0;
		trackRefs.current.forEach((node, index) => {
			if (!node) return;
			const rect = node.getBoundingClientRect();
			// Track has stuck / is covering when its top reaches the chrome
			if (rect.top <= chromeHeight + 4) next = index;
		});
		setActiveIndex(next);
	}, [chromeHeight]);

	useEffect(() => {
		measureChrome();
		updateActive();
		const onScroll = () => updateActive();
		const onResize = () => {
			measureChrome();
			updateActive();
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onResize);
		};
	}, [measureChrome, updateActive]);

	const scrollToPanel = (index) => {
		const node = trackRefs.current[index];
		if (!node) return;
		const top =
			window.scrollY + node.getBoundingClientRect().top - chromeHeight;
		window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
	};

	if (!items.length) return null;

	// Tabs: only active + already scrolled (above). Hide anything still below.
	const visibleTabs = items
		.map((item, index) => ({ item, index }))
		.filter(({ index }) => index <= activeIndex);

	return (
		<section
			className="relative left-1/2 w-screen -translate-x-1/2 pb-8"
			aria-label="CRM browser tabs"
		>
			<p
				className={cn(
					"mb-6 px-4 text-center text-xs font-medium tracking-[0.18em] uppercase",
					isLight ? "text-zinc-500" : "text-zinc-500"
				)}
			>
				Browse the CRM like browser tabs
			</p>

			{/* Sticky browser chrome — always on top of the image stack */}
			<div
				ref={chromeRef}
				className={cn(
					"sticky top-0 z-[60] w-full border-y shadow-md backdrop-blur-md",
					isLight
						? "border-zinc-200 bg-zinc-100/95"
						: "border-zinc-800 bg-zinc-900/95"
				)}
			>
				<div className="mx-auto flex w-full items-center gap-3 px-3 py-2 sm:px-4">
					<div className="hidden items-center gap-1.5 sm:flex">
						<span className="h-3 w-3 rounded-full bg-red-400/90" />
						<span className="h-3 w-3 rounded-full bg-amber-400/90" />
						<span className="h-3 w-3 rounded-full bg-emerald-400/90" />
					</div>

					<div
						className="flex min-w-0 max-w-4xl items-end gap-0.5 overflow-x-auto pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
						role="tablist"
					>
						{visibleTabs.map(({ item, index }) => {
							const active = index === activeIndex;
							return (
								<button
									key={item.src || item.label}
									type="button"
									role="tab"
									aria-selected={active}
									onClick={() => scrollToPanel(index)}
									className={cn(
										"group relative flex min-w-[7rem] flex-1 basis-0 items-center gap-2 rounded-t-lg border px-2.5 py-2 text-left transition sm:min-w-[8.5rem] sm:px-3",
										active
											? isLight
												? "z-[1] border-zinc-200 border-b-white bg-white text-zinc-900 shadow-sm"
												: "z-[1] border-zinc-700 border-b-zinc-950 bg-zinc-950 text-white shadow-sm"
											: isLight
												? "border-transparent bg-zinc-200/70 text-zinc-600 hover:bg-zinc-200"
												: "border-transparent bg-zinc-800/70 text-zinc-400 hover:bg-zinc-800"
									)}
								>
									<span
										className={cn(
											"h-2 w-2 shrink-0 rounded-full",
											active ? "bg-orange-500" : isLight ? "bg-zinc-400" : "bg-zinc-600"
										)}
									/>
									<span className="min-w-0 flex-1 truncate text-[11px] font-semibold sm:text-xs">
										{item.label}
									</span>
									<span className="hidden shrink-0 text-[10px] tabular-nums text-zinc-500 sm:inline">
										{item.number}
									</span>
								</button>
							);
						})}
					</div>
				</div>

				<div
					className={cn(
						"border-t px-3 py-2 sm:px-4",
						isLight ? "border-zinc-200 bg-white" : "border-zinc-800 bg-zinc-950"
					)}
				>
					<div
						className={cn(
							"mx-auto flex h-8 max-w-5xl items-center rounded-full border px-3 text-[11px] sm:text-xs",
							isLight
								? "border-zinc-200 bg-zinc-50 text-zinc-600"
								: "border-zinc-800 bg-zinc-900 text-zinc-400"
						)}
					>
						<span className="truncate">
							componentry{items[activeIndex]?.href || "/?c=tab-stack"}
						</span>
					</div>
				</div>
			</div>

			{/* Sticky stack: each card pins and the next slides up over it */}
			<div className="relative w-full">
				{items.map((item, index) => {
					const isActive = index === activeIndex;
					const isCovered = index < activeIndex;

					return (
						<div
							key={item.src || item.label}
							ref={(node) => {
								trackRefs.current[index] = node;
							}}
							className="relative h-[100vh]"
							style={{ zIndex: 10 + index }}
						>
							<div
								className="sticky w-full overflow-hidden"
								style={{
									top: chromeHeight,
									height: `calc(100vh - ${chromeHeight}px)`,
								}}
							>
								<div
									className={cn(
										"flex h-full w-full flex-col transition duration-300",
										isLight ? "bg-white" : "bg-zinc-950",
										isCovered && "scale-[0.985] opacity-40",
										isActive && "scale-100 opacity-100 shadow-2xl"
									)}
								>
									<div
										className={cn(
											"flex shrink-0 flex-wrap items-end justify-between gap-3 border-b px-4 py-4 sm:px-8",
											isLight ? "border-zinc-100" : "border-zinc-900"
										)}
									>
										<div className="min-w-0 text-left">
											<p
												className={cn(
													"text-[11px] font-semibold uppercase tracking-[0.16em]",
													isLight ? "text-zinc-400" : "text-zinc-500"
												)}
											>
												Tab {item.number}
											</p>
											<h3
												className={cn(
													"mt-1 text-2xl font-bold tracking-tight sm:text-3xl",
													isLight ? "text-zinc-950" : "text-white"
												)}
											>
												{item.label}
											</h3>
											<p
												className={cn(
													"mt-1.5 max-w-2xl text-sm leading-relaxed line-clamp-2",
													isLight ? "text-zinc-600" : "text-zinc-400"
												)}
											>
												{item.description}
											</p>
										</div>
										{item.href ? (
											<Button
												asChild
												size="sm"
												className={cn(
													"rounded-full",
													isLight
														? "bg-zinc-900 text-white hover:bg-zinc-800"
														: "bg-zinc-100 text-zinc-900 hover:bg-white"
												)}
											>
												<Link href={item.href} passHref>
													<a className="inline-flex items-center gap-2">
														Open {item.label}
														<ArrowRight className="h-4 w-4" />
													</a>
												</Link>
											</Button>
										) : null}
									</div>

									<div
										className={cn(
											"relative min-h-0 flex-1",
											isLight ? "bg-zinc-100" : "bg-black"
										)}
									>
										<img
											src={item.src}
											alt={item.alt || item.label}
											className="absolute inset-0 h-full w-full object-cover object-top"
											draggable={false}
										/>
										{/* Soft edge so the rising next card feels layered */}
										<div
											className={cn(
												"pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t",
												isLight ? "from-white/40" : "from-black/50"
											)}
										/>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
