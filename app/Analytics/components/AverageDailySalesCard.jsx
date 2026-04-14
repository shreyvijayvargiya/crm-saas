import React from "react";
import { TrendingDown } from "lucide-react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../../utils/useTheme";

const areaData = [
	{ x: "1", y: 12 },
	{ x: "2", y: 18 },
	{ x: "3", y: 14 },
	{ x: "4", y: 22 },
	{ x: "5", y: 19 },
	{ x: "6", y: 26 },
	{ x: "7", y: 21 },
	{ x: "8", y: 28 },
	{ x: "9", y: 24 },
	{ x: "10", y: 30 },
];

const AverageDailySalesCard = () => {
	const { colors } = useTheme();

	return (
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm p-5 h-full flex flex-col`}
		>
			<div className="flex items-start justify-between gap-2 mb-4">
				<h2 className={`text-lg font-semibold ${colors.foreground}`}>
					Average Daily Sales
				</h2>
				<span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-rose-500/15 text-rose-600 dark:text-rose-400">
					<TrendingDown className="w-4 h-4" />
				</span>
			</div>
			<p className={`text-3xl font-bold tracking-tight mb-4 ${colors.foreground}`}>
				$28,450
			</p>
			<div className="flex-1 min-h-[140px]">
				<ResponsiveContainer width="100%" height="100%" minHeight={140}>
					<AreaChart data={areaData} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
						<defs>
							<linearGradient id="salesAreaFill" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="#a1a1aa" stopOpacity={0.35} />
								<stop offset="100%" stopColor="#a1a1aa" stopOpacity={0.02} />
							</linearGradient>
						</defs>
						<CartesianGrid
							strokeDasharray="3 3"
							vertical={false}
							className="stroke-zinc-200 dark:stroke-zinc-700"
						/>
						<XAxis dataKey="x" hide />
						<YAxis hide />
						<Tooltip />
						<Area
							type="monotone"
							dataKey="y"
							stroke="#52525b"
							strokeWidth={2}
							fill="url(#salesAreaFill)"
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default AverageDailySalesCard;
