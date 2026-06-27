import { z } from "zod";

export const ApiLogEntrySchema = z.object({
	id: z.string(),
	method: z.string(),
	path: z.string(),
	status: z.number(),
	latencyMs: z.number(),
	apiKey: z.string(),
	timestamp: z.string(),
});

export const AppApiLogsDataSchema = z.object({
	source: z.string().optional(),
	logs: z.array(ApiLogEntrySchema),
	stats: z
		.object({
			total: z.number(),
			errors: z.number(),
			avgLatency: z.number(),
		})
		.optional(),
});

export const SupportMessageSchema = z.object({
	from: z.string(),
	body: z.string(),
	at: z.string(),
});

export const SupportTicketSchema = z.object({
	id: z.string(),
	subject: z.string(),
	customer: z.string(),
	email: z.string(),
	priority: z.string(),
	status: z.string(),
	assignee: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	category: z.string(),
	description: z.string(),
	messages: z.array(SupportMessageSchema),
});

export const AppSupportDataSchema = z.object({
	source: z.string().optional(),
	tickets: z.array(SupportTicketSchema),
});

export const AppUserRowSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	role: z.string(),
	department: z.string(),
	status: z.string(),
	lastActive: z.string(),
});

export const AppUsersDataSchema = z.object({
	source: z.string().optional(),
	users: z.array(AppUserRowSchema),
});

export const AppRolesDataSchema = z.object({
	source: z.string().optional(),
	roles: z.array(z.string()),
	permissions: z.array(z.object({ id: z.string(), label: z.string() })),
	matrix: z.record(z.string(), z.record(z.string(), z.boolean())),
});

export const AuditLogEntrySchema = z.object({
	id: z.string(),
	actor: z.string(),
	action: z.string(),
	resource: z.string(),
	module: z.string(),
	ip: z.string(),
	timestamp: z.string(),
});

export const AppAuditLogDataSchema = z.object({
	source: z.string().optional(),
	entries: z.array(AuditLogEntrySchema),
});

export const HelpArticleSchema = z.object({
	id: z.string(),
	q: z.string(),
	a: z.string(),
});

export const HelpSectionSchema = z.object({
	id: z.string(),
	title: z.string(),
	articles: z.array(HelpArticleSchema),
});

export const AppHelpDataSchema = z.object({
	source: z.string().optional(),
	sections: z.array(HelpSectionSchema),
});

export const SavedReportSchema = z.object({
	id: z.string(),
	name: z.string(),
	type: z.string(),
	schedule: z.string(),
	lastRun: z.string(),
	format: z.string(),
	status: z.string(),
});

export const ReportTemplateSchema = z.object({
	id: z.string(),
	name: z.string(),
	desc: z.string(),
});

export const AppReportsDataSchema = z.object({
	source: z.string().optional(),
	savedReports: z.array(SavedReportSchema),
	templates: z.array(ReportTemplateSchema),
});

export const ActivityFeedItemSchema = z.object({
	id: z.string(),
	type: z.string(),
	title: z.string(),
	body: z.string(),
	actor: z.string(),
	time: z.string(),
	module: z.string(),
});

export const AppActivityDataSchema = z.object({
	source: z.string().optional(),
	feed: z.array(ActivityFeedItemSchema),
});
