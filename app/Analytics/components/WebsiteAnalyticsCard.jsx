import React from "react";
import { useTheme } from "../../../utils/useTheme";

const cells = [
	{ badge: "432", label: "Direct" },
	{ badge: "216", label: "Organic" },
	{ badge: "29%", label: "Sessions" },
	{ badge: "2.3K", label: "Page Views" },
	{ badge: "1.6K", label: "Leads" },
	{ badge: "8%", label: "Conversions" },
];

const WebsiteAnalyticsCard = () => {
	const { colors } = useTheme();

	return (
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-5 h-full`}
		>
			<div className="mb-4">
				<h2 className={`text-lg font-semibold ${colors.foreground}`}>
					Website Analytics
				</h2>
				<p className={`text-sm mt-0.5 ${colors.textSecondary}`}>
					Total 28.5% Conversion Rate
				</p>
			</div>
			<div className="grid grid-cols-2 gap-3">
				{cells.map(({ badge, label }) => (
					<div
						key={label}
						className={`rounded-xl border ${colors.border} p-3 flex flex-col gap-1`}
					>
						<span
							className={`inline-flex items-center w-fit px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 ${colors.foreground}`}
						>
							{badge}
						</span>
						<span className={`text-sm ${colors.textSecondary}`}>{label}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default WebsiteAnalyticsCard;
