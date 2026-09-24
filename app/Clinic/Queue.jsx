import React, { useEffect, useMemo } from "react";
import { MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useClinicData } from "../../utils/ClinicDataContext";
import { appointmentStatusClass } from "./clinicSeedData";
import { ClinicPageHeader } from "./clinicUi";

const COLUMNS = [
	{ id: "Waiting", title: "Waiting", match: ["Waiting", "Confirmed"] },
	{ id: "In consult", title: "With doctor", match: ["In consult"] },
	{ id: "Completed", title: "Done", match: ["Completed"] },
	{ id: "No-show", title: "No-show", match: ["No-show"] },
];

export default function ClinicQueue() {
	const { appointments, setAppointments, patients, doctors } = useClinicData();
	const today = "2026-09-24";

	const todayRows = useMemo(
		() =>
			appointments
				.filter((a) => a.date === today && a.status !== "Cancelled" && a.status !== "Booked")
				.slice()
				.sort((a, b) => a.token - b.token),
		[appointments]
	);

	useEffect(() => {
		const id = setInterval(() => {
			const waiting = todayRows.filter((a) => a.status === "Waiting" || a.status === "Confirmed");
			if (!waiting.length) return;
			const pick = waiting[Math.floor(Math.random() * waiting.length)];
			const patient = patients.find((p) => p.id === pick.patientId);
			const ahead = waiting.filter((a) => a.token < pick.token).length;
			toast.message("WhatsApp (mock)", {
				description: `${patient?.name}: you are token ${pick.token}. ${ahead} patient${
					ahead === 1 ? "" : "s"
				} ahead.`,
				icon: <MessageCircle className="h-4 w-4" />,
			});
		}, 14000);
		return () => clearInterval(id);
	}, [todayRows, patients]);

	const move = (id, status) => {
		setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
		const row = appointments.find((a) => a.id === id);
		const patient = patients.find((p) => p.id === row?.patientId);
		if (status === "Waiting") {
			toast.success(`WhatsApp: ${patient?.name} added to live queue`);
		}
		if (status === "In consult") {
			toast.success(`${patient?.name} called into consult`);
		}
		if (status === "No-show") {
			toast.error(`${patient?.name} marked no-show`);
		}
	};

	return (
		<div className="p-4 sm:p-6">
			<ClinicPageHeader
				title="Live queue"
				description="Token board for today. Position updates toast as WhatsApp — frontend only, nothing is sent."
			/>
			<div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
				{COLUMNS.map((col) => {
					const cards = todayRows.filter((a) => col.match.includes(a.status));
					return (
						<Card key={col.id} className="min-h-[280px]">
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center justify-between text-sm">
									{col.title}
									<Badge variant="secondary">{cards.length}</Badge>
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								{cards.map((a, idx) => {
									const patient = patients.find((p) => p.id === a.patientId);
									const doctor = doctors.find((d) => d.id === a.doctorId);
									return (
										<div key={a.id} className="rounded-xl border p-3">
											<div className="flex items-start justify-between gap-2">
												<div>
													<p className="text-sm font-semibold">
														#{a.token} {patient?.name}
													</p>
													<p className="text-xs text-muted-foreground">
														{a.slot} · {doctor?.name} · {a.reason}
													</p>
													{col.id === "Waiting" ? (
														<p className="mt-1 text-[11px] text-muted-foreground">
															Position {idx + 1} in this column
														</p>
													) : null}
												</div>
												<Badge
													variant="outline"
													className={cn("text-[10px]", appointmentStatusClass(a.status))}
												>
													{a.status}
												</Badge>
											</div>
											<div className="mt-2 flex flex-wrap gap-1">
												{col.id === "Waiting" ? (
													<>
														<Button size="sm" variant="secondary" onClick={() => move(a.id, "In consult")}>
															Call in
														</Button>
														<Button size="sm" variant="ghost" onClick={() => move(a.id, "No-show")}>
															No-show
														</Button>
													</>
												) : null}
												{col.id === "In consult" ? (
													<Button size="sm" onClick={() => move(a.id, "Completed")}>
														Complete
													</Button>
												) : null}
												{col.id === "No-show" ? (
													<Button size="sm" variant="outline" onClick={() => move(a.id, "Waiting")}>
														Re-queue
													</Button>
												) : null}
											</div>
										</div>
									);
								})}
								{!cards.length ? (
									<p className="text-xs text-muted-foreground">Empty</p>
								) : null}
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
