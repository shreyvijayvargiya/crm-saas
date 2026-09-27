# SaaSCRM MCP server

SaaSCRM does not host a public Model Context Protocol endpoint today. The product's agent interface is the in-app CRM copilot (OpenRouter tool-calling) plus Cursor rules in the open-source repository.

## What to expose as MCP tools

The template's AI layer already describes tools that read and write the in-memory CRM snapshot (leads, deals, invoices, tasks, and related records). When you add a backend, wrap the same operations as MCP tools:

- `list_leads`, `get_lead`, `create_lead`, `update_lead`
- `list_deals`, `update_deal_stage`
- `list_invoices`, `create_invoice`
- `search_crm` across contacts, companies, and activity

## How agents should connect

1. Humans use the SaaSCRM demo chatbot at https://saascrm.site/demo.
2. Coding agents should start at [llms.txt](https://saascrm.site/llms.txt) and the [SaaSCRM API docs](https://saascrm.site/docs/api.md).
3. To run a local MCP server, clone the repo and map those tools onto your API using the OpenAPI spec at https://saascrm.site/openapi.yaml.

A hosted `mcp.saascrm.site` server would require a live backend and credentials — that is a product decision, not part of this frontend template.
