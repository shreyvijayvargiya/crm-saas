import React from "react";
import { X, Trash2 } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { overlayBackdrop, panelSurface } from "@/lib/themeTokens";

/**
 * Reusable form modal — overlay, header, scrollable body, footer with cancel / save / delete.
 */
const FormModal = ({
	open,
	onClose,
	title,
	subtitle,
	children,
	onSubmit,
	saveLabel = "Save",
	showDelete = false,
	onDelete,
	deleteLabel = "Delete",
	cancelLabel = "Cancel",
	maxWidth = "max-w-xl",
}) => {
	const { colors } = useTheme();

	if (!open) return null;

	return (
		<div
			className={cn("fixed inset-0 z-50 flex items-center justify-center p-4", overlayBackdrop)}
			onClick={onClose}
			role="presentation"
		>
			<div
				className={cn(panelSurface, maxWidth, "w-full max-h-[90vh] overflow-hidden flex flex-col")}
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-labelledby="form-modal-title"
			>
				<div
					className={`flex items-start justify-between gap-4 p-6 border-b ${colors.border} shrink-0`}
				>
					<div className="min-w-0">
						<h2
							id="form-modal-title"
							className={`text-xl font-semibold ${colors.foreground}`}
						>
							{title}
						</h2>
						{subtitle && (
							<p className={`text-sm ${colors.mutedForeground} mt-1`}>
								{subtitle}
							</p>
						)}
					</div>
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={onClose}
						className="shrink-0"
						aria-label="Close"
					>
						<X className="w-5 h-5" />
					</Button>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSubmit?.(e);
					}}
					className="flex flex-col min-h-0 flex-1"
				>
					<div className="p-6 space-y-4 overflow-y-auto flex-1">{children}</div>

					<div
						className={`flex flex-wrap items-center justify-end gap-2 p-6  shrink-0`}
					>
						{showDelete && onDelete && (
							<Button
								type="button"
								variant="destructive"
								onClick={onDelete}
								className="mr-auto gap-2"
							>
								<Trash2 className="w-4 h-4" />
								{deleteLabel}
							</Button>
						)}
						<Button type="button" variant="outline" onClick={onClose}>
							{cancelLabel}
						</Button>
						<Button type="submit">{saveLabel}</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FormModal;
