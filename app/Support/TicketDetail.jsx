import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Calendar, Mail, Tag, User } from "lucide-react";
import EntityDetailShell from "../CRM/EntityDetailShell";
import { findSupportTicket } from "./supportSeedData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function TicketDetail() {
	const router = useRouter();
	const { id } = router.query;

	const ticket = useMemo(
		() => (id ? findSupportTicket(id) : null),
		[id]
	);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-muted-foreground">Loading…</p>
			</div>
		);
	}

	if (!ticket) {
		return (
			<div className="space-y-4 p-6">
				<p className="text-muted-foreground">Ticket not found.</p>
				<Button variant="outline" asChild>
					<Link href="/support">Back to Support</Link>
				</Button>
			</div>
		);
	}

	const sidebar = (
		<Card>
			<CardContent className="space-y-4 p-6">
				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
					<Badge className="mt-2">{ticket.status}</Badge>
				</div>
				<div>
					<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Priority</p>
					<Badge variant="secondary" className="mt-2">{ticket.priority}</Badge>
				</div>
				<ul className="space-y-3 border-t pt-4 text-sm">
					<li className="flex items-center gap-2 text-muted-foreground">
						<User className="h-4 w-4" />
						{ticket.assignee}
					</li>
					<li className="flex items-center gap-2 text-muted-foreground">
						<Mail className="h-4 w-4" />
						{ticket.email}
					</li>
					<li className="flex items-center gap-2 text-muted-foreground">
						<Tag className="h-4 w-4" />
						{ticket.category}
					</li>
					<li className="flex items-center gap-2 text-muted-foreground">
						<Calendar className="h-4 w-4" />
						{ticket.createdAt}
					</li>
				</ul>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell backHref="/support" backLabel="Support" sidebar={sidebar}>
			<Card>
				<CardHeader>
					<CardTitle>{ticket.subject}</CardTitle>
					<p className="text-sm text-muted-foreground">{ticket.customer} · {ticket.id}</p>
				</CardHeader>
				<CardContent className="space-y-6">
					<p className="text-sm leading-relaxed text-foreground">{ticket.description}</p>
					<div className="space-y-4 border-t pt-4">
						<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Conversation
						</p>
						{ticket.messages.length === 0 ? (
							<p className="text-sm text-muted-foreground">No replies yet.</p>
						) : (
							ticket.messages.map((msg, i) => (
								<div key={i} className="rounded-lg border bg-muted/30 p-4">
									<div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
										<span className="font-medium text-foreground">{msg.from}</span>
										<span>{msg.at}</span>
									</div>
									<p className="text-sm text-foreground">{msg.body}</p>
								</div>
							))
						)}
					</div>
				</CardContent>
			</Card>
		</EntityDetailShell>
	);
}
