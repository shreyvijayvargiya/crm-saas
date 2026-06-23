import React from "react";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

/**
 * Controlled select wrapper — maps native select props to shadcn/Radix Select.
 */
export default function FormSelect({
	id,
	value,
	onChange,
	onValueChange,
	options = [],
	placeholder = "Select…",
	className,
	disabled,
	children,
}) {
	const handleChange = onValueChange ?? ((next) => onChange?.({ target: { value: next } }));

	return (
		<Select
			value={value || undefined}
			onValueChange={handleChange}
			disabled={disabled}
		>
			<SelectTrigger id={id} className={cn(className)}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{children ??
					options.map((option) => {
						const optionValue =
							typeof option === "string" ? option : option.value;
						const label =
							typeof option === "string" ? option : option.label ?? option.value;
						return (
							<SelectItem key={optionValue} value={optionValue}>
								{label}
							</SelectItem>
						);
					})}
			</SelectContent>
		</Select>
	);
}
