import { z } from "zod";

export const CampaignStatusSchema = z.enum(["Draft", "Scheduled", "Active", "Paused", "Completed"]);

export const CampaignStepTypeSchema = z.enum(["email", "wait", "branch"]);

export const SegmentEntityTypeSchema = z.enum(["contact", "lead", "both"]);

export const MarketingFormStatusSchema = z.enum(["Draft", "Active"]);

export const MarketingMetricCardSchema = z.object({
	id: z.string(),
	label: z.string(),
	value: z.string(),
	change: z.number(),
	positive: z.boolean(),
	period: z.string(),
	icon: z.string(),
});

export const SegmentFilterSchema = z.object({
	field: z.string(),
	operator: z.string(),
	value: z.string(),
});

export const SegmentSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	entityType: SegmentEntityTypeSchema,
	filters: z.array(SegmentFilterSchema),
	contactCount: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const CampaignStepSchema = z.object({
	id: z.string(),
	campaignId: z.string(),
	stepOrder: z.number(),
	stepType: CampaignStepTypeSchema,
	name: z.string(),
	config: z.record(z.string(), z.unknown()).optional(),
});

export const CampaignSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	status: CampaignStatusSchema,
	segmentId: z.string().nullable(),
	segmentName: z.string().optional(),
	scheduledAt: z.string().nullable(),
	startedAt: z.string().nullable(),
	completedAt: z.string().nullable(),
	sentCount: z.number(),
	deliveredCount: z.number(),
	openRate: z.number().nullable(),
	clickRate: z.number().nullable(),
	bounceRate: z.number().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
	steps: z.array(CampaignStepSchema).optional(),
});

export const MarketingFormFieldSchema = z.object({
	id: z.string(),
	label: z.string(),
	type: z.string(),
	required: z.boolean(),
});

export const MarketingFormSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().optional(),
	fields: z.array(MarketingFormFieldSchema),
	embedCode: z.string(),
	status: MarketingFormStatusSchema,
	submissionCount: z.number(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

export const FormSubmissionSchema = z.object({
	id: z.string(),
	formId: z.string(),
	payload: z.record(z.string(), z.string()),
	sourceUrl: z.string().optional(),
	createdAt: z.string(),
});

export const AppMarketingDataSchema = z.object({
	source: z.string().optional(),
	metrics: z.array(MarketingMetricCardSchema),
	campaigns: z.array(CampaignSchema),
	segments: z.array(SegmentSchema),
	forms: z.array(MarketingFormSchema),
	formSubmissions: z.array(FormSubmissionSchema),
});
