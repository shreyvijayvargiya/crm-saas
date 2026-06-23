import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { Download } from "lucide-react";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import EntityDetailShell from "../CRM/EntityDetailShell";
import { getInvoiceRecord } from "../CRM/entityDetailData";
import {
	formatCurrency,
	getInvoiceStatusColor,
} from "../CRM/invoicesSeedData";

const InvoiceDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors, scheme } = useTheme();

	const invoice = useMemo(() => {
		if (!id) return null;
		return getInvoiceRecord(id);
	}, [id]);

	if (!router.isReady || !invoice) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
			</div>
		);
	}

	const sidebar = (
		<div
			className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-6`}
		>
			<p className={`text-xs uppercase tracking-wide ${colors.mutedForeground}`}>
				Invoice
			</p>
			<h1 className={`text-xl font-semibold ${colors.foreground} mt-1`}>
				{invoice.invoiceNumber}
			</h1>
			<span
				className={`mt-3 inline-flex text-xs font-medium px-2.5 py-1 rounded-md border ${getInvoiceStatusColor(
					invoice.status
				)}`}
			>
				{invoice.status}
			</span>

			<div className={`mt-6 space-y-3 text-sm border-t ${colors.border} pt-6`}>
				<div className="flex justify-between gap-4">
					<span className={colors.textSecondary}>Issue date</span>
					<span className={colors.foreground}>{invoice.issueDate}</span>
				</div>
				<div className="flex justify-between gap-4">
					<span className={colors.textSecondary}>Due date</span>
					<span className={colors.foreground}>{invoice.dueDate}</span>
				</div>
				<div className="flex justify-between gap-4">
					<span className={colors.textSecondary}>Total</span>
					<span className={`font-semibold ${colors.foreground}`}>
						{formatCurrency(invoice.amount)}
					</span>
				</div>
			</div>

			<button
				type="button"
				onClick={() =>
					toast.info(`Downloading invoice ${invoice.invoiceNumber}`)
				}
				className={`mt-6 w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-xl ${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground}`}
			>
				<Download className="w-4 h-4" />
				Download PDF
			</button>
		</div>
	);

	return (
		<EntityDetailShell
			backHref="/invoices"
			backLabel="Back to invoices"
			sidebar={sidebar}
		>
			<div
				className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-5 sm:p-6 space-y-6`}
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<h2
							className={`text-sm font-semibold ${colors.textSecondary} mb-2`}
						>
							Bill to
						</h2>
						<div className={`${colors.muted} p-4 rounded-xl`}>
							<p className={`font-medium ${colors.foreground}`}>
								{invoice.client}
							</p>
							<p className={`text-sm ${colors.textSecondary} mt-1`}>
								{invoice.clientEmail}
							</p>
						</div>
					</div>
					{invoice.description && (
						<div>
							<h2
								className={`text-sm font-semibold ${colors.textSecondary} mb-2`}
							>
								Description
							</h2>
							<p
								className={`text-sm ${colors.textSecondary} ${colors.muted} p-4 rounded-xl`}
							>
								{invoice.description}
							</p>
						</div>
					)}
				</div>

				<div>
					<h2
						className={`text-sm font-semibold ${colors.textSecondary} mb-4`}
					>
						Line items
					</h2>
					<div className={`border ${colors.border} rounded-xl overflow-hidden`}>
						<table className="w-full text-sm">
							<thead className={colors.muted}>
								<tr>
									<th
										className={`py-3 px-4 text-left font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Item
									</th>
									<th
										className={`py-3 px-4 text-center font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Qty
									</th>
									<th
										className={`py-3 px-4 text-right font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Price
									</th>
									<th
										className={`py-3 px-4 text-right font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Total
									</th>
								</tr>
							</thead>
							<tbody>
								{invoice.items.map((item, index) => (
									<tr
										key={index}
										className={`border-b ${colors.border} ${colors.hover}`}
									>
										<td className={`py-3 px-4 ${colors.foreground}`}>
											{item.name}
										</td>
										<td
											className={`py-3 px-4 text-center ${colors.textSecondary}`}
										>
											{item.quantity}
										</td>
										<td
											className={`py-3 px-4 text-right ${colors.textSecondary}`}
										>
											{formatCurrency(item.price)}
										</td>
										<td
											className={`py-3 px-4 text-right font-semibold ${colors.foreground}`}
										>
											{formatCurrency(item.quantity * item.price)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				<div className="flex justify-end">
					<div className={`${colors.muted} p-6 rounded-xl w-full md:w-80`}>
						<div className="flex justify-between items-center">
							<span className={`text-lg font-semibold ${colors.foreground}`}>
								Total
							</span>
							<span className={`text-2xl font-bold ${colors.foreground}`}>
								{formatCurrency(invoice.amount)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</EntityDetailShell>
	);
};

export default InvoiceDetail;
