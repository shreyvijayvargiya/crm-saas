import { z } from "zod";

export const ContactEmailStubSchema = z.object({
	subject: z.string(),
	body: z.string(),
	date: z.string(),
});

export const ContactRowSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	phone: z.string(),
	company: z.string(),
	createdAt: z.string(),
	image: z.string(),
	emails: z.array(ContactEmailStubSchema),
});

export const AppContactsDataSchema = z.object({
	source: z.string().optional(),
	contacts: z.array(ContactRowSchema),
});
