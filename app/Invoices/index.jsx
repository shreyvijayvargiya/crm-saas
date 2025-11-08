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
import colors from "tailwindcss/colors";

const Invoices = () => {
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
		switch (status) {
			case "Paid":
				return "bg-green-100 text-green-800";
			case "Pending":
				return "bg-yellow-100 text-yellow-800";
			case "Overdue":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	return (
		<div className="p-6 overflow-y-scroll max-h-screen hidescrollbar">
			<div className="flex justify-between items-center flex-wrap my-4">
				<p className="text-xl font-semibold">Recent Invoices</p>
				<div className="flex md:justify-end justify-start items-center gap-2 flex-wrap">
					<div className="flex gap-2 items-center border rounded px-2 py-1">
						<Search size={18} color={colors.gray[500]} />
						<input
							type="text"
							placeholder="Search invoices..."
							className="outline-none"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<button
						onClick={handleAddInvoice}
						className="bg-gray-800 hover:bg-gray-900 rounded text-white text-xs px-4 py-2 transition-all duration-100 ease-in hover:px-6"
					>
						Add Invoice
					</button>
					<button
						onClick={handleExportCSV}
						className="border-gray-900 border hover:text-white hover:bg-gray-900 rounded text-gray-800 px-4 py-2 transition-all duration-100 ease-in hover:px-6 text-xs flex items-center gap-1"
					>
						<Download size={16} />
						Export CSV
					</button>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border">
					<thead className="hover:bg-gray-50">
						<tr>
							<th className="py-2 px-4 border-b text-left">
								<input type="checkbox" />
							</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("invoiceNumber")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Invoice #</span>
									{sortConfig?.key === "invoiceNumber" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} color={colors.gray[500]} />
										) : (
											<ChevronDown size={16} color={colors.gray[500]} />
										))}
								</div>
							</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("client")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Client</span>
									{sortConfig?.key === "client" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} color={colors.gray[500]} />
										) : (
											<ChevronDown size={16} color={colors.gray[500]} />
										))}
								</div>
							</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("amount")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Amount</span>
									{sortConfig?.key === "amount" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} color={colors.gray[500]} />
										) : (
											<ChevronDown size={16} color={colors.gray[500]} />
										))}
								</div>
							</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("status")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Status</span>
									{sortConfig?.key === "status" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} color={colors.gray[500]} />
										) : (
											<ChevronDown size={16} color={colors.gray[500]} />
										))}
								</div>
							</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("issueDate")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Issue Date</span>
									{sortConfig?.key === "issueDate" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} color={colors.gray[500]} />
										) : (
											<ChevronDown size={16} color={colors.gray[500]} />
										))}
								</div>
							</th>
							<th
								className="py-2 px-4 border-b text-left cursor-pointer"
								onClick={() => requestSort("dueDate")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Due Date</span>
									{sortConfig?.key === "dueDate" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} color={colors.gray[500]} />
										) : (
											<ChevronDown size={16} color={colors.gray[500]} />
										))}
								</div>
							</th>
							<th className="py-2 px-4 border-b text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredInvoices.map((invoice) => (
							<tr key={invoice.id} className="hover:bg-gray-50">
								<td className="py-2 px-4">
									<input type="checkbox" className="mr-2" />
								</td>
								<td className="py-2 px-4">
									<div className="flex items-center gap-2">
										<FileText size={16} color={colors.gray[500]} />
										<span className="font-medium">{invoice.invoiceNumber}</span>
									</div>
								</td>
								<td className="py-2 px-4">
									<div>
										<div className="font-medium">{invoice.client}</div>
										<div className="text-xs text-gray-500">
											{invoice.clientEmail}
										</div>
									</div>
								</td>
								<td className="py-2 px-4 font-semibold">
									{formatCurrency(invoice.amount)}
								</td>
								<td className="py-2 px-4">
									<span
										className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
											invoice.status
										)}`}
									>
										{invoice.status}
									</span>
								</td>
								<td className="py-2 px-4">{invoice.issueDate}</td>
								<td className="py-2 px-4">{invoice.dueDate}</td>
								<td className="py-1 px-4 flex items-center gap-2">
									<Eye
										size={16}
										color={colors.gray[700]}
										className="cursor-pointer hover:text-blue-600"
										onClick={() => handleViewInvoice(invoice)}
									/>
									<Pen
										size={16}
										color={colors.gray[700]}
										className="cursor-pointer hover:text-green-600"
										onClick={() =>
											toast.info(`Editing invoice ${invoice.invoiceNumber}`)
										}
									/>
									<Download
										size={16}
										color={colors.gray[700]}
										className="cursor-pointer hover:text-purple-600"
										onClick={() =>
											toast.info(`Downloading invoice ${invoice.invoiceNumber}`)
										}
									/>
									<Trash
										size={16}
										color={colors.gray[700]}
										className="cursor-pointer hover:text-red-600"
										onClick={() => handleRemoveInvoice(invoice.id)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex items-center justify-end my-4">
				<ChevronLeft
					size={18}
					color={colors.gray[500]}
					className="cursor-pointer"
					onClick={() => toast.info("Previous page")}
				/>
				{Array.from({ length: 5 }, (_, index) => (
					<button
						key={index}
						className={`mx-1 px-3 py-1 rounded hover:bg-gray-50 ${
							index === 0 ? "bg-gray-100 text-gray-800" : "text-gray-700"
						}`}
						onClick={() => toast.info(`Page ${index + 1}`)}
					>
						{index + 1}
					</button>
				))}
				<ChevronRight
					size={18}
					color={colors.gray[500]}
					className="cursor-pointer"
					onClick={() => toast.info("Next page")}
				/>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-6 rounded shadow-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-lg font-semibold">Add New Invoice</h2>
							<button
								onClick={handleModalClose}
								className="text-gray-500 hover:text-gray-700"
							>
								×
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Invoice Number *
								</label>
								<input
									type="text"
									name="invoiceNumber"
									placeholder="INV-2024-XXX"
									value={newInvoice.invoiceNumber}
									onChange={handleInputChange}
									className="border rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-gray-800"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Client Name *
								</label>
								<input
									type="text"
									name="client"
									placeholder="Client Company"
									value={newInvoice.client}
									onChange={handleInputChange}
									className="border rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-gray-800"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Client Email
								</label>
								<input
									type="email"
									name="clientEmail"
									placeholder="client@company.com"
									value={newInvoice.clientEmail}
									onChange={handleInputChange}
									className="border rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-gray-800"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Status
								</label>
								<select
									name="status"
									value={newInvoice.status}
									onChange={handleInputChange}
									className="border rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-gray-800"
								>
									<option value="Pending">Pending</option>
									<option value="Paid">Paid</option>
									<option value="Overdue">Overdue</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Issue Date
								</label>
								<input
									type="date"
									name="issueDate"
									value={newInvoice.issueDate}
									onChange={handleInputChange}
									className="border rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-gray-800"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Due Date
								</label>
								<input
									type="date"
									name="dueDate"
									value={newInvoice.dueDate}
									onChange={handleInputChange}
									className="border rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-gray-800"
								/>
							</div>
							<div className="md:col-span-2">
								<label className="block text-sm font-medium text-gray-700 mb-1">
									Description
								</label>
								<textarea
									name="description"
									placeholder="Invoice description or notes..."
									value={newInvoice.description}
									onChange={handleInputChange}
									rows={3}
									className="border rounded px-3 py-2 w-full outline-none focus:ring-2 focus:ring-gray-800"
								/>
							</div>
						</div>

						<div className="mt-6">
							<div className="flex justify-between items-center mb-4">
								<label className="block text-sm font-semibold text-gray-700">
									Invoice Items *
								</label>
								<button
									type="button"
									onClick={handleAddItem}
									className="flex items-center gap-1 bg-gray-800 hover:bg-gray-900 text-white text-xs px-3 py-1.5 rounded transition-all duration-100 ease-in"
								>
									<Plus size={14} />
									Add Item
								</button>
							</div>
							<div className="border rounded-lg overflow-hidden">
								<table className="min-w-full">
									<thead className="bg-gray-50">
										<tr>
											<th className="py-2 px-3 text-left text-xs font-semibold text-gray-700 border-b">
												Item Name
											</th>
											<th className="py-2 px-3 text-center text-xs font-semibold text-gray-700 border-b">
												Quantity
											</th>
											<th className="py-2 px-3 text-right text-xs font-semibold text-gray-700 border-b">
												Price
											</th>
											<th className="py-2 px-3 text-right text-xs font-semibold text-gray-700 border-b">
												Total
											</th>
											<th className="py-2 px-3 text-center text-xs font-semibold text-gray-700 border-b">
												Action
											</th>
										</tr>
									</thead>
									<tbody>
										{invoiceItems.map((item) => (
											<tr key={item.id} className="border-b hover:bg-gray-50">
												<td className="py-2 px-3">
													<input
														type="text"
														placeholder="Item name"
														value={item.name}
														onChange={(e) =>
															handleItemChange(item.id, "name", e.target.value)
														}
														className="border rounded px-2 py-1 w-full text-sm outline-none focus:ring-2 focus:ring-gray-800"
													/>
												</td>
												<td className="py-2 px-3">
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
														className="border rounded px-2 py-1 w-full text-sm outline-none focus:ring-2 focus:ring-gray-800 text-center"
													/>
												</td>
												<td className="py-2 px-3">
													<input
														type="number"
														placeholder="0.00"
														value={item.price}
														onChange={(e) =>
															handleItemChange(item.id, "price", e.target.value)
														}
														min="0"
														step="0.01"
														className="border rounded px-2 py-1 w-full text-sm outline-none focus:ring-2 focus:ring-gray-800 text-right"
													/>
												</td>
												<td className="py-2 px-3 text-right text-sm font-medium text-gray-800">
													{formatCurrency(
														(parseFloat(item.quantity) || 0) *
															(parseFloat(item.price) || 0)
													)}
												</td>
												<td className="py-2 px-3 text-center">
													<button
														type="button"
														onClick={() => handleRemoveItem(item.id)}
														className="text-red-600 hover:text-red-800"
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
								<div className="bg-gray-50 p-4 rounded-lg w-full md:w-80">
									<div className="flex justify-between items-center">
										<span className="text-base font-semibold text-gray-800">
											Total Amount:
										</span>
										<span className="text-xl font-bold text-gray-800">
											{formatCurrency(calculateTotal())}
										</span>
									</div>
								</div>
							</div>
						</div>

						<div className="flex justify-end gap-2 mt-6">
							<button
								onClick={handleModalClose}
								className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded px-4 py-2 text-sm transition-all duration-100 ease-in"
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className="bg-gray-800 hover:bg-gray-900 text-white rounded px-4 py-2 text-sm transition-all duration-100 ease-in hover:px-6"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			{isViewModalOpen && selectedInvoice && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div className="bg-white p-8 rounded shadow-lg max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-start mb-6">
							<div>
								<h2 className="text-2xl font-bold text-gray-800">
									Invoice Details
								</h2>
								<p className="text-sm text-gray-500 mt-1">
									{selectedInvoice.invoiceNumber}
								</p>
							</div>
							<button
								onClick={handleCloseViewModal}
								className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
							>
								<X size={24} />
							</button>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div>
								<h3 className="text-sm font-semibold text-gray-700 mb-2">
									Bill To
								</h3>
								<div className="bg-gray-50 p-4 rounded">
									<p className="font-medium text-gray-800">
										{selectedInvoice.client}
									</p>
									<p className="text-sm text-gray-600 mt-1">
										{selectedInvoice.clientEmail}
									</p>
								</div>
							</div>
							<div>
								<h3 className="text-sm font-semibold text-gray-700 mb-2">
									Invoice Information
								</h3>
								<div className="bg-gray-50 p-4 rounded space-y-2">
									<div className="flex justify-between">
										<span className="text-sm text-gray-600">Status:</span>
										<span
											className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
												selectedInvoice.status
											)}`}
										>
											{selectedInvoice.status}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-gray-600">Issue Date:</span>
										<span className="text-sm font-medium text-gray-800">
											{selectedInvoice.issueDate}
										</span>
									</div>
									<div className="flex justify-between">
										<span className="text-sm text-gray-600">Due Date:</span>
										<span className="text-sm font-medium text-gray-800">
											{selectedInvoice.dueDate}
										</span>
									</div>
								</div>
							</div>
						</div>

						{selectedInvoice.description && (
							<div className="mb-6">
								<h3 className="text-sm font-semibold text-gray-700 mb-2">
									Description
								</h3>
								<p className="text-sm text-gray-600 bg-gray-50 p-4 rounded">
									{selectedInvoice.description}
								</p>
							</div>
						)}

						<div className="mb-6">
							<h3 className="text-sm font-semibold text-gray-700 mb-4">
								Items
							</h3>
							<div className="border rounded-lg overflow-hidden">
								<table className="min-w-full">
									<thead className="bg-gray-50">
										<tr>
											<th className="py-3 px-4 text-left text-sm font-semibold text-gray-700 border-b">
												Item
											</th>
											<th className="py-3 px-4 text-center text-sm font-semibold text-gray-700 border-b">
												Quantity
											</th>
											<th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 border-b">
												Price
											</th>
											<th className="py-3 px-4 text-right text-sm font-semibold text-gray-700 border-b">
												Total
											</th>
										</tr>
									</thead>
									<tbody>
										{selectedInvoice.items.map((item, index) => (
											<tr key={index} className="border-b">
												<td className="py-3 px-4 text-sm text-gray-800">
													{item.name}
												</td>
												<td className="py-3 px-4 text-sm text-gray-600 text-center">
													{item.quantity}
												</td>
												<td className="py-3 px-4 text-sm text-gray-600 text-right">
													{formatCurrency(item.price)}
												</td>
												<td className="py-3 px-4 text-sm font-semibold text-gray-800 text-right">
													{formatCurrency(item.quantity * item.price)}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className="flex justify-end">
							<div className="bg-gray-50 p-6 rounded-lg w-full md:w-96">
								<div className="flex justify-between items-center mb-2">
									<span className="text-lg font-semibold text-gray-800">
										Total Amount:
									</span>
									<span className="text-2xl font-bold text-gray-800">
										{formatCurrency(selectedInvoice.amount)}
									</span>
								</div>
							</div>
						</div>

						<div className="flex justify-end gap-2 mt-6">
							<button
								onClick={handleCloseViewModal}
								className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded px-4 py-2 text-sm transition-all duration-100 ease-in"
							>
								Close
							</button>
							<button
								onClick={() => {
									toast.info(
										`Downloading invoice ${selectedInvoice.invoiceNumber}`
									);
								}}
								className="bg-gray-800 hover:bg-gray-900 text-white rounded px-4 py-2 text-sm transition-all duration-100 ease-in hover:px-6 flex items-center gap-2"
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
