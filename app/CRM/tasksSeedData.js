/** Shared task board seed — used by Tasks page and AI assistant context. */

export const INITIAL_TASK_SECTIONS = [
	{
		id: "to-do",
		name: "Backlog",
		tasks: [
			{
				id: "201",
				name: "Prepare presentation",
				description:
					"Draft slides for Q4 review and align with stakeholders on messaging...",
				progress: "Not Started",
				icon: "📝",
				progressPercent: 0,
				priority: "High",
				attachments: 2,
				comments: 4,
				assignees: [{ initials: "JD" }, { initials: "EC" }, { initials: "GR" }],
			},
			{
				id: "202",
				name: "Send email updates",
				description:
					"Weekly summary to the team including blockers and next steps...",
				progress: "In Progress",
				icon: "📧",
				progressPercent: 40,
				priority: "Medium",
				attachments: 1,
				comments: 2,
				assignees: [{ initials: "AK" }, { initials: "LM" }],
			},
			{
				id: "205",
				name: "Research new tools",
				description:
					"Evaluate CRM integrations and shortlist vendors for pilot...",
				progress: "Not Started",
				icon: "🔍",
				progressPercent: 15,
				priority: "Medium",
				attachments: 0,
				comments: 3,
				assignees: [{ initials: "JD" }],
			},
			{
				id: "206",
				name: "Plan team meeting",
				description:
					"Schedule agenda, book room, and invite cross-functional owners...",
				progress: "Not Started",
				icon: "📅",
				progressPercent: 0,
				priority: "Low",
				attachments: 0,
				comments: 1,
				assignees: [{ initials: "MV" }, { initials: "SO" }],
			},
		],
	},
	{
		id: "in-progress",
		name: "In Progress",
		tasks: [
			{
				id: "203",
				name: "Develop new feature",
				description:
					"Implement Kanban board filters and API wiring for task moves...",
				progress: "In Progress",
				icon: "💻",
				progressPercent: 65,
				priority: "High",
				attachments: 3,
				comments: 8,
				assignees: [{ initials: "EC" }, { initials: "GR" }, { initials: "NT" }],
			},
			{
				id: "207",
				name: "Write documentation",
				description:
					"Developer onboarding guide and API reference for internal teams...",
				progress: "In Progress",
				icon: "📖",
				progressPercent: 40,
				priority: "Medium",
				attachments: 1,
				comments: 2,
				assignees: [{ initials: "SR" }],
			},
			{
				id: "208",
				name: "Test application",
				description:
					"Regression pass on critical flows before the release candidate...",
				progress: "In Progress",
				icon: "🧪",
				progressPercent: 55,
				priority: "High",
				attachments: 2,
				comments: 5,
				assignees: [{ initials: "QA" }, { initials: "PM" }],
			},
		],
	},
	{
		id: "completed",
		name: "Done",
		tasks: [
			{
				id: "204",
				name: "Fix bugs",
				description:
					"Resolved P1 issues from the last sprint and verified in staging...",
				progress: "Completed",
				icon: "✅",
				progressPercent: 100,
				priority: "High",
				attachments: 4,
				comments: 6,
				assignees: [{ initials: "EC" }, { initials: "FB" }],
			},
			{
				id: "209",
				name: "Deploy application",
				description:
					"Production rollout completed with monitoring and rollback plan...",
				progress: "Completed",
				icon: "🚀",
				progressPercent: 100,
				priority: "Medium",
				attachments: 1,
				comments: 3,
				assignees: [{ initials: "OP" }],
			},
			{
				id: "210",
				name: "Conduct user training",
				description:
					"Recorded session and shared materials with the customer success team...",
				progress: "Completed",
				icon: "👩‍🏫",
				progressPercent: 100,
				priority: "Low",
				attachments: 0,
				comments: 1,
				assignees: [{ initials: "TR" }, { initials: "CS" }],
			},
		],
	},
];
