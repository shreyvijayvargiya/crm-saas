import React, { useState } from "react";
import { Check, ChevronDown, Copy, Download } from "lucide-react";
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
import { CURSOR_PROMPT_HREF, SAASCRM_SKILLS } from "../agencyConfig";
import { useAgencyTheme } from "../AgencyThemeContext";

export default function HeroSkillActions() {
	const { isLight } = useAgencyTheme();
	const [copied, setCopied] = useState(false);

	const outlineBtn = cn(
		"inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5",
		isLight
			? "border-zinc-200 bg-white text-zinc-800 shadow-sm hover:border-zinc-400"
			: "border-zinc-700 bg-zinc-900 text-zinc-100 hover:border-zinc-500"
	);

	const handleCopy = async () => {
		try {
			const res = await fetch(CURSOR_PROMPT_HREF);
			if (!res.ok) throw new Error("Failed to load prompt");
			const prompt = (await res.text()).trim();
			if (!prompt) throw new Error("Empty prompt");
			await navigator.clipboard.writeText(prompt);
			setCopied(true);
			toast.success("Cursor prompt copied — paste it in Cursor chat");
			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error("Could not copy prompt");
		}
	};

	return (
		<div className="flex flex-wrap items-center justify-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button type="button" className={outlineBtn} aria-label="Download Claude skills">
						<Download className="h-4 w-4" />
						Download skills
						<ChevronDown className="h-3.5 w-3.5 opacity-70" />
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="center" className="w-64">
					<DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
						Upload the .skill file in Claude
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					{SAASCRM_SKILLS.map((skill) => (
						<DropdownMenuItem key={skill.id} asChild className="cursor-pointer">
							<a href={skill.href} download={skill.filename} className="flex items-center gap-2 text-sm">
								<Download className="h-3.5 w-3.5 shrink-0 opacity-70" />
								<span className="flex-1">{skill.label}</span>
								<span className="text-[10px] uppercase tracking-wide text-muted-foreground">
									Claude
								</span>
							</a>
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>

			<button
				type="button"
				onClick={handleCopy}
				className={outlineBtn}
				aria-label="Copy Cursor prompt"
			>
				{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
				{copied ? "Copied" : "Copy Cursor prompt"}
			</button>
		</div>
	);
}
