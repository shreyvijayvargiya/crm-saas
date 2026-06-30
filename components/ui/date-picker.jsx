import * as React from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMounted } from "@/lib/useIsMounted";
import { focusRingInteractive, inputBase } from "@/lib/themeTokens";
import {
	formatDateDisplay,
	parseDateValue,
	toDateString,
} from "@/lib/datePickerUtils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const popoverMotion = {
	initial: { opacity: 0, y: -6, scale: 0.98 },
	animate: { opacity: 1, y: 0, scale: 1 },
	transition: { duration: 0.16, ease: [0.22, 1, 0.36, 1] },
};

function DatePickerTrigger({
	id,
	name,
	disabled,
	required,
	onBlur,
	selected,
	placeholder,
	className,
}) {
	return (
		<button
			id={id}
			type="button"
			name={name}
			disabled={disabled}
			required={required}
			onBlur={onBlur}
			data-empty={!selected}
			className={cn(
				"flex h-ui w-full min-w-[9.5rem] items-center justify-between gap-2 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
				inputBase,
				focusRingInteractive,
				"data-[empty=true]:text-muted-foreground",
				className
			)}
		>
			<span className="truncate">
				{selected ? formatDateDisplay(selected) : placeholder}
			</span>
			<CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
		</button>
	);
}

export function DatePicker({
	id,
	value,
	onChange,
	placeholder = "dd/mm/yyyy",
	className,
	disabled,
	required,
	align = "start",
	onBlur,
	name,
}) {
	const mounted = useIsMounted();
	const [open, setOpen] = React.useState(false);
	const selected = parseDateValue(value);

	const handleSelect = (date) => {
		onChange?.(date ? toDateString(date) : "");
		setOpen(false);
	};

	const trigger = (
		<DatePickerTrigger
			id={id}
			name={name}
			disabled={disabled}
			required={required}
			onBlur={onBlur}
			selected={selected}
			placeholder={placeholder}
			className={className}
		/>
	);

	// SSR + hydration: render trigger only (no Radix portal / calendar markup).
	if (!mounted) {
		return trigger;
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{trigger}</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align={align}>
				{open ? (
					<motion.div {...popoverMotion}>
						<Calendar
							mode="single"
							selected={selected}
							onSelect={handleSelect}
							defaultMonth={selected}
							initialFocus
						/>
						<div className="flex items-center justify-between border-t px-3 py-2">
							<Button
								type="button"
								variant="link"
								size="sm"
								className="h-auto px-0 text-primary"
								onClick={() => handleSelect(undefined)}
							>
								Clear
							</Button>
							<Button
								type="button"
								variant="link"
								size="sm"
								className="h-auto px-0 text-primary"
								onClick={() => handleSelect(new Date())}
							>
								Today
							</Button>
						</div>
					</motion.div>
				) : null}
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
				className="h-8 min-w-[8.5rem] text-xs"
			/>
			<span className="text-xs text-muted-foreground">to</span>
			<DatePicker
				id={toId}
				value={to}
				onChange={onToChange}
				disabled={disabled}
				className="h-8 min-w-[8.5rem] text-xs"
			/>
		</div>
	);
}
