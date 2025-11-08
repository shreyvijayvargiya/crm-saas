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
import colors from "tailwindcss/colors";

const ApiKeys = () => {
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
		<div className="p-6 overflow-y-scroll max-h-screen hidescrollbar">
			<div className="flex justify-between items-center flex-wrap my-4">
				<div>
					<h1 className="text-2xl font-semibold text-zinc-800">API Keys</h1>
					<p className="text-sm text-zinc-600 mt-1">
						Manage and monitor your API keys.
					</p>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<div className="bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-zinc-600 mb-1">Total Usage</p>
							<p className="text-2xl font-bold text-zinc-800">
								{stats.totalUsage}
							</p>
						</div>
						<div className="bg-blue-100 p-3 rounded-xl">
							<Activity size={24} color={colors.blue[600]} />
						</div>
					</div>
				</div>

				<div className="bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-zinc-600 mb-1">Plans</p>
							<p className="text-2xl font-bold text-zinc-800">{stats.plans}</p>
						</div>
						<div className="bg-purple-100 p-3 rounded-xl">
							<CreditCard size={24} color={colors.purple[600]} />
						</div>
					</div>
				</div>

				<div className="bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-zinc-600 mb-1">Conversions</p>
							<p className="text-2xl font-bold text-zinc-800">
								{stats.conversions}
							</p>
						</div>
						<div className="bg-green-100 p-3 rounded-xl">
							<TrendingUp size={24} color={colors.green[600]} />
						</div>
					</div>
				</div>

				<div className="bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-zinc-600 mb-1">API Calls</p>
							<p className="text-2xl font-bold text-zinc-800">
								{stats.apiCalls}
							</p>
						</div>
						<div className="bg-orange-100 p-3 rounded-xl">
							<Zap size={24} color={colors.orange[600]} />
						</div>
					</div>
				</div>
			</div>

			{/* Table Section */}
			<div className="flex justify-between items-center flex-wrap my-4">
				<div className="flex md:justify-start justify-start items-center gap-2 flex-wrap">
					<div className="flex gap-2 items-center border border-zinc-100 rounded-xl px-2 py-1">
						<Search size={18} color={colors.zinc[500]} />
						<input
							type="text"
							placeholder="Search API keys..."
							className="outline-none"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
				<button
					onClick={handleAddApiKey}
					className="bg-zinc-800 hover:bg-zinc-900 rounded-xl text-white text-xs px-4 py-2 transition-all duration-100 ease-in hover:px-6 flex items-center gap-2"
				>
					<Plus size={16} />
					Add API Key
				</button>
			</div>

			<div className="">
				<table className="min-w-full border border-zinc-100 rounded">
					<thead className="hover:bg-zinc-50">
						<tr>
							<th className="py-2 px-4 border-b text-left">
								<input type="checkbox" />
							</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("name")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Name</span>
									{sortConfig?.key === "name" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} color={colors.zinc[500]} />
										) : (
											<ChevronDown size={16} color={colors.zinc[500]} />
										))}
								</div>
							</th>
							<th className="py-2 px-4 border-b text-left">API Key</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("createdAt")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Created At</span>
									{sortConfig?.key === "createdAt" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} color={colors.zinc[500]} />
										) : (
											<ChevronDown size={16} color={colors.zinc[500]} />
										))}
								</div>
							</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("updatedAt")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Updated At</span>
									{sortConfig?.key === "updatedAt" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} color={colors.zinc[500]} />
										) : (
											<ChevronDown size={16} color={colors.zinc[500]} />
										))}
								</div>
							</th>
							<th className="py-2 px-4 border-b text-left">Status</th>
							<th className="py-2 px-4 border-b text-left">Revoke</th>
						</tr>
					</thead>
					<tbody>
						{filteredApiKeys.map((apiKey) => (
							<tr key={apiKey.id} className="hover:bg-zinc-50">
								<td className="py-2 px-4">
									<input type="checkbox" className="mr-2" />
								</td>
								<td className="py-2 px-4">
									<div className="flex items-center gap-2">
										<Key size={16} color={colors.zinc[500]} />
										<span className="font-medium text-zinc-800">
											{apiKey.name}
										</span>
									</div>
								</td>
								<td className="py-2 px-4">
									<div className="flex items-center gap-2">
										<code className="text-xs bg-zinc-100 px-2 py-1 rounded text-zinc-800 font-mono">
											{apiKey.key.substring(0, 20)}...
										</code>
									</div>
								</td>
								<td className="py-2 px-4">
									<div className="flex items-center gap-2">
										<Calendar size={16} color={colors.zinc[500]} />
										<span className="text-sm text-zinc-700">
											{formatDate(apiKey.createdAt)}
										</span>
									</div>
								</td>
								<td className="py-2 px-4">
									<div className="flex items-center gap-2">
										<RefreshCw size={16} color={colors.zinc[500]} />
										<span className="text-sm text-zinc-700">
											{formatDate(apiKey.updatedAt)}
										</span>
									</div>
								</td>
								<td className="py-2 px-4">
									<span
										className={`px-2 py-1 rounded-xl text-xs font-medium ${
											apiKey.status === "Active"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{apiKey.status}
									</span>
								</td>
								<td className="py-1 px-4">
									{apiKey.status === "Active" ? (
										<button
											onClick={(e) => handleRevokeApiKey(apiKey.id, e)}
											className="text-red-600 hover:text-red-800 text-xs font-medium"
										>
											Revoke
										</button>
									) : (
										<span className="text-xs text-zinc-400">Revoked</span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex items-center justify-end my-4">
				<ChevronLeft
					size={18}
					color={colors.zinc[500]}
					className="cursor-pointer"
					onClick={() => toast.info("Previous page")}
				/>
				{Array.from({ length: 5 }, (_, index) => (
					<button
						key={index}
						className={`mx-1 px-3 py-1 rounded-xl hover:bg-zinc-50 ${
							index === 0 ? "bg-zinc-100 text-zinc-800" : "text-zinc-700"
						}`}
						onClick={() => toast.info(`Page ${index + 1}`)}
					>
						{index + 1}
					</button>
				))}
				<ChevronRight
					size={18}
					color={colors.zinc[500]}
					className="cursor-pointer"
					onClick={() => toast.info("Next page")}
				/>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-semibold text-zinc-800">
								Add New API Key
							</h2>
							<button
								onClick={handleModalClose}
								className="text-zinc-500 hover:text-zinc-700"
							>
								<X size={24} />
							</button>
						</div>

						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-zinc-700 mb-1">
									API Key Name *
								</label>
								<input
									type="text"
									name="name"
									placeholder="e.g., Production API Key"
									value={newApiKey.name}
									onChange={handleInputChange}
									className="border border-zinc-100 rounded-xl px-3 py-2 w-full outline-none focus:ring-2 focus:ring-zinc-800"
								/>
								<p className="text-xs text-zinc-500 mt-1">
									Give your API key a descriptive name for easy identification.
								</p>
							</div>
						</div>

						<div className="flex justify-end gap-2 mt-6">
							<button
								onClick={handleModalClose}
								className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-xl px-4 py-2 text-sm transition-all duration-100 ease-in"
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className="bg-zinc-800 hover:bg-zinc-900 text-white rounded-xl px-4 py-2 text-sm transition-all duration-100 ease-in hover:px-6"
							>
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
