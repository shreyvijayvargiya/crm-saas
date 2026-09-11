import React, { useState } from "react";
import { ChevronDown, ExternalLink, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	CHECKOUT,
	getLlmAskTargets,
	LLM_SHARE_PROMPT,
} from "../agencyConfig";
import { useAgencyTheme } from "../AgencyThemeContext";

function ChatGptIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 5.985 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.76a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.496zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.763a.771.771 0 0 0 .78 0l5.843-3.375v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.784-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365 2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
		</svg>
	);
}

function ClaudeIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M4.714 15.942 11.99 3l7.277 12.942H4.714Zm8.653-6.23-1.377-2.45-1.377 2.45h2.754Zm-6.54 5.14h10.346l-5.173-9.204-5.173 9.204Z" />
			<path d="M3 18.5h18v1.75H3z" />
		</svg>
	);
}

function PerplexityIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M12 2 4.5 6.5v11L12 22l7.5-4.5v-11L12 2Zm0 2.2 5.5 3.3v1.9L12 6.1 6.5 9.4V7.5L12 4.2Zm-5.5 5.7L12 7.6l5.5 2.3v1.9L12 9.5l-5.5 2.3V9.9Zm0 4.2L12 11.8l5.5 2.3v1.9L12 13.7l-5.5 2.3v-1.9Zm0 4.2L12 16l5.5 2.3-.001.001L12 20.5l-5.5-2.2V18.3Z" />
		</svg>
	);
}

function GeminiIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M12 2c.4 3.6 2.4 6.6 6 8-3.6 1.4-5.6 4.4-6 8-.4-3.6-2.4-6.6-6-8 3.6-1.4 5.6-4.4 6-8Z" />
		</svg>
	);
}

function GrokIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

const TARGET_ICONS = {
	chatgpt: ChatGptIcon,
	claude: ClaudeIcon,
	perplexity: PerplexityIcon,
	gemini: GeminiIcon,
	grok: GrokIcon,
};

/**
 * Ask AI dropdown (ChatGPT, Claude, Perplexity, Gemini, Grok) + Buy now.
 * @param {"default" | "hero"} [variant]
 */
export default function LlmShareActions({
	className,
	variant = "default",
	prompt = LLM_SHARE_PROMPT,
}) {
	const { isLight } = useAgencyTheme();
	const [menuOpen, setMenuOpen] = useState(false);
	const isHero = variant === "hero";
	const targets = getLlmAskTargets(prompt);

	const handleAsk = async (target) => {
		if (target.copyFirst) {
			try {
				await navigator.clipboard.writeText(prompt);
				toast.success("Prompt copied — paste into Claude");
			} catch {
				toast.error("Could not copy prompt — paste manually from Copy if needed");
			}
		}
		window.open(target.href, "_blank", "noopener,noreferrer");
		setMenuOpen(false);
	};

	const baseBtn = cn(
		"inline-flex items-center gap-1.5 font-medium transition",
		isHero
			? "rounded-full border px-5 py-2.5 text-sm font-semibold hover:-translate-y-0.5"
			: "rounded-full border px-3 py-1.5 text-xs"
	);

	const askBtn = cn(
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
			<div className={cn("flex flex-wrap items-center gap-2", isHero && "justify-center")}>
				<DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
					<DropdownMenuTrigger asChild>
						<button
							type="button"
							className={askBtn}
							aria-label="Ask an AI about SaaSCRM"
						>
							<Sparkles className="h-3.5 w-3.5" />
							Ask AI
							<ChevronDown className="h-3 w-3 opacity-70" />
						</button>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align={isHero ? "center" : "start"}
						className="w-56"
					>
						<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
							Evaluate SaaSCRM with…
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{targets.map((target) => {
							const Icon = TARGET_ICONS[target.id] || Sparkles;
							return (
								<DropdownMenuItem
									key={target.id}
									className="cursor-pointer gap-2 text-xs"
									onSelect={(e) => {
										e.preventDefault();
										handleAsk(target);
									}}
								>
									<Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
									<span className="flex-1">{target.label}</span>
									<ExternalLink className="h-3 w-3 opacity-50" />
								</DropdownMenuItem>
							);
						})}
					</DropdownMenuContent>
				</DropdownMenu>
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
