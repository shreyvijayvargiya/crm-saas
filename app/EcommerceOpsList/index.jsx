import React, { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

/**
 * Lightweight list shell for ecommerce vertical ops pages (seed demo data).
 */
export default function EcommerceOpsList({
	title,
	description,
	columns,
	seed,
	searchKeys = ["name"],
	primaryActionLabel = "Add row",
}) {
	const { colors } = useTheme();
	const [rows] = useState(seed);
	const [q, setQ] = useState("");

	const filtered = useMemo(() => {
		const query = q.trim().toLowerCase();
		if (!query) return rows;
		return rows.filter((row) =>
			searchKeys.some((key) =>
				String(row[key] ?? "")
					.toLowerCase()
					.includes(query)
			)
		);
	}, [q, rows, searchKeys]);

	return (
		<div className="space-y-4 p-4 sm:p-6">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
				<div>
					<h1 className={cn("text-xl font-semibold tracking-tight", colors.foreground)}>
						{title}
					</h1>
					<p className={cn("mt-1 text-sm", colors.mutedForeground)}>{description}</p>
				</div>
				<Button
					className="rounded-full"
					onClick={() => toast.message(`${primaryActionLabel} — demo seed only`)}
				>
					<Plus className="h-4 w-4" />
					{primaryActionLabel}
				</Button>
			</div>

			<Card>
				<CardContent className="space-y-4 p-4">
					<div className="relative max-w-sm">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							value={q}
							onChange={(e) => setQ(e.target.value)}
							placeholder={`Search ${title.toLowerCase()}…`}
							className="pl-9"
						/>
					</div>
					<div className="overflow-x-auto rounded-xl border">
						<Table>
							<TableHeader>
								<TableRow>
									{columns.map((col) => (
										<TableHead key={col.id}>{col.label}</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{filtered.map((row) => (
									<TableRow key={row.id}>
										{columns.map((col) => {
											const val = row[col.id];
											return (
												<TableCell key={col.id}>
													{col.type === "badge" ? (
														<Badge variant="secondary">{val}</Badge>
													) : (
														val
													)}
												</TableCell>
											);
										})}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<p className="text-xs text-muted-foreground">
						{filtered.length} rows · Ecommerce CMS demo seed
					</p>
				</CardContent>
			</Card>
		</div>
	);
}
