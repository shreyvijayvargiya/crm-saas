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
} from "lucide-react";
import Image from "next/image";
import { FiMessageSquare, FiSettings, FiUser } from "react-icons/fi";

const Navbar = ({ open, setOpen, setDrawerOpen }) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [bellDropdownOpen, setBellDropdownOpen] = useState(false);
	const searchInputRef = useRef(null);

	const handleKeyDown = (event) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "k") {
			event.preventDefault();
			searchInputRef.current?.focus();
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);
	const handleBellDropdownToggle = () => setBellDropdownOpen(!bellDropdownOpen);

	return (
		<div className="flex justify-between w-full mb-4 border-b border-gray-100 py-1 md:px-10">
			<div className="relative flex justify-start items-center">
				{open ? (
					<PanelRightClose
						size={24}
						className="mr-2 cursor-pointer hover:bg-gray-50 rounded text-gray-500"
						onClick={() => setOpen(false)}
					/>
				) : (
					<PanelLeftClose
						className="mr-2 cursor-pointer hover:bg-gray-50 rounded text-gray-500"
						size={24}
						onClick={() => {
							setOpen(true);
							setDrawerOpen(true);
						}}
					/>
				)}
				<div className="flex hover:bg-gray-50 rounded-xl p-2 mx-2 items-center group border border-gray-100 h-10">
					<Search className="text-gray-800 mx-2" size={16} />
					<input
						ref={searchInputRef}
						type="text"
						placeholder="Search..."
						className="outline-none focus:outline-none group-hover:bg-gray-50"
					/>
					<span className="text-xs text-gray-400 italic mr-2">CMD + K</span>
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
										<span className="text-gray-500 text-xs ml-auto">
											2 mins ago
										</span>
									</div>
									<div className="flex items-start">
										<FiUser size={18} className="mr-2" />
										<p className="text-sm">John Doe followed you</p>
										<span className="text-gray-500 text-xs ml-auto">
											5 mins ago
										</span>
									</div>
									<div className="flex items-start">
										<FiSettings size={18} className="mr-2" />
										<p className="text-sm">Your settings have been updated</p>
										<span className="text-gray-500 text-xs ml-auto">
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
								<button className="flex items-center p-2 w-full text-sm hover:bg-gray-50 rounded-xl">
									<BsPerson size={18} className="mr-2" /> Profile
								</button>
								<button className="flex items-center p-2 w-full text-sm hover:bg-gray-50 rounded-xl">
									<SettingsIcon size={18} className="mr-2" /> Settings
								</button>
								<button className="flex items-center p-2 w-full text-sm hover:bg-gray-50 rounded-xl">
									<LogOutIcon size={18} className="mr-2" /> Logout
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default Navbar;
