import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar";

const LayoutWrapper = ({ children }) => {
	const [open, setOpen] = useState(true);
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<div className="flex relative">
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
					drawerOpen ? "bottom-0 h-0 opacity-100 visible" : "bottom-0 h-0 opacity-0 hidden"
				} md:hidden block`}
			>
				<Sidebar
					open={drawerOpen}
					setOpen={setDrawerOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			</div>

			<main className="overflow-y-auto w-full mx-auto max-h-screen hidescrollbar">
				<Navbar
					open={open}
					setOpen={setOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
				<div className="md:px-10">{children}</div>
			</main>
			<ToastContainer position="bottom-right" />
		</div>
	);
};

export default LayoutWrapper;
