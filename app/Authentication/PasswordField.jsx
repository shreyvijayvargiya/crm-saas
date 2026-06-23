import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
	const { colors } = useTheme();
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
				<Input
					id={id}
					name={name}
					type={show ? "text" : "password"}
					value={value}
					onChange={onChange}
					autoComplete={autoComplete}
					placeholder={placeholder}
					aria-invalid={hasError}
					aria-describedby={hint ? `${id}-hint` : undefined}
					className={cn(
						"pr-10",
						hasError && "border-red-500/80 focus-visible:ring-red-500/30"
					)}
				/>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={() => setShow((s) => !s)}
					className="absolute right-0.5 top-1/2 h-8 w-8 -translate-y-1/2"
					aria-label={show ? "Hide password" : "Show password"}
					tabIndex={-1}
				>
					{show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
				</Button>
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
