import React, { useState } from "react";
import * as lucideIcons from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../utils/useTheme";

const Sidebar = ({ open, setDrawerOpen }) => {
	const router = useRouter();
	const { colors, scheme } = useTheme();
	const { i18n, t } = useTranslation();
	const [isLanguageOpen, setIsLanguageOpen] = useState(false);

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

	const navCategories = [
		{
			id: "main",
			label: "Main",
			items: [
				{
					id: 1,
					label: "Dashboard",
					route: "/",
					icon: "Home",
				},
				{
					id: 24,
					label: "My work",
					route: "/my-work",
					icon: "ClipboardList",
				},
				{
					id: 16,
					label: "Analytics",
					route: "/analytics",
					icon: "BarChart3",
				},
				{
					id: 25,
					label: "Reports",
					route: "/reports",
					icon: "Library",
				},
			],
		},
		{
			id: "sales",
			label: "Sales & CRM",
			items: [
				{
					id: 2,
					label: "Leads",
					route: "/leads",
					icon: "User",
				},
				{
					id: 3,
					label: "Sales",
					route: "/sales",
					icon: "DollarSign",
				},
				{
					id: 18,
					label: "Pipeline",
					route: "/pipelines",
					icon: "Layers",
				},
				{
					id: 21,
					label: "Deals",
					route: "/deals",
					icon: "CircleDollarSign",
				},
				{
					id: 4,
					label: "Contacts",
					route: "/contacts",
					icon: "Contact",
				},
				{
					id: 7,
					label: "Companies",
					route: "/companies",
					icon: "Users",
				},
				{
					id: 26,
					label: "Campaigns",
					route: "/campaigns",
					icon: "Megaphone",
				},
			],
		},
		{
			id: "operations",
			label: "Operations",
			items: [
				{
					id: 6,
					label: "Tasks",
					route: "/tasks",
					icon: "ListTodo",
				},
				{
					id: 15,
					label: "Calendar",
					route: "/calendar",
					icon: "Calendar",
				},
				{
					id: 19,
					label: "Email",
					route: "/email",
					icon: "Mail",
				},
				{
					id: 12,
					label: "Projects",
					route: "/projects",
					icon: "FolderClosed",
				},
			],
		},
		{
			id: "finance",
			label: "Finance",
			items: [
				{
					id: 23,
					label: "Products",
					route: "/products",
					icon: "Package",
				},
				{
					id: 27,
					label: "Quotes",
					route: "/quotes",
					icon: "FileSignature",
				},
				{
					id: 8,
					label: "Invoices",
					route: "/invoices",
					icon: "FileText",
				},
				{
					id: 11,
					label: "Payments",
					route: "/payments",
					icon: "CreditCard",
				},
			],
		},
		{
			id: "developer",
			label: "Developer",
			items: [
				{
					id: 5,
					label: "Integrations",
					route: "/integrations",
					icon: "Cable",
				},
				{
					id: 9,
					label: "Webhooks",
					route: "/webhooks",
					icon: "Webhook",
				},
				{
					id: 10,
					label: "Api Keys",
					route: "/api-keys",
					icon: "Key",
				},
				{
					id: 13,
					label: "CMS",
					route: "/cms",
					icon: "FileText",
				},
			],
		},
		{
			id: "authentication",
			label: "Authentication",
			items: [
				{
					id: 101,
					label: "Login",
					route: "/login",
					icon: "LogIn",
				},
				{
					id: 102,
					label: "Sign up",
					route: "/signup",
					icon: "UserPlus",
				},
				{
					id: 103,
					label: "Forgot password",
					route: "/forgot-password",
					icon: "KeyRound",
				},
				{
					id: 104,
					label: "Change password",
					route: "/change-password",
					icon: "Lock",
				},
			],
		},
		{
			id: "system",
			label: "System",
			items: [
				{
					id: 17,
					label: "Teams",
					route: "/teams",
					icon: "UsersRound",
				},
				{
					id: 20,
					label: "Notifications",
					route: "/notifications",
					icon: "Bell",
				},
				{
					id: 28,
					label: "Import data",
					route: "/import-data",
					icon: "Upload",
				},
				{
					id: 14,
					label: "Settings",
					route: "/settings",
					icon: "Settings",
				},
				{
					id: 22,
					label: "About",
					route: "/about",
					icon: "Info",
				},
			],
		},
	];

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
							<div
								className={`relative group flex items-center px-2 py-1 justify-between border ${colors.border} ${colors.hoverSecondary} rounded-xl cursor-pointer w-full transition-colors`}
							>
								<div className="flex items-center gap-2">
									<lucideIcons.Rocket
										className={`w-3 h-3 ${colors.foreground}`}
									/>
									<p className={`text-sm ${colors.foreground}`}>CRM pages</p>
								</div>
								<div className="flex flex-col items-center justify-center">
									<lucideIcons.ChevronUp
										className={`${colors.mutedForeground} group-hover:rotate-180 transition-all duration-200 ease-in w-3 h-3`}
									/>
								</div>
								<div
									className={`absolute top-8 left-0 right-0 w-54 h-fit ${colors.card} text-xs rounded-xl border ${colors.border} px-1 py-2 opacity-0 transition-opacity duration-200 invisible group-hover:visible group-hover:opacity-100 z-20`}
								>
									<p className={`text-xs font-medium p-1 ${colors.foreground}`}>
										Projects
									</p>
									<div className="flex flex-col gap-1 my-2">
										<div
											className={`flex items-center gap-2 ${colors.hoverSecondary} cursor-pointer rounded p-1 transition-colors`}
										>
											<lucideIcons.Rocket
												className={`w-5 h-5 p-1 rounded border ${colors.border} ${colors.foreground}`}
											/>
											<p className={`text-sm ${colors.foreground}`}>
												CRM pages
											</p>
										</div>
										<div
											className={`flex items-center gap-2 ${colors.hoverSecondary} cursor-pointer rounded p-1 transition-colors`}
										>
											<lucideIcons.ShoppingCart
												className={`w-5 h-5 p-1 rounded border ${colors.border} ${colors.foreground}`}
											/>
											<p className={`text-sm ${colors.foreground}`}>
												E-commerce
											</p>
										</div>
										<div
											className={`flex items-center gap-2 ${colors.hoverSecondary} cursor-pointer rounded p-1 transition-colors`}
										>
											<lucideIcons.Book
												className={`w-5 h-5 p-1 rounded border ${colors.border} ${colors.foreground}`}
											/>
											<p className={`text-sm ${colors.foreground}`}>Blog</p>
										</div>
										<div className={`border-t ${colors.border}`} />
										<button
											className={`${scheme.primary} ${scheme.primaryForeground} mt-2 cursor-pointer hover:shadow-xl transition-all duration-100 ease-in ${scheme.primaryHover} text-xs rounded w-full p-1`}

										>
											Add project
										</button>
									</div>
								</div>
							</div>
						) : (
							<lucideIcons.Rocket
								className={`w-4 h-4 my-4 mx-auto ${colors.foreground}`}
							/>
						)}
						<button
							onClick={() => setDrawerOpen(!open)}
							className={`md:hidden ${colors.foreground}`}
						>
							<lucideIcons.X size={18} />
						</button>
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
										const isActive = router.pathname === item.route;
										return (
											<div key={item.id} className="relative group">
												<a
													href={item.route}
													className={`${open ? "py-1": "py-1.5"} px-3 my-0.5 transition-all duration-100 ease-in rounded flex items-center gap-2 text-sm ${
														isActive
															? `${scheme.primary} ${scheme.primaryForeground}`
															: `${colors.hoverSecondary} ${colors.textSecondary}`
													}`}
													onMouseEnter={() => setDrawerOpen(!open)}
													onMouseLeave={() => setDrawerOpen(!open)}
												>
													{Icon ? (
														<Icon
															className={`w-4 h-4 ${
																isActive
																	? scheme.primaryForeground
																	: colors.textSecondary
															}`}
															
														/>
													) : null}{" "}
													{open ? item.label : null}
												</a>
												{!open && (
													<div
														className={`fixed left-14 mb-2 w-max ${scheme.primary} ${scheme.primaryForeground} text-xs rounded p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10`}
													>
														{item.label}
													</div>
												)}
											</div>
										);
									})}
								</div>
							</div>
						))}
					</div>
					{open && (
						<>
							<div className="px-3 mb-2 relative">
								<p className={`text-xs font-medium ${colors.mutedForeground} mb-2 tracking-wide`}>
									{t("Language")}
								</p>
								<div data-no-translate translate="no">
									<button
										type="button"
										onClick={() => setIsLanguageOpen((prev) => !prev)}
										className={`w-full flex items-center justify-between rounded-xl border ${colors.border} ${colors.hoverSecondary} px-2.5 py-2 text-xs ${colors.foreground} transition-colors`}
									>
										<span className="inline-flex min-w-0 items-center gap-2">
											<span aria-hidden>{selectedLanguage.flag}</span>
											<span className="truncate">{selectedLanguage.label}</span>
										</span>
										<lucideIcons.ChevronDown className={`w-3.5 h-3.5 shrink-0 ${colors.mutedForeground}`} />
									</button>
									<AnimatePresence>
										{isLanguageOpen && (
											<motion.div
												initial={{ opacity: 0, y: -6 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -6 }}
												transition={{ duration: 0.2 }}
												className={`absolute left-3 right-3 mt-1 rounded-xl border ${colors.border} ${colors.card} p-1 z-20`}
											>
												{languageOptions.map((lang) => (
													<button
														type="button"
														key={lang.code}
														onClick={() => {
															i18n.changeLanguage(lang.code);
															setIsLanguageOpen(false);
														}}
														className={`w-full text-left rounded-xl px-2 py-1.5 text-xs inline-flex items-center gap-2 transition-colors ${
															langPrefix === lang.code
																? `${scheme.primary} ${scheme.primaryForeground}`
																: `${colors.hoverSecondary} ${colors.foreground}`
														}`}
													>
														<span aria-hidden>{lang.flag}</span>
														<span>{lang.label}</span>
													</button>
												))}
											</motion.div>
										)}
									</AnimatePresence>
								</div>
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
