"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface AppLayoutProps {
	children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
	const pathname = usePathname();
	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	// Ensure component is mounted before accessing localStorage
	useEffect(() => {
		setMounted(true);
	}, []);

	// Check if user is authenticated
	useEffect(() => {
		if (!mounted) return;
		const userData = localStorage.getItem("user");
		if (!userData && pathname !== "/login") {
			router.push("/login");
		}
	}, [pathname, router, mounted]);

	// Don't show sidebar on login page
	if (pathname === "/login") {
		return <>{children}</>;
	}

	// Prevent hydration mismatch by not rendering sidebar until mounted
	if (!mounted) {
		return (
			<div className="flex min-h-screen bg-zinc-50">
				<div className="flex-1 flex flex-col min-w-0">
					<main className="flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-zinc-50 relative">
			{/* Desktop Sidebar - Fixed */}
			<aside className="hidden md:block fixed left-0 top-0 h-screen z-30">
				<Sidebar
					open={sidebarOpen}
					setOpen={setSidebarOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			</aside>

			{/* Mobile Sidebar Overlay */}
			{drawerOpen && (
				<div
					className="fixed inset-0 bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
					onClick={() => setDrawerOpen(false)}
				/>
			)}

			{/* Mobile Sidebar - Drawer */}
			<aside
				className={`fixed left-0 top-0 h-full z-50 md:hidden transition-transform duration-300 ease-in-out ${
					drawerOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<Sidebar
					open={true}
					setOpen={setSidebarOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			</aside>

			{/* Main Content */}
			<div
				className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
					sidebarOpen ? "md:ml-60" : "md:ml-16"
				}`}
			>
				{/* Desktop Header with Sidebar Toggle */}
				<header className="hidden md:flex bg-transparent border-b px-4 py-3 items-center gap-3 sticky top-0 z-20 shadow-sm">
					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						className="p-2 hover:bg-gray-100 rounded transition-colors"
						aria-label="Toggle sidebar"
					>
						{sidebarOpen ? (
							<PanelLeftClose className="w-5 h-5 text-gray-600" />
						) : (
							<PanelLeftOpen className="w-5 h-5 text-gray-600" />
						)}
					</button>
					<h1 className="text-lg font-bold text-primary">TUFF+ ERP</h1>
				</header>

				{/* Mobile Header */}
				<header className="md:hidden bg-white border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-20 shadow-sm">
					<button
						onClick={() => setDrawerOpen(!drawerOpen)}
						className="p-2 hover:bg-gray-100 rounded transition-colors"
						aria-label="Toggle menu"
					>
						<Menu className="w-5 h-5" />
					</button>
					<h1 className="text-lg font-bold text-primary">TUFF+ ERP</h1>
				</header>

				{/* Page Content */}
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	);
}
