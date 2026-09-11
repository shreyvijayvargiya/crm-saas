---
name: saascrm-blog-writer
description: Research and write a full SEO/AEO-ready blog article for saascrm.site (or Karyam/Shrey's other properties) given just a title and/or a list of headings. Covers trending-topic research, traffic-keyword selection, drafting the article to the requested structure, finding real internal hyperlinks from saascrm.site to weave in, finding external authoritative backlinks/citations to weave in, and saving the final piece as a markdown file. Use this whenever Shrey gives a blog title, a topic, or a set of headings and asks to write/draft/create an article, post, or blog — especially when he also asks for "good traffic keywords," "hyperlinks," "backlinks," or wants it to be the "best/top" result for the topic. Also trigger on "write me a new blog on X" or "give me an article for these headings."
---

# SAASCRM Blog Writer

Turns a title + optional headings into a publish-ready markdown article: researched, keyword-targeted, and internally/externally linked — matching the workflow already validated with Shrey on the AEO 2026 article.

## When to use this

- Shrey gives a topic/title and asks for a blog post, article, or draft.
- He supplies a list of headings/sections he wants covered.
- He asks to "find good traffic keywords" for a topic.
- He asks for "hyperlinks and backlinks" for an existing or new draft.
- He says something like "write a new blog for the title and topic given" — this skill IS that process.

If he only wants a content *calendar* or list of *ideas* (not a full drafted article), that's a lighter task — don't over-apply this whole pipeline, just brainstorm.

## The workflow

Do these steps in order. Don't skip the research steps even if the topic feels familiar — keyword and SERP landscape changes fast, and stale assumptions produce a worse article than what's actually ranking right now.

### 1. Confirm inputs (skip if already given)

You need: a working title or topic, and ideally a list of headings/sections. If headings aren't given, propose a sensible structure yourself (see "Default structure" below) rather than asking — only ask if the topic itself is ambiguous.

### 2. Research the topic

Run 5–10 `web_search` queries covering:
- The core definition/concept + current year (e.g. "`<topic>` 2026 trend")
- "why is `<topic>` trending" / "importance of `<topic>`"
- Practical/how-to angles implied by the headings (e.g. "how to test X", "how to measure X score")
- A tools/landscape query if the topic has a tooling ecosystem (e.g. "best `<topic>` tools 2026")

Use `web_fetch` on any particularly strong source to pull more detail before citing it. Favor original sources (vendor blogs with data, comprehensive guides, named studies) over aggregators.

### 3. Pick traffic keywords

Identify:
- **1 primary keyword** — the head term for the topic (higher volume, higher competition)
- **4–6 long-tail keywords** — lower competition, higher intent, and skewed toward Shrey's actual audience (technical founders, indie hackers, developers — not generic marketers). Long-tail terms are usually the ones this piece can realistically rank for fast, since head terms are typically already owned by funded content teams.

State the primary + long-tail list to the user before or alongside the draft (don't bury it) — this was explicitly asked for last time and is worth surfacing by default.

### 4. Draft the article

Write in markdown. Target length: 1,500–2,500 words for a full guide-style post (adjust down if headings are fewer/lighter).

**Default structure** (use if no headings given): title → short hook intro (1–2 paragraphs, states the stakes plainly) → what-is/definition section → why it matters section → practical/how-to section(s) → tips section → conclusion.

**Voice**: direct, practical, written for a technical/builder audience. Short paragraphs. Bullets for lists of tactics or tools. Bold the lead-in of each bullet when it's a distinct tactic (matches the AEO article's style). Avoid marketing fluff ("game-changing", "unlock", "revolutionize"). Every section should be usable on its own — assume an AI answer engine might lift a single paragraph out of context, so each one should stand alone and state a clear claim up front (this is itself an AEO best practice — apply it to everything you write here, not just AEO-topic posts).

Add a one-line note under the H1 stating the primary/secondary target keywords, matching the format used in the AEO article.

### 5. Find internal hyperlinks (ihatereading.in)

Fetch `https://saascrm.site` (or `https://saascrm.site/blog` for the fuller list, `https://saascrm.site/articles.json` for a machine-readable index) to get the *current* list of live posts — don't rely on memory of past posts, the blog publishes frequently and old links may 404 or better-fitting new ones may exist.

From the live list, pick 3–7 posts/pages that are topically adjacent to the article (shared theme: AI tooling, SaaS building, scraping/automation, SEO/content, directories, founder resources). Known stable utility pages worth considering regardless of topic:
- `/blog` — full article index
- `demo` - CRM demo of Nextjs Shadcn templates
- `/about`

Weave these **into the body prose at the point they're topically relevant** — never as a dumped list at the end. One or two per major section is plenty; more reads as link-stuffing (and link-stuffing is bad for both classic SEO and AEO, since it signals low-trust content to both crawlers and models).

### 6. Find external backlinks/citations

From the research done in step 2, pick 5–8 authoritative external sources to cite inline as hyperlinks — the same sources you'd already used to support specific claims. Prioritize:
- Named studies/stats (funding numbers, traffic %, adoption data)
- Comprehensive guides from recognized publishers in the space
- Primary sources (vendor docs, official guides) over aggregator roundups

Same rule as internal links: weave inline at the point of the claim they support, not batched at the bottom. Every external link should be attached to a specific claim, not a generic "further reading."

