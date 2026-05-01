import { z } from "zod";

export const TimelineEntryTypeSchema = z.enum(["note", "email", "deal", "call"]);

export const TimelineEntrySchema = z.object({
	id: z.string(),
	type: TimelineEntryTypeSchema,
	title: z.string(),
	body: z.string(),
	at: z.string(),
	user: z.string(),
});

export const RecordNoteSchema = z.object({
	id: z.string(),
	body: z.string(),
	at: z.string(),
	author: z.string(),
});

/** Deal row on record detail sidebar */
export const RecordDealBriefSchema = z.object({
	id: z.string(),
	name: z.string(),
	amount: z.number(),
	stage: z.string(),
	closeDate: z.string(),
	rep: z.string(),
});

export const AttachmentFileSchema = z.object({
	id: z.string(),
	name: z.string(),
	size: z.string(),
	type: z.string(),
});

export const LeadDetailProfileSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	phone: z.string(),
	company: z.string(),
	title: z.string(),
	location: z.string(),
	image: z.string(),
	source: z.string(),
	status: z.string(),
	value: z.number(),
	owner: z.string(),
});

export const ContactDetailProfileSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	phone: z.string(),
	company: z.string(),
	title: z.string(),
	location: z.string(),
	image: z.string(),
	owner: z.string(),
	lifecycle: z.string(),
	createdAt: z.string(),
});

export const CrmRecordDetailDataSchema = z.object({
	source: z.string().optional(),
	defaultTimeline: z.array(TimelineEntrySchema),
	timelinesByKey: z.record(z.string(), z.array(TimelineEntrySchema)),
	notesSeedByKey: z.record(z.string(), z.array(RecordNoteSchema)),
	dealsByRecordKey: z.record(z.string(), z.array(RecordDealBriefSchema)),
	filesByRecordKey: z.record(z.string(), z.array(AttachmentFileSchema)),
	leadDb: z.record(z.string(), LeadDetailProfileSchema),
	contactDb: z.record(z.string(), ContactDetailProfileSchema),
});
