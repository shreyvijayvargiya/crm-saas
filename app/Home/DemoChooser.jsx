import React, { useState } from "react";
import { useRouter } from "next/router";
import * as lucideIcons from "lucide-react";
import { ArrowRight, LayoutGrid, Sparkles } from "lucide-react";
import SiteSeo from "@/components/seo/SiteSeo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCrmVertical } from "../../utils/CrmVerticalContext";
import { useTheme } from "../../utils/useTheme";

const ACCENT = {
	violet: {
		ring: "hover:border-violet-400/80 dark:hover:border-violet-500/60",
		icon: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
		badge: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950/40 dark:text-violet-300",
	},
	blue: {
		ring: "hover:border-blue-400/80 dark:hover:border-blue-500/60",
		icon: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
		badge: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950/40 dark:text-blue-300",
	},
	emerald: {
		ring: "hover:border-emerald-400/80 dark:hover:border-emerald-500/60",
		icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
		badge: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300",
	},
	zinc: {
		ring: "hover:border-zinc-400/80 dark:hover:border-zinc-500/60",
		icon: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
		badge: "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300",
	},
};

/**
 * /demo — pick a CRM vertical AST, then enter the admin shell.
 */
export default function DemoChooser() {
	const router = useRouter();
	const { colors } = useTheme();
	const { verticals, verticalId, setVerticalId } = useCrmVertical();
	const [pendingId, setPendingId] = useState(null);

	const enterVertical = (ast) => {
		setPendingId(ast.id);
		setVerticalId(ast.id);
		router.push(ast.homeRoute || "/dashboard");
	};

	return (
		<div className="mx-auto max-w-5xl space-y-8 p-4 sm:p-6">
			<SiteSeo
				title="Choose your SaaS CRM demo – SaaSCRM"
				description="Pick Indie Stripe Billing, Agency, Freelancer, or the Full CRM kit. Each vertical is driven by a JSON AST you can extend with AI."
				path="/demo"
				keywords="CRM demo, Stripe CRM, agency CRM, freelancer CRM, SaaS admin template"
			/>

			<header className="space-y-3">
				<div className="flex flex-wrap items-center gap-2">
					<span
						className={cn(
							"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
							colors.border
						)}
					>
						<LayoutGrid className="h-3.5 w-3.5" />
						CRM verticals
					</span>
					<span className="text-xs text-muted-foreground">
						Powered by ASTs in <code className="text-[11px]">asts/crm-verticals/</code>
					</span>
				</div>
				<h1 className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", colors.foreground)}>
					Which SaaS CRM do you want to view?
				</h1>
				<p className={cn("max-w-2xl text-sm sm:text-base", colors.mutedForeground)}>
					Each card loads a vertical AST — sidebar, pages, tables, and schemas.
					Switch anytime from the sidebar dropdown. AI agents can add more JSON
					files later without rewriting the app shell.
				</p>
			</header>

			<div className="grid gap-4 sm:grid-cols-2">
				{verticals.map((ast) => {
					const accent = ACCENT[ast.meta.accent] || ACCENT.zinc;
					const Icon = lucideIcons[ast.meta.icon] || lucideIcons.LayoutDashboard;
					const active = verticalId === ast.id;
					const loading = pendingId === ast.id;

					return (
						<button
							key={ast.id}
							type="button"
							onClick={() => enterVertical(ast)}
							className="text-left"
						>
							<Card
								className={cn(
									"h-full border transition-all duration-200",
									accent.ring,
									active && "ring-2 ring-primary/40",
									"hover:shadow-md"
								)}
							>
								<CardContent className="flex h-full flex-col gap-4 p-5 sm:p-6">
									<div className="flex items-start justify-between gap-3">
										<div
											className={cn(
												"flex h-11 w-11 items-center justify-center rounded-xl",
												accent.icon
											)}
										>
											<Icon className="h-5 w-5" />
										</div>
										{ast.meta.badge ? (
											<Badge variant="outline" className={cn("text-[10px]", accent.badge)}>
												{ast.meta.badge}
											</Badge>
										) : null}
									</div>
									<div className="space-y-1.5">
										<h2 className={cn("text-lg font-semibold", colors.foreground)}>
											{ast.meta.name}
										</h2>
										<p className="text-sm font-medium text-muted-foreground">
											{ast.meta.tagline}
										</p>
										<p className="text-xs leading-relaxed text-muted-foreground">
											{ast.meta.description}
										</p>
									</div>
									<div className="mt-auto flex items-center justify-between pt-2">
										<p className="font-mono text-[10px] text-muted-foreground">
											{ast.id}.json · {ast.sidebar?.length || 0} nav groups ·{" "}
											{ast.pages?.length || 0} pages
										</p>
										<span className="inline-flex items-center gap-1 text-sm font-medium text-primary">
											{loading ? "Opening…" : "Open"}
											<ArrowRight className="h-3.5 w-3.5" />
										</span>
									</div>
								</CardContent>
							</Card>
						</button>
					);
				})}
			</div>

			<div
				className={cn(
					"flex flex-col gap-3 rounded-2xl border border-dashed p-4 sm:flex-row sm:items-center sm:justify-between",
					colors.border
				)}
			>
				<div className="flex items-start gap-3">
					<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<Sparkles className="h-4 w-4" />
					</div>
					<div>
						<p className={cn("text-sm font-medium", colors.foreground)}>
							Add more verticals with AI
						</p>
						<p className="text-xs text-muted-foreground">
							Drop a new AST JSON in <code>asts/crm-verticals/</code>, register it in{" "}
							<code>index.js</code>, and it appears here.
						</p>
					</div>
				</div>
				<Button
					variant="outline"
					size="sm"
					className="shrink-0 rounded-full"
					onClick={() => router.push("/admin-builder")}
				>
					Open Admin Builder
				</Button>
			</div>
		</div>
	);
}
