import React from "react";
import HeroScreenshotCarousel from "./components/HeroScreenshotCarousel";
import HeroScrollReveal from "./components/HeroScrollReveal";
import HeroDragBoard from "./components/HeroDragBoard";
import HeroTabStack from "./components/HeroTabStack";
import HeroFanStack from "./components/HeroFanStack";
import HeroHorizontalScroll from "./components/HeroHorizontalScroll";
import HeroPhoneScroll from "./components/HeroPhoneScroll";
import HeroExpandGallery from "./components/HeroExpandGallery";
import HeroSwipeCards from "./components/HeroSwipeCards";
import HeroVerticalDock from "./components/HeroVerticalDock";
import HeroCardWallet from "./components/HeroCardWallet";
import HeroKineticType from "./components/HeroKineticType";
import HeroStoryFilm from "./components/HeroStoryFilm";
import HeroTocRail from "./components/HeroTocRail";
import HeroTextReel from "./components/HeroTextReel";
import HeroThrowCollect from "./components/HeroThrowCollect";
import HeroOrbitRing from "./components/HeroOrbitRing";
import HeroWorkList from "./components/HeroWorkList";
import HeroAppleWatch from "./components/HeroAppleWatch";
import HeroIPhone from "./components/HeroIPhone";
import HeroCursorTrails from "./components/HeroCursorTrails";
import HeroFlipbook from "./components/HeroFlipbook";
import HeroNarratorVoice from "./components/HeroNarratorVoice";
import HeroScrollReadReveal from "./components/HeroScrollReadReveal";
import HeroTitanWatch from "./components/HeroTitanWatch";
import HeroStampStack from "./components/HeroStampStack";
import HeroPhoneFanScroll from "./components/HeroPhoneFanScroll";
import HeroZipper from "./components/HeroZipper";

/**
 * Preview images for screenshot-driven demos (no CRM routes).
 * Add new entries when you ship more visual demos.
 */
export const PREVIEW_SHOTS = [
	{
		src: "/screenshots-marketing-page/saas-crm-dashboard.png",
		alt: "Dashboard UI preview",
		label: "Dashboard",
		href: "/?c=scroll-reveal",
		description: "Dense KPI layout with charts and activity.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-analytics.png",
		alt: "Analytics UI preview",
		label: "Analytics",
		href: "/?c=screenshot-carousel",
		description: "Funnels, trends, and performance charts.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-reports.png",
		alt: "Reports UI preview",
		label: "Reports",
		href: "/?c=drag-board",
		description: "Visual report cards and breakdowns.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-activity.png",
		alt: "Activity UI preview",
		label: "Activity",
		href: "/?c=tab-stack",
		description: "Timeline and feed patterns.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-leads.png",
		alt: "List UI preview",
		label: "Lists",
		href: "/?c=work-list",
		description: "Searchable tables and list rows.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-sales.png",
		alt: "Sales UI preview",
		label: "Pipeline",
		href: "/?c=fan-stack",
		description: "Opportunity and card layouts.",
	},
	{
		src: "/screenshots-marketing-page/saas-crm-scheduler.png",
		alt: "Scheduler UI preview",
		label: "Scheduler",
		href: "/?c=horizontal-scroll",
		description: "Calendar and planning surfaces.",
	},
];

/**
 * Componentry catalog — single source for landing sections + Cmd+K search.
 * Add a component here when you ship a new demo to sell.
 */
export const COMPONENTRY = [
	{
		id: "scroll-reveal",
		name: "Scroll Reveal",
		tags: ["scroll", "screenshots", "parallax"],
		description: "Scroll-driven reveal of stacked UI screenshots.",
		Component: HeroScrollReveal,
		needsShots: true,
	},
	{
		id: "fan-stack",
		name: "Fan Stack",
		tags: ["cards", "fan", "click"],
		description: "Click-to-center fanned image cards.",
		Component: HeroFanStack,
	},
	{
		id: "horizontal-scroll",
		name: "Horizontal Scroll",
		tags: ["scroll", "horizontal", "strip"],
		description: "Vertical scroll mapped to a horizontal strip.",
		Component: HeroHorizontalScroll,
	},
	{
		id: "phone-scroll",
		name: "Phone Scroll",
		tags: ["phone", "scroll", "lens"],
		description: "Phone frame as a lens over a scrolling strip.",
		Component: HeroPhoneScroll,
	},
	{
		id: "expand-gallery",
		name: "Expand Gallery",
		tags: ["gallery", "accordion", "hover"],
		description: "Flex accordion gallery with captions.",
		Component: HeroExpandGallery,
	},
	{
		id: "swipe-cards",
		name: "Swipe Cards",
		tags: ["swipe", "deck", "dnd"],
		description: "Swipeable card deck interactions.",
		Component: HeroSwipeCards,
	},
	{
		id: "vertical-dock",
		name: "Vertical Dock",
		tags: ["dock", "thumbs", "swap"],
		description: "Vertical thumbs that swap background and title.",
		Component: HeroVerticalDock,
	},
	{
		id: "card-wallet",
		name: "Card Wallet",
		tags: ["wallet", "hover", "stack"],
		description: "Wallet stack with hover lift to front.",
		Component: HeroCardWallet,
	},
	{
		id: "kinetic-type",
		name: "Kinetic Type",
		tags: ["typography", "motion", "flip"],
		description: "Vortex type that settles into a paragraph.",
		Component: HeroKineticType,
	},
	{
		id: "story-film",
		name: "Story Film",
		tags: ["film", "mosaic", "reel"],
		description: "Stack assemble into a full-screen mosaic reel.",
		Component: HeroStoryFilm,
	},
	{
		id: "toc-rail",
		name: "TOC Rail",
		tags: ["toc", "fisheye", "nav"],
		description: "Fisheye table-of-contents rail with tooltips.",
		Component: HeroTocRail,
	},
	{
		id: "text-reel",
		name: "Text Reel",
		tags: ["text", "transitions", "scenes"],
		description: "Large type scenes with wipe and blend transitions.",
		Component: HeroTextReel,
	},
	{
		id: "throw-collect",
		name: "Throw Collect",
		tags: ["throw", "stream", "motion"],
		description: "Diagonal throw-and-collect motion stream.",
		Component: HeroThrowCollect,
	},
	{
		id: "orbit-ring",
		name: "Orbit Ring",
		tags: ["orbit", "radial", "ring"],
		description: "Radial orbit of items around a center label.",
		Component: HeroOrbitRing,
		bare: true,
	},
	{
		id: "screenshot-carousel",
		name: "Screenshot Carousel",
		tags: ["carousel", "screenshots"],
		description: "Carousel of product UI screenshots.",
		Component: HeroScreenshotCarousel,
		needsShots: true,
	},
	{
		id: "drag-board",
		name: "Drag Board",
		tags: ["drag", "board", "dnd"],
		description: "Draggable screenshot board.",
		Component: HeroDragBoard,
		needsShots: true,
	},
	{
		id: "tab-stack",
		name: "Tab Stack",
		tags: ["tabs", "stack", "screenshots"],
		description: "Stacked tabs over screenshot previews.",
		Component: HeroTabStack,
		needsShots: true,
	},
	{
		id: "work-list",
		name: "Work List",
		tags: ["list", "preview", "hover"],
		description: "Work list with center hover preview.",
		Component: HeroWorkList,
	},
	{
		id: "apple-watch",
		name: "Apple Watch",
		tags: ["watch", "apps", "boot"],
		description: "Watch boot, live face, and complication apps.",
		Component: HeroAppleWatch,
		bare: true,
	},
	{
		id: "iphone",
		name: "iPhone",
		tags: ["iphone", "notes", "lock"],
		description: "iPhone home, Notes, lock, silent, and volume.",
		Component: HeroIPhone,
		bare: true,
	},
	{
		id: "cursor-trails",
		name: "Cursor Trails",
		tags: ["cursor", "trail", "emoji"],
		description: "Emoji, text, icon, and image cursor trails.",
		Component: HeroCursorTrails,
		needsShots: true,
	},
	{
		id: "flipbook",
		name: "Flipbook",
		tags: ["book", "flip", "3d"],
		description: "Center-spine 3D menu flipbook.",
		Component: HeroFlipbook,
	},
	{
		id: "narrator-voice",
		name: "Narrator Voice",
		tags: ["voice", "audio", "ai", "tts"],
		description: "AI narrator picker with Pick beats and speech preview.",
		Component: HeroNarratorVoice,
	},
	{
		id: "scroll-read",
		name: "Scroll Read Reveal",
		tags: ["scroll", "text", "opacity", "reading"],
		description: "Character-by-character scroll reveal with dimmed upcoming text.",
		Component: HeroScrollReadReveal,
	},
	{
		id: "titan-watch",
		name: "Titan Watch",
		tags: ["watch", "analog", "clock", "titan"],
		description: "Classic gold Titan-style dress watch with live hands and date.",
		Component: HeroTitanWatch,
		bare: true,
	},
	{
		id: "stamp-stack",
		name: "Stamp Stack",
		tags: ["stamp", "stack", "gallery", "images"],
		description: "Piled postage stamps with perforated edges and centered photos.",
		Component: HeroStampStack,
	},
	{
		id: "phone-fan",
		name: "Phone Fan Scroll",
		tags: ["phone", "video", "fan", "scroll", "rotate"],
		description: "Vertical phone reels fanned on scroll, straighten and shift −x.",
		Component: HeroPhoneFanScroll,
	},
	{
		id: "zipper",
		name: "Zipper Reveal",
		tags: ["zipper", "drag", "reveal", "interactive"],
		description: "Horizontal center zipper — drag left → right to open and reveal behind.",
		Component: HeroZipper,
	},
];

export function findComponent(id) {
	if (!id) return null;
	const key = String(id).toLowerCase();
	return COMPONENTRY.find((c) => c.id === key) || null;
}

export function searchComponents(query) {
	const q = (query || "").trim().toLowerCase();
	if (!q) return COMPONENTRY;
	return COMPONENTRY.filter((c) => {
		const hay = [c.id, c.name, c.description, ...(c.tags || [])]
			.join(" ")
			.toLowerCase();
		return hay.includes(q);
	});
}
