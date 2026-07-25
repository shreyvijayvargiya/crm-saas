import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import {
	Home,
	LayoutDashboard,
	Sparkles,
	CreditCard,
	CircleHelp,
	Mail,
	Sun,
	Moon,
	BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgencyTheme } from "../AgencyThemeContext";

const TABS = [
	{ id: "home", label: "Home", href: "/", icon: Home },
	{ id: "demo", label: "Demo", href: "/demo", icon: LayoutDashboard },
	{ id: "blueprint", label: "Builder", href: "/blueprint", icon: Sparkles },
	{ id: "blog", label: "Blog", href: "/blog", icon: BookOpen },
	{ id: "pricing", label: "Pricing", href: "/pricing", icon: CreditCard },
	{ id: "faq", label: "FAQ", href: "/faq", icon: CircleHelp },
	{ id: "contact", label: "Contact", href: "/contact", icon: Mail },
];

const PILL_SPRING = { type: "spring", stiffness: 440, damping: 34, mass: 0.75 };
const LABEL_SPRING = { type: "spring", stiffness: 380, damping: 28, mass: 0.6 };

function isActiveRoute(pathname, href) {
	if (href === "/") return pathname === "/";
	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DynamicIslandNav() {
	const router = useRouter();
	const { isLight, toggleTheme } = useAgencyTheme();

	return (
		<div
			className={cn(
				"pointer-events-none relative inset-x-0 top-0.5 z-50 flex",
				"justify-stretch sm:justify-center sm:pb-6"
			)}
		>
			<motion.nav
				layout
				initial={{ opacity: 0, y: 24, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ type: "spring", stiffness: 380, damping: 28 }}
				className={cn(
					"pointer-events-auto flex w-full items-center sm:w-auto sm:gap-1 rounded-xl sm:rounded-full sm:border sm:px-2 sm:py-2",
					"justify-between gap-0 border-t px-1 pt-2",
					"pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:pb-2",
					isLight
						? "border-zinc-200/50 bg-white/20 sm:bg-white/20"
						: "border-zinc-800/90 bg-zinc-950/90 shadow-black/50 sm:bg-zinc-950/75"
				)}
				aria-label="Site navigation"
			>
				<div className="flex flex-1 items-center justify-between gap-0 sm:flex-none sm:justify-start sm:gap-0.5">
					{TABS.map((tab) => {
						const Icon = tab.icon;
						const active = isActiveRoute(router.pathname, tab.href);

						return (
							<Link key={tab.id} href={tab.href} passHref>
								<motion.a
									layout
									whileTap={{ scale: 0.94 }}
									transition={PILL_SPRING}
									className={cn(
										"relative flex h-11 items-center justify-center rounded-xl transition-colors duration-200 sm:h-10",
										active ? "border border-zinc-200 px-2 sm:px-2.5" : "w-11 sm:w-10",
										!active &&
											(isLight
												? "text-zinc-500 hover:text-zinc-800"
												: "text-zinc-500 hover:text-zinc-200")
									)}
									aria-label={tab.label}
									aria-current={active ? "page" : undefined}
								>
									{active ? (
										<motion.span
											layoutId="island-active-pill"
											className={cn(
												"absolute inset-0 rounded-xl",
												isLight
													? "bg-zinc-100 text-zinc-900 shadow-zinc-100/20"
													: "bg-zinc-50 text-zinc-900 shadow-white/10"
											)}
											transition={PILL_SPRING}
										/>
									) : null}
									<Icon
										className={cn(
											"relative z-10 h-[18px] w-[18px] shrink-0 transition-colors duration-200",
											active
												? isLight
													? "text-black"
													: "text-zinc-900"
												: isLight
													? "text-zinc-500 group-hover:text-zinc-800"
													: "text-zinc-500"
										)}
										strokeWidth={active ? 1.75 : 1.5}
									/>
									<AnimatePresence initial={false} mode="popLayout">
										{active ? (
											<motion.span
												key={`label-${tab.id}`}
												layout
												initial={{ opacity: 0, width: 0, marginLeft: 0 }}
												animate={{
													opacity: 1,
													width: "auto",
													marginLeft: 8,
												}}
												exit={{
													opacity: 0,
													width: 0,
													marginLeft: 0,
												}}
												transition={LABEL_SPRING}
												className={cn(
													"relative z-10 hidden overflow-hidden whitespace-nowrap text-sm font-semibold tracking-tight sm:inline",
													isLight ? "text-black" : "text-zinc-900"
												)}
											>
												{tab.label}
											</motion.span>
										) : null}
									</AnimatePresence>
								</motion.a>
							</Link>
						);
					})}

					<div
						className={cn(
							"mx-1 hidden h-5 w-px sm:block",
							isLight ? "bg-zinc-200" : "bg-zinc-700"
						)}
						aria-hidden
					/>

					<motion.button
						type="button"
						layout
						whileTap={{ scale: 0.94 }}
						onClick={toggleTheme}
						className={cn(
							"flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 sm:h-10 sm:w-10",
							isLight
								? "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
								: "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
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
