import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Pagination = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(4);

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="flex md:justify-end sm:justify-start xs:justify-start xxs:justify-start items-center my-4">
			<button
				className={`mx-2 p-2 ${colors.foreground} rounded transition-colors ${
					currentPage === 1
						? `${colors.textMuted} cursor-not-allowed opacity-50`
						: `${colors.hoverSecondary} ${getFocusRingClass(colorScheme)}`
				}`}
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				<ChevronLeft className="inline" size={16} />
			</button>
			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index + 1}
					className={`mx-1 px-3 py-1 rounded transition-colors ${getFocusRingClass(
						colorScheme
					)} ${
						currentPage === index + 1
							? `${scheme.primary} ${scheme.primaryForeground}`
							: `border ${colors.border} ${colors.foreground} ${colors.hoverSecondary}`
					}`}
					onClick={() => onPageChange(index + 1)}
				>
					{index + 1}
				</button>
			))}
			<button
				className={`mx-2 p-2 ${colors.foreground} rounded transition-colors ${
					currentPage === totalPages
						? `${colors.textMuted} cursor-not-allowed opacity-50`
						: `${colors.hoverSecondary} ${getFocusRingClass(colorScheme)}`
				}`}
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				<ChevronRight className="inline" size={16} />
			</button>
		</div>
	);
};

export default Pagination;
