import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronRight,
	File,
	Folder,
	FolderPlus,
	FilePlus,
	RefreshCcw,
	ChevronsDownUp,
	Trash2,
	Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

let nid = 20;
const nextId = () => `n${nid++}`;

const SEED = [
	{
		id: "root",
		name: "Workspace",
		type: "folder",
		children: [
			{
				id: "docs",
				name: "Documents",
				type: "folder",
				children: [
					{ id: "brief", name: "Brand brief", type: "file" },
					{ id: "notes", name: "Meeting notes", type: "file" },
				],
			},
			{
				id: "media",
				name: "Media",
				type: "folder",
				children: [
					{
						id: "shots",
						name: "Product shots",
						type: "folder",
						children: [{ id: "hero", name: "Hero still", type: "file" }],
					},
					{ id: "reel", name: "Launch reel", type: "file" },
				],
			},
			{
				id: "ops",
				name: "Operations",
				type: "folder",
				children: [
					{ id: "invoice", name: "Invoice August", type: "file" },
					{ id: "vendors", name: "Vendors", type: "file" },
				],
			},
			{ id: "readme", name: "Read me", type: "file" },
		],
	},
];

function cloneTree(nodes) {
	return nodes.map((n) => ({
		...n,
		children: n.children ? cloneTree(n.children) : undefined,
	}));
}

function filterTree(nodes, pred) {
	return nodes
		.map((n) => {
			if (n.type === "folder") {
				const children = filterTree(n.children || [], pred);
				if (!pred(n) && children.length === 0) return null;
				return { ...n, children };
			}
			return pred(n) ? n : null;
		})
		.filter(Boolean);
}

function findParentId(nodes, id, parentId = null) {
	for (const n of nodes) {
		if (n.id === id) return parentId;
		if (n.children) {
			const hit = findParentId(n.children, id, n.id);
			if (hit !== undefined) return hit;
		}
	}
	return undefined;
}

function removeNode(nodes, id) {
	return nodes
		.filter((n) => n.id !== id)
		.map((n) => (n.children ? { ...n, children: removeNode(n.children, id) } : n));
}

function insertChild(nodes, parentId, child) {
	return nodes.map((n) => {
		if (n.id === parentId && n.type === "folder") {
			return { ...n, children: [...(n.children || []), child] };
		}
		if (n.children) return { ...n, children: insertChild(n.children, parentId, child) };
		return n;
	});
}

function findNode(nodes, id) {
	for (const n of nodes) {
		if (n.id === id) return n;
		if (n.children) {
			const hit = findNode(n.children, id);
			if (hit) return hit;
		}
	}
	return null;
}

function collectFolderIds(nodes, acc = []) {
	nodes.forEach((n) => {
		if (n.type === "folder") {
			acc.push(n.id);
			collectFolderIds(n.children || [], acc);
		}
	});
	return acc;
}

function IconBtn({ isLight, label, onClick, children }) {
	return (
		<button
			type="button"
			aria-label={label}
			onClick={onClick}
			className={cn(
				"flex h-8 w-8 items-center justify-center rounded-full transition",
				isLight
					? "text-zinc-500 hover:bg-white hover:text-zinc-900 hover:shadow-sm"
					: "text-zinc-400 hover:bg-zinc-800 hover:text-white"
			)}
		>
			{children}
		</button>
	);
}

function DraftRow({ depth, type, value, onChange, onCommit, onCancel, isLight }) {
	const ref = useRef(null);
	const skipBlur = useRef(false);
	useEffect(() => {
		ref.current?.focus();
		ref.current?.select();
	}, []);

	return (
		<li>
			<div
				className="flex items-center gap-2 rounded-xl py-1.5 pr-2"
				style={{ paddingLeft: 10 + depth * 16 }}
			>
				<span className="w-3.5 shrink-0" />
				<span
					className={cn(
						"flex h-6 w-6 shrink-0 items-center justify-center rounded-lg",
						type === "folder"
							? isLight
								? "bg-amber-50 text-amber-500"
								: "bg-amber-500/15 text-amber-400"
							: isLight
								? "bg-zinc-100 text-zinc-400"
								: "bg-zinc-800 text-zinc-500"
					)}
				>
					{type === "folder" ? <Folder className="h-3.5 w-3.5" /> : <File className="h-3.5 w-3.5" />}
				</span>
				<input
					ref={ref}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					onKeyDown={(e) => {
						e.stopPropagation();
						if (e.key === "Enter") {
							skipBlur.current = true;
							onCommit();
						}
						if (e.key === "Escape") {
							skipBlur.current = true;
							onCancel();
						}
					}}
					onBlur={() => {
						if (skipBlur.current) {
							skipBlur.current = false;
							return;
						}
						onCommit();
					}}
					placeholder={type === "folder" ? "Folder name" : "File name"}
					className={cn(
						"min-w-0 flex-1 rounded-lg px-2 py-1 text-[13px] font-medium tracking-tight outline-none ring-1 ring-violet-400/80",
						isLight ? "bg-white text-zinc-900" : "bg-zinc-900 text-zinc-100"
					)}
				/>
			</div>
		</li>
	);
}

function TreeRow({
	node,
	depth,
	open,
	selectedId,
	onToggle,
	onSelect,
	onDelete,
	onCreate,
	draft,
	onDraftChange,
	onDraftCommit,
	onDraftCancel,
	isLight,
}) {
	const isFolder = node.type === "folder";
	const expanded = open.has(node.id);
	const selected = selectedId === node.id;
	const showKids =
		isFolder && expanded && ((node.children && node.children.length > 0) || draft?.parentId === node.id);

	return (
		<li>
			<div
				role="button"
				tabIndex={0}
				onClick={() => {
					onSelect(node.id);
					if (isFolder) onToggle(node.id);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						onSelect(node.id);
						if (isFolder) onToggle(node.id);
					}
				}}
				className={cn(
					"group flex items-center gap-2 rounded-xl py-1.5 pr-2 text-[13px] font-medium tracking-tight transition",
					selected
						? isLight
							? "bg-violet-50 text-zinc-900 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.18)]"
							: "bg-violet-500/15 text-white shadow-[inset_0_0_0_1px_rgba(167,139,250,0.28)]"
						: isLight
							? "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900"
							: "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100"
				)}
				style={{ paddingLeft: 10 + depth * 16 }}
			>
				{isFolder ? (
					<ChevronRight
						className={cn(
							"h-3.5 w-3.5 shrink-0 transition-transform duration-200",
							isLight ? "text-zinc-400" : "text-zinc-500",
							expanded && "rotate-90"
						)}
					/>
				) : (
					<span className="w-3.5 shrink-0" />
				)}

				<span
					className={cn(
						"flex h-6 w-6 shrink-0 items-center justify-center rounded-lg",
						isFolder
							? selected
								? isLight
									? "bg-violet-100 text-violet-600"
									: "bg-violet-500/25 text-violet-300"
								: isLight
									? "bg-amber-50 text-amber-500"
									: "bg-amber-500/15 text-amber-400"
							: isLight
								? "bg-zinc-100 text-zinc-400"
								: "bg-zinc-800 text-zinc-500"
					)}
				>
					{isFolder ? <Folder className="h-3.5 w-3.5" /> : <File className="h-3.5 w-3.5" />}
				</span>

				<span className="min-w-0 flex-1 truncate">{node.name}</span>

				<span className="flex items-center gap-0.5 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">
					{isFolder ? (
						<>
							<button
								type="button"
								className={cn(
									"rounded-lg p-1",
									isLight ? "text-zinc-400 hover:bg-white hover:text-zinc-800" : "text-zinc-500 hover:bg-zinc-700 hover:text-white"
								)}
								aria-label="New file"
								onClick={(e) => {
									e.stopPropagation();
									onCreate(node.id, "file");
								}}
							>
								<FilePlus className="h-3.5 w-3.5" />
							</button>
							<button
								type="button"
								className={cn(
									"rounded-lg p-1",
									isLight ? "text-zinc-400 hover:bg-white hover:text-zinc-800" : "text-zinc-500 hover:bg-zinc-700 hover:text-white"
								)}
								aria-label="New folder"
								onClick={(e) => {
									e.stopPropagation();
									onCreate(node.id, "folder");
								}}
							>
								<FolderPlus className="h-3.5 w-3.5" />
							</button>
						</>
					) : null}
					{node.id !== "root" ? (
						<button
							type="button"
							className={cn(
								"rounded-lg p-1",
								isLight ? "text-zinc-400 hover:bg-white hover:text-rose-600" : "text-zinc-500 hover:bg-zinc-700 hover:text-rose-400"
							)}
							aria-label="Delete"
							onClick={(e) => {
								e.stopPropagation();
								onDelete(node.id);
							}}
						>
							<Trash2 className="h-3.5 w-3.5" />
						</button>
					) : null}
				</span>
			</div>

			<AnimatePresence initial={false}>
				{showKids ? (
					<motion.ul
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
						className="overflow-hidden"
					>
						{(node.children || []).map((child) => (
							<TreeRow
								key={child.id}
								node={child}
								depth={depth + 1}
								open={open}
								selectedId={selectedId}
								onToggle={onToggle}
								onSelect={onSelect}
								onDelete={onDelete}
								onCreate={onCreate}
								draft={draft}
								onDraftChange={onDraftChange}
								onDraftCommit={onDraftCommit}
								onDraftCancel={onDraftCancel}
								isLight={isLight}
							/>
						))}
						{draft?.parentId === node.id ? (
							<DraftRow
								depth={depth + 1}
								type={draft.type}
								value={draft.name}
								onChange={onDraftChange}
								onCommit={onDraftCommit}
								onCancel={onDraftCancel}
								isLight={isLight}
							/>
						) : null}
					</motion.ul>
				) : null}
			</AnimatePresence>
		</li>
	);
}

/**
 * HeroDirectoryTree — copy-paste ready nested folder/file explorer.
 * Create, delete, collapse all. Not code-specific.
 */
export default function HeroDirectoryTree({ isLight = true, className }) {
	const [tree, setTree] = useState(() => cloneTree(SEED));
	const [open, setOpen] = useState(() => new Set(collectFolderIds(SEED)));
	const [selectedId, setSelectedId] = useState("docs");
	const [query, setQuery] = useState("");
	const [draft, setDraft] = useState(null);

	const visible = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return tree;
		const match = (n) => n.name.toLowerCase().includes(q);
		return filterTree(tree, match);
	}, [tree, query]);

	const selected = findNode(tree, selectedId);

	const toggle = (id) => {
		setOpen((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};

	const collapseAll = () => setOpen(new Set(["root"]));
	const expandAll = () => setOpen(new Set(collectFolderIds(tree)));

	const startCreate = (parentId, type) => {
		const parent = findNode(tree, parentId);
		if (!parent || parent.type !== "folder") return;
		setOpen((prev) => new Set([...prev, parentId]));
		setDraft({
			parentId,
			type,
			name: type === "folder" ? "New folder" : "New item",
		});
	};

	const createAtSelection = (type) => {
		const node = findNode(tree, selectedId);
		if (node?.type === "folder") {
			startCreate(node.id, type);
			return;
		}
		startCreate(findParentId(tree, selectedId) || "root", type);
	};

	const commitDraft = () => {
		if (!draft) return;
		const name = draft.name.trim();
		if (!name) {
			setDraft(null);
			return;
		}
		const child = {
			id: nextId(),
			name,
			type: draft.type,
			children: draft.type === "folder" ? [] : undefined,
		};
		setTree((prev) => insertChild(prev, draft.parentId, child));
		setSelectedId(child.id);
		setDraft(null);
	};

	const onDelete = (id) => {
		if (id === "root") return;
		setTree((prev) => removeNode(prev, id));
		if (selectedId === id) setSelectedId("root");
	};

	return (
		<section
			className={cn("flex w-full items-center justify-center px-4 py-10 sm:py-14", className)}
			aria-label="Directory tree"
		>
			<div
				className={cn(
					"relative w-full max-w-md overflow-hidden rounded-[1.75rem] shadow-[0_20px_50px_-24px_rgba(15,23,42,0.35)]",
					isLight ? "bg-white ring-1 ring-zinc-200/80" : "bg-zinc-950 ring-1 ring-zinc-800"
				)}
			>
				<div className="flex items-start justify-between gap-3 px-5 pt-5">
					<div>
						<p
							className={cn(
								"text-[11px] font-semibold uppercase tracking-[0.16em]",
								isLight ? "text-zinc-400" : "text-zinc-500"
							)}
						>
							Explorer
						</p>
						<h3
							className={cn(
								"mt-0.5 text-lg font-semibold tracking-tight",
								isLight ? "text-zinc-900" : "text-white"
							)}
						>
							Workspace
						</h3>
					</div>
					<div
						className={cn(
							"flex items-center gap-0.5 rounded-full p-1",
							isLight ? "bg-zinc-100 text-zinc-500" : "bg-zinc-900 text-zinc-400"
						)}
					>
						<IconBtn isLight={isLight} label="New file" onClick={() => createAtSelection("file")}>
							<FilePlus className="h-3.5 w-3.5" />
						</IconBtn>
						<IconBtn isLight={isLight} label="New folder" onClick={() => createAtSelection("folder")}>
							<FolderPlus className="h-3.5 w-3.5" />
						</IconBtn>
						<IconBtn
							isLight={isLight}
							label="Refresh"
							onClick={() => {
								setTree(cloneTree(SEED));
								setOpen(new Set(collectFolderIds(SEED)));
								setSelectedId("docs");
								setDraft(null);
							}}
						>
							<RefreshCcw className="h-3.5 w-3.5" />
						</IconBtn>
						<IconBtn isLight={isLight} label="Collapse all" onClick={collapseAll}>
							<ChevronsDownUp className="h-3.5 w-3.5" />
						</IconBtn>
					</div>
				</div>

				<div className="px-5 pt-4">
					<label
						className={cn(
							"flex items-center gap-2 rounded-2xl px-3 py-2 text-sm ring-1 transition focus-within:ring-violet-400/70",
							isLight
								? "bg-zinc-50 text-zinc-500 ring-zinc-200"
								: "bg-zinc-900 text-zinc-500 ring-zinc-800"
						)}
					>
						<Search className="h-3.5 w-3.5 shrink-0" />
						<input
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder="Filter folders & files"
							className={cn(
								"w-full bg-transparent text-[13px] outline-none",
								isLight ? "text-zinc-900 placeholder:text-zinc-400" : "text-zinc-100 placeholder:text-zinc-600"
							)}
						/>
					</label>
				</div>

				<div className="max-h-[26rem] overflow-auto px-3 py-3">
					<ul className="space-y-0.5">
						{visible.map((node) => (
							<TreeRow
								key={node.id}
								node={node}
								depth={0}
								open={open}
								selectedId={selectedId}
								onToggle={toggle}
								onSelect={setSelectedId}
								onDelete={onDelete}
								onCreate={startCreate}
								draft={draft}
								onDraftChange={(name) => setDraft((d) => (d ? { ...d, name } : d))}
								onDraftCommit={commitDraft}
								onDraftCancel={() => setDraft(null)}
								isLight={isLight}
							/>
						))}
					</ul>
				</div>

				<div
					className={cn(
						"flex items-center justify-between gap-3 border-t px-5 py-3",
						isLight ? "border-zinc-100" : "border-zinc-800/80"
					)}
				>
					<span
						className={cn(
							"inline-flex min-w-0 items-center gap-2 truncate rounded-full px-2.5 py-1 text-[11px] font-medium",
							isLight ? "bg-zinc-100 text-zinc-600" : "bg-zinc-900 text-zinc-400"
						)}
					>
						<span
							className={cn(
								"h-1.5 w-1.5 shrink-0 rounded-full",
								selected?.type === "folder" ? "bg-violet-500" : "bg-zinc-400"
							)}
						/>
						<span className="truncate">
							{selected ? selected.name : "Nothing selected"}
						</span>
					</span>
					<button
						type="button"
						onClick={expandAll}
						className={cn(
							"shrink-0 text-[11px] font-medium tracking-tight",
							isLight ? "text-zinc-400 hover:text-violet-600" : "text-zinc-500 hover:text-violet-300"
						)}
					>
						Expand all
					</button>
				</div>
			</div>
		</section>
	);
}
