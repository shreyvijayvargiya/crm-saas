export const MARKETING_METRICS = [
	{
		id: "total-sent",
		label: "Emails Sent",
		value: "24.8k",
		change: 18,
		positive: true,
		period: "Last 30 days",
		icon: "Send",
	},
	{
		id: "open-rate",
		label: "Avg. Open Rate",
		value: "32.4%",
		change: 4,
		positive: true,
		period: "Last 30 days",
		icon: "MailOpen",
	},
	{
		id: "click-rate",
		label: "Avg. Click Rate",
		value: "8.7%",
		change: 2,
		positive: true,
		period: "Last 30 days",
		icon: "MousePointerClick",
	},
	{
		id: "form-submissions",
		label: "Form Submissions",
		value: "1,284",
		change: 12,
		positive: true,
		period: "Last 30 days",
		icon: "FileInput",
	},
];

export const SEGMENTS = [
	{
		id: "seg_001",
		name: "Enterprise Leads",
		description: "Leads from companies with 500+ employees",
		entityType: "lead",
		filters: [
			{ field: "company_size", operator: "gte", value: "500" },
			{ field: "status", operator: "eq", value: "Qualified" },
		],
		contactCount: 342,
		createdAt: "2025-03-01T10:00:00Z",
		updatedAt: "2025-06-10T14:30:00Z",
	},
	{
		id: "seg_002",
		name: "Newsletter Subscribers",
		description: "Contacts who opted in to marketing emails",
		entityType: "contact",
		filters: [
			{ field: "tags", operator: "contains", value: "newsletter" },
			{ field: "email_opt_in", operator: "eq", value: "true" },
		],
		contactCount: 1847,
		createdAt: "2025-01-15T08:00:00Z",
		updatedAt: "2025-06-20T09:15:00Z",
	},
	{
		id: "seg_003",
		name: "Inactive Contacts",
		description: "No activity in the last 90 days",
		entityType: "both",
		filters: [{ field: "last_activity", operator: "lt", value: "90d" }],
		contactCount: 521,
		createdAt: "2025-02-20T12:00:00Z",
		updatedAt: "2025-06-18T16:45:00Z",
	},
	{
		id: "seg_004",
		name: "Trial Users",
		description: "Contacts on free trial plan",
		entityType: "contact",
		filters: [
			{ field: "plan", operator: "eq", value: "trial" },
			{ field: "trial_days_left", operator: "lte", value: "14" },
		],
		contactCount: 198,
		createdAt: "2025-04-05T11:00:00Z",
		updatedAt: "2025-06-22T10:00:00Z",
	},
];

export const CAMPAIGN_STEPS = {
	cmp_001: [
		{
			id: "step_001",
			campaignId: "cmp_001",
			stepOrder: 1,
			stepType: "email",
			name: "Welcome email",
			config: { subject: "Welcome to our platform", template: "welcome-v2" },
		},
		{
			id: "step_002",
			campaignId: "cmp_001",
			stepOrder: 2,
			stepType: "wait",
			name: "Wait 3 days",
			config: { delayDays: 3 },
		},
		{
			id: "step_003",
			campaignId: "cmp_001",
			stepOrder: 3,
			stepType: "email",
			name: "Feature highlights",
			config: { subject: "3 features you'll love", template: "features-v1" },
		},
	],
	cmp_002: [
		{
			id: "step_004",
			campaignId: "cmp_002",
			stepOrder: 1,
			stepType: "email",
			name: "Re-engagement offer",
			config: { subject: "We miss you — 20% off", template: "winback-v1" },
		},
	],
	cmp_003: [
		{
			id: "step_005",
			campaignId: "cmp_003",
			stepOrder: 1,
			stepType: "email",
			name: "Product launch announcement",
			config: { subject: "Introducing CRM Pro 2.0", template: "launch-v1" },
		},
		{
			id: "step_006",
			campaignId: "cmp_003",
			stepOrder: 2,
			stepType: "branch",
			name: "Opened email?",
			config: { condition: "email_opened", trueStep: 3, falseStep: 4 },
		},
		{
			id: "step_007",
			campaignId: "cmp_003",
			stepOrder: 3,
			stepType: "email",
			name: "Deep-dive demo invite",
			config: { subject: "Book your demo", template: "demo-v1" },
		},
	],
};

export const CAMPAIGNS = [
	{
		id: "cmp_001",
		name: "Onboarding Drip",
		description: "3-step welcome sequence for new trial users",
		status: "Active",
		segmentId: "seg_004",
		segmentName: "Trial Users",
		scheduledAt: null,
		startedAt: "2025-05-01T09:00:00Z",
		completedAt: null,
		sentCount: 412,
		deliveredCount: 398,
		openRate: 38.2,
		clickRate: 12.5,
		bounceRate: 1.8,
		createdAt: "2025-04-20T10:00:00Z",
		updatedAt: "2025-06-22T08:00:00Z",
	},
	{
		id: "cmp_002",
		name: "Win-back Campaign",
		description: "Re-engage inactive contacts with a special offer",
		status: "Scheduled",
		segmentId: "seg_003",
		segmentName: "Inactive Contacts",
		scheduledAt: "2025-07-01T10:00:00Z",
		startedAt: null,
		completedAt: null,
		sentCount: 0,
		deliveredCount: 0,
		openRate: null,
		clickRate: null,
		bounceRate: null,
		createdAt: "2025-06-15T14:00:00Z",
		updatedAt: "2025-06-20T11:30:00Z",
	},
	{
		id: "cmp_003",
		name: "Product Launch",
		description: "Announce CRM Pro 2.0 to enterprise leads",
		status: "Completed",
		segmentId: "seg_001",
		segmentName: "Enterprise Leads",
		scheduledAt: "2025-06-01T08:00:00Z",
		startedAt: "2025-06-01T08:00:00Z",
		completedAt: "2025-06-15T18:00:00Z",
		sentCount: 342,
		deliveredCount: 335,
		openRate: 41.6,
		clickRate: 9.3,
		bounceRate: 2.1,
		createdAt: "2025-05-10T09:00:00Z",
		updatedAt: "2025-06-15T18:00:00Z",
	},
	{
		id: "cmp_004",
		name: "Monthly Newsletter",
		description: "June product updates and tips",
		status: "Draft",
		segmentId: "seg_002",
		segmentName: "Newsletter Subscribers",
		scheduledAt: null,
		startedAt: null,
		completedAt: null,
		sentCount: 0,
		deliveredCount: 0,
		openRate: null,
		clickRate: null,
		bounceRate: null,
		createdAt: "2025-06-25T16:00:00Z",
		updatedAt: "2025-06-25T16:00:00Z",
	},
];

export const MARKETING_FORMS = [
	{
		id: "form_001",
		name: "Contact Us",
		description: "General inquiry form for the website",
		fields: [
			{ id: "f1", label: "Full Name", type: "text", required: true },
			{ id: "f2", label: "Email", type: "email", required: true },
			{ id: "f3", label: "Message", type: "textarea", required: true },
		],
		embedCode:
			'<script src="https://cdn.example.com/forms/form_001.js" async></script>\n<div id="crm-form-form_001"></div>',
		status: "Active",
		submissionCount: 847,
		createdAt: "2025-01-10T08:00:00Z",
		updatedAt: "2025-06-01T12:00:00Z",
	},
	{
		id: "form_002",
		name: "Demo Request",
		description: "Schedule a product demo",
		fields: [
			{ id: "f1", label: "Work Email", type: "email", required: true },
			{ id: "f2", label: "Company", type: "text", required: true },
			{ id: "f3", label: "Team Size", type: "select", required: false },
		],
		embedCode:
			'<script src="https://cdn.example.com/forms/form_002.js" async></script>\n<div id="crm-form-form_002"></div>',
		status: "Active",
		submissionCount: 312,
		createdAt: "2025-02-05T10:00:00Z",
		updatedAt: "2025-05-20T14:00:00Z",
	},
	{
		id: "form_003",
		name: "Newsletter Signup",
		description: "Simple email capture for blog sidebar",
		fields: [{ id: "f1", label: "Email", type: "email", required: true }],
		embedCode:
			'<script src="https://cdn.example.com/forms/form_003.js" async></script>\n<div id="crm-form-form_003"></div>',
		status: "Active",
		submissionCount: 125,
		createdAt: "2025-03-15T09:00:00Z",
		updatedAt: "2025-06-10T11:00:00Z",
	},
];

export const FORM_SUBMISSIONS = [
	{
		id: "sub_001",
		formId: "form_001",
		payload: { name: "Sarah Chen", email: "sarah@acme.io", message: "Interested in enterprise plan" },
		sourceUrl: "https://example.com/contact",
		createdAt: "2025-06-26T14:22:00Z",
	},
	{
		id: "sub_002",
		formId: "form_002",
		payload: { email: "john@startup.co", company: "Startup Co", teamSize: "10-50" },
		sourceUrl: "https://example.com/demo",
		createdAt: "2025-06-26T11:05:00Z",
	},
	{
		id: "sub_003",
		formId: "form_003",
		payload: { email: "alex@mail.com" },
		sourceUrl: "https://example.com/blog",
		createdAt: "2025-06-25T18:40:00Z",
	},
];

export function findCampaign(id) {
	return CAMPAIGNS.find((c) => c.id === id) ?? null;
}

export function findCampaignSteps(campaignId) {
	return CAMPAIGN_STEPS[campaignId] ?? [];
}

export function findSegment(id) {
	return SEGMENTS.find((s) => s.id === id) ?? null;
}

export function findForm(id) {
	return MARKETING_FORMS.find((f) => f.id === id) ?? null;
}

export const MARKETING_CHART_SERIES = [
	{ month: "Jan", sent: 3200, opens: 980, clicks: 245 },
	{ month: "Feb", sent: 4100, opens: 1280, clicks: 312 },
	{ month: "Mar", sent: 3800, opens: 1190, clicks: 298 },
	{ month: "Apr", sent: 4600, opens: 1520, clicks: 410 },
	{ month: "May", sent: 5200, opens: 1680, clicks: 445 },
	{ month: "Jun", sent: 4900, opens: 1590, clicks: 420 },
];

export const CAMPAIGN_STATUS_OPTIONS = ["All", "Draft", "Scheduled", "Active", "Paused", "Completed"];
