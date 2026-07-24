/** Indie Stripe cast — ~12 customers with Stripe-shaped IDs for the billing OS demo. */

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
				subject: "Card declined",
				body: "Hi John — your last charge failed. Retry from Billing when ready.",
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
				subject: "Welcome to Growth",
				body: "Hi Jane — your Growth plan is active. MRR synced.",
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
				subject: "Trial started",
				body: "Hi Alice — your 14-day Growth trial is live.",
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
				subject: "Enterprise onboarded",
				body: "Hi Bob — yearly Enterprise invoice paid. Welcome!",
				date: "2024-06-22",
			},
		],
	},
	{
		id: "205",
		name: "Maya Chen",
		email: "maya@shipfast.dev",
		phone: "567-890-1234",
		company: "Shipfast",
		createdAt: "2024-06-21",
		image: contactAvatar("205"),
		stripeCustomerId: "cus_mayaShipfast",
		emails: [
			{
				subject: "Starter renewal",
				body: "Maya — Starter renews in 3 days.",
				date: "2024-06-21",
			},
		],
	},
	{
		id: "206",
		name: "Omar Farouk",
		email: "omar@newsletterkit.com",
		phone: "678-901-2345",
		company: "Newsletter Kit",
		createdAt: "2024-06-20",
		image: contactAvatar("206"),
		stripeCustomerId: "cus_omarNewsletter",
		emails: [
			{
				subject: "Past due reminder",
				body: "Omar — we could not charge ···· 4242. Open Billing to retry.",
				date: "2024-06-20",
			},
		],
	},
	{
		id: "207",
		name: "Priya Nair",
		email: "priya@launchpad.io",
		phone: "789-012-3456",
		company: "Launchpad",
		createdAt: "2024-06-19",
		image: contactAvatar("207"),
		stripeCustomerId: "cus_priyaLaunch",
		emails: [
			{
				subject: "Canceled at period end",
				body: "Priya — cancel scheduled. Access until period end.",
				date: "2024-06-19",
			},
		],
	},
	{
		id: "208",
		name: "Leo Martins",
		email: "leo@microsaas.app",
		phone: "890-123-4567",
		company: "MicroSaaS App",
		createdAt: "2024-06-18",
		image: contactAvatar("208"),
		stripeCustomerId: "cus_leoMicro",
		emails: [
			{
				subject: "Upgrade offer",
				body: "Leo — Growth unlocks failed-charge queue + more seats.",
				date: "2024-06-18",
			},
		],
	},
	{
		id: "209",
		name: "Sofia Reyes",
		email: "sofia@designops.co",
		phone: "901-234-5678",
		company: "DesignOps",
		createdAt: "2024-06-17",
		image: contactAvatar("209"),
		stripeCustomerId: "cus_sofiaDesign",
		emails: [
			{
				subject: "Invoice sent",
				body: "Sofia — invoice in_1PxSofia is ready.",
				date: "2024-06-17",
			},
		],
	},
	{
		id: "210",
		name: "Kenji Sato",
		email: "kenji@apikit.jp",
		phone: "012-345-6789",
		company: "API Kit",
		createdAt: "2024-06-16",
		image: contactAvatar("210"),
		stripeCustomerId: "cus_kenjiApi",
		emails: [
			{
				subject: "Trial ending",
				body: "Kenji — trial ends in 2 days. Add a card to stay active.",
				date: "2024-06-16",
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
