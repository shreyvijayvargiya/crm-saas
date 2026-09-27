# Contributing to SaaSCRM

Thank you for helping improve this open-source CRM template.

## Quick start

```bash
git clone https://github.com/shreyvijayvargiya/crm-saas.git
cd crm-saas
npm install
cp .env.example .env.local   # optional — AI & email features
npm run dev
```

Open [http://localhost:3002/demo](http://localhost:3002/demo) (default port is **3002**).

## Before you open a PR

- Match existing patterns: Pages Router thin routes, shadcn/ui, Tailwind, `CrmDataContext` for shared demo data.
- Run `npm run verify:schemas` when you change Zod schemas or `data.json`.
- Run `npm run write:agent-files` when you change `lib/agent/*` so `public/llms.txt` stays in sync.
- Keep marketing copy on `app/AgencySite/` separate from CRM module UI.

## Issues

Use [GitHub Issues](https://github.com/shreyvijayvargiya/crm-saas/issues) for bugs and feature ideas. For commercial custom builds, see [saascrm.site/contact](https://saascrm.site/contact).
