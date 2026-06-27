/**
 * Runtime mode for the template.
 *
 * Demo (default): seed data in the browser, no database required.
 * Pro: Supabase auth + API routes for Leads and Subscriptions.
 *
 * Set NEXT_PUBLIC_DEMO_MODE=false and Supabase env vars to enable Pro.
 */

export function isDemoMode() {
	if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_DEMO_MODE === "false") {
		return false;
	}
	return true;
}

export function isSupabaseConfigured() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
	return Boolean(url && key);
}

/** Pro = live API + Supabase (not demo UI-only mode). */
export function isProMode() {
	return !isDemoMode() && isSupabaseConfigured();
}

export function getRuntimeMode() {
	if (isProMode()) return "pro";
	if (isDemoMode()) return "demo";
	return "demo";
}

export const PUBLIC_ROUTES = [
	"/",
	"/login",
	"/signup",
	"/forgot-password",
	"/change-password",
	"/about",
	"/help",
];

export function isPublicRoute(pathname) {
	if (!pathname) return true;
	const base = pathname.split("?")[0].replace(/\/$/, "") || "/";
	return PUBLIC_ROUTES.some(
		(route) => base === route || (route !== "/" && base.startsWith(`${route}/`))
	);
}

/** True when PRO is on and the browser Supabase client is available. */
export function canUseProSupabase() {
	if (!isProMode() || typeof window === "undefined") return false;
	try {
		// Lazy import avoided — caller should use getSupabaseBrowserClient()
		return Boolean(
			process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
		);
	} catch {
		return false;
	}
}
