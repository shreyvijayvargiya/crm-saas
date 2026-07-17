import React, { useState } from "react";
import { useRouter } from "next/router";
import { CalendarClock, Plug2 } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchedulerConnectionsProvider } from "./SchedulerConnectionsContext";
import ConnectAppsModal from "./ConnectAppsModal";

function SchedulerLayoutInner({
	children,
	title,
	description,
	showConnectCta = true,
}) {
	const router = useRouter();
	const { colors } = useTheme();
	const [connectOpen, setConnectOpen] = useState(false);

	const activeTab =
		router.pathname.startsWith("/scheduler/apps") ? "apps" : "calendar";

	const handleTabChange = (value) => {
		if (value === "apps") {
			router.push("/scheduler/apps");
			return;
		}
		router.push("/scheduler");
	};

	return (
		<div className="min-h-screen pb-12">
			<div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 space-y-5">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div className="flex items-start gap-3">
						<span className="hidden sm:flex p-2.5 rounded-xl bg-primary text-primary-foreground shrink-0">
							<CalendarClock className="w-6 h-6" />
						</span>
						<div>
							<h1
								className={`text-2xl md:text-3xl font-bold tracking-tight ${colors.foreground}`}
							>
								{title ?? "Content scheduler"}
							</h1>
							<p
								className={`text-sm mt-1 max-w-2xl ${colors.textSecondary ?? colors.mutedForeground}`}
							>
								{description ??
									"Plan posts across social platforms — pick a date, choose a channel, edit platform-specific fields."}
							</p>
						</div>
					</div>
					{showConnectCta && (
						<Button
							type="button"
							variant="outline"
							className="shrink-0 gap-2"
							onClick={() => setConnectOpen(true)}
						>
							<Plug2 className="h-4 w-4" />
							Connect apps
						</Button>
					)}
				</div>

				<Tabs value={activeTab} onValueChange={handleTabChange}>
					<TabsList aria-label="Scheduler sections">
						<TabsTrigger value="calendar">Calendar</TabsTrigger>
						<TabsTrigger value="apps">Connected apps</TabsTrigger>
					</TabsList>
				</Tabs>

				{children}
			</div>

			<ConnectAppsModal
				open={connectOpen}
				onClose={() => setConnectOpen(false)}
			/>
		</div>
	);
}

export default function SchedulerLayout(props) {
	return (
		<SchedulerConnectionsProvider>
			<SchedulerLayoutInner {...props} />
		</SchedulerConnectionsProvider>
	);
}
