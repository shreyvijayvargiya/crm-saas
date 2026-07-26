import React, { useEffect, useState } from "react";
import * as lucideIcons from "lucide-react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../utils/useTheme";
import { useCrmVertical } from "../../utils/CrmVerticalContext";
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

function isItemActive(router, item) {
	const pathOnly = (item.route || "").split("?")[0];
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
	const { vertical, verticalId, verticals, setVerticalId, navCategories } =
		useCrmVertical();
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
	}, [router.asPath, router.pathname, navCategories]);

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

	const switchVertical = (ast) => {
		if (!ast?.id) return;
		setVerticalId(ast.id);
		const dest = ast.homeRoute || "/dashboard";
		if (router.pathname !== dest) {
			router.push(dest);
		}
	};

	const activeVertical =
		verticals.find((ast) => ast.id === verticalId) || vertical;
	const VerticalIcon =
		lucideIcons[activeVertical?.meta?.icon] || lucideIcons.LayoutDashboard;
	const verticalLabel = activeVertical?.meta?.name || "CRM";

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
					<div className="fixed left-14 z-10 mb-2 w-max rounded bg-primary px-1 py-1 text-xs text-primary-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100">
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
							<DropdownMenu key={verticalId}>
								<DropdownMenuTrigger asChild>
									<Button
										type="button"
										variant="ghost"
										className={cn(
											"flex h-auto w-full items-center justify-between border px-2 py-1",
											colors.border,
											colors.hoverSecondary
										)}
									>
										<div className="flex min-w-0 items-center gap-2">
											<VerticalIcon
												className={`h-3 w-3 shrink-0 ${colors.foreground}`}
											/>
											<p className={`truncate text-sm ${colors.foreground}`}>
												{verticalLabel}
											</p>
										</div>
										<lucideIcons.ChevronUp
											className={`${colors.mutedForeground} h-3 w-3 shrink-0`}
										/>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="start" className="w-56">
									<DropdownMenuLabel>CRM vertical (AST)</DropdownMenuLabel>
									{verticals.map((ast) => {
										const Icon =
											lucideIcons[ast.meta.icon] || lucideIcons.LayoutDashboard;
										const selected = verticalId === ast.id;
										return (
											<DropdownMenuItem
												key={ast.id}
												onSelect={() => switchVertical(ast)}
												className={cn(
													selected &&
														"bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground"
												)}
											>
												<Icon className="h-4 w-4" />
												<span className="truncate">{ast.meta.name}</span>
											</DropdownMenuItem>
										);
									})}
									<DropdownMenuSeparator />
									<DropdownMenuItem onSelect={() => router.push("/demo")}>
										<lucideIcons.LayoutGrid className="h-4 w-4" />
										All verticals on /demo
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<VerticalIcon
								className={`mx-auto my-4 h-4 w-4 ${colors.foreground}`}
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
									<p
										className={`mb-2 px-3 text-xs font-medium tracking-wide ${colors.mutedForeground}`}
									>
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
														variant={
															parentActive && !expanded
																? "default"
																: parentActive
																	? "secondary"
																	: "ghost"
														}
														size="sm"
														asChild
														className={cn(
															open ? "py-1" : "py-1.5",
															"my-0.5 flex-1 justify-start gap-2 px-3"
														)}
													>
														<a href={item.route}>
															{Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
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
							<div className="relative mb-2 px-3" data-no-translate translate="no">
								<p
									className={`mb-2 text-xs font-medium tracking-wide ${colors.mutedForeground}`}
								>
									{t("Language")}
								</p>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											type="button"
											variant="outline"
											className={cn(
												"h-auto w-full justify-between rounded-xl px-2.5 py-2 text-xs",
												colors.foreground
											)}
										>
											<span className="inline-flex min-w-0 items-center gap-2">
												<span aria-hidden>{selectedLanguage.flag}</span>
												<span className="truncate">{selectedLanguage.label}</span>
											</span>
											<lucideIcons.ChevronDown
												className={`h-3.5 w-3.5 shrink-0 ${colors.mutedForeground}`}
											/>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										align="start"
										className="w-[var(--radix-dropdown-menu-trigger-width)]"
									>
										{languageOptions.map((lang) => (
											<DropdownMenuItem
												key={lang.code}
												onClick={() => i18n.changeLanguage(lang.code)}
												className={cn(
													"gap-2 text-xs",
													langPrefix === lang.code &&
														"bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground"
												)}
											>
												<span aria-hidden>{lang.flag}</span>
												<span>{lang.label}</span>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<p
								className={`mb-2 px-3 text-xs font-medium tracking-wide ${colors.mutedForeground}`}
							>
								Buy Template
							</p>
							<div
								className={`mx-3 flex w-fit gap-1 rounded-xl border p-1 ${colors.border}`}
							>
								<a
									href="https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX"
									target="_blank"
									rel="noopener noreferrer"
									className="w-fit rounded bg-orange-100 p-1 text-center text-xs font-semibold text-zinc-600 transition-all duration-100 ease-in hover:bg-orange-200 dark:text-zinc-800 dark:hover:bg-orange-900"
								>
									🇮🇳 INR
								</a>
								<a
									href="https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template"
									target="_blank"
									rel="noopener noreferrer"
									className={`w-fit rounded px-1 py-1.5 text-center text-xs font-semibold text-zinc-600 transition-all duration-100 ease-in dark:text-zinc-200 ${colors.hoverSecondary}`}
								>
									🇺🇸 USD
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
