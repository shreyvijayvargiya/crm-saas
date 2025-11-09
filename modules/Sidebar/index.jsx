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
			className={`h-screen bg-zinc-50/20  ${
				open ? "w-60 md:w-60" : "w-full"
			} transition-all duration-300 ease-in`}
		>
			<div className="flex flex-col h-full justify-between pb-5 border border-zinc-200 bg-white rounded-xl">
				<div className="flex flex-col gap-1">
					<div className="flex items-center justify-between border-b border-zinc-100 ">
						{open ? (
							<div className="relative group flex items-center p-2 justify-between hover:bg-zinc-50 rounded-t-xl cursor-pointer w-full">
								<div className="flex items-center gap-2">
									<lucideIcons.Rocket className="w-4 h-4" />
									<p className="text-sm">CRM pages</p>
								</div>
								<div className="flex flex-col items-center justify-center">
									<lucideIcons.ChevronUp className="text-zinc-500 group-hover:rotate-180 transition-all duration-200 ease-in w-3 h-3" />
									<lucideIcons.ChevronDown className="text-zinc-500 group-hover:rotate-180 transition-all duration-200 ease-in w-3 h-3" />
								</div>
								<div className="absolute top-10 left-0 right-0 w-60 h-fit bg-white text-xs rounded-xl border border-zinc-100 px-1 py-2 opacity-0 transition-opacity duration-200 invisible group-hover:visible group-hover:opacity-100 z-20">
									<p className="text-xs font-medium p-1">Projects</p>
									<div className="flex flex-col gap-1 my-2">
										<div className="flex items-center gap-2 hover:bg-zinc-50 cursor-pointer rounded p-1">
											<lucideIcons.Rocket className="w-5 h-5 p-1 rounded border border-zinc-200" />
											<p className="text-sm">CRM pages</p>
										</div>
										<div className="flex items-center gap-2 hover:bg-zinc-50 cursor-pointer rounded p-1">
											<lucideIcons.ShoppingCart className="w-5 h-5 p-1 rounded border border-zinc-200" />
											<p className="text-sm">E-commerce</p>
										</div>
										<div className="flex items-center gap-2 hover:bg-zinc-50 cursor-pointer rounded p-1">
											<lucideIcons.Book className="w-5 h-5 p-1 rounded border border-zinc-200" />
											<p className="text-sm">Blog</p>
										</div>
										<div className="border-t border-zinc-50" />
										<button className="bg-zinc-800 cursor-pointer hover:shadow-zinc-200 hover:shadow-xl transition-all duration-100 ease-in hover:bg-zinc-900 text-white text-xs rounded w-full p-1">
											Add project
										</button>
									</div>
								</div>
							</div>
						) : (
							<lucideIcons.Rocket className="w-4 h-4 my-4 mx-auto" />
						)}
						<button
							onClick={() => setDrawerOpen(!drawerOpen)}
							className="md:hidden"
						>
							<lucideIcons.X size={24} />
						</button>
					</div>

					<div className="flex flex-col px-2">
						{navItems?.map((item) => {
							const Icon = lucideIcons[item?.icon];
							return (
								<div className="relative">
									<a
										key={item.id}
										href={item.route}
										className="p-1 my-0.5 hover:bg-zinc-50 text-zinc-600 hover:text-zinc-800 transition-all duration-100 ease-in rounded-md flex items-center gap-2 text-sm"
									>
										{Icon ? <Icon className="w-4 h-4 text-zinc-600" /> : null}{" "}
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
				<div className="p-2 space-y-2">
					{open && (
						<div className="w-full h-fit bg-white rounded-xl shadow-xl p-4 border border-zinc-200">
							<p className="text-zinc-600 mb-2 text-sm">
								Download Unlock lifetime access to entire React CRM template
							</p>
							<a
								href="https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template?layout=profile"
								target="_blank"
								rel="noopener noreferrer"
								className="p-2 text-sm rounded-xl bg-zinc-900 hover:bg-black text-white cursor-pointer"
							>
								Download Template
							</a>
						</div>
					)}
					<div className="flex gap-2 items-center bg-red-600 text-sm text-white hover:bg-red-500 cursor-pointer p-2 rounded-xl">
						<lucideIcons.LogOut size={16} />
						{open ? "logout" : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
