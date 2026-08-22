# SaaSCRM API docs

SaaSCRM ships a frontend-only CRM template. Use this page as the intended REST contract when you connect a backend. The shapes match `schemas/zod-schemas/` and `data.json` in the purchased source.

Base URL (when you host the API): `https://{your-domain}/api/v1`

Authentication: send `Authorization: Bearer <api_key>` or `X-API-Key: <api_key>`. Create and rotate keys in the SaaSCRM API Keys demo at https://saascrm.site/api-keys, then persist them in your own store.

## Resources

| Resource | Methods | Notes |
| --- | --- | --- |
| `/leads` | GET, POST | List, search, and create leads |
| `/leads/{id}` | GET, PATCH, DELETE | Lead profile and stage updates |
| `/contacts` | GET, POST | People linked to companies |
| `/contacts/{id}` | GET, PATCH, DELETE | Contact detail |
| `/companies` | GET, POST | Accounts |
| `/deals` | GET, POST | Opportunities with value and owner |
| `/pipelines` | GET | Kanban stages used by deals and leads |
| `/invoices` | GET, POST | Line items and status |
| `/payments` | GET, POST | Payment records linked to invoices |
| `/tasks` | GET, POST | Work items and due dates |
| `/webhooks` | GET, POST | Outbound event subscriptions |

## Example: create a lead

```http
POST /api/v1/leads
Authorization: Bearer $SAASCRM_API_KEY
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "company": "Analytical Engines",
  "status": "New"
}
```

## Spec and related docs

- Machine-readable spec: https://saascrm.site/openapi.yaml
- Auth: https://saascrm.site/docs/auth.md
- Webhooks: https://saascrm.site/docs/webhooks.md
- MCP: https://saascrm.site/docs/mcp.md
- Schema browser in the template: https://saascrm.site/about
