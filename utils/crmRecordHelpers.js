import {
	companyFromEmail,
} from "@/app/CRM/leadsSeedData";
import { formatContactDate } from "@/app/CRM/contactsSeedData";
import {
	LEAD_DB,
	CONTACT_DB,
} from "@/app/CRM/recordDetailData";

const OWNERS = ["Alex Chen", "Sam Rivera", "Jordan Lee"];
const LEAD_SOURCES = ["Website", "Referral", "Outbound", "Event"];
const LEAD_STATUSES = ["New", "Qualified", "Contacted", "Nurture"];
const LIFECYCLES = ["Customer", "Prospect", "Qualified", "Nurture"];

export function findById(items, id) {
	if (!items?.length || id == null) return null;
	const s = String(id);
	return items.find((item) => String(item.id) === s) ?? null;
}

export function getLeadCompanyFromPipelines(id, leadPipelines) {
	const s = String(id);
	for (const pipeline of leadPipelines ?? []) {
		const lead = pipeline.leads?.find((l) => String(l.id) === s);
		if (lead?.company) return lead.company;
	}
	return null;
}

function buildLeadFromContext(id, leads, leadPipelines) {
	const row = findById(leads, id);
	if (!row) return null;
	const n = parseInt(String(id), 10) || 0;
	const company =
		getLeadCompanyFromPipelines(id, leadPipelines) || companyFromEmail(row.email);
	return {
		id: String(id),
		name: row.name,
		email: row.email,
		phone: `+1 (555) 010-${String(1000 + (n % 9000)).padStart(4, "0")}`,
		company,
		title: "—",
		location: "—",
		image: row.image ?? "./people/person-2.png",
		source: LEAD_SOURCES[n % LEAD_SOURCES.length],
		status: LEAD_STATUSES[n % LEAD_STATUSES.length],
		value: ((n % 7) + 1) * 4000,
		owner: OWNERS[n % OWNERS.length],
	};
}

export function buildLeadRecord(id, leads, leadPipelines) {
	const s = String(id);
	return (
		LEAD_DB[s] ||
		buildLeadFromContext(s, leads, leadPipelines) || {
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

function buildContactFromContext(id, contacts) {
	const row = findById(contacts, id);
	if (!row) return null;
	const n = parseInt(String(id), 10) || 0;
	return {
		id: String(id),
		name: row.name,
		email: row.email,
		phone: row.phone ?? "—",
		company: row.company ?? "—",
		title: "—",
		location: "—",
		image: row.image ?? "./people/person-2.png",
		owner: OWNERS[n % OWNERS.length],
		lifecycle: LIFECYCLES[n % LIFECYCLES.length],
		createdAt: row.createdAt ? formatContactDate(row.createdAt) : "—",
	};
}

export function buildContactRecord(id, contacts) {
	const s = String(id);
	return (
		CONTACT_DB[s] ||
		buildContactFromContext(s, contacts) || {
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
		}
	);
}
