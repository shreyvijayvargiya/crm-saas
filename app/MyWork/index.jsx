import React from "react";
import { ClipboardList } from "lucide-react";
import { useTheme } from "../../utils/useTheme";

const TASKS = [
	{ id: 1, title: "Call back — Contoso eval", due: "Today, 2:00 PM" },
	{ id: 2, title: "Send revised quote (Q-1024)", due: "Today, 4:30 PM" },
	{ id: 3, title: "Sync with CS on Northwind renewal", due: "Today, EOD" },
];

const ACTIVITY = [
	{ id: 1, text: "Deal “Enterprise FY26” moved to Negotiation", time: "32m ago" },
	{ id: 2, text: "New lead assigned: tier-1 from webinar list", time: "1h ago" },
	{ id: 3, text: "Invoice INV-2024-002 marked paid", time: "3h ago" },
	{ id: 4, text: "Note added on Acme — Legal review", time: "Yesterday" },
	{ id: 5, text: "Task completed: Discovery call (Fabrikam)", time: "Yesterday" },
];

const MyWork = () => {
	const { colors, scheme } = useTheme();

	return (
		<div className="min-h-screen transition-all duration-100 ease-in pb-10">
			<div className="max-w-7xl px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div>
					<h1
						className={`text-2xl font-bold tracking-tight inline-flex items-center gap-2 ${colors.foreground}`}
					>
						<ClipboardList className="h-7 w-7 shrink-0" />
						My work
					</h1>
					<p className={`text-sm mt-1 ${colors.textSecondary}`}>
						What to do now and a short feed of what changed across the workspace
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					<div
						className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
					>
						<div className={`px-4 md:px-5 py-3 border-b ${colors.border}`}>
							<p className={`text-sm font-medium ${colors.foreground}`}>Due today</p>
						</div>
						<ul className="divide-y divide-inherit">
							{TASKS.map((t) => (
								<li
									key={t.id}
									className={`px-4 md:px-5 py-3 flex items-start gap-3 ${colors.hoverSecondary} transition-colors`}
								>
									<span
										className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${scheme.primary}`}
										aria-hidden
									/>
									<div className="min-w-0 flex-1">
										<p className={`text-sm font-medium ${colors.foreground}`}>{t.title}</p>
										<p className={`text-xs ${colors.mutedForeground}`}>{t.due}</p>
									</div>
								</li>
							))}
						</ul>
					</div>

					<div
						className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
					>
						<div className={`px-4 md:px-5 py-3 border-b ${colors.border}`}>
							<p className={`text-sm font-medium ${colors.foreground}`}>
								Recent activity
							</p>
						</div>
						<ul className="divide-y divide-inherit">
							{ACTIVITY.map((a) => (
								<li
									key={a.id}
									className={`px-4 md:px-5 py-2.5 ${colors.hoverSecondary} transition-colors`}
								>
									<p className={`text-sm ${colors.textSecondary}`}>{a.text}</p>
									<p className={`text-xs ${colors.mutedForeground} mt-0.5`}>{a.time}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyWork;
