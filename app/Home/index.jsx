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
} from "lucide-react";
import colors from "tailwindcss/colors";
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

const Home = () => {
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
				icon: <ChevronUp size={16} color={colors.zinc[700]} />,
			},
			{
				title: "Client Follow-up",
				date: "2024-06-29",
				contact: "Jane Smith",
				subject: "Follow-up on proposal",
				icon: <ChevronDown size={16} color={colors.zinc[700]} />,
			},
			{
				title: "Team Sync",
				date: "2024-06-30",
				contact: "Alice Johnson",
				subject: "Weekly team sync",
				icon: <ChevronUp size={16} color={colors.zinc[700]} />,
			},
			{
				title: "Sales Strategy",
				date: "2024-07-01",
				contact: "Bob Brown",
				subject: "Discuss sales strategy",
				icon: <ChevronDown size={16} color={colors.zinc[700]} />,
			},
			{
				title: "Quarterly Review",
				date: "2024-07-05",
				contact: "Emily Davis",
				subject: "Review of quarterly performance",
				icon: <ChevronUp size={16} color={colors.zinc[700]} />,
			},
			{
				title: "New Client Onboarding",
				date: "2024-07-10",
				contact: "Michael Johnson",
				subject: "Onboarding new client",
				icon: <ChevronDown size={16} color={colors.zinc[700]} />,
			},
			{
				title: "Marketing Strategy Meeting",
				date: "2024-07-15",
				contact: "Sarah Connor",
				subject: "Planning marketing strategies",
				icon: <ChevronUp size={16} color={colors.zinc[700]} />,
			},
			{
				title: "Product Launch",
				date: "2024-07-20",
				contact: "Chris Evans",
				subject: "Launch of new product line",
				icon: <ChevronDown size={16} color={colors.zinc[700]} />,
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
		<div className="p-6 mx-auto">
			<h1 className="text-xl font-semibold mb-4">Welcome back, John</h1>
			<div
				className="flex items-center justify-start gap-2 hover:underline cursor-pointer"
				onClick={() => router.push("/leads")}
			>
				<p>Leads</p>
				<ExternalLink size={18} color={colors.zinc[600]} />
			</div>
			<div className="flex flex-wrap items-start gap-4 my-2">
				<div className="flex-1 rounded-xl py-5 md:border md:border-zinc-50 md:p-4">
					<div className="flex justify-between items-center my-4">
						<p>Recent leads</p>
						<button
							className="text-xs underline hover:text-zinc-500 text-zinc-400"
							onClick={() => router.push("/leads")}
						>
							View all
						</button>
					</div>
					<div className="overflow-x-auto">
						<table className="min-w-full bg-white border">
							<thead className="hover:bg-zinc-50">
								<tr>
									<th
										className="py-2 px-4 border-b text-left text-sm text-zinc-400 cursor-pointer"
										onClick={() => requestSort("name")}
									>
										<div className="flex justify-between items-center">
											<span className="ml-2">User Info</span>
											{sortConfig?.direction === "ascending" ? (
												<ChevronUp size={16} color={colors.zinc[500]} />
											) : (
												<ChevronDown size={16} color={colors.zinc[500]} />
											)}
										</div>
									</th>
									<th className="py-2 px-4 border-b text-left text-sm text-zinc-400 cursor-pointer">
										<div className="flex justify-between items-center">
											<span className="ml-2">Email</span>
										</div>
									</th>
									<th className="py-2 px-4 border-b text-left text-sm text-zinc-400">
										Actions
									</th>
								</tr>
							</thead>
							<tbody>
								{sortedLeads.map((lead) => (
									<tr key={lead.id} className="hover:bg-zinc-50">
										<td className="py-2 px-4 flex items-center gap-2">
											<img
												src={lead.image}
												alt={lead.name}
												className="w-10 h-10 rounded-full mr-2"
											/>
											<span>{lead.name}</span>
										</td>
										<td className="py-2 px-4">{lead.email}</td>
										<td className="py-1 px-4 flex items-center gap-2">
											<Phone size={16} color={colors.zinc[700]} />
											<MessageCircle size={16} color={colors.zinc[700]} />
											<Eye size={16} color={colors.zinc[700]} />
											<Pen size={16} color={colors.zinc[700]} />
											<Trash
												size={16}
												color={colors.zinc[700]}
												onClick={() => toast.info(`Removing lead: ${lead.id}`)}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
				<div className="flex-1 py-6 rounded-xl mx-1 gap-10 transition-all duration-300 ease-in-out transform md:border md:border-zinc-50 md:p-4">
					<div className="flex items-center gap-2 justify-start my-4 pl-8">
						<span>Total Leads: {dashboardData.stats.totalLeads}</span>
					</div>
					<ResponsiveContainer width="100%" height={400}>
						<AreaChart data={sampleData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis dataKey="name" />
							<YAxis />
							<Tooltip />
							<Legend />
							<Area
								type="monotone"
								dataKey="leads"
								stroke="#4a90e2"
								fill="#4a90e2"
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
			<div
				className="flex items-center gap-1 hover:underline cursor-pointer"
				onClick={() => router.push("/stats")}
			>
				<p>Stats</p>
				<ExternalLink size={18} color={colors.zinc[600]} />
			</div>
			<div className="py-1 mb-4">
				<div className="flex sm:flex-wrap gap-4 my-2 w-full">
					<div className="bg-opacity-30 flex-1 p-6 rounded-xl mx-1 hover:bg-zinc-50 transition-all duration-300 ease-in-out transform hover:scale-105 border border-zinc-100">
						<div className="flex items-center gap-2 justify-start my-4">
							<BiParty className="text-indigo-500 mb-2" />
							<span className="text-lg">
								Sales: {dashboardData.stats.sales}
							</span>
						</div>
						<ResponsiveContainer width="100%" height={200}>
							<BarChart data={sampleData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="sales" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="sales" fill="#27ae60" />
							</BarChart>
						</ResponsiveContainer>
					</div>
					<div className="bg-opacity-30 flex-1 p-6 rounded-xl mx-1 hover:bg-zinc-50 transition-all duration-300 ease-in-out transform hover:scale-105 border border-zinc-100">
						<div className="flex items-center gap-2 justify-start my-4">
							<span className="text-lg">
								Revenue: {dashboardData.stats.revenue}
							</span>
						</div>
						<ResponsiveContainer width="100%" height={200}>
							<BarChart data={sampleData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="revenue" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Bar dataKey="revenue" fill="#f39c12" />
							</BarChart>
						</ResponsiveContainer>
					</div>
					<div className="bg-opacity-30 flex-1 p-6 rounded-xl mx-1 hover:bg-zinc-50 transition-all duration-300 ease-in-out transform hover:scale-105 border border-zinc-100">
						<div className="flex items-center gap-2 justify-start my-4">
							<span className="text-lg">
								Conversion Rate: {dashboardData.stats.conversionRate}
							</span>
						</div>
						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={sampleData}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Legend />
								<Line type="monotone" dataKey="conversion" stroke="#e94e77" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
			<div
				className="flex items-center gap-1 hover:underline cursor-pointer"
				onClick={() => router.push("/tasks")}
			>
				<p>Tasks</p>
				<ExternalLink size={18} color={colors.zinc[600]} />
			</div>
			<div className="flex items-start justify-start">
				<div className="flex flex-col w-full md:w-1/2 gap-2 p-5 my-4 border border-zinc-100 rounded-xl hover:bg-zinc-50">
					{dashboardData.upcomingMeetings.map((meeting, index) => (
						<div className="flex items-center justify-between mb-2" key={index}>
							<span className="text-zinc-600 w-1/3 text-left">
								{meeting.title}:
							</span>
							<span className="text-zinc-600 w-1/3 text-left">
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
