import React from "react";
import Link from "next/link";
import { Mail, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHECKOUT, CONTACT, PRODUCT } from "../agencyConfig";
import { useAgencyTheme } from "../AgencyThemeContext";

function XIcon({ className }) {
	return (
		<svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

export default function AgencyFooter() {
	const { isLight } = useAgencyTheme();

	return (
		<footer className="mt-auto border-t pt-8 pb-4" style={{ borderColor: isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)" }}>
			<div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<Link href="/" passHref>
						<a
							className={cn(
								"inline-flex items-center gap-2 text-sm font-bold tracking-tight",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							<span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600 text-white">
								<Layers className="h-3.5 w-3.5" />
							</span>
							{PRODUCT.name}
						</a>
					</Link>
					<p
						className={cn(
							"mt-3 max-w-sm text-xs leading-relaxed",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						{PRODUCT.description}
					</p>
				</div>

				<div className="flex flex-col gap-3 sm:items-end">
					<div className="flex flex-wrap gap-2">
						<a
							href={`mailto:${CONTACT.email}`}
							className={cn(
								"inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
								isLight
									? "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
									: "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
							)}
						>
							<Mail className="h-3.5 w-3.5" />
							Email
						</a>
						<a
							href={CONTACT.x}
							target="_blank"
							rel="noopener noreferrer"
							className={cn(
								"inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
								isLight
									? "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
									: "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600"
							)}
						>
							<XIcon className="h-3.5 w-3.5" />
							{CONTACT.xHandle}
						</a>
						<a
							href={CHECKOUT.usd}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center rounded-full bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
						>
							Buy {CHECKOUT.priceLabel}
						</a>
					</div>
					<p className={cn("text-[11px]", isLight ? "text-zinc-400" : "text-zinc-600")}>
						© {new Date().getFullYear()} {PRODUCT.name}
					</p>
				</div>
			</div>
		</footer>
	);
}
