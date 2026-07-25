import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, LayoutGrid, LayoutList } from "lucide-react";
import { cn } from "@/lib/utils";
import SiteSeo from "@/components/seo/SiteSeo";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";

function formatDate(iso) {
	if (!iso) return "";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
}

function ViewToggle({ view, onChange, isLight }) {
	const options = [
		{ id: "list", label: "List view", icon: LayoutList },
		{ id: "grid", label: "Grid view", icon: LayoutGrid },
	];

	return (
		<div
			className={cn(
				"inline-flex items-center gap-0.5 rounded-xl border p-0.5",
				isLight ? "border-zinc-200 bg-white/80" : "border-zinc-700 bg-zinc-950"
			)}
			role="group"
			aria-label="Blog layout"
		>
			{options.map(({ id, label, icon: Icon }) => {
				const active = view === id;
				return (
					<button
						key={id}
						type="button"
						onClick={() => onChange(id)}
						aria-label={label}
						aria-pressed={active}
						className={cn(
							"inline-flex h-8 w-8 items-center justify-center rounded-xl transition-colors",
							active
								? isLight
									? "bg-zinc-200 text-zinc-900"
									: "bg-zinc-800 text-zinc-200"
								: isLight
									? "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800"
									: "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
						)}
					>
						<Icon className="h-4 w-4" />
					</button>
				);
			})}
		</div>
	);
}

function BlogIndexContent({ posts }) {
	const { isLight } = useAgencyTheme();
	const [view, setView] = useState("list");
	const isGrid = view === "grid";

	return (
		<>
			<SiteSeo
				title="Blog – CRM tips for startups & indie hackers | SaaSCRM"
				description="SEO-friendly notes on CRM, admin dashboards, and CMS — from the creator of SaaSCRM for startups, agencies, and indie hackers."
				path="/blog"
				keywords="CRM blog, SaaS CRM tips, indie hacker CRM, admin dashboard, CMS for startups"
			/>

			<header className="mb-10">
				<div className="flex items-center justify-between gap-3">
					<p
						className={cn(
							"text-xs font-medium uppercase tracking-wider",
							isLight ? "text-violet-700" : "text-violet-300"
						)}
					>
						Blog
					</p>
					<ViewToggle view={view} onChange={setView} isLight={isLight} />
				</div>
				<h1
					className={cn(
						"mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					Notes on CRM, admin & shipping faster
				</h1>
				<p
					className={cn(
						"mt-3 text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Blog posts from the SaaSCRM team — practical tips for founders, indie-hackers, and SaaS agencies.
				</p>
			</header>

			<ul
				className={cn(
					isGrid
						? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
						: "flex flex-col space-y-6"
				)}
			>
				{posts.map((post) => (
					<li key={post.slug} className={isGrid ? "h-full" : undefined}>
						<Link href={`/blog/${post.slug}`} passHref>
							<a
								className={cn(
									"group block h-full overflow-hidden rounded-2xl border transition-colors",
									isLight
										? "border-zinc-200 bg-white/70 hover:border-zinc-300"
										: "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"
								)}
							>
								{post.meta.image ? (
									<div
										className={cn(
											"overflow-hidden",
											isGrid ? "aspect-[16/10]" : "aspect-[2.2/1]"
										)}
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={post.meta.image}
											alt={post.meta.imageAlt || post.meta.title}
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
										/>
									</div>
								) : null}
								<div className={cn(isGrid ? "p-4" : "p-5 sm:p-6")}>
									<p className="text-xs text-zinc-500">
										{formatDate(post.meta.date)}
										{post.meta.author ? ` · ${post.meta.author}` : ""}
									</p>
									<h2
										className={cn(
											"mt-2 font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4",
											isGrid ? "text-base" : "text-xl",
											isLight ? "text-zinc-900" : "text-zinc-50"
										)}
									>
										{post.meta.title}
									</h2>
									{post.meta.description ? (
										<p
											className={cn(
												"mt-2 line-clamp-2 text-sm",
												isLight ? "text-zinc-600" : "text-zinc-400"
											)}
										>
											{post.meta.description}
										</p>
									) : null}
									<span
										className={cn(
											"mt-4 inline-flex items-center gap-1 text-sm font-medium",
											isLight ? "text-violet-700" : "text-violet-300"
										)}
									>
										Read post
										<ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
									</span>
								</div>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}

export default function BlogIndexPage({ posts = [] }) {
	return (
		<AgencyShell size="wide">
			<BlogIndexContent posts={posts} />
		</AgencyShell>
	);
}

BlogIndexPage.disableLayout = true;
