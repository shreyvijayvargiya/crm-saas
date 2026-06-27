import React from "react";
import Link from "next/link";
import { Database, Sparkles } from "lucide-react";
import { useAuth } from "../../utils/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ProModeBanner({ className }) {
	const { isDemo, proEnabled, user } = useAuth();

	if (proEnabled) {
		return (
			<div
				className={cn(
					"flex flex-wrap items-center gap-2 border-b border-emerald-200/60 bg-emerald-50/80 px-4 py-2 text-xs text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-100",
					className
				)}
			>
				<Badge variant="secondary" className="gap-1 bg-emerald-600 text-white hover:bg-emerald-600">
					<Database className="h-3 w-3" />
					PRO
				</Badge>
				<span>
					Live database — Leads &amp; Subscriptions sync to Supabase
					{user?.email ? ` · ${user.email}` : ""}
				</span>
			</div>
		);
	}

	if (!isDemo) return null;

	return (
		<div
			className={cn(
				"flex flex-wrap items-center justify-between gap-2 border-b border-amber-200/60 bg-amber-50/80 px-4 py-2 text-xs text-amber-950 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100",
				className
			)}
		>
			<div className="flex items-center gap-2">
				<Badge variant="outline" className="gap-1 border-amber-300 bg-white/80">
					<Sparkles className="h-3 w-3" />
					Demo mode
				</Badge>
				<span>Seed data only — no database required</span>
			</div>
			<Link
				href="/settings"
				className="font-medium underline-offset-2 hover:underline"
			>
				Enable PRO →
			</Link>
		</div>
	);
}
