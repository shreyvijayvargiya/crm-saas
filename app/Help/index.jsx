import React, { useMemo, useState } from "react";
import { BookOpen, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const FAQ_SECTIONS = [
	{
		id: "getting-started",
		title: "Getting started",
		articles: [
			{ id: "gs-1", q: "How do I invite team members?", a: "Go to Users or Teams, click Invite, and enter their email. They receive a link to join your workspace." },
			{ id: "gs-2", q: "Where is the CRM dashboard?", a: "Use the Dashboard link in the sidebar for KPIs, or Analytics for deeper charts." },
			{ id: "gs-3", q: "Can I change the accent color?", a: "Yes — open the theme customizer from the navbar to pick color schemes for the app shell." },
		],
	},
	{
		id: "crm",
		title: "CRM & sales",
		articles: [
			{ id: "crm-1", q: "How do pipelines work?", a: "Pipelines show deal stages. Drag cards between columns or open a deal for full detail." },
			{ id: "crm-2", q: "Importing leads", a: "Use Add Lead on the Leads page. For bulk CSV, wire the Import button to your backend." },
			{ id: "crm-3", q: "Linking contacts to companies", a: "Open a contact or company detail page and use the related records section." },
		],
	},
	{
		id: "developer",
		title: "Developer & API",
		articles: [
			{ id: "dev-1", q: "Where are API keys managed?", a: "Developer → API Keys. Create keys with scoped permissions and monitor usage in API Logs." },
			{ id: "dev-2", q: "Setting up webhooks", a: "Developer → Webhooks. Subscribe to events like lead.created and verify signatures with your secret." },
			{ id: "dev-3", q: "Schema reference", a: "See the About page for Zod, SQL, and data.json snapshots shipped with this template." },
		],
	},
	{
		id: "billing",
		title: "Billing & finance",
		articles: [
			{ id: "fin-1", q: "Creating invoices", a: "Finance → Invoices → New invoice. Add line items and send PDF via your mail integration." },
			{ id: "fin-2", q: "Recording payments", a: "Finance → Payments tracks customer payments and links to invoices when wired to your API." },
		],
	},
];

const Help = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [expanded, setExpanded] = useState("gs-1");

	const flatArticles = useMemo(
		() => FAQ_SECTIONS.flatMap((s) => s.articles.map((a) => ({ ...a, section: s.title }))),
		[]
	);

	const results = useMemo(() => {
		if (!searchTerm.trim()) return null;
		const q = searchTerm.toLowerCase();
		return flatArticles.filter(
			(a) => a.q.toLowerCase().includes(q) || a.a.toLowerCase().includes(q)
		);
	}, [searchTerm, flatArticles]);

	const active = flatArticles.find((a) => a.id === expanded);

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div>
				<h1 className="text-2xl font-semibold text-foreground">Help center</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					FAQs and guides for using this CRM template.
				</p>
			</div>

			<div className="relative max-w-xl">
				<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder="Search help articles…"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="pl-10"
				/>
			</div>

			{results ? (
				<Card>
					<CardHeader>
						<CardTitle className="text-base">
							{results.length} result{results.length !== 1 ? "s" : ""}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						{results.length === 0 ? (
							<p className="text-sm text-muted-foreground">No articles match your search.</p>
						) : (
							results.map((a) => (
								<button
									key={a.id}
									type="button"
									onClick={() => { setExpanded(a.id); setSearchTerm(""); }}
									className="flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors hover:bg-muted/50"
								>
									<div>
										<p className="font-medium text-foreground">{a.q}</p>
										<Badge variant="secondary" className="mt-1">{a.section}</Badge>
									</div>
									<ChevronRight className="h-4 w-4 text-muted-foreground" />
								</button>
							))
						)}
					</CardContent>
				</Card>
			) : (
				<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
					<div className="space-y-6 lg:col-span-1">
						{FAQ_SECTIONS.map((section) => (
							<Card key={section.id}>
								<CardHeader className="pb-2">
									<CardTitle className="flex items-center gap-2 text-sm">
										<BookOpen className="h-4 w-4" />
										{section.title}
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-1 p-2 pt-0">
									{section.articles.map((a) => (
										<button
											key={a.id}
											type="button"
											onClick={() => setExpanded(a.id)}
											className={cn(
												"w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
												expanded === a.id
													? "bg-primary text-primary-foreground"
													: "text-muted-foreground hover:bg-muted hover:text-foreground"
											)}
										>
											{a.q}
										</button>
									))}
								</CardContent>
							</Card>
						))}
					</div>
					<Card className="lg:col-span-2">
						<CardHeader>
							<CardTitle>{active?.q}</CardTitle>
							{active && <Badge variant="outline">{active.section}</Badge>}
						</CardHeader>
						<CardContent>
							<p className="text-sm leading-relaxed text-foreground">{active?.a}</p>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
};

export default Help;
