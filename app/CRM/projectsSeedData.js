/** Shared project seed data — used by Projects list and detail lookups. */

export const INITIAL_PROJECTS = [
	{
		id: 1,
		projectName: "Product Development",
		clientName: "Kevin Heal",
		clientAvatarColor: "bg-blue-500",
		startDate: "20/03/2024",
		deadline: "05/04/2024",
		status: "Active",
		progress: 30,
	},
	{
		id: 2,
		projectName: "New Office Building",
		clientName: "Sarah Johnson",
		clientAvatarColor: "bg-purple-500",
		startDate: "15/03/2024",
		deadline: "10/04/2024",
		status: "Cancel",
		progress: 60,
	},
	{
		id: 3,
		projectName: "Mobile app design",
		clientName: "Michael Chen",
		clientAvatarColor: "bg-orange-500",
		startDate: "10/03/2024",
		deadline: "01/04/2024",
		status: "Completed",
		progress: 100,
	},
	{
		id: 4,
		projectName: "Website & Blog",
		clientName: "Emily Rodriguez",
		clientAvatarColor: "bg-amber-700",
		startDate: "05/03/2024",
		deadline: "20/03/2024",
		status: "Pending",
		progress: 50,
	},
	{
		id: 5,
		projectName: "Marketing Campaign",
		clientName: "David Wilson",
		clientAvatarColor: "bg-blue-700",
		startDate: "01/03/2024",
		deadline: "15/04/2024",
		status: "Active",
		progress: 45,
	},
	{
		id: 6,
		projectName: "E-commerce Platform",
		clientName: "Jessica Lee",
		clientAvatarColor: "bg-cyan-500",
		startDate: "25/02/2024",
		deadline: "10/05/2024",
		status: "Pending",
		progress: 20,
	},
];

export function findProjectSeed(id) {
	return INITIAL_PROJECTS.find((p) => String(p.id) === String(id)) || null;
}

export function getProjectStatusColor(status) {
	switch (status) {
		case "Active":
			return "bg-blue-500/12 text-blue-800 dark:text-blue-200 border-blue-500/25";
		case "Completed":
			return "bg-emerald-500/12 text-emerald-800 dark:text-emerald-200 border-emerald-500/25";
		case "Pending":
			return "bg-amber-500/12 text-amber-900 dark:text-amber-100 border-amber-500/25";
		case "Cancel":
			return "bg-rose-500/12 text-rose-900 dark:text-rose-100 border-rose-500/25";
		default:
			return "bg-zinc-500/12 text-zinc-800 dark:text-zinc-200 border-zinc-500/25";
	}
}
