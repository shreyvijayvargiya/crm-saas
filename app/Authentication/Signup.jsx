import React, { useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import AuthPageShell from "./AuthPageShell";
import LabeledInput from "./LabeledInput";
import PasswordField from "./PasswordField";
import { useTheme } from "../../utils/useTheme";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function strengthLabel(pw) {
	if (!pw) return { label: "", width: "0%", color: "bg-zinc-300 dark:bg-zinc-600" };
	if (pw.length < 8)
		return { label: "Too short", width: "25%", color: "bg-red-500" };
	let score = 0;
	if (pw.length >= 10) score++;
	if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
	if (/\d/.test(pw)) score++;
	if (/[^a-zA-Z0-9]/.test(pw)) score++;
	if (score <= 1) return { label: "Weak", width: "40%", color: "bg-amber-500" };
	if (score <= 2) return { label: "Fair", width: "65%", color: "bg-amber-400" };
	if (score <= 3) return { label: "Good", width: "85%", color: "bg-emerald-500" };
	return { label: "Strong", width: "100%", color: "bg-emerald-500" };
}

const Signup = () => {
	const { colors, scheme } = useTheme();
	const [name, setName] = useState("");
	const [company, setCompany] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirm, setConfirm] = useState("");
	const [accepted, setAccepted] = useState(false);
	const [errors, setErrors] = useState({});

	const strength = useMemo(() => strengthLabel(password), [password]);

	const validate = () => {
		const next = {};
		if (!name.trim()) next.name = "Name is required";
		if (!email.trim()) next.email = "Email is required";
		else if (!emailRe.test(email.trim())) next.email = "Enter a valid email address";
		if (!password) next.password = "Password is required";
		else if (password.length < 8) next.password = "Use at least 8 characters";
		if (password !== confirm) next.confirm = "Passwords do not match";
		if (!accepted) next.terms = "Accept the terms to continue";
		setErrors(next);
		return Object.keys(next).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validate()) return;
		toast.success("Demo: account created. Hook signup to your user service.");
	};

	return (
		<AuthPageShell
			title="Create your account"
			subtitle="Invite your team after you connect your identity provider or database."
			badge="Sign up"
			footer={
				<p className={`text-center text-sm ${colors.mutedForeground}`}>
					Already have an account?{" "}
					<Link
						href="/login"
						className={`font-semibold ${colors.foreground} underline-offset-2 hover:underline`}
					>
						Sign in
					</Link>
				</p>
			}
		>
			<form onSubmit={handleSubmit} className="space-y-4" noValidate>
				<LabeledInput
					label="Full name"
					name="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					autoComplete="name"
					placeholder="Jordan Lee"
					error={errors.name}
				/>
				<LabeledInput
					label="Company (optional)"
					name="company"
					value={company}
					onChange={(e) => setCompany(e.target.value)}
					autoComplete="organization"
					placeholder="Acme Inc."
				/>
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
				<div className="space-y-2">
					<PasswordField
						label="Password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="new-password"
						error={errors.password}
						hint="Use 8+ characters with mixed case, numbers, or symbols."
					/>
					{password ? (
						<div className="space-y-1">
							<div
								className={`h-1 w-full overflow-hidden rounded-full ${colors.muted}`}
							>
								<div
									className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
									style={{ width: strength.width }}
								/>
							</div>
							<p className={`text-[10px] ${colors.mutedForeground}`}>
								Strength: {strength.label}
							</p>
						</div>
					) : null}
				</div>
				<PasswordField
					label="Confirm password"
					name="confirm"
					value={confirm}
					onChange={(e) => setConfirm(e.target.value)}
					autoComplete="new-password"
					error={errors.confirm}
				/>
				<div className="space-y-1">
					<label
						className={`flex cursor-pointer gap-2 text-xs ${colors.mutedForeground}`}
					>
						<input
							type="checkbox"
							checked={accepted}
							onChange={(e) => setAccepted(e.target.checked)}
							className={`mt-0.5 h-3.5 w-3.5 shrink-0 rounded border ${colors.border}`}
						/>
						<span>
							I agree to the template terms and understand data is demo-only until backed
							by a real backend.
						</span>
					</label>
					{errors.terms ? (
						<p className="text-xs text-red-600 dark:text-red-400" role="alert">
							{errors.terms}
						</p>
					) : null}
				</div>
				<button
					type="submit"
					className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
				>
					Create account
				</button>
			</form>
		</AuthPageShell>
	);
};

export default Signup;
