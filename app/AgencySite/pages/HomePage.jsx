import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Sparkles,
	Zap,
	ExternalLink,
	Code2,
	Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { HOME_FEATURES, SERVICES, CHECKOUT } from "../agencyConfig";

const fadeUp = {
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.45 },
};

function HomeContent() {
	const { isLight } = useAgencyTheme();

	return (
		<>
			<motion.header {...fadeUp} className="mb-10 text-center sm:mb-14">
				<div className="mb-5 flex justify-center">
					<span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 text-lg font-bold text-white shadow-lg shadow-zinc-900/30">
						C
					</span>
				</div>
				<Badge
					variant="outline"
					className={cn(
						"mb-4 gap-2 px-3 py-1 text-xs font-medium",
						isLight
							? "border-zinc-300 bg-zinc-100 text-zinc-700"
							: "border-zinc-700 bg-zinc-900 text-zinc-300"
					)}
				>
					<Zap className="h-3.5 w-3.5" />
					Template · Custom builds · Agency delivery
				</Badge>
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight sm:text-4xl sm:leading-[1.15]",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					We sell &amp; build production-grade CRM SaaS for startups and agencies.
				</h1>
				<p
					className={cn(
						"mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Buy the Next.js CRM template and ship in days — or hire us to customize,
					integrate, and deploy for your team.
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<Button
						asChild
						target="_blank"
						rel="noopener noreferrer"
						type="button"
						className={cn(
							"rounded-full px-5",
							isLight
								? "bg-zinc-900 text-white hover:bg-zinc-800"
								: "bg-zinc-100 text-zinc-900 hover:bg-white"
						)}
					>
						<a href="/demo" passHref className="flex gap-2">
							Explore live demo
							<ArrowRight className="h-4 w-4" />
						</a>
					</Button>
					<Button
						variant="outline"
						asChild
						className={cn(
							"rounded-full px-5",
							isLight
								? "border-zinc-300 text-zinc-800 hover:bg-zinc-100"
								: "border-zinc-700 text-zinc-200 hover:bg-zinc-900"
						)}
					>
						<a href="/pricing" passHref>
							<a>View pricing</a>
						</a>
					</Button>
				</div>
			</motion.header>

			<motion.section
				{...fadeUp}
				transition={{ ...fadeUp.transition, delay: 0.06 }}
				className="mb-12 grid gap-3 sm:grid-cols-3"
			>
				{SERVICES.map((service) => (
					<Link key={service.title} href={service.href} passHref>
						<a>
							<Card
								className={cn(
									"group h-full p-5 transition",
									isLight
										? "border-zinc-200 bg-white shadow-sm hover:border-zinc-400 hover:shadow-md"
										: "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900"
								)}
							>
								<h2
									className={cn(
										"font-semibold",
										isLight ? "text-zinc-900" : "text-white"
									)}
								>
									{service.title}
								</h2>
								<p
									className={cn(
										"mt-2 text-sm leading-relaxed",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									{service.desc}
								</p>
								<span
									className={cn(
										"mt-4 inline-flex items-center gap-1 text-sm font-medium",
										isLight ? "text-zinc-700" : "text-zinc-300"
									)}
								>
									{service.cta}
									<ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
								</span>
							</Card>
						</a>
					</Link>
				))}
			</motion.section>

			<motion.section
				{...fadeUp}
				transition={{ ...fadeUp.transition, delay: 0.1 }}
				className="mb-12"
			>
				<div className="mb-6 flex items-center gap-2">
					<Sparkles
						className={cn("h-5 w-5", isLight ? "text-zinc-600" : "text-zinc-400")}
					/>
					<h2
						className={cn(
							"text-lg font-bold",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						What&apos;s in the template
					</h2>
				</div>
				<div className="grid gap-3 sm:grid-cols-2">
					{HOME_FEATURES.map((feature) => (
						<Card
							key={feature.title}
							className={cn(
								"p-4",
								isLight
									? "border-zinc-200 bg-white/80"
									: "border-zinc-800 bg-zinc-900/40"
							)}
						>
							<h3
								className={cn(
									"text-sm font-semibold",
									isLight ? "text-zinc-900" : "text-white"
								)}
							>
								{feature.title}
							</h3>
							<p
								className={cn(
									"mt-1.5 text-sm leading-relaxed",
									isLight ? "text-zinc-600" : "text-zinc-400"
								)}
							>
								{feature.desc}
							</p>
						</Card>
					))}
				</div>
			</motion.section>

			<motion.section
				{...fadeUp}
				transition={{ ...fadeUp.transition, delay: 0.14 }}
				className="mb-4"
			>
				<Card
					className={cn(
						"p-6 text-center sm:p-8",
						isLight
							? "border-zinc-300 bg-gradient-to-br from-zinc-100 to-zinc-50"
							: "border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950"
					)}
				>
					<div className="mb-3 flex justify-center gap-3">
						<Code2
							className={cn(
								"h-8 w-8",
								isLight ? "text-zinc-700" : "text-zinc-400"
							)}
						/>
						<Rocket
							className={cn(
								"h-8 w-8",
								isLight ? "text-zinc-600" : "text-zinc-500"
							)}
						/>
					</div>
					<h2
						className={cn(
							"text-xl font-bold",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						Ready to ship or need us to build it?
					</h2>
					<p
						className={cn(
							"mx-auto mt-2 max-w-md text-sm",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						Grab the template from $49, or talk to us about a custom CRM for your
						startup or agency client.
					</p>
					<div className="mt-6 flex flex-wrap justify-center gap-3">
						<Button
							asChild
							className={cn(
								"rounded-full px-5",
								isLight
									? "bg-zinc-900 text-white hover:bg-zinc-800"
									: "bg-zinc-100 text-zinc-900 hover:bg-white"
							)}
						>
							<a href={CHECKOUT.usd} target="_blank" rel="noopener noreferrer">
								Buy on Gumroad
								<ExternalLink className="h-4 w-4" />
							</a>
						</Button>
						<Button variant="outline" asChild className="rounded-full px-5">
							<Link href="/contact" passHref>
								<a
									className={cn(
										isLight
											? "border-zinc-300 text-zinc-800"
											: "border-zinc-700 text-zinc-200"
									)}
								>
									Contact us
								</a>
							</Link>
						</Button>
					</div>
				</Card>
			</motion.section>
		</>
	);
}

export default function AgencyHomePage() {
	return (
		<AgencyShell>
			<HomeContent />
		</AgencyShell>
	);
}

AgencyHomePage.disableLayout = true;
