import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/** Shared Stripe demo chrome for the indie billing OS. */
export function StripeDemoBadge({ className }) {
	return (
		<Badge
			variant="outline"
			className={cn(
				"gap-1.5 border-violet-200 bg-violet-50 text-[10px] font-medium text-violet-700 dark:border-violet-800/60 dark:bg-violet-950/40 dark:text-violet-300",
				className
			)}
		>
			<img
				src="/companies/stripe.png"
				alt=""
				className="h-3.5 w-3.5 rounded-sm object-contain"
			/>
			Synced from Stripe · demo data
		</Badge>
	);
}

export function StripeConnectBanner({ className }) {
	return (
		<div
			className={cn(
				"flex flex-col gap-3 rounded-2xl border border-dashed border-violet-300/80 bg-violet-50/60 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-violet-800/50 dark:bg-violet-950/20",
				className
			)}
		>
			<div className="flex items-start gap-3">
				<img
					src="/companies/stripe.png"
					alt="Stripe"
					className="mt-0.5 h-8 w-8 rounded-md object-contain"
				/>
				<div>
					<p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
						Connect Stripe to sync live customers
					</p>
					<p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
						This template ships with Stripe-shaped demo data. Add your keys in
						production — no webhooks included in the ZIP.
					</p>
				</div>
			</div>
			<Button asChild size="sm" className="shrink-0 rounded-full">
				<Link href="/settings">
					<a className="inline-flex items-center gap-1.5">
						Connect Stripe
						<ExternalLink className="h-3.5 w-3.5" />
					</a>
				</Link>
			</Button>
		</div>
	);
}
