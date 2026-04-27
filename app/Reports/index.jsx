import React from "react";
import { Library, LineChart, PieChart, Table2, TrendingUp, Users, Clock } from "lucide-react";
import { useTheme } from "../../utils/useTheme";

const REPORTS = [
	{
		id: "r1",
		title: "Pipeline by stage",
		desc: "Open amount and count per stage for the current quarter",
		Icon: LineChart,
	},
	{
		id: "r2",
		title: "Win rate by rep",
		desc: "Closed-won vs closed-lost, rolling 90 days",
		Icon: TrendingUp,
	},
	{
		id: "r3",
		title: "Lead source performance",
		desc: "Conversion from new lead to qualified opportunity",
		Icon: PieChart,
	},
	{
		id: "r4",
		title: "Account coverage",
		desc: "Accounts without owner or last touch",
		Icon: Users,
	},
	{
		id: "r5",
		title: "Aging open deals",
		desc: "Deals in stage over 30 / 60 / 90 days",
		Icon: Clock,
	},
	{
		id: "r6",
		title: "Activity summary",
		desc: "Calls, emails, and meetings by week",
		Icon: Table2,
	},
];

const Reports = () => {
	const { colors, scheme } = useTheme();

	return (
		<div className="min-h-screen transition-all duration-100 ease-in pb-10">
			<div className="max-w-7xl px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div>
					<h1
						className={`text-2xl font-bold tracking-tight inline-flex items-center gap-2 ${colors.foreground}`}
					>
						<Library className="h-7 w-7 shrink-0" />
						Report library
					</h1>
					<p className={`text-sm mt-1 ${colors.textSecondary}`}>
						Starter set of B2B reports — hook each card to a saved view or report API
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{REPORTS.map((r) => {
						const Icon = r.Icon;
						return (
							<button
								type="button"
								key={r.id}
								className={`text-left ${colors.card} border ${colors.border} rounded-xl p-4 ${colors.shadow} ${colors.hoverSecondary} transition-colors`}
							>
								<div
									className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${scheme.primary} ${scheme.primaryForeground}`}
								>
									<Icon className="h-4 w-4" />
								</div>
								<p className={`text-sm font-semibold ${colors.foreground}`}>{r.title}</p>
								<p className={`text-xs mt-1 leading-relaxed ${colors.mutedForeground}`}>
									{r.desc}
								</p>
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Reports;
