import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
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

export default function ClinicPatients() {
	const { patients, setPatients } = useClinicData();
	const [q, setQ] = useState("");
	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({
		name: "",
		phone: "",
		age: "",
		gender: "Female",
		city: "Pune",
		notes: "",
	});

	const rows = useMemo(() => {
		const s = q.trim().toLowerCase();
		if (!s) return patients;
		return patients.filter((p) =>
			`${p.name} ${p.phone} ${p.city}`.toLowerCase().includes(s)
		);
	}, [patients, q]);

	const add = () => {
		if (!form.name.trim() || !form.phone.trim()) {
			toast.error("Name and phone required");
			return;
		}
		setPatients((prev) => [
			{
				id: `p${Date.now()}`,
				name: form.name.trim(),
				phone: form.phone.trim(),
				age: Number(form.age) || 0,
				gender: form.gender,
				city: form.city.trim() || "Pune",
				lastVisit: "—",
				notes: form.notes.trim(),
			},
			...prev,
		]);
		toast.success("Patient added to register (in-memory)");
		setOpen(false);
		setForm({ name: "", phone: "", age: "", gender: "Female", city: "Pune", notes: "" });
	};

	return (
		<div className="p-4 sm:p-6">
			<ClinicPageHeader
				title="Patients"
				description="Lightweight register — phone, city, last visit. Not a full EMR chart."
				action={
					<Button onClick={() => setOpen(true)}>
						<Plus className="mr-1.5 h-4 w-4" />
						Add patient
					</Button>
				}
			/>
			<div className="relative mb-4 sm:max-w-xs">
				<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
				<Input
					className="pl-8"
					placeholder="Search name or phone…"
					value={q}
					onChange={(e) => setQ(e.target.value)}
				/>
			</div>
			<Card>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Age</TableHead>
							<TableHead>City</TableHead>
							<TableHead>Last visit</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((p) => (
							<TableRow key={p.id}>
								<TableCell>
									<Link href={`/patients/${p.id}`}>
										<a className="font-medium hover:underline">{p.name}</a>
									</Link>
									<p className="text-xs text-muted-foreground">{p.gender}</p>
								</TableCell>
								<TableCell className="tabular-nums text-sm">{p.phone}</TableCell>
								<TableCell>{p.age}</TableCell>
								<TableCell className="text-sm">{p.city}</TableCell>
								<TableCell className="text-sm">{p.lastVisit}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Card>

			<FormModal open={open} onClose={() => setOpen(false)} title="New patient" onSubmit={add}>
				<FormField label="Name" required>
					<Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
				</FormField>
				<FormField label="Phone" required>
					<Input value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
				</FormField>
				<FormField label="Age">
					<Input value={form.age} onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))} />
				</FormField>
				<FormField label="Gender">
					<FormSelect
						value={form.gender}
						onChange={(e) => setForm((f) => ({ ...f, gender: e.target.value }))}
						options={["Female", "Male", "Other"]}
					/>
				</FormField>
				<FormField label="City">
					<Input value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
				</FormField>
				<FormField label="Notes">
					<Input value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} />
				</FormField>
			</FormModal>
		</div>
	);
}
