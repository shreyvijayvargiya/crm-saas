import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../../utils/useTheme";

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
	const { colors } = useTheme();

	return (
		<div
			className={`p-4 sm:p-6 max-w-7xl mx-auto transition-colors min-h-screen`}
		>
			<div className="flex flex-wrap items-center gap-3 mb-6">
				<Link href={backHref} passHref>
					<a
						className={`inline-flex items-center gap-1.5 text-sm font-medium ${colors.textSecondary} ${colors.hoverSecondary} rounded-xl px-2 py-1`}
					>
						<ArrowLeft className="w-4 h-4" />
						{backLabel}
					</a>
				</Link>
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
