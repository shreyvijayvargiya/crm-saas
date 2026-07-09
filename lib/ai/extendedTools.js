function clone(value) {
	return JSON.parse(JSON.stringify(value));
}

function normalizeSearch(value) {
	return String(value ?? "").trim().toLowerCase();
}

function matchesSearch(text, search) {
	if (!search) return true;
	return normalizeSearch(text).includes(search);
}

function nextNumericId(items, fallback = 100) {
	const nums = items
		.map((item) => parseInt(String(item.id ?? ""), 10))
		.filter((n) => !Number.isNaN(n));
	const max = nums.length ? Math.max(...nums) : fallback;
	return String(max + 1);
}

function nextPrefixedId(items, prefix, fallback = 1) {
	const nums = items
		.map((item) => {
			const m = String(item.id ?? "").match(new RegExp(`^${prefix}(\\d+)$`));
			return m ? Number(m[1]) : 0;
		})
		.filter((n) => n > 0);
	const max = nums.length ? Math.max(...nums) : fallback;
	return `${prefix}${String(max + 1).padStart(3, "0")}`;
}

function listCollection(items, { search, searchFields = ["name"], limit = 20, filter } = {}) {
	const q = normalizeSearch(search);
	let rows = items ?? [];
	if (filter) rows = rows.filter(filter);
	if (q) {
		rows = rows.filter((item) =>
			searchFields.some((f) => matchesSearch(item[f], q))
		);
	}
	return rows.slice(0, limit);
}

function logActivity(data, { type = "deal", title, body, module = "Deals" }) {
	data.activities.unshift({
		id: `act_${Date.now()}`,
		type,
		title,
		body,
		actor: "AI Assistant",
		time: "Just now",
		module,
	});
}

export const EXTENDED_TOOL_DEFINITIONS = [
	{ type: "function", function: { name: "list_contacts", description: "List contacts", parameters: { type: "object", properties: { search: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "create_contact", description: "Create a contact", parameters: { type: "object", properties: { name: { type: "string" }, email: { type: "string" }, phone: { type: "string" }, company: { type: "string" } }, required: ["name", "email"] } } },
	{ type: "function", function: { name: "delete_contact", description: "Delete contact by id", parameters: { type: "object", properties: { contactId: { type: "string" } }, required: ["contactId"] } } },
	{ type: "function", function: { name: "list_companies", description: "List companies", parameters: { type: "object", properties: { search: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "create_company", description: "Create a company", parameters: { type: "object", properties: { name: { type: "string" }, industry: { type: "string" }, owner: { type: "string" }, location: { type: "string" } }, required: ["name"] } } },
	{ type: "function", function: { name: "delete_company", description: "Delete company by id", parameters: { type: "object", properties: { companyId: { type: "string" } }, required: ["companyId"] } } },
	{ type: "function", function: { name: "list_invoices", description: "List invoices with optional status filter", parameters: { type: "object", properties: { status: { type: "string", enum: ["Paid", "Pending", "Overdue"] }, search: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "create_invoice", description: "Create an invoice", parameters: { type: "object", properties: { client: { type: "string" }, clientEmail: { type: "string" }, amount: { type: "number" }, status: { type: "string", enum: ["Paid", "Pending", "Overdue"] }, description: { type: "string" } }, required: ["client", "amount"] } } },
	{ type: "function", function: { name: "update_invoice", description: "Update invoice fields by id", parameters: { type: "object", properties: { invoiceId: { type: "string" }, status: { type: "string", enum: ["Paid", "Pending", "Overdue"] }, amount: { type: "number" }, client: { type: "string" }, description: { type: "string" } }, required: ["invoiceId"] } } },
	{ type: "function", function: { name: "delete_invoice", description: "Delete invoice by id", parameters: { type: "object", properties: { invoiceId: { type: "string" } }, required: ["invoiceId"] } } },
	{ type: "function", function: { name: "list_projects", description: "List projects", parameters: { type: "object", properties: { status: { type: "string" }, search: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "create_project", description: "Create a project", parameters: { type: "object", properties: { projectName: { type: "string" }, clientName: { type: "string" }, status: { type: "string" }, deadline: { type: "string" } }, required: ["projectName"] } } },
	{ type: "function", function: { name: "delete_project", description: "Delete project by id", parameters: { type: "object", properties: { projectId: { type: "string" } }, required: ["projectId"] } } },
	{ type: "function", function: { name: "list_products", description: "List products", parameters: { type: "object", properties: { status: { type: "string" }, search: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_payments", description: "List payments", parameters: { type: "object", properties: { status: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_sales", description: "List sales records", parameters: { type: "object", properties: { search: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_users", description: "List CRM users", parameters: { type: "object", properties: { role: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_support_tickets", description: "List support tickets", parameters: { type: "object", properties: { status: { type: "string" }, priority: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "update_support_ticket", description: "Update support ticket status", parameters: { type: "object", properties: { ticketId: { type: "string" }, status: { type: "string", enum: ["Open", "In progress", "Resolved"] } }, required: ["ticketId", "status"] } } },
	{ type: "function", function: { name: "list_subscriptions", description: "List subscriptions", parameters: { type: "object", properties: { status: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_campaigns", description: "List marketing campaigns", parameters: { type: "object", properties: { status: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_ecommerce_orders", description: "List e-commerce orders", parameters: { type: "object", properties: { status: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_files", description: "List uploaded files", parameters: { type: "object", properties: { search: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_blogs", description: "List CMS blog posts", parameters: { type: "object", properties: { status: { type: "string" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_webhooks", description: "List webhooks", parameters: { type: "object", properties: { limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_integrations", description: "List integrations", parameters: { type: "object", properties: { enabledOnly: { type: "boolean" }, limit: { type: "number" } } } } },
	{ type: "function", function: { name: "toggle_integration", description: "Enable or disable an integration", parameters: { type: "object", properties: { integrationId: { type: "string" }, enabled: { type: "boolean" } }, required: ["integrationId", "enabled"] } } },
	{ type: "function", function: { name: "list_email_threads", description: "List email inbox threads", parameters: { type: "object", properties: { limit: { type: "number" } } } } },
	{ type: "function", function: { name: "list_calendar_events", description: "List calendar events", parameters: { type: "object", properties: { limit: { type: "number" } } } } },
	{ type: "function", function: { name: "create_calendar_event", description: "Create a calendar event", parameters: { type: "object", properties: { title: { type: "string" }, date: { type: "string" }, time: { type: "string" } }, required: ["title", "date"] } } },
	{ type: "function", function: { name: "get_analytics_overview", description: "Get CRM analytics overview: leads, deals, revenue, invoices", parameters: { type: "object", properties: {} } } },
	{ type: "function", function: { name: "get_revenue_breakdown", description: "Revenue breakdown from invoices and payments by status", parameters: { type: "object", properties: {} } } },
];

export function executeExtendedTool(snapshot, toolName, rawArgs) {
	const args = typeof rawArgs === "string" ? JSON.parse(rawArgs || "{}") : rawArgs ?? {};
	const data = clone(snapshot);

	switch (toolName) {
		case "list_contacts":
			return {
				data: {
					contacts: listCollection(data.contacts, {
						search: args.search,
						searchFields: ["name", "email", "company"],
						limit: args.limit ?? 20,
					}),
				},
				snapshot: data,
			};

		case "create_contact": {
			const id = nextNumericId(data.contacts, 220);
			const contact = {
				id,
				name: args.name,
				email: args.email,
				phone: args.phone ?? "",
				company: args.company ?? "",
				createdAt: new Date().toISOString().slice(0, 10),
				image: "./people/person-1.png",
				emails: [],
			};
			data.contacts.unshift(contact);
			logActivity(data, { type: "lead", title: "Contact created", body: contact.name, module: "Contacts" });
			return { data: { created: contact }, snapshot: data };
		}

		case "delete_contact": {
			const id = String(args.contactId);
			const item = data.contacts.find((c) => c.id === id);
			if (!item) return { data: { error: `Contact ${id} not found` }, snapshot: data };
			data.contacts = data.contacts.filter((c) => c.id !== id);
			return { data: { deleted: { id, name: item.name } }, snapshot: data };
		}

		case "list_companies":
			return {
				data: {
					companies: listCollection(data.companies, {
						search: args.search,
						searchFields: ["name", "industry", "owner"],
						limit: args.limit ?? 20,
					}),
				},
				snapshot: data,
			};

		case "create_company": {
			const id = String(args.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 24);
			const company = {
				id,
				name: args.name,
				owner: args.owner ?? "Unassigned",
				logo: "./companies/hubspot.png",
				industry: args.industry ?? "General",
				rating: 4,
				location: args.location ?? "—",
			};
			data.companies.unshift(company);
			return { data: { created: company }, snapshot: data };
		}

		case "delete_company": {
			const id = String(args.companyId);
			const item = data.companies.find((c) => c.id === id);
			if (!item) return { data: { error: `Company ${id} not found` }, snapshot: data };
			data.companies = data.companies.filter((c) => c.id !== id);
			return { data: { deleted: { id, name: item.name } }, snapshot: data };
		}

		case "list_invoices": {
			const items = listCollection(data.invoices, {
				search: args.search,
				searchFields: ["client", "invoiceNumber", "clientEmail"],
				limit: args.limit ?? 20,
				filter: args.status ? (inv) => inv.status === args.status : undefined,
			});
			return { data: { invoices: items, count: items.length }, snapshot: data };
		}

		case "create_invoice": {
			const num = data.invoices.length + 1;
			const id = `INV-${String(num).padStart(3, "0")}`;
			const invoice = {
				id,
				invoiceNumber: `INV-2026-${String(num).padStart(3, "0")}`,
				client: args.client,
				clientEmail: args.clientEmail ?? "",
				amount: Number(args.amount) || 0,
				status: args.status ?? "Pending",
				issueDate: new Date().toLocaleDateString("en-US"),
				dueDate: new Date(Date.now() + 14 * 86400000).toLocaleDateString("en-US"),
				description: args.description ?? "",
				items: [{ name: args.description || "Service", quantity: 1, price: Number(args.amount) || 0 }],
			};
			data.invoices.unshift(invoice);
			logActivity(data, { type: "invoice", title: "Invoice created", body: `${invoice.client} — $${invoice.amount}`, module: "Finance" });
			return { data: { created: invoice }, snapshot: data };
		}

		case "update_invoice": {
			const id = String(args.invoiceId);
			const invoice = data.invoices.find((i) => i.id === id);
			if (!invoice) return { data: { error: `Invoice ${id} not found` }, snapshot: data };
			if (args.status) invoice.status = args.status;
			if (args.amount != null) invoice.amount = Number(args.amount);
			if (args.client) invoice.client = args.client;
			if (args.description) invoice.description = args.description;
			logActivity(data, { type: "invoice", title: "Invoice updated", body: `${invoice.invoiceNumber} → ${invoice.status}`, module: "Finance" });
			return { data: { updated: invoice }, snapshot: data };
		}

		case "delete_invoice": {
			const id = String(args.invoiceId);
			const invoice = data.invoices.find((i) => i.id === id);
			if (!invoice) return { data: { error: `Invoice ${id} not found` }, snapshot: data };
			data.invoices = data.invoices.filter((i) => i.id !== id);
			return { data: { deleted: { id, client: invoice.client } }, snapshot: data };
		}

		case "list_projects": {
			const items = listCollection(data.projects, {
				search: args.search,
				searchFields: ["projectName", "clientName"],
				limit: args.limit ?? 20,
				filter: args.status ? (p) => p.status === args.status : undefined,
			});
			return { data: { projects: items }, snapshot: data };
		}

		case "create_project": {
			const id = nextNumericId(data.projects, 6);
			const project = {
				id: Number(id),
				projectName: args.projectName,
				clientName: args.clientName ?? "—",
				clientAvatarColor: "bg-blue-500",
				startDate: new Date().toLocaleDateString("en-GB"),
				deadline: args.deadline ?? "TBD",
				status: args.status ?? "Active",
				progress: 0,
			};
			data.projects.unshift(project);
			return { data: { created: project }, snapshot: data };
		}

		case "delete_project": {
			const id = String(args.projectId);
			data.projects = data.projects.filter((p) => String(p.id) !== id);
			return { data: { deleted: { id } }, snapshot: data };
		}

		case "list_products": {
			const items = listCollection(data.products, {
				search: args.search,
				searchFields: ["name", "sku", "category"],
				limit: args.limit ?? 20,
				filter: args.status ? (p) => p.status === args.status : undefined,
			});
			return { data: { products: items }, snapshot: data };
		}

		case "list_payments": {
			const items = listCollection(data.payments, {
				limit: args.limit ?? 20,
				filter: args.status ? (p) => p.status === args.status : undefined,
			});
			return { data: { payments: items }, snapshot: data };
		}

		case "list_sales": {
			const items = listCollection(data.sales, {
				search: args.search,
				searchFields: ["name", "customer", "category"],
				limit: args.limit ?? 20,
			});
			return { data: { sales: items }, snapshot: data };
		}

		case "list_users": {
			const items = listCollection(data.users, {
				limit: args.limit ?? 20,
				filter: args.role ? (u) => u.role === args.role : undefined,
				searchFields: ["name", "email"],
			});
			return { data: { users: items }, snapshot: data };
		}

		case "list_support_tickets": {
			const items = listCollection(data.supportTickets, {
				limit: args.limit ?? 20,
				filter: (t) => {
					if (args.status && t.status !== args.status) return false;
					if (args.priority && t.priority !== args.priority) return false;
					return true;
				},
				searchFields: ["subject", "customer"],
			});
			return { data: { tickets: items }, snapshot: data };
		}

		case "update_support_ticket": {
			const id = String(args.ticketId);
			const ticket = data.supportTickets.find((t) => t.id === id);
			if (!ticket) return { data: { error: `Ticket ${id} not found` }, snapshot: data };
			ticket.status = args.status;
			ticket.updatedAt = new Date().toISOString().slice(0, 10);
			return { data: { updated: ticket }, snapshot: data };
		}

		case "list_subscriptions": {
			const items = listCollection(data.subscriptions, {
				limit: args.limit ?? 20,
				filter: args.status ? (s) => s.status === args.status : undefined,
				searchFields: ["customerName", "planName"],
			});
			return { data: { subscriptions: items }, snapshot: data };
		}

		case "list_campaigns": {
			const items = listCollection(data.campaigns, {
				limit: args.limit ?? 20,
				filter: args.status ? (c) => c.status === args.status : undefined,
				searchFields: ["name", "type"],
			});
			return { data: { campaigns: items }, snapshot: data };
		}

		case "list_ecommerce_orders": {
			const items = listCollection(data.ecommerceOrders, {
				limit: args.limit ?? 20,
				filter: args.status ? (o) => o.status === args.status : undefined,
				searchFields: ["orderId", "customer"],
			});
			return { data: { orders: items }, snapshot: data };
		}

		case "list_files": {
			const items = listCollection(data.files, {
				search: args.search,
				searchFields: ["name", "folder"],
				limit: args.limit ?? 20,
			});
			return { data: { files: items }, snapshot: data };
		}

		case "list_blogs": {
			const items = listCollection(data.blogs, {
				limit: args.limit ?? 20,
				filter: args.status ? (b) => b.status === args.status : undefined,
				searchFields: ["title", "category"],
			});
			return { data: { blogs: items }, snapshot: data };
		}

		case "list_webhooks": {
			return { data: { webhooks: (data.webhooks ?? []).slice(0, args.limit ?? 20) }, snapshot: data };
		}

		case "list_integrations": {
			let items = data.integrations ?? [];
			if (args.enabledOnly) items = items.filter((i) => i.enabled);
			return { data: { integrations: items.slice(0, args.limit ?? 30) }, snapshot: data };
		}

		case "toggle_integration": {
			const id = String(args.integrationId);
			const item = data.integrations.find((i) => i.id === id);
			if (!item) return { data: { error: `Integration ${id} not found` }, snapshot: data };
			item.enabled = Boolean(args.enabled);
			item.lastUpdated = "Just now";
			return { data: { updated: item }, snapshot: data };
		}

		case "list_email_threads":
			return { data: { threads: (data.emailThreads ?? []).slice(0, args.limit ?? 10) }, snapshot: data };

		case "list_calendar_events":
			return { data: { events: (data.calendarEvents ?? []).slice(0, args.limit ?? 20) }, snapshot: data };

		case "create_calendar_event": {
			const event = {
				id: `evt_${Date.now()}`,
				title: args.title,
				date: args.date,
				time: args.time ?? "9:00 AM",
				color: "blue",
				type: "meeting",
			};
			data.calendarEvents.unshift(event);
			return { data: { created: event }, snapshot: data };
		}

		case "get_analytics_overview": {
			const leadCount = data.leads?.length ?? 0;
			const dealCount = data.deals?.length ?? 0;
			const openDeals = (data.deals ?? []).filter((d) => d.stage !== "won" && d.stage !== "lost");
			const pipelineValue = openDeals.reduce((s, d) => s + (d.value ?? 0), 0);
			const paidInvoices = (data.invoices ?? []).filter((i) => i.status === "Paid");
			const pendingInvoices = (data.invoices ?? []).filter((i) => i.status === "Pending");
			const overdueInvoices = (data.invoices ?? []).filter((i) => i.status === "Overdue");
			const revenue = paidInvoices.reduce((s, i) => s + (i.amount ?? 0), 0);
			const contactCount = data.contacts?.length ?? 0;
			const openTasks = (data.taskSections ?? []).flatMap((s) => s.tasks).filter((t) => t.progress !== "Completed").length;
			return {
				data: {
					leads: leadCount,
					contacts: contactCount,
					deals: dealCount,
					openDeals: openDeals.length,
					pipelineValue,
					revenuePaid: revenue,
					invoicesPaid: paidInvoices.length,
					invoicesPending: pendingInvoices.length,
					invoicesOverdue: overdueInvoices.length,
					openTasks,
					subscriptions: data.subscriptions?.length ?? 0,
					supportTicketsOpen: (data.supportTickets ?? []).filter((t) => t.status === "Open").length,
				},
				snapshot: data,
			};
		}

		case "get_revenue_breakdown": {
			const byStatus = { Paid: 0, Pending: 0, Overdue: 0 };
			for (const inv of data.invoices ?? []) {
				if (byStatus[inv.status] != null) byStatus[inv.status] += inv.amount ?? 0;
			}
			const paymentsCompleted = (data.payments ?? [])
				.filter((p) => p.status === "Completed")
				.reduce((s, p) => s + (p.amount ?? 0), 0);
			return {
				data: {
					invoicesByStatus: byStatus,
					paymentsCompleted,
					totalInvoiced: Object.values(byStatus).reduce((a, b) => a + b, 0),
				},
				snapshot: data,
			};
		}

		default:
			return null;
	}
}
