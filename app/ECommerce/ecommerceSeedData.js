export const ECOMMERCE_METRICS = [
	{
		id: "total-sales",
		label: "Total Sales",
		value: "$13.4k",
		change: 38,
		positive: true,
		period: "Last 6 months",
		icon: "Ticket",
	},
	{
		id: "total-orders",
		label: "Total Orders",
		value: "155K",
		change: 22,
		positive: true,
		period: "Last 4 months",
		icon: "ShoppingCart",
	},
	{
		id: "total-profit",
		label: "Total Profit",
		value: "$89.34k",
		change: 16,
		positive: false,
		period: "Last One year",
		icon: "DollarSign",
	},
	{
		id: "bookmarks",
		label: "Bookmarks",
		value: "$1,200",
		change: 38,
		positive: true,
		period: "Last 6 months",
		icon: "Bookmark",
	},
];

export const WEEKLY_EARNINGS = [
	{ day: "Mo", value: 3200 },
	{ day: "Tu", value: 4100 },
	{ day: "We", value: 3800 },
	{ day: "Th", value: 4600, highlight: true },
	{ day: "Fr", value: 3900 },
	{ day: "Sa", value: 2800 },
	{ day: "Su", value: 2400 },
];

export const EARNING_BREAKDOWN = [
	{ label: "Earning", value: "$1,236", pct: 0.55, icon: "Wallet" },
	{ label: "Profit", value: "$2,300", pct: 0.82, icon: "DollarSign" },
	{ label: "Expense", value: "$1,500", pct: 0.48, icon: "CreditCard" },
];

export const ORDER_STATUS_PROFILE = {
	handle: "@jackwilliams",
	role: "Business",
	avatar: "./people/person-1.png",
	totalOrders: 4689,
};

export const ORDER_STATUS_TABS = {
	Packed: [
		{ label: "Packing Pending", value: 4250, pct: 0.91 },
		{ label: "Packing in Progress", value: 2150, pct: 0.46 },
		{ label: "Packing Complete", value: 1750, pct: 0.37 },
	],
	Shipped: [
		{ label: "In Transit", value: 3120, pct: 0.67 },
		{ label: "Out for Delivery", value: 980, pct: 0.21 },
		{ label: "Delivered", value: 589, pct: 0.13 },
	],
	Received: [
		{ label: "Awaiting Review", value: 420, pct: 0.09 },
		{ label: "Reviewed", value: 890, pct: 0.19 },
		{ label: "Archived", value: 210, pct: 0.04 },
	],
};

export const DELIVERY_ORDERS = {
	New: [
		{
			id: "ord_001",
			productId: "ec_prd_001",
			sender: {
				name: "Myrtie Ullrich",
				address: "101 Boulder, California(CA), 95959",
			},
			receiver: {
				name: "Barry Schowalter",
				address: "939 orange, California(CA), 92118",
			},
		},
		{
			id: "ord_002",
			productId: "ec_prd_002",
			sender: {
				name: "Lena Ortiz",
				address: "44 Maple Ave, Texas(TX), 73301",
			},
			receiver: {
				name: "Chris Nolan",
				address: "12 River Rd, Oregon(OR), 97201",
			},
		},
	],
	Pending: [
		{
			id: "ord_003",
			productId: "ec_prd_003",
			sender: {
				name: "Sam Rivera",
				address: "88 Pine St, New York(NY), 10001",
			},
			receiver: {
				name: "Dana Brooks",
				address: "5 Lakeview, Florida(FL), 33101",
			},
		},
	],
	Shipping: [
		{
			id: "ord_004",
			productId: "ec_prd_004",
			sender: {
				name: "Alex Kim",
				address: "200 Market St, Washington(WA), 98101",
			},
			receiver: {
				name: "Jordan Lee",
				address: "77 Cedar Ln, Colorado(CO), 80202",
			},
		},
	],
};

export const POPULAR_PRODUCTS = [
	{
		id: "ec_prd_005",
		name: "Nike Vision Low Shoes",
		price: 5600,
		visitors: "10.8K",
		image: "./people/person-2.png",
	},
	{
		id: "ec_prd_006",
		name: "Adidas Ultraboost 21",
		price: 4500,
		visitors: "4.5K",
		image: "./people/person-3.png",
	},
	{
		id: "ec_prd_007",
		name: "Puma RS-X Toys",
		price: 3200,
		visitors: "2K",
		image: "./people/person-4.png",
	},
	{
		id: "ec_prd_008",
		name: "New Balance 550",
		price: 2800,
		visitors: "1.8K",
		image: "./people/person-1.png",
	},
	{
		id: "ec_prd_009",
		name: "Reebok Classic Leather",
		price: 2200,
		visitors: "1.2K",
		image: "./people/person-2.png",
	},
];

const PRODUCT_CATEGORIES = ["Smartphone", "Laptop", "Headphone", "Smartwatch"];
const PRODUCT_STATUSES = ["Publish", "Inactive"];

const productNames = [
	{ name: "Samsung galaxy s35", brand: "Samsung", category: "Smartphone" },
	{ name: "MacBook Pro 16", brand: "Apple", category: "Laptop" },
	{ name: "Sony WH-1000XM5", brand: "Sony", category: "Headphone" },
	{ name: "Apple Watch Ultra", brand: "Apple", category: "Smartwatch" },
	{ name: "iPhone 16 Pro", brand: "Apple", category: "Smartphone" },
	{ name: "Dell XPS 15", brand: "Dell", category: "Laptop" },
	{ name: "Bose QuietComfort", brand: "Bose", category: "Headphone" },
	{ name: "Galaxy Watch 7", brand: "Samsung", category: "Smartwatch" },
	{ name: "Pixel 9 Pro", brand: "Google", category: "Smartphone" },
	{ name: "ThinkPad X1 Carbon", brand: "Lenovo", category: "Laptop" },
	{ name: "AirPods Max", brand: "Apple", category: "Headphone" },
	{ name: "Garmin Fenix 8", brand: "Garmin", category: "Smartwatch" },
	{ name: "OnePlus 13", brand: "OnePlus", category: "Smartphone" },
	{ name: "HP Spectre x360", brand: "HP", category: "Laptop" },
	{ name: "Sennheiser Momentum 4", brand: "Sennheiser", category: "Headphone" },
	{ name: "Fitbit Sense 2", brand: "Fitbit", category: "Smartwatch" },
	{ name: "Xiaomi 14 Ultra", brand: "Xiaomi", category: "Smartphone" },
	{ name: "ASUS ROG Zephyrus", brand: "ASUS", category: "Laptop" },
	{ name: "JBL Tour One M2", brand: "JBL", category: "Headphone" },
	{ name: "Huawei Watch GT 5", brand: "Huawei", category: "Smartwatch" },
	{ name: "Motorola Edge 50", brand: "Motorola", category: "Smartphone" },
	{ name: "MSI Stealth 16", brand: "MSI", category: "Laptop" },
	{ name: "Beats Studio Pro", brand: "Beats", category: "Headphone" },
	{ name: "Amazfit GTR 4", brand: "Amazfit", category: "Smartwatch" },
	{ name: "Nothing Phone 3", brand: "Nothing", category: "Smartphone" },
];

export const ECOMMERCE_PRODUCTS = productNames.map((p, i) => ({
	id: `ec_prd_${String(i + 1).padStart(3, "0")}`,
	name: p.name,
	brand: p.brand,
	imageURL: `./people/person-${(i % 4) + 1}.png`,
	category: p.category,
	inStock: i % 5 !== 0,
	price: 199 + (i % 8) * 113,
	quantity: 12 + (i % 9) * 4,
	status: i % 4 === 0 ? "Inactive" : "Publish",
	description: `${p.name} by ${p.brand} — premium ${p.category.toLowerCase()} for modern retail.`,
	sku: `${p.brand.slice(0, 3).toUpperCase()}-${1000 + i}`,
	visitors: `${(1.2 + i * 0.3).toFixed(1)}K`,
	createdAt: `2026-0${(i % 6) + 1}-${String((i % 28) + 1).padStart(2, "0")}`,
}));

export function findEcommerceProduct(id) {
	return ECOMMERCE_PRODUCTS.find((p) => p.id === id) ?? null;
}

export { PRODUCT_CATEGORIES, PRODUCT_STATUSES };
