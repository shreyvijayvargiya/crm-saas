import {
	EXTENDED_TOOL_DEFINITIONS,
	executeExtendedTool,
} from "@/lib/ai/extendedTools";

function clone(value) {
	return JSON.parse(JSON.stringify(value));
}

function normalizeSearch(value) {
	return String(value ?? "")
		.trim()
		.toLowerCase();
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

const BASE_CRM_TOOL_DEFINITIONS = [
	{
		type: "function",
		function: {
			name: "list_leads",
			description:
				"List leads from the table view with optional text search.",
			parameters: {
				type: "object",
				properties: {
					search: { type: "string", description: "Filter by name, email, or company" },
					limit: { type: "number", description: "Max results (default 20)" },
				},
			},
		},
	},
	{
		type: "function",
		function: {
			name: "list_lead_pipeline",
			description: "List leads in a kanban pipeline column.",
			parameters: {
				type: "object",
				properties: {
					pipelineId: {
						type: "string",
						enum: ["new", "contacted", "rejected"],
						description: "new=Backlog, contacted=In Progress, rejected=Done",
					},
				},
			},
		},
	},
	{
		type: "function",
		function: {
			name: "create_lead",
			description: "Create a new lead and add to Backlog pipeline.",
			parameters: {
				type: "object",
				properties: {
					name: { type: "string" },
					email: { type: "string" },
					company: { type: "string" },
				},
				required: ["name", "email"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "delete_lead",
			description: "Delete a lead by id from the table and all pipeline columns.",
			parameters: {
				type: "object",
				properties: {
					leadId: { type: "string", description: "Lead id e.g. 101" },
				},
				required: ["leadId"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "list_deals",
			description: "List deals with optional filters.",
			parameters: {
				type: "object",
				properties: {
					stage: {
						type: "string",
						enum: ["prospect", "qualified", "proposal", "won", "lost"],
					},
					rep: { type: "string", description: "Sales rep name" },
					search: { type: "string" },
					limit: { type: "number" },
				},
			},
		},
	},
	{
		type: "function",
		function: {
			name: "update_deal_stage",
			description: "Move a deal to a new stage in deals list and pipeline board.",
			parameters: {
				type: "object",
				properties: {
					dealId: { type: "string" },
					stage: {
						type: "string",
						enum: ["prospect", "qualified", "proposal", "won", "lost"],
					},
				},
				required: ["dealId", "stage"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "delete_deal",
			description: "Delete a deal by id from deals list and pipeline board.",
			parameters: {
				type: "object",
				properties: {
					dealId: { type: "string", description: "Deal id e.g. d1" },
				},
				required: ["dealId"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "summarize_pipeline",
			description:
				"Aggregate pipeline stats: count and total value per stage, plus overall totals.",
			parameters: { type: "object", properties: {} },
		},
	},
	{
		type: "function",
		function: {
			name: "list_pipeline_deals",
			description: "List deals on the pipeline kanban board.",
			parameters: {
				type: "object",
				properties: {
					stage: {
						type: "string",
						enum: ["prospect", "qualified", "proposal", "won", "lost"],
					},
					priority: {
						type: "string",
						enum: ["high", "medium", "low"],
					},
					limit: { type: "number" },
				},
			},
		},
	},
	{
		type: "function",
		function: {
			name: "list_tasks",
			description: "List tasks, optionally filtered by section or priority.",
			parameters: {
				type: "object",
				properties: {
					sectionId: {
						type: "string",
						enum: ["to-do", "in-progress", "completed"],
					},
					priority: {
						type: "string",
						enum: ["High", "Medium", "Low"],
					},
					search: { type: "string" },
					limit: { type: "number" },
				},
			},
		},
	},
	{
		type: "function",
		function: {
			name: "create_task",
			description: "Create a task in a section (default Backlog).",
			parameters: {
				type: "object",
				properties: {
					name: { type: "string" },
					description: { type: "string" },
					sectionId: {
						type: "string",
						enum: ["to-do", "in-progress", "completed"],
					},
					priority: {
						type: "string",
						enum: ["High", "Medium", "Low"],
					},
				},
				required: ["name"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "delete_task",
			description: "Delete a task by id from any section.",
			parameters: {
				type: "object",
				properties: {
					taskId: { type: "string", description: "Task id e.g. 201" },
				},
				required: ["taskId"],
			},
		},
	},
	{
		type: "function",
		function: {
			name: "list_activities",
			description: "List recent activity timeline entries.",
			parameters: {
				type: "object",
				properties: {
					module: {
						type: "string",
						description: "e.g. Deals, Leads, Contacts, Email, Finance, Developer",
					},
					limit: { type: "number" },
				},
			},
		},
	},
	{
		type: "function",
		function: {
			name: "log_activity",
			description: "Add an entry to the activity timeline.",
			parameters: {
				type: "object",
				properties: {
					type: {
						type: "string",
						enum: ["deal", "lead", "email", "call", "invoice", "webhook"],
					},
					title: { type: "string" },
					body: { type: "string" },
					module: { type: "string" },
					actor: { type: "string" },
				},
				required: ["title", "body"],
			},
		},
	},
];

export const CRM_TOOL_DEFINITIONS = [
	...BASE_CRM_TOOL_DEFINITIONS,
	...EXTENDED_TOOL_DEFINITIONS,
];

export function executeCrmTool(snapshot, toolName, rawArgs) {
	const args = typeof rawArgs === "string" ? JSON.parse(rawArgs || "{}") : rawArgs ?? {};
	const data = clone(snapshot);
	data.leads = data.leads ?? [];
	data.leadPipelines = data.leadPipelines ?? [];
	data.deals = data.deals ?? [];
	data.pipelineDeals = data.pipelineDeals ?? [];
	data.taskSections = data.taskSections ?? [];
	data.activities = data.activities ?? [];

	switch (toolName) {
		case "list_leads": {
			const search = normalizeSearch(args.search);
			const limit = args.limit ?? 20;
			const items = data.leads
				.filter((lead) => {
					const company =
						data.leadPipelines
							.flatMap((p) => p.leads)
							.find((l) => l.id === lead.id)?.company ?? "";
					return (
						matchesSearch(lead.name, search) ||
						matchesSearch(lead.email, search) ||
						matchesSearch(company, search)
					);
				})
				.slice(0, limit)
				.map((lead) => ({
					id: lead.id,
					name: lead.name,
					email: lead.email,
					lastContacted: lead.lastContacted,
				}));
			return {
				data: { leads: items, count: items.length, totalLeads: data.leads.length },
				snapshot: data,
			};
		}

		case "list_lead_pipeline": {
			const pipeline = data.leadPipelines.find((p) => p.id === args.pipelineId);
			if (!pipeline) {
				return {
					data: { error: "Unknown pipelineId. Use new, contacted, or rejected." },
					snapshot: data,
				};
			}
			return {
				data: {
					pipelineId: pipeline.id,
					pipelineName: pipeline.name,
					leads: pipeline.leads,
					count: pipeline.leads.length,
				},
				snapshot: data,
			};
		}

		case "create_lead": {
			const id = nextNumericId(data.leads, 113);
			const lead = {
				id,
				name: args.name,
				email: args.email,
				lastContacted: new Date().toLocaleDateString("en-US"),
				image: "./people/person-1.png",
			};
			data.leads.unshift(lead);
			const backlog = data.leadPipelines.find((p) => p.id === "new");
			if (backlog) {
				backlog.leads.unshift({
					id,
					name: args.name,
					email: args.email,
					company: args.company ?? "—",
					image: lead.image,
				});
			}
			data.activities.unshift({
				id: `act_${Date.now()}`,
				type: "lead",
				title: "New lead created",
				body: `${args.name}${args.company ? ` from ${args.company}` : ""}`,
				actor: "AI Assistant",
				time: "Just now",
				module: "Leads",
			});
			return { data: { created: lead }, snapshot: data };
		}

		case "delete_lead": {
			const id = String(args.leadId);
			const lead = data.leads.find((l) => l.id === id);
			if (!lead) {
				return { data: { error: `Lead ${id} not found` }, snapshot: data };
			}
			data.leads = data.leads.filter((l) => l.id !== id);
			data.leadPipelines = data.leadPipelines.map((p) => ({
				...p,
				leads: p.leads.filter((l) => l.id !== id),
			}));
			data.activities.unshift({
				id: `act_${Date.now()}`,
				type: "lead",
				title: "Lead removed",
				body: `${lead.name} (${lead.email})`,
				actor: "AI Assistant",
				time: "Just now",
				module: "Leads",
			});
			return { data: { deleted: { id, name: lead.name } }, snapshot: data };
		}

		case "list_deals": {
			const search = normalizeSearch(args.search);
			const rep = normalizeSearch(args.rep);
			const limit = args.limit ?? 20;
			const items = data.deals
				.filter((deal) => {
					if (args.stage && deal.stage !== args.stage) return false;
					if (rep && !normalizeSearch(deal.rep).includes(rep)) return false;
					if (
						search &&
						!matchesSearch(deal.name, search) &&
						!matchesSearch(deal.company, search)
					) {
						return false;
					}
					return true;
				})
				.slice(0, limit);
			return { data: { deals: items, count: items.length }, snapshot: data };
		}

		case "update_deal_stage": {
			const deal = data.deals.find((d) => d.id === String(args.dealId));
			const boardDeal = data.pipelineDeals.find((d) => d.id === String(args.dealId));
			if (!deal) {
				return { data: { error: `Deal ${args.dealId} not found` }, snapshot: data };
			}
			const prev = deal.stage;
			deal.stage = args.stage;
			if (boardDeal) {
				boardDeal.stage = args.stage;
				boardDeal.daysInStage = 0;
				boardDeal.lastActivity = `Just now · Stage → ${args.stage}`;
			}
			data.activities.unshift({
				id: `act_${Date.now()}`,
				type: "deal",
				title: `Deal moved to ${args.stage}`,
				body: `${deal.name} — $${deal.value.toLocaleString()}`,
				actor: "AI Assistant",
				time: "Just now",
				module: "Deals",
			});
			return {
				data: { dealId: deal.id, name: deal.name, from: prev, to: args.stage },
				snapshot: data,
			};
		}

		case "delete_deal": {
			const id = String(args.dealId);
			const deal = data.deals.find((d) => d.id === id);
			const boardDeal = data.pipelineDeals.find((d) => d.id === id);
			if (!deal && !boardDeal) {
				return { data: { error: `Deal ${id} not found` }, snapshot: data };
			}
			data.deals = data.deals.filter((d) => d.id !== id);
			data.pipelineDeals = data.pipelineDeals.filter((d) => d.id !== id);
			const name = deal?.name ?? boardDeal?.title ?? id;
			data.activities.unshift({
				id: `act_${Date.now()}`,
				type: "deal",
				title: "Deal removed",
				body: name,
				actor: "AI Assistant",
				time: "Just now",
				module: "Deals",
			});
			return { data: { deleted: { id, name } }, snapshot: data };
		}

		case "summarize_pipeline": {
			const byStage = {};
			for (const stage of data.pipelineStages) {
				byStage[stage.id] = { label: stage.label, count: 0, totalValue: 0 };
			}
			for (const deal of data.deals) {
				if (deal.stage === "lost") continue;
				const bucket = byStage[deal.stage];
				if (!bucket) continue;
				bucket.count += 1;
				bucket.totalValue += deal.value ?? 0;
			}
			const active = data.deals.filter((d) => d.stage !== "lost" && d.stage !== "won");
			const totalValue = active.reduce((sum, d) => sum + (d.value ?? 0), 0);
			return {
				data: {
					byStage: Object.values(byStage),
					activeDeals: active.length,
					activePipelineValue: totalValue,
					wonCount: data.deals.filter((d) => d.stage === "won").length,
					lostCount: data.deals.filter((d) => d.stage === "lost").length,
				},
				snapshot: data,
			};
		}

		case "list_pipeline_deals": {
			const limit = args.limit ?? 20;
			const items = data.pipelineDeals
				.filter((deal) => {
					if (args.stage && deal.stage !== args.stage) return false;
					if (args.priority && deal.priority !== args.priority) return false;
					return true;
				})
				.slice(0, limit);
			return { data: { deals: items, count: items.length }, snapshot: data };
		}

		case "list_tasks": {
			const search = normalizeSearch(args.search);
			const limit = args.limit ?? 30;
			const tasks = [];
			for (const section of data.taskSections) {
				if (args.sectionId && section.id !== args.sectionId) continue;
				for (const task of section.tasks) {
					if (args.priority && task.priority !== args.priority) continue;
					if (search && !matchesSearch(task.name, search) && !matchesSearch(task.description, search)) {
						continue;
					}
					tasks.push({
						id: task.id,
						name: task.name,
						section: section.name,
						sectionId: section.id,
						priority: task.priority,
						progress: task.progress,
						progressPercent: task.progressPercent,
					});
				}
			}
			return { data: { tasks: tasks.slice(0, limit), count: tasks.length }, snapshot: data };
		}

		case "create_task": {
			const sectionId = args.sectionId ?? "to-do";
			const section = data.taskSections.find((s) => s.id === sectionId);
			if (!section) {
				return { data: { error: "Invalid sectionId" }, snapshot: data };
			}
			const id = nextNumericId(section.tasks, 210);
			const task = {
				id,
				name: args.name,
				description: args.description ?? "",
				progress: sectionId === "completed" ? "Completed" : "Not Started",
				icon: "✨",
				progressPercent: sectionId === "completed" ? 100 : 0,
				priority: args.priority ?? "Medium",
				attachments: 0,
				comments: 0,
				assignees: [],
			};
			section.tasks.unshift(task);
			return { data: { created: task, section: section.name }, snapshot: data };
		}

		case "delete_task": {
			const id = String(args.taskId);
			let removed = null;
			let sectionName = null;
			for (const section of data.taskSections) {
				const task = section.tasks.find((t) => t.id === id);
				if (task) {
					removed = task;
					sectionName = section.name;
					section.tasks = section.tasks.filter((t) => t.id !== id);
					break;
				}
			}
			if (!removed) {
				return { data: { error: `Task ${id} not found` }, snapshot: data };
			}
			return {
				data: { deleted: { id, name: removed.name, section: sectionName } },
				snapshot: data,
			};
		}

		case "list_activities": {
			const limit = args.limit ?? 10;
			let items = data.activities;
			if (args.module) {
				const mod = normalizeSearch(args.module);
				items = items.filter((a) => normalizeSearch(a.module).includes(mod));
			}
			items = items.slice(0, limit);
			return { data: { activities: items, count: items.length }, snapshot: data };
		}

		case "log_activity": {
			const entry = {
				id: `act_${Date.now()}`,
				type: args.type ?? "deal",
				title: args.title,
				body: args.body,
				actor: args.actor ?? "AI Assistant",
				time: "Just now",
				module: args.module ?? "Deals",
			};
			data.activities.unshift(entry);
			return { data: { logged: entry }, snapshot: data };
		}

		default: {
			const extended = executeExtendedTool(data, toolName, args);
			if (extended) return extended;
			return { data: { error: `Unknown tool: ${toolName}` }, snapshot: data };
		}
	}
}
