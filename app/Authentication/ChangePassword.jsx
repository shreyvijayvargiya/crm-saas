import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";
import AuthPageShell from "./AuthPageShell";
import PasswordField from "./PasswordField";
import { useTheme } from "../../utils/useTheme";

const ChangePassword = () => {
	const { colors, scheme } = useTheme();
	const [current, setCurrent] = useState("");
	const [next, setNext] = useState("");
	const [confirm, setConfirm] = useState("");
	const [errors, setErrors] = useState({});

	const validate = () => {
		const e = {};
		if (!current) e.current = "Enter your current password";
		if (!next) e.next = "Enter a new password";
		else if (next.length < 8) e.next = "Use at least 8 characters";
		if (current && next && current === next) e.next = "New password must differ from current";
		if (next !== confirm) e.confirm = "Confirmations do not match";
		setErrors(e);
		return Object.keys(e).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validate()) return;
		toast.success("Demo: password updated. Integrate with your session + hash storage.");
		setCurrent("");
		setNext("");
		setConfirm("");
	};

	return (
		<AuthPageShell
			title="Change password"
			subtitle="Use this flow after login. In production, require re-auth for sensitive accounts and log the event."
			badge="Security"
			footer={
				<p className={`text-center text-sm ${colors.mutedForeground}`}>
					Need to sign in first?{" "}
					<Link
						href="/login"
						className={`font-semibold ${colors.foreground} underline-offset-2 hover:underline`}
					>
						Go to login
					</Link>
				</p>
			}
		>
			<div
				className={`mb-5 flex gap-3 rounded-xl border ${colors.border} ${colors.muted} p-3 text-xs ${colors.textSecondary}`}
			>
				<ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
				<p className="leading-relaxed">
					<strong className={`font-medium ${colors.foreground}`}>Best practice:</strong>{" "}
					rotate passwords on a schedule you define, enforce breaches checks, and pair with
					MFA when you go live.
				</p>
			</div>
			<form onSubmit={handleSubmit} className="space-y-4" noValidate>
				<PasswordField
					label="Current password"
					name="current"
					value={current}
					onChange={(e) => setCurrent(e.target.value)}
					autoComplete="current-password"
					error={errors.current}
				/>
				<PasswordField
					label="New password"
					name="new"
					value={next}
					onChange={(e) => setNext(e.target.value)}
					autoComplete="new-password"
					error={errors.next}
					hint="Avoid reusing passwords from other products."
				/>
				<PasswordField
					label="Confirm new password"
					name="confirm"
					value={confirm}
					onChange={(e) => setConfirm(e.target.value)}
					autoComplete="new-password"
					error={errors.confirm}
				/>
				<button
					type="submit"
					className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
				>
					Update password
				</button>
			</form>
		</AuthPageShell>
	);
};

export default ChangePassword;
