import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
	Package,
	Calendar,
	DollarSign,
	User,
	FileText,
	Tag,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import EntityDetailShell from "../CRM/EntityDetailShell";
import { findSaleSeed } from "../CRM/salesSeedData";
import { findInvoiceSeed } from "../CRM/invoicesSeedData";
import {
	formatCurrency,
	getInvoiceStatusColor,
} from "../CRM/invoicesSeedData";

const SaleDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors, scheme } = useTheme();

	const sale = useMemo(() => {
		if (!id) return null;
		return findSaleSeed(id);
	}, [id]);

	const invoice = useMemo(() => {
		if (!sale?.invoiceId) return null;
		return findInvoiceSeed(sale.invoiceId);
	}, [sale]);

	if (!router.isReady || !sale) {
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
			<div className="flex items-center gap-3 mb-4">
				<span
					className={`w-12 h-12 rounded-xl flex items-center justify-center ${scheme.primary} ${scheme.primaryForeground}`}
				>
					<Package className="w-6 h-6" />
				</span>
				<div className="min-w-0">
					<h1 className={`text-xl font-semibold ${colors.foreground}`}>
						{sale.name}
					</h1>
					<p className={`text-sm ${colors.textSecondary} mt-0.5`}>
						{sale.category}
					</p>
				</div>
			</div>

			<ul className={`space-y-3 text-sm border-t ${colors.border} pt-6`}>
				<li className="flex items-center gap-2">
					<DollarSign className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.foreground}>
						{formatCurrency(sale.price)} × {sale.quantity}
					</span>
				</li>
				<li className="flex items-center gap-2">
					<Calendar className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{sale.soldAtLabel}</span>
				</li>
				<li className="flex items-center gap-2">
					<User className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{sale.customer}</span>
				</li>
				<li className="flex items-center gap-2">
					<Tag className={`w-4 h-4 shrink-0 ${colors.textMuted}`} />
					<span className={colors.textSecondary}>{sale.category}</span>
				</li>
			</ul>
		</div>
	);

	return (
		<EntityDetailShell
			backHref="/sales"
			backLabel="Back to sales"
			sidebar={sidebar}
		>
			<div
				className={`rounded-xl border ${colors.border} ${colors.card} ${colors.shadow} p-5 sm:p-6 space-y-6`}
			>
				<div>
					<h2 className={`text-sm font-semibold ${colors.foreground} mb-2`}>
						Description
					</h2>
					<p className={`text-sm ${colors.textSecondary}`}>
						{sale.description}
					</p>
				</div>

				{invoice ? (
					<div>
						<h2
							className={`text-sm font-semibold ${colors.foreground} flex items-center gap-2 mb-4`}
						>
							<FileText className="w-4 h-4" />
							Linked invoice
						</h2>
						<div
							className={`rounded-xl border ${colors.border} p-4 ${colors.muted}`}
						>
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div>
									<Link href={`/invoices/${invoice.id}`} passHref>
										<a
											className={`text-sm font-semibold ${colors.foreground} hover:underline`}
										>
											{invoice.invoiceNumber}
										</a>
									</Link>
									<p className={`text-xs ${colors.textSecondary} mt-1`}>
										{invoice.client} · {invoice.clientEmail}
									</p>
								</div>
								<span
									className={`text-xs font-medium px-2.5 py-1 rounded-md border ${getInvoiceStatusColor(
										invoice.status
									)}`}
								>
									{invoice.status}
								</span>
							</div>
							<div
								className={`mt-4 pt-4 border-t ${colors.border} flex flex-wrap gap-6 text-sm`}
							>
								<div>
									<p className={colors.mutedForeground}>Amount</p>
									<p className={`font-semibold ${colors.foreground}`}>
										{formatCurrency(invoice.amount)}
									</p>
								</div>
								<div>
									<p className={colors.mutedForeground}>Issue date</p>
									<p className={colors.foreground}>{invoice.issueDate}</p>
								</div>
								<div>
									<p className={colors.mutedForeground}>Due date</p>
									<p className={colors.foreground}>{invoice.dueDate}</p>
								</div>
							</div>
							<Link href={`/invoices/${invoice.id}`} passHref>
								<a
									className={`inline-flex mt-4 text-xs font-medium ${colors.foreground} hover:underline`}
								>
									View full invoice →
								</a>
							</Link>
						</div>
					</div>
				) : (
					<p className={`text-sm ${colors.mutedForeground}`}>
						No invoice linked to this sale.
					</p>
				)}
			</div>
		</EntityDetailShell>
	);
};

export default SaleDetail;
