import React, { useState } from "react";
import { toast } from "sonner";
import {
	Palette,
	ChevronDown,
	MoreHorizontal,
	Download,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sheet } from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import FormSelect from "../../lib/ui/FormSelect";
import MultiSelect from "../../lib/ui/MultiSelect";
import ExportDropdown from "../../lib/ui/dropdown/ExportDropdown";
import { FormModal, FormField } from "../../lib/ui/modal";
import DateRangeFilter from "../Analytics/components/DateRangeFilter";

const NAV_ITEMS = [
	{ id: "breadcrumbs", label: "Breadcrumbs" },
	{ id: "buttons", label: "Button" },
	{ id: "badges", label: "Badge" },
	{ id: "inputs", label: "Input & Textarea" },
	{ id: "checkbox", label: "Checkbox" },
	{ id: "toggle", label: "Toggle (Switch)" },
	{ id: "radio", label: "Radio" },
	{ id: "select", label: "Select" },
	{ id: "multi-select", label: "Multi-select" },
	{ id: "dropdown", label: "Dropdown" },
	{ id: "dialog", label: "Dialog" },
	{ id: "sheet", label: "Sheet" },
	{ id: "drawer", label: "Drawer" },
	{ id: "toast", label: "Toast" },
	{ id: "date-range", label: "Date range" },
	{ id: "modal", label: "Form modal" },
	{ id: "table", label: "Table" },
	{ id: "card", label: "Card" },
];

function Section({ id, title, description, path, children }) {
	return (
		<section id={id} className="scroll-mt-24 space-y-4 border-b border-border pb-10 last:border-0">
			<div>
				<h2 className="text-lg font-semibold text-foreground">{title}</h2>
				{description ? (
					<p className="mt-1 text-sm text-muted-foreground">{description}</p>
				) : null}
				{path ? (
					<code className="mt-2 inline-block rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
						{path}
					</code>
				) : null}
			</div>
			<div className="rounded-xl border bg-card p-4 sm:p-6">{children}</div>
		</section>
	);
}

const UiShowcase = () => {
	const [sheetOpen, setSheetOpen] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [toggleOn, setToggleOn] = useState(true);
	const [radioValue, setRadioValue] = useState("standard");
	const [selectValue, setSelectValue] = useState("crm");
	const [multiValue, setMultiValue] = useState(["leads", "deals"]);
	const [dropdownView, setDropdownView] = useState("list");
	const [range, setRange] = useState("30d");
	const [showCustomRange, setShowCustomRange] = useState(false);
	const [customFrom, setCustomFrom] = useState("");
	const [customTo, setCustomTo] = useState("");
	const [activeNav, setActiveNav] = useState("breadcrumbs");

	const scrollTo = (id) => {
		setActiveNav(id);
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
	};

	return (
		<div className="min-h-screen p-4 sm:p-6">
			<div className="mx-auto max-w-7xl">
				<div className="mb-8 flex flex-wrap items-start justify-between gap-4">
					<div className="flex items-start gap-3">
						<span className="hidden rounded-xl bg-primary p-2.5 text-primary-foreground sm:flex">
							<Palette className="h-6 w-6" />
						</span>
						<div>
							<h1 className="text-2xl font-semibold text-foreground">UI components</h1>
							<p className="mt-1 max-w-2xl text-sm text-muted-foreground">
								Live catalog of shadcn-style primitives and shared CRM UI — use this page
								when building new modules.
							</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
					<nav className="lg:sticky lg:top-4 lg:self-start">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Components</CardTitle>
							</CardHeader>
							<CardContent className="max-h-[70vh] space-y-0.5 overflow-y-auto p-2 pt-0">
								{NAV_ITEMS.map((item) => (
									<button
										key={item.id}
										type="button"
										onClick={() => scrollTo(item.id)}
										className={cn(
											"block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
											activeNav === item.id
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:bg-muted hover:text-foreground"
										)}
									>
										{item.label}
									</button>
								))}
							</CardContent>
						</Card>
					</nav>

					<div className="space-y-10">
						<Section
							id="breadcrumbs"
							title="Breadcrumbs"
							description="Wayfinding for nested routes and detail pages."
							path="components/ui/breadcrumb.jsx"
						>
							<Breadcrumb>
								<BreadcrumbList>
									<BreadcrumbItem>
										<BreadcrumbLink href="/">Home</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbLink href="/leads">Leads</BreadcrumbLink>
									</BreadcrumbItem>
									<BreadcrumbSeparator />
									<BreadcrumbItem>
										<BreadcrumbPage>Alice Brown</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</Section>

						<Section
							id="buttons"
							title="Button"
							path="components/ui/button.jsx"
						>
							<div className="flex flex-wrap gap-2">
								<Button>Default</Button>
								<Button variant="secondary">Secondary</Button>
								<Button variant="outline">Outline</Button>
								<Button variant="ghost">Ghost</Button>
								<Button variant="destructive">Destructive</Button>
								<Button variant="link">Link</Button>
							</div>
							<div className="mt-4 flex flex-wrap items-center gap-2">
								<Button size="sm">Small</Button>
								<Button size="default">Default</Button>
								<Button size="lg">Large</Button>
								<Button size="icon" variant="outline" aria-label="More">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</div>
						</Section>

						<Section id="badges" title="Badge" path="components/ui/badge.jsx">
							<div className="flex flex-wrap gap-2">
								<Badge>Default</Badge>
								<Badge variant="secondary">Secondary</Badge>
								<Badge variant="outline">Outline</Badge>
								<Badge variant="destructive">Destructive</Badge>
							</div>
						</Section>

						<Section
							id="inputs"
							title="Input & Textarea"
							path="components/ui/input.jsx"
						>
							<div className="grid max-w-md gap-4">
								<div className="space-y-2">
									<Label htmlFor="demo-input">Email</Label>
									<Input id="demo-input" placeholder="you@company.com" />
								</div>
								<div className="space-y-2">
									<Label htmlFor="demo-textarea">Notes</Label>
									<Textarea id="demo-textarea" placeholder="Add context…" rows={3} />
								</div>
							</div>
						</Section>

						<Section id="checkbox" title="Checkbox" path="components/ui/checkbox.jsx">
							<div className="flex items-center gap-2">
								<Checkbox id="cb1" defaultChecked />
								<Label htmlFor="cb1">Send email notifications</Label>
							</div>
						</Section>

						<Section id="toggle" title="Toggle (Switch)" path="components/ui/switch.jsx">
							<div className="flex items-center gap-3">
								<Switch id="sw1" checked={toggleOn} onCheckedChange={setToggleOn} />
								<Label htmlFor="sw1">
									{toggleOn ? "Enabled" : "Disabled"}
								</Label>
							</div>
						</Section>

						<Section id="radio" title="Radio" path="components/ui/radio-group.jsx">
							<RadioGroup value={radioValue} onValueChange={setRadioValue} className="gap-3">
								{[
									{ value: "standard", label: "Standard plan" },
									{ value: "pro", label: "Pro plan" },
									{ value: "enterprise", label: "Enterprise" },
								].map((opt) => (
									<div key={opt.value} className="flex items-center gap-2">
										<RadioGroupItem value={opt.value} id={`radio-${opt.value}`} />
										<Label htmlFor={`radio-${opt.value}`}>{opt.label}</Label>
									</div>
								))}
							</RadioGroup>
						</Section>

						<Section id="select" title="Select" path="lib/ui/FormSelect.jsx">
							<div className="max-w-xs">
								<FormSelect
									value={selectValue}
									onChange={(e) => setSelectValue(e.target.value)}
									options={[
										{ value: "crm", label: "CRM module" },
										{ value: "finance", label: "Finance" },
										{ value: "cms", label: "CMS" },
									]}
								/>
							</div>
						</Section>

						<Section id="multi-select" title="Multi-select" path="lib/ui/MultiSelect.jsx">
							<div className="max-w-sm">
								<MultiSelect
									value={multiValue}
									onChange={setMultiValue}
									options={[
										{ value: "leads", label: "Leads" },
										{ value: "deals", label: "Deals" },
										{ value: "contacts", label: "Contacts" },
										{ value: "invoices", label: "Invoices" },
									]}
								/>
							</div>
						</Section>

						<Section id="dropdown" title="Dropdown" path="components/ui/dropdown-menu.jsx">
							<div className="flex flex-wrap gap-3">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline">
											Actions
											<ChevronDown className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start">
										<DropdownMenuLabel>Record</DropdownMenuLabel>
										<DropdownMenuItem onClick={() => toast.info("Edit clicked")}>
											Edit
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => toast.info("Duplicate clicked")}>
											Duplicate
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem
											className="text-destructive focus:text-destructive"
											onClick={() => toast.error("Delete clicked")}
										>
											Delete
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline">View mode</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuRadioGroup
											value={dropdownView}
											onValueChange={setDropdownView}
										>
											<DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
											<DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
											<DropdownMenuRadioItem value="kanban">Kanban</DropdownMenuRadioItem>
										</DropdownMenuRadioGroup>
									</DropdownMenuContent>
								</DropdownMenu>
								<ExportDropdown
									onExportCsv={() => toast.success("CSV export (demo)")}
									onExportPdf={() => toast.success("PDF export (demo)")}
									onExportJson={() => toast.success("JSON export (demo)")}
								/>
							</div>
						</Section>

						<Section id="dialog" title="Dialog" path="components/ui/dialog.jsx">
							<Dialog>
								<DialogTrigger asChild>
									<Button variant="outline">Open dialog</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Confirm action</DialogTitle>
										<DialogDescription>
											This dialog uses Radix UI primitives with shadcn styling.
										</DialogDescription>
									</DialogHeader>
									<DialogFooter>
										<Button variant="outline">Cancel</Button>
										<Button onClick={() => toast.success("Confirmed")}>Continue</Button>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						</Section>

						<Section id="sheet" title="Sheet" path="components/ui/sheet.jsx">
							<Button variant="outline" onClick={() => setSheetOpen(true)}>
								Open sheet (right)
							</Button>
							<Sheet
								open={sheetOpen}
								onOpenChange={setSheetOpen}
								side="right"
								title="Filter panel"
								description="Slide-over panel for filters or quick edits."
							>
								<div className="space-y-4">
									<FormSelect
										value="all"
										options={["All", "Active", "Archived"]}
									/>
									<Button className="w-full" onClick={() => setSheetOpen(false)}>
										Apply filters
									</Button>
								</div>
							</Sheet>
						</Section>

						<Section id="drawer" title="Drawer" path="components/ui/sheet.jsx (side=bottom)">
							<Button variant="outline" onClick={() => setDrawerOpen(true)}>
								Open drawer (bottom)
							</Button>
							<Sheet
								open={drawerOpen}
								onOpenChange={setDrawerOpen}
								side="bottom"
								title="Mobile drawer"
								description="Bottom sheet pattern for mobile-first actions."
							>
								<div className="grid grid-cols-2 gap-2">
									<Button variant="outline">
										<Download className="h-4 w-4" />
										Download
									</Button>
									<Button onClick={() => setDrawerOpen(false)}>Done</Button>
								</div>
							</Sheet>
						</Section>

						<Section id="toast" title="Toast" path="sonner — modules/Layout">
							<div className="flex flex-wrap gap-2">
								<Button onClick={() => toast.success("Saved successfully")}>Success</Button>
								<Button variant="outline" onClick={() => toast.info("Heads up — demo info")}>
									Info
								</Button>
								<Button variant="secondary" onClick={() => toast.warning("Check required fields")}>
									Warning
								</Button>
								<Button variant="destructive" onClick={() => toast.error("Something went wrong")}>
									Error
								</Button>
							</div>
						</Section>

						<Section
							id="date-range"
							title="Date range"
							path="app/Analytics/components/DateRangeFilter.jsx"
						>
							<DateRangeFilter
								value={range}
								onChange={setRange}
								showCustom={showCustomRange}
								onToggleCustom={setShowCustomRange}
								customFrom={customFrom}
								customTo={customTo}
								onCustomChange={(field, val) =>
									field === "from" ? setCustomFrom(val) : setCustomTo(val)
								}
							/>
						</Section>

						<Section id="modal" title="Form modal" path="lib/ui/modal/FormModal.jsx">
							<Button onClick={() => setModalOpen(true)}>Open form modal</Button>
							<FormModal
								open={modalOpen}
								onClose={() => setModalOpen(false)}
								title="Add record"
								subtitle="Shared modal shell used across CRM modules."
								onSubmit={() => {
									toast.success("Form submitted (demo)");
									setModalOpen(false);
								}}
							>
								<FormField label="Name" htmlFor="modal-name" required>
									<Input id="modal-name" placeholder="Acme Corp" />
								</FormField>
								<FormField label="Type" htmlFor="modal-type">
									<FormSelect id="modal-type" options={["Lead", "Contact", "Company"]} />
								</FormField>
							</FormModal>
						</Section>

						<Section id="table" title="Table" path="components/ui/table.jsx">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Owner</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell className="font-medium">Acme Corp</TableCell>
										<TableCell>
											<Badge>Active</Badge>
										</TableCell>
										<TableCell className="text-muted-foreground">Sarah Chen</TableCell>
									</TableRow>
									<TableRow>
										<TableCell className="font-medium">Northwind LLC</TableCell>
										<TableCell>
											<Badge variant="secondary">Pending</Badge>
										</TableCell>
										<TableCell className="text-muted-foreground">John Doe</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</Section>

						<Section id="card" title="Card" path="components/ui/card.jsx">
							<div className="grid gap-4 sm:grid-cols-2">
								<Card>
									<CardHeader>
										<CardTitle>Module shell</CardTitle>
										<CardDescription>Standard card header pattern</CardDescription>
									</CardHeader>
									<CardContent>
										<p className="text-sm text-muted-foreground">
											Wrap stats, charts, and forms in{" "}
											<code className="text-xs">Card</code> for consistent spacing.
										</p>
									</CardContent>
								</Card>
								<Card>
									<CardContent className="flex items-center justify-between p-6">
										<div>
											<p className="text-sm text-muted-foreground">Open deals</p>
											<p className="text-3xl font-bold">128</p>
										</div>
										<Button variant="outline" onClick={() => window.location.assign("/deals")}>
											View
										</Button>
									</CardContent>
								</Card>
							</div>
						</Section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UiShowcase;
