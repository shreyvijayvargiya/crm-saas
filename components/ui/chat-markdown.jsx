import React from "react";
import { cn } from "@/lib/utils";

function renderInline(text, keyPrefix = "") {
	if (!text) return null;

	const parts = [];
	const pattern = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
	let lastIndex = 0;
	let match;
	let i = 0;

	while ((match = pattern.exec(text)) !== null) {
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}
		if (match[2] != null) {
			parts.push(
				<strong key={`${keyPrefix}-b-${i}`} className="font-semibold">
					{match[2]}
				</strong>
			);
		} else if (match[3] != null) {
			parts.push(
				<em key={`${keyPrefix}-i-${i}`} className="italic">
					{match[3]}
				</em>
			);
		} else if (match[4] != null) {
			parts.push(
				<code
					key={`${keyPrefix}-c-${i}`}
					className="rounded bg-muted/60 px-1 py-0.5 font-mono text-[10px]"
				>
					{match[4]}
				</code>
			);
		}
		lastIndex = match.index + match[0].length;
		i += 1;
	}

	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}

	return parts.length === 1 && typeof parts[0] === "string" ? parts[0] : parts;
}

function parseBlocks(content) {
	const lines = String(content ?? "").replace(/\r\n/g, "\n").split("\n");
	const blocks = [];
	let listItems = [];
	let paragraph = [];

	const flushParagraph = () => {
		if (paragraph.length) {
			blocks.push({ type: "p", text: paragraph.join(" ") });
			paragraph = [];
		}
	};

	const flushList = () => {
		if (listItems.length) {
			blocks.push({ type: "ul", items: listItems });
			listItems = [];
		}
	};

	for (const line of lines) {
		const trimmed = line.trim();

		if (!trimmed) {
			flushParagraph();
			flushList();
			continue;
		}

		const bullet = trimmed.match(/^[-*•]\s+(.+)$/);
		if (bullet) {
			flushParagraph();
			listItems.push(bullet[1]);
			continue;
		}

		const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
		if (heading) {
			flushParagraph();
			flushList();
			blocks.push({ type: "h", level: heading[1].length, text: heading[2] });
			continue;
		}

		flushList();
		paragraph.push(trimmed);
	}

	flushParagraph();
	flushList();
	return blocks;
}

export function ChatMarkdown({ content, className, inverted = false }) {
	const blocks = parseBlocks(content);

	if (!blocks.length) return null;

	return (
		<div className={cn("space-y-2", className)}>
			{blocks.map((block, index) => {
				if (block.type === "h") {
					const Tag = block.level === 1 ? "h3" : block.level === 2 ? "h4" : "h5";
					return (
						<Tag
							key={index}
							className={cn(
								"font-semibold leading-snug",
								block.level === 1 ? "text-sm" : "text-xs"
							)}
						>
							{renderInline(block.text, `h-${index}`)}
						</Tag>
					);
				}

				if (block.type === "ul") {
					return (
						<ul
							key={index}
							className={cn(
								"ml-1 list-none space-y-1",
								inverted ? "text-primary-foreground" : "text-card-foreground"
							)}
						>
							{block.items.map((item, itemIndex) => (
								<li key={itemIndex} className="flex gap-2">
									<span
										className={cn(
											"mt-[0.35rem] h-1 w-1 shrink-0 rounded-full",
											inverted ? "bg-primary-foreground/80" : "bg-muted-foreground"
										)}
									/>
									<span className="min-w-0 flex-1">
										{renderInline(item, `li-${index}-${itemIndex}`)}
									</span>
								</li>
							))}
						</ul>
					);
				}

				return (
					<p key={index} className="leading-relaxed">
						{renderInline(block.text, `p-${index}`)}
					</p>
				);
			})}
		</div>
	);
}
