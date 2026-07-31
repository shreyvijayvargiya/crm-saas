import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/** Landscape Unsplash shots for the horizontal strip. */
const DEFAULT_IMAGES = [
	{
		id: "hx-1",
		src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
		alt: "Abstract gradient art",
		label: "Abstract",
	},
	{
		id: "hx-2",
		src: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80",
		alt: "Purple blue gradient",
		label: "Gradient",
	},
	{
		id: "hx-3",
		src: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80",
		alt: "Colorful soft blur",
		label: "Color field",
	},
	{
		id: "hx-4",
		src: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1200&q=80",
		alt: "Geometric shapes",
		label: "Geometry",
	},
	{
		id: "hx-5",
		src: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1200&q=80",
		alt: "Neon light trails",
		label: "Neon",
	},
	{
		id: "hx-6",
		src: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1200&q=80",
		alt: "Fluid 3D render",
		label: "Fluid",
	},
	{
		id: "hx-7",
		src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
		alt: "Forest in the morning mist",
		label: "Forest",
	},
	{
		id: "hx-8",
		src: "https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?auto=format&fit=crop&w=1200&q=80",
		alt: "Soft pastel waves",
		label: "Waves",
	},
];

/**
 * HeroHorizontalScroll — vertical window scroll drives a horizontal (-x)
 * flex strip of images via Framer Motion useScroll / useTransform.
 */
export default function HeroHorizontalScroll({
	images = DEFAULT_IMAGES,
	isLight = false,
	className,
	/** How many viewport heights of scroll map to the full -x travel. */
	scrollHeightVh = 280,
}) {
	const items = useMemo(
		() => (images.length ? images : DEFAULT_IMAGES),
		[images]
	);

	const sectionRef = useRef(null);
	const trackRef = useRef(null);
	const [travelX, setTravelX] = useState(0);

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

	return (
		<section
			ref={sectionRef}
			className={cn("relative left-1/2 w-screen -translate-x-1/2", className)}
			style={{ height: `${scrollHeightVh}vh` }}
			aria-label="Horizontal image gallery"
		>
			<div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
				<div className="mb-6 px-6 text-center sm:mb-8 sm:px-10">
					<p
						className={cn(
							"text-xs font-semibold uppercase tracking-[0.18em]",
							isLight ? "text-teal-600" : "text-teal-400"
						)}
					>
						Scroll to explore
					</p>
					<h2
						className={cn(
							"mt-2 text-2xl font-bold tracking-tight sm:text-3xl",
							isLight ? "text-zinc-950" : "text-white"
						)}
					>
						Horizontal gallery
					</h2>
				</div>

				{/* Progress bar */}
				<div className="mx-auto mb-6 h-1 w-40 overflow-hidden rounded-full bg-zinc-500/20 sm:w-56">
					<motion.div
						className="h-full origin-left rounded-full bg-gradient-to-r from-orange-500 to-teal-400"
						style={{ scaleX: smoothProgress }}
					/>
				</div>

				<div className="relative w-full overflow-hidden">
					<motion.div
						ref={trackRef}
						style={{ x }}
						className="flex w-max flex-row gap-4 px-[10vw] sm:gap-6 sm:px-[12vw]"
					>
						{items.map((item, index) => (
							<figure
								key={item.id || item.src || index}
								className={cn(
									"relative shrink-0 overflow-hidden rounded-2xl border shadow-xl",
									isLight
										? "border-zinc-200/90 bg-white shadow-zinc-300/40"
										: "border-zinc-700/70 bg-zinc-900 shadow-black/40"
								)}
							>
								<img
									src={item.src}
									alt={item.alt || item.label || ""}
									draggable={false}
									className="h-[42vh] w-[70vw] max-w-[520px] object-cover sm:h-[48vh] sm:w-[55vw] md:w-[420px]"
									loading={index < 2 ? "eager" : "lazy"}
								/>
								{(item.label || item.alt) && (
									<figcaption
										className={cn(
											"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-left text-sm font-medium text-white"
										)}
									>
										{item.label || item.alt}
									</figcaption>
								)}
							</figure>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
