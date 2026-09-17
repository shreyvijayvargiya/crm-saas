import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useAgencyTheme } from "../AgencyThemeContext";
import HeroSkillActions from "./HeroSkillActions";

export default function BuildWithClaudeSection() {
	const { isLight } = useAgencyTheme();

	return (
		<motion.section
			id="build-with-claude"
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.45, delay: 0.05 }}
			className="mb-10 sm:mb-14"
			aria-labelledby="build-with-claude-heading"
		>
			<Card
				className={cn(
					"overflow-hidden p-6 text-center sm:p-8",
					isLight
						? "border-zinc-200 bg-white/90 shadow-sm"
						: "border-zinc-800 bg-zinc-900/50"
				)}
			>
				<Badge
					variant="outline"
					className={cn(
						"mb-3 gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
						isLight
							? "border-violet-200 bg-violet-50 text-violet-800"
							: "border-violet-500/30 bg-violet-500/10 text-violet-300"
					)}
				>
					<Sparkles className="h-3 w-3" />
					Claude + Cursor
				</Badge>
				<h2
					id="build-with-claude-heading"
					className={cn(
						"text-xl font-bold tracking-tight sm:text-2xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					Ask Claude to Build CRM
				</h2>
				<p
					className={cn(
						"mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Download a Claude skill for Next.js or Vite, upload it in Claude, and describe
					your business — or copy the Cursor prompt and paste it into chat to scaffold a
					frontend-only CRM with tables, pipeline, and mock data in minutes.
				</p>
				<div className="mt-6">
					<HeroSkillActions />
				</div>
				<p
					className={cn(
						"mt-4 text-sm",
						isLight ? "text-zinc-500" : "text-zinc-500"
					)}
				>
					<a
						href="/prompts"
						className={cn(
							"font-medium underline underline-offset-4",
							isLight ? "text-violet-700 hover:text-violet-900" : "text-violet-300 hover:text-violet-200"
						)}
					>
						Browse all prompts
					</a>
					{" "}
					— Next.js, Vite, editable tables, and the full 60+ page kit.
				</p>
			</Card>
		</motion.section>
	);
}
