---
title: "I Trained Claude to Build My CRM Using SaaSCRM.site"
metaTitle: "I Trained Claude to Build My CRM | Claude Skills + SaaSCRM"
description: "How I packaged SaaSCRM.site into Claude Skills and a Cursor CRM prompt template so Claude scaffolds a frontend CRM from a business description — Next.js or Vite, no generic AI UI."
date: "2026-09-11"
author: "Shrey"
image: "/og/trained-claude-to-build-crm.jpg"
imageAlt: "I trained Claude to build my CRM using SaaSCRM.site — light-theme banner for Claude skills and CRM prompt templates"
keywords: "claude crm, ai crm builder, crm prompt template, claude skills, train claude to build CRM, SKILL.md CRM, Next.js Claude CRM, Cursor CRM prompt, custom Claude skill CRM"
tags:
  - Claude CRM
  - Claude Skills
  - AI CRM Builder
  - CRM Prompt Template
  - SaaSCRM
faq:
  - q: "What is a Claude CRM skill?"
    a: "A packaged SKILL.md plus reference files that teach Claude how to scaffold a CRM — entities, columns, shadcn tables, and mock data — instead of guessing a generic dashboard. SaaSCRM ships Next.js and Vite skills you upload in Claude."
  - q: "How is this different from prompting Claude to 'build a CRM'?"
    a: "A one-shot prompt has no durable domain model. The skill encodes SaaSCRM's entity set, column types, file layout, and guardrails (frontend-only, 2–4 pages, no fake backend). Claude invokes it whenever you describe a workflow."
  - q: "Can I use the same CRM prompt template in Cursor?"
    a: "Yes. Copy the Next.js CRM builder markdown from saascrm.site, paste it into Cursor chat, and fill in your business description at the bottom. Same spec, different runtime."
  - q: "Does Claude Skills require a backend?"
    a: "The SaaSCRM skills produce in-memory demo CRMs on purpose. If you later want a real API, that is a separate ask — the skill will not half-wire fetch calls."
---

*Target keywords — Primary: claude crm · Long-tail: ai crm builder, crm prompt template, claude skills, train Claude to build CRM, SKILL.md CRM Next.js, Cursor CRM prompt vs Claude skill*

I got tired of pasting the same CRM spec into Claude every week. Leads vs listings. Pipeline stages. Which columns are currency. Don't invent a Companies page. Don't wire a fake REST API. Don't ship the default Inter-plus-indigo "AI dashboard."

So I trained Claude the way Anthropic actually wants you to train it: a **Claude Skill** — a `SKILL.md` with a trigger description, plus reference files for the [SaaSCRM](https://saascrm.site) entity model. Then I published the same instructions as a **CRM prompt template** you can paste into Cursor.

This is the write-up: why a skill beats a chat, what I packed into it, and how to run it from [saascrm.site](https://saascrm.site) in about two minutes.

## What "training Claude" actually means

Claude does not fine-tune on your SaaS from a marketing site visit. **Claude Skills** (also called Agent Skills) are folders Claude loads when the task matches the skill `description`. Anthropic's own [custom skills guide](https://claude.com/docs/skills/how-to?ref=saascrm.site) is blunt: at minimum you need a directory with `SKILL.md`, YAML `name` + `description`, and markdown instructions. Optional `references/` hold the spec you don't want stuffed into every turn.

That is the official **claude skills** model — not a mystery "I uploaded my product." [Agent Skills on the Claude platform](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview?ref=saascrm.site) work the same way across claude.ai, Claude Code, and the API: once the skill is available, Claude uses it when the request is relevant.

For **claude crm** work, that description has to say *when* to fire: "scaffold a CRM, sales tracker, pipeline, or leads table — even if the user never says CRM." Otherwise Claude writes a to-do app with a sidebar.

We already made the *website* agent-readable with [`llms.txt`, `agents.md`, and OpenAPI](https://saascrm.site/blog/we-made-saascrm-agent-ready-llms-txt). Skills are the next layer: they teach the *builder* how to emit a CRM that looks like SaaSCRM, not a random admin.

## Why "build me a CRM" keeps failing

People are shipping CRMs with Claude Code in 2026 — contacts, kanban, login — by talking in English. Tutorials exist. The failure mode is not "Claude can't code." It is **no durable CRM brain**.

A naked prompt forgets:

- **Which entities you actually need.** Canonical SaaSCRM set is leads, contacts, companies, deals, pipelines, invoices, payments, tasks. A freelancer rarely needs all eight. Our [agency CRM](https://saascrm.site/blog/agency-crm) write-up exists because agencies need projects *and* invoices, not another generic deal board.
- **Column types.** Status is a badge-select. Amount is currency. Owner is a person cell. Notes belong in a sheet, not a 400px table column.
- **Scope.** Two to four pages covering the workflow. Not a 60-screen dump on day one. That is the same lesson as [planning a CRM in two minutes](https://saascrm.site/blog/plan-your-crm-in-2-minutes-with-ai-builder).
- **Frontend-only until you ask.** Half-wired `fetch` calls to `/api/leads` that 404 are worse than mock state.

Meanwhile the category still has a people problem, not a feature problem. Roughly [55% of CRM implementations miss their objectives](https://wavecnct.com/blogs/crm-statistics?ref=saascrm.site), mostly adoption and data — which is why [choosing a SaaS CRM for small business in 2026](https://saascrm.site/blog/saas-crm-for-small-business-in-2026) is about daily use, not logo. If Claude generates a 40-field Salesforce clone, you just automated the same abandonment.

An **ai crm builder** is useful when it encodes those constraints *before* the first file is written.

## What I packed into the SaaSCRM Claude skill

Two zip skills live on the homepage card "Ask Claude to Build CRM":

- Next.js (App Router layout, `app/(crm)/…`)
- Vite + React (`react-router-dom`)

Each zip is a real skill directory: `SKILL.md` plus `references/` for design tokens, column types, table components, and SaaSCRM context grounded in [saascrm.site/llms.txt](https://saascrm.site/llms.txt) and the [API map](https://saascrm.site/docs/api).

The skill forces a workflow:

1. **Extract the spec** from the business description — domain, ordered stages, implied entities, their words ("donors", "listings").
2. **Pick 2–4 pages**, dashboard only if they asked for an overview.
3. **Cap tables at 5–7 columns**; rest in a row-detail sheet. Map signals to editors (Select + Badge, Calendar, Combobox, currency prefix).
4. **Use the repo's shadcn/Tailwind tokens** if they exist; otherwise a documented slate/new-york default.
5. **Seed mock data + a Sonner activity loop** so the CRM feels alive without a backend.
6. **Report** entities, paths, and that state is in-memory.

Guardrail, copied into the skill on purpose: never wire a real API unless the user explicitly asks. Same honesty we use when we [keep shipping templates](https://saascrm.site/blog/why-i-keep-building-crm-templates) instead of pretending every founder needs a 12-month seat contract.

If you want to *see* the UI the skill is aiming at, open the [live demo](https://saascrm.site/demo) or the [templates gallery](https://saascrm.site/templates) first — then describe *your* workflow, not ours.

## How to run it in Claude (the skill)

Anthropic's [Claude Code custom skills docs](https://code.claude.com/docs/en/custom-skills?ref=saascrm.site) match what we ship: `SKILL.md` frontmatter + body, extras in `references/`. On claude.ai you upload the `.skill` zip (it's a zip) under Skills. In Claude Code you can drop the folder under `.claude/skills/`.

**Steps**

1. Go to [saascrm.site](https://saascrm.site) and open **Ask Claude to Build CRM**.
2. **Download skills** → Next.js or Vite.
3. Upload in Claude (or unzip into `.claude/skills/` for Claude Code). Enable the skill.
4. Prompt in plain English, for example:  
   *Build a CRM for a solar installer. Lead comes in → site visit → quote → install → paid. I need leads and a job pipeline, not a separate companies directory.*
5. Claude should load the skill from the description (CRM / pipeline / leads) and scaffold only what that workflow needs.

If it doesn't fire, invoke it by name or tighten the ask: "Use the SaaSCRM Next.js CRM builder skill." Trigger text in `description` is the whole game — Anthropic says Claude uses it to decide when to load the skill.

This is **claude crm** as a reusable tool, not a one-off gist you lose in chat history.

## The same spec as a CRM prompt template (Cursor)

Cursor does not ingest `.skill` zips the same way. So the homepage **Copy Cursor prompt** CTA fetches our Next.js builder markdown — the full **crm prompt template**: extract spec, pages, column-type table, file layout, fake-activity loop, guardrails, then a placeholder for *your* business at the bottom.

Paste it into Cursor Agent chat, fill in the business block, run. Same domain model as Claude. Different host.

That split is intentional:

| | Claude | Cursor |
| --- | --- | --- |
| Artifact | `.skill` zip (`SKILL.md` + refs) | Prompt markdown |
| How you load it | Upload / `.claude/skills/` | Copy-paste once per chat (or save as a project rule) |
| Best for | Repeatable "build me a CRM" in Claude | Repos already open in Cursor |

If you already use our in-browser [AI CRM Builder](https://saascrm.site/blueprint), treat it as the *plan* (pages, stack, timeline). The skill/prompt is the *scaffold* that writes the tables.

Migrating from a spreadsheet? Describe the columns you already have — same as [Excel to CRM](https://saascrm.site/blog/excel-to-crm-migration) — and tell Claude not to invent extras.

## Tips that actually change the output

**Write stages in order.** The skill turns workflow steps into badge options *and* kanban column order. "Lead → visit → quote → paid" is better than "we sell solar."

**Name the nouns.** If you say "jobs" not "deals," the UI should say jobs. Generic "opportunities" is how you get a tool nobody on the van will open.

**Cap ambition.** Ask for leads + pipeline first. Add invoices in a second pass. That matches how we ship [vertical templates](https://saascrm.site/blog/six-crm-templates-you-can-demo-today): one workflow, not the universe.

**Keep it frontend until data is real.** Mock rows plus a toast loop sell the demo. Wiring Supabase on day one is a different project — there are [Claude + Supabase CRM write-ups](https://vibecodingschool.io/blog/build-custom-crm-claude-code-supabase?ref=saascrm.site) if that's the goal. Our skill will refuse to half-do it.

**Don't confuse this with a hosted CRM.** Nucleus-style ROI stats still assume a team *uses* the system. A generated UI you never log into is still in the [failure-rate bucket](https://www.lowcode.agency/blog/crm-implementation-failure-rate?ref=saascrm.site). Open it daily or don't bother.

**Optional: other harnesses.** Projects like [Atomic CRM Builder](https://github.com/marmelab/crm-builder?ref=saascrm.site) orchestrate a whole Claude Code team on a template. We went the opposite direction: one skill, SaaSCRM-shaped, downloadable from the marketing site.

## Conclusion

I didn't "fine-tune Claude on SaaSCRM." I packaged the boring parts of building a CRM — entities, column types, file layout, no fake API — into **Claude Skills** and a **CRM prompt template**, then hung them on [saascrm.site](https://saascrm.site) under **Ask Claude to Build CRM**.

If you want a **claude crm** that matches *your* stages instead of a generic kanban, that's the loop: download the skill or copy the prompt, describe one workflow, get 2–4 editable pages with mock data.

**Next steps**

1. [Download the Next.js or Vite Claude skill](https://saascrm.site/#build-with-claude)
2. [Copy the Cursor CRM prompt](https://saascrm.site/#build-with-claude)
3. [Plan modules in the AI Builder](https://saascrm.site/blueprint) if you still don't know the pages
4. [Click through the live demo](https://saascrm.site/demo) so you know what "good" looks like
5. Ready to own the full kit? [Pricing from $49](https://saascrm.site/pricing) · custom build: [shreyvijayvargiya26@gmail.com](mailto:shreyvijayvargiya26@gmail.com)

Cheers,  
**Shrey** — creator of [SaaSCRM.site](https://saascrm.site)
