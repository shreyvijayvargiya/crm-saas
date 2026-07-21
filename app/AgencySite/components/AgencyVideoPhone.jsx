import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Minimize2, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgencyTheme } from "../AgencyThemeContext";

const YOUTUBE_SHORT_ID = "SEALF79WciM";
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_SHORT_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_SHORT_ID}&playsinline=1&rel=0&modestbranding=1`;
const VIDEO_MINIMIZED_KEY = "saascrm-agency-video-minimized";

function isDemoRoute(pathname) {
	return pathname === "/demo" || pathname.startsWith("/demo/");
}

export default function AgencyVideoPhone() {
	const router = useRouter();
	const { isLight } = useAgencyTheme();
	const [isMinimized, setIsMinimized] = useState(true);

	useEffect(() => {
		setIsMinimized(localStorage.getItem(VIDEO_MINIMIZED_KEY) === "true");
	}, []);

	const updateMinimized = (value) => {
		setIsMinimized(value);
		localStorage.setItem(VIDEO_MINIMIZED_KEY, String(value));
	};

	if (isDemoRoute(router.pathname)) {
		return null;
	}

	if (isMinimized) {
		return (
			<button
				type="button"
				onClick={() => updateMinimized(false)}
				className={cn(
					"fixed bottom-3 right-3 z-40 hidden items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 md:flex",
					isLight
						? "border-zinc-200 bg-white/95 text-zinc-800 shadow-zinc-300/40"
						: "border-zinc-700 bg-zinc-900/95 text-zinc-200 shadow-black/50"
				)}
				aria-label="Show CRM preview video"
			>
				<span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-white">
					<Play className="h-3 w-3 fill-current" />
				</span>
				Watch demo
			</button>
		);
	}

	return (
		<div
			className={cn(
				"fixed z-40 flex flex-col items-center gap-1.5",
				"bottom-3 right-3",
				"hidden md:flex"
			)}
		>
			<div
				className={cn(
					"relative rounded-[1.65rem] p-1.5 shadow-2xl ring-2",
					isLight
						? "bg-zinc-900 ring-zinc-300/80 shadow-zinc-400/30"
						: "bg-black ring-zinc-600 shadow-black/60"
				)}
			>
				<button
					type="button"
					onClick={() => updateMinimized(true)}
					className={cn(
						"absolute -left-3 -top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border shadow-lg transition hover:scale-105",
						isLight
							? "border-zinc-200 bg-white text-zinc-700"
							: "border-zinc-700 bg-zinc-900 text-zinc-200"
					)}
					aria-label="Minimize CRM preview video"
					title="Minimize video"
				>
					<Minimize2 className="h-4 w-4" />
				</button>
				<span
					className={cn(
						"absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full",
						isLight ? "bg-zinc-700" : "bg-zinc-600"
					)}
					aria-hidden
				/>
				<div className="overflow-hidden rounded-[1.25rem] bg-black">
					<div className="relative aspect-[9/16] w-[8.5rem] sm:w-[9.5rem]">
						<iframe
							src={YOUTUBE_EMBED_URL}
							title="CRM template preview"
							className="absolute inset-0 h-full w-full border-0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							referrerPolicy="strict-origin-when-cross-origin"
							allowFullScreen
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
