import React from "react";
import { useTheme } from "../../../utils/useTheme";
import { cn } from "@/lib/utils";

/**
 * Labeled input/select/textarea for FormModal forms.
 */
export const FormField = ({
	label,
	htmlFor,
	required,
	children,
	hint,
}) => {
	const { colors } = useTheme();
	return (
		<div>
			{label && (
				<label
					htmlFor={htmlFor}
					className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
				>
					{label}
					{required && <span className="text-red-500"> *</span>}
				</label>
			)}
			{children}
			{hint && (
				<p className={`text-xs ${colors.mutedForeground} mt-1.5`}>{hint}</p>
			)}
		</div>
	);
};

/** @deprecated Use `<Input>` from `@/components/ui/input` instead */
export function formInputClass() {
	return cn(
		"flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
	);
}

export { default as FormModal } from "./FormModal";
