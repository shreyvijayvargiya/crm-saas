import React from "react";
import { Ticket, Clock, MessageSquare } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "../../../utils/useTheme";

const donutData = [
	{ name: "Completed", value: 88, color: "#27272a" },
	{ name: "Rest", value: 12, color: "#a1a1aa" },
];

const bottomStats = [
	{
		label: "New Tickets",
		value: "40",
		icon: Ticket,
		iconWrap: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
	},
	{
		label: "Open Tickets",
		value: "25",
		icon: Clock,
		iconWrap: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
	},
	{
		label: "Response Time",
		value: "1 Day",
		icon: MessageSquare,
		iconWrap: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
	},
];

const TicketStatusCard = () => {
	const { colors } = useTheme();

	return (
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-5 h-full flex flex-col`}
		>
			<div className="relative flex-1 min-h-[220px]">
				<ResponsiveContainer width="100%" height="100%" minHeight={220}>
					<PieChart>
						<Pie
							data={donutData}
							cx="50%"
							cy="50%"
							innerRadius="68%"
							outerRadius="88%"
							paddingAngle={2}
							dataKey="value"
							stroke="none"
						>
							{donutData.map((entry, i) => (
								<Cell key={entry.name} fill={entry.color} />
							))}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div className="text-center">
						<p className={`text-2xl font-bold ${colors.foreground}`}>88%</p>
						<p className={`text-xs font-medium ${colors.textSecondary}`}>
							Completed
						</p>
					</div>
				</div>
			</div>

			<div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 space-y-3">
				{bottomStats.map(({ label, value, icon: Icon, iconWrap }) => (
					<div key={label} className="flex items-center gap-3">
						<span
							className={`flex items-center justify-center w-9 h-9 rounded-full ${iconWrap}`}
						>
							<Icon className="w-4 h-4" />
						</span>
						<div className="flex-1 flex items-center justify-between gap-2">
							<span className={`text-sm ${colors.textSecondary}`}>{label}</span>
							<span className={`text-sm font-semibold ${colors.foreground}`}>
								{value}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default TicketStatusCard;
