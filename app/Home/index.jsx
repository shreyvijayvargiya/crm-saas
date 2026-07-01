import React, { useState, useMemo } from "react";
import {
	Phone,
	MessageCircle,
	Eye,
	Pen,
	Trash,
	ChevronUp,
	ChevronDown,
	ExternalLink,
	DollarSign,
	TrendingUp,
	Bell,
	Calendar,
	FileText,
	UserPlus,
	Activity,
	Target,
	CheckCircle2,
	ArrowRight,
	BarChart3,
	Users,
} from "lucide-react";
import router from "next/router";
import { toast } from "sonner";
import {
	AreaChart,
	Area,
	BarChart,
	Bar,
	Cell,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { CHART_MUTED } from "@/lib/chartColors";
import { Button } from "@/components/ui/button";
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
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const CHART_CARD =
	"overflow-hidden border-zinc-200/80 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800";

const ICON_BOX =
	"flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900";

function monthDelta(data, key) {
	return data[data.length - 1][key] - data[data.length - 2][key];
}

function monthPctChange(data, key) {
	const last = data[data.length - 1][key];
	const prev = data[data.length - 2][key];
	return prev ? Math.round(((last - prev) / prev) * 100) : 0;
}

function TrendBadge({ positive, children }) {
	return (
		<span
			className={cn(
				"inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium",
				positive
					? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
					: "bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400"
			)}
		>
			{children}
		</span>
	);
}

function DashboardChartCard({ icon: Icon, title, value, subtitle, trend, children }) {
	return (
		<Card className={CHART_CARD}>
			<CardContent className="p-5 sm:p-6">
				<div className="mb-1 flex items-start justify-between gap-3">
					<div className="flex items-center gap-3">
						<div className={ICON_BOX}>
							<Icon
								className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
								strokeWidth={1.75}
							/>
						</div>
						<div>
							<p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
								{title}
							</p>
							<p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
								{value}
							</p>
						</div>
					</div>
					{trend}
				</div>
				{subtitle ? (
					<p className="mb-4 text-xs text-zinc-500 dark:text-zinc-500">{subtitle}</p>
				) : null}
				{children}
			</CardContent>
		</Card>
	);
}

function zincBarFill(theme, active = false) {
	if (active) return theme === "dark" ? "#e4e4e7" : "#27272a";
	return theme === "dark" ? "#71717a" : "#a1a1aa";
}

const Home = () => {
	const { theme, colors } = useTheme();

	const dashboardData = {
		stats: {
			totalLeads: 45,
			conversionRate: "22%",
			sales: "95",
			revenue: "$12,500",
		},
		upcomingMeetings: [
			{
				title: "Product Demo",
				date: "2024-06-28",
				contact: "John Doe",
				subject: "Demo of new product",
				iconType: "up",
			},
			{
				title: "Client Follow-up",
				date: "2024-06-29",
				contact: "Jane Smith",
				subject: "Follow-up on proposal",
				iconType: "down",
			},
			{
				title: "Team Sync",
				date: "2024-06-30",
				contact: "Alice Johnson",
				subject: "Weekly team sync",
				iconType: "up",
			},
			{
				title: "Sales Strategy",
				date: "2024-07-01",
				contact: "Bob Brown",
				subject: "Discuss sales strategy",
				iconType: "down",
			},
			{
				title: "Quarterly Review",
				date: "2024-07-05",
				contact: "Emily Davis",
				subject: "Review of quarterly performance",
				iconType: "up",
			},
			{
				title: "New Client Onboarding",
				date: "2024-07-10",
				contact: "Michael Johnson",
				subject: "Onboarding new client",
				iconType: "down",
			},
			{
				title: "Marketing Strategy Meeting",
				date: "2024-07-15",
				contact: "Sarah Connor",
				subject: "Planning marketing strategies",
				iconType: "up",
			},
			{
				title: "Product Launch",
				date: "2024-07-20",
				contact: "Chris Evans",
				subject: "Launch of new product line",
				iconType: "down",
			},
		],
		moduleStats: [
			{
				title: "Tasks",
				value: "10",
				description: "Backlog + In Progress + Done",
				icon: "calendar",
				route: "/tasks",
			},
			{
				title: "API Keys",
				value: "5",
				description: "Active and revoked keys",
				icon: "activity",
				route: "/api-keys",
			},
			{
				title: "Invoices",
				value: "12",
				description: "Total invoices in snapshot",
				icon: "file",
				route: "/invoices",
			},
			{
				title: "Payments",
				value: "10",
				description: "Payment transactions",
				icon: "dollar",
				route: "/payments",
			},
			{
				title: "Webhooks",
				value: "5",
				description: "Configured endpoints",
				icon: "target",
				route: "/webhooks",
			},
			{
				title: "Notifications",
				value: "6",
				description: "Unread and read alerts",
				icon: "bell",
				route: "/notifications",
			},
			{
				title: "Teams",
				value: "4",
				description: "Members in roster",
				icon: "user",
				route: "/teams",
			},
			{
				title: "Integrations",
				value: "13",
				description: "Connected services",
				icon: "check",
				route: "/integrations",
			},
		],
	};

	const [allLeads, setAllLeads] = useState([
		{
			id: "101",
			name: "Alice Brown",
			email: "alice@company.com",
			lastContacted: "06/25/2024",
			image: "./people/person-1.png",
		},
		{
			id: "102",
			name: "Bob Wilson",
			email: "bob@startup.io",
			lastContacted: "06/24/2024",
			image: "./people/person-4.png",
		},
		{
			id: "103",
			name: "Charlie Green",
			email: "charlie@company.com",
			lastContacted: "06/23/2024",
			image: "./people/person-2.png",
		},
		{
			id: "104",
			name: "Diana Prince",
			email: "diana@company.com",
			lastContacted: "06/22/2024",
			image: "./people/person-3.png",
		},
		{
			id: "105",
			name: "Eve Adams",
			email: "eve@company.com",
			lastContacted: "06/21/2024",
			image: "./people/person-1.png",
		},
		{
			id: "106",
			name: "Frank Castle",
			email: "frank@company.com",
			lastContacted: "06/20/2024",
			image: "./people/person-2.png",
		},
	]);

	const [sortConfig, setSortConfig] = useState(null);

	const sortedLeads = useMemo(() => {
		let sortableLeads = [...allLeads];
		if (sortConfig) {
			sortableLeads.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key])
					return sortConfig.direction === "ascending" ? -1 : 1;
				if (a[sortConfig.key] > b[sortConfig.key])
					return sortConfig.direction === "ascending" ? 1 : -1;
				return 0;
			});
		}
		return sortableLeads;
	}, [allLeads, sortConfig]);

	const requestSort = (key) => {
		const direction =
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "ascending"
				? "descending"
				: "ascending";
		setSortConfig({ key, direction });
	};

	const sampleData = [
		{ name: "Jan", leads: 30, conversion: 18, sales: 50, revenue: 1000, companies: 5 },
		{ name: "Feb", leads: 40, conversion: 22, sales: 60, revenue: 1500, companies: 7 },
		{ name: "Mar", leads: 35, conversion: 26, sales: 70, revenue: 2000, companies: 6 },
		{ name: "Apr", leads: 50, conversion: 30, sales: 80, revenue: 2500, companies: 8 },
		{ name: "May", leads: 45, conversion: 28, sales: 75, revenue: 2200, companies: 7 },
		{ name: "Jun", leads: 55, conversion: 35, sales: 95, revenue: 3100, companies: 9 },
	];

	const conversionTrend = monthDelta(sampleData, "conversion");
	const salesTrend = monthDelta(sampleData, "sales");
	const revenueTrendPct = monthPctChange(sampleData, "revenue");
	const leadsTrend = monthDelta(sampleData, "leads");

	const chartTooltipStyle = {
		backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
		border: `1px solid ${theme === "dark" ? "#3f3f46" : "#e4e4e7"}`,
		borderRadius: "0.75rem",
		padding: "0.625rem 0.75rem",
		boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
		fontSize: "12px",
	};

	const chartLabelStyle = {
		color: theme === "dark" ? "#fafafa" : "#18181b",
		fontWeight: 600,
	};

	const zincStroke = theme === "dark" ? "#e4e4e7" : "#3f3f46";
	const zincFillTop = theme === "dark" ? "#a1a1aa" : "#52525b";

	return (
		<div className="p-4 sm:p-6 mx-auto transition-all duration-100 ease-in">
			<div className="mb-6">
				<h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
					Welcome back, John
				</h1>
				<p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
					Here&apos;s what&apos;s happening with your pipeline today.
				</p>
			</div>
			<div className="mb-6">
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<DashboardChartCard
						icon={BarChart3}
						title="Sales"
						value={dashboardData.stats.sales}
						subtitle="Closed deals over the last 6 months"
						trend={
							<TrendBadge positive={salesTrend >= 0}>
								{salesTrend >= 0 ? "+" : ""}
								{salesTrend} vs last month
							</TrendBadge>
						}
					>
						<ResponsiveContainer width="100%" height={210}>
							<BarChart
								data={sampleData}
								margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
								barCategoryGap="28%"
							>
								<CartesianGrid
									strokeDasharray="4 4"
									className="stroke-zinc-200 dark:stroke-zinc-800"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
									dy={8}
								/>
								<YAxis
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
									width={36}
								/>
								<Tooltip
									contentStyle={chartTooltipStyle}
									labelStyle={chartLabelStyle}
									formatter={(value) => [value, "Sales"]}
									cursor={{ fill: theme === "dark" ? "#27272a" : "#f4f4f5", radius: 6 }}
								/>
								<Bar dataKey="sales" radius={[6, 6, 0, 0]} maxBarSize={32}>
									{sampleData.map((entry, index) => (
										<Cell
											key={entry.name}
											fill={zincBarFill(theme, index === sampleData.length - 1)}
										/>
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</DashboardChartCard>

					<DashboardChartCard
						icon={DollarSign}
						title="Revenue"
						value={dashboardData.stats.revenue}
						subtitle="Monthly recurring & one-time revenue"
						trend={
							<TrendBadge positive={revenueTrendPct >= 0}>
								{revenueTrendPct >= 0 ? "+" : ""}
								{revenueTrendPct}% vs last month
							</TrendBadge>
						}
					>
						<ResponsiveContainer width="100%" height={210}>
							<BarChart
								data={sampleData}
								margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
								barCategoryGap="28%"
							>
								<CartesianGrid
									strokeDasharray="4 4"
									className="stroke-zinc-200 dark:stroke-zinc-800"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
									dy={8}
								/>
								<YAxis
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
									tickFormatter={(v) => `$${v >= 1000 ? `${v / 1000}k` : v}`}
									width={40}
								/>
								<Tooltip
									contentStyle={chartTooltipStyle}
									labelStyle={chartLabelStyle}
									formatter={(value) => [
										`$${Number(value).toLocaleString()}`,
										"Revenue",
									]}
									cursor={{ fill: theme === "dark" ? "#27272a" : "#f4f4f5", radius: 6 }}
								/>
								<Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={32}>
									{sampleData.map((entry, index) => (
										<Cell
											key={entry.name}
											fill={zincBarFill(
												theme,
												index === sampleData.length - 1
											)}
										/>
									))}
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</DashboardChartCard>

					<DashboardChartCard
						icon={TrendingUp}
						title="Conversion rate"
						value={dashboardData.stats.conversionRate}
						subtitle="Lead-to-deal conversion over the last 6 months"
						trend={
							<TrendBadge positive={conversionTrend >= 0}>
								{conversionTrend >= 0 ? "+" : ""}
								{conversionTrend}% vs last month
							</TrendBadge>
						}
					>
						<ResponsiveContainer width="100%" height={210}>
							<AreaChart
								data={sampleData}
								margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
							>
								<defs>
									<linearGradient id="conversionFill" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor={zincFillTop} stopOpacity={0.25} />
										<stop offset="100%" stopColor={zincFillTop} stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="4 4"
									className="stroke-zinc-200 dark:stroke-zinc-800"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
									dy={8}
								/>
								<YAxis
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
									tickFormatter={(v) => `${v}%`}
									domain={[0, 40]}
									width={36}
								/>
								<Tooltip
									contentStyle={chartTooltipStyle}
									labelStyle={chartLabelStyle}
									formatter={(value) => [`${value}%`, "Conversion"]}
									cursor={{
										stroke: theme === "dark" ? "#52525b" : "#d4d4d8",
										strokeWidth: 1,
									}}
								/>
								<Area
									type="monotone"
									dataKey="conversion"
									stroke={zincStroke}
									strokeWidth={2.5}
									fill="url(#conversionFill)"
									dot={{
										fill: theme === "dark" ? "#18181b" : "#ffffff",
										stroke: zincStroke,
										strokeWidth: 2,
										r: 3.5,
									}}
									activeDot={{
										r: 5,
										fill: theme === "dark" ? "#fafafa" : "#18181b",
										stroke: theme === "dark" ? "#18181b" : "#ffffff",
										strokeWidth: 2,
									}}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</DashboardChartCard>
				</div>
			</div>
			<Button
				variant="link"
				className="h-auto p-0 gap-2 hover:underline"
				onClick={() => router.push("/leads")}
			>
				Leads
				<ExternalLink size={18} className="text-muted-foreground" />
			</Button>
			<div className="space-y-4 my-2">
				{/* Recent Leads Table */}
				<Card className="overflow-hidden w-full">
					<CardHeader className="flex flex-row items-center justify-between border-b px-6 py-4">
						<div>
							<CardTitle className="text-lg">Recent Leads</CardTitle>
							<CardDescription>
								View and manage your recent leads
							</CardDescription>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => router.push("/leads")}
						>
							View all
						</Button>
					</CardHeader>
					<Table className="w-full">
							<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
								<TableRow>
									<TableHead
										className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
										onClick={() => requestSort("name")}
									>
										<div className="flex items-center gap-2">
											User Info
											{sortConfig?.key === "name" && (
												<>
													{sortConfig.direction === "ascending" ? (
														<ChevronUp className="w-4 h-4" />
													) : (
														<ChevronDown className="w-4 h-4" />
													)}
												</>
											)}
										</div>
									</TableHead>
									<TableHead
										className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
									>
										Email
									</TableHead>
									<TableHead
										className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
									>
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className={`${colors.card} divide-y ${colors.border}`}>
								{sortedLeads.length === 0 ? (
									<TableRow>
										<TableCell colSpan="3" className="px-6 py-12 text-center">
											<p className={colors.mutedForeground}>No leads found</p>
										</TableCell>
									</TableRow>
								) : (
									sortedLeads.map((lead) => (
										<TableRow
											key={lead.id}
											className={`${colors.hover} transition-colors`}
										>
											<TableCell className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center gap-3">
													<img
														src={lead.image}
														alt={lead.name}
														className="w-10 h-10 rounded-full border-2 border-zinc-200"
													/>
													<div
														className={`text-sm font-medium ${colors.foreground}`}
													>
														{lead.name}
													</div>
												</div>
											</TableCell>
											<TableCell className="px-6 py-4 whitespace-nowrap">
												<div className={`text-sm ${colors.textSecondary}`}>
													{lead.email}
												</div>
											</TableCell>
											<TableCell className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center gap-1">
													<Button variant="ghost" size="icon" title="Call">
														<Phone size={16} />
													</Button>
													<Button variant="ghost" size="icon" title="Message">
														<MessageCircle size={16} />
													</Button>
													<Button variant="ghost" size="icon" title="View">
														<Eye size={16} />
													</Button>
													<Button variant="ghost" size="icon" title="Edit">
														<Pen size={16} />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														title="Delete"
														onClick={() =>
															toast.info(`Removing lead: ${lead.id}`)
														}
													>
														<Trash size={16} />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))
								)}
							</TableBody>
						</Table>
				</Card>

				{/* Total Leads Chart */}
				<Card className={cn(CHART_CARD, "w-full")}>
					<CardContent className="p-5 sm:p-6">
						<div className="mb-1 flex flex-wrap items-start justify-between gap-3">
							<div className="flex items-center gap-3">
								<div className={ICON_BOX}>
									<Users
										className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
										strokeWidth={1.75}
									/>
								</div>
								<div>
									<p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
										Total leads
									</p>
									<p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
										{dashboardData.stats.totalLeads}
									</p>
								</div>
							</div>
							<TrendBadge positive={leadsTrend >= 0}>
								{leadsTrend >= 0 ? "+" : ""}
								{leadsTrend} vs last month
							</TrendBadge>
						</div>
						<p className="mb-4 text-xs text-zinc-500">
							Inbound lead volume across all channels
						</p>
						<ResponsiveContainer width="100%" height={320}>
							<AreaChart
								data={sampleData}
								margin={{ top: 8, right: 12, left: -12, bottom: 0 }}
							>
								<defs>
									<linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor={zincFillTop} stopOpacity={0.3} />
										<stop offset="100%" stopColor={zincFillTop} stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid
									strokeDasharray="4 4"
									className="stroke-zinc-200 dark:stroke-zinc-800"
									vertical={false}
								/>
								<XAxis
									dataKey="name"
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
									dy={8}
								/>
								<YAxis
									stroke={CHART_MUTED}
									fontSize={11}
									tickLine={false}
									axisLine={false}
									width={36}
								/>
								<Tooltip
									contentStyle={chartTooltipStyle}
									labelStyle={chartLabelStyle}
									formatter={(value) => [value, "Leads"]}
									cursor={{
										stroke: theme === "dark" ? "#52525b" : "#d4d4d8",
										strokeWidth: 1,
									}}
								/>
								<Area
									type="monotone"
									dataKey="leads"
									stroke={zincStroke}
									strokeWidth={2.5}
									fill="url(#leadsFill)"
									dot={{
										fill: theme === "dark" ? "#18181b" : "#ffffff",
										stroke: zincStroke,
										strokeWidth: 2,
										r: 3.5,
									}}
									activeDot={{
										r: 5,
										fill: theme === "dark" ? "#fafafa" : "#18181b",
										stroke: theme === "dark" ? "#18181b" : "#ffffff",
										strokeWidth: 2,
									}}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
			</div>

			{/* Quick Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
				<Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-2xl"></div>
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
								<Target className="text-blue-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">142</p>
						<p className="text-sm text-muted-foreground mt-1">
							Active Deals
						</p>
					</CardContent>
				</Card>

				<Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-2xl"></div>
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
								<FileText className="text-purple-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">28</p>
						<p className="text-sm text-muted-foreground mt-1">
							Pending Invoices
						</p>
					</CardContent>
				</Card>

				<Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-green-600/10 rounded-full blur-2xl"></div>
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20">
								<CheckCircle2 className="text-green-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">89%</p>
						<p className="text-sm text-muted-foreground mt-1">Win Rate</p>
					</CardContent>
				</Card>

				<Card className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-orange-600/10 rounded-full blur-2xl"></div>
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm border border-orange-500/20">
								<Activity className="text-orange-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">1.2K</p>
						<p className="text-sm text-muted-foreground mt-1">
							Monthly Visits
						</p>
					</CardContent>
				</Card>
			</div>

			{/* Recent Activity & Upcoming Meetings */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
				{/* Recent Activity */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle className="text-lg">Recent Activity</CardTitle>
							<CardDescription>
								Latest updates and actions
							</CardDescription>
						</div>
						<Bell className="text-muted-foreground" size={20} />
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
						{[
							{
								icon: UserPlus,
								iconColor: "text-blue-500",
								bgColor: "bg-blue-500/10",
								title: "New lead added",
								description: "Alice Brown was added to the system",
								time: "2 hours ago",
							},
							{
								icon: FileText,
								iconColor: "text-green-500",
								bgColor: "bg-green-500/10",
								title: "Invoice created",
								description: "Invoice #INV-2024-001 was created",
								time: "4 hours ago",
							},
							{
								icon: CheckCircle2,
								iconColor: "text-purple-500",
								bgColor: "bg-purple-500/10",
								title: "Deal closed",
								description: "Deal with Tech Corp was successfully closed",
								time: "6 hours ago",
							},
							{
								icon: MessageCircle,
								iconColor: "text-orange-500",
								bgColor: "bg-orange-500/10",
								title: "New message",
								description: "You received a message from John Doe",
								time: "1 day ago",
							},
						].map((activity, index) => {
							const Icon = activity.icon;
							return (
								<div
									key={index}
									className={`flex items-start gap-3 p-3 rounded-xl ${colors.hoverSecondary} transition-colors`}
								>
									<div
										className={`p-2 rounded-xl ${activity.bgColor} ${activity.iconColor}`}
									>
										<Icon size={18} />
									</div>
									<div className="flex-1">
										<p className="text-sm font-medium">
											{activity.title}
										</p>
										<p className="text-xs text-muted-foreground mt-0.5">
											{activity.description}
										</p>
										<p className="text-xs text-muted-foreground/70 mt-1">
											{activity.time}
										</p>
									</div>
								</div>
							);
						})}
					</div>
					</CardContent>
				</Card>

				{/* Upcoming Meetings */}
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<div>
							<CardTitle className="text-lg">Upcoming Meetings</CardTitle>
							<CardDescription>
								Your scheduled meetings and events
							</CardDescription>
						</div>
						<Calendar className="text-muted-foreground" size={20} />
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
						{dashboardData.upcomingMeetings
							.slice(0, 5)
							.map((meeting, index) => (
								<div
									key={index}
									className={cn(
										"flex items-center justify-between p-3 rounded-xl transition-colors border",
										colors.hoverSecondary
									)}
								>
									<div className="flex items-center gap-3 flex-1">
										<div
											className={`p-2 rounded-xl ${
												meeting.iconType === "up"
													? "bg-blue-500/10 text-blue-500"
													: "bg-purple-500/10 text-purple-500"
											}`}
										>
											{meeting.iconType === "up" ? (
												<ChevronUp size={16} />
											) : (
												<ChevronDown size={16} />
											)}
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium truncate">
												{meeting.title}
											</p>
											<p className="text-xs text-muted-foreground mt-0.5">
												{meeting.contact}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className="text-xs font-medium">
											{new Date(meeting.date).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											})}
										</p>
										<p className="text-xs text-muted-foreground/70 mt-0.5">
											{new Date(meeting.date).toLocaleDateString("en-US", {
												weekday: "short",
											})}
										</p>
									</div>
								</div>
							))}
					</div>
					<Button
						variant="ghost"
						className="w-full mt-4"
						onClick={() => router.push("/tasks")}
					>
						View all meetings
					</Button>
					</CardContent>
				</Card>
			</div>

			{/* Quick Actions */}
			<Card className="my-4">
				<CardHeader>
					<CardTitle className="text-lg">Quick Actions</CardTitle>
					<CardDescription>
						Common tasks and shortcuts
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					{[
						{
							icon: UserPlus,
							label: "Add Lead",
							color: "blue",
							route: "/leads",
						},
						{
							icon: FileText,
							label: "Create Invoice",
							color: "green",
							route: "/invoices",
						},
						{
							icon: Calendar,
							label: "Schedule Meeting",
							color: "purple",
							route: "/tasks",
						},
						{
							icon: DollarSign,
							label: "Add Payment",
							color: "orange",
							route: "/payments",
						},
					].map((action, index) => {
						const Icon = action.icon;
						const colorClasses = {
							blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
							green: "bg-green-500/10 text-green-500 border-green-500/20",
							purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
							orange: "bg-orange-500/10 text-orange-500 border-orange-500/20",
						};
						return (
							<Button
								key={index}
								variant="outline"
								onClick={() => router.push(action.route)}
								className={cn(
									"flex h-auto flex-col items-center gap-2 p-4 rounded-xl border",
									colorClasses[action.color],
									"transition-all duration-200 hover:scale-105"
								)}
							>
								<Icon size={24} />
								<span className="text-xs font-medium">
									{action.label}
								</span>
							</Button>
						);
					})}
				</div>
				</CardContent>
			</Card>

			<div className="flex items-start justify-start">
				<div className="grid w-full md:w-full grid-cols-1 md:grid-cols-4 gap-4 my-4">
					{dashboardData.moduleStats.map((item, index) => {
						const iconMap = {
							calendar: Calendar,
							activity: Activity,
							file: FileText,
							dollar: DollarSign,
							target: Target,
							bell: Bell,
							user: UserPlus,
							check: CheckCircle2,
						};
						const Icon = iconMap[item.icon] || Activity;

						return (
							<Card key={index} className="p-4">
								<div className="flex items-start justify-between">
									<div>
										<p className="text-sm text-muted-foreground">{item.title}</p>
										<p className="text-2xl font-semibold mt-1">
											{item.value}
										</p>
										<p className="text-xs text-muted-foreground/70 mt-1">
											{item.description}
										</p>
									</div>
									<div className="h-10 w-10 rounded-xl border flex items-center justify-center">
										<Icon size={18} />
									</div>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => router.push(item.route)}
									className="mt-4 gap-2"
								>
									View details
									<ArrowRight size={14} />
								</Button>
							</Card>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Home;
