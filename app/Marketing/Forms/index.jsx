import React, { useMemo, useState } from "react";
import { Plus, Copy, Check, Search, Code, Eye } from "lucide-react";
import { toast } from "sonner";
import MarketingLayout from "../MarketingLayout";
import { MARKETING_FORMS, FORM_SUBMISSIONS } from "../marketingSeedData";
import { FormModal, FormField } from "../../../lib/ui/modal";
import FormSelect from "../../../lib/ui/FormSelect";
import { Sheet } from "@/components/ui/sheet";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

function EmbedCodeBlock({ code }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			toast.success("Embed code copied");
			setTimeout(() => setCopied(false), 2000);
		} catch {
			toast.error("Could not copy to clipboard");
		}
	};

	return (
		<div className="relative">
			<pre className="rounded-lg border bg-muted/50 p-4 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
				{code}
			</pre>
			<Button size="sm" variant="outline" className="absolute top-2 right-2" onClick={handleCopy}>
				{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
				{copied ? "Copied" : "Copy"}
			</Button>
		</div>
	);
}

const EMPTY_FORM = { name: "", description: "", status: "Draft" };

const MarketingForms = () => {
	const [forms, setForms] = useState(MARKETING_FORMS);
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("All");
	const [sheetForm, setSheetForm] = useState(null);
	const [previewForm, setPreviewForm] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newForm, setNewForm] = useState(EMPTY_FORM);

	const filteredForms = useMemo(() => {
		return forms.filter((f) => {
			const matchesSearch =
				!searchTerm || f.name.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesStatus = statusFilter === "All" || f.status === statusFilter;
			return matchesSearch && matchesStatus;
		});
	}, [forms, searchTerm, statusFilter]);

	const recentSubmissions = FORM_SUBMISSIONS.slice(0, 5);

	const handleCreateForm = () => {
		if (!newForm.name.trim()) {
			toast.error("Form name is required");
			return;
		}
		const id = `form_${Date.now()}`;
		const created = {
			id,
			name: newForm.name,
			description: newForm.description,
			fields: [{ id: "f1", label: "Email", type: "email", required: true }],
			embedCode: `<script src="https://cdn.example.com/forms/${id}.js" async></script>\n<div id="crm-form-${id}"></div>`,
			status: newForm.status,
			submissionCount: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		setForms((prev) => [created, ...prev]);
		toast.success(`Form "${created.name}" created`);
		setIsModalOpen(false);
		setNewForm(EMPTY_FORM);
	};

	return (
		<MarketingLayout
			title="Forms"
			description="Lead capture forms with embed codes for your website."
		>
			<Card>
				<CardHeader className="space-y-4">
					<div className="flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
						<div>
							<CardTitle>Lead capture forms</CardTitle>
							<CardDescription>{filteredForms.length} forms</CardDescription>
						</div>
						<Button size="sm" onClick={() => setIsModalOpen(true)}>
							<Plus className="h-4 w-4" />
							New form
						</Button>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<div className="relative flex-1 min-w-[200px] max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search forms…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>
						<FormSelect
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							options={["All", "Active", "Draft"]}
							className="w-32"
						/>
					</div>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Fields</TableHead>
								<TableHead>Status</TableHead>
								<TableHead className="text-right">Submissions</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredForms.map((form) => (
								<TableRow key={form.id}>
									<TableCell>
										<div>
											<p className="font-medium">{form.name}</p>
											{form.description && (
												<p className="text-xs text-muted-foreground line-clamp-1">
													{form.description}
												</p>
											)}
										</div>
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1">
											{form.fields.map((field) => (
												<Badge key={field.id} variant="secondary" className="text-[11px] font-normal">
													{field.label}
													{field.required && " *"}
												</Badge>
											))}
										</div>
									</TableCell>
									<TableCell>
										<Badge variant={form.status === "Active" ? "default" : "secondary"}>
											{form.status}
										</Badge>
									</TableCell>
									<TableCell className="text-right tabular-nums">
										{form.submissionCount.toLocaleString()}
									</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end gap-2">
											<Button size="sm" variant="outline" onClick={() => setPreviewForm(form)}>
												<Eye className="h-3.5 w-3.5" />
												Preview
											</Button>
											<Button size="sm" variant="outline" onClick={() => setSheetForm(form)}>
												<Code className="h-3.5 w-3.5" />
												Embed
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Recent submissions</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Form</TableHead>
								<TableHead>Data</TableHead>
								<TableHead>Source</TableHead>
								<TableHead>Submitted</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentSubmissions.map((sub) => {
								const form = forms.find((f) => f.id === sub.formId);
								return (
									<TableRow key={sub.id}>
										<TableCell className="font-medium">{form?.name ?? sub.formId}</TableCell>
										<TableCell>
											<span className="text-sm text-muted-foreground">
												{Object.entries(sub.payload)
													.map(([k, v]) => `${k}: ${v}`)
													.join(" · ")}
											</span>
										</TableCell>
										<TableCell className="text-sm text-muted-foreground truncate max-w-[200px]">
											{sub.sourceUrl ?? "—"}
										</TableCell>
										<TableCell className="text-sm text-muted-foreground">
											{new Date(sub.createdAt).toLocaleString("en-US", {
												month: "short",
												day: "numeric",
												hour: "numeric",
												minute: "2-digit",
											})}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<Sheet
				open={!!sheetForm}
				onOpenChange={(open) => !open && setSheetForm(null)}
				title={sheetForm?.name}
				description="Copy this snippet to embed the form on your site."
			>
				{sheetForm && <EmbedCodeBlock code={sheetForm.embedCode} />}
			</Sheet>

			<Dialog open={!!previewForm} onOpenChange={(open) => !open && setPreviewForm(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{previewForm?.name}</DialogTitle>
						<DialogDescription>{previewForm?.description}</DialogDescription>
					</DialogHeader>
					{previewForm && (
						<div className="space-y-4 rounded-xl border p-4">
							{previewForm.fields.map((field) => (
								<div key={field.id} className="space-y-2">
									<Label>
										{field.label}
										{field.required && <span className="text-destructive"> *</span>}
									</Label>
									<Input type={field.type} placeholder={field.label} disabled />
								</div>
							))}
							<div className="flex items-center justify-between rounded-lg border p-3">
								<Label htmlFor="form-active">Form active</Label>
								<Switch id="form-active" checked={previewForm.status === "Active"} disabled />
							</div>
							<Button className="w-full" disabled>
								Submit (preview)
							</Button>
						</div>
					)}
				</DialogContent>
			</Dialog>

			<FormModal
				open={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setNewForm(EMPTY_FORM);
				}}
				title="New form"
				subtitle="Create a lead capture form — add fields after creation."
				onSubmit={handleCreateForm}
				saveLabel="Create form"
			>
				<FormField label="Form name" required>
					<Input
						value={newForm.name}
						onChange={(e) => setNewForm((p) => ({ ...p, name: e.target.value }))}
						placeholder="Newsletter signup"
					/>
				</FormField>
				<FormField label="Description">
					<Input
						value={newForm.description}
						onChange={(e) => setNewForm((p) => ({ ...p, description: e.target.value }))}
					/>
				</FormField>
				<FormField label="Status">
					<FormSelect
						value={newForm.status}
						onChange={(e) => setNewForm((p) => ({ ...p, status: e.target.value }))}
						options={["Draft", "Active"]}
					/>
				</FormField>
			</FormModal>
		</MarketingLayout>
	);
};

export default MarketingForms;
