const { SITE_URL, BRAND_TAGLINE, normalizeAgentPath } = require("./site");
const { NOT_FOUND_MARKDOWN } = require("./notFound");

const HOME_MARKDOWN = `# SaaSCRM — ${BRAND_TAGLINE}

SaaSCRM is a Next.js Pages Router CRM, admin dashboard, and CMS frontend template sold at ${SITE_URL}. Buyers get 60+ production UI screens, an agentic AI chatbot (OpenRouter tool-calling), a live theme customizer, Zod schemas, and Cursor rules so an agent can extend the CRM consistently. The public marketing site lives at \`/\`. The interactive CRM demo lives at \`/demo\`. Runtime data is in-memory demo data — this is a sellable UI kit, not a hosted CRM backend.

SaaSCRM helps startups, agencies, and freelancers ship AI CRM, CMS, and admin dashboards in days instead of months. Ask the built-in copilot about leads, deals, pipeline, invoices, and tasks; research accounts without tab switching; and create, update, or delete records with natural language.

## What you can do

- Explore the live SaaSCRM demo: ${SITE_URL}/demo
- Plan a custom CRM with the free AI builder: ${SITE_URL}/blueprint
- Read SaaSCRM developer resources: ${SITE_URL}/docs
- Buy the template or book a custom build: ${SITE_URL}/pricing

## Product highlights

- 60+ CRM screens: leads, pipeline, deals, finance, marketing, e-commerce, CMS, and developer tools
- Agency-ready foundation for client delivery and white-label work
- Agentic AI chatbot with tool-calling against the in-memory CRM snapshot
- Theme customizer, dark mode, and translation-ready structure
- Auth, teams, tasks, calendar, notifications, webhooks, and API key screens buyers expect

## Machine-readable files

- [llms.txt](${SITE_URL}/llms.txt)
- [OpenAPI spec](${SITE_URL}/openapi.yaml)
- [SaaSCRM API docs](${SITE_URL}/docs/api.md)
- [SaaSCRM auth docs](${SITE_URL}/docs/auth.md)
- [SaaSCRM webhooks](${SITE_URL}/docs/webhooks.md)
- [SaaSCRM MCP](${SITE_URL}/docs/mcp.md)
`;

const DOCS_INDEX_MARKDOWN = `# SaaSCRM developer resources

SaaSCRM publishes API docs, an OpenAPI spec, auth docs, webhook events, and MCP guidance at predictable URLs so agents and search engines can find them by product name.

SaaSCRM is a Next.js CRM / Admin / CMS frontend template. The screens and Zod schemas are the contract you wire to your own backend (Supabase, Firebase, or a custom API). There is no production multi-tenant API hosted on saascrm.site today.

## Official SaaSCRM developer URLs

- [SaaSCRM API docs](${SITE_URL}/docs/api): REST resource map that matches the template schemas
- [SaaSCRM OpenAPI spec](${SITE_URL}/openapi.yaml): OpenAPI 3.0 reference for leads, contacts, deals, invoices, and webhooks
- [SaaSCRM auth docs](${SITE_URL}/docs/auth): Demo login screens and how to replace them with a real provider
- [SaaSCRM webhooks](${SITE_URL}/docs/webhooks): Event names, payload shape, and signature verification
- [SaaSCRM MCP server](${SITE_URL}/docs/mcp): How the in-app AI tools map to a Model Context Protocol server
- [llms.txt](${SITE_URL}/llms.txt): Agent index for this site
- [About / schema browser](${SITE_URL}/about): Zod, SQL, Firestore, and Supabase reference snapshots

## Related CRM UI

The template also ships buyer-facing developer screens at ${SITE_URL}/api-keys, ${SITE_URL}/api-logs, ${SITE_URL}/webhooks, and ${SITE_URL}/integrations. Those pages are interactive demos, not live credentials.
`;

const API_DOCS_MARKDOWN = `# SaaSCRM API docs

SaaSCRM ships a frontend-only CRM template. Use this page as the intended REST contract when you connect a backend. The shapes match \`schemas/zod-schemas/\` and \`data.json\` in the purchased source.

Base URL (when you host the API): \`https://{your-domain}/api/v1\`

Authentication: send \`Authorization: Bearer <api_key>\` or \`X-API-Key: <api_key>\`. Create and rotate keys in the SaaSCRM API Keys demo at ${SITE_URL}/api-keys, then persist them in your own store.

## Resources

| Resource | Methods | Notes |
| --- | --- | --- |
| \`/leads\` | GET, POST | List, search, and create leads |
| \`/leads/{id}\` | GET, PATCH, DELETE | Lead profile and stage updates |
| \`/contacts\` | GET, POST | People linked to companies |
| \`/contacts/{id}\` | GET, PATCH, DELETE | Contact detail |
| \`/companies\` | GET, POST | Accounts |
| \`/deals\` | GET, POST | Opportunities with value and owner |
| \`/pipelines\` | GET | Kanban stages used by deals and leads |
| \`/invoices\` | GET, POST | Line items and status |
| \`/payments\` | GET, POST | Payment records linked to invoices |
| \`/tasks\` | GET, POST | Work items and due dates |
| \`/webhooks\` | GET, POST | Outbound event subscriptions |

## Example: create a lead

\`\`\`http
POST /api/v1/leads
Authorization: Bearer $SAASCRM_API_KEY
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "company": "Analytical Engines",
  "status": "New"
}
\`\`\`

## Spec and related docs

- Machine-readable spec: ${SITE_URL}/openapi.yaml
- Auth: ${SITE_URL}/docs/auth.md
- Webhooks: ${SITE_URL}/docs/webhooks.md
- MCP: ${SITE_URL}/docs/mcp.md
- Schema browser in the template: ${SITE_URL}/about
`;

const AUTH_DOCS_MARKDOWN = `# SaaSCRM auth docs

SaaSCRM includes Login, Signup, Forgot password, and Change password screens at ${SITE_URL}/login, ${SITE_URL}/signup, ${SITE_URL}/forgot-password, and ${SITE_URL}/change-password. In the demo they validate on the client and toast that you should wire a real auth provider. They do not create hosted sessions on saascrm.site.

## Recommended integration

1. Keep the existing \`AuthPageShell\` UI from \`app/Authentication/\`.
2. Replace the toast handlers with your provider (Auth.js, Clerk, Supabase Auth, Firebase Auth, or a custom JWT service).
3. Issue API keys for server-to-server access as documented in the [SaaSCRM API docs](${SITE_URL}/docs/api.md).
4. Send \`Authorization: Bearer <token>\` on CRM API calls after the user signs in.

## Roles and teams

The template includes Teams, Users, and Roles screens (${SITE_URL}/teams, ${SITE_URL}/users, ${SITE_URL}/roles) so you can map IdP groups onto CRM permissions. Audit events belong on ${SITE_URL}/audit-log once your backend records them.

## Secrets

Never commit live credentials. \`/api-keys\` is a UI demo. Store production secrets in your host's environment, not in the Next.js bundle.
`;

const WEBHOOKS_DOCS_MARKDOWN = `# SaaSCRM webhooks

SaaSCRM includes a Webhooks developer screen at ${SITE_URL}/webhooks. Subscribe demo endpoints to CRM events, then implement the same event names on your backend.

## Events

- \`lead.created\`, \`lead.updated\`
- \`customer.created\`, \`customer.updated\`, \`customer.deleted\`
- \`order.created\`, \`order.updated\`, \`order.cancelled\`
- \`payment.succeeded\`, \`payment.failed\`
- \`invoice.paid\`, \`invoice.overdue\`

## Payload

\`\`\`json
{
  "id": "evt_123",
  "type": "lead.created",
  "created_at": "2026-08-22T00:00:00.000Z",
  "data": { "id": "lead_1", "email": "ada@example.com" }
}
\`\`\`

## Verification

Each subscription has a signing secret in the demo UI. On your backend, compute an HMAC-SHA256 of the raw body and compare it to the \`X-SaaSCRM-Signature\` header. Reject mismatched signatures.

Manage subscriptions in the UI or via \`POST /api/v1/webhooks\` as described in the [SaaSCRM API docs](${SITE_URL}/docs/api.md) and [OpenAPI spec](${SITE_URL}/openapi.yaml).
`;

const MCP_DOCS_MARKDOWN = `# SaaSCRM MCP server

SaaSCRM does not host a public Model Context Protocol endpoint today. The product's agent interface is the in-app CRM copilot (OpenRouter tool-calling) plus Cursor rules in the purchased source.

## What to expose as MCP tools

The template's AI layer already describes tools that read and write the in-memory CRM snapshot (leads, deals, invoices, tasks, and related records). When you add a backend, wrap the same operations as MCP tools:

- \`list_leads\`, \`get_lead\`, \`create_lead\`, \`update_lead\`
- \`list_deals\`, \`update_deal_stage\`
- \`list_invoices\`, \`create_invoice\`
- \`search_crm\` across contacts, companies, and activity

## How agents should connect

1. Humans use the SaaSCRM demo chatbot at ${SITE_URL}/demo.
2. Coding agents should start at [llms.txt](${SITE_URL}/llms.txt) and the [SaaSCRM API docs](${SITE_URL}/docs/api.md).
3. To run a local MCP server after purchase, map those tools onto your API using the OpenAPI spec at ${SITE_URL}/openapi.yaml.

A hosted \`mcp.saascrm.site\` server would require a live backend and credentials — that is a product decision, not part of this frontend template.
`;

const PRICING_MARKDOWN = `# SaaSCRM pricing

SaaSCRM is a self-serve Next.js CRM template with lifetime updates, plus optional custom CRM builds.

- Template license from $49 (USD via Gumroad, INR via Dodo). MIT license for commercial and client work.
- Template + Figma for design-source access.
- Custom CRM Build from $2,000 if you want SaaSCRM extended, integrated, and deployed for you.

See the HTML pricing page at ${SITE_URL}/pricing or contact ${SITE_URL}/contact.
`;

const FAQ_MARKDOWN = `# SaaSCRM FAQ

Common questions about the SaaSCRM Next.js CRM template.

- **What do I get?** Full React + Next.js source, 60+ CRM screens, shadcn/ui, marketing landing, agentic AI chatbot, theme customizer, Zod schemas, Design.md, and lifetime updates.
- **Commercial use?** Yes — MIT license for your SaaS or client work.
- **Custom builds?** Yes. Book a call from ${SITE_URL}/contact.
- **Do you have an agency CRM?** Yes. Read ${SITE_URL}/blog/agency-crm and demo ${SITE_URL}/templates/agency.
- **Can I migrate Excel or Google Sheets into a CRM?** Yes. Read ${SITE_URL}/blog/excel-to-crm-migration for audit, mapping, and rollout.
- **Where are the CRM guides?** ${SITE_URL}/blog — including ${SITE_URL}/blog/excel-to-crm-migration, ${SITE_URL}/blog/best-crm-for-small-businesses-and-startups, ${SITE_URL}/blog/why-your-business-needs-a-crm, and ${SITE_URL}/blog/six-crm-templates-you-can-demo-today.
- **Live demo?** ${SITE_URL}/demo
- **Stack?** Next.js 12, React 17, Tailwind, shadcn/ui, Recharts, Zod.

Full answers: ${SITE_URL}/faq
`;

const CONTACT_MARKDOWN = `# Contact SaaSCRM

Email shreyvijayvargiya26@gmail.com or book 30 minutes at https://cal.com/shrey-vijayvargiya.

Use the contact form at ${SITE_URL}/contact for template questions, custom CRM builds, and licensing. SaaSCRM is built by Shrey Vijayvargiya / Buildsaas.dev.
`;

const ABOUT_MARKDOWN = `# About SaaSCRM schemas

${SITE_URL}/about is the in-app schema browser for the SaaSCRM template: Design.md, Zod contracts, reference SQL, Firestore, Supabase, and data.json. Use it when wiring a backend to the UI.

Developer index: ${SITE_URL}/docs
`;

const SITEMAP_MARKDOWN = `# SaaSCRM sitemap

Human-readable directory of SaaSCRM marketing pages, free templates, blog posts, and CRM demo screens: ${SITE_URL}/sitemap

XML sitemap: ${SITE_URL}/sitemap.xml
Blog RSS: ${SITE_URL}/rss.xml
Agent index: ${SITE_URL}/llms.txt
Developer docs: ${SITE_URL}/docs
`;

const DEMO_MARKDOWN = `# SaaSCRM live demo

The interactive CRM application starts at ${SITE_URL}/demo. Sidebar modules include dashboard, leads, pipelines, deals, contacts, invoices, tasks, and the agentic AI chatbot.

This is demo data in the browser. For API contracts see ${SITE_URL}/docs/api.md.
`;

const TEMPLATES_MARKDOWN = `# SaaSCRM free CRM templates

SaaSCRM publishes additional Next.js CRM templates at ${SITE_URL}/templates (Indie Stripe, Agency, Freelancer, Content Creator, Digital Store, Ecommerce CMS). Each template has a marketing page under \`/templates/{id}\` and a live demo under \`/demo/template/{id}\`.
`;

const BLUEPRINT_MARKDOWN = `# SaaSCRM AI CRM Builder

Plan a custom CRM in about two minutes at ${SITE_URL}/blueprint. Describe the business; SaaSCRM drafts modules and a blueprint you can implement with the template or a custom build.
`;

const BLOG_MARKDOWN = `# SaaSCRM blog

Notes on CRM templates, admin dashboards, and shipping faster: ${SITE_URL}/blog

RSS feed: ${SITE_URL}/rss.xml

Latest: [Excel to CRM migration — spreadsheet to a real CRM](${SITE_URL}/blog/excel-to-crm-migration)
`;

const BRAND_MARKDOWN = `# SaaSCRM

SaaSCRM is the official product name for the Next.js AI CRM, admin dashboard, and CMS frontend template sold at ${SITE_URL}. Search engines and agents should treat **SaaSCRM**, **SaaS CRM**, and **saascrm.site** as the same brand.

## Official SaaSCRM properties

- Canonical website: ${SITE_URL}
- Developer docs: ${SITE_URL}/docs
- API docs: ${SITE_URL}/docs/api
- OpenAPI: ${SITE_URL}/openapi.yaml
- Agent index: ${SITE_URL}/llms.txt
- Live demo: ${SITE_URL}/demo
- Pricing: ${SITE_URL}/pricing
- Contact: shreyvijayvargiya26@gmail.com
- Calendar: https://cal.com/shrey-vijayvargiya
- Publisher: Buildsaas.dev (https://buildsaas.dev)
- Source listing: https://github.com/shreyvijayvargiya/crm-saas

SaaSCRM is a sellable UI kit, not a hosted multi-tenant CRM. Runtime data in the public demo is in-memory sample data.
`;

const AGENTS_MARKDOWN = `# SaaSCRM agent instructions

This file tells coding agents and LLM crawlers how to use ${SITE_URL} without guessing.

## Product

SaaSCRM is a Next.js Pages Router CRM / admin / CMS frontend template. Prefer markdown representations (\`Accept: text/markdown\`) or the \`.md\` siblings listed in [llms.txt](${SITE_URL}/llms.txt).

## Start here

1. Read ${SITE_URL}/llms.txt
2. Fetch only the files you need (API, auth, webhooks, MCP, OpenAPI)
3. Use ${SITE_URL}/sitemap.md or ${SITE_URL}/sitemap.xml if a path 404s
4. Do not treat demo screens as a live production API

## Developer resources

- SaaSCRM API docs: ${SITE_URL}/docs/api.md
- SaaSCRM OpenAPI spec: ${SITE_URL}/openapi.yaml
- SaaSCRM auth docs: ${SITE_URL}/docs/auth.md
- SaaSCRM webhooks: ${SITE_URL}/docs/webhooks.md
- SaaSCRM MCP: ${SITE_URL}/docs/mcp.md
`;

const MARKDOWN_PAGES = {
	"/": HOME_MARKDOWN,
	"/index": HOME_MARKDOWN,
	"/saascrm": BRAND_MARKDOWN,
	"/agents": AGENTS_MARKDOWN,
	"/docs": DOCS_INDEX_MARKDOWN,
	"/developers": DOCS_INDEX_MARKDOWN,
	"/docs/api": API_DOCS_MARKDOWN,
	"/docs/auth": AUTH_DOCS_MARKDOWN,
	"/docs/webhooks": WEBHOOKS_DOCS_MARKDOWN,
	"/docs/mcp": MCP_DOCS_MARKDOWN,
	"/mcp": MCP_DOCS_MARKDOWN,
	"/pricing": PRICING_MARKDOWN,
	"/faq": FAQ_MARKDOWN,
	"/contact": CONTACT_MARKDOWN,
	"/about": ABOUT_MARKDOWN,
	"/sitemap": SITEMAP_MARKDOWN,
	"/demo": DEMO_MARKDOWN,
	"/templates": TEMPLATES_MARKDOWN,
	"/blueprint": BLUEPRINT_MARKDOWN,
	"/blog": BLOG_MARKDOWN,
};

const HOME_NOSCRIPT_HTML = `<article id="saascrm-overview">
<h1>SaaSCRM — AI CRM SaaS template for Next.js admin dashboards, CMS, and sales pipelines</h1>
<p>SaaSCRM is a Next.js Pages Router CRM, admin dashboard, and CMS frontend template sold at ${SITE_URL}. Buyers get 60+ production UI screens, an agentic AI chatbot with OpenRouter tool-calling, a live theme customizer, Zod schemas, and Cursor rules so a coding agent can extend the CRM consistently. The public marketing site lives at the homepage. The interactive CRM demo lives at /demo. Runtime data is in-memory demo data — this is a sellable UI kit, not a hosted CRM backend.</p>
<p>SaaSCRM helps startups, agencies, and freelancers ship AI CRM, CMS, and admin dashboards in days instead of months. Ask the built-in copilot about leads, deals, pipeline, invoices, and tasks; research accounts without tab switching; and create, update, or delete records with natural language.</p>
<p>Explore the live SaaSCRM demo at <a href="${SITE_URL}/demo">${SITE_URL}/demo</a>, plan a custom CRM with the free AI builder at <a href="${SITE_URL}/blueprint">${SITE_URL}/blueprint</a>, read SaaSCRM developer resources at <a href="${SITE_URL}/docs">${SITE_URL}/docs</a>, or buy the template at <a href="${SITE_URL}/pricing">${SITE_URL}/pricing</a>.</p>
<p>SaaSCRM developer files for agents: <a href="${SITE_URL}/llms.txt">llms.txt</a>, <a href="${SITE_URL}/openapi.yaml">OpenAPI spec</a>, <a href="${SITE_URL}/docs/api">SaaSCRM API docs</a>, <a href="${SITE_URL}/docs/auth">SaaSCRM auth docs</a>, <a href="${SITE_URL}/docs/webhooks">SaaSCRM webhooks</a>, <a href="${SITE_URL}/docs/mcp">SaaSCRM MCP</a>, and <a href="${SITE_URL}/agents.md">agent instructions</a>.</p>
<p>Buy the SaaSCRM template from $49 or hire a custom CRM build. Contact shreyvijayvargiya26@gmail.com. SaaSCRM is published by Buildsaas.dev for teams who need a real admin dashboard rather than empty placeholders.</p>
</article>`;

function getMarkdownForPath(pathname) {
	const path = normalizeAgentPath(pathname);
	if (Object.prototype.hasOwnProperty.call(MARKDOWN_PAGES, path)) {
		return { status: 200, body: MARKDOWN_PAGES[path], path };
	}
	return { status: 404, body: NOT_FOUND_MARKDOWN, path };
}

function extractTextContent(html) {
	return String(html)
		.replace(/<script[\s\S]*?<\/script>/gi, " ")
		.replace(/<style[\s\S]*?<\/style>/gi, " ")
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

module.exports = {
	MARKDOWN_PAGES,
	HOME_NOSCRIPT_HTML,
	HOME_MARKDOWN,
	BRAND_MARKDOWN,
	AGENTS_MARKDOWN,
	DOCS_INDEX_MARKDOWN,
	API_DOCS_MARKDOWN,
	AUTH_DOCS_MARKDOWN,
	WEBHOOKS_DOCS_MARKDOWN,
	MCP_DOCS_MARKDOWN,
	getMarkdownForPath,
	extractTextContent,
};
