import { z } from "zod";
import {
	ForecastPeriodRowSchema,
	FunnelStageSchema,
	LeadSourceDatumSchema,
	RepPerformanceRowSchema,
} from "./common.js";

export const AnalyticsRangeLabelsSchema = z.record(z.string(), z.string());

export const AppAnalyticsDataSchema = z.object({
	source: z.string().optional(),
	rangeLabels: AnalyticsRangeLabelsSchema,
	forecastBase: z.array(ForecastPeriodRowSchema),
	leadSourcesBase: z.array(LeadSourceDatumSchema),
	repPerformanceBase: z.array(RepPerformanceRowSchema),
	funnelBase: z.array(FunnelStageSchema),
});
