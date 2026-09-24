import React, { useState } from "react";
import { toast } from "sonner";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useClinicData } from "../../utils/ClinicDataContext";
import { ClinicPageHeader } from "./clinicUi";

export default function ClinicFollowUps() {
	const { followUps, setFollowUps, patients } = useClinicData();
	const [filter, setFilter] = useState("all");

	const rows = followUps.filter((f) => (filter === "all" ? true : f.status === filter));

	const send = (id) => {
		setFollowUps((prev) =>
			prev.map((f) => (f.id === id ? { ...f, status: "Sent" } : f))
		);
		const row = followUps.find((f) => f.id === id);
		const patient = patients.find((p) => p.id === row?.patientId);
		toast.success(`WhatsApp reminder marked sent to ${patient?.phone} (mock)`);
	};

	const done = (id) => {
		setFollowUps((prev) =>
			prev.map((f) => (f.id === id ? { ...f, status: "Done" } : f))
		);
	};

	return (
		<div className="p-4 sm:p-6">
			<ClinicPageHeader
				title="Follow-up reminders"
				description="Paper Rx made follow-ups easy to miss. Queue WhatsApp/SMS copy here — delivery is simulated."
			/>
			<div className="mb-4 flex gap-2">
				{["all", "Scheduled", "Sent", "Done"].map((s) => (
					<Button
						key={s}
						size="sm"
						variant={filter === s ? "default" : "outline"}
						onClick={() => setFilter(s)}
					>
						{s === "all" ? "All" : s}
					</Button>
				))}
			</div>
			<div className="space-y-3">
				{rows.map((f) => {
					const patient = patients.find((p) => p.id === f.patientId);
					return (
						<Card key={f.id} className="p-4">
							<div className="flex flex-wrap items-start justify-between gap-3">
								<div>
									<p className="text-sm font-semibold">
										{patient?.name} · due {f.due}
									</p>
									<p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
										<MessageCircle className="mt-0.5 h-4 w-4 shrink-0" />
										{f.message}
									</p>
								</div>
								<div className="flex flex-wrap items-center gap-2">
									<Badge variant="outline">{f.channel}</Badge>
									<Badge variant="secondary">{f.status}</Badge>
									{f.status === "Scheduled" ? (
										<Button size="sm" onClick={() => send(f.id)}>
											Send now
										</Button>
									) : null}
									{f.status === "Sent" ? (
										<Button size="sm" variant="secondary" onClick={() => done(f.id)}>
											Mark done
										</Button>
									) : null}
								</div>
							</div>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
