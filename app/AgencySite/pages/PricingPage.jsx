import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import SiteSeo, { TEMPLATES_PAGE_OG_IMAGE, CRM_SOCIAL_IMAGES } from "@/components/seo/SiteSeo";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { PRICING_TIERS, CONTACT, OTHER_TEMPLATES } from "../agencyConfig";

const SITE_URL = "https://saascrm.site";

function PricingContent() {
	const { isLight } = useAgencyTheme();

	const pricingJsonLd = {
		"@context": "https://schema.org",
		"@type": "OfferCatalog",
		name: "SaaSCRM Pricing",
		url: `${SITE_URL}/pricing`,
		itemListElement: PRICING_TIERS.map((tier, index) => ({
			"@type": "Offer",
			position: index + 1,
			name: tier.name,
			description: tier.tagline || tier.name,
			price: String(tier.priceUsd ?? "").replace(/[^0-9.]/g, "") || undefined,
			priceCurrency: "USD",
			url: tier.checkoutUsd || tier.href || `${SITE_URL}/pricing`,
		})),
	};

	return (
		<>
			<SiteSeo
				title="Pricing – SaaSCRM Template & Custom CRM Builds"
				description="Buy the SaaSCRM Next.js template self-serve from $49, or hire us for a custom CRM. Compare tiers, free templates, and Gumroad listings."
				path="/pricing"
				keywords="SaaSCRM pricing, buy CRM template, Next.js admin template price, custom CRM development cost"
				images={[TEMPLATES_PAGE_OG_IMAGE, CRM_SOCIAL_IMAGES[0]]}
				jsonLd={pricingJsonLd}
			/>
			<motion.header
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				className="mb-10 text-center"
			>
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight sm:text-4xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					Pricing
				</h1>
				<p
					className={cn(
						"mx-auto mt-4 max-w-lg text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Buy the template self-serve, or hire us to build a tailored CRM for your
					startup or agency.
				</p>
			</motion.header>

			<div className="space-y-4">
				{PRICING_TIERS.map((tier, i) => (
					<motion.div
						key={tier.id}
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.06 }}
					>
						<FollowerPointerCard
							title={tier.pointerTitle || tier.cta}
							accentColor={tier.pointerColor}
						>
						<Card
							className={cn(
								"relative overflow-hidden p-6",
								tier.featured
									? isLight
										? "border-zinc-400 bg-gradient-to-br from-zinc-100 to-white shadow-md"
										: "border-zinc-600 bg-gradient-to-br from-zinc-900 to-zinc-950"
									: isLight
										? "border-zinc-200 bg-white"
										: "border-zinc-800 bg-zinc-900/40"
							)}
						>
							{tier.featured ? (
								<Badge
									className={cn(
										"absolute right-4 top-4",
										isLight
											? "bg-zinc-900 text-white"
											: "bg-zinc-100 text-zinc-900"
									)}
								>
									Popular
								</Badge>
							) : null}
							{tier.image ? (
								<img
									src={tier.image}
									alt=""
									className={cn(
										"mb-4 h-48 w-full rounded-xl object-cover object-top",
										isLight ? "ring-1 ring-zinc-200" : "ring-1 ring-zinc-700"
									)}
								/>
							) : null}
							<div className="mb-4">
								<h2
									className={cn(
										"text-lg font-bold",
										isLight ? "text-zinc-900" : "text-white"
									)}
								>
									{tier.name}
								</h2>
								<p
									className={cn(
										"mt-1 text-sm",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									{tier.tagline}
								</p>
							</div>
							<div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
								<span
									className={cn(
										"text-2xl font-bold",
										isLight ? "text-zinc-900" : "text-white"
									)}
								>
									{tier.priceUsd}
								</span>
								<span className="text-sm text-zinc-500">· {tier.priceInr} INR</span>
								<span className="w-full text-xs text-zinc-500">{tier.period}</span>
							</div>
							<ul className="mb-6 space-y-2">
								{tier.features.map((feature) => (
									<li
										key={feature}
										className={cn(
											"flex items-start gap-2 text-sm",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										<Check
											className={cn(
												"mt-0.5 h-4 w-4 shrink-0",
												isLight ? "text-zinc-700" : "text-zinc-300"
											)}
										/>
										{feature}
									</li>
								))}
							</ul>
							<div className="flex flex-wrap gap-2">
								{tier.href ? (
									<Button
										asChild
										variant="outline"
										className={cn(
											"rounded-full",
										)}
									>
										<a href={tier.href} passHref>
											<a>{tier.cta}</a>
										</a>
									</Button>
								) : (
									<>
										<Button
											asChild
											className={cn(
												"rounded-full"
											)}
										>
											<a
												href={tier.checkoutUsd}
												target="_blank"
												rel="noopener noreferrer"
											>
												{tier.cta} (USD)
												<ExternalLink className="h-4 w-4" />
											</a>
										</Button>
										<Button variant="outline" asChild className="rounded-full">
											<a
												href={tier.checkoutInr}
												target="_blank"
												rel="noopener noreferrer"
											>
												INR checkout
												<ExternalLink className="h-4 w-4" />
											</a>
										</Button>
									</>
								)}
							</div>
						</Card>
						</FollowerPointerCard>
					</motion.div>
				))}
			</div>

			<motion.section
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="mt-10"
			>
				<div className="mb-6 text-center">
					<p
						className={cn(
							"text-xs font-medium uppercase tracking-wider",
							isLight ? "text-zinc-500" : "text-zinc-500"
						)}
					>
						More templates
					</p>
					<h2
						className={cn(
							"mt-2 text-xl font-bold tracking-tight sm:text-2xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						Check our other CRM templates
					</h2>
					<p
						className={cn(
							"mx-auto mt-2 max-w-lg text-sm",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						Live demos for Indie SaaS, freelancers, and real estate — same
						quality UI kit energy as SaaSCRM.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{OTHER_TEMPLATES.map((item) => (
						<div
							key={item.id}
							className={cn(
								"group flex flex-col overflow-hidden rounded-2xl border transition-colors",
								isLight
									? "border-zinc-200 bg-white/70 hover:border-zinc-300"
									: "border-zinc-800 bg-zinc-950/50 hover:border-zinc-700"
							)}
						>
							<a
								href={item.demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="relative block aspect-[16/10] overflow-hidden"
							>
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={item.image}
									alt={item.imageAlt}
									className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
									loading="lazy"
								/>
							</a>
							<div className="flex flex-1 flex-col gap-3 p-4">
								<div>
									<h3
										className={cn(
											"text-sm font-semibold",
											isLight ? "text-zinc-900" : "text-white"
										)}
									>
										{item.name}
									</h3>
									<p
										className={cn(
											"mt-1 text-xs leading-relaxed",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										{item.tagline}
									</p>
								</div>
								<div className="mt-auto flex flex-wrap gap-2">
									<Button
										asChild
										size="sm"
										className={cn(
											"rounded-full",
											isLight
												? "bg-zinc-900 text-white hover:bg-zinc-800"
												: "bg-zinc-100 text-zinc-900 hover:bg-white"
										)}
									>
										<a
											href={item.demoUrl}
											target="_blank"
											rel="noopener noreferrer"
										>
											Live demo
											<ExternalLink className="h-3.5 w-3.5" />
										</a>
									</Button>
									<Button
										asChild
										size="sm"
										variant="outline"
										className={cn(
											"rounded-full",
											isLight
												? "border-zinc-300 bg-transparent"
												: "border-zinc-600 bg-transparent"
										)}
									>
										<a
											href={item.gumroadUrl}
											target="_blank"
											rel="noopener noreferrer"
										>
											Gumroad
										</a>
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</motion.section>

			<p className="mt-8 text-center text-xs text-zinc-500">
				Team or white-label licensing?{" "}
				<a
					href={`mailto:${CONTACT.email}`}
					className={cn("underline", isLight ? "text-zinc-700" : "text-zinc-400")}
				>
					Email us
				</a>{" "}
				for a quote.
			</p>
		</>
	);
}

export default function AgencyPricingPage() {
	return (
		<AgencyShell>
			<PricingContent />
		</AgencyShell>
	);
}

AgencyPricingPage.disableLayout = true;
