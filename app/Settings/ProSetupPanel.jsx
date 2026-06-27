import React from "react";
import Link from "next/link";
import {
	CheckCircle2,
	Circle,
	Database,
	ExternalLink,
	KeyRound,
	Server,
} from "lucide-react";
import { useAuth } from "../../utils/AuthProvider";
import { useTheme } from "../../utils/useTheme";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SETUP_STEPS = [
	{
		id: "supabase",
		title: "Create a Supabase project",
		desc: "Free tier works. Copy Project URL and anon key.",
		href: "https://supabase.com/dashboard",
	},
	{
		id: "sql",
		title: "Run SQL migrations",
		desc: "01-auth → 02-app-tables → rls-policies → 04-pro-client-rls (required for signup).",
	},
	{
		id: "env",
		title: "Configure .env.local",
		desc: "Set NEXT_PUBLIC_DEMO_MODE=false and Supabase keys (see .env.example).",
	},
	{
		id: "restart",
		title: "Restart dev server",
		desc: "npm run dev — banner switches from Demo to PRO.",
	},
	{
		id: "signup",
		title: "Sign up & test",
		desc: "Create an account. Leads and Subscription Plans persist to Postgres.",
	},
];

export default function ProSetupPanel() {
	const { colors } = useTheme();
	const { proEnabled, isDemo, user, tenantId, signOut } = useAuth();

	return (
		<div className="space-y-6">
			<Card className="p-6">
				<div className="flex flex-wrap items-start justify-between gap-4">
					<div>
						<div className="flex items-center gap-2">
							<Database className="h-5 w-5 text-primary" />
							<h2 className={cn("text-xl font-semibold", colors.foreground)}>
								PRO — Database integration
							</h2>
						</div>
						<p className={cn("mt-2 text-sm", colors.mutedForeground)}>
							Starter ($49) runs in <strong>Demo mode</strong> with seed data. PRO
							enables Supabase auth, tenant workspaces, and live CRUD for{" "}
							<strong>Leads</strong> and <strong>Subscription Plans</strong>.
						</p>
					</div>
					<Badge
						variant={proEnabled ? "default" : "outline"}
						className={proEnabled ? "bg-emerald-600" : ""}
					>
						{proEnabled ? "PRO active" : "Demo mode"}
					</Badge>
				</div>

				{proEnabled && (
					<div
						className={cn(
							"mt-4 rounded-xl border p-4 text-sm",
							colors.border,
							colors.muted
						)}
					>
						<p className={colors.foreground}>
							Signed in as <strong>{user?.email}</strong>
							{tenantId ? (
								<>
									{" "}
									· Workspace <code className="text-xs">{tenantId}</code>
								</>
							) : (
								" · Workspace pending"
							)}
						</p>
						<Button variant="outline" size="sm" className="mt-3" onClick={signOut}>
							Sign out
						</Button>
					</div>
				)}

				{isDemo && (
					<div className="mt-6 space-y-3">
						<p className={cn("text-sm font-medium", colors.foreground)}>
							Enable PRO in 5 steps
						</p>
						<ul className="space-y-3">
							{SETUP_STEPS.map((step, index) => (
								<li
									key={step.id}
									className={cn(
										"flex gap-3 rounded-xl border p-3",
										colors.border
									)}
								>
									<span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
										{index + 1}
									</span>
									<div className="min-w-0 flex-1">
										<p className={cn("text-sm font-medium", colors.foreground)}>
											{step.title}
										</p>
										<p className={cn("text-xs", colors.mutedForeground)}>
											{step.desc}
										</p>
										{step.href && (
											<a
												href={step.href}
												target="_blank"
												rel="noopener noreferrer"
												className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
											>
												Open dashboard
												<ExternalLink className="h-3 w-3" />
											</a>
										)}
									</div>
									{proEnabled ? (
										<CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
									) : (
										<Circle className="h-5 w-5 shrink-0 text-muted-foreground/40" />
									)}
								</li>
							))}
						</ul>
					</div>
				)}
			</Card>

			<Card className="p-6">
				<h3 className={cn("text-sm font-semibold", colors.foreground)}>
					Environment variables
				</h3>
				<pre
					className={cn(
						"mt-3 overflow-x-auto rounded-xl border p-4 text-xs leading-relaxed",
						colors.border,
						colors.muted
					)}
				>{`NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...`}</pre>
				<p className={cn("mt-3 text-xs", colors.mutedForeground)}>
					No service role key needed — PRO uses client-side Supabase + RLS. See{" "}
					<code>.env.example</code> and <code>docs/INTEGRATION.md</code>.
				</p>
			</Card>

			<Card className="p-6">
				<div className="flex items-start gap-3">
					<Server className="h-5 w-5 shrink-0 text-muted-foreground" />
					<div>
						<h3 className={cn("text-sm font-semibold", colors.foreground)}>
							What ships wired in PRO
						</h3>
						<ul className={cn("mt-2 list-disc space-y-1 pl-5 text-sm", colors.mutedForeground)}>
							<li>Supabase Auth (login / signup / session)</li>
							<li>Multi-tenant workspace bootstrap on signup</li>
							<li>Leads — list, create, delete via API</li>
							<li>Subscription plans — list, create via API</li>
							<li>Subscriptions list — read from database</li>
							<li>All other modules remain demo UI (copy the same pattern)</li>
						</ul>
					</div>
				</div>
				<div className="mt-4 flex flex-wrap gap-2">
					<Button variant="outline" size="sm" asChild>
						<Link href="/leads">Test Leads</Link>
					</Button>
					<Button variant="outline" size="sm" asChild>
						<Link href="/subscriptions/plans">Test Plans</Link>
					</Button>
					<Button variant="outline" size="sm" asChild>
						<a href="https://github.com/shreyvijayvargiya/crm-saas/blob/main/docs/INTEGRATION.md" target="_blank" rel="noopener noreferrer">
							<KeyRound className="h-4 w-4" />
							Integration docs
						</a>
					</Button>
				</div>
			</Card>
		</div>
	);
}
