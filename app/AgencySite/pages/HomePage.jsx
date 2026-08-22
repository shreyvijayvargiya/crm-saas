import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as lucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import SiteSeo, { HOME_OG_IMAGE } from "@/components/seo/SiteSeo";
import { HOME_NOSCRIPT_HTML } from "@/lib/agent/markdownPages";
import { BRAND_JSON_LD } from "@/lib/agent/brandJsonLd";
import AgencyShell from "../components/AgencyShell";
import HeroScrollReveal from "../components/HeroScrollReveal";
import IntegrationsShowcase from "../components/IntegrationsShowcase";
import { useAgencyTheme } from "../AgencyThemeContext";
import {
	AI_BUILD_PROMPTS,
	HOME_FEATURES,
	SERVICES,
	CHECKOUT,
	OTHER_TEMPLATES,
} from "../agencyConfig";
import { FaqContent } from "./FaqPage";
import { ContactContent } from "./ContactPage";

const {
	ArrowRight,
	Sparkles,
	ExternalLink,
	Rocket,
	Bot,
	MessageSquare,
	Brain,
	Wand2,
	Code2,
	CheckCircle2,
	Eye,
} = lucideIcons;

const AI_CHATBOT_CAPABILITIES = [
	"Ask anything about leads, deals, pipeline, invoices, and tasks",
	"Research accounts and get instant CRM answers — no tab switching",
	"Create, update, and delete records with natural language",
];

const CRM_SCREENSHOTS = [
	{
		src: "/screenshots-marketing-page/saas-crm-dashboard.png",
		alt: "SaaS CRM dashboard",
		label: "Dashboard",
		href: "/demo",
		description: "Monitor sales, revenue, conversions, and recent customer activity from one focused workspace.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-analytics.png",
		alt: "SaaS CRM analytics",
		label: "Analytics",
		href: "/analytics",
		description: "Turn CRM activity into clear funnels, forecasts, trends, and performance insights.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-reports.png",
		alt: "SaaS CRM reports",
		label: "Reports",
		href: "/reports",
		description: "Build visual reports for revenue, pipeline health, team output, and business growth.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-activity.png",
		alt: "SaaS CRM activity",
		label: "Activity",
		href: "/activity",
		description: "Keep calls, emails, meetings, notes, and record updates in one chronological timeline.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-leads.png",
		alt: "SaaS CRM leads",
		label: "Leads",
		href: "/leads",
		description: "Capture, qualify, search, and progress leads through a customizable sales workflow.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-sales.png",
		alt: "SaaS CRM sales",
		label: "Sales",
		href: "/sales",
		description: "Give your team a practical workspace for opportunities, values, owners, and next actions.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-scheduler.png",
		alt: "SaaS CRM scheduler",
		label: "Content scheduler",
		href: "/scheduler",
		description: "Plan and manage multi-platform social content from a visual calendar and list view.",
	},
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
			<SiteSeo
				title="SaaSCRM – AI CRM SaaS Template for Next.js Admin Dashboards & CMS"
				description="SaaSCRM is the Next.js CRM, admin dashboard, and CMS template with 60+ screens and an agentic AI chatbot. Build AI CRM, CMS, and admin dashboards in days."
				path="/"
				keywords="SaaSCRM, SaaS CRM, AI CRM template, Next.js CRM, SaaS admin dashboard, CMS template, React CRM, shadcn dashboard, Tailwind CRM, agentic CRM, saascrm.site"
				images={[HOME_OG_IMAGE]}
				jsonLd={BRAND_JSON_LD}
			/>
			<noscript>
				<div
					// eslint-disable-next-line react/no-danger
					dangerouslySetInnerHTML={{ __html: HOME_NOSCRIPT_HTML }}
				/>
			</noscript>
			<motion.header {...fadeUp} className="mb-10 text-center sm:mb-14">
				<div className="mb-10">
					<HeroScrollReveal
						screenshots={CRM_SCREENSHOTS}
						isLight={isLight}
					/>
				</div>
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
					First agentic CRM SaaS template with a built-in AI chatbot.
				</Badge>
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight sm:text-4xl sm:leading-[1.15]",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					<span className="sr-only">SaaSCRM — </span>
					The first agentic CRM SaaS template with a built-in AI chatbot.
				</h1>
				<p
					className={cn(
						"mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					SaaSCRM helps you build AI CRM, CMS, and admin dashboards in days, not months.
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
								: "border-zinc-700 text-zinc-200 hover:bg-zinc-900 text-white bg-zinc-800 hover:text-white hover:font-semibold"
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
					<div className="flex flex-col lg:items-stretch">
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
								Build AI CRM, CMS, Admin dashboard in days, not months
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
								"relative border-t p-4 sm:p-6 lg:border-t lg:border-t-0",
								isLight ? "border-orange-100 bg-white/50" : "border-orange-500/20 bg-zinc-950/50"
							)}
						>
							<div
								className={cn(
									"h-full overflow-hidden rounded-xl ring-2",
									isLight ? "ring-orange-200/80 shadow-xl" : "ring-orange-500/30 shadow-2xl"
								)}
							>
								<video
									src="https://ovevcjixqq.ufs.sh/f/9pIU2Of3sxTfRoMalnLXf47MVOSHAj8EYKTU3uhkwdgnZca5"
									className="max-h-[32rem] min-h-[28rem] w-full object-cover object-center sm:min-h-[32rem] lg:max-h-[24rem]"
									autoPlay
									muted
									loop
									playsInline
									controls
									preload="metadata"
									aria-label="Agentic SaaS CRM AI chatbot demonstration"
								/>
							</div>
						</div>
					</div>
				</Card>
			</motion.section>

			<motion.section
				{...fadeUp}
				transition={{ ...fadeUp.transition, delay: 0.055 }}
				className="mb-12"
			>
				<div className="mb-6 text-center">
					<Badge
						variant="outline"
						className={cn(
							"mb-3 gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
							isLight
								? "border-violet-200 bg-violet-50 text-violet-700"
								: "border-violet-500/30 bg-violet-500/10 text-violet-300"
						)}
					>
						<Code2 className="h-3 w-3" />
						Cursor-ready source included
					</Badge>
					<h2
						className={cn(
							"text-2xl font-bold tracking-tight sm:text-3xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						Describe the page. The project rules handle the details.
					</h2>
					<p
						className={cn(
							"mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						The source ships with focused Cursor rules that teach the agent your
						routes, shadcn patterns, theme tokens, and frontend-only data model.
						You ask for the feature — it extends the CRM consistently.
					</p>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					{AI_BUILD_PROMPTS.map((item, index) => {
						const Icon = lucideIcons[item.icon];
						return (
							<Card
								key={item.category}
								className={cn(
									"group relative overflow-hidden p-4 transition duration-300 sm:p-5",
									isLight
										? "border-zinc-200 bg-white/90 shadow-sm hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
										: "border-zinc-800 bg-zinc-900/60 hover:-translate-y-0.5 hover:border-zinc-700 hover:bg-zinc-900"
								)}
							>
								<div
									aria-hidden
									className={cn(
										"absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl",
										index === 0 && "bg-blue-500/15",
										index === 1 && "bg-violet-500/15",
										index === 2 && "bg-pink-500/15",
										index === 3 && "bg-emerald-500/15"
									)}
								/>

								<div className="relative flex items-center gap-3">
									<span
										className={cn(
											"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
											isLight ? item.accent.light : item.accent.dark
										)}
									>
										{Icon ? <Icon className="h-4 w-4" strokeWidth={1.8} /> : null}
									</span>
									<div>
										<p
											className={cn(
												"text-[10px] font-semibold uppercase tracking-wider",
												isLight ? "text-zinc-500" : "text-zinc-500"
											)}
										>
											Example prompt
										</p>
										<h3
											className={cn(
												"text-sm font-semibold",
												isLight ? "text-zinc-900" : "text-white"
											)}
										>
											{item.category}
										</h3>
									</div>
								</div>

								<div
									className={cn(
										"relative mt-4 rounded-xl border p-3 font-mono text-xs leading-relaxed",
										isLight
											? "border-zinc-200 bg-zinc-50 text-zinc-700"
											: "border-zinc-700/70 bg-zinc-950/80 text-zinc-300"
									)}
								>
									<span
										className={cn(
											"mr-2 select-none font-semibold",
											isLight ? "text-violet-600" : "text-violet-400"
										)}
									>
										›
									</span>
									{item.prompt}
								</div>

								<div className="relative mt-4 flex items-start gap-2">
									<CheckCircle2
										className={cn(
											"mt-0.5 h-4 w-4 shrink-0",
											isLight ? "text-emerald-600" : "text-emerald-400"
										)}
									/>
									<p
										className={cn(
											"text-xs leading-relaxed",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										{item.result}
									</p>
								</div>

								<div className="relative mt-4 flex flex-wrap gap-1.5">
									{item.tags.map((tag) => (
										<span
											key={tag}
											className={cn(
												"rounded-full border px-2 py-0.5 text-[10px] font-medium",
												isLight
													? "border-zinc-200 bg-white text-zinc-600"
													: "border-zinc-700 bg-zinc-800/70 text-zinc-400"
											)}
										>
											{tag}
										</span>
									))}
								</div>
							</Card>
						);
					})}
				</div>

				<div
					className={cn(
						"mt-3 grid gap-px overflow-hidden rounded-xl border sm:grid-cols-4",
						isLight
							? "border-zinc-200 bg-zinc-200"
							: "border-zinc-800 bg-zinc-800"
					)}
				>
					{[
						["Routes", "Pages Router conventions"],
						["UI", "shadcn + shared forms"],
						["Theme", "Dark mode + live tokens"],
						["Data", "Demo-first, backend later"],
					].map(([label, value]) => (
						<div
							key={label}
							className={cn(
								"px-3 py-3 text-center",
								isLight ? "bg-white" : "bg-zinc-900"
							)}
						>
							<p
								className={cn(
									"text-[10px] font-semibold uppercase tracking-wider",
									isLight ? "text-zinc-400" : "text-zinc-500"
								)}
							>
								{label}
							</p>
							<p
								className={cn(
									"mt-1 text-xs font-medium",
									isLight ? "text-zinc-700" : "text-zinc-300"
								)}
							>
								{value}
							</p>
						</div>
					))}
				</div>
				<div className="mt-5 flex justify-center">
					<Button
						asChild
						className={cn(
							"rounded-full px-5",
							isLight
								? "bg-violet-600 text-white hover:bg-violet-700"
								: "bg-violet-500 text-white hover:bg-violet-400"
						)}
					>
						<Link href="/blueprint" passHref>
							<a className="flex items-center gap-2 text-white hover:font-semibold bg-violet-500 hover:bg-violet-600 px-4 py-2 rounded-full transition-all duration-300">
								<Sparkles className="h-4 w-4" />
								Plan your CRM free
								<ArrowRight className="h-4 w-4" />
							</a>
						</Link>
					</Button>
				</div>
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
				transition={{ ...fadeUp.transition, delay: 0.12 }}
				className="mb-10"
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

			<motion.section
				id="faq"
				{...fadeUp}
				transition={{ ...fadeUp.transition, delay: 0.12 }}
				className="mb-10 scroll-mt-24"
			>
				<FaqContent embedded />
			</motion.section>

			<motion.section
				id="contact"
				{...fadeUp}
				transition={{ ...fadeUp.transition, delay: 0.13 }}
				className="mb-10 scroll-mt-24"
			>
				<ContactContent embedded />
			</motion.section>

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
							<a href="#contact">Contact us</a>
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
			<div
				className="sr-only"
				// eslint-disable-next-line react/no-danger
				dangerouslySetInnerHTML={{ __html: HOME_NOSCRIPT_HTML }}
			/>
			<HomeContent />
		</AgencyShell>
	);
}

AgencyHomePage.disableLayout = true;
