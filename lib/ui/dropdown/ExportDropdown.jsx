import React from "react";
import { Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Export trigger + menu (CSV / PDF / JSON). Pass handlers; each runs then closes the menu.
 */
export default function ExportDropdown({
	onExportCsv,
	onExportPdf,
	onExportJson,
}) {
	const run = (fn) => fn?.();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button type="button" variant="outline">
					<Download size={16} />
					Export
					<ChevronDown className="w-4 h-4 shrink-0" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-[11rem]">
				<DropdownMenuItem onClick={() => run(onExportCsv)} className="gap-2 font-medium">
					<Download size={16} />
					Export CSV
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => run(onExportPdf)} className="gap-2 font-medium">
					<Download size={16} />
					Export PDF
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => run(onExportJson)} className="gap-2 font-medium">
					<Download size={16} />
					Export JSON
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
