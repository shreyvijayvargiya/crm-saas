"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Package } from "lucide-react";

interface HeaderProps {
	title?: string;
	showBack?: boolean;
	backUrl?: string;
}

export function Header({ title, showBack, backUrl }: HeaderProps) {
	const router = useRouter();
	const [user, setUser] = useState<{ username: string; role: string } | null>(
		null
	);

	useEffect(() => {
		const userData = localStorage.getItem("user");
		if (userData) {
			try {
				setUser(JSON.parse(userData));
			} catch (error) {
				console.error("Error parsing user data:", error);
			}
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("user");
		router.push("/login");
	};

	return (
		<header className="bg-white border-b">
			<div className="container mx-auto px-4 py-4 flex justify-between items-center">
				<div className="flex items-center gap-4">
					{showBack && (
						<Button
							variant="ghost"
							size="sm"
							onClick={() => router.push(backUrl || "/dashboard")}
						>
							← Back
						</Button>
					)}
					<div className="flex items-center gap-2">
						<Package className="h-6 w-6" />
						<h1 className="text-2xl font-bold">
							{title || "TUFF+ INTEGRATOR"}
						</h1>
					</div>
				</div>
				<div className="flex items-center gap-4">
					{user && (
						<span className="text-sm text-zinc-600">
							{user.username} ({user.role})
						</span>
					)}
					<Button variant="outline" onClick={handleLogout}>
						<LogOut className="h-4 w-4 mr-2" />
						Logout
					</Button>
				</div>
			</div>
		</header>
	);
}
