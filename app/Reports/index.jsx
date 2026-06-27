import React, { useMemo, useState } from "react";
import { FileBarChart, Download, Calendar, Play } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FormSelect from "../../lib/ui/FormSelect";

const SAVED_REPORTS = [
	{ id: "rpt_001", name: "Weekly pipeline summary", type: "Sales", schedule: "Every Monday 8:00 AM", lastRun: "2026-04-14", format: "PDF", status: "Active" },
	{ id: "rpt_002", name: "Lead source attribution", type: "Marketing", schedule: "Manual", lastRun: "2026-04-12", format: "CSV", status: "Active" },
	{ id: "rpt_003", name: "Rep performance Q1", type: "Sales", schedule: "Manual", lastRun: "2026-04-01", format: "XLSX", status: "Active" },
	{ id: "rpt_004", name: "Invoice aging", type: "Finance", schedule: "Daily 6:00 AM", lastRun: "2026-04-14", format: "PDF", status: "Active" },
	{ id: "rpt_005", name: "Support SLA breach", type: "Operations", schedule: "Every Friday", lastRun: "2026-04-11", format: "CSV", status: "Paused" },
	{ id: "rpt_006", name: "E-commerce orders by region", type: "Commerce", schedule: "Manual", lastRun: "2026-04-10", format: "CSV", status: "Active" },
];

const REPORT_TEMPLATES = [
	{ id: "tpl_1", name: "Deal forecast", desc: "Weighted pipeline by stage and close date" },
	{ id: "tpl_2", name: "Contact growth", desc: "New contacts and conversion rate" },
	{ id: "tpl_3", name: "Revenue by product", desc: "Finance products and invoice totals" },
];

const Reports = () => {
	const [typeFilter, setTypeFilter] = useState("All");

	const filtered = useMemo(() => {
		if (typeFilter === "All") return SAVED_REPORTS;
		return SAVED_REPORTS.filter((r) => r.type === typeFilter);
	}, [typeFilter]);

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-semibold text-foreground">Reports</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Saved and scheduled exports — run on demand or deliver by email.
					</p>
				</div>
				<Button onClick={() => toast.info("Report builder — connect to your analytics backend.")}>
					<FileBarChart className="h-4 w-4" />
					New report
				</Button>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{REPORT_TEMPLATES.map((tpl) => (
					<Card key={tpl.id} className="transition-colors hover:border-primary/40">
						<CardContent className="p-6">
							<p className="font-medium text-foreground">{tpl.name}</p>
							<p className="mt-1 text-sm text-muted-foreground">{tpl.desc}</p>
							<Button
								variant="outline"
								size="sm"
								className="mt-4"
								onClick={() => toast.success(`Running "${tpl.name}" (demo)`)}
							>
								<Play className="h-3 w-3" />
								Run now
							</Button>
						</CardContent>
					</Card>
				))}
			</div>

			<Card>
				<CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
					<CardTitle className="text-lg">Saved reports</CardTitle>
					<FormSelect
						value={typeFilter}
						onChange={(e) => setTypeFilter(e.target.value)}
						options={["All", "Sales", "Marketing", "Finance", "Operations", "Commerce"]}
						className="w-40"
					/>
				</CardHeader>
				<CardContent className="space-y-3">
					{filtered.map((report) => (
						<div
							key={report.id}
							className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4"
						>
							<div>
								<div className="flex flex-wrap items-center gap-2">
									<p className="font-medium text-foreground">{report.name}</p>
									<Badge variant="secondary">{report.type}</Badge>
									<Badge variant={report.status === "Active" ? "default" : "outline"}>
										{report.status}
									</Badge>
								</div>
								<div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
									<span className="inline-flex items-center gap-1">
										<Calendar className="h-3 w-3" />
										{report.schedule}
									</span>
									<span>Last run: {report.lastRun}</span>
									<span>{report.format}</span>
								</div>
							</div>
							<div className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={() => toast.success(`Exported ${report.name} as ${report.format}`)}
								>
									<Download className="h-3 w-3" />
									Export
								</Button>
								<Button
									size="sm"
									onClick={() => toast.info(`Scheduled run for ${report.name}`)}
								>
									Run
								</Button>
							</div>
						</div>
					))}
				</CardContent>
			</Card>
		</div>
	);
};

export default Reports;
