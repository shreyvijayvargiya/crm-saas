import { z } from "zod";

export const TaskAssigneeSchema = z.object({
	initials: z.string(),
});

export const TaskCardSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	progress: z.string(),
	icon: z.string(),
	progressPercent: z.number(),
	priority: z.string(),
	attachments: z.number(),
	comments: z.number(),
	assignees: z.array(TaskAssigneeSchema),
});

export const TaskSectionSchema = z.object({
	id: z.string(),
	name: z.string(),
	tasks: z.array(TaskCardSchema),
});

export const AppTasksDataSchema = z.object({
	source: z.string().optional(),
	taskSections: z.array(TaskSectionSchema),
});
