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
| `activities` | activity id | Polymorphic `activityType` |
| `lead_notes` / `contact_notes` | note id | |
| `record_files` | file id | |
| `contact_embedded_emails` | id | |

**`data.json`:** Top-level `app*` keys describe **API-shaped** payloads for each route; they are not a 1:1 Firestore export but field names should align when you model documents.

**Indexes:** Add composite indexes when you query by multiple fields (e.g. `leads` by `pipelineId` + `updatedAt`).
