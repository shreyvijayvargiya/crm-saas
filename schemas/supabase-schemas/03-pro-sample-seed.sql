-- Optional sample data for PRO mode testing
-- Replace YOUR_TENANT_UUID with the id from public.tenants after signup
-- Run in Supabase SQL editor AFTER 01-auth, 02-app-tables, rls-policies

-- Example: find your tenant
-- select t.id, t.name from public.tenants t join public.tenant_members m on m.tenant_id = t.id;

/*
insert into public.subscription_plans (
  id, tenant_id, name, sku, tier, price, currency, billing_interval,
  features, max_seats, trial_days, status, active_subscriptions
) values
(
  'plan_starter',
  'YOUR_TENANT_UUID'::uuid,
  'Starter CRM',
  'CRM-STARTER-001',
  'Starter',
  49.00,
  'USD',
  'Monthly',
  '["Leads", "Pipelines", "Email Sync"]'::jsonb,
  5,
  7,
  'Active',
  0
);

insert into public.leads (
  id, tenant_id, name, email, source, status, image_url, last_contacted_at
) values
(
  'lead_demo_1',
  'YOUR_TENANT_UUID'::uuid,
  'Alice Brown',
  'alice@company.com',
  'Website',
  'New',
  './people/person-1.png',
  now()
);
*/
