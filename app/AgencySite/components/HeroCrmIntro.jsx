import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2, LayoutDashboard, RocketIcon, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { CursorImageTrail } from "./cursor-trails";
import LlmShareActions from "./LlmShareActions";
import GitHubStarsLink from "./GitHubStarsLink";

const HEADING_WORDS = ["Business,", "Founders,", "Vibe", "Coders"];

export default function HeroCrmIntro({ screenshots, isLight }) {
	return (
		<section
			className="relative left-1/2 mb-10 w-screen -translate-x-1/2 sm:mb-14"
			aria-label="SaaSCRM — first open-source CRM for business, founders, and vibe coders"
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
					Built for <Briefcase className="h-3.5 w-3.5" /> business,{" "}
					<RocketIcon className="h-3.5 w-3.5" /> founders,{" "}
					<Code2 className="h-3.5 w-3.5" /> vibe coders
				</motion.p>

				<h1 className="mx-auto max-w-5xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
					<span
						className={cn(
							"mb-4 block text-lg font-semibold tracking-[0.2em] sm:text-xl",
							isLight ? "text-zinc-800" : "text-zinc-100"
						)}
					>
						SaaSCRM
					</span>
					<span
						className={cn(
							"block text-2xl font-bold sm:text-3xl lg:text-4xl",
							isLight ? "text-zinc-800" : "text-zinc-200"
						)}
					>
						The first open-source CRM for
					</span>
					{HEADING_WORDS.map((word, index) => (
						<motion.span
							key={word}
							initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
							whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
							viewport={{ once: true }}
							transition={{
								duration: 0.7,
								delay: 0.12 + index * 0.12,
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
					MIT-licensed Next.js CRM, admin dashboard, and CMS template with 60+
					screens and a built-in AI chatbot — clone on GitHub and ship in days.
				</motion.p>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.55, delay: 0.7 }}
					className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
				>
					<a
						href="/demo"
						className={cn(
							"order-1 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-md transition hover:-translate-y-0.5 sm:w-auto",
							isLight
								? "bg-zinc-900 text-white hover:bg-zinc-800"
								: "bg-white text-zinc-900 hover:bg-zinc-100"
						)}
					>
						<LayoutDashboard className="h-4 w-4 shrink-0" />
						View demo
						<ArrowRight className="h-4 w-4 shrink-0" />
					</a>
					<GitHubStarsLink isLight={isLight} variant="hero" />
					<LlmShareActions variant="hero" hideGithub />
				</motion.div>
			</CursorImageTrail>
		</section>
	);
}
