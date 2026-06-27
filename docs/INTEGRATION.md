# PRO integration guide — shadcn CRM template

This template ships in two modes:

| Mode | Env | Behavior |
|------|-----|----------|
| **Demo** (default) | `NEXT_PUBLIC_DEMO_MODE` unset or `true` | Seed data in the browser. No database. |
| **PRO** | `NEXT_PUBLIC_DEMO_MODE=false` + Supabase URL + anon key | Auth + live Leads & Subscriptions via **client-side Supabase only**. |

> **No Next.js API routes required for PRO.** The browser talks to Supabase directly; Row Level Security (RLS) enforces tenant isolation.

---

## User flow (PRO)

```
Landing → Sign up → Workspace created (client) → Dashboard
                ↓
         Login (Supabase session)
                ↓
    /leads, /subscriptions/plans (supabase.from(...).select())
```

---

## Step 1 — Supabase project

1. Create a project at [supabase.com](https://supabase.com)
2. Run SQL migrations **in order**:
   - `schemas/supabase-schemas/01-auth.sql`
   - `schemas/supabase-schemas/02-app-tables.sql`
   - `schemas/supabase-schemas/rls-policies.sql`
   - **`schemas/supabase-schemas/04-pro-client-rls.sql`** ← required for signup workspace bootstrap
3. Optional: `03-pro-sample-seed.sql` (after you have a tenant UUID)

---

## Step 2 — Environment variables

Copy `.env.example` → `.env.local`:

```env
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

That's it — **no service role key** needed for the included PRO modules.

Restart: `npm run dev`

---

## Step 3 — Auth & workspace (client-side)

| Action | Code |
|--------|------|
| Sign up | `supabase.auth.signUp()` → `setupTenant()` in `lib/supabase/tenant.js` |
| Sign in | `supabase.auth.signInWithPassword()` |
| Session | `useAuth()` in `utils/AuthProvider.jsx` |
| Protected routes | `ProRouteGuard` redirects to `/login` |

`setupTenant()` inserts into `tenants` + `tenant_members` using the **anon key + user JWT**. This works because `04-pro-client-rls.sql` adds insert policies for authenticated users.

---

## Step 4 — Data pattern (copy for other modules)

```
Page → hook (useLeads) → lib/supabase/pro-data.js → supabase.from('table')
```

RLS on each table checks `tenant_id in (select user_tenant_ids())`.

### Wired PRO modules

| Module | Client functions (`lib/supabase/pro-data.js`) |
|--------|-----------------------------------------------|
| Leads | `fetchLeads`, `createLead`, `deleteLead` |
| Plans | `fetchSubscriptionPlans`, `createSubscriptionPlan` |
| Subscriptions | `fetchSubscriptions` |

### Add a new module

1. Table + RLS in SQL schemas
2. Mapper in `lib/api/mappers.js`
3. Functions in `lib/supabase/pro-data.js`
4. Hook with demo seed fallback (see `hooks/useLeads.js`)
5. Use hook in page

---

## Why there are no `/api/pro/*` routes

Earlier versions used Next.js API routes as a proxy. That added an extra hop without benefit because:

- Leads / plans / subscriptions already have RLS — the **user JWT** is enough
- The only special case was **creating the first tenant**, which used a service role on the server

We fixed that with `04-pro-client-rls.sql` so workspace bootstrap also runs **from the browser**. Simpler for template buyers: two env vars, one client, one mental model.

**When you *do* need server routes:** Stripe webhooks, sending email with secrets, admin tasks, or anything that must not use the anon key.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Demo banner still showing | `NEXT_PUBLIC_DEMO_MODE=false` + restart |
| Tenant insert fails | Run `04-pro-client-rls.sql` |
| Leads empty / RLS error | Complete signup (workspace must exist) |
| Email confirm required | Disable confirm in Supabase Auth settings for local dev |

---

## File map

```
lib/config.js                 Demo vs PRO
lib/supabase/browser.js       Supabase client
lib/supabase/tenant.js        setupTenant, getUserTenantId
lib/supabase/pro-data.js      Leads + subscriptions queries
hooks/useLeads.js             Demo fallback + PRO
utils/AuthProvider.jsx        Session + route guard
schemas/supabase-schemas/04-pro-client-rls.sql
```
