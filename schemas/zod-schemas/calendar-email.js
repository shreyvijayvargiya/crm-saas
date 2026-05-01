import { z } from "zod";

export const CalendarDummyEventSchema = z.object({
	id: z.string(),
	title: z.string(),
	time: z.string(),
	color: z.string(),
	dayOfMonth: z.number(),
});

export const AppCalendarDataSchema = z.object({
	source: z.string().optional(),
	note: z.string().optional(),
	dummyEventsTemplate: z.array(CalendarDummyEventSchema),
});

export const EmailMessageSchema = z.object({
	id: z.string(),
	from: z.string(),
	fromEmail: z.string(),
	to: z.string(),
	time: z.string(),
	body: z.string(),
});

export const EmailThreadSchema = z.object({
	id: z.string(),
	subject: z.string(),
	preview: z.string(),
	from: z.string(),
	fromEmail: z.string(),
	time: z.string(),
	unread: z.boolean(),
	starred: z.boolean(),
	messages: z.array(EmailMessageSchema),
});

export const AppEmailDataSchema = z.object({
	source: z.string().optional(),
	threads: z.array(EmailThreadSchema),
});
