/** Suggested prompts for the AI assistant dropdown. */

export const PROMPT_TEMPLATES = [
	{
		category: "Leads",
		prompts: [
			"List all leads in the In Progress pipeline",
			"Who are our cold leads that need follow-up?",
			"Draft a short follow-up email for Alice Brown at Cloud Corp",
			"Add a new lead: Taylor Reed, taylor@acme.io, Acme Corp",
			"Delete lead 108 from the CRM",
		],
	},
	{
		category: "Deals",
		prompts: [
			"Which deals are in proposal stage and their total value?",
			"Summarize Alex Chen's open deals",
			"Move Northwind expansion to proposal stage",
			"What are the next steps for the FinTech integration deal?",
		],
	},
	{
		category: "Pipeline",
		prompts: [
			"Summarize the sales pipeline by stage",
			"Which high-priority deals are stuck in prospect?",
			"List deals closing in the next 30 days",
			"What's the total pipeline value excluding lost deals?",
		],
	},
	{
		category: "Tasks",
		prompts: [
			"List all high-priority tasks in backlog",
			"What tasks are in progress for the team?",
			"Create a task: Follow up with Northwind — High priority in backlog",
			"Which tasks are overdue or not started?",
		],
	},
	{
		category: "Activities",
		prompts: [
			"Show recent deal activity from the timeline",
			"What happened on the leads module today?",
			"Summarize the last 5 CRM activities",
			"Log an activity: call with Cloud Corp about enterprise pilot",
		],
	},
];
