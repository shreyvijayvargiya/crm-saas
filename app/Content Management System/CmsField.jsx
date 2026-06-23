import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function CmsField({ label, htmlFor, required, hint, children, className }) {
	return (
		<div className={cn("space-y-2", className)}>
			{label && (
				<Label htmlFor={htmlFor} className="text-sm font-medium text-foreground">
					{label}
					{required && <span className="text-destructive"> *</span>}
				</Label>
			)}
			{children}
			{hint && <p className="text-xs text-muted-foreground">{hint}</p>}
		</div>
	);
}

export function CmsMetaRow({ label, value, className }) {
	return (
		<div className={cn("space-y-1", className)}>
			<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
				{label}
			</p>
			<div className="text-sm text-foreground">{value}</div>
		</div>
	);
}
