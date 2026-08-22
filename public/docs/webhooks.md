# SaaSCRM webhooks

SaaSCRM includes a Webhooks developer screen at https://saascrm.site/webhooks. Subscribe demo endpoints to CRM events, then implement the same event names on your backend.

## Events

- `lead.created`, `lead.updated`
- `customer.created`, `customer.updated`, `customer.deleted`
- `order.created`, `order.updated`, `order.cancelled`
- `payment.succeeded`, `payment.failed`
- `invoice.paid`, `invoice.overdue`

## Payload

```json
{
  "id": "evt_123",
  "type": "lead.created",
  "created_at": "2026-08-22T00:00:00.000Z",
  "data": { "id": "lead_1", "email": "ada@example.com" }
}
```

## Verification

Each subscription has a signing secret in the demo UI. On your backend, compute an HMAC-SHA256 of the raw body and compare it to the `X-SaaSCRM-Signature` header. Reject mismatched signatures.

Manage subscriptions in the UI or via `POST /api/v1/webhooks` as described in the [SaaSCRM API docs](https://saascrm.site/docs/api.md) and [OpenAPI spec](https://saascrm.site/openapi.yaml).
