import { createClient } from "@supabase/supabase-js";
import { isSupabaseConfigured } from "../config";

let browserClient;

export function getSupabaseBrowserClient() {
	if (!isSupabaseConfigured()) return null;
	if (typeof window === "undefined") return null;
	if (!browserClient) {
		browserClient = createClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
			{
				auth: {
					persistSession: true,
					autoRefreshToken: true,
					detectSessionInUrl: true,
				},
			}
		);
	}
	return browserClient;
}
