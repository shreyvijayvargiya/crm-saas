import React, { useState, useEffect } from "react";
import {
	PlayCircle,
	X,
	ShoppingCart,
	Download,
	Wrench,
	CheckCircle2,
	Bot,
	PanelRightClose,
	Sparkles,
	LayoutGrid,
	ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { I18nextProvider } from "react-i18next";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toast";
import Navbar from "../Navbar";
import { useTheme } from "../../utils/useTheme";
import i18n from "../../utils/i18n";
import AutoTranslate from "../AutoTranslate";
import AIChatSidebar from "../AIChatSidebar";

const AI_PANEL_WIDTH = 384; /* w-96 */

function useMediaQueryMd() {
	const [matches, setMatches] = useState(false);
	useEffect(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		const apply = () => setMatches(mq.matches);
		apply();
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, []);
	return matches;
}

const ABOUT_VIDEO_URL =
	"https://ovevcjixqq.ufs.sh/f/9pIU2Of3sxTfUpCNWfb7rxhdGYe1SLHVu92gAbfPX6ytMjcp";

const TEMPLATE_GUMROAD_USD =
	"https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template";

const TEMPLATE_CHECKOUT_INR =
	"https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX";

const OTHER_PRODUCTS_LINKS = [
	{
		label: "FreelanceCRM — Client & Project Hub",
		href: "https://shreyvijayvargiya.gumroad.com/l/freelancer-crm-template",
	},
	{
		label: "Indie Hacker SaaS (InkGest Admin)",
		href: "https://shreyvijayvargiya.gumroad.com/l/inkgest-saas-admin-template",
	},
	{
		label: "Estate OS — Real Estate CRM",
		href: "https://shreyvijayvargiya.gumroad.com/l/estate-os-real-estate-crm-template",
	},
];

const GUIDE_STEPS = [
	{
		icon: ShoppingCart,
		title: "Buy template",
		desc: "Choose INR or USD checkout and complete your purchase.",
		accent: "bg-orange-500/15 text-orange-500",
	},
	{
		icon: Download,
		title: "Download ZIP",
		desc: "Get the source ZIP from your purchase confirmation page.",
		accent: "bg-indigo-500/15 text-indigo-500",
	},
	{
		icon: Wrench,
		title: "Customize & deploy",
		desc: "Connect APIs, edit modules, then deploy your CRM app.",
		accent: "bg-emerald-500/15 text-emerald-500",
	},
];

const LayoutWrapper = ({ children }) => {
	const [open, setOpen] = useState(true);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
	const [isOtherProductsModalOpen, setIsOtherProductsModalOpen] = useState(false);
	const [aiChatOpen, setAiChatOpen] = useState(false);
	const isMd = useMediaQueryMd();
	const { colors } = useTheme();

	const toggleAiChat = () => setAiChatOpen((v) => !v);

	return (
		<I18nextProvider i18n={i18n}>
			<AutoTranslate>
				<div
					className={`flex gap-2 relative md:p-2 transition-colors min-h-screen`}
				>
					<div className="hidden md:block">
						<Sidebar
							open={open}
							setOpen={setOpen}
							drawerOpen={drawerOpen}
							setDrawerOpen={setDrawerOpen}
						/>
					</div>

					<div
						className={`fixed inset-0 bg-black bg-opacity-50 left-0 right-0 transition-all duration-300 ease-in-out z-50 ${
							drawerOpen
								? "bottom-0 h-0 opacity-100 visible"
								: "bottom-0 h-0 opacity-0 hidden"
						} md:hidden block`}
					>
						<Sidebar
							open={drawerOpen}
							setOpen={setDrawerOpen}
							drawerOpen={drawerOpen}
							setDrawerOpen={setDrawerOpen}
						/>
					</div>

					<div className="flex min-w-0 flex-1 gap-2">
						<main
							className={`min-w-0 flex-1 overflow-y-auto ${colors.primaryBackground} border ${colors.border} rounded-2xl h-[98vh] hidescrollbar transition-all duration-200 ease-in`}
						>
							<Navbar
								open={open}
								setOpen={setOpen}
								drawerOpen={drawerOpen}
								setDrawerOpen={setDrawerOpen}
								aiChatOpen={aiChatOpen}
								onToggleAiChat={toggleAiChat}
							/>
							<div>{children}</div>
						</main>

						{isMd && (
							<motion.aside
								initial={false}
								animate={{
									width: aiChatOpen ? AI_PANEL_WIDTH : 0,
									opacity: aiChatOpen ? 1 : 0,
								}}
								transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
								className={`flex shrink-0 overflow-hidden rounded-2xl border ${colors.border} ${colors.primaryBackground} h-[98vh] z-50`}
								aria-hidden={!aiChatOpen}
							>
								<div className="flex h-full w-96 min-w-[24rem] flex-col">
									{aiChatOpen && (
										<AIChatSidebar onClose={() => setAiChatOpen(false)} />
									)}
								</div>
							</motion.aside>
						)}
					</div>

					<AnimatePresence>
						{aiChatOpen && !isMd && (
							<>
								<motion.div
									key="ai-chat-backdrop"
									role="presentation"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.2 }}
									className="fixed inset-0 z-[55] bg-black/50 md:hidden"
									onClick={() => setAiChatOpen(false)}
								/>
								<motion.aside
									key="ai-chat-panel"
									initial={{ x: "100%" }}
									animate={{ x: 0 }}
									exit={{ x: "100%" }}
									transition={{ type: "tween", duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
									className={`fixed right-0 top-0 z-[56] flex h-[100dvh] w-[min(100vw,24rem)] max-w-full flex-col overflow-hidden border-l md:hidden ${colors.border} ${colors.primaryBackground} shadow-2xl`}
								>
									<AIChatSidebar onClose={() => setAiChatOpen(false)} />
								</motion.aside>
							</>
						)}
					</AnimatePresence>

					<div className="fixed bottom-2 right-2 z-40 flex flex-col items-end gap-2">
						<button
							type="button"
							onClick={toggleAiChat}
							className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:shadow-xl ${
								aiChatOpen
									? "bg-violet-700 hover:bg-violet-600"
									: "bg-violet-600 hover:bg-violet-500"
							}`}
							aria-label={aiChatOpen ? "Close AI assistant" : "Open AI assistant"}
							aria-pressed={aiChatOpen}
						>
							{aiChatOpen ? (
								<PanelRightClose size={18} className="shrink-0" />
							) : (
								<Bot size={18} className="shrink-0" />
							)}
							<span className="hidden md:inline">
								{aiChatOpen ? "Close AI" : "AI Assistant"}
							</span>
						</button>
						<button
							type="button"
							onClick={() => setIsGuideModalOpen(true)}
							className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all duration-200 hover:bg-indigo-500 hover:shadow-xl"
							aria-label="Open guide, demo video, and purchasing details"
						>
							<Sparkles size={18} className="shrink-0" />
							<span className="hidden md:inline">Guide & demo</span>
						</button>
						<button
							type="button"
							onClick={() => setIsOtherProductsModalOpen(true)}
							className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium shadow-md transition-all duration-200 hover:shadow-lg ${colors.border} ${colors.card} ${colors.foreground}`}
							aria-label="Browse other CRM templates"
						>
							<LayoutGrid size={18} className="shrink-0" />
							<span className="hidden md:inline">Other CRM templates</span>
						</button>
					</div>

					{isGuideModalOpen && (
						<div
							role="presentation"
							className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-3"
							onClick={() => setIsGuideModalOpen(false)}
						>
							<div
								role="dialog"
								aria-modal="true"
								aria-labelledby="guide-modal-title"
								className={`relative max-h-[min(92vh,900px)] w-full max-w-4xl overflow-y-auto hidescrollbar rounded-2xl border ${colors.border} ${colors.card} p-5 shadow-2xl`}
								onClick={(e) => e.stopPropagation()}
							>
								<div className="flex items-start justify-between gap-4">
									<div>
										<h2 id="guide-modal-title" className={`text-xl font-bold ${colors.foreground}`}>
											CRM SaaS template — guide, demo & how to purchase
										</h2>
										<p className={`mt-2 text-sm ${colors.mutedForeground}`}>
											How this template ships, watch the demo, get the codebase, then wire your API.
										</p>
									</div>
									<button
										type="button"
										onClick={() => setIsGuideModalOpen(false)}
										className={`shrink-0 rounded-xl p-2 ${colors.hoverSecondary}`}
										aria-label="Close guide"
									>
										<X size={14} className={colors.foreground} />
									</button>
								</div>

								<section className="mt-8">
									<h3 className={`text-base font-semibold ${colors.foreground}`}>
										How it works after purchase
									</h3>
									<p className={`mt-1 text-xs ${colors.mutedForeground}`}>
										Typical path from Gumroad checkout to deployed app.
									</p>
									<div className="mt-4 grid gap-3 sm:grid-cols-3">
										{GUIDE_STEPS.map((step, idx) => {
											const Icon = step.icon;
											return (
												<motion.div
													key={step.title}
													initial={{ opacity: 0, y: 12 }}
													animate={{ opacity: 1, y: 0 }}
													transition={{ delay: idx * 0.08, duration: 0.3 }}
													className={`rounded-xl border ${colors.border} p-4`}
												>
													<div className={`rounded-xl p-2 w-fit ${step.accent}`}>
														<Icon size={16} />
													</div>
													<p className={`mt-2 text-sm font-semibold ${colors.foreground}`}>
														{step.title}
													</p>
													<p className={`text-xs leading-relaxed ${colors.mutedForeground}`}>
														{step.desc}
													</p>
												</motion.div>
											);
										})}
									</div>
								</section>

								<section className="mt-10">
									<h3 className={`text-base font-semibold ${colors.foreground}`}>
										What you get in this repository
									</h3>
									<p className={`mt-1 text-xs ${colors.mutedForeground}`}>
										Everything shipped with the template codebase and docs.
									</p>
									<ul
										className={`mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed ${colors.textSecondary}`}
									>
										<li>
											<span className={`font-medium ${colors.foreground}`}>
												Full Next.js CRM codebase
											</span>{" "}
											— 20+ pages (leads, contacts, deals, pipelines, finance, settings, CMS, and
											more) ready to customize.
										</li>
										<li>
											<span className={`font-medium ${colors.foreground}`}>Responsive UI</span>{" "}
											— layout, sidebar, tables, and modals built for mobile through desktop.
										</li>
										<li>
											<span className={`font-medium ${colors.foreground}`}>
												Light &amp; dark theme
											</span>{" "}
											— user-toggleable mode plus accent color schemes in the shell.
										</li>
										<li>
											<span className={`font-medium ${colors.foreground}`}>Zod schemas</span> —{" "}
											<code className="rounded bg-black/10 px-1 text-[11px] dark:bg-white/10">
												schemas/zod-schemas/
											</code>{" "}
											for API and{" "}
											<code className="rounded bg-black/10 px-1 text-[11px] dark:bg-white/10">
												data.json
											</code>{" "}
											shape validation.
										</li>
										<li>
											<span className={`font-medium ${colors.foreground}`}>
												Design.md for AI agents &amp; designers
											</span>{" "}
											— colors, typography, components, and UI patterns documented at the repo root.
										</li>
										<li>
											<span className={`font-medium ${colors.foreground}`}>Figma file</span> — link
											or kit access via your purchase receipt; request at{" "}
											<a
												href="mailto:shreyvijayvargiya26@gmail.com"
												className={`font-medium underline ${colors.foreground}`}
											>
												shreyvijayvargiya26@gmail.com
											</a>{" "}
											if you need the latest file.
										</li>
										<li>
											<span className={`font-medium ${colors.foreground}`}>README &amp; sample data</span>{" "}
											—{" "}
											<code className="rounded bg-black/10 px-1 text-[11px] dark:bg-white/10">
												readme.md
											</code>{" "}
											explains setup,{" "}
											<code className="rounded bg-black/10 px-1 text-[11px] dark:bg-white/10">
												data.json
											</code>{" "}
											and SQL/Firestore schema folders document payloads and persistence models.
										</li>
									</ul>
								</section>

								<section className="mt-10">
									<h3 className={`flex items-center gap-2 text-base font-semibold ${colors.foreground}`}>
										<PlayCircle size={18} className="text-indigo-500" aria-hidden />
										Demo video
									</h3>
									<p className={`mt-1 text-xs ${colors.mutedForeground}`}>
										Walkthrough of main pages and flows in this template.
									</p>
									<div className={`mt-3 overflow-hidden rounded-xl border ${colors.border} bg-black`}>
										<div className="aspect-video w-full">
											<video
												className="h-full w-full object-contain"
												src={ABOUT_VIDEO_URL}
												controls
												autoPlay
												playsInline
												preload="metadata"
											>
												Your browser does not support the video tag.
											</video>
										</div>
									</div>
								</section>

								<section className="mt-8">
									<h3 className={`text-base font-semibold ${colors.foreground}`}>Get this template</h3>
									<p className={`mt-1 text-xs ${colors.mutedForeground}`}>
										Use the checkout that suits you — both include the ZIP and updates per your
										platform terms.
									</p>
									<div className="mt-3 flex flex-wrap gap-2">
										<a
											href={TEMPLATE_GUMROAD_USD}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-400"
										>
											Gumroad (USD)
											<ExternalLink className="h-3.5 w-3.5" />
										</a>
										<a
											href={TEMPLATE_CHECKOUT_INR}
											target="_blank"
											rel="noopener noreferrer"
											className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition hover:opacity-90 ${colors.border} ${colors.secondary} ${colors.secondaryForeground}`}
										>
											Dodo checkout (INR)
											<ExternalLink className="h-3.5 w-3.5" />
										</a>
									</div>
								</section>

								<section className={`mt-8 rounded-xl p-4 ${colors.muted}`}>
									<div className="mb-2 flex items-center gap-2">
										<CheckCircle2 size={16} className={colors.foreground} />
										<p className={`text-sm font-semibold ${colors.foreground}`}>Tech stack</p>
									</div>
									<ul className={`list-disc space-y-1 pl-5 text-xs ${colors.mutedForeground}`}>
										<li>Next.js</li>
										<li>React</li>
										<li>Lucide Icons</li>
										<li>Tailwind CSS</li>
										<li>Framer Motion</li>
									</ul>
								</section>
							</div>
						</div>
					)}

					{isOtherProductsModalOpen && (
						<div
							role="presentation"
							className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-3"
							onClick={() => setIsOtherProductsModalOpen(false)}
						>
							<div
								role="dialog"
								aria-modal="true"
								aria-labelledby="other-products-title"
								className={`relative w-full max-w-md rounded-2xl border ${colors.border} ${colors.card} p-6 shadow-2xl`}
								onClick={(e) => e.stopPropagation()}
							>
								<div className="flex items-start justify-between gap-4">
									<div>
										<h2 id="other-products-title" className={`text-lg font-bold ${colors.foreground}`}>
											More CRM templates from our shop
										</h2>
										<p className={`mt-2 text-xs ${colors.mutedForeground}`}>
											Pick a vertical or stack variant — same quality bar, shipped on Gumroad.
										</p>
									</div>
									<button
										type="button"
										onClick={() => setIsOtherProductsModalOpen(false)}
										className={`shrink-0 rounded-xl p-2 ${colors.hoverSecondary}`}
										aria-label="Close"
									>
										<X size={14} className={colors.foreground} />
									</button>
								</div>
								<ul className="mt-6 space-y-3">
									{OTHER_PRODUCTS_LINKS.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className={`group flex items-center justify-between gap-3 rounded-xl border ${colors.border} px-4 py-3 text-sm font-medium transition ${colors.hoverSecondary} ${colors.foreground}`}
												onClick={() => setIsOtherProductsModalOpen(false)}
											>
												<span className="min-w-0 flex-1 leading-snug">{link.label}</span>
												<ExternalLink className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100" />
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
					<ToastContainer position="bottom-right" />
				</div>
			</AutoTranslate>
		</I18nextProvider>
	);
};

export default LayoutWrapper;
