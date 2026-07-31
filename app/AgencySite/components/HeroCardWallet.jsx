import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Nfc } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_CARDS = [
	{
		id: "paypal",
		brand: "PAYPAL",
		holder: "PERSONAL ACCOUNT",
		last4: "4421",
		bg: "#ffffff",
		fg: "#003087",
		muted: "#64748b",
	},
	{
		id: "wise",
		brand: "WISE",
		holder: "BUSINESS STUDIO LLC",
		last4: "8810",
		bg: "#9fe870",
		fg: "#163300",
		muted: "rgba(22,51,0,0.7)",
	},
	{
		id: "revolut",
		brand: "REVOLUT",
		holder: "PREMIUM CARD",
		last4: "0194",
		bg: "#7c3aed",
		fg: "#ffffff",
		muted: "rgba(255,255,255,0.75)",
	},
];

/** How far each card peeks above the wallet lip (resting). */
const REST_LIFT = [36, 58, 80];
/** Extra lift when the wallet is hovered. */
const HOVER_EXTRA = [70, 100, 130];

/**
 * HeroCardWallet — stitched wallet with 3 stacked cards.
 * Hover wallet → cards rise (Y). Hover a card → it comes to the front (z-index).
 */
export default function HeroCardWallet({
	cards = DEFAULT_CARDS,
	balance = 12450,
	isLight = false,
	className,
}) {
	const list = (cards.length ? cards : DEFAULT_CARDS).slice(0, 3);
	const [walletHover, setWalletHover] = useState(false);
	const [activeCard, setActiveCard] = useState(null);
	const [showBalance, setShowBalance] = useState(false);

	const formatted = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(balance);

	return (
		<section
			className={cn(
				"relative mx-auto flex w-full max-w-md flex-col items-center px-4 py-14 sm:py-16",
				className
			)}
			aria-label="Card wallet"
		>
			<div
				className="relative w-full max-w-[320px] pt-[140px]"
				onMouseEnter={() => setWalletHover(true)}
				onMouseLeave={() => {
					setWalletHover(false);
					setActiveCard(null);
				}}
			>
				{/* Cards tucked into wallet — sit behind wallet face (z-10) */}
				<div className="pointer-events-none absolute inset-x-[4%] bottom-[118px] z-10 h-[180px]">
					{list.map((card, index) => {
						const isFront = activeCard === card.id;
						const rest = REST_LIFT[index] ?? 40;
						const lift = walletHover ? rest + (HOVER_EXTRA[index] ?? 80) : rest;

						return (
							<motion.div
								key={card.id}
								className="pointer-events-auto absolute inset-x-0 bottom-0 h-[168px] cursor-pointer overflow-hidden rounded-2xl shadow-md"
								style={{
									background: card.bg,
									zIndex: isFront ? 50 : index + 1,
									transformOrigin: "bottom center",
								}}
								initial={false}
								animate={{
									y: -lift,
									scale: isFront ? 1.04 : 1,
								}}
								transition={{
									type: "spring",
									stiffness: 340,
									damping: 28,
								}}
								onMouseEnter={() => setActiveCard(card.id)}
								onFocus={() => setActiveCard(card.id)}
								onMouseLeave={() => setActiveCard(null)}
								onBlur={() => setActiveCard(null)}
								tabIndex={0}
								role="button"
								aria-label={`${card.brand} card ending ${card.last4}`}
							>
								<div className="flex h-full flex-col justify-between p-4 sm:p-5">
									<div className="flex items-start justify-between">
										<span
											className="text-sm font-bold tracking-wide"
											style={{ color: card.fg }}
										>
											{card.brand}
										</span>
										<span
											className="flex h-8 w-8 items-center justify-center rounded-md"
											style={{ background: "rgba(128,128,128,0.2)" }}
										>
											<Nfc
												className="h-4 w-4"
												style={{ color: card.fg, opacity: 0.65 }}
											/>
										</span>
									</div>
									<div className="flex items-end justify-between gap-2">
										<p
											className="truncate text-[10px] font-medium uppercase tracking-wider"
											style={{ color: card.muted }}
										>
											{card.holder}
										</p>
										<p
											className="shrink-0 text-xs font-semibold tracking-wider"
											style={{ color: card.fg }}
										>
											**** {card.last4}
										</p>
									</div>
								</div>
							</motion.div>
						);
					})}
				</div>

				{/* Wallet face — covers lower half of cards */}
				<div
					className={cn(
						"relative z-20 overflow-hidden rounded-[28px] shadow-2xl",
						isLight ? "shadow-zinc-400/35" : "shadow-black/45"
					)}
					style={{ background: "#1a1f2e" }}
				>
					<div
						className="pointer-events-none absolute inset-3 rounded-[20px] border border-dashed border-white/20"
						aria-hidden
					/>

					{/* Concave pocket notch */}
					<svg
						className="pointer-events-none absolute left-1/2 top-0 z-10 w-[70%] -translate-x-1/2"
						viewBox="0 0 240 26"
						fill="none"
						aria-hidden
					>
						<path
							d="M0 0 H240 C198 0 175 24 120 24 C65 24 42 0 0 0 Z"
							fill="#12161f"
						/>
					</svg>

					<div className="relative flex flex-col items-center px-6 pb-7 pt-11">
						<p className="text-2xl font-bold tracking-tight text-white sm:text-[1.75rem]">
							{showBalance ? formatted : "******"}
						</p>
						<p className="mt-1 text-sm text-zinc-400">Total Balance</p>

						<button
							type="button"
							onClick={() => setShowBalance((v) => !v)}
							className={cn(
								"mt-5 flex h-9 w-9 items-center justify-center rounded-full transition-colors",
								showBalance
									? "text-emerald-400 hover:bg-white/5"
									: "text-zinc-500 hover:bg-white/5"
							)}
							aria-label={showBalance ? "Hide balance" : "Show balance"}
						>
							{showBalance ? (
								<Eye className="h-5 w-5" />
							) : (
								<EyeOff className="h-5 w-5" />
							)}
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}
