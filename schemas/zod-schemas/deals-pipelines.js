import { z } from "zod";

export const DealTableRowSchema = z.object({
	id: z.string(),
	name: z.string(),
	company: z.string(),
	value: z.number(),
	stage: z.string(),
	closeDate: z.string(),
	rep: z.string(),
});

export const AppDealsDataSchema = z.object({
	source: z.string().optional(),
	deals: z.array(DealTableRowSchema),
});

export const PipelineStageSchema = z.object({
	id: z.string(),
	label: z.string(),
});

export const PipelineKanbanDealSchema = z.object({
	id: z.string(),
	title: z.string(),
	company: z.string(),
	value: z.number(),
	owner: z.string(),
	stage: z.string(),
	priority: z.string(),
	lastActivity: z.string(),
	daysInStage: z.number(),
	tag: z.string().nullable(),
});

export const AppPipelinesDataSchema = z.object({
	source: z.string().optional(),
	pipelineStages: z.array(PipelineStageSchema),
	initialDealsKanban: z.array(PipelineKanbanDealSchema),
});
