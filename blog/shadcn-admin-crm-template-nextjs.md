# Shadcn Admin CRM Template for Next.js — Complete Guide, Pages, Tech Stack & Pricing

> **Ship a production-grade SaaS CRM UI in days, not months.**  
> A Next.js + React admin template with **60+ screens**, **shadcn/ui** components, charts, AI-ready shells, and zero backend lock-in.

---

## Table of contents

1. [Overview](#overview)
2. [Live demo & downloads](#live-demo--downloads)
3. [Who this template is for](#who-this-template-is-for)
4. [Complete page list](#complete-page-list)
5. [Key features](#key-features)
6. [Tech stack](#tech-stack)
7. [Project structure](#project-structure)
8. [Pricing (USD & INR)](#pricing-usd--inr)
9. [What's included in your purchase](#whats-included-in-your-purchase)
10. [Getting started](#getting-started)
11. [Customization guide](#customization-guide)
12. [Backend integration](#backend-integration)
13. [License & support](#license--support)
14. [FAQ](#faq)

---

## Overview

Building a CRM from scratch means weeks of layout work, table components, chart wiring, auth screens, and navigation — before you write a single line of business logic.

The **Shadcn Admin CRM Template** solves that. It is a **dual-surface** product:

| Surface | Purpose |
|--------|---------|
| **Marketing landing** | Violet–indigo hero, lead capture form, pricing CTAs, light/dark toggle |
| **CRM application shell** | Dense operational UI — sidebar, navbar, tables, kanban, charts, detail views |

The template is built for **indie hackers**, **SaaS founders**, **agencies**, and **developers** who need a credible admin product fast. It ships with realistic demo data, so every screen feels operational in demos and investor pitches — not like empty wireframes.

**Highlights at a glance:**

- **60+ routes** across CRM, finance, marketing, developer tools, and system admin
- **shadcn/ui** component library (Button, Card, Dialog, Table, Select, Sheet, and more)
- **Recharts** dashboards with sales funnels, lead sources, and revenue charts
- **AI Assistant** sidebar shell with model picker and CRM-focused prompts
- **Agent Ops** dashboard — run history, token costs, prompt versioning, tool-call visualizer
- **SaaS Dashboard** — org workspace, hybrid billing, AI metering, role-based views
- **Theme Customizer** — accent colors, radius, fonts, spacing, shadows, and more
- **CMD+K** global search across every route
- **Zod schemas** + optional **Prisma / Drizzle** SQL reference
- **8 locales** (EN, ES, FR, DE, IT, JA, ZH, HI) via i18next
- **No backend lock-in** — connect Firebase, Supabase, Node, Flask, or any REST API

---

## Live demo & downloads

| Resource | Link |
|----------|------|
| **Live demo** | [crm-saas-pi.vercel.app](https://crm-saas-pi.vercel.app/) |
| **Alternate demo** | [crm-saas.buildsaas.dev](https://crm-saas.buildsaas.dev/) |
| **Intro video** | [YouTube Short](https://www.youtube.com/shorts/SEALF79WciM) |
| **Buy (USD)** | [Gumroad — $49](https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template) |
| **Buy (INR)** | [Dodo Payments — UPI / cards](https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX) |
| **GitHub** | [github.com/shreyvijayvargiya/crm-saas](https://github.com/shreyvijayvargiya/crm-saas) |
| **Author** | [X — @treyvijay](https://x.com/treyvijay) |

---

## Who this template is for

### Indie hackers & SaaS founders
Launch with a polished CRM shell while you build auth, billing, and your core product. Pipeline views, subscription pages, and SaaS billing panels are already structured for MRR-style products.

### Agencies & freelancers
Reuse one codebase across client projects. Swap branding via the Theme Customizer, connect each client's API, and ship in days instead of weeks.

### Developers
Clean JavaScript (no TypeScript required), familiar Next.js Pages Router, documented design system (`Design.md`), and copy-paste component recipes. Escape CSS rabbit holes — clone, tweak, deploy.

### AI / agent builders
Agent Ops and SaaS Dashboard modules give you UI for run history, token metering, prompt versions, and webhook triggers — wire your own LLM when ready.

---

## Complete page list

Every route below is implemented with demo data, responsive layout, and consistent shell chrome (sidebar + navbar).

### Main

| Route | Page | Description |
|-------|------|-------------|
| `/` | Dashboard | KPI cards, charts, recent activity, quick actions |
| `/analytics` | Analytics | Sales overview, funnels, lead sources, rep performance, ticket status |
| `/reports` | Reports | Report builder and export-ready summaries |
| `/activity` | Activity | Unified activity feed across CRM entities |

### Sales & CRM

| Route | Page | Description |
|-------|------|-------------|
| `/leads` | Leads | Lead list with stats, filters, sorting, charts |
| `/leads/[id]` | Lead detail | Profile, notes, timeline, related records |
| `/sales` | Sales | Revenue analytics, product sales table, progress reports |
| `/sales/[id]` | Sale detail | Individual sale breakdown |
| `/pipelines` | Pipelines | Kanban-style deal pipelines |
| `/pipelines/[id]` | Pipeline deal detail | Stage, value, owner, activity |
| `/deals` | Deals | Deal table with status, value, close date |
| `/deals/[id]` | Deal detail | Full deal record with tabs |
| `/contacts` | Contacts | Searchable contact directory |
| `/contacts/[id]` | Contact detail | Contact profile and history |
| `/companies` | Companies | Company directory with ratings and industry |
| `/companies/[id]` | Company detail | Company profile, linked contacts & deals |
| `/e-commerce` | E-commerce | Store overview, metrics, popular products |
| `/e-commerce/orders` | Orders | Order tracking and fulfillment |
| `/e-commerce/orders/[id]` | Order detail | Line items, status, customer |
| `/e-commerce/products/[id]` | Product detail | SKU, pricing, stock toggle |
| `/marketing` | Marketing | Campaign hub overview |
| `/marketing/campaigns/[id]` | Campaign detail | Campaign metrics and settings |
| `/marketing/segments` | Segments | Audience filters and segment builder |
| `/marketing/forms` | Forms | Lead-capture form management |

### Operations

| Route | Page | Description |
|-------|------|-------------|
| `/tasks` | Tasks | Kanban board with drag-and-drop (`@dnd-kit`) |
| `/calendar` | Calendar | Scheduling and event views |
| `/email` | Email | Inbox-style UI with reply and filters |
| `/projects` | Projects | Project list with progress and date ranges |
| `/projects/[id]` | Project detail | Milestones, team, budget |
| `/files` | Files | File manager with folders |
| `/files/[id]` | File detail | Preview, metadata, sharing |
| `/support` | Support | Ticket queue |
| `/support/[id]` | Ticket detail | Thread, status, assignee |

### Finance

| Route | Page | Description |
|-------|------|-------------|
| `/products` | Products | SaaS product catalog and lifecycle |
| `/invoices` | Invoices | Invoice list, create modal, status charts |
| `/invoices/[id]` | Invoice detail | Line items, PDF download (demo) |
| `/payments` | Payments | Payment history and reconciliation |
| `/subscriptions` | Subscriptions | Active subscriptions overview |
| `/subscriptions/[id]` | Subscription detail | Plan, MRR, renewal |
| `/subscriptions/plans` | Subscription plans | Tier comparison and plan editor |

### Developer

| Route | Page | Description |
|-------|------|-------------|
| `/integrations` | Integrations | Third-party app connections |
| `/webhooks` | Webhooks | Endpoint management and test triggers |
| `/api-keys` | API keys | Key issuance and revocation |
| `/cms` | CMS | Blog and newsletter content hub |
| `/cms/blogs/[id]` | Blog editor | Rich blog post detail |
| `/cms/newsletter/[id]` | Newsletter detail | Newsletter issue editor |
| `/api-logs` | API logs | Request/response log viewer |
| `/agent-ops` | Agent Ops | AI agent run history, token costs, prompts, webhooks |
| `/saas-dashboard` | SaaS Dashboard | Org workspace, billing, AI metering, primitives |

### Authentication

| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | Email/password sign-in |
| `/signup` | Sign up | Registration flow |
| `/forgot-password` | Forgot password | Reset request |
| `/change-password` | Change password | Password update |
| `/ui-components` | UI showcase | shadcn component gallery |

### System

| Route | Page | Description |
|-------|------|-------------|
| `/teams` | Teams | Team members and invites |
| `/users` | Users | User administration |
| `/roles` | Roles | RBAC role definitions |
| `/audit-log` | Audit log | Security and change history |
| `/notifications` | Notifications | In-app notification center |
| `/help` | Help | Help center and docs links |
| `/settings` | Settings | Account and app preferences |
| `/about` | About | In-app docs, tech stack, purchase links |

**Total: 50+ top-level routes and 15+ dynamic detail pages — 60+ screens overall.**

---

## Key features

### shadcn/ui component system

Configured via `components.json` with **mist** base color, CSS variables, and Lucide icons. Pre-built primitives:

- Button, Input, Label, Textarea, Checkbox, Radio Group, Switch
- Card, Badge, Breadcrumb, Dialog, Sheet, Dropdown Menu, Select, Table
- Sonner toasts

Extend with `npx shadcn@latest add <component>` using the existing aliases.

### Theme Customizer

Live panel to tweak the entire app without touching CSS:

- Style presets, base color, accent, chart colors
- Border radius, font family, font size, UI scale
- Border style/width, shadows, spacing, line height, letter spacing
- Ring width, backdrop blur

Settings persist via `ThemeCustomizerContext`.

### CMD+K global search

Press **⌘K** (or **Ctrl+K**) to search every sidebar route plus nested extras (marketing segments, subscription plans, e-commerce orders). Navigation is driven from a single `navConfig.js` source of truth.

### AI Assistant sidebar

Floating copilot panel with:

- Model picker (GPT-4o, Claude 3.5, Gemini Pro, Llama 3)
- CRM-focused sample prompts
- Attachment and image placeholders

Wire your own LLM endpoint when ready — the UI shell is complete.

### Agent Ops dashboard

Purpose-built for AI-native SaaS products:

- **Run history table** — status, latency, token usage, cost
- **Streaming log viewer** — live agent output simulation
- **Tool call visualizer** — step-by-step tool invocations
- **Token & cost charts** — Recharts breakdown by model
- **Model selector** — provider and model switching
- **Prompt version manager** — A/B prompt comparison
- **Webhook triggers panel** — event-driven agent runs

### SaaS Dashboard

Multi-tenant SaaS operator view:

- **Overview** — role-based UI preview (owner, admin, member)
- **Workspace** — org switcher, invites, RBAC
- **Billing** — seat-based plans, usage meters, Stripe portal (demo)
- **AI metering** — cost breakdown and model routing
- **AI primitives** — SSE streaming, prompt templates, token budgets

### Charts & analytics

Recharts-powered visualizations across Dashboard, Analytics, Sales, Invoices, E-commerce, and Agent Ops:

- Area, bar, line, and pie charts
- Sales funnels and lead source breakdowns
- Revenue and MRR trend lines
- Responsive tooltips with shared theme tokens

### Kanban & drag-and-drop

Tasks and pipeline modules use `@dnd-kit` for sortable columns and cards — no extra UI library needed.

### Internationalization

Eight locale files under `locales/` (EN, ES, FR, DE, IT, JA, ZH, HI) with `react-i18next`. `AutoTranslate` component for quick multi-language demos.

### Data contracts & database reference

| Layer | Location | Purpose |
|-------|----------|---------|
| **Zod schemas** | `schemas/` | Validate API payloads, generate fixtures |
| **data.json** | Root | Read-only shape reference per route |
| **Prisma schema** | `schemas/sql-schemas/schema.prisma` | PostgreSQL reference model |
| **Drizzle schema** | `schemas/sql-schemas/drizzle/schema.ts` | Alternative ORM tables |
| **Firestore / Supabase docs** | `schemas/firestore-schemas/`, `schemas/supabase-schemas/` | NoSQL reference |

Run `npm run verify:schemas` to validate `data.json` against Zod definitions.

### Marketing landing page

Standalone landing at `/` (configurable) with:

- Framer Motion section reveals
- Light/dark theme toggle (independent of app theme)
- Feature grid, pricing CTAs, contact form with `/api/send-lead`
- Gumroad (USD) and Dodo (INR) checkout links

### Design system documentation

`Design.md` documents colors, typography, elevation, component recipes, and a **new module checklist** — ideal for designers and AI coding agents (Cursor, Copilot).

---

## Tech stack

| Technology | Version | Role |
|------------|---------|------|
| **Next.js** | 12.0.0 (Pages Router) | Routing, SSR, API routes |
| **React** | ^17.0.0 | UI framework |
| **Tailwind CSS** | ^3.4.17 | Utility-first styling |
| **shadcn/ui** | default / mist | Accessible component primitives |
| **Radix UI** | ^1.x – ^2.x | Headless primitives (dialog, select, dropdown, etc.) |
| **Lucide React** | ^0.474.0 | Icon set |
| **Recharts** | ^2.15.1 | Charts and analytics |
| **Framer Motion** | ^6.5.1 | Page transitions and micro-interactions |
| **GSAP** | ^3.12.7 | Advanced animation hooks |
| **@tanstack/react-table** | ^8.21.3 | Headless data tables |
| **@dnd-kit** | ^6–10 | Drag-and-drop kanban |
| **Zod** | ^3.25.76 | Runtime schema validation |
| **Drizzle ORM** | ^0.45.2 | SQL schema reference |
| **i18next / react-i18next** | ^26 / ^17 | Internationalization |
| **Sonner** | ^1.7.4 | Toast notifications |
| **class-variance-authority** | ^0.7.1 | Component variants |
| **tailwind-merge / clsx** | Latest | Class name utilities |
| **Nodemailer** | ^8.0.7 | Lead form email (API route) |
| **@vercel/analytics** | ^0.1.11 | Optional analytics |

**Requirements:** Node.js ≥ 18, npm ≥ 9

---

## Project structure

```
crm-saas/
├── app/                    # Page components (business logic)
│   ├── Home/               # Dashboard
│   ├── Leads/, Deals/, Contacts/, Companies/
│   ├── Analytics/, Reports/, Activity/
│   ├── AgentOps/           # AI agent operations
│   ├── SaasDashboard/      # Multi-tenant SaaS admin
│   ├── ECommerce/, Marketing/, Subscriptions/
│   ├── Authentication/   # Login, signup, password flows
│   └── index.jsx           # Barrel exports
├── pages/                  # Next.js file-based routes
├── modules/                # Shell: Layout, Navbar, Sidebar, ThemeCustomizer
├── components/ui/          # shadcn/ui primitives
├── schemas/                # Zod + SQL reference schemas
├── locales/                # i18n JSON files
├── lib/                    # Utilities (utils, chart colors, form helpers)
├── utils/                  # Theme, useTheme, ThemeCustomizerContext
├── modules/navConfig.js    # Single source of truth for navigation
├── Design.md               # Design system for humans & AI agents
├── data.json               # Demo data shape reference
└── globals.css             # CSS variables, shadcn tokens
```

**Architecture flow:**

```
User → pages/*.js → app/*/index.jsx → (future) lib/api/*.js → Your backend
                ↘ modules/Layout (Sidebar + Navbar + AI panel)
```

---

## Pricing (USD & INR)

Both checkout options include the **same source ZIP** and **lifetime updates**. Choose the channel that fits your location and payment method.

### Standard license

| Currency | Price | Checkout | Payment methods |
|----------|-------|----------|-----------------|
| **USD** | **$49** (suggested; pay-what-you-want from $49) | [Gumroad](https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template) | Card, PayPal |
| **INR** | **₹920 minimum** (pay-what-you-want; suggested ~₹4,600 at USD parity) | [Dodo Payments](https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX) | UPI, cards, net banking |

### With Figma files (USD only)

| Option | Price | Notes |
|--------|-------|-------|
| **Template + Figma** | **$79** (+$30 on Gumroad) | Figma component kit; request access via purchase receipt email |
| **Figma via INR checkout** | Included via link | Dodo listing includes Figma designs via shared link |

### What you pay vs. what you save

| Item | Typical cost if built custom | This template |
|------|------------------------------|---------------|
| UI/UX design (60+ screens) | $3,000 – $8,000 | Included |
| Frontend development | 80–120 hours (~$4,000 – $12,000) | Included |
| Chart & table components | $500 – $1,500 | Included |
| Auth & settings flows | $800 – $2,000 | Included |
| **Your investment** | — | **$49 / ₹920+** |

### Team & agency licensing

Need multi-seat or white-label rights for a team? Email **[shreyvijayvargiya26@gmail.com](mailto:shreyvijayvargiya26@gmail.com)** for team license quotes.

---

## What's included in your purchase

- Full **React + Next.js** source code (ZIP download)
- **60+ CRM screens** with demo data
- **shadcn/ui** component library pre-wired
- **Marketing landing page** with lead capture
- **AI Assistant**, **Agent Ops**, and **SaaS Dashboard** modules
- **Theme Customizer** with live preview
- **Zod schemas** + **Prisma / Drizzle** SQL reference
- **Design.md** design system documentation
- **Figma files** (link provided after purchase)
- **Lifetime updates** on the template
- **6 months priority support** for bugs and setup questions
- **MIT license** — use in commercial projects

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) (default port **3002**).

### 3. Build for production

```bash
npm run build
```

### 4. Verify schemas (optional)

```bash
npm run verify:schemas
```

### Environment variables (optional)

Create `.env.local` when connecting a backend:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api.com/api
NEXT_PUBLIC_API_VERSION=v1
NEXT_PUBLIC_API_KEY=your-api-key
```

---

## Customization guide

1. **Branding** — Use the Theme Customizer panel or edit `utils/theme.js` and `globals.css` CSS variables.
2. **Navigation** — Add routes in `modules/navConfig.js`; sidebar and CMD+K search update automatically.
3. **Demo data** — Replace seed files in each `app/*/` module with API calls.
4. **New pages** — Follow the pattern: `app/NewPage/index.jsx` → export in `app/index.jsx` → `pages/new-page.js`.
5. **shadcn components** — Add new primitives with the existing `components.json` aliases.

See `Design.md` for copy-paste component recipes and the new-module checklist.

---

## Backend integration

This is a **frontend template**. Demo data is in-module; no database is required to run the demo.

**Supported backends (bring your own):**

- Firebase / Firestore
- Supabase / PostgreSQL
- Node.js / Express / Fastify
- Python / Flask / Django
- Any REST API

**Integration steps:**

1. Create `lib/api/config.js` and `lib/api/client.js` (patterns in `readme.md`).
2. Add service files per domain (`lib/api/leads.js`, etc.).
3. Replace `useState` seed data with `useEffect` + API calls.
4. Validate responses with Zod schemas from `schemas/`.

Required REST endpoints are documented in `readme.md` (Leads, Contacts, Companies, Invoices, Tasks, Sales, API Keys, Webhooks, Integrations, Settings).

---

## License & support

| Item | Detail |
|------|--------|
| **License** | MIT — commercial use allowed |
| **Updates** | Lifetime template updates |
| **Support** | 6 months priority email support |
| **Figma** | Request via [shreyvijayvargiya26@gmail.com](mailto:shreyvijayvargiya26@gmail.com) after purchase |
| **Contact** | Email · [X @treyvijay](https://x.com/treyvijay)
| **Blog** | [ihatereading.in](https://ihatereading.in) |

---

## FAQ

### Is this TypeScript?
No. The codebase is **JavaScript** for maximum accessibility. TypeScript migration is straightforward if you prefer types.

### Does it include a backend?
No. You get a complete **frontend** with mock data, Zod contracts, and SQL reference schemas. Connect any API you choose.

### Can I use this for client projects?
Yes. The MIT license allows commercial and client work. For multi-seat agency licenses, contact the author.

### Next.js 12 or 14?
This repo runs **Next.js 12** (Pages Router). A **Next.js 14** variant is listed on Gumroad as "Available Version 2" — check the product page for upgrade options.

### How do I get Figma files?
After purchase, email the receipt to **shreyvijayvargiya26@gmail.com** or use the Figma link included in the Dodo / Gumroad download.

### What's the difference between Agent Ops and the AI sidebar?
The **AI sidebar** is an end-user copilot panel inside the CRM shell. **Agent Ops** is an operator dashboard for monitoring agent runs, costs, prompts, and webhooks — aimed at teams building AI features.

### Why two payment options?
**Gumroad (USD)** is optimized for international buyers. **Dodo (INR)** supports UPI and Indian payment methods with a lower minimum for domestic buyers.

### Is there a refund policy?
Digital products are generally non-refundable after download. Contact support if you have access issues — we're happy to help.

---

## Summary

The **Shadcn Admin CRM Template for Next.js** is the fastest path from idea to a credible SaaS CRM demo:

- **60+ screens** covering sales, operations, finance, marketing, and developer tools
- **shadcn/ui + Tailwind** for a modern, accessible design system
- **AI-ready** with Agent Ops, SaaS Dashboard, and copilot sidebar
- **$49 USD** or **₹920+ INR** — a fraction of custom build cost
- **No backend lock-in** — your API, your rules

**[→ Get the template on Gumroad (USD)](https://shreyvijayvargiya.gumroad.com/l/saas-crm-react-template)**  
**[→ Get the template on Dodo (INR)](https://checkout.dodopayments.com/buy/pdt_0NdFsoIah9Nc7oQ5SZScQ?session=sess_iZe1X7I6XX)**  
**[→ View live demo](https://crm-saas-pi.vercel.app/)**

---

*Built by [Shrey Vijayvargiya](https://x.com/treyvijay) · CRM SaaS Template v1.0.0*
