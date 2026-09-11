You are scaffolding a fully working, EDITABLE, FRONTEND-ONLY CRM inside this Vite + React
project, using shadcn/ui, Tailwind CSS, Framer Motion, and lucide-react.
No backend, no real API calls, no database — everything is in-memory mock state. Ground
the entity model in SaaSCRM's schema (see saascrm.site/llms.txt / saascrm.site/docs/api.md
if you can fetch it) but only build what the business below actually needs.

## 1. Extract the spec from the business description at the bottom of this prompt
- Business type/domain
- Workflow steps -> these become your status/stage values, IN ORDER
- Which entities are implied. Canonical set: leads, contacts, companies, deals, pipelines,
  invoices, payments, tasks. Only keep what the workflow needs — don't scaffold all of them.
- Terminology: use the business's own words in the UI ("donors" not "leads" for a nonprofit,
  "listings" not "deals" for real estate).
- If the description is thin, default to leads + deals/pipeline + contacts and proceed —
  don't stall on clarifying questions.

## 2. Decide pages (usually 2-4, not all 8 SaaSCRM screens)
Only add a Dashboard if an overview was implied. Don't build Companies/Invoices/Payments as
separate pages unless the workflow clearly needs them as their own object.

## 3. Derive columns + types per entity — cap at 5-7 visible columns, rest goes in a row-detail Sheet
Map field-name signals to a type and an inline editor. Every column must be editable inline
(click a cell -> editor -> blur/enter commits to local state, never a network call):

| Signal | Type | Editor | lucide icon |
|---|---|---|---|
| status, stage | badge-select | Select + colored Badge | CircleDot |
| priority | badge-select | Select, red/amber/gray | Flag |
| email | text-email | Input type=email | Mail |
| phone, mobile | text-tel | Input type=tel | Phone |
| value, amount, price, revenue, mrr | currency | Input type=number + currency prefix | DollarSign |
| date, due_date, created_at, closed_at | date | Popover + Calendar | CalendarDays |
| owner, assigned_to, rep | person | Avatar + Combobox | User |
| tags, labels, source | multi-badge | multi-select, removable Badge chips | Tag |
| notes, description | long-text | Textarea in a Sheet, not inline | AlignLeft |
| company, account | text-link | Input + link to company record | Building2 |
| score, rating | number-badge | Input number, colored badge by threshold | Star |
| url, website | text-url | Input type=url | Link |
| is_active, converted, won, any is_*/has_* | checkbox | Checkbox/Switch | CheckCircle2 |
| anything else | text | Input type=text | — |

Assign badge colors deterministically (hash the option string against a fixed 7-color
palette: slate/blue/amber/green/red/violet/pink) so the same status always renders the same
color. When status/stage options aren't given explicitly, infer them from the workflow steps
in order — that order also becomes the kanban column order if you build a pipeline view.

## 4. Design system (use the repo's existing shadcn/Tailwind tokens if present; otherwise these defaults)
shadcn style "new-york", base color slate, CSS-variables mode, radius 0.5rem. One confident
primary accent color for buttons/active-nav/primary CTA. Status badges use the 7-color
palette above, never --primary. Layout: sidebar + top bar shell, nav items = exactly the
pages you're building. Tables: shadcn Table in a Card, sticky header, row hover, row click
opens a right-side Sheet with full detail. Kanban (when a stage column exists): columns =
stage values, cards show the entity's 2-3 most important fields; static drag-free kanban is
fine unless drag-and-drop was asked for.

Framer Motion — restrained: page/section entrance = fade + 8px slide up, duration 0.2,
rows stagger ~0.04s on first paint. New row from the fake-activity loop slides in from the
top with a brief highlight fade (~1.5s). No motion on inline cell editors — instant, or it
feels laggy. Icons: lucide-react, 16px in tables, 18-20px in nav/headers, one icon per nav
item/column type/primary action (Plus, MoreHorizontal, Filter, Search).

## 5. File layout
```
src/routes/CrmLayout.tsx         # sidebar + top bar shell, wraps <Outlet />
src/routes/<Entity>Page.tsx       # one file per scaffolded entity
src/components/crm/data-table.tsx    # generic editable table, column-def array driven
src/components/crm/editable-cell.tsx # switches on column type per the table above
src/components/crm/kanban-board.tsx  # only if an entity has a stage/pipeline column
src/components/crm/entity-sheet.tsx  # row detail panel
src/components/crm/activity-toaster.tsx # the interval + Sonner loop, mounted once in CrmLayout
src/lib/crm/mock-data.ts         # seeded fake rows matching the inferred columns
src/lib/crm/types.ts             # TS types for the inferred schema
```
Use react-router-dom (createBrowserRouter, CrmLayout as root element, one child route per
scaffolded page) — never next/link or next/navigation. Everything is client-only by default,
no "use client" directives needed. One useState/useReducer per entity in a context provider
around the CRM routes so sidebar counts, table, and kanban share the same in-memory list. No
localStorage — refresh resets to the seed, that's fine for a demo. Install shadcn components
via the shadcn CLI (`npx shadcn@latest add <only the ones used>` — it supports Vite directly)
rather than hand-rolling them. No next/image — use a plain <img> with explicit width/height.

## 6. Fake-activity loop (this is what sells "this CRM is alive")
Mount activity-toaster.tsx once in the shared layout. On a RANDOMIZED interval (8-20s, not
fixed), pick a random mock event (new row, or a row's stage moving forward), update the
shared state, and fire `toast(message, { icon })` — pattern: "New {entity}: {name} —
{source}" or "{entity} moved to {new stage}". Cap total events per session (~15) so a demo
left open doesn't spam.

## 7. Guardrails
- NEVER wire a real fetch/API call/database. If the user wants a real backend, that's a
  separate explicit ask — say so and stop, don't half-wire it.
- Don't scaffold every entity/page by default — unused pages are noise.
- Don't invent columns beyond the sensible defaults above — resist over-building tables.
- Report back concisely: which entities/pages got built and where the files live.

---
## Business to scaffold this for:
[PASTE YOUR BUSINESS DESCRIPTION AND WORKFLOW HERE — the more specific about your steps
(e.g. "lead comes in -> site visit -> quote -> install -> paid"), the better the columns
and stages will be]
