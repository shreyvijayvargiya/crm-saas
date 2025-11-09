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
	Clock,
	AlertCircle,
} from "lucide-react";
import router from "next/router";
import { toast } from "react-toastify";
import { BiParty } from "react-icons/bi";
import {
	AreaChart,
	Area,
	BarChart,
	Bar,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Home = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

	const dashboardData = {
		stats: {
			totalLeads: 45,
			conversionRate: "22%",
			sales: "95",
			revenue: "$12, 500",
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
		{
			name: "Jan",
			leads: 30,
			conversion: 20,
			sales: 50,
			revenue: 1000,
			companies: 5,
		},
		{
			name: "Feb",
			leads: 40,
			conversion: 25,
			sales: 60,
			revenue: 1500,
			companies: 7,
		},
		{
			name: "Mar",
			leads: 35,
			conversion: 30,
			sales: 70,
			revenue: 2000,
			companies: 6,
		},
		{
			name: "Apr",
			leads: 50,
			conversion: 35,
			sales: 80,
			revenue: 2500,
			companies: 8,
		},
	];

	return (
		<div className={`p-6 mx-auto ${colors.background} transition-colors`}>
			<h1 className={`text-xl font-semibold mb-4 ${colors.foreground}`}>
				Welcome back, John
			</h1>
			<div
				className={`flex items-center gap-1 hover:underline cursor-pointer ${colors.foreground}`}
				onClick={() => router.push("/stats")}
			>
				<p>Stats</p>
				<ExternalLink size={18} className={colors.textSecondary} />
			</div>
			<div className="py-1 mb-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2 w-full">
					{/* Sales Chart Card */}
					<div
						className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300 group`}
					>
						{/* Background Gradient Shapes */}
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-green-600/10 rounded-full blur-2xl"></div>
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-green-300/15 to-green-500/5 rounded-full blur-xl"></div>

						<div className="relative">
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20">
									<BiParty className="text-green-500 text-xl" />
								</div>
								<div>
									<p
										className={`text-sm font-medium ${colors.mutedForeground}`}
									>
										Sales
									</p>
									<p className={`text-xl font-bold ${colors.foreground}`}>
										{dashboardData.stats.sales}
									</p>
								</div>
							</div>
							<ResponsiveContainer width="100%" height={200}>
								<BarChart
									data={sampleData}
									margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
								>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke={theme === "dark" ? "#3f3f46" : "#e4e4e7"}
										vertical={false}
									/>
									<XAxis
										dataKey="name"
										stroke={theme === "dark" ? "#71717a" : "#71717a"}
										fontSize={10}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis
										stroke={theme === "dark" ? "#71717a" : "#71717a"}
										fontSize={10}
										tickLine={false}
										axisLine={false}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
											border: `1px solid ${
												theme === "dark" ? "#3f3f46" : "#e4e4e7"
											}`,
											borderRadius: "0.5rem",
											padding: "0.5rem",
										}}
									/>
									<Bar
										dataKey="sales"
										fill={theme === "dark" ? "#22c55e" : "#27ae60"}
										radius={[8, 8, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Revenue Chart Card */}
					<div
						className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300 group`}
					>
						{/* Background Gradient Shapes */}
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-orange-600/10 rounded-full blur-2xl"></div>
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-orange-300/15 to-orange-500/5 rounded-full blur-xl"></div>

						<div className="relative">
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm border border-orange-500/20">
									<DollarSign className="text-orange-500" size={20} />
								</div>
								<div>
									<p
										className={`text-sm font-medium ${colors.mutedForeground}`}
									>
										Revenue
									</p>
									<p className={`text-xl font-bold ${colors.foreground}`}>
										{dashboardData.stats.revenue}
									</p>
								</div>
							</div>
							<ResponsiveContainer width="100%" height={200}>
								<BarChart
									data={sampleData}
									margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
								>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke={theme === "dark" ? "#3f3f46" : "#e4e4e7"}
										vertical={false}
									/>
									<XAxis
										dataKey="name"
										stroke={theme === "dark" ? "#71717a" : "#71717a"}
										fontSize={10}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis
										stroke={theme === "dark" ? "#71717a" : "#71717a"}
										fontSize={10}
										tickLine={false}
										axisLine={false}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
											border: `1px solid ${
												theme === "dark" ? "#3f3f46" : "#e4e4e7"
											}`,
											borderRadius: "0.5rem",
											padding: "0.5rem",
										}}
									/>
									<Bar
										dataKey="revenue"
										fill={theme === "dark" ? "#f97316" : "#f39c12"}
										radius={[8, 8, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>

					{/* Conversion Rate Chart Card */}
					<div
						className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300 group`}
					>
						{/* Background Gradient Shapes */}
						<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-pink-600/10 rounded-full blur-2xl"></div>
						<div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-tr from-pink-300/15 to-pink-500/5 rounded-full blur-xl"></div>

						<div className="relative">
							<div className="flex items-center gap-3 mb-4">
								<div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-sm border border-pink-500/20">
									<TrendingUp className="text-pink-500" size={20} />
								</div>
								<div>
									<p
										className={`text-sm font-medium ${colors.mutedForeground}`}
									>
										Conversion Rate
									</p>
									<p className={`text-xl font-bold ${colors.foreground}`}>
										{dashboardData.stats.conversionRate}
									</p>
								</div>
							</div>
							<ResponsiveContainer width="100%" height={200}>
								<LineChart
									data={sampleData}
									margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
								>
									<CartesianGrid
										strokeDasharray="3 3"
										stroke={theme === "dark" ? "#3f3f46" : "#e4e4e7"}
										vertical={false}
									/>
									<XAxis
										dataKey="name"
										stroke={theme === "dark" ? "#71717a" : "#71717a"}
										fontSize={10}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis
										stroke={theme === "dark" ? "#71717a" : "#71717a"}
										fontSize={10}
										tickLine={false}
										axisLine={false}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
											border: `1px solid ${
												theme === "dark" ? "#3f3f46" : "#e4e4e7"
											}`,
											borderRadius: "0.5rem",
											padding: "0.5rem",
										}}
									/>
									<Line
										type="monotone"
										dataKey="conversion"
										stroke={theme === "dark" ? "#ec4899" : "#e94e77"}
										strokeWidth={2}
										dot={{
											fill: theme === "dark" ? "#ec4899" : "#e94e77",
											r: 4,
										}}
										activeDot={{ r: 6 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
			<div
				className={`flex items-center justify-start gap-2 hover:underline cursor-pointer ${colors.foreground}`}
				onClick={() => router.push("/leads")}
			>
				<p>Leads</p>
				<ExternalLink size={18} className={colors.textSecondary} />
			</div>
			<div className="space-y-4 my-2">
				{/* Recent Leads Table */}
				<div
					className={`w-full ${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
				>
					<div
						className={`flex items-center justify-between px-6 py-4 border-b ${colors.border}`}
					>
						<div>
							<h2 className={`text-lg font-semibold ${colors.foreground}`}>
								Recent Leads
							</h2>
							<p className={`text-sm ${colors.mutedForeground} mt-1`}>
								View and manage your recent leads
							</p>
						</div>
						<button
							className={`text-sm font-medium ${colors.textSecondary} ${colors.hoverSecondary} transition-colors px-3 py-1.5 rounded-xl`}
							onClick={() => router.push("/leads")}
						>
							View all
						</button>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className={`${colors.muted} border-b ${colors.border}`}>
								<tr>
									<th
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
									</th>
									<th
										className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
									>
										Email
									</th>
									<th
										className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
									>
										Actions
									</th>
								</tr>
							</thead>
							<tbody className={`${colors.card} divide-y ${colors.border}`}>
								{sortedLeads.length === 0 ? (
									<tr>
										<td colSpan="3" className="px-6 py-12 text-center">
											<p className={colors.mutedForeground}>No leads found</p>
										</td>
									</tr>
								) : (
									sortedLeads.map((lead) => (
										<tr
											key={lead.id}
											className={`${colors.hover} transition-colors`}
										>
											<td className="px-6 py-4 whitespace-nowrap">
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
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className={`text-sm ${colors.textSecondary}`}>
													{lead.email}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center gap-3">
													<button
														className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
														title="Call"
													>
														<Phone size={16} className={colors.textSecondary} />
													</button>
													<button
														className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
														title="Message"
													>
														<MessageCircle
															size={16}
															className={colors.textSecondary}
														/>
													</button>
													<button
														className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
														title="View"
													>
														<Eye size={16} className={colors.textSecondary} />
													</button>
													<button
														className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
														title="Edit"
													>
														<Pen size={16} className={colors.textSecondary} />
													</button>
													<button
														className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
														title="Delete"
														onClick={() =>
															toast.info(`Removing lead: ${lead.id}`)
														}
													>
														<Trash size={16} className={colors.textSecondary} />
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Total Leads Chart */}
				<div
					className={`w-full ${colors.card} border ${colors.border} rounded-xl ${colors.shadow} p-6`}
				>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h2 className={`text-lg font-semibold ${colors.foreground}`}>
								Total Leads Overview
							</h2>
							<p className={`text-sm ${colors.mutedForeground} mt-1`}>
								Total Leads: {dashboardData.stats.totalLeads}
							</p>
						</div>
					</div>
					<ResponsiveContainer width="100%" height={400}>
						<AreaChart
							data={sampleData}
							margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
						>
							<defs>
								<linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor={theme === "dark" ? "#3b82f6" : "#3b82f6"}
										stopOpacity={0.8}
									/>
									<stop
										offset="95%"
										stopColor={theme === "dark" ? "#3b82f6" : "#3b82f6"}
										stopOpacity={0.1}
									/>
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke={theme === "dark" ? "#3f3f46" : "#e4e4e7"}
								vertical={false}
							/>
							<XAxis
								dataKey="name"
								stroke={theme === "dark" ? "#71717a" : "#71717a"}
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								stroke={theme === "dark" ? "#71717a" : "#71717a"}
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<Tooltip
								contentStyle={{
									backgroundColor: theme === "dark" ? "#18181b" : "#ffffff",
									border: `1px solid ${
										theme === "dark" ? "#3f3f46" : "#e4e4e7"
									}`,
									borderRadius: "0.75rem",
									padding: "0.75rem",
								}}
							/>
							<Legend />
							<Area
								type="monotone"
								dataKey="leads"
								stroke={theme === "dark" ? "#3b82f6" : "#3b82f6"}
								fillOpacity={1}
								fill="url(#colorLeads)"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>

			{/* Quick Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-4">
				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300`}
				>
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-2xl"></div>
					<div className="relative">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
								<Target className="text-blue-500" size={20} />
							</div>
						</div>
						<p className={`text-2xl font-bold ${colors.foreground}`}>142</p>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Active Deals
						</p>
					</div>
				</div>

				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300`}
				>
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-2xl"></div>
					<div className="relative">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
								<FileText className="text-purple-500" size={20} />
							</div>
						</div>
						<p className={`text-2xl font-bold ${colors.foreground}`}>28</p>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Pending Invoices
						</p>
					</div>
				</div>

				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300`}
				>
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-green-600/10 rounded-full blur-2xl"></div>
					<div className="relative">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20">
								<CheckCircle2 className="text-green-500" size={20} />
							</div>
						</div>
						<p className={`text-2xl font-bold ${colors.foreground}`}>89%</p>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>Win Rate</p>
					</div>
				</div>

				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-all duration-300`}
				>
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-orange-600/10 rounded-full blur-2xl"></div>
					<div className="relative">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm border border-orange-500/20">
								<Activity className="text-orange-500" size={20} />
							</div>
						</div>
						<p className={`text-2xl font-bold ${colors.foreground}`}>1.2K</p>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Monthly Visits
						</p>
					</div>
				</div>
			</div>

			{/* Recent Activity & Upcoming Meetings */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
				{/* Recent Activity */}
				<div
					className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} p-6`}
				>
					<div className="flex items-center justify-between mb-4">
						<div>
							<h2 className={`text-lg font-semibold ${colors.foreground}`}>
								Recent Activity
							</h2>
							<p className={`text-sm ${colors.mutedForeground} mt-1`}>
								Latest updates and actions
							</p>
						</div>
						<Bell className={`${colors.textSecondary}`} size={20} />
					</div>
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
										className={`p-2 rounded-lg ${activity.bgColor} ${activity.iconColor}`}
									>
										<Icon size={18} />
									</div>
									<div className="flex-1">
										<p className={`text-sm font-medium ${colors.foreground}`}>
											{activity.title}
										</p>
										<p className={`text-xs ${colors.textSecondary} mt-0.5`}>
											{activity.description}
										</p>
										<p className={`text-xs ${colors.textMuted} mt-1`}>
											{activity.time}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* Upcoming Meetings */}
				<div
					className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} p-6`}
				>
					<div className="flex items-center justify-between mb-4">
						<div>
							<h2 className={`text-lg font-semibold ${colors.foreground}`}>
								Upcoming Meetings
							</h2>
							<p className={`text-sm ${colors.mutedForeground} mt-1`}>
								Your scheduled meetings and events
							</p>
						</div>
						<Calendar className={`${colors.textSecondary}`} size={20} />
					</div>
					<div className="space-y-3">
						{dashboardData.upcomingMeetings
							.slice(0, 5)
							.map((meeting, index) => (
								<div
									key={index}
									className={`flex items-center justify-between p-3 rounded-xl ${colors.hoverSecondary} transition-colors border ${colors.border}`}
								>
									<div className="flex items-center gap-3 flex-1">
										<div
											className={`p-2 rounded-lg ${
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
											<p
												className={`text-sm font-medium ${colors.foreground} truncate`}
											>
												{meeting.title}
											</p>
											<p className={`text-xs ${colors.textSecondary} mt-0.5`}>
												{meeting.contact}
											</p>
										</div>
									</div>
									<div className="text-right">
										<p className={`text-xs font-medium ${colors.foreground}`}>
											{new Date(meeting.date).toLocaleDateString("en-US", {
												month: "short",
												day: "numeric",
											})}
										</p>
										<p className={`text-xs ${colors.textMuted} mt-0.5`}>
											{new Date(meeting.date).toLocaleDateString("en-US", {
												weekday: "short",
											})}
										</p>
									</div>
								</div>
							))}
					</div>
					<button
						className={`w-full mt-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
						onClick={() => router.push("/tasks")}
					>
						View all meetings
					</button>
				</div>
			</div>

			{/* Quick Actions */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} p-6 my-4`}
			>
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Quick Actions
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Common tasks and shortcuts
						</p>
					</div>
				</div>
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
							<button
								key={index}
								onClick={() => router.push(action.route)}
								className={`flex flex-col items-center gap-2 p-4 rounded-xl border ${
									colorClasses[action.color]
								} ${
									colors.hoverSecondary
								} transition-all duration-200 hover:scale-105`}
							>
								<Icon size={24} />
								<span className={`text-xs font-medium ${colors.foreground}`}>
									{action.label}
								</span>
							</button>
						);
					})}
				</div>
			</div>

			{/* Tasks Section */}
			<div
				className={`flex items-center gap-1 hover:underline cursor-pointer ${colors.foreground} my-4`}
				onClick={() => router.push("/tasks")}
			>
				<p>Tasks</p>
				<ExternalLink size={18} className={colors.textSecondary} />
			</div>
			<div className="flex items-start justify-start">
				<div
					className={`flex flex-col w-full md:w-1/2 gap-2 p-5 my-4 border ${colors.border} rounded-xl ${colors.hoverSecondary} ${colors.card} transition-colors`}
				>
					{dashboardData.upcomingMeetings.map((meeting, index) => (
						<div className="flex items-center justify-between mb-2" key={index}>
							<span
								className={`${colors.textSecondary} w-1/3 text-left flex items-center gap-2`}
							>
								{meeting.iconType === "up" ? (
									<ChevronUp size={16} className={colors.textSecondary} />
								) : (
									<ChevronDown size={16} className={colors.textSecondary} />
								)}
								{meeting.title}:
							</span>
							<span className={`${colors.textSecondary} w-1/3 text-left`}>
								{meeting.date}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
