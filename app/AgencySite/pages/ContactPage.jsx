import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	Mail,
	ExternalLink,
	CheckCircle2,
	Github,
	Globe,
	Calendar,
	Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SiteSeo, { TEMPLATES_PAGE_OG_IMAGE } from "@/components/seo/SiteSeo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { CONTACT } from "../agencyConfig";

const SITE_URL = "https://saascrm.site";

function XIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

function LinkedInIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
		</svg>
	);
}

const SOCIAL_LINKS = [
	{
		label: "Book a meeting",
		href: CONTACT.calcom,
		desc: "30 min · Cal.com",
		icon: Calendar,
	},
	{
		label: "Email",
		href: `mailto:${CONTACT.email}`,
		desc: CONTACT.email,
		icon: Mail,
	},
	{
		label: "X",
		href: CONTACT.x,
		desc: CONTACT.xHandle,
		icon: XIcon,
	},
	{
		label: "LinkedIn",
		href: CONTACT.linkedin,
		desc: "Shrey Vijayvargiya",
		icon: LinkedInIcon,
	},
	{
		label: "WhatsApp",
		href: `https://wa.me/${CONTACT.whatsapp}`,
		desc: "WhatsApp",
		icon: Phone,
	}
];

function ContactContent({ embedded = false }) {
	const { isLight } = useAgencyTheme();
	const [status, setStatus] = useState("idle");
	const [errorMsg, setErrorMsg] = useState("");
	const TitleTag = embedded ? "h2" : "h1";

	async function onSubmit(e) {
		e.preventDefault();
		setStatus("loading");
		setErrorMsg("");

		const form = e.target;
		const payload = {
			name: form.name.value,
			email: form.email.value,
			phone: form.phone.value,
			company: form.company.value,
			message: form.message.value,
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
				setErrorMsg(json.error || "Something went wrong. Try again or email us.");
				setStatus("idle");
				return;
			}
			setStatus("success");
			form.reset();
		} catch {
			setErrorMsg("Network error. Check your connection or email us directly.");
			setStatus("idle");
		}
	}

	return (
		<>
			<motion.header
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				className={cn("text-center", embedded ? "mb-6" : "mb-8")}
			>
				<TitleTag
					className={cn(
						"font-bold tracking-tight",
						embedded ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					Contact
				</TitleTag>
				<p
					className={cn(
						"mx-auto mt-3 max-w-lg text-sm sm:text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Questions about the template, custom CRM builds, or team licensing — book a
					call or reach out directly.
				</p>
			</motion.header>

			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.05 }}
				className="mb-6 grid grid-cols-1 gap-2 sm:mb-8 sm:grid-cols-2"
			>
				{SOCIAL_LINKS.map((link) => {
					const Icon = link.icon;
					return (
						<a
							key={link.label}
							href={link.href}
							target={link.href.startsWith("mailto:") ? undefined : "_blank"}
							rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
							className={cn(
								"flex min-w-0 items-center gap-3 rounded-2xl border p-3 transition sm:p-4",
								isLight
									? "border-zinc-200 bg-white hover:border-zinc-400 hover:shadow-sm"
									: "border-zinc-800 bg-zinc-900/40 hover:border-zinc-600"
							)}
						>
							<span
								className={cn(
									"flex h-9 w-9 shrink-0 items-center justify-center rounded-full border sm:h-10 sm:w-10",
									isLight
										? "border-zinc-200 bg-zinc-50 text-zinc-700"
										: "border-zinc-800 bg-zinc-900 text-zinc-300"
								)}
							>
								<Icon className="h-4 w-4" />
							</span>
							<span className="min-w-0">
								<span
									className={cn(
										"block text-sm font-medium",
										isLight ? "text-zinc-900" : "text-white"
									)}
								>
									{link.label}
								</span>
								<span className="block truncate text-xs text-zinc-500">
									{link.desc}
								</span>
							</span>
							<ExternalLink
								className={cn(
									"ml-auto h-3.5 w-3.5 shrink-0",
									isLight ? "text-zinc-400" : "text-zinc-600"
								)}
							/>
						</a>
					);
				})}
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				<Card
					className={cn(
						"p-4 sm:p-6",
						isLight
							? "border-zinc-200 bg-white shadow-sm"
							: "border-zinc-800 bg-zinc-900/40"
					)}
				>
					<h2
						className={cn(
							"mb-4 text-sm font-semibold",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						Send a message
					</h2>
					{status === "success" ? (
						<div className="py-6 text-center">
							<CheckCircle2
								className={cn(
									"mx-auto h-10 w-10",
									isLight ? "text-zinc-700" : "text-zinc-300"
								)}
							/>
							<p
								className={cn(
									"mt-3 font-semibold",
									isLight ? "text-zinc-900" : "text-white"
								)}
							>
								Thanks — we&apos;ll be in touch.
							</p>
							<p
								className={cn(
									"mt-2 text-sm",
									isLight ? "text-zinc-600" : "text-zinc-400"
								)}
							>
								Meanwhile, explore the{" "}
								<Button variant="link" asChild className="h-auto p-0">
									<Link href="/demo" passHref>
										<a
											className={cn(
												isLight ? "text-zinc-800" : "text-zinc-200"
											)}
										>
											live demo
										</a>
									</Link>
								</Button>
								.
							</p>
						</div>
					) : (
						<form onSubmit={onSubmit} className="relative space-y-4">
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-1">
									<label
										htmlFor="name"
										className={cn(
											"block text-xs font-medium",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										Name *
									</label>
									<Input
										id="name"
										name="name"
										required
										autoComplete="name"
										placeholder="Your name"
										className={cn(
											isLight
												? "border-zinc-200 bg-white"
												: "border-zinc-800 bg-zinc-950 text-white"
										)}
									/>
								</div>
								<div className="space-y-1">
									<label
										htmlFor="company"
										className={cn(
											"block text-xs font-medium",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										Company
									</label>
									<Input
										id="company"
										name="company"
										autoComplete="organization"
										placeholder="Optional"
										className={cn(
											isLight
												? "border-zinc-200 bg-white"
												: "border-zinc-800 bg-zinc-950 text-white"
										)}
									/>
								</div>
							</div>
							<div className="space-y-1">
								<label
									htmlFor="email"
									className={cn(
										"block text-xs font-medium",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									Email *
								</label>
								<Input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									placeholder="you@company.com"
									className={cn(
										isLight
											? "border-zinc-200 bg-white"
											: "border-zinc-800 bg-zinc-950 text-white"
									)}
								/>
							</div>
							<div className="space-y-1">
								<label
									htmlFor="phone"
									className={cn(
										"block text-xs font-medium",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									Phone / WhatsApp
								</label>
								<Input
									id="phone"
									name="phone"
									type="tel"
									autoComplete="tel"
									placeholder="+91 …"
									className={cn(
										isLight
											? "border-zinc-200 bg-white"
											: "border-zinc-800 bg-zinc-950 text-white"
									)}
								/>
							</div>
							<div className="space-y-1">
								<label
									htmlFor="message"
									className={cn(
										"block text-xs font-medium",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									What are you building?
								</label>
								<textarea
									id="message"
									name="message"
									rows={4}
									className={cn(
										"flex w-full resize-none rounded-xl border px-3 py-2.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40",
										isLight
											? "border-zinc-200 bg-white text-zinc-900"
											: "border-zinc-800 bg-zinc-950 text-white"
									)}
									placeholder="Template purchase, custom build, timeline…"
								/>
							</div>
							<div
								className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
								aria-hidden
							>
								<label htmlFor="website">Website</label>
								<input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
							</div>
							{errorMsg ? (
								<p
									className={cn(
										"text-sm",
										isLight ? "text-red-600" : "text-red-400"
									)}
									role="alert"
								>
									{errorMsg}
								</p>
							) : null}
							<Button
								type="submit"
								disabled={status === "loading"}
								className={cn(
									"w-full rounded-full",
									isLight
										? "bg-zinc-900 text-white hover:bg-zinc-800"
										: "bg-zinc-100 text-zinc-900 hover:bg-white"
								)}
							>
								{status === "loading" ? "Sending…" : "Send message"}
							</Button>
						</form>
					)}
				</Card>
			</motion.div>
		</>
	);
}

export { ContactContent };

export default function AgencyContactPage() {
	const contactJsonLd = {
		"@context": "https://schema.org",
		"@type": "ContactPage",
		name: "Contact SaaSCRM",
		url: `${SITE_URL}/contact`,
		description:
			"Contact SaaSCRM about the CRM template, custom builds, or team licensing.",
		mainEntity: {
			"@type": "Organization",
			name: "SaaSCRM",
			url: SITE_URL,
			email: CONTACT.email,
			sameAs: [CONTACT.x, CONTACT.linkedin].filter(Boolean),
		},
	};

	return (
		<AgencyShell>
			<SiteSeo
				title="Contact SaaSCRM – Custom CRM Builds & Template Support"
				description="Book a call or message us about SaaSCRM template purchases, custom Next.js CRM builds, licensing, and support."
				path="/contact"
				keywords="contact SaaSCRM, custom CRM development, Next.js CRM hire, SaaS template support"
				images={[TEMPLATES_PAGE_OG_IMAGE]}
				jsonLd={contactJsonLd}
			/>
			<ContactContent />
		</AgencyShell>
	);
}

AgencyContactPage.disableLayout = true;
