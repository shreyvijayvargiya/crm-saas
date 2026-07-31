import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_ITEMS = [
	{
		id: "toc-1",
		title: "Ship the agentic CRM chatbot shell",
		body: "OpenRouter tool-calling wired to CrmDataContext snapshot mutations. Preview · PR #1042",
		files: ["AIChatSidebar/index.jsx", "lib/ai/openrouter.js", "pages/api/ai/chat.js"],
	},
	{
		id: "toc-2",
		title: "uh ok lets make it 0.98, and then also apply it to…",
		body: "Done and deployed. Polykit Buttons and Select triggers now both press to scale: 0.98 over 120ms. Preview · PR #11148",
		files: ["button.tsx", "menu-primitives.tsx", "pressable.ts"],
	},
	{
		id: "toc-3",
		title: "Leads kanban DnD between pipeline stages",
		body: "dnd-kit sortable columns sync list + board state. Empty states and toast on drop. Preview · PR #1088",
		files: ["app/Leads/index.jsx", "app/CRM/leadsSeedData.js"],
	},
	{
		id: "toc-4",
		title: "Theme customizer accent schemes",
		body: "Blue default plus green, purple, orange, red, pink, indigo, zinc via useTheme(). Preview · PR #991",
		files: ["utils/theme.js", "modules/ThemeCustomizer/index.jsx"],
	},
	{
		id: "toc-5",
		title: "Agency landing dual-surface polish",
		body: "Marketing shell with disableLayout, gravity stars, and checkout CTAs. Preview · PR #1201",
		files: ["AgencyShell.jsx", "agencyConfig.js", "HomePage.jsx"],
	},
	{
		id: "toc-6",
		title: "Invoice line-item modal + PDF stub",
		body: "Create invoice form with totals; download action toasts for demo. Preview · PR #1155",
		files: ["app/Invoices/index.jsx", "InvoiceDetail.jsx"],
	},
	{
		id: "toc-7",
		title: "Marketing campaign builder tabs",
		body: "Audience, Steps, Schedule, Stats with segment picker and pause/play. Preview · PR #1170",
		files: ["Marketing/CampaignDetail/index.jsx", "marketingSeedData.js"],
	},
	{
		id: "toc-8",
		title: "Subscription MRR charts + plans grid",
		body: "Area/bar/pie overview and plan create modal. Preview · PR #1182",
		files: ["Subscriptions/index.jsx", "Subscriptions/Plans/index.jsx"],
	},
	{
		id: "toc-9",
		title: "Support ticket detail message thread",
		body: "EntityDetailShell with priority, status, assignee timeline. Preview · PR #1094",
		files: ["Support/TicketDetail.jsx", "supportSeedData.js"],
	},
	{
		id: "toc-10",
		title: "Horizontal scroll gallery driven by Y scroll",
		body: "useScroll + useTransform maps window progress to -x track travel. Preview · PR #1304",
		files: ["HeroHorizontalScroll.jsx"],
	},
	{
		id: "toc-11",
		title: "Phone lens mockup over image strip",
		body: "Transparent bezel hole; center card scale/blur keyed to scroll. Preview · PR #1308",
		files: ["HeroPhoneScroll.jsx"],
	},
	{
		id: "toc-12",
		title: "Expanding flex accordion gallery",
		body: "Click strip expands flexGrow; caption + CTA only on active. Preview · PR #1310",
		files: ["HeroExpandGallery.jsx"],
	},
	{
		id: "toc-13",
		title: "Bumble-style swipe gradient deck",
		body: "Drag L/R with Like/Nope stamps; deck loops at end. Preview · PR #1312",
		files: ["HeroSwipeCards.jsx"],
	},
	{
		id: "toc-14",
		title: "Vertical dock story hero",
		body: "Thumbnail rail swaps full-bleed bg + title with crossfade. Preview · PR #1314",
		files: ["HeroVerticalDock.jsx"],
	},
	{
		id: "toc-15",
		title: "Card wallet hover lift stack",
		body: "Wallet hover raises cards; card hover brings it to front. Preview · PR #1316",
		files: ["HeroCardWallet.jsx"],
	},
	{
		id: "toc-16",
		title: "Kinetic type vortex → paragraph",
		body: "Letters fly from tornado coords into measured text positions. Preview · PR #1318",
		files: ["HeroKineticType.jsx"],
	},
	{
		id: "toc-17",
		title: "Story film assemble → mosaic reel",
		body: "Stack cards then full-screen 6-up scene with staggered reveals. Preview · PR #1320",
		files: ["HeroStoryFilm.jsx"],
	},
	{
		id: "toc-18",
		title: "Zod schema verify against data.json",
		body: "npm run verify:schemas parses every app* section. Preview · PR #880",
		files: ["scripts/verify-schemas.mjs", "schemas/zod-schemas/index.js"],
	},
	{
		id: "toc-19",
		title: "i18n language picker in sidebar",
		body: "Eight locales via i18next; AutoTranslate for DOM copy. Preview · PR #1020",
		files: ["utils/i18n.js", "modules/Sidebar/index.jsx"],
	},
	{
		id: "toc-20",
		title: "CMD+K search from navConfig",
		body: "Single source of truth for sidebar + search extras. Preview · PR #960",
		files: ["modules/navConfig.js", "modules/Navbar/index.jsx"],
	},
];

const ease = [0.22, 1, 0.36, 1];

/** Fisheye width: peak at hover, falloff by distance */
function railWidth(index, activeIndex, total) {
	if (activeIndex == null) {
		/* Idle wave — slightly longer toward the middle */
		const mid = (total - 1) / 2;
		const dist = Math.abs(index - mid) / Math.max(mid, 1);
		return 28 + (1 - dist) * 36;
	}
	const dist = Math.abs(index - activeIndex);
	if (dist === 0) return 88;
	if (dist === 1) return 64;
	if (dist === 2) return 48;
	if (dist === 3) return 36;
	return 22 + Math.max(0, 8 - dist);
}

/**
 * HeroTocRail — left TOC bars with fisheye widths; hover opens a detail tooltip.
 */
export default function HeroTocRail({
	items = DEFAULT_ITEMS,
	isLight = true,
	className,
}) {
	const list = useMemo(() => (items.length ? items : DEFAULT_ITEMS), [items]);
	const [activeId, setActiveId] = useState(null);

	const activeIndex = useMemo(() => {
		if (!activeId) return null;
		const i = list.findIndex((item) => item.id === activeId);
		return i >= 0 ? i : null;
	}, [activeId, list]);

	const activeItem = activeIndex != null ? list[activeIndex] : null;

	return (
		<section
			className={cn(
				"relative mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20",
				className
			)}
			aria-label="Table of contents rail"
		>
			<div className="relative flex min-h-[420px] items-center gap-6 sm:gap-10">
				{/* Rail */}
				<nav
					className="relative z-10 flex w-28 shrink-0 flex-col justify-center gap-[5px] sm:w-32"
					onMouseLeave={() => setActiveId(null)}
					aria-label="Sections"
				>
					{list.map((item, index) => {
						const width = railWidth(index, activeIndex, list.length);
						const isActive = item.id === activeId;

						return (
							<button
								key={item.id}
								type="button"
								onMouseEnter={() => setActiveId(item.id)}
								onFocus={() => setActiveId(item.id)}
								className="group flex h-2.5 items-center justify-start outline-none"
								aria-label={item.title}
								aria-describedby={
									isActive ? `toc-tooltip-${item.id}` : undefined
								}
							>
								<motion.span
									className={cn(
										"block h-[3px] rounded-full transition-colors",
										isActive
											? isLight
												? "bg-zinc-900"
												: "bg-white"
											: isLight
												? "bg-zinc-300 group-hover:bg-zinc-500"
												: "bg-zinc-600 group-hover:bg-zinc-400"
									)}
									initial={false}
									animate={{ width }}
									transition={{ type: "spring", stiffness: 420, damping: 28 }}
								/>
							</button>
						);
					})}
				</nav>

				{/* Tooltip */}
				<div className="relative min-h-[160px] flex-1">
					<AnimatePresence mode="wait">
						{activeItem && (
							<motion.aside
								key={activeItem.id}
								id={`toc-tooltip-${activeItem.id}`}
								role="tooltip"
								initial={{ opacity: 0, x: -12, y: 8, scale: 0.96 }}
								animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
								exit={{ opacity: 0, x: -8, y: 4, scale: 0.97 }}
								transition={{ duration: 0.28, ease }}
								className={cn(
									"absolute left-0 top-1/2 w-full max-w-md -translate-y-1/2 rounded-2xl border p-5 shadow-xl sm:p-6",
									isLight
										? "border-zinc-200/80 bg-white text-zinc-900 shadow-zinc-300/40"
										: "border-zinc-700 bg-zinc-900 text-zinc-50 shadow-black/40"
								)}
								style={{
									/* Nudge toward hovered bar */
									marginTop:
										activeIndex != null
											? (activeIndex - (list.length - 1) / 2) * 6
											: 0,
								}}
							>
								<h3 className="text-base font-semibold leading-snug tracking-tight sm:text-lg">
									{activeItem.title}
								</h3>
								<p
									className={cn(
										"mt-2 text-sm leading-relaxed",
										isLight ? "text-zinc-500" : "text-zinc-400"
									)}
								>
									{activeItem.body}
								</p>
								{(activeItem.files || []).length > 0 && (
									<div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
										{activeItem.files.slice(0, 2).map((file) => (
											<span
												key={file}
												className={cn(
													"inline-flex items-center gap-1.5 text-xs",
													isLight ? "text-zinc-400" : "text-zinc-500"
												)}
											>
												<FileCode2 className="h-3.5 w-3.5 shrink-0 opacity-70" />
												<span className="truncate">{file}</span>
											</span>
										))}
										{activeItem.files.length > 2 && (
											<span
												className={cn(
													"text-xs font-medium",
													isLight ? "text-zinc-400" : "text-zinc-500"
												)}
											>
												+{activeItem.files.length - 2}
											</span>
										)}
									</div>
								)}
							</motion.aside>
						)}
					</AnimatePresence>

					{!activeItem && (
						<p
							className={cn(
								"absolute left-0 top-1/2 -translate-y-1/2 text-sm",
								isLight ? "text-zinc-400" : "text-zinc-600"
							)}
						>
							Hover a bar to preview
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
