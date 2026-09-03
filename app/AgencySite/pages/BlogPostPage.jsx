import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import SiteSeo, { absoluteImageUrl, HOME_OG_IMAGE } from "@/components/seo/SiteSeo";
import AgencyShell from "../components/AgencyShell";
import MarkdownContent from "../components/MarkdownContent";
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

function XIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

function MorePostsGrid({ posts, isLight }) {
	if (!posts?.length) return null;

	return (
		<section className="mt-16 pt-12 dark:border-zinc-800">
			<div className="mb-6 flex items-end justify-between gap-3">
				<div>
					<p
						className={cn(
							"text-xs font-medium uppercase tracking-wider",
							isLight ? "text-violet-700" : "text-violet-300"
						)}
					>
						Keep reading
					</p>
					<h2
						className={cn(
							"mt-1 text-xl font-bold tracking-tight sm:text-2xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						More from the blog
					</h2>
				</div>
				<Link href="/blog" passHref>
					<a
						className={cn(
							"hidden text-sm font-medium sm:inline-flex sm:items-center sm:gap-1",
							isLight ? "text-zinc-600 hover:text-zinc-900" : "text-zinc-400 hover:text-white"
						)}
					>
						All posts
						<ArrowRight className="h-3.5 w-3.5" />
					</a>
				</Link>
			</div>

			<ul className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-5">
				{posts.map((post) => (
					<li key={post.slug} className="h-full">
						<Link href={`/blog/${post.slug}`} passHref>
							<a
								className={cn(
									"group flex h-full flex-col overflow-hidden rounded-2xl border transition-colors",
									isLight
										? "border-zinc-200 bg-white/70 hover:border-zinc-300"
										: "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"
								)}
							>
								{post.meta.image ? (
									<div className="aspect-[16/10] overflow-hidden">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={post.meta.image}
											alt={post.meta.imageAlt || post.meta.title}
											className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
										/>
									</div>
								) : null}
								<div className="flex flex-1 flex-col p-4">
									<p className="text-xs text-zinc-500">{formatDate(post.meta.date)}</p>
									<h3
										className={cn(
											"mt-1.5 text-sm font-semibold leading-snug tracking-tight group-hover:underline group-hover:underline-offset-4 sm:text-base",
											isLight ? "text-zinc-900" : "text-zinc-50"
										)}
									>
										{post.meta.title}
									</h3>
									{post.meta.description ? (
										<p
											className={cn(
												"mt-2 line-clamp-2 flex-1 text-xs sm:text-sm",
												isLight ? "text-zinc-600" : "text-zinc-400"
											)}
										>
											{post.meta.description}
										</p>
									) : null}
								</div>
							</a>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}

function BlogPostContent({ post, morePosts = [] }) {
	const { isLight } = useAgencyTheme();
	const [copied, setCopied] = useState(false);
	const { meta, content, slug } = post;
	const pageUrl = `https://saascrm.site/blog/${slug}`;
	const shareText = `${meta.title} — via SaaSCRM`;
	const shareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		shareText
	)}&url=${encodeURIComponent(pageUrl)}`;
	const tags = Array.isArray(meta.tags) ? meta.tags : [];
	const faq = Array.isArray(meta.faq) ? meta.faq : [];
	const coverSrc = absoluteImageUrl(meta.image);
	const seoTitle = meta.metaTitle || meta.title;

	const jsonLd = [
		{
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: meta.title,
			description: meta.description,
			image: coverSrc,
			datePublished: meta.date,
			author: {
				"@type": "Person",
				name: meta.author || "Shrey",
				url: "https://saascrm.site",
			},
			publisher: {
				"@type": "Organization",
				name: "SaaSCRM",
				url: "https://saascrm.site",
			},
			keywords: meta.keywords,
			articleSection: tags[0] || "CRM",
			mainEntityOfPage: pageUrl,
			url: pageUrl,
			speakable: {
				"@type": "SpeakableSpecification",
				cssSelector: ["article h1", "article h2"],
			},
		},
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: "https://saascrm.site",
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Blog",
					item: "https://saascrm.site/blog",
				},
				{
					"@type": "ListItem",
					position: 3,
					name: meta.title,
					item: pageUrl,
				},
			],
		},
	];
	if (faq.length) {
		jsonLd.push({
			"@context": "https://schema.org",
			"@type": "FAQPage",
			mainEntity: faq.map((item) => ({
				"@type": "Question",
				name: item.q,
				acceptedAnswer: {
					"@type": "Answer",
					text: item.a,
				},
			})),
		});
	}

	const handleCopyMarkdown = async () => {
		try {
			await navigator.clipboard.writeText(content);
			setCopied(true);
			toast.success("Markdown copied");
			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error("Could not copy markdown");
		}
	};

	return (
		<>
			<SiteSeo
				title={`${seoTitle} | SaaSCRM Blog`}
				description={meta.description}
				path={`/blog/${slug}`}
				keywords={meta.keywords}
				type="article"
				images={[
					{
						path: meta.image || HOME_OG_IMAGE.path,
						alt: meta.imageAlt || meta.title,
						width: 1200,
						height: 630,
					},
				]}
				article={{
					publishedTime: meta.date,
					author: meta.author,
					tags,
				}}
				jsonLd={jsonLd}
			/>

			<article>
				<div className="mb-6 flex flex-wrap items-center justify-between gap-3">
					<Link href="/blog" passHref>
						<a
							className={cn(
								"inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors",
								isLight
									? "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
									: "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
							)}
						>
							<ArrowLeft className="h-4 w-4" />
							Back to blogs
						</a>
					</Link>

					<div className="flex flex-wrap items-center gap-2">
						<button
							type="button"
							onClick={handleCopyMarkdown}
							className={cn(
								"inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors",
								isLight
									? "border-zinc-200 bg-white/80 text-zinc-700 hover:bg-zinc-50"
									: "border-zinc-700 bg-zinc-950 text-zinc-200 hover:bg-zinc-900"
							)}
						>
							{copied ? (
								<Check className="h-3.5 w-3.5" />
							) : (
								<Copy className="h-3.5 w-3.5" />
							)}
							{copied ? "Copied" : "Copy markdown"}
						</button>
						<a
							href={shareHref}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-sm font-medium transition-colors",
								isLight
									? "border-zinc-200 bg-white/80 text-zinc-700 hover:bg-zinc-50"
									: "border-zinc-700 bg-zinc-950 text-zinc-200 hover:bg-zinc-900"
							)}
						>
							<XIcon className="h-3.5 w-3.5" />
							Share on X
							<ExternalLink className="h-3 w-3 opacity-60" />
						</a>
					</div>
				</div>

				{meta.image ? (
					<div
						className={cn(
							"mb-8 overflow-hidden rounded-2xl border",
							isLight ? "border-zinc-200" : "border-zinc-800"
						)}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={meta.image}
							alt={meta.imageAlt || meta.title}
							className="aspect-[2.2/1] w-full object-cover"
						/>
					</div>
				) : null}

				<header className="mb-8">
					<p className="text-sm text-zinc-500">
						{formatDate(meta.date)}
						{meta.author ? ` · ${meta.author}` : ""}
					</p>
					{tags.length ? (
						<ul className="mt-3 flex flex-wrap gap-2">
							{tags.map((tag) => (
								<li
									key={tag}
									className={cn(
										"rounded-full border px-2.5 py-0.5 text-xs font-medium",
										isLight
											? "border-zinc-200 bg-zinc-50 text-zinc-600"
											: "border-zinc-700 bg-zinc-900 text-zinc-300"
									)}
								>
									{tag}
								</li>
							))}
						</ul>
					) : null}
					<h1
						className={cn(
							"mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						{meta.title}
					</h1>
					{meta.description ? (
						<p
							className={cn(
								"mt-4 text-lg leading-relaxed",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							{meta.description}
						</p>
					) : null}
				</header>

				<MarkdownContent content={content} isLight={isLight} />
			</article>

			<MorePostsGrid posts={morePosts} isLight={isLight} />
		</>
	);
}

export default function BlogPostPage({ post, morePosts = [] }) {
	if (!post) return null;

	return (
		<AgencyShell size="wide">
			<BlogPostContent post={post} morePosts={morePosts} />
		</AgencyShell>
	);
}

BlogPostPage.disableLayout = true;
