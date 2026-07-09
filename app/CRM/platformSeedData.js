/** Platform / admin seed data shared by Users, Teams, Webhooks, Integrations, API, Email, etc. */

export const INITIAL_USERS = [
	{ id: "usr_001", name: "John Doe", email: "john.doe@company.com", role: "Admin", department: "Sales", status: "Active", lastActive: "2026-04-14" },
	{ id: "usr_002", name: "Sarah Chen", email: "sarah.chen@company.com", role: "Manager", department: "Sales", status: "Active", lastActive: "2026-04-14" },
	{ id: "usr_003", name: "Marcus Webb", email: "marcus@company.com", role: "Member", department: "Marketing", status: "Active", lastActive: "2026-04-13" },
	{ id: "usr_004", name: "Elena Rossi", email: "elena@company.com", role: "Member", department: "Support", status: "Active", lastActive: "2026-04-14" },
	{ id: "usr_005", name: "Alex Kim", email: "alex.kim@company.com", role: "Viewer", department: "Finance", status: "Invited", lastActive: "—" },
	{ id: "usr_006", name: "Jordan Lee", email: "jordan.lee@company.com", role: "Member", department: "Engineering", status: "Suspended", lastActive: "2026-03-28" },
];

export const INITIAL_TEAM_MEMBERS = [
	{ id: "1", name: "John Doe", email: "john@doe.com", role: "Admin", status: "Active", joinedAt: "2024-01-10", image: "/people/person-1.png" },
	{ id: "2", name: "Sarah Chen", email: "sarah.chen@company.com", role: "Member", status: "Active", joinedAt: "2024-03-22", image: "/people/person-2.png" },
	{ id: "3", name: "Marcus Webb", email: "marcus@company.com", role: "Member", status: "Invited", joinedAt: "2025-11-02", image: "/people/person-3.png" },
	{ id: "4", name: "Elena Rossi", email: "elena@company.com", role: "Viewer", status: "Active", joinedAt: "2025-01-15", image: "/people/person-4.png" },
];

export const INITIAL_WEBHOOKS = [
	{ id: "wh_001", name: "Order Created Webhook", url: "https://api.example.com/webhooks/orders", events: ["order.created", "order.updated"], createdAt: "2024-01-15", updatedAt: "2024-06-20", status: "Active", secret: "whsec_abc123xyz456def789" },
	{ id: "wh_002", name: "Payment Webhook", url: "https://payments.example.com/hooks", events: ["payment.succeeded", "payment.failed"], createdAt: "2024-02-10", updatedAt: "2024-06-18", status: "Active", secret: "whsec_def456uvw789ghi012" },
	{ id: "wh_003", name: "Customer Sync", url: "https://sync.example.com/customers", events: ["customer.created", "customer.updated", "customer.deleted"], createdAt: "2024-03-05", updatedAt: "2024-06-15", status: "Active", secret: "whsec_ghi789rst012jkl345" },
	{ id: "wh_004", name: "Invoice Webhook", url: "https://invoices.example.com/webhook", events: ["invoice.paid", "invoice.overdue"], createdAt: "2024-04-12", updatedAt: "2024-06-10", status: "Inactive", secret: "whsec_jkl012mno345pqr678" },
];

export const INITIAL_INTEGRATIONS = [
	{ id: "1", name: "Google Workspace", enabled: true, tag: "email_sync", group: "email_calendar", lastUpdated: "March 2, 2025" },
	{ id: "2", name: "Microsoft 365", enabled: true, tag: "email_calendar", group: "email_calendar", lastUpdated: "March 1, 2025" },
	{ id: "3", name: "Salesforce", enabled: true, tag: "crm", group: "crm_revenue", lastUpdated: "March 2, 2025" },
	{ id: "4", name: "HubSpot", enabled: false, tag: "crm", group: "crm_revenue", lastUpdated: "February 20, 2025" },
	{ id: "9", name: "Stripe", enabled: true, tag: "payments", group: "billing", lastUpdated: "March 2, 2025" },
	{ id: "24", name: "Zapier", enabled: true, tag: "automation", group: "automation", lastUpdated: "March 2, 2025" },
	{ id: "27", name: "Slack", enabled: true, tag: "communication", group: "productivity", lastUpdated: "March 2, 2025" },
];

export const INITIAL_API_KEYS = [
	{ id: "ak_001", name: "Production API Key", key: "sk_live_abc123xyz456def789", createdAt: "2024-01-15", updatedAt: "2024-06-20", status: "Active" },
	{ id: "ak_002", name: "Development Key", key: "sk_test_def456uvw789ghi012", createdAt: "2024-02-10", updatedAt: "2024-06-18", status: "Active" },
	{ id: "ak_004", name: "Mobile App Key", key: "sk_mobile_jkl012mno345pqr678", createdAt: "2024-04-12", updatedAt: "2024-06-10", status: "Revoked" },
];

export const INITIAL_API_LOGS = [
	{ id: "log_001", method: "GET", path: "/api/v1/leads", status: 200, latencyMs: 42, apiKey: "Production API Key", timestamp: "2026-04-14 10:42:01" },
	{ id: "log_002", method: "POST", path: "/api/v1/deals", status: 201, latencyMs: 118, apiKey: "Production API Key", timestamp: "2026-04-14 10:41:55" },
	{ id: "log_004", method: "PATCH", path: "/api/v1/invoices/inv_2408", status: 200, latencyMs: 95, apiKey: "Production API Key", timestamp: "2026-04-14 10:38:44" },
	{ id: "log_005", method: "POST", path: "/api/v1/webhooks/test", status: 500, latencyMs: 1204, apiKey: "Staging Environment", timestamp: "2026-04-14 10:35:20" },
];

export const INITIAL_NOTIFICATIONS = [
	{ id: "n1", type: "ticket", title: "New Ticket Assigned", body: "You have been assigned to ticket #1234 — Website Redesign", category: "Ticket", time: "5 minutes ago", unread: true },
	{ id: "n2", type: "team", title: "Joaquina Weisenborn", body: "Requesting access permission", category: "Team", time: "12 pm", unread: false, avatar: "/people/person-2.png", actions: true },
	{ id: "n3", type: "message", title: "New Message", body: "Sarah Johnson sent you a message about the Q2 roadmap…", category: "Message", time: "1 hour ago", unread: false },
];

export const INITIAL_EMAIL_THREADS = [
	{
		id: "t1",
		subject: "Re: Enterprise pilot timeline",
		preview: "Thanks for the updated scope — we can start the week of Apr 21…",
		from: "Sarah Chen",
		fromEmail: "sarah@acme.com",
		time: "10:42 AM",
		unread: true,
		starred: true,
		messages: [
			{ id: "m1", from: "Sarah Chen", fromEmail: "sarah@acme.com", to: "you@crm.io", time: "Apr 14, 2026 · 10:42 AM", body: "Thanks for the updated scope — we can start the week of Apr 21 if legal signs by Friday." },
		],
	},
	{
		id: "t2",
		subject: "Invoice #INV-2408 — paid",
		preview: "Payment received. Receipt attached for your records.",
		from: "billing@northwind.io",
		fromEmail: "billing@northwind.io",
		time: "Yesterday",
		unread: false,
		starred: false,
		messages: [
			{ id: "m1", from: "Northwind Billing", fromEmail: "billing@northwind.io", to: "you@crm.io", time: "Apr 13, 2026 · 4:02 PM", body: "Payment received for invoice INV-2408. Receipt attached." },
		],
	},
];

export const INITIAL_CALENDAR_EVENTS = [
	{ id: "evt_1", title: "Demo with Cloud Corp", date: "2026-04-21", time: "10:00 AM", color: "blue", type: "meeting" },
	{ id: "evt_2", title: "Q2 Pipeline review", date: "2026-04-22", time: "2:00 PM", color: "purple", type: "internal" },
	{ id: "evt_3", title: "Follow-up: Northwind", date: "2026-04-23", time: "11:30 AM", color: "green", type: "call" },
];
