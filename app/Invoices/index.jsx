import {
	Eye,
	Pen,
	Trash,
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
	Search,
	Download,
	FileText,
	X,
	Plus,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Invoices = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

	const initialInvoices = [
		{
			id: "INV-001",
			invoiceNumber: "INV-2024-001",
			client: "Cloud Corp",
			clientEmail: "contact@cloudcorp.com",
			amount: 5000.0,
			status: "Paid",
			issueDate: "06/01/2024",
			dueDate: "06/15/2024",
			description: "Monthly subscription service",
			items: [{ name: "Premium Plan", quantity: 1, price: 5000.0 }],
		},
		{
			id: "INV-002",
			invoiceNumber: "INV-2024-002",
			client: "Tech Innovations",
			clientEmail: "billing@techinnovations.com",
			amount: 12000.0,
			status: "Pending",
			issueDate: "06/05/2024",
			dueDate: "06/20/2024",
			description: "Q2 software license",
			items: [{ name: "Enterprise License", quantity: 3, price: 12000.0 }],
		},
		{
			id: "INV-003",
			invoiceNumber: "INV-2024-003",
			client: "AI Labs",
			clientEmail: "finance@ailabs.io",
			amount: 8500.0,
			status: "Overdue",
			issueDate: "05/20/2024",
			dueDate: "06/05/2024",
			description: "Custom development services",
			items: [{ name: "Development Hours", quantity: 40, price: 8500.0 }],
		},
		{
			id: "INV-004",
			invoiceNumber: "INV-2024-004",
			client: "Marketing Solutions",
			clientEmail: "payments@marketingsolutions.com",
			amount: 3200.0,
			status: "Paid",
			issueDate: "06/10/2024",
			dueDate: "06/25/2024",
			description: "Marketing campaign setup",
			items: [{ name: "Campaign Setup", quantity: 1, price: 3200.0 }],
		},
		{
			id: "INV-005",
			invoiceNumber: "INV-2024-005",
			client: "Finance Corp",
			clientEmail: "accounts@financecorp.com",
			amount: 15000.0,
			status: "Pending",
			issueDate: "06/15/2024",
			dueDate: "06/30/2024",
			description: "Annual enterprise package",
			items: [{ name: "Enterprise Package", quantity: 1, price: 15000.0 }],
		},
		{
			id: "INV-006",
			invoiceNumber: "INV-2024-006",
			client: "Amazon",
			clientEmail: "procurement@amazon.com",
			amount: 25000.0,
			status: "Paid",
			issueDate: "05/25/2024",
			dueDate: "06/10/2024",
			description: "Cloud infrastructure services",
			items: [{ name: "Infrastructure Services", quantity: 1, price: 25000.0 }],
		},
		{
			id: "INV-007",
			invoiceNumber: "INV-2024-007",
			client: "Startup Inc.",
			clientEmail: "billing@startupinc.com",
			amount: 1800.0,
			status: "Pending",
			issueDate: "06/18/2024",
			dueDate: "07/03/2024",
			description: "Basic plan subscription",
			items: [{ name: "Basic Plan", quantity: 1, price: 1800.0 }],
		},
		{
			id: "INV-008",
			invoiceNumber: "INV-2024-008",
			client: "Global Solutions",
			clientEmail: "finance@globalsolutions.com",
			amount: 9500.0,
			status: "Overdue",
			issueDate: "05/15/2024",
			dueDate: "05/30/2024",
			description: "Consulting services",
			items: [{ name: "Consulting Hours", quantity: 30, price: 9500.0 }],
		},
		{
			id: "INV-009",
			invoiceNumber: "INV-2024-009",
			client: "Innovatech LLC",
			clientEmail: "accounts@innovatech.com",
			amount: 4200.0,
			status: "Paid",
			issueDate: "06/12/2024",
			dueDate: "06/27/2024",
			description: "API integration services",
			items: [{ name: "API Integration", quantity: 1, price: 4200.0 }],
		},
		{
			id: "INV-010",
			invoiceNumber: "INV-2024-010",
			client: "GreenTech Innovations",
			clientEmail: "billing@greentech.com",
			amount: 6800.0,
			status: "Pending",
			issueDate: "06/20/2024",
			dueDate: "07/05/2024",
			description: "Sustainability platform license",
			items: [{ name: "Platform License", quantity: 2, price: 6800.0 }],
		},
		{
			id: "INV-011",
			invoiceNumber: "INV-2024-011",
			client: "Future Solutions",
			clientEmail: "payments@futuresolutions.com",
			amount: 11000.0,
			status: "Paid",
			issueDate: "06/08/2024",
			dueDate: "06/23/2024",
			description: "Custom software development",
			items: [{ name: "Development Services", quantity: 1, price: 11000.0 }],
		},
		{
			id: "INV-012",
			invoiceNumber: "INV-2024-012",
			client: "Tech Innovators",
			clientEmail: "finance@techinnovators.com",
			amount: 7500.0,
			status: "Pending",
			issueDate: "06/22/2024",
			dueDate: "07/07/2024",
			description: "Training and onboarding",
			items: [{ name: "Training Sessions", quantity: 5, price: 7500.0 }],
		},
	];

	const [invoices, setInvoices] = useState(initialInvoices);
	const [sortConfig, setSortConfig] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
	const [selectedInvoice, setSelectedInvoice] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [newInvoice, setNewInvoice] = useState({
		invoiceNumber: "",
		client: "",
		clientEmail: "",
		status: "Pending",
		issueDate: "",
		dueDate: "",
		description: "",
	});
	const [invoiceItems, setInvoiceItems] = useState([
		{ id: 1, name: "", quantity: 1, price: 0 },
	]);

	const handleAddInvoice = () => setIsModalOpen(true);

	const handleModalClose = () => {
		setIsModalOpen(false);
		setNewInvoice({
			invoiceNumber: "",
			client: "",
			clientEmail: "",
			status: "Pending",
			issueDate: "",
			dueDate: "",
			description: "",
		});
		setInvoiceItems([{ id: 1, name: "", quantity: 1, price: 0 }]);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewInvoice((prev) => ({ ...prev, [name]: value }));
	};

	const calculateTotal = () => {
		return invoiceItems.reduce((total, item) => {
			return (
				total + (parseFloat(item.quantity) || 0) * (parseFloat(item.price) || 0)
			);
		}, 0);
	};

	const handleAddItem = () => {
		setInvoiceItems([
			...invoiceItems,
			{ id: Date.now(), name: "", quantity: 1, price: 0 },
		]);
	};

	const handleRemoveItem = (itemId) => {
		if (invoiceItems.length > 1) {
			setInvoiceItems(invoiceItems.filter((item) => item.id !== itemId));
		} else {
			toast.error("At least one item is required!");
		}
	};

	const handleItemChange = (itemId, field, value) => {
		setInvoiceItems(
			invoiceItems.map((item) =>
				item.id === itemId ? { ...item, [field]: value } : item
			)
		);
	};

	const handleSubmit = () => {
		if (!newInvoice.invoiceNumber || !newInvoice.client) {
			toast.error("Please fill in all required fields!");
			return;
		}

		const validItems = invoiceItems.filter(
			(item) => item.name && item.quantity > 0 && item.price > 0
		);

		if (validItems.length === 0) {
			toast.error("Please add at least one valid item!");
			return;
		}

		const totalAmount = calculateTotal();

		const invoiceToAdd = {
			id: `INV-${String(invoices.length + 1).padStart(3, "0")}`,
			invoiceNumber: newInvoice.invoiceNumber,
			client: newInvoice.client,
			clientEmail: newInvoice.clientEmail,
			amount: totalAmount,
			status: newInvoice.status,
			issueDate: newInvoice.issueDate || new Date().toLocaleDateString("en-US"),
			dueDate: newInvoice.dueDate,
			description: newInvoice.description,
			items: validItems.map((item) => ({
				name: item.name,
				quantity: parseFloat(item.quantity),
				price: parseFloat(item.price),
			})),
		};

		setInvoices((prevInvoices) => [...prevInvoices, invoiceToAdd]);
		toast.success(`Invoice ${invoiceToAdd.invoiceNumber} added successfully!`);
		handleModalClose();
	};

	const handleViewInvoice = (invoice) => {
		setSelectedInvoice(invoice);
		setIsViewModalOpen(true);
	};

	const handleCloseViewModal = () => {
		setIsViewModalOpen(false);
		setSelectedInvoice(null);
	};

	const handleRemoveInvoice = (invoiceId) => {
		setInvoices((prevInvoices) =>
			prevInvoices.filter((invoice) => invoice.id !== invoiceId)
		);
		toast.success(`Invoice ${invoiceId} removed successfully!`);
	};

	const handleExportCSV = () => {
		const csvContent =
			"data:text/csv;charset=utf-8," +
			invoices
				.map(
					(invoice) =>
						`${invoice.invoiceNumber},${invoice.client},${invoice.amount},${invoice.status},${invoice.issueDate},${invoice.dueDate}`
				)
				.join("\n");
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", "invoices.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		toast.success("Invoices exported to CSV successfully!");
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

	const sortedInvoices = useMemo(() => {
		let sortableInvoices = [...invoices];
		if (sortConfig !== null) {
			sortableInvoices.sort((a, b) => {
				if (sortConfig.key === "amount") {
					return sortConfig.direction === "ascending"
						? a.amount - b.amount
						: b.amount - a.amount;
				}
				if (a[sortConfig.key] < b[sortConfig.key])
					return sortConfig.direction === "ascending" ? -1 : 1;
				if (a[sortConfig.key] > b[sortConfig.key])
					return sortConfig.direction === "ascending" ? 1 : -1;
				return 0;
			});
		}
		return sortableInvoices;
	}, [invoices, sortConfig]);

	const filteredInvoices = useMemo(() => {
		if (!searchTerm) return sortedInvoices;
		return sortedInvoices.filter(
			(invoice) =>
				invoice.invoiceNumber
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				invoice.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
				invoice.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
				invoice.status.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [sortedInvoices, searchTerm]);

	const getStatusColor = (status) => {
		if (theme === "dark") {
			switch (status) {
				case "Paid":
					return "bg-green-900/30 text-green-400 border border-green-800/50";
				case "Pending":
					return "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50";
				case "Overdue":
					return "bg-red-900/30 text-red-400 border border-red-800/50";
				default:
					return scheme.chipDark;
			}
		} else {
			switch (status) {
				case "Paid":
					return "bg-green-100 text-green-800";
				case "Pending":
					return "bg-yellow-100 text-yellow-800";
				case "Overdue":
					return "bg-red-100 text-red-800";
				default:
					return scheme.chip;
			}
		}
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	return (
		<div
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar ${colors.background} transition-colors`}
		>
			{/* Invoices Table - Improved */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden my-4`}
			>
				{/* Table Header */}
				<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between px-6 py-4 border-b ${colors.border} gap-4`}
				>
					<div className="flex-1">
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Recent Invoices
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							View and manage all your invoices
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
								placeholder="Search invoices..."
								className={`outline-none flex-1 ${colors.background} ${
									colors.foreground
								} placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						{/* Add Invoice Button */}
						<button
							onClick={handleAddInvoice}
							className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded-xl text-sm px-4 py-2 transition-all duration-200 font-medium flex items-center gap-2`}
						>
							<Plus size={16} />
							Add Invoice
						</button>
						{/* Export CSV Button */}
						<button
							onClick={handleExportCSV}
							className={`border ${colors.border} ${colors.hoverSecondary} ${colors.foreground} rounded-xl text-sm px-4 py-2 transition-all duration-200 font-medium flex items-center gap-2`}
						>
							<Download size={16} />
							Export CSV
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
									onClick={() => requestSort("invoiceNumber")}
								>
									<div className="flex items-center gap-2">
										Invoice #
										{sortConfig?.key === "invoiceNumber" && (
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
									onClick={() => requestSort("client")}
								>
									<div className="flex items-center gap-2">
										Client
										{sortConfig?.key === "client" && (
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
									onClick={() => requestSort("amount")}
								>
									<div className="flex items-center gap-2">
										Amount
										{sortConfig?.key === "amount" && (
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
									onClick={() => requestSort("status")}
								>
									<div className="flex items-center gap-2">
										Status
										{sortConfig?.key === "status" && (
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
									onClick={() => requestSort("issueDate")}
								>
									<div className="flex items-center gap-2">
										Issue Date
										{sortConfig?.key === "issueDate" && (
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
									onClick={() => requestSort("dueDate")}
								>
									<div className="flex items-center gap-2">
										Due Date
										{sortConfig?.key === "dueDate" && (
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
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{filteredInvoices.length === 0 ? (
								<tr>
									<td colSpan="8" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No invoices found</p>
									</td>
								</tr>
							) : (
								filteredInvoices.map((invoice) => (
									<tr
										key={invoice.id}
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
												<FileText size={16} className={colors.textSecondary} />
												<span
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{invoice.invoiceNumber}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div>
												<div
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{invoice.client}
												</div>
												<div className={`text-xs ${colors.textMuted} mt-0.5`}>
													{invoice.clientEmail}
												</div>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-semibold ${colors.foreground}`}
											>
												{formatCurrency(invoice.amount)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`px-2.5 py-1 rounded-md text-xs font-medium border ${getStatusColor(
													invoice.status
												)}`}
											>
												{invoice.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{invoice.issueDate}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{invoice.dueDate}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="View"
													onClick={() => handleViewInvoice(invoice)}
												>
													<Eye size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Edit"
													onClick={() =>
														toast.info(
															`Editing invoice ${invoice.invoiceNumber}`
														)
													}
												>
													<Pen size={16} className={colors.textSecondary} />
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Download"
													onClick={() =>
														toast.info(
															`Downloading invoice ${invoice.invoiceNumber}`
														)
													}
												>
													<Download
														size={16}
														className={colors.textSecondary}
													/>
												</button>
												<button
													className={`p-1.5 rounded-lg ${colors.hoverSecondary} transition-colors`}
													title="Delete"
													onClick={() => handleRemoveInvoice(invoice.id)}
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

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div
						className={`${colors.card} p-6 rounded ${colors.shadow} max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border ${colors.border}`}
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className={`text-lg font-semibold ${colors.foreground}`}>
								Add New Invoice
							</h2>
							<button
								onClick={handleModalClose}
								className={`${colors.textMuted} ${colors.hoverSecondary} transition-colors`}
							>
								×
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-1`}
								>
									Invoice Number *
								</label>
								<input
									type="text"
									name="invoiceNumber"
									placeholder="INV-2024-XXX"
									value={newInvoice.invoiceNumber}
									onChange={handleInputChange}
									className={`border ${colors.border} ${
										colors.input
									} rounded px-3 py-2 w-full outline-none ${
										colors.background
									} ${colors.foreground} placeholder:${
										colors.mutedForeground
									} ${getFocusRingClass(colorScheme)}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-1`}
								>
									Client Name *
								</label>
								<input
									type="text"
									name="client"
									placeholder="Client Company"
									value={newInvoice.client}
									onChange={handleInputChange}
									className={`border ${colors.border} ${
										colors.input
									} rounded px-3 py-2 w-full outline-none ${
										colors.background
									} ${colors.foreground} placeholder:${
										colors.mutedForeground
									} ${getFocusRingClass(colorScheme)}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-1`}
								>
									Client Email
								</label>
								<input
									type="email"
									name="clientEmail"
									placeholder="client@company.com"
									value={newInvoice.clientEmail}
									onChange={handleInputChange}
									className={`border ${colors.border} ${
										colors.input
									} rounded px-3 py-2 w-full outline-none ${
										colors.background
									} ${colors.foreground} placeholder:${
										colors.mutedForeground
									} ${getFocusRingClass(colorScheme)}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-1`}
								>
									Status
								</label>
								<select
									name="status"
									value={newInvoice.status}
									onChange={handleInputChange}
									className={`border ${colors.border} ${
										colors.input
									} rounded px-3 py-2 w-full outline-none ${
										colors.background
									} ${colors.foreground} ${getFocusRingClass(colorScheme)}`}
								>
									<option value="Pending">Pending</option>
									<option value="Paid">Paid</option>
									<option value="Overdue">Overdue</option>
								</select>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-1`}
								>
									Issue Date
								</label>
								<input
									type="date"
									name="issueDate"
									value={newInvoice.issueDate}
									onChange={handleInputChange}
									className={`border ${colors.border} ${
										colors.input
									} rounded px-3 py-2 w-full outline-none ${
										colors.background
									} ${colors.foreground} ${getFocusRingClass(colorScheme)}`}
								/>
							</div>
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-1`}
								>
									Due Date
								</label>
								<input
									type="date"
									name="dueDate"
									value={newInvoice.dueDate}
									onChange={handleInputChange}
									className={`border ${colors.border} ${
										colors.input
									} rounded px-3 py-2 w-full outline-none ${
										colors.background
									} ${colors.foreground} ${getFocusRingClass(colorScheme)}`}
								/>
							</div>
							<div className="md:col-span-2">
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-1`}
								>
									Description
								</label>
								<textarea
									name="description"
									placeholder="Invoice description or notes..."
									value={newInvoice.description}
									onChange={handleInputChange}
									rows={3}
									className={`border ${colors.border} ${
										colors.input
									} rounded px-3 py-2 w-full outline-none ${
										colors.background
									} ${colors.foreground} placeholder:${
										colors.mutedForeground
									} ${getFocusRingClass(colorScheme)}`}
								/>
							</div>
						</div>

						<div className="mt-6">
							<div className="flex justify-between items-center mb-4">
								<label
									className={`block text-sm font-semibold ${colors.textSecondary}`}
								>
									Invoice Items *
								</label>
								<button
									type="button"
									onClick={handleAddItem}
									className={`flex items-center gap-1 ${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-3 py-1.5 rounded transition-all duration-100 ease-in`}
								>
									<Plus size={14} />
									Add Item
								</button>
							</div>
							<div
								className={`border ${colors.border} rounded-lg overflow-hidden`}
							>
								<table className={`min-w-full ${colors.card}`}>
									<thead className={colors.muted}>
										<tr>
											<th
												className={`py-2 px-3 text-left text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Item Name
											</th>
											<th
												className={`py-2 px-3 text-center text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Quantity
											</th>
											<th
												className={`py-2 px-3 text-right text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Price
											</th>
											<th
												className={`py-2 px-3 text-right text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Total
											</th>
											<th
												className={`py-2 px-3 text-center text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{invoiceItems.map((item) => (
											<tr
												key={item.id}
												className={`border-b ${colors.border} ${colors.hover}`}
											>
												<td className={`py-2 px-3 ${colors.foreground}`}>
													<input
														type="text"
														placeholder="Item name"
														value={item.name}
														onChange={(e) =>
															handleItemChange(item.id, "name", e.target.value)
														}
														className={`border ${colors.border} ${
															colors.input
														} rounded px-2 py-1 w-full text-sm outline-none ${
															colors.background
														} ${colors.foreground} placeholder:${
															colors.mutedForeground
														} ${getFocusRingClass(colorScheme)}`}
													/>
												</td>
												<td className={`py-2 px-3 ${colors.foreground}`}>
													<input
														type="number"
														placeholder="Qty"
														value={item.quantity}
														onChange={(e) =>
															handleItemChange(
																item.id,
																"quantity",
																e.target.value
															)
														}
														min="1"
														step="1"
														className={`border ${colors.border} ${
															colors.input
														} rounded px-2 py-1 w-full text-sm outline-none ${
															colors.background
														} ${colors.foreground} placeholder:${
															colors.mutedForeground
														} ${getFocusRingClass(colorScheme)} text-center`}
													/>
												</td>
												<td className={`py-2 px-3 ${colors.foreground}`}>
													<input
														type="number"
														placeholder="0.00"
														value={item.price}
														onChange={(e) =>
															handleItemChange(item.id, "price", e.target.value)
														}
														min="0"
														step="0.01"
														className={`border ${colors.border} ${
															colors.input
														} rounded px-2 py-1 w-full text-sm outline-none ${
															colors.background
														} ${colors.foreground} placeholder:${
															colors.mutedForeground
														} ${getFocusRingClass(colorScheme)} text-right`}
													/>
												</td>
												<td
													className={`py-2 px-3 text-right text-sm font-medium ${colors.foreground}`}
												>
													{formatCurrency(
														(parseFloat(item.quantity) || 0) *
															(parseFloat(item.price) || 0)
													)}
												</td>
												<td className="py-2 px-3 text-center">
													<button
														type="button"
														onClick={() => handleRemoveItem(item.id)}
														className="text-red-600 hover:text-red-800 transition-colors"
													>
														<Trash size={16} />
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<div className="flex justify-end mt-4">
								<div
									className={`${colors.muted} p-4 rounded-lg w-full md:w-80`}
								>
									<div className="flex justify-between items-center">
										<span
											className={`text-base font-semibold ${colors.foreground}`}
										>
											Total Amount:
										</span>
										<span className={`text-xl font-bold ${colors.foreground}`}>
											{formatCurrency(calculateTotal())}
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="flex justify-end gap-2 mt-6">
							<button
								onClick={handleModalClose}
								className={`${colors.secondary} ${colors.hoverSecondary} ${colors.secondaryForeground} rounded px-4 py-2 text-sm transition-all duration-100 ease-in`}
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded px-4 py-2 text-sm transition-all duration-100 ease-in hover:px-6`}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			{isViewModalOpen && selectedInvoice && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div
						className={`${colors.card} p-8 rounded ${colors.shadow} max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto border ${colors.border}`}
					>
						<div className="flex justify-between items-start mb-6">
							<div>
								<h2 className={`text-2xl font-bold ${colors.foreground}`}>
									Invoice Details
								</h2>
								<p className={`text-sm ${colors.textMuted} mt-1`}>
									{selectedInvoice.invoiceNumber}
								</p>
							</div>
							<button
								onClick={handleCloseViewModal}
								className={`${colors.textMuted} ${colors.hoverSecondary} p-1 rounded transition-colors`}
							>
								<X size={24} />
							</button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div>
								<h3
									className={`text-sm font-semibold ${colors.textSecondary} mb-2`}
								>
									Bill To
								</h3>
								<div className={`${colors.muted} p-4 rounded`}>
									<p className={`font-medium ${colors.foreground}`}>
										{selectedInvoice.client}
									</p>
									<p className={`text-sm ${colors.textSecondary} mt-1`}>
										{selectedInvoice.clientEmail}
									</p>
								</div>
							</div>
							<div>
								<h3
									className={`text-sm font-semibold ${colors.textSecondary} mb-2`}
								>
									Invoice Information
								</h3>
								<div className={`${colors.muted} p-4 rounded space-y-2`}>
									<div className="flex justify-between">
										<span className={`text-sm ${colors.textSecondary}`}>
											Status:
										</span>
										<span
											className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
												selectedInvoice.status
											)}`}
										>
											{selectedInvoice.status}
										</span>
									</div>
									<div className="flex justify-between">
										<span className={`text-sm ${colors.textSecondary}`}>
											Issue Date:
										</span>
										<span
											className={`text-sm font-medium ${colors.foreground}`}
										>
											{selectedInvoice.issueDate}
										</span>
									</div>
									<div className="flex justify-between">
										<span className={`text-sm ${colors.textSecondary}`}>
											Due Date:
										</span>
										<span
											className={`text-sm font-medium ${colors.foreground}`}
										>
											{selectedInvoice.dueDate}
										</span>
									</div>
								</div>
							</div>
						</div>

						{selectedInvoice.description && (
							<div className="mb-6">
								<h3
									className={`text-sm font-semibold ${colors.textSecondary} mb-2`}
								>
									Description
								</h3>
								<p
									className={`text-sm ${colors.textSecondary} ${colors.muted} p-4 rounded`}
								>
									{selectedInvoice.description}
								</p>
							</div>
						)}

						<div className="mb-6">
							<h3
								className={`text-sm font-semibold ${colors.textSecondary} mb-4`}
							>
								Items
							</h3>
							<div
								className={`border ${colors.border} rounded-lg overflow-hidden`}
							>
								<table className={`min-w-full ${colors.card}`}>
									<thead className={colors.muted}>
										<tr>
											<th
												className={`py-3 px-4 text-left text-sm font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Item
											</th>
											<th
												className={`py-3 px-4 text-center text-sm font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Quantity
											</th>
											<th
												className={`py-3 px-4 text-right text-sm font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Price
											</th>
											<th
												className={`py-3 px-4 text-right text-sm font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Total
											</th>
										</tr>
									</thead>
									<tbody>
										{selectedInvoice.items.map((item, index) => (
											<tr
												key={index}
												className={`border-b ${colors.border} ${colors.hover}`}
											>
												<td
													className={`py-3 px-4 text-sm ${colors.foreground}`}
												>
													{item.name}
												</td>
												<td
													className={`py-3 px-4 text-sm ${colors.textSecondary} text-center`}
												>
													{item.quantity}
												</td>
												<td
													className={`py-3 px-4 text-sm ${colors.textSecondary} text-right`}
												>
													{formatCurrency(item.price)}
												</td>
												<td
													className={`py-3 px-4 text-sm font-semibold ${colors.foreground} text-right`}
												>
													{formatCurrency(item.quantity * item.price)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className="flex justify-end">
							<div className={`${colors.muted} p-6 rounded-lg w-full md:w-96`}>
								<div className="flex justify-between items-center mb-2">
									<span
										className={`text-lg font-semibold ${colors.foreground}`}
									>
										Total Amount:
									</span>
									<span className={`text-2xl font-bold ${colors.foreground}`}>
										{formatCurrency(selectedInvoice.amount)}
									</span>
								</div>
							</div>
						</div>

						<div className="flex justify-end gap-2 mt-6">
							<button
								onClick={handleCloseViewModal}
								className={`${colors.secondary} ${colors.hoverSecondary} ${colors.secondaryForeground} rounded px-4 py-2 text-sm transition-all duration-100 ease-in`}
							>
								Close
							</button>
							<button
								onClick={() => {
									toast.info(
										`Downloading invoice ${selectedInvoice.invoiceNumber}`
									);
								}}
								className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded px-4 py-2 text-sm transition-all duration-100 ease-in hover:px-6 flex items-center gap-2`}
							>
								<Download size={16} />
								Download PDF
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Invoices;
