import React, { useState, useRef, useEffect } from "react";
import {
	Bell,
	Users2,
	LogOutIcon,
	MessageSquare,
	PanelLeftClose,
	PanelRightClose,
	Search,
	SettingsIcon,
	X,
	Moon,
	Sun,
} from "lucide-react";
import Image from "next/image";
import * as lucideIcons from "lucide-react";
import { useRouter } from "next/router";
import { useTheme } from "../../utils/useTheme";
import { colorSchemes } from "../../utils/theme";

const Navbar = ({ open, setOpen, setDrawerOpen }) => {
	const router = useRouter();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [searchModalOpen, setSearchModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
	const searchInputRef = useRef(null);
	const modalSearchInputRef = useRef(null);

	// Theme hook
	const { theme, colorScheme, setColorScheme, toggleTheme, colors, scheme } =
		useTheme();

	const navItems = [
		{
			id: 1,
			label: "Dashboard",
			route: "/",
			icon: "Home",
			section: "main",
		},
		{
			id: 16,
			label: "Analytics",
			route: "/analytics",
			icon: "BarChart3",
			section: "main",
		},
		{
			id: 2,
			label: "Leads",
			route: "/leads",
			icon: "User",
			section: "sales",
		},
		{
			id: 3,
			label: "Sales",
			route: "/sales",
			icon: "DollarSign",
			section: "sales",
		},
		{
			id: 18,
			label: "Pipeline",
			route: "/pipelines",
			icon: "Layers",
			section: "sales",
		},
		{
			id: 21,
			label: "Deals",
			route: "/deals",
			icon: "CircleDollarSign",
			section: "sales",
		},
		{
			id: 4,
			label: "Contacts",
			route: "/contacts",
			icon: "Contact",
			section: "sales",
		},
		{
			id: 7,
			label: "Companies",
			route: "/companies",
			icon: "Users",
			section: "sales",
		},
		{
			id: 6,
			label: "Tasks",
			route: "/tasks",
			icon: "ListTodo",
			section: "operations",
		},
		{
			id: 15,
			label: "Calendar",
			route: "/calendar",
			icon: "Calendar",
			section: "operations",
		},
		{
			id: 19,
			label: "Email",
			route: "/email",
			icon: "Mail",
			section: "operations",
		},
		{
			id: 12,
			label: "Projects",
			route: "/projects",
			icon: "FolderClosed",
			section: "operations",
		},
		{
			id: 8,
			label: "Invoices",
			route: "/invoices",
			icon: "FileText",
			section: "finance",
		},
		{
			id: 11,
			label: "Payments",
			route: "/payments",
			icon: "CreditCard",
			section: "finance",
		},
		{
			id: 5,
			label: "Integrations",
			route: "/integrations",
			icon: "Cable",
			section: "developer",
		},
		{
			id: 9,
			label: "Webhooks",
			route: "/webhooks",
			icon: "Webhook",
			section: "developer",
		},
		{
			id: 10,
			label: "Api Keys",
			route: "/api-keys",
			icon: "Key",
			section: "developer",
		},
		{
			id: 13,
			label: "CMS",
			route: "/cms",
			icon: "LayoutTemplate",
			section: "developer",
		},
		{
			id: 17,
			label: "Teams",
			route: "/teams",
			icon: "UsersRound",
			section: "system",
		},
		{
			id: 20,
			label: "Notifications",
			route: "/notifications",
			icon: "Bell",
			section: "system",
		},
		{
			id: 14,
			label: "Settings",
			route: "/settings",
			icon: "Settings",
			section: "system",
		},
	];

	const handleKeyDown = (event) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "k") {
			event.preventDefault();
			setSearchModalOpen(true);
		}
		if (event.key === "Escape" && searchModalOpen) {
			setSearchModalOpen(false);
			setSearchTerm("");
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [searchModalOpen]);

	useEffect(() => {
		if (searchModalOpen && modalSearchInputRef.current) {
			modalSearchInputRef.current.focus();
		}
	}, [searchModalOpen]);

	// Close color picker on outside click
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				isColorPickerOpen &&
				!event.target.closest(".color-picker-dropdown")
			) {
				setIsColorPickerOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isColorPickerOpen]);

	const handleSearchClick = () => {
		setSearchModalOpen(true);
	};

	const handleCloseModal = () => {
		setSearchModalOpen(false);
		setSearchTerm("");
	};

	const handleNavigate = (route) => {
		router.push(route);
		handleCloseModal();
	};

	const q = searchTerm.trim().toLowerCase();
	const filteredNavItems = navItems.filter((item) => {
		if (!q) return true;
		return (
			item.label.toLowerCase().includes(q) ||
			item.route.toLowerCase().includes(q)
		);
	});
	const navSections = [
		{ key: "main", label: "Main" },
		{ key: "sales", label: "Sales & CRM" },
		{ key: "operations", label: "Operations" },
		{ key: "finance", label: "Finance" },
		{ key: "developer", label: "Developer" },
		{ key: "system", label: "System" },
	];
	const groupedFilteredNavItems = navSections.map((section) => ({
		...section,
		items: filteredNavItems.filter((item) => item.section === section.key),
	}))
		.filter((section) => section.items.length > 0);

	const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

	return (
		<div
			className={`flex justify-between md:overflow-hidden overflow-x-scroll hidescrollbar w-full border-b ${colors.border} px-2 py-1 ${colors.primaryBackground} transition-all duration-100 ease-in`}
		>
			<div className="relative flex justify-start items-center">
				{open ? (
					<PanelRightClose
						size={18}
						className={`mr-2 cursor-pointer ${colors.hoverSecondary} rounded ${colors.mutedForeground} transition-colors`}
						onClick={() => setOpen(false)}
					/>
				) : (
					<PanelLeftClose
						className={`mr-2 cursor-pointer ${colors.hoverSecondary} rounded ${colors.mutedForeground} transition-colors`}
						size={18}
						onClick={() => {
							setOpen(true);
							setDrawerOpen(true);
						}}
					/>
				)}
				<div
					className={`flex ${colors.hoverSecondary} rounded-xl mx-2 items-center group border ${colors.border} h-8 cursor-pointer transition-colors`}
					onClick={handleSearchClick}
				>
					<Search className={`${colors.textMuted} mx-2`} size={16} />
					<input
						ref={searchInputRef}
						type="text"
						placeholder="Search..."
						className={`outline-none md:block hidden text-sm bg-transparent focus:outline-none ${colors.hoverSecondary} cursor-pointer ${colors.foreground}`}
						readOnly
					/>
					<span className={`text-[10px] hidden md:block ${colors.textMuted} italic mr-2`}>
						CMD + K
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between gap-2">
				<div className={`p-1 md:flex hidden flex p-1 border ${colors.border} gap-1 rounded-xl`}>
					<a
						href="https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX"
						target="_blank"
						rel="noopener noreferrer"
						className={`w-fit rounded bg-orange-100 text-zinc-600 dark:text-zinc-800 hover:bg-orange-200 dark:hover:bg-orange-900 p-1 text-center text-xs font-semibold text-white transition-all duration-100 ease-in`}
					>
						🇮🇳 
						INR
					</a>
					<div>
						<a href="https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template" target="_blank" rel="noopener noreferrer" 
						className={`w-fit rounded text-zinc-600 dark:text-zinc-200 ${colors.hoverSecondary} px-1 py-1.5 text-center text-xs font-semibold text-white transition-all duration-100 ease-in`}>
						🇺🇸
							USD
						</a>
					</div>
				</div>
					{/* Color Scheme Picker */}
					<div className="relative color-picker-dropdown md:block hidden">
						<div
							className={`flex w-20 md:w-fit overflow-scroll hidescrollbar gap-1 p-1 rounded-xl border transition-all ${colors.border} ${colors.secondary} ${colors.secondaryForeground} border-current`}
						>
							{Object.keys(colorSchemes).map((schemeName) => (
								<button
									key={schemeName}
									onClick={() => {
										setColorScheme(schemeName);
										setIsColorPickerOpen(false);
									}}
									className={`p-1 rounded transition-all ${
										colorScheme === schemeName &&
										`${scheme.primary} ${scheme.primaryForeground}`
									}`}
								>
									<div className="flex flex-col items-center gap-2">
										<div
											className={`w-4 h-4 rounded-full ${
												schemeName === "blue"
													? "bg-blue-800"
													: schemeName === "green"
													? "bg-green-800"
													: schemeName === "purple"
													? "bg-purple-800"
													: schemeName === "orange"
													? "bg-orange-800"
													: schemeName === "red"
													? "bg-red-800"
													: schemeName === "pink"
													? "bg-pink-800"
													: schemeName === "indigo"
													? "bg-indigo-800"
													: "bg-zinc-800"
											}`}
										/>
									</div>
								</button>
							))}
						</div>
					</div>
					{/* Theme Toggle */}
					<button
						onClick={toggleTheme}
						className={`p-2 rounded-xl ${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary} transition-all duration-100 ease-in`}
						aria-label="Toggle theme"
					>
						{theme === "light" ? (
							<Moon className="w-4 h-4" />
						) : (
							<Sun className="w-4 h-4" />
						)}
					</button>
					<MessageSquare
						className={`cursor-pointer ${colors.mutedForeground} transition-all duration-100 ease-in`}
						onClick={() => router.push("/email")}
						size={18}
					/>
				<div
					className="relative"
					onClick={() => router.push("/notifications")}
				>
					<Bell
					size={18}
						className={`cursor-pointer ${colors.mutedForeground} transition-all duration-100 ease-in`}
					/>
					<span className="absolute -top-2 right-0 bg-red-500 text-white text-[8px] rounded-full px-1">
						3
					</span>
				</div>
				<div
					className="relative inline-block"
					onMouseEnter={handleDropdownToggle}
					onMouseLeave={handleDropdownToggle}
				>
					<Image
						src="/people/person-1.png"
						alt="User Avatar"
						width={32}
						height={32}
						className="rounded-full cursor-pointer"
					/>
					{dropdownOpen && (
						<div
							className={`absolute right-0 w-48 py-2 ${colors.card} border ${colors.border} rounded-xl ${colors.shadow}`}
							style={{ zIndex: 1000 }}
						>
							<div className="p-2 flex justify-start">
								<Image
									src="/people/person-1.png"
									alt="User Avatar"
									width={40}
									height={40}
									className="rounded-full mr-2"
								/>
							</div>
							<div className={`text-left mb-2 px-2 ${colors.foreground}`}>
								<p className="font-bold">John Doe</p>
								<p className={`text-sm ${colors.mutedForeground}`}>
									john@doe.com
								</p>
							</div>
							<div className={`px-2`}>
								<button
									className={`flex items-center p-2 w-full text-sm ${colors.hoverSecondary} rounded-xl ${colors.foreground} transition-colors`}
								>
									<Users2 size={18} className="mr-2" /> Profile
								</button>
								<button
									className={`flex items-center p-2 w-full text-sm ${colors.hoverSecondary} rounded-xl ${colors.foreground} transition-colors`}
								>
									<SettingsIcon size={18} className="mr-2" /> Settings
								</button>
								<button
									className={`flex items-center p-2 w-full text-sm ${colors.hoverSecondary} rounded-xl ${colors.foreground} transition-colors`}
								>
									<LogOutIcon size={18} className="mr-2" /> Logout
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			{/* Search Modal */}
			{searchModalOpen && (
				<div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 pt-20">
					<div
						className={`${colors.card} border-2 ${colors.border} rounded-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-auto`}
					>
						<div
							className={`flex items-center justify-between p-2 border-b-2 ${colors.border}`}
						>
							<div className="flex items-center gap-2 flex-1">
								<Search className={colors.mutedForeground} size={18} />
								<input
									ref={modalSearchInputRef}
									type="text"
									placeholder="Search pages..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className={`outline-none flex-1 bg-transparent ${colors.foreground} placeholder:${colors.textTertiary}`}
								/>
							</div>
							<button
								onClick={handleCloseModal}
								className={`${colors.mutedForeground} ${colors.hoverSecondary} p-1 rounded-xl transition-colors`}
							>
								<X size={18} />
							</button>
						</div>
						<div className="p-2 overflow-y-auto max-h-[60vh]">
							<div className="space-y-2">
								{groupedFilteredNavItems.length > 0 ? (
									groupedFilteredNavItems.map((section) => (
										<div key={section.key} className="space-y-1">
											<div
												className={`px-2 text-xs font-semibold tracking-wide  ${colors.textMuted}`}
											>
												{section.label}
											</div>
											<div className={`p-1`}>
												{section.items.map((item) => {
													const Icon = lucideIcons[item.icon];
													return (
														<button
															key={item.id}
															onClick={() => handleNavigate(item.route)}
															className={`w-full flex items-center justify-between gap-3 px-2 py-1 ${colors.hoverSecondary} rounded-xl transition-all duration-100 ease-in text-left`}
														>
															<div className="flex items-center gap-3 min-w-0">
																{Icon && (
																	<Icon
																		size={16}
																		className={colors.textSecondary}
																	/>
																)}
																<span
																	className={`${colors.textSecondary} text-sm truncate`}
																>
																	{item.label}
																</span>
															</div>
															<span
																className={`text-xs px-2 py-0.5 rounded-md border ${colors.border} ${colors.textMuted}`}
															>
																{item.route}
															</span>
														</button>
													);
												})}
											</div>
										</div>
									))
								) : (
									<div className={`text-center py-8 ${colors.mutedForeground}`}>
										<p>No results found</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default Navbar;
