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
	];

	return (
		<div
			className={`bg-white h-screen border-r border-gray-100 ${
				open ? "w-60 md:w-60" : "w-full"
			} transition-all duration-300 ease-in`}
		>
			<div className="flex flex-col h-full justify-between pb-5">
				<div className="flex flex-col gap-1">
					<div className="flex items-center justify-between px-4 py-3">
						{open ? (
							<p className="text-lg">CRM pages</p>
						) : (
							<p className="px-4 text-xl font-sans">C</p>
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
										className="p-2 hover:bg-gray-50 hover:text-gray-800 transition-all duration-100 ease-in rounded-xl hover:bg-opacity-80 my-2 flex items-center gap-2"
									>
										{Icon ? <Icon className="w-5 h-5 text-gray-800" /> : null}{" "}
										{open ? item.label : null}
									</a>
									{!open && (
										<div className="absolute left-full ml-2 w-max bg-gray-800 text-white text-xs rounded p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
											{item.label}
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex gap-2 items-center hover:bg-gray-50 p-2 rounded-xl mx-4">
					<lucideIcons.LogOut size={18} />
					{open ? "logout" : null}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
