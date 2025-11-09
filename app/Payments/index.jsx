import {
	Search,
	X,
	Eye,
	ChevronDown,
	ChevronUp,
	ChevronLeft,
	ChevronRight,
	CreditCard,
	DollarSign,
	TrendingUp,
	Calendar,
	CheckCircle2,
	Clock,
	ArrowUpRight,
	ArrowDownRight,
	Plus,
} from "lucide-react";
import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Payments = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

	const initialPayments = [
		{
			id: "pay_001",
			transactionId: "TXN-2024-001",
			amount: 5000.0,
			currency: "USD",
			status: "Completed",
			paymentMethod: "Credit Card",
			customer: "Cloud Corp",
			customerEmail: "contact@cloudcorp.com",
			description: "Monthly subscription payment",
			date: "2024-06-25",
			time: "10:30 AM",
			fee: 150.0,
			netAmount: 4850.0,
			invoiceId: "INV-2024-001",
		},
		{
			id: "pay_002",
			transactionId: "TXN-2024-002",
			amount: 12000.0,
			currency: "USD",
			status: "Pending",
			paymentMethod: "Bank Transfer",
			customer: "Tech Innovations",
			customerEmail: "billing@techinnovations.com",
			description: "Q2 software license payment",
			date: "2024-06-26",
			time: "02:15 PM",
			fee: 360.0,
			netAmount: 11640.0,
			invoiceId: "INV-2024-002",
		},
		{
			id: "pay_003",
			transactionId: "TXN-2024-003",
			amount: 8500.0,
			currency: "USD",
			status: "Completed",
			paymentMethod: "PayPal",
			customer: "AI Labs",
			customerEmail: "finance@ailabs.io",
			description: "Custom development services",
			date: "2024-06-24",
			time: "09:45 AM",
			fee: 255.0,
			netAmount: 8245.0,
			invoiceId: "INV-2024-003",
		},
		{
			id: "pay_004",
			transactionId: "TXN-2024-004",
			amount: 3200.0,
			currency: "USD",
			status: "Completed",
			paymentMethod: "Credit Card",
			customer: "Marketing Solutions",
			customerEmail: "payments@marketingsolutions.com",
			description: "Marketing campaign setup",
			date: "2024-06-23",
			time: "11:20 AM",
			fee: 96.0,
			netAmount: 3104.0,
			invoiceId: "INV-2024-004",
		},
		{
			id: "pay_005",
			transactionId: "TXN-2024-005",
			amount: 15000.0,
			currency: "USD",
			status: "Pending",
			paymentMethod: "Wire Transfer",
			customer: "Finance Corp",
			customerEmail: "accounts@financecorp.com",
			description: "Annual enterprise package",
			date: "2024-06-27",
			time: "03:00 PM",
			fee: 450.0,
			netAmount: 14550.0,
			invoiceId: "INV-2024-005",
		},
		{
			id: "pay_006",
			transactionId: "TXN-2024-006",
			amount: 25000.0,
			currency: "USD",
			status: "Completed",
			paymentMethod: "Credit Card",
			customer: "Amazon",
			customerEmail: "procurement@amazon.com",
			description: "Cloud infrastructure services",
			date: "2024-06-22",
			time: "04:30 PM",
			fee: 750.0,
			netAmount: 24250.0,
			invoiceId: "INV-2024-006",
		},
		{
			id: "pay_007",
			transactionId: "TXN-2024-007",
			amount: 1800.0,
			currency: "USD",
			status: "Pending",
			paymentMethod: "PayPal",
			customer: "Startup Inc.",
			customerEmail: "billing@startupinc.com",
			description: "Basic plan subscription",
			date: "2024-06-28",
			time: "01:15 PM",
			fee: 54.0,
			netAmount: 1746.0,
			invoiceId: "INV-2024-007",
		},
		{
			id: "pay_008",
			transactionId: "TXN-2024-008",
			amount: 9500.0,
			currency: "USD",
			status: "Completed",
			paymentMethod: "Bank Transfer",
			customer: "Global Solutions",
			customerEmail: "finance@globalsolutions.com",
			description: "Consulting services",
			date: "2024-06-21",
			time: "10:00 AM",
			fee: 285.0,
			netAmount: 9215.0,
			invoiceId: "INV-2024-008",
		},
		{
			id: "pay_009",
			transactionId: "TXN-2024-009",
			amount: 4200.0,
			currency: "USD",
			status: "Completed",
			paymentMethod: "Credit Card",
			customer: "Innovatech LLC",
			customerEmail: "accounts@innovatech.com",
			description: "API integration services",
			date: "2024-06-20",
			time: "02:45 PM",
			fee: 126.0,
			netAmount: 4074.0,
			invoiceId: "INV-2024-009",
		},
		{
			id: "pay_010",
			transactionId: "TXN-2024-010",
			amount: 6800.0,
			currency: "USD",
			status: "Pending",
			paymentMethod: "PayPal",
			customer: "GreenTech Innovations",
			customerEmail: "billing@greentech.com",
			description: "Sustainability platform license",
			date: "2024-06-29",
			time: "09:30 AM",
			fee: 204.0,
			netAmount: 6596.0,
			invoiceId: "INV-2024-010",
		},
	];

	const [payments, setPayments] = useState(initialPayments);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("All"); // All, Completed, Pending
	const [sortConfig, setSortConfig] = useState(null);
	const [selectedPayment, setSelectedPayment] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [newPayment, setNewPayment] = useState({
		customer: "",
		customerEmail: "",
		amount: "",
		paymentMethod: "Credit Card",
		description: "",
		status: "Pending",
		invoiceId: "",
		fee: "",
	});

	// Calculate total funds (positive payments only)
	const totalFunds = useMemo(() => {
		return payments
			.filter((p) => p.status === "Completed" && p.amount > 0)
			.reduce((sum, p) => sum + p.netAmount, 0);
	}, [payments]);

	// Calculate total deductions (negative payments)
	const totalDeductions = useMemo(() => {
		return payments
			.filter((p) => p.status === "Completed" && p.amount < 0)
			.reduce((sum, p) => sum + Math.abs(p.netAmount), 0);
	}, [payments]);

	// Calculate net balance (funds - deductions)
	const netBalance = useMemo(() => {
		return payments
			.filter((p) => p.status === "Completed")
			.reduce((sum, p) => sum + p.netAmount, 0);
	}, [payments]);

	const pendingAmount = useMemo(() => {
		return payments
			.filter((p) => p.status === "Pending" && p.amount > 0)
			.reduce((sum, p) => sum + p.amount, 0);
	}, [payments]);

	const pendingDeductions = useMemo(() => {
		return payments
			.filter((p) => p.status === "Pending" && p.amount < 0)
			.reduce((sum, p) => sum + Math.abs(p.amount), 0);
	}, [payments]);

	const completedCount = useMemo(() => {
		return payments.filter((p) => p.status === "Completed").length;
	}, [payments]);

	const pendingCount = useMemo(() => {
		return payments.filter((p) => p.status === "Pending").length;
	}, [payments]);

	// Filter and search payments
	const filteredPayments = useMemo(() => {
		let filtered = [...payments];

		// Filter by status
		if (filterStatus !== "All") {
			filtered = filtered.filter((p) => p.status === filterStatus);
		}

		// Filter by search term
		if (searchTerm) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.transactionId.toLowerCase().includes(searchLower) ||
					p.customer.toLowerCase().includes(searchLower) ||
					p.customerEmail.toLowerCase().includes(searchLower) ||
					p.description.toLowerCase().includes(searchLower) ||
					p.paymentMethod.toLowerCase().includes(searchLower)
			);
		}

		// Sort
		if (sortConfig !== null) {
			filtered.sort((a, b) => {
				if (a[sortConfig.key] < b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? -1 : 1;
				}
				if (a[sortConfig.key] > b[sortConfig.key]) {
					return sortConfig.direction === "ascending" ? 1 : -1;
				}
				return 0;
			});
		}

		return filtered;
	}, [payments, searchTerm, filterStatus, sortConfig]);

	// Pagination
	const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
	const paginatedPayments = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredPayments, currentPage]);

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

	const handlePaymentClick = (payment) => {
		setSelectedPayment(payment);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedPayment(null);
	};

	const handleOpenAddModal = () => {
		setIsAddModalOpen(true);
	};

	const handleCloseAddModal = () => {
		setIsAddModalOpen(false);
		setNewPayment({
			customer: "",
			customerEmail: "",
			amount: "",
			paymentMethod: "Credit Card",
			description: "",
			status: "Pending",
			invoiceId: "",
			fee: "",
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewPayment((prev) => ({ ...prev, [name]: value }));
	};

	const calculateFee = (amount) => {
		if (!amount) return 0;
		// 3% processing fee
		return parseFloat(amount) * 0.03;
	};

	const handleAddPayment = () => {
		// Validation
		if (!newPayment.customer.trim()) {
			toast.error("Please enter customer name!");
			return;
		}
		if (!newPayment.customerEmail.trim()) {
			toast.error("Please enter customer email!");
			return;
		}
		if (!newPayment.amount || parseFloat(newPayment.amount) === 0) {
			toast.error("Please enter a valid amount (cannot be zero)!");
			return;
		}
		if (!newPayment.description.trim()) {
			toast.error("Please enter a description!");
			return;
		}

		const amount = parseFloat(newPayment.amount);
		const fee = newPayment.fee
			? parseFloat(newPayment.fee)
			: calculateFee(Math.abs(amount)); // Use absolute value for fee calculation
		// For negative amounts (deductions), fee is also deducted
		const netAmount = amount >= 0 ? amount - fee : amount + fee;

		const paymentToAdd = {
			id: `pay_${String(payments.length + 1).padStart(3, "0")}`,
			transactionId: `TXN-2024-${String(payments.length + 1).padStart(3, "0")}`,
			amount: amount,
			currency: "USD",
			status: newPayment.status,
			paymentMethod: newPayment.paymentMethod,
			customer: newPayment.customer,
			customerEmail: newPayment.customerEmail,
			description: newPayment.description,
			date: new Date().toISOString().split("T")[0],
			time: new Date().toLocaleTimeString("en-US", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			}),
			fee: fee,
			netAmount: netAmount,
			invoiceId:
				newPayment.invoiceId ||
				`INV-2024-${String(payments.length + 1).padStart(3, "0")}`,
		};

		setPayments((prevPayments) => [paymentToAdd, ...prevPayments]);
		toast.success(
			`Payment "${paymentToAdd.transactionId}" added successfully!`
		);
		handleCloseAddModal();
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatCurrencyWithSign = (amount) => {
		const formatted = formatCurrency(Math.abs(amount));
		return amount < 0 ? `-${formatted}` : formatted;
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="p-6 space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className={`text-2xl font-semibold ${colors.foreground}`}>
						Payments
					</h1>
					<p className={`text-sm ${colors.mutedForeground} mt-1`}>
						Manage and track all payment transactions
					</p>
				</div>
			</div>

			{/* Total Funds Section */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<div
					className={`${colors.card} border ${colors.border} rounded-xl p-6 ${colors.shadow}`}
				>
					<div className="flex items-center justify-between">
						<div>
							<p
								className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
							>
								Net Balance
							</p>
							<p
								className={`text-3xl font-bold ${
									netBalance >= 0 ? "text-green-600" : "text-red-600"
								}`}
							>
								{formatCurrency(netBalance)}
							</p>
							<p className="text-xs text-zinc-400 mt-1">
								Total funds - deductions
							</p>
						</div>
						<div
							className={`w-12 h-12 rounded-full flex items-center justify-center ${
								netBalance >= 0 ? "bg-green-100" : "bg-red-100"
							}`}
						>
							<DollarSign
								className={`w-6 h-6 ${
									netBalance >= 0 ? "text-green-600" : "text-red-600"
								}`}
							/>
						</div>
					</div>
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl p-6 ${colors.shadow}`}
				>
					<div className="flex items-center justify-between">
						<div>
							<p
								className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
							>
								Total Funds
							</p>
							<p className="text-3xl font-bold text-green-600">
								{formatCurrency(totalFunds)}
							</p>
							<p className="text-xs text-zinc-400 mt-1">
								{
									payments.filter(
										(p) => p.status === "Completed" && p.amount > 0
									).length
								}{" "}
								positive transactions
							</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
							<ArrowUpRight className="w-6 h-6 text-green-600" />
						</div>
					</div>
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl p-6 ${colors.shadow}`}
				>
					<div className="flex items-center justify-between">
						<div>
							<p
								className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
							>
								Total Deductions
							</p>
							<p className="text-3xl font-bold text-red-600">
								-{formatCurrency(totalDeductions)}
							</p>
							<p className="text-xs text-zinc-400 mt-1">
								{
									payments.filter(
										(p) => p.status === "Completed" && p.amount < 0
									).length
								}{" "}
								deduction transactions
							</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
							<ArrowDownRight className="w-6 h-6 text-red-600" />
						</div>
					</div>
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl p-6 ${colors.shadow}`}
				>
					<div className="flex items-center justify-between">
						<div>
							<p
								className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
							>
								Pending
							</p>
							<p className={`text-3xl font-bold ${colors.foreground}`}>
								{formatCurrency(pendingAmount - pendingDeductions)}
							</p>
							<p className="text-xs text-zinc-400 mt-1">
								{pendingCount} pending transactions
							</p>
						</div>
						<div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
							<Clock className="w-6 h-6 text-yellow-600" />
						</div>
					</div>
				</div>
			</div>

			{/* Search and Filter Section */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl p-4 ${colors.shadow}`}
			>
				<div className="flex flex-col md:flex-row gap-4 items-center justify-start">
					{/* Search */}
					<div className="relative max-w-sm w-full md:w-auto">
						<Search
							className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
						/>
						<input
							type="text"
							placeholder="Search by transaction ID, customer, email, or description..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className={`w-full pl-10 pr-4 py-2 ${colors.background} border ${
								colors.border
							} rounded-xl text-sm ${
								colors.foreground
							} focus:outline-none focus:ring-2 ${getFocusRingClass(
								colorScheme
							)} focus:border-transparent placeholder:${colors.textTertiary}`}
						/>
					</div>

					{/* Filter Tabs and Add Button */}
					<div className="flex gap-2 items-center justify-between">
						{/* Filter Tabs */}
						<div className="flex gap-2">
							<button
								onClick={() => {
									setFilterStatus("All");
									setCurrentPage(1);
								}}
								className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
									filterStatus === "All"
										? `${scheme.primary} ${scheme.primaryForeground}`
										: `${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary}`
								}`}
							>
								All ({payments.length})
							</button>
							<button
								onClick={() => {
									setFilterStatus("Completed");
									setCurrentPage(1);
								}}
								className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
									filterStatus === "Completed"
										? "bg-green-600 text-white"
										: `${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary}`
								}`}
							>
								<CheckCircle2 className="w-4 h-4" />
								Completed ({completedCount})
							</button>
							<button
								onClick={() => {
									setFilterStatus("Pending");
									setCurrentPage(1);
								}}
								className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 ${
									filterStatus === "Pending"
										? "bg-yellow-600 text-white"
										: `${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary}`
								}`}
							>
								<Clock className="w-4 h-4" />
								Pending ({pendingCount})
							</button>
						</div>

						{/* Add Payment Button */}
						<button
							onClick={handleOpenAddModal}
							className={`px-4 py-2 rounded-xl text-sm font-medium ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover} transition-colors flex items-center gap-2`}
						>
							<Plus className="w-4 h-4" />
							Add Payment
						</button>
					</div>
				</div>
			</div>

			{/* Payments Table */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
			>
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className={`${colors.muted} border-b ${colors.border}`}>
							<tr>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer hover:bg-zinc-100`}
									onClick={() => requestSort("transactionId")}
								>
									<div className="flex items-center gap-2">
										Transaction ID
										{sortConfig?.key === "transactionId" && (
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
									onClick={() => requestSort("customer")}
								>
									<div className="flex items-center gap-2">
										Customer
										{sortConfig?.key === "customer" && (
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
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer hover:bg-zinc-100`}
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
								<th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
									Payment Method
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider cursor-pointer ${colors.hover}`}
									onClick={() => requestSort("date")}
								>
									<div className="flex items-center gap-2">
										Date
										{sortConfig?.key === "date" && (
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
								<th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{paginatedPayments.length === 0 ? (
								<tr>
									<td colSpan="7" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No payments found</p>
									</td>
								</tr>
							) : (
								paginatedPayments.map((payment) => (
									<tr
										key={payment.id}
										className="hover:bg-zinc-50 transition-colors cursor-pointer"
										onClick={() => handlePaymentClick(payment)}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-medium ${colors.foreground}`}
											>
												{payment.transactionId}
											</div>
										</td>
										<td className="px-6 py-4">
											<div
												className={`text-sm font-medium ${colors.foreground}`}
											>
												{payment.customer}
											</div>
											<div className={`text-sm ${colors.mutedForeground}`}>
												{payment.customerEmail}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div
												className={`text-sm font-semibold ${
													payment.amount >= 0
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												{payment.amount >= 0 ? "+" : ""}
												{formatCurrency(payment.amount)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<CreditCard className="w-4 h-4 text-zinc-400" />
												<span className={`text-sm ${colors.textSecondary}`}>
													{payment.paymentMethod}
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{formatDate(payment.date)}
											</div>
											<div className={`text-xs ${colors.textMuted}`}>
												{payment.time}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center gap-2">
												<span
													className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
														payment.status === "Completed"
															? "bg-green-100 text-green-800"
															: "bg-yellow-100 text-yellow-800"
													}`}
												>
													{payment.status === "Completed" ? (
														<CheckCircle2 className="w-3 h-3 mr-1" />
													) : (
														<Clock className="w-3 h-3 mr-1" />
													)}
													{payment.status}
												</span>
												{payment.amount < 0 && (
													<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
														Deduction
													</span>
												)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right">
											<button
												onClick={(e) => {
													e.stopPropagation();
													handlePaymentClick(payment);
												}}
												className={`inline-flex items-center px-3 py-1.5 text-sm font-medium ${colors.secondaryForeground} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
											>
												<Eye className="w-4 h-4 mr-1" />
												View
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div
						className={`px-6 py-4 border-t ${colors.border} flex items-center justify-between`}
					>
						<div className={`text-sm ${colors.mutedForeground}`}>
							Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
							{Math.min(currentPage * itemsPerPage, filteredPayments.length)} of{" "}
							{filteredPayments.length} payments
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
								disabled={currentPage === 1}
								className={`p-2 border ${colors.border} rounded-xl ${colors.hoverSecondary} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
							>
								<ChevronLeft className="w-4 h-4" />
							</button>
							<div className="flex items-center gap-1">
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(
									(page) => (
										<button
											key={page}
											onClick={() => setCurrentPage(page)}
											className={`px-3 py-1 rounded-xl text-sm ${
												currentPage === page
													? "bg-zinc-900 text-white"
													: `${colors.textSecondary} ${colors.hoverSecondary}`
											}`}
										>
											{page}
										</button>
									)
								)}
							</div>
							<button
								onClick={() =>
									setCurrentPage((prev) => Math.min(totalPages, prev + 1))
								}
								disabled={currentPage === totalPages}
								className={`p-2 border ${colors.border} rounded-xl ${colors.hoverSecondary} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
							>
								<ChevronRight className="w-4 h-4" />
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Add Payment Modal */}
			{isAddModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={handleCloseAddModal}
				>
					<div
						className={`${colors.card} rounded-xl ${colors.shadow} max-w-2xl w-full overflow-y-auto`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div
							className={`flex items-center justify-between p-6 border-b ${colors.border}`}
						>
							<div>
								<h2 className={`text-xl font-semibold ${colors.foreground}`}>
									Add New Payment
								</h2>
								<p className={`text-sm ${colors.mutedForeground} mt-1`}>
									Create a new payment transaction
								</p>
							</div>
							<button
								onClick={handleCloseAddModal}
								className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
							>
								<X className={`w-5 h-5 ${colors.mutedForeground}`} />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-6 space-y-4">
							{/* Customer Information */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Customer Name <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										name="customer"
										value={newPayment.customer}
										onChange={handleInputChange}
										placeholder="Enter customer name"
										className={`w-full px-4 py-2 ${colors.background} border ${
											colors.border
										} rounded-xl text-sm ${
											colors.foreground
										} focus:outline-none focus:ring-2 ${getFocusRingClass(
											colorScheme
										)} focus:border-transparent`}
									/>
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Customer Email <span className="text-red-500">*</span>
									</label>
									<input
										type="email"
										name="customerEmail"
										value={newPayment.customerEmail}
										onChange={handleInputChange}
										placeholder="customer@example.com"
										className={`w-full px-4 py-2 ${colors.background} border ${
											colors.border
										} rounded-xl text-sm ${
											colors.foreground
										} focus:outline-none focus:ring-2 ${getFocusRingClass(
											colorScheme
										)} focus:border-transparent`}
									/>
								</div>
							</div>

							{/* Amount and Payment Method */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Amount (USD) <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
										<input
											type="number"
											name="amount"
											value={newPayment.amount}
											onChange={(e) => {
												const value = e.target.value;
												// Auto-calculate fee if not manually set (use absolute value for fee calculation)
												if (
													!newPayment.fee ||
													newPayment.fee ===
														calculateFee(Math.abs(newPayment.amount)).toFixed(2)
												) {
													const fee = calculateFee(Math.abs(value));
													setNewPayment((prev) => ({
														...prev,
														amount: value,
														fee: value ? fee.toFixed(2) : "",
													}));
												} else {
													handleInputChange(e);
												}
											}}
											placeholder="0.00 (use negative for deductions)"
											step="0.01"
											className={`w-full pl-10 pr-4 py-2 ${
												colors.background
											} border ${colors.border} rounded-xl text-sm ${
												colors.foreground
											} focus:outline-none focus:ring-2 ${getFocusRingClass(
												colorScheme
											)} focus:border-transparent`}
										/>
									</div>
									<p className="text-xs text-zinc-400 mt-1">
										Enter negative value for deductions/refunds
									</p>
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Payment Method <span className="text-red-500">*</span>
									</label>
									<select
										name="paymentMethod"
										value={newPayment.paymentMethod}
										onChange={handleInputChange}
										className={`w-full px-4 py-2 ${colors.background} border ${
											colors.border
										} rounded-xl text-sm ${
											colors.foreground
										} focus:outline-none focus:ring-2 ${getFocusRingClass(
											colorScheme
										)} focus:border-transparent`}
									>
										<option value="Credit Card">Credit Card</option>
										<option value="Debit Card">Debit Card</option>
										<option value="PayPal">PayPal</option>
										<option value="Bank Transfer">Bank Transfer</option>
										<option value="Wire Transfer">Wire Transfer</option>
										<option value="Check">Check</option>
										<option value="Cash">Cash</option>
									</select>
								</div>
							</div>

							{/* Fee and Status */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Processing Fee (USD)
									</label>
									<div className="relative">
										<DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-zinc-400" />
										<input
											type="number"
											name="fee"
											value={newPayment.fee}
											onChange={handleInputChange}
											placeholder="Auto-calculated (3%)"
											min="0"
											step="0.01"
											className={`w-full pl-10 pr-4 py-2 ${
												colors.background
											} border ${colors.border} rounded-xl text-sm ${
												colors.foreground
											} focus:outline-none focus:ring-2 ${getFocusRingClass(
												colorScheme
											)} focus:border-transparent`}
										/>
									</div>
									<p className="text-xs text-zinc-400 mt-1">
										Leave empty for auto-calculation (3% of amount)
									</p>
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Status <span className="text-red-500">*</span>
									</label>
									<select
										name="status"
										value={newPayment.status}
										onChange={handleInputChange}
										className={`w-full px-4 py-2 ${colors.background} border ${
											colors.border
										} rounded-xl text-sm ${
											colors.foreground
										} focus:outline-none focus:ring-2 ${getFocusRingClass(
											colorScheme
										)} focus:border-transparent`}
									>
										<option value="Pending">Pending</option>
										<option value="Completed">Completed</option>
									</select>
								</div>
							</div>

							{/* Invoice ID and Description */}
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Invoice ID
								</label>
								<input
									type="text"
									name="invoiceId"
									value={newPayment.invoiceId}
									onChange={handleInputChange}
									placeholder="INV-2024-001 (optional)"
									className="w-full px-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
								/>
								<p className="text-xs text-zinc-400 mt-1">
									Leave empty to auto-generate
								</p>
							</div>

							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Description <span className="text-red-500">*</span>
								</label>
								<textarea
									name="description"
									value={newPayment.description}
									onChange={handleInputChange}
									placeholder="Enter payment description..."
									rows="3"
									className="w-full px-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent resize-none"
								/>
							</div>

							{/* Preview */}
							{newPayment.amount && parseFloat(newPayment.amount) !== 0 && (
								<div className="bg-zinc-50 rounded-xl p-4 space-y-2">
									<p
										className={`text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Payment Preview
									</p>
									<div className="flex items-center justify-between text-sm">
										<span className="text-zinc-600">Gross Amount:</span>
										<span
											className={`font-medium ${
												parseFloat(newPayment.amount) >= 0
													? "text-green-600"
													: "text-red-600"
											}`}
										>
											{parseFloat(newPayment.amount) >= 0 ? "+" : ""}
											{formatCurrency(parseFloat(newPayment.amount) || 0)}
										</span>
									</div>
									<div className="flex items-center justify-between text-sm">
										<span className="text-zinc-600">Processing Fee:</span>
										<span className={`font-medium ${colors.foreground}`}>
											-
											{formatCurrency(
												parseFloat(newPayment.fee) ||
													calculateFee(Math.abs(newPayment.amount))
											)}
										</span>
									</div>
									<div className="border-t border-zinc-200 pt-2 mt-2">
										<div className="flex items-center justify-between">
											<span
												className={`text-sm font-semibold ${colors.foreground}`}
											>
												Net Amount:
											</span>
											<span
												className={`text-lg font-bold ${
													(parseFloat(newPayment.amount) || 0) -
														(parseFloat(newPayment.fee) ||
															calculateFee(Math.abs(newPayment.amount))) >=
													0
														? "text-green-600"
														: "text-red-600"
												}`}
											>
												{(parseFloat(newPayment.amount) || 0) -
													(parseFloat(newPayment.fee) ||
														calculateFee(Math.abs(newPayment.amount))) >=
												0
													? "+"
													: ""}
												{formatCurrency(
													(parseFloat(newPayment.amount) || 0) -
														(parseFloat(newPayment.fee) ||
															calculateFee(Math.abs(newPayment.amount)))
												)}
											</span>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Modal Footer */}
						<div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200">
							<button
								onClick={handleCloseAddModal}
								className={`px-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								Cancel
							</button>
							<button
								onClick={handleAddPayment}
								className={`px-4 py-2 text-sm font-medium ${scheme.primaryForeground} ${scheme.primary} ${scheme.primaryHover} rounded-xl transition-colors`}
							>
								Add Payment
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Payment Details Modal */}
			{isModalOpen && selectedPayment && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={handleCloseModal}
				>
					<div
						className={`${colors.card} rounded-xl ${colors.shadow} max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div
							className={`flex items-center justify-between p-6 border-b ${colors.border}`}
						>
							<div>
								<h2 className={`text-xl font-semibold ${colors.foreground}`}>
									Payment Details
								</h2>
								<p className={`text-sm ${colors.mutedForeground} mt-1`}>
									{selectedPayment.transactionId}
								</p>
							</div>
							<button
								onClick={handleCloseModal}
								className="p-2 hover:bg-zinc-100 rounded-xl transition-colors"
							>
								<X className={`w-5 h-5 ${colors.mutedForeground}`} />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-6 space-y-6">
							{/* Status and Amount */}
							<div className="flex items-center justify-between">
								<div>
									<p className="text-sm text-zinc-500 mb-1">Status</p>
									<span
										className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
											selectedPayment.status === "Completed"
												? "bg-green-100 text-green-800"
												: "bg-yellow-100 text-yellow-800"
										}`}
									>
										{selectedPayment.status === "Completed" ? (
											<CheckCircle2 className="w-4 h-4 mr-1" />
										) : (
											<Clock className="w-4 h-4 mr-1" />
										)}
										{selectedPayment.status}
									</span>
								</div>
								<div className="text-right">
									<p className="text-sm text-zinc-500 mb-1">Amount</p>
									<p
										className={`text-2xl font-bold ${
											selectedPayment.amount >= 0
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{selectedPayment.amount >= 0 ? "+" : ""}
										{formatCurrency(selectedPayment.amount)}
									</p>
								</div>
							</div>

							{/* Divider */}
							<div className="border-t border-zinc-200" />

							{/* Payment Information */}
							<div className="grid grid-cols-2 gap-6">
								<div>
									<p className="text-sm font-medium text-zinc-500 mb-2">
										Customer
									</p>
									<p className={`text-sm ${colors.foreground}`}>
										{selectedPayment.customer}
									</p>
									<p className={`text-sm ${colors.mutedForeground} mt-1`}>
										{selectedPayment.customerEmail}
									</p>
								</div>
								<div>
									<p className="text-sm font-medium text-zinc-500 mb-2">
										Payment Method
									</p>
									<div className="flex items-center gap-2">
										<CreditCard className="w-4 h-4 text-zinc-400" />
										<p className={`text-sm ${colors.foreground}`}>
											{selectedPayment.paymentMethod}
										</p>
									</div>
								</div>
								<div>
									<p className="text-sm font-medium text-zinc-500 mb-2">
										Date & Time
									</p>
									<div className="flex items-center gap-2">
										<Calendar className="w-4 h-4 text-zinc-400" />
										<p className={`text-sm ${colors.foreground}`}>
											{formatDate(selectedPayment.date)} at{" "}
											{selectedPayment.time}
										</p>
									</div>
								</div>
								<div>
									<p className="text-sm font-medium text-zinc-500 mb-2">
										Invoice ID
									</p>
									<p className={`text-sm ${colors.foreground}`}>
										{selectedPayment.invoiceId}
									</p>
								</div>
							</div>

							{/* Description */}
							<div>
								<p className="text-sm font-medium text-zinc-500 mb-2">
									Description
								</p>
								<p className="text-sm text-zinc-900">
									{selectedPayment.description}
								</p>
							</div>

							{/* Divider */}
							<div className="border-t border-zinc-200" />

							{/* Payment Breakdown */}
							<div className="bg-zinc-50 rounded-xl p-4 space-y-3">
								<div className="flex items-center justify-between">
									<p className="text-sm text-zinc-600">Gross Amount</p>
									<p
										className={`text-sm font-medium ${
											selectedPayment.amount >= 0
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{selectedPayment.amount >= 0 ? "+" : ""}
										{formatCurrency(selectedPayment.amount)}
									</p>
								</div>
								<div className="flex items-center justify-between">
									<p className="text-sm text-zinc-600">Processing Fee</p>
									<p className="text-sm font-medium text-zinc-900">
										-{formatCurrency(selectedPayment.fee)}
									</p>
								</div>
								<div className="border-t border-zinc-200 pt-3">
									<div className="flex items-center justify-between">
										<p className="text-sm font-semibold text-zinc-900">
											Net Amount
										</p>
										<p
											className={`text-lg font-bold ${
												selectedPayment.netAmount >= 0
													? "text-green-600"
													: "text-red-600"
											}`}
										>
											{selectedPayment.netAmount >= 0 ? "+" : ""}
											{formatCurrency(selectedPayment.netAmount)}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Modal Footer */}
						<div className="flex items-center justify-end gap-3 p-6 border-t border-zinc-200">
							<button
								onClick={handleCloseModal}
								className={`px-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Payments;
