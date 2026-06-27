import React, { useMemo, useState } from "react";
import {
	Activity as ActivityIcon,
	Mail,
	Phone,
	DollarSign,
	UserPlus,
	FileText,
	Webhook,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FormSelect from "../../lib/ui/FormSelect";

const ACTIVITY_FEED = [
	{ id: "act_001", type: "deal", title: "Deal moved to Negotiation", body: "Acme Corp — $48,000", actor: "Sarah Chen", time: "10 min ago", module: "Deals" },
	{ id: "act_002", type: "lead", title: "New lead assigned", body: "Alice Brown from Cloud Corp", actor: "System", time: "25 min ago", module: "Leads" },
	{ id: "act_003", type: "email", title: "Email sent", body: "Re: Enterprise pilot timeline", actor: "John Doe", time: "1 hr ago", module: "Email" },
	{ id: "act_004", type: "call", title: "Call logged", body: "15 min with Marcus Webb", actor: "Elena Rossi", time: "2 hr ago", module: "Contacts" },
	{ id: "act_005", type: "invoice", title: "Invoice paid", body: "INV-2408 — $12,500", actor: "System", time: "3 hr ago", module: "Finance" },
	{ id: "act_006", type: "webhook", title: "Webhook delivered", body: "lead.created → 200 OK", actor: "System", time: "4 hr ago", module: "Developer" },
	{ id: "act_007", type: "lead", title: "Lead converted", body: "Bob Martinez → Contact", actor: "John Doe", time: "Yesterday", module: "Leads" },
	{ id: "act_008", type: "deal", title: "Deal won", body: "Northwind expansion — $92,000", actor: "Sarah Chen", time: "Yesterday", module: "Deals" },
];

const TYPE_ICONS = {
	deal: DollarSign,
	lead: UserPlus,
	email: Mail,
	call: Phone,
	invoice: FileText,
	webhook: Webhook,
};

const Activity = () => {
	const [moduleFilter, setModuleFilter] = useState("All");

	const filtered = useMemo(() => {
		if (moduleFilter === "All") return ACTIVITY_FEED;
		return ACTIVITY_FEED.filter((a) => a.module === moduleFilter);
	}, [moduleFilter]);

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div className="flex flex-wrap items-end justify-between gap-3">
				<div>
					<h1 className="text-2xl font-semibold text-foreground">Activity</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Global timeline of CRM, finance, and system events.
					</p>
				</div>
				<FormSelect
					value={moduleFilter}
					onChange={(e) => setModuleFilter(e.target.value)}
					options={["All", "Deals", "Leads", "Contacts", "Email", "Finance", "Developer"]}
					className="w-40"
				/>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg">
						<ActivityIcon className="h-5 w-5" />
						Recent activity
					</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="relative space-y-0">
						{filtered.map((item, index) => {
							const Icon = TYPE_ICONS[item.type] ?? ActivityIcon;
							return (
								<li key={item.id} className="relative flex gap-4 pb-8 last:pb-0">
									{index < filtered.length - 1 && (
										<span className="absolute left-[15px] top-8 h-[calc(100%-8px)] w-px bg-border" />
									)}
									<div className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-primary">
										<Icon className="h-4 w-4" />
									</div>
									<div className="min-w-0 flex-1 pt-0.5">
										<div className="flex flex-wrap items-center gap-2">
											<p className="font-medium text-foreground">{item.title}</p>
											<Badge variant="secondary" className="text-xs">{item.module}</Badge>
										</div>
										<p className="mt-0.5 text-sm text-muted-foreground">{item.body}</p>
										<p className="mt-1 text-xs text-muted-foreground">
											{item.actor} · {item.time}
										</p>
									</div>
								</li>
							);
						})}
					</ul>
				</CardContent>
			</Card>
		</div>
	);
};

export default Activity;
