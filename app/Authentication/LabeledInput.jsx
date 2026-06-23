import React from "react";
import { useTheme } from "../../utils/useTheme";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

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
	const { colors } = useTheme();
	const id = `auth-in-${name || "field"}`;
	const hasError = Boolean(error);

	return (
		<div className="space-y-1.5">
			<label htmlFor={id} className={`text-xs font-medium ${colors.textSecondary}`}>
				{label}
			</label>
			<Input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				autoComplete={autoComplete}
				placeholder={placeholder}
				aria-invalid={hasError}
				className={cn(
					hasError && "border-red-500/80 focus-visible:ring-red-500/30"
				)}
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
