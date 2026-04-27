import React from "react";
import Link from "next/link";
import { Shield } from "lucide-react";
import { useTheme } from "../../utils/useTheme";

/**
 * Centered auth layout with optional marketing column on large screens.
 */
const AuthPageShell = ({
	title,
	subtitle,
	children,
	footer,
	badge = "Secure authentication",
}) => {
	const { colors, scheme } = useTheme();

	return (
		<div className="mx-auto w-full max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
			<div
				className={`overflow-hidden rounded-2xl border ${colors.border} ${colors.card} shadow-sm`}
			>
				<div className="grid min-h-[min(100%,32rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] xl:grid-cols-[minmax(0,1.1fr)_minmax(0,26rem)]">
					<div
						className={`relative hidden flex-col justify-between p-6 sm:p-8 lg:flex ${colors.muted} border-b lg:border-b-0 lg:border-r ${colors.border}`}
					>
						<div
							aria-hidden
							className="pointer-events-none absolute inset-0 opacity-[0.08] dark:opacity-[0.12]"
							style={{
								background:
									"radial-gradient(circle at 20% 20%, var(--auth-accent, #3b82f6), transparent 50%), radial-gradient(circle at 80% 60%, #8b5cf6, transparent 45%)",
							}}
						/>
						<div className="relative z-[1] space-y-4">
							<div
								className={`inline-flex items-center gap-2 rounded-full border ${colors.border} ${colors.card} px-3 py-1 text-xs font-medium ${colors.mutedForeground}`}
							>
								<Shield className="h-3.5 w-3.5" />
								{badge}
							</div>
							<div>
								<p className={`text-xs font-medium uppercase tracking-wider ${colors.textMuted}`}>
									CRM SaaS
								</p>
								<p className={`mt-1 text-lg font-semibold leading-snug ${colors.foreground} sm:text-xl`}>
									Role-based access, audit-ready sessions, and flows you can wire to
									your auth provider.
								</p>
							</div>
							<ul
								className={`space-y-2.5 text-sm ${colors.textSecondary}`}
							>
								{[
									"Email & password UI ready for your API or OAuth handoff",
									"Password reset and rotation flows for compliance checklists",
									"Components match your global theme and dark mode out of the box",
								].map((line) => (
									<li key={line} className="flex gap-2">
										<span
											className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${scheme.primary}`}
										/>
										<span className="leading-relaxed">{line}</span>
									</li>
								))}
							</ul>
						</div>
						<p className={`relative z-[1] text-xs ${colors.textMuted}`}>
							Demo only — connect{" "}
							<code
								className={`rounded-md px-1.5 py-0.5 text-[10px] ${colors.secondary}`}
							>
								POST /auth/*
							</code>{" "}
							for production.
						</p>
					</div>

					<div
						className={`flex flex-col justify-center p-5 sm:p-7 lg:min-h-[28rem] ${colors.primaryBackground}`}
					>
						<div className="mx-auto w-full max-w-sm">
							<header className="mb-6 space-y-1">
								<h1
									className={`text-xl font-semibold tracking-tight ${colors.foreground} sm:text-2xl`}
								>
									{title}
								</h1>
								{subtitle ? (
									<p className={`text-sm leading-relaxed ${colors.mutedForeground}`}>
										{subtitle}
									</p>
								) : null}
							</header>
							{children}
							{footer ? (
								<div className={`mt-6 border-t ${colors.border} pt-5`}>{footer}</div>
							) : null}
						</div>
					</div>
				</div>
			</div>

			<p className={`mt-4 text-center text-xs ${colors.textMuted}`}>
				By continuing you agree to the{" "}
				<Link
					href="/about"
					className={`font-medium ${colors.textSecondary} underline-offset-2 hover:underline`}
				>
					terms
				</Link>{" "}
				and{" "}
				<Link
					href="/settings"
					className={`font-medium ${colors.textSecondary} underline-offset-2 hover:underline`}
				>
					privacy practices
				</Link>{" "}
				outlined for this template.
			</p>
		</div>
	);
};

export default AuthPageShell;
