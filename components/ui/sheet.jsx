import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { overlayBackdrop } from "@/lib/themeTokens";

/**
 * Slide-over panel (sheet). Side: right | left | bottom (drawer).
 */
export function Sheet({ open, onOpenChange, side = "right", title, description, children }) {
	if (!open) return null;

	const sideClasses = {
		right: "inset-y-0 right-0 h-full w-full max-w-md border-l animate-in slide-in-from-right",
		left: "inset-y-0 left-0 h-full w-full max-w-md border-r animate-in slide-in-from-left",
		bottom:
			"inset-x-0 bottom-0 w-full max-h-[85vh] rounded-t-xl border-t animate-in slide-in-from-bottom",
	};

	return (
		<div className="fixed inset-0 z-50">
			<button
				type="button"
				className={cn("absolute inset-0", overlayBackdrop)}
				aria-label="Close panel"
				onClick={() => onOpenChange(false)}
			/>
			<div
				className={cn(
					"fixed z-50 flex flex-col bg-background shadow-xl",
					sideClasses[side] ?? sideClasses.right
				)}
			>
				<div className="flex items-start justify-between gap-4 border-b p-4">
					<div>
						{title ? <h2 className="text-lg font-semibold text-foreground">{title}</h2> : null}
						{description ? (
							<p className="mt-1 text-sm text-muted-foreground leading-base">{description}</p>
						) : null}
					</div>
					<Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
						<X className="h-4 w-4" />
					</Button>
				</div>
				<div className="flex-1 overflow-y-auto p-4">{children}</div>
			</div>
		</div>
	);
}
