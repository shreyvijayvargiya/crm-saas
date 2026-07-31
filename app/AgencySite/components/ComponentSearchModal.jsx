import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchComponents } from "../componentryCatalog";
import { useAgencyTheme } from "../AgencyThemeContext";

/**
 * Cmd/Ctrl+K component search — picks a catalog id via `/?c=id` (shallow).
 */
export default function ComponentSearchModal({ open, onOpenChange }) {
	const router = useRouter();
	const { isLight } = useAgencyTheme();
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);
	const inputRef = useRef(null);

	const results = useMemo(() => searchComponents(query), [query]);

	useEffect(() => {
		if (!open) return undefined;
		setQuery("");
		setActive(0);
		const id = requestAnimationFrame(() => inputRef.current?.focus());
		return () => cancelAnimationFrame(id);
	}, [open]);

	useEffect(() => {
		const onKey = (e) => {
			const meta = e.metaKey || e.ctrlKey;
			if (meta && e.key.toLowerCase() === "k") {
				e.preventDefault();
				onOpenChange(!open);
			}
			if (e.key === "Escape" && open) {
				e.preventDefault();
				onOpenChange(false);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onOpenChange]);

	const select = useCallback(
		(item) => {
			if (!item) return;
			onOpenChange(false);
			router.push(`/?c=${item.id}`, undefined, { shallow: true });
		},
		[onOpenChange, router]
	);

	const onKeyDown = (e) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActive((i) => Math.max(i - 1, 0));
		} else if (e.key === "Enter") {
			e.preventDefault();
			select(results[active]);
		}
	};

	useEffect(() => {
		setActive(0);
	}, [query]);

	return (
		<AnimatePresence>
			{open ? (
				<motion.div
					className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.15 }}
				>
					<button
						type="button"
						className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
						aria-label="Close search"
						onClick={() => onOpenChange(false)}
					/>
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-label="Search components"
						initial={{ opacity: 0, y: 10, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 8, scale: 0.98 }}
						transition={{ duration: 0.18 }}
						className={cn(
							"relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl",
							isLight
								? "border-zinc-200 bg-white"
								: "border-zinc-700 bg-zinc-950"
						)}
					>
						<div
							className={cn(
								"flex items-center gap-3 border-b px-4 py-3",
								isLight ? "border-zinc-100" : "border-zinc-800"
							)}
						>
							<Search
								className={cn(
									"h-4 w-4 shrink-0",
									isLight ? "text-zinc-400" : "text-zinc-500"
								)}
							/>
							<input
								ref={inputRef}
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								onKeyDown={onKeyDown}
								placeholder="Search components…"
								className={cn(
									"w-full bg-transparent text-sm outline-none placeholder:text-zinc-400",
									isLight ? "text-zinc-900" : "text-zinc-100"
								)}
							/>
							<kbd
								className={cn(
									"hidden rounded border px-1.5 py-0.5 text-[10px] font-medium sm:inline",
									isLight
										? "border-zinc-200 text-zinc-400"
										: "border-zinc-700 text-zinc-500"
								)}
							>
								esc
							</kbd>
						</div>

						<ul className="max-h-[50vh] overflow-y-auto p-2">
							{results.length === 0 ? (
								<li
									className={cn(
										"px-3 py-8 text-center text-sm",
										isLight ? "text-zinc-400" : "text-zinc-500"
									)}
								>
									No components match “{query}”
								</li>
							) : (
								results.map((item, i) => (
									<li key={item.id}>
										<button
											type="button"
											onClick={() => select(item)}
											onMouseEnter={() => setActive(i)}
											className={cn(
												"flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition",
												i === active
													? isLight
														? "bg-zinc-100"
														: "bg-zinc-900"
													: "bg-transparent"
											)}
										>
											<div className="min-w-0 flex-1">
												<p
													className={cn(
														"text-sm font-medium",
														isLight ? "text-zinc-900" : "text-white"
													)}
												>
													{item.name}
												</p>
												<p
													className={cn(
														"mt-0.5 line-clamp-1 text-xs",
														isLight ? "text-zinc-500" : "text-zinc-400"
													)}
												>
													{item.description}
												</p>
											</div>
											{i === active && (
												<span
													className={cn(
														"mt-1 flex shrink-0 items-center gap-1 text-[10px]",
														isLight ? "text-zinc-400" : "text-zinc-500"
													)}
												>
													<CornerDownLeft className="h-3 w-3" />
													Open
												</span>
											)}
										</button>
									</li>
								))
							)}
						</ul>

						<div
							className={cn(
								"flex items-center justify-between border-t px-4 py-2 text-[10px]",
								isLight
									? "border-zinc-100 text-zinc-400"
									: "border-zinc-800 text-zinc-500"
							)}
						>
							<span>{results.length} components</span>
							<span>⌘K to toggle · ↑↓ · Enter</span>
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
}
