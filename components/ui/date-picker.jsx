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
	const [internalValue, setInternalValue] = React.useState(value ?? "");
	const [month, setMonth] = React.useState(() => parseDateValue(value) ?? new Date());

	React.useEffect(() => {
		setInternalValue(value ?? "");
		const parsed = parseDateValue(value);
		if (parsed) setMonth(parsed);
	}, [value]);

	const selected = parseDateValue(internalValue);

	const handleSelect = (date) => {
		const next = date ? toDateString(date) : "";
		setInternalValue(next);
		onChange?.(next);
		if (date) setMonth(date);
		setOpen(false);
	};

	const label = selected ? format(selected, "PPP") : placeholder;

	const triggerButton = (
		<Button
			id={id}
			type="button"
			variant="outline"
			name={name}
			disabled={disabled}
			required={required}
			onBlur={onBlur}
			data-empty={!selected}
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
		return triggerButton;
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
			<PopoverContent
				className="w-auto p-0"
				align={align}
				onOpenAutoFocus={(e) => e.preventDefault()}
				onCloseAutoFocus={(e) => e.preventDefault()}
			>
				<Calendar
					mode="single"
					selected={selected}
					onSelect={handleSelect}
					month={month}
					onMonthChange={setMonth}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
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
