import * as React from "react";
import { cn } from "@/lib/utils";
import { cardSurface } from "@/lib/themeTokens";

const Card = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={cn(cardSurface, className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex flex-col space-y-1.5 p-6", className)}
		{...props}
	/>
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
	<h3
		ref={ref}
		className={cn("text-sm font-medium leading-none tracking-base", className)}
		{...props}
	/>
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
	<p
		ref={ref}
		className={cn("text-xs text-muted-foreground leading-base", className)}
		{...props}
	/>
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn("flex items-center p-6 pt-0", className)}
		{...props}
	/>
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
