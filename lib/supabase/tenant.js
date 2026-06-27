/** Client-side tenant helpers (Supabase + RLS). */

export async function getUserTenantId(supabase, userId) {
	const { data, error } = await supabase
		.from("tenant_members")
		.select("tenant_id")
		.eq("user_id", userId)
		.limit(1)
		.maybeSingle();
	if (error) throw error;
	return data?.tenant_id ?? null;
}

/**
 * Create workspace on first signup/login. Idempotent if tenant already exists.
 * Requires `04-pro-client-rls.sql` policies on tenants + tenant_members.
 */
export async function setupTenant(supabase, user, companyName) {
	const existing = await getUserTenantId(supabase, user.id);
	if (existing) return { tenantId: existing, created: false };

	const name =
		companyName?.trim() ||
		user.user_metadata?.company ||
		`${user.email?.split("@")[0] || "My"} Workspace`;

	const slug = `${name
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "")
		.slice(0, 48)}-${Date.now().toString(36)}`;

	const { data: tenant, error: tenantError } = await supabase
		.from("tenants")
		.insert({ name, slug })
		.select("id")
		.single();

	if (tenantError) throw tenantError;

	const { error: memberError } = await supabase.from("tenant_members").insert({
		tenant_id: tenant.id,
		user_id: user.id,
		role: "owner",
	});

	if (memberError) throw memberError;

	return { tenantId: tenant.id, created: true };
}

export async function getSessionUser(supabase) {
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error) throw error;
	return user;
}

export async function requireTenantContext(supabase) {
	const user = await getSessionUser(supabase);
	if (!user) throw new Error("Not signed in");
	const tenantId = await getUserTenantId(supabase, user.id);
	if (!tenantId) {
		throw new Error("No workspace found. Sign out and sign up again.");
	}
	return { user, tenantId };
}
