/** Mock activity/notes bundles for entity detail pages. */

import { findDealSeed } from "./dealsSeedData";
import { findCompanySeed } from "./companiesSeedData";
import { findInvoiceSeed } from "./invoicesSeedData";
import { findProjectSeed } from "./projectsSeedData";

const DEFAULT_ACTIVITY = [
	{
		id: "a1",
		type: "note",
		title: "Record created",
		body: "Profile synced from CRM.",
		at: "Jan 8, 2026 · 9:00 AM",
		user: "System",
	},
];

const ACTIVITY = {
	"deal:d1": [
		{
			id: "d1a",
			type: "note",
			title: "Discovery call logged",
			body: "VP Ops confirmed budget for Q2 expansion.",
			at: "Apr 14, 2026 · 2:30 PM",
			user: "Alex Chen",
		},
		{
			id: "d1b",
			type: "email",
			title: "Proposal sent",
			body: "Shared tiered pricing for Northwind rollout.",
			at: "Apr 12, 2026 · 11:00 AM",
			user: "You",
		},
	],
	"deal:d5": [
		{
			id: "d5a",
			type: "note",
			title: "Security review scheduled",
			body: "FinTech integration requires SOC2 attestation.",
			at: "Apr 15, 2026 · 9:15 AM",
			user: "Alex Chen",
		},
	],
	"company:stripe": [
		{
			id: "cs1",
			type: "note",
			title: "Account review",
			body: "Renewal discussion planned for next quarter.",
			at: "Apr 10, 2026 · 3:00 PM",
			user: "Charlie Smith",
		},
	],
	"company:hubspot": [
		{
			id: "ch1",
			type: "email",
			title: "Partnership intro",
			body: "Warm intro from mutual investor.",
			at: "Apr 8, 2026 · 10:30 AM",
			user: "Alice Johnson",
		},
	],
	"project:1": [
		{
			id: "p1a",
			type: "note",
			title: "Sprint kickoff",
			body: "MVP scope locked — design + API integration.",
			at: "Mar 20, 2024 · 9:00 AM",
			user: "Kevin Heal",
		},
	],
	"project:3": [
		{
			id: "p3a",
			type: "note",
			title: "Project completed",
			body: "Final handoff and app store submission done.",
			at: "Apr 1, 2024 · 4:00 PM",
			user: "Michael Chen",
		},
	],
};

const NOTES = {
	"deal:d1": [
		{
			id: "dn1",
			body: "Champion is VP Ops; prefers phased rollout.",
			at: "Apr 13, 2026",
			author: "Alex Chen",
		},
	],
	"company:stripe": [
		{
			id: "cn1",
			body: "Key contact: Charlie Smith (procurement).",
			at: "Mar 28, 2026",
			author: "You",
		},
	],
	"project:1": [
		{
			id: "pn1",
			body: "Weekly sync every Tuesday 10am.",
			at: "Mar 22, 2024",
			author: "Kevin Heal",
		},
	],
};

export function getDealRecord(id) {
	return findDealSeed(id);
}

export function getCompanyRecord(id) {
	return findCompanySeed(id);
}

export function getInvoiceRecord(id) {
	return findInvoiceSeed(id);
}

export function getProjectRecord(id) {
	return findProjectSeed(id);
}

export function getEntityBundle(kind, id) {
	const key = `${kind}:${String(id)}`;
	return {
		key,
		activity: ACTIVITY[key] || DEFAULT_ACTIVITY,
		notesSeed: NOTES[key] || [],
	};
}
