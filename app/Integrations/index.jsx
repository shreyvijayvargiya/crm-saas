import React, { useState } from "react";
import { PlusCircle, X, Pencil, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { Pagination } from "../../modules";

const Integrations = () => {
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
		setIntegrations((prev) => [
			...prev,
			{ id: (prev.length + 1).toString(), ...newIntegration },
		]);
		setNewIntegration({ name: "", enabled: false, tag: "", apiKey: "" });
		setIsModalOpen(false);
	};

	const handleEditIntegration = (integration) => {
		setNewIntegration(integration);
		setIsModalOpen(true);
		toast.info(`Editing integration: ${integration.name}`);
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

	return (
		<div className="p-4">
			<div className="flex justify-between items-center">
				<p className="text-xl font-bold">Integrations</p>
				<button
					onClick={() => setIsModalOpen(true)}
					className="bg-zinc-800 hover:bg-zinc-900 text-white p-2 text-xs rounded flex items-center"
				>
					<PlusCircle className="mr-1" size={16} /> Create Integration
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full border-collapse border border-zinc-300 mt-4">
					<thead>
						<tr className="bg-zinc-100 text-left">
							<th className="border border-zinc-300 p-2">Status</th>
							<th className="border border-zinc-300 p-2">Integration</th>
							<th className="border border-zinc-300 p-2">Tag</th>
							<th className="border border-zinc-300 p-2">Last updated</th>
							<th className="border border-zinc-300 p-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{sortedIntegrations.map((integration) => (
							<tr key={integration.id} className="hover:bg-zinc-50">
								<td className="border border-zinc-300 p-2">
									<input
										type="checkbox"
										checked={integration.enabled}
										onChange={() => toggleIntegration(integration.id)}
										className="w-4 h-4"
										style={{ accentColor: "#4A5568" }}
									/>
								</td>
								<td className="border border-zinc-300 p-2">
									{integration.name}
								</td>
								<td className="border border-zinc-300 p-2">
									{integration.tag}
								</td>
								<td className="border border-zinc-300 p-2">
									{integration.lastUpdated}
								</td>
								<td className="border-b border-zinc-300 px-2 py-4 flex gap-2">
									<Pencil
										className="cursor-pointer text-zinc-800"
										size={18}
										onClick={() => handleEditIntegration(integration)}
									/>
									<Trash
										className="cursor-pointer text-zinc-800"
										size={18}
										onClick={() => handleDeleteIntegration(integration.id)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg max-w-xl mx-auto">
						<div className="flex justify-between items-center mb-4">
							<p className="text-lg">Add New Integration</p>
							<button
								onClick={() => setIsModalOpen(false)}
								className="bg-zinc-50 text-zinc-800 p-1 rounded"
							>
								<X size={16} />
							</button>
						</div>
						<input
							type="text"
							placeholder="Integration Name"
							value={newIntegration.name}
							onChange={(e) =>
								setNewIntegration({ ...newIntegration, name: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="text"
							placeholder="API Key"
							value={newIntegration.apiKey}
							onChange={(e) =>
								setNewIntegration({ ...newIntegration, apiKey: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<input
							type="text"
							placeholder="Tag"
							value={newIntegration.tag}
							onChange={(e) =>
								setNewIntegration({ ...newIntegration, tag: e.target.value })
							}
							className="my-2 px-2 py-1 border rounded w-full outline-none"
						/>
						<label className="flex items-center my-2">
							<input
								type="checkbox"
								checked={newIntegration.enabled}
								onChange={() =>
									setNewIntegration((prev) => ({
										...prev,
										enabled: !prev.enabled,
									}))
								}
								className="mr-2"
							/>
							Enabled
						</label>
						<button
							onClick={handleAddIntegration}
							className="mt-4 bg-zinc-800 hover:bg-zinc-900 text-white text-sm px-2 py-1 rounded"
						>
							Submit
						</button>
					</div>
				</div>
			)}
			<Pagination />
		</div>
	);
};

export default Integrations;
