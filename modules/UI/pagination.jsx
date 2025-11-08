import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Pagination = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(4);

	const onPageChange = (page) => {
		setCurrentPage(page);
	};

	return (
		<div className="flex md:justify-end sm:justify-start xs:justify-start xxs:justify-start items-center my-4">
			<button
				className="mx-2 p-2 text-zinc-800 rounded"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}
			>
				<ChevronLeft className="inline" size={16} />
			</button>
			{Array.from({ length: totalPages }, (_, index) => (
				<button
					key={index + 1}
					className={`mx-1 px-3 py-1 rounded ${
						currentPage === index + 1
							? "bg-zinc-100 text-zinc-800"
							: "border border-zinc-50 text-zinc-800"
					}`}
					onClick={() => onPageChange(index + 1)}
				>
					{index + 1}
				</button>
			))}
			<button
				className="mx-2 p-2 text-zinc-800 rounded"
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
			>
				<ChevronRight className="inline" size={16} />
			</button>
		</div>
	);
};

export default Pagination;
