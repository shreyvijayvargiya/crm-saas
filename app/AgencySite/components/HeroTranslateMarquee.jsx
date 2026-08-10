import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ENGLISH =
	"If the note is ready, send it before noon · Keep the voice soft and clear · Translation runs live through the line · ";

const HINDI =
	"यदि नोट तैयार है, तो दोपहर से पहले भेज दें · आवाज़ नरम और स्पष्ट रखें · अनुवाद लाइव चल रहा है · ";

const BARS = [
	0.22, 0.45, 0.7, 0.38, 0.92, 0.55, 0.3, 0.78, 0.48, 0.88, 0.35, 0.62, 0.95,
	0.42, 0.68, 0.28, 0.8, 0.5, 0.36, 0.74,
];

function WavePill() {
	return (
		<div
			className="relative z-20 flex h-14 w-[min(42vw,13.5rem)] shrink-0 items-center justify-center rounded-full border border-zinc-900 bg-[#fcfbf4] px-5 shadow-[0_8px_30px_-12px_rgba(24,24,27,0.35)] sm:h-16 sm:w-56"
			aria-hidden
		>
			<div className="flex h-8 items-center gap-[3px]">
				{BARS.map((h, i) => (
					<motion.span
						key={i}
						className="w-[2.5px] rounded-full bg-zinc-900 sm:w-[3px]"
						animate={{
							height: [
								`${h * 10}px`,
								`${h * 28}px`,
								`${h * 14}px`,
								`${h * 24}px`,
								`${h * 10}px`,
							],
						}}
						transition={{
							duration: 0.85 + (i % 4) * 0.1,
							repeat: Infinity,
							ease: "easeInOut",
							delay: i * 0.04,
						}}
					/>
				))}
			</div>
		</div>
	);
}

function MarqueeText({ text, className, reverse = false, duration = 28 }) {
	const loop = `${text}${text}`;
	return (
		<div className="relative min-w-0 flex-1 overflow-hidden">
			<motion.div
				className={cn("flex w-max whitespace-nowrap", className)}
				animate={reverse ? { x: ["-50%", "0%"] } : { x: ["0%", "-50%"] }}
				transition={{ duration, ease: "linear", repeat: Infinity }}
			>
				<span className="pr-8">{loop}</span>
			</motion.div>
		</div>
	);
}

/**
 * HeroTranslateMarquee — full-bleed EN → waveform → HI translate strip.
 * English marquee into center; Hindi out on the black bar.
 */
export default function HeroTranslateMarquee({ className }) {
	return (
		<section
			className={cn(
				"relative left-1/2 flex h-[70vh] min-h-[22rem] w-screen -translate-x-1/2 items-center overflow-hidden bg-[#fcfbf4] sm:h-[80vh]",
				className
			)}
			aria-label="Language translation marquee"
		>
			<div className="relative flex w-full items-center">
				{/* English — left, flowing into center */}
				<div className="flex min-w-0 flex-1 items-center justify-end overflow-hidden pr-0">
					<MarqueeText
						text={ENGLISH}
						duration={32}
						className="text-xl font-medium tracking-tight text-zinc-400 sm:text-3xl md:text-4xl"
					/>
				</div>

				<WavePill />

				{/* Hindi — right black bar */}
				<div className="relative flex min-w-0 flex-1 items-center overflow-hidden">
					<div className="absolute inset-y-[28%] left-0 right-0 bg-zinc-950 sm:inset-y-[32%]" aria-hidden />
					<div className="relative z-10 w-full overflow-hidden py-6">
						<MarqueeText
							text={HINDI}
							duration={34}
							className="text-xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
