import React, { useState } from "react";
import { motion } from "framer-motion";
import {
	ArrowRight,
	CheckCircle2,
	HelpCircle,
	Mail,
	Sparkles,
} from "lucide-react";
import * as lucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAgencyTheme } from "../AgencyThemeContext";
import { CONTACT } from "../agencyConfig";

const TOP_QUESTIONS = [
	{
		q: "Can you build a custom CRM for my industry?",
		a: "Yes. We ship finance, real estate, agency, SaaS, and niche CRMs on the SaaSCRM stack — tailored pipelines, entities, and dashboards.",
	},
	{
		q: "Can you migrate Excel or Google Sheets into a CRM?",
		a: "Yes. We import spreadsheets, map columns to records, and give your team search, filters, roles, and AI chat on top.",
	},
	{
		q: "Do you build CMS + CRM together?",
		a: "Yes. Content publishing, landing pages, and customer records in one admin — ideal for marketing teams and product-led SaaS.",
	},
	{
		q: "Can you automate Reddit, LinkedIn, or X research?",
		a: "Yes. We build trend-scraper agents, enrichment pipelines, and chatbots so you stop manual scrolling and act on real signals.",
	},
];

const USE_CASES = [
	{
		icon: "Landmark",
		title: "CRM for Finance",
		description:
			"Client portfolios, invoices, compliance notes, and advisor workflows — built for accounting firms and fintech teams.",
		image: "/screenshots-marketing-page/saas-crm-sales.png",
		tags: ["Finance", "Invoices"],
	},
	{
		icon: "Building2",
		title: "CRM for Real Estate",
		description:
			"Listings, buyer leads, agent pipelines, and follow-ups in one dashboard your brokerage can actually use.",
		image: "/real-estate-crm.png",
		tags: ["Real estate", "Leads"],
	},
	{
		icon: "Briefcase",
		title: "CRM for Agencies",
		description:
			"Retainers, client projects, deliverables, and team activity — ship a branded admin for your agency clients.",
		image: "/freelance-crm.png",
		tags: ["Agencies", "Projects"],
	},
	{
		icon: "Bot",
		title: "Reddit Scraper AI Agent",
		description:
			"Scheduled scrapers + OpenRouter enrichment + chatbot on trending posts — the stack behind our $1,000/mo content savings.",
		image: "/og/reddit-trend-scraper-ai-agent.jpg",
		tags: ["Reddit", "AI agent"],
	},
	{
		icon: "Users",
		title: "Influencer Finder CRM",
		description:
			"Discover creators, track outreach, store rates and replies, and manage campaigns without a messy spreadsheet.",
		image: "/ai-chatbot-crm-saas.png",
		tags: ["Influencers", "Outreach"],
	},
	{
		icon: "Target",
		title: "Lead Generator CRM",
		description:
			"Capture inbound leads, score them, assign owners, and trigger follow-ups — forms, webhooks, and API-ready.",
		image: "/screenshots-marketing-page/saas-crm-leads.png",
		tags: ["Lead gen", "Pipeline"],
	},
	{
		icon: "Table2",
		title: "Excel → Modern CRM",
		description:
			"Turn years of spreadsheet chaos into searchable records, kanban, reports, and an AI copilot your team adopts.",
		image: "/screenshots-marketing-page/saas-crm-dashboard.png",
		tags: ["Migration", "Excel"],
	},
	{
		icon: "FileText",
		title: "CMS + Admin Dashboard",
		description:
			"Blog, docs, landing pages, and CRM entities in one Next.js admin — perfect when marketing and sales share one tool.",
		image: "/blog-banner-nexts-shade-crm-cms-admin-template.png",
		tags: ["CMS", "Content"],
	},
	{
		icon: "Workflow",
		title: "Marketing Automation",
		description:
			"Cron jobs, webhooks, scrapers, email alerts, and custom API modules — automate the busywork around your CRM.",
		image: "/ai-builder-saas-crm.png",
		tags: ["Automation", "API"],
	},
];

export default function WhatWeBuildSection() {
	const { isLight } = useAgencyTheme();
	const [status, setStatus] = useState("idle");
	const [errorMsg, setErrorMsg] = useState("");

	async function onSubmit(e) {
		e.preventDefault();
		setStatus("loading");
		setErrorMsg("");

		const form = e.target;
		const payload = {
			name: form.name.value,
			email: form.email.value,
			phone: "",
			company: form.company?.value || "",
			message: `[Custom build inquiry] ${form.message.value}`,
			website: form.website.value,
		};

		try {
			const res = await fetch("/api/send-lead", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});
			const json = await res.json().catch(() => ({}));
			if (!res.ok) {
				setErrorMsg(json.error || "Something went wrong. Email us directly.");
				setStatus("idle");
				return;
			}
			setStatus("success");
			form.reset();
		} catch {
			setErrorMsg("Network error. Email us at " + CONTACT.email);
			setStatus("idle");
		}
	}

	return (
		<motion.section
			id="what-we-build"
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{ duration: 0.5 }}
			className="mb-14 scroll-mt-24"
			aria-labelledby="what-we-build-heading"
		>
			<div className="mb-8 text-center">
				<Badge
					variant="outline"
					className={cn(
						"mb-3 gap-1.5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
						isLight
							? "border-emerald-200 bg-emerald-50 text-emerald-800"
							: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
					)}
				>
					<Sparkles className="h-3 w-3" />
					Custom builds
				</Badge>
				<h2
					id="what-we-build-heading"
					className={cn(
						"text-2xl font-bold tracking-tight sm:text-3xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					What we can build for you
				</h2>
				<p
					className={cn(
						"mx-auto mt-3 max-w-2xl text-sm leading-relaxed sm:text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Stuck with spreadsheets, manual research, or a generic CRM that does not fit?
					We design and ship custom CRMs, CMS admin panels, and automation agents on the
					SaaSCRM stack — the same foundation behind our template and client projects.
				</p>
			</div>

			<div className="mb-8 grid gap-3 sm:grid-cols-2">
				{TOP_QUESTIONS.map((item) => (
					<Card
						key={item.q}
						className={cn(
							"p-4 sm:p-5",
							isLight
								? "border-zinc-200 bg-white/90"
								: "border-zinc-800 bg-zinc-900/40"
						)}
					>
						<div className="flex items-start gap-3">
							<span
								className={cn(
									"mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
									isLight
										? "bg-violet-100 text-violet-700"
										: "bg-violet-500/15 text-violet-300"
								)}
							>
								<HelpCircle className="h-4 w-4" />
							</span>
							<div>
								<h3
									className={cn(
										"text-sm font-semibold leading-snug",
										isLight ? "text-zinc-900" : "text-white"
									)}
								>
									{item.q}
								</h3>
								<p
									className={cn(
										"mt-2 text-xs leading-relaxed sm:text-sm",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									{item.a}
								</p>
							</div>
						</div>
					</Card>
				))}
			</div>

			<div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{USE_CASES.map((item) => {
					const Icon = lucideIcons[item.icon];
					return (
						<Card
							key={item.title}
							className={cn(
								"group overflow-hidden p-0 transition duration-300",
								isLight
									? "border-zinc-200 bg-white/90 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md"
									: "border-zinc-800 bg-zinc-900/50 hover:-translate-y-0.5 hover:border-zinc-600"
							)}
						>
							<div className="aspect-[16/10] overflow-hidden">
								<img
									src={item.image}
									alt=""
									className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
									loading="lazy"
								/>
							</div>
							<div className="p-4">
								<div className="mb-2 flex items-center gap-2">
									<span
										className={cn(
											"flex h-8 w-8 items-center justify-center rounded-lg border",
											isLight
												? "border-zinc-200 bg-zinc-50 text-zinc-700"
												: "border-zinc-700 bg-zinc-800 text-zinc-300"
										)}
									>
										{Icon ? <Icon className="h-4 w-4" strokeWidth={1.75} /> : null}
									</span>
									<h3
										className={cn(
											"text-sm font-semibold",
											isLight ? "text-zinc-900" : "text-white"
										)}
									>
										{item.title}
									</h3>
								</div>
								<p
									className={cn(
										"text-xs leading-relaxed sm:text-sm",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									{item.description}
								</p>
								<div className="mt-3 flex flex-wrap gap-1.5">
									{item.tags.map((tag) => (
										<span
											key={tag}
											className={cn(
												"rounded-full border px-2 py-0.5 text-[10px] font-medium",
												isLight
													? "border-zinc-200 bg-zinc-50 text-zinc-600"
													: "border-zinc-700 bg-zinc-800/70 text-zinc-400"
											)}
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						</Card>
					);
				})}
			</div>

			<div
				className={cn(
					"mx-auto max-w-xl rounded-2xl border p-6 sm:p-8",
					isLight
						? "border-zinc-200 bg-gradient-to-b from-zinc-50 to-white"
						: "border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950/90"
				)}
			>
				<div className="text-center">
					<h3
						className={cn(
							"text-lg font-bold tracking-tight sm:text-xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						Tell us what you need built
					</h3>
					<p
						className={cn(
							"mt-2 text-sm",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						CRM, CMS, scraper agent, or full automation — describe your problem and
						we&apos;ll reply from{" "}
						<a
							href={`mailto:${CONTACT.email}`}
							className={cn(
								"font-medium underline underline-offset-2",
								isLight ? "text-zinc-900" : "text-zinc-200"
							)}
						>
							{CONTACT.email}
						</a>
					</p>
				</div>

				{status === "success" ? (
					<div className="py-8 text-center">
						<CheckCircle2
							className={cn(
								"mx-auto h-10 w-10",
								isLight ? "text-emerald-600" : "text-emerald-400"
							)}
						/>
						<p
							className={cn(
								"mt-3 text-sm font-medium",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							Message sent — we&apos;ll get back to you soon.
						</p>
					</div>
				) : (
					<form onSubmit={onSubmit} className="mt-6 space-y-3">
						<div className="grid gap-3 sm:grid-cols-2">
							<Input
								name="name"
								placeholder="Your name"
								required
								minLength={2}
								className={cn(
									isLight
										? "border-zinc-200 bg-white"
										: "border-zinc-700 bg-zinc-900"
								)}
							/>
							<Input
								name="email"
								type="email"
								placeholder="Email"
								required
								className={cn(
									isLight
										? "border-zinc-200 bg-white"
										: "border-zinc-700 bg-zinc-900"
								)}
							/>
						</div>
						<Input
							name="company"
							placeholder="Company or project (optional)"
							className={cn(
								isLight ? "border-zinc-200 bg-white" : "border-zinc-700 bg-zinc-900"
							)}
						/>
						<textarea
							name="message"
							required
							rows={4}
							placeholder="What should we build? e.g. finance CRM, Reddit scraper, Excel migration…"
							className={cn(
								"w-full resize-none rounded-md border px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-zinc-400",
								isLight
									? "border-zinc-200 bg-white text-zinc-900"
									: "border-zinc-700 bg-zinc-900 text-zinc-100"
							)}
						/>
						<input
							type="text"
							name="website"
							tabIndex={-1}
							autoComplete="off"
							className="hidden"
							aria-hidden
						/>
						{errorMsg ? (
							<p className="text-center text-xs text-red-500">{errorMsg}</p>
						) : null}
						<div className="flex justify-center pt-1">
							<Button
								type="submit"
								disabled={status === "loading"}
								className={cn(
									"rounded-full px-6",
									isLight
										? "bg-zinc-900 text-white hover:bg-zinc-800"
										: "bg-zinc-100 text-zinc-900 hover:bg-white"
								)}
							>
								{status === "loading" ? (
									"Sending…"
								) : (
									<>
										<Mail className="mr-2 h-4 w-4" />
										Send project brief
										<ArrowRight className="ml-2 h-4 w-4" />
									</>
								)}
							</Button>
						</div>
					</form>
				)}
			</div>
		</motion.section>
	);
}
