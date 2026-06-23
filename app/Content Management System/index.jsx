import React, { useState, useMemo } from "react";
import {
	FileText,
	Eye,
	Plus,
	Search,
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
	Calendar,
	User,
	Tag,
	Image as ImageIcon,
	Mail,
	Clock,
	CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from "@/components/ui/table";

const textareaClass = cn(
	"flex min-h-24 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
);

const ContentManagementSystem = () => {
	const { theme, colors } = useTheme();

	const [blogs, setBlogs] = useState([
		{
			id: 1,
			title: "Getting Started with React Hooks",
			author: "John Doe",
			authorAvatar: "bg-blue-500",
			category: "Technology",
			status: "Published",
			publishDate: "2024-06-25",
			views: 1250,
			likes: 45,
			content: "A comprehensive guide to React Hooks...",
			tags: ["React", "JavaScript", "Frontend"],
			featuredImage: "",
		},
		{
			id: 2,
			title: "Building Scalable APIs with Node.js",
			author: "Jane Smith",
			authorAvatar: "bg-purple-500",
			category: "Backend",
			status: "Published",
			publishDate: "2024-06-24",
			views: 980,
			likes: 32,
			content: "Learn how to build robust APIs...",
			tags: ["Node.js", "API", "Backend"],
			featuredImage: "",
		},
		{
			id: 3,
			title: "CSS Grid vs Flexbox: When to Use What",
			author: "Mike Johnson",
			authorAvatar: "bg-green-500",
			category: "Design",
			status: "Draft",
			publishDate: "",
			views: 0,
			likes: 0,
			content: "Understanding CSS layout systems...",
			tags: ["CSS", "Design", "Frontend"],
			featuredImage: "",
		},
		{
			id: 4,
			title: "Introduction to TypeScript",
			author: "Sarah Williams",
			authorAvatar: "bg-orange-500",
			category: "Technology",
			status: "Published",
			publishDate: "2024-06-23",
			views: 2100,
			likes: 78,
			content: "TypeScript basics for JavaScript developers...",
			tags: ["TypeScript", "JavaScript", "Programming"],
			featuredImage: "",
		},
		{
			id: 5,
			title: "Database Optimization Techniques",
			author: "David Brown",
			authorAvatar: "bg-red-500",
			category: "Backend",
			status: "Draft",
			publishDate: "",
			views: 0,
			likes: 0,
			content: "Best practices for database performance...",
			tags: ["Database", "SQL", "Performance"],
			featuredImage: "",
		},
		{
			id: 6,
			title: "Modern Web Design Trends 2024",
			author: "Emily Davis",
			authorAvatar: "bg-pink-500",
			category: "Design",
			status: "Published",
			publishDate: "2024-06-22",
			views: 1750,
			likes: 56,
			content: "Exploring the latest design trends...",
			tags: ["Design", "UI/UX", "Trends"],
			featuredImage: "",
		},
	]);

	const [subscribers, setSubscribers] = useState([
		{
			id: 1,
			name: "Alice Cooper",
			email: "alice@example.com",
			subscribedDate: "2024-06-20",
			status: "Active",
			avatarColor: "bg-blue-500",
		},
		{
			id: 2,
			name: "Bob Martinez",
			email: "bob@example.com",
			subscribedDate: "2024-06-18",
			status: "Active",
			avatarColor: "bg-green-500",
		},
		{
			id: 3,
			name: "Carol White",
			email: "carol@example.com",
			subscribedDate: "2024-06-15",
			status: "Active",
			avatarColor: "bg-purple-500",
		},
		{
			id: 4,
			name: "Daniel Lee",
			email: "daniel@example.com",
			subscribedDate: "2024-06-12",
			status: "Active",
			avatarColor: "bg-orange-500",
		},
		{
			id: 5,
			name: "Eva Garcia",
			email: "eva@example.com",
			subscribedDate: "2024-06-10",
			status: "Active",
			avatarColor: "bg-pink-500",
		},
		{
			id: 6,
			name: "Frank Wilson",
			email: "frank@example.com",
			subscribedDate: "2024-06-08",
			status: "Active",
			avatarColor: "bg-indigo-500",
		},
	]);

	const [searchTerm, setSearchTerm] = useState("");
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
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

	// Calculate stats
	const stats = useMemo(() => {
		const published = blogs.filter((b) => b.status === "Published").length;
		const drafts = blogs.filter((b) => b.status === "Draft").length;
		const totalViews = blogs.reduce((sum, b) => sum + b.views, 0);
		return {
			totalBlogs: blogs.length,
			published,
			drafts,
			totalViews,
			subscribers: subscribers.length,
		};
	}, [blogs, subscribers]);

	// Filter blogs
	const filteredBlogs = useMemo(() => {
		if (!searchTerm) {
			return blogs;
		}
		const searchLower = searchTerm.toLowerCase();
		return blogs.filter(
			(b) =>
				b.title.toLowerCase().includes(searchLower) ||
				b.author.toLowerCase().includes(searchLower) ||
				b.category.toLowerCase().includes(searchLower) ||
				b.tags.some((tag) => tag.toLowerCase().includes(searchLower))
		);
	}, [blogs, searchTerm]);

	// Pagination
	const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
	const paginatedBlogs = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredBlogs.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredBlogs, currentPage]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewBlog((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddBlog = () => {
		if (!newBlog.title.trim()) {
			toast.error("Please enter a blog title!");
			return;
		}
		if (!newBlog.content.trim()) {
			toast.error("Please enter blog content!");
			return;
		}
		if (!newBlog.author.trim()) {
			toast.error("Please enter author name!");
			return;
		}

		const tagsArray = newBlog.tags
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0);

		const blogToAdd = {
			id: blogs.length + 1,
			title: newBlog.title,
			author: newBlog.author,
			authorAvatar: "bg-blue-500",
			category: newBlog.category,
			status: newBlog.status,
			publishDate:
				newBlog.publishDate || new Date().toISOString().split("T")[0],
			views: 0,
			likes: 0,
			content: newBlog.content,
			tags: tagsArray,
			featuredImage: newBlog.featuredImage,
		};

		setBlogs((prevBlogs) => [blogToAdd, ...prevBlogs]);
		toast.success(`Blog "${blogToAdd.title}" added successfully!`);
		handleCloseModal();
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

	const formatDate = (dateString) => {
		if (!dateString) return "Not published";
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const getInitials = (name) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	const getStatusColor = (status) => {
		if (theme === "dark") {
			switch (status) {
				case "Published":
					return "bg-green-900/30 text-green-400 border border-green-800/50";
				case "Draft":
					return "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50";
				default:
					return "bg-zinc-800 text-zinc-300 border border-zinc-700";
			}
		}
		switch (status) {
			case "Published":
				return "bg-green-100 text-green-800";
			case "Draft":
				return "bg-yellow-100 text-yellow-800";
			default:
				return "bg-zinc-100 text-zinc-800";
		}
	};

	return (
		<div
			className={`p-6 space-y-6 min-h-screen transition-colors`}
		>
			{/* Header */}
			<div className="flex items-center justify-between">
				<div>
					<h1 className={`text-2xl font-semibold ${colors.foreground}`}>
						Content Management System
					</h1>
					<p className={`text-sm ${colors.mutedForeground} mt-1`}>
						Manage your blog posts and newsletter subscribers
					</p>
				</div>
			</div>

			{/* Stats Cards */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				<Card className={`p-6 ${colors.shadow}`}>
					<div className="flex items-center justify-between">
						<div>
							<p
								className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
							>
								Total Blogs
							</p>
							<p className={`text-3xl font-bold ${colors.foreground}`}>
								{stats.totalBlogs}
							</p>
							<p className={`text-xs ${colors.textMuted} mt-1`}>All posts</p>
						</div>
						<div
							className={`w-12 h-12 rounded-full ${
								theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
							} flex items-center justify-center`}
						>
							<FileText
								className={`w-6 h-6 ${
									theme === "dark" ? "text-blue-400" : "text-blue-600"
								}`}
							/>
						</div>
					</div>
				</Card>

				<Card className={`p-6 ${colors.shadow}`}>
					<div className="flex items-center justify-between">
						<div>
							<p
								className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
							>
								Published
							</p>
							<p
								className={`text-3xl font-bold ${
									theme === "dark" ? "text-green-400" : "text-green-600"
								}`}
							>
								{stats.published}
							</p>
							<p className={`text-xs ${colors.textMuted} mt-1`}>
								Live articles
							</p>
						</div>
						<div
							className={`w-12 h-12 rounded-full ${
								theme === "dark" ? "bg-green-900/30" : "bg-green-100"
							} flex items-center justify-center`}
						>
							<CheckCircle2
								className={`w-6 h-6 ${
									theme === "dark" ? "text-green-400" : "text-green-600"
								}`}
							/>
						</div>
					</div>
				</Card>

				<Card className={`p-6 ${colors.shadow}`}>
					<div className="flex items-center justify-between">
						<div>
							<p
								className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
							>
								Drafts
							</p>
							<p
								className={`text-3xl font-bold ${
									theme === "dark" ? "text-yellow-400" : "text-yellow-600"
								}`}
							>
								{stats.drafts}
							</p>
							<p className={`text-xs ${colors.textMuted} mt-1`}>In progress</p>
						</div>
						<div
							className={`w-12 h-12 rounded-full ${
								theme === "dark" ? "bg-yellow-900/30" : "bg-yellow-100"
							} flex items-center justify-center`}
						>
							<Clock
								className={`w-6 h-6 ${
									theme === "dark" ? "text-yellow-400" : "text-yellow-600"
								}`}
							/>
						</div>
					</div>
				</Card>

				<Card className={`p-6 ${colors.shadow}`}>
					<div className="flex items-center justify-between">
						<div>
							<p
								className={`text-sm font-medium ${colors.mutedForeground} mb-1`}
							>
								Subscribers
							</p>
							<p className={`text-3xl font-bold ${colors.foreground}`}>
								{stats.subscribers}
							</p>
							<p className={`text-xs ${colors.textMuted} mt-1`}>
								Newsletter list
							</p>
						</div>
						<div
							className={`w-12 h-12 rounded-full ${
								theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"
							} flex items-center justify-center`}
						>
							<Mail
								className={`w-6 h-6 ${
									theme === "dark" ? "text-purple-400" : "text-purple-600"
								}`}
							/>
						</div>
					</div>
				</Card>
			</div>
{/* Table Header */}
<div className={`p-2`}>
					<div className="flex items-center justify-between mb-4">
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Recent Blogs
						</h2>
						<Button onClick={() => setIsAddModalOpen(true)}>
							<Plus className="w-4 h-4" />
							Add New Blog
						</Button>
					</div>
					<div className="flex items-center gap-4">
						<div className="relative flex-1 max-w-sm">
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
							/>
							<Input
								type="text"
								placeholder="Search blogs..."
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setCurrentPage(1);
								}}
								className="pl-10"
							/>
						</div>
					</div>
				</div>
			{/* Recent Blogs Table */}
			<Card className={`${colors.shadow} overflow-hidden`}>
				

				{/* Table */}
				<Table className="w-full">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Title
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Author
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Category
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Status
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Publish Date
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Views
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-right text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.card} divide-y ${colors.border}`}>
							{paginatedBlogs.length === 0 ? (
								<TableRow>
									<TableCell colSpan="7" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No blogs found</p>
									</TableCell>
								</TableRow>
							) : (
								paginatedBlogs.map((blog) => (
									<TableRow
										key={blog.id}
										className={`${colors.hover} transition-colors`}
									>
										<TableCell className="px-6 py-4">
											<div
												className={`text-sm font-medium ${colors.foreground}`}
											>
												{blog.title}
											</div>
											<div className="flex items-center gap-2 mt-1">
												{blog.tags.slice(0, 3).map((tag, idx) => (
													<Badge key={idx} variant="secondary" className="text-xs">
														{tag}
													</Badge>
												))}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div
													className={`w-8 h-8 rounded-full ${blog.authorAvatar} flex items-center justify-center text-white text-xs font-medium`}
												>
													{getInitials(blog.author)}
												</div>
												<span className={`text-sm ${colors.foreground}`}>
													{blog.author}
												</span>
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{blog.category}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<Badge className={cn("border", getStatusColor(blog.status))}>
												{blog.status === "Published" ? (
													<CheckCircle2 className="w-3 h-3 mr-1" />
												) : (
													<Clock className="w-3 h-3 mr-1" />
												)}
												{blog.status}
											</Badge>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{formatDate(blog.publishDate)}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div
												className={`flex items-center gap-1 text-sm ${colors.textSecondary}`}
											>
												<Eye className={`w-4 h-4 ${colors.textMuted}`} />
												{blog.views.toLocaleString()}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap text-right">
											<Button variant="ghost" size="icon">
												<MoreHorizontal
													className={`w-5 h-5 ${colors.mutedForeground}`}
												/>
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>

				{/* Pagination */}
				{totalPages > 1 && (
					<div
						className={`px-6 py-4 border-t ${colors.border} flex items-center justify-between`}
					>
						<div className={`text-sm ${colors.mutedForeground}`}>
							Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
							{Math.min(currentPage * itemsPerPage, filteredBlogs.length)} of{" "}
							{filteredBlogs.length} blogs
						</div>
						<div className="flex items-center gap-2">
							<Button
								variant="outline"
								size="icon"
								onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
								disabled={currentPage === 1}
							>
								<ChevronLeft className={`w-4 h-4 ${colors.foreground}`} />
							</Button>
							<div className="flex items-center gap-1">
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(
									(page) => (
										<Button
											key={page}
											size="sm"
											variant={currentPage === page ? "default" : "ghost"}
											onClick={() => setCurrentPage(page)}
										>
											{page}
										</Button>
									)
								)}
							</div>
							<Button
								variant="outline"
								size="icon"
								onClick={() =>
									setCurrentPage((prev) => Math.min(totalPages, prev + 1))
								}
								disabled={currentPage === totalPages}
							>
								<ChevronRight className={`w-4 h-4 ${colors.foreground}`} />
							</Button>
						</div>
					</div>
				)}
			</Card>
			<div className={`p-2`}>
					<h2 className={`text-lg font-semibold ${colors.foreground}`}>
						Newsletter Subscribers
					</h2>
					<p className={`text-sm ${colors.mutedForeground} mt-1`}>
						Users subscribed to your newsletter
					</p>
				</div>
			{/* Newsletter Subscribers */}
			<Card className={`${colors.shadow} overflow-hidden`}>
				

				{/* Table */}
				<Table className="w-full">
						<TableHeader className={`${colors.muted} border-b ${colors.border}`}>
							<TableRow>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Subscriber
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Email
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Subscription Date
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Status
								</TableHead>
								<TableHead
									className={`px-6 py-3 text-right text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody className={`${colors.card} divide-y ${colors.border}`}>
							{subscribers.length === 0 ? (
								<TableRow>
									<TableCell colSpan="5" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>
											No subscribers found
										</p>
									</TableCell>
								</TableRow>
							) : (
								subscribers.map((subscriber) => (
									<TableRow
										key={subscriber.id}
										className={`${colors.hover} transition-colors`}
									>
										<TableCell className="px-6 py-4">
											<div className="flex items-center gap-3">
												<div
													className={`w-8 h-8 rounded-full ${subscriber.avatarColor} flex items-center justify-center text-white text-xs font-medium`}
												>
													{getInitials(subscriber.name)}
												</div>
												<span
													className={`text-sm font-medium ${colors.foreground}`}
												>
													{subscriber.name}
												</span>
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{subscriber.email}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{formatDate(subscriber.subscribedDate)}
											</div>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap">
											<Badge
												className={cn(
													"border",
													theme === "dark"
														? "bg-green-900/30 text-green-400 border-green-800/50"
														: "bg-green-100 text-green-800 border-green-200"
												)}
											>
												<CheckCircle2 className="w-3 h-3 mr-1" />
												{subscriber.status}
											</Badge>
										</TableCell>
										<TableCell className="px-6 py-4 whitespace-nowrap text-right">
											<Button variant="ghost" size="icon">
												<MoreHorizontal
													className={`w-5 h-5 ${colors.mutedForeground}`}
												/>
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
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
				<FormField label="Blog Title" htmlFor="blog-title" required>
					<Input
						id="blog-title"
						type="text"
						name="title"
						value={newBlog.title}
						onChange={handleInputChange}
						placeholder="Enter blog title..."
					/>
				</FormField>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField label="Author" htmlFor="blog-author" required>
						<div className="relative">
							<User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
							<Input
								id="blog-author"
								type="text"
								name="author"
								value={newBlog.author}
								onChange={handleInputChange}
								placeholder="Author name"
								className="pl-10"
							/>
						</div>
					</FormField>
					<FormField label="Category" htmlFor="blog-category" required>
						<FormSelect
							id="blog-category"
							value={newBlog.category}
							onChange={(e) =>
								handleInputChange({
									target: { name: "category", value: e.target.value },
								})
							}
							options={[
								"Technology",
								"Design",
								"Backend",
								"Frontend",
								"Business",
								"Marketing",
							]}
						/>
					</FormField>
				</div>
				<FormField
					label="Content"
					htmlFor="blog-content"
					required
					hint="You can use markdown or HTML for formatting"
				>
					<textarea
						id="blog-content"
						name="content"
						value={newBlog.content}
						onChange={handleInputChange}
						placeholder="Write your blog content here..."
						rows={8}
						className={cn(textareaClass, "min-h-48 resize-none")}
					/>
				</FormField>
				<FormField
					label="Excerpt"
					htmlFor="blog-excerpt"
					hint="Brief summary shown in blog listings"
				>
					<textarea
						id="blog-excerpt"
						name="excerpt"
						value={newBlog.excerpt}
						onChange={handleInputChange}
						placeholder="Short description of the blog post..."
						rows={3}
						className={cn(textareaClass, "resize-none")}
					/>
				</FormField>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						label="Tags"
						htmlFor="blog-tags"
						hint="Separate tags with commas"
					>
						<div className="relative">
							<Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
							<Input
								id="blog-tags"
								type="text"
								name="tags"
								value={newBlog.tags}
								onChange={handleInputChange}
								placeholder="React, JavaScript, Frontend (comma separated)"
								className="pl-10"
							/>
						</div>
					</FormField>
					<FormField label="Featured Image URL" htmlFor="blog-featured-image">
						<div className="relative">
							<ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
							<Input
								id="blog-featured-image"
								type="url"
								name="featuredImage"
								value={newBlog.featuredImage}
								onChange={handleInputChange}
								placeholder="https://example.com/image.jpg"
								className="pl-10"
							/>
						</div>
					</FormField>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						label="Publish Date"
						htmlFor="blog-publish-date"
						hint="Leave empty to use current date"
					>
						<div className="relative">
							<Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
							<Input
								id="blog-publish-date"
								type="date"
								name="publishDate"
								value={newBlog.publishDate}
								onChange={handleInputChange}
								className="pl-10"
							/>
						</div>
					</FormField>
					<FormField label="Status" htmlFor="blog-status" required>
						<FormSelect
							id="blog-status"
							value={newBlog.status}
							onChange={(e) =>
								handleInputChange({
									target: { name: "status", value: e.target.value },
								})
							}
							options={["Draft", "Published"]}
						/>
					</FormField>
				</div>
			</FormModal>
		</div>
	);
};

export default ContentManagementSystem;
