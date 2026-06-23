import React, { useState, useMemo } from "react";
import { Users, ChevronUp, ChevronDown } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from "@/components/ui/table";

const RepPerformanceSection = ({ rows }) => {
	const { colors } = useTheme();
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
		<TableHead className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${colors.mutedForeground}`}>
			<Button
				type="button"
				variant="ghost"
				size="sm"
				onClick={() => toggle(key)}
				className="h-auto gap-1 px-1 -mx-1 text-xs font-semibold uppercase tracking-wider"
			>
				{label}
				{sortKey === key &&
					(dir === "asc" ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />)}
			</Button>
		</TableHead>
	);

	return (
		<Card className="overflow-hidden">
			<CardHeader className={`flex-row items-center gap-2 space-y-0 border-b ${colors.border} pb-4`}>
				<span className="p-2 rounded-xl bg-primary text-primary-foreground">
					<Users className="w-4 h-4" />
				</span>
				<div>
					<CardTitle className="text-lg">Rep performance</CardTitle>
					<CardDescription>Won revenue, activity, and conversion</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="p-0 pt-0">
				<Table className="w-full text-sm">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								{th("name", "Rep")}
								{th("deals", "Deals won")}
								{th("pipeline", "Pipeline $")}
								{th("revenue", "Revenue $")}
								{th("winRate", "Win rate")}
								{th("avgDeal", "Avg deal")}
								{th("activities", "Activities")}
							</TableRow>
						</TableHeader>
						<TableBody className={`divide-y ${colors.border}`}>
							{sorted.map((r) => (
								<TableRow key={r.name} className={`${colors.hover} transition-colors`}>
									<TableCell className={`px-4 py-3 font-medium ${colors.foreground}`}>{r.name}</TableCell>
									<TableCell className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>{r.deals}</TableCell>
									<TableCell className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>
										${(r.pipeline / 1000).toFixed(1)}k
									</TableCell>
									<TableCell className={`px-4 py-3 tabular-nums font-semibold ${colors.foreground}`}>
										${(r.revenue / 1000).toFixed(1)}k
									</TableCell>
									<TableCell className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>{r.winRate}%</TableCell>
									<TableCell className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>
										${(r.avgDeal / 1000).toFixed(1)}k
									</TableCell>
									<TableCell className={`px-4 py-3 tabular-nums ${colors.textSecondary}`}>{r.activities}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
			</CardContent>
		</Card>
	);
};

export default RepPerformanceSection;
