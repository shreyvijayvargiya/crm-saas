import React from "react";
import { cn } from "@/lib/utils";
import { AgencyThemeProvider, useAgencyTheme } from "../AgencyThemeContext";
import DynamicIslandNav from "./DynamicIslandNav";
import AgencyVideoPhone from "./AgencyVideoPhone";
import AgencyFooter from "./AgencyFooter";
import { GravityStarsBackground } from "@/src/components/animate-ui/components/backgrounds/gravity-stars";

function AgencyShellInner({ children, className }) {
	const { isLight } = useAgencyTheme();

	return (
		<div
			className={cn(
				"min-h-screen antialiased transition-colors duration-300",
				isLight
					? "bg-zinc-50 text-zinc-900 selection:bg-zinc-300/40"
					: "bg-zinc-950 text-zinc-100 selection:bg-zinc-700/50"
			)}
		>
			<div
				className="pointer-events-none fixed inset-0 opacity-40 transition-opacity duration-300"
				style={{
					backgroundImage: isLight
						? `radial-gradient(circle at 20% 20%, rgba(113, 113, 122, 0.12), transparent 45%),
              radial-gradient(circle at 80% 0%, rgba(161, 161, 170, 0.1), transparent 40%),
              linear-gradient(to bottom, transparent, rgb(250 250 250) 72%)`
						: `radial-gradient(circle at 20% 20%, rgba(161, 161, 170, 0.08), transparent 45%),
              radial-gradient(circle at 80% 0%, rgba(113, 113, 122, 0.06), transparent 40%),
              linear-gradient(to bottom, transparent, #09090b 70%)`,
				}}
			/>
			<div
				className="pointer-events-none fixed inset-0 opacity-[0.12] transition-opacity duration-300"
				style={{
					backgroundSize: "64px 64px",
					backgroundImage: isLight
						? `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`
						: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
				}}
			/>

			<div className="relative z-10 mx-auto flex min-h-screen max-w-3xl flex-col px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-20 sm:px-6 sm:pb-28 sm:pt-20">
				{children}
				<AgencyFooter />
			</div>

			<DynamicIslandNav />
			<AgencyVideoPhone />
			<GravityStarsBackground className="absolute inset-0 top-[40%] bottom-0 " />
		</div>
	);
}

export default function AgencyShell({ children, className }) {
	return (
		<AgencyThemeProvider>
			<AgencyShellInner className={className}>{children}</AgencyShellInner>
		</AgencyThemeProvider>
	);
}
