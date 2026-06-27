import React, { useState } from "react";
import { toast } from "sonner";
import {
	Palette,
	ChevronDown,
	MoreHorizontal,
	Download,
	Search,
	ArrowUp,
	DollarSign,
	Eye,
	Pause,
	Megaphone,
	Repeat,
} from "lucide-react";
import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	Legend,
} from "recharts";
import { cn } from "@/lib/utils";
import { useChartTooltipProps } from "../../utils/chartTooltip";
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
	{ id: "table-advanced", label: "Table + actions" },
	{ id: "card", label: "Card" },
	{ id: "metric-cards", label: "Metric cards" },
	{ id: "charts", label: "Charts" },
	{ id: "module-tabs", label: "Module tabs" },
	{ id: "timeline", label: "Timeline" },
	{ id: "toolbar", label: "List toolbar" },
	{ id: "status-badges", label: "Status badges" },
	{ id: "empty-state", label: "Empty state" },
];

function Section({ id, title, description, path, children }) {
	return (
		<section id={id} className="scroll-mt-24 space-y-4 border-b border-border p-4 last:border-0 rounded-lg bg-white dark:bg-transparent">
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
	const [toolbarSearch, setToolbarSearch] = useState("");
	const [toolbarStatus, setToolbarStatus] = useState("All");
	const [tableSelected, setTableSelected] = useState([]);
	const [moduleTab, setModuleTab] = useState("overview");
	const chartTooltipProps = useChartTooltipProps();

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
							<CardContent className="max-h-[70vh] space-y-0.5 overflow-y-auto hidescrollbar p-2 pt-0">
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

						<Section
							id="metric-cards"
							title="Metric cards"
							description="KPI strip used on Marketing, Subscriptions, E-commerce, and Analytics."
							path="app/Marketing/index.jsx · app/Subscriptions/index.jsx"
						>
							<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
								{[
									{ label: "MRR", value: "$48.2k", change: 6, positive: true },
									{ label: "Active subs", value: "312", change: 4, positive: true },
									{ label: "Churn", value: "2.1%", change: 0.3, positive: false },
									{ label: "Open rate", value: "32.4%", change: 4, positive: true },
								].map((m) => (
									<Card key={m.label}>
										<CardContent className="p-5">
											<div className="flex items-start justify-between gap-2">
												<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
													<DollarSign className="h-4 w-4" />
												</span>
												<Badge
													className={cn(
														"gap-0.5 border-transparent",
														m.positive
															? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
															: "bg-rose-500/15 text-rose-600 dark:text-rose-400"
													)}
												>
													<ArrowUp className="h-3.5 w-3.5" />
													{m.positive ? "+" : "−"}
													{m.change}%
												</Badge>
											</div>
											<p className="mt-4 text-2xl font-bold">{m.value}</p>
											<p className="text-sm text-muted-foreground">{m.label}</p>
										</CardContent>
									</Card>
								))}
							</div>
						</Section>

						<Section
							id="charts"
							title="Charts"
							description="Recharts patterns from Marketing, Subscriptions, Invoices, and Analytics."
							path="recharts + utils/chartTooltip.js"
						>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<div className="h-56">
									<p className="mb-2 text-sm font-medium">Bar — campaign performance</p>
									<ResponsiveContainer width="100%" height="100%">
										<BarChart
											data={[
												{ month: "Apr", sent: 4600, opens: 1520 },
												{ month: "May", sent: 5200, opens: 1680 },
												{ month: "Jun", sent: 4900, opens: 1590 },
											]}
										>
											<CartesianGrid strokeDasharray="3 3" className="stroke-border" />
											<XAxis dataKey="month" tick={{ fontSize: 12 }} />
											<YAxis tick={{ fontSize: 12 }} />
											<Tooltip {...chartTooltipProps} />
											<Bar dataKey="sent" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
											<Bar dataKey="opens" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
										</BarChart>
									</ResponsiveContainer>
								</div>
								<div className="h-56">
									<p className="mb-2 text-sm font-medium">Area — MRR trend</p>
									<ResponsiveContainer width="100%" height="100%">
										<AreaChart
											data={[
												{ month: "Apr", mrr: 45300 },
												{ month: "May", mrr: 46900 },
												{ month: "Jun", mrr: 48200 },
											]}
										>
											<CartesianGrid strokeDasharray="3 3" className="stroke-border" />
											<XAxis dataKey="month" tick={{ fontSize: 12 }} />
											<YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
											<Tooltip {...chartTooltipProps} />
											<Area
												type="monotone"
												dataKey="mrr"
												stroke="hsl(var(--primary))"
												fill="hsl(var(--primary))"
												fillOpacity={0.15}
											/>
										</AreaChart>
									</ResponsiveContainer>
								</div>
								<div className="h-56">
									<p className="mb-2 text-sm font-medium">Line — engagement</p>
									<ResponsiveContainer width="100%" height="100%">
										<LineChart
											data={[
												{ day: "Mon", opens: 42, clicks: 12 },
												{ day: "Wed", opens: 51, clicks: 15 },
												{ day: "Fri", opens: 49, clicks: 14 },
											]}
										>
											<CartesianGrid strokeDasharray="3 3" className="stroke-border" />
											<XAxis dataKey="day" tick={{ fontSize: 12 }} />
											<YAxis tick={{ fontSize: 12 }} />
											<Tooltip {...chartTooltipProps} />
											<Line type="monotone" dataKey="opens" stroke="hsl(var(--primary))" strokeWidth={2} />
											<Line type="monotone" dataKey="clicks" stroke="hsl(var(--chart-2))" strokeWidth={2} />
										</LineChart>
									</ResponsiveContainer>
								</div>
								<div className="h-56">
									<p className="mb-2 text-sm font-medium">Pie — subscription status</p>
									<ResponsiveContainer width="100%" height="100%">
										<PieChart>
											<Pie
												data={[
													{ status: "Active", count: 248 },
													{ status: "Trialing", count: 34 },
													{ status: "Past Due", count: 12 },
												]}
												dataKey="count"
												nameKey="status"
												cx="50%"
												cy="50%"
												innerRadius={45}
												outerRadius={70}
											>
												{[0, 1, 2].map((i) => (
													<Cell
														key={i}
														fill={`hsl(var(--chart-${i + 1}))`}
													/>
												))}
											</Pie>
											<Tooltip {...chartTooltipProps} />
											<Legend />
										</PieChart>
									</ResponsiveContainer>
								</div>
							</div>
						</Section>

						<Section
							id="module-tabs"
							title="Module tabs"
							description="Sub-navigation for multi-route modules (Marketing, Subscriptions, CMS)."
							path="app/Marketing/MarketingLayout.jsx"
						>
							<nav className="flex gap-1 border-b">
								{[
									{ id: "overview", label: "Overview", icon: Megaphone },
									{ id: "segments", label: "Segments", icon: Search },
									{ id: "billing", label: "Billing", icon: Repeat },
								].map((tab) => {
									const Icon = tab.icon;
									return (
										<button
											key={tab.id}
											type="button"
											onClick={() => setModuleTab(tab.id)}
											className={cn(
												"flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px",
												moduleTab === tab.id
													? "border-primary text-primary"
													: "border-transparent text-muted-foreground hover:text-foreground"
											)}
										>
											<Icon className="h-4 w-4" />
											{tab.label}
										</button>
									);
								})}
							</nav>
							<p className="mt-4 text-sm text-muted-foreground">
								Active tab: <span className="font-medium text-foreground">{moduleTab}</span>
							</p>
						</Section>

						<Section
							id="timeline"
							title="Timeline"
							description="Billing / activity history on subscription and CRM detail pages."
							path="app/Subscriptions/SubscriptionDetail/index.jsx"
						>
							<ol className="relative border-l border-border ml-3 space-y-6">
								{[
									{ title: "Renewed", desc: "Subscription renewed for $129.00", time: "Jun 1, 2025" },
									{ title: "Upgraded", desc: "Upgraded from Starter to Growth", time: "Mar 15, 2025" },
									{ title: "Created", desc: "Subscription created", time: "Jan 15, 2025" },
								].map((event) => (
									<li key={event.title} className="ml-6">
										<span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border-2 border-primary bg-background" />
										<div className="flex flex-wrap items-start justify-between gap-2">
											<div>
												<p className="font-medium text-sm">{event.title}</p>
												<p className="text-sm text-muted-foreground">{event.desc}</p>
											</div>
											<time className="text-xs text-muted-foreground">{event.time}</time>
										</div>
									</li>
								))}
							</ol>
						</Section>

						<Section
							id="toolbar"
							title="List toolbar"
							description="Search, filter, and export row above data tables."
							path="app/Marketing/index.jsx · app/Subscriptions/index.jsx"
						>
							<div className="flex flex-wrap items-center gap-3">
								<div className="relative flex-1 min-w-[200px] max-w-sm">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										placeholder="Search records…"
										value={toolbarSearch}
										onChange={(e) => setToolbarSearch(e.target.value)}
										className="pl-9"
									/>
								</div>
								<FormSelect
									value={toolbarStatus}
									onChange={(e) => setToolbarStatus(e.target.value)}
									options={["All", "Active", "Draft", "Canceled"]}
									className="w-32"
								/>
								<ExportDropdown
									onExportCsv={() => toast.success("CSV export (demo)")}
									onExportPdf={() => toast.success("PDF export (demo)")}
									onExportJson={() => toast.success("JSON export (demo)")}
								/>
							</div>
						</Section>

						<Section
							id="table-advanced"
							title="Table + actions"
							description="Selectable rows with per-row dropdown menus."
							path="app/Marketing/index.jsx"
						>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="w-10">
											<Checkbox
												checked={tableSelected.length === 2}
												onCheckedChange={(checked) =>
													setTableSelected(checked ? ["1", "2"] : [])
												}
											/>
										</TableHead>
										<TableHead>Name</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="w-10" />
									</TableRow>
								</TableHeader>
								<TableBody>
									{[
										{ id: "1", name: "Onboarding Drip", status: "Active" },
										{ id: "2", name: "Win-back Campaign", status: "Scheduled" },
									].map((row) => (
										<TableRow key={row.id}>
											<TableCell>
												<Checkbox
													checked={tableSelected.includes(row.id)}
													onCheckedChange={() =>
														setTableSelected((prev) =>
															prev.includes(row.id)
																? prev.filter((x) => x !== row.id)
																: [...prev, row.id]
														)
													}
												/>
											</TableCell>
											<TableCell className="font-medium">{row.name}</TableCell>
											<TableCell>
												<Badge>{row.status}</Badge>
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon" className="h-8 w-8">
															<MoreHorizontal className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem onClick={() => toast.info("Open (demo)")}>
															<Eye className="h-4 w-4" />
															View
														</DropdownMenuItem>
														<DropdownMenuItem onClick={() => toast.info("Paused (demo)")}>
															<Pause className="h-4 w-4" />
															Pause
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Section>

						<Section
							id="status-badges"
							title="Status badges"
							description="Semantic variants for CRM entity states."
						>
							<div className="space-y-4">
								<div>
									<p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Campaigns
									</p>
									<div className="flex flex-wrap gap-2">
										<Badge>Active</Badge>
										<Badge variant="secondary">Scheduled</Badge>
										<Badge variant="outline">Completed</Badge>
									</div>
								</div>
								<div>
									<p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Subscriptions
									</p>
									<div className="flex flex-wrap gap-2">
										<Badge>Active</Badge>
										<Badge variant="secondary">Trialing</Badge>
										<Badge variant="destructive">Past Due</Badge>
										<Badge variant="outline">Canceled</Badge>
									</div>
								</div>
								<div>
									<p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Finance
									</p>
									<div className="flex flex-wrap gap-2">
										<Badge>Paid</Badge>
										<Badge variant="secondary">Pending</Badge>
										<Badge variant="destructive">Overdue</Badge>
									</div>
								</div>
							</div>
						</Section>

						<Section
							id="empty-state"
							title="Empty state"
							description="Placeholder when filters return no results."
						>
							<div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-12 text-center">
								<Search className="h-10 w-10 text-muted-foreground/50" />
								<p className="mt-4 font-medium text-foreground">No results found</p>
								<p className="mt-1 text-sm text-muted-foreground">
									Try adjusting your search or filters.
								</p>
								<Button
									variant="outline"
									size="sm"
									className="mt-4"
									onClick={() => toast.info("Filters cleared (demo)")}
								>
									Clear filters
								</Button>
							</div>
						</Section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UiShowcase;
