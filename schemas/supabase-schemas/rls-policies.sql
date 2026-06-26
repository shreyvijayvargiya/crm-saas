-- Row Level Security for CRM app tables
-- Run after 02-app-tables.sql.
-- Starter policies: authenticated users can read/write rows in tenants they belong to.
-- Tighten per-table (e.g. api_keys insert only for admin role) in your deployment.

-- ---------------------------------------------------------------------------
-- Enable RLS on all app tables
-- ---------------------------------------------------------------------------

alter table public.companies enable row level security;
alter table public.pipelines enable row level security;
alter table public.pipeline_stages enable row level security;
alter table public.contacts enable row level security;
alter table public.leads enable row level security;
alter table public.deals enable row level security;
alter table public.tasks enable row level security;
alter table public.task_assignees enable row level security;
alter table public.invoices enable row level security;
alter table public.invoice_line_items enable row level security;
alter table public.payments enable row level security;
alter table public.projects enable row level security;
alter table public.calendar_events enable row level security;
alter table public.email_threads enable row level security;
alter table public.email_messages enable row level security;
alter table public.notifications enable row level security;
alter table public.team_members enable row level security;
alter table public.integrations enable row level security;
alter table public.api_keys enable row level security;
alter table public.webhooks enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_subscribers enable row level security;
alter table public.activities enable row level security;
alter table public.lead_notes enable row level security;
alter table public.contact_notes enable row level security;
alter table public.record_files enable row level security;
alter table public.contact_embedded_emails enable row level security;
alter table public.ecommerce_products enable row level security;
alter table public.ecommerce_orders enable row level security;

-- ---------------------------------------------------------------------------
-- Macro: tenant-scoped CRUD for tables with tenant_id
-- ---------------------------------------------------------------------------

-- Companies
create policy "companies_tenant_select" on public.companies for select using (tenant_id in (select public.user_tenant_ids()));
create policy "companies_tenant_insert" on public.companies for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "companies_tenant_update" on public.companies for update using (tenant_id in (select public.user_tenant_ids()));
create policy "companies_tenant_delete" on public.companies for delete using (tenant_id in (select public.user_tenant_ids()));

-- Pipelines
create policy "pipelines_tenant_select" on public.pipelines for select using (tenant_id in (select public.user_tenant_ids()));
create policy "pipelines_tenant_insert" on public.pipelines for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "pipelines_tenant_update" on public.pipelines for update using (tenant_id in (select public.user_tenant_ids()));
create policy "pipelines_tenant_delete" on public.pipelines for delete using (tenant_id in (select public.user_tenant_ids()));

-- Pipeline stages
create policy "pipeline_stages_tenant_select" on public.pipeline_stages for select using (tenant_id in (select public.user_tenant_ids()));
create policy "pipeline_stages_tenant_insert" on public.pipeline_stages for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "pipeline_stages_tenant_update" on public.pipeline_stages for update using (tenant_id in (select public.user_tenant_ids()));
create policy "pipeline_stages_tenant_delete" on public.pipeline_stages for delete using (tenant_id in (select public.user_tenant_ids()));

-- Contacts
create policy "contacts_tenant_select" on public.contacts for select using (tenant_id in (select public.user_tenant_ids()));
create policy "contacts_tenant_insert" on public.contacts for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "contacts_tenant_update" on public.contacts for update using (tenant_id in (select public.user_tenant_ids()));
create policy "contacts_tenant_delete" on public.contacts for delete using (tenant_id in (select public.user_tenant_ids()));

-- Leads
create policy "leads_tenant_select" on public.leads for select using (tenant_id in (select public.user_tenant_ids()));
create policy "leads_tenant_insert" on public.leads for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "leads_tenant_update" on public.leads for update using (tenant_id in (select public.user_tenant_ids()));
create policy "leads_tenant_delete" on public.leads for delete using (tenant_id in (select public.user_tenant_ids()));

-- Deals
create policy "deals_tenant_select" on public.deals for select using (tenant_id in (select public.user_tenant_ids()));
create policy "deals_tenant_insert" on public.deals for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "deals_tenant_update" on public.deals for update using (tenant_id in (select public.user_tenant_ids()));
create policy "deals_tenant_delete" on public.deals for delete using (tenant_id in (select public.user_tenant_ids()));

-- Tasks
create policy "tasks_tenant_select" on public.tasks for select using (tenant_id in (select public.user_tenant_ids()));
create policy "tasks_tenant_insert" on public.tasks for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "tasks_tenant_update" on public.tasks for update using (tenant_id in (select public.user_tenant_ids()));
create policy "tasks_tenant_delete" on public.tasks for delete using (tenant_id in (select public.user_tenant_ids()));

-- Task assignees
create policy "task_assignees_tenant_select" on public.task_assignees for select using (tenant_id in (select public.user_tenant_ids()));
create policy "task_assignees_tenant_insert" on public.task_assignees for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "task_assignees_tenant_update" on public.task_assignees for update using (tenant_id in (select public.user_tenant_ids()));
create policy "task_assignees_tenant_delete" on public.task_assignees for delete using (tenant_id in (select public.user_tenant_ids()));

-- Invoices
create policy "invoices_tenant_select" on public.invoices for select using (tenant_id in (select public.user_tenant_ids()));
create policy "invoices_tenant_insert" on public.invoices for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "invoices_tenant_update" on public.invoices for update using (tenant_id in (select public.user_tenant_ids()));
create policy "invoices_tenant_delete" on public.invoices for delete using (tenant_id in (select public.user_tenant_ids()));

-- Invoice line items
create policy "invoice_line_items_tenant_select" on public.invoice_line_items for select using (tenant_id in (select public.user_tenant_ids()));
create policy "invoice_line_items_tenant_insert" on public.invoice_line_items for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "invoice_line_items_tenant_update" on public.invoice_line_items for update using (tenant_id in (select public.user_tenant_ids()));
create policy "invoice_line_items_tenant_delete" on public.invoice_line_items for delete using (tenant_id in (select public.user_tenant_ids()));

-- Payments
create policy "payments_tenant_select" on public.payments for select using (tenant_id in (select public.user_tenant_ids()));
create policy "payments_tenant_insert" on public.payments for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "payments_tenant_update" on public.payments for update using (tenant_id in (select public.user_tenant_ids()));
create policy "payments_tenant_delete" on public.payments for delete using (tenant_id in (select public.user_tenant_ids()));

-- Projects
create policy "projects_tenant_select" on public.projects for select using (tenant_id in (select public.user_tenant_ids()));
create policy "projects_tenant_insert" on public.projects for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "projects_tenant_update" on public.projects for update using (tenant_id in (select public.user_tenant_ids()));
create policy "projects_tenant_delete" on public.projects for delete using (tenant_id in (select public.user_tenant_ids()));

-- Calendar
create policy "calendar_events_tenant_select" on public.calendar_events for select using (tenant_id in (select public.user_tenant_ids()));
create policy "calendar_events_tenant_insert" on public.calendar_events for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "calendar_events_tenant_update" on public.calendar_events for update using (tenant_id in (select public.user_tenant_ids()));
create policy "calendar_events_tenant_delete" on public.calendar_events for delete using (tenant_id in (select public.user_tenant_ids()));

-- Email
create policy "email_threads_tenant_select" on public.email_threads for select using (tenant_id in (select public.user_tenant_ids()));
create policy "email_threads_tenant_insert" on public.email_threads for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "email_threads_tenant_update" on public.email_threads for update using (tenant_id in (select public.user_tenant_ids()));
create policy "email_threads_tenant_delete" on public.email_threads for delete using (tenant_id in (select public.user_tenant_ids()));

create policy "email_messages_tenant_select" on public.email_messages for select using (tenant_id in (select public.user_tenant_ids()));
create policy "email_messages_tenant_insert" on public.email_messages for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "email_messages_tenant_update" on public.email_messages for update using (tenant_id in (select public.user_tenant_ids()));
create policy "email_messages_tenant_delete" on public.email_messages for delete using (tenant_id in (select public.user_tenant_ids()));

-- Notifications
create policy "notifications_tenant_select" on public.notifications for select using (tenant_id in (select public.user_tenant_ids()));
create policy "notifications_tenant_insert" on public.notifications for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "notifications_tenant_update" on public.notifications for update using (tenant_id in (select public.user_tenant_ids()));
create policy "notifications_tenant_delete" on public.notifications for delete using (tenant_id in (select public.user_tenant_ids()));

-- Team members
create policy "team_members_tenant_select" on public.team_members for select using (tenant_id in (select public.user_tenant_ids()));
create policy "team_members_tenant_insert" on public.team_members for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "team_members_tenant_update" on public.team_members for update using (tenant_id in (select public.user_tenant_ids()));
create policy "team_members_tenant_delete" on public.team_members for delete using (tenant_id in (select public.user_tenant_ids()));

-- Integrations
create policy "integrations_tenant_select" on public.integrations for select using (tenant_id in (select public.user_tenant_ids()));
create policy "integrations_tenant_insert" on public.integrations for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "integrations_tenant_update" on public.integrations for update using (tenant_id in (select public.user_tenant_ids()));
create policy "integrations_tenant_delete" on public.integrations for delete using (tenant_id in (select public.user_tenant_ids()));

-- API keys — restrict writes in production to service role or admin role
create policy "api_keys_tenant_select" on public.api_keys for select using (tenant_id in (select public.user_tenant_ids()));
create policy "api_keys_tenant_insert" on public.api_keys for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "api_keys_tenant_update" on public.api_keys for update using (tenant_id in (select public.user_tenant_ids()));
create policy "api_keys_tenant_delete" on public.api_keys for delete using (tenant_id in (select public.user_tenant_ids()));

-- Webhooks
create policy "webhooks_tenant_select" on public.webhooks for select using (tenant_id in (select public.user_tenant_ids()));
create policy "webhooks_tenant_insert" on public.webhooks for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "webhooks_tenant_update" on public.webhooks for update using (tenant_id in (select public.user_tenant_ids()));
create policy "webhooks_tenant_delete" on public.webhooks for delete using (tenant_id in (select public.user_tenant_ids()));

-- CMS
create policy "blog_posts_tenant_select" on public.blog_posts for select using (tenant_id in (select public.user_tenant_ids()));
create policy "blog_posts_tenant_insert" on public.blog_posts for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "blog_posts_tenant_update" on public.blog_posts for update using (tenant_id in (select public.user_tenant_ids()));
create policy "blog_posts_tenant_delete" on public.blog_posts for delete using (tenant_id in (select public.user_tenant_ids()));

create policy "blog_subscribers_tenant_select" on public.blog_subscribers for select using (tenant_id in (select public.user_tenant_ids()));
create policy "blog_subscribers_tenant_insert" on public.blog_subscribers for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "blog_subscribers_tenant_update" on public.blog_subscribers for update using (tenant_id in (select public.user_tenant_ids()));
create policy "blog_subscribers_tenant_delete" on public.blog_subscribers for delete using (tenant_id in (select public.user_tenant_ids()));

-- Record detail
create policy "activities_tenant_select" on public.activities for select using (tenant_id in (select public.user_tenant_ids()));
create policy "activities_tenant_insert" on public.activities for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "activities_tenant_update" on public.activities for update using (tenant_id in (select public.user_tenant_ids()));
create policy "activities_tenant_delete" on public.activities for delete using (tenant_id in (select public.user_tenant_ids()));

create policy "lead_notes_tenant_select" on public.lead_notes for select using (tenant_id in (select public.user_tenant_ids()));
create policy "lead_notes_tenant_insert" on public.lead_notes for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "lead_notes_tenant_update" on public.lead_notes for update using (tenant_id in (select public.user_tenant_ids()));
create policy "lead_notes_tenant_delete" on public.lead_notes for delete using (tenant_id in (select public.user_tenant_ids()));

create policy "contact_notes_tenant_select" on public.contact_notes for select using (tenant_id in (select public.user_tenant_ids()));
create policy "contact_notes_tenant_insert" on public.contact_notes for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "contact_notes_tenant_update" on public.contact_notes for update using (tenant_id in (select public.user_tenant_ids()));
create policy "contact_notes_tenant_delete" on public.contact_notes for delete using (tenant_id in (select public.user_tenant_ids()));

create policy "record_files_tenant_select" on public.record_files for select using (tenant_id in (select public.user_tenant_ids()));
create policy "record_files_tenant_insert" on public.record_files for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "record_files_tenant_update" on public.record_files for update using (tenant_id in (select public.user_tenant_ids()));
create policy "record_files_tenant_delete" on public.record_files for delete using (tenant_id in (select public.user_tenant_ids()));

create policy "contact_embedded_emails_tenant_select" on public.contact_embedded_emails for select using (tenant_id in (select public.user_tenant_ids()));
create policy "contact_embedded_emails_tenant_insert" on public.contact_embedded_emails for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "contact_embedded_emails_tenant_update" on public.contact_embedded_emails for update using (tenant_id in (select public.user_tenant_ids()));
create policy "contact_embedded_emails_tenant_delete" on public.contact_embedded_emails for delete using (tenant_id in (select public.user_tenant_ids()));

-- E-commerce
create policy "ecommerce_products_tenant_select" on public.ecommerce_products for select using (tenant_id in (select public.user_tenant_ids()));
create policy "ecommerce_products_tenant_insert" on public.ecommerce_products for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "ecommerce_products_tenant_update" on public.ecommerce_products for update using (tenant_id in (select public.user_tenant_ids()));
create policy "ecommerce_products_tenant_delete" on public.ecommerce_products for delete using (tenant_id in (select public.user_tenant_ids()));

create policy "ecommerce_orders_tenant_select" on public.ecommerce_orders for select using (tenant_id in (select public.user_tenant_ids()));
create policy "ecommerce_orders_tenant_insert" on public.ecommerce_orders for insert with check (tenant_id in (select public.user_tenant_ids()));
create policy "ecommerce_orders_tenant_update" on public.ecommerce_orders for update using (tenant_id in (select public.user_tenant_ids()));
create policy "ecommerce_orders_tenant_delete" on public.ecommerce_orders for delete using (tenant_id in (select public.user_tenant_ids()));
