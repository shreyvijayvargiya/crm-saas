/** Map Supabase `leads` row → UI table row shape. */
export function mapLeadRowToTable(row) {
	return {
		id: row.id,
		name: row.name,
		email: row.email,
		lastContacted: row.last_contacted_at
			? new Date(row.last_contacted_at).toLocaleDateString("en-US")
			: "—",
		image: row.image_url || "./people/person-1.png",
		company: row.source || row.title || row.email?.split("@")[1] || "—",
		phone: row.phone,
		source: row.source,
		status: row.status,
	};
}

export function mapLeadFormToInsert(form, tenantId, userId) {
	const id = `lead_${Date.now()}`;
	return {
		id,
		tenant_id: tenantId,
		owner_id: userId,
		name: form.name.trim(),
		email: form.email.trim(),
		phone: form.phone || null,
		source: form.source || "Website",
		status: form.status || "New",
		image_url: form.image || "./people/person-1.png",
		last_contacted_at: new Date().toISOString(),
	};
}

/** Map Supabase `subscription_plans` row → UI plan shape. */
export function mapPlanRowToUi(row) {
	return {
		id: row.id,
		name: row.name,
		sku: row.sku,
		tier: row.tier,
		price: Number(row.price),
		currency: row.currency || "USD",
		billingInterval: row.billing_interval,
		features: Array.isArray(row.features) ? row.features : [],
		maxSeats: row.max_seats ?? 0,
		trialDays: row.trial_days ?? 0,
		status: row.status,
		activeSubscriptions: row.active_subscriptions ?? 0,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}

export function mapPlanFormToInsert(form, tenantId) {
	const id = `plan_${Date.now()}`;
	return {
		id,
		tenant_id: tenantId,
		name: form.name.trim(),
		sku: form.sku.trim(),
		tier: form.tier || "Starter",
		price: parseFloat(form.price) || 0,
		currency: "USD",
		billing_interval: form.billingInterval || "Monthly",
		features: form.features || [],
		max_seats: form.maxSeats ?? 5,
		trial_days: form.trialDays ?? 7,
		status: form.status || "Active",
		active_subscriptions: 0,
	};
}

/** Map Supabase `subscriptions` row → UI subscription shape. */
export function mapSubscriptionRowToUi(row, planName) {
	return {
		id: row.id,
		planId: row.plan_id,
		planName: planName || row.plan_id,
		customerName: row.customer_name,
		customerEmail: row.customer_email,
		companyName: row.company_name,
		status: row.status,
		mrr: Number(row.mrr),
		billingInterval: row.billing_interval,
		currentPeriodStart: row.current_period_start,
		currentPeriodEnd: row.current_period_end,
		cancelAtPeriodEnd: row.cancel_at_period_end,
		canceledAt: row.canceled_at,
		startedAt: row.started_at,
		createdAt: row.created_at,
		updatedAt: row.updated_at,
	};
}
