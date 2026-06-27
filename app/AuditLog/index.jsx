import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FormSelect from "../../lib/ui/FormSelect";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

const AUDIT_ENTRIES = [
	{ id: "aud_001", actor: "John Doe", action: "Updated", resource: "Deal #D-1042", module: "Deals", ip: "192.168.1.42", timestamp: "2026-04-14 10:42:01" },
	{ id: "aud_002", actor: "Sarah Chen", action: "Created", resource: "Lead — Alice Brown", module: "Leads", ip: "10.0.0.18", timestamp: "2026-04-14 10:38:22" },
	{ id: "aud_003", actor: "System", action: "Webhook delivered", resource: "payment.succeeded", module: "Webhooks", ip: "—", timestamp: "2026-04-14 10:35:10" },
	{ id: "aud_004", actor: "Elena Rossi", action: "Exported", resource: "Invoices CSV", module: "Finance", ip: "172.16.0.5", timestamp: "2026-04-14 10:20:44" },
	{ id: "aud_005", actor: "Marcus Webb", action: "Revoked", resource: "API Key ak_004", module: "Developer", ip: "203.0.113.8", timestamp: "2026-04-14 09:55:33" },
	{ id: "aud_006", actor: "John Doe", action: "Changed role", resource: "Alex Kim → Member", module: "Users", ip: "192.168.1.42", timestamp: "2026-04-14 09:12:07" },
	{ id: "aud_007", actor: "Sarah Chen", action: "Deleted", resource: "Contact #218", module: "Contacts", ip: "10.0.0.18", timestamp: "2026-04-13 16:48:19" },
	{ id: "aud_008", actor: "Jordan Lee", action: "Login", resource: "Web session", module: "Auth", ip: "198.51.100.2", timestamp: "2026-04-13 08:01:00" },
];

const AuditLog = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [moduleFilter, setModuleFilter] = useState("All");

	const modules = useMemo(
		() => ["All", ...new Set(AUDIT_ENTRIES.map((e) => e.module))],
		[]
	);

	const filtered = useMemo(() => {
		let list = [...AUDIT_ENTRIES];
		if (moduleFilter !== "All") list = list.filter((e) => e.module === moduleFilter);
		if (searchTerm.trim()) {
			const q = searchTerm.toLowerCase();
			list = list.filter(
				(e) =>
					e.actor.toLowerCase().includes(q) ||
					e.resource.toLowerCase().includes(q) ||
					e.action.toLowerCase().includes(q)
			);
		}
		return list;
	}, [searchTerm, moduleFilter]);

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div>
				<h1 className="text-2xl font-semibold text-foreground">Audit log</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Immutable record of user and system actions across your workspace.
				</p>
			</div>

			<Card>
				<CardContent className="space-y-4 p-6">
					<div className="flex flex-wrap gap-3">
						<div className="relative max-w-sm flex-1">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search actor, action, resource…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<FormSelect
							value={moduleFilter}
							onChange={(e) => setModuleFilter(e.target.value)}
							options={modules}
							className="w-40"
						/>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Timestamp</TableHead>
								<TableHead>Actor</TableHead>
								<TableHead>Action</TableHead>
								<TableHead>Resource</TableHead>
								<TableHead>Module</TableHead>
								<TableHead>IP</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.map((entry) => (
								<TableRow key={entry.id}>
									<TableCell className="whitespace-nowrap text-xs text-muted-foreground">
										{entry.timestamp}
									</TableCell>
									<TableCell className="font-medium text-foreground">{entry.actor}</TableCell>
									<TableCell>
										<Badge variant="outline">{entry.action}</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">{entry.resource}</TableCell>
									<TableCell>
										<Badge variant="secondary">{entry.module}</Badge>
									</TableCell>
									<TableCell className="font-mono text-xs text-muted-foreground">{entry.ip}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default AuditLog;
