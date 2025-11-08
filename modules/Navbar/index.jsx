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
} from "lucide-react";
import Image from "next/image";
import { FiMessageSquare, FiSettings, FiUser } from "react-icons/fi";
import * as lucideIcons from "lucide-react";
import { useRouter } from "next/router";

const Navbar = ({ open, setOpen, setDrawerOpen }) => {
	const router = useRouter();
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [bellDropdownOpen, setBellDropdownOpen] = useState(false);
	const [searchModalOpen, setSearchModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const searchInputRef = useRef(null);
	const modalSearchInputRef = useRef(null);

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
		<div className="flex justify-between w-full mb-4 border-b border-zinc-100 py-1 md:px-10">
			<div className="relative flex justify-start items-center">
				{open ? (
					<PanelRightClose
						size={24}
						className="mr-2 cursor-pointer hover:bg-zinc-50 rounded text-zinc-500"
						onClick={() => setOpen(false)}
					/>
				) : (
					<PanelLeftClose
						className="mr-2 cursor-pointer hover:bg-zinc-50 rounded text-zinc-500"
						size={24}
						onClick={() => {
							setOpen(true);
							setDrawerOpen(true);
						}}
					/>
				)}
				<div
					className="flex hover:bg-zinc-50 rounded-xl mx-2 items-center group border border-zinc-100 h-8 cursor-pointer"
					onClick={handleSearchClick}
				>
					<Search className="text-zinc-800 mx-2" size={16} />
					<input
						ref={searchInputRef}
						type="text"
						placeholder="Search..."
						className="outline-none focus:outline-none group-hover:bg-zinc-50 cursor-pointer"
						readOnly
					/>
					<span className="text-xs text-zinc-400 italic mr-2">CMD + K</span>
				</div>
			</div>
			<div className="flex items-center justify-between gap-2">
				<MessageSquare className="mr-4 cursor-pointer" />
				<div
					className="relative"
					onMouseEnter={handleBellDropdownToggle}
					onMouseLeave={handleBellDropdownToggle}
				>
					<Bell className="mr-4 cursor-pointer" />
					<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
						3
					</span>
					{bellDropdownOpen && (
						<div className="absolute right-0 w-60 py-2 bg-white border rounded-xl shadow-lg z-10">
							<div className="p-2">
								<p className="font-bold">Notifications</p>
								<div className="space-y-2 my-2 px-2">
									<div className="flex items-start">
										<FiMessageSquare size={18} className="mr-2" />
										<p className="text-sm">New message from Alice</p>
										<span className="text-zinc-500 text-xs ml-auto">
											2 mins ago
										</span>
									</div>
									<div className="flex items-start">
										<FiUser size={18} className="mr-2" />
										<p className="text-sm">John Doe followed you</p>
										<span className="text-zinc-500 text-xs ml-auto">
											5 mins ago
										</span>
									</div>
									<div className="flex items-start">
										<FiSettings size={18} className="mr-2" />
										<p className="text-sm">Your settings have been updated</p>
										<span className="text-zinc-500 text-xs ml-auto">
											10 mins ago
										</span>
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
						width={40}
						height={40}
						className="rounded-full cursor-pointer"
					/>
					{dropdownOpen && (
						<div className="absolute right-0 w-48 py-2 bg-white border rounded-xl shadow-lg z-10">
							<div className="p-2 flex justify-center">
								<Image
									src="/people/person-1.png"
									alt="User Avatar"
									width={40}
									height={40}
									className="rounded-full mr-2"
								/>
							</div>
							<div className="text-center mb-2">
								<p className="font-bold">John Doe</p>
								<p className="text-sm">john@doe.com</p>
							</div>
							<div className="border-t px-2 space-y-1 py-4">
								<button className="flex items-center p-2 w-full text-sm hover:bg-zinc-50 rounded-xl">
									<BsPerson size={18} className="mr-2" /> Profile
								</button>
								<button className="flex items-center p-2 w-full text-sm hover:bg-zinc-50 rounded-xl">
									<SettingsIcon size={18} className="mr-2" /> Settings
								</button>
								<button className="flex items-center p-2 w-full text-sm hover:bg-zinc-50 rounded-xl">
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
					<div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
						<div className="flex items-center justify-between p-4 border-b border-zinc-100">
							<div className="flex items-center gap-2 flex-1">
								<Search className="text-zinc-500" size={20} />
								<input
									ref={modalSearchInputRef}
									type="text"
									placeholder="Search pages..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="outline-none flex-1 text-lg"
								/>
							</div>
							<button
								onClick={handleCloseModal}
								className="text-zinc-500 hover:text-zinc-700 p-1 rounded-xl hover:bg-zinc-100"
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
												className="w-full flex items-center gap-3 p-3 hover:bg-zinc-50 rounded-xl transition-all duration-100 ease-in text-left"
											>
												{Icon && <Icon size={20} className="text-zinc-600" />}
												<span className="text-zinc-800 font-medium">
													{item.label}
												</span>
											</button>
										);
									})
								) : (
									<div className="text-center py-8 text-zinc-500">
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
