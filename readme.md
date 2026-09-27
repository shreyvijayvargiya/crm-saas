# SaaSCRM — The first open-source CRM for business, founders & vibe coders

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Live demo](https://img.shields.io/badge/demo-saascrm.site-violet)](https://saascrm.site/demo)

**SaaSCRM** is a production-grade **CRM, admin dashboard, and CMS** frontend built with **Next.js 12 (Pages Router)**, **React 17**, **Tailwind CSS**, and **shadcn/ui**. It ships **60+ screens**, vertical demos (clinic, agency, indie Stripe, and more), an **agentic AI chatbot**, theme customizer, Zod schemas, and Cursor rules — with **in-memory demo data** until you wire your own backend.

- **Website:** [saascrm.site](https://saascrm.site)
- **Repository:** [github.com/shreyvijayvargiya/crm-saas](https://github.com/shreyvijayvargiya/crm-saas)
- **License:** [MIT](LICENSE) — commercial and client use allowed

## Quick start

```bash
git clone https://github.com/shreyvijayvargiya/crm-saas.git
cd crm-saas
npm install
cp .env.example .env.local   # optional — AI chatbot, email, Firebase
npm run dev
```

Open **[http://localhost:3002/demo](http://localhost:3002/demo)** (default dev port is **3002**).

## What's included

| Area | Highlights |
|------|------------|
| **CRM app** | Leads, pipelines, deals, contacts, tasks, calendar, finance, marketing, e-commerce, CMS |
| **Agency site** | Marketing landing, pricing, blog, prompts, AI CRM builder (`/blueprint`) |
| **AI** | In-app copilot (OpenRouter + tool-calling), Claude/Cursor skills under `/skills` |
| **Data** | `CrmDataContext` + seed data; Zod in `schemas/`; SQL reference in `schemas/sql-schemas/` |
| **Verticals** | AST-backed demos under `/demo/template/*` (e.g. clinic appointments) |

## Documentation

- **[Design.md](./Design.md)** — design system, tokens, module checklist
- **[llm.txt](./llm.txt)** — full repo context for AI assistants
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** — how to contribute
- **Agent index (site):** [saascrm.site/llms.txt](https://saascrm.site/llms.txt)

Long-form setup, API integration notes, and schema verification: see **[docs/DEVELOPER.md](./docs/DEVELOPER.md)**.

## Optional paid offerings

Source code is **free on GitHub**. [saascrm.site/pricing](https://saascrm.site/pricing) lists an **optional Figma kit** and **custom CRM builds** if you want design handoff or us to deploy for you.

## Scripts

```bash
npm run dev              # Next.js on port 3002
npm run build            # Production build
npm run verify:schemas   # Validate data.json vs Zod
npm run write:agent-files # Sync public/llms.txt, openapi, agents.md
```

## Author

**Shrey Vijayvargiya** — [saascrm.site](https://saascrm.site) · [Buildsaas.dev](https://buildsaas.dev)

Star the repo if it saves you time — it helps others discover the template.
