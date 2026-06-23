import React from "react";
import { useTheme } from "../../../utils/useTheme";
import { getFocusRingClass } from "../../../utils/theme";

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

export function formInputClass(colorScheme, colors) {
	return `w-full px-4 py-2 ${colors.background} border ${colors.border} rounded-xl text-sm ${colors.foreground} focus:outline-none focus:ring-2 ${getFocusRingClass(colorScheme)} focus:border-transparent placeholder:opacity-60`;
}

export { default as FormModal } from "./FormModal";
