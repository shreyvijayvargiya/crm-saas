export const SUPPORT_TICKETS = [
	{
		id: "tkt_001",
		subject: "Cannot sync Salesforce contacts",
		customer: "Sarah Chen",
		email: "sarah.chen@company.com",
		priority: "High",
		status: "Open",
		assignee: "John Doe",
		createdAt: "2026-04-14",
		updatedAt: "2026-04-14",
		category: "Integrations",
		description:
			"OAuth connection succeeds but contact sync stalls at 12%. We see a 429 from the middleware.",
		messages: [
			{ from: "Sarah Chen", body: "Sync has been failing since yesterday morning.", at: "2026-04-14 09:12" },
			{ from: "John Doe", body: "Checking rate limits on your integration token.", at: "2026-04-14 10:05" },
		],
	},
	{
		id: "tkt_002",
		subject: "Invoice PDF layout broken on mobile",
		customer: "Marcus Webb",
		email: "marcus@company.com",
		priority: "Medium",
		status: "In progress",
		assignee: "Elena Rossi",
		createdAt: "2026-04-13",
		updatedAt: "2026-04-14",
		category: "Billing",
		description: "PDF export cuts off line items when viewed on iOS Mail.",
		messages: [
			{ from: "Marcus Webb", body: "Attached screenshot — footer overlaps totals.", at: "2026-04-13 14:22" },
		],
	},
	{
		id: "tkt_003",
		subject: "Request: bulk import for leads CSV",
		customer: "Alice Brown",
		email: "alice@company.com",
		priority: "Low",
		status: "Resolved",
		assignee: "John Doe",
		createdAt: "2026-04-10",
		updatedAt: "2026-04-12",
		category: "Feature",
		description: "Need guidance on column mapping for 5k-row lead import.",
		messages: [
			{ from: "Alice Brown", body: "Do you support custom fields in CSV?", at: "2026-04-10 11:00" },
			{ from: "John Doe", body: "Yes — see Import docs section 3. Closing as resolved.", at: "2026-04-12 16:40" },
		],
	},
	{
		id: "tkt_004",
		subject: "Webhook delivery failures",
		customer: "Northwind LLC",
		email: "billing@northwind.io",
		priority: "High",
		status: "Open",
		assignee: "Elena Rossi",
		createdAt: "2026-04-14",
		updatedAt: "2026-04-14",
		category: "Developer",
		description: "payment.succeeded events retrying but endpoint returns 503.",
		messages: [],
	},
	{
		id: "tkt_005",
		subject: "Seat limit on Growth plan",
		customer: "Cloud Corp",
		email: "ops@cloudcorp.com",
		priority: "Medium",
		status: "Waiting",
		assignee: "John Doe",
		createdAt: "2026-04-11",
		updatedAt: "2026-04-13",
		category: "Account",
		description: "Team hit 25-seat cap — need temporary uplift for onboarding week.",
		messages: [],
	},
];

export function findSupportTicket(id) {
	return SUPPORT_TICKETS.find((t) => t.id === id) ?? null;
}

export const TICKET_STATUSES = ["Open", "In progress", "Waiting", "Resolved"];
export const TICKET_PRIORITIES = ["Low", "Medium", "High"];
