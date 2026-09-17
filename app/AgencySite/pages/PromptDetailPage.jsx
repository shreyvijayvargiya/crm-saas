import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SiteSeo, { HOME_OG_IMAGE } from "@/components/seo/SiteSeo";
import AgencyShell from "../components/AgencyShell";
import MarkdownContent from "../components/MarkdownContent";
import { useAgencyTheme } from "../AgencyThemeContext";

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

function PromptDetailContent({ prompt }) {
	const { isLight } = useAgencyTheme();
	const [copied, setCopied] = useState(false);
	const [tab, setTab] = useState(prompt.variants?.[0]?.id || "default");
	const hasTabs = Boolean(prompt.variants?.length);
	const activeMarkdown = hasTabs
		? prompt.variants.find((v) => v.id === tab)?.content || prompt.variants[0].content
		: prompt.content;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(activeMarkdown);
			setCopied(true);
			toast.success("Prompt copied — paste it in Cursor or Claude");
			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error("Could not copy prompt");
		}
	};

	const navBtn = (disabled) =>
		cn(
			"inline-flex h-8 items-center gap-1 rounded-full border px-3 text-sm font-medium transition-colors",
			disabled
				? isLight
					? "pointer-events-none border-zinc-100 text-zinc-300"
					: "pointer-events-none border-zinc-800 text-zinc-700"
				: isLight
					? "border-zinc-200 bg-white/80 text-zinc-700 hover:bg-zinc-50"
					: "border-zinc-700 bg-zinc-950 text-zinc-200 hover:bg-zinc-900"
		);

	return (
		<>
			<SiteSeo
				title={`${prompt.title} | SaaSCRM Prompts`}
				description={prompt.description}
				path={`/prompts/${prompt.slug}`}
				keywords={(prompt.tags || []).join(", ")}
				images={[HOME_OG_IMAGE]}
			/>

			<div className="mb-8 flex flex-wrap items-center justify-between gap-3">
				<nav
					className={cn(
						"flex min-w-0 flex-wrap items-center gap-1.5 text-sm",
						isLight ? "text-zinc-500" : "text-zinc-500"
					)}
					aria-label="Breadcrumb"
				>
					<Link href="/prompts" passHref>
						<a
							className={cn(
								"font-medium hover:underline hover:underline-offset-4",
								isLight ? "text-zinc-700 hover:text-zinc-900" : "text-zinc-300 hover:text-white"
							)}
						>
							prompts
						</a>
					</Link>
					<span aria-hidden>/</span>
					<span className={cn("truncate font-medium", isLight ? "text-zinc-900" : "text-zinc-100")}>
						{prompt.title}
					</span>
				</nav>

				<div className="ml-auto flex items-center gap-2">
					{prompt.prev ? (
						<Link href={`/prompts/${prompt.prev.slug}`} passHref>
							<a className={navBtn(false)} aria-label={`Previous: ${prompt.prev.title}`}>
								<ArrowLeft className="h-3.5 w-3.5" />
								Prev
							</a>
						</Link>
					) : (
						<span className={navBtn(true)}>
							<ArrowLeft className="h-3.5 w-3.5" />
							Prev
						</span>
					)}
					{prompt.next ? (
						<Link href={`/prompts/${prompt.next.slug}`} passHref>
							<a className={navBtn(false)} aria-label={`Next: ${prompt.next.title}`}>
								Next
								<ArrowRight className="h-3.5 w-3.5" />
							</a>
						</Link>
					) : (
						<span className={navBtn(true)}>
							Next
							<ArrowRight className="h-3.5 w-3.5" />
						</span>
					)}
				</div>
			</div>

			<article>
				<header className="mb-6">
					<p
						className={cn(
							"text-xs font-medium uppercase tracking-wider",
							isLight ? "text-violet-700" : "text-violet-300"
						)}
					>
						{prompt.eyebrow}
					</p>
					<h1
						className={cn(
							"mt-2 text-3xl font-bold tracking-tight sm:text-4xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						{prompt.title}
					</h1>
					{prompt.description ? (
						<p
							className={cn(
								"mt-3 text-lg leading-relaxed",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							{prompt.description}
						</p>
					) : null}
					<p className="mt-3 text-sm text-zinc-500">
						Last updated {formatDate(prompt.updatedAt)}
					</p>
					<button
						type="button"
						onClick={handleCopy}
						className={cn(
							"mt-5 inline-flex h-9 items-center gap-1.5 rounded-full border px-4 text-sm font-semibold transition-colors",
							isLight
								? "border-zinc-200 bg-white text-zinc-800 shadow-sm hover:border-zinc-400"
								: "border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-500"
						)}
					>
						{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
						{copied ? "Copied" : "Copy prompt"}
					</button>
				</header>

				{hasTabs ? (
					<Tabs value={tab} onValueChange={setTab} className="mt-2">
						<TabsList
							className={cn(
								"h-11 w-full justify-start sm:w-auto",
								isLight ? "bg-zinc-100" : "bg-zinc-900"
							)}
						>
							{prompt.variants.map((variant) => (
								<TabsTrigger key={variant.id} value={variant.id} className="px-4">
									{variant.label}
								</TabsTrigger>
							))}
						</TabsList>
						{prompt.variants.map((variant) => (
							<TabsContent key={variant.id} value={variant.id} className="mt-6">
								<MarkdownContent content={variant.content} isLight={isLight} />
							</TabsContent>
						))}
					</Tabs>
				) : (
					<div className="mt-6">
						<MarkdownContent content={prompt.content} isLight={isLight} />
					</div>
				)}
			</article>

			{prompt.similar?.length ? (
				<section className="mt-16 pt-10 dark:border-zinc-800">
					<p
						className={cn(
							"text-xs font-medium uppercase tracking-wider",
							isLight ? "text-violet-700" : "text-violet-300"
						)}
					>
						Similar prompts
					</p>
					<ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
						{prompt.similar.map((item) => (
							<li key={item.slug}>
								<Link href={`/prompts/${item.slug}`} passHref>
									<a
										className={cn(
											"block rounded-2xl border p-4 transition-colors",
											isLight
												? "border-zinc-200 bg-white/70 hover:border-zinc-300"
												: "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"
										)}
									>
										<h2
											className={cn(
												"text-sm font-semibold",
												isLight ? "text-zinc-900" : "text-zinc-50"
											)}
										>
											{item.title}
										</h2>
										<p
											className={cn(
												"mt-1 line-clamp-2 text-xs",
												isLight ? "text-zinc-600" : "text-zinc-400"
											)}
										>
											{item.description}
										</p>
									</a>
								</Link>
							</li>
						))}
					</ul>
				</section>
			) : null}
		</>
	);
}

export default function PromptDetailPage({ prompt }) {
	if (!prompt) return null;

	return (
		<AgencyShell size="article">
			<PromptDetailContent key={prompt.slug} prompt={prompt} />
		</AgencyShell>
	);
}

PromptDetailPage.disableLayout = true;
