import { z } from "zod";
import { ProjectTrafficRowSchema } from "./common.js";

export const ProjectRowSchema = z.object({
	id: z.number(),
	projectName: z.string(),
	clientName: z.string(),
	clientAvatarColor: z.string(),
	startDate: z.string(),
	deadline: z.string(),
	status: z.string(),
	progress: z.number(),
});

export const ProjectsKpiStripSchema = z.object({
	activeProjects: z.number(),
	changePercentage: z.number(),
	totalRevenue: z.number(),
	revenueChange: z.number(),
	totalLeads: z.number(),
	leadsChange: z.number(),
});

export const ProjectsChartSeriesSchema = z.object({
	"3months": z.array(ProjectTrafficRowSchema),
	"30days": z.array(ProjectTrafficRowSchema),
	"7days": z.array(ProjectTrafficRowSchema),
});

export const AppProjectsDataSchema = z.object({
	source: z.string().optional(),
	initialProjects: z.array(ProjectRowSchema),
	kpiStrip: ProjectsKpiStripSchema,
	chartSeries: ProjectsChartSeriesSchema,
});
