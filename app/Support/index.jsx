import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Headphones, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { TICKET_STATUSES } from "./supportSeedData";
import { useCrmData } from "../../utils/CrmDataContext";

function priorityVariant(p) {
	if (p === "High") return "destructive";
	if (p === "Medium") return "secondary";
	return "outline";
}

function statusVariant(s) {
	if (s === "Open") return "default";
	if (s === "Resolved") return "outline";
	return "secondary";
}

const Support = () => {
	const { supportTickets } = useCrmData();
	const router = useRouter();
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");

	const filtered = useMemo(() => {
		let list = [...supportTickets];
		if (statusFilter !== "All") list = list.filter((t) => t.status === statusFilter);
		if (searchTerm.trim()) {
			const q = searchTerm.toLowerCase();
			list = list.filter(
				(t) =>
					t.subject.toLowerCase().includes(q) ||
					t.customer.toLowerCase().includes(q) ||
					t.id.toLowerCase().includes(q)
			);
		}
		return list;
	}, [searchTerm, statusFilter, supportTickets]);

	const stats = useMemo(
		() => ({
			open: supportTickets.filter((t) => t.status === "Open").length,
			inProgress: supportTickets.filter((t) => t.status === "In progress").length,
			resolved: supportTickets.filter((t) => t.status === "Resolved").length,
		}),
		[supportTickets]
	);

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-semibold text-foreground">Support</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Customer tickets — click a row to view conversation and details.
					</p>
				</div>
				<Button onClick={() => toast.info("New ticket form — wire to your helpdesk API.")}>
					<Plus className="h-4 w-4" />
					New ticket
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{[
					{ label: "Open", value: stats.open, icon: Headphones },
					{ label: "In progress", value: stats.inProgress },
					{ label: "Resolved", value: stats.resolved },
				].map(({ label, value }) => (
					<Card key={label}>
						<CardContent className="p-6">
							<p className="text-sm font-medium text-muted-foreground">{label}</p>
							<p className="text-3xl font-bold text-foreground">{value}</p>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardHeader className="pb-4">
					<CardTitle className="text-lg">Tickets</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-3">
						<div className="relative max-w-sm flex-1">
							<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search tickets…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<FormSelect
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							options={["All", ...TICKET_STATUSES]}
							className="w-40"
						/>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Subject</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Priority</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Assignee</TableHead>
								<TableHead>Updated</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.map((ticket) => (
								<TableRow
									key={ticket.id}
									className="cursor-pointer"
									onClick={() => router.push(`/support/${ticket.id}`)}
								>
									<TableCell>
										<p className="font-medium text-foreground">{ticket.subject}</p>
										<p className="text-xs text-muted-foreground">{ticket.id}</p>
									</TableCell>
									<TableCell className="text-muted-foreground">{ticket.customer}</TableCell>
									<TableCell>
										<Badge variant={priorityVariant(ticket.priority)}>{ticket.priority}</Badge>
									</TableCell>
									<TableCell>
										<Badge variant={statusVariant(ticket.status)}>{ticket.status}</Badge>
									</TableCell>
									<TableCell className="text-muted-foreground">{ticket.assignee}</TableCell>
									<TableCell className="text-muted-foreground">{ticket.updatedAt}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
};

export default Support;
