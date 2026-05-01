import { z } from "zod";
import { NamedCountSchema } from "./common.js";

/** Card inside a Kanban column */
export const LeadKanbanCardSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	company: z.string(),
	image: z.string(),
});

export const LeadPipelineColumnSchema = z.object({
	id: z.string(),
	name: z.string(),
	leads: z.array(LeadKanbanCardSchema),
});

export const LeadTableRowSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	lastContacted: z.string(),
	image: z.string(),
});

export const LeadsDashboardStatsSchema = z.object({
	description: z.string().optional(),
	totalLeads: z.number(),
	uniqueAccounts: z.number(),
	activeInPipeline: z.number(),
	closedDone: z.number(),
});

export const LeadsChartSeriesSchema = z.object({
	description: z.string().optional(),
	leadsByPipelineStage: z.array(NamedCountSchema),
	leadsByAccountTop: z.array(NamedCountSchema),
});

export const AppLeadsDataSchema = z.object({
	source: z.string().optional(),
	initialPipelines: z.array(LeadPipelineColumnSchema),
	initialLeadsTable: z.array(LeadTableRowSchema),
	dashboardStats: LeadsDashboardStatsSchema,
	chartSeries: LeadsChartSeriesSchema,
});
