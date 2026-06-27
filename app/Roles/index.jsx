import React, { useState } from "react";
import { Shield, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PERMISSIONS = [
	{ id: "leads", label: "Leads" },
	{ id: "deals", label: "Deals" },
	{ id: "contacts", label: "Contacts" },
	{ id: "invoices", label: "Invoices" },
	{ id: "settings", label: "Settings" },
	{ id: "users", label: "User management" },
	{ id: "api", label: "API & webhooks" },
	{ id: "reports", label: "Reports" },
];

const INITIAL_MATRIX = {
	Admin: { leads: true, deals: true, contacts: true, invoices: true, settings: true, users: true, api: true, reports: true },
	Manager: { leads: true, deals: true, contacts: true, invoices: true, settings: false, users: false, api: false, reports: true },
	Member: { leads: true, deals: true, contacts: true, invoices: false, settings: false, users: false, api: false, reports: false },
	Viewer: { leads: true, deals: true, contacts: true, invoices: false, settings: false, users: false, api: false, reports: true },
};

const ROLES = ["Admin", "Manager", "Member", "Viewer"];

const Roles = () => {
	const [matrix, setMatrix] = useState(INITIAL_MATRIX);
	const [dirty, setDirty] = useState(false);

	const toggle = (role, permId) => {
		setMatrix((prev) => ({
			...prev,
			[role]: { ...prev[role], [permId]: !prev[role][permId] },
		}));
		setDirty(true);
	};

	const handleSave = () => {
		toast.success("Role permissions saved (demo — persist via your auth service).");
		setDirty(false);
	};

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-semibold text-foreground">Roles & permissions</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						RBAC matrix — toggle module access per role for your organization.
					</p>
				</div>
				{dirty && (
					<Button onClick={handleSave}>
						<Shield className="h-4 w-4" />
						Save changes
					</Button>
				)}
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				{ROLES.map((role) => (
					<Card key={role}>
						<CardContent className="p-6">
							<Badge variant="secondary">{role}</Badge>
							<p className="mt-2 text-2xl font-bold text-foreground">
								{Object.values(matrix[role]).filter(Boolean).length}
							</p>
							<p className="text-xs text-muted-foreground">permissions granted</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="text-lg">Permission matrix</CardTitle>
				</CardHeader>
				<CardContent className="overflow-x-auto">
					<table className="w-full min-w-[640px] text-sm">
						<thead>
							<tr className="border-b text-left">
								<th className="pb-3 pr-4 font-medium text-muted-foreground">Module</th>
								{ROLES.map((role) => (
									<th key={role} className="pb-3 px-2 text-center font-medium text-muted-foreground">
										{role}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{PERMISSIONS.map((perm) => (
								<tr key={perm.id} className="border-b last:border-0">
									<td className="py-3 pr-4 font-medium text-foreground">{perm.label}</td>
									{ROLES.map((role) => {
										const allowed = matrix[role][perm.id];
										return (
											<td key={role} className="px-2 py-3 text-center">
												<button
													type="button"
													onClick={() => toggle(role, perm.id)}
													className={cn(
														"inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
														allowed
															? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
															: "border-border bg-muted/50 text-muted-foreground hover:bg-muted"
													)}
													aria-label={`${role} ${perm.label} ${allowed ? "allowed" : "denied"}`}
												>
													{allowed ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
												</button>
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</CardContent>
			</Card>
		</div>
	);
};

export default Roles;
