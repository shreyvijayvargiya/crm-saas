import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ROWS = [
	[
		{ name: "Zion", src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=240&q=80" },
		{ name: "Yellowstone", src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=240&q=80" },
		{ name: "Mount Rainier", src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=240&q=80" },
		{ name: "Pinnacles", src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=240&q=80" },
		{ name: "Arches", src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=240&q=80" },
	],
	[
		{ name: "Saguaro", src: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=240&q=80" },
		{ name: "Joshua Tree", src: "https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?auto=format&fit=crop&w=240&q=80" },
		{ name: "Yosemite", src: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=240&q=80" },
		{ name: "Grand Teton", src: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=240&q=80" },
		{ name: "Canyonlands", src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=240&q=80" },
	],
	[
		{ name: "Redwoods", src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=240&q=80" },
		{ name: "Glacier", src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=240&q=80" },
		{ name: "Monterey", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=240&q=80" },
		{ name: "Theodore Roosevelt", src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=240&q=80" },
		{ name: "Olympic", src: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=240&q=80" },
	],
	[
		{ name: "White Sands", src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=240&q=80" },
		{ name: "Shark Fin Cove", src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=240&q=80" },
		{ name: "Sedona", src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=240&q=80" },
		{ name: "Great Sand Dunes", src: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=240&q=80" },
		{ name: "Big Sur", src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=240&q=80" },
	],
];

function Item({ item }) {
	return (
		<div className="flex shrink-0 items-center gap-3 pr-12 sm:gap-4 sm:pr-16">
			<img
				src={item.src}
				alt=""
				draggable={false}
				className="h-11 w-11 rounded-[14px] object-cover sm:h-14 sm:w-14 sm:rounded-2xl"
			/>
			<span className="whitespace-nowrap text-[15px] font-medium tracking-tight text-zinc-900 sm:text-lg">
				{item.name}
			</span>
		</div>
	);
}

function MarqueeRow({ items, reverse = false, duration = 42 }) {
	const loop = [...items, ...items];
	return (
		<div className="overflow-hidden">
			<motion.div
				className="flex w-max items-center"
				animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
				transition={{ duration, ease: "linear", repeat: Infinity }}
			>
				{loop.map((item, i) => (
					<Item key={`${item.name}-${i}`} item={item} />
				))}
			</motion.div>
		</div>
	);
}

/**
 * HeroImageMarquee — four infinite rows of image + label,
 * alternating scroll directions.
 */
export default function HeroImageMarquee({ className }) {
	return (
		<section
			className={cn(
				"relative left-1/2 w-screen -translate-x-1/2 overflow-hidden py-10 sm:py-14",
				"bg-[#f4f1ea]",
				className
			)}
			aria-label="Image marquee"
		>
			<div className="flex flex-col gap-5 sm:gap-7">
				<MarqueeRow items={ROWS[0]} duration={48} />
				<MarqueeRow items={ROWS[1]} reverse duration={54} />
				<MarqueeRow items={ROWS[2]} duration={50} />
				<MarqueeRow items={ROWS[3]} reverse duration={56} />
			</div>
		</section>
	);
}
