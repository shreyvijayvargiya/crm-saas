import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { buildDefaultCrmSnapshot, CRM_SNAPSHOT_KEYS } from "@/lib/ai/crmSnapshot";
import { PIPELINE_STAGES } from "@/app/CRM/pipelineDealsSeedData";

function clone(value) {
	return JSON.parse(JSON.stringify(value));
}

const CrmDataContext = createContext(null);

export function CrmDataProvider({ children }) {
	const [leads, setLeads] = useState(() => clone(buildDefaultCrmSnapshot().leads));
	const [leadPipelines, setLeadPipelines] = useState(() => clone(buildDefaultCrmSnapshot().leadPipelines));
	const [deals, setDeals] = useState(() => clone(buildDefaultCrmSnapshot().deals));
	const [pipelineDeals, setPipelineDeals] = useState(() => clone(buildDefaultCrmSnapshot().pipelineDeals));
	const [taskSections, setTaskSections] = useState(() => clone(buildDefaultCrmSnapshot().taskSections));
	const [activities, setActivities] = useState(() => clone(buildDefaultCrmSnapshot().activities));
	const [contacts, setContacts] = useState(() => clone(buildDefaultCrmSnapshot().contacts));
	const [companies, setCompanies] = useState(() => clone(buildDefaultCrmSnapshot().companies));
	const [sales, setSales] = useState(() => clone(buildDefaultCrmSnapshot().sales));
	const [invoices, setInvoices] = useState(() => clone(buildDefaultCrmSnapshot().invoices));
	const [projects, setProjects] = useState(() => clone(buildDefaultCrmSnapshot().projects));
	const [products, setProducts] = useState(() => clone(buildDefaultCrmSnapshot().products));
	const [payments, setPayments] = useState(() => clone(buildDefaultCrmSnapshot().payments));
	const [users, setUsers] = useState(() => clone(buildDefaultCrmSnapshot().users));
	const [teamMembers, setTeamMembers] = useState(() => clone(buildDefaultCrmSnapshot().teamMembers));
	const [campaigns, setCampaigns] = useState(() => clone(buildDefaultCrmSnapshot().campaigns));
	const [segments, setSegments] = useState(() => clone(buildDefaultCrmSnapshot().segments));
	const [marketingForms, setMarketingForms] = useState(() => clone(buildDefaultCrmSnapshot().marketingForms));
	const [subscriptions, setSubscriptions] = useState(() => clone(buildDefaultCrmSnapshot().subscriptions));
	const [subscriptionPlans, setSubscriptionPlans] = useState(() => clone(buildDefaultCrmSnapshot().subscriptionPlans));
	const [ecommerceOrders, setEcommerceOrders] = useState(() => clone(buildDefaultCrmSnapshot().ecommerceOrders));
	const [supportTickets, setSupportTickets] = useState(() => clone(buildDefaultCrmSnapshot().supportTickets));
	const [files, setFiles] = useState(() => clone(buildDefaultCrmSnapshot().files));
	const [blogs, setBlogs] = useState(() => clone(buildDefaultCrmSnapshot().blogs));
	const [newsletters, setNewsletters] = useState(() => clone(buildDefaultCrmSnapshot().newsletters));
	const [webhooks, setWebhooks] = useState(() => clone(buildDefaultCrmSnapshot().webhooks));
	const [integrations, setIntegrations] = useState(() => clone(buildDefaultCrmSnapshot().integrations));
	const [apiKeys, setApiKeys] = useState(() => clone(buildDefaultCrmSnapshot().apiKeys));
	const [apiLogs, setApiLogs] = useState(() => clone(buildDefaultCrmSnapshot().apiLogs));
	const [emailThreads, setEmailThreads] = useState(() => clone(buildDefaultCrmSnapshot().emailThreads));
	const [calendarEvents, setCalendarEvents] = useState(() => clone(buildDefaultCrmSnapshot().calendarEvents));
	const [notifications, setNotifications] = useState(() => clone(buildDefaultCrmSnapshot().notifications));

	const stateMap = useMemo(
		() => ({
			leads: [leads, setLeads],
			leadPipelines: [leadPipelines, setLeadPipelines],
			deals: [deals, setDeals],
			pipelineDeals: [pipelineDeals, setPipelineDeals],
			taskSections: [taskSections, setTaskSections],
			activities: [activities, setActivities],
			contacts: [contacts, setContacts],
			companies: [companies, setCompanies],
			sales: [sales, setSales],
			invoices: [invoices, setInvoices],
			projects: [projects, setProjects],
			products: [products, setProducts],
			payments: [payments, setPayments],
			users: [users, setUsers],
			teamMembers: [teamMembers, setTeamMembers],
			campaigns: [campaigns, setCampaigns],
			segments: [segments, setSegments],
			marketingForms: [marketingForms, setMarketingForms],
			subscriptions: [subscriptions, setSubscriptions],
			subscriptionPlans: [subscriptionPlans, setSubscriptionPlans],
			ecommerceOrders: [ecommerceOrders, setEcommerceOrders],
			supportTickets: [supportTickets, setSupportTickets],
			files: [files, setFiles],
			blogs: [blogs, setBlogs],
			newsletters: [newsletters, setNewsletters],
			webhooks: [webhooks, setWebhooks],
			integrations: [integrations, setIntegrations],
			apiKeys: [apiKeys, setApiKeys],
			apiLogs: [apiLogs, setApiLogs],
			emailThreads: [emailThreads, setEmailThreads],
			calendarEvents: [calendarEvents, setCalendarEvents],
			notifications: [notifications, setNotifications],
		}),
		[
			leads, leadPipelines, deals, pipelineDeals, taskSections, activities,
			contacts, companies, sales, invoices, projects, products, payments,
			users, teamMembers, campaigns, segments, marketingForms,
			subscriptions, subscriptionPlans, ecommerceOrders, supportTickets,
			files, blogs, newsletters, webhooks, integrations, apiKeys, apiLogs,
			emailThreads, calendarEvents, notifications,
		]
	);

	const getSnapshot = useCallback(() => {
		const snapshot = { pipelineStages: PIPELINE_STAGES };
		for (const key of CRM_SNAPSHOT_KEYS) {
			if (key === "pipelineStages") continue;
			const entry = stateMap[key];
			if (entry) snapshot[key] = entry[0];
		}
		return snapshot;
	}, [stateMap]);

	const applySnapshot = useCallback(
		(snapshot) => {
			if (!snapshot) return;
			for (const key of CRM_SNAPSHOT_KEYS) {
				if (key === "pipelineStages") continue;
				if (!Array.isArray(snapshot[key])) continue;
				const entry = stateMap[key];
				if (entry) entry[1](clone(snapshot[key]));
			}
		},
		[stateMap]
	);

	const removeLead = useCallback((leadId) => {
		const id = String(leadId);
		setLeads((prev) => prev.filter((l) => l.id !== id));
		setLeadPipelines((prev) =>
			prev.map((p) => ({
				...p,
				leads: p.leads.filter((l) => l.id !== id),
			}))
		);
	}, []);

	const value = useMemo(
		() => ({
			leads, setLeads,
			leadPipelines, setLeadPipelines,
			deals, setDeals,
			pipelineDeals, setPipelineDeals,
			taskSections, setTaskSections,
			activities, setActivities,
			contacts, setContacts,
			companies, setCompanies,
			sales, setSales,
			invoices, setInvoices,
			projects, setProjects,
			products, setProducts,
			payments, setPayments,
			users, setUsers,
			teamMembers, setTeamMembers,
			campaigns, setCampaigns,
			segments, setSegments,
			marketingForms, setMarketingForms,
			subscriptions, setSubscriptions,
			subscriptionPlans, setSubscriptionPlans,
			ecommerceOrders, setEcommerceOrders,
			supportTickets, setSupportTickets,
			files, setFiles,
			blogs, setBlogs,
			newsletters, setNewsletters,
			webhooks, setWebhooks,
			integrations, setIntegrations,
			apiKeys, setApiKeys,
			apiLogs, setApiLogs,
			emailThreads, setEmailThreads,
			calendarEvents, setCalendarEvents,
			notifications, setNotifications,
			pipelineStages: PIPELINE_STAGES,
			getSnapshot,
			applySnapshot,
			removeLead,
		}),
		[
			leads, leadPipelines, deals, pipelineDeals, taskSections, activities,
			contacts, companies, sales, invoices, projects, products, payments,
			users, teamMembers, campaigns, segments, marketingForms,
			subscriptions, subscriptionPlans, ecommerceOrders, supportTickets,
			files, blogs, newsletters, webhooks, integrations, apiKeys, apiLogs,
			emailThreads, calendarEvents, notifications,
			getSnapshot, applySnapshot, removeLead,
		]
	);

	return (
		<CrmDataContext.Provider value={value}>{children}</CrmDataContext.Provider>
	);
}

export function useCrmData() {
	const ctx = useContext(CrmDataContext);
	if (!ctx) {
		throw new Error("useCrmData must be used within CrmDataProvider");
	}
	return ctx;
}
