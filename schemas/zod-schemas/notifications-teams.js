import { z } from "zod";

export const NotificationItemSchema = z.object({
	id: z.string(),
	type: z.string(),
	title: z.string(),
	body: z.string(),
	category: z.string(),
	time: z.string(),
	unread: z.boolean(),
	avatar: z.string().optional(),
	actions: z.boolean().optional(),
});

export const AppNotificationsDataSchema = z.object({
	source: z.string().optional(),
	initialNotifications: z.array(NotificationItemSchema),
});

export const TeamRoleOptionSchema = z.object({
	value: z.string(),
	label: z.string(),
});

export const TeamMemberSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	role: z.string(),
	status: z.string(),
	joinedAt: z.string(),
	image: z.string(),
});

export const AppTeamsDataSchema = z.object({
	source: z.string().optional(),
	roleOptions: z.array(TeamRoleOptionSchema),
	initialMembers: z.array(TeamMemberSchema),
});
