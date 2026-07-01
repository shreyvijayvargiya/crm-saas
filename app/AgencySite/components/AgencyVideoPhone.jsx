import React from "react";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";
import { useAgencyTheme } from "../AgencyThemeContext";

const YOUTUBE_SHORT_ID = "SEALF79WciM";
const YOUTUBE_EMBED_URL = `https://www.youtube.com/embed/${YOUTUBE_SHORT_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_SHORT_ID}&playsinline=1&rel=0&modestbranding=1`;

function isDemoRoute(pathname) {
	return pathname === "/demo" || pathname.startsWith("/demo/");
}

export default function AgencyVideoPhone() {
	const router = useRouter();
	const { isLight } = useAgencyTheme();

	if (isDemoRoute(router.pathname)) {
		return null;
	}

	return (
		<div
			className={cn(
				"fixed z-40 flex flex-col items-center gap-1.5",
				"bottom-[calc(5.75rem+env(safe-area-inset-bottom))] right-3 bottom-3",
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
