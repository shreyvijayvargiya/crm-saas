import { z } from "zod";

export const SubscriptionBillingIntervalSchema = z.enum(["Monthly", "Yearly"]);

export const SubscriptionPlanStatusSchema = z.enum(["Active", "Archived"]);

export const SubscriptionStatusSchema = z.enum([
	"Active",
	"Trialing",
	"Past Due",
	"Canceled",
	"Paused",
]);

export const SubscriptionEventTypeSchema = z.enum([
	"created",
	"renewed",
	"upgraded",
	"downgraded",
	"canceled",
	"payment_failed",
	"reactivated",
]);

export const SubscriptionMetricCardSchema = z.object({
	id: z.string(),
	label: z.string(),
	value: z.string(),
	change: z.number(),
	positive: z.boolean(),
	period: z.string(),
	icon: z.string(),
});

export const SubscriptionPlanSchema = z.object({
	id: z.string(),
	name: z.string(),
	sku: z.string(),
	tier: z.string(),
	price: z.number(),
	currency: z.string(),
	billingInterval: SubscriptionBillingIntervalSchema,
	features: z.array(z.string()),
	maxSeats: z.number(),
	trialDays: z.number(),
	status: SubscriptionPlanStatusSchema,
	activeSubscriptions: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const SubscriptionSchema = z.object({
	id: z.string(),
	planId: z.string(),
	planName: z.string(),
	customerName: z.string(),
	customerEmail: z.string(),
	companyName: z.string().optional(),
	status: SubscriptionStatusSchema,
	mrr: z.number(),
	billingInterval: SubscriptionBillingIntervalSchema,
	currentPeriodStart: z.string().nullable(),
	currentPeriodEnd: z.string().nullable(),
	cancelAtPeriodEnd: z.boolean(),
	canceledAt: z.string().nullable(),
	startedAt: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const SubscriptionEventSchema = z.object({
	id: z.string(),
	subscriptionId: z.string(),
	eventType: SubscriptionEventTypeSchema,
	description: z.string(),
	metadata: z.record(z.string(), z.unknown()).optional(),
	createdAt: z.string(),
});

export const AppSubscriptionsDataSchema = z.object({
	source: z.string().optional(),
	metrics: z.array(SubscriptionMetricCardSchema),
	plans: z.array(SubscriptionPlanSchema),
	subscriptions: z.array(SubscriptionSchema),
	subscriptionEvents: z.array(SubscriptionEventSchema),
});
