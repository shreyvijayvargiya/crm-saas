import React, { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { toast } from "react-toastify";
import AuthPageShell from "./AuthPageShell";
import LabeledInput from "./LabeledInput";
import { useTheme } from "../../utils/useTheme";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
	const { colors, scheme } = useTheme();
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!email.trim()) {
			setError("Enter the email for your account");
			return;
		}
		if (!emailRe.test(email.trim())) {
			setError("Enter a valid email address");
			return;
		}
		setError("");
		setSent(true);
		toast.info("Demo: reset link would be emailed. Connect your mailer or auth provider.");
	};

	return (
		<AuthPageShell
			title="Reset your password"
			subtitle="We’ll email a secure link to choose a new password. No API is wired in this template."
			badge="Account recovery"
			footer={
				<p className={`text-center text-sm ${colors.mutedForeground}`}>
					Remember your password?{" "}
					<Link
						href="/login"
						className={`font-semibold ${colors.foreground} underline-offset-2 hover:underline`}
					>
						Back to sign in
					</Link>
				</p>
			}
		>
			{sent ? (
				<div
					className={`rounded-xl border ${colors.border} ${colors.muted} p-4 text-sm ${colors.textSecondary}`}
					role="status"
				>
					<div className="flex gap-3">
						<div
							className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${scheme.primary} ${scheme.primaryForeground}`}
						>
							<Mail className="h-5 w-5" />
						</div>
						<div>
							<p className={`font-medium ${colors.foreground}`}>Check your inbox</p>
							<p className="mt-1 text-xs leading-relaxed">
								If an account exists for{" "}
								<span className="font-mono text-[11px]">{email.trim()}</span>, a reset
								link would arrive within a few minutes. Demo mode does not send mail.
							</p>
							<button
								type="button"
								onClick={() => {
									setSent(false);
									setEmail("");
								}}
								className={`mt-3 text-xs font-semibold ${colors.foreground} underline-offset-2 hover:underline`}
							>
								Use a different email
							</button>
						</div>
					</div>
				</div>
			) : (
				<form onSubmit={handleSubmit} className="space-y-4" noValidate>
					<LabeledInput
						label="Account email"
						type="email"
						name="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
							setError("");
						}}
						autoComplete="email"
						placeholder="you@company.com"
						error={error}
					/>
					<p className={`text-xs leading-relaxed ${colors.mutedForeground}`}>
						For production, invalidate active sessions after a successful reset and rate-limit
						this endpoint to reduce abuse.
					</p>
					<button
						type="submit"
						className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
					>
						Send reset link
					</button>
				</form>
			)}
		</AuthPageShell>
	);
};

export default ForgotPassword;
