/** Shared invoice seed data — used by Invoices list and detail lookups. */

export const INITIAL_INVOICES = [
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

export function findInvoiceSeed(id) {
	return INITIAL_INVOICES.find((inv) => inv.id === String(id)) || null;
}

export function formatCurrency(amount) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(amount);
}

export function getInvoiceStatusColor(status) {
	switch (status) {
		case "Paid":
			return "bg-emerald-500/12 text-emerald-800 dark:text-emerald-200 border-emerald-500/25";
		case "Pending":
			return "bg-amber-500/12 text-amber-900 dark:text-amber-100 border-amber-500/25";
		case "Overdue":
			return "bg-rose-500/12 text-rose-900 dark:text-rose-100 border-rose-500/25";
		default:
			return "bg-zinc-500/12 text-zinc-800 dark:text-zinc-200 border-zinc-500/25";
	}
}
