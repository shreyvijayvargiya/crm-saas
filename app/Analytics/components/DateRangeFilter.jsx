import React from "react";
import { CalendarRange } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-picker";

const PRESETS = [
	{ id: "7d", label: "7 days" },
	{ id: "30d", label: "30 days" },
	{ id: "90d", label: "90 days" },
	{ id: "qtd", label: "Quarter" },
	{ id: "ytd", label: "Year to date" },
];

const DateRangeFilter = ({ value, onChange, showCustom, onToggleCustom, customFrom, customTo, onCustomChange }) => {
	const { colors } = useTheme();

	return (
		<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl">
			<div className="flex items-center gap-2 text-sm font-medium">
				<CalendarRange className={`w-4 h-4 ${colors.textMuted}`} />
				<span className={colors.foreground}>Reporting period</span>
			</div>
			<div className="flex flex-wrap items-center gap-1">
				{PRESETS.map((p) => (
					<Button
						key={p.id}
						type="button"
						size="sm"
						variant={value === p.id && !showCustom ? "default" : "outline"}
						onClick={() => {
							onChange(p.id);
							onToggleCustom(false);
						}}
					>
						{p.label}
					</Button>
				))}
				<Button
					type="button"
					size="sm"
					variant={showCustom ? "default" : "outline"}
					onClick={() => onToggleCustom(!showCustom)}
				>
					Custom
				</Button>
			</div>
			{showCustom && (
				<DateRangePicker
					from={customFrom}
					to={customTo}
					onFromChange={(val) => onCustomChange("from", val)}
					onToChange={(val) => onCustomChange("to", val)}
				/>
			)}
		</div>
	);
};

export default DateRangeFilter;
