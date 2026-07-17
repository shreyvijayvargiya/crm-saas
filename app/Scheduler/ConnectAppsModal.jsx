import React, { useMemo, useState } from "react";
import { CheckCircle2, Link2, Link2Off, Search, X } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { overlayBackdrop, panelSurface } from "@/lib/themeTokens";
import { SCHEDULER_PLATFORMS } from "./platforms";
import { useSchedulerConnections } from "./SchedulerConnectionsContext";

/**
 * Modal listing all scheduler platforms with Connected / Not connected actions.
 */
export default function ConnectAppsModal({ open, onClose }) {
	const { colors } = useTheme();
	const { connections, connectApp, disconnectApp, stats } =
		useSchedulerConnections();
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState("all"); // all | connected | disconnected

	const apps = useMemo(() => {
		const q = search.trim().toLowerCase();
		return SCHEDULER_PLATFORMS.filter((platform) => {
			const conn = connections[platform.id];
			const isOn = Boolean(conn?.connected);
			if (filter === "connected" && !isOn) return false;
			if (filter === "disconnected" && isOn) return false;
			if (!q) return true;
			return (
				platform.label.toLowerCase().includes(q) ||
				String(conn?.account ?? "")
					.toLowerCase()
					.includes(q)
			);
		});
	}, [connections, search, filter]);

	if (!open) return null;

	const handleConnect = (platform) => {
		connectApp(platform.id);
		toast.success(`${platform.label} connected`, {
			description: "Demo OAuth — wire your provider when ready.",
		});
	};

	const handleDisconnect = (platform) => {
		disconnectApp(platform.id);
		toast.message(`${platform.label} disconnected`);
	};

	return (
		<div
			className={cn(
				"fixed inset-0 z-50 flex items-center justify-center p-4",
				overlayBackdrop
			)}
			onClick={onClose}
			role="presentation"
		>
			<div
				className={cn(
					panelSurface,
					"max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
				)}
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby="connect-apps-title"
			>
				<div
					className={`flex items-start justify-between gap-4 p-5 border-b ${colors.border} shrink-0`}
				>
					<div className="min-w-0">
						<h2
							id="connect-apps-title"
							className={`text-lg font-semibold ${colors.foreground}`}
						>
							Connect apps
						</h2>
						<p className={`text-sm mt-1 ${colors.mutedForeground}`}>
							{stats.connected} of {stats.total} platforms connected
						</p>
					</div>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={onClose}
						aria-label="Close"
					>
						<X className="h-5 w-5" />
					</Button>
				</div>

				<div className={`p-4 space-y-3 border-b ${colors.border} shrink-0`}>
					<div className="relative">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search platforms…"
							className="pl-9"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<div
						className={cn("inline-flex rounded-xl border p-0.5", colors.border)}
						role="tablist"
						aria-label="Connection filter"
					>
						{[
							{ id: "all", label: "All" },
							{ id: "connected", label: "Connected" },
							{ id: "disconnected", label: "Not connected" },
						].map((tab) => (
							<Button
								key={tab.id}
								type="button"
								variant={filter === tab.id ? "default" : "ghost"}
								size="sm"
								className="h-7 px-2.5 text-xs"
								onClick={() => setFilter(tab.id)}
								aria-pressed={filter === tab.id}
							>
								{tab.label}
							</Button>
						))}
					</div>
				</div>

				<div className="flex-1 overflow-y-auto p-2 sm:p-3">
					{apps.length === 0 ? (
						<p
							className={`py-10 text-center text-sm ${colors.mutedForeground}`}
						>
							No apps match your filters.
						</p>
					) : (
						<ul className="space-y-1.5">
							{apps.map((platform) => {
								const { Icon } = platform;
								const conn = connections[platform.id];
								const isOn = Boolean(conn?.connected);

								return (
									<li
										key={platform.id}
										className={cn(
											"flex items-center gap-3 rounded-xl border px-3 py-2.5",
											colors.border
										)}
									>
										<span
											className={cn(
												"flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
												platform.color
											)}
										>
											<Icon className="h-4 w-4" />
										</span>
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-center gap-2">
												<p
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{platform.label}
												</p>
												<Badge
													variant={isOn ? "default" : "secondary"}
													className="gap-1 text-[10px]"
												>
													{isOn ? (
														<>
															<CheckCircle2 className="h-3 w-3" />
															Connected
														</>
													) : (
														"Not connected"
													)}
												</Badge>
											</div>
											<p
												className={`truncate text-xs mt-0.5 ${colors.mutedForeground}`}
											>
												{isOn
													? conn.account || "Connected account"
													: "Connect to schedule posts on this platform"}
											</p>
										</div>
										{isOn ? (
											<Button
												type="button"
												variant="outline"
												size="sm"
												className="shrink-0 gap-1.5"
												onClick={() => handleDisconnect(platform)}
											>
												<Link2Off className="h-3.5 w-3.5" />
												Disconnect
											</Button>
										) : (
											<Button
												type="button"
												size="sm"
												className="shrink-0 gap-1.5"
												onClick={() => handleConnect(platform)}
											>
												<Link2 className="h-3.5 w-3.5" />
												Connect
											</Button>
										)}
									</li>
								);
							})}
						</ul>
					)}
				</div>

				<div
					className={`flex justify-end gap-2 p-4 border-t ${colors.border} shrink-0`}
				>
					<Button type="button" variant="outline" onClick={onClose}>
						Done
					</Button>
				</div>
			</div>
		</div>
	);
}
