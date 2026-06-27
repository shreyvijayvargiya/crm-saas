/**
 * PRO module data access — direct Supabase client calls (RLS enforces tenant scope).
 */
import {
	mapLeadRowToTable,
	mapLeadFormToInsert,
	mapPlanRowToUi,
	mapPlanFormToInsert,
	mapSubscriptionRowToUi,
} from "../api/mappers";
import { requireTenantContext } from "./tenant";

export async function fetchLeads(supabase) {
	const { data, error } = await supabase
		.from("leads")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map(mapLeadRowToTable);
}

export async function createLead(supabase, form) {
	const { user, tenantId } = await requireTenantContext(supabase);
	const row = mapLeadFormToInsert(form, tenantId, user.id);
	const { data, error } = await supabase.from("leads").insert(row).select("*").single();
	if (error) throw error;
	return mapLeadRowToTable(data);
}

export async function deleteLead(supabase, id) {
	const { error } = await supabase.from("leads").delete().eq("id", id);
	if (error) throw error;
}

export async function fetchSubscriptionPlans(supabase) {
	const { data, error } = await supabase
		.from("subscription_plans")
		.select("*")
		.order("created_at", { ascending: false });
	if (error) throw error;
	return (data || []).map(mapPlanRowToUi);
}

export async function createSubscriptionPlan(supabase, form) {
	const { tenantId } = await requireTenantContext(supabase);
	const row = mapPlanFormToInsert(form, tenantId);
	const { data, error } = await supabase
		.from("subscription_plans")
		.insert(row)
		.select("*")
		.single();
	if (error) throw error;
	return mapPlanRowToUi(data);
}

export async function fetchSubscriptions(supabase) {
	const { data: subs, error: subsError } = await supabase
		.from("subscriptions")
		.select("*")
		.order("created_at", { ascending: false });
	if (subsError) throw subsError;

	const planIds = [...new Set((subs || []).map((s) => s.plan_id))];
	let planMap = {};
	if (planIds.length) {
		const { data: plans } = await supabase
			.from("subscription_plans")
			.select("id, name")
			.in("id", planIds);
		planMap = Object.fromEntries((plans || []).map((p) => [p.id, p.name]));
	}

	return (subs || []).map((row) => mapSubscriptionRowToUi(row, planMap[row.plan_id]));
}
