import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ShoppingBag, Sun, Moon, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgencyTheme } from "../AgencyThemeContext";
import { CHECKOUT, PRODUCT } from "../agencyConfig";
import ComponentSearchModal from "./ComponentSearchModal";

const PILL_SPRING = { type: "spring", stiffness: 440, damping: 34, mass: 0.75 };

export default function DynamicIslandNav() {
	const { isLight, toggleTheme } = useAgencyTheme();
	const [searchOpen, setSearchOpen] = useState(false);

	React.useEffect(() => {
		const onOpen = () => setSearchOpen(true);
		window.addEventListener("componentry:search", onOpen);
		return () => window.removeEventListener("componentry:search", onOpen);
	}, []);

	const btn = (activeLight) =>
		cn(
			"flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-3 transition-colors duration-200 sm:h-10",
			activeLight
				? "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
				: "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
		);

	return (
		<>
			<div
				className={cn(
					"pointer-events-none relative inset-x-0 top-0.5 z-50 flex",
					"justify-stretch sm:justify-center sm:pb-6"
				)}
			>
				<motion.nav
					layout
					initial={{ opacity: 0, y: 24, scale: 0.96 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ type: "spring", stiffness: 380, damping: 28 }}
					className={cn(
						"pointer-events-auto flex w-full max-w-xl items-center justify-between gap-1 rounded-full border px-2 py-2 sm:w-auto",
						"mx-3 mt-2 sm:mx-0 sm:mt-0",
						"pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:pb-2",
						isLight
							? "border-zinc-200/60 bg-white/80 shadow-sm backdrop-blur-md"
							: "border-zinc-800/90 bg-zinc-950/85 shadow-black/40 backdrop-blur-md"
					)}
					aria-label="Componentry navigation"
				>
					<Link href="/" passHref>
						<a
							className={cn(
								"flex items-center gap-2 rounded-full px-2.5 py-1.5 text-sm font-semibold tracking-tight",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							<span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
								<Layers className="h-3.5 w-3.5" />
							</span>
							<span className="hidden sm:inline">{PRODUCT.name}</span>
						</a>
					</Link>

					<div className="flex items-center gap-0.5">
						<motion.button
							type="button"
							whileTap={{ scale: 0.94 }}
							transition={PILL_SPRING}
							onClick={() => setSearchOpen(true)}
							className={btn(isLight)}
							aria-label="Search components"
						>
							<Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
							<span className="hidden text-xs font-medium sm:inline">Search</span>
							<kbd
								className={cn(
									"ml-0.5 hidden rounded border px-1 py-0.5 text-[9px] font-medium md:inline",
									isLight
										? "border-zinc-200 text-zinc-400"
										: "border-zinc-700 text-zinc-500"
								)}
							>
								⌘K
							</kbd>
						</motion.button>

						<div
							className={cn(
								"mx-1 hidden h-5 w-px sm:block",
								isLight ? "bg-zinc-200" : "bg-zinc-700"
							)}
							aria-hidden
						/>

						<motion.button
							type="button"
							whileTap={{ scale: 0.94 }}
							onClick={toggleTheme}
							className={cn(
								"flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 sm:h-10 sm:w-10",
								isLight
									? "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
									: "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
							)}
							aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
						>
							{isLight ? (
								<Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
							) : (
								<Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
							)}
						</motion.button>

						<a
							href={CHECKOUT.usd}
							target="_blank"
							rel="noopener noreferrer"
							className="ml-0.5"
						>
							<motion.span
								whileTap={{ scale: 0.94 }}
								className="inline-flex h-11 items-center gap-1.5 rounded-full bg-violet-600 px-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-500 sm:h-10"
							>
								<ShoppingBag className="h-4 w-4" strokeWidth={2} />
								<span className="hidden sm:inline">Buy</span>
								<span className="tabular-nums">{CHECKOUT.priceLabel}</span>
							</motion.span>
						</a>
					</div>
				</motion.nav>
			</div>

			<ComponentSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
		</>
	);
}
