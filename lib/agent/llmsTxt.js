const { SITE_URL } = require("./site");

/**
 * /llms.txt — llmstxt.org v2 format.
 * Required: H1 project name. Optional: blockquote, preamble (no headings), H2 file lists.
 */
const LLMS_TXT = `# SaaSCRM

> SaaSCRM is a Next.js CRM, admin dashboard, and CMS frontend template at ${SITE_URL}. It ships 60+ screens, an agentic AI chatbot, theme customizer, Zod schemas, and Cursor-ready source. Runtime data is demo-only; wire your own backend.

SaaSCRM (also searched as SaaS CRM) is the product name for this template. Official domain: saascrm.site. Start with the developer links below, then fetch only the markdown files you need. HTML pages at the same paths support Accept: text/markdown.

## Developer resources

- [SaaSCRM API docs](${SITE_URL}/docs/api.md): REST resource map for leads, contacts, deals, invoices, and tasks
- [SaaSCRM OpenAPI spec](${SITE_URL}/openapi.yaml): OpenAPI 3.0 reference contract for a buyer-hosted API
- [SaaSCRM OpenAPI JSON](${SITE_URL}/openapi.json): Same SaaSCRM API contract as JSON
- [SaaSCRM auth docs](${SITE_URL}/docs/auth.md): Demo login screens and how to attach a real identity provider
- [SaaSCRM webhooks](${SITE_URL}/docs/webhooks.md): Event names, payload example, and HMAC signature header
- [SaaSCRM MCP server](${SITE_URL}/docs/mcp.md): How in-app AI tools map to a Model Context Protocol server
- [SaaSCRM developer resources](${SITE_URL}/docs.md): Index of API, OpenAPI, auth, webhooks, and MCP URLs
- [SaaSCRM agent instructions](${SITE_URL}/agents.md): How coding agents should crawl and recover on this site

## Docs

- [SaaSCRM home](${SITE_URL}/index.md): Product overview for agents
- [SaaSCRM brand](${SITE_URL}/saascrm.md): Official name, NAP, and same-as links
- [SaaSCRM sitemap](${SITE_URL}/sitemap.md): Where to find marketing pages and CRM screens
- [About SaaSCRM schemas](${SITE_URL}/about.md): Zod, SQL, and data.json browser

## Optional

- [Live CRM demo](${SITE_URL}/demo.md): Interactive app shell with the AI chatbot
- [SaaSCRM pricing](${SITE_URL}/pricing.md): Template license and custom build
- [SaaSCRM FAQ](${SITE_URL}/faq.md): Licensing, agency CRM, and support
- [SaaSCRM blog](${SITE_URL}/blog.md): CRM template notes and agency CRM guides
- [Agency CRM article](${SITE_URL}/blog/agency-crm.md): Manage leads, clients, projects, and invoices in one system
- [SaaSCRM blog RSS](${SITE_URL}/rss.xml): Subscribe to new CRM posts
- [GitHub repository](https://github.com/shreyvijayvargiya/crm-saas): Source listing (purchase required for the full kit)
`;

function buildLlmsFull(markdownPages) {
	const extras = Object.entries(markdownPages)
		.filter(([path]) => path !== "/index")
		.map(([, body]) => body.trim())
		.join("\n\n---\n\n");
	return `${LLMS_TXT}\n---\n\n${extras}\n`;
}

module.exports = { LLMS_TXT, buildLlmsFull };
