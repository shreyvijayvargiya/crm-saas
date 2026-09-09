---
title: "We Made SaaSCRM Agent-Ready: llms.txt, agents.md, MCP, and an OpenAPI Spec Explained"
description: "Why saascrm.site ships llms.txt, agents.md, an OpenAPI spec, and MCP docs — what each file actually does, what it does not do for AI citations, and how to copy the pattern for your own SaaS."
date: "2026-09-07"
author: "Shrey"
image: "/screenshots-marketing-page/saas-crm-dashboard.png"
imageAlt: "SaaSCRM dashboard — the CRM template built to be read by humans and AI agents"
keywords: "llms.txt, agents.md, AI agent ready website, MCP for SaaS, agentic engine optimization"
tags:
  - llms.txt
  - agents.md
  - MCP
  - AI
---

Hello folks

Most CRM templates are built for a person scrolling a landing page. We built SaaSCRM to also be evaluated by something else: an AI agent reading the page for someone else, or a coding agent trying to extend the codebase without a human walking it through the file structure.

That's why saascrm.site ships a `llms.txt`, an `agents.md`, an OpenAPI spec, and MCP docs alongside the normal marketing site. This post is the honest version of why, what's actually in each file, and what we'd tell you before you copy the pattern.

## Why bother — the short version

Buyer research and coding work both increasingly route through an AI layer before a human looks at anything directly. A founder asks an assistant to shortlist CRM templates. A developer points Cursor or Claude Code at a new dependency and expects it to understand the codebase in one pass, not by reading fifteen component files.

Neither of those workflows is well served by a page designed purely for a human scrolling and clicking. Dense navs, marketing copy, and JavaScript-rendered content all cost an agent time and context it doesn't have to spend.

Being "agent-ready" is the practice of removing that cost: giving agents a direct, structured path to the facts instead of making them infer everything from a styled webpage.

## The four files, and what each one actually does

**`llms.txt` — a plain-text index for AI agents.**
Defined by Jeremy Howard's llms.txt proposal, it's a short Markdown file at the site root that lists what the product is and links to the pages an agent should read first — pricing, docs, API reference — instead of the full nav. [SaaSCRM's llms.txt](https://saascrm.site/llms.txt) does exactly this: a one-paragraph description of the product plus direct links to `/demo`, `/docs`, `/docs/api`, and `/pricing`.

**`agents.md` — a README written for coding agents, not humans.**
Where llms.txt is about *discovering* a site, agents.md is about *working inside* a codebase — build commands, code conventions, and project structure, read by Cursor, GitHub Copilot, OpenAI Codex, Gemini CLI, and similar tools before they touch your code. [SaaSCRM's agents.md](https://saascrm.site/agents.md) tells a coding agent how the Pages Router routes are structured, where the shadcn/ui components live, and how to extend a CRM module consistently — the same rules that let us tell an agent "add a Quotes page like Invoices" and get a correct result in one prompt, the pattern we lean on constantly building [custom CRM modules for clients](https://saascrm.site/blog/agency-crm).

**OpenAPI spec — a machine-readable contract for the API.**
[SaaSCRM's `openapi.yaml`](https://saascrm.site/openapi.yaml) documents the CRM's endpoints in a format any agent or API client can parse directly, rather than scraping prose from a docs page.

**MCP docs — how an agent can act on the product, not just read about it.**
[SaaSCRM's MCP documentation](https://saascrm.site/docs/mcp) covers the Model Context Protocol integration that lets an AI assistant call the CRM's tools directly — the same tool-calling pattern behind the [agentic chatbot inside the CRM demo itself](https://saascrm.site/demo), and conceptually a cousin of the WebMCP standard now shipping in Chrome, which lets a page register callable tools for agents rather than just being read by them.

## Why this matters more than it did a year ago

Two adoption numbers back this up. Per Addy Osmani, more than 60,000 open-source repositories had shipped an AGENTS.md by early 2026 — real, measurable usage by coding agents. And the ecosystem around this has already split into its own vocabulary: Osmani's framing for "structuring content so AI coding agents can actually use it" is now called **Agentic Engine Optimization**, distinct from the AEO/GEO work aimed at answer engines and chat search — worth knowing if you've seen both acronyms and assumed they meant the same thing.

## The part most posts on this topic skip

Here's the honest caveat: llms.txt currently has **no measurable effect on being cited by AI answer engines**. Google's John Mueller has said directly that no major AI system uses llms.txt for that purpose, and a 500-million-event bot-traffic analysis found only a few hundred requests actually targeting llms.txt directly — negligible against total AI crawler traffic. If your goal is showing up inside a ChatGPT or Perplexity answer, llms.txt isn't the lever — the entity-consistency and structured-content work covered in [our AEO guide](https://saascrm.site/blog) is closer to what actually moves that needle.

What llms.txt and agents.md *do* reliably help with is a narrower, more practical job: routing IDE agents, MCP servers, and coding assistants that are already working with your product or codebase. That's B2A (business-to-agent) infrastructure, not a citation hack — and for a CRM template that's meant to be extended by exactly those tools, it's directly useful rather than speculative.

## How to add this to your own SaaS

- **Write `llms.txt` first — it's the cheapest one.** A short description plus links to your 4-5 most important pages (pricing, docs, API reference) takes well under a day.
- **Add `agents.md` if you ship code anyone (human or agent) will extend.** Cover build/test commands, folder structure, and any hard conventions — treat it like a README aimed at a very literal new hire.
- **Only publish an OpenAPI spec if your API is stable.** A stale spec actively misleads an agent, which is worse than having none.
- **Keep every file current.** A stale llms.txt or agents.md is worse than not having one — treat it like code, not like marketing copy that can drift.
- **Don't expect an SEO or answer-engine bump from this.** Ship it for the agents that already read it (coding tools, MCP clients), not as a shortcut into AI Overviews.
- **List it in your sitemap and link to it from your footer**, the same way we link `llms.txt`, `agents.md`, and the OpenAPI spec from every page footer on saascrm.site — that visibility is what lets an agent find the file at all.

## Conclusion

Agent-readiness isn't a replacement for a good landing page or a well-documented API — it's an additional, cheap layer on top of both, aimed at a reader that's a lot more literal than a human and a lot less patient with noise. For SaaSCRM specifically, it's also just consistent with what we're already selling: a CRM template built around an agentic chatbot and OpenRouter tool-calling. Shipping `llms.txt`, `agents.md`, MCP docs, and an OpenAPI spec is the same idea applied to the site itself, not just the product inside it.
