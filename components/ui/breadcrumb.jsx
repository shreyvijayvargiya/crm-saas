import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Breadcrumb = ({ className, ...props }) => (
	<nav aria-label="Breadcrumb" className={cn("", className)} {...props} />
);

const BreadcrumbList = ({ className, ...props }) => (
	<ol
		className={cn(
			"flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground",
			className
		)}
		{...props}
	/>
);

const BreadcrumbItem = ({ className, ...props }) => (
	<li className={cn("inline-flex items-center gap-1.5", className)} {...props} />
);

const BreadcrumbLink = ({ className, ...props }) => (
	<a
		className={cn("transition-colors hover:text-foreground", className)}
		{...props}
	/>
);

const BreadcrumbPage = ({ className, ...props }) => (
	<span
		role="link"
		aria-disabled="true"
		aria-current="page"
		className={cn("font-normal text-foreground", className)}
		{...props}
	/>
);

const BreadcrumbSeparator = ({ children, className, ...props }) => (
	<li role="presentation" aria-hidden="true" className={cn("[&>svg]:size-3.5", className)} {...props}>
		{children ?? <ChevronRight />}
	</li>
);

export {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbPage,
	BreadcrumbSeparator,
};
