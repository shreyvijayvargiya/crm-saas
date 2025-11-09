import {
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
	Search,
	Plus,
	X,
	Key,
	Calendar,
	RefreshCw,
	Activity,
	TrendingUp,
	CreditCard,
	Zap,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const ApiKeys = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewApiKey((prev) => ({ ...prev, [name]: value }));
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
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar ${colors.background} transition-colors`}
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
				{/* Total Usage Card */}
				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-shadow`}
				>
					{/* Background Gradient Shapes */}
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-10 -left-10 w-24 h-24 bg-blue-400/20 rounded-full blur-2xl"></div>
					<div className="relative z-10 flex items-center justify-between">
						<div>
							<p className={`text-sm ${colors.mutedForeground} mb-1`}>
								Total Usage
							</p>
							<p className={`text-2xl font-bold ${colors.foreground}`}>
								{stats.totalUsage}
							</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
							<Activity
								size={24}
								className="text-blue-600 dark:text-blue-400"
							/>
						</div>
					</div>
				</div>

				{/* Plans Card */}
				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-shadow`}
				>
					{/* Background Gradient Shapes */}
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"></div>
					<div className="relative z-10 flex items-center justify-between">
						<div>
							<p className={`text-sm ${colors.mutedForeground} mb-1`}>Plans</p>
							<p className={`text-2xl font-bold ${colors.foreground}`}>
								{stats.plans}
							</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
							<CreditCard
								size={24}
								className="text-purple-600 dark:text-purple-400"
							/>
						</div>
					</div>
				</div>

				{/* Conversions Card */}
				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-shadow`}
				>
					{/* Background Gradient Shapes */}
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-10 -left-10 w-24 h-24 bg-green-400/20 rounded-full blur-2xl"></div>
					<div className="relative z-10 flex items-center justify-between">
						<div>
							<p className={`text-sm ${colors.mutedForeground} mb-1`}>
								Conversions
							</p>
							<p className={`text-2xl font-bold ${colors.foreground}`}>
								{stats.conversions}
							</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20">
							<TrendingUp
								size={24}
								className="text-green-600 dark:text-green-400"
							/>
						</div>
					</div>
				</div>

				{/* API Calls Card */}
				<div
					className={`relative overflow-hidden ${colors.card} border ${colors.border} rounded-2xl p-6 ${colors.shadow} hover:shadow-xl transition-shadow`}
				>
					{/* Background Gradient Shapes */}
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>
					<div className="absolute -bottom-10 -left-10 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl"></div>
					<div className="relative z-10 flex items-center justify-between">
						<div>
							<p className={`text-sm ${colors.mutedForeground} mb-1`}>
								API Calls
							</p>
							<p className={`text-2xl font-bold ${colors.foreground}`}>
								{stats.apiCalls}
							</p>
						</div>
						<div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm border border-orange-500/20">
							<Zap size={24} className="text-orange-600 dark:text-orange-400" />
						</div>
					</div>
				</div>
			</div>

			{/* API Keys Table - Improved */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden my-4`}
			>
				{/* Table Header */}
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
						{/* Search */}
						<div
							className={`relative flex gap-2 items-center border ${colors.border} rounded-xl px-3 py-2 ${colors.card} w-full md:w-auto`}
						>
							<Search className={colors.textSecondary} size={18} />
							<input
								type="text"
								placeholder="Search API keys..."
								className={`outline-none flex-1 ${colors.background} ${
									colors.foreground
								} placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						{/* Add API Key Button */}
						<button
							onClick={handleAddApiKey}
							className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded-xl text-sm px-4 py-2 transition-all duration-200 font-medium flex items-center gap-2`}
						>
							<Plus size={16} />
							Add API Key
						</button>
					</div>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className={`${colors.muted} border-b ${colors.border}`}>
							<tr>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									<input
										type="checkbox"
										className={getFocusRingClass(colorScheme)}
									/>
								</th>
								<th
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
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									API Key
								</th>
								<th
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
								</th>
								<th
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
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Status
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{filteredApiKeys.length === 0 ? (
								<tr>
									<td colSpan="7" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No API keys found</p>
									</td>
								</tr>
							) : (
								filteredApiKeys.map((apiKey) => (
									<tr
										key={apiKey.id}
										className={`${colors.hover} transition-colors`}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<input
												type="checkbox"
												className={getFocusRingClass(colorScheme)}
											/>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<Key size={16} className={colors.textSecondary} />
												<span
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{apiKey.name}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<code
												className={`text-xs ${colors.muted} px-3 py-1.5 rounded-lg ${colors.foreground} font-mono border ${colors.border}`}
											>
												{apiKey.key.substring(0, 20)}...
											</code>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<Calendar size={16} className={colors.textSecondary} />
												<span className={`text-sm ${colors.textSecondary}`}>
													{formatDate(apiKey.createdAt)}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<RefreshCw size={16} className={colors.textSecondary} />
												<span className={`text-sm ${colors.textSecondary}`}>
													{formatDate(apiKey.updatedAt)}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2.5 py-1 rounded-md text-xs font-medium border ${
													apiKey.status === "Active"
														? theme === "dark"
															? "bg-green-900/30 text-green-400 border-green-800/50"
															: "bg-green-100 text-green-800"
														: theme === "dark"
														? "bg-red-900/30 text-red-400 border-red-800/50"
														: "bg-red-100 text-red-800"
												}`}
											>
												{apiKey.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											{apiKey.status === "Active" ? (
												<button
													onClick={(e) => handleRevokeApiKey(apiKey.id, e)}
													className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
														theme === "dark"
															? "text-red-400 hover:bg-red-900/20"
															: "text-red-600 hover:bg-red-50"
													}`}
												>
													Revoke
												</button>
											) : (
												<span className={`text-xs ${colors.textMuted}`}>
													Revoked
												</span>
											)}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Add New API Key Modal */}
			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={handleModalClose}
				>
					<div
						className={`${colors.card} rounded-xl ${colors.shadow} max-w-md w-full overflow-y-auto`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div
							className={`flex items-center justify-between p-6 border-b ${colors.border}`}
						>
							<div>
								<h2 className={`text-xl font-semibold ${colors.foreground}`}>
									Add New API Key
								</h2>
								<p className={`text-sm ${colors.mutedForeground} mt-1`}>
									Create a new API key for your application
								</p>
							</div>
							<button
								onClick={handleModalClose}
								className={`p-2 ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								<X className={`w-5 h-5 ${colors.mutedForeground}`} />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-6 space-y-4">
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									API Key Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="name"
									placeholder="e.g., Production API Key"
									value={newApiKey.name}
									onChange={handleInputChange}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${
										colors.mutedForeground
									}`}
								/>
								<p className={`text-xs ${colors.textMuted} mt-2`}>
									Give your API key a descriptive name for easy identification.
								</p>
							</div>
						</div>

						{/* Modal Footer */}
						<div
							className={`flex items-center justify-end gap-3 p-6 border-t ${colors.border}`}
						>
							<button
								onClick={handleModalClose}
								className={`px-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className={`px-4 py-2 text-sm font-medium ${scheme.primaryForeground} ${scheme.primary} ${scheme.primaryHover} rounded-xl transition-colors flex items-center gap-2`}
							>
								<Plus size={16} />
								Create API Key
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ApiKeys;
