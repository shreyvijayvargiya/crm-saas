import React from "react";
import { TrendingUp } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";

const SalesOverviewCard = () => {
	const { colors } = useTheme();

	const ordersPct = 62.2;
	const visitsPct = 25.5;
	const remainderPct = Math.max(0, 100 - ordersPct - visitsPct);

	return (
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-5 h-full flex flex-col`}
		>
			<div className="flex items-start justify-between gap-2 mb-4">
				<h2 className={`text-lg font-semibold ${colors.foreground}`}>
					Sales Overview
				</h2>
				<span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
					<TrendingUp className="w-4 h-4" />
				</span>
			</div>
			<p className={`text-3xl font-bold tracking-tight mb-6 ${colors.foreground}`}>
				$42.5K
			</p>

			<div className="space-y-2 mb-2">
				<div className="flex justify-between text-xs font-medium">
					<span className="text-amber-600 dark:text-amber-400">{ordersPct}% Orders</span>
					<span className="text-emerald-600 dark:text-emerald-400">
						{visitsPct}% Visits
					</span>
				</div>
			</div>
			<div className="flex h-3 w-full rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700">
				<div className="h-full bg-amber-500" style={{ width: `${ordersPct}%` }} />
				<div className="h-full bg-emerald-500" style={{ width: `${visitsPct}%` }} />
				<div
					className="h-full bg-zinc-300 dark:bg-zinc-600"
					style={{ width: `${remainderPct}%` }}
				/>
			</div>
		</div>
	);
};

export default SalesOverviewCard;
