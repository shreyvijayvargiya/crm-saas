const { SITE_URL, BRAND_NAME } = require("./site");

const OPENAPI_YAML = `openapi: 3.0.3
info:
  title: SaaSCRM API
  version: "1.0.0"
  description: |
    Reference OpenAPI contract for SaaSCRM (${SITE_URL}).

    SaaSCRM is a Next.js CRM / Admin / CMS frontend template. This spec documents
    the intended REST API you host after purchase. saascrm.site does not currently
    serve a live multi-tenant CRM API.
  contact:
    name: SaaSCRM
    email: shreyvijayvargiya26@gmail.com
    url: ${SITE_URL}/docs
  license:
    name: MIT
servers:
  - url: https://{customerHost}/api/v1
    description: Buyer-hosted SaaSCRM API
    variables:
      customerHost:
        default: api.example.com
tags:
  - name: Leads
  - name: Contacts
  - name: Deals
  - name: Invoices
  - name: Webhooks
paths:
  /leads:
    get:
      tags: [Leads]
      summary: List SaaSCRM leads
      security: [{ ApiKeyAuth: [] }]
      parameters:
        - in: query
          name: q
          schema: { type: string }
      responses:
        "200":
          description: Lead list
          content:
            application/json:
              schema:
                type: object
                properties:
                  leads:
                    type: array
                    items: { $ref: "#/components/schemas/Lead" }
    post:
      tags: [Leads]
      summary: Create a SaaSCRM lead
      security: [{ ApiKeyAuth: [] }]
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/Lead" }
      responses:
        "201":
          description: Created
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Lead" }
  /leads/{id}:
    get:
      tags: [Leads]
      summary: Get a SaaSCRM lead
      security: [{ ApiKeyAuth: [] }]
      parameters:
        - $ref: "#/components/parameters/Id"
      responses:
        "200":
          description: Lead
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Lead" }
        "404":
          description: Not found
  /contacts:
    get:
      tags: [Contacts]
      summary: List SaaSCRM contacts
      security: [{ ApiKeyAuth: [] }]
      responses:
        "200":
          description: Contact list
    post:
      tags: [Contacts]
      summary: Create a SaaSCRM contact
      security: [{ ApiKeyAuth: [] }]
      responses:
        "201":
          description: Created
  /deals:
    get:
      tags: [Deals]
      summary: List SaaSCRM deals
      security: [{ ApiKeyAuth: [] }]
      responses:
        "200":
          description: Deal list
    post:
      tags: [Deals]
      summary: Create a SaaSCRM deal
      security: [{ ApiKeyAuth: [] }]
      responses:
        "201":
          description: Created
  /invoices:
    get:
      tags: [Invoices]
      summary: List SaaSCRM invoices
      security: [{ ApiKeyAuth: [] }]
      responses:
        "200":
          description: Invoice list
    post:
      tags: [Invoices]
      summary: Create a SaaSCRM invoice
      security: [{ ApiKeyAuth: [] }]
      responses:
        "201":
          description: Created
  /webhooks:
    get:
      tags: [Webhooks]
      summary: List SaaSCRM webhook subscriptions
      security: [{ ApiKeyAuth: [] }]
      responses:
        "200":
          description: Webhook list
    post:
      tags: [Webhooks]
      summary: Create a SaaSCRM webhook subscription
      security: [{ ApiKeyAuth: [] }]
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/Webhook" }
      responses:
        "201":
          description: Created
components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
      description: SaaSCRM API key from the /api-keys screen once persisted on your backend
  parameters:
    Id:
      name: id
      in: path
      required: true
      schema: { type: string }
  schemas:
    Lead:
      type: object
      properties:
        id: { type: string }
        name: { type: string }
        email: { type: string, format: email }
        company: { type: string }
        status: { type: string }
    Webhook:
      type: object
      required: [url, events]
      properties:
        id: { type: string }
        name: { type: string }
        url: { type: string, format: uri }
        events:
          type: array
          items:
            type: string
            enum:
              - lead.created
              - lead.updated
              - customer.created
              - customer.updated
              - customer.deleted
              - order.created
              - order.updated
              - order.cancelled
              - payment.succeeded
              - payment.failed
              - invoice.paid
              - invoice.overdue
        secret: { type: string }
`;

const OPENAPI_OBJECT = {
	openapi: "3.0.3",
	info: {
		title: `${BRAND_NAME} API`,
		version: "1.0.0",
		description: `Reference OpenAPI contract for SaaSCRM (${SITE_URL}). SaaSCRM is a Next.js CRM frontend template; host this API yourself.`,
		contact: {
			name: BRAND_NAME,
			email: "shreyvijayvargiya26@gmail.com",
			url: `${SITE_URL}/docs`,
		},
		license: { name: "MIT" },
	},
	servers: [
		{
			url: "https://{customerHost}/api/v1",
			description: "Buyer-hosted SaaSCRM API",
			variables: { customerHost: { default: "api.example.com" } },
		},
	],
	paths: {
		"/leads": { get: { summary: "List SaaSCRM leads" }, post: { summary: "Create a SaaSCRM lead" } },
		"/contacts": { get: { summary: "List SaaSCRM contacts" } },
		"/deals": { get: { summary: "List SaaSCRM deals" } },
		"/invoices": { get: { summary: "List SaaSCRM invoices" } },
		"/webhooks": { get: { summary: "List SaaSCRM webhooks" }, post: { summary: "Create a SaaSCRM webhook" } },
	},
};

const OPENAPI_JSON = `${JSON.stringify(OPENAPI_OBJECT, null, 2)}\n`;

function assertOpenApiTitle() {
	return OPENAPI_YAML.includes(`title: ${BRAND_NAME} API`);
}

module.exports = { OPENAPI_YAML, OPENAPI_JSON, OPENAPI_OBJECT, assertOpenApiTitle };
