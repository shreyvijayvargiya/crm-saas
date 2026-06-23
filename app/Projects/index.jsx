import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Briefcase,
	TrendingUp,
	DollarSign,
	Users,
	Search,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Calendar,
	Download,
	ChevronUp,
	CheckCircle2,
	Clock,
	XCircle,
	Eye,
} from "lucide-react";
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INITIAL_PROJECTS } from "../CRM/projectsSeedData";
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
import { Checkbox } from "@/components/ui/checkbox";

const Projects = () => {
	const router = useRouter();
	const { colors } = useTheme();

	const [timePeriod, setTimePeriod] = useState("3months");
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All"); // All, Active, Cancel, Completed, Pending
	const [selectedRows, setSelectedRows] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 6;
	const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);
	const [dateRange, setDateRange] = useState({
		start: new Date(2025, 9, 13), // Oct 13, 2025
		end: new Date(2025, 10, 9), // Nov 9, 2025
	});
	const [calendarMonth, setCalendarMonth] = useState(new Date(2025, 10, 1)); // November 2025
	const [selectedPreset, setSelectedPreset] = useState("Last 28 Days");

	const [projects] = useState(INITIAL_PROJECTS);

	// Generate data for the last 3 months (Aug 18 to Nov 8)
	const generateData = (period) => {
		if (period === "3months") {
			return [
				{ date: "Aug 18", Mobile: 120, Desktop: 250 },
				{ date: "Aug 22", Mobile: 170, Desktop: 308 },
				{ date: "Aug 25", Mobile: 145, Desktop: 280 },
				{ date: "Sep 1", Mobile: 190, Desktop: 320 },
				{ date: "Sep 7", Mobile: 165, Desktop: 295 },
				{ date: "Sep 14", Mobile: 210, Desktop: 350 },
				{ date: "Sep 21", Mobile: 185, Desktop: 330 },
				{ date: "Sep 28", Mobile: 230, Desktop: 380 },
				{ date: "Oct 5", Mobile: 200, Desktop: 360 },
				{ date: "Oct 11", Mobile: 245, Desktop: 400 },
				{ date: "Oct 18", Mobile: 220, Desktop: 375 },
				{ date: "Oct 25", Mobile: 260, Desktop: 420 },
				{ date: "Nov 1", Mobile: 240, Desktop: 395 },
				{ date: "Nov 8", Mobile: 275, Desktop: 450 },
			];
		} else if (period === "30days") {
			// Last 30 days data
			return [
				{ date: "Oct 9", Mobile: 200, Desktop: 360 },
				{ date: "Oct 11", Mobile: 245, Desktop: 400 },
				{ date: "Oct 14", Mobile: 210, Desktop: 370 },
				{ date: "Oct 18", Mobile: 220, Desktop: 375 },
				{ date: "Oct 21", Mobile: 235, Desktop: 390 },
				{ date: "Oct 25", Mobile: 260, Desktop: 420 },
				{ date: "Oct 28", Mobile: 250, Desktop: 410 },
				{ date: "Nov 1", Mobile: 240, Desktop: 395 },
				{ date: "Nov 4", Mobile: 265, Desktop: 435 },
				{ date: "Nov 8", Mobile: 275, Desktop: 450 },
			];
		} else {
			// Last 7 days data
			return [
				{ date: "Nov 2", Mobile: 245, Desktop: 400 },
				{ date: "Nov 3", Mobile: 250, Desktop: 405 },
				{ date: "Nov 4", Mobile: 265, Desktop: 435 },
				{ date: "Nov 5", Mobile: 260, Desktop: 425 },
				{ date: "Nov 6", Mobile: 270, Desktop: 440 },
				{ date: "Nov 7", Mobile: 268, Desktop: 445 },
				{ date: "Nov 8", Mobile: 275, Desktop: 450 },
			];
		}
	};

	const chartData = useMemo(() => generateData(timePeriod), [timePeriod]);

	const activeProjects = 1423;
	const changePercentage = 5.02;
	const totalRevenue = 125000;
	const revenueChange = 12.5;
	const totalLeads = 2847;
	const leadsChange = 8.3;

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			maximumFractionDigits: 0,
		}).format(amount);
	};

	// Filter projects
	const filteredProjects = useMemo(() => {
		let filtered = [...projects];

		// Filter by status
		if (statusFilter !== "All") {
			filtered = filtered.filter((p) => p.status === statusFilter);
		}

		// Filter by search term
		if (searchTerm) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.projectName.toLowerCase().includes(searchLower) ||
					p.clientName.toLowerCase().includes(searchLower) ||
					p.status.toLowerCase().includes(searchLower)
			);
		}

		return filtered;
	}, [projects, searchTerm, statusFilter]);

	// Count projects by status
	const statusCounts = useMemo(() => {
		return {
			All: projects.length,
			Active: projects.filter((p) => p.status === "Active").length,
			Cancel: projects.filter((p) => p.status === "Cancel").length,
			Completed: projects.filter((p) => p.status === "Completed").length,
			Pending: projects.filter((p) => p.status === "Pending").length,
		};
	}, [projects]);

	// Pagination
	const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
	const paginatedProjects = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredProjects, currentPage]);

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			setSelectedRows(paginatedProjects.map((p) => p.id));
		} else {
			setSelectedRows([]);
		}
	};

	const handleSelectRow = (projectId) => {
		setSelectedRows((prev) =>
			prev.includes(projectId)
				? prev.filter((id) => id !== projectId)
				: [...prev, projectId]
		);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case "Active":
				return "bg-green-100 text-green-800";
			case "Cancel":
				return "bg-red-100 text-red-800";
			case "Completed":
				return "bg-blue-100 text-blue-800";
			case "Pending":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-zinc-100 text-zinc-800";
		}
	};

	const getInitials = (name) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const formatDateRange = (start, end) => {
		const startStr = start.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
		const endStr = end.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
		return `${startStr} - ${endStr}`;
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isDateRangeOpen && !event.target.closest(".date-range-dropdown")) {
				setIsDateRangeOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isDateRangeOpen]);

	const handlePresetSelect = (preset) => {
		const today = new Date();
		let start, end;

		switch (preset) {
			case "Today":
				start = new Date(today);
				end = new Date(today);
				break;
			case "Yesterday":
				start = new Date(today);
				start.setDate(start.getDate() - 1);
				end = new Date(start);
				break;
			case "This Week":
				start = new Date(today);
				start.setDate(today.getDate() - today.getDay());
				end = new Date(today);
				break;
			case "Last 7 Days":
				start = new Date(today);
				start.setDate(start.getDate() - 6);
				end = new Date(today);
				break;
			case "Last 28 Days":
				start = new Date(today);
				start.setDate(start.getDate() - 27);
				end = new Date(today);
				break;
			case "This Month":
				start = new Date(today.getFullYear(), today.getMonth(), 1);
				end = new Date(today);
				break;
			case "Last Month":
				start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
				end = new Date(today.getFullYear(), today.getMonth(), 0);
				break;
			case "This Year":
				start = new Date(today.getFullYear(), 0, 1);
				end = new Date(today);
				break;
			default:
				return;
		}

		setDateRange({ start, end });
		setSelectedPreset(preset);
		setCalendarMonth(new Date(start));
	};

	const getDaysInMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	};

	const isDateInRange = (date) => {
		const dateStr = date.toDateString();
		const startStr = dateRange.start.toDateString();
		const endStr = dateRange.end.toDateString();
		return dateStr >= startStr && dateStr <= endStr;
	};

	const isDateSelected = (date) => {
		return (
			date.toDateString() === dateRange.start.toDateString() ||
			date.toDateString() === dateRange.end.toDateString()
		);
	};

	const handleDateClick = (date) => {
		if (
			!dateRange.start ||
			date < dateRange.start ||
			date.toDateString() === dateRange.start.toDateString()
		) {
			setDateRange({ start: date, end: date });
		} else {
			setDateRange({ ...dateRange, end: date });
		}
	};

	const renderCalendar = () => {
		const daysInMonth = getDaysInMonth(calendarMonth);
		const firstDay = getFirstDayOfMonth(calendarMonth);
		const days = [];

		// Previous month's trailing days
		const prevMonth = new Date(
			calendarMonth.getFullYear(),
			calendarMonth.getMonth() - 1,
			0
		);
		for (let i = firstDay - 1; i >= 0; i--) {
			days.push(
				new Date(
					prevMonth.getFullYear(),
					prevMonth.getMonth(),
					prevMonth.getDate() - i
				)
			);
		}

		// Current month's days
		for (let i = 1; i <= daysInMonth; i++) {
			days.push(
				new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), i)
			);
		}

		// Next month's leading days
		const remaining = 42 - days.length; // 6 rows * 7 days
		for (let i = 1; i <= remaining; i++) {
			days.push(
				new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, i)
			);
		}

		return days;
	};

	const handleExport = () => {
		// Export functionality
		console.log(
			"Exporting data for range:",
			formatDateRange(dateRange.start, dateRange.end)
		);
	};

	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div
					className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} p-3`}
				>
					<p className={`text-sm font-medium ${colors.foreground} mb-2`}>
						{label}
					</p>
					{payload.map((entry, index) => (
						<div key={index} className="flex items-center gap-2 mb-1">
							<div
								className="w-3 h-3 rounded"
								style={{
									backgroundColor:
										entry.dataKey === "Mobile" ? "#e4e4e7" : "#a1a1aa",
								}}
							/>
							<span className="text-sm text-zinc-600">
								{entry.dataKey}: {entry.value}
							</span>
						</div>
					))}
				</div>
			);
		}
		return null;
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className={`text-2xl font-semibold ${colors.foreground}`}>
						Projects
					</h1>
					<p className={`text-sm ${colors.mutedForeground} mt-1`}>
						Monitor and manage your project portfolio
					</p>
				</div>
				<div className="flex items-center gap-2">
					{/* Date Range Selector */}
					<div className="relative date-range-dropdown">
						<Button
							variant="outline"
							size="sm"
							onClick={() => setIsDateRangeOpen(!isDateRangeOpen)}
						>
							<Calendar className="w-4 h-4" />
							{formatDateRange(dateRange.start, dateRange.end)}
							{isDateRangeOpen ? (
								<ChevronUp className="w-4 h-4" />
							) : (
								<ChevronDown className="w-4 h-4" />
							)}
						</Button>

						{/* Date Range Dropdown */}
						{isDateRangeOpen && (
							<div
								className={`absolute right-0 top-full mt-2 ${colors.card} border ${colors.border} rounded-xl ${colors.shadow} z-50 flex date-range-dropdown`}
							>
								{/* Left Panel - Presets */}
								<div className={`w-48 border-r ${colors.border} p-2`}>
									<div className="space-y-1">
										{[
											"Today",
											"Yesterday",
											"This Week",
											"Last 7 Days",
											"Last 28 Days",
											"This Month",
											"Last Month",
											"This Year",
										].map((preset) => (
											<Button
												key={preset}
												type="button"
												variant="ghost"
												onClick={() => {
													handlePresetSelect(preset);
													setIsDateRangeOpen(false);
												}}
												className={cn(
													"w-full justify-start h-auto px-3 py-2 text-sm",
													selectedPreset === preset
														? cn(colors.secondary, colors.foreground, "font-medium")
														: cn(colors.textSecondary, colors.hoverSecondary)
												)}
											>
												{preset}
											</Button>
										))}
									</div>
								</div>

								{/* Right Panel - Calendar */}
								<div className="w-80 p-4">
									{/* Calendar Header */}
									<div className="flex items-center justify-between mb-4">
										<Button
											variant="ghost"
											size="icon"
											onClick={() =>
												setCalendarMonth(
													new Date(
														calendarMonth.getFullYear(),
														calendarMonth.getMonth() - 1,
														1
													)
												)
											}
											aria-label="Previous month"
										>
											<ChevronLeft className="w-4 h-4 text-zinc-600" />
										</Button>
										<h3
											className={`text-sm font-semibold ${colors.foreground}`}
										>
											{calendarMonth.toLocaleDateString("en-US", {
												month: "long",
												year: "numeric",
											})}
										</h3>
										<Button
											variant="ghost"
											size="icon"
											onClick={() =>
												setCalendarMonth(
													new Date(
														calendarMonth.getFullYear(),
														calendarMonth.getMonth() + 1,
														1
													)
												)
											}
											aria-label="Next month"
										>
											<ChevronRight className="w-4 h-4 text-zinc-600" />
										</Button>
									</div>

									{/* Days of Week */}
									<div className="grid grid-cols-7 gap-1 mb-2">
										{["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
											<div
												key={day}
												className={`text-xs font-medium ${colors.mutedForeground} text-center py-1`}
											>
												{day}
											</div>
										))}
									</div>

									{/* Calendar Grid */}
									<div className="grid grid-cols-7 gap-1">
										{renderCalendar().map((date, index) => {
											const isCurrentMonth =
												date.getMonth() === calendarMonth.getMonth();
											const isSelected = isDateSelected(date);
											const inRange = isDateInRange(date);
											const isToday =
												date.toDateString() === new Date().toDateString();

											return (
												<Button
													key={index}
													type="button"
													variant="ghost"
													disabled={!isCurrentMonth}
													onClick={() => {
														if (isCurrentMonth) {
															handleDateClick(date);
														}
													}}
													className={cn(
														"h-8 w-full p-0 text-xs rounded",
														!isCurrentMonth
															? "text-zinc-300"
															: isSelected
															? "bg-primary text-primary-foreground font-medium hover:bg-primary hover:text-primary-foreground"
															: inRange
															? cn(colors.secondary, colors.foreground)
															: isToday
															? cn(colors.muted, colors.foreground, "font-medium border", colors.border)
															: cn(colors.textSecondary, colors.hoverSecondary)
													)}
												>
													{date.getDate()}
												</Button>
											);
										})}
									</div>
								</div>
							</div>
						)}
					</div>

					{/* Export Button */}
					<Button variant="outline" size="sm" onClick={handleExport}>
						<Download className="w-4 h-4" />
						Export
					</Button>
				</div>
			</div>

			{/* Metrics Cards */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card className={`p-6 ${colors.shadow}`}>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-1">
								Active Projects
							</p>
							<p className={`text-3xl font-bold ${colors.foreground}`}>
								{activeProjects.toLocaleString()}
							</p>
							<p className="text-sm text-green-600 mt-2 flex items-center gap-1">
								<TrendingUp className="w-4 h-4" />+{changePercentage}% from last
								month
							</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center">
							<Briefcase className="w-6 h-6 text-zinc-600" />
						</div>
					</div>
				</Card>

				<Card className={`p-6 ${colors.shadow}`}>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-1">
								Total Revenue
							</p>
							<p className={`text-3xl font-bold ${colors.foreground}`}>
								{formatCurrency(totalRevenue)}
							</p>
							<p className="text-sm text-green-600 mt-2 flex items-center gap-1">
								<TrendingUp className="w-4 h-4" />+{revenueChange}% from last
								month
							</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
							<DollarSign className="w-6 h-6 text-green-600" />
						</div>
					</div>
				</Card>

				<Card className={`p-6 ${colors.shadow}`}>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-muted-foreground mb-1">
								Total Leads
							</p>
							<p className={`text-3xl font-bold ${colors.foreground}`}>
								{totalLeads.toLocaleString()}
							</p>
							<p className="text-sm text-green-600 mt-2 flex items-center gap-1">
								<TrendingUp className="w-4 h-4" />+{leadsChange}% from last
								month
							</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
							<Users className="w-6 h-6 text-blue-600" />
						</div>
					</div>
				</Card>
			</div>

			{/* Projects Overview Chart */}
			<Card className={`p-6 ${colors.shadow}`}>
				<div className="flex items-center justify-between mb-6">
					<div>
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Projects Overview
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Total for the last{" "}
							{timePeriod === "3months"
								? "3 months"
								: timePeriod === "30days"
								? "30 days"
								: "7 days"}
						</p>
					</div>
					<div className="flex gap-2">
						<Button
							size="sm"
							variant={timePeriod === "3months" ? "default" : "secondary"}
							onClick={() => setTimePeriod("3months")}
						>
							Last 3 months
						</Button>
						<Button
							size="sm"
							variant={timePeriod === "30days" ? "default" : "secondary"}
							onClick={() => setTimePeriod("30days")}
						>
							Last 30 days
						</Button>
						<Button
							size="sm"
							variant={timePeriod === "7days" ? "default" : "secondary"}
							onClick={() => setTimePeriod("7days")}
						>
							Last 7 days
						</Button>
					</div>
				</div>

				{/* Chart */}
				<div className="w-full h-80">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart
							data={chartData}
							margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
						>
							<defs>
								<linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#e4e4e7" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#e4e4e7" stopOpacity={0.1} />
								</linearGradient>
								<linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#a1a1aa" stopOpacity={0.8} />
									<stop offset="95%" stopColor="#a1a1aa" stopOpacity={0.1} />
								</linearGradient>
							</defs>
							<CartesianGrid
								strokeDasharray="3 3"
								stroke="#e4e4e7"
								vertical={false}
							/>
							<XAxis
								dataKey="date"
								stroke="#71717a"
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<YAxis
								stroke="#71717a"
								fontSize={12}
								tickLine={false}
								axisLine={false}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Area
								type="monotone"
								dataKey="Mobile"
								stroke="#e4e4e7"
								fillOpacity={1}
								fill="url(#colorMobile)"
								stackId="1"
							/>
							<Area
								type="monotone"
								dataKey="Desktop"
								stroke="#a1a1aa"
								fillOpacity={1}
								fill="url(#colorDesktop)"
								stackId="1"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>

				{/* Legend */}
				<div className="flex items-center justify-center gap-6 mt-4">
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded bg-zinc-300" />
						<span className="text-sm text-zinc-600">Mobile</span>
					</div>
					<div className="flex items-center gap-2">
						<div className="w-3 h-3 rounded bg-zinc-500" />
						<span className="text-sm text-zinc-600">Desktop</span>
					</div>
				</div>
			</Card>

			{/* Recent Projects Table */}
			<Card className={`${colors.shadow} overflow-hidden`}>
				{/* Table Header */}
				<div className={`p-6 border-b ${colors.border}`}>
					<div className="flex items-center justify-between mb-4">
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Recent Projects
						</h2>
					</div>
					<div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
						{/* Filter Input */}
						<div className="relative flex-1 max-w-sm w-full md:w-auto">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
							<Input
								type="text"
								placeholder="Filter projects..."
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setCurrentPage(1);
								}}
								className="pl-10"
							/>
						</div>

						{/* Status Filter Tabs */}
						<div className="flex gap-2 flex-wrap">
							<Button
								size="sm"
								variant={statusFilter === "All" ? "default" : "secondary"}
								onClick={() => {
									setStatusFilter("All");
									setCurrentPage(1);
								}}
							>
								All ({statusCounts.All})
							</Button>
							<Button
								size="sm"
								variant={statusFilter === "Active" ? "default" : "secondary"}
								className={cn(
									statusFilter === "Active" && "bg-green-600 text-white hover:bg-green-600/90"
								)}
								onClick={() => {
									setStatusFilter("Active");
									setCurrentPage(1);
								}}
							>
								<CheckCircle2 className="w-4 h-4" />
								Active ({statusCounts.Active})
							</Button>
							<Button
								size="sm"
								variant={statusFilter === "Cancel" ? "default" : "secondary"}
								className={cn(
									statusFilter === "Cancel" && "bg-red-600 text-white hover:bg-red-600/90"
								)}
								onClick={() => {
									setStatusFilter("Cancel");
									setCurrentPage(1);
								}}
							>
								<XCircle className="w-4 h-4" />
								Cancel ({statusCounts.Cancel})
							</Button>
							<Button
								size="sm"
								variant={statusFilter === "Completed" ? "default" : "secondary"}
								className={cn(
									statusFilter === "Completed" && "bg-blue-600 text-white hover:bg-blue-600/90"
								)}
								onClick={() => {
									setStatusFilter("Completed");
									setCurrentPage(1);
								}}
							>
								<CheckCircle2 className="w-4 h-4" />
								Completed ({statusCounts.Completed})
							</Button>
							<Button
								size="sm"
								variant={statusFilter === "Pending" ? "default" : "secondary"}
								className={cn(
									statusFilter === "Pending" && "bg-yellow-600 text-white hover:bg-yellow-600/90"
								)}
								onClick={() => {
									setStatusFilter("Pending");
									setCurrentPage(1);
								}}
							>
								<Clock className="w-4 h-4" />
								Pending ({statusCounts.Pending})
							</Button>
						</div>
					</div>
				</div>

				{/* Table */}
				<Table className="w-full">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead className="px-6 py-3 text-left">
									<Checkbox
										checked={
											paginatedProjects.length > 0 &&
											selectedRows.length === paginatedProjects.length
										}
										onCheckedChange={handleSelectAll}
										aria-label="Select all projects"
									/>
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Project Name
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Client Name
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Start Date
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Deadline
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Status
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Progress
								</TableHead>
								<TableHead className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.card} divide-y ${colors.border}`}>
							{paginatedProjects.length === 0 ? (
								<TableRow>
									<TableCell colSpan="8" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No projects found</p>
									</TableCell>
								</TableRow>
							) : (
								paginatedProjects.map((project) => (
									<TableRow
										key={project.id}
										className={`${colors.hover} transition-colors cursor-pointer`}
										onClick={() => router.push(`/projects/${project.id}`)}
									>
										<TableCell
											className="px-6 py-4"
											onClick={(e) => e.stopPropagation()}
										>
											<Checkbox
												checked={selectedRows.includes(project.id)}
												onCheckedChange={() => handleSelectRow(project.id)}
												aria-label={`Select ${project.projectName}`}
											/>
										</TableCell>
										<TableCell className="px-6 py-4">
											<Link href={`/projects/${project.id}`} passHref>
												<a
													className={`text-sm font-medium ${colors.foreground} hover:underline`}
												>
													{project.projectName}
												</a>
											</Link>
										</TableCell>
										<TableCell className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div
													className={`w-8 h-8 rounded-full ${project.clientAvatarColor} flex items-center justify-center text-white text-xs font-medium`}
												>
													{getInitials(project.clientName)}
												</div>
												<span className={`text-sm ${colors.foreground}`}>
													{project.clientName}
												</span>
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{project.startDate}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{project.deadline}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<Badge className={cn("border-0", getStatusColor(project.status))}>
												{project.status}
											</Badge>
										</TableCell>
										<TableCell className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div
													className={`flex-1 ${colors.secondary} rounded-full h-2 max-w-[100px]`}
												>
													<div
														className="bg-primary h-2 rounded-full transition-all"
														style={{ width: `${project.progress}%` }}
													/>
												</div>
												<span
													className={`text-sm ${colors.textSecondary} min-w-[40px]`}
												>
													{project.progress}%
												</span>
											</div>
										</TableCell>
										<TableCell
											className="px-6 py-4 text-right"
											onClick={(e) => e.stopPropagation()}
										>
											<Link href={`/projects/${project.id}`} passHref>
												<Button
													variant="ghost"
													size="icon"
													asChild
													title="View project"
												>
													<a>
														<Eye className={`w-4 h-4 ${colors.textSecondary}`} />
													</a>
												</Button>
											</Link>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>

				{/* Table Footer */}
				<div
					className={`px-6 py-4 border-t ${colors.border} flex items-center justify-between`}
				>
					<div className="text-sm text-zinc-500">
						{selectedRows.length} of {filteredProjects.length} row(s) selected.
					</div>
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
							disabled={currentPage === 1}
						>
							<ChevronLeft className="w-4 h-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={() =>
								setCurrentPage((prev) => Math.min(totalPages, prev + 1))
							}
							disabled={currentPage === totalPages}
						>
							<ChevronRight className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

export default Projects;
