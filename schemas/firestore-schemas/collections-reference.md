# Firestore layout (reference)

Maps SQL/Drizzle entities to suggested Firestore paths. Use **`tenants/{tenantId}`** as the top-level segment so data is isolated per customer.

| Collection (under tenant) | Document ID | Notes |
|---------------------------|-------------|--------|
| `users` | user id | Mirrors `users` table |
| `companies` | company id | |
| `contacts` | contact id | `ownerId` → `users` |
| `leads` | lead id | Pipeline stage enum matches app |
| `deals` | deal id | |
| `pipelines` | pipeline id | Subcollection `stages` optional vs flat `pipelineStages` |
| `tasks` | task id | `taskAssignees` as subcollection or array |
| `invoices` / `invoiceLineItems` | id | Line items often subcollection `invoices/{id}/items/{lineId}` |
| `payments` | payment id | |
| `projects` | project id | |
| `calendar_events` | event id | |
| `email_threads` / `email_messages` | thread / message id | Messages as subcollection under thread |
| `notifications` | notification id | |
| `integrations` | integration id | |
| `api_keys` | key id | Store hashes only; never store raw secrets |
| `webhooks` | webhook id | |
| `team_members` | membership id | |
| `blog_posts` / `blog_subscribers` | id | CMS module |
| `ecommerce_products` | product id | Catalog rows for `/e-commerce` |
| `ecommerce_orders` | order id | Delivery tracking; `product_id` → product |
| `ecommerce_metrics` | metric id | Dashboard KPI cards (optional denormalized doc) |
| `ecommerce_earnings` | doc id | Weekly chart + earning/profit/expense breakdown |
| `segments` | segment id | Audience filters for campaigns |
| `campaigns` | campaign id | `segment_id` → segment |
| `campaign_steps` | step id | Subcollection under campaign or flat with `campaign_id` |
| `marketing_forms` | form id | Lead capture forms with embed codes |
| `form_submissions` | submission id | `form_id` → marketing form |
| `subscription_plans` | plan id | Pricing tiers and features |
| `subscriptions` | subscription id | `plan_id` → subscription plan |
| `subscription_events` | event id | Billing history; `subscription_id` → subscription |
| `api_request_logs` | log id | API Logs module — method, path, status, latency |
| `support_tickets` | ticket id | Subcollection `messages` for thread |
| `audit_log_entries` | entry id | Immutable audit trail |
| `saved_reports` / `report_templates` | id | Reports module |
| `help_articles` | article id | Help center FAQ (optional CMS) |
| `record_files` | file id | File manager — metadata + storage URL |
| `activities` | activity id | Polymorphic `activityType`; also powers Activity feed |
| `lead_notes` / `contact_notes` | note id | |
| `contact_embedded_emails` | id | |

**`data.json`:** Top-level `app*` keys describe **API-shaped** payloads for each route; they are not a 1:1 Firestore export but field names should align when you model documents.

**Indexes:** Add composite indexes when you query by multiple fields (e.g. `leads` by `pipelineId` + `updatedAt`).
