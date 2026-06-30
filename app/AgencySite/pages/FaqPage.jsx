import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { FAQ_ITEMS } from "../agencyConfig";
import { fadeUp, fadeUpWithDelay } from "../motionPresets";

function FaqItem({ item, isOpen, onToggle, isLight }) {
	return (
		<div
			className={cn(
				"overflow-hidden rounded-2xl border transition-colors",
				isLight ? "border-zinc-200 bg-white" : "border-zinc-800 bg-zinc-900/40"
			)}
		>
			<button
				type="button"
				onClick={onToggle}
				className={cn(
					"flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium transition",
					isLight
						? "text-zinc-900 hover:bg-zinc-50"
						: "text-white hover:bg-zinc-900/60"
				)}
				aria-expanded={isOpen}
			>
				<span>{item.q}</span>
				<ChevronDown
					className={cn(
						"h-4 w-4 shrink-0 transition-transform duration-200",
						isOpen && "rotate-180",
						isLight ? "text-zinc-500" : "text-zinc-400"
					)}
				/>
			</button>
			<AnimatePresence initial={false}>
				{isOpen ? (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.22 }}
						className="overflow-hidden"
					>
						<p
							className={cn(
								"px-5 pb-4 text-sm leading-relaxed",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							{item.a}
						</p>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}

function FaqContent() {
	const { isLight } = useAgencyTheme();
	const [openId, setOpenId] = useState(0);

	return (
		<>
			<motion.header {...fadeUp} className="mb-10 text-center">
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight sm:text-4xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					FAQ
				</h1>
				<p
					className={cn(
						"mx-auto mt-4 max-w-lg text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Common questions about the template, licensing, custom builds, and support.
				</p>
			</motion.header>

			<div className="space-y-2">
				{FAQ_ITEMS.map((item, i) => (
					<motion.div key={item.q} {...fadeUpWithDelay(i * 0.04)}>
						<FaqItem
							item={item}
							isOpen={openId === i}
							onToggle={() => setOpenId(openId === i ? -1 : i)}
							isLight={isLight}
						/>
					</motion.div>
				))}
			</div>
		</>
	);
}

export default function AgencyFaqPage() {
	return (
		<AgencyShell>
			<FaqContent />
		</AgencyShell>
	);
}

AgencyFaqPage.disableLayout = true;
