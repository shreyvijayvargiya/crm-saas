import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	Download,
	FileText,
	Image,
	Video,
	File,
	Folder,
	User,
	Calendar,
	Trash2,
} from "lucide-react";
import { toast } from "sonner";
import EntityDetailShell from "../CRM/EntityDetailShell";
import { useFiles } from "./FilesContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const TYPE_ICONS = {
	docx: FileText,
	pdf: FileText,
	png: Image,
	jpg: Image,
	mp4: Video,
	zip: File,
};

export default function FileDetail() {
	const router = useRouter();
	const { id } = router.query;
	const { getFile, hydrated } = useFiles();

	const file = useMemo(() => (id && hydrated ? getFile(id) : null), [id, getFile, hydrated]);

	if (!router.isReady || !hydrated) {
		return (
			<div className="p-6">
				<p className="text-muted-foreground">Loading…</p>
			</div>
		);
	}

	if (!file) {
		return (
			<div className="space-y-4 p-6">
				<p className="text-muted-foreground">File not found.</p>
				<Button variant="outline" asChild>
					<Link href="/files">Back to File Manager</Link>
				</Button>
			</div>
		);
	}

	const Icon = TYPE_ICONS[file.type] ?? File;

	const sidebar = (
		<Card>
			<CardContent className="space-y-4 p-6">
				<div className="flex flex-col items-center text-center">
					<div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
						<Icon className="h-8 w-8 text-muted-foreground" />
					</div>
					<p className="mt-3 break-all text-sm font-medium text-foreground">{file.name}</p>
					<Badge variant="secondary" className="mt-2 uppercase">
						{file.type}
					</Badge>
				</div>
				<ul className="space-y-3 border-t pt-4 text-sm">
					<li className="flex items-center gap-2 text-muted-foreground">
						<Folder className="h-4 w-4 shrink-0" />
						{file.folder}
					</li>
					<li className="flex items-center gap-2 text-muted-foreground">
						<User className="h-4 w-4 shrink-0" />
						{file.uploadedBy}
					</li>
					<li className="flex items-center gap-2 text-muted-foreground">
						<Calendar className="h-4 w-4 shrink-0" />
						{file.uploadDate}
					</li>
				</ul>
				<div className="space-y-2 border-t pt-4">
					<Button
						className="w-full"
						onClick={() => toast.success(`Downloading ${file.name} (demo)`)}
					>
						<Download className="h-4 w-4" />
						Download
					</Button>
					<Button
						variant="outline"
						className="w-full text-destructive hover:text-destructive"
						onClick={() => toast.info("Delete file — wire to your storage API.")}
					>
						<Trash2 className="h-4 w-4" />
						Delete
					</Button>
				</div>
			</CardContent>
		</Card>
	);

	return (
		<EntityDetailShell backHref="/files" backLabel="File Manager" sidebar={sidebar}>
			<Card>
				<CardHeader>
					<CardTitle>File details</CardTitle>
				</CardHeader>
				<CardContent className="space-y-6">
					<dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div>
							<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Size
							</dt>
							<dd className="mt-1 text-sm text-foreground">{file.size}</dd>
						</div>
						<div>
							<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Category
							</dt>
							<dd className="mt-1 capitalize text-sm text-foreground">{file.category}</dd>
						</div>
						<div>
							<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Folder
							</dt>
							<dd className="mt-1 text-sm text-foreground">{file.folder}</dd>
						</div>
						<div>
							<dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Uploaded by
							</dt>
							<dd className="mt-1 text-sm text-foreground">{file.uploadedBy}</dd>
						</div>
					</dl>
					<div>
						<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Description
						</p>
						<p className="mt-2 text-sm leading-relaxed text-foreground">{file.description}</p>
					</div>
					<div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
						<Icon className="mx-auto h-10 w-10 text-muted-foreground/50" />
						<p className="mt-2 text-sm text-muted-foreground">
							Preview unavailable in demo — connect S3, Cloudinary, or your CDN.
						</p>
					</div>
				</CardContent>
			</Card>
		</EntityDetailShell>
	);
}
