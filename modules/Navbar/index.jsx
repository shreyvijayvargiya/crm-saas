import React, { useState, useRef, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import {
	Bell,
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
import { FiMessageSquare, FiSettings, FiUser } from "react-icons/fi";
import * as lucideIcons from "lucide-react";
import { useRouter } from "next/router";
import { useTheme } from "../../utils/useTheme";
import { colorSchemes } from "../../utils/theme";

const Navbar = ({ open, setOpen, setDrawerOpen }) => {
	const router = useRouter();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [bellDropdownOpen, setBellDropdownOpen] = useState(false);
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
			label: "Settings",
			route: "/settings",
			icon: "Settings",
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

	const filteredNavItems = navItems.filter((item) =>
		item.label.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
	const handleBellDropdownToggle = () => setBellDropdownOpen(!bellDropdownOpen);

	return (
		<div
			className={`flex justify-between w-full border-b ${colors.border} py-2 md:px-10 ${colors.background} transition-colors`}
		>
			<div className="relative flex justify-start items-center">
				{open ? (
					<PanelRightClose
						size={18}
						className={`mr-2 cursor-pointer ${colors.hoverSecondary} rounded ${colors.foreground} transition-colors`}
						onClick={() => setOpen(false)}
					/>
				) : (
					<PanelLeftClose
						className={`mr-2 cursor-pointer ${colors.hoverSecondary} rounded ${colors.foreground} transition-colors`}
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
						className={`outline-none text-sm bg-transparent focus:outline-none ${colors.hoverSecondary} cursor-pointer ${colors.foreground}`}
						readOnly
					/>
					<span className={`text-xs ${colors.textMuted} italic mr-2`}>
						CMD + K
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-2 mr-2">
					{/* Color Scheme Picker */}
					<div className="relative color-picker-dropdown">
						<div
							className={`flex flex-wrap gap-1 p-1 rounded-xl border transition-all ${colors.border} ${colors.secondary} ${colors.secondaryForeground} border-current`}
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
						className={`p-2 rounded-xl ${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary} transition-colors`}
						aria-label="Toggle theme"
					>
						{theme === "light" ? (
							<Moon className="w-4 h-4" />
						) : (
							<Sun className="w-4 h-4" />
						)}
					</button>
				</div>
				{/* Theme and Color Controls */}

				<MessageSquare
					className={`cursor-pointer ${colors.mutedForeground} transition-colors`}
				/>
				<div
					className="relative"
					onMouseEnter={handleBellDropdownToggle}
					onMouseLeave={handleBellDropdownToggle}
				>
					<Bell
						className={`mr-2 cursor-pointer ${colors.mutedForeground} transition-colors`}
					/>
					<span className="absolute -top-2 right-0 bg-red-500 text-white text-xs rounded-full px-1">
						3
					</span>
					{bellDropdownOpen && (
						<div
							className={`absolute right-0 w-60 py-2 ${colors.card} border ${colors.border} rounded-xl ${colors.shadow} z-10`}
						>
							<div className="p-2">
								<p
									className={`text-sm p-1.5 font-semibold ${colors.mutedForeground}`}
								>
									Notifications
								</p>
								<div className="space-y-2 my-2 px-2">
									<div
										className={`flex items-start ${colors.hoverSecondary} p-1.5 rounded-xl`}
									>
										<FiMessageSquare
											size={20}
											className={`mr-2 mt-1 ${colors.foreground}`}
										/>
										<p className={`text-sm ${colors.foreground}`}>
											New message from Alice
											<span
												className={`${colors.mutedForeground} ml-2 text-xs`}
											>
												2 mins ago
											</span>
										</p>
									</div>
									<div
										className={`flex items-start ${colors.hoverSecondary} p-1.5 rounded-xl`}
									>
										<FiUser
											size={20}
											className={`mr-2 mt-1 ${colors.foreground}`}
										/>
										<p className={`text-sm ${colors.foreground}`}>
											John Doe followed you
											<span
												className={`${colors.mutedForeground} ml-2 text-xs`}
											>
												5 mins ago
											</span>
										</p>
									</div>
									<div
										className={`flex items-start ${colors.hoverSecondary} p-1.5 rounded-xl`}
									>
										<FiSettings
											size={20}
											className={`mr-2 mt-1 ${colors.foreground}`}
										/>
										<p className={`text-sm ${colors.foreground}`}>
											Your settings have been updated
											<span
												className={`${colors.mutedForeground} ml-2 text-xs`}
											>
												10 mins ago
											</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					)}
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
							className={`absolute right-0 w-48 py-2 ${colors.card} border ${colors.border} rounded-xl ${colors.shadow} z-10`}
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
									<BsPerson size={18} className="mr-2" /> Profile
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
						className={`${colors.card} rounded-xl ${colors.shadow} w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden`}
					>
						<div
							className={`flex items-center justify-between p-4 border-b ${colors.border}`}
						>
							<div className="flex items-center gap-2 flex-1">
								<Search className={colors.mutedForeground} size={20} />
								<input
									ref={modalSearchInputRef}
									type="text"
									placeholder="Search pages..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className={`outline-none flex-1 text-lg ${colors.foreground} ${colors.background} placeholder:${colors.textTertiary}`}
								/>
							</div>
							<button
								onClick={handleCloseModal}
								className={`${colors.mutedForeground} ${colors.hoverSecondary} p-1 rounded-xl transition-colors`}
							>
								<X size={24} />
							</button>
						</div>
						<div className="p-4 overflow-y-auto max-h-[60vh]">
							<div className="space-y-1">
								{filteredNavItems.length > 0 ? (
									filteredNavItems.map((item) => {
										const Icon = lucideIcons[item.icon];
										return (
											<button
												key={item.id}
												onClick={() => handleNavigate(item.route)}
												className={`w-full flex items-center gap-3 p-3 ${colors.hoverSecondary} rounded-xl transition-all duration-100 ease-in text-left`}
											>
												{Icon && (
													<Icon size={20} className={colors.textSecondary} />
												)}
												<span className={`${colors.foreground} font-medium`}>
													{item.label}
												</span>
											</button>
										);
									})
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
