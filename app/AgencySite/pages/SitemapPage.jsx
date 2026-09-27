import React, { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	ArrowUpRight,
	ExternalLink,
	Mail,
	Map,
	Search,
	Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { CONTACT } from "../agencyConfig";
import { getSitemapGroups, SITEMAP_PATHS } from "../sitemapConfig";
import SiteSeo, { HOME_OG_IMAGE } from "@/components/seo/SiteSeo";

function SitemapContent({ blogPosts = [] }) {
	const { isLight } = useAgencyTheme();
	const [query, setQuery] = useState("");
	const normalizedQuery = query.trim().toLowerCase();
	const sitemapGroups = useMemo(() => getSitemapGroups(blogPosts), [blogPosts]);

	const groups = useMemo(() => {
		if (!normalizedQuery) return sitemapGroups;
		return sitemapGroups
			.map((group) => ({
				...group,
				links: group.links.filter(
					(link) =>
						link.label.toLowerCase().includes(normalizedQuery) ||
						link.href.toLowerCase().includes(normalizedQuery)
				),
			}))
			.filter((group) => group.links.length > 0);
	}, [normalizedQuery, sitemapGroups]);

	const resultCount = groups.reduce((total, group) => total + group.links.length, 0);

	return (
		<>
			<motion.header
				initial={{ opacity: 0, y: 14 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="mb-8"
			>
				<Badge
					variant="outline"
					className={cn(
						"mb-4 gap-1.5",
						isLight
							? "border-blue-200 bg-blue-50 text-blue-700"
							: "border-blue-500/30 bg-blue-500/10 text-blue-300"
					)}
				>
					<Map className="h-3.5 w-3.5" />
					Complete product directory
				</Badge>
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight sm:text-4xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					SaaSCRM sitemap
				</h1>
				<p
					className={cn(
						"mt-3 max-w-xl text-sm leading-relaxed sm:text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Explore the public website, free AI builder, and every standalone
					CRM template screen.
				</p>

				<div className="relative mt-6">
					<Search
						className={cn(
							"pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2",
							isLight ? "text-zinc-400" : "text-zinc-500"
						)}
					/>
					<Input
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search pages, modules, or routes…"
						className={cn(
							"h-11 rounded-xl pl-10",
							isLight
								? "border-zinc-200 bg-white"
								: "border-zinc-700 bg-zinc-900 text-white"
						)}
					/>
				</div>
				<p
					className={cn(
						"mt-2 text-xs",
						isLight ? "text-zinc-500" : "text-zinc-500"
					)}
				>
					Showing {resultCount} of {SITEMAP_PATHS.length} routes
				</p>
			</motion.header>

			{groups.length ? (
				<div className="grid gap-4 sm:grid-cols-2">
					{groups.map((group, index) => (
						<motion.div
							key={group.title}
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.35, delay: index * 0.025 }}
						>
							<Card
								className={cn(
									"h-full p-4 sm:p-5",
									isLight
										? "border-zinc-200 bg-white shadow-sm"
										: "border-zinc-800 bg-zinc-900/60"
								)}
							>
								<div className="flex items-start justify-between gap-3">
									<div>
										<h2
											className={cn(
												"text-sm font-semibold",
												isLight ? "text-zinc-900" : "text-white"
											)}
										>
											{group.title}
										</h2>
										<p
											className={cn(
												"mt-1 text-xs leading-relaxed",
												isLight ? "text-zinc-500" : "text-zinc-500"
											)}
										>
											{group.description}
										</p>
									</div>
									<Badge
										variant="outline"
										className={cn(
											"shrink-0",
											isLight
												? "border-zinc-200 text-zinc-500"
												: "border-zinc-700 text-zinc-400"
										)}
									>
										{group.links.length}
									</Badge>
								</div>

								<nav
									className={cn(
										"mt-4 divide-y border-t",
										isLight
											? "divide-zinc-100 border-zinc-100"
											: "divide-zinc-800 border-zinc-800"
									)}
									aria-label={group.title}
								>
									{group.links.map((link) => {
										const external = /^https?:\/\//i.test(link.href);
										const rowClass = cn(
											"group flex items-center justify-between gap-3 py-2.5 text-xs font-medium transition",
											link.href === "/blueprint"
												? isLight
													? "text-violet-700"
													: "text-violet-300"
												: isLight
													? "text-zinc-700 hover:text-zinc-950"
													: "text-zinc-300 hover:text-white"
										);
										const inner = (
											<>
												<span className="flex items-center gap-2">
													{link.href === "/blueprint" ? (
														<Sparkles className="h-3.5 w-3.5" />
													) : null}
													{link.label}
												</span>
												<span className="flex items-center gap-2">
													<code
														className={cn(
															"hidden text-[10px] font-normal sm:inline",
															isLight ? "text-zinc-400" : "text-zinc-600"
														)}
													>
														{link.href}
													</code>
													{external ? (
														<ExternalLink className="h-3.5 w-3.5 opacity-40 transition group-hover:opacity-100" />
													) : (
														<ArrowUpRight className="h-3.5 w-3.5 opacity-40 transition group-hover:opacity-100" />
													)}
												</span>
											</>
										);
										return external ? (
											<a
												key={link.href}
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className={rowClass}
											>
												{inner}
											</a>
										) : (
											<Link key={link.href} href={link.href} passHref>
												<a className={rowClass}>{inner}</a>
											</Link>
										);
									})}
								</nav>
							</Card>
						</motion.div>
					))}
				</div>
			) : (
				<Card
					className={cn(
						"p-8 text-center",
						isLight
							? "border-zinc-200 bg-white"
							: "border-zinc-800 bg-zinc-900/60"
					)}
				>
					<p className={cn(isLight ? "text-zinc-600" : "text-zinc-400")}>
						No pages match “{query}”.
					</p>
				</Card>
			)}

			<Card
				className={cn(
					"mb-16 mt-8 overflow-hidden p-5 sm:p-6",
					isLight
						? "border-violet-200 bg-gradient-to-br from-violet-50 to-white"
						: "border-violet-500/25 bg-gradient-to-br from-violet-950/40 to-zinc-900"
				)}
			>
				<div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-center">
					<div>
						<h2
							className={cn(
								"text-base font-bold",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							Need help choosing the right pages?
						</h2>
						<p
							className={cn(
								"mt-2 text-sm leading-relaxed",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							Use the free AI CRM Builder or contact Shrey directly.
						</p>
					</div>
					<div className="flex flex-col gap-2 text-xs">
						<Link href="/blueprint" passHref>
							<a
								className={cn(
									"inline-flex items-center gap-2 rounded-lg border px-3 py-2 font-semibold",
									isLight
										? "border-violet-200 bg-white text-violet-700"
										: "border-violet-500/30 bg-violet-500/10 text-violet-300"
								)}
							>
								<Sparkles className="h-3.5 w-3.5" />
								Open AI CRM Builder
							</a>
						</Link>
						<a
							href={`mailto:${CONTACT.email}`}
							className={cn(
								"inline-flex items-center gap-2 px-3 py-1 font-medium",
								isLight ? "text-zinc-700" : "text-zinc-300"
							)}
						>
							<Mail className="h-3.5 w-3.5" />
							{CONTACT.email}
						</a>
						<a
							href={CONTACT.x}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"inline-flex items-center gap-2 px-3 py-1 font-medium",
								isLight ? "text-zinc-700" : "text-zinc-300"
							)}
						>
							<ExternalLink className="h-3.5 w-3.5" />
							x.com/treyvijay
						</a>
					</div>
				</div>
			</Card>
		</>
	);
}

export default function SitemapPage({ blogPosts = [] }) {
	return (
		<AgencyShell>
			<SiteSeo
				title="Sitemap – SaaSCRM marketing & product pages"
				description="Index of SaaSCRM marketing pages, free CRM templates, AI builder, blog, and product demos."
				path="/sitemap"
				images={[HOME_OG_IMAGE]}
			/>
			<SitemapContent blogPosts={blogPosts} />
		</AgencyShell>
	);
}

SitemapPage.disableLayout = true;
