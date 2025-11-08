import {
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
	Search,
	Plus,
	X,
	Webhook,
	Calendar,
	RefreshCw,
	Activity,
	TrendingUp,
	Globe,
	Zap,
	Copy,
	Check,
	Play,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import colors from "tailwindcss/colors";

const Webhooks = () => {
	const initialWebhooks = [
		{
			id: "wh_001",
			name: "Order Created Webhook",
			url: "https://api.example.com/webhooks/orders",
			events: ["order.created", "order.updated"],
			createdAt: "2024-01-15",
			updatedAt: "2024-06-20",
			status: "Active",
			secret: "whsec_abc123xyz456def789",
		},
		{
			id: "wh_002",
			name: "Payment Webhook",
			url: "https://payments.example.com/hooks",
			events: ["payment.succeeded", "payment.failed"],
			createdAt: "2024-02-10",
			updatedAt: "2024-06-18",
			status: "Active",
			secret: "whsec_def456uvw789ghi012",
		},
		{
			id: "wh_003",
			name: "Customer Sync",
			url: "https://sync.example.com/customers",
			events: ["customer.created", "customer.updated", "customer.deleted"],
			createdAt: "2024-03-05",
			updatedAt: "2024-06-15",
			status: "Active",
			secret: "whsec_ghi789rst012jkl345",
		},
		{
			id: "wh_004",
			name: "Invoice Webhook",
			url: "https://invoices.example.com/webhook",
			events: ["invoice.paid", "invoice.overdue"],
			createdAt: "2024-04-12",
			updatedAt: "2024-06-10",
			status: "Inactive",
			secret: "whsec_jkl012mno345pqr678",
		},
		{
			id: "wh_005",
			name: "Lead Notification",
			url: "https://notifications.example.com/leads",
			events: ["lead.created"],
			createdAt: "2024-05-20",
			updatedAt: "2024-06-08",
			status: "Active",
			secret: "whsec_pqr345stu678vwx901",
		},
	];

	const [webhooks, setWebhooks] = useState(initialWebhooks);
	const [sortConfig, setSortConfig] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [copiedId, setCopiedId] = useState(null);
	const [newWebhook, setNewWebhook] = useState({
		name: "",
		url: "",
		events: [],
	});

	const availableEvents = [
		"order.created",
		"order.updated",
		"order.cancelled",
		"payment.succeeded",
		"payment.failed",
		"customer.created",
		"customer.updated",
		"customer.deleted",
		"invoice.paid",
		"invoice.overdue",
		"lead.created",
		"lead.updated",
	];

	const stats = {
		totalWebhooks: webhooks.length.toString(),
		activeWebhooks: webhooks
			.filter((w) => w.status === "Active")
			.length.toString(),
		totalEvents: "1,234",
		successRate: "98.5%",
	};

	const handleAddWebhook = () => setIsModalOpen(true);

	const handleModalClose = () => {
		setIsModalOpen(false);
		setNewWebhook({
			name: "",
			url: "",
			events: [],
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewWebhook((prev) => ({ ...prev, [name]: value }));
	};

	const handleEventToggle = (event) => {
		setNewWebhook((prev) => {
			const events = prev.events.includes(event)
				? prev.events.filter((e) => e !== event)
				: [...prev.events, event];
			return { ...prev, events };
		});
	};

	const handleSubmit = () => {
		if (!newWebhook.name.trim()) {
			toast.error("Please enter a webhook name!");
			return;
		}
		if (!newWebhook.url.trim()) {
			toast.error("Please enter a webhook URL!");
			return;
		}
		if (newWebhook.events.length === 0) {
			toast.error("Please select at least one event!");
			return;
		}

		const webhookToAdd = {
			id: `wh_${String(webhooks.length + 1).padStart(3, "0")}`,
			name: newWebhook.name,
			url: newWebhook.url,
			events: newWebhook.events,
			createdAt: new Date().toISOString().split("T")[0],
			updatedAt: new Date().toISOString().split("T")[0],
			status: "Active",
			secret: `whsec_${Math.random()
				.toString(36)
				.substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
		};

		setWebhooks((prevWebhooks) => [...prevWebhooks, webhookToAdd]);
		toast.success(`Webhook "${webhookToAdd.name}" created successfully!`);
		handleModalClose();
	};

	const handleToggleStatus = (webhookId, e) => {
		e.stopPropagation();
		setWebhooks((prevWebhooks) =>
			prevWebhooks.map((webhook) =>
				webhook.id === webhookId
					? {
							...webhook,
							status: webhook.status === "Active" ? "Inactive" : "Active",
							updatedAt: new Date().toISOString().split("T")[0],
					  }
					: webhook
			)
		);
		toast.success("Webhook status updated successfully!");
	};

	const handleDeleteWebhook = (webhookId, e) => {
		e.stopPropagation();
		setWebhooks((prevWebhooks) =>
			prevWebhooks.filter((webhook) => webhook.id !== webhookId)
		);
		toast.success("Webhook deleted successfully!");
	};

	const handleCopySecret = (secret, id) => {
		navigator.clipboard.writeText(secret);
		setCopiedId(id);
		toast.success("Secret copied to clipboard!");
		setTimeout(() => setCopiedId(null), 2000);
	};

	const handleTestWebhook = (webhook, e) => {
		e.stopPropagation();
		toast.info(`Testing webhook: ${webhook.name}`);
		// Simulate webhook test
		setTimeout(() => {
			toast.success(`Webhook test successful!`);
		}, 1500);
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

	const sortedWebhooks = useMemo(() => {
		let sortableWebhooks = [...webhooks];
		if (sortConfig !== null) {
			sortableWebhooks.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key])
					return sortConfig.direction === "ascending" ? -1 : 1;
				if (a[sortConfig.key] > b[sortConfig.key])
					return sortConfig.direction === "ascending" ? 1 : -1;
				return 0;
			});
		}
		return sortableWebhooks;
	}, [webhooks, sortConfig]);

	const filteredWebhooks = useMemo(() => {
		if (!searchTerm) return sortedWebhooks;
		return sortedWebhooks.filter(
			(webhook) =>
				webhook.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				webhook.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
				webhook.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
				webhook.events.some((event) =>
					event.toLowerCase().includes(searchTerm.toLowerCase())
				)
		);
	}, [sortedWebhooks, searchTerm]);

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
					<h1 className="text-2xl font-semibold text-zinc-800">Webhooks</h1>
					<p className="text-sm text-zinc-600 mt-1">
						Manage and monitor your webhook endpoints.
					</p>
				</div>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<div className="bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-zinc-600 mb-1">Total Webhooks</p>
							<p className="text-2xl font-bold text-zinc-800">
								{stats.totalWebhooks}
							</p>
						</div>
						<div className="bg-blue-100 p-3 rounded-xl">
							<Webhook size={24} color={colors.blue[600]} />
						</div>
					</div>
				</div>

				<div className="bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-zinc-600 mb-1">Active Webhooks</p>
							<p className="text-2xl font-bold text-zinc-800">
								{stats.activeWebhooks}
							</p>
						</div>
						<div className="bg-green-100 p-3 rounded-xl">
							<Activity size={24} color={colors.green[600]} />
						</div>
					</div>
				</div>

				<div className="bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-zinc-600 mb-1">Total Events</p>
							<p className="text-2xl font-bold text-zinc-800">
								{stats.totalEvents}
							</p>
						</div>
						<div className="bg-purple-100 p-3 rounded-xl">
							<TrendingUp size={24} color={colors.purple[600]} />
						</div>
					</div>
				</div>

				<div className="bg-white border border-zinc-100 rounded-xl p-6 hover:shadow-md transition-shadow">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-zinc-600 mb-1">Success Rate</p>
							<p className="text-2xl font-bold text-zinc-800">
								{stats.successRate}
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
							placeholder="Search webhooks..."
							className="outline-none"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
				<button
					onClick={handleAddWebhook}
					className="bg-zinc-800 hover:bg-zinc-900 rounded-xl text-white text-xs px-4 py-2 transition-all duration-100 ease-in hover:px-6 flex items-center gap-2"
				>
					<Plus size={16} />
					Add Webhook
				</button>
			</div>

			<div className="overflow-x-auto">
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
							<th className="py-2 px-4 border-b text-left">URL</th>
							<th className="py-2 px-4 border-b text-left">Events</th>
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
							<th className="py-2 px-4 border-b text-left">Status</th>
							<th className="py-2 px-4 border-b text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredWebhooks.map((webhook) => (
							<tr key={webhook.id} className="hover:bg-zinc-50">
								<td className="py-2 px-4">
									<input type="checkbox" className="mr-2" />
								</td>
								<td className="py-2 px-4">
									<div className="flex items-center gap-2">
										<Webhook size={16} color={colors.zinc[500]} />
										<span className="font-medium text-zinc-800">
											{webhook.name}
										</span>
									</div>
								</td>
								<td className="py-2 px-4">
									<div className="flex items-center gap-2 max-w-xs">
										<Globe size={16} color={colors.zinc[500]} />
										<code className="text-xs bg-zinc-100 px-2 py-1 rounded text-zinc-800 font-mono truncate">
											{webhook.url}
										</code>
									</div>
								</td>
								<td className="py-2 px-4">
									<div className="flex flex-wrap gap-1">
										{webhook.events.slice(0, 2).map((event) => (
											<span
												key={event}
												className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
											>
												{event}
											</span>
										))}
										{webhook.events.length > 2 && (
											<span className="text-xs bg-zinc-100 text-zinc-800 px-2 py-1 rounded">
												+{webhook.events.length - 2}
											</span>
										)}
									</div>
								</td>
								<td className="py-2 px-4">
									<div className="flex items-center gap-2">
										<Calendar size={16} color={colors.zinc[500]} />
										<span className="text-sm text-zinc-700">
											{formatDate(webhook.createdAt)}
										</span>
									</div>
								</td>
								<td className="py-2 px-4">
									<span
										className={`px-2 py-1 rounded-xl text-xs font-medium ${
											webhook.status === "Active"
												? "bg-green-100 text-green-800"
												: "bg-red-100 text-red-800"
										}`}
									>
										{webhook.status}
									</span>
								</td>
								<td className="py-1 px-4">
									<div className="flex items-center gap-2">
										<button
											onClick={(e) => handleTestWebhook(webhook, e)}
											className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
											title="Test Webhook"
										>
											<Play size={14} />
										</button>
										<button
											onClick={(e) => handleToggleStatus(webhook.id, e)}
											className={`text-xs font-medium ${
												webhook.status === "Active"
													? "text-orange-600 hover:text-orange-800"
													: "text-green-600 hover:text-green-800"
											}`}
										>
											{webhook.status === "Active" ? "Deactivate" : "Activate"}
										</button>
										<button
											onClick={(e) => handleDeleteWebhook(webhook.id, e)}
											className="text-red-600 hover:text-red-800 text-xs font-medium"
										>
											Delete
										</button>
									</div>
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
					<div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-semibold text-zinc-800">
								Add New Webhook
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
									Webhook Name *
								</label>
								<input
									type="text"
									name="name"
									placeholder="e.g., Order Created Webhook"
									value={newWebhook.name}
									onChange={handleInputChange}
									className="border border-zinc-100 rounded-xl px-3 py-2 w-full outline-none focus:ring-2 focus:ring-zinc-800"
								/>
								<p className="text-xs text-zinc-500 mt-1">
									Give your webhook a descriptive name for easy identification.
								</p>
							</div>

							<div>
								<label className="block text-sm font-medium text-zinc-700 mb-1">
									Webhook URL *
								</label>
								<input
									type="url"
									name="url"
									placeholder="https://api.example.com/webhooks"
									value={newWebhook.url}
									onChange={handleInputChange}
									className="border border-zinc-100 rounded-xl px-3 py-2 w-full outline-none focus:ring-2 focus:ring-zinc-800"
								/>
								<p className="text-xs text-zinc-500 mt-1">
									The endpoint URL where webhook events will be sent.
								</p>
							</div>

							<div>
								<label className="block text-sm font-medium text-zinc-700 mb-2">
									Events *
								</label>
								<div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-zinc-100 rounded-xl p-3">
									{availableEvents.map((event) => (
										<label
											key={event}
											className="flex items-center gap-2 cursor-pointer hover:bg-zinc-50 p-2 rounded"
										>
											<input
												type="checkbox"
												checked={newWebhook.events.includes(event)}
												onChange={() => handleEventToggle(event)}
												className="rounded"
											/>
											<span className="text-sm text-zinc-700">{event}</span>
										</label>
									))}
								</div>
								<p className="text-xs text-zinc-500 mt-1">
									Select the events that will trigger this webhook.
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
								Create Webhook
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Webhooks;
