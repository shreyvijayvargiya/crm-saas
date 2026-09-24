import React, { useMemo } from "react";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EntityDetailShell from "../CRM/EntityDetailShell";
import { useClinicData } from "../../utils/ClinicDataContext";

export default function ClinicPrescriptionDetail() {
	const router = useRouter();
	const { id } = router.query;
	const { prescriptions, patients, doctors, drugs } = useClinicData();
	const rx = useMemo(() => prescriptions.find((r) => r.id === id), [prescriptions, id]);

	if (!router.isReady) return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;
	if (!rx) return <div className="p-6 text-sm text-muted-foreground">Prescription not found.</div>;

	const patient = patients.find((p) => p.id === rx.patientId);
	const doctor = doctors.find((d) => d.id === rx.doctorId);

	const sidebar = (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Rx {rx.id}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 text-sm">
				<p>{rx.date}</p>
				<p>{patient?.name}</p>
				<p>{doctor?.name}</p>
				<p className="text-muted-foreground">{rx.status}</p>
				<Button
					size="sm"
					variant="secondary"
					onClick={() => toast.success("Print preview skipped — frontend mock")}
				>
					Print
				</Button>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell backHref="/prescriptions" backLabel="Prescriptions" sidebar={sidebar}>
			<Card>
				<CardHeader>
					<CardTitle>Diagnosis</CardTitle>
				</CardHeader>
				<CardContent className="text-sm">{rx.diagnosis}</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Medicines</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					{rx.lines.map((line, i) => {
						const drug = drugs.find((d) => d.id === line.drugId);
						return (
							<div key={`${line.drugId}-${i}`} className="rounded-xl border p-3 text-sm">
								<p className="font-medium">
									{drug?.name} · {drug?.generic}
								</p>
								<p className="text-muted-foreground">
									{drug?.strength} {drug?.form} · {line.dose} · {line.days} days
								</p>
								{line.notes ? <p className="mt-1 text-xs">{line.notes}</p> : null}
							</div>
						);
					})}
				</CardContent>
			</Card>
		</EntityDetailShell>
	);
}
