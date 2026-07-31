import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { ArrowUpRight, Command, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SiteSeo from "@/components/seo/SiteSeo";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { CHECKOUT, PRODUCT } from "../agencyConfig";
import {
	COMPONENTRY,
	PREVIEW_SHOTS,
	findComponent,
} from "../componentryCatalog";

const fadeUp = {
	initial: { opacity: 0, y: 16 },
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.45 },
};

function ComponentSection({ entry, isLight, active }) {
	const Comp = entry.Component;
	const props = entry.bare
		? {}
		: entry.needsShots
			? { screenshots: PREVIEW_SHOTS, isLight }
			: { isLight };

	return (
		<section
			id={entry.id}
			data-component={entry.id}
			className={cn(
				"mb-10 scroll-mt-28 rounded-2xl transition ring-offset-4",
				active &&
					(isLight
						? "ring-2 ring-violet-500/60 ring-offset-zinc-50"
						: "ring-2 ring-violet-400/50 ring-offset-zinc-950")
			)}
		>
			<div className="mb-4 flex flex-wrap items-end justify-between gap-2 px-1">
				<div>
					<p
						className={cn(
							"text-[11px] font-semibold uppercase tracking-[0.16em]",
							isLight ? "text-zinc-400" : "text-zinc-500"
						)}
					>
						{entry.id}
					</p>
					<h2
						className={cn(
							"text-lg font-semibold tracking-tight sm:text-xl",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						{entry.name}
					</h2>
					<p
						className={cn(
							"mt-0.5 max-w-xl text-xs sm:text-sm",
							isLight ? "text-zinc-500" : "text-zinc-400"
						)}
					>
						{entry.description}
					</p>
				</div>
				<a
					href={`/?c=${entry.id}`}
					className={cn(
						"text-[11px] font-medium tabular-nums",
						isLight ? "text-zinc-400 hover:text-zinc-700" : "text-zinc-500 hover:text-zinc-300"
					)}
				>
					/?c={entry.id}
				</a>
			</div>
			<Comp {...props} />
		</section>
	);
}

function HomeContent() {
	const { isLight } = useAgencyTheme();
	const router = useRouter();
	const activeId =
		typeof router.query.c === "string" ? router.query.c.toLowerCase() : "";
	const [flashId, setFlashId] = useState("");

	useEffect(() => {
		if (!router.isReady || !activeId) return undefined;
		const match = findComponent(activeId);
		if (!match) return undefined;

		const el = document.getElementById(match.id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth", block: "start" });
		}
		setFlashId(match.id);
		const t = window.setTimeout(() => setFlashId(""), 2200);
		return () => window.clearTimeout(t);
	}, [router.isReady, activeId]);

	const openSearch = () => {
		window.dispatchEvent(new CustomEvent("componentry:search"));
	};

	return (
		<>
			<SiteSeo
				title={`${PRODUCT.name} – UI motion components for Next.js`}
				description={PRODUCT.description}
				path="/"
				keywords="Componentry, UI components, Next.js heroes, Framer Motion, React component kit"
			/>

			<motion.header {...fadeUp} className="mb-12 text-center sm:mb-16">
				<p
					className={cn(
						"text-[11px] font-semibold uppercase tracking-[0.22em]",
						isLight ? "text-zinc-500" : "text-zinc-400"
					)}
				>
					Component library
				</p>
				<h1
					className={cn(
						"mt-3 text-4xl font-bold tracking-tight sm:text-5xl",
						isLight ? "text-zinc-950" : "text-white"
					)}
				>
					{PRODUCT.name}
				</h1>
				<p
					className={cn(
						"mx-auto mt-4 max-w-lg text-sm leading-relaxed sm:text-base",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					{PRODUCT.tagline}. Browse live demos below, jump with{" "}
					<button
						type="button"
						onClick={openSearch}
						className={cn(
							"inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-medium",
							isLight
								? "border-zinc-200 bg-white text-zinc-800"
								: "border-zinc-700 bg-zinc-900 text-zinc-200"
						)}
					>
						<Command className="h-3 w-3" />K
					</button>
					, or deep-link with <code className="text-xs">/?c=iphone</code>.
				</p>

				<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
					<Button
						type="button"
						variant="outline"
						onClick={openSearch}
						className="gap-2 rounded-full"
					>
						<Search className="h-4 w-4" />
						Search components
					</Button>
					<a href={CHECKOUT.usd} target="_blank" rel="noopener noreferrer">
						<Button className="gap-2 rounded-full bg-violet-600 text-white hover:bg-violet-500">
							Buy {CHECKOUT.priceLabel}
							<ArrowUpRight className="h-4 w-4" />
						</Button>
					</a>
				</div>

				<p
					className={cn(
						"mt-8 text-xs font-medium uppercase tracking-[0.18em]",
						isLight ? "text-zinc-400" : "text-zinc-500"
					)}
				>
					{COMPONENTRY.length} components · single page
				</p>
			</motion.header>

			<div id="catalog">
				{COMPONENTRY.map((entry) => (
					<ComponentSection
						key={entry.id}
						entry={entry}
						isLight={isLight}
						active={flashId === entry.id}
					/>
				))}
			</div>

			<section
				className={cn(
					"mt-8 mb-4 rounded-2xl border p-6 text-center sm:p-8",
					isLight
						? "border-zinc-200 bg-white"
						: "border-zinc-800 bg-zinc-900/50"
				)}
			>
				<h2
					className={cn(
						"text-xl font-semibold tracking-tight",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					Get the kit
				</h2>
				<p
					className={cn(
						"mx-auto mt-2 max-w-md text-sm",
						isLight ? "text-zinc-500" : "text-zinc-400"
					)}
				>
					One purchase. Copy the components into your Next.js app and keep
					shipping heroes.
				</p>
				<a
					href={CHECKOUT.usd}
					target="_blank"
					rel="noopener noreferrer"
					className="mt-5 inline-flex"
				>
					<Button className="gap-2 rounded-full bg-violet-600 text-white hover:bg-violet-500">
						Buy on Gumroad · {CHECKOUT.priceLabel}
						<ArrowUpRight className="h-4 w-4" />
					</Button>
				</a>
			</section>
		</>
	);
}

export default function HomePage() {
	return (
		<AgencyShell wide size="wide">
			<HomeContent />
		</AgencyShell>
	);
}

HomePage.disableLayout = true;
