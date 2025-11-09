import React from "react";
import * as lucideIcons from "lucide-react";
import { useRouter } from "next/router";
import { useTheme } from "../../utils/useTheme";

const Sidebar = ({ open, drawerOpen, setDrawerOpen }) => {
	const router = useRouter();
	const { colors, scheme } = useTheme();

	const navItems = [
		{
			id: 1,
			label: "Dashboard",
			route: "/",
			icon: "Home",
		},
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
			id: 4,
			label: "Contacts",
			route: "/contacts",
			icon: "Contact",
		},
		{
			id: 5,
			label: "Integrations",
			route: "/integrations",
			icon: "Cable",
		},
		{
			id: 6,
			label: "Tasks",
			route: "/tasks",
			icon: "ListTodo",
		},
		{
			id: 7,
			label: "Companies",
			route: "/companies",
			icon: "Users",
		},
		{
			id: 8,
			label: "Invoices",
			route: "/invoices",
			icon: "FileText",
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
			id: 11,
			label: "Payments",
			route: "/payments",
			icon: "CreditCard",
		},
		{
			id: 12,
			label: "Projects",
			route: "/projects",
			icon: "FolderClosed",
		},
		{
			id: 13,
			label: "CMS",
			route: "/cms",
			icon: "FileText",
		},
		{
			id: 14,
			label: "Settings",
			route: "/settings",
			icon: "Settings",
		},
	];

	return (
		<div
			className={`h-screen ${
				open ? "w-60 md:w-60" : "w-full"
			} transition-all duration-300 ease-in`}
		>
			<div
				className={`flex flex-col h-full justify-between pb-5 transition-colors`}
			>
				<div className="flex flex-col gap-1">
					<div className={`flex items-center justify-between py-1`}>
						{open ? (
							<div
								className={`relative group flex items-center p-2 justify-between border ${colors.border} ${colors.hoverSecondary} rounded-xl cursor-pointer w-full transition-colors`}
							>
								<div className="flex items-center gap-2">
									<lucideIcons.Rocket
										className={`w-4 h-4 ${colors.foreground}`}
									/>
									<p className={`text-sm ${colors.foreground}`}>CRM pages</p>
								</div>
								<div className="flex flex-col items-center justify-center">
									<lucideIcons.ChevronUp
										className={`${colors.mutedForeground} group-hover:rotate-180 transition-all duration-200 ease-in w-3 h-3`}
									/>
									<lucideIcons.ChevronDown
										className={`${colors.mutedForeground} group-hover:rotate-180 transition-all duration-200 ease-in w-3 h-3`}
									/>
								</div>
								<div
									className={`absolute top-10 left-0 right-0 w-60 h-fit ${colors.card} text-xs rounded-xl border ${colors.border} px-1 py-2 opacity-0 transition-opacity duration-200 invisible group-hover:visible group-hover:opacity-100 z-20`}
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
											className={`${scheme.primary} ${scheme.primaryForeground} cursor-pointer hover:shadow-xl transition-all duration-100 ease-in ${scheme.primaryHover} text-xs rounded w-full p-1`}
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
							<lucideIcons.X size={24} />
						</button>
					</div>

					<div className="flex flex-col px-2">
						{navItems?.map((item) => {
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
				<div className="p-2 space-y-2">
					{open && (
						<div
							className={`w-full h-fit ${colors.card} rounded-xl ${colors.shadow} p-4 border ${colors.border} transition-colors`}
						>
							<p className={`${colors.textSecondary} mb-2 text-sm`}>
								Download Unlock lifetime access to entire React CRM template
							</p>
							<a
								href="https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template?layout=profile"
								target="_blank"
								rel="noopener noreferrer"
								className={`p-2 text-sm rounded-xl ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover} cursor-pointer transition-colors`}
							>
								Download Template
							</a>
						</div>
					)}
					<div className="flex gap-2 items-center bg-red-600 text-sm text-white hover:bg-red-500 cursor-pointer p-2 rounded-xl transition-colors">
						<lucideIcons.LogOut size={16} />
						{open ? "logout" : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
