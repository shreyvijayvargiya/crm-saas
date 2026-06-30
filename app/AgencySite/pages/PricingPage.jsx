import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { PRICING_TIERS, CONTACT } from "../agencyConfig";
import { fadeUp, fadeUpWithDelay } from "../motionPresets";

function PricingContent() {
	const { isLight } = useAgencyTheme();

	return (
		<>
			<motion.header {...fadeUp} className="mb-10 text-center">
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
					<motion.div key={tier.id} {...fadeUpWithDelay(i * 0.06)}>
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
										<Link href={tier.href}>{tier.cta}</Link>
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
					</motion.div>
				))}
			</div>

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
