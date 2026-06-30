import * as React from "react";
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
} from "lucide-react";
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function CalendarDayButton({ className, day, modifiers, ...props }) {
	const ref = React.useRef(null);

	React.useEffect(() => {
		if (modifiers.focused) ref.current?.focus();
	}, [modifiers.focused]);

	return (
		<Button
			ref={ref}
			variant="ghost"
			size="icon"
			data-selected={modifiers.selected}
			className={cn(
				"h-8 w-8 p-0 font-normal aria-selected:opacity-100",
				modifiers.selected &&
					"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
				modifiers.today &&
					!modifiers.selected &&
					"bg-accent text-accent-foreground",
				modifiers.outside && "text-muted-foreground opacity-50",
				className
			)}
			{...props}
		/>
	);
}

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "dropdown",
	...props
}) {
	const defaultClassNames = getDefaultClassNames();

	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			captionLayout={captionLayout}
			className={cn("p-3", className)}
			classNames={{
				root: cn("w-full", defaultClassNames.root),
				months: cn("relative flex flex-col", defaultClassNames.months),
				month: cn("flex w-full flex-col gap-3", defaultClassNames.month),
				month_caption: cn(
					"flex h-9 items-center justify-between gap-2 px-1",
					defaultClassNames.month_caption
				),
				dropdowns: cn(
					"flex flex-1 items-center gap-1 text-sm font-medium",
					defaultClassNames.dropdowns
				),
				dropdown_root: cn(
					"relative inline-flex rounded-md border border-input bg-background",
					defaultClassNames.dropdown_root
				),
				dropdown: cn(
					"absolute inset-0 cursor-pointer opacity-0",
					defaultClassNames.dropdown
				),
				caption_label: cn(
					"hidden",
					defaultClassNames.caption_label
				),
				nav: cn(
					"flex flex-col items-center gap-0.5",
					defaultClassNames.nav
				),
				button_previous: cn(
					buttonVariants({ variant: "ghost", size: "icon" }),
					"h-7 w-7 p-0",
					defaultClassNames.button_previous
				),
				button_next: cn(
					buttonVariants({ variant: "ghost", size: "icon" }),
					"h-7 w-7 p-0",
					defaultClassNames.button_next
				),
				month_grid: cn("w-full border-collapse", defaultClassNames.month_grid),
				weekdays: cn("flex", defaultClassNames.weekdays),
				weekday: cn(
					"w-8 rounded-md text-[0.7rem] font-normal text-muted-foreground",
					defaultClassNames.weekday
				),
				week: cn("mt-1 flex w-full", defaultClassNames.week),
				day: cn(
					"relative flex h-8 w-8 items-center justify-center p-0 text-center text-sm",
					defaultClassNames.day
				),
				outside: cn("text-muted-foreground", defaultClassNames.outside),
				disabled: cn(
					"text-muted-foreground opacity-50",
					defaultClassNames.disabled
				),
				hidden: cn("invisible", defaultClassNames.hidden),
				...classNames,
			}}
			components={{
				Chevron: ({ orientation, className, ...chevronProps }) => {
					if (orientation === "up") {
						return (
							<ChevronUp className={cn("h-4 w-4", className)} {...chevronProps} />
						);
					}
					if (orientation === "down") {
						return (
							<ChevronDown
								className={cn("h-4 w-4", className)}
								{...chevronProps}
							/>
						);
					}
					if (orientation === "left") {
						return (
							<ChevronLeft
								className={cn("h-4 w-4", className)}
								{...chevronProps}
							/>
						);
					}
					return (
						<ChevronRight
							className={cn("h-4 w-4", className)}
							{...chevronProps}
						/>
					);
				},
				DayButton: CalendarDayButton,
			}}
			{...props}
		/>
	);
}

export { Calendar, CalendarDayButton };
