import React, { useState, useEffect } from "react";
import Link from "next/link";
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
import ThemeCustomizer from "../ThemeCustomizer";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "../Navbar";
import { useTheme } from "../../utils/useTheme";
import i18n from "../../utils/i18n";
import AutoTranslate from "../AutoTranslate";
import AIChatSidebar from "../AIChatSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
	const { colors, theme } = useTheme();

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
								<AIChatSidebar onClose={() => setAiChatOpen(false)} />
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

					<div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
						<Link href="/" passHref>
							<a
								className={cn(
									"inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium shadow-lg backdrop-blur-md transition hover:opacity-90",
									theme === "dark"
										? "border-white/10 bg-black/70 text-zinc-200"
										: "border-zinc-200 bg-white/90 text-zinc-700"
								)}
							>
								← Back to agency site
							</a>
						</Link>
					</div>
					<Toaster />
					<ThemeCustomizer />
				</div>
			</AutoTranslate>
		</I18nextProvider>
	);
};

export default LayoutWrapper;
