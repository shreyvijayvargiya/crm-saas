import React from "react";
import {
	BarChart3,
	CircleDollarSign,
	CreditCard,
	LayoutDashboard,
	ListTodo,
	Settings,
	Shield,
	TrendingUp,
	Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	MEMBER_PIPELINE_DEALS,
	ORG_ROLES,
	VIEWER_ANALYTICS,
} from "../saasDashboardSeedData";

const ROLE_OPTIONS = ORG_ROLES.map((r) => ({ id: r.id, label: r.label }));

function RolePicker({ activeRole, onRoleChange }) {
	return (
		<div className="flex flex-wrap gap-2">
			{ROLE_OPTIONS.map((r) => (
				<button
					key={r.id}
					type="button"
					onClick={() => onRoleChange(r.id)}
					className={cn(
						"rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
						activeRole === r.id
							? "border-primary bg-primary/10 text-primary shadow-sm"
							: "border-border text-muted-foreground hover:bg-muted"
					)}
				>
					{r.label}
				</button>
			))}
		</div>
	);
}

function OwnerAdminView() {
	return (
		<div className="grid gap-4 lg:grid-cols-3">
			<Card className="lg:col-span-2">
				<CardHeader className="pb-2">
					<div className="flex items-center gap-2">
						<CreditCard className="h-4 w-4 text-primary" />
						<CardTitle className="text-base font-semibold">Billing & seat management</CardTitle>
					</div>
					<CardDescription>Default landing for Owner / Admin roles</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-3 sm:grid-cols-3">
					{[
						{ label: "MRR", value: "$588", sub: "+8.4% MoM" },
						{ label: "Seats used", value: "11 / 15", sub: "4 available" },
						{ label: "AI spend", value: "$38.40", sub: "71% of budget" },
					].map((s) => (
						<div key={s.label} className="rounded-xl border bg-muted/20 p-4">
							<p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
								{s.label}
							</p>
							<p className="mt-1 text-xl font-bold">{s.value}</p>
							<p className="text-[11px] text-muted-foreground">{s.sub}</p>
						</div>
					))}
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="pb-2">
					<div className="flex items-center gap-2">
						<Users className="h-4 w-4 text-primary" />
						<CardTitle className="text-base font-semibold">Quick actions</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					{["Add seats", "Upgrade plan", "View invoices", "Manage SSO"].map((a) => (
						<button
							key={a}
							type="button"
							className="flex w-full items-center justify-between rounded-lg border px-3 py-2 text-sm hover:bg-muted/50"
						>
							{a}
							<span className="text-muted-foreground">→</span>
						</button>
					))}
				</CardContent>
			</Card>
			<Card className="lg:col-span-3">
				<CardHeader className="pb-2">
					<div className="flex items-center gap-2">
						<Shield className="h-4 w-4 text-primary" />
						<CardTitle className="text-base font-semibold">Org settings & audit</CardTitle>
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
						{["Danger zone", "API keys", "Webhooks", "Audit log"].map((item) => (
							<div
								key={item}
								className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-sm text-muted-foreground"
							>
								<Settings className="h-4 w-4" />
								{item}
							</div>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

function MemberView() {
	return (
		<div className="space-y-4">
			<Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/5 to-card">
				<CardHeader className="pb-2">
					<div className="flex items-center gap-2">
						<LayoutDashboard className="h-4 w-4 text-emerald-600" />
						<CardTitle className="text-base font-semibold">Pipeline-first workspace</CardTitle>
						<Badge variant="secondary" className="text-[10px]">
							Member view
						</Badge>
					</div>
					<CardDescription>
						Sales reps see deals and tasks first — billing and admin panels are hidden
					</CardDescription>
				</CardHeader>
			</Card>

			<div className="grid gap-4 lg:grid-cols-5">
				<Card className="lg:col-span-3">
					<CardHeader className="pb-2">
						<div className="flex items-center gap-2">
							<CircleDollarSign className="h-4 w-4 text-primary" />
							<CardTitle className="text-base font-semibold">My pipeline</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="bg-muted/30 hover:bg-muted/30">
									<TableHead>Deal</TableHead>
									<TableHead>Stage</TableHead>
									<TableHead className="text-right">Value</TableHead>
									<TableHead className="text-right">Probability</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{MEMBER_PIPELINE_DEALS.map((d) => (
									<TableRow key={d.id}>
										<TableCell className="font-medium">{d.name}</TableCell>
										<TableCell>
											<Badge variant="outline">{d.stage}</Badge>
										</TableCell>
										<TableCell className="text-right tabular-nums">
											${d.value.toLocaleString()}
										</TableCell>
										<TableCell className="text-right">
											<span className="font-medium text-emerald-600">{d.probability}%</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				<Card className="lg:col-span-2">
					<CardHeader className="pb-2">
						<div className="flex items-center gap-2">
							<ListTodo className="h-4 w-4 text-primary" />
							<CardTitle className="text-base font-semibold">Today's tasks</CardTitle>
						</div>
					</CardHeader>
					<CardContent className="space-y-2">
						{[
							"Follow up — Acme Enterprise",
							"Send proposal — Stellar AI",
							"Demo prep — Nova Labs",
							"Review AI draft — BrightPath",
						].map((t) => (
							<label
								key={t}
								className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted/30"
							>
								<input type="checkbox" className="rounded" />
								{t}
							</label>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

function ViewerView() {
	const a = VIEWER_ANALYTICS;
	return (
		<div className="space-y-4">
			<Card className="border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-card">
				<CardHeader className="pb-2">
					<div className="flex items-center gap-2">
						<BarChart3 className="h-4 w-4 text-blue-600" />
						<CardTitle className="text-base font-semibold">Read-only analytics</CardTitle>
						<Badge variant="secondary" className="text-[10px]">
							Viewer view
						</Badge>
					</div>
					<CardDescription>
						Viewers see reports and dashboards — no edit controls or AI run buttons
					</CardDescription>
				</CardHeader>
			</Card>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				{[
					{ label: "MRR", value: `$${a.mrr}`, icon: TrendingUp, sub: `+${a.growth}%` },
					{ label: "Active users", value: a.activeUsers, icon: Users, sub: "this week" },
					{ label: "AI runs", value: a.aiRuns, icon: BarChart3, sub: "this month" },
					{
						label: "Avg cost / run",
						value: `$${a.avgCostPerRun}`,
						icon: CircleDollarSign,
						sub: "metered",
					},
				].map(({ label, value, icon: Icon, sub }) => (
					<Card key={label}>
						<CardContent className="pt-4">
							<div className="flex items-center justify-between">
								<p className="text-xs text-muted-foreground">{label}</p>
								<Icon className="h-4 w-4 text-muted-foreground" />
							</div>
							<p className="mt-2 text-2xl font-bold tabular-nums">{value}</p>
							<p className="text-[11px] text-muted-foreground">{sub}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardHeader className="pb-2">
					<CardTitle className="text-base font-semibold">Report library</CardTitle>
					<CardDescription>Export-only — no configuration access</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-2 sm:grid-cols-3">
					{["Revenue summary", "AI usage report", "Seat utilization"].map((r) => (
						<div
							key={r}
							className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground"
						>
							{r}
							<p className="mt-1 text-[10px]">View · Export PDF</p>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
}

export default function RoleBasedViews({ activeRole, onRoleChange }) {
	return (
		<div className="space-y-4">
			<Card>
				<CardHeader className="pb-3">
					<CardTitle className="text-base font-semibold">Role-based UI preview</CardTitle>
					<CardDescription>
						HubSpot-style: same product, completely different default experiences per role
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RolePicker activeRole={activeRole} onRoleChange={onRoleChange} />
				</CardContent>
			</Card>

			{(activeRole === "owner" || activeRole === "admin") && <OwnerAdminView />}
			{activeRole === "member" && <MemberView />}
			{activeRole === "viewer" && <ViewerView />}
		</div>
	);
}
