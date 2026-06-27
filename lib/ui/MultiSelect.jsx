import React, { useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Multi-select dropdown built on Checkbox + DropdownMenu.
 */
export default function MultiSelect({
	options = [],
	value = [],
	onChange,
	placeholder = "Select items…",
	className,
}) {
	const [open, setOpen] = useState(false);

	const selectedSet = useMemo(() => new Set(value), [value]);

	const toggle = (optionValue) => {
		const next = selectedSet.has(optionValue)
			? value.filter((v) => v !== optionValue)
			: [...value, optionValue];
		onChange?.(next);
	};

	const label =
		value.length === 0
			? placeholder
			: value.length === 1
				? options.find((o) => o.value === value[0])?.label ?? value[0]
				: `${value.length} selected`;

	return (
		<div className={cn("space-y-2", className)}>
			<DropdownMenu open={open} onOpenChange={setOpen}>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="w-full justify-between font-normal">
						<span className="truncate">{label}</span>
						<ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)] p-2">
					{options.map((option) => {
						const checked = selectedSet.has(option.value);
						return (
							<button
								key={option.value}
								type="button"
								className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent"
								onClick={() => toggle(option.value)}
							>
								<Checkbox checked={checked} onCheckedChange={() => toggle(option.value)} />
								<span className="flex-1 text-left">{option.label}</span>
								{checked ? <Check className="h-4 w-4 text-primary" /> : null}
							</button>
						);
					})}
				</DropdownMenuContent>
			</DropdownMenu>
			{value.length > 0 ? (
				<div className="flex flex-wrap gap-1">
					{value.map((v) => (
						<Badge key={v} variant="secondary">
							{options.find((o) => o.value === v)?.label ?? v}
						</Badge>
					))}
				</div>
			) : null}
		</div>
	);
}
