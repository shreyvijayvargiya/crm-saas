import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
	PlusCircle,
	X,
	Pencil,
	Trash,
	CheckCircle2,
	XCircle,
	Search,
	Key,
	Webhook,
	ArrowUpRight,
	Plug2,
} from "lucide-react";
import { toast } from "react-toastify";
import { Pagination } from "../../modules";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const GROUP_LABELS = {
	email_calendar: "Email & calendar",
	crm_revenue: "CRM & revenue",
	support: "Support & success",
	billing: "Billing & payments",
	voice_sms: "Voice & SMS",
	voice_video: "Video & meetings",
	documents: "Documents & e-sign",
	data_bi: "Data & analytics",
	identity: "Identity & SSO",
	automation: "Automation & iPaaS",
	productivity: "Productivity & delivery",
};

const GROUP_ORDER = Object.keys(GROUP_LABELS);

const initialIntegrations = [
	{ id: "1", name: "Google Workspace", enabled: true, tag: "email_sync", group: "email_calendar", lastUpdated: "March 2, 2025" },
	{ id: "2", name: "Microsoft 365", enabled: true, tag: "email_calendar", group: "email_calendar", lastUpdated: "March 1, 2025" },
	{ id: "3", name: "Salesforce", enabled: true, tag: "crm", group: "crm_revenue", lastUpdated: "March 2, 2025" },
	{ id: "4", name: "HubSpot", enabled: false, tag: "crm", group: "crm_revenue", lastUpdated: "February 20, 2025" },
	{ id: "5", name: "Pipedrive", enabled: false, tag: "pipeline", group: "crm_revenue", lastUpdated: "January 8, 2025" },
	{ id: "6", name: "Zendesk", enabled: true, tag: "ticketing", group: "support", lastUpdated: "March 2, 2025" },
	{ id: "7", name: "Intercom", enabled: true, tag: "messaging", group: "support", lastUpdated: "February 28, 2025" },
	{ id: "8", name: "Freshdesk", enabled: false, tag: "ticketing", group: "support", lastUpdated: "January 12, 2025" },
	{ id: "9", name: "Stripe", enabled: true, tag: "payments", group: "billing", lastUpdated: "March 2, 2025" },
	{ id: "10", name: "Chargebee", enabled: false, tag: "subscriptions", group: "billing", lastUpdated: "February 5, 2025" },
	{ id: "11", name: "Paddle", enabled: false, tag: "subscriptions", group: "billing", lastUpdated: "December 1, 2024" },
	{ id: "12", name: "Twilio", enabled: true, tag: "sms_voice", group: "voice_sms", lastUpdated: "March 1, 2025" },
	{ id: "13", name: "Aircall", enabled: false, tag: "cti", group: "voice_sms", lastUpdated: "November 2, 2024" },
	{ id: "14", name: "RingCentral", enabled: false, tag: "unified_comms", group: "voice_sms", lastUpdated: "October 9, 2024" },
	{ id: "15", name: "Zoom", enabled: true, tag: "video", group: "voice_video", lastUpdated: "March 2, 2025" },
	{ id: "16", name: "DocuSign", enabled: true, tag: "e_signature", group: "documents", lastUpdated: "February 15, 2025" },
	{ id: "17", name: "PandaDoc", enabled: false, tag: "quotes", group: "documents", lastUpdated: "January 3, 2025" },
	{ id: "18", name: "Google Drive", enabled: true, tag: "cloud_storage", group: "documents", lastUpdated: "March 1, 2025" },
	{ id: "19", name: "BigQuery", enabled: false, tag: "warehouse", group: "data_bi", lastUpdated: "February 10, 2025" },
	{ id: "20", name: "Snowflake", enabled: false, tag: "warehouse", group: "data_bi", lastUpdated: "January 22, 2025" },
	{ id: "21", name: "Looker", enabled: false, tag: "bi", group: "data_bi", lastUpdated: "December 5, 2024" },
	{ id: "22", name: "Okta", enabled: true, tag: "sso", group: "identity", lastUpdated: "March 1, 2025" },
	{ id: "23", name: "Azure AD", enabled: true, tag: "sso", group: "identity", lastUpdated: "February 25, 2025" },
	{ id: "24", name: "Zapier", enabled: true, tag: "automation", group: "automation", lastUpdated: "March 2, 2025" },
	{ id: "25", name: "Make", enabled: false, tag: "automation", group: "automation", lastUpdated: "January 6, 2025" },
	{ id: "26", name: "n8n", enabled: false, tag: "automation", group: "automation", lastUpdated: "September 1, 2024" },
	{ id: "27", name: "Slack", enabled: true, tag: "communication", group: "productivity", lastUpdated: "March 2, 2025" },
	{ id: "28", name: "Jira", enabled: true, tag: "delivery", group: "productivity", lastUpdated: "March 1, 2025" },
	{ id: "29", name: "Notion", enabled: false, tag: "wiki", group: "productivity", lastUpdated: "December 20, 2024" },
];

const Integrations = () => {
	const { theme, colorScheme, colors, scheme } = useTheme();

	const [integrations, setIntegrations] = useState(initialIntegrations);
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newIntegration, setNewIntegration] = useState({
		name: "",
		enabled: false,
		tag: "",
		group: "productivity",
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

	const nextId = (prev) => {
		const n = Math.max(0, ...prev.map((i) => parseInt(String(i.id).replace(/\D/g, ""), 10) || 0));
		return String(n + 1);
	};

	const handleAddIntegration = () => {
		if (!newIntegration.name.trim()) {
			toast.error("Please enter an integration name!");
			return;
		}

		if (newIntegration.id) {
			setIntegrations((prev) =>
				prev.map((integration) =>
					integration.id === newIntegration.id ? { ...newIntegration } : integration
				)
			);
			toast.success(`Integration "${newIntegration.name}" updated successfully!`);
		} else {
			setIntegrations((prev) => [
				...prev,
				{
					id: nextId(prev),
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
		setNewIntegration({ name: "", enabled: false, tag: "", group: "productivity", apiKey: "" });
		setIsModalOpen(false);
	};

	const handleEditIntegration = (integration) => {
		setNewIntegration({ ...integration, group: integration.group || "productivity" });
		setIsModalOpen(true);
	};

	const handleDeleteIntegration = (id) => {
		const integrationToDelete = integrations.find((i) => i.id === id);
		setIntegrations((prev) => prev.filter((i) => i.id !== id));
		toast.info(`Deleted integration: ${integrationToDelete.name}`);
	};

	const formatTag = (tag) => {
		return tag
			.split("_")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(" ");
	};

	const q = searchTerm.trim().toLowerCase();
	const filteredIntegrations = !q
		? integrations
		: integrations.filter(
				(i) =>
					i.name.toLowerCase().includes(q) ||
					i.tag.toLowerCase().includes(q) ||
					(i.group && GROUP_LABELS[i.group]?.toLowerCase().includes(q)) ||
					formatTag(i.tag).toLowerCase().includes(q)
			);

	const sortedIntegrations = useMemo(
		() => [...filteredIntegrations].sort((a, b) => Number(b.enabled) - Number(a.enabled)),
		[filteredIntegrations]
	);

	const grouped = useMemo(() => {
		const byGroup = new Map();
		sortedIntegrations.forEach((i) => {
			const g = i.group || "productivity";
			if (!byGroup.has(g)) byGroup.set(g, []);
			byGroup.get(g).push(i);
		});
		return GROUP_ORDER.filter((g) => byGroup.has(g)).map((g) => ({
			key: g,
			label: GROUP_LABELS[g],
			items: byGroup.get(g),
		}));
	}, [sortedIntegrations]);

	return (
		<div className={`p-6 transition-all duration-100 ease-in`}>
			<div
				className={`flex flex-col md:flex-row items-start md:items-center justify-between p-2 gap-4`}
			>
				<div>
					<h2 className={`text-lg font-semibold ${colors.foreground}`}>Integrations</h2>
					<p className={`text-sm ${colors.mutedForeground} mt-1 max-w-2xl`}>
						Connect email, calendar, billing, support, and analytics tools. For custom
						apps, use API keys and webhooks to push CRM events to your stack.
					</p>
				</div>
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
					<div
						className={`relative flex gap-2 items-center border ${colors.border} rounded-xl px-3 py-2 ${colors.card} min-w-[200px] flex-1 sm:flex-initial sm:min-w-[240px]`}
					>
						<Search className={colors.textSecondary} size={18} />
						<input
							type="search"
							placeholder="Search by name, category, or group…"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className={`outline-none flex-1 bg-transparent text-sm ${colors.foreground} placeholder:opacity-60 ${getFocusRingClass(colorScheme)}`}
							aria-label="Search integrations"
						/>
					</div>
					<button
						type="button"
						onClick={() => {
							setNewIntegration({
								name: "",
								enabled: false,
								tag: "",
								group: "productivity",
								apiKey: "",
							});
							setIsModalOpen(true);
						}}
						className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded-xl text-sm px-4 py-2 transition-all duration-200 font-medium flex items-center justify-center gap-2 shrink-0`}
					>
						<PlusCircle size={16} />
						Custom connection
					</button>
				</div>
			</div>

			{/* Custom & programmatic */}
			<div className="mt-6 grid gap-3 sm:grid-cols-2">
				<Link href="/api-keys" passHref>
					<a
						className={`group flex items-start gap-3 rounded-2xl border ${colors.border} ${colors.card} p-4 transition-colors ${colors.hoverSecondary}`}
					>
						<div
							className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${colors.border} ${colors.muted}`}
						>
							<Key className={`h-5 w-5 ${colors.textSecondary}`} />
						</div>
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-1">
								<p className={`text-sm font-semibold ${colors.foreground}`}>API keys</p>
								<ArrowUpRight
									className={`h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 ${colors.mutedForeground}`}
								/>
							</div>
							<p className={`mt-1 text-xs leading-relaxed ${colors.mutedForeground}`}>
								Programmatic access for ETL, internal tools, and partner apps. Create,
								rotate, and scope keys by workspace.
							</p>
						</div>
					</a>
				</Link>
				<Link href="/webhooks" passHref>
					<a
						className={`group flex items-start gap-3 rounded-2xl border ${colors.border} ${colors.card} p-4 transition-colors ${colors.hoverSecondary}`}
					>
						<div
							className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${colors.border} ${colors.muted}`}
						>
							<Webhook className={`h-5 w-5 ${colors.textSecondary}`} />
						</div>
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-1">
								<p className={`text-sm font-semibold ${colors.foreground}`}>Webhooks</p>
								<ArrowUpRight
									className={`h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 ${colors.mutedForeground}`}
								/>
							</div>
							<p className={`mt-1 text-xs leading-relaxed ${colors.mutedForeground}`}>
								Subscribe to deal, contact, and invoice events. Retries, signing secrets,
								and logs live on the webhooks page.
							</p>
						</div>
					</a>
				</Link>
			</div>

			<div
				className={`mt-6 flex items-center gap-2 text-xs font-medium ${colors.mutedForeground}`}
			>
				<Plug2 className="h-3.5 w-3.5" />
				<span>App marketplace (demo connections — wire OAuth in production)</span>
			</div>

			{/* Grouped table */}
			<div
				className={`mt-2 ${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
			>
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
									Last updated
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</th>
							</tr>
						</thead>
						{grouped.length === 0 ? (
							<tbody>
								<tr>
									<td colSpan="5" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>
											{integrations.length === 0
												? "No integrations found"
												: "No integrations match your search"}
										</p>
									</td>
								</tr>
							</tbody>
						) : (
							grouped.map((section) => (
								<tbody
									key={section.key}
									className={`${colors.card} divide-y ${colors.border}`}
								>
									<tr className={colors.muted}>
										<td
											colSpan="5"
											className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider ${colors.mutedForeground}`}
										>
											{section.label}
										</td>
									</tr>
									{section.items.map((integration) => (
										<tr
											key={integration.id}
											className={`${colors.hover} transition-colors ${colors.card}`}
										>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center gap-2">
													<input
														type="checkbox"
														checked={integration.enabled}
														onChange={() => toggleIntegration(integration.id)}
														className={`w-4 h-4 ${getFocusRingClass(colorScheme)}`}
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
														type="button"
														className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
														title="Edit"
														onClick={() => handleEditIntegration(integration)}
													>
														<Pencil size={16} className={colors.textSecondary} />
													</button>
													<button
														type="button"
														className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors`}
														title="Delete"
														onClick={() => handleDeleteIntegration(integration.id)}
													>
														<Trash size={16} className={colors.textSecondary} />
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							))
						)}
					</table>
				</div>
			</div>

			{isModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={() => setIsModalOpen(false)}
					role="presentation"
				>
					<div
						className={`${colors.card} rounded-xl ${colors.shadow} max-w-xl w-full max-h-[90vh] overflow-y-auto`}
						onClick={(e) => e.stopPropagation()}
					>
						<div
							className={`flex items-center justify-between p-6 border-b ${colors.border}`}
						>
							<div>
								<h2 className={`text-xl font-semibold ${colors.foreground}`}>
									{newIntegration.id ? "Edit connection" : "Add custom connection"}
								</h2>
								<p className={`text-sm ${colors.mutedForeground} mt-1`}>
									For one-off or internal tools. OAuth apps in the list above are
									preferred for vendors.
								</p>
							</div>
							<button
								type="button"
								onClick={() => {
									setIsModalOpen(false);
									setNewIntegration({
										name: "",
										enabled: false,
										tag: "",
										group: "productivity",
										apiKey: "",
									});
								}}
								className={`p-2 ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								<X className={`w-5 h-5 ${colors.mutedForeground}`} />
							</button>
						</div>

						<div className="p-6 space-y-4">
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Integration name <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									placeholder="e.g. Internal data lake connector"
									value={newIntegration.name}
									onChange={(e) =>
										setNewIntegration({ ...newIntegration, name: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${colors.mutedForeground}`}
								/>
							</div>

							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Marketplace group
								</label>
								<select
									value={newIntegration.group}
									onChange={(e) =>
										setNewIntegration({ ...newIntegration, group: e.target.value })
									}
									className={`w-full px-4 py-2.5 ${colors.background} border ${colors.border} rounded-xl text-sm ${colors.foreground} focus:outline-none focus:ring-2 ${getFocusRingClass(colorScheme)}`}
								>
									{GROUP_ORDER.map((g) => (
										<option key={g} value={g}>
											{GROUP_LABELS[g]}
										</option>
									))}
								</select>
							</div>

							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									API key or secret
								</label>
								<input
									type="password"
									autoComplete="off"
									placeholder="Optional — stored only in this demo (client state)"
									value={newIntegration.apiKey}
									onChange={(e) =>
										setNewIntegration({ ...newIntegration, apiKey: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${colors.mutedForeground}`}
								/>
							</div>

							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Category tag
								</label>
								<input
									type="text"
									placeholder="e.g. internal, legacy_crm, partner_api"
									value={newIntegration.tag}
									onChange={(e) =>
										setNewIntegration({ ...newIntegration, tag: e.target.value })
									}
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${getFocusRingClass(
										colorScheme
									)} focus:border-transparent placeholder:${colors.mutedForeground}`}
								/>
								<p className={`text-xs ${colors.textMuted} mt-1`}>
									Use snake_case. Shown as the category chip in the table.
								</p>
							</div>

							<div
								className={`flex items-center gap-3 p-4 rounded-xl border ${colors.border} ${colors.muted}`}
							>
								<input
									type="checkbox"
									checked={newIntegration.enabled}
									onChange={() =>
										setNewIntegration((prev) => ({ ...prev, enabled: !prev.enabled }))
									}
									className={`w-4 h-4 ${getFocusRingClass(colorScheme)}`}
								/>
								<div>
									<label
										className={`text-sm font-medium ${colors.foreground} cursor-pointer`}
									>
										Enabled
									</label>
									<p className={`text-xs ${colors.textMuted} mt-0.5`}>
										Treat as connected for the demo.
									</p>
								</div>
							</div>
						</div>

						<div
							className={`flex items-center justify-end gap-3 p-6 border-t ${colors.border}`}
						>
							<button
								type="button"
								onClick={() => {
									setIsModalOpen(false);
									setNewIntegration({
										name: "",
										enabled: false,
										tag: "",
										group: "productivity",
										apiKey: "",
									});
								}}
								className={`px-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleAddIntegration}
								className={`px-4 py-2 text-sm font-medium ${scheme.primaryForeground} ${scheme.primary} ${scheme.primaryHover} rounded-xl transition-colors`}
							>
								{newIntegration.id ? "Save" : "Add connection"}
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="mt-4">
				<Pagination />
			</div>
		</div>
	);
};

export default Integrations;
