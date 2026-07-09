import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Briefcase, Calendar, User } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { useCrmData } from "../../utils/CrmDataContext";
import { findById } from "../../utils/crmRecordHelpers";
import EntityDetailShell from "../CRM/EntityDetailShell";
import EntityRecordTabs from "../CRM/EntityRecordTabs";
import { getProjectStatusColor } from "../CRM/projectsSeedData";

const ProjectDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors } = useTheme();

	const { projects } = useCrmData();

	const project = useMemo(() => {
		if (!id) return null;
		return findById(projects, id);
	}, [id, projects]);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
			</div>
		);
	}

	if (!project) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Project not found.</p>
			</div>
		);
	}

	const statusClass = getProjectStatusColor(project.status);
	const initials = project.clientName
		.split(/\s+/)
		.map((p) => p[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	const sidebar = (
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-6`}
		>
			<div className="flex items-center gap-3 mb-4">
				<span
					className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors.muted}`}
				>
					<Briefcase className={`w-6 h-6 ${colors.foreground}`} />
				</span>
				<div className="min-w-0">
					<h1 className={`text-xl font-semibold ${colors.foreground} break-words`}>
						{project.projectName}
					</h1>
					<p className={`text-sm ${colors.textSecondary} mt-0.5`}>
						Client project
					</p>
				</div>
			</div>

			<span
				className={`inline-flex text-xs font-medium px-2.5 py-1 rounded-full border ${statusClass}`}
			>
				{project.status}
			</span>

			<div className="mt-4">
				<div className="flex justify-between text-xs mb-1">
					<span className={colors.textSecondary}>Progress</span>
					<span className={colors.foreground}>{project.progress}%</span>
				</div>
				<div className={`h-2 rounded-full ${colors.muted} overflow-hidden`}>
					<div
						className="h-full bg-blue-500 rounded-full transition-all"
						style={{ width: `${project.progress}%` }}
					/>
				</div>
			</div>

			<ul
				className={`mt-6 space-y-3 text-sm  pt-6`}
			>
				<li className="flex items-center gap-3">
					<div
						className={`w-8 h-8 rounded-full ${project.clientAvatarColor} flex items-center justify-center text-white text-xs font-medium shrink-0`}
					>
						{initials}
					</div>
					<div>
						<p className={`text-xs ${colors.mutedForeground}`}>Client</p>
						<p className={colors.foreground}>{project.clientName}</p>
					</div>
				</li>
				<li className="flex items-center gap-2">
					<Calendar className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>
						{project.startDate} → {project.deadline}
					</span>
				</li>
				<li className="flex items-center gap-2">
					<User className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>Project lead</span>
				</li>
			</ul>

			<p className={`text-xs mt-6 pt-6  ${colors.mutedForeground}`}>
				<Link href="/tasks" passHref>
					<a className={`font-medium ${colors.foreground} hover:underline`}>
						View related tasks
					</a>
				</Link>
			</p>
		</div>
	);

	return (
		<EntityDetailShell
			backHref="/projects"
			backLabel="Back to projects"
			sidebar={sidebar}
		>
			<EntityRecordTabs kind="project" id={project.id} />
		</EntityDetailShell>
	);
};

export default ProjectDetail;
