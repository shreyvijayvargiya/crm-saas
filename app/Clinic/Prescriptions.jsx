import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search, Trash } from "lucide-react";
import { toast } from "sonner";
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
import { ClinicPageHeader } from "./clinicUi";

export default function ClinicPrescriptions() {
	const { prescriptions, setPrescriptions, patients, doctors, drugs } = useClinicData();
	const [q, setQ] = useState("");
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({
		patientId: "",
		doctorId: doctors[0]?.id || "",
		diagnosis: "",
		drugId: drugs[0]?.id || "",
		dose: "1-0-1",
		days: "5",
		notes: "After food",
	});
	const [lines, setLines] = useState([]);

	const rows = useMemo(() => {
		const s = q.trim().toLowerCase();
		return prescriptions.filter((rx) => {
			const p = patients.find((x) => x.id === rx.patientId);
			return `${p?.name} ${rx.diagnosis}`.toLowerCase().includes(s);
		});
	}, [prescriptions, patients, q]);

	const addLine = () => {
		if (!form.drugId) return;
		setLines((prev) => [
			...prev,
			{ drugId: form.drugId, dose: form.dose, days: Number(form.days) || 1, notes: form.notes },
		]);
	};

	const issue = () => {
		if (!form.patientId || !form.diagnosis.trim() || !lines.length) {
			toast.error("Patient, diagnosis, and at least one drug");
			return;
		}
		setPrescriptions((prev) => [
			{
				id: `rx${Date.now()}`,
				patientId: form.patientId,
				doctorId: form.doctorId,
				appointmentId: "",
				date: "2026-09-24",
				diagnosis: form.diagnosis.trim(),
				status: "Issued",
				lines,
			},
			...prev,
		]);
		const patient = patients.find((p) => p.id === form.patientId);
		toast.success(`Prescription issued. WhatsApp copy queued for ${patient?.phone} (mock).`);
		setOpen(false);
		setLines([]);
		setForm((f) => ({ ...f, diagnosis: "" }));
	};

	const drugName = (id) => {
		const d = drugs.find((x) => x.id === id);
		return d ? `${d.name} ${d.strength}` : id;
	};

	return (
		<div className="p-4 sm:p-6">
			<ClinicPageHeader
				title="Prescriptions"
				description="Pick from a local Indian drug catalog. Print/share is a toast — no pharmacy API."
				action={
					<Button onClick={() => setOpen(true)}>
						<Plus className="mr-1.5 h-4 w-4" />
						New Rx
					</Button>
				}
			/>
			<div className="relative mb-4 sm:max-w-xs">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input className="pl-8" placeholder="Search patient or diagnosis…" value={q} onChange={(e) => setQ(e.target.value)} />
			</div>
			<Card>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Date</TableHead>
							<TableHead>Patient</TableHead>
							<TableHead>Diagnosis</TableHead>
							<TableHead>Drugs</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((rx) => {
							const patient = patients.find((p) => p.id === rx.patientId);
							return (
								<TableRow key={rx.id}>
									<TableCell>
										<Link href={`/prescriptions/${rx.id}`}>
											<a className="hover:underline">{rx.date}</a>
										</Link>
									</TableCell>
									<TableCell>{patient?.name}</TableCell>
									<TableCell className="text-sm">{rx.diagnosis}</TableCell>
									<TableCell className="text-xs text-muted-foreground">
										{rx.lines.map((l) => drugName(l.drugId)).join(", ")}
									</TableCell>
									<TableCell>
										<Badge variant="outline">{rx.status}</Badge>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Card>

			<FormModal open={open} onClose={() => setOpen(false)} title="Digital prescription" onSubmit={issue} saveLabel="Issue Rx">
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
						options={doctors.map((d) => ({ value: d.id, label: d.name }))}
					/>
				</FormField>
				<FormField label="Diagnosis">
					<Input value={form.diagnosis} onChange={(e) => setForm((f) => ({ ...f, diagnosis: e.target.value }))} />
				</FormField>
				<div className="rounded-xl border p-3 space-y-2">
					<p className="text-sm font-medium">Drug catalog</p>
					<FormSelect
						value={form.drugId}
						onChange={(e) => setForm((f) => ({ ...f, drugId: e.target.value }))}
						options={drugs.map((d) => ({
							value: d.id,
							label: `${d.name} · ${d.generic} ${d.strength}`,
						}))}
					/>
					<div className="grid grid-cols-2 gap-2">
						<Input placeholder="Dose" value={form.dose} onChange={(e) => setForm((f) => ({ ...f, dose: e.target.value }))} />
						<Input placeholder="Days" value={form.days} onChange={(e) => setForm((f) => ({ ...f, days: e.target.value }))} />
					</div>
					<Input placeholder="Notes" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
					<Button type="button" variant="secondary" size="sm" onClick={addLine}>
						Add line
					</Button>
					<ul className="space-y-1 text-sm">
						{lines.map((l, i) => (
							<li key={`${l.drugId}-${i}`} className="flex items-center justify-between gap-2">
								<span>
									{drugName(l.drugId)} · {l.dose} · {l.days}d
								</span>
								<button
									type="button"
									onClick={() => setLines((prev) => prev.filter((_, idx) => idx !== i))}
									className="text-muted-foreground"
								>
									<Trash className="h-3.5 w-3.5" />
								</button>
							</li>
						))}
					</ul>
				</div>
			</FormModal>
		</div>
	);
}
