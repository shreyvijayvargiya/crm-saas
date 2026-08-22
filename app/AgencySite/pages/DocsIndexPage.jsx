import React from "react";
import Link from "next/link";
import { BookOpen, Code2, KeyRound, Webhook, Bot, FileJson } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import SiteSeo, { HOME_OG_IMAGE } from "@/components/seo/SiteSeo";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { SITE_URL } from "../../../lib/agent/site";

const RESOURCES = [
	{
		href: "/docs/api",
		title: "SaaSCRM API docs",
		desc: "REST resources for leads, contacts, deals, invoices, and tasks.",
		icon: Code2,
	},
	{
		href: "/openapi.yaml",
		title: "SaaSCRM OpenAPI spec",
		desc: "OpenAPI 3.0 reference contract for a buyer-hosted API.",
		icon: FileJson,
	},
	{
		href: "/docs/auth",
		title: "SaaSCRM auth docs",
		desc: "Demo login screens and how to attach a real identity provider.",
		icon: KeyRound,
	},
	{
		href: "/docs/webhooks",
		title: "SaaSCRM webhooks",
		desc: "Event names, payload shape, and signature verification.",
		icon: Webhook,
	},
	{
		href: "/docs/mcp",
		title: "SaaSCRM MCP server",
		desc: "How the in-app AI tools map to a Model Context Protocol server.",
		icon: Bot,
	},
	{
		href: "/llms.txt",
		title: "llms.txt",
		desc: "Agent index of SaaSCRM developer resources.",
		icon: BookOpen,
	},
];

function DocsIndexContent() {
	const { isLight } = useAgencyTheme();

	return (
		<>
			<SiteSeo
				title="SaaSCRM developer resources – API, OpenAPI, auth, webhooks, MCP"
				description="Official SaaSCRM developer resources: API docs, OpenAPI spec, auth docs, webhooks, and MCP guidance for the Next.js CRM template."
				path="/docs"
				keywords="SaaSCRM API, SaaSCRM OpenAPI, SaaSCRM auth, SaaSCRM webhooks, SaaSCRM MCP, saascrm.site developer docs"
				images={[HOME_OG_IMAGE]}
			/>
			<header className="mb-10">
				<Badge
					variant="outline"
					className={cn(
						"mb-4 gap-1.5",
						isLight
							? "border-violet-200 bg-violet-50 text-violet-700"
							: "border-violet-500/30 bg-violet-500/10 text-violet-300"
					)}
				>
					<BookOpen className="h-3.5 w-3.5" />
					SaaSCRM developers
				</Badge>
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight sm:text-4xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					SaaSCRM developer resources
				</h1>
				<p
					className={cn(
						"mt-4 max-w-2xl text-sm leading-relaxed sm:text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					API docs, OpenAPI spec, auth docs, webhooks, and MCP guidance for the
					SaaSCRM Next.js CRM template. These URLs are listed in{" "}
					<a href="/llms.txt" className="underline underline-offset-4">
						llms.txt
					</a>{" "}
					and also available as markdown via{" "}
					<code>Accept: text/markdown</code>.
				</p>
			</header>

			<div className="grid gap-3 sm:grid-cols-2">
				{RESOURCES.map((item) => {
					const Icon = item.icon;
					const external = item.href.endsWith(".yaml") || item.href.endsWith(".txt");
					const inner = (
						<Card
							className={cn(
								"h-full p-5 transition",
								isLight
									? "border-zinc-200 bg-white/90 hover:border-zinc-300"
									: "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700"
							)}
						>
							<div className="flex items-start gap-3">
								<span
									className={cn(
										"mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
										isLight
											? "bg-zinc-100 text-zinc-700"
											: "bg-zinc-800 text-zinc-200"
									)}
								>
									<Icon className="h-4 w-4" />
								</span>
								<div>
									<h2
										className={cn(
											"text-sm font-semibold",
											isLight ? "text-zinc-900" : "text-white"
										)}
									>
										{item.title}
									</h2>
									<p
										className={cn(
											"mt-1 text-xs leading-relaxed",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										{item.desc}
									</p>
								</div>
							</div>
						</Card>
					);

					if (external) {
						return (
							<a key={item.href} href={item.href}>
								{inner}
							</a>
						);
					}
					return (
						<Link key={item.href} href={item.href} passHref>
							<a>{inner}</a>
						</Link>
					);
				})}
			</div>

			<p
				className={cn(
					"mt-8 text-xs leading-relaxed",
					isLight ? "text-zinc-500" : "text-zinc-500"
				)}
			>
				SaaSCRM is a frontend template. Host the API yourself. Schema browser:{" "}
				<a href="/about" className="underline underline-offset-4">
					{SITE_URL}/about
				</a>
				.
			</p>
		</>
	);
}

export default function DocsIndexPage() {
	return (
		<AgencyShell size="article">
			<DocsIndexContent />
		</AgencyShell>
	);
}

DocsIndexPage.disableLayout = true;
