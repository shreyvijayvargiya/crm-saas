import {
	FaXTwitter,
	FaRedditAlien,
	FaYoutube,
	FaThreads,
	FaTiktok,
	FaPinterestP,
	FaLinkedinIn,
	FaDribbble,
	FaInstagram,
	FaFacebookF,
	FaBluesky,
	FaMedium,
} from "react-icons/fa6";
import { SiSubstack, SiMastodon } from "react-icons/si";

/**
 * Content platforms for the mini scheduler.
 * `fields` drive the edit modal — each platform gets its own form shape.
 */
export const SCHEDULER_PLATFORMS = [
	{
		id: "x",
		label: "X",
		Icon: FaXTwitter,
		color: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
		chipClass: "bg-zinc-900/10 text-zinc-900 dark:bg-zinc-100/15 dark:text-zinc-100",
		charLimit: 280,
		fields: [
			{ key: "text", label: "Post text", type: "textarea", required: true, placeholder: "What's happening?" },
			{ key: "mediaUrl", label: "Media URL", type: "text", placeholder: "https://…" },
			{ key: "replySettings", label: "Who can reply", type: "select", options: ["Everyone", "Accounts you follow", "Verified accounts", "Only mentions"] },
		],
	},
	{
		id: "reddit",
		label: "Reddit",
		Icon: FaRedditAlien,
		color: "bg-orange-600 text-white",
		chipClass: "bg-orange-500/15 text-orange-700 dark:text-orange-300",
		fields: [
			{ key: "subreddit", label: "Subreddit", type: "text", required: true, placeholder: "r/saas" },
			{ key: "title", label: "Title", type: "text", required: true, placeholder: "Post title" },
			{ key: "body", label: "Body", type: "textarea", placeholder: "Optional body text…" },
			{ key: "flair", label: "Flair", type: "text", placeholder: "Discussion" },
		],
	},
	{
		id: "youtube",
		label: "YouTube",
		Icon: FaYoutube,
		color: "bg-red-600 text-white",
		chipClass: "bg-red-500/15 text-red-700 dark:text-red-300",
		fields: [
			{ key: "title", label: "Video title", type: "text", required: true, placeholder: "Video title" },
			{ key: "description", label: "Description", type: "textarea", placeholder: "Describe your video…" },
			{ key: "videoUrl", label: "Video URL / upload ref", type: "text", placeholder: "https://… or asset id" },
			{ key: "visibility", label: "Visibility", type: "select", options: ["Public", "Unlisted", "Private"] },
			{ key: "tags", label: "Tags", type: "text", placeholder: "crm, saas, tutorial" },
		],
	},
	{
		id: "threads",
		label: "Threads",
		Icon: FaThreads,
		color: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
		chipClass: "bg-zinc-900/10 text-zinc-900 dark:bg-zinc-100/15 dark:text-zinc-100",
		charLimit: 500,
		fields: [
			{ key: "text", label: "Thread text", type: "textarea", required: true, placeholder: "Start a thread…" },
			{ key: "mediaUrl", label: "Media URL", type: "text", placeholder: "https://…" },
		],
	},
	{
		id: "tiktok",
		label: "TikTok",
		Icon: FaTiktok,
		color: "bg-zinc-950 text-white",
		chipClass: "bg-pink-500/15 text-pink-700 dark:text-pink-300",
		fields: [
			{ key: "caption", label: "Caption", type: "textarea", required: true, placeholder: "Write a caption…" },
			{ key: "videoUrl", label: "Video URL", type: "text", required: true, placeholder: "https://…" },
			{ key: "hashtags", label: "Hashtags", type: "text", placeholder: "#crm #saas #tips" },
			{ key: "sound", label: "Sound / audio", type: "text", placeholder: "Original audio" },
		],
	},
	{
		id: "pinterest",
		label: "Pinterest",
		Icon: FaPinterestP,
		color: "bg-red-700 text-white",
		chipClass: "bg-red-600/15 text-red-800 dark:text-red-300",
		fields: [
			{ key: "title", label: "Pin title", type: "text", required: true, placeholder: "Pin title" },
			{ key: "description", label: "Description", type: "textarea", placeholder: "Describe this pin…" },
			{ key: "imageUrl", label: "Image URL", type: "text", required: true, placeholder: "https://…" },
			{ key: "board", label: "Board", type: "text", placeholder: "Product launches" },
			{ key: "link", label: "Destination link", type: "text", placeholder: "https://…" },
		],
	},
	{
		id: "linkedin",
		label: "LinkedIn",
		Icon: FaLinkedinIn,
		color: "bg-sky-700 text-white",
		chipClass: "bg-sky-600/15 text-sky-800 dark:text-sky-300",
		charLimit: 3000,
		fields: [
			{ key: "text", label: "Post text", type: "textarea", required: true, placeholder: "Share an update…" },
			{ key: "mediaUrl", label: "Media URL", type: "text", placeholder: "https://…" },
			{ key: "visibility", label: "Visibility", type: "select", options: ["Anyone", "Connections only"] },
		],
	},
	{
		id: "dribbble",
		label: "Dribbble",
		Icon: FaDribbble,
		color: "bg-pink-500 text-white",
		chipClass: "bg-pink-500/15 text-pink-700 dark:text-pink-300",
		fields: [
			{ key: "title", label: "Shot title", type: "text", required: true, placeholder: "Shot title" },
			{ key: "description", label: "Description", type: "textarea", placeholder: "Tell the story…" },
			{ key: "imageUrl", label: "Image URL", type: "text", required: true, placeholder: "https://…" },
			{ key: "tags", label: "Tags", type: "text", placeholder: "ui, dashboard, crm" },
		],
	},
	{
		id: "substack",
		label: "Substack",
		Icon: SiSubstack,
		color: "bg-orange-500 text-white",
		chipClass: "bg-orange-500/15 text-orange-800 dark:text-orange-300",
		fields: [
			{ key: "title", label: "Newsletter title", type: "text", required: true, placeholder: "Issue title" },
			{ key: "subtitle", label: "Subtitle", type: "text", placeholder: "Optional subtitle" },
			{ key: "body", label: "Body", type: "textarea", required: true, placeholder: "Write your issue…" },
			{ key: "audience", label: "Audience", type: "select", options: ["Everyone", "Paid subscribers", "Free subscribers"] },
		],
	},
	{
		id: "instagram",
		label: "Instagram",
		Icon: FaInstagram,
		color: "bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white",
		chipClass: "bg-pink-500/15 text-pink-700 dark:text-pink-300",
		charLimit: 2200,
		fields: [
			{ key: "caption", label: "Caption", type: "textarea", required: true, placeholder: "Write a caption…" },
			{ key: "mediaUrl", label: "Image / reel URL", type: "text", required: true, placeholder: "https://…" },
			{ key: "postType", label: "Post type", type: "select", options: ["Feed", "Reel", "Story", "Carousel"] },
			{ key: "hashtags", label: "Hashtags", type: "text", placeholder: "#saas #crm #product" },
			{ key: "location", label: "Location", type: "text", placeholder: "San Francisco, CA" },
		],
	},
	{
		id: "facebook",
		label: "Facebook",
		Icon: FaFacebookF,
		color: "bg-blue-600 text-white",
		chipClass: "bg-blue-600/15 text-blue-800 dark:text-blue-300",
		fields: [
			{ key: "text", label: "Post text", type: "textarea", required: true, placeholder: "Write something…" },
			{ key: "mediaUrl", label: "Media URL", type: "text", placeholder: "https://…" },
			{ key: "link", label: "Link", type: "text", placeholder: "https://…" },
			{ key: "audience", label: "Audience", type: "select", options: ["Public", "Friends", "Only me"] },
		],
	},
	{
		id: "bluesky",
		label: "Bluesky",
		Icon: FaBluesky,
		color: "bg-sky-500 text-white",
		chipClass: "bg-sky-500/15 text-sky-800 dark:text-sky-300",
		charLimit: 300,
		fields: [
			{ key: "text", label: "Post text", type: "textarea", required: true, placeholder: "What's on your mind?" },
			{ key: "mediaUrl", label: "Media URL", type: "text", placeholder: "https://…" },
			{ key: "languages", label: "Language", type: "select", options: ["English", "Spanish", "French", "German", "Hindi"] },
		],
	},
	{
		id: "medium",
		label: "Medium",
		Icon: FaMedium,
		color: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
		chipClass: "bg-zinc-900/10 text-zinc-900 dark:bg-zinc-100/15 dark:text-zinc-100",
		fields: [
			{ key: "title", label: "Article title", type: "text", required: true, placeholder: "Article title" },
			{ key: "subtitle", label: "Subtitle", type: "text", placeholder: "Optional subtitle" },
			{ key: "body", label: "Body", type: "textarea", required: true, placeholder: "Write your article…" },
			{ key: "tags", label: "Tags", type: "text", placeholder: "saas, product, growth" },
			{ key: "canonicalUrl", label: "Canonical URL", type: "text", placeholder: "https://…" },
		],
	},
	{
		id: "mastodon",
		label: "Mastodon",
		Icon: SiMastodon,
		color: "bg-indigo-600 text-white",
		chipClass: "bg-indigo-500/15 text-indigo-800 dark:text-indigo-300",
		charLimit: 500,
		fields: [
			{ key: "text", label: "Toot text", type: "textarea", required: true, placeholder: "Write a toot…" },
			{ key: "mediaUrl", label: "Media URL", type: "text", placeholder: "https://…" },
			{ key: "instance", label: "Instance", type: "text", placeholder: "mastodon.social" },
			{ key: "visibility", label: "Visibility", type: "select", options: ["Public", "Unlisted", "Followers only", "Direct"] },
			{ key: "contentWarning", label: "Content warning", type: "text", placeholder: "Optional CW" },
		],
	},
];

export function getPlatform(platformId) {
	return SCHEDULER_PLATFORMS.find((p) => p.id === platformId) ?? null;
}

export function emptyContentForPlatform(platformId) {
	const platform = getPlatform(platformId);
	if (!platform) return {};
	const content = {};
	for (const field of platform.fields) {
		content[field.key] = field.type === "select" ? (field.options?.[0] ?? "") : "";
	}
	return content;
}

export function postPreviewTitle(post) {
	const c = post.content ?? {};
	return (
		c.title ||
		c.text ||
		c.caption ||
		c.body ||
		`${getPlatform(post.platform)?.label ?? "Post"} draft`
	);
}
