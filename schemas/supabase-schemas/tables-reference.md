# Supabase layout (reference)

PostgreSQL tables for this CRM template, aligned with `schemas/sql-schemas/drizzle/schema.ts` and Zod `app*` payloads in `data.json`. Use **`tenant_id`** on every app table so data is isolated per customer (same intent as Firestore `tenants/{tenantId}`).

Apply migrations in order: **`01-auth.sql`** → **`02-app-tables.sql`** → **`rls-policies.sql`** → **`04-pro-client-rls.sql`** (client-side signup). Optional: **`03-pro-sample-seed.sql`** after signup.

## Auth & identity (`01-auth.sql`)

| Table | Purpose |
|-------|---------|
| `tenants` | Workspace / organization |
| `profiles` | App profile row per `auth.users` (login identity) |
| `tenant_members` | Which users belong to which tenant and their role |

Supabase Auth (`auth.users`) handles sign-up, sign-in, OAuth, and sessions. `profiles` is populated by the `handle_new_user` trigger.

## App tables by route (`02-app-tables.sql`)

| App page / `data.json` key | Tables |
|----------------------------|--------|
| Leads — `appLeads` | `pipelines`, `pipeline_stages`, `leads`, `lead_notes`, `activities` (lead) |
| CRM record detail — `appCrmRecordDetail` | `activities`, `lead_notes`, `contact_notes`, `record_files` |
| Companies — `appCompanies` | `companies` |
| Contacts — `appContacts` | `contacts`, `contact_embedded_emails` |
| Deals / Pipelines — `appDeals`, `appPipelines` | `deals`, `pipelines`, `pipeline_stages` |
| Invoices — `appInvoices` | `invoices`, `invoice_line_items` |
| Payments — `appPayments` | `payments` |
| Tasks — `appTasks` | `tasks`, `task_assignees` |
| Home / Sales — `appHome`, `appSales` | `deals`, `leads`, `companies` (aggregates) |
| Analytics — `appAnalytics` | read-only aggregates over finance + CRM tables |
| Calendar / Email — `appCalendar`, `appEmail` | `calendar_events`, `email_threads`, `email_messages` |
| Notifications / Teams — `appNotifications`, `appTeams` | `notifications`, `team_members` |
| Projects — `appProjects` | `projects` |
| Settings — `appSettings` | `profiles`, `tenants`, `tenant_members` |
| Integrations — `appIntegrations` | `integrations` |
| API keys — `appApiKeys` | `api_keys` (store **hashes** only) |
| Webhooks — `appWebhooks` | `webhooks` (store **secret hashes** only) |
| CMS — `appCms` | `blog_posts`, `blog_subscribers` |
| E-commerce — `appEcommerce` | `ecommerce_products`, `ecommerce_orders`, `ecommerce_metrics`, `ecommerce_earnings` |
| Marketing — `appMarketing` | `segments`, `campaigns`, `campaign_steps`, `marketing_forms`, `form_submissions` |
| Subscriptions — `appSubscriptions` | `subscription_plans`, `subscriptions`, `subscription_events` |
| API logs — `appApiLogs` | `api_request_logs` (reference) |
| Support — `appSupport` | `support_tickets`, `support_messages` |
| Users — `appUsers` | `tenant_members`, `profiles` |
| Roles — `appRoles` | `tenant_members.role`, permission matrix (app config) |
| Audit log — `appAuditLog` | `audit_log_entries` |
| Help — `appHelp` | `help_articles` (reference CMS) |
| Reports — `appReports` | `saved_reports`, `report_templates` |
| Activity — `appActivity` | `activities` (aggregated feed) |
| Files — `appFiles` | `record_files`, `file_folders`, storage quotas |

**`data.json`:** Top-level `app*` keys describe **API-shaped** payloads for each route; column names should align when you model rows (e.g. invoice `client` in JSON → `client_label` in SQL).

**Indexes:** Composite indexes on `(tenant_id, …)` are included for common list filters. Add more when you query by additional fields.

**RLS:** `rls-policies.sql` restricts reads/writes to rows whose `tenant_id` is in `tenant_members` for `auth.uid()`.
