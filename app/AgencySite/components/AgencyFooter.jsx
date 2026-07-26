import React from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT } from "../agencyConfig";
import { useAgencyTheme } from "../AgencyThemeContext";
import LlmShareActions from "./LlmShareActions";

const FOOTER_LINKS = [
	{ label: "Home", href: "/" },
	{ label: "AI CRM Builder", href: "/blueprint", featured: true },
	{ label: "Free CRMs", href: "/templates" },
	{ label: "Blog", href: "/blog" },
	{ label: "Live demo", href: "/demo" },
	{ label: "Pricing", href: "/pricing" },
	{ label: "FAQ", href: "/#faq" },
	{ label: "Contact", href: "/#contact" },
	{ label: "All pages", href: "/sitemap" },
];

function XIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

export default function AgencyFooter() {
	const { isLight } = useAgencyTheme();

	return (
		<footer
			className={cn(
				"mt-auto pt-8",
			)}
		>
			<div className="grid gap-8 sm:grid-cols-[1.2fr_1fr]">
				<div>
					<Link href="/" passHref>
						<a
							className={cn(
								"inline-flex items-center gap-2 text-sm font-bold tracking-tight",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							<span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
								<Sparkles className="h-3.5 w-3.5" />
							</span>
							SaaSCRM
						</a>
					</Link>
					<p
						className={cn(
							"mt-3 max-w-sm text-xs leading-relaxed",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						A complete Next.js CRM frontend template with 60+ screens,
						theme customization, AI tools, and production-ready UI patterns.
					</p>
					<div className="mt-4 flex flex-wrap gap-2">
						<a
							href={`mailto:${CONTACT.email}`}
							className={cn(
								"inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
								isLight
									? "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
									: "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
							)}
						>
							<Mail className="h-3.5 w-3.5" />
							{CONTACT.email}
						</a>
						<a
							href={CONTACT.x}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
								isLight
									? "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
									: "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
							)}
						>
							<XIcon className="h-3.5 w-3.5" />
							{CONTACT.xHandle}
							<ArrowUpRight className="h-3 w-3" />
						</a>
					</div>
					<div className="mt-3">
						<p
							className={cn(
								"mb-2 text-[10px] font-semibold uppercase tracking-wider",
								isLight ? "text-zinc-500" : "text-zinc-500"
							)}
						>
							Share with AI
						</p>
						<LlmShareActions />
					</div>
				</div>

				<div>
					<p
						className={cn(
							"text-[10px] font-semibold uppercase tracking-wider",
							isLight ? "text-zinc-500" : "text-zinc-500"
						)}
					>
						Explore
					</p>
					<nav className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2" aria-label="Footer">
						{FOOTER_LINKS.map((link) => (
							<Link key={link.href} href={link.href} passHref>
								<a
									className={cn(
										"text-xs font-medium transition",
										link.featured
											? isLight
												? "text-violet-700 hover:text-violet-900"
												: "text-violet-300 hover:text-violet-200"
											: isLight
												? "text-zinc-600 hover:text-zinc-900"
												: "text-zinc-400 hover:text-white"
									)}
								>
									{link.label}
								</a>
							</Link>
						))}
					</nav>
				</div>
			</div>

			<div
				className={cn(
					"mt-8 flex flex-col gap-2 py-5 text-[11px] sm:flex-row sm:items-center sm:justify-between",
					"text-zinc-500"
				)}
			>
				<p>© {new Date().getFullYear()} Shrey Vijayvargiya.</p>
				<Link href="/sitemap" passHref>
					<a className={cn(isLight ? "hover:text-zinc-900" : "hover:text-white")}>
						View complete sitemap
					</a>
				</Link>
			</div>

			<div className="flex flex-wrap items-center justify-center gap-3 pb-2 pt-2">
				<a
					href="https://startupbase.io/products/saascrm?utm_source=startupbase&utm_medium=badge&utm_campaign=featured-badge-light"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						src="https://statics.startupbase.io/site/badges/featured-on-sb.svg"
						alt="Featured on StartupBase"
						height={55}
						style={{ height: 55, width: "auto" }}
					/>
				</a>
				<a
					href="https://www.producthunt.com/products/crm-for-businesses?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-crm-for-businesses"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						alt="CRM for Businesses - SAASCRM helps to build CRM and Admin Dashboard for startups | Product Hunt"
						width={250}
						height={54}
						src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1202657&theme=light&t=1784892254321"
					/>
				</a>
			</div>
		</footer>
	);
}
