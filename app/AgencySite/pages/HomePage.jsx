import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as lucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import AgencyShell from "../components/AgencyShell";
import IntegrationsShowcase from "../components/IntegrationsShowcase";
import { useAgencyTheme } from "../AgencyThemeContext";
import { HOME_FEATURES, SERVICES, CHECKOUT } from "../agencyConfig";

const {
	ArrowRight,
	Sparkles,
	ExternalLink,
	Rocket,
	Bot,
	MessageSquare,
	Brain,
	Wand2,
} = lucideIcons;

const AI_CHATBOT_CAPABILITIES = [
	"Ask anything about leads, deals, pipeline, invoices, and tasks",
	"Research accounts and get instant CRM answers — no tab switching",
	"Create, update, and delete records with natural language",
];

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
				<motion.img src="https://ovevcjixqq.ufs.sh/f/9pIU2Of3sxTfU9NP1Drb7rxhdGYe1SLHVu92gAbfPX6ytMjc" className="w-full h-full rounded-xl ring-2 ring-zinc-200 dark:ring-zinc-800 object-cover" />
				<Badge
					variant="outline"
					className={cn(
						"my-4 gap-2 px-3 py-1 text-xs font-medium",
						isLight
							? "border-zinc-300 bg-zinc-100 text-zinc-700"
							: "border-zinc-700 bg-zinc-900 text-zinc-300"
					)}
				>
					<Bot className="h-3.5 w-3.5" />
					First agentic CRM · AI chatbot included
				</Badge>
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight sm:text-4xl sm:leading-[1.15]",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					The first agentic CRM SaaS template with a built-in AI chatbot.
				</h1>
				<p
					className={cn(
						"mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Ask questions, run research, and manage your entire CRM by chat — then
					buy the Next.js template and ship in days, or hire us to customize and deploy.
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
				transition={{ ...fadeUp.transition, delay: 0.04 }}
				className="mb-12"
			>
				<Card
					className={cn(
						"overflow-hidden border-2 p-0",
						isLight
							? "border-orange-200 bg-gradient-to-br from-orange-50/80 via-white to-blue-50/60"
							: "border-orange-500/30 bg-gradient-to-br from-orange-950/40 via-zinc-900/80 to-blue-950/30"
					)}
				>
					<div className="grid gap-0 lg:grid-cols-2 lg:items-stretch">
						<div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
							<Badge
								className={cn(
									"mb-4 w-fit gap-1.5 border-0 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
									isLight
										? "bg-orange-600 text-white"
										: "bg-orange-500 text-white"
								)}
							>
								<Sparkles className="h-3 w-3" />
								New · Agentic AI
							</Badge>
							<h2
								className={cn(
									"text-2xl font-bold leading-tight tracking-tight sm:text-3xl",
									isLight ? "text-zinc-900" : "text-white"
								)}
							>
								Get the first agentic CRM with an AI chatbot for all your work
							</h2>
							
							<ul className="mt-5 space-y-2.5">
								{AI_CHATBOT_CAPABILITIES.map((item) => (
									<li
										key={item}
										className={cn(
											"flex items-start gap-2.5 text-sm leading-snug",
											isLight ? "text-zinc-700" : "text-zinc-300"
										)}
									>
										<span
											className={cn(
												"mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
												isLight
													? "bg-orange-100 text-orange-600"
													: "bg-orange-500/20 text-orange-300"
											)}
										>
											<Wand2 className="h-3 w-3" />
										</span>
										{item}
									</li>
								))}
							</ul>
							<div className="mt-7 flex flex-wrap gap-3">
								<Button
									asChild
									className={cn(
										"rounded-full px-5",
										isLight
											? "bg-orange-600 text-white hover:bg-orange-700"
											: "bg-orange-500 text-white hover:bg-orange-400"
									)}
								>
									<a href="/demo" className="flex items-center gap-2">
										<MessageSquare className="h-4 w-4" />
										Try AI chatbot in demo
										<ArrowRight className="h-4 w-4" />
									</a>
								</Button>
							</div>
						</div>
						<div
							className={cn(
								"relative border-t p-4 sm:p-6 lg:border-l lg:border-t-0",
								isLight ? "border-orange-100 bg-white/50" : "border-orange-500/20 bg-zinc-950/50"
							)}
						>
							<div
								className={cn(
									"overflow-hidden rounded-xl ring-2",
									isLight ? "ring-orange-200/80 shadow-xl" : "ring-orange-500/30 shadow-2xl"
								)}
							>
								<img
									src="/ai-chatbot-crm-saas.png"
									alt="CRM SaaS AI chatbot — ask questions, create invoices, and manage leads from a sidebar assistant"
									className="h-full w-full object-cover object-top"
									width={400}
									height={400}
								/>
							</div>
						</div>
					</div>
				</Card>
			</motion.section>

			<motion.section
				{...fadeUp}
				transition={{ ...fadeUp.transition, delay: 0.06 }}
				className="mb-12 grid gap-3 sm:grid-cols-3"
			>
				{SERVICES.map((service) => (
					<FollowerPointerCard
						key={service.title}
						className="h-full"
						title={service.pointerTitle || service.cta}
						accentColor={service.pointerColor}
					>
						<Link href={service.href} passHref>
							<a className="block h-full">
							<Card
								className={cn(
									"group h-full overflow-hidden p-5 transition",
									isLight
										? "border-zinc-200 bg-white shadow-sm hover:border-zinc-400 hover:shadow-md"
										: "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900"
								)}
							>
								{service.image ? (
									<img
										src={service.image}
										alt=""
										className={cn(
											"mb-3 h-24 w-full rounded-xl object-cover object-top",
											isLight
												? "ring-1 ring-zinc-200"
												: "ring-1 ring-zinc-700"
										)}
									/>
								) : null}
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
					</FollowerPointerCard>
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
					{HOME_FEATURES.map((feature) => {
						const Icon = lucideIcons[feature.icon];
						return (
						<Card
							key={feature.title}
							className={cn(
								"p-4",
								isLight
									? "border-zinc-200 bg-white/80"
									: "border-zinc-800 bg-zinc-900/40"
							)}
						>
							<div className="mb-3 flex items-center gap-3">
								<div
									className={cn(
										"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
										isLight ? feature.iconClass.light : feature.iconClass.dark
									)}
								>
									{Icon ? <Icon className="h-4 w-4" strokeWidth={1.75} /> : null}
								</div>
								<h3
									className={cn(
										"text-sm font-semibold",
										isLight ? "text-zinc-900" : "text-white"
									)}
								>
									{feature.title}
								</h3>
							</div>
							<p
								className={cn(
									"text-sm leading-relaxed",
									isLight ? "text-zinc-600" : "text-zinc-400"
								)}
							>
								{feature.desc}
							</p>
						</Card>
						);
					})}
				</div>
			</motion.section>

			<IntegrationsShowcase />

			<motion.section
				{...fadeUp}
				transition={{ ...fadeUp.transition, delay: 0.14 }}
				className={cn(
					"group mb-4 rounded-2xl p-4 ring-2 transition-all duration-300",
					isLight
						? "bg-white/20 ring-zinc-200 hover:bg-white/50"
						: "bg-zinc-900/20 ring-zinc-800 hover:bg-zinc-900/90"
				)}
			>
				<div className="mt-1 px-1 text-center sm:px-2">
					<div className="mb-3 flex justify-center gap-3">
						<Rocket className="h-7 w-7 text-zinc-400 transition-all duration-300 group-hover:translate-x-1/2 group-hover:rotate-45 group-hover:text-green-400" />
					</div>
					<h2
						className={cn(
							"text-lg font-bold sm:text-xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						Ready to ship or need us to build it?
					</h2>
					<p
						className={cn(
							"mx-auto mt-2 max-w-md text-sm",
							isLight ? "text-zinc-600" : "text-zinc-300"
						)}
					>
						Grab the template from $49, or talk to us about a custom CRM for your
						startup or agency client.
					</p>
					<div className="mt-5 flex flex-wrap items-center justify-center gap-3">
						<Button
							asChild
							className={cn(
								"rounded-full px-6",
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
						<Button
							variant="outline"
							asChild
							className={cn(
								"rounded-full px-5",
								isLight
									? "border-zinc-300 bg-transparent text-zinc-800 hover:bg-zinc-100"
									: "border-zinc-600 bg-transparent text-zinc-100 hover:bg-zinc-800"
							)}
						>
							<Link href="/contact" passHref>
								<a>Contact us</a>
							</Link>
						</Button>
					</div>
				</div>

				<div
					className={cn(
						"mt-4 flex flex-shrink-0 items-center justify-between px-1 pb-1 font-mono text-xs sm:px-2",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					<div>CRM SaaS Template</div>
					<div className="opacity-80">From $49</div>
				</div>
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
