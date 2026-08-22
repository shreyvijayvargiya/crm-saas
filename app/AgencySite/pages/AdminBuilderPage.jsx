import React, { useMemo, useState } from "react";
import {
	ChevronDown,
	ChevronRight,
	Download,
	FileCode2,
	FolderTree,
	LayoutTemplate,
	Loader2,
	Pencil,
	Plus,
	Search,
	Sparkles,
	Trash2,
	X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import FormSelect from "@/lib/ui/FormSelect";
import AgencyShell from "../components/AgencyShell";
import SiteSeo, { BLUEPRINT_OG_IMAGE } from "@/components/seo/SiteSeo";
import { useAgencyTheme } from "../AgencyThemeContext";
import {
	ADMIN_BLOCK_TYPES,
	ADMIN_PAGE_CATALOG,
	buildAdminAst,
	createBlock,
	createId,
	createInitialAdminTree,
	createPageFromTemplate,
	findPage,
	hydrateAdminFormFromAi,
	removePageFromTree,
	updatePageInTree,
} from "../adminBuilderCatalog";

function PagePicker({ isLight, usedTemplateIds, onAdd }) {
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");

	const grouped = useMemo(() => {
		const q = query.trim().toLowerCase();
		const filtered = ADMIN_PAGE_CATALOG.filter((page) => {
			if (usedTemplateIds.has(page.id) && !q) return true;
			if (!q) return true;
			return (
				page.label.toLowerCase().includes(q) ||
				page.id.includes(q) ||
				page.section.toLowerCase().includes(q)
			);
		});
		return filtered.reduce((acc, page) => {
			if (!acc[page.section]) acc[page.section] = [];
			acc[page.section].push(page);
			return acc;
		}, {});
	}, [query, usedTemplateIds]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					className={cn(
						"w-full justify-between rounded-xl",
						isLight
							? "border-zinc-200 bg-white"
							: "border-zinc-700 bg-zinc-900"
					)}
				>
					<span className="flex items-center gap-2 text-sm">
						<Plus className="h-4 w-4" />
						Add CRM page
					</span>
					<ChevronDown className="h-4 w-4 opacity-60" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				align="start"
				className={cn(
					"w-[min(100vw-2rem,22rem)] overflow-hidden p-0",
					isLight ? "bg-white" : "bg-zinc-950"
				)}
			>
				<div
					className={cn(
						"border-b p-2",
						isLight ? "border-zinc-100" : "border-zinc-800"
					)}
				>
					<div className="relative">
						<Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
						<Input
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Search leads, cms, analytics…"
							className="h-9 rounded-lg pl-8 text-sm"
						/>
					</div>
				</div>
				<div className="max-h-72 overflow-y-auto p-1.5">
					{Object.entries(grouped).map(([section, pages]) => (
						<div key={section} className="mb-2">
							<p
								className={cn(
									"px-2 py-1 text-[10px] font-semibold uppercase tracking-wide",
									isLight ? "text-zinc-400" : "text-zinc-500"
								)}
							>
								{section}
							</p>
							{pages.map((page) => {
								const already = usedTemplateIds.has(page.id);
								return (
									<button
										key={page.id}
										type="button"
										disabled={already}
										onClick={() => {
											onAdd(page.id);
											setOpen(false);
											setQuery("");
										}}
										className={cn(
											"flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition",
											already
												? "cursor-not-allowed opacity-40"
												: isLight
													? "hover:bg-zinc-100"
													: "hover:bg-zinc-900"
										)}
									>
										<span>{page.label}</span>
										{already ? (
											<Badge variant="secondary" className="text-[10px]">
												Added
											</Badge>
										) : (
											<span
												className={cn(
													"text-[10px]",
													isLight ? "text-zinc-400" : "text-zinc-500"
												)}
											>
												{page.id}
											</span>
										)}
									</button>
								);
							})}
						</div>
					))}
					{Object.keys(grouped).length === 0 ? (
						<p className="p-4 text-center text-xs text-zinc-500">
							No pages match “{query}”
						</p>
					) : null}
				</div>
			</PopoverContent>
		</Popover>
	);
}

function PageTree({ pages, selectedId, isLight, onSelect, depth = 0 }) {
	return (
		<ul className={cn(depth === 0 ? "space-y-0.5" : "ml-3 space-y-0.5 border-l pl-2", isLight ? "border-zinc-200" : "border-zinc-800")}>
			{pages.map((page) => {
				const selected = page.id === selectedId;
				const hasChildren = page.children?.length > 0;
				return (
					<li key={page.id}>
						<button
							type="button"
							onClick={() => onSelect(page.id)}
							className={cn(
								"flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-sm transition",
								selected
									? isLight
										? "bg-zinc-900 text-white"
										: "bg-zinc-100 text-zinc-900"
									: isLight
										? "text-zinc-700 hover:bg-zinc-100"
										: "text-zinc-300 hover:bg-zinc-900"
							)}
						>
							{hasChildren ? (
								<ChevronDown className="h-3.5 w-3.5 shrink-0 opacity-70" />
							) : (
								<ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-40" />
							)}
							<FileCode2 className="h-3.5 w-3.5 shrink-0 opacity-70" />
							<span className="truncate">{page.label}</span>
						</button>
						{hasChildren ? (
							<PageTree
								pages={page.children}
								selectedId={selectedId}
								isLight={isLight}
								onSelect={onSelect}
								depth={depth + 1}
							/>
						) : null}
					</li>
				);
			})}
		</ul>
	);
}

function BlockEditor({ page, isLight, onChange }) {
	const updateBlocks = (blocks) => onChange({ ...page, blocks });

	const addBlock = (type) => {
		updateBlocks([...page.blocks, createBlock(type, page.label)]);
		toast.success(`Added ${type}`);
	};

	const removeBlock = (blockId) => {
		updateBlocks(page.blocks.filter((block) => block.id !== blockId));
	};

	const updateBlock = (blockId, patch) => {
		updateBlocks(
			page.blocks.map((block) =>
				block.id === blockId ? { ...block, ...patch } : block
			)
		);
	};

	const addColumn = (blockId) => {
		const block = page.blocks.find((entry) => entry.id === blockId);
		if (!block || block.type !== "table") return;
		updateBlock(blockId, {
			columns: [
				...block.columns,
				{ id: createId("col"), label: "New column", type: "text" },
			],
		});
	};

	const updateColumn = (blockId, columnId, patch) => {
		const block = page.blocks.find((entry) => entry.id === blockId);
		if (!block) return;
		updateBlock(blockId, {
			columns: block.columns.map((col) =>
				col.id === columnId ? { ...col, ...patch } : col
			),
		});
	};

	const removeColumn = (blockId, columnId) => {
		const block = page.blocks.find((entry) => entry.id === blockId);
		if (!block) return;
		updateBlock(blockId, {
			columns: block.columns.filter((col) => col.id !== columnId),
		});
	};

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between gap-2">
				<p
					className={cn(
						"text-xs font-semibold uppercase tracking-wide",
						isLight ? "text-zinc-500" : "text-zinc-400"
					)}
				>
					Page blocks
				</p>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button size="sm" className="h-8 rounded-full px-3 text-xs">
							<Plus className="mr-1 h-3.5 w-3.5" />
							Add component
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						<DropdownMenuLabel>CRM components</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{ADMIN_BLOCK_TYPES.map((block) => (
							<DropdownMenuItem
								key={block.id}
								onClick={() => addBlock(block.id)}
							>
								<div className="flex flex-col gap-0.5">
									<span className="font-medium">{block.label}</span>
									<span className="text-[11px] text-muted-foreground">
										{block.description}
									</span>
								</div>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{page.blocks.length === 0 ? (
				<p className={cn("text-xs", isLight ? "text-zinc-500" : "text-zinc-500")}>
					No components yet. Add stats, a toolbar, or a table.
				</p>
			) : null}

			{page.blocks.map((block) => (
				<Card
					key={block.id}
					className={cn(
						"overflow-hidden",
						isLight ? "border-zinc-200" : "border-zinc-800 bg-zinc-900/40"
					)}
				>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 px-3 py-2">
						<CardTitle className="text-xs font-semibold capitalize">
							{block.type}
							{block.type === "table" && block.name ? ` · ${block.name}` : ""}
						</CardTitle>
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7"
							onClick={() => removeBlock(block.id)}
							aria-label="Remove block"
						>
							<Trash2 className="h-3.5 w-3.5" />
						</Button>
					</CardHeader>
					<CardContent className="space-y-2 px-3 pb-3 pt-0">
						{block.type === "stats" ? (
							<div className="grid grid-cols-2 gap-2">
								{block.items.map((item, index) => (
									<div key={item.id} className="space-y-1">
										<Input
											value={item.label}
											onChange={(event) => {
												const items = block.items.map((entry, i) =>
													i === index
														? { ...entry, label: event.target.value }
														: entry
												);
												updateBlock(block.id, { items });
											}}
											className="h-8 text-xs"
											placeholder="Label"
										/>
										<Input
											value={item.value}
											onChange={(event) => {
												const items = block.items.map((entry, i) =>
													i === index
														? { ...entry, value: event.target.value }
														: entry
												);
												updateBlock(block.id, { items });
											}}
											className="h-8 text-xs"
											placeholder="Value"
										/>
									</div>
								))}
							</div>
						) : null}

						{block.type === "toolbar" ? (
							<div className="space-y-2">
								<Input
									value={block.searchPlaceholder}
									onChange={(event) =>
										updateBlock(block.id, {
											searchPlaceholder: event.target.value,
										})
									}
									className="h-8 text-xs"
									placeholder="Search placeholder"
								/>
								<Input
									value={(block.filters || []).join(", ")}
									onChange={(event) =>
										updateBlock(block.id, {
											filters: event.target.value
												.split(",")
												.map((part) => part.trim())
												.filter(Boolean),
										})
									}
									className="h-8 text-xs"
									placeholder="Filters: Status, Owner"
								/>
							</div>
						) : null}

						{block.type === "table" ? (
							<div className="space-y-2">
								<Input
									value={block.name}
									onChange={(event) =>
										updateBlock(block.id, { name: event.target.value })
									}
									className="h-8 text-xs"
									placeholder="Table name"
								/>
								<div className="space-y-1.5">
									{block.columns.map((column) => (
										<div key={column.id} className="flex items-center gap-1.5">
											<Input
												value={column.label}
												onChange={(event) =>
													updateColumn(block.id, column.id, {
														label: event.target.value,
													})
												}
												className="h-8 flex-1 text-xs"
											/>
											<FormSelect
												value={column.type}
												onValueChange={(value) =>
													updateColumn(block.id, column.id, { type: value })
												}
												options={[
													{ value: "text", label: "Text" },
													{ value: "badge", label: "Badge" },
													{ value: "number", label: "Number" },
													{ value: "date", label: "Date" },
												]}
												className="h-8 w-[6.5rem] text-xs"
											/>
											<Button
												variant="ghost"
												size="icon"
												className="h-8 w-8 shrink-0"
												onClick={() => removeColumn(block.id, column.id)}
											>
												<X className="h-3.5 w-3.5" />
											</Button>
										</div>
									))}
								</div>
								<Button
									variant="outline"
									size="sm"
									className="h-8 w-full rounded-lg text-xs"
									onClick={() => addColumn(block.id)}
								>
									<Plus className="mr-1 h-3.5 w-3.5" />
									Add column
								</Button>
							</div>
						) : null}

						{block.type === "chart" ? (
							<Input
								value={block.title}
								onChange={(event) =>
									updateBlock(block.id, { title: event.target.value })
								}
								className="h-8 text-xs"
								placeholder="Chart title"
							/>
						) : null}

						{block.type === "kanban" ? (
							<p
								className={cn(
									"text-[11px]",
									isLight ? "text-zinc-500" : "text-zinc-400"
								)}
							>
								{(block.columns || []).length} columns · sample cards in preview
							</p>
						) : null}
					</CardContent>
				</Card>
			))}
		</div>
	);
}

function CrmPreview({ page, isLight }) {
	if (!page) {
		return (
			<div
				className={cn(
					"flex h-full min-h-[28rem] items-center justify-center rounded-2xl border border-dashed p-8 text-center text-sm",
					isLight
						? "border-zinc-200 text-zinc-500"
						: "border-zinc-800 text-zinc-500"
				)}
			>
				Select a page in the tree to preview the CRM UI.
			</div>
		);
	}

	return (
		<div
			className={cn(
				"overflow-hidden rounded-2xl border shadow-sm",
				isLight
					? "border-zinc-200 bg-white"
					: "border-zinc-800 bg-zinc-950"
			)}
		>
			<div
				className={cn(
					"flex items-center justify-between border-b px-4 py-3",
					isLight ? "border-zinc-100 bg-zinc-50/80" : "border-zinc-800 bg-zinc-900/60"
				)}
			>
				<div>
					<p
						className={cn(
							"text-sm font-semibold",
							isLight ? "text-zinc-900" : "text-white"
						)}
					>
						{page.label}
					</p>
					<p className="text-[11px] text-zinc-500">
						/{page.templateId} · live CRM preview
					</p>
				</div>
				<Badge variant="outline" className="text-[10px]">
					Preview
				</Badge>
			</div>

			<div className="space-y-4 p-4">
				{page.blocks.map((block) => {
					if (block.type === "stats") {
						return (
							<div
								key={block.id}
								className="grid grid-cols-2 gap-2 sm:grid-cols-4"
							>
								{block.items.map((item) => (
									<Card
										key={item.id}
										className={cn(
											isLight ? "border-zinc-200" : "border-zinc-800 bg-zinc-900/50"
										)}
									>
										<CardContent className="p-3">
											<p className="text-[10px] uppercase tracking-wide text-zinc-500">
												{item.label}
											</p>
											<p
												className={cn(
													"mt-1 text-lg font-semibold",
													isLight ? "text-zinc-900" : "text-white"
												)}
											>
												{item.value}
											</p>
										</CardContent>
									</Card>
								))}
							</div>
						);
					}

					if (block.type === "toolbar") {
						return (
							<div
								key={block.id}
								className="flex flex-col gap-2 sm:flex-row sm:items-center"
							>
								<div className="relative flex-1">
									<Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
									<Input
										readOnly
										value=""
										placeholder={block.searchPlaceholder}
										className="h-9 rounded-xl pl-8 text-sm"
									/>
								</div>
								{(block.filters || []).map((filter) => (
									<FormSelect
										key={filter}
										value=""
										placeholder={filter}
										options={[
											{ value: "all", label: `All ${filter}` },
											{ value: "a", label: "Option A" },
										]}
										className="h-9 w-full rounded-xl sm:w-36"
									/>
								))}
							</div>
						);
					}

					if (block.type === "table") {
						return (
							<Card
								key={block.id}
								className={cn(
									"overflow-hidden",
									isLight ? "border-zinc-200" : "border-zinc-800"
								)}
							>
								<CardHeader className="px-4 py-3">
									<CardTitle className="text-sm">{block.name}</CardTitle>
								</CardHeader>
								<CardContent className="px-0 pb-0">
									<Table>
										<TableHeader>
											<TableRow>
												{block.columns.map((column) => (
													<TableHead key={column.id} className="text-xs">
														{column.label}
													</TableHead>
												))}
											</TableRow>
										</TableHeader>
										<TableBody>
											{(block.rows || []).map((row, rowIndex) => (
												<TableRow key={rowIndex}>
													{block.columns.map((column, colIndex) => {
														const keys = Object.keys(row);
														const value =
															row[column.id] ??
															row[keys[colIndex]] ??
															"—";
														return (
															<TableCell key={column.id} className="text-xs">
																{column.type === "badge" ? (
																	<Badge
																		variant="secondary"
																		className="text-[10px]"
																	>
																		{value}
																	</Badge>
																) : (
																	value
																)}
															</TableCell>
														);
													})}
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						);
					}

					if (block.type === "chart") {
						return (
							<Card
								key={block.id}
								className={cn(isLight ? "border-zinc-200" : "border-zinc-800")}
							>
								<CardHeader className="px-4 py-3">
									<CardTitle className="text-sm">{block.title}</CardTitle>
								</CardHeader>
								<CardContent className="px-4 pb-4">
									<div className="flex h-28 items-end gap-1.5">
										{(block.bars || []).map((height, index) => (
											<div
												key={index}
												className={cn(
													"flex-1 rounded-t",
													isLight ? "bg-zinc-900" : "bg-zinc-100"
												)}
												style={{ height: `${height}%` }}
											/>
										))}
									</div>
								</CardContent>
							</Card>
						);
					}

					if (block.type === "kanban") {
						return (
							<div
								key={block.id}
								className="grid grid-cols-1 gap-3 sm:grid-cols-3"
							>
								{(block.columns || []).map((column) => (
									<div
										key={column.id}
										className={cn(
											"rounded-xl border p-3",
											isLight
												? "border-zinc-200 bg-zinc-50"
												: "border-zinc-800 bg-zinc-900/50"
										)}
									>
										<p className="mb-2 text-xs font-semibold">{column.label}</p>
										<div className="space-y-2">
											{(column.cards || []).map((card) => (
												<div
													key={card}
													className={cn(
														"rounded-lg border px-2.5 py-2 text-xs",
														isLight
															? "border-zinc-200 bg-white"
															: "border-zinc-700 bg-zinc-950"
													)}
												>
													{card}
												</div>
											))}
										</div>
									</div>
								))}
							</div>
						);
					}

					return null;
				})}
			</div>
		</div>
	);
}

function AdminBuilderContent() {
	const { isLight } = useAgencyTheme();
	const [pages, setPages] = useState(() => createInitialAdminTree());
	const [selectedId, setSelectedId] = useState(() => pages[0]?.id || null);
	const [adminName, setAdminName] = useState("Notion Agencies CRM");
	const [aiPrompt, setAiPrompt] = useState(
		"CRM for Notion agencies managing 300 agencies — leads, deals, pipeline, invoices, and a CMS for case studies."
	);
	const [aiLoading, setAiLoading] = useState(false);
	const [aiNotice, setAiNotice] = useState("");

	const selectedPage = findPage(pages, selectedId);

	const usedTemplateIds = useMemo(() => {
		const ids = new Set();
		const walk = (list) => {
			list.forEach((page) => {
				ids.add(page.templateId);
				walk(page.children || []);
			});
		};
		walk(pages);
		return ids;
	}, [pages]);

	const buildWithAi = async () => {
		const prompt = aiPrompt.trim();
		if (prompt.length < 12) {
			toast.error("Describe your CRM in at least 12 characters.");
			return;
		}
		setAiLoading(true);
		setAiNotice("");
		try {
			const response = await fetch("/api/ai/admin-builder", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ prompt }),
			});
			const data = await response.json().catch(() => ({}));
			if (!response.ok) {
				throw new Error(data.error || "AI build failed");
			}
			const hydrated = hydrateAdminFormFromAi(data.form);
			if (!hydrated.pages.length) {
				throw new Error("AI returned an empty form.");
			}
			setPages(hydrated.pages);
			setSelectedId(hydrated.pages[0].id);
			setAdminName(hydrated.name);
			setAiNotice(
				hydrated.notice ||
					(hydrated.source === "ai"
						? "Form updated from OpenRouter JSON."
						: "Form filled from a local template.")
			);
			toast.success(
				`Built ${hydrated.pages.length} page${hydrated.pages.length === 1 ? "" : "s"} — preview updated`
			);
		} catch (error) {
			toast.error(error.message || "Could not build with AI");
		} finally {
			setAiLoading(false);
		}
	};

	const addPage = (templateId, parentId = null) => {
		const next = createPageFromTemplate(templateId);
		if (!next) return;
		if (!parentId) {
			setPages((current) => [...current, next]);
			setSelectedId(next.id);
			toast.success(`Added ${next.label}`);
			return;
		}
		setPages((current) =>
			updatePageInTree(current, parentId, (page) => ({
				...page,
				children: [...(page.children || []), next],
			}))
		);
		setSelectedId(next.id);
		toast.success(`Nested ${next.label}`);
	};

	const renameSelected = (label) => {
		if (!selectedId) return;
		setPages((current) =>
			updatePageInTree(current, selectedId, (page) => ({ ...page, label }))
		);
	};

	const deleteSelected = () => {
		if (!selectedId) return;
		const nextPages = removePageFromTree(pages, selectedId);
		setPages(nextPages);
		setSelectedId(nextPages[0]?.id || null);
		toast.message("Page removed");
	};

	const patchSelected = (nextPage) => {
		setPages((current) =>
			updatePageInTree(current, selectedId, () => nextPage)
		);
	};

	const downloadAst = () => {
		const ast = buildAdminAst(pages, { name: adminName });
		const blob = new Blob([JSON.stringify(ast, null, 2)], {
			type: "application/json",
		});
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = `${adminName.toLowerCase().replace(/\s+/g, "-")}-admin-ast.json`;
		anchor.click();
		URL.revokeObjectURL(url);
		toast.success("Downloaded admin AST — Next.js zip generation comes next");
	};

	return (
		<>
			<SiteSeo
				title="CRM Admin Builder – Compose pages & tables | SaaSCRM"
				description="Form-based CRM admin builder: pick pages, edit tables and stats, preview side by side, download the admin AST."
				path="/admin-builder"
				images={[BLUEPRINT_OG_IMAGE]}
			/>

			<header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="min-w-0 text-left">
					<Badge
						variant="outline"
						className={cn(
							"mb-3 gap-1.5",
							isLight
								? "border-zinc-300 bg-white text-zinc-700"
								: "border-zinc-700 bg-zinc-900 text-zinc-300"
						)}
					>
						<LayoutTemplate className="h-3.5 w-3.5" />
						Form builder · AI fills JSON only
					</Badge>
					<h1
						className={cn(
							"text-2xl font-bold tracking-tight sm:text-3xl",
							isLight ? "text-zinc-950" : "text-white"
						)}
					>
						CRM Admin Builder
					</h1>
					<p
						className={cn(
							"mt-2 max-w-xl text-sm leading-relaxed",
							isLight ? "text-zinc-600" : "text-zinc-400"
						)}
					>
						Describe your CRM, generate the form with AI, then tweak pages and
						tables — preview updates instantly on the right.
					</p>
				</div>
				<div className="flex shrink-0 flex-wrap items-center justify-end gap-2">
					<Input
						value={adminName}
						onChange={(event) => setAdminName(event.target.value)}
						className="h-10 w-full rounded-xl sm:w-52"
						placeholder="Admin name"
					/>
					<Button
						onClick={downloadAst}
						className={cn(
							"h-10 rounded-full px-4",
							isLight
								? "bg-zinc-900 text-white hover:bg-zinc-800"
								: "bg-zinc-100 text-zinc-900 hover:bg-white"
						)}
					>
						<Download className="mr-2 h-4 w-4" />
						Download AST
					</Button>
				</div>
			</header>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-5">
				{/* Form / tree */}
				<section
					className={cn(
						"space-y-4 rounded-2xl border p-4 lg:col-span-5",
						isLight
							? "border-zinc-200 bg-white/90"
							: "border-zinc-800 bg-zinc-950/70"
					)}
				>
					<div
						className={cn(
							"space-y-3 rounded-xl border p-3",
							isLight
								? "border-orange-100 bg-orange-50/40"
								: "border-orange-500/20 bg-orange-500/5"
						)}
					>
						<div className="flex items-center gap-2">
							<Sparkles
								className={cn(
									"h-4 w-4",
									isLight ? "text-orange-600" : "text-orange-400"
								)}
							/>
							<p className="text-sm font-semibold">Build with AI</p>
						</div>
						<p
							className={cn(
								"text-[11px] leading-relaxed",
								isLight ? "text-zinc-600" : "text-zinc-400"
							)}
						>
							OpenRouter returns form JSON only — pages, tables, columns, and
							stats — then this panel and the preview update.
						</p>
						<Textarea
							value={aiPrompt}
							onChange={(event) => setAiPrompt(event.target.value)}
							rows={3}
							disabled={aiLoading}
							placeholder="e.g. CRM for Notion agencies with leads, pipeline, invoices, and CMS…"
							className={cn(
								"min-h-[5.5rem] resize-y rounded-xl text-sm",
								isLight ? "bg-white" : "bg-zinc-950"
							)}
						/>
						<Button
							onClick={buildWithAi}
							disabled={aiLoading}
							className={cn(
								"w-full rounded-full",
								isLight
									? "bg-zinc-900 text-white hover:bg-zinc-800"
									: "bg-zinc-100 text-zinc-900 hover:bg-white"
							)}
						>
							{aiLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Generating form…
								</>
							) : (
								<>
									<Sparkles className="mr-2 h-4 w-4" />
									Build using AI
								</>
							)}
						</Button>
						{aiNotice ? (
							<p
								className={cn(
									"text-[11px]",
									isLight ? "text-zinc-600" : "text-zinc-400"
								)}
							>
								{aiNotice}
							</p>
						) : null}
					</div>

					<div>
						<div className="mb-2 flex items-center gap-2">
							<FolderTree className="h-4 w-4 text-zinc-500" />
							<p className="text-sm font-semibold">Pages</p>
						</div>
						<PagePicker
							isLight={isLight}
							usedTemplateIds={usedTemplateIds}
							onAdd={(templateId) => addPage(templateId)}
						/>
					</div>

					<div
						className={cn(
							"rounded-xl border p-2",
							isLight ? "border-zinc-100 bg-zinc-50/80" : "border-zinc-800 bg-zinc-900/40"
						)}
					>
						{pages.length === 0 ? (
							<p className="p-4 text-center text-xs text-zinc-500">
								Add your first page from the dropdown above.
							</p>
						) : (
							<PageTree
								pages={pages}
								selectedId={selectedId}
								isLight={isLight}
								onSelect={setSelectedId}
							/>
						)}
					</div>

					{selectedPage ? (
						<div
							className={cn(
								"space-y-3 border-t pt-4",
								isLight ? "border-zinc-100" : "border-zinc-800"
							)}
						>
							<div className="flex items-center gap-2">
								<Pencil className="h-3.5 w-3.5 text-zinc-500" />
								<p className="text-sm font-semibold">Edit page</p>
							</div>
							<div className="space-y-2">
								<label
									className={cn(
										"text-[11px] font-medium",
										isLight ? "text-zinc-500" : "text-zinc-400"
									)}
								>
									Display name
								</label>
								<Input
									value={selectedPage.label}
									onChange={(event) => renameSelected(event.target.value)}
									className="h-9 rounded-xl"
								/>
							</div>
							<div className="flex flex-wrap gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											className="h-8 rounded-full text-xs"
										>
											<Plus className="mr-1 h-3.5 w-3.5" />
											Nested page
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="start" className="max-h-64 w-52 overflow-y-auto">
										<DropdownMenuLabel>Add under {selectedPage.label}</DropdownMenuLabel>
										<DropdownMenuSeparator />
										{ADMIN_PAGE_CATALOG.filter(
											(page) => !usedTemplateIds.has(page.id)
										).map((page) => (
											<DropdownMenuItem
												key={page.id}
												onClick={() => addPage(page.id, selectedPage.id)}
											>
												{page.label}
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
								<Button
									variant="outline"
									size="sm"
									className="h-8 rounded-full text-xs text-red-600 hover:text-red-700"
									onClick={deleteSelected}
								>
									<Trash2 className="mr-1 h-3.5 w-3.5" />
									Remove
								</Button>
							</div>

							<BlockEditor
								page={selectedPage}
								isLight={isLight}
								onChange={patchSelected}
							/>
						</div>
					) : null}
				</section>

				{/* Preview */}
				<section className="lg:col-span-7">
					<div className="mb-2 flex items-center justify-between">
						<p
							className={cn(
								"text-sm font-semibold",
								isLight ? "text-zinc-800" : "text-zinc-200"
							)}
						>
							CRM preview
						</p>
						<p className="text-[11px] text-zinc-500">
							{pages.length} page{pages.length === 1 ? "" : "s"} in tree
						</p>
					</div>
					<CrmPreview page={selectedPage} isLight={isLight} />
				</section>
			</div>
		</>
	);
}

export default function AdminBuilderPage() {
	return (
		<AgencyShell wide>
			<AdminBuilderContent />
		</AgencyShell>
	);
}

AdminBuilderPage.disableLayout = true;
