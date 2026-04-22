import React from "react";
import * as lucideIcons from "lucide-react";
import { useRouter } from "next/router";
import { useTheme } from "../../utils/useTheme";

const Sidebar = ({ open, drawerOpen, setDrawerOpen }) => {
	const router = useRouter();
	const { colors, scheme } = useTheme();

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
					id: 16,
					label: "Analytics",
					route: "/analytics",
					icon: "BarChart3",
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
			} transition-all duration-500 ease-in`}
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
							onClick={() => setDrawerOpen(!drawerOpen)}
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
													className={`py-1 px-3 my-0.5 transition-all duration-100 ease-in rounded flex items-center gap-2 text-sm ${
														isActive
															? `${scheme.primary} ${scheme.primaryForeground}`
															: `${colors.hoverSecondary} ${colors.textSecondary}`
													}`}
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
														className={`absolute left-full ml-2 w-max ${scheme.primary} ${scheme.primaryForeground} text-xs rounded p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10`}
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
