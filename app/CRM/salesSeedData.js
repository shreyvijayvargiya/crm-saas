/** Shared sales / sold-products seed — list + /sales/[id] detail. */

export const INITIAL_SALES = [
	{
		id: "1",
		name: "Product A",
		soldAt: "2023-10-01",
		soldAtLabel: "October 1, 2023",
		price: 20,
		category: "Electronics",
		description: "High-quality headphones",
		customer: "Cloud Corp",
		quantity: 2,
		invoiceId: "INV-001",
	},
	{
		id: "2",
		name: "Product B",
		soldAt: "2023-10-02",
		soldAtLabel: "October 2, 2023",
		price: 15,
		category: "Books",
		description: "A thrilling mystery novel",
		customer: "Tech Innovations",
		quantity: 1,
		invoiceId: "INV-002",
	},
	{
		id: "3",
		name: "Product C",
		soldAt: "2023-10-03",
		soldAtLabel: "October 3, 2023",
		price: 30,
		category: "Clothing",
		description: "Stylish winter jacket",
		customer: "AI Labs",
		quantity: 1,
		invoiceId: "INV-003",
	},
	{
		id: "4",
		name: "Product D",
		soldAt: "2023-10-04",
		soldAtLabel: "October 4, 2023",
		price: 25,
		category: "Home",
		description: "Comfortable sofa",
		customer: "Marketing Solutions",
		quantity: 1,
		invoiceId: "INV-004",
	},
	{
		id: "5",
		name: "Product E",
		soldAt: "2023-10-05",
		soldAtLabel: "October 5, 2023",
		price: 50,
		category: "Sports",
		description: "Durable running shoes",
		customer: "Finance Corp",
		quantity: 3,
		invoiceId: "INV-005",
	},
];

export function findSaleSeed(id) {
	return INITIAL_SALES.find((s) => String(s.id) === String(id)) || null;
}
