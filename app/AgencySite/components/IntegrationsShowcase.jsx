import React from "react";
import { motion } from "framer-motion";
import { Plug2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useAgencyTheme } from "../AgencyThemeContext";
import { INTEGRATION_CATEGORIES } from "../integrationsData";

const fadeUp = {
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.45 },
};

function IntegrationToolCard({ tool, isLight }) {
	const Icon = tool.icon;

	return (
		<article
			className={cn(
				"group flex items-start gap-4 rounded-xl border p-4 transition duration-200 sm:p-5",
				isLight
					? "border-zinc-200 bg-white shadow-sm hover:border-zinc-300 hover:shadow-md"
					: "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900"
			)}
		>
			<div
				className={cn(
					"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-base font-bold sm:h-12 sm:w-12 sm:text-lg",
					tool.initialClass
						? tool.initialClass
						: isLight
							? "border-zinc-200 bg-zinc-50"
							: "border-zinc-700 bg-zinc-800"
				)}
			>
				{Icon ? (
					<Icon className={cn("h-5 w-5 sm:h-6 sm:w-6", tool.iconClass)} aria-hidden />
				) : (
					<span aria-hidden>{tool.initial}</span>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<h4
					className={cn(
						"text-sm font-semibold tracking-tight sm:text-base",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					{tool.name}
				</h4>
				<p
					className={cn(
						"mt-1 text-sm",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					{tool.category} / {tool.detail}
				</p>
				<p className="mt-1.5 text-xs text-zinc-500">
					CRM-ready | {tool.status}
				</p>
			</div>
		</article>
	);
}

export default function IntegrationsShowcase() {
	const { isLight } = useAgencyTheme();

	return (
		<motion.section
			{...fadeUp}
			transition={{ ...fadeUp.transition, delay: 0.12 }}
			className="mb-12"
			id="integrations"
		>
			<div className="mb-6">
				<Badge
					variant="outline"
					className={cn(
						"mb-3 gap-2 px-3 py-1 text-xs font-medium",
						isLight
							? "border-zinc-300 bg-zinc-100 text-zinc-700"
							: "border-zinc-700 bg-zinc-900 text-zinc-300"
					)}
				>
					<Plug2 className="h-3.5 w-3.5" />
					Integrations
				</Badge>
				<h2
					className={cn(
						"text-lg font-bold",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					Tools you can plug into the CRM
				</h2>
				<p
					className={cn(
						"mt-2 text-sm leading-relaxed",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Frameworks, payments, CMS, AI, and ops—the same stack we wire up for
					clients and ship in the template.
				</p>
			</div>

			<div className="flex flex-col gap-8">
				{INTEGRATION_CATEGORIES.map((group) => (
					<div key={group.id}>
						<h3
							className={cn(
								"text-sm font-semibold",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							{group.label}
						</h3>
						<p
							className={cn(
								"mt-1 text-xs",
								isLight ? "text-zinc-500" : "text-zinc-500"
							)}
						>
							{group.description}
						</p>
						<div className="mt-3 flex flex-col gap-3">
							{group.tools.map((tool) => (
								<IntegrationToolCard key={tool.name} tool={tool} isLight={isLight} />
							))}
						</div>
					</div>
				))}
			</div>
		</motion.section>
	);
}
