import {
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
	Search,
	Plus,
	Webhook,
	Calendar,
	Activity,
	TrendingUp,
	Globe,
	Zap,
	Play,
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

const Webhooks = () => {
	const { theme, colorScheme, colors } = useTheme();

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

	const handleTestWebhook = (webhook, e) => {
		e.stopPropagation();
		toast.info(`Testing webhook: ${webhook.name}`);
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
		<div
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar transition-all duration-100 ease-in`}
		>
			<div className="flex justify-between items-center flex-wrap my-4">
				<div>
					<h1 className={`text-2xl font-semibold ${colors.foreground}`}>
						Webhooks
					</h1>
					<p className={`text-sm ${colors.textSecondary} mt-1`}>
						Manage and monitor your webhook endpoints.
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
				<Card>
					<CardContent className="p-6 flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground mb-1">Total Webhooks</p>
							<p className="text-2xl font-bold">{stats.totalWebhooks}</p>
						</div>
						<div className={theme === "dark" ? "bg-blue-900/30 p-3 rounded-xl" : "bg-blue-100 p-3 rounded-xl"}>
							<Webhook size={24} className="text-blue-600 dark:text-blue-400" />
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6 flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground mb-1">Active Webhooks</p>
							<p className="text-2xl font-bold">{stats.activeWebhooks}</p>
						</div>
						<div className={theme === "dark" ? "bg-green-900/30 p-3 rounded-xl" : "bg-green-100 p-3 rounded-xl"}>
							<Activity size={24} className="text-green-600 dark:text-green-400" />
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6 flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground mb-1">Total Events</p>
							<p className="text-2xl font-bold">{stats.totalEvents}</p>
						</div>
						<div className={theme === "dark" ? "bg-purple-900/30 p-3 rounded-xl" : "bg-purple-100 p-3 rounded-xl"}>
							<TrendingUp size={24} className="text-purple-600 dark:text-purple-400" />
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6 flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground mb-1">Success Rate</p>
							<p className="text-2xl font-bold">{stats.successRate}</p>
						</div>
						<div className={theme === "dark" ? "bg-orange-900/30 p-3 rounded-xl" : "bg-orange-100 p-3 rounded-xl"}>
							<Zap size={24} className="text-orange-600 dark:text-orange-400" />
						</div>
					</CardContent>
				</Card>
			</div>

			<div className="flex justify-between items-center flex-wrap my-4">
				<div className="relative flex gap-2 items-center w-full md:w-auto">
					<Search size={18} className="absolute left-3 text-muted-foreground pointer-events-none" />
					<Input
						type="text"
						placeholder="Search webhooks..."
						className="pl-9"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<Button onClick={handleAddWebhook}>
					<Plus size={16} />
					Add Webhook
				</Button>
			</div>

			<Card className="overflow-hidden">
				<Table className="w-full">
						<TableHeader className={colors.hover}>
							<TableRow>
								<TableHead className={`py-2 px-4 border-b ${colors.border} text-left`}>
									<Checkbox aria-label="Select all webhooks" />
								</TableHead>
								<TableHead
									className={`py-2 px-4 border-b ${colors.border} text-left cursor-pointer ${colors.mutedForeground} transition-colors`}
									onClick={() => requestSort("name")}
								>
									<div className="flex justify-between items-center">
										<span className="ml-2">Name</span>
										{sortConfig?.key === "name" &&
											(sortConfig.direction === "ascending" ? (
												<ChevronUp size={16} className={colors.textMuted} />
											) : (
												<ChevronDown size={16} className={colors.textMuted} />
											))}
									</div>
								</TableHead>
								<TableHead className={`py-2 px-4 border-b ${colors.border} text-left ${colors.mutedForeground}`}>
									URL
								</TableHead>
								<TableHead className={`py-2 px-4 border-b ${colors.border} text-left ${colors.mutedForeground}`}>
									Events
								</TableHead>
								<TableHead
									className={`py-2 px-4 border-b ${colors.border} text-left cursor-pointer ${colors.mutedForeground} transition-colors`}
									onClick={() => requestSort("createdAt")}
								>
									<div className="flex justify-between items-center">
										<span className="ml-2">Created At</span>
										{sortConfig?.key === "createdAt" &&
											(sortConfig.direction === "ascending" ? (
												<ChevronUp size={16} className={colors.textMuted} />
											) : (
												<ChevronDown size={16} className={colors.textMuted} />
											))}
									</div>
								</TableHead>
								<TableHead className={`py-2 px-4 border-b ${colors.border} text-left ${colors.mutedForeground}`}>
									Status
								</TableHead>
								<TableHead className={`py-2 px-4 border-b ${colors.border} text-left ${colors.mutedForeground}`}>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredWebhooks.map((webhook) => (
								<TableRow key={webhook.id} className={colors.hover}>
									<TableCell className={`py-2 px-4 ${colors.foreground}`}>
										<Checkbox aria-label={`Select ${webhook.name}`} />
									</TableCell>
									<TableCell className={`py-2 px-4 ${colors.foreground}`}>
										<div className="flex items-center gap-2">
											<Webhook size={16} className={colors.textSecondary} />
											<span className="font-medium">{webhook.name}</span>
										</div>
									</TableCell>
									<TableCell className={`py-2 px-4 ${colors.foreground}`}>
										<div className="flex items-center gap-2 max-w-xs">
											<Globe size={16} className={colors.textSecondary} />
											<code className={`text-xs ${colors.muted} px-2 py-1 rounded ${colors.foreground} font-mono truncate`}>
												{webhook.url}
											</code>
										</div>
									</TableCell>
									<TableCell className={`py-2 px-4 ${colors.foreground}`}>
										<div className="flex flex-wrap gap-1">
											{webhook.events.slice(0, 2).map((event) => (
												<Badge key={event} variant="secondary" className="text-xs">
													{event}
												</Badge>
											))}
											{webhook.events.length > 2 && (
												<Badge variant="outline" className="text-xs">
													+{webhook.events.length - 2}
												</Badge>
											)}
										</div>
									</TableCell>
									<TableCell className={`py-2 px-4 ${colors.foreground}`}>
										<div className="flex items-center gap-2">
											<Calendar size={16} className={colors.textSecondary} />
											<span className="text-sm">{formatDate(webhook.createdAt)}</span>
										</div>
									</TableCell>
									<TableCell className={`py-2 px-4 ${colors.foreground}`}>
										<Badge
											variant={webhook.status === "Active" ? "secondary" : "destructive"}
											className={cn(
												webhook.status === "Active" &&
													"bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50"
											)}
										>
											{webhook.status}
										</Badge>
									</TableCell>
									<TableCell className="py-1 px-4">
										<div className="flex items-center gap-1">
											<Button
												variant="ghost"
												size="icon"
												onClick={(e) => handleTestWebhook(webhook, e)}
												title="Test Webhook"
											>
												<Play size={14} />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={(e) => handleToggleStatus(webhook.id, e)}
											>
												{webhook.status === "Active" ? "Deactivate" : "Activate"}
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={(e) => handleDeleteWebhook(webhook.id, e)}
												className="text-destructive hover:text-destructive"
											>
												Delete
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
			</Card>

			<div className="flex items-center justify-end gap-1 my-4">
				<Button variant="ghost" size="icon" onClick={() => toast.info("Previous page")}>
					<ChevronLeft size={18} />
				</Button>
				{Array.from({ length: 5 }, (_, index) => (
					<Button
						key={index}
						variant={index === 0 ? "secondary" : "ghost"}
						size="sm"
						onClick={() => toast.info(`Page ${index + 1}`)}
					>
						{index + 1}
					</Button>
				))}
				<Button variant="ghost" size="icon" onClick={() => toast.info("Next page")}>
					<ChevronRight size={18} />
				</Button>
			</div>

			<FormModal
				open={isModalOpen}
				onClose={handleModalClose}
				onSubmit={handleSubmit}
				title="Add New Webhook"
				saveLabel="Create Webhook"
				maxWidth="max-w-2xl"
			>
				<FormField
					label="Webhook Name"
					htmlFor="webhook-name"
					required
					hint="Give your webhook a descriptive name for easy identification."
				>
					<Input
						id="webhook-name"
						type="text"
						name="name"
						placeholder="e.g., Order Created Webhook"
						value={newWebhook.name}
						onChange={handleInputChange}
					/>
				</FormField>
				<FormField
					label="Webhook URL"
					htmlFor="webhook-url"
					required
					hint="The endpoint URL where webhook events will be sent."
				>
					<Input
						id="webhook-url"
						type="url"
						name="url"
						placeholder="https://api.example.com/webhooks"
						value={newWebhook.url}
						onChange={handleInputChange}
					/>
				</FormField>
				<FormField label="Events" required hint="Select the events that will trigger this webhook.">
					<div className={`grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border ${colors.border} rounded-xl p-3 ${colors.muted}`}>
						{availableEvents.map((event) => (
							<label
								key={event}
								className={`flex items-center gap-2 cursor-pointer ${colors.hoverSecondary} p-2 rounded transition-colors`}
							>
								<input
									type="checkbox"
									checked={newWebhook.events.includes(event)}
									onChange={() => handleEventToggle(event)}
									className={getFocusRingClass(colorScheme)}
								/>
								<span className={`text-sm ${colors.foreground}`}>{event}</span>
							</label>
						))}
					</div>
				</FormField>
			</FormModal>
		</div>
	);
};

export default Webhooks;
