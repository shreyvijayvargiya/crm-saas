import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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

function BlogIndexContent({ posts }) {
	const { isLight } = useAgencyTheme();

	return (
		<>
			<SiteSeo
				title="Blog – CRM tips for startups & indie hackers | SaaSCRM"
				description="SEO-friendly notes on CRM, admin dashboards, and CMS — from the creator of SaaSCRM for startups, agencies, and indie hackers."
				path="/blog"
				keywords="CRM blog, SaaS CRM tips, indie hacker CRM, admin dashboard, CMS for startups"
			/>

			<header className="mb-10">
				<p
					className={cn(
						"text-xs font-medium uppercase tracking-wider",
						isLight ? "text-violet-700" : "text-violet-300"
					)}
				>
					Blog
				</p>
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
					Markdown posts from the SaaSCRM team — practical, SEO-ready writing for
					founders building online businesses.
				</p>
			</header>

			<ul className="space-y-6">
				{posts.map((post) => (
					<li key={post.slug}>
						<Link href={`/blog/${post.slug}`} passHref>
							<a
								className={cn(
									"group block overflow-hidden rounded-2xl border transition-colors",
									isLight
										? "border-zinc-200 bg-white/70 hover:border-zinc-300"
										: "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"
								)}
							>
								{post.meta.image ? (
									<div className="aspect-[2.2/1] overflow-hidden">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={post.meta.image}
											alt={post.meta.imageAlt || post.meta.title}
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
										/>
									</div>
								) : null}
								<div className="p-5 sm:p-6">
									<p className="text-xs text-zinc-500">
										{formatDate(post.meta.date)}
										{post.meta.author ? ` · ${post.meta.author}` : ""}
									</p>
									<h2
										className={cn(
											"mt-2 text-xl font-semibold tracking-tight group-hover:underline group-hover:underline-offset-4",
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
		<AgencyShell size="article">
			<BlogIndexContent posts={posts} />
		</AgencyShell>
	);
}

BlogIndexPage.disableLayout = true;
