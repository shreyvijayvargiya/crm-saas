import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { useCrmData } from "../../utils/CrmDataContext";
import { findById } from "../../utils/crmRecordHelpers";
import EntityDetailShell from "../CRM/EntityDetailShell";
import {
	formatCurrency,
	getInvoiceStatusColor,
} from "../CRM/invoicesSeedData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from "@/components/ui/table";

const InvoiceDetail = () => {
	const router = useRouter();
	const { id } = router.query;
	const { colors } = useTheme();

	const { invoices } = useCrmData();

	const invoice = useMemo(() => {
		if (!id) return null;
		return findById(invoices, id);
	}, [id, invoices]);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Loading…</p>
			</div>
		);
	}

	if (!invoice) {
		return (
			<div className="p-6">
				<p className="text-zinc-500 dark:text-zinc-400">Invoice not found.</p>
			</div>
		);
	}

	const sidebar = (
		<Card className={colors.shadow}>
			<CardContent className="p-6">
			<p className={`text-xs uppercase tracking-wide ${colors.mutedForeground}`}>
				Invoice
			</p>
			<h1 className={`text-xl font-semibold ${colors.foreground} mt-1`}>
				{invoice.invoiceNumber}
			</h1>
			<Badge className={cn("mt-3 border", getInvoiceStatusColor(invoice.status))}>
				{invoice.status}
			</Badge>

			<div className={`mt-6 space-y-3 text-sm  pt-6`}>
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

			<Button
				type="button"
				className="mt-6 w-full gap-2"
				onClick={() =>
					toast.info(`Downloading invoice ${invoice.invoiceNumber}`)
				}
			>
				<Download className="w-4 h-4" />
				Download PDF
			</Button>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell
			backHref="/invoices"
			backLabel="Back to invoices"
			sidebar={sidebar}
		>
			<Card className={colors.shadow}>
				<CardContent className="p-5 sm:p-6 space-y-6">
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
						<Table className="w-full text-sm">
							<TableHeader className={colors.muted}>
								<TableRow>
									<TableHead
										className={`py-3 px-4 text-left font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Item
									</TableHead>
									<TableHead
										className={`py-3 px-4 text-center font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Qty
									</TableHead>
									<TableHead
										className={`py-3 px-4 text-right font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Price
									</TableHead>
									<TableHead
										className={`py-3 px-4 text-right font-semibold ${colors.mutedForeground} border-b ${colors.border}`}
									>
										Total
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{(invoice.items ?? []).map((item, index) => (
									<TableRow
										key={index}
										className={`border-b ${colors.border} ${colors.hover}`}
									>
										<TableCell className={`py-3 px-4 ${colors.foreground}`}>
											{item.name}
										</TableCell>
										<TableCell
											className={`py-3 px-4 text-center ${colors.textSecondary}`}
										>
											{item.quantity}
										</TableCell>
										<TableCell
											className={`py-3 px-4 text-right ${colors.textSecondary}`}
										>
											{formatCurrency(item.price)}
										</TableCell>
										<TableCell
											className={`py-3 px-4 text-right font-semibold ${colors.foreground}`}
										>
											{formatCurrency(item.quantity * item.price)}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
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
				</CardContent>
			</Card>
		</EntityDetailShell>
	);
};

export default InvoiceDetail;
