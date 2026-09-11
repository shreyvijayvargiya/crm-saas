import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, LucideProjector, RocketIcon, TrainFront } from "lucide-react";
import { cn } from "@/lib/utils";
import { CursorImageTrail } from "./cursor-trails";
import LlmShareActions from "./LlmShareActions";

const HEADING_WORDS = ["CRM", "for", "businesses"];

export default function HeroCrmIntro({ screenshots, isLight }) {
	return (
		<section
			className="relative left-1/2 mb-10 w-screen -translate-x-1/2 sm:mb-14"
			aria-label="SaaSCRM — CRM for businesses"
		>
			<CursorImageTrail
				images={screenshots}
				isLight={isLight}
				className="relative flex min-h-[72vh] flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[78vh]"
			>
				<motion.p
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className={cn(
						"mb-5 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em]",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Built for <RocketIcon className="h-3.5 w-3.5" /> startups,{" "}
					<TrainFront className="h-3.5 w-3.5" /> agencies,{" "}
					<LucideProjector className="h-3.5 w-3.5" /> freelancers
				</motion.p>

				<h1 className="mx-auto max-w-5xl text-5xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
					<span
						className={cn(
							"mb-4 block text-lg font-semibold tracking-[0.2em] sm:text-xl",
							isLight ? "text-zinc-800" : "text-zinc-100"
						)}
					>
						SaaSCRM
					</span>
					{HEADING_WORDS.map((word, index) => (
						<motion.span
							key={word}
							initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							viewport={{ once: true }}
							transition={{
								duration: 0.7,
								delay: 0.12 + index * 0.14,
								ease: [0.22, 1, 0.36, 1],
							}}
							className={cn(
								"mr-[0.28em] inline-block last:mr-0",
								index === 0
									? "bg-gradient-to-br from-zinc-500 via-emerald-400 to-rose-500 bg-clip-text text-transparent"
									: isLight
										? "text-zinc-950"
										: "text-white"
							)}
						>
							{word}
							{index < HEADING_WORDS.length - 1 ? " " : ""}
						</motion.span>
					))}
				</h1>

				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.55, delay: 0.55 }}
					className={cn(
						"mx-auto mt-6 max-w-lg text-sm leading-relaxed sm:text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					The Next.js CRM, admin dashboard, and CMS template with 60+ screens and a
					built-in AI chatbot — ship in days, not months.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.55, delay: 0.7 }}
					className="mt-8 flex flex-col items-center gap-3"
				>
					<a
						href="/demo"
						className={cn(
							"inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5",
							isLight
								? "bg-zinc-900 text-white hover:bg-zinc-800"
								: "bg-white text-zinc-900 hover:bg-zinc-100"
						)}
					>
						View demo
						<ArrowRight className="h-4 w-4" />
					</a>
					<LlmShareActions variant="hero" className="items-center" />
				</motion.div>
			</CursorImageTrail>
		</section>
	);
}
