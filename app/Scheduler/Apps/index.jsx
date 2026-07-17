import React, { useMemo, useState } from "react";
import { CheckCircle2, Link2, Plug2, Search, XCircle } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SchedulerLayout from "../SchedulerLayout";
import ConnectAppsModal from "../ConnectAppsModal";
import { SCHEDULER_PLATFORMS } from "../platforms";
import { useSchedulerConnections } from "../SchedulerConnectionsContext";

function AppsPageContent() {
	const { colors } = useTheme();
	const { connections, stats } = useSchedulerConnections();
	const [search, setSearch] = useState("");
	const [modalOpen, setModalOpen] = useState(false);

	const apps = useMemo(() => {
		const q = search.trim().toLowerCase();
		return SCHEDULER_PLATFORMS.filter((p) => {
			if (!q) return true;
			const account = connections[p.id]?.account ?? "";
			return (
				p.label.toLowerCase().includes(q) ||
				String(account).toLowerCase().includes(q)
			);
		});
	}, [search, connections]);

	const connectedApps = apps.filter((p) => connections[p.id]?.connected);
	const disconnectedApps = apps.filter((p) => !connections[p.id]?.connected);

	return (
		<>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="relative max-w-md flex-1">
					<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search platforms…"
						className="pl-9"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<Button
					type="button"
					className="gap-2"
					onClick={() => setModalOpen(true)}
				>
					<Plug2 className="h-4 w-4" />
					Manage connections
				</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
				<Card>
					<CardContent className="p-4">
						<p className={`text-[11px] font-semibold uppercase tracking-wide ${colors.mutedForeground}`}>
							Connected
						</p>
						<p className={`text-2xl font-bold tabular-nums mt-1 ${colors.foreground}`}>
							{stats.connected}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<p className={`text-[11px] font-semibold uppercase tracking-wide ${colors.mutedForeground}`}>
							Not connected
						</p>
						<p className={`text-2xl font-bold tabular-nums mt-1 ${colors.foreground}`}>
							{stats.disconnected}
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-4">
						<p className={`text-[11px] font-semibold uppercase tracking-wide ${colors.mutedForeground}`}>
							Total apps
						</p>
						<p className={`text-2xl font-bold tabular-nums mt-1 ${colors.foreground}`}>
							{stats.total}
						</p>
					</CardContent>
				</Card>
			</div>

			<section className="space-y-3">
				<div className="flex items-center justify-between gap-2">
					<h2 className={`text-sm font-semibold ${colors.foreground}`}>
						Connected
					</h2>
					<Badge variant="default" className="gap-1">
						<CheckCircle2 className="h-3 w-3" />
						{connectedApps.length}
					</Badge>
				</div>
				{connectedApps.length === 0 ? (
					<Card>
						<CardContent className={`p-8 text-center text-sm ${colors.mutedForeground}`}>
							No connected apps yet. Open the modal to connect platforms.
						</CardContent>
					</Card>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{connectedApps.map((platform) => {
							const { Icon } = platform;
							const conn = connections[platform.id];
							return (
								<Card key={platform.id}>
									<CardContent className="p-4 flex items-start gap-3">
										<span
											className={cn(
												"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
												platform.color
											)}
										>
											<Icon className="h-5 w-5" />
										</span>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-center gap-2">
												<p className={`font-medium ${colors.foreground}`}>
													{platform.label}
												</p>
												<Badge variant="default" className="text-[10px] gap-1">
													<CheckCircle2 className="h-3 w-3" />
													Connected
												</Badge>
											</div>
											<p className={`text-xs mt-1 truncate ${colors.mutedForeground}`}>
												{conn?.account || "Connected account"}
											</p>
											{conn?.connectedAt && (
												<p className={`text-[11px] mt-0.5 ${colors.mutedForeground}`}>
													Since {conn.connectedAt}
												</p>
											)}
										</div>
										<Button
											type="button"
											variant="outline"
											size="sm"
											onClick={() => setModalOpen(true)}
										>
											Manage
										</Button>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}
			</section>

			<section className="space-y-3">
				<div className="flex items-center justify-between gap-2">
					<h2 className={`text-sm font-semibold ${colors.foreground}`}>
						Not connected
					</h2>
					<Badge variant="secondary" className="gap-1">
						<XCircle className="h-3 w-3" />
						{disconnectedApps.length}
					</Badge>
				</div>
				{disconnectedApps.length === 0 ? (
					<Card>
						<CardContent className={`p-8 text-center text-sm ${colors.mutedForeground}`}>
							All platforms are connected.
						</CardContent>
					</Card>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
						{disconnectedApps.map((platform) => {
							const { Icon } = platform;
							return (
								<Card key={platform.id} className="opacity-90">
									<CardContent className="p-4 flex items-start gap-3">
										<span
											className={cn(
												"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
												platform.color
											)}
										>
											<Icon className="h-5 w-5" />
										</span>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-center gap-2">
												<p className={`font-medium ${colors.foreground}`}>
													{platform.label}
												</p>
												<Badge variant="secondary" className="text-[10px]">
													Not connected
												</Badge>
											</div>
											<p className={`text-xs mt-1 ${colors.mutedForeground}`}>
												Connect to schedule content on {platform.label}
											</p>
										</div>
										<Button
											type="button"
											size="sm"
											className="gap-1.5"
											onClick={() => setModalOpen(true)}
										>
											<Link2 className="h-3.5 w-3.5" />
											Connect
										</Button>
									</CardContent>
								</Card>
							);
						})}
					</div>
				)}
			</section>

			<ConnectAppsModal open={modalOpen} onClose={() => setModalOpen(false)} />
		</>
	);
}

export default function SchedulerApps() {
	return (
		<SchedulerLayout
			title="Connected apps"
			description="Link social platforms so the content scheduler can publish to X, LinkedIn, YouTube, and more."
			showConnectCta={false}
		>
			<AppsPageContent />
		</SchedulerLayout>
	);
}
