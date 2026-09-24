import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { FormModal } from "../../lib/ui/modal";
import { useClinicData } from "../../utils/ClinicDataContext";
import { inr, paymentStatusClass } from "./clinicSeedData";
import { ClinicPageHeader } from "./clinicUi";

export default function ClinicPayments() {
	const { payments, setPayments, patients } = useClinicData();
	const [qrFor, setQrFor] = useState(null);

	const totals = useMemo(() => {
		const paid = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
		const pending = payments.filter((p) => p.status === "Pending").reduce((s, p) => s + p.amount, 0);
		return { paid, pending };
	}, [payments]);

	const markPaid = (id) => {
		setPayments((prev) =>
			prev.map((p) => (p.id === id ? { ...p, status: "Paid", at: "2026-09-24 12:10" } : p))
		);
		toast.success("UPI marked paid (mock QR scan)");
		setQrFor(null);
	};

	return (
		<div className="p-4 sm:p-6">
			<ClinicPageHeader
				title="UPI payments"
				description={`Collected ${inr(totals.paid)} · pending ${inr(totals.pending)}. QR is a demo — no Razorpay/PhonePe.`}
			/>
			<Card>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>When</TableHead>
							<TableHead>Patient</TableHead>
							<TableHead>UPI ID</TableHead>
							<TableHead>Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead />
						</TableRow>
					</TableHeader>
					<TableBody>
						{payments.map((p) => {
							const patient = patients.find((x) => x.id === p.patientId);
							return (
								<TableRow key={p.id}>
									<TableCell className="text-sm">{p.at}</TableCell>
									<TableCell>{patient?.name}</TableCell>
									<TableCell className="font-mono text-xs">{p.upiId}</TableCell>
									<TableCell>{inr(p.amount)}</TableCell>
									<TableCell>
										<Badge variant="outline" className={paymentStatusClass(p.status)}>
											{p.status}
										</Badge>
									</TableCell>
									<TableCell>
										{p.status !== "Paid" ? (
											<Button size="sm" variant="outline" onClick={() => setQrFor(p)}>
												<QrCode className="mr-1 h-3.5 w-3.5" />
												Show QR
											</Button>
										) : null}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Card>

			<FormModal
				open={Boolean(qrFor)}
				onClose={() => setQrFor(null)}
				title="Collect UPI"
				saveLabel="Mark paid"
				onSubmit={() => qrFor && markPaid(qrFor.id)}
			>
				{qrFor ? (
					<div className="space-y-3 text-center">
						<div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl border border-dashed bg-muted/40">
							<QrCode className="h-24 w-24 text-muted-foreground" />
						</div>
						<p className="text-sm">
							Pay {inr(qrFor.amount)} to <span className="font-mono">carepoint@okaxis</span>
						</p>
						<p className="text-xs text-muted-foreground">
							Frontend placeholder. Wire a payment gateway later.
						</p>
					</div>
				) : null}
			</FormModal>
		</div>
	);
}
