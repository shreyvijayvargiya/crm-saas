import React, { useState } from "react";
import { Check, Copy, ExternalLink, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CHECKOUT, getChatGptAskUrl, LLM_SHARE_PROMPT } from "../agencyConfig";
import { useAgencyTheme } from "../AgencyThemeContext";

function ChatGptIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 5.985 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.76a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.496zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.763a.771.771 0 0 0 .78 0l5.843-3.375v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.784-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
		</svg>
	);
}

/**
 * Copy prompt (any LLM) + Ask ChatGPT (?q= fills input / often auto-sends) + Buy now.
 * @param {"default" | "hero"} [variant]
 */
export default function LlmShareActions({
	className,
	variant = "default",
	prompt = LLM_SHARE_PROMPT,
}) {
	const { isLight } = useAgencyTheme();
	const [copied, setCopied] = useState(false);
	const isHero = variant === "hero";

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(prompt);
			setCopied(true);
			toast.success("Prompt copied — paste into any AI");
			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error("Could not copy prompt");
		}
	};

	const chatGptUrl = getChatGptAskUrl(prompt);

	const baseBtn = cn(
		"inline-flex items-center gap-1.5 font-medium transition",
		isHero
			? "rounded-full border px-4 py-2 text-xs font-semibold hover:-translate-y-0.5"
			: "rounded-full border px-3 py-1.5 text-xs"
	);

	const outlineBtn = cn(
		baseBtn,
		isLight
			? isHero
				? "border-zinc-300 bg-white text-zinc-800 shadow-sm hover:border-zinc-400"
				: "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
			: isHero
				? "border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-500"
				: "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
	);

	const chatGptBtn = cn(
		baseBtn,
		isLight
			? isHero
				? "border-emerald-300 bg-emerald-50 text-emerald-900 shadow-sm hover:border-emerald-400"
				: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-300"
			: isHero
				? "border-emerald-500/40 bg-emerald-500/15 text-emerald-200 hover:border-emerald-400/60"
				: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400/50"
	);

	const buyBtn = cn(
		baseBtn,
		isLight
			? "border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800"
			: "border-zinc-100 bg-zinc-100 text-zinc-900 hover:bg-white"
	);

	return (
		<div
			className={cn(
				"flex flex-col gap-2",
				isHero ? "items-center" : "items-start",
				className
			)}
		>
			<div className="flex flex-wrap items-center gap-2">
				<a
					href={chatGptUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={chatGptBtn}
					aria-label="Ask ChatGPT about SaaSCRM"
				>
					<ChatGptIcon className="h-3.5 w-3.5" />
					Ask ChatGPT
					<ExternalLink className="h-3 w-3 opacity-70" />
				</a>
				<a
					href={CHECKOUT.usd}
					target="_blank"
					rel="noopener noreferrer"
					className={buyBtn}
					aria-label="Buy SaaSCRM template on Gumroad"
				>
					<ShoppingBag className="h-3.5 w-3.5" />
					Buy now
					<ExternalLink className="h-3 w-3 opacity-70" />
				</a>
			</div>
		</div>
	);
}
