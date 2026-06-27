import { useCallback, useEffect, useState } from "react";
import { INITIAL_LEADS } from "../app/CRM/leadsSeedData";
import { getSupabaseBrowserClient } from "../lib/supabase/browser";
import {
	fetchLeads,
	createLead as createLeadRow,
	deleteLead as deleteLeadRow,
} from "../lib/supabase/pro-data";
import { canUseProSupabase, isProMode } from "../lib/config";

/**
 * Leads — demo seed locally, or direct Supabase client in PRO mode.
 */
export function useLeads() {
	const [leads, setLeads] = useState(INITIAL_LEADS);
	const [isLoading, setIsLoading] = useState(isProMode());
	const [error, setError] = useState(null);
	const [source, setSource] = useState(isProMode() ? "pro" : "demo");

	const refresh = useCallback(async () => {
		if (!canUseProSupabase()) {
			setLeads(INITIAL_LEADS);
			setSource("demo");
			setIsLoading(false);
			return;
		}
		const supabase = getSupabaseBrowserClient();
		setIsLoading(true);
		setError(null);
		try {
			const rows = await fetchLeads(supabase);
			setLeads(rows);
			setSource("pro");
		} catch (err) {
			setError(err.message);
			setLeads(INITIAL_LEADS);
			setSource("demo-fallback");
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		refresh();
	}, [refresh]);

	const createLead = useCallback(async (form) => {
		if (!canUseProSupabase()) {
			const lead = {
				id: String(Date.now()),
				name: form.name.trim(),
				email: form.email.trim(),
				image: form.image || "./people/person-1.png",
				lastContacted: new Date().toLocaleDateString("en-US"),
			};
			setLeads((prev) => [...prev, lead]);
			return lead;
		}
		const supabase = getSupabaseBrowserClient();
		const lead = await createLeadRow(supabase, form);
		setLeads((prev) => [lead, ...prev]);
		return lead;
	}, []);

	const deleteLead = useCallback(async (id) => {
		if (!canUseProSupabase()) {
			setLeads((prev) => prev.filter((l) => l.id !== id));
			return;
		}
		const supabase = getSupabaseBrowserClient();
		await deleteLeadRow(supabase, id);
		setLeads((prev) => prev.filter((l) => l.id !== id));
	}, []);

	return {
		leads,
		isLoading,
		error,
		source,
		refresh,
		createLead,
		deleteLead,
	};
}
