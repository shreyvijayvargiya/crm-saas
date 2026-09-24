import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EntityDetailShell from "../CRM/EntityDetailShell";
import { useClinicData } from "../../utils/ClinicDataContext";
import { appointmentStatusClass } from "./clinicSeedData";

export default function ClinicPatientDetail() {
	const router = useRouter();
	const { id } = router.query;
	const { patients, appointments, prescriptions, followUps, doctors } = useClinicData();
	const patient = useMemo(() => patients.find((p) => p.id === id), [patients, id]);

	if (!router.isReady) return <div className="p-6 text-sm text-muted-foreground">Loading…</div>;
	if (!patient) return <div className="p-6 text-sm text-muted-foreground">Patient not found.</div>;

	const visits = appointments.filter((a) => a.patientId === patient.id);
	const rx = prescriptions.filter((r) => r.patientId === patient.id);
	const fu = followUps.filter((f) => f.patientId === patient.id);

	const sidebar = (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">{patient.name}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-1 text-sm">
				<p>{patient.gender} · {patient.age} yrs</p>
				<p className="tabular-nums">{patient.phone}</p>
				<p>{patient.city}</p>
				<p className="text-muted-foreground">Last visit {patient.lastVisit}</p>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell backHref="/patients" backLabel="Patients" sidebar={sidebar}>
			<Card>
				<CardHeader>
					<CardTitle>Notes</CardTitle>
				</CardHeader>
				<CardContent className="text-sm">{patient.notes || "—"}</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Appointments</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					{visits.map((a) => {
						const doctor = doctors.find((d) => d.id === a.doctorId);
						return (
							<div key={a.id} className="flex items-center justify-between gap-2 text-sm">
								<Link href={`/appointments/${a.id}`}>
									<a className="hover:underline">
										{a.date} {a.slot} · {doctor?.name}
									</a>
								</Link>
								<Badge variant="outline" className={appointmentStatusClass(a.status)}>
									{a.status}
								</Badge>
							</div>
						);
					})}
					{!visits.length ? <p className="text-sm text-muted-foreground">None yet</p> : null}
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Prescriptions</CardTitle>
				</CardHeader>
				<CardContent className="space-y-1 text-sm">
					{rx.map((r) => (
						<Link key={r.id} href={`/prescriptions/${r.id}`}>
							<a className="block hover:underline">
								{r.date} · {r.diagnosis}
							</a>
						</Link>
					))}
					{!rx.length ? <p className="text-muted-foreground">No digital Rx yet</p> : null}
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Follow-ups</CardTitle>
				</CardHeader>
				<CardContent className="space-y-1 text-sm text-muted-foreground">
					{fu.map((f) => (
						<p key={f.id}>
							{f.due} · {f.status} · {f.channel}
						</p>
					))}
					{!fu.length ? <p>No reminders</p> : null}
				</CardContent>
			</Card>
		</EntityDetailShell>
	);
}
