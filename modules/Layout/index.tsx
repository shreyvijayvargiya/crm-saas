import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar";
import { useTheme } from "../../utils/useTheme";

interface LayoutWrapperProps {
	children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
	const [open, setOpen] = useState<boolean>(true);
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
	const [mounted, setMounted] = useState<boolean>(false);
	const { colors } = useTheme();

	// Prevent hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	// Prevent hydration mismatch by not rendering until mounted
	if (!mounted) {
		return (
			<div className="flex relative md:p-2 transition-colors min-h-screen">
				<div className="flex-1 flex flex-col min-w-0">
					<main className="flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		);
	}

	return (
		<div
			className={`flex relative ${colors.mutedBackground} md:p-2 transition-colors min-h-screen`}
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
				className={`fixed inset-0 bg-opacity-50 left-0 right-0 transition-all duration-300 ease-in-out z-50 ${
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
				className={`overflow-y-auto ${colors.card} border ${colors.border} rounded-2xl mx-2 w-full max-h-screen hidescrollbar transition-colors`}
			>
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
