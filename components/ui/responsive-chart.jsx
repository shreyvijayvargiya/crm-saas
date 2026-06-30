import * as React from "react";
import { ResponsiveContainer as RechartsResponsiveContainer } from "recharts";
import { useIsMounted } from "@/lib/useIsMounted";
import { cn } from "@/lib/utils";

/**
 * Recharts measures the DOM on mount — rendering it during SSR causes hydration
 * mismatches. This wrapper renders a same-size placeholder until the client mounts.
 */
export function ResponsiveContainer({ className, children, ...props }) {
	const mounted = useIsMounted();

	const height = props.height ?? props.minHeight ?? "100%";
	const placeholderStyle = {
		width: "100%",
		height: typeof height === "number" ? `${height}px` : height,
		...(props.minHeight != null
			? {
					minHeight:
						typeof props.minHeight === "number"
							? `${props.minHeight}px`
							: props.minHeight,
				}
			: {}),
	};

	if (!mounted) {
		return (
			<div
				className={cn("w-full rounded-md bg-muted/20", className)}
				style={placeholderStyle}
				aria-hidden
			/>
		);
	}

	return (
		<RechartsResponsiveContainer {...props}>
			{children}
		</RechartsResponsiveContainer>
	);
}
