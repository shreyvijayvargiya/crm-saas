import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as lucideIcons from "lucide-react";
import { ArrowRight, Download, ExternalLink, LayoutTemplate } from "lucide-react";
import { cn } from "@/lib/utils";
import SiteSeo, { TEMPLATES_PAGE_OG_IMAGE } from "@/components/seo/SiteSeo";
import { GITHUB_REPO } from "../agencyConfig";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { listFreeCrmTemplates } from "@/lib/freeCrmTemplates";
import { OTHER_TEMPLATES } from "../agencyConfig";

const SITE_URL = "https://saascrm.site";

const fadeUp = {
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.45 },
};

const ACCENT = {
	violet: "from-violet-500/20 to-violet-500/5",
	blue: "from-blue-500/20 to-blue-500/5",
	emerald: "from-emerald-500/20 to-emerald-500/5",
	amber: "from-amber-500/20 to-amber-500/5",
	rose: "from-rose-500/20 to-rose-500/5",
	teal: "from-teal-500/20 to-teal-500/5",
	zinc: "from-zinc-500/20 to-zinc-500/5",
};

function TemplatesContent() {
	const { isLight } = useAgencyTheme();
	const templates = listFreeCrmTemplates();

	const templatesJsonLd = {
		"@context": "https://schema.org",
		"@type": "CollectionPage",
		name: "Free CRM Templates – SaaSCRM",
		description:
			"Download free Next.js + Tailwind CRM starters for Stripe billing, agencies, freelancers, creators, and digital stores.",
		url: `${SITE_URL}/templates`,
		isPartOf: { "@type": "WebSite", name: "SaaSCRM", url: SITE_URL },
		primaryImageOfPage: {
			"@type": "ImageObject",
			url: `${SITE_URL}${TEMPLATES_PAGE_OG_IMAGE.path}`,
		},
		mainEntity: {
			"@type": "ItemList",
			itemListElement: templates.map((tpl, index) => ({
				"@type": "ListItem",
				position: index + 1,
				url: `${SITE_URL}/templates/${tpl.id}`,
				name: tpl.name,
				description: tpl.tagline,
			})),
		},
	};

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
			{
				"@type": "ListItem",
				position: 2,
				name: "Free CRM templates",
				item: `${SITE_URL}/templates`,
			},
		],
	};

	return (
		<>
			<SiteSeo
				title="Free CRM Templates – Next.js Dashboards for Startups | SaaSCRM"
				description="Download free open-source Next.js CRM templates for Stripe billing, agencies, freelancers, creators, and clinics. Slim AST-backed starters — full 60+ screen SaaSCRM kit on GitHub (MIT)."
				path="/templates"
				keywords="free CRM template, Next.js CRM, open source CRM, freelancer CRM, Stripe CRM UI, agency CRM template, SaaS admin template free download"
				images={[TEMPLATES_PAGE_OG_IMAGE]}
				jsonLd={[templatesJsonLd, breadcrumbJsonLd]}
			/>

			<motion.header {...fadeUp} className="mb-10 text-center">
				<div className="mb-3 flex justify-center">
					<span
						className={cn(
							"inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
							isLight ? "border-zinc-200 bg-white/80" : "border-zinc-700 bg-zinc-900/80"
						)}
					>
						<LayoutTemplate className="h-3.5 w-3.5" />
						Free open templates
					</span>
				</div>
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight sm:text-4xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					CRM templates for major categories
				</h1>
				<p
					className={cn(
						"mx-auto mt-3 max-w-xl text-sm sm:text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Pick a vertical AST-backed CRM, read the guide, and download a slim
					Next.js + Tailwind starter. The full SaaSCRM kit + Figma stays on the
					paid listing.
				</p>
			</motion.header>

			<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				{templates.map((tpl, index) => {
					const Icon = lucideIcons[tpl.icon] || lucideIcons.LayoutDashboard;
					const gradient = ACCENT[tpl.accent] || ACCENT.zinc;
					const detailHref = `/templates/${tpl.id}`;
					return (
						<motion.div
							key={tpl.id}
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.05 * index }}
							className={cn(
								"group flex h-full flex-col overflow-hidden rounded-2xl border transition-colors",
								isLight
									? "border-zinc-200 bg-white/70 hover:border-zinc-300"
									: "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"
							)}
						>
							<Link href={detailHref} passHref>
								<a
									className={cn(
										"relative block aspect-[16/10] overflow-hidden bg-gradient-to-br",
										gradient
									)}
								>
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img
										src={tpl.image}
										alt={tpl.name}
										className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
									/>
									{tpl.badge ? (
										<Badge className="absolute left-3 top-3 border-0 bg-black/70 text-white hover:bg-black/70">
											{tpl.badge}
										</Badge>
									) : null}
								</a>
							</Link>
							<div className="flex flex-1 flex-col gap-2 p-4">
								<div className="flex items-start gap-2">
									<div
										className={cn(
											"mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
											isLight ? "bg-zinc-100" : "bg-zinc-800"
										)}
									>
										<Icon className="h-4 w-4" />
									</div>
									<div className="min-w-0">
										<Link href={detailHref} passHref>
											<a>
												<h2
													className={cn(
														"text-base font-semibold transition-colors",
														isLight
															? "text-zinc-900 hover:text-zinc-700"
															: "text-white hover:text-zinc-200"
													)}
												>
													{tpl.name}
												</h2>
											</a>
										</Link>
										<p
											className={cn(
												"mt-0.5 text-xs leading-relaxed",
												isLight ? "text-zinc-600" : "text-zinc-400"
											)}
										>
											{tpl.tagline}
										</p>
									</div>
								</div>
								<Link href={detailHref} passHref>
									<a
										className={cn(
											"mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium",
											isLight ? "text-zinc-900" : "text-zinc-100"
										)}
									>
										View details
										<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
									</a>
								</Link>
							</div>
						</motion.div>
					);
				})}
			</div>

			<p
				className={cn(
					"mt-8 text-center text-xs",
					isLight ? "text-zinc-500" : "text-zinc-500"
				)}
			>
				<Download className="mr-1 inline h-3.5 w-3.5" />
				Email required once per download · We never sell your address ·{" "}
				<a
					href={GITHUB_REPO.url}
					target="_blank"
					rel="noopener noreferrer"
					className="underline underline-offset-2"
				>
					Full kit on GitHub
				</a>
			</p>

			<section className="mt-14">
				<div className="mb-6 text-center">
					<p
						className={cn(
							"text-xs font-medium uppercase tracking-wider",
							isLight ? "text-zinc-500" : "text-zinc-500"
						)}
					>
						More templates
					</p>
					<h2
						className={cn(
							"mt-2 text-xl font-bold tracking-tight sm:text-2xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						Also on Gumroad
					</h2>
					<p
						className={cn(
							"mx-auto mt-2 max-w-lg text-sm",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						Live demos for Indie SaaS, freelancers, and real estate — paid
						templates with full polish.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{OTHER_TEMPLATES.map((item, index) => (
						<motion.div
							key={item.id}
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, delay: 0.05 * index }}
							className={cn(
								"group flex flex-col overflow-hidden rounded-2xl border transition-colors",
								isLight
									? "border-zinc-200 bg-white/70 hover:border-zinc-300"
									: "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"
							)}
						>
							<a
								href={item.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="relative block aspect-[16/10] overflow-hidden"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={item.image}
									alt={item.imageAlt}
									className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
									loading="lazy"
								/>
							</a>
							<div className="flex flex-1 flex-col gap-3 p-4">
								<div>
									<h3
										className={cn(
											"text-sm font-semibold",
											isLight ? "text-zinc-900" : "text-white"
										)}
									>
										{item.name}
									</h3>
									<p
										className={cn(
											"mt-1 text-xs leading-relaxed",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										{item.tagline}
									</p>
								</div>
								<div className="mt-auto flex flex-wrap gap-2">
									<Button
										asChild
										size="sm"
										className={cn(
											"rounded-full",
											isLight
												? "bg-zinc-900 text-white hover:bg-zinc-800"
												: "bg-zinc-100 text-zinc-900 hover:bg-white"
										)}
									>
										<a
											href={item.demoUrl}
											target="_blank"
											rel="noopener noreferrer"
										>
											Live demo
											<ExternalLink className="h-3.5 w-3.5" />
										</a>
									</Button>
									<Button
										asChild
										size="sm"
										variant="outline"
										className={cn(
											"rounded-full",
											isLight
												? "border-zinc-300 bg-transparent"
												: "border-zinc-600 bg-transparent"
										)}
									>
										<a
											href={item.gumroadUrl}
											target="_blank"
											rel="noopener noreferrer"
										>
											Gumroad
										</a>
									</Button>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</section>
		</>
	);
}

export default function TemplatesPage() {
	return (
		<AgencyShell wide>
			<TemplatesContent />
		</AgencyShell>
	);
}

TemplatesPage.disableLayout = true;
