import { z } from "zod";

export const FileCategorySummarySchema = z.object({
	id: z.string(),
	label: z.string(),
	count: z.number(),
	usedLabel: z.string(),
	percent: z.number(),
	color: z.string(),
	icon: z.string(),
});

export const FileFolderSchema = z.object({
	id: z.string(),
	name: z.string(),
	itemCount: z.number(),
	lastUpdate: z.string(),
	starred: z.boolean(),
});

export const StorageSummarySchema = z.object({
	usedGb: z.number(),
	totalGb: z.number(),
	label: z.string(),
	subtitle: z.string(),
});

export const MonthlyTransferRowSchema = z.object({
	month: z.string(),
	desktop: z.number(),
	mobile: z.number(),
});

export const FileRecordSchema = z.object({
	id: z.string(),
	name: z.string(),
	size: z.string(),
	sizeBytes: z.number(),
	category: z.string(),
	folder: z.string(),
	type: z.string(),
	uploadDate: z.string(),
	uploadedBy: z.string(),
	description: z.string(),
});

export const AppFilesDataSchema = z.object({
	source: z.string().optional(),
	categories: z.array(FileCategorySummarySchema),
	folders: z.array(FileFolderSchema),
	storage: StorageSummarySchema,
	monthlyTransfer: z.array(MonthlyTransferRowSchema),
	files: z.array(FileRecordSchema),
});
