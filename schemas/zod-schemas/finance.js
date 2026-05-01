import { z } from "zod";
import { NamedAmountSchema, NamedCountSchema } from "./common.js";

export const InvoiceLineItemSchema = z.object({
	name: z.string(),
	quantity: z.number(),
	price: z.number(),
});

export const InvoiceSchema = z.object({
	id: z.string(),
	invoiceNumber: z.string(),
	client: z.string(),
	clientEmail: z.string(),
	amount: z.number(),
	status: z.string(),
	issueDate: z.string(),
	dueDate: z.string(),
	description: z.string(),
	items: z.array(InvoiceLineItemSchema),
});

export const InvoicesDashboardStatsSchema = z.object({
	description: z.string().optional(),
	totalInvoices: z.number(),
	totalBilledUsd: z.number(),
	collectedPaidUsd: z.number(),
	outstandingUsd: z.number(),
});

export const InvoicesChartSeriesSchema = z.object({
	description: z.string().optional(),
	invoiceCountByStatus: z.array(NamedCountSchema),
	amountUsdByStatus: z.array(NamedAmountSchema),
});

export const AppInvoicesDataSchema = z.object({
	source: z.string().optional(),
	initialInvoices: z.array(InvoiceSchema),
	dashboardStats: InvoicesDashboardStatsSchema,
	chartSeries: InvoicesChartSeriesSchema,
});

export const PaymentRecordSchema = z.object({
	id: z.string(),
	transactionId: z.string(),
	amount: z.number(),
	currency: z.string(),
	status: z.string(),
	paymentMethod: z.string(),
	customer: z.string(),
	customerEmail: z.string(),
	description: z.string(),
	date: z.string(),
	time: z.string(),
	fee: z.number(),
	netAmount: z.number(),
	invoiceId: z.string(),
});

export const AppPaymentsDataSchema = z.object({
	source: z.string().optional(),
	initialPayments: z.array(PaymentRecordSchema),
});
