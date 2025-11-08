import React from "react";
import * as lucideIcons from "lucide-react";

const Sidebar = ({ open, drawerOpen, setDrawerOpen }) => {
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
			id: 10,
			label: "Settings",
			route: "/settings",
			icon: "Settings",
		},
	];

	return (
		<div
			className={`h-screen bg-zinc-50/20  ${
				open ? "w-60 md:w-60" : "w-full"
			} transition-all duration-300 ease-in`}
		>
			<div className="flex flex-col h-full justify-between pb-5 border border-zinc-200 bg-white rounded-xl">
				<div className="flex flex-col gap-1">
					<div className="flex items-center justify-between px-4 py-3">
						{open ? (
							<p className="text-lg">CRM pages</p>
						) : (
							<lucideIcons.Rocket className="w-6 h-6 mt-2" />
						)}
						<button
							onClick={() => setDrawerOpen(!drawerOpen)}
							className="md:hidden"
						>
							<lucideIcons.X size={24} />
						</button>
					</div>
					<hr />
					<div className="flex flex-col px-4">
						{navItems?.map((item) => {
							const Icon = lucideIcons[item?.icon];
							return (
								<div className="relative">
									<a
										key={item.id}
										href={item.route}
										className="p-1.5 hover:bg-zinc-50 hover:text-zinc-800 transition-all duration-100 ease-in rounded-xl hover:bg-opacity-80 flex items-center gap-2 text-sm"
									>
										{Icon ? <Icon className="w-4 h-4 text-zinc-800" /> : null}{" "}
										{open ? item.label : null}
									</a>
									{!open && (
										<div className="absolute left-full ml-2 w-max bg-zinc-800 text-white text-xs rounded p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
											{item.label}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex gap-2 items-center hover:bg-zinc-50 p-2 rounded-xl mx-4">
					<lucideIcons.LogOut size={18} />
					{open ? "logout" : null}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
