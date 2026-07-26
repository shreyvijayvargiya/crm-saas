import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import * as lucideIcons from "lucide-react";
import {
	ArrowRight,
	FolderKanban,
	Loader2,
	Plus,
	Trash2,
} from "lucide-react";
import { toast } from "sonner";
import SiteSeo from "@/components/seo/SiteSeo";
import AgencyShell from "@/app/AgencySite/components/AgencyShell";
import { useAgencyTheme } from "@/app/AgencySite/AgencyThemeContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/utils/AuthContext";
import { useProject } from "@/utils/ProjectContext";
import { getVerticalAstById } from "@/asts/crm-verticals";
import {
	SaaS_CRM_TYPES,
	createUserProject,
	deleteUserProject,
	listUserProjects,
} from "@/lib/projectsApi";
import { cn } from "@/lib/utils";

const ACCENT = {
	violet: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
	blue: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
	emerald: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
	amber: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
	rose: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
	teal: "bg-teal-500/15 text-teal-600 dark:text-teal-400",
	zinc: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-300",
};

function WorkspacePage() {
	const router = useRouter();
	const { isLight } = useAgencyTheme();
	const { user, loading: authLoading, isAuthenticated, openLogin } = useAuth();
	const { setActiveProject } = useProject();
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [createOpen, setCreateOpen] = useState(false);
	const [creating, setCreating] = useState(null);
	const [deleting, setDeleting] = useState(null);

	const ownedTypes = useMemo(
		() => new Set(projects.map((p) => p.crmType || p.id)),
		[projects]
	);

	const availableTypes = useMemo(
		() => SaaS_CRM_TYPES.filter((id) => !ownedTypes.has(id)),
		[ownedTypes]
	);

	const refresh = useCallback(async () => {
		if (!user?.uid) {
			setProjects([]);
			setLoading(false);
			return;
		}
		setLoading(true);
		try {
			const rows = await listUserProjects(user.uid);
			setProjects(rows);
		} catch (err) {
			console.error(err);
			toast.error(err?.message || "Could not load projects");
		} finally {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		if (authLoading) return;
		if (!isAuthenticated) {
			setLoading(false);
			return;
		}
		refresh();
	}, [authLoading, isAuthenticated, refresh]);

	const openProject = async (crmType) => {
		const ast = getVerticalAstById(crmType);
		await setActiveProject(crmType);
		toast.success(`Opening ${ast.meta?.name || crmType}`);
		router.push(ast.homeRoute || "/dashboard");
	};

	const handleCreate = async (crmType) => {
		if (!user?.uid) return;
		setCreating(crmType);
		try {
			await createUserProject(user.uid, crmType);
			toast.success("CRM project created");
			setCreateOpen(false);
			await refresh();
			await openProject(crmType);
		} catch (err) {
			toast.error(err?.message || "Could not create project");
		} finally {
			setCreating(null);
		}
	};

	const handleDelete = async (crmType, e) => {
		e?.stopPropagation?.();
		if (!user?.uid) return;
		if (!window.confirm(`Delete the ${crmType} CRM project? Data under it will remain until cleaned up.`)) {
			return;
		}
		setDeleting(crmType);
		try {
			await deleteUserProject(user.uid, crmType);
			toast.success("Project removed");
			await refresh();
		} catch (err) {
			toast.error(err?.message || "Could not delete project");
		} finally {
			setDeleting(null);
		}
	};

	const muted = isLight ? "text-zinc-500" : "text-zinc-400";
	const fg = isLight ? "text-zinc-900" : "text-zinc-50";
	const border = isLight ? "border-zinc-200" : "border-zinc-800";
	const cardBg = isLight ? "bg-white/80" : "bg-zinc-900/70";

	return (
		<>
			<SiteSeo
				title="My CRM workspace – SaaSCRM"
				description="Create and open your SaaSCRM projects. Each project is a CRM template type backed by Firestore."
				path="/workspace"
				noIndex
			/>

			<div className="space-y-8 py-4">
				<header className="space-y-3">
					<div className="flex flex-wrap items-center gap-2">
						<span
							className={cn(
								"inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
								border,
								muted
							)}
						>
							<FolderKanban className="h-3.5 w-3.5" />
							Dashboard
						</span>
					</div>
					<div className="flex flex-wrap items-start justify-between gap-4">
						<div className="space-y-2">
							<h1 className={cn("text-2xl font-semibold tracking-tight sm:text-3xl", fg)}>
								Your CRM projects
							</h1>
							<p className={cn("max-w-xl text-sm", muted)}>
								Pick a template type to create a workspace. Open a project to run
								that CRM — data lives under{" "}
								<code className="text-[11px]">users/…/projects/{"{crm_type}"}</code>.
							</p>
						</div>
						{isAuthenticated ? (
							<Button
								type="button"
								onClick={() => setCreateOpen(true)}
								disabled={availableTypes.length === 0}
								className="rounded-full gap-1.5"
							>
								<Plus className="h-4 w-4" />
								New CRM
							</Button>
						) : null}
					</div>
				</header>

				{authLoading || loading ? (
					<div className={cn("flex items-center gap-2 text-sm", muted)}>
						<Loader2 className="h-4 w-4 animate-spin" />
						Loading…
					</div>
				) : !isAuthenticated ? (
					<Card className={cn("border", border, cardBg)}>
						<CardContent className="flex flex-col items-start gap-4 p-6">
							<p className={cn("text-sm", muted)}>
								Sign in with Google to create and manage your CRM projects.
							</p>
							<Button type="button" onClick={openLogin} className="rounded-full">
								Sign in
							</Button>
						</CardContent>
					</Card>
				) : projects.length === 0 ? (
					<Card className={cn("border", border, cardBg)}>
						<CardContent className="flex flex-col items-start gap-4 p-6">
							<p className={cn("text-sm", muted)}>
								No projects yet. Create your first CRM from one of the 6 template
								types.
							</p>
							<Button
								type="button"
								onClick={() => setCreateOpen(true)}
								className="rounded-full gap-1.5"
							>
								<Plus className="h-4 w-4" />
								Create CRM
							</Button>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-4 sm:grid-cols-2">
						{projects.map((project) => {
							const crmType = project.crmType || project.id;
							const ast = getVerticalAstById(crmType);
							const Icon =
								lucideIcons[project.icon || ast.meta?.icon] ||
								lucideIcons.LayoutDashboard;
							const accent =
								ACCENT[project.accent || ast.meta?.accent] || ACCENT.zinc;
							const busy = deleting === crmType;

							return (
								<button
									key={crmType}
									type="button"
									onClick={() => openProject(crmType)}
									className="text-left"
								>
									<Card
										className={cn(
											"h-full border transition hover:shadow-md",
											border,
											cardBg
										)}
									>
										<CardContent className="flex h-full flex-col gap-4 p-5">
											<div className="flex items-start justify-between gap-3">
												<div
													className={cn(
														"flex h-10 w-10 items-center justify-center rounded-xl",
														accent
													)}
												>
													<Icon className="h-5 w-5" />
												</div>
												<div className="flex items-center gap-2">
													<Badge variant="outline" className="text-[10px]">
														{crmType}
													</Badge>
													<span
														role="button"
														tabIndex={0}
														onClick={(e) => handleDelete(crmType, e)}
														onKeyDown={(e) => {
															if (e.key === "Enter") handleDelete(crmType, e);
														}}
														className={cn(
															"inline-flex h-8 w-8 items-center justify-center rounded-full",
															isLight
																? "text-zinc-400 hover:bg-zinc-100 hover:text-red-600"
																: "text-zinc-500 hover:bg-zinc-800 hover:text-red-400"
														)}
														aria-label={`Delete ${crmType}`}
													>
														{busy ? (
															<Loader2 className="h-3.5 w-3.5 animate-spin" />
														) : (
															<Trash2 className="h-3.5 w-3.5" />
														)}
													</span>
												</div>
											</div>
											<div className="space-y-1">
												<h2 className={cn("text-base font-semibold", fg)}>
													{project.name || ast.meta?.name}
												</h2>
												<p className={cn("text-xs line-clamp-2", muted)}>
													{project.tagline || ast.meta?.tagline}
												</p>
											</div>
											<div
												className={cn(
													"mt-auto flex items-center gap-1 text-xs font-medium",
													fg
												)}
											>
												Open CRM
												<ArrowRight className="h-3.5 w-3.5" />
											</div>
										</CardContent>
									</Card>
								</button>
							);
						})}
					</div>
				)}
			</div>

			<Dialog open={createOpen} onOpenChange={setCreateOpen}>
				<DialogContent
					className={cn(
						"max-w-lg border sm:rounded-2xl",
						isLight
							? "border-zinc-200 bg-white text-zinc-900"
							: "border-zinc-800 bg-zinc-950 text-zinc-100"
					)}
				>
					<DialogHeader>
						<DialogTitle>Create a CRM project</DialogTitle>
						<DialogDescription className={muted}>
							Choose a template type. You can create one project per type.
						</DialogDescription>
					</DialogHeader>
					<div className="grid max-h-[60vh] gap-2 overflow-y-auto py-2">
						{availableTypes.length === 0 ? (
							<p className={cn("text-sm", muted)}>
								You already have all 6 CRM types. Open one from the dashboard.
							</p>
						) : (
							availableTypes.map((id) => {
								const ast = getVerticalAstById(id);
								const Icon =
									lucideIcons[ast.meta?.icon] || lucideIcons.LayoutDashboard;
								const accent = ACCENT[ast.meta?.accent] || ACCENT.zinc;
								const busy = creating === id;
								return (
									<button
										key={id}
										type="button"
										disabled={Boolean(creating)}
										onClick={() => handleCreate(id)}
										className={cn(
											"flex items-start gap-3 rounded-xl border p-3 text-left transition",
											border,
											isLight ? "hover:bg-zinc-50" : "hover:bg-zinc-900"
										)}
									>
										<div
											className={cn(
												"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
												accent
											)}
										>
											{busy ? (
												<Loader2 className="h-4 w-4 animate-spin" />
											) : (
												<Icon className="h-4 w-4" />
											)}
										</div>
										<div className="min-w-0 flex-1">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">{ast.meta.name}</span>
												<Badge variant="outline" className="text-[10px]">
													{id}
												</Badge>
											</div>
											<p className={cn("mt-0.5 text-xs line-clamp-2", muted)}>
												{ast.meta.tagline}
											</p>
										</div>
									</button>
								);
							})
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}

function WorkspaceWithShell() {
	return (
		<AgencyShell wide>
			<WorkspacePage />
		</AgencyShell>
	);
}

WorkspaceWithShell.disableLayout = true;

export default WorkspaceWithShell;
