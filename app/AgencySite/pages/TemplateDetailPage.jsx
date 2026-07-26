import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import * as lucideIcons from "lucide-react";
import {
	ArrowLeft,
	CheckCircle2,
	Download,
	ExternalLink,
	Eye,
	Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import SiteSeo, { TEMPLATES_PAGE_OG_IMAGE } from "@/components/seo/SiteSeo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { CHECKOUT } from "../agencyConfig";

const SITE_URL = "https://saascrm.site";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function TemplateDetailContent({ template }) {
	const { isLight } = useAgencyTheme();
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const Icon = lucideIcons[template.icon] || lucideIcons.LayoutDashboard;
	const ogImage = {
		path: template.image || TEMPLATES_PAGE_OG_IMAGE.path,
		alt: `${template.name} – free Next.js CRM template preview`,
	};
	const demoHref = template.demoUrl || `/demo?vertical=${template.id}`;

	const handleDownload = async (e) => {
		e.preventDefault();
		const value = email.trim().toLowerCase();
		if (!EMAIL_RE.test(value)) {
			toast.error("Enter a valid email to start the download");
			return;
		}
		setLoading(true);
		try {
			const res = await fetch("/api/free-crms/download", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: value, templateId: template.id }),
			});
			if (!res.ok) {
				const data = await res.json().catch(() => ({}));
				throw new Error(data.error || "Download failed");
			}
			const leadSaved = res.headers.get("X-Crm-Lead-Saved") === "1";
			const blob = await res.blob();
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `${template.zipName}.zip`;
			document.body.appendChild(a);
			a.click();
			a.remove();
			URL.revokeObjectURL(url);
			if (leadSaved) {
				toast.success("Download started — email saved");
			} else {
				toast.success("Download started — check your downloads folder");
				toast.warning(
					"Email was not saved to Firestore. Add FIREBASE_API_KEY, FIREBASE_PROJECT_ID, and FIREBASE_APP_ID to .env, then restart the server."
				);
			}
		} catch (err) {
			toast.error(err?.message || "Could not download. Try again.");
		} finally {
			setLoading(false);
		}
	};

	const detailJsonLd = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: template.name,
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web",
		description: template.description,
		url: `${SITE_URL}/templates/${template.id}`,
		image: `${SITE_URL}${ogImage.path}`,
		screenshot: `${SITE_URL}${ogImage.path}`,
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
			availability: "https://schema.org/InStock",
			url: `${SITE_URL}/templates/${template.id}`,
		},
		author: {
			"@type": "Organization",
			name: "SaaSCRM",
			url: SITE_URL,
		},
	};

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
			{
				"@type": "ListItem",
				position: 2,
				name: "Free CRM templates",
				item: `${SITE_URL}/templates`,
			},
			{
				"@type": "ListItem",
				position: 3,
				name: template.name,
				item: `${SITE_URL}/templates/${template.id}`,
			},
		],
	};

	return (
		<>
			<SiteSeo
				title={`${template.name} – Free Next.js CRM Template | Live Demo & Download | SaaSCRM`}
				description={`${template.tagline}. ${template.description} Preview the live demo, then download a free Next.js + Tailwind ZIP.`}
				path={`/templates/${template.id}`}
				keywords={`${template.name}, free CRM template, Next.js CRM, ${template.id} CRM, open source CRM dashboard, ${template.tagline}, SaaSCRM demo`}
				images={[ogImage, TEMPLATES_PAGE_OG_IMAGE]}
				jsonLd={[detailJsonLd, breadcrumbJsonLd]}
			/>

			<div className="mb-6">
				<Link href="/templates" passHref>
					<a
						className={cn(
							"inline-flex items-center gap-1.5 text-sm",
							isLight
								? "text-zinc-600 hover:text-zinc-900"
								: "text-zinc-400 hover:text-zinc-100"
						)}
					>
						<ArrowLeft className="h-4 w-4" />
						All templates
					</a>
				</Link>
			</div>

			<div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
				<div className="space-y-6">
					<div
						className={cn(
							"overflow-hidden rounded-2xl border",
							isLight ? "border-zinc-200" : "border-zinc-800"
						)}
					>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src={template.image}
							alt={ogImage.alt}
							className="aspect-[16/10] w-full object-cover object-top"
						/>
					</div>

					<header>
						<div className="mb-2 flex flex-wrap items-center gap-2">
							{template.badge ? (
								<Badge variant="outline">{template.badge}</Badge>
							) : null}
							<Badge
								variant="secondary"
								className="gap-1 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
							>
								Free download
							</Badge>
						</div>
						<div className="flex items-start gap-3">
							<div
								className={cn(
									"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
									isLight ? "bg-zinc-100" : "bg-zinc-800"
								)}
							>
								<Icon className="h-5 w-5" />
							</div>
							<div>
								<h1
									className={cn(
										"text-2xl font-bold tracking-tight sm:text-3xl",
										isLight ? "text-zinc-900" : "text-white"
									)}
								>
									{template.name}
								</h1>
								<p
									className={cn(
										"mt-1 text-sm sm:text-base",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									{template.tagline}
								</p>
							</div>
						</div>
						<p
							className={cn(
								"mt-4 text-sm leading-relaxed",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							{template.description}
						</p>
						{template.audience?.length ? (
							<p className="mt-3 text-xs text-muted-foreground">
								Best for: {template.audience.join(" · ")}
							</p>
						) : null}
						
					</header>

					<section
						className={cn(
							"rounded-2xl border p-5",
							isLight ? "border-zinc-200 bg-white/60" : "border-zinc-800 bg-zinc-950/40"
						)}
					>
						<h2
							className={cn(
								"text-lg font-semibold",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							{template.guide.headline}
						</h2>
						<ol className="mt-4 space-y-3">
							{template.guide.steps.map((step, i) => (
								<li key={step} className="flex gap-3 text-sm">
									<span
										className={cn(
											"flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
											isLight
												? "bg-zinc-900 text-white"
												: "bg-zinc-100 text-zinc-900"
										)}
									>
										{i + 1}
									</span>
									<span className={isLight ? "text-zinc-700" : "text-zinc-300"}>
										{step}
									</span>
								</li>
							))}
						</ol>
					</section>

					<section
						className={cn(
							"rounded-2xl border p-5",
							isLight ? "border-zinc-200 bg-white/60" : "border-zinc-800 bg-zinc-950/40"
						)}
					>
						<h2
							className={cn(
								"text-lg font-semibold",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							How to customize
						</h2>
						<ul className="mt-4 space-y-2">
							{template.guide.customize.map((item) => (
								<li
									key={item}
									className={cn(
										"flex gap-2 text-sm",
										isLight ? "text-zinc-700" : "text-zinc-300"
									)}
								>
									<CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
									{item}
								</li>
							))}
						</ul>
						<p
							className={cn(
								"mt-4 text-xs leading-relaxed",
								isLight ? "text-zinc-500" : "text-zinc-500"
							)}
						>
							The ZIP is a <strong>CRM-only</strong> Next.js app (
							<code className="text-[11px]">pages/index.js</code>
							). No marketing site. Includes{" "}
							<code className="text-[11px]">crm-ast.json</code> from this
							vertical.
						</p>
					</section>

					<section
						className={cn(
							"rounded-2xl border p-5",
							isLight ? "border-zinc-200" : "border-zinc-800"
						)}
					>
						<h2
							className={cn(
								"text-sm font-semibold",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							What’s in the sidebar (AST)
						</h2>
						<div className="mt-3 flex flex-wrap gap-2">
							{(template.ast.sidebar || []).flatMap((cat) =>
								(cat.items || []).map((item) => (
									<Badge
										key={`${cat.id}-${item.id}`}
										className={isLight ? "text-zinc-900" : "text-zinc-400"}
										variant="outline"
									>
										{item.label}
									</Badge>
								))
							)}
						</div>
					</section>
				</div>

				<aside id="download" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
					<div
						className={cn(
							"rounded-2xl border p-5 shadow-sm",
							isLight
								? "border-zinc-200 bg-white/90"
								: "border-zinc-800 bg-zinc-950/80"
						)}
					>
						<div className="mb-4 flex flex-wrap gap-2">
							<Button
								asChild
								variant="outline"
								className={cn(
									"min-w-0 flex-1 rounded-full",
									isLight
										? "border-zinc-300 bg-transparent"
										: "border-zinc-600 bg-transparent"
								)}
							>
								<a href={demoHref}>
									View live demo
									<lucideIcons.Link2 className="h-3.5 w-3.5 opacity-70 rotate-45" />
								</a>
							</Button>
							<Button
								asChild
								variant="outline"
								className={cn(
									"min-w-0 flex-1 rounded-full",
									isLight
										? "border-zinc-300 bg-transparent"
										: "border-zinc-600 bg-transparent"
								)}
							>
								<a
									href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
										`${template.name} – free Next.js CRM template from SaaSCRM`
									)}&url=${encodeURIComponent(
										`${SITE_URL}/templates/${template.id}`
									)}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<svg
										viewBox="0 0 24 24"
										className="h-3.5 w-3.5"
										fill="currentColor"
										aria-hidden
									>
										<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
									</svg>
									Share on X
								</a>
							</Button>
						</div>
						<h2
							className={cn(
								"text-lg font-semibold",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							Download free ZIP
						</h2>
						<p
							className={cn(
								"mt-1 text-sm",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							Enter your email to get the Next.js + Tailwind CRM starter. No
							account required.
						</p>
						<form onSubmit={handleDownload} className="mt-4 space-y-3">
							<div>
								<label
									htmlFor="download-email"
									className="mb-1 block text-xs font-medium text-muted-foreground"
								>
									Email
								</label>
								<Input
									id="download-email"
									type="email"
									name="email"
									autoComplete="email"
									required
									placeholder="you@company.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="rounded-xl"
								/>
							</div>
							<Button
								type="submit"
								disabled={loading}
								className={cn(
									"w-full rounded-full",
									isLight
										? "bg-zinc-900 text-white hover:bg-zinc-800"
										: "bg-zinc-100 text-zinc-900 hover:bg-white"
								)}
							>
								{loading ? (
									<>
										<Loader2 className="h-4 w-4 animate-spin" />
										Preparing ZIP…
									</>
								) : (
									<>
										<Download className="h-4 w-4" />
										Download {template.name}
									</>
								)}
							</Button>
						</form>
						<p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
							We store your email in our SaaSCRM leads DB (Firestore) so we can
							send occasional template updates. Unsubscribe anytime by emailing
							us.
						</p>
						<div className="mt-5 pt-4">
							<p
								className={cn(
									"text-xs font-medium",
									isLight ? "text-zinc-800" : "text-zinc-200"
								)}
							>
								Need the full 60+ page kit + Figma?
							</p>
							<Button asChild variant="outline" size="sm" className="mt-2 bg-emerald-500/15 border-none dark:border-none dark:bg-emerald-500/15 hover:bg-emerald-500/20 text-emerald-700 hover:text-emerald-800 rounded-full">
								<a href={CHECKOUT.usd} target="_blank" rel="noopener noreferrer">
									Buy Complete Kit
									<lucideIcons.Link2 className="h-3.5 w-3.5" />
								</a>
							</Button>
						</div>
					</div>
				</aside>
			</div>
		</>
	);
}

export default function TemplateDetailPage({ template }) {
	const router = useRouter();

	if (router.isFallback) {
		return (
			<AgencyShell wide>
				<p className="p-8 text-center text-sm text-muted-foreground">Loading…</p>
			</AgencyShell>
		);
	}

	if (!template) {
		return (
			<AgencyShell wide>
				<div className="py-16 text-center">
					<p className="text-lg font-semibold">Template not found</p>
					<Button asChild className="mt-4 rounded-full">
						<Link href="/templates">
							<a>Back to templates</a>
						</Link>
					</Button>
				</div>
			</AgencyShell>
		);
	}

	return (
		<AgencyShell wide>
			<motion.div
				initial={{ opacity: 0, y: 12 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				<TemplateDetailContent template={template} />
			</motion.div>
		</AgencyShell>
	);
}

TemplateDetailPage.disableLayout = true;
