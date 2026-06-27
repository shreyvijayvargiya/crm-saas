import React, { useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import FormSelect from "../../lib/ui/FormSelect";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

const INITIAL_LOGS = [
	{ id: "log_001", method: "GET", path: "/api/v1/leads", status: 200, latencyMs: 42, apiKey: "Production API Key", timestamp: "2026-04-14 10:42:01" },
	{ id: "log_002", method: "POST", path: "/api/v1/deals", status: 201, latencyMs: 118, apiKey: "Production API Key", timestamp: "2026-04-14 10:41:55" },
	{ id: "log_003", method: "GET", path: "/api/v1/contacts/205", status: 404, latencyMs: 28, apiKey: "Development Key", timestamp: "2026-04-14 10:40:12" },
	{ id: "log_004", method: "PATCH", path: "/api/v1/invoices/inv_2408", status: 200, latencyMs: 95, apiKey: "Production API Key", timestamp: "2026-04-14 10:38:44" },
	{ id: "log_005", method: "POST", path: "/api/v1/webhooks/test", status: 500, latencyMs: 1204, apiKey: "Staging Environment", timestamp: "2026-04-14 10:35:20" },
	{ id: "log_006", method: "DELETE", path: "/api/v1/api-keys/ak_004", status: 204, latencyMs: 67, apiKey: "Production API Key", timestamp: "2026-04-14 10:32:08" },
	{ id: "log_007", method: "GET", path: "/api/v1/analytics/revenue", status: 200, latencyMs: 156, apiKey: "Mobile App Key", timestamp: "2026-04-14 10:28:33" },
	{ id: "log_008", method: "POST", path: "/api/v1/leads", status: 422, latencyMs: 34, apiKey: "Development Key", timestamp: "2026-04-14 10:25:17" },
];

function statusVariant(status) {
	if (status >= 500) return "destructive";
	if (status >= 400) return "secondary";
	return "default";
}

function methodColor(method) {
	const map = { GET: "text-blue-600", POST: "text-emerald-600", PATCH: "text-amber-600", DELETE: "text-rose-600" };
	return map[method] ?? "text-foreground";
}

const ApiLogs = () => {
	const { colors } = useTheme();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");

	const filtered = useMemo(() => {
		let list = [...INITIAL_LOGS];
		if (statusFilter === "2xx") list = list.filter((l) => l.status >= 200 && l.status < 300);
		else if (statusFilter === "4xx") list = list.filter((l) => l.status >= 400 && l.status < 500);
		else if (statusFilter === "5xx") list = list.filter((l) => l.status >= 500);
		if (searchTerm.trim()) {
			const q = searchTerm.toLowerCase();
			list = list.filter(
				(l) =>
					l.path.toLowerCase().includes(q) ||
					l.apiKey.toLowerCase().includes(q) ||
					l.method.toLowerCase().includes(q)
			);
		}
		return list;
	}, [searchTerm, statusFilter]);

	const stats = useMemo(() => {
		const errors = INITIAL_LOGS.filter((l) => l.status >= 400).length;
		const avgLatency = Math.round(
			INITIAL_LOGS.reduce((s, l) => s + l.latencyMs, 0) / INITIAL_LOGS.length
		);
		return { total: INITIAL_LOGS.length, errors, avgLatency };
	}, []);

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div>
				<h1 className="text-2xl font-semibold text-foreground">API Logs</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Request history for your API keys — filter by status, path, or key name.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{[
					{ label: "Requests (24h)", value: stats.total, hint: "Sample window" },
					{ label: "Error rate", value: `${Math.round((stats.errors / stats.total) * 100)}%`, hint: `${stats.errors} failed` },
					{ label: "Avg latency", value: `${stats.avgLatency}ms`, hint: "P50 approximate" },
				].map(({ label, value, hint }) => (
					<Card key={label}>
						<CardContent className="p-6">
							<p className="text-sm font-medium text-muted-foreground">{label}</p>
							<p className="text-3xl font-bold text-foreground">{value}</p>
							<p className="mt-1 text-xs text-muted-foreground">{hint}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardContent className="space-y-4 p-6">
					<div className="flex flex-wrap gap-3">
						<div className="relative max-w-sm flex-1">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search path or API key…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<div className="flex items-center gap-2">
							<Filter className="h-4 w-4 text-muted-foreground" />
							<FormSelect
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								options={["All", "2xx", "4xx", "5xx"]}
								className="w-32"
							/>
						</div>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Time</TableHead>
								<TableHead>Method</TableHead>
								<TableHead>Path</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Latency</TableHead>
								<TableHead>API key</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
										No logs match your filters
									</TableCell>
								</TableRow>
							) : (
								filtered.map((log) => (
									<TableRow key={log.id}>
										<TableCell className="whitespace-nowrap text-xs text-muted-foreground">
											{log.timestamp}
										</TableCell>
										<TableCell>
											<span className={`font-mono text-xs font-semibold ${methodColor(log.method)}`}>
												{log.method}
											</span>
										</TableCell>
										<TableCell className="font-mono text-xs">{log.path}</TableCell>
										<TableCell>
											<Badge variant={statusVariant(log.status)}>{log.status}</Badge>
										</TableCell>
										<TableCell className="tabular-nums text-muted-foreground">
											{log.latencyMs}ms
										</TableCell>
										<TableCell className="text-sm text-muted-foreground">{log.apiKey}</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default ApiLogs;
