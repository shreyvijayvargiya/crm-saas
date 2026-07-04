import * as React from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMounted } from "@/lib/useIsMounted";
import { parseDateValue, toDateString } from "@/lib/datePickerUtils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

function formatDateLabel(date) {
	if (!date) return null;
	try {
		return format(date, "PPP");
	} catch {
		return toDateString(date) || null;
	}
}

export function DatePicker({
	id,
	name,
	value,
	onChange,
	placeholder = "Pick a date",
	className,
	disabled,
	required,
	align = "start",
	onBlur,
}) {
	const mounted = useIsMounted();
	const [open, setOpen] = React.useState(false);
	// Optimistic local selection so the trigger label updates even if the
	// parent is slow to echo `value` back (or is briefly uncontrolled).
	const [selectedDate, setSelectedDate] = React.useState(() =>
		parseDateValue(value)
	);
	const [month, setMonth] = React.useState(
		() => parseDateValue(value) ?? new Date()
	);

	React.useEffect(() => {
		const parsed = parseDateValue(value);
		setSelectedDate(parsed);
		if (parsed) setMonth(parsed);
	}, [value]);

	const handleSelect = (date) => {
		setSelectedDate(date);
		if (date) setMonth(date);
		onChange?.(date ? toDateString(date) : "");
		setOpen(false);
	};

	const handleOpenChange = (nextOpen) => {
		setOpen(nextOpen);
		// Re-sync from controlled value when reopening
		if (nextOpen) {
			const parsed = parseDateValue(value);
			if (parsed) {
				setSelectedDate(parsed);
				setMonth(parsed);
			}
		}
	};

	const label = formatDateLabel(selectedDate) ?? placeholder;
	const storageValue = selectedDate ? toDateString(selectedDate) : "";

	const trigger = (
		<Button
			id={id}
			type="button"
			variant="outline"
			disabled={disabled}
			aria-required={required || undefined}
			onBlur={onBlur}
			data-empty={!selectedDate}
			className={cn(
				"flex w-[212px] justify-between text-left font-normal data-[empty=true]:text-muted-foreground",
				className
			)}
		>
			<span className="truncate">{label}</span>
			<ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
		</Button>
	);

	if (!mounted) {
		return (
			<>
				{name ? (
					<input type="hidden" name={name} value={storageValue} readOnly />
				) : null}
				{trigger}
			</>
		);
	}

	return (
		<>
			{name ? (
				<input type="hidden" name={name} value={storageValue} readOnly />
			) : null}
			<Popover open={open} onOpenChange={handleOpenChange} modal>
				<PopoverTrigger asChild>{trigger}</PopoverTrigger>
				<PopoverContent
					className="w-auto p-0"
					align={align}
					onOpenAutoFocus={(e) => e.preventDefault()}
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={handleSelect}
						month={month}
						onMonthChange={setMonth}
					/>
				</PopoverContent>
			</Popover>
		</>
	);
}

export function DateRangePicker({
	from,
	to,
	onFromChange,
	onToChange,
	fromId,
	toId,
	className,
	disabled,
}) {
	return (
		<div className={cn("flex flex-wrap items-center gap-2", className)}>
			<DatePicker
				id={fromId}
				value={from}
				onChange={onFromChange}
				disabled={disabled}
				placeholder="From"
				className="h-8 min-w-[8.5rem] text-xs"
			/>
			<span className="text-xs text-muted-foreground">to</span>
			<DatePicker
				id={toId}
				value={to}
				onChange={onToChange}
				disabled={disabled}
				placeholder="To"
				className="h-8 min-w-[8.5rem] text-xs"
			/>
		</div>
	);
}
