# Build a Full SaaS CRM (60+ pages, 20+ tables)

You are scaffolding a **complete frontend-only SaaS CRM / admin / CMS** inside this existing Next.js project. Target the depth of [SaaSCRM](https://saascrm.site): **60+ screens**, **20+ in-memory tables**, one shared React state tree, **no backend**.

Stack (reuse what the repo already has): **Next.js, React, Tailwind, shadcn/ui, lucide-react, Framer Motion, sonner, @tanstack/react-table, @dnd-kit, Recharts.** Do not invent a database, REST client, auth provider, or localStorage persistence. Mock data resets on refresh.

Ground entities in SaaSCRM’s public contract: fetch https://saascrm.site/llms.txt and https://saascrm.site/docs/api.md if you can. Then **build the full kit**, not a 4-page demo.

---

## 1. Product intent

This is the **advanced** prompt. The short “editable CRM table” prompt builds 2–4 Airtable-style entities. This prompt builds a **sellable CRM SaaS UI**: sales, delivery, finance, marketing, CMS, e-commerce, developer tools, and admin settings — all clickable, all seeded, all editable in memory.

If the BUSINESS block at the bottom names a vertical (agency, freelancer, finance, ecommerce), **rename labels** (clients vs companies, retainers vs deals) but **do not drop modules**. Unused modules still exist with realistic empty/seed rows so the product feels complete.

If BUSINESS is thin, assume a B2B SaaS: inbound lead → qualify → demo → proposal → won → onboard → invoice → renew.

---

## 2. Architecture (non-negotiable)

- **One `CRMProvider`** (React context + `useReducer` or per-entity `useState` in one file) holds every table listed below. Sidebar counts, kanban, sheets, charts, and the AI-style activity toasts all read/write this snapshot.
- **No `fetch`, axios, supabase, firebase, prisma, drizzle runtime, or API routes** for CRM data. If the repo already has demo API stubs, do not call them from these screens.
- **Client-only CRM shell.** Pages Router: `pages/` thin re-exports from `app/` modules. App Router: `app/(crm)/**` as `"use client"`. Match the repo.
- **List + detail for every primary entity:** `pages/entity.js` list; `pages/entity/[id].js` detail with tabs (overview, activity, notes, related).
- **Design:** existing CSS variables / `useTheme()` / shadcn. Do not hard-code a single accent. Dark mode must work.
- **Toasts:** sonner. **Icons:** lucide-react.
- **Tables:** 5–7 visible columns; remaining fields in a Sheet or detail page. Inline edit via `EditableCell`. Search, filter, sort, column visibility, empty state, add / duplicate / delete.
- **Kanban** (`@dnd-kit`) for Leads, Deals/Pipelines, and Tasks — same state as the table.
- **Charts:** Recharts on Dashboard, Analytics, Reports (pipeline value, revenue, conversion, activity volume).
- **Fake activity loop:** 8–20s random interval, cap ~20 events/session, toast + mutate a row (new lead, stage move, payment recorded).

---

## 3. Twenty-plus tables (seed 8–20 rows each unless noted)

Implement these as named collections in `lib/crm/mock-data.ts` (or existing `CrmDataContext` / `*SeedData.js` if the repo already has them — **extend, don’t fork**):

1. **leads** — name, email, company, source, status/stage, owner, score, value  
2. **contacts** — person, email, phone, companyId, role, tags  
3. **companies** — name, domain, industry, size, owner, ARR  
4. **deals** — name, companyId, amount, stage, closeDate, owner, probability  
5. **pipelines** — name, stages[] (ordered), default flag  
6. **activities** — type (call/email/meeting/note), relatedTo, at, owner, body  
7. **tasks** — title, status, priority, due, owner, related record  
8. **calendarEvents** — title, start, end, attendees, related deal/lead  
9. **emailThreads** — subject, snippet, from, to, folder, related contact  
10. **invoices** — number, companyId, amount, status, dueDate, line items  
11. **payments** — invoiceId, amount, method, paidAt, status  
12. **products** — name, sku, price, type (one-time/subscription), active  
13. **subscriptions** — companyId, planId, mrr, status, renewsAt  
14. **subscriptionPlans** — name, price, interval, features[]  
15. **projects** — name, clientId, status, budget, start, end  
16. **supportTickets** — subject, requester, priority, status, assignee  
17. **files** — name, size, type, relatedTo, uploadedAt  
18. **cmsPosts** — title, slug, status, author, publishedAt, tags  
19. **campaigns** — name, channel, status, audience, sentAt  
20. **segments** — name, rules, count  
21. **orders** — number, customer, total, status, items (e-commerce)  
22. **inventoryItems** — sku, qty, warehouse, reorderAt  
23. **users** — name, email, role, lastActive  
24. **roles** — name, permissions[]  
25. **webhooks** — url, events[], secret masked, lastDelivery  
26. **apiKeys** — name, prefix, createdAt, lastUsed  
27. **notifications** — title, read, at  
28. **auditLog** — actor, action, entity, at  

You may merge a couple of sparse tables, but **do not go below 20 collections**. Types in `lib/crm/types.ts`.

---

## 4. Sixty-plus screens (sidebar IA)

Ship **working routes** (not placeholders) grouped like a real SaaS CRM. Thin `pages/*.js` → `app/Module`.

**Overview:** Dashboard (KPI cards + charts + recent activity), Analytics, Reports.

**Sales:** Leads (list + kanban + detail), Contacts (list + detail), Companies (list + detail), Deals (list + detail), Pipelines (board + settings), Quotes if you already have an invoices pattern.

**Work:** Tasks (list + kanban), Calendar, Activity timeline, Email inbox (folders + thread pane), Projects (list + detail), Files.

**Finance:** Invoices (list + detail), Payments, Products, Subscriptions, Subscription plans, (optional) Shipping.

**Marketing:** Campaigns, Segments, Forms (embed preview, no live POST), Scheduler (calendar + list of posts).

**Store:** E-commerce orders, order detail, products overlap, inventory.

**CMS:** Blog list, blog detail/editor (local state), newsletter issues.

**Support:** Tickets list + detail.

**Platform:** Teams, Users, Roles, Notifications, Settings (profile, theme tokens if the repo has a customizer), Integrations (connected/disconnected cards), Webhooks, API keys, API logs (seeded rows), Audit log, Help.

**Auth chrome (demo only):** Login, signup, forgot password screens with **no real auth** — existing demo login is fine.

Count: you should land **at or above 60 distinct routes/screens** including list, detail, and settings. If the repo already contains many of these, **wire them to the shared snapshot** instead of duplicating UI. Fill gaps (missing detail page, missing kanban, empty table) rather than rewriting the marketing site.

---

## 5. Column types & editors (every table)

Map field names to editors. Inline commit on blur/Enter. **Never a network call.**

| Signal | Type | Editor |
| --- | --- | --- |
| status, stage | badge-select | Select + colored Badge |
| priority | badge-select | red / amber / gray |
| email | text-email | Input type=email |
| phone, mobile | text-tel | Input type=tel |
| value, amount, price, revenue, mrr, total | currency | number + currency prefix |
| date, due, close, renew, published | date | Popover + Calendar |
| owner, assignee, rep | person | Avatar + Combobox |
| tags, labels, source, channel | multi-badge | removable chips |
| notes, description, body | long-text | Textarea in Sheet |
| company, account, client | text-link | link to company detail |
| score, rating, qty | number | Input number |
| url, domain, website | text-url | Input type=url |
| is_*, has_*, active, converted, won | checkbox | Switch |
| else | text | Input text |

Badge colors: hash option string onto slate / blue / amber / green / red / violet / pink — same option always same color.

---

## 6. UX patterns (copy SaaSCRM list/detail)

- Page padding `p-4 sm:p-6`. Header: title, one-line description, primary CTA. Toolbar: search, filters (Dropdown/Select), export stub (toast “Demo export”).
- Create/edit via Dialog/`FormModal`. Delete with confirm toast.
- Detail: profile header + tabs (overview, activity, notes, related). Related records are filtered views of other tables (company → contacts + deals + invoices).
- Kanban column ids stable; dragging updates `stage` in the shared store.
- Empty states with a single “Add” CTA.
- Restrained motion: page fade + 8px rise, 0.2s. No animation on cell editors.
- Sidebar: grouped sections matching the IA above. Active route highlighted. Collapse on mobile.

---

## 7. File layout (adapt to Pages vs App Router)

```
app/{Module}/index.jsx          # list
app/{Module}/{Entity}Detail.jsx # detail
pages/{entity}.js               # re-export
pages/{entity}/[id].js
components/crm/data-table.tsx
components/crm/editable-cell.tsx
components/crm/entity-sheet.tsx
components/crm/kanban-board.tsx
components/crm/activity-toaster.tsx
lib/crm/types.ts
lib/crm/mock-data.ts
utils/CrmDataContext.jsx        # prefer extending this if it exists
```

Install only missing shadcn pieces (`table`, `badge`, `select`, `popover`, `calendar`, `avatar`, `sheet`, `card`, `tabs`, `dropdown-menu`, `switch`). Do not hand-roll primitives the repo already has.

---

## 8. Quality bar

- TypeScript or JSDoc-consistent with the repo. Fix lint/build errors **you** introduced.
- Seed data must look like a real company (mixed stages, overdue invoices, a won deal, a churned subscription).
- Charts read from the same snapshot (e.g. sum of won deals this month).
- Report back: table count, route count, and that everything is in-memory.

## 9. Guardrails

- **NEVER** wire a real backend. If asked later, stop and say so.
- Do not strip the Agency marketing site (`/`, `/pricing`, `/blog`) while doing this.
- Do not add `/agent-ops` without a page.
- Do not dump 60 unrelated verticals into one flat nav — **group** them.

---

## 10. How to implement without rewriting the product

Start by inventorying routes already in `pages/` and `modules/navConfig.js`. For every table in section 3, check whether a list page, detail page, and nav item already exist.

If the repo is already SaaSCRM-shaped, your job is **completion**, not greenfield:

- Attach `useCrmData()` (or the new `CRMProvider`) to every list that still uses a local `useState(seed)`.
- Add missing `[id].js` detail routes using `EntityDetailShell` / `RecordProfileDetail` / `EntityRecordTabs` if those helpers exist.
- Add Kanban only where stages exist (leads, deals, tasks). Do not invent a kanban for invoices.
- Add export dropdowns that toast a demo CSV — do not generate real files unless the repo already has an export helper.
- Theme: read CSS variables (`--primary`, `--background`, `--muted`) and `useTheme()`. No hardcoded indigo on new screens.

If the repo is empty besides a Next.js starter, then scaffold the shell first (`Sidebar`, `Topbar`, `CRMProvider`), then Dashboard, then Leads list+kanban+detail, then copy that pattern across the remaining entities.

## 11. Seed data that feels alive

Write 12–18 leads with mixed sources (Inbound, Referral, LinkedIn, Event). At least two should be overdue on follow-up. Deals should include one large enterprise opportunity in Negotiation and one small won deal this month so Dashboard MRR/pipeline charts are not zeros. Invoices: mix Draft, Sent, Paid, Overdue. Subscriptions: one Active, one Past due, one Canceled. Support tickets: one Urgent open, one Waiting on customer. CMS: two Published posts and one Draft.

Owners should be a small team of 4–6 users reused everywhere so person cells look consistent. Timestamps should be relative to “today” (due yesterday, meeting tomorrow) so the Calendar and Tasks pages are not empty.

The fake-activity loop may:

- insert a new inbound lead
- move a lead or deal one stage forward (never skip Closed Lost)
- mark a task complete
- record a small payment against a Sent invoice

Toast copy: short, specific (`“Acme moved to Proposal”`), not generic (`“Record updated”`). Cap the loop so it does not spam.

## 12. Accessibility and polish

Keyboard: table cells commit on Enter, cancel on Escape. Sheet closes on Escape. Kanban cards are keyboard-focusable. Contrast: badges must remain readable in dark mode. Empty states: illustration optional; one sentence + primary button is enough. Mobile: collapse sidebar to a sheet; tables scroll horizontally; kanban scrolls on X.

Do not add a second design system. If the repo uses shadcn `Button` variants, use those. If it uses `sonner`, do not add `react-hot-toast`.

## 13. Definition of done

- 20+ named collections in one snapshot
- 60+ reachable screens (list + detail + settings count separately)
- Typecheck / lint / build pass for files you touched
- Marketing routes still render
- You can create, edit, duplicate, and delete a lead and see it on both table and kanban without a refresh
- Dashboard numbers change when you win a deal in the UI

## 14. How to start in Cursor

Paste this entire prompt. Then paste the BUSINESS block. Then say: “Inspect the repo, list existing CRM routes, and extend them to this spec. Do not rebuild the marketing site.”

If BUSINESS is missing, proceed with a generic B2B SaaS workflow and say so in a one-line comment at the top of the provider file.

---

## BUSINESS

[PASTE BUSINESS DESCRIPTION + WORKFLOW HERE]

Example: “We are a 12-person productised-service agency. Lead → discovery call → proposal → 50% invoice → delivery project → retainers. Need clients, projects, invoices, and a content scheduler for LinkedIn.”
