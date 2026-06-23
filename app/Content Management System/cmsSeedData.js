export const initialBlogs = [
	{
		id: 1,
		title: "Getting Started with React Hooks",
		author: "John Doe",
		category: "Technology",
		status: "Published",
		publishDate: "2024-06-25",
		views: 1250,
		likes: 45,
		content:
			"A comprehensive guide to React Hooks covering useState, useEffect, useContext, and custom hooks. Learn how to refactor class components and manage side effects cleanly in functional components.",
		excerpt: "Master React Hooks with practical examples and patterns.",
		tags: ["React", "JavaScript", "Frontend"],
		featuredImage: "",
	},
	{
		id: 2,
		title: "Building Scalable APIs with Node.js",
		author: "Jane Smith",
		category: "Backend",
		status: "Published",
		publishDate: "2024-06-24",
		views: 980,
		likes: 32,
		content:
			"Learn how to build robust REST and GraphQL APIs with Node.js, Express, validation layers, and production-ready error handling.",
		excerpt: "Patterns for scalable Node.js API design.",
		tags: ["Node.js", "API", "Backend"],
		featuredImage: "",
	},
	{
		id: 3,
		title: "CSS Grid vs Flexbox: When to Use What",
		author: "Mike Johnson",
		category: "Design",
		status: "Draft",
		publishDate: "",
		views: 0,
		likes: 0,
		content:
			"Understanding CSS layout systems and choosing the right tool for navigation bars, dashboards, and responsive content grids.",
		excerpt: "A practical comparison of Grid and Flexbox.",
		tags: ["CSS", "Design", "Frontend"],
		featuredImage: "",
	},
	{
		id: 4,
		title: "Introduction to TypeScript",
		author: "Sarah Williams",
		category: "Technology",
		status: "Published",
		publishDate: "2024-06-23",
		views: 2100,
		likes: 78,
		content:
			"TypeScript basics for JavaScript developers: types, interfaces, generics, and integrating TS into existing React codebases.",
		excerpt: "Start writing safer JavaScript with TypeScript.",
		tags: ["TypeScript", "JavaScript", "Programming"],
		featuredImage: "",
	},
	{
		id: 5,
		title: "Database Optimization Techniques",
		author: "David Brown",
		category: "Backend",
		status: "Draft",
		publishDate: "",
		views: 0,
		likes: 0,
		content:
			"Best practices for database performance: indexing strategies, query plans, connection pooling, and caching layers.",
		excerpt: "Make your database queries faster and cheaper.",
		tags: ["Database", "SQL", "Performance"],
		featuredImage: "",
	},
	{
		id: 6,
		title: "Modern Web Design Trends 2024",
		author: "Emily Davis",
		category: "Design",
		status: "Published",
		publishDate: "2024-06-22",
		views: 1750,
		likes: 56,
		content:
			"Exploring the latest design trends including bento grids, subtle motion, accessible color systems, and AI-assisted workflows.",
		excerpt: "What great product UI looks like in 2024.",
		tags: ["Design", "UI/UX", "Trends"],
		featuredImage: "",
	},
];

export const initialNewsletters = [
	{
		id: 1,
		title: "June Product Updates",
		subject: "What's new in your CRM this June",
		status: "Sent",
		sendDate: "2024-06-20",
		recipientCount: 842,
		content:
			"Hi there,\n\nThis month we shipped pipeline automation, improved analytics dashboards, and a refreshed mobile experience. Read the full changelog on our blog.\n\nThanks for being a subscriber!",
		excerpt: "Pipeline automation, analytics, and mobile improvements.",
	},
	{
		id: 2,
		title: "Weekly Tips #24",
		subject: "5 ways to close deals faster",
		status: "Sent",
		sendDate: "2024-06-13",
		recipientCount: 810,
		content:
			"Speed up your sales cycle with better follow-up cadences, deal scoring, and meeting prep templates your team can reuse every week.",
		excerpt: "Practical sales tips from top-performing reps.",
	},
	{
		id: 3,
		title: "Summer Campaign Preview",
		subject: "Early access: Summer campaign templates",
		status: "Scheduled",
		sendDate: "2024-07-01",
		recipientCount: 0,
		content:
			"We're launching a set of summer campaign templates for email, landing pages, and social. Preview them before they go live next week.",
		excerpt: "Preview upcoming summer marketing templates.",
	},
	{
		id: 4,
		title: "Customer Spotlight — Acme Corp",
		subject: "How Acme Corp doubled pipeline velocity",
		status: "Draft",
		sendDate: "",
		recipientCount: 0,
		content:
			"In this edition we interview Acme Corp's revenue team on how they reorganized stages, automated tasks, and improved forecast accuracy.",
		excerpt: "Case study draft for the next newsletter send.",
	},
];

export const initialSubscribers = [
	{
		id: 1,
		name: "Alice Cooper",
		email: "alice@example.com",
		subscribedDate: "2024-06-20",
		status: "Active",
	},
	{
		id: 2,
		name: "Bob Martinez",
		email: "bob@example.com",
		subscribedDate: "2024-06-18",
		status: "Active",
	},
	{
		id: 3,
		name: "Carol White",
		email: "carol@example.com",
		subscribedDate: "2024-06-15",
		status: "Active",
	},
	{
		id: 4,
		name: "Daniel Lee",
		email: "daniel@example.com",
		subscribedDate: "2024-06-12",
		status: "Active",
	},
	{
		id: 5,
		name: "Eva Garcia",
		email: "eva@example.com",
		subscribedDate: "2024-06-10",
		status: "Active",
	},
	{
		id: 6,
		name: "Frank Wilson",
		email: "frank@example.com",
		subscribedDate: "2024-06-08",
		status: "Active",
	},
];

export const BLOG_CATEGORIES = [
	"Technology",
	"Design",
	"Backend",
	"Frontend",
	"Business",
	"Marketing",
];

export const BLOG_STATUSES = ["Draft", "Published"];

export const NEWSLETTER_STATUSES = ["Draft", "Scheduled", "Sent"];
