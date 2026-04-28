import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
	ArrowRight,
	Bot,
	LayoutDashboard,
	Sparkles,
	BarChart3,
	Mail,
	Shield,
	Zap,
	CheckCircle2,
	ExternalLink,
	Sun,
	Moon,
} from "lucide-react";

const LANDING_THEME_KEY = "crm-landing-theme";

const fadeUp = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true, margin: "-40px" },
	transition: { duration: 0.45 },
};

const GUMROAD =
	"https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template";
const DODO =
	"https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX";

const features = [
	{
		icon: LayoutDashboard,
		title: "30+ CRM screens",
		desc: "Leads, pipeline, deals, contacts, finance, dev tools—structured like a real SaaS product.",
	},
	{
		icon: Bot,
		title: "AI Assistant shell",
		desc: "Copilot panel with model picker and CRM-focused prompts; wire your own LLM when ready.",
	},
	{
		icon: BarChart3,
		title: "Charts & analytics",
		desc: "Recharts-powered dashboards so demos feel operational, not like static mocks.",
	},
	{
		icon: Sparkles,
		title: "Motion & polish",
		desc: "Framer Motion and GSAP-friendly structure for interactions that sell the premium feel.",
	},
	{
		icon: Mail,
		title: "Email, tasks, calendar",
		desc: "Operations surfaces your buyers expect: inbox-style email UI, tasks, and scheduling.",
	},
	{
		icon: Shield,
		title: "Auth & settings",
		desc: "Login, signup, password flows plus teams, notifications, and integrations pages.",
	},
];

export default function MarketingLanding() {
	const [theme, setTheme] = useState("dark");
	const [status, setStatus] = useState("idle");
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		try {
			const stored = localStorage.getItem(LANDING_THEME_KEY);
			if (stored === "light" || stored === "dark") {
				setTheme(stored);
			}
		} catch {
			/* ignore */
		}
	}, []);

	const isLight = theme === "light";

	function toggleTheme() {
		setTheme((prev) => {
			const next = prev === "light" ? "dark" : "light";
			try {
				localStorage.setItem(LANDING_THEME_KEY, next);
			} catch {
				/* ignore */
			}
			return next;
		});
	}

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
		<div
			className={clsx(
				"min-h-screen antialiased transition-colors duration-300",
				isLight
					? "bg-zinc-50 text-zinc-900 selection:bg-violet-500/20"
					: "bg-[#06060a] text-zinc-100 selection:bg-violet-500/30"
			)}
		>
			<div
				className="pointer-events-none fixed inset-0 opacity-[0.35] transition-opacity duration-300"
				style={{
					backgroundImage: isLight
						? `radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.14), transparent 45%),
            radial-gradient(circle at 80% 0%, rgba(59, 130, 246, 0.12), transparent 40%),
            linear-gradient(to bottom, transparent, rgb(250 250 250) 72%)`
						: `radial-gradient(circle at 20% 20%, rgba(124, 58, 237, 0.25), transparent 45%),
            radial-gradient(circle at 80% 0%, rgba(59, 130, 246, 0.2), transparent 40%),
            linear-gradient(to bottom, transparent, #06060a 70%)`,
				}}
			/>
			<div
				className="pointer-events-none fixed inset-0 opacity-[0.12] transition-opacity duration-300"
				style={{
					backgroundSize: "64px 64px",
					backgroundImage: isLight
						? `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`
						: `linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)`,
				}}
			/>

			<header
				className={clsx(
					"relative z-10 border-b backdrop-blur-md transition-colors duration-300",
					isLight ? "border-zinc-200/80 bg-white/75" : "border-white/5 bg-[#06060a]/80"
				)}
			>
				<div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
					<Link href="/" passHref>
						<a
							className={clsx(
								"flex items-center gap-2 font-semibold tracking-tight",
								isLight ? "text-zinc-900" : "text-zinc-100"
							)}
						>
							<span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-sm text-white shadow-lg shadow-violet-900/30">
								C
							</span>
							<span className="text-sm sm:text-base md:block hidden">CRM SaaS Template</span>
						</a>
					</Link>
					<nav
						className={clsx(
							"hidden items-center gap-6 text-sm md:flex",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						<a
							href="#features"
							className={clsx(
								"transition",
								isLight ? "hover:text-zinc-900" : "hover:text-white"
							)}
						>
							Features
						</a>
						<a
							href="#contact"
							className={clsx(
								"transition",
								isLight ? "hover:text-zinc-900" : "hover:text-white"
							)}
						>
							Contact
						</a>
						<Link href="/demo" passHref>
							<a
								className={clsx(
									"transition",
									isLight ? "hover:text-zinc-900" : "hover:text-white"
								)}
							>
								Live demo
							</a>
						</Link>
						<a
							href={GUMROAD}
							target="_blank"
							rel="noopener noreferrer"
							className={clsx(
								"inline-flex items-center gap-1 transition",
								isLight
									? "text-violet-700 hover:text-violet-800"
									: "text-violet-300 hover:text-violet-200"
							)}
						>
							Buy USD
							<ExternalLink className="h-3.5 w-3.5" />
						</a>
					</nav>
					<div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
						<button
							type="button"
							onClick={toggleTheme}
							className={clsx(
								"inline-flex h-9 w-9 items-center justify-center rounded-full border transition",
								isLight
									? "border-zinc-200 bg-white text-zinc-700 shadow-sm hover:bg-zinc-50"
									: "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
							)}
							aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
						>
							{isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
						</button>
						
					</div>
				</div>
			</header>

			<main className="relative z-10">
				<section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="max-w-3xl"
					>
						<p
							className={clsx(
								"mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
								isLight
									? "border-violet-200 bg-violet-50 text-violet-800"
									: "border-violet-500/30 bg-violet-500/10 text-violet-200"
							)}
						>
							<Zap className="h-3.5 w-3.5" />
							Next.js · React · Tailwind — ship your CRM UI in days
						</p>
						<h1
							className={clsx(
								"text-4xl font-bold tracking-tight sm:text-5xl sm:leading-[1.1]",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							A production-grade CRM frontend template—not an empty admin theme.
						</h1>
						<p
							className={clsx(
								"mt-6 text-lg leading-relaxed",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							Give every visitor a clear story: what the template is, what&apos;s inside, and how
							to buy. Then open the full interactive app in one click—no more confusing first
							load straight into a dense dashboard.
						</p>
						<div className="mt-10 flex flex-wrap items-center gap-3">
							<Link href="/demo" passHref>
								<a
									className={clsx(
										"inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
										isLight
											? "bg-zinc-900 text-white hover:bg-zinc-800"
											: "bg-white text-zinc-900 hover:bg-zinc-100"
									)}
								>
									Open live demo
									<ArrowRight className="h-4 w-4" />
								</a>
							</Link>
							<a
								href="#contact"
								className={clsx(
									"inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition",
									isLight
										? "border-zinc-300 text-zinc-800 hover:bg-zinc-100"
										: "border-white/15 text-white hover:bg-white/5"
								)}
							>
								Get details &amp; pricing
							</a>
						</div>
						<p className="mt-6 text-xs text-zinc-500">
							Includes AI assistant UI · i18n-ready · drag-and-drop friendly pipelines · finance &
							developer modules
						</p>
					</motion.div>
				</section>

				<section
					id="features"
					className={clsx(
						"border-t py-20 transition-colors duration-300",
						isLight ? "border-zinc-200 bg-zinc-100/50" : "border-white/5 bg-black/20"
					)}
				>
					<div className="mx-auto max-w-6xl px-4 sm:px-6">
						<motion.div {...fadeUp} className="mb-12 max-w-2xl">
							<h2
								className={clsx(
									"text-2xl font-bold tracking-tight sm:text-3xl",
									isLight ? "text-zinc-900" : "text-white"
								)}
							>
								Built for founders, agencies, and teams who need a credible CRM demo fast.
							</h2>
							<p className={clsx("mt-3", isLight ? "text-zinc-600" : "text-zinc-400")}>
								Everything is designed to extend: connect your REST API, rebrand, and deploy.
							</p>
						</motion.div>
						<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{features.map((f, i) => {
								const Icon = f.icon;
								return (
									<motion.div
										key={f.title}
										initial={{ opacity: 0, y: 16 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ delay: i * 0.06, duration: 0.4 }}
										className={clsx(
											"group rounded-2xl border p-5 transition",
											isLight
												? "border-zinc-200 bg-white shadow-sm hover:border-violet-300 hover:shadow-md"
												: "border-white/10 bg-white/[0.03] hover:border-violet-500/30 hover:bg-white/[0.05]"
										)}
									>
										<div
											className={clsx(
												"mb-3 flex h-10 w-10 items-center justify-center rounded-xl",
												isLight
													? "bg-violet-100 text-violet-700"
													: "bg-violet-500/15 text-violet-300"
											)}
										>
											<Icon className="h-5 w-5" />
										</div>
										<h3
											className={clsx("font-semibold", isLight ? "text-zinc-900" : "text-white")}
										>
											{f.title}
										</h3>
										<p
											className={clsx(
												"mt-2 text-sm leading-relaxed",
												isLight ? "text-zinc-600" : "text-zinc-400"
											)}
										>
											{f.desc}
										</p>
									</motion.div>
								);
							})}
						</div>
					</div>
				</section>

				<section className="py-16">
					<div className="mx-auto max-w-6xl px-4 sm:px-6">
						<motion.div
							{...fadeUp}
							className={clsx(
								"flex flex-col items-start justify-between gap-6 rounded-2xl border p-8 sm:flex-row sm:items-center",
								isLight
									? "border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50/80"
									: "border-white/10 bg-gradient-to-br from-violet-950/40 to-indigo-950/30"
							)}
						>
							<div>
								<h2
									className={clsx("text-xl font-bold", isLight ? "text-zinc-900" : "text-white")}
								>
									Pay in USD or INR
								</h2>
								<p
									className={clsx(
										"mt-2 max-w-xl text-sm",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									Choose the checkout that fits you. Questions about licensing, customization, or
									UPI? Use the form—we reply personally.
								</p>
							</div>
							<div className="flex flex-wrap gap-3">
								<a
									href={GUMROAD}
									target="_blank"
									rel="noopener noreferrer"
									className={clsx(
										"inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition",
										isLight
											? "bg-zinc-900 text-white hover:bg-zinc-800"
											: "bg-white text-zinc-900 hover:bg-zinc-100"
									)}
								>
									Gumroad (USD)
									<ExternalLink className="h-4 w-4" />
								</a>
								<a
									href={DODO}
									target="_blank"
									rel="noopener noreferrer"
									className={clsx(
										"inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition",
										isLight
											? "border-zinc-300 text-zinc-800 hover:bg-white/80"
											: "border-white/20 text-white hover:bg-white/10"
									)}
								>
									Dodo (INR)
									<ExternalLink className="h-4 w-4" />
								</a>
							</div>
						</motion.div>
					</div>
				</section>

				<section
					id="contact"
					className={clsx(
						"border-t pb-24 pt-16 transition-colors duration-300",
						isLight ? "border-zinc-200" : "border-white/5"
					)}
				>
					<div className="mx-auto max-w-6xl px-4 sm:px-6">
						<div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
							<motion.div {...fadeUp}>
								<h2
									className={clsx("text-2xl font-bold", isLight ? "text-zinc-900" : "text-white")}
								>
									Get the details in your inbox
								</h2>
								<p className={clsx("mt-3", isLight ? "text-zinc-600" : "text-zinc-400")}>
									Leave your email and phone—we&apos;ll follow up with anything you need: custom
									scopes, team licenses, or a quick walkthrough.
								</p>
								<ul
									className={clsx(
										"mt-8 space-y-3 text-sm",
										isLight ? "text-zinc-600" : "text-zinc-400"
									)}
								>
									<li className="flex items-start gap-2">
										<CheckCircle2
											className={clsx(
												"mt-0.5 h-4 w-4 shrink-0",
												isLight ? "text-emerald-600" : "text-emerald-400"
											)}
										/>
										Direct replies from the author — no anonymous ticket queue.
									</li>
									<li className="flex items-start gap-2">
										<CheckCircle2
											className={clsx(
												"mt-0.5 h-4 w-4 shrink-0",
												isLight ? "text-emerald-600" : "text-emerald-400"
											)}
										/>
										We never sell your contact info. Used only to respond to this inquiry.
									</li>
								</ul>
								<p className={clsx("mt-8 text-xs", isLight ? "text-zinc-500" : "text-zinc-600")}>
									shreyvijayvargiya26@gmail.com ·{" "}
									<a
										href="https://x.com/treyvijay"
										target="_blank"
										rel="noopener noreferrer"
										className={clsx(
											"underline",
											isLight
												? "text-zinc-600 hover:text-zinc-800"
												: "text-zinc-500 hover:text-zinc-400"
										)}
									>
										@treyvijay
									</a>
								</p>
							</motion.div>

							<motion.div
								{...fadeUp}
								transition={{ ...fadeUp.transition, delay: 0.08 }}
								className={clsx(
									"rounded-2xl border p-6 sm:p-8",
									isLight
										? "border-zinc-200 bg-white shadow-sm"
										: "border-white/10 bg-white/[0.04]"
								)}
							>
								{status === "success" ? (
									<div className="py-8 text-center">
										<CheckCircle2
											className={clsx(
												"mx-auto h-12 w-12",
												isLight ? "text-emerald-600" : "text-emerald-400"
											)}
										/>
										<p
											className={clsx(
												"mt-4 font-semibold",
												isLight ? "text-zinc-900" : "text-white"
											)}
										>
											Thanks — you&apos;re all set.
										</p>
										<p className={clsx("mt-2 text-sm", isLight ? "text-zinc-600" : "text-zinc-400")}>
											We&apos;ll reach out soon. You can still explore the{" "}
											<Link href="/demo" passHref>
												<a
													className={clsx(
														"underline",
														isLight
															? "text-violet-700 hover:text-violet-900"
															: "text-violet-300 hover:text-violet-200"
													)}
												>
													live demo
												</a>
											</Link>
											.
										</p>
									</div>
								) : (
									<form onSubmit={onSubmit} className="relative space-y-4">
										<div className="grid gap-4 sm:grid-cols-2">
											<div>
												<label
													htmlFor="name"
													className={clsx(
														"block text-xs font-medium",
														isLight ? "text-zinc-600" : "text-zinc-400"
													)}
												>
													Name *
												</label>
												<input
													id="name"
													name="name"
													required
													autoComplete="name"
													className={clsx(
														"mt-1 w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/40",
														isLight
															? "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400"
															: "border-white/10 bg-black/40 text-white placeholder:text-zinc-600 focus:border-violet-500/50"
													)}
													placeholder="Your name"
												/>
											</div>
											<div>
												<label
													htmlFor="company"
													className={clsx(
														"block text-xs font-medium",
														isLight ? "text-zinc-600" : "text-zinc-400"
													)}
												>
													Company
												</label>
												<input
													id="company"
													name="company"
													autoComplete="organization"
													className={clsx(
														"mt-1 w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/40",
														isLight
															? "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400"
															: "border-white/10 bg-black/40 text-white placeholder:text-zinc-600 focus:border-violet-500/50"
													)}
													placeholder="Optional"
												/>
											</div>
										</div>
										<div>
											<label
												htmlFor="email"
												className={clsx(
													"block text-xs font-medium",
													isLight ? "text-zinc-600" : "text-zinc-400"
												)}
											>
												Email *
											</label>
											<input
												id="email"
												name="email"
												type="email"
												required
												autoComplete="email"
												className={clsx(
													"mt-1 w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/40",
													isLight
														? "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400"
														: "border-white/10 bg-black/40 text-white placeholder:text-zinc-600 focus:border-violet-500/50"
												)}
												placeholder="you@company.com"
											/>
										</div>
										<div>
											<label
												htmlFor="phone"
												className={clsx(
													"block text-xs font-medium",
													isLight ? "text-zinc-600" : "text-zinc-400"
												)}
											>
												Phone / WhatsApp
											</label>
											<input
												id="phone"
												name="phone"
												type="tel"
												autoComplete="tel"
												className={clsx(
													"mt-1 w-full rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/40",
													isLight
														? "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400"
														: "border-white/10 bg-black/40 text-white placeholder:text-zinc-600 focus:border-violet-500/50"
												)}
												placeholder="+91 …"
											/>
										</div>
										<div>
											<label
												htmlFor="message"
												className={clsx(
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
												className={clsx(
													"mt-1 w-full resize-none rounded-xl border px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500/40",
													isLight
														? "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-violet-400"
														: "border-white/10 bg-black/40 text-white placeholder:text-zinc-600 focus:border-violet-500/50"
												)}
												placeholder="Optional — niche, timeline, team size…"
											/>
										</div>
										{/* Honeypot */}
										<div className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0" aria-hidden>
											<label htmlFor="website">Website</label>
											<input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
										</div>
										{errorMsg ? (
											<p
												className={clsx(
													"text-sm",
													isLight ? "text-red-600" : "text-red-400"
												)}
												role="alert"
											>
												{errorMsg}
											</p>
										) : null}
										<button
											type="submit"
											disabled={status === "loading"}
											className="w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-60"
										>
											{status === "loading" ? "Sending…" : "Request follow-up"}
										</button>
										<p
											className={clsx(
												"text-[10px] leading-relaxed",
												isLight ? "text-zinc-500" : "text-zinc-600"
											)}
										>
											By submitting, you agree we may contact you about this template. No spam.
										</p>
									</form>
								)}
							</motion.div>
						</div>
					</div>
				</section>
			</main>

			<footer
				className={clsx(
					"relative z-10 border-t py-8 transition-colors duration-300",
					isLight ? "border-zinc-200" : "border-white/5"
				)}
			>
				<div
					className={clsx(
						"mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-xs sm:flex-row sm:text-left sm:px-6",
						isLight ? "text-zinc-500" : "text-zinc-600"
					)}
				>
					<p>CRM SaaS Template — build your vertical CRM faster.</p>
					<div className="flex flex-wrap justify-center gap-4 sm:justify-end">
						<Link href="/demo" passHref>
							<a
								className={clsx(
									"transition",
									isLight ? "hover:text-zinc-800" : "hover:text-zinc-400"
								)}
							>
								Demo
							</a>
						</Link>
						<a
							href={GUMROAD}
							target="_blank"
							rel="noopener noreferrer"
							className={clsx(
								"transition",
								isLight ? "hover:text-zinc-800" : "hover:text-zinc-400"
							)}
						>
							USD
						</a>
						<a
							href={DODO}
							target="_blank"
							rel="noopener noreferrer"
							className={clsx(
								"transition",
								isLight ? "hover:text-zinc-800" : "hover:text-zinc-400"
							)}
						>
							INR
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

MarketingLanding.disableLayout = true;