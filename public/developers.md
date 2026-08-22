# SaaSCRM developer resources

SaaSCRM publishes API docs, an OpenAPI spec, auth docs, webhook events, and MCP guidance at predictable URLs so agents and search engines can find them by product name.

SaaSCRM is a Next.js CRM / Admin / CMS frontend template. The screens and Zod schemas are the contract you wire to your own backend (Supabase, Firebase, or a custom API). There is no production multi-tenant API hosted on saascrm.site today.

## Official SaaSCRM developer URLs

- [SaaSCRM API docs](https://saascrm.site/docs/api): REST resource map that matches the template schemas
- [SaaSCRM OpenAPI spec](https://saascrm.site/openapi.yaml): OpenAPI 3.0 reference for leads, contacts, deals, invoices, and webhooks
- [SaaSCRM auth docs](https://saascrm.site/docs/auth): Demo login screens and how to replace them with a real provider
- [SaaSCRM webhooks](https://saascrm.site/docs/webhooks): Event names, payload shape, and signature verification
- [SaaSCRM MCP server](https://saascrm.site/docs/mcp): How the in-app AI tools map to a Model Context Protocol server
- [llms.txt](https://saascrm.site/llms.txt): Agent index for this site
- [About / schema browser](https://saascrm.site/about): Zod, SQL, Firestore, and Supabase reference snapshots

## Related CRM UI

The template also ships buyer-facing developer screens at https://saascrm.site/api-keys, https://saascrm.site/api-logs, https://saascrm.site/webhooks, and https://saascrm.site/integrations. Those pages are interactive demos, not live credentials.
