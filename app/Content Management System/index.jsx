import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
	FileText,
	Eye,
	Plus,
	Search,
	ChevronLeft,
	ChevronRight,
	Mail,
	Clock,
	CheckCircle2,
	Send,
} from "lucide-react";
import { toast } from "sonner";
import { useCms } from "./CmsContext";
import { CmsField } from "./CmsField";
import {
	BLOG_CATEGORIES,
	BLOG_STATUSES,
	NEWSLETTER_STATUSES,
} from "./cmsSeedData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { FormModal } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

function formatDate(dateString) {
	if (!dateString) return "Not published";
	return new Date(dateString).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function getInitials(name) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

function blogStatusVariant(status) {
	if (status === "Published") return "default";
	if (status === "Draft") return "secondary";
	return "outline";
}

function newsletterStatusVariant(status) {
	if (status === "Sent") return "default";
	if (status === "Scheduled") return "secondary";
	return "outline";
}

const ContentManagementSystem = () => {
	const router = useRouter();
	const { blogs, newsletters, subscribers, addBlog, addNewsletter } = useCms();

	const [searchTerm, setSearchTerm] = useState("");
	const [newsletterSearch, setNewsletterSearch] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [isAddNewsletterModalOpen, setIsAddNewsletterModalOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;
	const [newBlog, setNewBlog] = useState({
		title: "",
		content: "",
		author: "",
		category: "Technology",
		tags: "",
		featuredImage: "",
		publishDate: "",
		status: "Draft",
		excerpt: "",
	});
	const [newNewsletter, setNewNewsletter] = useState({
		title: "",
		subject: "",
		content: "",
		excerpt: "",
		sendDate: "",
		status: "Draft",
	});

	const stats = useMemo(() => {
		const published = blogs.filter((b) => b.status === "Published").length;
		const drafts = blogs.filter((b) => b.status === "Draft").length;
		const totalViews = blogs.reduce((sum, b) => sum + b.views, 0);
		const sentNewsletters = newsletters.filter((n) => n.status === "Sent").length;
		return {
			totalBlogs: blogs.length,
			published,
			drafts,
			totalViews,
			subscribers: subscribers.length,
			newsletters: newsletters.length,
			sentNewsletters,
		};
	}, [blogs, subscribers, newsletters]);

	const filteredBlogs = useMemo(() => {
		if (!searchTerm) return blogs;
		const q = searchTerm.toLowerCase();
		return blogs.filter(
			(b) =>
				b.title.toLowerCase().includes(q) ||
				b.author.toLowerCase().includes(q) ||
				b.category.toLowerCase().includes(q) ||
				b.tags.some((tag) => tag.toLowerCase().includes(q))
		);
	}, [blogs, searchTerm]);

	const filteredNewsletters = useMemo(() => {
		if (!newsletterSearch) return newsletters;
		const q = newsletterSearch.toLowerCase();
		return newsletters.filter(
			(n) =>
				n.title.toLowerCase().includes(q) ||
				n.subject.toLowerCase().includes(q) ||
				n.status.toLowerCase().includes(q)
		);
	}, [newsletters, newsletterSearch]);

	const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
	const paginatedBlogs = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		return filteredBlogs.slice(start, start + itemsPerPage);
	}, [filteredBlogs, currentPage]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewBlog((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddBlog = () => {
		if (!newBlog.title.trim() || !newBlog.content.trim() || !newBlog.author.trim()) {
			toast.error("Title, content, and author are required.");
			return;
		}

		const tags = newBlog.tags
			.split(",")
			.map((tag) => tag.trim())
			.filter(Boolean);

		const blogToAdd = {
			id: Date.now(),
			title: newBlog.title.trim(),
			author: newBlog.author.trim(),
			category: newBlog.category,
			status: newBlog.status,
			publishDate: newBlog.publishDate || new Date().toISOString().split("T")[0],
			views: 0,
			likes: 0,
			content: newBlog.content.trim(),
			excerpt: newBlog.excerpt.trim(),
			tags,
			featuredImage: newBlog.featuredImage.trim(),
		};

		addBlog(blogToAdd);
		toast.success(`Blog "${blogToAdd.title}" added.`);
		handleCloseModal();
		router.push(`/cms/blogs/${blogToAdd.id}`);
	};

	const handleCloseModal = () => {
		setIsAddModalOpen(false);
		setNewBlog({
			title: "",
			content: "",
			author: "",
			category: "Technology",
			tags: "",
			featuredImage: "",
			publishDate: "",
			status: "Draft",
			excerpt: "",
		});
	};

	const handleNewsletterInputChange = (e) => {
		const { name, value } = e.target;
		setNewNewsletter((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddNewsletter = () => {
		if (
			!newNewsletter.title.trim() ||
			!newNewsletter.subject.trim() ||
			!newNewsletter.content.trim()
		) {
			toast.error("Title, subject, and content are required.");
			return;
		}

		const newsletterToAdd = {
			id: Date.now(),
			title: newNewsletter.title.trim(),
			subject: newNewsletter.subject.trim(),
			status: newNewsletter.status,
			sendDate: newNewsletter.sendDate,
			recipientCount: 0,
			content: newNewsletter.content.trim(),
			excerpt: newNewsletter.excerpt.trim(),
		};

		addNewsletter(newsletterToAdd);
		toast.success(`Newsletter "${newsletterToAdd.title}" added.`);
		handleCloseNewsletterModal();
		router.push(`/cms/newsletter/${newsletterToAdd.id}`);
	};

	const handleCloseNewsletterModal = () => {
		setIsAddNewsletterModalOpen(false);
		setNewNewsletter({
			title: "",
			subject: "",
			content: "",
			excerpt: "",
			sendDate: "",
			status: "Draft",
		});
	};

	return (
		<div className="min-h-screen space-y-6 p-6">
			<div>
				<h1 className="text-2xl font-semibold text-foreground">
					Content Management System
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Manage blog posts, newsletters, and subscribers
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				{[
					{ label: "Total Blogs", value: stats.totalBlogs, hint: "All posts", icon: FileText },
					{ label: "Published", value: stats.published, hint: "Live articles", icon: CheckCircle2 },
					{ label: "Newsletters", value: stats.newsletters, hint: `${stats.sentNewsletters} sent`, icon: Send },
					{ label: "Subscribers", value: stats.subscribers, hint: "Newsletter list", icon: Mail },
				].map(({ label, value, hint, icon: Icon }) => (
					<Card key={label}>
						<CardContent className="flex items-center justify-between p-6">
							<div>
								<p className="text-sm font-medium text-muted-foreground">{label}</p>
								<p className="text-3xl font-bold text-foreground">{value}</p>
								<p className="mt-1 text-xs text-muted-foreground">{hint}</p>
							</div>
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
								<Icon className="h-6 w-6" />
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Blogs */}
			<Card>
				<CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0 pb-4">
					<div>
						<CardTitle className="text-lg text-foreground">Recent Blogs</CardTitle>
						<p className="text-sm text-muted-foreground">Click a row to view and edit</p>
					</div>
					<Button onClick={() => setIsAddModalOpen(true)}>
						<Plus className="h-4 w-4" />
						Add New Blog
					</Button>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="relative max-w-sm">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search blogs..."
							value={searchTerm}
							onChange={(e) => {
								setSearchTerm(e.target.value);
								setCurrentPage(1);
							}}
							className="pl-10"
						/>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Author</TableHead>
								<TableHead>Category</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Publish Date</TableHead>
								<TableHead>Views</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paginatedBlogs.length === 0 ? (
								<TableRow>
									<TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
										No blogs found
									</TableCell>
								</TableRow>
							) : (
								paginatedBlogs.map((blog) => (
									<TableRow
										key={blog.id}
										className="cursor-pointer"
										onClick={() => router.push(`/cms/blogs/${blog.id}`)}
									>
										<TableCell>
											<p className="font-medium text-foreground">{blog.title}</p>
											<div className="mt-1 flex flex-wrap gap-1">
												{blog.tags.slice(0, 3).map((tag) => (
													<Badge key={tag} variant="secondary" className="text-xs">
														{tag}
													</Badge>
												))}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center gap-3">
												<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
													{getInitials(blog.author)}
												</div>
												<span className="text-sm text-foreground">{blog.author}</span>
											</div>
										</TableCell>
										<TableCell className="text-muted-foreground">{blog.category}</TableCell>
										<TableCell>
											<Badge variant={blogStatusVariant(blog.status)}>
												{blog.status === "Published" ? (
													<CheckCircle2 className="mr-1 h-3 w-3" />
												) : (
													<Clock className="mr-1 h-3 w-3" />
												)}
												{blog.status}
											</Badge>
										</TableCell>
										<TableCell className="text-muted-foreground">
											{formatDate(blog.publishDate)}
										</TableCell>
										<TableCell>
											<span className="inline-flex items-center gap-1 text-muted-foreground">
												<Eye className="h-4 w-4" />
												{blog.views.toLocaleString()}
											</span>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>

					{totalPages > 1 && (
						<div className="flex items-center justify-between border-t border-border pt-4">
							<p className="text-sm text-muted-foreground">
								Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
								{Math.min(currentPage * itemsPerPage, filteredBlogs.length)} of{" "}
								{filteredBlogs.length}
							</p>
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="icon"
									onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
									disabled={currentPage === 1}
								>
									<ChevronLeft className="h-4 w-4" />
								</Button>
								{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
									<Button
										key={page}
										size="sm"
										variant={currentPage === page ? "default" : "ghost"}
										onClick={() => setCurrentPage(page)}
									>
										{page}
									</Button>
								))}
								<Button
									variant="outline"
									size="icon"
									onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
									disabled={currentPage === totalPages}
								>
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* Newsletters */}
			<Card>
				<CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0 pb-4">
					<div>
						<CardTitle className="text-lg text-foreground">Newsletters</CardTitle>
						<p className="text-sm text-muted-foreground">
							Email campaigns — click a row to view and edit
						</p>
					</div>
					<Button onClick={() => setIsAddNewsletterModalOpen(true)}>
						<Plus className="h-4 w-4" />
						Add Newsletter
					</Button>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="relative max-w-sm">
						<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							placeholder="Search newsletters..."
							value={newsletterSearch}
							onChange={(e) => setNewsletterSearch(e.target.value)}
							className="pl-10"
						/>
					</div>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Subject</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Send Date</TableHead>
								<TableHead>Recipients</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredNewsletters.length === 0 ? (
								<TableRow>
									<TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
										No newsletters found
									</TableCell>
								</TableRow>
							) : (
								filteredNewsletters.map((item) => (
									<TableRow
										key={item.id}
										className="cursor-pointer"
										onClick={() => router.push(`/cms/newsletter/${item.id}`)}
									>
										<TableCell className="font-medium text-foreground">
											{item.title}
										</TableCell>
										<TableCell className="text-muted-foreground">{item.subject}</TableCell>
										<TableCell>
											<Badge variant={newsletterStatusVariant(item.status)}>
												{item.status}
											</Badge>
										</TableCell>
										<TableCell className="text-muted-foreground">
											{formatDate(item.sendDate)}
										</TableCell>
										<TableCell className="text-muted-foreground">
											{item.recipientCount.toLocaleString()}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Subscribers */}
			<Card>
				<CardHeader>
					<CardTitle className="text-lg text-foreground">Newsletter Subscribers</CardTitle>
					<p className="text-sm text-muted-foreground">
						Read-only list — view subscribers; no add, unsubscribe, or detail page
					</p>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Subscriber</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Subscription Date</TableHead>
								<TableHead>Status</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{subscribers.map((subscriber) => (
								<TableRow key={subscriber.id}>
									<TableCell>
										<div className="flex items-center gap-3">
											<div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
												{getInitials(subscriber.name)}
											</div>
											<span className="font-medium text-foreground">{subscriber.name}</span>
										</div>
									</TableCell>
									<TableCell className="text-muted-foreground">{subscriber.email}</TableCell>
									<TableCell className="text-muted-foreground">
										{formatDate(subscriber.subscribedDate)}
									</TableCell>
									<TableCell>
										<Badge variant="default">{subscriber.status}</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			<FormModal
				open={isAddModalOpen}
				onClose={handleCloseModal}
				title="Add New Blog Post"
				subtitle="Create a new blog post with content and details"
				onSubmit={handleAddBlog}
				saveLabel="Add Blog Post"
				maxWidth="max-w-4xl"
			>
				<CmsField label="Blog Title" htmlFor="blog-title" required>
					<Input
						id="blog-title"
						name="title"
						value={newBlog.title}
						onChange={handleInputChange}
						placeholder="Enter blog title..."
					/>
				</CmsField>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<CmsField label="Author" htmlFor="blog-author" required>
						<Input
							id="blog-author"
							name="author"
							value={newBlog.author}
							onChange={handleInputChange}
							placeholder="Author name"
						/>
					</CmsField>
					<CmsField label="Category" htmlFor="blog-category" required>
						<FormSelect
							id="blog-category"
							value={newBlog.category}
							onChange={(e) =>
								handleInputChange({
									target: { name: "category", value: e.target.value },
								})
							}
							options={BLOG_CATEGORIES}
						/>
					</CmsField>
				</div>
				<CmsField label="Content" htmlFor="blog-content" required>
					<Textarea
						id="blog-content"
						name="content"
						value={newBlog.content}
						onChange={handleInputChange}
						placeholder="Write your blog content here..."
						rows={8}
						className="min-h-48"
					/>
				</CmsField>
				<CmsField label="Excerpt" htmlFor="blog-excerpt">
					<Textarea
						id="blog-excerpt"
						name="excerpt"
						value={newBlog.excerpt}
						onChange={handleInputChange}
						placeholder="Short description..."
						rows={3}
					/>
				</CmsField>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<CmsField label="Tags" htmlFor="blog-tags" hint="Comma separated">
						<Input
							id="blog-tags"
							name="tags"
							value={newBlog.tags}
							onChange={handleInputChange}
							placeholder="React, JavaScript, Frontend"
						/>
					</CmsField>
					<CmsField label="Featured Image URL" htmlFor="blog-featured-image">
						<Input
							id="blog-featured-image"
							type="url"
							name="featuredImage"
							value={newBlog.featuredImage}
							onChange={handleInputChange}
							placeholder="https://example.com/image.jpg"
						/>
					</CmsField>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<CmsField label="Publish Date" htmlFor="blog-publish-date">
						<Input
							id="blog-publish-date"
							type="date"
							name="publishDate"
							value={newBlog.publishDate}
							onChange={handleInputChange}
						/>
					</CmsField>
					<CmsField label="Status" htmlFor="blog-status" required>
						<FormSelect
							id="blog-status"
							value={newBlog.status}
							onChange={(e) =>
								handleInputChange({
									target: { name: "status", value: e.target.value },
								})
							}
							options={BLOG_STATUSES}
						/>
					</CmsField>
				</div>
			</FormModal>

			<FormModal
				open={isAddNewsletterModalOpen}
				onClose={handleCloseNewsletterModal}
				title="Add New Newsletter"
				subtitle="Create a new email campaign"
				onSubmit={handleAddNewsletter}
				saveLabel="Add Newsletter"
				maxWidth="max-w-4xl"
			>
				<CmsField label="Internal Title" htmlFor="nl-title" required>
					<Input
						id="nl-title"
						name="title"
						value={newNewsletter.title}
						onChange={handleNewsletterInputChange}
						placeholder="June Product Updates"
					/>
				</CmsField>
				<CmsField label="Email Subject" htmlFor="nl-subject" required>
					<Input
						id="nl-subject"
						name="subject"
						value={newNewsletter.subject}
						onChange={handleNewsletterInputChange}
						placeholder="What's new this month"
					/>
				</CmsField>
				<CmsField label="Content" htmlFor="nl-content" required>
					<Textarea
						id="nl-content"
						name="content"
						value={newNewsletter.content}
						onChange={handleNewsletterInputChange}
						placeholder="Write your newsletter content here..."
						rows={10}
						className="min-h-56 font-mono"
					/>
				</CmsField>
				<CmsField label="Excerpt" htmlFor="nl-excerpt">
					<Textarea
						id="nl-excerpt"
						name="excerpt"
						value={newNewsletter.excerpt}
						onChange={handleNewsletterInputChange}
						placeholder="Short summary for internal reference..."
						rows={3}
					/>
				</CmsField>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<CmsField label="Send Date" htmlFor="nl-send-date">
						<Input
							id="nl-send-date"
							type="date"
							name="sendDate"
							value={newNewsletter.sendDate}
							onChange={handleNewsletterInputChange}
						/>
					</CmsField>
					<CmsField label="Status" htmlFor="nl-status" required>
						<FormSelect
							id="nl-status"
							value={newNewsletter.status}
							onChange={(e) =>
								handleNewsletterInputChange({
									target: { name: "status", value: e.target.value },
								})
							}
							options={NEWSLETTER_STATUSES}
						/>
					</CmsField>
				</div>
			</FormModal>
		</div>
	);
};

export default ContentManagementSystem;
