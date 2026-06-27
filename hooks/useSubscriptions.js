import { useCallback, useEffect, useState } from "react";
import { SUBSCRIPTIONS } from "../app/Subscriptions/subscriptionsSeedData";
import { getSupabaseBrowserClient } from "../lib/supabase/browser";
import { fetchSubscriptions } from "../lib/supabase/pro-data";
import { canUseProSupabase, isProMode } from "../lib/config";

export function useSubscriptions() {
	const [subscriptions, setSubscriptions] = useState(SUBSCRIPTIONS);
	const [isLoading, setIsLoading] = useState(isProMode());
	const [error, setError] = useState(null);
	const [source, setSource] = useState(isProMode() ? "pro" : "demo");

	const refresh = useCallback(async () => {
		if (!canUseProSupabase()) {
			setSubscriptions(SUBSCRIPTIONS);
			setSource("demo");
			setIsLoading(false);
			return;
		}
		const supabase = getSupabaseBrowserClient();
		setIsLoading(true);
		setError(null);
		try {
			const rows = await fetchSubscriptions(supabase);
			setSubscriptions(rows.length ? rows : SUBSCRIPTIONS);
			setSource(rows.length ? "pro" : "demo-fallback");
		} catch (err) {
			setError(err.message);
			setSubscriptions(SUBSCRIPTIONS);
			setSource("demo-fallback");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		refresh();
	}, [refresh]);

	return { subscriptions, isLoading, error, source, refresh };
}
