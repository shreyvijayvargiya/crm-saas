import type * as React from "react";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	variant?: string;
	size?: string;
}

export declare const Button: React.ForwardRefExoticComponent<ButtonProps>;
export declare function buttonVariants(
	props?: Record<string, unknown>
): string;
