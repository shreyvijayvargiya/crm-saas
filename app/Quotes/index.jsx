import React from "react";
import { FileSignature } from "lucide-react";
import { useTheme } from "../../utils/useTheme";

const SAMPLE = [
	{
		id: "Q-1024",
		account: "Northwind Traders",
		amount: "$18,500",
		status: "Sent",
		validThrough: "May 12, 2026",
	},
	{
		id: "Q-1025",
		account: "Contoso Ltd",
		amount: "$42,000",
		status: "Draft",
		validThrough: "—",
	},
	{
		id: "Q-1026",
		account: "Adventure Works",
		amount: "$9,200",
		status: "Accepted",
		validThrough: "Apr 30, 2026",
	},
	{
		id: "Q-1027",
		account: "Fabrikam Inc",
		amount: "$6,150",
		status: "Expired",
		validThrough: "Mar 01, 2026",
	},
];

const Quotes = () => {
	const { colors, scheme } = useTheme();

	return (
		<div className="min-h-screen transition-all duration-100 ease-in pb-10">
			<div className="max-w-7xl px-4 md:px-6 pt-6 md:pt-8 space-y-6">
				<div>
					<h1
						className={`text-2xl font-bold tracking-tight inline-flex items-center gap-2 ${colors.foreground}`}
					>
						<FileSignature className="h-7 w-7 shrink-0" />
						Quotes
					</h1>
					<p className={`text-sm mt-1 ${colors.textSecondary}`}>
						Proposals and price quotes before they become deals or invoices
					</p>
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
				>
					<div className={`px-4 md:px-6 py-3 border-b ${colors.border}`}>
						<p className={`text-sm font-medium ${colors.foreground}`}>Recent quotes</p>
						<p className={`text-xs ${colors.mutedForeground}`}>
							Sample data for demo — connect your API to load live quotes
						</p>
					</div>
					<div className="overflow-x-auto">
						<table className="w-full text-sm text-left min-w-[520px]">
							<thead>
								<tr className={`${colors.mutedBackground} border-b ${colors.border}`}>
									<th className="px-4 py-2.5 font-medium">Quote</th>
									<th className="px-4 py-2.5 font-medium">Account</th>
									<th className="px-4 py-2.5 font-medium">Amount</th>
									<th className="px-4 py-2.5 font-medium">Status</th>
									<th className="px-4 py-2.5 font-medium">Valid through</th>
								</tr>
							</thead>
							<tbody>
								{SAMPLE.map((row) => (
									<tr
										key={row.id}
										className={`border-b ${colors.border} ${colors.hoverSecondary} transition-colors`}
									>
										<td className="px-4 py-2.5 font-mono text-xs">{row.id}</td>
										<td className={`px-4 py-2.5 ${colors.foreground}`}>{row.account}</td>
										<td className="px-4 py-2.5">{row.amount}</td>
										<td className="px-4 py-2.5">
											<span
												className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${scheme.primary} ${scheme.primaryForeground}`}
											>
												{row.status}
											</span>
										</td>
										<td className={`px-4 py-2.5 ${colors.mutedForeground}`}>
											{row.validThrough}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Quotes;
