import React, { useEffect, useState } from "react";
import * as lucideIcons from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../utils/useTheme";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { navCategories } from "../navConfig";

function isItemActive(router, item) {
	const pathOnly = (item.route || "").split("?")[0];
	const wantsNewsletter = (item.route || "").includes("section=newsletters");
	const hasNewsletter =
		String(router.asPath || "").includes("section=newsletters");

	if (wantsNewsletter) {
		return router.pathname.startsWith("/cms") && hasNewsletter;
	}

	if (pathOnly === "/cms") {
		return (
			(router.pathname === "/cms" || router.pathname.startsWith("/cms/")) &&
			!hasNewsletter
		);
	}

	// Exact match for /subscriptions so Plans (/subscriptions/plans) stays a sibling highlight
	if (pathOnly === "/subscriptions") {
		return (
			router.pathname === "/subscriptions" ||
			(router.pathname.startsWith("/subscriptions/") &&
				!router.pathname.startsWith("/subscriptions/plans"))
		);
	}

	return (
		router.pathname === pathOnly ||
		router.pathname.startsWith(`${pathOnly}/`)
	);
}

function isParentActive(router, item) {
	if (isItemActive(router, item)) return true;
	return (item.children || []).some((child) => isItemActive(router, child));
}

const Sidebar = ({ open, setDrawerOpen }) => {
	const router = useRouter();
	const { colors } = useTheme();
	const { i18n, t } = useTranslation();
	const [expandedIds, setExpandedIds] = useState(() => new Set());

	useEffect(() => {
		const next = new Set();
		navCategories.forEach((category) => {
			category.items?.forEach((item) => {
				if (item.children?.length && isParentActive(router, item)) {
					next.add(item.id);
				}
			});
		});
		setExpandedIds((prev) => {
			const merged = new Set(prev);
			next.forEach((id) => merged.add(id));
			return merged;
		});
	}, [router.asPath, router.pathname]);

	/* Native endonyms — not passed through locale JSON / AutoTranslate (picker uses data-no-translate). */
	const languageOptions = [
		{ code: "en", label: "English", flag: "🇺🇸" },
		{ code: "hi", label: "हिन्दी", flag: "🇮🇳" },
		{ code: "es", label: "Español", flag: "🇪🇸" },
		{ code: "it", label: "Italiano", flag: "🇮🇹" },
		{ code: "fr", label: "Français", flag: "🇫🇷" },
		{ code: "de", label: "Deutsch", flag: "🇩🇪" },
		{ code: "zh", label: "中文", flag: "🇨🇳" },
		{ code: "ja", label: "日本語", flag: "🇯🇵" },
	];

	const langPrefix = (i18n.language || "en").split("-")[0];
	const selectedLanguage =
		languageOptions.find((lang) => lang.code === langPrefix) || languageOptions[0];

	const toggleExpanded = (id) => {
		setExpandedIds((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const renderNavLink = (item, { nested = false } = {}) => {
		const Icon = lucideIcons[item?.icon];
		const isActive = isItemActive(router, item);
		return (
			<div key={item.id} className="relative group">
				<Button
					variant={isActive ? "default" : "ghost"}
					size="sm"
					asChild
					className={cn(
						open ? "py-1" : "py-1.5",
						"w-full justify-start gap-2 px-3 my-0.5",
						nested && open && "pl-7"
					)}
				>
					<a href={item.route}>
						{Icon ? <Icon className="w-4 h-4 shrink-0" /> : null}
						{open ? item.label : null}
					</a>
				</Button>
				{!open && (
					<div className="fixed left-14 mb-2 w-max rounded bg-primary px-1 py-1 text-xs text-primary-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10">
						{item.label}
					</div>
				)}
			</div>
		);
	};

	return (
		<div
			className={`h-[98vh] border ${colors.border} ${colors.primaryBackground} rounded-xl ${
				open ? "w-60 md:w-60" : "w-full"
			} transition-all duration-100 ease-in`}
		>
			<div
				className={`flex flex-col h-full overflow-scroll hidescrollbar justify-between py-1 px-2 transition-colors ${open ? "w-60 md:w-60" : "w-full"} transition-all duration-300 ease-in`}
			>
				<div className="flex flex-col gap-1">
					<div className={`flex items-center justify-between gap-2 p-1`}>
						{open ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										type="button"
										variant="ghost"
										className={cn(
											"flex items-center px-2 py-1 justify-between border w-full h-auto",
											colors.border,
											colors.hoverSecondary
										)}
									>
										<div className="flex items-center gap-2">
											<lucideIcons.Rocket
												className={`w-3 h-3 ${colors.foreground}`}
											/>
											<p className={`text-sm ${colors.foreground}`}>Indie Stripe</p>
										</div>
										<lucideIcons.ChevronUp
											className={`${colors.mutedForeground} w-3 h-3`}
										/>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start" className="w-56">
									<DropdownMenuLabel>Workspace</DropdownMenuLabel>
									<DropdownMenuItem onClick={() => router.push("/demo")}>
										<lucideIcons.DollarSign className="w-4 h-4" />
										Indie Stripe Billing OS
									</DropdownMenuItem>
									<DropdownMenuItem onClick={() => router.push("/cms")}>
										<lucideIcons.Megaphone className="w-4 h-4" />
										Launch & reach
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>
											<Button size="xs">
												Add project
											</Button>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<lucideIcons.Rocket
								className={`w-4 h-4 my-4 mx-auto ${colors.foreground}`}
							/>
						)}
						<Button
							type="button"
							variant="ghost"
							size="icon"
							onClick={() => setDrawerOpen(!open)}
							className={`md:hidden ${colors.foreground}`}
						>
							<lucideIcons.X size={18} />
						</Button>
					</div>
					<div className="flex flex-col">
						{navCategories?.map((category) => (
							<div key={category.id} className="mb-4">
								{open && (
									<p className={`text-xs font-medium ${colors.mutedForeground} mb-2 px-3 tracking-wide`}>
										{category.label}
									</p>
								)}
								<div className="space-y-1">
									{category.items?.map((item) => {
										const Icon = lucideIcons[item?.icon];
										const hasChildren = Boolean(item.children?.length);
										const expanded = expandedIds.has(item.id);
										const parentActive = isParentActive(router, item);

										if (!hasChildren) {
											return renderNavLink(item);
										}

										return (
											<div key={item.id} className="relative group">
												<div className="flex items-center gap-0.5">
													<Button
														variant={parentActive && !expanded ? "default" : parentActive ? "secondary" : "ghost"}
														size="sm"
														asChild
														className={cn(
															open ? "py-1" : "py-1.5",
															"flex-1 justify-start gap-2 px-3 my-0.5"
														)}
													>
														<a href={item.route}>
															{Icon ? <Icon className="w-4 h-4 shrink-0" /> : null}
															{open ? item.label : null}
														</a>
													</Button>
													{open ? (
														<Button
															type="button"
															variant="ghost"
															size="icon"
															className="h-8 w-8 shrink-0"
															aria-label={expanded ? "Collapse" : "Expand"}
															aria-expanded={expanded}
															onClick={() => toggleExpanded(item.id)}
														>
															<lucideIcons.ChevronDown
																className={cn(
																	"h-4 w-4 transition-transform",
																	expanded && "rotate-180"
																)}
															/>
														</Button>
													) : null}
												</div>
												{!open && (
													<div className="fixed left-14 mb-2 w-max rounded bg-primary px-1 py-1 text-xs text-primary-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10">
														{item.label}
													</div>
												)}
												{open && expanded ? (
													<div className="mt-0.5 space-y-0.5 pl-3">
														{item.children.map((child) =>
															renderNavLink(child, { nested: true })
														)}
													</div>
												) : null}
											</div>
										);
									})}
								</div>
							</div>
						))}
					</div>
					{open && (
						<>
							<div className="px-3 mb-2 relative" data-no-translate translate="no">
								<p className={`text-xs font-medium ${colors.mutedForeground} mb-2 tracking-wide`}>
									{t("Language")}
								</p>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											type="button"
											variant="outline"
											className={cn(
												"w-full justify-between rounded-xl px-2.5 py-2 text-xs h-auto",
												colors.foreground
											)}
										>
											<span className="inline-flex min-w-0 items-center gap-2">
												<span aria-hidden>{selectedLanguage.flag}</span>
												<span className="truncate">{selectedLanguage.label}</span>
											</span>
											<lucideIcons.ChevronDown className={`w-3.5 h-3.5 shrink-0 ${colors.mutedForeground}`} />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
										{languageOptions.map((lang) => (
											<DropdownMenuItem
												key={lang.code}
												onClick={() => i18n.changeLanguage(lang.code)}
												className={cn(
													"gap-2 text-xs",
													langPrefix === lang.code && "bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground"
												)}
											>
												<span aria-hidden>{lang.flag}</span>
												<span>{lang.label}</span>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<p className={`text-xs font-medium ${colors.mutedForeground} mb-2 px-3 tracking-wide`}>
								Buy Template
							</p>
							<div className={`w-fit p-1 flex p-1 mx-3 border ${colors.border} gap-1 rounded-xl`}>
								<a
									href="https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX"
									target="_blank"
									rel="noopener noreferrer"
									className={`w-fit rounded bg-orange-100 text-zinc-600 dark:text-zinc-800 hover:bg-orange-200 dark:hover:bg-orange-900 p-1 text-center text-xs font-semibold text-white transition-all duration-100 ease-in`}
								>
									🇮🇳 INR
								</a>
								<a
									href="https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template"
									target="_blank"
									rel="noopener noreferrer"
									className={`w-fit rounded text-zinc-600 dark:text-zinc-200 ${colors.hoverSecondary} px-1 py-1.5 text-center text-xs font-semibold text-white transition-all duration-100 ease-in`}
								>
									🇺🇸 USD
								</a>
							</div>
							<p className={`text-xs font-medium ${colors.mutedForeground} mt-2 px-3 tracking-wide`}>
								Contact
							</p>
							<div className="flex flex-col p-2 mx-3 gap-3 text-sm">
								<a
									href="https://x.com/treyvijay"
									target="_blank"
									rel="noopener noreferrer"
									className={`${colors.mutedForeground} hover:underline`}
								>
									X
								</a>
								<a
									href="mailto:shreyvijayvargiya26@gmail.com"
									className={`${colors.mutedForeground} hover:underline break-all`}
								>
									Email
								</a>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
