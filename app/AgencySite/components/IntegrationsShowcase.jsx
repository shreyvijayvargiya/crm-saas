import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plug2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgencyTheme } from "../AgencyThemeContext";
import { INTEGRATION_CATEGORIES } from "../integrationsData";

const fadeUp = {
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.45 },
};

function IntegrationToolRow({ tool, isLight }) {
	const Icon = tool.icon;

	return (
		<li
			className={cn(
				"flex items-center gap-3 border-b px-1 py-3 last:border-b-0 sm:gap-4 sm:px-2",
				isLight ? "border-zinc-100" : "border-zinc-800/80"
			)}
		>
			<div
				className={cn(
					"flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border text-sm font-bold",
					tool.initialClass
						? tool.initialClass
						: isLight
							? "border-zinc-200 bg-zinc-50"
							: "border-zinc-700 bg-zinc-800"
				)}
			>
				{Icon ? (
					<Icon className={cn("h-5 w-5", tool.iconClass)} aria-hidden />
				) : (
					<span aria-hidden>{tool.initial}</span>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex flex-wrap items-center gap-x-2 gap-y-1">
					<h4
						className={cn(
							"text-sm font-semibold tracking-tight",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						{tool.name}
					</h4>
					<span
						className={cn(
							"rounded-full border px-2 py-0.5 text-[10px] font-medium",
							isLight
								? "border-zinc-200 bg-zinc-50 text-zinc-600"
								: "border-zinc-700 bg-zinc-900 text-zinc-400"
						)}
					>
						{tool.status}
					</span>
				</div>
				<p
					className={cn(
						"mt-0.5 text-xs sm:text-sm",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					{tool.category} · {tool.detail}
				</p>
			</div>
		</li>
	);
}

export default function IntegrationsShowcase() {
	const { isLight } = useAgencyTheme();
	const [activeTab, setActiveTab] = useState(INTEGRATION_CATEGORIES[0]?.id);

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

			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<div className="overflow-x-auto pb-1">
					<TabsList
						className={cn(
							"inline-flex h-auto min-w-full justify-start gap-1 rounded-xl p-1 sm:min-w-0 sm:flex-wrap",
							isLight
								? "bg-zinc-100 text-zinc-600"
								: "bg-zinc-900 text-zinc-400"
						)}
					>
						{INTEGRATION_CATEGORIES.map((group) => (
							<TabsTrigger
								key={group.id}
								value={group.id}
								className={cn(
									"shrink-0 rounded-lg px-3 py-2 text-xs font-semibold sm:text-sm",
									isLight
										? "data-[state=active]:bg-white data-[state=active]:text-zinc-900 data-[state=active]:shadow-sm"
										: "data-[state=active]:bg-zinc-800 data-[state=active]:text-white data-[state=active]:shadow-sm"
								)}
							>
								{group.label}
							</TabsTrigger>
						))}
					</TabsList>
				</div>

				{INTEGRATION_CATEGORIES.map((group) => (
					<TabsContent key={group.id} value={group.id} className="mt-4">
						<p
							className={cn(
								"mb-3 text-xs",
								isLight ? "text-zinc-500" : "text-zinc-500"
							)}
						>
							{group.description}
						</p>
						<ul
							className={cn(
								"overflow-hidden rounded-xl border",
								isLight
									? "border-zinc-200 bg-white"
									: "border-zinc-800 bg-zinc-900/50"
							)}
						>
							{group.tools.map((tool) => (
								<IntegrationToolRow
									key={tool.name}
									tool={tool}
									isLight={isLight}
								/>
							))}
						</ul>
					</TabsContent>
				))}
			</Tabs>
		</motion.section>
	);
}
