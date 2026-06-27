import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Users,
	ListOrdered,
	Calendar,
	BarChart3,
	Mail,
	Clock,
	GitBranch,
	Pause,
	Play,
	MoreHorizontal,
} from "lucide-react";
import { toast } from "sonner";
import {
	Line,
	LineChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { findCampaign, findCampaignSteps, findSegment } from "../marketingSeedData";
import { useTheme } from "../../../utils/useTheme";
import { useChartTooltipProps } from "../../../utils/chartTooltip";
import { cn } from "@/lib/utils";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

const BUILDER_TABS = [
	{ id: "audience", label: "Audience", icon: Users },
	{ id: "steps", label: "Steps", icon: ListOrdered },
	{ id: "schedule", label: "Schedule", icon: Calendar },
	{ id: "stats", label: "Stats", icon: BarChart3 },
];

const STATS_TREND = [
	{ day: "Mon", opens: 42, clicks: 12 },
	{ day: "Tue", opens: 58, clicks: 18 },
	{ day: "Wed", opens: 51, clicks: 15 },
	{ day: "Thu", opens: 67, clicks: 22 },
	{ day: "Fri", opens: 49, clicks: 14 },
	{ day: "Sat", opens: 31, clicks: 8 },
	{ day: "Sun", opens: 28, clicks: 6 },
];

function stepTypeIcon(type) {
	if (type === "email") return Mail;
	if (type === "wait") return Clock;
	return GitBranch;
}

function formatDate(iso) {
	if (!iso) return "—";
	return new Date(iso).toLocaleString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});
}

export default function CampaignDetail() {
	const router = useRouter();
	const { id } = router.query;
	const { colors } = useTheme();
	const chartTooltipProps = useChartTooltipProps();
	const [activeTab, setActiveTab] = useState("audience");
	const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
	const [autoSend, setAutoSend] = useState(true);
	const [scheduleDate, setScheduleDate] = useState("");

	const campaign = useMemo(() => (id ? findCampaign(id) : null), [id]);
	const steps = useMemo(() => (id ? findCampaignSteps(id) : []), [id]);
	const segment = useMemo(
		() => (campaign?.segmentId ? findSegment(campaign.segmentId) : null),
		[campaign]
	);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-muted-foreground">Loading…</p>
			</div>
		);
	}

	if (!campaign) {
		return (
			<div className="space-y-4 p-6">
				<p className="text-muted-foreground">Campaign not found.</p>
				<Button variant="outline" asChild>
					<Link href="/marketing">Back to campaigns</Link>
				</Button>
			</div>
		);
	}

	return (
		<div className="min-h-screen pb-12">
			<div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/marketing">Marketing</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbLink href="/marketing">Campaigns</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{campaign.name}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<div className="flex flex-wrap items-start justify-between gap-4">
					<div className="space-y-2">
						<div className="flex flex-wrap items-center gap-3">
							<h1 className={`text-2xl md:text-3xl font-bold tracking-tight ${colors.foreground}`}>
								{campaign.name}
							</h1>
							<Badge>{campaign.status}</Badge>
						</div>
						{campaign.description && (
							<p className={`text-sm max-w-2xl ${colors.textSecondary}`}>{campaign.description}</p>
						)}
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								<MoreHorizontal className="h-4 w-4" />
								Actions
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => toast.success("Campaign duplicated (demo)")}>
								Duplicate
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setPauseDialogOpen(true)}>
								<Pause className="h-4 w-4" />
								Pause campaign
							</DropdownMenuItem>
							<DropdownMenuItem onClick={() => toast.info("Resuming campaign (demo)")}>
								<Play className="h-4 w-4" />
								Resume
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="text-destructive"
								onClick={() => toast.error("Archive campaign (demo)")}
							>
								Archive
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<nav className="flex gap-1 border-b overflow-x-auto">
					{BUILDER_TABS.map((tab) => {
						const Icon = tab.icon;
						return (
							<button
								key={tab.id}
								type="button"
								onClick={() => setActiveTab(tab.id)}
								className={cn(
									"flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap",
									activeTab === tab.id
										? "border-primary text-primary"
										: "border-transparent text-muted-foreground hover:text-foreground"
								)}
							>
								<Icon className="h-4 w-4" />
								{tab.label}
							</button>
						);
					})}
				</nav>

				{activeTab === "audience" && (
					<Card>
						<CardHeader>
							<CardTitle>Target audience</CardTitle>
							<CardDescription>Segment and filter rules for this campaign</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{segment ? (
								<>
									<div className="flex items-center justify-between rounded-lg border p-4">
										<div>
											<p className="font-medium">{segment.name}</p>
											<p className="text-sm text-muted-foreground">{segment.description}</p>
										</div>
										<div className="text-right">
											<p className="text-2xl font-bold tabular-nums">
												{segment.contactCount.toLocaleString()}
											</p>
											<p className="text-xs text-muted-foreground">contacts</p>
										</div>
									</div>
									<div>
										<p className="text-sm font-medium mb-2">Filter rules</p>
										<ul className="space-y-2">
											{segment.filters.map((f, i) => (
												<li
													key={i}
													className="flex items-center gap-2 text-sm text-muted-foreground rounded-md bg-muted/50 px-3 py-2"
												>
													<span className="font-mono text-xs bg-background px-1.5 py-0.5 rounded border">
														{f.field}
													</span>
													<span>{f.operator}</span>
													<span className="font-medium text-foreground">{f.value}</span>
												</li>
											))}
										</ul>
									</div>
									<Button variant="outline" size="sm" asChild>
										<Link href="/marketing/segments">Manage segments</Link>
									</Button>
								</>
							) : (
								<p className="text-muted-foreground">No audience segment assigned.</p>
							)}
						</CardContent>
					</Card>
				)}

				{activeTab === "steps" && (
					<Card>
						<CardHeader>
							<CardTitle>Campaign steps</CardTitle>
							<CardDescription>Email, wait, and branch steps in sequence</CardDescription>
						</CardHeader>
						<CardContent>
							{steps.length === 0 ? (
								<p className="text-muted-foreground">No steps configured yet.</p>
							) : (
								<ol className="space-y-3">
									{steps.map((step) => {
										const StepIcon = stepTypeIcon(step.stepType);
										return (
											<li
												key={step.id}
												className="flex items-start gap-4 rounded-lg border p-4"
											>
												<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
													{step.stepOrder}
												</span>
												<div className="flex-1 min-w-0">
													<div className="flex items-center gap-2">
														<StepIcon className="h-4 w-4 text-muted-foreground" />
														<p className="font-medium">{step.name}</p>
														<Badge variant="outline" className="capitalize">
															{step.stepType}
														</Badge>
													</div>
													{step.config && (
														<p className="text-sm text-muted-foreground mt-1">
															{step.stepType === "email" && step.config.subject
																? `Subject: ${step.config.subject}`
																: step.stepType === "wait" && step.config.delayDays
																	? `Delay: ${step.config.delayDays} days`
																	: step.stepType === "branch"
																		? `Condition: ${step.config.condition}`
																		: null}
														</p>
													)}
												</div>
											</li>
										);
									})}
								</ol>
							)}
						</CardContent>
					</Card>
				)}

				{activeTab === "schedule" && (
					<Card>
						<CardHeader>
							<CardTitle>Schedule</CardTitle>
							<CardDescription>Send timing and automation settings</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex items-center justify-between rounded-lg border p-4">
								<div>
									<Label htmlFor="auto-send">Auto-send on schedule</Label>
									<p className="text-xs text-muted-foreground mt-1">
										Deliver emails when the scheduled time is reached
									</p>
								</div>
								<Switch id="auto-send" checked={autoSend} onCheckedChange={setAutoSend} />
							</div>
							<FormFieldRow label="Schedule date" htmlFor="schedule-date">
								<Input
									id="schedule-date"
									type="datetime-local"
									value={scheduleDate}
									onChange={(e) => setScheduleDate(e.target.value)}
									className="max-w-xs"
								/>
							</FormFieldRow>
							<dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
								<div className="rounded-lg border p-4">
									<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Scheduled
									</dt>
									<dd className="mt-1 font-medium">{formatDate(campaign.scheduledAt)}</dd>
								</div>
								<div className="rounded-lg border p-4">
									<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Started
									</dt>
									<dd className="mt-1 font-medium">{formatDate(campaign.startedAt)}</dd>
								</div>
								<div className="rounded-lg border p-4">
									<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Completed
									</dt>
									<dd className="mt-1 font-medium">{formatDate(campaign.completedAt)}</dd>
								</div>
							</dl>
						</CardContent>
					</Card>
				)}

				{activeTab === "stats" && (
					<div className="space-y-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
							<Card>
								<CardContent className="p-5">
									<p className="text-sm text-muted-foreground">Sent</p>
									<p className="text-2xl font-bold tabular-nums mt-1">
										{campaign.sentCount.toLocaleString()}
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-5">
									<p className="text-sm text-muted-foreground">Delivered</p>
									<p className="text-2xl font-bold tabular-nums mt-1">
										{campaign.deliveredCount.toLocaleString()}
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-5">
									<p className="text-sm text-muted-foreground">Open rate</p>
									<p className="text-2xl font-bold tabular-nums mt-1">
										{campaign.openRate != null ? `${campaign.openRate}%` : "—"}
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardContent className="p-5">
									<p className="text-sm text-muted-foreground">Click rate</p>
									<p className="text-2xl font-bold tabular-nums mt-1">
										{campaign.clickRate != null ? `${campaign.clickRate}%` : "—"}
									</p>
								</CardContent>
							</Card>
						</div>
						<Card>
							<CardHeader>
								<CardTitle>Engagement trend</CardTitle>
								<CardDescription>Daily opens and clicks this week</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="h-64 w-full">
									<ResponsiveContainer width="100%" height="100%">
										<LineChart data={STATS_TREND}>
											<CartesianGrid strokeDasharray="3 3" className="stroke-border" />
											<XAxis dataKey="day" tick={{ fontSize: 12 }} />
											<YAxis tick={{ fontSize: 12 }} />
											<Tooltip {...chartTooltipProps} />
											<Line type="monotone" dataKey="opens" stroke="hsl(var(--primary))" strokeWidth={2} />
											<Line type="monotone" dataKey="clicks" stroke="hsl(var(--chart-2))" strokeWidth={2} />
										</LineChart>
									</ResponsiveContainer>
								</div>
							</CardContent>
						</Card>
						{campaign.bounceRate != null && (
							<Card>
								<CardHeader>
									<CardTitle>Delivery health</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground">
										Bounce rate:{" "}
										<span className="font-medium text-foreground">{campaign.bounceRate}%</span>
									</p>
								</CardContent>
							</Card>
						)}
					</div>
				)}
			</div>

			<Dialog open={pauseDialogOpen} onOpenChange={setPauseDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Pause campaign?</DialogTitle>
						<DialogDescription>
							Scheduled sends for &ldquo;{campaign.name}&rdquo; will stop until you resume.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button variant="outline" onClick={() => setPauseDialogOpen(false)}>
							Cancel
						</Button>
						<Button
							onClick={() => {
								toast.success("Campaign paused");
								setPauseDialogOpen(false);
							}}
						>
							Pause campaign
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}

function FormFieldRow({ label, htmlFor, children }) {
	return (
		<div className="space-y-2">
			<Label htmlFor={htmlFor}>{label}</Label>
			{children}
		</div>
	);
}
