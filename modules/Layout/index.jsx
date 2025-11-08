import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar";

const LayoutWrapper = ({ children }) => {
	const [open, setOpen] = useState(true);
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<div className="flex relative bg-zinc-100 md:p-2">
			<div className="hidden md:block">
				<Sidebar
					open={open}
					setOpen={setOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			</div>

			<div
				className={`fixed inset-0 bg-black bg-opacity-50 left-0 right-0 transition-all duration-300 ease-in-out z-50 ${
					drawerOpen
						? "bottom-0 h-0 opacity-100 visible"
						: "bottom-0 h-0 opacity-0 hidden"
				} md:hidden block`}
			>
				<Sidebar
					open={drawerOpen}
					setOpen={setDrawerOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			</div>

			<main className="overflow-y-auto bg-white rounded-2xl mx-2 w-full max-h-screen hidescrollbar">
				<Navbar
					open={open}
					setOpen={setOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
				<div className="md:px-10">{children}</div>
			</main>
			<ToastContainer position="bottom-right" />
			<div className="w-fit h-fit fixed bottom-10 right-10 bg-white rounded-xl shadow-xl p-4 border border-zinc-200">
				<a
					href="https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template?layout=profile"
					target="_blank"
					rel="noopener noreferrer"
					className="p-2 rounded-xl bg-zinc-900 hover:bg-black text-white cursor-pointer"
				>
					Get the Template
				</a>
			</div>
		</div>
	);
};

export default LayoutWrapper;
