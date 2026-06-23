import React from "react";
import { X, Trash2 } from "lucide-react";
import { useTheme } from "../../../utils/useTheme";

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
	const { colors, scheme } = useTheme();

	if (!open) return null;

	return (
		<div
			className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
			onClick={onClose}
			role="presentation"
		>
			<div
				className={`${colors.card} rounded-xl ${colors.shadow} ${maxWidth} w-full max-h-[90vh] overflow-hidden flex flex-col border ${colors.border}`}
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
					<button
						type="button"
						onClick={onClose}
						className={`p-2 ${colors.hoverSecondary} rounded-xl transition-colors shrink-0`}
						aria-label="Close"
					>
						<X className={`w-5 h-5 ${colors.mutedForeground}`} />
					</button>
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
						className={`flex flex-wrap items-center justify-end gap-2 p-6 border-t ${colors.border} shrink-0`}
					>
						{showDelete && onDelete && (
							<button
								type="button"
								onClick={onDelete}
								className="mr-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white transition-colors"
							>
								<Trash2 className="w-4 h-4" />
								{deleteLabel}
							</button>
						)}
						<button
							type="button"
							onClick={onClose}
							className={`px-4 py-2 rounded-xl text-sm font-medium border ${colors.border} ${colors.foreground} ${colors.hoverSecondary} transition-colors`}
						>
							{cancelLabel}
						</button>
						<button
							type="submit"
							className={`px-4 py-2 rounded-xl text-sm font-medium ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover} transition-colors`}
						>
							{saveLabel}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FormModal;
