import React from "react";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const LabeledInput = ({
	label,
	type = "text",
	name,
	value,
	onChange,
	autoComplete,
	placeholder,
	error,
}) => {
	const { colors, colorScheme } = useTheme();
	const id = `auth-in-${name || "field"}`;
	const hasError = Boolean(error);

	return (
		<div className="space-y-1.5">
			<label htmlFor={id} className={`text-xs font-medium ${colors.textSecondary}`}>
				{label}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				autoComplete={autoComplete}
				placeholder={placeholder}
				aria-invalid={hasError}
				className={`w-full rounded-xl border ${colors.border} ${colors.muted} px-3 py-2.5 text-sm ${colors.foreground} placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:placeholder:text-zinc-500 ${getFocusRingClass(colorScheme)} ${
					hasError ? "border-red-500/80 focus:ring-red-500/30" : ""
				}`}
			/>
			{error ? (
				<p className="text-xs text-red-600 dark:text-red-400" role="alert">
					{error}
				</p>
			) : null}
		</div>
	);
};

export default LabeledInput;
