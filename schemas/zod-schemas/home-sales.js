import { z } from "zod";
import {
	CountryShareSchema,
	HomeChartMonthRowSchema,
	SalesTrendPointSchema,
} from "./common.js";
import { LeadTableRowSchema } from "./leads.js";

export const HomeDashboardStatsSchema = z.object({
	totalLeads: z.number(),
	conversionRate: z.string(),
	sales: z.string(),
	revenue: z.string(),
});

export const HomeUpcomingMeetingSchema = z.object({
	title: z.string(),
	date: z.string(),
	contact: z.string(),
	subject: z.string(),
	iconType: z.enum(["up", "down"]),
});

export const AppHomeDataSchema = z.object({
	source: z.string().optional(),
	dashboardData: z.object({
		stats: HomeDashboardStatsSchema,
		upcomingMeetings: z.array(HomeUpcomingMeetingSchema),
	}),
	homeLeadsTable: z.array(LeadTableRowSchema),
	sampleChartData: z.array(HomeChartMonthRowSchema),
});

export const SalesDataBundleSchema = z.object({
	daily: z.array(SalesTrendPointSchema),
	weekly: z.array(SalesTrendPointSchema),
	monthly: z.array(SalesTrendPointSchema),
});

export const SalesProductRowSchema = z.object({
	id: z.number(),
	name: z.string(),
	soldAt: z.string(),
	price: z.number(),
	category: z.string(),
	description: z.string(),
});

export const AppSalesDataSchema = z.object({
	source: z.string().optional(),
	salesData: SalesDataBundleSchema,
	topCountries: z.array(CountryShareSchema),
	products: z.array(SalesProductRowSchema),
});
