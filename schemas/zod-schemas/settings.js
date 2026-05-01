import { z } from "zod";

export const SettingsProfileSchema = z.object({
	name: z.string(),
	email: z.string(),
	phone: z.string(),
	company: z.string(),
	role: z.string(),
	avatar: z.string(),
	bio: z.string(),
});

export const SettingsAccountSchema = z.object({
	currentPassword: z.string(),
	newPassword: z.string(),
	confirmPassword: z.string(),
	twoFactorEnabled: z.boolean(),
	apiKey: z.string(),
});

export const SettingsNotificationsSchema = z.object({
	emailNotifications: z.boolean(),
	smsNotifications: z.boolean(),
	leadAlerts: z.boolean(),
	dealUpdates: z.boolean(),
	weeklyReports: z.boolean(),
	marketingEmails: z.boolean(),
});

export const SettingsPreferencesSchema = z.object({
	theme: z.string(),
	language: z.string(),
	timezone: z.string(),
	dateFormat: z.string(),
	currency: z.string(),
});

export const SettingsBillingSchema = z.object({
	plan: z.string(),
	status: z.string(),
	nextBillingDate: z.string(),
	paymentMethod: z.string(),
});

export const SettingsTeamMemberRowSchema = z.object({
	id: z.string(),
	name: z.string(),
	email: z.string(),
	role: z.string(),
	status: z.string(),
	image: z.string(),
});

export const SettingsTabSchema = z.object({
	id: z.string(),
	label: z.string(),
});

export const AppSettingsDataSchema = z.object({
	source: z.string().optional(),
	profileSettings: SettingsProfileSchema,
	accountSettings: SettingsAccountSchema,
	notificationSettings: SettingsNotificationsSchema,
	preferenceSettings: SettingsPreferencesSchema,
	billingSettings: SettingsBillingSchema,
	teamMembers: z.array(SettingsTeamMemberRowSchema),
	tabs: z.array(SettingsTabSchema),
});
