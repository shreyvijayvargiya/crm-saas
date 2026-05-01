import { z } from "zod";
import { NamedCountSchema } from "./common.js";

export const CompanyRowSchema = z.object({
	name: z.string(),
	owner: z.string(),
	logo: z.string(),
	industry: z.string(),
	rating: z.number(),
	location: z.string(),
});

export const CompaniesDashboardStatsSchema = z.object({
	description: z.string().optional(),
	totalCompanies: z.number(),
	averageRating: z.number(),
	uniqueIndustries: z.number(),
	uniqueLocations: z.number(),
});

export const CompaniesChartSeriesSchema = z.object({
	description: z.string().optional(),
	companiesByIndustry: z.array(NamedCountSchema),
	companiesByLocationTop: z.array(NamedCountSchema),
});

export const AppCompaniesDataSchema = z.object({
	source: z.string().optional(),
	companies: z.array(CompanyRowSchema),
	dashboardStats: CompaniesDashboardStatsSchema,
	chartSeries: CompaniesChartSeriesSchema,
});
