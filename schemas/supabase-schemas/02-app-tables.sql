-- CRM app tables (all pages)
-- Run after 01-auth.sql. Mirrors schemas/sql-schemas/drizzle/schema.ts with tenant_id on every table.

-- ---------------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------------

do $$ begin
  create type public.deal_stage as enum ('prospect', 'qualified', 'proposal', 'won', 'lost');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.invoice_status as enum ('Paid', 'Pending', 'Overdue');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.payment_status as enum ('Completed', 'Pending', 'Failed');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.task_progress as enum ('NotStarted', 'InProgress', 'Completed');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.task_priority as enum ('Low', 'Medium', 'High');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.team_member_status as enum ('Active', 'Invited', 'Inactive');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.blog_post_status as enum ('Published', 'Draft');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.api_key_status as enum ('Active', 'Revoked');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.webhook_status as enum ('Active', 'Inactive');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.activity_type as enum ('note', 'email', 'deal', 'call');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.notification_category as enum ('Ticket', 'Team', 'Message');
exception when duplicate_object then null;
end $$;

-- ---------------------------------------------------------------------------
-- CRM core
-- ---------------------------------------------------------------------------

create table if not exists public.companies (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  industry text,
  rating numeric(3, 1),
  location text,
  logo_url text,
  owner_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists companies_tenant_id_idx on public.companies (tenant_id);
create index if not exists companies_owner_id_idx on public.companies (owner_id);

create table if not exists public.pipelines (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null default 'Default',
  created_at timestamptz not null default now()
);

create index if not exists pipelines_tenant_id_idx on public.pipelines (tenant_id);

create table if not exists public.pipeline_stages (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  pipeline_id varchar(32) not null references public.pipelines (id) on delete cascade,
  slug text not null,
  label text not null,
  sort_order integer not null default 0,
  unique (pipeline_id, slug)
);

create index if not exists pipeline_stages_tenant_id_idx on public.pipeline_stages (tenant_id);
create index if not exists pipeline_stages_pipeline_id_idx on public.pipeline_stages (pipeline_id);

create table if not exists public.contacts (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  company_id varchar(32) references public.companies (id) on delete set null,
  owner_id uuid references public.profiles (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  title text,
  lifecycle text,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists contacts_tenant_id_idx on public.contacts (tenant_id);
create index if not exists contacts_company_id_idx on public.contacts (company_id);
create index if not exists contacts_email_idx on public.contacts (email);

create table if not exists public.leads (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  company_id varchar(32) references public.companies (id) on delete set null,
  owner_id uuid references public.profiles (id) on delete set null,
  pipeline_stage_id varchar(32) references public.pipeline_stages (id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  title text,
  source text,
  status text,
  estimated_value numeric(14, 2),
  image_url text,
  last_contacted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_tenant_id_idx on public.leads (tenant_id);
create index if not exists leads_company_id_idx on public.leads (company_id);
create index if not exists leads_pipeline_stage_id_idx on public.leads (pipeline_stage_id);
create index if not exists leads_email_idx on public.leads (email);

create table if not exists public.deals (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  company_id varchar(32) references public.companies (id) on delete set null,
  lead_id varchar(32) references public.leads (id) on delete set null,
  rep_id uuid references public.profiles (id) on delete set null,
  name text not null,
  value numeric(14, 2) not null,
  stage public.deal_stage not null,
  close_date timestamptz,
  priority text,
  tag text,
  last_activity text,
  days_in_stage integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists deals_tenant_id_idx on public.deals (tenant_id);
create index if not exists deals_company_id_idx on public.deals (company_id);
create index if not exists deals_stage_idx on public.deals (stage);
create index if not exists deals_lead_id_idx on public.deals (lead_id);

-- ---------------------------------------------------------------------------
-- Tasks
-- ---------------------------------------------------------------------------

create table if not exists public.tasks (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  section_slug text not null,
  section_label text,
  title text not null,
  description text,
  progress public.task_progress,
  priority public.task_priority,
  progress_percent integer not null default 0,
  icon text,
  attachments integer not null default 0,
  comments_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists tasks_tenant_id_idx on public.tasks (tenant_id);

create table if not exists public.task_assignees (
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  task_id varchar(32) not null references public.tasks (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  primary key (task_id, user_id)
);

create index if not exists task_assignees_tenant_id_idx on public.task_assignees (tenant_id);

-- ---------------------------------------------------------------------------
-- Finance — invoices & payments
-- ---------------------------------------------------------------------------

create table if not exists public.invoices (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  invoice_number text not null,
  client_label text not null,
  client_email text,
  client_id varchar(32),
  amount numeric(14, 2) not null,
  status public.invoice_status not null,
  issue_date timestamptz not null,
  due_date timestamptz not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, invoice_number)
);

create index if not exists invoices_tenant_id_idx on public.invoices (tenant_id);
create index if not exists invoices_status_idx on public.invoices (status);

create table if not exists public.invoice_line_items (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  invoice_id varchar(32) not null references public.invoices (id) on delete cascade,
  name text not null,
  quantity integer not null default 1,
  price numeric(14, 2) not null
);

create index if not exists invoice_line_items_tenant_id_idx on public.invoice_line_items (tenant_id);
create index if not exists invoice_line_items_invoice_id_idx on public.invoice_line_items (invoice_id);

create table if not exists public.payments (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  transaction_id text not null,
  invoice_id varchar(32) references public.invoices (id) on delete set null,
  amount numeric(14, 2) not null,
  currency text not null default 'USD',
  status public.payment_status not null,
  payment_method text not null,
  customer_label text not null,
  customer_email text not null,
  description text,
  fee numeric(14, 2),
  net_amount numeric(14, 2),
  occurred_at timestamptz not null,
  occurred_time text,
  created_at timestamptz not null default now(),
  unique (tenant_id, transaction_id)
);

create index if not exists payments_tenant_id_idx on public.payments (tenant_id);
create index if not exists payments_invoice_id_idx on public.payments (invoice_id);
create index if not exists payments_status_idx on public.payments (status);

-- ---------------------------------------------------------------------------
-- Ops / misc pages
-- ---------------------------------------------------------------------------

create table if not exists public.projects (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  project_name text not null,
  client_name text not null,
  client_avatar_color text,
  start_date timestamptz,
  deadline timestamptz,
  status text,
  progress integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_tenant_id_idx on public.projects (tenant_id);

create table if not exists public.calendar_events (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  title text not null,
  time_label text,
  color text,
  starts_at timestamptz,
  day_of_month integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists calendar_events_tenant_id_idx on public.calendar_events (tenant_id);

create table if not exists public.email_threads (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  subject text not null,
  preview text,
  from_name text not null,
  from_email text not null,
  last_time text,
  unread boolean not null default true,
  starred boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists email_threads_tenant_id_idx on public.email_threads (tenant_id);

create table if not exists public.email_messages (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  thread_id varchar(32) not null references public.email_threads (id) on delete cascade,
  from_name text not null,
  from_email text not null,
  to_address text,
  sent_at_label text,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists email_messages_tenant_id_idx on public.email_messages (tenant_id);
create index if not exists email_messages_thread_id_idx on public.email_messages (thread_id);

create table if not exists public.notifications (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  user_id uuid references public.profiles (id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  category public.notification_category not null,
  time_label text,
  unread boolean not null default true,
  avatar_url text,
  has_actions boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists notifications_tenant_id_idx on public.notifications (tenant_id);
create index if not exists notifications_user_id_idx on public.notifications (user_id);

create table if not exists public.team_members (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  email text not null,
  role text not null,
  status public.team_member_status not null default 'Active',
  joined_at timestamptz,
  image_url text,
  unique (tenant_id, email)
);

create index if not exists team_members_tenant_id_idx on public.team_members (tenant_id);

-- ---------------------------------------------------------------------------
-- Integrations, API keys, webhooks
-- ---------------------------------------------------------------------------

create table if not exists public.integrations (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  enabled boolean not null default false,
  tag text,
  last_updated timestamptz,
  created_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create index if not exists integrations_tenant_id_idx on public.integrations (tenant_id);

create table if not exists public.api_keys (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  key_hash text,
  status public.api_key_status not null default 'Active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists api_keys_tenant_id_idx on public.api_keys (tenant_id);
create index if not exists api_keys_status_idx on public.api_keys (status);

create table if not exists public.webhooks (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  url text not null,
  events jsonb not null default '[]'::jsonb,
  secret_hash text,
  status public.webhook_status not null default 'Active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists webhooks_tenant_id_idx on public.webhooks (tenant_id);

-- ---------------------------------------------------------------------------
-- CMS
-- ---------------------------------------------------------------------------

create table if not exists public.blog_posts (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  title text not null,
  author_name text not null,
  author_avatar text,
  category text,
  status public.blog_post_status not null default 'Draft',
  publish_date timestamptz,
  views integer not null default 0,
  likes integer not null default 0,
  content text not null,
  tags text[] not null default '{}',
  featured_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_tenant_id_idx on public.blog_posts (tenant_id);
create index if not exists blog_posts_status_idx on public.blog_posts (status);

create table if not exists public.blog_subscribers (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  email text not null,
  name text,
  subscribed_date timestamptz,
  status text,
  avatar_color text,
  unique (tenant_id, email)
);

create index if not exists blog_subscribers_tenant_id_idx on public.blog_subscribers (tenant_id);

-- ---------------------------------------------------------------------------
-- Record detail (leads / contacts)
-- ---------------------------------------------------------------------------

create table if not exists public.activities (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  type public.activity_type not null,
  title text not null,
  body text not null,
  occurred_at timestamptz,
  actor_label text,
  lead_id varchar(32) references public.leads (id) on delete cascade,
  contact_id varchar(32) references public.contacts (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists activities_tenant_id_idx on public.activities (tenant_id);
create index if not exists activities_lead_id_idx on public.activities (lead_id);
create index if not exists activities_contact_id_idx on public.activities (contact_id);

create table if not exists public.lead_notes (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  lead_id varchar(32) not null references public.leads (id) on delete cascade,
  body text not null,
  authored_at timestamptz,
  author text
);

create index if not exists lead_notes_tenant_id_idx on public.lead_notes (tenant_id);
create index if not exists lead_notes_lead_id_idx on public.lead_notes (lead_id);

create table if not exists public.contact_notes (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  contact_id varchar(32) not null references public.contacts (id) on delete cascade,
  body text not null,
  authored_at timestamptz,
  author text
);

create index if not exists contact_notes_tenant_id_idx on public.contact_notes (tenant_id);
create index if not exists contact_notes_contact_id_idx on public.contact_notes (contact_id);

create table if not exists public.record_files (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  size_label text,
  mime_family text,
  lead_id varchar(32) references public.leads (id) on delete cascade,
  contact_id varchar(32) references public.contacts (id) on delete cascade
);

create index if not exists record_files_tenant_id_idx on public.record_files (tenant_id);
create index if not exists record_files_lead_id_idx on public.record_files (lead_id);
create index if not exists record_files_contact_id_idx on public.record_files (contact_id);

create table if not exists public.contact_embedded_emails (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  contact_id varchar(32) not null references public.contacts (id) on delete cascade,
  subject text,
  body text,
  sent_at timestamptz
);

create index if not exists contact_embedded_emails_tenant_id_idx on public.contact_embedded_emails (tenant_id);
create index if not exists contact_embedded_emails_contact_id_idx on public.contact_embedded_emails (contact_id);

-- E-commerce (`appEcommerce`)
create type public.ecommerce_product_category as enum (
  'Smartphone', 'Laptop', 'Headphone', 'Smartwatch'
);
create type public.ecommerce_product_status as enum ('Publish', 'Inactive');
create type public.ecommerce_order_tab as enum ('New', 'Pending', 'Shipping');

create table if not exists public.ecommerce_products (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  brand text not null,
  image_url text,
  category public.ecommerce_product_category not null,
  in_stock boolean not null default true,
  price numeric(12, 2) not null,
  quantity integer not null default 0,
  status public.ecommerce_product_status not null default 'Publish',
  description text,
  sku text,
  visitors_label text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ecommerce_products_tenant_id_idx on public.ecommerce_products (tenant_id);
create index if not exists ecommerce_products_category_idx on public.ecommerce_products (category);

create table if not exists public.ecommerce_orders (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  product_id varchar(32) not null references public.ecommerce_products (id) on delete cascade,
  tab public.ecommerce_order_tab not null default 'New',
  sender_name text not null,
  sender_address text not null,
  receiver_name text not null,
  receiver_address text not null,
  created_at timestamptz not null default now()
);

create index if not exists ecommerce_orders_tenant_id_idx on public.ecommerce_orders (tenant_id);
create index if not exists ecommerce_orders_product_id_idx on public.ecommerce_orders (product_id);

-- Marketing (`appMarketing`)
create type public.campaign_status as enum ('Draft', 'Scheduled', 'Active', 'Paused', 'Completed');
create type public.campaign_step_type as enum ('email', 'wait', 'branch');
create type public.segment_entity_type as enum ('contact', 'lead', 'both');
create type public.marketing_form_status as enum ('Draft', 'Active');

create table if not exists public.segments (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  description text,
  entity_type public.segment_entity_type not null default 'both',
  filters jsonb not null,
  contact_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists segments_tenant_id_idx on public.segments (tenant_id);
create index if not exists segments_entity_type_idx on public.segments (entity_type);

create table if not exists public.campaigns (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  description text,
  status public.campaign_status not null default 'Draft',
  segment_id varchar(32) references public.segments (id) on delete set null,
  scheduled_at timestamptz,
  started_at timestamptz,
  completed_at timestamptz,
  sent_count integer not null default 0,
  delivered_count integer not null default 0,
  open_rate numeric(5, 2),
  click_rate numeric(5, 2),
  bounce_rate numeric(5, 2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists campaigns_tenant_id_idx on public.campaigns (tenant_id);
create index if not exists campaigns_status_idx on public.campaigns (status);
create index if not exists campaigns_segment_id_idx on public.campaigns (segment_id);

create table if not exists public.campaign_steps (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  campaign_id varchar(32) not null references public.campaigns (id) on delete cascade,
  step_order integer not null,
  step_type public.campaign_step_type not null,
  name text not null,
  config jsonb,
  created_at timestamptz not null default now()
);

create index if not exists campaign_steps_tenant_id_idx on public.campaign_steps (tenant_id);
create index if not exists campaign_steps_campaign_id_idx on public.campaign_steps (campaign_id);

create table if not exists public.marketing_forms (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  description text,
  fields jsonb not null,
  embed_code text,
  status public.marketing_form_status not null default 'Draft',
  submission_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists marketing_forms_tenant_id_idx on public.marketing_forms (tenant_id);
create index if not exists marketing_forms_status_idx on public.marketing_forms (status);

create table if not exists public.form_submissions (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  form_id varchar(32) not null references public.marketing_forms (id) on delete cascade,
  payload jsonb not null,
  source_url text,
  created_at timestamptz not null default now()
);

create index if not exists form_submissions_tenant_id_idx on public.form_submissions (tenant_id);
create index if not exists form_submissions_form_id_idx on public.form_submissions (form_id);

-- Subscriptions (`appSubscriptions`)
create type public.subscription_billing_interval as enum ('Monthly', 'Yearly');
create type public.subscription_plan_status as enum ('Active', 'Archived');
create type public.subscription_status as enum ('Active', 'Trialing', 'Past Due', 'Canceled', 'Paused');
create type public.subscription_event_type as enum (
  'created', 'renewed', 'upgraded', 'downgraded', 'canceled', 'payment_failed', 'reactivated'
);

create table if not exists public.subscription_plans (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  name text not null,
  sku text not null,
  tier text not null,
  price numeric(12, 2) not null,
  currency text not null default 'USD',
  billing_interval public.subscription_billing_interval not null,
  features jsonb not null,
  max_seats integer not null default 0,
  trial_days integer not null default 0,
  status public.subscription_plan_status not null default 'Active',
  active_subscriptions integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscription_plans_tenant_id_idx on public.subscription_plans (tenant_id);
create index if not exists subscription_plans_status_idx on public.subscription_plans (status);

create table if not exists public.subscriptions (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  plan_id varchar(32) not null references public.subscription_plans (id) on delete restrict,
  customer_name text not null,
  customer_email text not null,
  company_name text,
  status public.subscription_status not null default 'Active',
  mrr numeric(12, 2) not null,
  billing_interval public.subscription_billing_interval not null,
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean not null default false,
  canceled_at timestamptz,
  started_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists subscriptions_tenant_id_idx on public.subscriptions (tenant_id);
create index if not exists subscriptions_plan_id_idx on public.subscriptions (plan_id);
create index if not exists subscriptions_status_idx on public.subscriptions (status);

create table if not exists public.subscription_events (
  id varchar(32) primary key,
  tenant_id uuid not null references public.tenants (id) on delete cascade,
  subscription_id varchar(32) not null references public.subscriptions (id) on delete cascade,
  event_type public.subscription_event_type not null,
  description text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists subscription_events_tenant_id_idx on public.subscription_events (tenant_id);
create index if not exists subscription_events_subscription_id_idx on public.subscription_events (subscription_id);
