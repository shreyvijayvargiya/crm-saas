import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
	ArrowLeft,
	Calendar,
	CheckCircle2,
	Clock,
	Eye,
	Pencil,
	Save,
	Tag,
	User,
	X,
} from "lucide-react";
import { toast } from "sonner";
import { useCms } from "./CmsContext";
import { CmsField, CmsMetaRow } from "./CmsField";
import { BLOG_CATEGORIES, BLOG_STATUSES } from "./cmsSeedData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormSelect from "../../lib/ui/FormSelect";

const emptyDraft = {
	title: "",
	author: "",
	category: "Technology",
	status: "Draft",
	publishDate: "",
	content: "",
	excerpt: "",
	tags: "",
	featuredImage: "",
	views: 0,
	likes: 0,
};

function formatDate(dateString) {
	if (!dateString) return "Not published";
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function statusBadgeVariant(status) {
	if (status === "Published") return "default";
	if (status === "Draft") return "secondary";
	return "outline";
}

export default function BlogDetail() {
	const router = useRouter();
	const { id } = router.query;
	const { blogs, updateBlog } = useCms();
	const blog = useMemo(
		() => (id ? blogs.find((b) => b.id === Number(id)) ?? null : null),
		[blogs, id]
	);

	const [isEditing, setIsEditing] = useState(false);
	const [draft, setDraft] = useState(emptyDraft);

	useEffect(() => {
		if (!blog) return;
		setDraft({
			...blog,
			tags: blog.tags.join(", "),
		});
	}, [blog]);

	if (!router.isReady) {
		return (
			<div className="p-6">
				<p className="text-muted-foreground">Loading…</p>
			</div>
		);
	}

	if (!blog) {
		return (
			<div className="p-6 space-y-4">
				<p className="text-muted-foreground">Blog post not found.</p>
				<Button variant="outline" asChild>
					<Link href="/cms">Back to CMS</Link>
				</Button>
			</div>
		);
	}

	const setField = (name, value) =>
		setDraft((prev) => ({ ...prev, [name]: value }));

	const handleCancel = () => {
		setDraft({ ...blog, tags: blog.tags.join(", ") });
		setIsEditing(false);
	};

	const handleSave = () => {
		if (!draft.title.trim() || !draft.content.trim() || !draft.author.trim()) {
			toast.error("Title, author, and content are required.");
			return;
		}

		const tags = draft.tags
			.split(",")
			.map((t) => t.trim())
			.filter(Boolean);

		updateBlog(blog.id, {
			title: draft.title.trim(),
			author: draft.author.trim(),
			category: draft.category,
			status: draft.status,
			publishDate: draft.publishDate,
			content: draft.content.trim(),
			excerpt: draft.excerpt.trim(),
			featuredImage: draft.featuredImage.trim(),
			tags,
			views: Number(draft.views) || 0,
			likes: Number(draft.likes) || 0,
		});

		toast.success("Blog post updated.");
		setIsEditing(false);
	};

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-3">
					<Button variant="outline" size="icon" asChild>
						<Link href="/cms" aria-label="Back to CMS">
							<ArrowLeft className="h-4 w-4" />
						</Link>
					</Button>
					<div>
						<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
							Blog post
						</p>
						<h1 className="text-2xl font-semibold text-foreground">
							{isEditing ? "Edit blog" : blog.title}
						</h1>
					</div>
				</div>
				<div className="flex items-center gap-2">
					{isEditing ? (
						<>
							<Button variant="outline" onClick={handleCancel}>
								<X className="h-4 w-4" />
								Cancel
							</Button>
							<Button onClick={handleSave}>
								<Save className="h-4 w-4" />
								Save changes
							</Button>
						</>
					) : (
						<Button onClick={() => setIsEditing(true)}>
							<Pencil className="h-4 w-4" />
							Edit
						</Button>
					)}
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle className="text-base text-foreground">
							{isEditing ? "Content" : "Article"}
						</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{isEditing ? (
							<>
								<CmsField label="Title" htmlFor="blog-title" required>
									<Input
										id="blog-title"
										value={draft.title}
										onChange={(e) => setField("title", e.target.value)}
									/>
								</CmsField>
								<CmsField label="Excerpt" htmlFor="blog-excerpt">
									<Textarea
										id="blog-excerpt"
										value={draft.excerpt}
										onChange={(e) => setField("excerpt", e.target.value)}
										rows={3}
									/>
								</CmsField>
								<CmsField label="Content" htmlFor="blog-content" required>
									<Textarea
										id="blog-content"
										value={draft.content}
										onChange={(e) => setField("content", e.target.value)}
										rows={12}
										className="min-h-64"
									/>
								</CmsField>
								<CmsField label="Featured image URL" htmlFor="blog-image">
									<Input
										id="blog-image"
										type="url"
										value={draft.featuredImage}
										onChange={(e) => setField("featuredImage", e.target.value)}
										placeholder="https://example.com/image.jpg"
									/>
								</CmsField>
							</>
						) : (
							<>
								{draft.excerpt && (
									<p className="text-sm text-muted-foreground">{blog.excerpt}</p>
								)}
								<div className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
									{blog.content}
								</div>
							</>
						)}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle className="text-base text-foreground">Details</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{isEditing ? (
							<>
								<CmsField label="Author" htmlFor="blog-author" required>
									<Input
										id="blog-author"
										value={draft.author}
										onChange={(e) => setField("author", e.target.value)}
									/>
								</CmsField>
								<CmsField label="Category" htmlFor="blog-category">
									<FormSelect
										id="blog-category"
										value={draft.category}
										onChange={(e) => setField("category", e.target.value)}
										options={BLOG_CATEGORIES}
									/>
								</CmsField>
								<CmsField label="Status" htmlFor="blog-status">
									<FormSelect
										id="blog-status"
										value={draft.status}
										onChange={(e) => setField("status", e.target.value)}
										options={BLOG_STATUSES}
									/>
								</CmsField>
								<CmsField label="Publish date" htmlFor="blog-date">
									<Input
										id="blog-date"
										type="date"
										value={draft.publishDate}
										onChange={(e) => setField("publishDate", e.target.value)}
									/>
								</CmsField>
								<CmsField label="Tags" htmlFor="blog-tags" hint="Comma separated">
									<Input
										id="blog-tags"
										value={draft.tags}
										onChange={(e) => setField("tags", e.target.value)}
									/>
								</CmsField>
								<div className="grid grid-cols-2 gap-3">
									<CmsField label="Views" htmlFor="blog-views">
										<Input
											id="blog-views"
											type="number"
											min={0}
											value={draft.views}
											onChange={(e) => setField("views", e.target.value)}
										/>
									</CmsField>
									<CmsField label="Likes" htmlFor="blog-likes">
										<Input
											id="blog-likes"
											type="number"
											min={0}
											value={draft.likes}
											onChange={(e) => setField("likes", e.target.value)}
										/>
									</CmsField>
								</div>
							</>
						) : (
							<>
								<div className="flex items-center gap-2">
									<Badge variant={statusBadgeVariant(blog.status)}>
										{blog.status === "Published" ? (
											<CheckCircle2 className="mr-1 h-3 w-3" />
										) : (
											<Clock className="mr-1 h-3 w-3" />
										)}
										{blog.status}
									</Badge>
								</div>
								<CmsMetaRow
									label="Author"
									value={
										<span className="inline-flex items-center gap-2">
											<User className="h-4 w-4 text-muted-foreground" />
											{blog.author}
										</span>
									}
								/>
								<CmsMetaRow label="Category" value={blog.category} />
								<CmsMetaRow
									label="Published"
									value={
										<span className="inline-flex items-center gap-2">
											<Calendar className="h-4 w-4 text-muted-foreground" />
											{formatDate(blog.publishDate)}
										</span>
									}
								/>
								<CmsMetaRow
									label="Engagement"
									value={
										<span className="inline-flex items-center gap-3">
											<span className="inline-flex items-center gap-1">
												<Eye className="h-4 w-4 text-muted-foreground" />
												{blog.views.toLocaleString()}
											</span>
											<span>{blog.likes} likes</span>
										</span>
									}
								/>
								<div className="space-y-2">
									<p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
										Tags
									</p>
									<div className="flex flex-wrap gap-2">
										{blog.tags.map((tag) => (
											<Badge key={tag} variant="secondary">
												<Tag className="mr-1 h-3 w-3" />
												{tag}
											</Badge>
										))}
									</div>
								</div>
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
