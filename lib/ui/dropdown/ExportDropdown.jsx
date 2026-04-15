import React, { useState, useRef, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";

/**
 * Export trigger + menu (CSV / PDF / JSON). Pass handlers; each runs then closes the menu.
 */
export default function ExportDropdown({
	onExportCsv,
	onExportPdf,
	onExportJson,
}) {
	const { colors } = useTheme();
	const [open, setOpen] = useState(false);
	const ref = useRef(null);

	useEffect(() => {
		const close = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", close);
		return () => document.removeEventListener("mousedown", close);
	}, []);

	const run = (fn) => {
		fn?.();
		setOpen(false);
	};

	return (
		<div className="relative" ref={ref}>
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className={`border ${colors.border} ${colors.hoverSecondary} ${colors.foreground} rounded-xl px-4 py-2 transition-all duration-200 text-sm font-medium flex items-center gap-2`}
				aria-expanded={open}
				aria-haspopup="menu"
			>
				<Download size={16} />
				Export
				<ChevronDown
					className={`w-4 h-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</button>
			{open && (
				<div
					role="menu"
					className={`absolute right-0 top-full mt-1 z-30 min-w-[11rem] rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} py-1`}
				>
					<button
						type="button"
						role="menuitem"
						onClick={() => run(onExportCsv)}
						className={`w-full text-left px-3 py-2 text-sm font-medium flex items-center gap-2 ${colors.hoverSecondary} ${colors.foreground}`}
					>
						<Download size={16} />
						Export CSV
					</button>
					<button
						type="button"
						role="menuitem"
						onClick={() => run(onExportPdf)}
						className={`w-full text-left px-3 py-2 text-sm font-medium flex items-center gap-2 ${colors.hoverSecondary} ${colors.foreground}`}
					>
						<Download size={16} />
						Export PDF
					</button>
					<button
						type="button"
						role="menuitem"
						onClick={() => run(onExportJson)}
						className={`w-full text-left px-3 py-2 text-sm font-medium flex items-center gap-2 ${colors.hoverSecondary} ${colors.foreground}`}
					>
						<Download size={16} />
						Export JSON
					</button>
				</div>
			)}
		</div>
	);
}
