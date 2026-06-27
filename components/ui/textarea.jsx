import * as React from "react";
import { cn } from "@/lib/utils";
import { focusRing, inputBase } from "@/lib/themeTokens";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
	return (
		<textarea
			className={cn(
				"flex min-h-[80px] w-full px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
				inputBase,
				focusRing,
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Textarea.displayName = "Textarea";

export { Textarea };
