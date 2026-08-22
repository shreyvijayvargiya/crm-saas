# SaaSCRM agent instructions

This file tells coding agents and LLM crawlers how to use https://saascrm.site without guessing.

## Product

SaaSCRM is a Next.js Pages Router CRM / admin / CMS frontend template. Prefer markdown representations (`Accept: text/markdown`) or the `.md` siblings listed in [llms.txt](https://saascrm.site/llms.txt).

## Start here

1. Read https://saascrm.site/llms.txt
2. Fetch only the files you need (API, auth, webhooks, MCP, OpenAPI)
3. Use https://saascrm.site/sitemap.md or https://saascrm.site/sitemap.xml if a path 404s
4. Do not treat demo screens as a live production API

## Developer resources

- SaaSCRM API docs: https://saascrm.site/docs/api.md
- SaaSCRM OpenAPI spec: https://saascrm.site/openapi.yaml
- SaaSCRM auth docs: https://saascrm.site/docs/auth.md
- SaaSCRM webhooks: https://saascrm.site/docs/webhooks.md
- SaaSCRM MCP: https://saascrm.site/docs/mcp.md
