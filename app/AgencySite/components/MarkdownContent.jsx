import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

/**
 * Renders markdown with styled headings, lists, tables, quotes, links, and images.
 */
export default function MarkdownContent({ content, isLight = true, className }) {
	const prose = isLight
		? {
				text: "text-zinc-700",
				muted: "text-zinc-500",
				heading: "text-zinc-900",
				border: "border-zinc-200",
				quoteBorder: "border-zinc-300",
				quoteBg: "bg-zinc-100/80",
				codeBg: "bg-zinc-100 text-zinc-800",
				tableHead: "bg-zinc-100/80",
				link: "text-violet-700 hover:text-violet-900",
		  }
		: {
				text: "text-zinc-300",
				muted: "text-zinc-500",
				heading: "text-zinc-50",
				border: "border-zinc-800",
				quoteBorder: "border-zinc-600",
				quoteBg: "bg-zinc-900/60",
				codeBg: "bg-zinc-900 text-zinc-200",
				tableHead: "bg-zinc-900/80",
				link: "text-violet-300 hover:text-violet-200",
		  };

	return (
		<div
			className={cn(
				"markdown-body space-y-5 text-[15px] leading-7 sm:text-base sm:leading-8",
				prose.text,
				className
			)}
		>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					h1: ({ children }) => (
						<h1
							className={cn(
								"mt-10 scroll-mt-24 text-3xl font-bold tracking-tight sm:text-4xl",
								prose.heading
							)}
						>
							{children}
						</h1>
					),
					h2: ({ children }) => (
						<h2
							className={cn(
								"mt-10 scroll-mt-24 text-2xl font-semibold tracking-tight",
								prose.heading
							)}
						>
							{children}
						</h2>
					),
					h3: ({ children }) => (
						<h3
							className={cn(
								"mt-8 scroll-mt-24 text-xl font-semibold tracking-tight",
								prose.heading
							)}
						>
							{children}
						</h3>
					),
					p: ({ children }) => <p className="my-4">{children}</p>,
					a: ({ href, children }) => (
						<a
							href={href}
							target={href?.startsWith("http") ? "_blank" : undefined}
							rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
							className={cn(
								"font-medium underline underline-offset-4 decoration-violet-400/50 transition-colors",
								prose.link
							)}
						>
							{children}
						</a>
					),
					strong: ({ children }) => (
						<strong className={cn("font-semibold", prose.heading)}>{children}</strong>
					),
					em: ({ children }) => <em className="italic">{children}</em>,
					ul: ({ children }) => (
						<ul className="my-5 list-disc space-y-2 pl-6 marker:text-violet-500">
							{children}
						</ul>
					),
					ol: ({ children }) => (
						<ol className="my-5 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-violet-500">
							{children}
						</ol>
					),
					li: ({ children }) => <li className="pl-1">{children}</li>,
					blockquote: ({ children }) => (
						<blockquote
							className={cn(
								"my-6 rounded-r-xl border-l-4 py-3 pl-5 pr-4 italic",
								prose.quoteBorder,
								prose.quoteBg,
								prose.heading
							)}
						>
							{children}
						</blockquote>
					),
					hr: () => <hr className={cn("my-10 border-t", prose.border)} />,
					code: ({ inline, children }) =>
						inline ? (
							<code
								className={cn(
									"rounded-md px-1.5 py-0.5 font-mono text-[0.875em]",
									prose.codeBg
								)}
							>
								{children}
							</code>
						) : (
							<code
								className={cn(
									"block overflow-x-auto rounded-xl p-4 font-mono text-sm",
									prose.codeBg
								)}
							>
								{children}
							</code>
						),
					pre: ({ children }) => (
						<pre className={cn("my-6 overflow-x-auto rounded-xl", prose.codeBg)}>
							{children}
						</pre>
					),
					img: ({ src, alt }) => (
						<figure className="my-8">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={src}
								alt={alt || ""}
								className={cn(
									"w-full rounded-2xl border object-cover shadow-sm",
									prose.border
								)}
								loading="lazy"
							/>
							{alt ? (
								<figcaption className={cn("mt-2 text-center text-sm", prose.muted)}>
									{alt}
								</figcaption>
							) : null}
						</figure>
					),
					table: ({ children }) => (
						<div className={cn("my-8 overflow-x-auto rounded-xl border", prose.border)}>
							<table className="w-full min-w-[28rem] border-collapse text-left text-sm">
								{children}
							</table>
						</div>
					),
					thead: ({ children }) => (
						<thead className={cn(prose.tableHead, prose.heading)}>{children}</thead>
					),
					th: ({ children }) => (
						<th
							className={cn(
								"border-b px-4 py-3 font-semibold",
								prose.border
							)}
						>
							{children}
						</th>
					),
					td: ({ children }) => (
						<td className={cn("border-b px-4 py-3 align-top", prose.border)}>
							{children}
						</td>
					),
					tr: ({ children }) => <tr>{children}</tr>,
				}}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}
