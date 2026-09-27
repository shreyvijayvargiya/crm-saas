import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
	ArrowRight,
	Bot,
	Check,
	CheckCircle2,
	Clock3,
	Code2,
	Copy,
	Download,
	ExternalLink,
	FileCode2,
	Folder,
	Layers3,
	Loader2,
	Mail,
	PackageOpen,
	Rocket,
	Sparkles,
	Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import AgencyShell from "../components/AgencyShell";
import { useAgencyTheme } from "../AgencyThemeContext";
import { GITHUB_REPO } from "../agencyConfig";
import SiteSeo, { BLUEPRINT_OG_IMAGE } from "@/components/seo/SiteSeo";

const BUSINESS_TYPES = [
	"SaaS",
	"Agency",
	"Real estate",
	"Recruiting",
	"E-commerce",
	"Customer success",
	"Custom",
];

const MODULES = [
	"Leads",
	"Contacts",
	"Companies",
	"Deals",
	"Pipeline",
	"Tasks",
	"Calendar",
	"Email",
	"Analytics",
	"Invoices",
	"Payments",
	"Subscriptions",
	"Support",
	"Marketing",
	"Content scheduler",
	"Files",
	"Projects",
	"E-commerce",
	"CMS",
	"Teams & roles",
	"Developer tools",
];

const INITIAL_FORM = {
	businessType: "SaaS",
	teamSize: "2–10",
	backend: "Not decided",
	design: "Use current design",
	launch: "MVP",
	modules: ["Leads", "Contacts", "Deals", "Pipeline", "Tasks", "Analytics"],
	goal: "",
	specialRequirements: "",
};

const RESULT_TABS = [
	{ id: "overview", label: "Overview" },
	{ id: "pages", label: "Pages" },
	{ id: "stack", label: "Stack" },
	{ id: "timeline", label: "Timeline" },
	{ id: "prompts", label: "Cursor prompts" },
	{ id: "build", label: "Build CRM" },
];

function FieldLabel({ children, htmlFor, isLight }) {
	return (
		<label
			htmlFor={htmlFor}
			className={cn(
				"block text-xs font-semibold",
				isLight ? "text-zinc-700" : "text-zinc-300"
			)}
		>
			{children}
		</label>
	);
}

function SelectField({ id, label, value, onChange, options, isLight }) {
	return (
		<div className="space-y-1.5">
			<FieldLabel htmlFor={id} isLight={isLight}>
				{label}
			</FieldLabel>
			<Select
				value={value}
				onValueChange={onChange}
			>
				<SelectTrigger
					id={id}
					className={cn(
						"h-10 rounded-xl",
						isLight
							? "border-zinc-200 bg-white text-zinc-900"
							: "border-zinc-700 bg-zinc-950 text-zinc-100"
					)}
				>
					<SelectValue placeholder={`Select ${label.toLowerCase()}`} />
				</SelectTrigger>
				<SelectContent
					className={cn(
						isLight
							? "border-zinc-200 bg-white text-zinc-900"
							: "border-zinc-700 bg-zinc-950 text-zinc-100"
					)}
				>
					{options.map((option) => (
						<SelectItem
							key={option}
							value={option}
							className={cn(
								isLight
									? "focus:bg-zinc-100 focus:text-zinc-900"
									: "focus:bg-zinc-800 focus:text-zinc-100"
							)}
						>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}

function ModuleList({ title, items, included, isLight }) {
	return (
		<div>
			<div className="mb-3 flex items-center gap-2">
				<span
					className={cn(
						"flex h-7 w-7 items-center justify-center rounded-lg",
						included
							? isLight
								? "bg-emerald-100 text-emerald-700"
								: "bg-emerald-500/15 text-emerald-300"
							: isLight
								? "bg-violet-100 text-violet-700"
								: "bg-violet-500/15 text-violet-300"
					)}
				>
					{included ? (
						<Check className="h-3.5 w-3.5" />
					) : (
						<Wand2 className="h-3.5 w-3.5" />
					)}
				</span>
				<h3
					className={cn(
						"text-sm font-semibold",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					{title}
				</h3>
				<Badge
					variant="outline"
					className={cn(
						"ml-auto",
						isLight
							? "border-zinc-200 text-zinc-600"
							: "border-zinc-700 text-zinc-400"
					)}
				>
					{items.length}
				</Badge>
			</div>
			<div className="space-y-2">
				{items.map((item) => (
					<div
						key={item.name}
						className={cn(
							"rounded-xl border p-3",
							isLight
								? "border-zinc-200 bg-white"
								: "border-zinc-800 bg-zinc-950/60"
						)}
					>
						<p
							className={cn(
								"text-sm font-medium",
								isLight ? "text-zinc-900" : "text-zinc-100"
							)}
						>
							{item.name}
						</p>
						<p
							className={cn(
								"mt-1 text-xs leading-relaxed",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							{item.reason}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

function createFileTree(files) {
	const root = [];
	for (const path of Object.keys(files || {}).sort()) {
		let level = root;
		const parts = path.split("/");
		parts.forEach((part, index) => {
			const isFile = index === parts.length - 1;
			let node = level.find((item) => item.name === part);
			if (!node) {
				node = {
					name: part,
					path,
					type: isFile ? "file" : "folder",
					children: [],
				};
				level.push(node);
			}
			level = node.children;
		});
	}
	return root;
}

function FileTree({ nodes, depth = 0 }) {
	return nodes.map((node) => (
		<div key={`${node.type}-${node.path}-${node.name}`}>
			<div
				className="flex items-center gap-2 py-1 text-xs text-zinc-800"
				style={{ paddingLeft: depth * 16 }}
			>
				{node.type === "folder" ? (
					<Folder className="h-3.5 w-3.5 shrink-0 text-zinc-800" />
				) : (
					<FileCode2 className="h-3.5 w-3.5 shrink-0 text-blue-800" />
				)}
				<span className={node.type === "folder" ? "font-semibold" : ""}>
					{node.name}
				</span>
			</div>
			{node.children.length ? (
				<FileTree nodes={node.children} depth={depth + 1} />
			) : null}
		</div>
	));
}

function BlueprintResults({
	blueprint,
	plannerInput,
	activeTab,
	setActiveTab,
	isLight,
}) {
	const [copiedPrompt, setCopiedPrompt] = useState(null);
	const [buildStatus, setBuildStatus] = useState("idle");
	const [buildError, setBuildError] = useState("");
	const [starter, setStarter] = useState(null);

	const copyPrompt = async (prompt, index) => {
		try {
			await navigator.clipboard.writeText(prompt);
			setCopiedPrompt(index);
			setTimeout(() => setCopiedPrompt(null), 1600);
		} catch {
			setCopiedPrompt(null);
		}
	};

	const generateStarter = async () => {
		if (buildStatus === "loading") return;
		setBuildStatus("loading");
		setBuildError("");
		try {
			const response = await fetch("/api/ai/build-crm", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(plannerInput),
			});
			const data = await response.json().catch(() => ({}));
			if (!response.ok) {
				throw new Error(data.error || "Unable to build the CRM starter.");
			}
			setStarter(data);
			setBuildStatus("success");
		} catch (requestError) {
			setBuildStatus("error");
			setBuildError(
				requestError?.message || "Unable to build the CRM starter."
			);
		}
	};

	const downloadStarter = async () => {
		if (!starter?.files) return;
		const JSZip = (await import("jszip")).default;
		const zip = new JSZip();
		const root = zip.folder(starter.ast.project.slug);
		Object.entries(starter.files).forEach(([path, content]) => {
			root.file(path, content);
		});
		root.file("crm-ast.json", JSON.stringify(starter.ast, null, 2));
		const blob = await zip.generateAsync({ type: "blob" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `${starter.ast.project.slug}.zip`;
		document.body.appendChild(anchor);
		anchor.click();
		anchor.remove();
		URL.revokeObjectURL(url);
	};

	const founderMailHref = `mailto:shreyvijayvargiya26@gmail.com?subject=${encodeURIComponent(
		`Help me build ${starter?.ast?.project?.name || blueprint.title}`
	)}&body=${encodeURIComponent(
		`Hi Shrey,\n\nI used the free SaaSCRM builder for: ${blueprint.summary}\n\nI would like help turning this starter into a production CRM.\n`
	)}`;
	const fileTree = createFileTree(starter?.files);

	return (
		<Card
			className={cn(
				"overflow-hidden border-2",
				isLight
					? "border-violet-200 bg-white shadow-xl shadow-violet-100/60"
					: "border-violet-500/30 bg-zinc-900/70 shadow-2xl shadow-black/30"
			)}
		>
			<div
				className={cn(
					"border-b p-5 sm:p-6",
					isLight
						? "border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50"
						: "border-violet-500/20 bg-gradient-to-br from-violet-950/50 via-zinc-900 to-blue-950/30"
				)}
			>
				<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
					<div className="min-w-0">
						<div className="mb-2 flex flex-wrap items-center gap-2">
							<Badge className="gap-1.5 border-0 bg-violet-600 text-white hover:bg-violet-600">
								<Sparkles className="h-3 w-3" />
								{blueprint.source === "ai" ? "AI-generated blueprint" : "Smart blueprint"}
							</Badge>
							<Badge
								variant="outline"
								className={cn(
									isLight
										? "border-zinc-200 bg-white/80 text-zinc-700"
										: "border-zinc-700 bg-zinc-950/50 text-zinc-300"
								)}
							>
								{blueprint.complexity}
							</Badge>
						</div>
						<h2
							className={cn(
								"text-xl font-bold tracking-tight sm:text-2xl",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							{blueprint.title}
						</h2>
						<p
							className={cn(
								"mt-2 max-w-2xl text-sm leading-relaxed",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							{blueprint.summary}
						</p>
					</div>
					<div
						className={cn(
							"flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3",
							isLight
								? "border-emerald-200 bg-emerald-50"
								: "border-emerald-500/25 bg-emerald-500/10"
						)}
					>
						<div>
							<p
								className={cn(
									"text-2xl font-bold tabular-nums",
									isLight ? "text-emerald-700" : "text-emerald-300"
								)}
							>
								{blueprint.matchPercent}%
							</p>
							<p
								className={cn(
									"text-[10px] font-semibold uppercase tracking-wide",
									isLight ? "text-emerald-700/70" : "text-emerald-300/70"
								)}
							>
								Template match
							</p>
						</div>
						<CheckCircle2
							className={cn(
								"h-7 w-7",
								isLight ? "text-emerald-600" : "text-emerald-400"
							)}
						/>
					</div>
				</div>
				
			</div>

			<div
				className={cn(
					"overflow-x-auto border-b p-2",
					isLight ? "border-zinc-200" : "border-zinc-800"
				)}
			>
				<div className="flex min-w-max gap-1">
					{RESULT_TABS.map((tab) => (
						<button
							key={tab.id}
							type="button"
							onClick={() => setActiveTab(tab.id)}
							className={cn(
								"rounded-lg px-3 py-2 text-xs font-semibold transition",
								activeTab === tab.id
									? isLight
										? "bg-zinc-900 text-white"
										: "bg-zinc-100 text-zinc-900"
									: isLight
										? "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
										: "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
							)}
						>
							{tab.label}
						</button>
					))}
				</div>
			</div>

			<div className="p-4 sm:p-6">
				{activeTab === "overview" ? (
					<div className="space-y-5">
						<div className="grid gap-3 sm:grid-cols-2">
							{[
								["Already included", `${blueprint.includedModules.length} matching modules`, CheckCircle2],
								["Custom work", `${blueprint.customModules.length} specialized modules`, Wand2],
								["Frontend estimate", blueprint.timeline.frontend, Layers3],
								["Production estimate", blueprint.timeline.production, Rocket],
							].map(([label, value, Icon]) => (
								<div
									key={label}
									className={cn(
										"rounded-xl border p-4",
										isLight
											? "border-zinc-200 bg-zinc-50"
											: "border-zinc-800 bg-zinc-950/60"
									)}
								>
									<Icon
										className={cn(
											"h-4 w-4",
											isLight ? "text-violet-600" : "text-violet-400"
										)}
									/>
									<p
										className={cn(
											"mt-3 text-[10px] font-semibold uppercase tracking-wide",
											isLight ? "text-zinc-500" : "text-zinc-500"
										)}
									>
										{label}
									</p>
									<p
										className={cn(
											"mt-1 text-sm font-semibold",
											isLight ? "text-zinc-900" : "text-zinc-100"
										)}
									>
										{value}
									</p>
								</div>
							))}
						</div>
						<div>
							<h3
								className={cn(
									"text-sm font-semibold",
									isLight ? "text-zinc-900" : "text-white"
								)}
							>
								Recommendations
							</h3>
							<ul className="mt-3 space-y-2">
								{blueprint.recommendations.map((item) => (
									<li
										key={item}
										className={cn(
											"flex items-start gap-2 text-sm",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										<Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				) : null}

				{activeTab === "pages" ? (
					<div className="grid gap-6 sm:grid-cols-2">
						<ModuleList
							title="Already in the template"
							items={blueprint.includedModules}
							included
							isLight={isLight}
						/>
						<ModuleList
							title="Build or customize"
							items={blueprint.customModules}
							isLight={isLight}
						/>
					</div>
				) : null}

				{activeTab === "stack" ? (
					<div className="grid gap-3 sm:grid-cols-2">
						{blueprint.stack.map((item) => (
							<div
								key={`${item.name}-${item.role}`}
								className={cn(
									"flex items-start gap-3 rounded-xl border p-4",
									isLight
										? "border-zinc-200 bg-white"
										: "border-zinc-800 bg-zinc-950/60"
								)}
							>
								<span
									className={cn(
										"flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
										isLight
											? "bg-blue-50 text-blue-600"
											: "bg-blue-500/10 text-blue-400"
									)}
								>
									<Code2 className="h-4 w-4" />
								</span>
								<div>
									<p
										className={cn(
											"text-sm font-semibold",
											isLight ? "text-zinc-900" : "text-zinc-100"
										)}
									>
										{item.name}
									</p>
									<p
										className={cn(
											"mt-1 text-xs leading-relaxed",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										{item.role}
									</p>
								</div>
							</div>
						))}
					</div>
				) : null}

				{activeTab === "timeline" ? (
					<div>
						<div className="grid gap-3 sm:grid-cols-4">
							{[
								["Prototype", blueprint.timeline.prototype],
								["Frontend", blueprint.timeline.frontend],
								["Backend", blueprint.timeline.backend],
								["Production", blueprint.timeline.production],
							].map(([label, value]) => (
								<div
									key={label}
									className={cn(
										"rounded-xl border p-3 text-center",
										isLight
											? "border-zinc-200 bg-zinc-50"
											: "border-zinc-800 bg-zinc-950/60"
									)}
								>
									<Clock3
										className={cn(
											"mx-auto h-4 w-4",
											isLight ? "text-violet-600" : "text-violet-400"
										)}
									/>
									<p
										className={cn(
											"mt-2 text-[10px] font-semibold uppercase tracking-wide",
											isLight ? "text-zinc-500" : "text-zinc-500"
										)}
									>
										{label}
									</p>
									<p
										className={cn(
											"mt-1 text-sm font-semibold",
											isLight ? "text-zinc-900" : "text-zinc-100"
										)}
									>
										{value}
									</p>
								</div>
							))}
						</div>
						<div className="mt-6 space-y-3">
							{blueprint.phases.map((phase, index) => (
								<div
									key={`${phase.name}-${index}`}
									className={cn(
										"flex gap-3 rounded-xl border p-4",
										isLight ? "border-zinc-200" : "border-zinc-800"
									)}
								>
									<span
										className={cn(
											"flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
											isLight
												? "bg-zinc-900 text-white"
												: "bg-zinc-100 text-zinc-900"
										)}
									>
										{index + 1}
									</span>
									<div className="min-w-0 flex-1">
										<div className="flex flex-wrap items-center justify-between gap-2">
											<p
												className={cn(
													"text-sm font-semibold",
													isLight ? "text-zinc-900" : "text-zinc-100"
												)}
											>
												{phase.name}
											</p>
											<Badge variant="outline">{phase.duration}</Badge>
										</div>
										<p
											className={cn(
												"mt-2 text-xs leading-relaxed",
												isLight ? "text-zinc-600" : "text-zinc-400"
											)}
										>
											{phase.tasks.join(" · ")}
										</p>
									</div>
								</div>
							))}
						</div>
						<p
							className={cn(
								"mt-4 text-xs leading-relaxed",
								isLight ? "text-zinc-500" : "text-zinc-500"
							)}
						>
							Estimate assumptions: {blueprint.timeline.assumptions}
						</p>
					</div>
				) : null}

				{activeTab === "prompts" ? (
					<div className="space-y-3">
						<div className="mb-4">
							<h3
								className={cn(
									"text-sm font-semibold",
									isLight ? "text-zinc-900" : "text-white"
								)}
							>
								Continue in Cursor
							</h3>
							<p
								className={cn(
									"mt-1 text-xs",
									isLight ? "text-zinc-600" : "text-zinc-400"
								)}
							>
								These prompts are tailored to the project rules included with
								the template.
							</p>
						</div>
						{blueprint.prompts.map((item, index) => (
							<div
								key={`${item.title}-${index}`}
								className={cn(
									"rounded-xl border p-4",
									isLight
										? "border-zinc-200 bg-zinc-50"
										: "border-zinc-800 bg-zinc-950/70"
								)}
							>
								<div className="flex items-center justify-between gap-3">
									<p
										className={cn(
											"text-sm font-semibold",
											isLight ? "text-zinc-900" : "text-zinc-100"
										)}
									>
										{item.title}
									</p>
									<Button
										type="button"
										variant="outline"
										size="sm"
										className="h-8 shrink-0 gap-1.5 text-xs"
										onClick={() => copyPrompt(item.prompt, index)}
									>
										{copiedPrompt === index ? (
											<>
												<Check className="h-3.5 w-3.5" />
												Copied
											</>
										) : (
											<>
												<Copy className="h-3.5 w-3.5" />
												Copy
											</>
										)}
									</Button>
								</div>
								<p
									className={cn(
										"mt-3 font-mono text-xs leading-relaxed",
										isLight ? "text-zinc-700" : "text-zinc-300"
									)}
								>
									<span className="mr-2 text-violet-500">›</span>
									{item.prompt}
								</p>
							</div>
						))}
					</div>
				) : null}

				{activeTab === "build" ? (
					<div className="space-y-5">
						<div
							className={cn(
								""
							)}
						>
							<div className="flex items-start gap-3">
								<span
									className={cn(
										"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
										isLight
											? "text-zinc-700"
											: "text-zinc-300"
									)}
								>
									<PackageOpen className="h-5 w-5" />
								</span>
								<div>
									<h3
										className={cn(
											"text-base font-bold",
											isLight ? "text-zinc-900" : "text-white"
										)}
									>
										Build a free CRM starter
									</h3>
									<p
										className={cn(
											"mt-1 text-xs leading-relaxed",
											isLight ? "text-zinc-600" : "text-zinc-400"
										)}
									>
										AI creates only a constrained frontend code boilerplate. Trusted
										templates then compile it into a small Next.js starter repository
										with navigation, dashboard cards, searchable tables, seed
										data, and an optional GET API stub.
									</p>
								</div>
							</div>

							{!starter ? (
								<Button
									type="button"
									onClick={generateStarter}
									disabled={buildStatus === "loading"}
									className="mt-5 w-full bg-zinc-600 text-white hover:bg-zinc-700"
								>
									{buildStatus === "loading" ? (
										<>
											<Loader2 className="h-4 w-4 animate-spin" />
											Creating safe AST and starter…
										</>
									) : (
										<>
											<Code2 className="h-4 w-4" />
											Generate free starter repository
										</>
									)}
								</Button>
							) : null}

							{buildError ? (
								<p
									className={cn(
										"mt-4 rounded-lg border px-3 py-2 text-xs",
										isLight
											? "border-red-200 bg-red-50 text-red-700"
											: "border-red-500/25 bg-red-500/10 text-red-300"
									)}
								>
									{buildError}
								</p>
							) : null}
						</div>

						{starter ? (
							<>
								
								<div className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50">
									<div className="max-h-80 overflow-auto p-4 font-mono">
										<div className="mb-1 flex items-center gap-2 text-xs font-bold">
											<Folder className="h-4 w-4 text-zinc-700" />
											{starter.ast.project.slug}
										</div>
										<FileTree nodes={fileTree} depth={1} />
										<div className="flex items-center gap-2 py-1 pl-4 text-xs text-zinc-700">
											<FileCode2 className="h-3.5 w-3.5 text-violet-400" />
											crm-ast.json
										</div>
									</div>
								</div>

								<Button
									type="button"
									onClick={downloadStarter}
									className="w-full bg-zinc-600 text-white hover:bg-zinc-700"
								>
									<Download className="h-4 w-4" />
									Download {starter.ast.project.slug}.zip
								</Button>
							</>
						) : null}

						<div
							className={cn(
								"rounded-2xl border p-5 text-center",
								isLight
									? "border-zinc-200 bg-gradient-to-br from-zinc-50 to-white"
									: "border-zinc-500/25 bg-gradient-to-br from-zinc-950/40 to-zinc-900"
							)}
						>
							<h3
								className={cn(
									"text-base font-bold",
									isLight ? "text-zinc-900" : "text-white"
								)}
							>
								Want this starter turned into a production CRM?
							</h3>
							<p
								className={cn(
									"mx-auto mt-2 max-w-lg text-xs leading-relaxed",
									isLight ? "text-zinc-600" : "text-zinc-400"
								)}
							>
								Talk directly with the founder about authentication, database
								integration, permissions, deployment, and custom workflows.
							</p>
							<Button
								asChild
								className="mt-4 bg-zinc-600 text-white hover:bg-zinc-700"
							>
								<a href={founderMailHref}>
									<Mail className="h-4 w-4" />
									Talk to founder
								</a>
							</Button>
							
						</div>
					</div>
				) : null}
			</div>
		</Card>
	);
}

function BlueprintContent() {
	const { isLight } = useAgencyTheme();
	const [form, setForm] = useState(INITIAL_FORM);
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState("");
	const [blueprint, setBlueprint] = useState(null);
	const [activeTab, setActiveTab] = useState("overview");
	const resultRef = useRef(null);

	const selectedCount = form.modules.length;
	const canSubmit = form.goal.trim().length >= 12 && selectedCount > 0;

	const inputClass = cn(
		isLight
			? "border-zinc-200 bg-white text-zinc-900"
			: "border-zinc-700 bg-zinc-950 text-zinc-100 placeholder:text-zinc-600"
	);

	const toggleModule = (name) => {
		setForm((current) => ({
			...current,
			modules: current.modules.includes(name)
				? current.modules.filter((item) => item !== name)
				: [...current.modules, name],
		}));
	};

	const submit = async (event) => {
		event.preventDefault();
		if (!canSubmit || status === "loading") return;
		setStatus("loading");
		setError("");
		setActiveTab("overview");

		try {
			const response = await fetch("/api/ai/blueprint", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form),
			});
			const data = await response.json().catch(() => ({}));
			if (!response.ok) {
				throw new Error(data.error || "Unable to generate your blueprint.");
			}
			setBlueprint(data.blueprint);
			setStatus("success");
			setTimeout(() => {
				resultRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
			}, 80);
		} catch (requestError) {
			setStatus("error");
			setError(
				requestError?.message ||
					"Unable to generate your blueprint. Please try again."
			);
		}
	};

	return (
		<>
			<motion.header
				initial={{ opacity: 0, y: 16 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45 }}
				className="mb-8 text-center sm:mb-10"
			>
				<Badge
					variant="outline"
					className={cn(
						"mb-4 gap-2 px-3 py-1 text-xs font-medium",
						isLight
							? "border-violet-200 bg-violet-50 text-violet-700"
							: "border-violet-500/30 bg-violet-500/10 text-violet-300"
					)}
				>
					<Bot className="h-3.5 w-3.5" />
					Free AI CRM planner
				</Badge>
				<h1
					className={cn(
						"text-3xl font-bold tracking-tight sm:text-4xl",
						isLight ? "text-zinc-900" : "text-white"
					)}
				>
					Plan your CRM in 2 minutes
				</h1>
				<p
					className={cn(
						"mx-auto mt-4 max-w-xl text-base leading-relaxed",
						isLight ? "text-zinc-600" : "text-zinc-400"
					)}
				>
					Get a page map, recommended stack, realistic timeline, and
					ready-to-use Cursor prompts—matched against the SaaSCRM template.
				</p>
				<div className="mt-4 flex flex-wrap items-center justify-center gap-2">
					{["No signup", "3 free plans / hour", "Powered by AI"].map(
						(item) => (
							<span
								key={item}
								className={cn(
									"inline-flex items-center gap-1.5 text-xs",
									isLight ? "text-zinc-500" : "text-zinc-500"
								)}
							>
								<Check className="h-3 w-3 text-emerald-500" />
								{item}
							</span>
						)
					)}
				</div>
			</motion.header>

			<motion.div
				initial={{ opacity: 0, y: 18 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.45, delay: 0.06 }}
			>
				<Card
					className={cn(
						"p-4 sm:p-6",
						isLight
							? "border-zinc-200 bg-white shadow-lg shadow-zinc-200/50"
							: "border-zinc-800 bg-zinc-900/60 shadow-2xl shadow-black/20"
					)}
				>
					<form onSubmit={submit} className="space-y-6">
						<div className="grid gap-4 sm:grid-cols-2">
							<SelectField
								id="blueprint-business"
								label="Business type"
								value={form.businessType}
								onChange={(value) =>
									setForm((current) => ({ ...current, businessType: value }))
								}
								options={BUSINESS_TYPES}
								isLight={isLight}
							/>
							<SelectField
								id="blueprint-team"
								label="Team size"
								value={form.teamSize}
								onChange={(value) =>
									setForm((current) => ({ ...current, teamSize: value }))
								}
								options={["Solo", "2–10", "11–50", "51+"]}
								isLight={isLight}
							/>
							<SelectField
								id="blueprint-backend"
								label="Backend plan"
								value={form.backend}
								onChange={(value) =>
									setForm((current) => ({ ...current, backend: value }))
								}
								options={[
									"Frontend prototype",
									"Supabase",
									"Firebase",
									"Existing API",
									"Not decided",
								]}
								isLight={isLight}
							/>
							<SelectField
								id="blueprint-launch"
								label="Target"
								value={form.launch}
								onChange={(value) =>
									setForm((current) => ({ ...current, launch: value }))
								}
								options={["Prototype", "MVP", "Production SaaS"]}
								isLight={isLight}
							/>
						</div>

						<SelectField
							id="blueprint-design"
							label="Design direction"
							value={form.design}
							onChange={(value) =>
								setForm((current) => ({ ...current, design: value }))
							}
							options={[
								"Use current design",
								"White-label rebrand",
								"Custom brand system",
							]}
							isLight={isLight}
						/>

						<div className="space-y-2">
							<div className="flex items-center justify-between gap-3">
								<FieldLabel isLight={isLight}>Features required</FieldLabel>
								<span
									className={cn(
										"text-[11px]",
										isLight ? "text-zinc-500" : "text-zinc-500"
									)}
								>
									{selectedCount} selected
								</span>
							</div>
							<div className="flex flex-wrap gap-2">
								{MODULES.map((name) => {
									const selected = form.modules.includes(name);
									return (
										<button
											key={name}
											type="button"
											onClick={() => toggleModule(name)}
											className={cn(
												"rounded-full border px-3 py-1.5 text-xs font-medium transition",
												selected
													? isLight
														? "border-violet-600 bg-violet-600 text-white"
														: "border-violet-400 bg-violet-500/20 text-violet-200"
													: isLight
														? "border-zinc-200 bg-zinc-50 text-zinc-600 hover:border-zinc-300"
														: "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-zinc-600"
											)}
											aria-pressed={selected}
										>
											{selected ? <Check className="mr-1 inline h-3 w-3" /> : null}
											{name}
										</button>
									);
								})}
							</div>
						</div>

						<div className="space-y-1.5">
							<FieldLabel htmlFor="blueprint-goal" isLight={isLight}>
								What are you building? *
							</FieldLabel>
							<Textarea
								id="blueprint-goal"
								value={form.goal}
								onChange={(event) =>
									setForm((current) => ({
										...current,
										goal: event.target.value,
									}))
								}
								rows={4}
								maxLength={700}
								placeholder="Example: A multi-tenant recruiting CRM for a 15-person agency that manages jobs, candidates, interviews, placements, and client billing."
								className={cn("min-h-[112px]", inputClass)}
								required
							/>
							<p
								className={cn(
									"text-right text-[10px]",
									isLight ? "text-zinc-400" : "text-zinc-600"
								)}
							>
								{form.goal.length}/700
							</p>
						</div>

						<div className="space-y-1.5">
							<FieldLabel htmlFor="blueprint-special" isLight={isLight}>
								Special requirements
							</FieldLabel>
							<Input
								id="blueprint-special"
								value={form.specialRequirements}
								onChange={(event) =>
									setForm((current) => ({
										...current,
										specialRequirements: event.target.value,
									}))
								}
								maxLength={500}
								placeholder="AI assistant, approval workflow, SSO, custom reports…"
								className={inputClass}
							/>
						</div>

						{error ? (
							<p
								className={cn(
									"rounded-xl border px-3 py-2.5 text-sm",
									isLight
										? "border-red-200 bg-red-50 text-red-700"
										: "border-red-500/25 bg-red-500/10 text-red-300"
								)}
							>
								{error}
							</p>
						) : null}

						<Button
							type="submit"
							disabled={!canSubmit || status === "loading"}
							className={cn(
								"w-full rounded-xl py-5",
								isLight
									? "bg-zinc-900 text-white hover:bg-zinc-800"
									: "bg-zinc-100 text-zinc-900 hover:bg-white"
							)}
						>
							{status === "loading" ? (
								<>
									<Loader2 className="h-4 w-4 animate-spin" />
									Planning your CRM…
								</>
							) : (
								<>
									<Sparkles className="h-4 w-4" />
									Generate free CRM blueprint
									<ArrowRight className="h-4 w-4" />
								</>
							)}
						</Button>
					</form>
				</Card>
			</motion.div>

			{blueprint ? (
				<motion.div
					ref={resultRef}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.45 }}
					className="scroll-mt-20 mt-10"
				>
					<BlueprintResults
						blueprint={blueprint}
						plannerInput={form}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						isLight={isLight}
					/>

					<div
						className={cn(
							"mt-4 rounded-2xl border p-5 text-center sm:p-6",
							isLight
								? "border-zinc-200 bg-white/80"
								: "border-zinc-800 bg-zinc-900/50"
						)}
					>
						<h2
							className={cn(
								"text-lg font-bold",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							Your foundation is already built.
						</h2>
						<p
							className={cn(
								"mx-auto mt-2 max-w-lg text-sm",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							Clone the open-source template on GitHub, use the generated Cursor
							prompts, and customize the remaining workflows.
						</p>
						<div className="mt-5 flex flex-wrap justify-center gap-3">
							<Button asChild>
								<a href={GITHUB_REPO.url} target="_blank" rel="noopener noreferrer">
									View on GitHub
									<ExternalLink className="h-4 w-4" />
								</a>
							</Button>
							<Button variant="outline" asChild>
								<Link href="/demo" passHref>
									<a>
										Explore matching pages
										<ArrowRight className="h-4 w-4" />
									</a>
								</Link>
							</Button>
						</div>
					</div>
				</motion.div>
			) : null}
		</>
	);
}

export default function BlueprintPage() {
	return (
		<AgencyShell>
			<SiteSeo
				title="AI CRM Builder – Plan your CRM in 2 minutes | SaaSCRM"
				description="Describe your business and get a CRM blueprint: modules, screens, and a build plan. Free AI planner for the SaaSCRM Next.js template."
				path="/blueprint"
				keywords="AI CRM builder, CRM planner, custom CRM blueprint, Next.js CRM generator, SaaSCRM builder"
				images={[BLUEPRINT_OG_IMAGE]}
			/>
			<BlueprintContent />
		</AgencyShell>
	);
}

BlueprintPage.disableLayout = true;
