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
	CheckCircle2,
	DollarSign,
	Wallet,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "sonner";
import { CategoryBarChartCard } from "@/components/charts/CategoryBarChartCard";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";
import { ExportDropdown } from "../../lib/ui/dropdown";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import {
	INITIAL_INVOICES,
	formatCurrency,
	getInvoiceStatusColor,
} from "../CRM/invoicesSeedData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const textareaClass =
	"flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const Invoices = () => {
	const router = useRouter();
	// Theme hook
	const { theme, colorScheme, colors } = useTheme();

	const [invoices, setInvoices] = useState(INITIAL_INVOICES);
	const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);
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

	const allInvoicesSelected =
		filteredInvoices.length > 0 &&
		filteredInvoices.every((inv) => selectedInvoiceIds.includes(inv.id));

	const toggleSelectAllInvoices = () => {
		if (allInvoicesSelected) {
			const visible = new Set(filteredInvoices.map((i) => i.id));
			setSelectedInvoiceIds((prev) => prev.filter((id) => !visible.has(id)));
		} else {
			const ids = filteredInvoices.map((i) => i.id);
			setSelectedInvoiceIds((prev) => [...new Set([...prev, ...ids])]);
		}
	};

	const toggleInvoiceSelection = (invoiceId) => {
		setSelectedInvoiceIds((prev) =>
			prev.includes(invoiceId)
				? prev.filter((id) => id !== invoiceId)
				: [...prev, invoiceId]
		);
	};

	const invoiceStats = useMemo(() => {
		const total = invoices.length;
		const totalValue = invoices.reduce((s, i) => s + i.amount, 0);
		const paidValue = invoices
			.filter((i) => i.status === "Paid")
			.reduce((s, i) => s + i.amount, 0);
		const outstanding = invoices
			.filter((i) => i.status !== "Paid")
			.reduce((s, i) => s + i.amount, 0);
		return { total, totalValue, paidValue, outstanding };
	}, [invoices]);

	const statusCountData = useMemo(() => {
		const paid = invoices.filter((i) => i.status === "Paid").length;
		const pending = invoices.filter((i) => i.status === "Pending").length;
		const overdue = invoices.filter((i) => i.status === "Overdue").length;
		return [
			{ name: "Paid", count: paid },
			{ name: "Pending", count: pending },
			{ name: "Overdue", count: overdue },
		];
	}, [invoices]);

	const amountByStatusData = useMemo(() => {
		return ["Paid", "Pending", "Overdue"].map((status) => ({
			name: status,
			amount: invoices
				.filter((i) => i.status === status)
				.reduce((s, i) => s + i.amount, 0),
		}));
	}, [invoices]);

	return (
		<div
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar transition-all duration-100 ease-in`}
		>
			{/* Stats + charts */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-blue-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-sm border border-blue-500/20">
								<FileText className="text-blue-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{invoiceStats.total}</p>
						<p className="text-sm text-muted-foreground mt-1">Total invoices</p>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-purple-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-sm border border-purple-500/20">
								<DollarSign className="text-purple-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{formatCurrency(invoiceStats.totalValue)}</p>
						<p className="text-sm text-muted-foreground mt-1">Total billed</p>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/20 to-green-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-sm border border-green-500/20">
								<CheckCircle2 className="text-green-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{formatCurrency(invoiceStats.paidValue)}</p>
						<p className="text-sm text-muted-foreground mt-1">Collected (paid)</p>
					</CardContent>
				</Card>
				<Card className="relative overflow-hidden">
					<div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-orange-600/10 rounded-full blur-2xl" />
					<CardContent className="relative p-6">
						<div className="flex items-center justify-between mb-2">
							<div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-sm border border-orange-500/20">
								<Wallet className="text-orange-500" size={20} />
							</div>
						</div>
						<p className="text-2xl font-bold">{formatCurrency(invoiceStats.outstanding)}</p>
						<p className="text-sm text-muted-foreground mt-1">Outstanding</p>
					</CardContent>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
				<CategoryBarChartCard
					title="Invoices by status"
					description="Count breakdown (matches totals above)"
					data={statusCountData}
					valueLabel="Invoices"
					color="var(--chart-1)"
				/>
				<CategoryBarChartCard
					title="Amount by status"
					description="USD split across paid, pending, and overdue"
					data={amountByStatusData}
					dataKey="amount"
					valueLabel="Amount"
					color="var(--chart-3)"
				/>
			</div>

			{/* Table Header */}
			<div
					className={`flex flex-col md:flex-row items-start md:items-center justify-between p-2 gap-4`}
				>
					<div className="flex-1">
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Recent Invoices
						</h2>
						<p className={`text-sm ${colors.mutedForeground} mt-1`}>
							View and manage all your invoices
						</p>
					</div>
					<div className="flex md:justify-end justify-start items-center gap-2 flex-wrap w-full md:w-auto">
						<div className="relative flex gap-2 items-center w-full md:w-auto">
							<Search size={18} className="absolute left-3 text-muted-foreground pointer-events-none" />
							<Input
								type="text"
								placeholder="Search invoices..."
								className="pl-9"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<Button onClick={handleAddInvoice}>
							<Plus size={16} />
							Add Invoice
						</Button>
						<ExportDropdown
							onExportCsv={handleExportCSV}
							onExportPdf={handleExportCSV}
							onExportJson={handleExportCSV}
						/>
					</div>
				</div>
			{/* Invoices Table - Improved */}
			<Card className="overflow-hidden my-4">
				

				{/* Table */}
				<Table className="w-full">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									<Checkbox
										checked={allInvoicesSelected}
										onCheckedChange={toggleSelectAllInvoices}
										aria-label="Select all invoices"
									/>
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
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
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.card} divide-y ${colors.border}`}>
							{filteredInvoices.length === 0 ? (
								<TableRow>
									<TableCell colSpan="8" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No invoices found</p>
									</TableCell>
								</TableRow>
							) : (
								filteredInvoices.map((invoice) => (
									<TableRow
										key={invoice.id}
										className={`${colors.hover} transition-colors cursor-pointer`}
										onClick={() => router.push(`/invoices/${invoice.id}`)}
									>
										<TableCell
											className="px-6 py-4 whitespace-nowrap"
											onClick={(e) => e.stopPropagation()}
										>
											<Checkbox
												checked={selectedInvoiceIds.includes(invoice.id)}
												onCheckedChange={() => toggleInvoiceSelection(invoice.id)}
												aria-label={`Select ${invoice.invoiceNumber}`}
											/>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<FileText size={16} className={colors.textSecondary} />
												<Link href={`/invoices/${invoice.id}`} passHref>
													<a
														className={`text-sm font-medium ${colors.foreground} hover:underline`}
													>
														{invoice.invoiceNumber}
													</a>
												</Link>
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
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
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-semibold ${colors.foreground}`}
											>
												{formatCurrency(invoice.amount)}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<Badge className={getInvoiceStatusColor(invoice.status)}>
												{invoice.status}
											</Badge>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{invoice.issueDate}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{invoice.dueDate}
											</div>
										</TableCell>
										<TableCell
											className="px-6 py-4 whitespace-nowrap"
											onClick={(e) => e.stopPropagation()}
										>
											<div className="flex items-center gap-1">
												<Button variant="ghost" size="icon" asChild title="View invoice">
													<Link href={`/invoices/${invoice.id}`}>
														<a>
															<Eye size={16} />
														</a>
													</Link>
												</Button>
												<Button
													variant="ghost"
													size="icon"
													title="Edit"
													onClick={() =>
														toast.info(
															`Editing invoice ${invoice.invoiceNumber}`
														)
													}
												>
													<Pen size={16} />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													title="Download"
													onClick={() =>
														toast.info(
															`Downloading invoice ${invoice.invoiceNumber}`
														)
													}
												>
													<Download size={16} />
												</Button>
												<Button
													variant="ghost"
													size="icon"
													title="Delete"
													onClick={() => handleRemoveInvoice(invoice.id)}
												>
													<Trash size={16} />
												</Button>
											</div>
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
				title="Add New Invoice"
				onSubmit={handleSubmit}
				saveLabel="Save"
				maxWidth="max-w-2xl"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField label="Invoice Number" htmlFor="invoice-number" required>
						<Input
							id="invoice-number"
							type="text"
							name="invoiceNumber"
							placeholder="INV-2024-XXX"
							value={newInvoice.invoiceNumber}
							onChange={handleInputChange}
						/>
					</FormField>
					<FormField label="Client Name" htmlFor="invoice-client" required>
						<Input
							id="invoice-client"
							type="text"
							name="client"
							placeholder="Client Company"
							value={newInvoice.client}
							onChange={handleInputChange}
						/>
					</FormField>
					<FormField label="Client Email" htmlFor="invoice-email">
						<Input
							id="invoice-email"
							type="email"
							name="clientEmail"
							placeholder="client@company.com"
							value={newInvoice.clientEmail}
							onChange={handleInputChange}
						/>
					</FormField>
					<FormField label="Status" htmlFor="invoice-status">
						<FormSelect
							id="invoice-status"
							value={newInvoice.status}
							onChange={(e) =>
								handleInputChange({
									target: { name: "status", value: e.target.value },
								})
							}
							options={["Pending", "Paid", "Overdue"]}
						/>
					</FormField>
					<FormField label="Issue Date" htmlFor="invoice-issue-date">
						<Input
							id="invoice-issue-date"
							type="date"
							name="issueDate"
							value={newInvoice.issueDate}
							onChange={handleInputChange}
						/>
					</FormField>
					<FormField label="Due Date" htmlFor="invoice-due-date">
						<Input
							id="invoice-due-date"
							type="date"
							name="dueDate"
							value={newInvoice.dueDate}
							onChange={handleInputChange}
						/>
					</FormField>
					<div className="md:col-span-2">
						<FormField label="Description" htmlFor="invoice-description">
							<textarea
								id="invoice-description"
								name="description"
								placeholder="Invoice description or notes..."
								value={newInvoice.description}
								onChange={handleInputChange}
								rows={3}
								className={cn(textareaClass)}
							/>
						</FormField>
					</div>
				</div>

				<div className="mt-2">
					<div className="flex justify-between items-center mb-4">
						<span className={`block text-sm font-semibold ${colors.textSecondary}`}>
							Invoice Items *
						</span>
						<Button type="button" size="sm" onClick={handleAddItem}>
							<Plus size={14} />
							Add Item
						</Button>
					</div>
					<div
						className={`border ${colors.border} rounded-xl overflow-hidden`}
					>
						<Table className={`min-w-full ${colors.card}`}>
							<TableHeader className={colors.muted}>
								<TableRow>
									<TableHead
										className={`py-2 px-3 text-left text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Item Name
									</TableHead>
									<TableHead
										className={`py-2 px-3 text-center text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Quantity
									</TableHead>
									<TableHead
										className={`py-2 px-3 text-right text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Price
									</TableHead>
									<TableHead
										className={`py-2 px-3 text-right text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Total
									</TableHead>
									<TableHead
										className={`py-2 px-3 text-center text-xs font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Action
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{invoiceItems.map((item) => (
									<TableRow
										key={item.id}
										className={`border-b ${colors.border} ${colors.hover}`}
									>
										<TableCell className={`py-2 px-3 ${colors.foreground}`}>
											<Input
												type="text"
												placeholder="Item name"
												value={item.name}
												onChange={(e) =>
													handleItemChange(item.id, "name", e.target.value)
												}
												className="h-8 text-sm"
											/>
										</TableCell>
										<TableCell className={`py-2 px-3 ${colors.foreground}`}>
											<Input
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
												className="h-8 text-sm text-center"
											/>
										</TableCell>
										<TableCell className={`py-2 px-3 ${colors.foreground}`}>
											<Input
												type="number"
												placeholder="0.00"
												value={item.price}
												onChange={(e) =>
													handleItemChange(item.id, "price", e.target.value)
												}
												min="0"
												step="0.01"
												className="h-8 text-sm text-right"
											/>
										</TableCell>
										<TableCell
											className={`py-2 px-3 text-right text-sm font-medium ${colors.foreground}`}
										>
											{formatCurrency(
												(parseFloat(item.quantity) || 0) *
													(parseFloat(item.price) || 0)
											)}
										</TableCell>
										<TableCell className="py-2 px-3 text-center">
											<Button
												type="button"
												variant="ghost"
												size="icon"
												onClick={() => handleRemoveItem(item.id)}
												className="text-red-600 hover:text-red-800"
											>
												<Trash size={16} />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<div className="flex justify-end mt-4">
						<div
							className={`${colors.muted} p-4 rounded-xl w-full md:w-80`}
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
			</FormModal>

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
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={handleCloseViewModal}
								aria-label="Close"
							>
								<X size={24} />
							</Button>
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
										<Badge className={getInvoiceStatusColor(selectedInvoice.status)}>
											{selectedInvoice.status}
										</Badge>
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
								className={`border ${colors.border} rounded-xl overflow-hidden`}
							>
								<Table className={`min-w-full ${colors.card}`}>
									<TableHeader className={colors.muted}>
										<TableRow>
											<TableHead
												className={`py-3 px-4 text-left text-sm font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Item
											</TableHead>
											<TableHead
												className={`py-3 px-4 text-center text-sm font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Quantity
											</TableHead>
											<TableHead
												className={`py-3 px-4 text-right text-sm font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Price
											</TableHead>
											<TableHead
												className={`py-3 px-4 text-right text-sm font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
											>
												Total
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{selectedInvoice.items.map((item, index) => (
											<TableRow
												key={index}
												className={`border-b ${colors.border} ${colors.hover}`}
											>
												<TableCell
													className={`py-3 px-4 text-sm ${colors.foreground}`}
												>
													{item.name}
												</TableCell>
												<TableCell
													className={`py-3 px-4 text-sm ${colors.textSecondary} text-center`}
												>
													{item.quantity}
												</TableCell>
												<TableCell
													className={`py-3 px-4 text-sm ${colors.textSecondary} text-right`}
												>
													{formatCurrency(item.price)}
												</TableCell>
												<TableCell
													className={`py-3 px-4 text-sm font-semibold ${colors.foreground} text-right`}
												>
													{formatCurrency(item.quantity * item.price)}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>

						<div className="flex justify-end">
							<div className={`${colors.muted} p-6 rounded-xl w-full md:w-96`}>
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
							<Button
								type="button"
								onClick={() => {
									toast.info(
										`Downloading invoice ${selectedInvoice.invoiceNumber}`
									);
								}}
							>
								<Download size={16} />
								Download PDF
							</Button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Invoices;
