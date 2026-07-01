import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	ArrowLeft,
	Calendar,
	CheckCircle2,
	Clock,
	Mail,
	Pencil,
	Save,
	Send,
	Users,
	X,
} from "lucide-react";
import { toast } from "sonner";
import { useCms } from "./CmsContext";
import { CmsField, CmsMetaRow } from "./CmsField";
import { NEWSLETTER_STATUSES } from "./cmsSeedData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormSelect from "../../lib/ui/FormSelect";

const emptyDraft = {
	title: "",
	subject: "",
	status: "Draft",
	sendDate: "",
	content: "",
	excerpt: "",
	recipientCount: 0,
};

function formatDate(dateString) {
	if (!dateString) return "Not scheduled";
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function statusBadgeVariant(status) {
	if (status === "Sent") return "default";
	if (status === "Scheduled") return "secondary";
	return "outline";
}

export default function NewsletterDetail() {
	const router = useRouter();
	const { id } = router.query;
	const { newsletters, updateNewsletter } = useCms();
	const newsletter = useMemo(
		() =>
			id ? newsletters.find((n) => n.id === Number(id)) ?? null : null,
		[newsletters, id]
	);

	const [isEditing, setIsEditing] = useState(false);
	const [draft, setDraft] = useState(emptyDraft);

	useEffect(() => {
		if (!newsletter) return;
		setDraft({ ...newsletter });
	}, [newsletter]);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-muted-foreground">Loading…</p>
			</div>
		);
	}

	if (!newsletter) {
		return (
			<div className="p-6 space-y-4">
				<p className="text-muted-foreground">Newsletter not found.</p>
				<Button variant="outline" asChild>
					<Link href="/cms">Back to CMS</Link>
				</Button>
			</div>
		);
	}

	const setField = (name, value) =>
		setDraft((prev) => ({ ...prev, [name]: value }));

	const handleCancel = () => {
		setDraft({ ...newsletter });
		setIsEditing(false);
	};

	const handleSave = () => {
		if (!draft.title.trim() || !draft.subject.trim() || !draft.content.trim()) {
			toast.error("Title, subject, and content are required.");
			return;
		}

		updateNewsletter(newsletter.id, {
			title: draft.title.trim(),
			subject: draft.subject.trim(),
			status: draft.status,
			sendDate: draft.sendDate,
			content: draft.content.trim(),
			excerpt: draft.excerpt.trim(),
			recipientCount: Number(draft.recipientCount) || 0,
		});

		toast.success("Newsletter updated.");
		setIsEditing(false);
	};

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<Button variant="outline" size="icon" asChild>
						<Link href="/cms" aria-label="Back to CMS">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<div>
						<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Newsletter
						</p>
						<h1 className="text-2xl font-semibold text-foreground">
							{isEditing ? "Edit newsletter" : newsletter.title}
						</h1>
					</div>
				</div>
				<div className="flex items-center gap-2">
					{isEditing ? (
						<>
							<Button variant="outline" onClick={handleCancel}>
								<X className="h-4 w-4" />
								Cancel
							</Button>
							<Button onClick={handleSave}>
								<Save className="h-4 w-4" />
								Save changes
							</Button>
						</>
					) : (
						<Button onClick={() => setIsEditing(true)}>
							<Pencil className="h-4 w-4" />
							Edit
						</Button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="text-base text-foreground">
							{isEditing ? "Email body" : "Preview"}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{isEditing ? (
							<>
								<CmsField label="Internal title" htmlFor="nl-title" required>
									<Input
										id="nl-title"
										value={draft.title}
										onChange={(e) => setField("title", e.target.value)}
									/>
								</CmsField>
								<CmsField label="Email subject" htmlFor="nl-subject" required>
									<Input
										id="nl-subject"
										value={draft.subject}
										onChange={(e) => setField("subject", e.target.value)}
									/>
								</CmsField>
								<CmsField label="Excerpt" htmlFor="nl-excerpt">
									<Textarea
										id="nl-excerpt"
										value={draft.excerpt}
										onChange={(e) => setField("excerpt", e.target.value)}
										rows={3}
									/>
								</CmsField>
								<CmsField label="Content" htmlFor="nl-content" required>
									<Textarea
										id="nl-content"
										value={draft.content}
										onChange={(e) => setField("content", e.target.value)}
										rows={14}
										className="min-h-72 font-mono"
									/>
								</CmsField>
							</>
						) : (
							<>
								<div className="rounded-lg border border-border bg-muted/40 p-4">
									<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Subject line
									</p>
									<p className="mt-1 text-sm font-medium text-foreground">
										{newsletter.subject}
									</p>
								</div>
								{newsletter.excerpt && (
									<p className="text-sm text-muted-foreground">
										{newsletter.excerpt}
									</p>
								)}
								<div className="whitespace-pre-wrap rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-foreground">
									{newsletter.content}
								</div>
							</>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base text-foreground">Send details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{isEditing ? (
							<>
								<CmsField label="Status" htmlFor="nl-status">
									<FormSelect
										id="nl-status"
										value={draft.status}
										onChange={(e) => setField("status", e.target.value)}
										options={NEWSLETTER_STATUSES}
									/>
								</CmsField>
								<CmsField label="Send date" htmlFor="nl-date">
									<DatePicker
										id="nl-date"
										value={draft.sendDate}
										onChange={(val) => setField("sendDate", val)}
										className="w-full"
									/>
								</CmsField>
								<CmsField label="Recipients" htmlFor="nl-recipients">
									<Input
										id="nl-recipients"
										type="number"
										min={0}
										value={draft.recipientCount}
										onChange={(e) =>
											setField("recipientCount", e.target.value)
										}
									/>
								</CmsField>
							</>
						) : (
							<>
								<Badge variant={statusBadgeVariant(newsletter.status)}>
									{newsletter.status === "Sent" ? (
										<CheckCircle2 className="mr-1 h-3 w-3" />
									) : newsletter.status === "Scheduled" ? (
										<Clock className="mr-1 h-3 w-3" />
									) : (
										<Mail className="mr-1 h-3 w-3" />
									)}
									{newsletter.status}
								</Badge>
								<CmsMetaRow
									label="Send date"
									value={
										<span className="inline-flex items-center gap-2">
											<Calendar className="h-4 w-4 text-muted-foreground" />
											{formatDate(newsletter.sendDate)}
										</span>
									}
								/>
								<CmsMetaRow
									label="Recipients"
									value={
										<span className="inline-flex items-center gap-2">
											<Users className="h-4 w-4 text-muted-foreground" />
											{newsletter.recipientCount.toLocaleString()}
										</span>
									}
								/>
								{newsletter.status !== "Sent" && (
									<Button className="w-full" variant="secondary">
										<Send className="h-4 w-4" />
										Schedule send
									</Button>
								)}
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
