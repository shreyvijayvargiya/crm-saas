import { z } from "zod";

export const EcommerceMetricCardSchema = z.object({
	id: z.string(),
	label: z.string(),
	value: z.string(),
	change: z.number(),
	positive: z.boolean(),
	period: z.string(),
	icon: z.string(),
});

export const EcommerceWeeklyEarningSchema = z.object({
	day: z.string(),
	value: z.number(),
	highlight: z.boolean().optional(),
});

export const EcommerceEarningBreakdownSchema = z.object({
	label: z.string(),
	value: z.string(),
	pct: z.number(),
	icon: z.string(),
});

export const EcommerceOrderStatusProfileSchema = z.object({
	handle: z.string(),
	role: z.string(),
	avatar: z.string(),
	totalOrders: z.number(),
});

export const EcommerceOrderStatusRowSchema = z.object({
	label: z.string(),
	value: z.number(),
	pct: z.number(),
});

export const EcommerceDeliveryPartySchema = z.object({
	name: z.string(),
	address: z.string(),
});

export const EcommerceDeliveryOrderSchema = z.object({
	id: z.string(),
	productId: z.string(),
	sender: EcommerceDeliveryPartySchema,
	receiver: EcommerceDeliveryPartySchema,
});

export const EcommercePopularProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	price: z.number(),
	visitors: z.string(),
	image: z.string(),
});

export const EcommerceProductCategorySchema = z.enum([
	"Smartphone",
	"Laptop",
	"Headphone",
	"Smartwatch",
]);

export const EcommerceProductStatusSchema = z.enum(["Publish", "Inactive"]);

export const EcommerceProductSchema = z.object({
	id: z.string(),
	name: z.string(),
	brand: z.string(),
	imageURL: z.string(),
	category: EcommerceProductCategorySchema,
	inStock: z.boolean(),
	price: z.number(),
	quantity: z.number(),
	status: EcommerceProductStatusSchema,
	description: z.string(),
	sku: z.string(),
	visitors: z.string(),
	createdAt: z.string(),
});

export const AppEcommerceDataSchema = z.object({
	source: z.string().optional(),
	metrics: z.array(EcommerceMetricCardSchema),
	weeklyEarnings: z.array(EcommerceWeeklyEarningSchema),
	earningBreakdown: z.array(EcommerceEarningBreakdownSchema),
	orderStatusProfile: EcommerceOrderStatusProfileSchema,
	orderStatusTabs: z.record(z.string(), z.array(EcommerceOrderStatusRowSchema)),
	deliveryOrders: z.record(z.string(), z.array(EcommerceDeliveryOrderSchema)),
	popularProducts: z.array(EcommercePopularProductSchema),
	products: z.array(EcommerceProductSchema),
});
