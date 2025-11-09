import React, { useState } from "react";
import {
	PlusCircle,
	X,
	Pencil,
	Trash,
	CheckCircle2,
	XCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { Pagination } from "../../modules";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Integrations = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

	const [integrations, setIntegrations] = useState([
		{
			id: "1",
			name: "Slack",
			enabled: true,
			tag: "communication",
			lastUpdated: "October 1, 2023",
		},
		{
			id: "2",
			name: "Trello",
			enabled: false,
			tag: "project_management",
			lastUpdated: "September 15, 2023",
		},
		{
			id: "3",
			name: "Jira",
			enabled: true,
			tag: "issue_tracking",
			lastUpdated: "October 5, 2023",
		},
		{
			id: "4",
			name: "GitHub",
			enabled: false,
			tag: "version_control",
			lastUpdated: "August 20, 2023",
		},
		{
			id: "5",
			name: "Google Drive",
			enabled: true,
			tag: "cloud_storage",
			lastUpdated: "October 2, 2023",
		},
		{
			id: "6",
			name: "Asana",
			enabled: false,
			tag: "task_management",
			lastUpdated: "September 10, 2023",
		},
		{
			id: "7",
			name: "Zapier",
			enabled: true,
			tag: "automation",
			lastUpdated: "October 3, 2023",
		},
		{
			id: "8",
			name: "Salesforce",
			enabled: false,
			tag: "crm",
			lastUpdated: "September 25, 2023",
		},
		{
			id: "9",
			name: "Dropbox",
			enabled: true,
			tag: "cloud_storage",
			lastUpdated: "October 4, 2023",
		},
		{
			id: "10",
			name: "Mailchimp",
			enabled: false,
			tag: "email_marketing",
			lastUpdated: "September 30, 2023",
		},
		{
			id: "11",
			name: "Zoom",
			enabled: true,
			tag: "video_conferencing",
			lastUpdated: "October 6, 2023",
		},
		{
			id: "12",
			name: "Notion",
			enabled: false,
			tag: "productivity",
			lastUpdated: "September 20, 2023",
		},
		{
			id: "13",
			name: "Figma",
			enabled: true,
			tag: "design",
			lastUpdated: "October 7, 2023",
		},
	]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newIntegration, setNewIntegration] = useState({
		name: "",
		enabled: false,
		tag: "",
		apiKey: "",
	});

	const toggleIntegration = (id) => {
		setIntegrations((prev) =>
			prev.map((integration) =>
				integration.id === id
					? { ...integration, enabled: !integration.enabled }
					: integration
			)
		);
	};

	const handleAddIntegration = () => {
		if (!newIntegration.name.trim()) {
			toast.error("Please enter an integration name!");
			return;
		}

		if (newIntegration.id) {
			// Edit existing integration
			setIntegrations((prev) =>
				prev.map((integration) =>
					integration.id === newIntegration.id
						? { ...newIntegration }
						: integration
				)
			);
			toast.success(
				`Integration "${newIntegration.name}" updated successfully!`
			);
		} else {
			// Add new integration
			setIntegrations((prev) => [
				...prev,
				{
					id: (prev.length + 1).toString(),
					...newIntegration,
					lastUpdated: new Date().toLocaleDateString("en-US", {
						year: "numeric",
						month: "long",
						day: "numeric",
					}),
				},
			]);
			toast.success(`Integration "${newIntegration.name}" added successfully!`);
		}
		setNewIntegration({ name: "", enabled: false, tag: "", apiKey: "" });
		setIsModalOpen(false);
	};

	const handleEditIntegration = (integration) => {
		setNewIntegration(integration);
		setIsModalOpen(true);
	};

	const handleDeleteIntegration = (id) => {
		const integrationToDelete = integrations.find(
			(integration) => integration.id === id
		);
		setIntegrations((prev) =>
			prev.filter((integration) => integration.id !== id)
		);
		toast.info(`Deleted integration: ${integrationToDelete.name}`);
	};

	const sortedIntegrations = [...integrations].sort(
		(a, b) => b.enabled - a.enabled
	);

	const formatTag = (tag) => {
		return tag
			.split("_")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	return (
		<div className={`p-6 ${colors.background} transition-colors`}>
			{/* Integrations Table - Improved */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
			>
				{/* Table Header */}
				<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4 border-b ${colors.border} gap-4`}
				>
					<div>
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Integrations
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							Manage your third-party integrations and connections
						</p>
					</div>
					<button
						onClick={() => setIsModalOpen(true)}
						className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded-xl text-sm px-4 py-2 transition-all duration-200 font-medium flex items-center gap-2`}
					>
						<PlusCircle size={16} />
						Create Integration
					</button>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className={`${colors.muted} border-b ${colors.border}`}>
							<tr>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Status
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Integration
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Category
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Last Updated
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{sortedIntegrations.length === 0 ? (
								<tr>
									<td colSpan="5" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>
											No integrations found
										</p>
									</td>
								</tr>
							) : (
								sortedIntegrations.map((integration) => (
									<tr
										key={integration.id}
										className={`${colors.hover} transition-colors`}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<input
													type="checkbox"
													checked={integration.enabled}
													onChange={() => toggleIntegration(integration.id)}
													className={`w-4 h-4 ${getFocusRingClass(
														colorScheme
													)}`}
												/>
												<span
													className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
														integration.enabled
															? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
															: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
													}`}
												>
													{integration.enabled ? (
														<CheckCircle2 className="w-3 h-3 mr-1" />
													) : (
														<XCircle className="w-3 h-3 mr-1" />
													)}
													{integration.enabled ? "Active" : "Inactive"}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-medium ${colors.foreground}`}
											>
												{integration.name}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													theme === "dark"
														? "bg-blue-900/30 text-blue-400 border-blue-800/50"
														: "bg-blue-100 text-blue-800"
												} border`}
											>
												{formatTag(integration.tag)}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{integration.lastUpdated}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Edit"
													onClick={() => handleEditIntegration(integration)}
												>
													<Pencil size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Delete"
													onClick={() =>
														handleDeleteIntegration(integration.id)
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

			{/* Add/Edit Integration Modal */}
			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={() => setIsModalOpen(false)}
				>
					<div
						className={`${colors.card} rounded-xl ${colors.shadow} max-w-xl w-full overflow-y-auto`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div
							className={`flex items-center justify-between p-6 border-b ${colors.border}`}
						>
							<div>
								<h2 className={`text-xl font-semibold ${colors.foreground}`}>
									{newIntegration.id
										? "Edit Integration"
										: "Add New Integration"}
								</h2>
								<p className={`text-sm ${colors.mutedForeground} mt-1`}>
									Configure your integration settings
								</p>
							</div>
							<button
								onClick={() => {
									setIsModalOpen(false);
									setNewIntegration({
										name: "",
										enabled: false,
										tag: "",
										apiKey: "",
									});
								}}
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
									Integration Name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									placeholder="e.g., Slack, Trello, GitHub"
									value={newIntegration.name}
									onChange={(e) =>
										setNewIntegration({
											...newIntegration,
											name: e.target.value,
										})
									}
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
							</div>

							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									API Key
								</label>
								<input
									type="text"
									placeholder="Enter your API key (optional)"
									value={newIntegration.apiKey}
									onChange={(e) =>
										setNewIntegration({
											...newIntegration,
											apiKey: e.target.value,
										})
									}
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
							</div>

							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Category/Tag
								</label>
								<input
									type="text"
									placeholder="e.g., communication, project_management"
									value={newIntegration.tag}
									onChange={(e) =>
										setNewIntegration({
											...newIntegration,
											tag: e.target.value,
										})
									}
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
								<p className={`text-xs ${colors.textMuted} mt-1`}>
									Use underscore for multiple words (e.g., project_management)
								</p>
							</div>

							<div
								className={`flex items-center gap-3 p-4 rounded-xl border ${colors.border} ${colors.muted}`}
							>
								<input
									type="checkbox"
									checked={newIntegration.enabled}
									onChange={() =>
										setNewIntegration((prev) => ({
											...prev,
											enabled: !prev.enabled,
										}))
									}
									className={`w-4 h-4 ${getFocusRingClass(colorScheme)}`}
								/>
								<div>
									<label
										className={`text-sm font-medium ${colors.foreground} cursor-pointer`}
									>
										Enable Integration
									</label>
									<p className={`text-xs ${colors.textMuted} mt-0.5`}>
										Activate this integration immediately
									</p>
								</div>
							</div>
						</div>

						{/* Modal Footer */}
						<div
							className={`flex items-center justify-end gap-3 p-6 border-t ${colors.border}`}
						>
							<button
								onClick={() => {
									setIsModalOpen(false);
									setNewIntegration({
										name: "",
										enabled: false,
										tag: "",
										apiKey: "",
									});
								}}
								className={`px-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								Cancel
							</button>
							<button
								onClick={handleAddIntegration}
								className={`px-4 py-2 text-sm font-medium ${scheme.primaryForeground} ${scheme.primary} ${scheme.primaryHover} rounded-xl transition-colors`}
							>
								{newIntegration.id ? "Update" : "Create"} Integration
							</button>
						</div>
					</div>
				</div>
			)}
			<Pagination />
		</div>
	);
};

export default Integrations;
