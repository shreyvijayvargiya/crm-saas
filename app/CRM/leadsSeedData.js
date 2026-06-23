/** Shared lead seed data — used by list page and detail lookups. */

export const INITIAL_PIPELINES = [
	{
		id: "new",
		name: "Backlog",
		leads: [
			{
				id: "101",
				name: "Alice Brown",
				email: "alice@company.com",
				company: "Cloud Corp",
				image: "./people/person-1.png",
			},
			{
				id: "103",
				name: "Charlie Green",
				email: "charlie@company.com",
				company: "Tech Innovations",
				image: "./people/person-2.png",
			},
			{
				id: "104",
				name: "Diana Prince",
				email: "diana@company.com",
				company: "Amazon",
				image: "./people/person-3.png",
			},
		],
	},
	{
		id: "contacted",
		name: "In Progress",
		leads: [
			{
				id: "102",
				name: "Bob Wilson",
				email: "bob@startup.io",
				company: "AI Labs",
				image: "./people/person-4.png",
			},
			{
				id: "105",
				name: "Eve Adams",
				email: "eve@company.com",
				company: "Marketing Solutions",
				image: "./people/person-1.png",
			},
			{
				id: "106",
				name: "Frank Castle",
				email: "frank@company.com",
				company: "Finance Corp",
				image: "./people/person-2.png",
			},
		],
	},
	{
		id: "rejected",
		name: "Done",
		leads: [
			{
				id: "107",
				name: "John Doe",
				email: "john@company.com",
				company: "Failed Ventures",
				image: "./people/person-2.png",
			},
			{
				id: "108",
				name: "Jane Smith",
				email: "jane@company.com",
				company: "Unsuccessful Inc.",
				image: "./people/person-4.png",
			},
		],
	},
];

export const INITIAL_LEADS = [
	{
		id: "101",
		name: "Alice Brown",
		email: "alice@company.com",
		lastContacted: "06/25/2024",
		image: "./people/person-1.png",
	},
	{
		id: "102",
		name: "Bob Wilson",
		email: "bob@startup.io",
		lastContacted: "06/24/2024",
		image: "./people/person-4.png",
	},
	{
		id: "103",
		name: "Charlie Green",
		email: "charlie@company.com",
		lastContacted: "06/23/2024",
		image: "./people/person-2.png",
	},
	{
		id: "104",
		name: "Diana Prince",
		email: "diana@company.com",
		lastContacted: "06/22/2024",
		image: "./people/person-3.png",
	},
	{
		id: "105",
		name: "Eve Adams",
		email: "eve@company.com",
		lastContacted: "06/21/2024",
		image: "./people/person-1.png",
	},
	{
		id: "106",
		name: "Frank Castle",
		email: "frank@company.com",
		lastContacted: "06/20/2024",
		image: "./people/person-2.png",
	},
	{
		id: "107",
		name: "Grace Hopper",
		email: "grace@company.com",
		lastContacted: "06/19/2024",
		image: "./people/person-3.png",
	},
	{
		id: "108",
		name: "Hank Pym",
		email: "hank@company.com",
		lastContacted: "06/18/2024",
		image: "./people/person-1.png",
	},
	{
		id: "109",
		name: "Irene Adler",
		email: "irene@company.com",
		lastContacted: "06/17/2024",
		image: "./people/person-4.png",
	},
	{
		id: "110",
		name: "Jack Sparrow",
		email: "jack@company.com",
		lastContacted: "06/16/2024",
		image: "./people/person-2.png",
	},
	{
		id: "111",
		name: "Lara Croft",
		email: "lara@company.com",
		lastContacted: "06/15/2024",
		image: "./people/person-1.png",
	},
	{
		id: "112",
		name: "John Doe",
		email: "john@company.com",
		lastContacted: "06/14/2024",
		image: "./people/person-2.png",
	},
	{
		id: "113",
		name: "Jane Smith",
		email: "jane@company.com",
		lastContacted: "06/13/2024",
		image: "./people/person-4.png",
	},
];

export function companyFromEmail(email) {
	if (!email || !String(email).includes("@")) return "—";
	const domain = String(email).split("@")[1];
	if (!domain) return "—";
	const part = domain.split(".")[0];
	return part ? part.charAt(0).toUpperCase() + part.slice(1) : "—";
}

export function getLeadCompanyFromPipelines(id) {
	const s = String(id);
	for (const pipeline of INITIAL_PIPELINES) {
		const lead = pipeline.leads.find((l) => l.id === s);
		if (lead?.company) return lead.company;
	}
	return null;
}

export function findLeadSeed(id) {
	return INITIAL_LEADS.find((l) => l.id === String(id)) || null;
}
