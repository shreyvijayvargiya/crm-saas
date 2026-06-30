import React, { useMemo, useState } from "react";
import * as lucideIcons from "lucide-react";
import {
	ArrowDown,
	ArrowUp,
	Plus,
	Search,
	Eye,
	Pause,
	MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Tooltip,
	XAxis,
	YAxis,
	Legend,
} from "recharts";
import { ResponsiveContainer } from "@/components/ui/responsive-chart";
import MarketingLayout from "./MarketingLayout";
import {
	MARKETING_METRICS,
	CAMPAIGNS,
	MARKETING_CHART_SERIES,
	CAMPAIGN_STATUS_OPTIONS,
	SEGMENTS,
} from "./marketingSeedData";
import DateRangeFilter from "../Analytics/components/DateRangeFilter";
import { ExportDropdown } from "../../lib/ui/dropdown";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import { useTheme } from "../../utils/useTheme";
import { useChartTooltipProps } from "../../utils/chartTooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

function campaignStatusVariant(status) {
	if (status === "Active") return "default";
	if (status === "Scheduled") return "secondary";
	if (status === "Completed") return "outline";
	return "secondary";
}

const EMPTY_CAMPAIGN = {
	name: "",
	description: "",
	status: "Draft",
	segmentId: "",
};

const Marketing = () => {
	const router = useRouter();
	const { colors } = useTheme();
	const chartTooltipProps = useChartTooltipProps();

	const [campaigns, setCampaigns] = useState(CAMPAIGNS);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [range, setRange] = useState("30d");
	const [showCustomRange, setShowCustomRange] = useState(false);
	const [customFrom, setCustomFrom] = useState("");
	const [customTo, setCustomTo] = useState("");
	const [selectedIds, setSelectedIds] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newCampaign, setNewCampaign] = useState(EMPTY_CAMPAIGN);

	const filteredCampaigns = useMemo(() => {
		return campaigns.filter((c) => {
			const matchesSearch =
				!searchTerm ||
				c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(c.segmentName ?? "").toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = statusFilter === "All" || c.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [campaigns, searchTerm, statusFilter]);

	const allSelected =
		filteredCampaigns.length > 0 && selectedIds.length === filteredCampaigns.length;

	const toggleAll = () => {
		setSelectedIds(allSelected ? [] : filteredCampaigns.map((c) => c.id));
	};

	const toggleOne = (id) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
		);
	};

	const handleCreateCampaign = () => {
		if (!newCampaign.name.trim()) {
			toast.error("Campaign name is required");
			return;
		}
		const segment = SEGMENTS.find((s) => s.id === newCampaign.segmentId);
		const created = {
			id: `cmp_${Date.now()}`,
			name: newCampaign.name,
			description: newCampaign.description,
			status: newCampaign.status,
			segmentId: newCampaign.segmentId || null,
			segmentName: segment?.name ?? null,
			scheduledAt: null,
			startedAt: null,
			completedAt: null,
			sentCount: 0,
			deliveredCount: 0,
			openRate: null,
			clickRate: null,
			bounceRate: null,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		setCampaigns((prev) => [created, ...prev]);
		toast.success(`Campaign "${created.name}" created`);
		setIsModalOpen(false);
		setNewCampaign(EMPTY_CAMPAIGN);
	};

	return (
		<MarketingLayout>
			<Card>
				<CardContent className="p-4">
					<DateRangeFilter
						value={range}
						onChange={setRange}
						showCustom={showCustomRange}
						onToggleCustom={setShowCustomRange}
						customFrom={customFrom}
						customTo={customTo}
						onCustomChange={(field, val) =>
							field === "from" ? setCustomFrom(val) : setCustomTo(val)
						}
					/>
				</CardContent>
			</Card>

			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
				{MARKETING_METRICS.map((m) => {
					const Icon = lucideIcons[m.icon];
					return (
						<Card key={m.id}>
							<CardContent className="p-5">
								<div className="flex items-start justify-between gap-2">
									<span
										className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.muted}`}
									>
										{Icon ? <Icon className="h-4 w-4" /> : null}
									</span>
									<Badge
										className={`gap-0.5 shrink-0 border-transparent ${
											m.positive
												? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/15"
												: "bg-rose-500/15 text-rose-600 dark:text-rose-400 hover:bg-rose-500/15"
										}`}
									>
										{m.positive ? (
											<ArrowUp className="w-3.5 h-3.5" />
										) : (
											<ArrowDown className="w-3.5 h-3.5" />
										)}
										{m.positive ? "+" : "−"}
										{m.change}%
									</Badge>
								</div>
								<p className={`mt-4 text-2xl font-bold tracking-tight ${colors.foreground}`}>
									{m.value}
								</p>
								<p className={`text-sm ${colors.textSecondary}`}>{m.label}</p>
								<Badge variant="secondary" className="mt-3 text-[11px] font-normal">
									{m.period}
								</Badge>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Campaign performance</CardTitle>
					<CardDescription>Sent, opens, and clicks over the reporting period</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-72 w-full">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={MARKETING_CHART_SERIES} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
								<CartesianGrid strokeDasharray="3 3" className="stroke-border" />
								<XAxis dataKey="month" tick={{ fontSize: 12 }} />
								<YAxis tick={{ fontSize: 12 }} />
								<Tooltip {...chartTooltipProps} />
								<Legend />
								<Bar dataKey="sent" name="Sent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
								<Bar dataKey="opens" name="Opens" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
								<Bar dataKey="clicks" name="Clicks" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="space-y-4">
					<div className="flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
						<div>
							<CardTitle>Campaigns</CardTitle>
							<CardDescription>
								{filteredCampaigns.length} of {campaigns.length} campaigns
								{selectedIds.length > 0 ? ` · ${selectedIds.length} selected` : ""}
							</CardDescription>
						</div>
						<div className="flex flex-wrap items-center gap-2">
							<ExportDropdown
								onExportCsv={() =>
									toast.success(
										`Exported ${selectedIds.length || filteredCampaigns.length} campaigns as CSV`
									)
								}
								onExportPdf={() =>
									toast.success(
										`Exported ${selectedIds.length || filteredCampaigns.length} campaigns as PDF`
									)
								}
								onExportJson={() =>
									toast.success(
										`Exported ${selectedIds.length || filteredCampaigns.length} campaigns as JSON`
									)
								}
							/>
							<Button size="sm" onClick={() => setIsModalOpen(true)}>
								<Plus className="h-4 w-4" />
								New campaign
							</Button>
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<div className="relative flex-1 min-w-[200px] max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search campaigns…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>
						<FormSelect
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							options={CAMPAIGN_STATUS_OPTIONS}
							className="w-36"
						/>
					</div>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-10">
									<Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all" />
								</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Audience</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Sent</TableHead>
								<TableHead className="text-right">Open rate</TableHead>
								<TableHead className="text-right">Click rate</TableHead>
								<TableHead className="w-10" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredCampaigns.length === 0 ? (
								<TableRow>
									<TableCell colSpan={8} className="text-center text-muted-foreground py-8">
										No campaigns match your filters.
									</TableCell>
								</TableRow>
							) : (
								filteredCampaigns.map((campaign) => (
									<TableRow key={campaign.id}>
										<TableCell onClick={(e) => e.stopPropagation()}>
											<Checkbox
												checked={selectedIds.includes(campaign.id)}
												onCheckedChange={() => toggleOne(campaign.id)}
												aria-label={`Select ${campaign.name}`}
											/>
										</TableCell>
										<TableCell
											className="cursor-pointer"
											onClick={() => router.push(`/marketing/campaigns/${campaign.id}`)}
										>
											<div>
												<p className="font-medium">{campaign.name}</p>
												{campaign.description && (
													<p className="text-xs text-muted-foreground line-clamp-1">
														{campaign.description}
													</p>
												)}
											</div>
										</TableCell>
										<TableCell
											className="text-muted-foreground cursor-pointer"
											onClick={() => router.push(`/marketing/campaigns/${campaign.id}`)}
										>
											{campaign.segmentName ?? "—"}
										</TableCell>
										<TableCell
											className="cursor-pointer"
											onClick={() => router.push(`/marketing/campaigns/${campaign.id}`)}
										>
											<Badge variant={campaignStatusVariant(campaign.status)}>
												{campaign.status}
											</Badge>
										</TableCell>
										<TableCell
											className="text-right tabular-nums cursor-pointer"
											onClick={() => router.push(`/marketing/campaigns/${campaign.id}`)}
										>
											{campaign.sentCount.toLocaleString()}
										</TableCell>
										<TableCell
											className="text-right tabular-nums cursor-pointer"
											onClick={() => router.push(`/marketing/campaigns/${campaign.id}`)}
										>
											{campaign.openRate != null ? `${campaign.openRate}%` : "—"}
										</TableCell>
										<TableCell
											className="text-right tabular-nums cursor-pointer"
											onClick={() => router.push(`/marketing/campaigns/${campaign.id}`)}
										>
											{campaign.clickRate != null ? `${campaign.clickRate}%` : "—"}
										</TableCell>
										<TableCell onClick={(e) => e.stopPropagation()}>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" size="icon" className="h-8 w-8">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuItem
														onClick={() => router.push(`/marketing/campaigns/${campaign.id}`)}
													>
														<Eye className="h-4 w-4" />
														Open builder
													</DropdownMenuItem>
													<DropdownMenuItem
														onClick={() => toast.info(`Paused "${campaign.name}" (demo)`)}
													>
														<Pause className="h-4 w-4" />
														Pause campaign
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem
														className="text-destructive"
														onClick={() => toast.error(`Archive "${campaign.name}" (demo)`)}
													>
														Archive
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<FormModal
				open={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setNewCampaign(EMPTY_CAMPAIGN);
				}}
				title="New campaign"
				subtitle="Create a draft campaign and assign an audience segment."
				onSubmit={handleCreateCampaign}
				saveLabel="Create campaign"
			>
				<FormField label="Campaign name" htmlFor="campaign-name" required>
					<Input
						id="campaign-name"
						value={newCampaign.name}
						onChange={(e) => setNewCampaign((p) => ({ ...p, name: e.target.value }))}
						placeholder="Summer product launch"
					/>
				</FormField>
				<FormField label="Description" htmlFor="campaign-desc">
					<Input
						id="campaign-desc"
						value={newCampaign.description}
						onChange={(e) => setNewCampaign((p) => ({ ...p, description: e.target.value }))}
						placeholder="Optional summary"
					/>
				</FormField>
				<FormField label="Audience segment" htmlFor="campaign-segment" hint="Optional — assign later in the builder">
					<FormSelect
						id="campaign-segment"
						value={newCampaign.segmentId || undefined}
						onChange={(e) => setNewCampaign((p) => ({ ...p, segmentId: e.target.value }))}
						placeholder="Select segment…"
						options={SEGMENTS.map((s) => ({ value: s.id, label: s.name }))}
					/>
				</FormField>
				<FormField label="Initial status" htmlFor="campaign-status">
					<FormSelect
						id="campaign-status"
						value={newCampaign.status}
						onChange={(e) => setNewCampaign((p) => ({ ...p, status: e.target.value }))}
						options={["Draft", "Scheduled"]}
					/>
				</FormField>
			</FormModal>
		</MarketingLayout>
	);
};

export default Marketing;
