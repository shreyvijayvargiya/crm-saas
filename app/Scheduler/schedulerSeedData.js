function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function dayOffset(offset) {
	const d = new Date();
	d.setDate(d.getDate() + offset);
	return formatDate(d);
}

/** Demo scheduled posts for the content scheduler. */
export const INITIAL_SCHEDULED_POSTS = [
	{
		id: "sch-past-1",
		platform: "x",
		date: dayOffset(-2),
		time: "09:15",
		status: "scheduled",
		content: {
			text: "Shipped last week's pipeline polish — thanks for the feedback from the beta cohort.",
			mediaUrl: "",
			replySettings: "Everyone",
		},
	},
	{
		id: "sch-past-2",
		platform: "linkedin",
		date: dayOffset(-1),
		time: "11:00",
		status: "scheduled",
		content: {
			text: "Yesterday's webinar replay is live — Leads → Pipeline → Deals in 20 minutes.",
			mediaUrl: "",
			visibility: "Anyone",
		},
	},
	{
		id: "sch-past-3",
		platform: "instagram",
		date: dayOffset(-3),
		time: "17:30",
		status: "scheduled",
		content: {
			caption: "Behind the scenes: content chips on the CRM calendar 📅",
			mediaUrl: "https://example.com/media/bts-calendar.jpg",
			postType: "Feed",
			hashtags: "#saas #buildinpublic",
			location: "",
		},
	},
	{
		id: "sch-1",
		platform: "x",
		date: dayOffset(1),
		time: "09:00",
		status: "scheduled",
		content: {
			text: "Shipping a cleaner pipeline view this week — drag deals, update stages, stay in flow. What's your must-have CRM feature?",
			mediaUrl: "",
			replySettings: "Everyone",
		},
	},
	{
		id: "sch-2",
		platform: "linkedin",
		date: dayOffset(2),
		time: "11:30",
		status: "scheduled",
		content: {
			text: "Most teams don't need another dashboard — they need fewer clicks between lead → deal → invoice.\n\nHere's how we structured our CRM modules for that path.",
			mediaUrl: "",
			visibility: "Anyone",
		},
	},
	{
		id: "sch-3",
		platform: "youtube",
		date: dayOffset(3),
		time: "16:00",
		status: "draft",
		content: {
			title: "CRM walkthrough: Leads → Pipeline → Deals",
			description: "A 12-minute tour of the sales modules and how they share demo data.",
			videoUrl: "https://example.com/videos/crm-walkthrough",
			visibility: "Public",
			tags: "crm, saas, tutorial",
		},
	},
	{
		id: "sch-4",
		platform: "reddit",
		date: dayOffset(1),
		time: "14:00",
		status: "scheduled",
		content: {
			subreddit: "r/SaaS",
			title: "How we built a content calendar into our CRM template",
			body: "Curious how others schedule multi-platform posts without five tools. Sharing our approach…",
			flair: "Discussion",
		},
	},
	{
		id: "sch-5",
		platform: "pinterest",
		date: dayOffset(5),
		time: "10:00",
		status: "scheduled",
		content: {
			title: "SaaS CRM UI moodboard",
			description: "Dense zinc neutrals, clear hierarchy, bordered cards.",
			imageUrl: "https://example.com/pins/crm-moodboard.png",
			board: "Product design",
			link: "https://example.com",
		},
	},
	{
		id: "sch-6",
		platform: "substack",
		date: dayOffset(7),
		time: "08:00",
		status: "draft",
		content: {
			title: "Weekly: shipping the scheduler",
			subtitle: "Calendar chips, platform forms, list view",
			body: "This week's build notes on the mini content scheduler inside the CRM…",
			audience: "Everyone",
		},
	},
	{
		id: "sch-7",
		platform: "instagram",
		date: dayOffset(2),
		time: "18:00",
		status: "scheduled",
		content: {
			caption: "New pipeline chips landed ✨ Schedule content the same way you close deals.",
			mediaUrl: "https://example.com/media/pipeline-reel.mp4",
			postType: "Reel",
			hashtags: "#saas #crm #product",
			location: "",
		},
	},
	{
		id: "sch-8",
		platform: "bluesky",
		date: dayOffset(4),
		time: "12:00",
		status: "scheduled",
		content: {
			text: "Building a content calendar into a CRM template — platforms, chips, and per-channel forms.",
			mediaUrl: "",
			languages: "English",
		},
	},
];
