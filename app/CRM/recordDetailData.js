/** Mock CRM record data for lead & contact detail pages (keyed by id string). */

export const DEFAULT_TIMELINE = [
	{
		id: "t1",
		type: "note",
		title: "Record created",
		body: "Profile synced from CRM.",
		at: "Jan 8, 2026 · 9:00 AM",
		user: "System",
	},
];

export const TIMELINES = {
	"lead:101": [
		{
			id: "l1",
			type: "note",
			title: "Discovery call completed",
			body: "Discussed API limits and SSO. Positive signal on security review.",
			at: "Apr 12, 2026 · 10:20 AM",
			user: "Alex Chen",
		},
		{
			id: "l2",
			type: "email",
			title: "Email: Re: Pilot scope",
			body: "Sent revised timeline for 4-week pilot.",
			at: "Apr 10, 2026 · 4:05 PM",
			user: "You",
		},
		{
			id: "l3",
			type: "deal",
			title: "Deal updated → Qualified",
			body: "Stage moved from New after MQL score > 80.",
			at: "Apr 8, 2026 · 9:00 AM",
			user: "System",
		},
		{
			id: "l4",
			type: "call",
			title: "Outbound call logged",
			body: "Left voicemail — requested callback Thursday.",
			at: "Apr 7, 2026 · 11:15 AM",
			user: "Sam Rivera",
		},
	],
	"lead:102": [
		{
			id: "b1",
			type: "email",
			title: "Intro email opened",
			body: "Sequence step 1 — 3 opens tracked.",
			at: "Apr 14, 2026 · 8:02 AM",
			user: "System",
		},
		{
			id: "b2",
			type: "note",
			title: "LinkedIn touch",
			body: "Connection accepted; DM sent with one-pager.",
			at: "Apr 13, 2026 · 2:40 PM",
			user: "Alex Chen",
		},
	],
	"contact:201": [
		{
			id: "c1",
			type: "email",
			title: "Meeting request",
			body: "Proposed Tue 3pm for Q2 planning sync.",
			at: "Apr 11, 2026 · 3:20 PM",
			user: "You",
		},
		{
			id: "c2",
			type: "deal",
			title: "Deal linked",
			body: "Associated with Enterprise FY26 opportunity.",
			at: "Apr 9, 2026 · 10:00 AM",
			user: "System",
		},
	],
	"contact:202": [
		{
			id: "j1",
			type: "note",
			title: "Design review",
			body: "Shared mockups for onboarding flow.",
			at: "Apr 10, 2026 · 1:00 PM",
			user: "Jordan Lee",
		},
	],
};

export const NOTES_SEED = {
	"lead:101": [
		{
			id: "n1",
			body: "Champion is VP Eng; cares about SSO audit trail.",
			at: "Apr 11, 2026",
			author: "Alex Chen",
		},
		{
			id: "n2",
			body: "Competitor evaluation ends Apr 30.",
			at: "Apr 5, 2026",
			author: "You",
		},
	],
	"lead:102": [
		{
			id: "n3",
			body: "Warm intro via portfolio company.",
			at: "Apr 12, 2026",
			author: "Sam Rivera",
		},
	],
	"contact:201": [
		{
			id: "n4",
			body: "Prefers email over Slack for contract threads.",
			at: "Mar 28, 2026",
			author: "You",
		},
	],
};

export const DEALS_BY_RECORD = {
	"lead:101": [
		{
			id: "dh1",
			name: "Enterprise FY26",
			amount: 48000,
			stage: "qualified",
			closeDate: "Jun 30, 2026",
			rep: "Alex Chen",
		},
		{
			id: "dh2",
			name: "Pilot 2025",
			amount: 8000,
			stage: "won",
			closeDate: "Dec 15, 2025",
			rep: "Alex Chen",
		},
	],
	"lead:102": [
		{
			id: "dh3",
			name: "Seed expansion",
			amount: 12000,
			stage: "prospect",
			closeDate: "May 1, 2026",
			rep: "Sam Rivera",
		},
	],
	"contact:201": [
		{
			id: "dh4",
			name: "Startup Inc. renewal",
			amount: 24000,
			stage: "proposal",
			closeDate: "Jul 15, 2026",
			rep: "Jordan Lee",
		},
	],
	"contact:202": [
		{
			id: "dh5",
			name: "Agency retainer Q3",
			amount: 18000,
			stage: "prospect",
			closeDate: "Aug 1, 2026",
			rep: "Alex Chen",
		},
	],
};

export const FILES_BY_RECORD = {
	"lead:101": [
		{ id: "f1", name: "NDA_CloudCorp.pdf", size: "240 KB", type: "pdf" },
		{ id: "f2", name: "Requirements_v2.docx", size: "1.1 MB", type: "doc" },
		{ id: "f3", name: "Security_questionnaire.xlsx", size: "88 KB", type: "sheet" },
	],
	"lead:102": [{ id: "f4", name: "Intro_deck.pdf", size: "2.4 MB", type: "pdf" }],
	"contact:201": [
		{ id: "f5", name: "MSA_draft.pdf", size: "420 KB", type: "pdf" },
		{ id: "f6", name: "Logo_assets.zip", size: "3.2 MB", type: "zip" },
	],
};

export const LEAD_DB = {
	"101": {
		id: "101",
		name: "Alice Brown",
		email: "alice@company.com",
		phone: "+1 (555) 010-3200",
		company: "Cloud Corp",
		title: "VP Engineering",
		location: "Austin, TX",
		image: "./people/person-1.png",
		source: "Website",
		status: "Qualified",
		value: 48000,
		owner: "Alex Chen",
	},
	"102": {
		id: "102",
		name: "Bob Wilson",
		email: "bob@startup.io",
		phone: "+1 (555) 010-4401",
		company: "Startup.io",
		title: "Founder",
		location: "San Francisco, CA",
		image: "./people/person-4.png",
		source: "Referral",
		status: "New",
		value: 12000,
		owner: "Sam Rivera",
	},
};

export function getLeadRecord(id) {
	const s = String(id);
	return (
		LEAD_DB[s] || {
			id: s,
			name: "Lead",
			email: "lead@example.com",
			phone: "—",
			company: "—",
			title: "—",
			location: "—",
			image: "./people/person-2.png",
			source: "—",
			status: "New",
			value: 0,
			owner: "—",
		}
	);
}

/** Rich rows aligned with Contacts table (201–204) for demo detail pages. */
export const CONTACT_DB = {
	"201": {
		id: "201",
		name: "John Doe",
		email: "john@startup.com",
		phone: "123-456-7890",
		company: "Startup Inc.",
		title: "Head of Operations",
		location: "New York, NY",
		image: "./people/person-1.png",
		owner: "Jordan Lee",
		lifecycle: "Customer",
		createdAt: "Jun 25, 2024",
	},
	"202": {
		id: "202",
		name: "Jane Smith",
		email: "jane@agency.co",
		phone: "234-567-8901",
		company: "Agency Co.",
		title: "Creative Director",
		location: "Los Angeles, CA",
		image: "./people/person-2.png",
		owner: "Alex Chen",
		lifecycle: "Prospect",
		createdAt: "Jun 24, 2024",
	},
	"203": {
		id: "203",
		name: "Alice Johnson",
		email: "alice@company.com",
		phone: "345-678-9012",
		company: "Company LLC",
		title: "Procurement Lead",
		location: "Chicago, IL",
		image: "./people/person-3.png",
		owner: "Sam Rivera",
		lifecycle: "Qualified",
		createdAt: "Jun 23, 2024",
	},
	"204": {
		id: "204",
		name: "Bob Brown",
		email: "bob@startup.io",
		phone: "456-789-0123",
		company: "Startup LLC",
		title: "CEO",
		location: "San Francisco, CA",
		image: "./people/person-4.png",
		owner: "Alex Chen",
		lifecycle: "Nurture",
		createdAt: "Jun 22, 2024",
	},
};

export function getContactRecord(id) {
	const s = String(id);
	const row = CONTACT_DB[s];
	if (row) return row;
	return {
		id: s,
		name: "Contact",
		email: "—",
		phone: "—",
		company: "—",
		title: "—",
		location: "—",
		image: "./people/person-2.png",
		owner: "—",
		lifecycle: "Contact",
		createdAt: "—",
	};
}

export function getRecordBundle(kind, id) {
	const key = `${kind}:${String(id)}`;
	return {
		key,
		timeline: TIMELINES[key] || DEFAULT_TIMELINE,
		notesSeed: NOTES_SEED[key] || [],
		deals: DEALS_BY_RECORD[key] || [],
		files: FILES_BY_RECORD[key] || [],
	};
}
