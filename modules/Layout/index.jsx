import React, { useState } from "react";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toast";
import Navbar from "../Navbar";
import { useTheme } from "../../utils/useTheme";

const LayoutWrapper = ({ children }) => {
	const [open, setOpen] = useState(true);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { colors } = useTheme();

	return (
		<div
			className={`flex gap-2 relative md:p-2 transition-colors min-h-screen`}
		>
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

			<main
				className={`overflow-y-auto ${colors.primaryBackground} border ${colors.border} rounded-2xl w-full h-[98vh] hidescrollbar transition-colors`}
			>
				<Navbar
					open={open}
					setOpen={setOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
				<div>{children}</div>
			</main>
			<ToastContainer position="bottom-right" />
		</div>
	);
};

export default LayoutWrapper;
