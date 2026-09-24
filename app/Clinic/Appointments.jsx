import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import { useClinicData } from "../../utils/ClinicDataContext";
import {
	APPOINTMENT_STATUSES,
	appointmentStatusClass,
	inr,
} from "./clinicSeedData";
import { ClinicPageHeader } from "./clinicUi";

export default function ClinicAppointments() {
	const { colors } = useTheme();
	const {
		appointments,
		setAppointments,
		patients,
		doctors,
		payments,
		setPayments,
	} = useClinicData();
	const [q, setQ] = useState("");
	const [status, setStatus] = useState("all");
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({
		patientId: "",
		doctorId: doctors[0]?.id || "",
		date: "2026-09-24",
		slot: "12:00",
		reason: "",
		fee: "600",
		channel: "Online",
		collectUpi: true,
	});

	const rows = useMemo(() => {
		return appointments
			.filter((a) => (status === "all" ? true : a.status === status))
			.filter((a) => {
				const p = patients.find((x) => x.id === a.patientId);
				const d = doctors.find((x) => x.id === a.doctorId);
				const hay = `${p?.name} ${d?.name} ${a.reason} ${a.slot} ${a.token}`.toLowerCase();
				return hay.includes(q.trim().toLowerCase());
			})
			.slice()
			.sort((a, b) => `${b.date}${b.slot}`.localeCompare(`${a.date}${a.slot}`));
	}, [appointments, patients, doctors, q, status]);

	const book = () => {
		if (!form.patientId || !form.reason.trim()) {
			toast.error("Patient and reason are required");
			return;
		}
		const id = `a${Date.now()}`;
		const token = Math.max(0, ...appointments.map((a) => a.token || 0)) + 1;
		const fee = Number(form.fee) || 0;
		const paid = Boolean(form.collectUpi);
		setAppointments((prev) => [
			{
				id,
				patientId: form.patientId,
				doctorId: form.doctorId,
				date: form.date,
				slot: form.slot,
				reason: form.reason.trim(),
				status: paid ? "Confirmed" : "Booked",
				token,
				fee,
				paid,
				upiRef: paid ? `UPI${Date.now().toString().slice(-8)}` : "",
				channel: form.channel,
			},
			...prev,
		]);
		if (paid) {
			setPayments((prev) => [
				{
					id: `pay${Date.now()}`,
					appointmentId: id,
					patientId: form.patientId,
					amount: fee,
					method: "UPI",
					status: "Paid",
					at: "2026-09-24 12:01",
					upiId: "clinic@okaxis",
				},
				...prev,
			]);
		}
		const patient = patients.find((p) => p.id === form.patientId);
		toast.success(
			paid
				? `Booked token ${token}. Mock UPI paid. WhatsApp sent to ${patient?.phone}.`
				: `Booked token ${token}. Waiting for UPI.`
		);
		setOpen(false);
		setForm((f) => ({ ...f, reason: "" }));
	};

	return (
		<div className="p-4 sm:p-6">
			<ClinicPageHeader
				title="Appointments"
				description="Online + walk-in + WhatsApp bookings. Collect a mock UPI fee at booking."
				action={
					<Button onClick={() => setOpen(true)}>
						<Plus className="mr-1.5 h-4 w-4" />
						Book slot
					</Button>
				}
			/>

			<div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center">
				<div className="relative flex-1 sm:max-w-xs">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						className="pl-8"
						placeholder="Search patient, doctor, token…"
						value={q}
						onChange={(e) => setQ(e.target.value)}
					/>
				</div>
				<FormSelect
					value={status}
					onChange={(e) => setStatus(e.target.value)}
					options={[{ value: "all", label: "All statuses" }].concat(
						APPOINTMENT_STATUSES.map((s) => ({ value: s, label: s }))
					)}
				/>
			</div>

			<Card>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>When</TableHead>
							<TableHead>Patient</TableHead>
							<TableHead>Doctor</TableHead>
							<TableHead>Token</TableHead>
							<TableHead>Fee</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((a) => {
							const patient = patients.find((p) => p.id === a.patientId);
							const doctor = doctors.find((d) => d.id === a.doctorId);
							return (
								<TableRow key={a.id} className="cursor-pointer">
									<TableCell>
										<Link href={`/appointments/${a.id}`}>
											<a className={cn("block hover:underline", colors.foreground)}>
												{a.date} · {a.slot}
											</a>
										</Link>
										<p className="text-xs text-muted-foreground">{a.channel}</p>
									</TableCell>
									<TableCell>{patient?.name}</TableCell>
									<TableCell className="text-sm">{doctor?.name}</TableCell>
									<TableCell className="tabular-nums">{a.token}</TableCell>
									<TableCell>
										{inr(a.fee)}{" "}
										<span className="text-xs text-muted-foreground">
											{a.paid ? "UPI" : "due"}
										</span>
									</TableCell>
									<TableCell>
										<Badge variant="outline" className={appointmentStatusClass(a.status)}>
											{a.status}
										</Badge>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Card>

			<FormModal
				open={open}
				onClose={() => setOpen(false)}
				title="Book appointment"
				onSubmit={book}
				saveLabel="Save booking"
			>
				<FormField label="Patient">
					<FormSelect
						placeholder="Select patient"
						value={form.patientId}
						onChange={(e) => setForm((f) => ({ ...f, patientId: e.target.value }))}
						options={patients.map((p) => ({ value: p.id, label: p.name }))}
					/>
				</FormField>
				<FormField label="Doctor">
					<FormSelect
						value={form.doctorId}
						onChange={(e) => setForm((f) => ({ ...f, doctorId: e.target.value }))}
						options={doctors.map((d) => ({
							value: d.id,
							label: `${d.name} · ${d.specialty}`,
						}))}
					/>
				</FormField>
				<FormField label="Date">
					<Input
						type="date"
						value={form.date}
						onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
					/>
				</FormField>
				<FormField label="Slot">
					<Input
						value={form.slot}
						onChange={(e) => setForm((f) => ({ ...f, slot: e.target.value }))}
					/>
				</FormField>
				<FormField label="Reason">
					<Input
						value={form.reason}
						onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
					/>
				</FormField>
				<FormField label="Consult fee (₹)">
					<Input
						value={form.fee}
						onChange={(e) => setForm((f) => ({ ...f, fee: e.target.value }))}
					/>
				</FormField>
				<FormField label="Channel">
					<FormSelect
						value={form.channel}
						onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value }))}
						options={["Online", "Walk-in", "WhatsApp", "Phone"]}
					/>
				</FormField>
				<label className="flex items-center gap-2 text-sm">
					<input
						type="checkbox"
						checked={form.collectUpi}
						onChange={(e) => setForm((f) => ({ ...f, collectUpi: e.target.checked }))}
					/>
					Collect UPI now (mock — no gateway)
				</label>
			</FormModal>
		</div>
	);
}
