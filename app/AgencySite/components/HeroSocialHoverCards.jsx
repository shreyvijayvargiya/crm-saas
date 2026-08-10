import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	SiGithub,
	SiInstagram,
	SiLinkedin,
	SiX,
	SiYoutube,
} from "react-icons/si";
import { cn } from "@/lib/utils";

const SOCIALS = [
	{
		id: "github",
		label: "GitHub",
		handle: "@shreyvijayvargiya",
		href: "https://github.com",
		Icon: SiGithub,
		accent: "#24292f",
		card: "github",
	},
	{
		id: "x",
		label: "X",
		handle: "@shreybuilds",
		href: "https://x.com",
		Icon: SiX,
		accent: "#0f1419",
		card: "x",
	},
	{
		id: "linkedin",
		label: "LinkedIn",
		handle: "Shrey Vijayvargiya",
		href: "https://linkedin.com",
		Icon: SiLinkedin,
		accent: "#0a66c2",
		card: "linkedin",
	},
	{
		id: "instagram",
		label: "Instagram",
		handle: "@studio.shots",
		href: "https://instagram.com",
		Icon: SiInstagram,
		accent: "#e1306c",
		card: "instagram",
	},
	{
		id: "youtube",
		label: "YouTube",
		handle: "Build in Public",
		href: "https://youtube.com",
		Icon: SiYoutube,
		accent: "#ff0000",
		card: "youtube",
	},
];

const GH_WEEKS = 16;
const GH_DAYS = 7;

function githubLevels() {
	const cells = [];
	for (let w = 0; w < GH_WEEKS; w++) {
		for (let d = 0; d < GH_DAYS; d++) {
			const seed = (w * 11 + d * 7) % 5;
			cells.push(seed);
		}
	}
	return cells;
}

const GH_COLORS = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];
const GH_COLORS_DARK = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"];

function GithubCalendarCard({ isLight }) {
	const cells = githubLevels();
	const colors = isLight ? GH_COLORS : GH_COLORS_DARK;
	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-semibold">Contribution graph</p>
					<p className={cn("text-xs", isLight ? "text-zinc-500" : "text-zinc-400")}>
						312 contributions this year
					</p>
				</div>
				<span
					className={cn(
						"rounded-full px-2 py-0.5 text-[10px] font-medium",
						isLight ? "bg-zinc-100 text-zinc-600" : "bg-zinc-800 text-zinc-300"
					)}
				>
					Public
				</span>
			</div>
			<div
				className="grid gap-[3px]"
				style={{
					gridTemplateColumns: `repeat(${GH_WEEKS}, minmax(0, 1fr))`,
					gridTemplateRows: `repeat(${GH_DAYS}, 10px)`,
					gridAutoFlow: "column",
				}}
			>
				{cells.map((level, i) => (
					<span
						key={i}
						className="rounded-[2px]"
						style={{ backgroundColor: colors[level] }}
					/>
				))}
			</div>
			<div className="flex items-center gap-3 text-[11px]">
				<span className={isLight ? "text-zinc-500" : "text-zinc-400"}>
					12 repos · 4.2k stars
				</span>
			</div>
		</div>
	);
}

function XProfileCard({ isLight }) {
	return (
		<div className="space-y-3">
			<div
				className={cn(
					"h-16 rounded-xl bg-gradient-to-r",
					isLight
						? "from-zinc-200 via-zinc-100 to-zinc-300"
						: "from-zinc-700 via-zinc-800 to-zinc-600"
				)}
			/>
			<div className="-mt-8 flex items-end gap-3 px-1">
				<div
					className={cn(
						"flex h-14 w-14 items-center justify-center rounded-full border-4 text-lg font-bold",
						isLight
							? "border-white bg-zinc-900 text-white"
							: "border-zinc-900 bg-white text-zinc-900"
					)}
				>
					S
				</div>
				<div className="mb-1 min-w-0 flex-1">
					<p className="truncate text-sm font-semibold">Shrey</p>
					<p className={cn("truncate text-xs", isLight ? "text-zinc-500" : "text-zinc-400")}>
						@shreybuilds
					</p>
				</div>
			</div>
			<p className={cn("text-xs leading-relaxed", isLight ? "text-zinc-600" : "text-zinc-300")}>
				Building SaaS UI kits in public. Shipping Componentry demos weekly.
			</p>
			<div className="flex gap-4 text-xs">
				<span>
					<strong>842</strong>{" "}
					<span className={isLight ? "text-zinc-500" : "text-zinc-400"}>Following</span>
				</span>
				<span>
					<strong>12.4K</strong>{" "}
					<span className={isLight ? "text-zinc-500" : "text-zinc-400"}>Followers</span>
				</span>
			</div>
		</div>
	);
}

function LinkedInBannerCard({ isLight }) {
	return (
		<div className="space-y-3">
			<div className="overflow-hidden rounded-xl">
				<div className="h-20 bg-gradient-to-r from-[#0a66c2] via-[#378fe9] to-[#70b5f9]" />
				<div
					className={cn(
						"flex items-center gap-3 px-3 py-3",
						isLight ? "bg-white" : "bg-zinc-900"
					)}
				>
					<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0a66c2] text-sm font-bold text-white">
						SV
					</div>
					<div className="min-w-0">
						<p className="truncate text-sm font-semibold">Shrey Vijayvargiya</p>
						<p
							className={cn(
								"truncate text-[11px]",
								isLight ? "text-zinc-500" : "text-zinc-400"
							)}
						>
							Founder · SaaSCRM & Componentry
						</p>
					</div>
				</div>
			</div>
			<div className="flex gap-2 text-[11px]">
				<span
					className={cn(
						"rounded-full px-2 py-1",
						isLight ? "bg-blue-50 text-blue-700" : "bg-blue-950 text-blue-300"
					)}
				>
					Open to work
				</span>
				<span className={isLight ? "text-zinc-500" : "text-zinc-400"}>
					1.8k connections
				</span>
			</div>
		</div>
	);
}

function InstagramGridCard({ isLight }) {
	const tiles = [
		{ label: "Reel", tone: "from-fuchsia-500 to-orange-400" },
		{ label: "Post", tone: "from-zinc-400 to-zinc-600" },
		{ label: "Story", tone: "from-pink-500 to-rose-400" },
		{ label: "Live", tone: "from-violet-500 to-indigo-500" },
		{ label: "Carousel", tone: "from-amber-400 to-orange-500" },
		{ label: "Clip", tone: "from-emerald-400 to-teal-500" },
	];
	return (
		<div className="space-y-3">
			<div className="flex items-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[2px]">
					<span
						className={cn(
							"flex h-full w-full items-center justify-center rounded-full text-xs font-bold",
							isLight ? "bg-white" : "bg-zinc-950"
						)}
					>
						IG
					</span>
				</div>
				<div>
					<p className="text-sm font-semibold">studio.shots</p>
					<p className={cn("text-[11px]", isLight ? "text-zinc-500" : "text-zinc-400")}>
						128 posts · 9.2k followers
					</p>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-1.5">
				{tiles.map((t) => (
					<div
						key={t.label}
						className={cn(
							"flex aspect-square items-end rounded-lg bg-gradient-to-br p-1.5",
							t.tone
						)}
					>
						<span className="rounded bg-black/35 px-1 py-0.5 text-[9px] font-medium text-white">
							{t.label}
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

function YoutubeCard({ isLight }) {
	return (
		<div className="space-y-3">
			<div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-600 to-red-800 aspect-video">
				<div className="absolute inset-0 flex items-center justify-center">
					<span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-red-600 shadow-lg">
						▶
					</span>
				</div>
				<span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white">
					12:48
				</span>
			</div>
			<div>
				<p className="text-sm font-semibold leading-snug">
					Shipping a weather card in one file
				</p>
				<p className={cn("mt-1 text-[11px]", isLight ? "text-zinc-500" : "text-zinc-400")}>
					Build in Public · 24K views · 1.2K likes
				</p>
			</div>
		</div>
	);
}

function PreviewCard({ social, isLight }) {
	let body = null;
	if (social.card === "github") body = <GithubCalendarCard isLight={isLight} />;
	else if (social.card === "x") body = <XProfileCard isLight={isLight} />;
	else if (social.card === "linkedin") body = <LinkedInBannerCard isLight={isLight} />;
	else if (social.card === "instagram") body = <InstagramGridCard isLight={isLight} />;
	else body = <YoutubeCard isLight={isLight} />;

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 12, scale: 0.94 }}
			animate={{ opacity: 1, y: 0, scale: 1 }}
			exit={{ opacity: 0, y: 8, scale: 0.96 }}
			transition={{ type: "spring", stiffness: 380, damping: 28 }}
			className={cn(
				"absolute bottom-[calc(100%+14px)] left-1/2 z-30 w-[min(88vw,20.5rem)] -translate-x-1/2 overflow-hidden rounded-2xl border p-4 shadow-2xl",
				isLight
					? "border-zinc-200 bg-white text-zinc-900 shadow-zinc-300/50"
					: "border-zinc-700 bg-zinc-950 text-zinc-50 shadow-black/50"
			)}
		>
			<div className="mb-3 flex items-center gap-2">
				<span
					className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
					style={{ backgroundColor: social.accent }}
				>
					<social.Icon className="h-3.5 w-3.5" />
				</span>
				<div className="min-w-0">
					<p className="truncate text-xs font-semibold">{social.label}</p>
					<p
						className={cn(
							"truncate text-[11px]",
							isLight ? "text-zinc-500" : "text-zinc-400"
						)}
					>
						{social.handle}
					</p>
				</div>
			</div>
			{body}
		</motion.div>
	);
}

/**
 * HeroSocialHoverCards — centered social row; hover reveals profile preview cards
 * (GitHub calendar, X profile, LinkedIn banner, IG grid, YouTube).
 */
export default function HeroSocialHoverCards({ isLight = true, className }) {
	const [active, setActive] = useState(null);

	return (
		<section
			className={cn(
				"flex w-full flex-col items-center justify-center px-4 py-16 sm:py-24",
				className
			)}
			aria-label="Social hover cards"
			onMouseLeave={() => setActive(null)}
		>
			<p
				className={cn(
					"mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.2em]",
					isLight ? "text-zinc-400" : "text-zinc-500"
				)}
			>
				Hover a link
			</p>

			<div className="relative mx-auto flex w-full max-w-xl flex-wrap items-center justify-center gap-2 sm:gap-3">
				{SOCIALS.map((social) => {
					const Icon = social.Icon;
					const isOn = active === social.id;
					return (
						<div
							key={social.id}
							className="relative"
							onMouseEnter={() => setActive(social.id)}
							onFocus={() => setActive(social.id)}
						>
							<motion.a
								href={social.href}
								target="_blank"
								rel="noreferrer"
								whileHover={{ y: -2 }}
								whileTap={{ scale: 0.97 }}
								className={cn(
									"inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition",
									isOn
										? isLight
											? "border-zinc-900 bg-zinc-900 text-white"
											: "border-white bg-white text-zinc-900"
										: isLight
											? "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
											: "border-zinc-700 bg-zinc-900 text-zinc-200 hover:border-zinc-500"
								)}
							>
								<Icon className="h-4 w-4" />
								{social.label}
							</motion.a>

							<AnimatePresence>
								{isOn ? <PreviewCard social={social} isLight={isLight} /> : null}
							</AnimatePresence>
						</div>
					);
				})}
			</div>
		</section>
	);
}
