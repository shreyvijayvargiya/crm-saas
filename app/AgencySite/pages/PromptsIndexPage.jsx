import React from "react";
import Link from "next/link";
import {
	ArrowRight,
	CalendarDays,
	Columns3,
	CreditCard,
	Layers,
	Receipt,
	Sparkles,
	Table2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SiteSeo, { HOME_OG_IMAGE } from "@/components/seo/SiteSeo";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";

const ICONS = {
	sparkles: Sparkles,
	table: Table2,
	layers: Layers,
	calendar: CalendarDays,
	"credit-card": CreditCard,
	kanban: Columns3,
	project: Columns3,
	invoice: Receipt,
};

const ACCENT = {
	violet: {
		wash: "from-violet-500/15 via-fuchsia-400/8 to-transparent",
		iconLight: "border-violet-200 bg-violet-50 text-violet-700",
		iconDark: "border-violet-500/30 bg-violet-500/10 text-violet-300",
	},
	sky: {
		wash: "from-sky-500/15 via-cyan-400/8 to-transparent",
		iconLight: "border-sky-200 bg-sky-50 text-sky-700",
		iconDark: "border-sky-500/30 bg-sky-500/10 text-sky-300",
	},
	amber: {
		wash: "from-amber-500/20 via-orange-400/10 to-transparent",
		iconLight: "border-amber-200 bg-amber-50 text-amber-800",
		iconDark: "border-amber-500/30 bg-amber-500/10 text-amber-300",
	},
	rose: {
		wash: "from-rose-500/15 via-pink-400/8 to-transparent",
		iconLight: "border-rose-200 bg-rose-50 text-rose-700",
		iconDark: "border-rose-500/30 bg-rose-500/10 text-rose-300",
	},
	indigo: {
		wash: "from-indigo-500/15 via-violet-400/8 to-transparent",
		iconLight: "border-indigo-200 bg-indigo-50 text-indigo-700",
		iconDark: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
	},
	orange: {
		wash: "from-orange-500/20 via-amber-400/10 to-transparent",
		iconLight: "border-orange-200 bg-orange-50 text-orange-800",
		iconDark: "border-orange-500/30 bg-orange-500/10 text-orange-300",
	},
};

function formatDate(iso) {
	if (!iso) return "";
	const d = new Date(`${iso}T00:00:00`);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function PromptsIndexContent({ prompts = [] }) {
	const { isLight } = useAgencyTheme();

	return (
		<>
			<SiteSeo
				title="Prompts – Claude & Cursor CRM builders | SaaSCRM"
				description="Copy-paste Cursor and Claude prompts to scaffold a frontend-only CRM: Next.js, Vite, Airtable-style tables, or the full 60+ page SaaS kit."
				path="/prompts"
				keywords="CRM Cursor prompt, Claude CRM skill, Next.js CRM, Vite CRM, Airtable CRM, SaaS CRM prompt"
				images={[HOME_OG_IMAGE]}
			/>

			<header className="mb-10">
				<p
					className={cn(
						"text-xs font-medium uppercase tracking-wider",
						isLight ? "text-violet-700" : "text-violet-300"
					)}
				>
					Prompts
				</p>
				<h1
					className={cn(
						"mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					Copy a prompt. Paste it in Cursor or Claude.
				</h1>
				<p
					className={cn(
						"mt-3 max-w-2xl text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Hardcoded markdown skills — no database. Start with the SaaSCRM Next.js / Vite
					builder, then the Airtable-style table prompt, then the full 60+ page kit.
				</p>
			</header>

			<ul className="grid grid-cols-1 gap-4 sm:gap-5">
				{prompts.map((prompt) => {
					const Icon = ICONS[prompt.icon] || Sparkles;
					const accent = ACCENT[prompt.accent] || ACCENT.violet;
					return (
						<li key={prompt.slug}>
							<Link href={`/prompts/${prompt.slug}`} passHref>
								<a
									className={cn(
										"group relative flex gap-4 overflow-hidden rounded-2xl border p-5 transition-colors sm:gap-5 sm:p-6",
										isLight
											? "border-zinc-200 bg-white/80 hover:border-zinc-300"
											: "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"
									)}
								>
									<div
										className={cn(
											"pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r",
											accent.wash
										)}
										aria-hidden
									/>
									<div
										className={cn(
											"relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border",
											isLight ? accent.iconLight : accent.iconDark
										)}
									>
										<Icon className="h-5 w-5" strokeWidth={1.75} />
									</div>
									<div className="relative min-w-0 flex-1">
										<p
											className={cn(
												"text-[11px] font-semibold uppercase tracking-wider",
												isLight ? "text-zinc-500" : "text-zinc-500"
											)}
										>
											{prompt.eyebrow}
										</p>
										<h2
											className={cn(
												"mt-1 text-lg font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4 sm:text-xl",
												isLight ? "text-zinc-900" : "text-zinc-50"
											)}
										>
											{prompt.title}
										</h2>
										<p
											className={cn(
												"mt-2 text-sm leading-relaxed",
												isLight ? "text-zinc-600" : "text-zinc-400"
											)}
										>
											{prompt.description}
										</p>
										<div className="mt-3 flex flex-wrap items-center gap-2">
											{(prompt.tags || []).map((tag) => (
												<span
													key={tag}
													className={cn(
														"rounded-full border px-2 py-0.5 text-[11px] font-medium",
														isLight
															? "border-zinc-200 bg-zinc-50 text-zinc-600"
															: "border-zinc-700 bg-zinc-900 text-zinc-300"
													)}
												>
													{tag}
												</span>
											))}
											<span className="text-xs text-zinc-500">
												Updated {formatDate(prompt.updatedAt)}
											</span>
										</div>
										<span
											className={cn(
												"mt-4 inline-flex items-center gap-1 text-sm font-medium",
												isLight ? "text-violet-700" : "text-violet-300"
											)}
										>
											Open prompt
											<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
										</span>
									</div>
								</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default function PromptsIndexPage({ prompts = [] }) {
	return (
		<AgencyShell size="wide">
			<PromptsIndexContent prompts={prompts} />
		</AgencyShell>
	);
}

PromptsIndexPage.disableLayout = true;
