"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";

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
		<div className="flex min-h-screen bg-zinc-50">
			{/* Desktop Sidebar */}
			<div className="hidden md:block">
				<Sidebar
					open={sidebarOpen}
					setOpen={setSidebarOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			</div>

			{/* Mobile Sidebar Overlay */}
			{drawerOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
					onClick={() => setDrawerOpen(false)}
				/>
			)}

			{/* Mobile Sidebar */}
			<div
				className={`fixed left-0 top-0 h-full z-50 md:hidden transition-transform duration-300 ${
					drawerOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<Sidebar
					open={true}
					setOpen={setSidebarOpen}
					drawerOpen={drawerOpen}
					setDrawerOpen={setDrawerOpen}
				/>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col min-w-0">
				{/* Mobile Header */}
				<div className="md:hidden bg-white border-b px-4 py-3 flex items-center gap-3">
					<button
						onClick={() => setDrawerOpen(!drawerOpen)}
						className="p-2 hover:bg-gray-100 rounded"
					>
						<Menu className="w-5 h-5" />
					</button>
					<h1 className="text-lg font-bold">TUFF+ INTEGRATOR</h1>
				</div>

				{/* Page Content */}
				<main className="flex-1 overflow-y-auto">{children}</main>
			</div>
		</div>
	);
}
