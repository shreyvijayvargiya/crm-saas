"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

type UserRole = "ADMIN" | "MANAGER" | "EDITOR" | "SELF";

export default function LoginPage() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<UserRole>("SELF");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			// For MVP, we'll use a simple approach with Supabase
			// In production, you'd want proper password hashing and authentication
			const { data, error: loginError } = await supabase
				.from("user_account")
				.select("*")
				.eq("username", username)
				.eq("is_active", true)
				.single();

			if (loginError || !data) {
				setError("Invalid username or password");
				setLoading(false);
				return;
			}

			// Simple password check (in production, use proper bcrypt comparison)
			// For MVP, we'll store a simple check
			// Note: The migration includes a placeholder hash - you'll need to update this

			// For now, accept any password for MVP testing
			// TODO: Implement proper password verification with bcrypt

			if (data.role !== role) {
				setError("Selected role does not match your account role");
				setLoading(false);
				return;
			}

			// Store session in localStorage for MVP
			localStorage.setItem(
				"user",
				JSON.stringify({
					userId: data.user_id,
					username: data.username,
					role: data.role,
				})
			);

			router.push("/dashboard");
		} catch (err) {
			setError("An error occurred. Please try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle>TUFF+ INTEGRATOR</CardTitle>
					<CardDescription>Login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleLogin} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="username">Username</Label>
							<Input
								id="username"
								type="text"
								placeholder="Enter your username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								placeholder="Enter your password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="role">Role</Label>
							<Select
								value={role}
								onValueChange={(value) => setRole(value as UserRole)}
							>
								<SelectTrigger>
									<SelectValue placeholder="Select your role" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="ADMIN">Admin</SelectItem>
									<SelectItem value="MANAGER">Manager</SelectItem>
									<SelectItem value="EDITOR">Editor</SelectItem>
									<SelectItem value="SELF">Self</SelectItem>
								</SelectContent>
							</Select>
						</div>
						{error && (
							<div className="text-sm text-destructive bg-destructive/10 p-2 rounded">
								{error}
							</div>
						)}
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? "Logging in..." : "Login"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
