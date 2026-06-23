import React, { useState, useRef, useEffect } from "react";
import {
	Bell,
	Bot,
	Users2,
	LogOutIcon,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ open, setOpen, setDrawerOpen, aiChatOpen, onToggleAiChat }) => {
	const router = useRouter();
	const [searchModalOpen, setSearchModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
	const searchInputRef = useRef(null);
	const modalSearchInputRef = useRef(null);

	// Theme hook
	const { theme, colorScheme, setColorScheme, toggleTheme, colors } =
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
			id: 101,
			label: "Login",
			route: "/login",
			icon: "LogIn",
			section: "authentication",
		},
		{
			id: 102,
			label: "Sign up",
			route: "/signup",
			icon: "UserPlus",
			section: "authentication",
		},
		{
			id: 103,
			label: "Forgot password",
			route: "/forgot-password",
			icon: "KeyRound",
			section: "authentication",
		},
		{
			id: 104,
			label: "Change password",
			route: "/change-password",
			icon: "Lock",
			section: "authentication",
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
		{
			id: 22,
			label: "About",
			route: "/about",
			icon: "Info",
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
		{ key: "authentication", label: "Authentication" },
		{ key: "system", label: "System" },
	];
	const groupedFilteredNavItems = navSections.map((section) => ({
		...section,
		items: filteredNavItems.filter((item) => item.section === section.key),
	}))
		.filter((section) => section.items.length > 0);

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
					className={`flex ${colors.hoverSecondary} rounded-[10px] mx-2 items-center group border ${colors.border} h-7 cursor-pointer transition-colors`}
					onClick={handleSearchClick}
				>
					<Search className={`${colors.textMuted} mx-2`} size={16} />
					<Input
						ref={searchInputRef}
						type="text"
						placeholder="Search..."
						className="md:block hidden h-7 border-0 bg-transparent shadow-none focus-visible:ring-0 cursor-pointer"
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
								<Button
									key={schemeName}
									type="button"
									variant={colorScheme === schemeName ? "default" : "ghost"}
									size="icon"
									className="h-7 w-7"
									onClick={() => {
										setColorScheme(schemeName);
										setIsColorPickerOpen(false);
									}}
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
								</Button>
							))}
						</div>
					</div>
					{/* Theme Toggle */}
					<Button
						type="button"
						variant="secondary"
						size="icon"
						onClick={toggleTheme}
						className="h-9 w-9"
						aria-label="Toggle theme"
					>
						{theme === "light" ? (
							<Moon className="w-4 h-4" />
						) : (
							<Sun className="w-4 h-4" />
						)}
					</Button>

				<div
					className="relative"
					onClick={() => router.push("/notifications")}
				>
					<Bell
					size={18}
						className={`cursor-pointer ${colors.mutedForeground} transition-all duration-100 ease-in`}
					/>
					<Badge className="absolute -top-2 right-0 h-4 min-w-4 justify-center border-transparent bg-red-500 px-1 text-[8px] text-white hover:bg-red-500">
						3
					</Badge>
				</div>
				
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-8 w-8 rounded-full p-0"
							aria-label="User menu"
						>
							<Image
								src="/people/person-1.png"
								alt="User Avatar"
								width={32}
								height={32}
								className="rounded-full"
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-48">
						<div className="border-b border-zinc-200 dark:border-zinc-800">
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
						</div>
						<div className="px-1 py-1">
							<DropdownMenuItem onClick={() => router.push("/settings")}>
								<Users2 size={14} className="text-sm" />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => router.push("/settings")}>
								<SettingsIcon size={14} className="text-sm" />
								Settings
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<LogOutIcon size={14} className="text-sm" />
								Logout
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button
					type="button"
					variant={aiChatOpen ? "default" : "outline"}
					size="icon"
					onClick={onToggleAiChat}
					className="ml-1 h-7 w-7 shrink-0 rounded-[10px]"
					aria-label={aiChatOpen ? "Close AI assistant" : "Open AI assistant"}
					aria-pressed={aiChatOpen}
				>
					{aiChatOpen ? (
						<PanelRightClose className="h-3.5 w-3.5" />
					) : (
						<Bot className="h-3.5 w-3.5" />
					)}
				</Button>
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
								<Input
									ref={modalSearchInputRef}
									type="text"
									placeholder="Search pages..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
								/>
							</div>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={handleCloseModal}
								aria-label="Close search"
							>
								<X size={18} />
							</Button>
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
														<Button
															key={item.id}
															variant="ghost"
															className="w-full justify-between gap-3 px-2 py-1 text-left h-auto"
															onClick={() => handleNavigate(item.route)}
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
														</Button>
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
