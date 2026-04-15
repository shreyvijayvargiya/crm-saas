import React, { useState, useMemo } from "react";
import { Users, ChevronUp, ChevronDown } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";

const RepPerformanceSection = ({ rows }) => {
	const { colors, scheme } = useTheme();
	const [sortKey, setSortKey] = useState("revenue");
	const [dir, setDir] = useState("desc");

	const sorted = useMemo(() => {
		const copy = [...rows];
		copy.sort((a, b) => {
			const av = a[sortKey];
			const bv = b[sortKey];
			if (typeof av === "string") {
				return dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
			}
			return dir === "asc" ? av - bv : bv - av;
		});
		return copy;
	}, [rows, sortKey, dir]);

	const toggle = (key) => {
		if (sortKey === key) setDir((d) => (d === "asc" ? "desc" : "asc"));
		else {
			setSortKey(key);
			setDir(key === "name" ? "asc" : "desc");
		}
	};

	const th = (key, label) => (
		<th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${colors.mutedForeground}`}>
			<button
				type="button"
				onClick={() => toggle(key)}
				className={`inline-flex items-center gap-1 ${colors.hoverSecondary} rounded px-1 -mx-1`}
			>
				{label}
				{sortKey === key &&
					(dir === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
			</button>
		</th>
	);

	return (
		<div className={`rounded-xl border ${colors.border} ${colors.card} shadow-sm overflow-hidden`}>
			<div className={`px-5 py-4 border-b ${colors.border} flex items-center gap-2`}>
				<span className={`p-2 rounded-xl ${scheme.primary} ${scheme.primaryForeground}`}>
					<Users className="w-4 h-4" />
				</span>
				<div>
					<h2 className={`text-lg font-semibold ${colors.foreground}`}>Rep performance</h2>
					<p className={`text-sm ${colors.textSecondary}`}>Won revenue, activity, and conversion</p>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="w-full text-sm">
					<thead className={`${colors.muted} border-b ${colors.border}`}>
						<tr>
							{th("name", "Rep")}
							{th("deals", "Deals won")}
							{th("pipeline", "Pipeline $")}
							{th("revenue", "Revenue $")}
							{th("winRate", "Win rate")}
							{th("avgDeal", "Avg deal")}
							{th("activities", "Activities")}
						</tr>
					</thead>
					<tbody className={`divide-y ${colors.border}`}>
						{sorted.map((r) => (
							<tr key={r.name} className={`${colors.hover} transition-colors`}>
								<td className={`px-4 py-3 font-medium ${colors.foreground}`}>{r.name}</td>
								<td className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>{r.deals}</td>
								<td className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>
									${(r.pipeline / 1000).toFixed(1)}k
								</td>
								<td className={`px-4 py-3 tabular-nums font-semibold ${colors.foreground}`}>
									${(r.revenue / 1000).toFixed(1)}k
								</td>
								<td className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>{r.winRate}%</td>
								<td className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>
									${(r.avgDeal / 1000).toFixed(1)}k
								</td>
								<td className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>{r.activities}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default RepPerformanceSection;
