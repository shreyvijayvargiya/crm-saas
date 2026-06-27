import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useRouter } from "next/router";
import { getSupabaseBrowserClient } from "../lib/supabase/browser";
import { getUserTenantId, setupTenant } from "../lib/supabase/tenant";
import { getRuntimeMode, isProMode, isPublicRoute } from "../lib/config";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const router = useRouter();
	const [session, setSession] = useState(null);
	const [profile, setProfile] = useState(null);
	const [tenantId, setTenantId] = useState(null);
	const [hydrated, setHydrated] = useState(false);
	const [loading, setLoading] = useState(isProMode());

	const runtimeMode = getRuntimeMode();
	const proEnabled = isProMode();

	const refreshProfile = useCallback(async () => {
		if (!proEnabled) return;
		const supabase = getSupabaseBrowserClient();
		if (!supabase) return;

		try {
			const {
				data: { user },
				error,
			} = await supabase.auth.getUser();
			if (error || !user) {
				setProfile(null);
				setTenantId(null);
				return;
			}
			setProfile({
				id: user.id,
				email: user.email,
				name: user.user_metadata?.name || user.user_metadata?.full_name || null,
			});
			const tid = await getUserTenantId(supabase, user.id);
			setTenantId(tid);
		} catch {
			setProfile(null);
			setTenantId(null);
		}
	}, [proEnabled]);

	useEffect(() => {
		if (!proEnabled) {
			setHydrated(true);
			setLoading(false);
			return;
		}

		const supabase = getSupabaseBrowserClient();
		if (!supabase) {
			setHydrated(true);
			setLoading(false);
			return;
		}

		let mounted = true;

		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session);
			setLoading(false);
			setHydrated(true);
			if (data.session) refreshProfile();
		});

		const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
			setSession(nextSession);
			if (nextSession) refreshProfile();
			else {
				setProfile(null);
				setTenantId(null);
			}
		});

		return () => {
			mounted = false;
			listener.subscription.unsubscribe();
		};
	}, [proEnabled, refreshProfile]);

	const signIn = useCallback(
		async ({ email, password }) => {
			if (!proEnabled) {
				return { demo: true };
			}
			const supabase = getSupabaseBrowserClient();
			const { data, error } = await supabase.auth.signInWithPassword({ email, password });
			if (error) throw error;
			setSession(data.session);
			if (data.user) {
				try {
					await setupTenant(supabase, data.user);
				} catch {
					/* workspace may already exist */
				}
			}
			await refreshProfile();
			return data;
		},
		[proEnabled, refreshProfile]
	);

	const signUp = useCallback(
		async ({ email, password, name, company }) => {
			if (!proEnabled) {
				return { demo: true };
			}
			const supabase = getSupabaseBrowserClient();
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: { name, company },
				},
			});
			if (error) throw error;
			if (data.session && data.user) {
				setSession(data.session);
				await setupTenant(supabase, data.user, company);
				await refreshProfile();
			}
			return data;
		},
		[proEnabled, refreshProfile]
	);

	const signOut = useCallback(async () => {
		if (!proEnabled) return;
		const supabase = getSupabaseBrowserClient();
		await supabase?.auth.signOut();
		setSession(null);
		setProfile(null);
		setTenantId(null);
		router.push("/login");
	}, [proEnabled, router]);

	const value = useMemo(
		() => ({
			runtimeMode,
			proEnabled,
			isDemo: runtimeMode === "demo",
			session,
			user: profile,
			tenantId,
			hydrated,
			loading,
			signIn,
			signUp,
			signOut,
			refreshProfile,
		}),
		[
			runtimeMode,
			proEnabled,
			session,
			profile,
			tenantId,
			hydrated,
			loading,
			signIn,
			signUp,
			signOut,
			refreshProfile,
		]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}

export function ProRouteGuard({ children }) {
	const router = useRouter();
	const { proEnabled, session, hydrated, loading } = useAuth();

	useEffect(() => {
		if (!proEnabled || !hydrated || loading) return;
		if (session) return;
		if (isPublicRoute(router.pathname)) return;
		router.replace(`/login?next=${encodeURIComponent(router.asPath)}`);
	}, [proEnabled, session, hydrated, loading, router]);

	if (proEnabled && (!hydrated || loading)) {
		return (
			<div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
				Loading workspace…
			</div>
		);
	}

	if (proEnabled && !session && !isPublicRoute(router.pathname)) {
		return null;
	}

	return children;
}
