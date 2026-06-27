import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Megaphone } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ label: "Campaigns", href: "/marketing" },
	{ label: "Segments", href: "/marketing/segments" },
	{ label: "Forms", href: "/marketing/forms" },
];

export default function MarketingLayout({ children, title, description }) {
	const router = useRouter();
	const { colors } = useTheme();

	const isActive = (href) => {
		if (href === "/marketing") {
			return router.pathname === "/marketing" || router.pathname.startsWith("/marketing/campaigns");
		}
		return router.pathname.startsWith(href);
	};

	return (
		<div className="min-h-screen pb-12">
			<div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div className="flex items-start gap-3">
					<span className="hidden sm:flex p-2.5 rounded-xl bg-primary text-primary-foreground shrink-0">
						<Megaphone className="w-6 h-6" />
					</span>
					<div>
						<h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${colors.foreground}`}>
							{title ?? "Marketing"}
						</h1>
						<p className={`text-sm mt-1 max-w-2xl ${colors.textSecondary}`}>
							{description ??
								"Campaigns, audience segments, and lead capture forms — manage your outbound marketing from one place."}
						</p>
					</div>
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
