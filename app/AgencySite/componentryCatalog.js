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
import HeroIPhoneNotesPad from "./components/HeroIPhoneNotesPad";
import HeroCursorTrails from "./components/HeroCursorTrails";
import HeroFlipbook from "./components/HeroFlipbook";
import HeroNarratorVoice from "./components/HeroNarratorVoice";
import HeroScrollReadReveal from "./components/HeroScrollReadReveal";
import HeroScrollScaleParagraphs from "./components/HeroScrollScaleParagraphs";
import HeroScrollFaceMouth from "./components/HeroScrollFaceMouth";
import HeroWeatherCard from "./components/HeroWeatherCard";
import HeroSocialHoverCards from "./components/HeroSocialHoverCards";
import HeroAsciiScrollImages from "./components/HeroAsciiScrollImages";
import HeroPinThreadBoard from "./components/HeroPinThreadBoard";
import HeroTitanWatch from "./components/HeroTitanWatch";
import HeroStampStack from "./components/HeroStampStack";
import HeroPhoneFanScroll from "./components/HeroPhoneFanScroll";
import HeroZipper from "./components/HeroZipper";
import HeroVideoEditor from "./components/HeroVideoEditor";
import HeroClaudeChatInput from "./components/HeroClaudeChatInput";
import HeroDirectoryTree from "./components/HeroDirectoryTree";
import HeroLiquidFolder from "./components/HeroLiquidFolder";
import HeroClothesline from "./components/HeroClothesline";
import HeroImageMarquee from "./components/HeroImageMarquee";
import HeroWaveTranscript from "./components/HeroWaveTranscript";
import HeroTranslateMarquee from "./components/HeroTranslateMarquee";
import HeroWeatherSliders from "./components/HeroWeatherSliders";
import HeroPayDrawer from "./components/HeroPayDrawer";
import HeroCalmDrag from "./components/HeroCalmDrag";
import HeroScrollManDog from "./components/HeroScrollManDog";
import HeroTypewriterBill from "./components/HeroTypewriterBill";
import HeroAIApprovalChat from "./components/HeroAIApprovalChat";
import HeroNotesDrop from "./components/HeroNotesDrop";
import HeroEverestScroll from "./components/HeroEverestScroll";
import HeroHotCoffee from "./components/HeroHotCoffee";
import HeroThreadShirt from "./components/HeroThreadShirt";
import HeroSpeechToText from "./components/HeroSpeechToText";
import HeroMilkPour from "./components/HeroMilkPour";
import HeroMeetSparrow from "./components/HeroMeetSparrow";
import HeroGlassLogos from "./components/HeroGlassLogos";
import HeroYearPad from "./components/HeroYearPad";
import HeroBookLibrary from "./components/HeroBookLibrary";
import HeroMotionBall from "./components/HeroMotionBall";
import HeroTravelDotScroll from "./components/HeroTravelDotScroll";
import HeroTimeGlossary from "./components/HeroTimeGlossary";
import HeroCycleDoodle from "./components/HeroCycleDoodle";

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
		id: "iphone-notes",
		name: "iPhone Notes Pad",
		tags: ["iphone", "notes", "keyboard", "drawer", "palette"],
		description: "Cream iPhone writing pad — Mac keyboard types on-screen, yellow drawer for paper/font/pen/marker.",
		Component: HeroIPhoneNotesPad,
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
		id: "scroll-scale",
		name: "Scroll Scale Paragraphs",
		tags: ["scroll", "text", "scale", "paragraph"],
		description: "Each paragraph scales to 200% on scroll, then fades to reveal the next.",
		Component: HeroScrollScaleParagraphs,
	},
	{
		id: "scroll-face",
		name: "Scroll Face Mouth",
		tags: ["scroll", "face", "mouth", "svg", "reveal"],
		description: "Face SVG — mouth opens and scales to fill 100vh while eyes shrink and text appears.",
		Component: HeroScrollFaceMouth,
	},
	{
		id: "weather-card",
		name: "Weather Card",
		tags: ["weather", "card", "dropdown", "tabs", "glass"],
		description: "Glass weather widget with country/city Motion dropdowns, day tabs, and °F/°C.",
		Component: HeroWeatherCard,
	},
	{
		id: "social-hover",
		name: "Social Hover Cards",
		tags: ["social", "hover", "github", "cards", "framer"],
		description: "Centered social links; hover reveals GitHub calendar, X, LinkedIn, IG, YouTube cards.",
		Component: HeroSocialHoverCards,
	},
	{
		id: "ascii-scroll",
		name: "ASCII Scroll Images",
		tags: ["scroll", "ascii", "blur", "images", "stack"],
		description: "Centered image stack — active is sharp; previous recede with blurry ASCII nature overlay.",
		Component: HeroAsciiScrollImages,
	},
	{
		id: "pin-thread",
		name: "Pin Thread Board",
		tags: ["drag", "pin", "thread", "receipt", "board"],
		description: "Pinned receipt slips connected by hanging threads — drag any card and strings follow.",
		Component: HeroPinThreadBoard,
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
		tags: ["stamp", "stack", "gallery", "images", "scroll", "drag", "reveal"],
		description: "Postage pile — scroll cycles stamp images; drag to reveal expands to full parent height.",
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
	{
		id: "video-editor",
		name: "Video Editor",
		tags: ["video", "timeline", "editor", "drag", "playhead"],
		description: "Frontend timeline editor — preview, playhead, and draggable scenes / frames / objects.",
		Component: HeroVideoEditor,
	},
	{
		id: "chat-input",
		name: "Claude Chat Input",
		tags: ["chat", "input", "tts", "stt", "attach", "plugins", "tools"],
		description: "Claude-style composer — attach files/code, connectors, tools, speech, send.",
		Component: HeroClaudeChatInput,
	},
	{
		id: "directory-tree",
		name: "Directory Tree",
		tags: ["tree", "folder", "file", "explorer", "nested", "create", "delete"],
		description: "Centered nested folder/file explorer — create, delete, collapse all, filter.",
		Component: HeroDirectoryTree,
	},
	{
		id: "liquid-folder",
		name: "Liquid Folder",
		tags: ["folder", "files", "hover", "liquid", "flip", "palette"],
		description: "Yellow liquid folder — hover lifts two blue files, flip 180° for details, color palette.",
		Component: HeroLiquidFolder,
	},
	{
		id: "clothesline",
		name: "Clothesline Gallery",
		tags: ["scroll", "horizontal", "pin", "string", "sketch", "progress"],
		description: "Rooftop clothesline — pinned cards scroll on X with progress, click to inspect.",
		Component: HeroClothesline,
	},
	{
		id: "image-marquee",
		name: "Image Marquee",
		tags: ["marquee", "infinite", "scroll", "images", "rows"],
		description: "Four infinite image+label rows — alternating directions, seamless loop.",
		Component: HeroImageMarquee,
	},
	{
		id: "wave-transcript",
		name: "Wave Transcript",
		tags: ["audio", "waveform", "transcript", "speech", "karaoke", "timer"],
		description: "Orange play pill with waveform + timer, tether lines, karaoke transcript.",
		Component: HeroWaveTranscript,
	},
	{
		id: "translate-marquee",
		name: "Translate Marquee",
		tags: ["translation", "marquee", "english", "hindi", "waveform", "live"],
		description: "Full-bleed EN → waveform pill → HI — English in, Hindi out on black bar.",
		Component: HeroTranslateMarquee,
	},
	{
		id: "weather-sliders",
		name: "Weather Sliders",
		tags: ["weather", "sliders", "clouds", "storm", "sun", "wind", "heat", "rain"],
		description: "Glass weather mixer — Clouds, Storm, Sun, Wind, Heat drive the sky live.",
		Component: HeroWeatherSliders,
	},
	{
		id: "pay-drawer",
		name: "Pay BTC Drawer",
		tags: ["pay", "drawer", "btc", "slider", "avatars", "phone", "wallet"],
		description: "Phone Pay BTC sheet — avatar carousel, amount ruler, confirm → send loop.",
		Component: HeroPayDrawer,
	},
	{
		id: "calm-drag",
		name: "Calm Drag",
		tags: ["drag", "svg", "scribble", "calm", "slider", "interactive"],
		description: "Tangled SVG line — drag the handle right to straighten that portion.",
		Component: HeroCalmDrag,
	},
	{
		id: "scroll-man-dog",
		name: "Scroll Man & Dog",
		tags: ["scroll", "svg", "sticky", "scale", "typography", "dog", "wave"],
		description: "Man stays put and waves hi; dog scales up with scroll.",
		Component: HeroScrollManDog,
	},
	{
		id: "typewriter-bill",
		name: "Typewriter Bill",
		tags: ["typewriter", "invoice", "print", "scroll", "paper"],
		description: "Typewriter prints an invoice — scroll feeds the bill upward in Y.",
		Component: HeroTypewriterBill,
	},
	{
		id: "ai-approval",
		name: "AI Approval Chat",
		tags: ["ai", "chat", "approval", "notion", "hubspot", "slack", "whatsapp", "agent"],
		description: "Multi-step agent checklist — research, Notion, emails, Slack/WhatsApp with approve/cancel.",
		Component: HeroAIApprovalChat,
	},
	{
		id: "notes-drop",
		name: "Notes Drop",
		tags: ["scroll", "string", "notes", "confetti", "drop", "clothesline"],
		description: "Walker on a string — scroll drops 6 stamp notes with thread + confetti.",
		Component: HeroNotesDrop,
	},
	{
		id: "everest-scroll",
		name: "Everest Scroll",
		tags: ["scroll", "parallax", "everest", "mountain", "tooltip", "story"],
		description: "Pan Mount Everest on scroll — landmark tooltips, altitude HUD, summit zoom.",
		Component: HeroEverestScroll,
	},
	{
		id: "hot-coffee",
		name: "Hot Coffee",
		tags: ["coffee", "mug", "steam", "clouds", "svg", "loop", "animation"],
		description: "Red latte mug — steam cloud plumes rise and fade in a continuous loop.",
		Component: HeroHotCoffee,
	},
	{
		id: "thread-shirt",
		name: "Thread Shirt",
		tags: ["scroll", "thread", "wool", "tshirt", "sew", "svg"],
		description: "Wool spool feeds the tee — scroll weaves/prints the shirt in place (fast).",
		Component: HeroThreadShirt,
	},
	{
		id: "speech-to-text",
		name: "Speech to Text",
		tags: ["speech", "waveform", "text", "stt", "scroll", "animation", "light"],
		description: "Scroll drives right waveform + thrown glyphs; left moves reverse on scroll up.",
		Component: HeroSpeechToText,
	},
	{
		id: "milk-pour",
		name: "Milk Pour",
		tags: ["scroll", "milk", "bottle", "pour", "tilt", "svg", "glass"],
		description: "Glass milk bottle fills, tilts ~45°, pours into a glass — milk empties and fills.",
		Component: HeroMilkPour,
	},
	{
		id: "meet-sparrow",
		name: "Meet the Sparrow",
		tags: ["scroll", "svg", "bird", "sparrow", "stroke", "color", "draw"],
		description: "Text left + same bird SVG right — scroll reveals each line and fills matching bird parts with color.",
		Component: HeroMeetSparrow,
	},
	
	{
		id: "year-pad",
		name: "Year Pad",
		tags: ["iphone", "calendar", "365", "emoji", "journal", "notes"],
		description: "iPhone mockup with 365 day dots — tap opens a writing pad saved as emoji.",
		Component: HeroYearPad,
	},
	{
		id: "book-library",
		name: "Book Library",
		tags: ["books", "3d", "scroll", "horizontal", "newsletter", "archive", "shelf"],
		description: "3D newsletter spines on a shelf — scroll pans X, hover lifts a book with tooltip.",
		Component: HeroBookLibrary,
	},
	{
		id: "motion-ball",
		name: "Motion Ball",
		tags: ["scroll", "ball", "typography", "pipe", "motion", "light", "story"],
		description: "Light theme — ball + full-width line mask text; above the line stays hidden, below stays visible.",
		Component: HeroMotionBall,
	},
	{
		id: "travel-dots",
		name: "Travel Dots",
		tags: ["scroll", "horizontal", "travel", "dots", "scale", "cursor", "unsplash", "light"],
		description: "Travel dots in a row — only the centered dot scales into the image; the next stays a dot until it arrives.",
		Component: HeroTravelDotScroll,
	},
	{
		id: "time-glossary",
		name: "Time Glossary",
		tags: ["editorial", "glossary", "story", "scroll", "rails", "serif", "light"],
		description: "Side vertical rails open story parts; bottom marker + window scroll sync the active entry.",
		Component: HeroTimeGlossary,
	},
	{
		id: "cycle-doodle",
		name: "Cycle Doodle",
		tags: ["scroll", "video", "cyclist", "doodle", "scrub", "mp4", "light"],
		description: "Hand-drawn cyclist rides left → right with scroll; tires and pedals scrub only while scrolling.",
		Component: HeroCycleDoodle,
	},
];

export function findComponent(id) {
	if (!id) return null;
	const key = String(id).toLowerCase();
	return COMPONENTRY.find((c) => c.id === key) || null;
}

export function searchComponents(query) {
	let components = COMPONENTRY;
	const q = (query || "").trim().toLowerCase();
	if (!q) return components;
	return components.filter((c) => {
		const hay = [c.id, c.name, c.description, ...(c.tags || [])]
			.join(" ")
			.toLowerCase();
		return hay.includes(q);
	});
}
