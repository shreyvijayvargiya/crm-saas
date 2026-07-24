import React from "react";
import { cn } from "@/lib/utils";
import { AgencyThemeProvider, useAgencyTheme } from "../AgencyThemeContext";
import DynamicIslandNav from "./DynamicIslandNav";
import AgencyVideoPhone from "./AgencyVideoPhone";
import AgencyFooter from "./AgencyFooter";
import { GravityStarsBackground } from "@/src/components/animate-ui/components/backgrounds/gravity-stars";

function AgencyShellInner({ children, className, wide = false, size }) {
	const { isLight } = useAgencyTheme();
	const maxWidthClass =
		size === "article"
			? "max-w-4xl"
			: wide || size === "wide"
				? "max-w-7xl"
				: "max-w-3xl";

	return (
		<div
			className={cn(
				"relative min-h-screen antialiased transition-colors duration-300",
				isLight
					? "bg-zinc-50 text-zinc-900 selection:bg-zinc-300/40"
					: "bg-zinc-950 text-zinc-100 selection:bg-zinc-700/50",
				className
			)}
		>
			<br />
			<DynamicIslandNav />
			<GravityStarsBackground
				className={cn(
					"pointer-events-none fixed inset-0 z-0 h-screen w-screen",
					isLight ? "text-zinc-400/80" : "text-white"
				)}
			/>

			<div
				className={cn(
					"relative z-10 mx-auto flex min-h-screen flex-col px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-20 sm:px-6 sm:pb-28 sm:pt-20",
					maxWidthClass
				)}
			>
				{children}
				<AgencyFooter />
			</div>

			
			<AgencyVideoPhone />
		</div>
	);
}

export default function AgencyShell({ children, className, wide = false, size }) {
	return (
		<AgencyThemeProvider>
			<AgencyShellInner className={className} wide={wide} size={size}>
				{children}
			</AgencyShellInner>
		</AgencyThemeProvider>
	);
}
