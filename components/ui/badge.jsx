import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { focusRingInteractive } from "@/lib/themeTokens";

const badgeVariants = cva(
	cn(
		"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
		focusRingInteractive
	),
	{
		variants: {
			variant: {
				default:
					"border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
				high: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800/50 dark:bg-rose-950/40 dark:text-rose-200",
				medium:
					"border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800/50 dark:bg-amber-950/40 dark:text-amber-200",
				low: "border-zinc-200 bg-zinc-50 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-300",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

function Badge({ className, variant, ...props }) {
	return (
		<div className={cn(badgeVariants({ variant }), className)} {...props} />
	);
}

export { Badge, badgeVariants };
