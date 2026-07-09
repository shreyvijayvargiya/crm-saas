import { INITIAL_LEADS, INITIAL_PIPELINES } from "@/app/CRM/leadsSeedData";
import { INITIAL_DEALS } from "@/app/CRM/dealsSeedData";
import {
	INITIAL_PIPELINE_DEALS,
	PIPELINE_STAGES,
} from "@/app/CRM/pipelineDealsSeedData";
import { INITIAL_TASK_SECTIONS } from "@/app/CRM/tasksSeedData";
import { ACTIVITY_FEED } from "@/app/CRM/activitySeedData";
import { INITIAL_CONTACTS } from "@/app/CRM/contactsSeedData";
import { INITIAL_COMPANIES } from "@/app/CRM/companiesSeedData";
import { INITIAL_SALES } from "@/app/CRM/salesSeedData";
import { INITIAL_INVOICES } from "@/app/CRM/invoicesSeedData";
import { INITIAL_PROJECTS } from "@/app/CRM/projectsSeedData";
import { INITIAL_PRODUCTS } from "@/app/CRM/productsSeedData";
import { INITIAL_PAYMENTS } from "@/app/CRM/paymentsSeedData";
import {
	INITIAL_USERS,
	INITIAL_TEAM_MEMBERS,
	INITIAL_WEBHOOKS,
	INITIAL_INTEGRATIONS,
	INITIAL_API_KEYS,
	INITIAL_API_LOGS,
	INITIAL_NOTIFICATIONS,
	INITIAL_EMAIL_THREADS,
	INITIAL_CALENDAR_EVENTS,
} from "@/app/CRM/platformSeedData";
import { CAMPAIGNS, SEGMENTS, MARKETING_FORMS } from "@/app/Marketing/marketingSeedData";
import { SUBSCRIPTIONS, SUBSCRIPTION_PLANS } from "@/app/Subscriptions/subscriptionsSeedData";
import { ECOMMERCE_ORDERS } from "@/app/ECommerce/ecommerceSeedData";
import { SUPPORT_TICKETS } from "@/app/Support/supportSeedData";
import { INITIAL_FILES } from "@/app/Files/filesSeedData";
import { initialBlogs, initialNewsletters } from "@/app/Content Management System/cmsSeedData";

function clone(value) {
	return JSON.parse(JSON.stringify(value));
}

/** All snapshot keys the AI agent and CRM store share. */
export const CRM_SNAPSHOT_KEYS = [
	"leads",
	"leadPipelines",
	"deals",
	"pipelineStages",
	"pipelineDeals",
	"taskSections",
	"activities",
	"contacts",
	"companies",
	"sales",
	"invoices",
	"projects",
	"products",
	"payments",
	"users",
	"teamMembers",
	"campaigns",
	"segments",
	"marketingForms",
	"subscriptions",
	"subscriptionPlans",
	"ecommerceOrders",
	"supportTickets",
	"files",
	"blogs",
	"newsletters",
	"webhooks",
	"integrations",
	"apiKeys",
	"apiLogs",
	"emailThreads",
	"calendarEvents",
	"notifications",
];

/** Default CRM snapshot from all seed data (frontend-only, no database). */
export function buildDefaultCrmSnapshot() {
	return {
		leads: clone(INITIAL_LEADS),
		leadPipelines: clone(INITIAL_PIPELINES),
		deals: clone(INITIAL_DEALS),
		pipelineStages: clone(PIPELINE_STAGES),
		pipelineDeals: clone(INITIAL_PIPELINE_DEALS),
		taskSections: clone(INITIAL_TASK_SECTIONS),
		activities: clone(ACTIVITY_FEED),
		contacts: clone(INITIAL_CONTACTS),
		companies: clone(INITIAL_COMPANIES),
		sales: clone(INITIAL_SALES),
		invoices: clone(INITIAL_INVOICES),
		projects: clone(INITIAL_PROJECTS),
		products: clone(INITIAL_PRODUCTS),
		payments: clone(INITIAL_PAYMENTS),
		users: clone(INITIAL_USERS),
		teamMembers: clone(INITIAL_TEAM_MEMBERS),
		campaigns: clone(CAMPAIGNS),
		segments: clone(SEGMENTS),
		marketingForms: clone(MARKETING_FORMS),
		subscriptions: clone(SUBSCRIPTIONS),
		subscriptionPlans: clone(SUBSCRIPTION_PLANS),
		ecommerceOrders: clone(ECOMMERCE_ORDERS),
		supportTickets: clone(SUPPORT_TICKETS),
		files: clone(INITIAL_FILES),
		blogs: clone(initialBlogs),
		newsletters: clone(initialNewsletters),
		webhooks: clone(INITIAL_WEBHOOKS),
		integrations: clone(INITIAL_INTEGRATIONS),
		apiKeys: clone(INITIAL_API_KEYS),
		apiLogs: clone(INITIAL_API_LOGS),
		emailThreads: clone(INITIAL_EMAIL_THREADS),
		calendarEvents: clone(INITIAL_CALENDAR_EVENTS),
		notifications: clone(INITIAL_NOTIFICATIONS),
	};
}

export function mergeCrmSnapshot(base, patch) {
	if (!patch) return base;
	const next = { ...base };
	for (const key of CRM_SNAPSHOT_KEYS) {
		if (patch[key] != null) next[key] = clone(patch[key]);
	}
	return next;
}
