import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const PasswordField = ({
	label,
	name,
	value,
	onChange,
	autoComplete = "current-password",
	placeholder = "••••••••",
	error,
	hint,
}) => {
	const { colors, colorScheme } = useTheme();
	const id = `auth-pw-${name || "password"}`;
	const [show, setShow] = useState(false);
	const hasError = Boolean(error);

	return (
		<div className="space-y-1.5">
			<label
				htmlFor={id}
				className={`text-xs font-medium ${colors.textSecondary}`}
			>
				{label}
			</label>
			<div className="relative">
				<input
					id={id}
					name={name}
					type={show ? "text" : "password"}
					value={value}
					onChange={onChange}
					autoComplete={autoComplete}
					placeholder={placeholder}
					aria-invalid={hasError}
					aria-describedby={hint ? `${id}-hint` : undefined}
					className={`w-full rounded-xl border ${colors.border} ${colors.muted} py-2.5 pl-3 pr-10 text-sm ${colors.foreground} placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:placeholder:text-zinc-500 ${getFocusRingClass(colorScheme)} ${
						hasError ? "border-red-500/80 focus:ring-red-500/30" : ""
					}`}
				/>
				<button
					type="button"
					onClick={() => setShow((s) => !s)}
					className={`absolute right-1.5 top-1/2 -translate-y-1/2 rounded-xl p-1.5 ${colors.hoverSecondary} ${colors.mutedForeground}`}
					aria-label={show ? "Hide password" : "Show password"}
					tabIndex={-1}
				>
					{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
				</button>
			</div>
			{error ? (
				<p className="text-xs text-red-600 dark:text-red-400" role="alert">
					{error}
				</p>
			) : null}
			{hint && !error ? (
				<p id={`${id}-hint`} className={`text-[10px] ${colors.mutedForeground}`}>
					{hint}
				</p>
			) : null}
		</div>
	);
};

export default PasswordField;
