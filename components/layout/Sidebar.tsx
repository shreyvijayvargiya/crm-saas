"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import * as lucideIcons from "lucide-react";

interface SidebarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	drawerOpen?: boolean;
	setDrawerOpen?: (open: boolean) => void;
}

export const Sidebar = ({
	open,
	setOpen,
	drawerOpen = false,
	setDrawerOpen,
}: SidebarProps) => {
	const pathname = usePathname();
	const router = useRouter();

	const navItems = [
		{
			id: 1,
			label: "Dashboard",
			route: "/dashboard",
			icon: "Home",
		},
		{
			id: 2,
			label: "Companies",
			route: "/companies",
			icon: "Building2",
		},
		{
			id: 3,
			label: "Products",
			route: "/products",
			icon: "Package",
		},
		{
			id: 4,
			label: "Account",
			route: "/account",
			icon: "UserCircle",
		},
		{
			id: 6,
			label: "Contacts",
			route: "/contacts",
			icon: "Contact",
		},
		{
			id: 9,
			label: "Invoices",
			route: "/invoices",
			icon: "FileText",
		},
		{
			id: 11,
			label: "Settings",
			route: "/settings",
			icon: "Settings",
		},
	];

	const handleLogout = () => {
		localStorage.removeItem("user");
		router.push("/login");
	};

	const isActive = (route: string) => {
		if (route === "/dashboard") {
			return pathname === "/dashboard";
		}
		return pathname?.startsWith(route);
	};

	return (
		<div
			className={`max-h-screen min-h-screen ${
				open ? "w-60 md:w-60" : "w-16"
			} transition-all duration-300 ease-in bg-white border-r`}
		>
			<div className="flex flex-col h-full justify-between pb-5">
				<div className="flex flex-col gap-1">
					<div className="flex items-center justify-between py-4 px-2 border-b">
						{open ? (
							<div className="flex items-center gap-2">
								<lucideIcons.Package className="w-6 h-6 text-primary" />
								<p className="text-lg font-bold text-primary">TUFF+ ERP</p>
							</div>
						) : (
							<lucideIcons.Package className="w-6 h-6 mx-auto text-primary" />
						)}
						{setDrawerOpen && (
							<button
								onClick={() => setDrawerOpen(!drawerOpen)}
								className="md:hidden text-gray-600"
							>
								<lucideIcons.X size={24} />
							</button>
						)}
					</div>

					<div className="flex flex-col px-2 pt-4 gap-1">
						{navItems?.map((item) => {
							const Icon = lucideIcons[item?.icon as keyof typeof lucideIcons];
							const active = isActive(item.route);
							return (
								<div key={item.id} className="relative group">
									<button
										onClick={() => router.push(item.route)}
										className={`w-full py-2 px-3 my-0.5 transition-all duration-100 ease-in rounded flex items-center gap-3 text-sm ${
											active
												? "bg-primary text-primary-foreground"
												: "hover:bg-gray-100 text-gray-700"
										}`}
									>
										{Icon ? (
											<Icon
												className={`w-5 h-5 ${
													active ? "text-primary-foreground" : "text-gray-600"
												}`}
											/>
										) : null}
										{open ? <span>{item.label}</span> : null}
									</button>
									{!open && (
										<div className="absolute left-full ml-2 w-max bg-primary text-primary-foreground text-xs rounded p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10 pointer-events-none">
											{item.label}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
				<div className="p-2 space-y-2 border-t">
					<button
						onClick={handleLogout}
						className="flex gap-2 items-center bg-red-600 text-sm text-white hover:bg-red-500 cursor-pointer p-2 rounded-xl transition-colors w-full"
					>
						<lucideIcons.LogOut size={16} />
						{open ? "Logout" : null}
					</button>
				</div>
			</div>
		</div>
	);
};
