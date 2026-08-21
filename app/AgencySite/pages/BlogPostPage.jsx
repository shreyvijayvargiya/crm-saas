import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import SiteSeo, { absoluteImageUrl } from "@/components/seo/SiteSeo";
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

function BlogPostContent({ post }) {
	const { isLight } = useAgencyTheme();
	const [copied, setCopied] = useState(false);
	const { meta, content, slug } = post;
	const pageUrl = `https://saascrm.site/blog/${slug}`;
	const shareText = `${meta.title} — via SaaSCRM`;
	const shareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
		shareText
	)}&url=${encodeURIComponent(pageUrl)}`;
	const tags = Array.isArray(meta.tags) ? meta.tags : [];
	const coverSrc = absoluteImageUrl(meta.image);

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
				title={`${meta.title} | SaaSCRM Blog`}
				description={meta.description}
				path={`/blog/${slug}`}
				keywords={meta.keywords}
				type="article"
				images={[
					{
						path: meta.image,
						alt: meta.imageAlt || meta.title,
					},
				]}
				article={{
					publishedTime: meta.date,
					author: meta.author,
					tags,
				}}
				jsonLd={{
					"@context": "https://schema.org",
					"@type": "BlogPosting",
					headline: meta.title,
					description: meta.description,
					image: coverSrc,
					datePublished: meta.date,
					author: {
						"@type": "Person",
						name: meta.author || "Shrey",
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
				}}
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
		</>
	);
}

export default function BlogPostPage({ post }) {
	if (!post) return null;

	return (
		<AgencyShell size="article">
			<BlogPostContent post={post} />
		</AgencyShell>
	);
}

BlogPostPage.disableLayout = true;
