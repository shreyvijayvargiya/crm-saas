import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import AuthPageShell from "./AuthPageShell";
import LabeledInput from "./LabeledInput";
import PasswordField from "./PasswordField";
import { useTheme } from "../../utils/useTheme";
import { useAuth } from "../../utils/AuthProvider";
import { Button } from "@/components/ui/button";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
	const router = useRouter();
	const { colors } = useTheme();
	const { signIn, proEnabled, isDemo } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [remember, setRemember] = useState(true);
	const [errors, setErrors] = useState({});
	const [submitting, setSubmitting] = useState(false);

	const validate = () => {
		const next = {};
		if (!email.trim()) next.email = "Email is required";
		else if (!emailRe.test(email.trim())) next.email = "Enter a valid email address";
		if (!password) next.password = "Password is required";
		setErrors(next);
		return Object.keys(next).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validate()) return;
		setSubmitting(true);
		try {
			if (proEnabled) {
				await signIn({ email: email.trim(), password });
				toast.success("Signed in successfully");
				const next = typeof router.query.next === "string" ? router.query.next : "/";
				router.push(next);
			} else {
				toast.success("Demo: signed in. Enable PRO in Settings or .env.local");
				router.push("/");
			}
		} catch (err) {
			toast.error(err.message || "Sign in failed");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<AuthPageShell
			title="Welcome back"
			subtitle={
				proEnabled
					? "Sign in to your Supabase-backed workspace."
					: "Sign in to access your CRM workspace, deals, and tasks."
			}
			badge={proEnabled ? "PRO login" : "Demo login"}
			footer={
				<p className={`text-center text-sm ${colors.mutedForeground}`}>
					No account?{" "}
					<Link
						href="/signup"
						className={`font-semibold ${colors.foreground} underline-offset-2 hover:underline`}
					>
						Create one
					</Link>
				</p>
			}
		>
			<form onSubmit={handleSubmit} className="space-y-4" noValidate>
				<LabeledInput
					label="Work email"
					type="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoComplete="email"
					placeholder="you@company.com"
					error={errors.email}
				/>
				<PasswordField
					label="Password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					autoComplete="current-password"
					error={errors.password}
				/>
				<div className="flex flex-wrap items-center justify-between gap-2 text-xs">
					<label
						className={`inline-flex cursor-pointer items-center gap-2 ${colors.mutedForeground}`}
					>
						<input
							type="checkbox"
							checked={remember}
							onChange={(e) => setRemember(e.target.checked)}
							className={`h-3.5 w-3.5 rounded border ${colors.border} ${colors.muted} ${colors.foreground} accent-zinc-900 dark:accent-zinc-100`}
						/>
						Remember this device
					</label>
					<Link
						href="/forgot-password"
						className={`font-medium ${colors.textSecondary} underline-offset-2 hover:underline`}
					>
						Forgot password?
					</Link>
				</div>
				<Button type="submit" className="w-full" disabled={submitting}>
					{submitting ? "Signing in…" : "Sign in"}
				</Button>
				{isDemo && (
					<p className={`text-center text-xs ${colors.mutedForeground}`}>
						Demo mode — configure Supabase in{" "}
						<Link href="/settings" className="font-medium underline-offset-2 hover:underline">
							Settings
						</Link>
					</p>
				)}
			</form>
		</AuthPageShell>
	);
};

export default Login;
