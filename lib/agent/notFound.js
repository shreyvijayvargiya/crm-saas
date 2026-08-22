const { SITE_URL } = require("./site");

const NOT_FOUND_MARKDOWN = `# Page not found

This path does not exist on SaaSCRM (${SITE_URL}). The URL is not a valid product, docs, or demo page.

## Where to look next

- [SaaSCRM sitemap](${SITE_URL}/sitemap): HTML directory of marketing pages, templates, and CRM screens
- [llms.txt](${SITE_URL}/llms.txt): Agent index of SaaSCRM developer resources
- [SaaSCRM developer docs](${SITE_URL}/docs): API docs, OpenAPI spec, auth, webhooks, and MCP
- [SaaSCRM home](${SITE_URL}/): Product overview and live demo
- [XML sitemap](${SITE_URL}/sitemap.xml): Machine-readable URL list
`;

module.exports = { NOT_FOUND_MARKDOWN };
