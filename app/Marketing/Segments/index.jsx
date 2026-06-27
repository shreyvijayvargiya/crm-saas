import React, { useMemo, useState } from "react";
import { Plus, Filter, Search, Pen, Trash, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import MarketingLayout from "../MarketingLayout";
import { SEGMENTS } from "../marketingSeedData";
import { FormModal, FormField } from "../../../lib/ui/modal";
import FormSelect from "../../../lib/ui/FormSelect";
import MultiSelect from "../../../lib/ui/MultiSelect";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

const FILTER_FIELDS = ["status", "tags", "plan", "last_activity", "company_size", "email_opt_in"];
const ENTITY_TYPES = [
	{ value: "contact", label: "Contacts" },
	{ value: "lead", label: "Leads" },
	{ value: "both", label: "Contacts & Leads" },
];

function entityTypeLabel(type) {
	if (type === "contact") return "Contacts";
	if (type === "lead") return "Leads";
	return "Contacts & Leads";
}

const EMPTY_SEGMENT = {
	name: "",
	description: "",
	entityType: "both",
	filterField: "status",
	filterOperator: "eq",
	filterValue: "",
};

const MarketingSegments = () => {
	const [segments, setSegments] = useState(SEGMENTS);
	const [searchTerm, setSearchTerm] = useState("");
	const [entityFilter, setEntityFilter] = useState("All");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newSegment, setNewSegment] = useState(EMPTY_SEGMENT);
	const [selectedFields, setSelectedFields] = useState(["status"]);

	const filtered = useMemo(() => {
		return segments.filter((s) => {
			const matchesSearch =
				!searchTerm ||
				s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(s.description ?? "").toLowerCase().includes(searchTerm.toLowerCase());
			const matchesEntity = entityFilter === "All" || s.entityType === entityFilter;
			return matchesSearch && matchesEntity;
		});
	}, [segments, searchTerm, entityFilter]);

	const handleCreate = () => {
		if (!newSegment.name.trim()) {
			toast.error("Segment name is required");
			return;
		}
		const created = {
			id: `seg_${Date.now()}`,
			name: newSegment.name,
			description: newSegment.description,
			entityType: newSegment.entityType,
			filters: [
				{
					field: newSegment.filterField,
					operator: newSegment.filterOperator,
					value: newSegment.filterValue || "—",
				},
			],
			contactCount: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		setSegments((prev) => [created, ...prev]);
		toast.success(`Segment "${created.name}" created`);
		setIsModalOpen(false);
		setNewSegment(EMPTY_SEGMENT);
	};

	return (
		<MarketingLayout
			title="Segments"
			description="Saved contact and lead filters used as campaign audiences."
		>
			<Card>
				<CardHeader className="space-y-4">
					<div className="flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
						<div>
							<CardTitle>Audience segments</CardTitle>
							<CardDescription>{filtered.length} segments</CardDescription>
						</div>
						<Button size="sm" onClick={() => setIsModalOpen(true)}>
							<Plus className="h-4 w-4" />
							New segment
						</Button>
					</div>
					<div className="flex flex-wrap items-center gap-3">
						<div className="relative flex-1 min-w-[200px] max-w-sm">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
							<Input
								placeholder="Search segments…"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>
						<FormSelect
							value={entityFilter}
							onChange={(e) => setEntityFilter(e.target.value)}
							options={[
							{ value: "All", label: "All types" },
							{ value: "contact", label: "Contacts" },
							{ value: "lead", label: "Leads" },
							{ value: "both", label: "Both" },
						]}
							className="w-40"
						/>
					</div>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Entity type</TableHead>
								<TableHead>Filters</TableHead>
								<TableHead className="text-right">Size</TableHead>
								<TableHead>Updated</TableHead>
								<TableHead className="w-10" />
							</TableRow>
						</TableHeader>
						<TableBody>
							{filtered.map((segment) => (
								<TableRow key={segment.id}>
									<TableCell>
										<div>
											<p className="font-medium">{segment.name}</p>
											{segment.description && (
												<p className="text-xs text-muted-foreground line-clamp-1">
													{segment.description}
												</p>
											)}
										</div>
									</TableCell>
									<TableCell>
										<Badge variant="outline">{entityTypeLabel(segment.entityType)}</Badge>
									</TableCell>
									<TableCell>
										<div className="flex flex-wrap gap-1">
											{segment.filters.map((f, i) => (
												<Badge key={i} variant="secondary" className="text-[11px] font-normal gap-1">
													<Filter className="h-3 w-3" />
													{f.field} {f.operator} {f.value}
												</Badge>
											))}
										</div>
									</TableCell>
									<TableCell className="text-right tabular-nums font-medium">
										{segment.contactCount.toLocaleString()}
									</TableCell>
									<TableCell className="text-muted-foreground text-sm">
										{new Date(segment.updatedAt).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
											year: "numeric",
										})}
									</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon" className="h-8 w-8">
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem onClick={() => toast.info(`Edit "${segment.name}" (demo)`)}>
													<Pen className="h-4 w-4" />
													Edit filters
												</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem
													className="text-destructive"
													onClick={() => {
														setSegments((prev) => prev.filter((s) => s.id !== segment.id));
														toast.success(`Deleted "${segment.name}"`);
													}}
												>
													<Trash className="h-4 w-4" />
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<FormModal
				open={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
					setNewSegment(EMPTY_SEGMENT);
				}}
				title="New segment"
				subtitle="Define filter rules to build a reusable audience."
				onSubmit={handleCreate}
				saveLabel="Create segment"
				maxWidth="max-w-lg"
			>
				<FormField label="Segment name" required>
					<Input
						value={newSegment.name}
						onChange={(e) => setNewSegment((p) => ({ ...p, name: e.target.value }))}
						placeholder="Enterprise leads"
					/>
				</FormField>
				<FormField label="Description">
					<Input
						value={newSegment.description}
						onChange={(e) => setNewSegment((p) => ({ ...p, description: e.target.value }))}
					/>
				</FormField>
				<FormField label="Entity type">
					<FormSelect
						value={newSegment.entityType}
						onChange={(e) => setNewSegment((p) => ({ ...p, entityType: e.target.value }))}
						options={ENTITY_TYPES}
					/>
				</FormField>
				<FormField label="Filter fields" hint="Fields included in this segment definition">
					<MultiSelect
						options={FILTER_FIELDS.map((f) => ({ value: f, label: f }))}
						value={selectedFields}
						onChange={setSelectedFields}
						placeholder="Select fields…"
					/>
				</FormField>
				<div className="grid grid-cols-3 gap-3">
					<FormField label="Field">
						<FormSelect
							value={newSegment.filterField}
							onChange={(e) => setNewSegment((p) => ({ ...p, filterField: e.target.value }))}
							options={FILTER_FIELDS}
						/>
					</FormField>
					<FormField label="Operator">
						<FormSelect
							value={newSegment.filterOperator}
							onChange={(e) => setNewSegment((p) => ({ ...p, filterOperator: e.target.value }))}
							options={["eq", "neq", "gte", "lte", "contains", "lt"]}
						/>
					</FormField>
					<FormField label="Value">
						<Input
							value={newSegment.filterValue}
							onChange={(e) => setNewSegment((p) => ({ ...p, filterValue: e.target.value }))}
						/>
					</FormField>
				</div>
			</FormModal>
		</MarketingLayout>
	);
};

export default MarketingSegments;
