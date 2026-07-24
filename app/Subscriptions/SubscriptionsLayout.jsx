import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Repeat } from "lucide-react";
import { StripeDemoBadge } from "@/components/stripe/StripeChrome";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ label: "Overview", href: "/subscriptions" },
	{ label: "Plans", href: "/subscriptions/plans" },
];

export default function SubscriptionsLayout({ children, title, description }) {
	const router = useRouter();
	const { colors } = useTheme();

	const isActive = (href) => {
		if (href === "/subscriptions") {
			return (
				router.pathname === "/subscriptions" ||
				(router.pathname.startsWith("/subscriptions/") &&
					!router.pathname.startsWith("/subscriptions/plans"))
			);
		}
		return router.pathname.startsWith(href);
	};

	return (
		<div className="min-h-screen pb-12">
			<div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div className="flex items-start gap-3">
						<span className="hidden sm:flex p-2.5 rounded-xl bg-primary text-primary-foreground shrink-0">
							<Repeat className="w-6 h-6" />
						</span>
						<div>
							<h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${colors.foreground}`}>
								{title ?? "Subscriptions"}
							</h1>
							<p className={`text-sm mt-1 max-w-2xl ${colors.textSecondary}`}>
								{description ??
									"Stripe subscriptions — MRR, renewals, past_due, and churn for your indie SaaS."}
							</p>
						</div>
					</div>
					<StripeDemoBadge />
				</div>

				<nav className="flex gap-1 border-b">
					{NAV_ITEMS.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
								isActive(item.href)
									? "border-primary text-primary"
									: "border-transparent text-muted-foreground hover:text-foreground"
							)}
						>
							{item.label}
						</Link>
					))}
				</nav>

				{children}
			</div>
		</div>
	);
}
