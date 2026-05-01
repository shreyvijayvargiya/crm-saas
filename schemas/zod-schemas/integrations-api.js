import { z } from "zod";

export const IntegrationCardSchema = z.object({
	id: z.string(),
	name: z.string(),
	enabled: z.boolean(),
	tag: z.string(),
	lastUpdated: z.string(),
});

export const AppIntegrationsDataSchema = z.object({
	source: z.string().optional(),
	integrations: z.array(IntegrationCardSchema),
});

export const ApiKeyRecordSchema = z.object({
	id: z.string(),
	name: z.string(),
	key: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	status: z.string(),
});

export const ApiKeysStatsDisplaySchema = z.record(z.string(), z.string());

export const AppApiKeysDataSchema = z.object({
	source: z.string().optional(),
	initialApiKeys: z.array(ApiKeyRecordSchema),
	statsDisplay: ApiKeysStatsDisplaySchema,
});

export const WebhookRecordSchema = z.object({
	id: z.string(),
	name: z.string(),
	url: z.string(),
	events: z.array(z.string()),
	createdAt: z.string(),
	updatedAt: z.string(),
	status: z.string(),
	secret: z.string(),
});

export const AppWebhooksDataSchema = z.object({
	source: z.string().optional(),
	initialWebhooks: z.array(WebhookRecordSchema),
	availableEvents: z.array(z.string()),
});
