import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const Pagination = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const totalPages = 4;

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="flex md:justify-end sm:justify-start items-center my-4 gap-1">
			<Button
				variant="ghost"
				size="icon"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
				aria-label="Previous page"
			>
				<ChevronLeft size={16} />
			</Button>
			{Array.from({ length: totalPages }, (_, index) => (
				<Button
					key={index + 1}
					variant={currentPage === index + 1 ? "default" : "outline"}
					size="sm"
					className="min-w-9"
					onClick={() => onPageChange(index + 1)}
				>
					{index + 1}
				</Button>
			))}
			<Button
				variant="ghost"
				size="icon"
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				aria-label="Next page"
			>
				<ChevronRight size={16} />
			</Button>
		</div>
	);
};

export default Pagination;
