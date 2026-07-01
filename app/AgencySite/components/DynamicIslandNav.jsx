import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
	Home,
	LayoutDashboard,
	CreditCard,
	CircleHelp,
	Mail,
	Sun,
	Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgencyTheme } from "../AgencyThemeContext";

const TABS = [
	{ id: "home", label: "Home", href: "/", icon: Home },
	{ id: "demo", label: "Demo", href: "/demo", icon: LayoutDashboard },
	{ id: "pricing", label: "Pricing", href: "/pricing", icon: CreditCard },
	{ id: "faq", label: "FAQ", href: "/faq", icon: CircleHelp },
	{ id: "contact", label: "Contact", href: "/contact", icon: Mail },
];

function isActiveRoute(pathname, href) {
	if (href === "/") return pathname === "/";
	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DynamicIslandNav() {
	const router = useRouter();
	const { isLight, toggleTheme } = useAgencyTheme();
	const activeTab = TABS.find((tab) => isActiveRoute(router.pathname, tab.href));

	return (
		<div
			className={cn(
				"pointer-events-none fixed inset-x-0 bottom-0 z-50 flex",
				"justify-stretch sm:justify-center sm:pb-6"
			)}
		>
			<motion.nav
				layout
				initial={{ opacity: 0, y: 24, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ type: "spring", stiffness: 380, damping: 28 }}
				className={cn(
					"pointer-events-auto flex w-full items-center shadow-2xl backdrop-blur-xl sm:w-auto sm:gap-1 sm:rounded-full sm:border sm:px-2 sm:py-2",
					"justify-between gap-0 border-t px-1 pt-2",
					"pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:pb-2",
					isLight
						? "border-zinc-200/80 bg-white/95 shadow-zinc-300/20 sm:bg-white/85 sm:shadow-zinc-300/25"
						: "border-zinc-800 bg-zinc-950/95 shadow-black/40 sm:bg-zinc-950/80 sm:shadow-black/50"
				)}
				aria-label="Site navigation"
			>
				<AnimatePresence mode="popLayout">
					{activeTab ? (
						<motion.div
							key={`label-${activeTab.id}`}
							initial={{ opacity: 0, width: 0 }}
							animate={{ opacity: 1, width: "auto" }}
							exit={{ opacity: 0, width: 0 }}
							className="hidden overflow-hidden sm:block"
						>
							<span
								className={cn(
									"whitespace-nowrap px-3 text-xs font-medium",
									isLight ? "text-zinc-500" : "text-zinc-400"
								)}
							>
								{activeTab.label}
							</span>
						</motion.div>
					) : null}
				</AnimatePresence>

				<div className="flex flex-1 items-center justify-between gap-0 sm:flex-none sm:justify-start sm:gap-1">
					{TABS.map((tab) => {
						const Icon = tab.icon;
						const active = isActiveRoute(router.pathname, tab.href);
						return (
							<Link key={tab.id} href={tab.href} passHref>
								<motion.a
									layout
									whileTap={{ scale: 0.92 }}
									className={cn(
										"relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors sm:h-10 sm:w-10",
										active
											? isLight
												? "border-zinc-400 bg-zinc-200 text-zinc-900"
												: "border-zinc-600 bg-zinc-800 text-zinc-100"
											: isLight
												? "border-zinc-200/80 bg-white/70 text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
												: "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
									)}
									aria-label={tab.label}
									aria-current={active ? "page" : undefined}
								>
									{active ? (
										<motion.span
											layoutId="island-active-glow"
											className={cn(
												"absolute inset-0 rounded-full",
												isLight ? "bg-zinc-300/40" : "bg-zinc-700/30"
											)}
											transition={{ type: "spring", stiffness: 400, damping: 30 }}
										/>
									) : null}
									<Icon className="relative h-[18px] w-[18px]" strokeWidth={1.75} />
								</motion.a>
							</Link>
						);
					})}

					<div
						className={cn(
							"mx-0.5 hidden h-6 w-px sm:block",
							isLight ? "bg-zinc-200" : "bg-zinc-800"
						)}
						aria-hidden
					/>

					<motion.button
						type="button"
						layout
						whileTap={{ scale: 0.92 }}
						onClick={toggleTheme}
						className={cn(
							"flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors sm:h-10 sm:w-10",
							isLight
								? "border-zinc-200/80 bg-white/70 text-zinc-500 hover:border-zinc-300 hover:text-zinc-800"
								: "border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
						)}
						aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
					>
						{isLight ? (
							<Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
						) : (
							<Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
						)}
					</motion.button>
				</div>
			</motion.nav>
		</div>
	);
}
