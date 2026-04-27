import React from "react";
import { Megaphone } from "lucide-react";
import { useTheme } from "../../utils/useTheme";

const SAMPLE = [
	{
		name: "Q2 outbound — enterprise",
		listSize: 842,
		channel: "Email",
		status: "Active",
	},
	{
		name: "Product webinar follow-up",
		listSize: 1_240,
		channel: "Email",
		status: "Active",
	},
	{
		name: "Re-engagement (90d)",
		listSize: 312,
		channel: "Multi",
		status: "Paused",
	},
	{
		name: "Partner co-marketing",
		listSize: 96,
		channel: "Event",
		status: "Draft",
	},
];

const Campaigns = () => {
	const { colors, scheme } = useTheme();

	return (
		<div className="min-h-screen transition-all duration-100 ease-in pb-10">
			<div className="max-w-7xl px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div>
					<h1
						className={`text-2xl font-bold tracking-tight inline-flex items-center gap-2 ${colors.foreground}`}
					>
						<Megaphone className="h-7 w-7 shrink-0" />
						Campaigns
					</h1>
					<p className={`text-sm mt-1 ${colors.textSecondary}`}>
						Marketing lists and campaigns linked to your pipeline
					</p>
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
				>
					<div className={`px-4 md:px-6 py-3 border-b ${colors.border}`}>
						<p className={`text-sm font-medium ${colors.foreground}`}>
							Active & draft campaigns
						</p>
						<p className={`text-xs ${colors.mutedForeground}`}>
							List size is a stand-in for audience count in a full marketing sync
						</p>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left min-w-[480px]">
							<thead>
								<tr className={`${colors.mutedBackground} border-b ${colors.border}`}>
									<th className="px-4 py-2.5 font-medium">Campaign</th>
									<th className="px-4 py-2.5 font-medium">List size</th>
									<th className="px-4 py-2.5 font-medium">Channel</th>
									<th className="px-4 py-2.5 font-medium">Status</th>
								</tr>
							</thead>
							<tbody>
								{SAMPLE.map((row) => (
									<tr
										key={row.name}
										className={`border-b ${colors.border} ${colors.hoverSecondary} transition-colors`}
									>
										<td className={`px-4 py-2.5 ${colors.foreground}`}>{row.name}</td>
										<td className="px-4 py-2.5 font-mono text-xs">
											{row.listSize.toLocaleString()}
										</td>
										<td className={`px-4 py-2.5 ${colors.mutedForeground}`}>
											{row.channel}
										</td>
										<td className="px-4 py-2.5">
											<span
												className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${scheme.primary} ${scheme.primaryForeground}`}
											>
												{row.status}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Campaigns;
