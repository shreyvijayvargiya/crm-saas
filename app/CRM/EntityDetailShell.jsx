import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";


/**
 * Shared layout shell for entity detail pages (deals, companies, invoices, projects).
 */
const EntityDetailShell = ({
	backHref,
	backLabel,
	sidebar,
	children,
	wide = false,
}) => {
	return (
		<div className="p-4 sm:p-6 max-w-7xl mx-auto transition-colors min-h-screen">
			<div className="flex flex-wrap items-center gap-3 mb-6">
				<Button variant="ghost" size="sm" className="gap-1.5"  asChild>
					<Link href={backHref}>
						<a className={`flex items-center gap-1.5 primary`}>
							<ArrowLeft className="w-4 h-4" />
							{backLabel}
						</a>
					</Link>
				</Button>
			</div>

			<div
				className={`grid grid-cols-1 gap-6 ${
					wide ? "" : "xl:grid-cols-12"
				}`}
			>
				{sidebar && (
					<div className={wide ? "space-y-4" : "xl:col-span-4 space-y-4"}>
						{sidebar}
					</div>
				)}
				<div className={wide ? "space-y-4" : "xl:col-span-8 space-y-4"}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default EntityDetailShell;
