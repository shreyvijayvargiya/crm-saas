import {
	ChevronDown,
	ChevronUp,
	Search,
	Plus,
	Key,
	Calendar,
	RefreshCw,
	Activity,
	TrendingUp,
	CreditCard,
	Zap,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";

const ApiKeys = () => {
	const { theme, colorScheme, colors } = useTheme();

	const initialApiKeys = [
		{
			id: "ak_001",
			name: "Production API Key",
			key: "sk_live_abc123xyz456def789",
			createdAt: "2024-01-15",
			updatedAt: "2024-06-20",
			status: "Active",
		},
		{
			id: "ak_002",
			name: "Development Key",
			key: "sk_test_def456uvw789ghi012",
			createdAt: "2024-02-10",
			updatedAt: "2024-06-18",
			status: "Active",
		},
		{
			id: "ak_003",
			name: "Staging Environment",
			key: "sk_staging_ghi789rst012jkl345",
			createdAt: "2024-03-05",
			updatedAt: "2024-06-15",
			status: "Active",
		},
		{
			id: "ak_004",
			name: "Mobile App Key",
			key: "sk_mobile_jkl012mno345pqr678",
			createdAt: "2024-04-12",
			updatedAt: "2024-06-10",
			status: "Revoked",
		},
		{
			id: "ak_005",
			name: "Third-party Integration",
			key: "sk_integration_pqr345stu678vwx901",
			createdAt: "2024-05-20",
			updatedAt: "2024-06-08",
			status: "Active",
		},
	];

	const [apiKeys, setApiKeys] = useState(initialApiKeys);
	const [sortConfig, setSortConfig] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [newApiKey, setNewApiKey] = useState({
		name: "",
	});

	const stats = {
		totalUsage: "1,234,567",
		plans: "12",
		conversions: "8,945",
		apiCalls: "456,789",
	};

	const handleAddApiKey = () => setIsModalOpen(true);

	const handleModalClose = () => {
		setIsModalOpen(false);
		setNewApiKey({
			name: "",
		});
	};

	const handleSubmit = () => {
		if (!newApiKey.name.trim()) {
			toast.error("Please enter an API key name!");
			return;
		}

		const apiKeyToAdd = {
			id: `ak_${String(apiKeys.length + 1).padStart(3, "0")}`,
			name: newApiKey.name,
			key: `sk_live_${Math.random()
				.toString(36)
				.substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
			createdAt: new Date().toISOString().split("T")[0],
			updatedAt: new Date().toISOString().split("T")[0],
			status: "Active",
		};

		setApiKeys((prevApiKeys) => [...prevApiKeys, apiKeyToAdd]);
		toast.success(`API Key "${apiKeyToAdd.name}" created successfully!`);
		toast.info(`Your API key: ${apiKeyToAdd.key}`);
		handleModalClose();
	};

	const handleRevokeApiKey = (apiKeyId, e) => {
		e.stopPropagation();
		setApiKeys((prevApiKeys) =>
			prevApiKeys.map((key) =>
				key.id === apiKeyId
					? {
							...key,
							status: "Revoked",
							updatedAt: new Date().toISOString().split("T")[0],
					  }
					: key
			)
		);
		toast.success("API key revoked successfully!");
	};

	const requestSort = (key) => {
		let direction = "ascending";
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "ascending"
		) {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const sortedApiKeys = useMemo(() => {
		let sortableApiKeys = [...apiKeys];
		if (sortConfig !== null) {
			sortableApiKeys.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key])
					return sortConfig.direction === "ascending" ? -1 : 1;
				if (a[sortConfig.key] > b[sortConfig.key])
					return sortConfig.direction === "ascending" ? 1 : -1;
				return 0;
			});
		}
		return sortableApiKeys;
	}, [apiKeys, sortConfig]);

	const filteredApiKeys = useMemo(() => {
		if (!searchTerm) return sortedApiKeys;
		return sortedApiKeys.filter(
			(apiKey) =>
				apiKey.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				apiKey.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
				apiKey.status.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [sortedApiKeys, searchTerm]);

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar transition-all duration-100 ease-in`}
		>
			<div className="flex justify-between items-center flex-wrap my-4">
				<div>
					<h1 className={`text-2xl font-semibold ${colors.foreground}`}>
						API Keys
					</h1>
					<p className={`text-sm ${colors.textSecondary} mt-1`}>
						Manage and monitor your API keys.
					</p>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
					<div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl" />
					<CardContent className="relative z-10 p-6 flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground mb-1">Total Usage</p>
							<p className="text-2xl font-bold">{stats.totalUsage}</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
							<Activity size={24} className="text-blue-600 dark:text-blue-400" />
						</div>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
					<div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl" />
					<CardContent className="relative z-10 p-6 flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground mb-1">Plans</p>
							<p className="text-2xl font-bold">{stats.plans}</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
							<CreditCard size={24} className="text-purple-600 dark:text-purple-400" />
						</div>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl" />
					<div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-400/20 rounded-full blur-2xl" />
					<CardContent className="relative z-10 p-6 flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground mb-1">Conversions</p>
							<p className="text-2xl font-bold">{stats.conversions}</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20">
							<TrendingUp size={24} className="text-green-600 dark:text-green-400" />
						</div>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" />
					<div className="absolute -bottom-10 -left-10 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl" />
					<CardContent className="relative z-10 p-6 flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground mb-1">API Calls</p>
							<p className="text-2xl font-bold">{stats.apiCalls}</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm border border-orange-500/20">
							<Zap size={24} className="text-orange-600 dark:text-orange-400" />
						</div>
					</CardContent>
				</Card>
			</div>

			{/* API Keys Table */}
			<Card className="overflow-hidden my-4">
				<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4 border-b ${colors.border} gap-4`}
				>
					<div className="flex-1">
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							API Keys
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							View and manage all your API keys
						</p>
					</div>
					<div className="flex items-center gap-4 flex-wrap w-full md:w-auto">
						<div className="relative flex gap-2 items-center w-full md:w-auto">
							<Search size={18} className="absolute left-3 text-muted-foreground pointer-events-none" />
							<Input
								type="text"
								placeholder="Search API keys..."
								className="pl-9"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<Button onClick={handleAddApiKey}>
							<Plus size={16} />
							Add API Key
						</Button>
					</div>
				</div>

				<Table className="w-full">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									<Checkbox aria-label="Select all API keys" />
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("name")}
								>
									<div className="flex items-center gap-2">
										Name
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
									API Key
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("createdAt")}
								>
									<div className="flex items-center gap-2">
										Created At
										{sortConfig?.key === "createdAt" && (
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
									onClick={() => requestSort("updatedAt")}
								>
									<div className="flex items-center gap-2">
										Updated At
										{sortConfig?.key === "updatedAt" && (
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
									Status
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.card} divide-y ${colors.border}`}>
							{filteredApiKeys.length === 0 ? (
								<TableRow>
									<TableCell colSpan="7" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No API keys found</p>
									</TableCell>
								</TableRow>
							) : (
								filteredApiKeys.map((apiKey) => (
									<TableRow
										key={apiKey.id}
										className={`${colors.hover} transition-colors`}
									>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<Checkbox aria-label={`Select ${apiKey.name}`} />
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<Key size={16} className={colors.textSecondary} />
												<span
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{apiKey.name}
												</span>
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<code
												className={`text-xs ${colors.muted} px-3 py-1.5 rounded-xl ${colors.foreground} font-mono border ${colors.border}`}
											>
												{apiKey.key.substring(0, 20)}...
											</code>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<Calendar size={16} className={colors.textSecondary} />
												<span className={`text-sm ${colors.textSecondary}`}>
													{formatDate(apiKey.createdAt)}
												</span>
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<RefreshCw size={16} className={colors.textSecondary} />
												<span className={`text-sm ${colors.textSecondary}`}>
													{formatDate(apiKey.updatedAt)}
												</span>
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<Badge
												variant={apiKey.status === "Active" ? "secondary" : "destructive"}
												className={cn(
													apiKey.status === "Active" &&
														"bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50"
												)}
											>
												{apiKey.status}
											</Badge>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											{apiKey.status === "Active" ? (
												<Button
													variant="ghost"
													size="sm"
													onClick={(e) => handleRevokeApiKey(apiKey.id, e)}
													className="text-destructive hover:text-destructive"
												>
													Revoke
												</Button>
											) : (
												<span className={`text-xs ${colors.textMuted}`}>
													Revoked
												</span>
											)}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
			</Card>

			<FormModal
				open={isModalOpen}
				onClose={handleModalClose}
				onSubmit={handleSubmit}
				title="Add New API Key"
				subtitle="Create a new API key for your application"
				saveLabel="Create API Key"
				maxWidth="max-w-md"
			>
				<FormField
					label="API Key Name"
					htmlFor="api-key-name"
					required
					hint="Give your API key a descriptive name for easy identification."
				>
					<Input
						id="api-key-name"
						type="text"
						name="name"
						placeholder="e.g., Production API Key"
						value={newApiKey.name}
						onChange={(e) =>
							setNewApiKey((prev) => ({ ...prev, name: e.target.value }))
						}
					/>
				</FormField>
			</FormModal>
		</div>
	);
};

export default ApiKeys;
