import { createClient } from "@supabase/supabase-js";

// Note: Client-side env vars MUST be prefixed with NEXT_PUBLIC_ in Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
	throw new Error(
		"Missing Supabase environment variables. Please check your .env.local file has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
	);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
