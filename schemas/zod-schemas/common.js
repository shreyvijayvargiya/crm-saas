import { z } from "zod";

export const NamedCountSchema = z.object({
	name: z.string(),
	count: z.number(),
});

export const NamedAmountSchema = z.object({
	name: z.string(),
	amount: z.number(),
});

export const NamedValueSchema = z.object({
	name: z.string(),
	value: z.number(),
});

/** Analytics / forecasting row */
export const ForecastPeriodRowSchema = z.object({
	period: z.string(),
	actual: z.number(),
	forecast: z.number(),
	target: z.number(),
});

export const LeadSourceDatumSchema = z.object({
	name: z.string(),
	value: z.number(),
});

export const RepPerformanceRowSchema = z.object({
	name: z.string(),
	deals: z.number(),
	pipeline: z.number(),
	revenue: z.number(),
	winRate: z.number(),
	avgDeal: z.number(),
	activities: z.number(),
});

export const FunnelStageSchema = z.object({
	label: z.string(),
	count: z.number(),
});

/** Home dashboard multi-series chart snapshot */
export const HomeChartMonthRowSchema = z.object({
	name: z.string(),
	leads: z.number(),
	conversion: z.number(),
	sales: z.number(),
	revenue: z.number(),
	companies: z.number(),
});

/** Sales dashboard time-series point */
export const SalesTrendPointSchema = z.object({
	date: z.string(),
	sales: z.number(),
	revenue: z.number(),
});

export const CountryShareSchema = z.object({
	name: z.string(),
	percentage: z.number(),
});

/** Projects page chart row (traffic by channel) */
export const ProjectTrafficRowSchema = z.object({
	date: z.string(),
	Mobile: z.number(),
	Desktop: z.number(),
});
