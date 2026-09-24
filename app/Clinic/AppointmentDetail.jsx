import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import EntityDetailShell from "../CRM/EntityDetailShell";
import { useClinicData } from "../../utils/ClinicDataContext";
import { appointmentStatusClass, inr } from "./clinicSeedData";

export default function ClinicAppointmentDetail() {
	const router = useRouter();
	const { id } = router.query;
	const { appointments, setAppointments, patients, doctors } = useClinicData();

	const row = useMemo(
		() => appointments.find((a) => a.id === id),
		[appointments, id]
	);

	if (!router.isReady) return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;
	if (!row) return <div className="p-6 text-sm text-muted-foreground">Appointment not found.</div>;

	const patient = patients.find((p) => p.id === row.patientId);
	const doctor = doctors.find((d) => d.id === row.doctorId);

	const setStatus = (status) => {
		setAppointments((prev) => prev.map((a) => (a.id === row.id ? { ...a, status } : a)));
		toast.success(`Status → ${status}`);
	};

	const sidebar = (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Token {row.token}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-2 text-sm">
				<Badge variant="outline" className={appointmentStatusClass(row.status)}>
					{row.status}
				</Badge>
				<p>{row.date} · {row.slot}</p>
				<p>{inr(row.fee)} · {row.paid ? `UPI ${row.upiRef}` : "Payment due"}</p>
				<p className="text-muted-foreground">{row.channel}</p>
				<div className="flex flex-wrap gap-2 pt-2">
					<Button size="sm" variant="secondary" onClick={() => setStatus("Waiting")}>
						Queue
					</Button>
					<Button size="sm" onClick={() => setStatus("Completed")}>
						Complete
					</Button>
					<Button size="sm" variant="ghost" onClick={() => setStatus("No-show")}>
						No-show
					</Button>
				</div>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell backHref="/appointments" backLabel="Appointments" sidebar={sidebar}>
			<Card>
				<CardHeader>
					<CardTitle>Visit</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2 text-sm">
					<p>
						Patient:{" "}
						<Link href={`/patients/${patient?.id}`}>
							<a className="underline underline-offset-2">{patient?.name}</a>
						</Link>
					</p>
					<p>Doctor: {doctor?.name} ({doctor?.specialty})</p>
					<p>Reason: {row.reason}</p>
					<p className="text-muted-foreground">
						WhatsApp queue copy would go to {patient?.phone}. Demo only.
					</p>
				</CardContent>
			</Card>
		</EntityDetailShell>
	);
}
