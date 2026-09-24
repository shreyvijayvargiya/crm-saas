import React, { useMemo } from "react";
import Link from "next/link";
import {
	CalendarClock,
	CircleAlert,
	IndianRupee,
	Users,
	MessageCircle,
	Stethoscope,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useClinicData } from "../../utils/ClinicDataContext";
import {
	CLINIC_META,
	appointmentStatusClass,
	inr,
} from "./clinicSeedData";
import { ClinicPageHeader } from "./clinicUi";

export default function ClinicDashboard() {
	const { colors } = useTheme();
	const { appointments, patients, payments, followUps, doctors } = useClinicData();

	const today = "2026-09-24";
	const todayAppts = appointments.filter((a) => a.date === today);
	const waiting = todayAppts.filter((a) => a.status === "Waiting" || a.status === "Confirmed")
		.length;
	const noShows = todayAppts.filter((a) => a.status === "No-show").length;
	const noShowRate = todayAppts.length
		? Math.round((noShows / todayAppts.length) * 100)
		: 0;
	const collected = payments
		.filter((p) => p.status === "Paid")
		.reduce((sum, p) => sum + p.amount, 0);
	const pendingPay = payments.filter((p) => p.status === "Pending").length;
	const dueFollow = followUps.filter((f) => f.status === "Scheduled").length;

	const kpis = [
		{
			label: "Today’s appointments",
			value: todayAppts.length,
			icon: CalendarClock,
			hint: `${waiting} in queue / waiting`,
		},
		{
			label: "No-show rate (today)",
			value: `${noShowRate}%`,
			icon: CircleAlert,
			hint: `${noShows} missed of ${todayAppts.length}`,
		},
		{
			label: "UPI collected",
			value: inr(collected),
			icon: IndianRupee,
			hint: `${pendingPay} pending UPI`,
		},
		{
			label: "Patients on file",
			value: patients.length,
			icon: Users,
			hint: `${dueFollow} follow-ups queued`,
		},
	];

	const upcoming = useMemo(
		() =>
			todayAppts
				.slice()
				.sort((a, b) => a.slot.localeCompare(b.slot)),
		[todayAppts]
	);

	return (
		<div className="p-4 sm:p-6">
			<ClinicPageHeader
				title={`${CLINIC_META.name} — today`}
				description={`${CLINIC_META.city}. Front desk essentials: queue, booking, UPI, Rx, WhatsApp reminders. No heavy EMR.`}
				action={
					<Link href="/queue" passHref>
						<Button asChild>
							<a>Open live queue</a>
						</Button>
					</Link>
				}
			/>

			<div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{kpis.map((kpi) => {
					const Icon = kpi.icon;
					return (
						<Card key={kpi.label}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
								<Icon className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<p className={cn("text-2xl font-semibold", colors.foreground)}>
									{kpi.value}
								</p>
								<p className="mt-1 text-xs text-muted-foreground">{kpi.hint}</p>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="text-base">Today’s board</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{upcoming.map((a) => {
							const patient = patients.find((p) => p.id === a.patientId);
							const doctor = doctors.find((d) => d.id === a.doctorId);
							return (
								<div
									key={a.id}
									className="flex flex-wrap items-center justify-between gap-2 rounded-xl border px-3 py-2.5"
								>
									<div>
										<p className="text-sm font-medium">
											{a.slot} · {patient?.name}
										</p>
										<p className="text-xs text-muted-foreground">
											{doctor?.name} · {a.reason} · Token {a.token}
										</p>
									</div>
									<Badge variant="outline" className={appointmentStatusClass(a.status)}>
										{a.status}
									</Badge>
								</div>
							);
						})}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base">Doctors on floor</CardTitle>
					</CardHeader>
					<CardContent className="space-y-3">
						{doctors.map((d) => (
							<div key={d.id} className="flex items-start gap-3">
								<div className="mt-0.5 rounded-lg border p-2">
									<Stethoscope className="h-4 w-4" />
								</div>
								<div>
									<p className="text-sm font-medium">{d.name}</p>
									<p className="text-xs text-muted-foreground">
										{d.specialty} · Room {d.room}
									</p>
								</div>
							</div>
						))}
						<div className="flex items-center gap-2 rounded-lg border border-dashed p-3 text-xs text-muted-foreground">
							<MessageCircle className="h-4 w-4 shrink-0" />
							Queue position toasts simulate WhatsApp — no real API.
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
