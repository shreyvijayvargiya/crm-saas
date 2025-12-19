"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
	LayoutDashboard,
	Users,
	UserPlus,
	TrendingUp,
	FileCheck,
	ShoppingCart,
	Package,
	Box,
	Layers,
	Warehouse,
	Cog,
	FolderKanban,
	Briefcase,
	CheckCircle2,
	Truck,
	DollarSign,
	Receipt,
	CreditCard,
	BarChart3,
	Boxes,
	Activity,
	PieChart,
	Shield,
	Handshake,
	Building2,
	Database,
	Globe,
	Coins,
	Ruler,
	Tags,
	Settings,
	UserCircle,
	Sliders,
	Key,
	ChevronRight,
	X,
	LogOut,
	Circle,
} from "lucide-react";

interface SidebarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	drawerOpen?: boolean;
	setDrawerOpen?: (open: boolean) => void;
}

interface NavItem {
	id: number;
	label: string;
	route?: string;
	icon: string;
	children?: NavItem[];
}

export const Sidebar = ({
	open,
	setOpen,
	drawerOpen = false,
	setDrawerOpen,
}: SidebarProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	const navItems: NavItem[] = [
		{
			id: 1,
			label: "Dashboard",
			route: "/dashboard",
			icon: "LayoutDashboard",
		},
		{
			id: 2,
			label: "CRM",
			icon: "Users",
			children: [
				{
					id: 21,
					label: "Leads",
					route: "/crm/leads",
					icon: "UserPlus",
				},
				{
					id: 22,
					label: "Opportunities",
					route: "/crm/opportunities",
					icon: "TrendingUp",
				},
				{
					id: 23,
					label: "Quotations",
					route: "/crm/quotations",
					icon: "FileCheck",
				},
				{
					id: 24,
					label: "Sales Orders",
					route: "/crm/sales-orders",
					icon: "ShoppingCart",
				},
			],
		},
		{
			id: 3,
			label: "Products & Manufacturing",
			icon: "Package",
			children: [
				{
					id: 31,
					label: "Items",
					route: "/products/items",
					icon: "Box",
				},
				{
					id: 32,
					label: "BOM",
					route: "/products/bom",
					icon: "Layers",
				},
				{
					id: 33,
					label: "Inventory",
					route: "/products/inventory",
					icon: "Warehouse",
				},
				{
					id: 34,
					label: "Work Orders",
					route: "/products/work-orders",
					icon: "Cog",
				},
			],
		},
		{
			id: 4,
			label: "Projects",
			icon: "FolderKanban",
			children: [
				{
					id: 41,
					label: "Projects",
					route: "/projects",
					icon: "Briefcase",
				},
				{
					id: 42,
					label: "QA Inspections",
					route: "/projects/qa-inspections",
					icon: "CheckCircle2",
				},
				{
					id: 43,
					label: "Shipments",
					route: "/projects/shipments",
					icon: "Truck",
				},
			],
		},
		{
			id: 5,
			label: "Finance",
			icon: "DollarSign",
			children: [
				{
					id: 51,
					label: "Invoices",
					route: "/finance/invoices",
					icon: "Receipt",
				},
				{
					id: 52,
					label: "Payments",
					route: "/finance/payments",
					icon: "CreditCard",
				},
			],
		},
		{
			id: 6,
			label: "Reports",
			icon: "BarChart3",
			children: [
				{
					id: 61,
					label: "Sales Pipeline",
					route: "/reports/sales-pipeline",
					icon: "TrendingUp",
				},
				{
					id: 62,
					label: "Stock Balance",
					route: "/reports/stock-balance",
					icon: "Boxes",
				},
				{
					id: 63,
					label: "Project Progress",
					route: "/reports/project-progress",
					icon: "Activity",
				},
				{
					id: 64,
					label: "Finance Summary",
					route: "/reports/finance-summary",
					icon: "PieChart",
				},
			],
		},
		{
			id: 7,
			label: "Admin",
			icon: "Shield",
			children: [
				{
					id: 71,
					label: "Partners",
					route: "/admin/partners",
					icon: "Handshake",
				},
				{
					id: 72,
					label: "Entities",
					route: "/admin/entities",
					icon: "Building2",
				},
				{
					id: 73,
					label: "Users",
					route: "/admin/users",
					icon: "Users",
				},
				{
					id: 74,
					label: "Warehouses",
					route: "/admin/warehouses",
					icon: "Warehouse",
				},
				{
					id: 75,
					label: "Masters",
					icon: "Database",
					children: [
						{
							id: 751,
							label: "Countries",
							route: "/admin/masters/countries",
							icon: "Globe",
						},
						{
							id: 752,
							label: "Currencies",
							route: "/admin/masters/currencies",
							icon: "Coins",
						},
						{
							id: 753,
							label: "UOM",
							route: "/admin/masters/uom",
							icon: "Ruler",
						},
						{
							id: 754,
							label: "Categories",
							route: "/admin/masters/categories",
							icon: "Tags",
						},
					],
				},
			],
		},
		{
			id: 8,
			label: "Settings",
			icon: "Settings",
			children: [
				{
					id: 81,
					label: "Profile",
					route: "/settings/profile",
					icon: "UserCircle",
				},
				{
					id: 82,
					label: "Preferences",
					route: "/settings/preferences",
					icon: "Sliders",
				},
				{
					id: 83,
					label: "Access Roles",
					route: "/settings/access-roles",
					icon: "Key",
				},
			],
		},
	];

	const handleLogout = () => {
		localStorage.removeItem("user");
		router.push("/login");
	};

	const isActive = (route?: string) => {
		if (!route || !mounted || !pathname) return false;
		if (route === "/dashboard") {
			return pathname === "/dashboard";
		}
		return pathname.startsWith(route);
	};

	const hasActiveChild = (item: NavItem): boolean => {
		if (!mounted) return false;
		if (item.route && isActive(item.route)) return true;
		if (item.children) {
			return item.children.some((child) => hasActiveChild(child));
		}
		return false;
	};

	// Icon map for easy lookup
	const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
		LayoutDashboard,
		Users,
		UserPlus,
		TrendingUp,
		FileCheck,
		ShoppingCart,
		Package,
		Box,
		Layers,
		Warehouse,
		Cog,
		FolderKanban,
		Briefcase,
		CheckCircle2,
		Truck,
		DollarSign,
		Receipt,
		CreditCard,
		BarChart3,
		Boxes,
		Activity,
		PieChart,
		Shield,
		Handshake,
		Building2,
		Database,
		Globe,
		Coins,
		Ruler,
		Tags,
		Settings,
		UserCircle,
		Sliders,
		Key,
		Circle,
	};

	// Helper function to get icon component safely
	const getIcon = (
		iconName: string
	): React.ComponentType<{ className?: string }> => {
		return iconMap[iconName] || Circle;
	};

	return (
		<div
			className={`h-screen ${
				open ? "w-60 md:w-60" : "w-16"
			} transition-all duration-300 ease-in bg-transparent border-r flex flex-col`}
		>
			<div className="flex flex-col h-full justify-between pb-5 overflow-hidden">
				<div className="flex flex-col gap-1 flex-1 overflow-hidden">
					<div className="flex items-center justify-between py-3 px-2 border-b flex-shrink-0">
						{open ? (
							<div className="flex items-center gap-2">
								<Package className="w-5 h-5 text-primary" />
								<p className="text-sm font-bold text-primary">TUFF+ ERP</p>
							</div>
						) : (
							<Package className="w-5 h-5 mx-auto text-primary" />
						)}
						{setDrawerOpen && (
							<button
								onClick={() => setDrawerOpen(!drawerOpen)}
								className="md:hidden text-gray-600 hover:bg-gray-100 p-1 rounded"
							>
								<X className="w-5 h-5" />
							</button>
						)}
					</div>

					<div className="flex flex-col px-1.5 pt-3 gap-0.5 overflow-y-auto flex-1 min-h-0">
						{navItems?.map((item) => {
							const IconComponent = getIcon(item?.icon || "Circle");
							const active = isActive(item.route);
							const hasActive = hasActiveChild(item);

							// Render simple item without children
							if (!item.children) {
								return (
									<div key={item.id} className="relative group">
										<button
											onClick={() => {
												if (item.route) {
													router.push(item.route);
													// Close drawer on mobile after navigation
													if (setDrawerOpen) {
														setDrawerOpen(false);
													}
												}
											}}
											className={`w-full py-1.5 px-2 my-0.5 transition-all duration-100 ease-in rounded flex items-center ${
												open ? "gap-2" : "justify-center"
											} text-xs ${
												active
													? "bg-primary text-primary-foreground"
													: "hover:bg-gray-100 text-gray-700"
											}`}
										>
											<IconComponent
												className={`w-4 h-4 flex-shrink-0 ${
													active ? "text-primary-foreground" : "text-gray-600"
												}`}
											/>
											{open ? (
												<span className="truncate text-xs">{item.label}</span>
											) : null}
										</button>
										{!open && (
											<div className="absolute left-full ml-2 w-max bg-primary text-primary-foreground text-xs rounded p-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10 pointer-events-none whitespace-nowrap">
												{item.label}
											</div>
										)}
									</div>
								);
							}

							// Render item with children using details/summary
							if (!open) {
								// Collapsed sidebar - show icon with tooltip on hover
								return (
									<div key={item.id} className="relative group">
										<button className="w-full py-1.5 px-2 my-0.5 transition-all duration-100 ease-in rounded flex items-center justify-center text-xs hover:bg-gray-100 text-gray-700">
											<IconComponent className="w-4 h-4 text-gray-600" />
										</button>
										<div className="absolute left-full ml-2 w-max bg-primary text-primary-foreground text-xs rounded p-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100 z-10 pointer-events-none whitespace-nowrap">
											{item.label}
										</div>
									</div>
								);
							}

							return (
								<details
									key={item.id}
									className="group"
									open={mounted ? hasActive : false}
								>
									<summary
										className={`w-full py-1.5 px-2 my-0.5 transition-all duration-100 ease-in rounded flex items-center gap-2 text-xs cursor-pointer list-none ${
											hasActive
												? "bg-primary text-primary-foreground"
												: "hover:bg-gray-100 text-gray-700"
										}`}
									>
										<IconComponent
											className={`w-4 h-4 flex-shrink-0 ${
												hasActive ? "text-primary-foreground" : "text-gray-600"
											}`}
										/>
										<span className="truncate flex-1 text-xs">
											{item.label}
										</span>
										<ChevronRight
											className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
												hasActive
													? "text-primary-foreground rotate-90"
													: "text-gray-600"
											}`}
										/>
									</summary>
									<div className="ml-3 mt-0.5 space-y-0.5">
										{item.children.map((child) => {
											const ChildIconComponent = getIcon(
												child?.icon || "Circle"
											);
											const childActive = isActive(child.route);
											const childHasActive = hasActiveChild(child);

											// Render child without nested children
											if (!child.children) {
												return (
													<button
														key={child.id}
														onClick={() => {
															if (child.route) {
																router.push(child.route);
																// Close drawer on mobile after navigation
																if (setDrawerOpen) {
																	setDrawerOpen(false);
																}
															}
														}}
														className={`w-full py-1.5 px-2 transition-all duration-100 ease-in rounded flex items-center gap-2 text-xs ${
															childActive
																? "bg-primary text-primary-foreground"
																: "hover:bg-gray-100 text-gray-700"
														}`}
													>
														<ChildIconComponent
															className={`w-4 h-4 flex-shrink-0 ${
																childActive
																	? "text-primary-foreground"
																	: "text-gray-600"
															}`}
														/>
														<span className="truncate text-xs">
															{child.label}
														</span>
													</button>
												);
											}

											// Render child with nested children (2nd level)
											return (
												<details
													key={child.id}
													className="group"
													open={mounted ? childHasActive : false}
												>
													<summary
														className={`w-full py-1.5 px-2 transition-all duration-100 ease-in rounded flex items-center gap-2 text-xs cursor-pointer list-none ${
															childHasActive
																? "bg-primary text-primary-foreground"
																: "hover:bg-gray-100 text-gray-700"
														}`}
													>
														<ChildIconComponent
															className={`w-4 h-4 flex-shrink-0 ${
																childHasActive
																	? "text-primary-foreground"
																	: "text-gray-600"
															}`}
														/>
														<span className="truncate flex-1 text-xs">
															{child.label}
														</span>
														<ChevronRight
															className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
																childHasActive
																	? "text-primary-foreground rotate-90"
																	: "text-gray-600"
															}`}
														/>
													</summary>
													<div className="ml-3 mt-0.5 space-y-0.5">
														{child.children.map((grandChild) => {
															const GrandChildIconComponent = getIcon(
																grandChild?.icon || "Circle"
															);
															const grandChildActive = isActive(
																grandChild.route
															);
															return (
																<button
																	key={grandChild.id}
																	onClick={() => {
																		if (grandChild.route) {
																			router.push(grandChild.route);
																			// Close drawer on mobile after navigation
																			if (setDrawerOpen) {
																				setDrawerOpen(false);
																			}
																		}
																	}}
																	className={`w-full py-1.5 px-2 transition-all duration-100 ease-in rounded flex items-center gap-2 text-xs ${
																		grandChildActive
																			? "bg-primary text-primary-foreground"
																			: "hover:bg-gray-100 text-gray-700"
																	}`}
																>
																	<GrandChildIconComponent
																		className={`w-4 h-4 flex-shrink-0 ${
																			grandChildActive
																				? "text-primary-foreground"
																				: "text-gray-600"
																		}`}
																	/>
																	<span className="truncate text-xs">
																		{grandChild.label}
																	</span>
																</button>
															);
														})}
													</div>
												</details>
											);
										})}
									</div>
								</details>
							);
						})}
					</div>
				</div>
				<div className="p-2 space-y-2 border-t flex-shrink-0">
					<button
						onClick={handleLogout}
						className={`flex items-center bg-red-600 text-xs text-white hover:bg-red-500 cursor-pointer py-1.5 px-2 rounded-lg transition-colors w-full ${
							open ? "gap-2 justify-start" : "justify-center"
						}`}
					>
						<LogOut className="w-4 h-4 flex-shrink-0" />
						{open ? <span className="text-xs">Logout</span> : null}
					</button>
				</div>
			</div>
		</div>
	);
};
