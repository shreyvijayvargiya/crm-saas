import React from "react";
import { CalendarRange } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";

const PRESETS = [
	{ id: "7d", label: "7 days" },
	{ id: "30d", label: "30 days" },
	{ id: "90d", label: "90 days" },
	{ id: "qtd", label: "Quarter" },
	{ id: "ytd", label: "Year to date" },
];

const DateRangeFilter = ({ value, onChange, showCustom, onToggleCustom, customFrom, customTo, onCustomChange }) => {
	const { colors, scheme } = useTheme();

	return (
		<div
			className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl`}
		>
			<div className="flex items-center gap-2 text-sm font-medium">
				<CalendarRange className={`w-4 h-4 ${colors.textMuted}`} />
				<span className={colors.foreground}>Reporting period</span>
			</div>
			<div className="flex flex-wrap items-center gap-1">
				{PRESETS.map((p) => (
					<button
						key={p.id}
						type="button"
						onClick={() => {
							onChange(p.id);
							onToggleCustom(false);
						}}
						className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
							value === p.id && !showCustom
								? `${scheme.primary} ${scheme.primaryForeground}`
								: `${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary} border ${colors.border}`
						}`}
					>
						{p.label}
					</button>
				))}
				<button
					type="button"
					onClick={() => onToggleCustom(!showCustom)}
					className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
						showCustom
							? `${scheme.primary} ${scheme.primaryForeground}`
							: `${colors.border} ${colors.foreground} ${colors.hoverSecondary}`
					}`}
				>
					Custom
				</button>
			</div>
			{showCustom && (
				<div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
					<label className={`text-xs ${colors.mutedForeground}`}>From</label>
					<input
						type="date"
						value={customFrom}
						onChange={(e) => onCustomChange("from", e.target.value)}
						className={`rounded-xl border ${colors.border} ${colors.background} ${colors.foreground} px-2 py-1.5 text-xs`}
					/>
					<label className={`text-xs ${colors.mutedForeground}`}>To</label>
					<input
						type="date"
						value={customTo}
						onChange={(e) => onCustomChange("to", e.target.value)}
						className={`rounded-xl border ${colors.border} ${colors.background} ${colors.foreground} px-2 py-1.5 text-xs`}
					/>
				</div>
			)}
		</div>
	);
};

export default DateRangeFilter;
