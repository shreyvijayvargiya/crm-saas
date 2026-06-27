import { useCallback, useEffect, useState } from "react";
import { SUBSCRIPTION_PLANS } from "../app/Subscriptions/subscriptionsSeedData";
import { getSupabaseBrowserClient } from "../lib/supabase/browser";
import {
	fetchSubscriptionPlans,
	createSubscriptionPlan,
} from "../lib/supabase/pro-data";
import { canUseProSupabase, isProMode } from "../lib/config";

export function useSubscriptionPlans() {
	const [plans, setPlans] = useState(SUBSCRIPTION_PLANS);
	const [isLoading, setIsLoading] = useState(isProMode());
	const [error, setError] = useState(null);
	const [source, setSource] = useState(isProMode() ? "pro" : "demo");

	const refresh = useCallback(async () => {
		if (!canUseProSupabase()) {
			setPlans(SUBSCRIPTION_PLANS);
			setSource("demo");
			setIsLoading(false);
			return;
		}
		const supabase = getSupabaseBrowserClient();
		setIsLoading(true);
		setError(null);
		try {
			const rows = await fetchSubscriptionPlans(supabase);
			setPlans(rows.length ? rows : SUBSCRIPTION_PLANS);
			setSource(rows.length ? "pro" : "demo-fallback");
		} catch (err) {
			setError(err.message);
			setPlans(SUBSCRIPTION_PLANS);
			setSource("demo-fallback");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		refresh();
	}, [refresh]);

	const createPlan = useCallback(async (form) => {
		if (!canUseProSupabase()) {
			const created = {
				id: `plan_${Date.now()}`,
				name: form.name,
				sku: form.sku,
				tier: form.tier,
				price: parseFloat(form.price) || 0,
				currency: "USD",
				billingInterval: form.billingInterval,
				features: [],
				maxSeats: 5,
				trialDays: 7,
				status: form.status,
				activeSubscriptions: 0,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			setPlans((prev) => [created, ...prev]);
			return created;
		}
		const supabase = getSupabaseBrowserClient();
		const plan = await createSubscriptionPlan(supabase, form);
		setPlans((prev) => [plan, ...prev]);
		return plan;
	}, []);

	return { plans, setPlans, isLoading, error, source, refresh, createPlan };
}
