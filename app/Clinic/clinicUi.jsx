import React from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "../../utils/useTheme";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ClinicPageHeader({ title, description, action }) {
	const { colors } = useTheme();
	return (
		<div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
			<div>
				<h1 className={cn("text-2xl font-semibold tracking-tight", colors.foreground)}>
					{title}
				</h1>
				{description ? (
					<p className={cn("mt-1 max-w-2xl text-sm", colors.mutedForeground)}>
						{description}
					</p>
				) : null}
			</div>
			{action ? <div className="shrink-0">{action}</div> : null}
		</div>
	);
}

export function StatusBadge({ status, className }) {
	return (
		<Badge variant="outline" className={cn("font-medium", className)}>
			{status}
		</Badge>
	);
}

export function ToolbarSearch({ value, onChange, placeholder, children }) {
	return (
		<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
			<input
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm sm:max-w-xs"
			/>
			{children}
		</div>
	);
}

export { Button };
