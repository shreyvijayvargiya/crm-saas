import React, { useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import AuthPageShell from "./AuthPageShell";
import LabeledInput from "./LabeledInput";
import { useTheme } from "../../utils/useTheme";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword = () => {
	const { colors } = useTheme();
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
				<Card className={colors.muted}>
					<CardContent className="p-4 text-sm" role="status">
						<div className="flex gap-3">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
								<Mail className="h-5 w-5" />
							</div>
							<div>
								<p className={`font-medium ${colors.foreground}`}>Check your inbox</p>
								<p className={`mt-1 text-xs leading-relaxed ${colors.textSecondary}`}>
									If an account exists for{" "}
									<span className="font-mono text-[11px]">{email.trim()}</span>, a reset
									link would arrive within a few minutes. Demo mode does not send mail.
								</p>
								<Button
									type="button"
									variant="link"
									size="sm"
									onClick={() => {
										setSent(false);
										setEmail("");
									}}
									className="mt-3 h-auto p-0 text-xs"
								>
									Use a different email
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
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
					<Button type="submit" className="w-full">
						Send reset link
					</Button>
				</form>
			)}
		</AuthPageShell>
	);
};

export default ForgotPassword;
