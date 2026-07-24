/** Shared contact seed data — used by list page and detail lookups. */

function contactAvatar(id) {
	const n = (parseInt(String(id), 10) || 0) % 4;
	return `./people/person-${n + 1}.png`;
}

export const INITIAL_CONTACTS = [
	{
		id: "201",
		name: "John Doe",
		email: "john@startup.com",
		phone: "123-456-7890",
		company: "Startup Inc.",
		createdAt: "2024-06-25",
		image: "./people/person-1.png",
		stripeCustomerId: "cus_johnStartup",
		emails: [
			{
				subject: "Follow-Up",
				body: "Hi John, let's schedule a call!",
				date: "2024-06-25",
			},
		],
	},
	{
		id: "202",
		name: "Jane Smith",
		email: "jane@agency.co",
		phone: "234-567-8901",
		company: "Agency Co.",
		createdAt: "2024-06-24",
		image: "./people/person-2.png",
		stripeCustomerId: "cus_janeAgency",
		emails: [
			{
				subject: "Introduction",
				body: "Hi Jane, I hope you are doing well!",
				date: "2024-06-24",
			},
		],
	},
	{
		id: "203",
		name: "Alice Johnson",
		email: "alice@company.com",
		phone: "345-678-9012",
		company: "Company LLC",
		createdAt: "2024-06-23",
		image: "./people/person-3.png",
		stripeCustomerId: "cus_aliceCompany",
		emails: [
			{
				subject: "Meeting Request",
				body: "Hi Alice, can we meet next week?",
				date: "2024-06-23",
			},
		],
	},
	{
		id: "204",
		name: "Bob Brown",
		email: "bob@startup.io",
		phone: "456-789-0123",
		company: "Startup LLC",
		createdAt: "2024-06-22",
		image: "./people/person-4.png",
		stripeCustomerId: "cus_bobEnterprise",
		emails: [
			{
				subject: "Welcome",
				body: "Hi Bob, welcome to our platform!",
				date: "2024-06-22",
			},
		],
	},
	{
		id: "205",
		name: "Tech Corp",
		email: "contact@techcorp.com",
		phone: "567-890-1234",
		company: "Tech Corporation",
		createdAt: "2024-06-21",
		image: contactAvatar("205"),
		emails: [
			{
				subject: "Partnership Inquiry",
				body: "Hello, we are interested in a partnership.",
				date: "2024-06-21",
			},
		],
	},
	{
		id: "206",
		name: "Global Solutions",
		email: "info@globalsolutions.com",
		phone: "678-901-2345",
		company: "Global Solutions Inc.",
		createdAt: "2024-06-20",
		image: contactAvatar("206"),
		emails: [
			{
				subject: "Service Inquiry",
				body: "Hi, we would like to know more about your services.",
				date: "2024-06-20",
			},
		],
	},
	{
		id: "207",
		name: "Innovatech",
		email: "contact@innovatech.com",
		phone: "789-012-3456",
		company: "Innovatech LLC",
		createdAt: "2024-06-19",
		image: contactAvatar("207"),
		emails: [
			{
				subject: "Collaboration Proposal",
				body: "Dear Innovatech, we propose a collaboration.",
				date: "2024-06-19",
			},
		],
	},
	{
		id: "208",
		name: "GreenTech",
		email: "info@greentech.com",
		phone: "890-123-4567",
		company: "GreenTech Innovations",
		createdAt: "2024-06-18",
		image: contactAvatar("208"),
		emails: [
			{
				subject: "Sustainability Initiative",
				body: "Hello GreenTech, let's discuss sustainability initiatives.",
				date: "2024-06-18",
			},
		],
	},
	{
		id: "209",
		name: "Future Solutions",
		email: "contact@futuresolutions.com",
		phone: "901-234-5678",
		company: "Future Solutions Inc.",
		createdAt: "2024-06-17",
		image: contactAvatar("209"),
		emails: [
			{
				subject: "Project Collaboration",
				body: "Dear Future Solutions, we are interested in collaborating on a project.",
				date: "2024-06-17",
			},
		],
	},
	{
		id: "210",
		name: "Tech Innovators",
		email: "hello@techinnovators.com",
		phone: "012-345-6789",
		company: "Tech Innovators LLC",
		createdAt: "2024-06-16",
		image: contactAvatar("210"),
		emails: [
			{
				subject: "Innovation Summit",
				body: "Hi Tech Innovators, we would like to invite you to our innovation summit.",
				date: "2024-06-16",
			},
		],
	},
	{
		id: "211",
		name: "NextGen Solutions",
		email: "info@nextgensolutions.com",
		phone: "123-456-7891",
		company: "NextGen Solutions LLC",
		createdAt: "2024-06-15",
		image: contactAvatar("211"),
		emails: [
			{
				subject: "New Opportunities",
				body: "Hello, we are exploring new opportunities together.",
				date: "2024-06-15",
			},
		],
	},
	{
		id: "212",
		name: "Synergy Corp",
		email: "contact@synergycorp.com",
		phone: "234-567-8902",
		company: "Synergy Corporation",
		createdAt: "2024-06-14",
		image: contactAvatar("212"),
		emails: [
			{
				subject: "Partnership Discussion",
				body: "Hi, let's discuss a potential partnership.",
				date: "2024-06-14",
			},
		],
	},
	{
		id: "213",
		name: "Visionary Tech",
		email: "info@visionarytech.com",
		phone: "345-678-9013",
		company: "Visionary Technologies",
		createdAt: "2024-06-13",
		image: contactAvatar("213"),
		emails: [
			{
				subject: "Tech Innovations",
				body: "Dear Visionary Tech, we are interested in your innovations.",
				date: "2024-06-13",
			},
		],
	},
	{
		id: "214",
		name: "Eco Solutions",
		email: "contact@ecosolutions.com",
		phone: "456-789-0124",
		company: "Eco Solutions LLC",
		createdAt: "2024-06-12",
		image: contactAvatar("214"),
		emails: [
			{
				subject: "Sustainability Projects",
				body: "Hello, we would like to collaborate on sustainability projects.",
				date: "2024-06-12",
			},
		],
	},
	{
		id: "215",
		name: "Innovative Minds",
		email: "info@innovativeminds.com",
		phone: "567-890-1235",
		company: "Innovative Minds LLC",
		createdAt: "2024-06-11",
		image: contactAvatar("215"),
		emails: [
			{
				subject: "Creative Collaboration",
				body: "Hi, we are looking for creative collaboration opportunities.",
				date: "2024-06-11",
			},
		],
	},
	{
		id: "216",
		name: "Tech Pioneers",
		email: "contact@techpioneers.com",
		phone: "678-901-2346",
		company: "Tech Pioneers LLC",
		createdAt: "2024-06-10",
		image: contactAvatar("216"),
		emails: [
			{
				subject: "Future Technologies",
				body: "Dear Tech Pioneers, let's discuss future technologies.",
				date: "2024-06-10",
			},
		],
	},
	{
		id: "217",
		name: "Global Innovators",
		email: "info@globalinnovators.com",
		phone: "789-012-3457",
		company: "Global Innovators LLC",
		createdAt: "2024-06-09",
		image: contactAvatar("217"),
		emails: [
			{
				subject: "Innovation Strategies",
				body: "Hello, we would like to discuss innovation strategies.",
				date: "2024-06-09",
			},
		],
	},
	{
		id: "218",
		name: "Future Vision",
		email: "contact@futurevision.com",
		phone: "890-123-4568",
		company: "Future Vision LLC",
		createdAt: "2024-06-08",
		image: contactAvatar("218"),
		emails: [
			{
				subject: "Visionary Projects",
				body: "Dear Future Vision, we are interested in your projects.",
				date: "2024-06-08",
			},
		],
	},
	{
		id: "219",
		name: "Next Level Tech",
		email: "info@nextleveltech.com",
		phone: "901-234-5679",
		company: "Next Level Technologies",
		createdAt: "2024-06-07",
		image: contactAvatar("219"),
		emails: [
			{
				subject: "Tech Advancements",
				body: "Hi, we would like to discuss tech advancements.",
				date: "2024-06-07",
			},
		],
	},
	{
		id: "220",
		name: "Innovative Solutions",
		email: "contact@innovativesolutions.com",
		phone: "012-345-6780",
		company: "Innovative Solutions LLC",
		createdAt: "2024-06-06",
		image: contactAvatar("220"),
		emails: [
			{
				subject: "Collaboration Opportunities",
				body: "Hello, we are looking for collaboration opportunities.",
				date: "2024-06-06",
			},
		],
	},
];

export function findContactSeed(id) {
	return INITIAL_CONTACTS.find((c) => c.id === String(id)) || null;
}

export function formatContactDate(iso) {
	if (!iso || iso === "—") return "—";
	const d = new Date(iso);
	if (Number.isNaN(d.getTime())) return iso;
	return d.toLocaleDateString(undefined, {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}
