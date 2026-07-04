import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	PlusCircle,
	Search,
	ChevronUp,
	ChevronDown,
	Building2,
	Star,
	Layers,
	MapPin,
	Eye,
	Pen,
	Trash,
} from "lucide-react";
import { CategoryBarChartCard } from "@/components/charts/CategoryBarChartCard";
import { ExportDropdown } from "../../lib/ui/dropdown";
import { toast } from "sonner";
import { Pagination } from "../../modules";
import { useTheme } from "../../utils/useTheme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { FormModal, FormField } from "../../lib/ui/modal";
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
	INITIAL_COMPANIES,
	companySlug,
} from "../CRM/companiesSeedData";

const Companies = () => {
	const router = useRouter();
	// Theme hook
	const { theme, colors } = useTheme();

	const [companies, setCompanies] = useState(INITIAL_COMPANIES);

	const [searchTerm, setSearchTerm] = useState("");
	const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
	const [newCompany, setNewCompany] = useState({
		name: "",
		owner: "",
		logo: "",
		industry: "",
		rating: "",
		location: "",
	});
	const [sortConfig, setSortConfig] = useState({
		key: "name",
		direction: "ascending",
	});

	const handleAddCompany = () => {
		setCompanies((prevCompanies) => [
			...prevCompanies,
			{
				...newCompany,
				id: companySlug(newCompany.name) || `company-${Date.now()}`,
				rating: parseFloat(newCompany.rating),
			},
		]);
		setNewCompany({
			name: "",
			owner: "",
			logo: "",
			industry: "",
			rating: "",
			location: "",
		});
		setIsAddCompanyModalOpen(false);
	};

	const filteredCompanies = companies.filter((company) =>
		company.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const sortedCompanies = [...filteredCompanies].sort((a, b) => {
		const key = sortConfig.key;
		if (key === "rating") {
			return sortConfig.direction === "ascending"
				? a.rating - b.rating
				: b.rating - a.rating;
		}
		if (a[key] < b[key]) {
			return sortConfig.direction === "ascending" ? -1 : 1;
		}
		if (a[key] > b[key]) {
			return sortConfig.direction === "ascending" ? 1 : -1;
		}
		return 0;
	});

	const requestSort = (key) => {
		let direction = "ascending";
		if (sortConfig.key === key && sortConfig.direction === "ascending") {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const handleExportCompaniesCsv = () => {
		const header = "name,owner,industry,rating,location";
		const rows = sortedCompanies.map(
			(c) =>
				`${c.name},${c.owner},${c.industry},${c.rating},${c.location}`
		);
		const csvContent =
			"data:text/csv;charset=utf-8," + [header, ...rows].join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "companies.csv");
		document.body.appendChild(link);
		link.click();
		link.remove();
		toast.success("Exported companies (CSV).");
	};

	const companyStats = useMemo(() => {
		const total = companies.length;
		const avgRating =
			total > 0
				? Math.round(
						(companies.reduce((s, c) => s + c.rating, 0) / total) * 10
				  ) / 10
				: 0;
		const industries = new Set(companies.map((c) => c.industry)).size;
		const locations = new Set(companies.map((c) => c.location)).size;
		return { total, avgRating, industries, locations };
	}, [companies]);

	const industryChartData = useMemo(() => {
		const m = {};
		companies.forEach((c) => {
			m[c.industry] = (m[c.industry] || 0) + 1;
		});
		return Object.entries(m)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count);
	}, [companies]);

	const locationChartData = useMemo(() => {
		const m = {};
		companies.forEach((c) => {
			m[c.location] = (m[c.location] || 0) + 1;
		});
		return Object.entries(m)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => b.count - a.count)
			.slice(0, 10);
	}, [companies]);

	return (
		<div className={`p-6 transition-colors`}>
			{/* Stats + charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
								<Building2 className="text-blue-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{companyStats.total}</p>
						<p className="text-sm text-muted-foreground mt-1">Total companies</p>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-amber-400/20 to-amber-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 backdrop-blur-sm border border-amber-500/20">
								<Star className="text-amber-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{companyStats.avgRating}</p>
						<p className="text-sm text-muted-foreground mt-1">Average rating</p>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
								<Layers className="text-purple-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{companyStats.industries}</p>
						<p className="text-sm text-muted-foreground mt-1">Unique industries</p>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-teal-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 backdrop-blur-sm border border-teal-500/20">
								<MapPin className="text-teal-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{companyStats.locations}</p>
						<p className="text-sm text-muted-foreground mt-1">Unique locations</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<CategoryBarChartCard
					title="Companies by industry"
					description="Matches unique industries and totals"
					data={industryChartData}
					valueLabel="Companies"
					color="hsl(var(--chart-2))"
					xTickAngle={-25}
					heightClass="h-[260px]"
				/>
				<CategoryBarChartCard
					title="Companies by location"
					description={`Top cities (unique location count: ${companyStats.locations})`}
					data={locationChartData}
					valueLabel="Companies"
					color="hsl(var(--chart-4))"
					xTickAngle={-25}
					heightClass="h-[260px]"
				/>
			</div>

			{/* Companies Table - Improved */}
			{/* Table Header */}
			<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between p-2 gap-4`}
				>
					<div className="flex-1">
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Companies
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							View and manage all your companies
						</p>
					</div>
					<div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
						<div className="relative flex gap-2 items-center w-full md:w-auto">
							<Search size={18} className="absolute left-3 text-muted-foreground pointer-events-none" />
							<Input
								type="text"
								placeholder="Search companies..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>
						<Button onClick={() => setIsAddCompanyModalOpen(true)}>
							<PlusCircle size={16} />
							Add Company
						</Button>
						<ExportDropdown
							onExportCsv={handleExportCompaniesCsv}
							onExportPdf={handleExportCompaniesCsv}
							onExportJson={handleExportCompaniesCsv}
						/>
					</div>
				</div>
			<Card className="overflow-hidden my-4">
				

				{/* Table */}
				<Table className="w-full">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Logo
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("name")}
								>
									<div className="flex items-center gap-2">
										Name
										{sortConfig.key === "name" && (
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
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("owner")}
								>
									<div className="flex items-center gap-2">
										Owner
										{sortConfig.key === "owner" && (
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
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("industry")}
								>
									<div className="flex items-center gap-2">
										Industry
										{sortConfig.key === "industry" && (
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
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("rating")}
								>
									<div className="flex items-center gap-2">
										Rating
										{sortConfig.key === "rating" && (
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
									Location
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.card} divide-y ${colors.border}`}>
							{sortedCompanies.length === 0 ? (
								<TableRow>
									<TableCell colSpan="7" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No companies found</p>
									</TableCell>
								</TableRow>
							) : (
								sortedCompanies.map((company) => (
									<TableRow
										key={company.id}
										className={`${colors.hover} transition-colors cursor-pointer`}
										onClick={() => router.push(`/companies/${company.id}`)}
									>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<img
												src={company.logo}
												alt={company.name}
												className="w-10 h-10 rounded-full border-2 border-zinc-200"
											/>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<Link href={`/companies/${company.id}`} passHref>
												<a
													className={`text-sm font-medium ${colors.foreground} hover:underline`}
												>
													{company.name}
												</a>
											</Link>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{company.owner}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{company.industry}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-1">
												<span
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{company.rating}
												</span>
												<span className={`text-xs ${colors.textMuted}`}>★</span>
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{company.location}
											</div>
										</TableCell>
										<TableCell
											className="px-6 py-4 whitespace-nowrap"
											onClick={(e) => e.stopPropagation()}
										>
											<div className="flex items-center gap-1">
												<Button variant="ghost" size="icon" asChild title="View company">
													<Link href={`/companies/${company.id}`}>
														<a>
															<Eye size={16} />
														</a>
													</Link>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													title="Edit"
													onClick={() => toast.info(`Edit ${company.name}`)}
												>
													<Pen size={16} />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													title="Delete"
													onClick={() => toast.info(`Delete ${company.name}`)}
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

			<FormModal
				open={isAddCompanyModalOpen}
				onClose={() => setIsAddCompanyModalOpen(false)}
				title="Add New Company"
				subtitle="Create a new company in your database"
				onSubmit={handleAddCompany}
				saveLabel="Add Company"
			>
				<FormField label="Name" htmlFor="company-name" required>
					<Input
						id="company-name"
						type="text"
						placeholder="Enter company name"
						value={newCompany.name}
						onChange={(e) =>
							setNewCompany({ ...newCompany, name: e.target.value })
						}
					/>
				</FormField>
				<FormField label="Owner" htmlFor="company-owner">
					<Input
						id="company-owner"
						type="text"
						placeholder="Enter owner name"
						value={newCompany.owner}
						onChange={(e) =>
							setNewCompany({ ...newCompany, owner: e.target.value })
						}
					/>
				</FormField>
				<FormField label="Logo URL" htmlFor="company-logo">
					<Input
						id="company-logo"
						type="text"
						placeholder="https://example.com/logo.png"
						value={newCompany.logo}
						onChange={(e) =>
							setNewCompany({ ...newCompany, logo: e.target.value })
						}
					/>
				</FormField>
				<FormField label="Industry" htmlFor="company-industry">
					<Input
						id="company-industry"
						type="text"
						placeholder="Enter industry"
						value={newCompany.industry}
						onChange={(e) =>
							setNewCompany({ ...newCompany, industry: e.target.value })
						}
					/>
				</FormField>
				<FormField label="Rating" htmlFor="company-rating">
					<Input
						id="company-rating"
						type="number"
						placeholder="0.0 - 5.0"
						min="0"
						max="5"
						step="0.1"
						value={newCompany.rating}
						onChange={(e) =>
							setNewCompany({ ...newCompany, rating: e.target.value })
						}
					/>
				</FormField>
				<FormField label="Location" htmlFor="company-location">
					<Input
						id="company-location"
						type="text"
						placeholder="Enter location"
						value={newCompany.location}
						onChange={(e) =>
							setNewCompany({ ...newCompany, location: e.target.value })
						}
					/>
				</FormField>
			</FormModal>
			<Pagination />
		</div>
	);
};

export default Companies;
