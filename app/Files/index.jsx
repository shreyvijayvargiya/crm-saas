import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
	Upload,
	FileText,
	Image,
	Video,
	File,
	Folder,
	Star,
	MoreVertical,
	ArrowRight,
	ChevronRight,
} from "lucide-react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";
import { ResponsiveContainer } from "@/components/ui/responsive-chart";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	FILE_CATEGORIES,
	FILE_FOLDERS,
	STORAGE_SUMMARY,
	MONTHLY_TRANSFER,
	CATEGORY_OPTIONS,
	FOLDER_OPTIONS,
} from "./filesSeedData";
import { useFiles } from "./FilesContext";

const CATEGORY_ICONS = {
	documents: FileText,
	images: Image,
	videos: Video,
	others: File,
};

const CATEGORY_STYLES = {
	blue: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
	green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
	red: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
	yellow: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const TYPE_ICONS = {
	docx: FileText,
	pdf: FileText,
	png: Image,
	jpg: Image,
	mp4: Video,
	zip: File,
};

function ProgressBar({ percent, className }) {
	return (
		<div className={cn("h-2 w-full overflow-hidden rounded-full bg-muted", className)}>
			<div
				className="h-full rounded-full bg-foreground transition-all"
				style={{ width: `${Math.min(100, percent)}%` }}
			/>
		</div>
	);
}

const Files = () => {
	const router = useRouter();
	const { colors } = useTheme();
	const { files, addFile } = useFiles();
	const [uploadOpen, setUploadOpen] = useState(false);
	const [uploadForm, setUploadForm] = useState({
		name: "",
		category: "documents",
		folder: "Documents",
	});

	const recentFiles = useMemo(
		() => [...files].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 8),
		[files]
	);

	const storagePct = Math.round(
		(STORAGE_SUMMARY.usedGb / STORAGE_SUMMARY.totalGb) * 100
	);

	const handleUpload = () => {
		if (!uploadForm.name.trim()) {
			toast.error("File name is required.");
			return;
		}
		const ext = uploadForm.name.split(".").pop()?.toLowerCase() || "file";
		const newFile = {
			id: `file_${String(files.length + 1).padStart(3, "0")}`,
			name: uploadForm.name.trim(),
			size: "1.0 MB",
			sizeBytes: 1048576,
			category: uploadForm.category,
			folder: uploadForm.folder,
			type: ext,
			uploadDate: new Date().toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}),
			uploadedBy: "You",
			description: "Uploaded via file manager.",
		};
		addFile(newFile);
		toast.success(`Uploaded ${newFile.name}`);
		setUploadOpen(false);
		setUploadForm({ name: "", category: "documents", folder: "Documents" });
	};

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div>
					<h1 className="text-2xl font-semibold text-foreground">File Manager</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Storage overview, folders, and recent uploads — click a file to view details.
					</p>
				</div>
				<Button onClick={() => setUploadOpen(true)}>
					<Upload className="h-4 w-4" />
					Upload
				</Button>
			</div>

			{/* Category cards */}
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{FILE_CATEGORIES.map((cat) => {
					const Icon = CATEGORY_ICONS[cat.id] ?? File;
					return (
						<Card key={cat.id}>
							<CardContent className="space-y-4 p-6">
								<div className="flex items-start justify-between">
									<div
										className={cn(
											"flex h-10 w-10 items-center justify-center rounded-xl",
											CATEGORY_STYLES[cat.color]
										)}
									>
										<Icon className="h-5 w-5" />
									</div>
									<span className="text-2xl font-bold tabular-nums text-foreground">
										{cat.count.toLocaleString()}
									</span>
								</div>
								<div>
									<p className="font-medium text-foreground">{cat.label}</p>
									<p className="text-xs text-muted-foreground">{cat.usedLabel}</p>
								</div>
								<div className="space-y-1">
									<ProgressBar percent={cat.percent} />
									<div className="flex items-center justify-between text-xs text-muted-foreground">
										<span>{cat.percent}%</span>
										<button
											type="button"
											className="inline-flex items-center gap-0.5 hover:text-foreground"
											onClick={() => toast.info(`Filter by ${cat.label} — wire to list view.`)}
										>
											View more
											<ArrowRight className="h-3 w-3" />
										</button>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Folders + storage */}
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
				{FILE_FOLDERS.map((folder) => (
					<Card key={folder.id}>
						<CardContent className="p-5">
							<div className="flex items-start justify-between">
								<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
									<Folder className="h-5 w-5 text-muted-foreground" />
								</div>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon" className="h-8 w-8">
											<MoreVertical className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem onClick={() => toast.info("Rename folder (demo)")}>
											Rename
										</DropdownMenuItem>
										<DropdownMenuItem onClick={() => toast.info("Share folder (demo)")}>
											Share
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							<p className="mt-3 font-medium text-foreground">{folder.name}</p>
							<p className="text-sm text-muted-foreground">
								{folder.itemCount.toLocaleString()} items
							</p>
							<div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
								<span>Last update {folder.lastUpdate}</span>
								<Star
									className={cn(
										"h-4 w-4",
										folder.starred
											? "fill-amber-400 text-amber-400"
											: "text-muted-foreground/40"
									)}
								/>
							</div>
						</CardContent>
					</Card>
				))}

				<Card className="lg:col-span-1">
					<CardContent className="flex h-full flex-col justify-center p-6">
						<p className="font-medium text-foreground">{STORAGE_SUMMARY.label}</p>
						<p className="text-sm text-muted-foreground">{STORAGE_SUMMARY.subtitle}</p>
						<div className="mt-4 flex items-end justify-between">
							<p className="text-2xl font-bold text-foreground">
								{STORAGE_SUMMARY.usedGb} GB used
							</p>
							<p className="text-sm text-muted-foreground">
								{STORAGE_SUMMARY.totalGb} GB total
							</p>
						</div>
						<ProgressBar percent={storagePct} className="mt-4 h-3" />
					</CardContent>
				</Card>
			</div>

			{/* Chart + table */}
			<div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div>
							<CardTitle className="text-lg">Monthly file transfer</CardTitle>
							<p className="text-xs text-muted-foreground">31 May 2026 – 27 Jun 2026</p>
						</div>
					</CardHeader>
					<CardContent>
						<div className="h-64 w-full">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={MONTHLY_TRANSFER} barGap={2}>
									<CartesianGrid strokeDasharray="3 3" className="stroke-border" />
									<XAxis dataKey="month" tick={{ fontSize: 11 }} />
									<YAxis tick={{ fontSize: 11 }} />
									<Tooltip
										contentStyle={{
											background: "hsl(var(--card))",
											border: "1px solid hsl(var(--border))",
											borderRadius: 8,
										}}
									/>
									<Legend />
									<Bar
										dataKey="desktop"
										name="Desktop"
										stackId="a"
										fill="hsl(var(--foreground))"
										radius={[0, 0, 0, 0]}
									/>
									<Bar
										dataKey="mobile"
										name="Mobile"
										stackId="a"
										fill="hsl(var(--muted-foreground))"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
						<CardTitle className="text-lg">Recently uploaded files</CardTitle>
						<Button
							variant="ghost"
							size="sm"
							className="gap-1 text-muted-foreground"
							onClick={() => toast.info("Full file list — extend with pagination.")}
						>
							View All
							<ChevronRight className="h-4 w-4" />
						</Button>
					</CardHeader>
					<CardContent className="p-0 pb-2">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Name</TableHead>
									<TableHead>Size</TableHead>
									<TableHead>Upload Date</TableHead>
									<TableHead className="w-10" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{recentFiles.map((file) => {
									const Icon = TYPE_ICONS[file.type] ?? File;
									return (
										<TableRow
											key={file.id}
											className="cursor-pointer"
											onClick={() => router.push(`/files/${file.id}`)}
										>
											<TableCell>
												<div className="flex items-center gap-3">
													<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
														<Icon className="h-4 w-4 text-muted-foreground" />
													</div>
													<span className="font-medium text-foreground">{file.name}</span>
												</div>
											</TableCell>
											<TableCell className="text-muted-foreground">{file.size}</TableCell>
											<TableCell className="text-muted-foreground">
												{file.uploadDate}
											</TableCell>
											<TableCell onClick={(e) => e.stopPropagation()}>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button variant="ghost" size="icon" className="h-8 w-8">
															<MoreVertical className="h-4 w-4" />
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem
															onClick={() => router.push(`/files/${file.id}`)}
														>
															Open
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={() => toast.success(`Download ${file.name} (demo)`)}
														>
															Download
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>

			<FormModal
				open={uploadOpen}
				onClose={() => setUploadOpen(false)}
				title="Upload file"
				subtitle="Add a file to your workspace storage (demo — wire to your object store)."
				onSubmit={handleUpload}
				saveLabel="Upload"
			>
				<FormField label="File name" htmlFor="file-name" required>
					<Input
						id="file-name"
						placeholder="report-q2.pdf"
						value={uploadForm.name}
						onChange={(e) =>
							setUploadForm((f) => ({ ...f, name: e.target.value }))
						}
					/>
				</FormField>
				<FormField label="Category" htmlFor="file-category">
					<FormSelect
						id="file-category"
						value={uploadForm.category}
						onChange={(e) =>
							setUploadForm((f) => ({ ...f, category: e.target.value }))
						}
						options={CATEGORY_OPTIONS.map((c) => ({
							value: c,
							label: c.charAt(0).toUpperCase() + c.slice(1),
						}))}
					/>
				</FormField>
				<FormField label="Folder" htmlFor="file-folder">
					<FormSelect
						id="file-folder"
						value={uploadForm.folder}
						onChange={(e) =>
							setUploadForm((f) => ({ ...f, folder: e.target.value }))
						}
						options={FOLDER_OPTIONS}
					/>
				</FormField>
				<FormField label="File" htmlFor="file-input" hint="Mock upload — no binary sent in demo.">
					<Input id="file-input" type="file" className="cursor-pointer" />
				</FormField>
			</FormModal>
		</div>
	);
};

export default Files;
