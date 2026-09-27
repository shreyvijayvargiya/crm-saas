import React, { useEffect, useState } from "react";
import { Github, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { GITHUB_REPO } from "../agencyConfig";

/**
 * Navbar GitHub link with live star count (public API, no auth).
 */
export default function GitHubStarsLink({ isLight, compact = false, variant = "nav" }) {
	const isHero = variant === "hero";
	const [stars, setStars] = useState(null);

	useEffect(() => {
		let cancelled = false;
		fetch("https://api.github.com/repos/shreyvijayvargiya/crm-saas", {
			headers: { Accept: "application/vnd.github+json" },
		})
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => {
				if (!cancelled && data && typeof data.stargazers_count === "number") {
					setStars(data.stargazers_count);
				}
			})
			.catch(() => {});
		return () => {
			cancelled = true;
		};
	}, []);

	const navLabel =
		stars != null
			? stars.toLocaleString("en-US")
			: compact
				? "GitHub"
				: "Star";

	return (
		<a
			href={GITHUB_REPO.url}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(
				"relative inline-flex shrink-0 items-center justify-center gap-2 font-semibold transition hover:-translate-y-0.5",
				isHero
					? cn(
							"order-2 w-full rounded-full border px-6 py-3 text-sm shadow-sm sm:w-auto",
							isLight
								? "border-zinc-300 bg-white/90 text-zinc-900 hover:border-zinc-400 hover:bg-white"
								: "border-zinc-500 bg-zinc-950/50 text-white hover:border-zinc-400 hover:bg-zinc-900/80"
						)
					: cn(
							"rounded-full font-medium transition-colors duration-200",
							compact
								? "h-11 min-w-[2.75rem] flex-1 px-1 sm:h-10 sm:flex-none sm:min-w-0 sm:px-2.5"
								: "h-10 px-3 text-sm",
							isLight
								? "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
								: "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
						)
			)}
			aria-label={
				stars != null
					? `SaaSCRM on GitHub — ${stars} stars`
					: "SaaSCRM on GitHub"
			}
		>
			<Github
				className={cn("shrink-0", isHero ? "h-4 w-4" : "h-[18px] w-[18px]")}
				strokeWidth={1.75}
			/>
			{isHero ? (
				<>
					<span>Star on GitHub</span>
					{stars != null ? (
						<span
							className={cn(
								"inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium tabular-nums",
								isLight ? "bg-zinc-100 text-zinc-700" : "bg-zinc-800 text-zinc-200"
							)}
						>
							<Star
								className={cn(
									"h-3 w-3",
									isLight
										? "fill-amber-400 text-amber-500"
										: "fill-amber-300 text-amber-400"
								)}
								strokeWidth={1.5}
							/>
							{stars.toLocaleString("en-US")}
						</span>
					) : null}
				</>
			) : (
				<>
					<Star
						className={cn(
							"h-3.5 w-3.5 shrink-0",
							isLight ? "fill-amber-400 text-amber-500" : "fill-amber-300 text-amber-400"
						)}
						strokeWidth={1.5}
					/>
					<span className="relative z-10 hidden text-sm tabular-nums tracking-tight sm:inline">
						{navLabel}
					</span>
				</>
			)}
		</a>
	);
}
