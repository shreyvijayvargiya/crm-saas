import React, { useState } from "react";
import {
	Building2,
	ChevronDown,
	Mail,
	MoreHorizontal,
	Plus,
	Shield,
	UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FormModal, FormField } from "../../../lib/ui/modal";
import FormSelect from "../../../lib/ui/FormSelect";
import {
	ORGANIZATIONS,
	ORG_MEMBERS,
	ORG_ROLES,
} from "../saasDashboardSeedData";

const ROLE_BADGE = {
	owner: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
	admin: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
	member: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
	viewer: "bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30",
};

function formatLastActive(iso) {
	if (!iso) return "—";
	const d = new Date(iso);
	const diff = Date.now() - d.getTime();
	if (diff < 3600000) return "Just now";
	if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
	return d.toLocaleDateString();
}

export default function OrgWorkspacePanel({ activeOrg, onOrgChange }) {
	const [members, setMembers] = useState(ORG_MEMBERS);
	const [inviteOpen, setInviteOpen] = useState(false);
	const [inviteEmail, setInviteEmail] = useState("");
	const [inviteRole, setInviteRole] = useState("member");

	const org = ORGANIZATIONS.find((o) => o.id === activeOrg) ?? ORGANIZATIONS[0];

	const handleInvite = () => {
		if (!inviteEmail.trim()) {
			toast.error("Email is required");
			return;
		}
		setMembers((prev) => [
			...prev,
			{
				id: `mem_${Date.now()}`,
				name: inviteEmail.split("@")[0],
				email: inviteEmail,
				role: inviteRole,
				avatar: null,
				lastActive: null,
				status: "pending",
			},
		]);
		toast.success(`Invite sent to ${inviteEmail}`);
		setInviteOpen(false);
		setInviteEmail("");
		setInviteRole("member");
	};

	return (
		<div className="space-y-6">
			{/* Org switcher — Linear / Vercel style */}
			<Card>
				<CardHeader className="pb-3">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<div className="flex items-center gap-2">
							<Building2 className="h-4 w-4 text-primary" />
							<CardTitle className="text-base font-semibold">Workspace</CardTitle>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" className="h-10 gap-2 px-3">
									<span
										className={cn(
											"flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white",
											org.color
										)}
									>
										{org.initials}
									</span>
									<div className="text-left">
										<p className="text-sm font-medium leading-none">{org.name}</p>
										<p className="mt-0.5 text-[10px] text-muted-foreground">
											{org.plan} · {org.usedSeats}/{org.seats} seats
										</p>
									</div>
									<ChevronDown className="h-4 w-4 text-muted-foreground" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className="w-64">
								<DropdownMenuLabel>Switch organization</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{ORGANIZATIONS.map((o) => (
									<DropdownMenuItem
										key={o.id}
										onClick={() => onOrgChange(o.id)}
										className="gap-2"
									>
										<span
											className={cn(
												"flex h-6 w-6 items-center justify-center rounded text-[10px] font-bold text-white",
												o.color
											)}
										>
											{o.initials}
										</span>
										<div className="flex-1">
											<p className="text-sm font-medium">{o.name}</p>
											<p className="text-[10px] text-muted-foreground">
												{o.plan} · ${o.mrr}/mo
											</p>
										</div>
										{o.id === activeOrg && (
											<Badge variant="secondary" className="text-[9px]">
												Active
											</Badge>
										)}
									</DropdownMenuItem>
								))}
								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<Plus className="h-4 w-4" />
									Create organization
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<CardDescription>
						Multi-tenant workspace layer — org context drives billing, metering, and RBAC
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-3 sm:grid-cols-3">
						<div className="rounded-xl border bg-muted/30 p-4">
							<p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
								Plan
							</p>
							<p className="mt-1 text-lg font-bold">{org.plan}</p>
						</div>
						<div className="rounded-xl border bg-muted/30 p-4">
							<p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
								Seats
							</p>
							<p className="mt-1 text-lg font-bold tabular-nums">
								{org.usedSeats}
								<span className="text-sm font-normal text-muted-foreground">
									{" "}
									/ {org.seats}
								</span>
							</p>
						</div>
						<div className="rounded-xl border bg-muted/30 p-4">
							<p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
								MRR
							</p>
							<p className="mt-1 text-lg font-bold tabular-nums">${org.mrr}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Role definitions */}
			<Card>
				<CardHeader className="pb-3">
					<div className="flex items-center gap-2">
						<Shield className="h-4 w-4 text-primary" />
						<CardTitle className="text-base font-semibold">Roles & permissions</CardTitle>
					</div>
					<CardDescription>
						Meaningfully different experiences per role — not just hidden buttons
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
						{ORG_ROLES.map((role) => (
							<div
								key={role.id}
								className={cn(
									"rounded-xl border p-3",
									ROLE_BADGE[role.id]
								)}
							>
								<p className="text-sm font-semibold">{role.label}</p>
								<p className="mt-1 text-[11px] leading-relaxed opacity-90">
									{role.description}
								</p>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Members + invite */}
			<Card>
				<CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
					<div>
						<CardTitle className="text-base font-semibold">Team members</CardTitle>
						<CardDescription>
							{members.length} members · invite with role assignment
						</CardDescription>
					</div>
					<Button size="sm" onClick={() => setInviteOpen(true)}>
						<UserPlus className="h-4 w-4" />
						Invite member
					</Button>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow className="bg-muted/30 hover:bg-muted/30">
								<TableHead>Member</TableHead>
								<TableHead>Role</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Last active</TableHead>
								<TableHead className="w-10" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{members.map((m) => (
								<TableRow key={m.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											{m.avatar ? (
												<img
													src={m.avatar}
													alt=""
													className="h-8 w-8 rounded-full object-cover"
												/>
											) : (
												<span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium uppercase">
													{m.name.slice(0, 2)}
												</span>
											)}
											<div>
												<p className="text-sm font-medium">{m.name}</p>
												<p className="text-xs text-muted-foreground">{m.email}</p>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<Badge
											variant="outline"
											className={cn("capitalize", ROLE_BADGE[m.role])}
										>
											{m.role}
										</Badge>
									</TableCell>
									<TableCell>
										<Badge
											variant={m.status === "active" ? "default" : "secondary"}
											className="capitalize"
										>
											{m.status}
										</Badge>
									</TableCell>
									<TableCell className="text-sm text-muted-foreground">
										{formatLastActive(m.lastActive)}
									</TableCell>
									<TableCell>
										<Button size="icon" variant="ghost" className="h-8 w-8">
											<MoreHorizontal className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<FormModal
				open={inviteOpen}
				onClose={() => setInviteOpen(false)}
				title="Invite team member"
				subtitle="They'll receive an email with a link to join this workspace."
				onSubmit={handleInvite}
				saveLabel="Send invite"
			>
				<div className="space-y-4">
					<FormField label="Email address" required>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								type="email"
								className="pl-9"
								placeholder="colleague@company.com"
								value={inviteEmail}
								onChange={(e) => setInviteEmail(e.target.value)}
							/>
						</div>
					</FormField>
					<FormField label="Role" required>
						<FormSelect
							value={inviteRole}
							onValueChange={setInviteRole}
							options={ORG_ROLES.map((r) => ({
								value: r.id,
								label: `${r.label} — ${r.description.slice(0, 40)}…`,
							}))}
						/>
					</FormField>
				</div>
			</FormModal>
		</div>
	);
}
