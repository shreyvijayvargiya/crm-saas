import { sql } from "drizzle-orm";
import {
	pgTable,
	text,
	varchar,
	timestamp,
	boolean,
	integer,
	decimal,
	json,
	pgEnum,
	index,
	uniqueIndex,
	primaryKey,
} from "drizzle-orm/pg-core";

export const dealStageEnum = pgEnum("deal_stage", [
	"prospect",
	"qualified",
	"proposal",
	"won",
	"lost",
]);

export const invoiceStatusEnum = pgEnum("invoice_status", ["Paid", "Pending", "Overdue"]);

export const paymentStatusEnum = pgEnum("payment_status", ["Completed", "Pending", "Failed"]);

export const taskProgressEnum = pgEnum("task_progress", [
	"NotStarted",
	"InProgress",
	"Completed",
]);

export const taskPriorityEnum = pgEnum("task_priority", ["Low", "Medium", "High"]);

export const teamMemberStatusEnum = pgEnum("team_member_status", [
	"Active",
	"Invited",
	"Inactive",
]);

export const blogPostStatusEnum = pgEnum("blog_post_status", ["Published", "Draft"]);

export const apiKeyStatusEnum = pgEnum("api_key_status", ["Active", "Revoked"]);

export const webhookStatusEnum = pgEnum("webhook_status", ["Active", "Inactive"]);

export const activityTypeEnum = pgEnum("activity_type", ["note", "email", "deal", "call"]);

export const notificationCategoryEnum = pgEnum("notification_category", [
	"Ticket",
	"Team",
	"Message",
]);

export const users = pgTable(
	"users",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		email: text("email").notNull().unique(),
		name: text("name"),
		avatarUrl: text("avatar_url"),
		role: text("role"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [uniqueIndex("users_email_uid").on(t.email)]
);

export const companies = pgTable(
	"companies",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		name: text("name").notNull(),
		industry: text("industry"),
		rating: decimal("rating", { precision: 3, scale: 1 }),
		location: text("location"),
		logoUrl: text("logo_url"),
		ownerId: varchar("owner_id", { length: 32 }).references(() => users.id, {
			onDelete: "set null",
		}),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [index("companies_owner_id_idx").on(t.ownerId)]
);

export const pipelines = pgTable("pipelines", {
	id: varchar("id", { length: 32 }).primaryKey(),
	name: text("name").notNull().default("Default"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pipelineStages = pgTable(
	"pipeline_stages",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		pipelineId: varchar("pipeline_id", { length: 32 })
			.notNull()
			.references(() => pipelines.id, { onDelete: "cascade" }),
		slug: text("slug").notNull(),
		label: text("label").notNull(),
		sortOrder: integer("sort_order").notNull().default(0),
	},
	(t) => [
		uniqueIndex("pipeline_stages_pipeline_slug_uid").on(t.pipelineId, t.slug),
		index("pipeline_stages_pipeline_id_idx").on(t.pipelineId),
	]
);

export const contacts = pgTable(
	"contacts",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		companyId: varchar("company_id", { length: 32 }).references(() => companies.id, {
			onDelete: "set null",
		}),
		ownerId: varchar("owner_id", { length: 32 }).references(() => users.id, {
			onDelete: "set null",
		}),
		name: text("name").notNull(),
		email: text("email").notNull(),
		phone: text("phone"),
		title: text("title"),
		lifecycle: text("lifecycle"),
		imageUrl: text("image_url"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("contacts_company_id_idx").on(t.companyId),
		index("contacts_email_idx").on(t.email),
	]
);

export const leads = pgTable(
	"leads",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		companyId: varchar("company_id", { length: 32 }).references(() => companies.id, {
			onDelete: "set null",
		}),
		ownerId: varchar("owner_id", { length: 32 }).references(() => users.id, {
			onDelete: "set null",
		}),
		pipelineStageId: varchar("pipeline_stage_id", { length: 32 }).references(
			() => pipelineStages.id,
			{ onDelete: "set null" }
		),
		name: text("name").notNull(),
		email: text("email").notNull(),
		phone: text("phone"),
		title: text("title"),
		source: text("source"),
		status: text("status"),
		estimatedValue: decimal("estimated_value", { precision: 14, scale: 2 }),
		imageUrl: text("image_url"),
		lastContactedAt: timestamp("last_contacted_at"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("leads_company_id_idx").on(t.companyId),
		index("leads_pipeline_stage_id_idx").on(t.pipelineStageId),
		index("leads_email_idx").on(t.email),
	]
);

export const deals = pgTable(
	"deals",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		companyId: varchar("company_id", { length: 32 }).references(() => companies.id, {
			onDelete: "set null",
		}),
		leadId: varchar("lead_id", { length: 32 }).references(() => leads.id, { onDelete: "set null" }),
		repId: varchar("rep_id", { length: 32 }).references(() => users.id, { onDelete: "set null" }),
		name: text("name").notNull(),
		value: decimal("value", { precision: 14, scale: 2 }).notNull(),
		stage: dealStageEnum("stage").notNull(),
		closeDate: timestamp("close_date"),
		priority: text("priority"),
		tag: text("tag"),
		lastActivity: text("last_activity"),
		daysInStage: integer("days_in_stage"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("deals_company_id_idx").on(t.companyId),
		index("deals_stage_idx").on(t.stage),
		index("deals_lead_id_idx").on(t.leadId),
	]
);

export const tasks = pgTable("tasks", {
	id: varchar("id", { length: 32 }).primaryKey(),
	sectionSlug: text("section_slug").notNull(),
	sectionLabel: text("section_label"),
	title: text("title").notNull(),
	description: text("description"),
	progress: taskProgressEnum("progress"),
	priority: taskPriorityEnum("priority"),
	progressPercent: integer("progress_percent").notNull().default(0),
	icon: text("icon"),
	attachments: integer("attachments").notNull().default(0),
	commentsCount: integer("comments_count").notNull().default(0),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const taskAssignees = pgTable(
	"task_assignees",
	{
		taskId: varchar("task_id", { length: 32 })
			.notNull()
			.references(() => tasks.id, { onDelete: "cascade" }),
		userId: varchar("user_id", { length: 32 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
	},
	(t) => [primaryKey({ columns: [t.taskId, t.userId], name: "task_assignees_pk" })]
);

export const invoices = pgTable(
	"invoices",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		invoiceNumber: text("invoice_number").notNull().unique(),
		clientLabel: text("client_label").notNull(),
		clientEmail: text("client_email"),
		clientId: varchar("client_id", { length: 32 }),
		amount: decimal("amount", { precision: 14, scale: 2 }).notNull(),
		status: invoiceStatusEnum("status").notNull(),
		issueDate: timestamp("issue_date").notNull(),
		dueDate: timestamp("due_date").notNull(),
		description: text("description"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [index("invoices_status_idx").on(t.status)]
);

export const invoiceLineItems = pgTable(
	"invoice_line_items",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		invoiceId: varchar("invoice_id", { length: 32 })
			.notNull()
			.references(() => invoices.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		quantity: integer("quantity").notNull().default(1),
		price: decimal("price", { precision: 14, scale: 2 }).notNull(),
	},
	(t) => [index("invoice_line_items_invoice_id_idx").on(t.invoiceId)]
);

export const payments = pgTable(
	"payments",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		transactionId: text("transaction_id").notNull().unique(),
		invoiceId: varchar("invoice_id", { length: 32 }).references(() => invoices.id, {
			onDelete: "set null",
		}),
		amount: decimal("amount", { precision: 14, scale: 2 }).notNull(),
		currency: text("currency").notNull().default("USD"),
		status: paymentStatusEnum("status").notNull(),
		paymentMethod: text("payment_method").notNull(),
		customerLabel: text("customer_label").notNull(),
		customerEmail: text("customer_email").notNull(),
		description: text("description"),
		fee: decimal("fee", { precision: 14, scale: 2 }),
		netAmount: decimal("net_amount", { precision: 14, scale: 2 }),
		occurredAt: timestamp("occurred_at").notNull(),
		occurredTime: text("occurred_time"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [
		index("payments_invoice_id_idx").on(t.invoiceId),
		index("payments_status_idx").on(t.status),
	]
);

export const projects = pgTable("projects", {
	id: varchar("id", { length: 32 }).primaryKey(),
	projectName: text("project_name").notNull(),
	clientName: text("client_name").notNull(),
	clientAvatarColor: text("client_avatar_color"),
	startDate: timestamp("start_date"),
	deadline: timestamp("deadline"),
	status: text("status"),
	progress: integer("progress").notNull().default(0),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const calendarEvents = pgTable("calendar_events", {
	id: varchar("id", { length: 32 }).primaryKey(),
	title: text("title").notNull(),
	timeLabel: text("time_label"),
	color: text("color"),
	startsAt: timestamp("starts_at"),
	dayOfMonth: integer("day_of_month"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const emailThreads = pgTable("email_threads", {
	id: varchar("id", { length: 32 }).primaryKey(),
	subject: text("subject").notNull(),
	preview: text("preview"),
	fromName: text("from_name").notNull(),
	fromEmail: text("from_email").notNull(),
	lastTime: text("last_time"),
	unread: boolean("unread").notNull().default(true),
	starred: boolean("starred").notNull().default(false),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const emailMessages = pgTable(
	"email_messages",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		threadId: varchar("thread_id", { length: 32 })
			.notNull()
			.references(() => emailThreads.id, { onDelete: "cascade" }),
		fromName: text("from_name").notNull(),
		fromEmail: text("from_email").notNull(),
		toAddress: text("to_address"),
		sentAtLabel: text("sent_at_label"),
		body: text("body").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [index("email_messages_thread_id_idx").on(t.threadId)]
);

export const notifications = pgTable(
	"notifications",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		userId: varchar("user_id", { length: 32 }).references(() => users.id, { onDelete: "cascade" }),
		type: text("type").notNull(),
		title: text("title").notNull(),
		body: text("body").notNull(),
		category: notificationCategoryEnum("category").notNull(),
		timeLabel: text("time_label"),
		unread: boolean("unread").notNull().default(true),
		avatarUrl: text("avatar_url"),
		hasActions: boolean("has_actions").notNull().default(false),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [index("notifications_user_id_idx").on(t.userId)]
);

export const integrations = pgTable("integrations", {
	id: varchar("id", { length: 32 }).primaryKey(),
	name: text("name").notNull().unique(),
	enabled: boolean("enabled").notNull().default(false),
	tag: text("tag"),
	lastUpdated: timestamp("last_updated"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const apiKeys = pgTable(
	"api_keys",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		name: text("name").notNull(),
		keyHash: text("key_hash"),
		status: apiKeyStatusEnum("status").notNull().default("Active"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [index("api_keys_status_idx").on(t.status)]
);

export const webhooks = pgTable("webhooks", {
	id: varchar("id", { length: 32 }).primaryKey(),
	name: text("name").notNull(),
	url: text("url").notNull(),
	events: json("events").$type<string[]>().notNull(),
	secretHash: text("secret_hash"),
	status: webhookStatusEnum("status").notNull().default("Active"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const teamMembers = pgTable(
	"team_members",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		name: text("name").notNull(),
		email: text("email").notNull().unique(),
		role: text("role").notNull(),
		status: teamMemberStatusEnum("status").notNull().default("Active"),
		joinedAt: timestamp("joined_at"),
		imageUrl: text("image_url"),
	},
	(t) => [uniqueIndex("team_members_email_uid").on(t.email)]
);

export const blogPosts = pgTable(
	"blog_posts",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		title: text("title").notNull(),
		authorName: text("author_name").notNull(),
		authorAvatar: text("author_avatar"),
		category: text("category"),
		status: blogPostStatusEnum("status").notNull().default("Draft"),
		publishDate: timestamp("publish_date"),
		views: integer("views").notNull().default(0),
		likes: integer("likes").notNull().default(0),
		content: text("content").notNull(),
		tags: text("tags").array().notNull().default(sql`ARRAY[]::text[]`),
		featuredImage: text("featured_image"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [index("blog_posts_status_idx").on(t.status)]
);

export const blogSubscribers = pgTable(
	"blog_subscribers",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		email: text("email").notNull().unique(),
		name: text("name"),
		subscribedDate: timestamp("subscribed_date"),
		status: text("status"),
		avatarColor: text("avatar_color"),
	},
	(t) => [uniqueIndex("blog_subscribers_email_uid").on(t.email)]
);

export const activities = pgTable(
	"activities",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		type: activityTypeEnum("type").notNull(),
		title: text("title").notNull(),
		body: text("body").notNull(),
		occurredAt: timestamp("occurred_at"),
		actorLabel: text("actor_label"),
		leadId: varchar("lead_id", { length: 32 }).references(() => leads.id, { onDelete: "cascade" }),
		contactId: varchar("contact_id", { length: 32 }).references(() => contacts.id, {
			onDelete: "cascade",
		}),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [
		index("activities_lead_id_idx").on(t.leadId),
		index("activities_contact_id_idx").on(t.contactId),
	]
);

export const leadNotes = pgTable(
	"lead_notes",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		leadId: varchar("lead_id", { length: 32 })
			.notNull()
			.references(() => leads.id, { onDelete: "cascade" }),
		body: text("body").notNull(),
		authoredAt: timestamp("authored_at"),
		author: text("author"),
	},
	(t) => [index("lead_notes_lead_id_idx").on(t.leadId)]
);

export const contactNotes = pgTable(
	"contact_notes",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		contactId: varchar("contact_id", { length: 32 })
			.notNull()
			.references(() => contacts.id, { onDelete: "cascade" }),
		body: text("body").notNull(),
		authoredAt: timestamp("authored_at"),
		author: text("author"),
	},
	(t) => [index("contact_notes_contact_id_idx").on(t.contactId)]
);

export const recordFiles = pgTable(
	"record_files",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		name: text("name").notNull(),
		sizeLabel: text("size_label"),
		mimeFamily: text("mime_family"),
		leadId: varchar("lead_id", { length: 32 }).references(() => leads.id, { onDelete: "cascade" }),
		contactId: varchar("contact_id", { length: 32 }).references(() => contacts.id, {
			onDelete: "cascade",
		}),
	},
	(t) => [
		index("record_files_lead_id_idx").on(t.leadId),
		index("record_files_contact_id_idx").on(t.contactId),
	]
);

/** Denormalised email stubs on Contacts list — see Prisma EmbeddedEmailStub */
export const contactEmbeddedEmails = pgTable(
	"contact_embedded_emails",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		contactId: varchar("contact_id", { length: 32 })
			.notNull()
			.references(() => contacts.id, { onDelete: "cascade" }),
		subject: text("subject"),
		body: text("body"),
		sentAt: timestamp("sent_at"),
	},
	(t) => [index("contact_embedded_emails_contact_id_idx").on(t.contactId)]
);

export const ecommerceProductCategoryEnum = pgEnum("ecommerce_product_category", [
	"Smartphone",
	"Laptop",
	"Headphone",
	"Smartwatch",
]);

export const ecommerceProductStatusEnum = pgEnum("ecommerce_product_status", [
	"Publish",
	"Inactive",
]);

export const ecommerceOrderTabEnum = pgEnum("ecommerce_order_tab", [
	"New",
	"Pending",
	"Shipping",
]);

export const ecommerceProducts = pgTable(
	"ecommerce_products",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		name: text("name").notNull(),
		brand: text("brand").notNull(),
		imageUrl: text("image_url"),
		category: ecommerceProductCategoryEnum("category").notNull(),
		inStock: boolean("in_stock").default(true).notNull(),
		price: decimal("price", { precision: 12, scale: 2 }).notNull(),
		quantity: integer("quantity").default(0).notNull(),
		status: ecommerceProductStatusEnum("status").default("Publish").notNull(),
		description: text("description"),
		sku: text("sku"),
		visitorsLabel: text("visitors_label"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("ecommerce_products_tenant_id_idx").on(t.tenantId),
		index("ecommerce_products_category_idx").on(t.category),
	]
);

export const ecommerceOrders = pgTable(
	"ecommerce_orders",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		productId: varchar("product_id", { length: 32 })
			.notNull()
			.references(() => ecommerceProducts.id, { onDelete: "cascade" }),
		tab: ecommerceOrderTabEnum("tab").default("New").notNull(),
		senderName: text("sender_name").notNull(),
		senderAddress: text("sender_address").notNull(),
		receiverName: text("receiver_name").notNull(),
		receiverAddress: text("receiver_address").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [
		index("ecommerce_orders_tenant_id_idx").on(t.tenantId),
		index("ecommerce_orders_product_id_idx").on(t.productId),
	]
);

export const campaignStatusEnum = pgEnum("campaign_status", [
	"Draft",
	"Scheduled",
	"Active",
	"Paused",
	"Completed",
]);

export const campaignStepTypeEnum = pgEnum("campaign_step_type", ["email", "wait", "branch"]);

export const segmentEntityTypeEnum = pgEnum("segment_entity_type", ["contact", "lead", "both"]);

export const marketingFormStatusEnum = pgEnum("marketing_form_status", ["Draft", "Active"]);

export const segments = pgTable(
	"segments",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		name: text("name").notNull(),
		description: text("description"),
		entityType: segmentEntityTypeEnum("entity_type").default("both").notNull(),
		filters: json("filters").notNull(),
		contactCount: integer("contact_count").default(0).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("segments_tenant_id_idx").on(t.tenantId),
		index("segments_entity_type_idx").on(t.entityType),
	]
);

export const campaigns = pgTable(
	"campaigns",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		name: text("name").notNull(),
		description: text("description"),
		status: campaignStatusEnum("status").default("Draft").notNull(),
		segmentId: varchar("segment_id", { length: 32 }).references(() => segments.id, {
			onDelete: "set null",
		}),
		scheduledAt: timestamp("scheduled_at"),
		startedAt: timestamp("started_at"),
		completedAt: timestamp("completed_at"),
		sentCount: integer("sent_count").default(0).notNull(),
		deliveredCount: integer("delivered_count").default(0).notNull(),
		openRate: decimal("open_rate", { precision: 5, scale: 2 }),
		clickRate: decimal("click_rate", { precision: 5, scale: 2 }),
		bounceRate: decimal("bounce_rate", { precision: 5, scale: 2 }),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("campaigns_tenant_id_idx").on(t.tenantId),
		index("campaigns_status_idx").on(t.status),
		index("campaigns_segment_id_idx").on(t.segmentId),
	]
);

export const campaignSteps = pgTable(
	"campaign_steps",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		campaignId: varchar("campaign_id", { length: 32 })
			.notNull()
			.references(() => campaigns.id, { onDelete: "cascade" }),
		stepOrder: integer("step_order").notNull(),
		stepType: campaignStepTypeEnum("step_type").notNull(),
		name: text("name").notNull(),
		config: json("config"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [
		index("campaign_steps_tenant_id_idx").on(t.tenantId),
		index("campaign_steps_campaign_id_idx").on(t.campaignId),
	]
);

export const marketingForms = pgTable(
	"marketing_forms",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		name: text("name").notNull(),
		description: text("description"),
		fields: json("fields").notNull(),
		embedCode: text("embed_code"),
		status: marketingFormStatusEnum("status").default("Draft").notNull(),
		submissionCount: integer("submission_count").default(0).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("marketing_forms_tenant_id_idx").on(t.tenantId),
		index("marketing_forms_status_idx").on(t.status),
	]
);

export const formSubmissions = pgTable(
	"form_submissions",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		formId: varchar("form_id", { length: 32 })
			.notNull()
			.references(() => marketingForms.id, { onDelete: "cascade" }),
		payload: json("payload").notNull(),
		sourceUrl: text("source_url"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [
		index("form_submissions_tenant_id_idx").on(t.tenantId),
		index("form_submissions_form_id_idx").on(t.formId),
	]
);

export const subscriptionBillingIntervalEnum = pgEnum("subscription_billing_interval", [
	"Monthly",
	"Yearly",
]);

export const subscriptionPlanStatusEnum = pgEnum("subscription_plan_status", [
	"Active",
	"Archived",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
	"Active",
	"Trialing",
	"Past Due",
	"Canceled",
	"Paused",
]);

export const subscriptionEventTypeEnum = pgEnum("subscription_event_type", [
	"created",
	"renewed",
	"upgraded",
	"downgraded",
	"canceled",
	"payment_failed",
	"reactivated",
]);

export const subscriptionPlans = pgTable(
	"subscription_plans",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		name: text("name").notNull(),
		sku: text("sku").notNull(),
		tier: text("tier").notNull(),
		price: decimal("price", { precision: 12, scale: 2 }).notNull(),
		currency: text("currency").default("USD").notNull(),
		billingInterval: subscriptionBillingIntervalEnum("billing_interval").notNull(),
		features: json("features").notNull(),
		maxSeats: integer("max_seats").default(0).notNull(),
		trialDays: integer("trial_days").default(0).notNull(),
		status: subscriptionPlanStatusEnum("status").default("Active").notNull(),
		activeSubscriptions: integer("active_subscriptions").default(0).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("subscription_plans_tenant_id_idx").on(t.tenantId),
		index("subscription_plans_status_idx").on(t.status),
	]
);

export const subscriptions = pgTable(
	"subscriptions",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		planId: varchar("plan_id", { length: 32 })
			.notNull()
			.references(() => subscriptionPlans.id, { onDelete: "restrict" }),
		customerName: text("customer_name").notNull(),
		customerEmail: text("customer_email").notNull(),
		companyName: text("company_name"),
		status: subscriptionStatusEnum("status").default("Active").notNull(),
		mrr: decimal("mrr", { precision: 12, scale: 2 }).notNull(),
		billingInterval: subscriptionBillingIntervalEnum("billing_interval").notNull(),
		currentPeriodStart: timestamp("current_period_start"),
		currentPeriodEnd: timestamp("current_period_end"),
		cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),
		canceledAt: timestamp("canceled_at"),
		startedAt: timestamp("started_at"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at").defaultNow().notNull(),
	},
	(t) => [
		index("subscriptions_tenant_id_idx").on(t.tenantId),
		index("subscriptions_plan_id_idx").on(t.planId),
		index("subscriptions_status_idx").on(t.status),
	]
);

export const subscriptionEvents = pgTable(
	"subscription_events",
	{
		id: varchar("id", { length: 32 }).primaryKey(),
		tenantId: varchar("tenant_id", { length: 32 }).notNull(),
		subscriptionId: varchar("subscription_id", { length: 32 })
			.notNull()
			.references(() => subscriptions.id, { onDelete: "cascade" }),
		eventType: subscriptionEventTypeEnum("event_type").notNull(),
		description: text("description").notNull(),
		metadata: json("metadata"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
	},
	(t) => [
		index("subscription_events_tenant_id_idx").on(t.tenantId),
		index("subscription_events_subscription_id_idx").on(t.subscriptionId),
	]
);
