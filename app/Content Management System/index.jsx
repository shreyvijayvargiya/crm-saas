import React, { useState, useMemo } from "react";
import {
	FileText,
	Eye,
	Plus,
	X,
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
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const ContentManagementSystem = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

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
			className={`p-6 space-y-6 ${colors.background} min-h-screen transition-colors`}
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
				<div
					className={`${colors.card} border ${colors.border} rounded-xl p-6 ${colors.shadow}`}
				>
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
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl p-6 ${colors.shadow}`}
				>
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
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl p-6 ${colors.shadow}`}
				>
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
				</div>

				<div
					className={`${colors.card} border ${colors.border} rounded-xl p-6 ${colors.shadow}`}
				>
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
				</div>
			</div>

			{/* Recent Blogs Table */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
			>
				{/* Table Header */}
				<div className={`p-6 border-b ${colors.border}`}>
					<div className="flex items-center justify-between mb-4">
						<h2 className={`text-lg font-semibold ${colors.foreground}`}>
							Recent Blogs
						</h2>
						<button
							onClick={() => setIsAddModalOpen(true)}
							className={`px-4 py-2 rounded-xl text-sm font-medium ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover} transition-colors flex items-center gap-2`}
						>
							<Plus className="w-4 h-4" />
							Add New Blog
						</button>
					</div>
					<div className="flex items-center gap-4">
						<div className="relative flex-1 max-w-sm">
							<Search
								className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${colors.mutedForeground}`}
							/>
							<input
								type="text"
								placeholder="Search blogs..."
								value={searchTerm}
								onChange={(e) => {
									setSearchTerm(e.target.value);
									setCurrentPage(1);
								}}
								className={`w-full pl-10 pr-4 py-2 ${
									colors.background
								} border ${colors.border} rounded-xl text-sm ${
									colors.foreground
								} focus:outline-none focus:ring-2 ${getFocusRingClass(
									colorScheme
								)} focus:border-transparent placeholder:${colors.textTertiary}`}
							/>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className={`${colors.muted} border-b ${colors.border}`}>
							<tr>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Title
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Author
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Category
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Status
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Publish Date
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Views
								</th>
								<th
									className={`px-6 py-3 text-right text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{paginatedBlogs.length === 0 ? (
								<tr>
									<td colSpan="7" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>No blogs found</p>
									</td>
								</tr>
							) : (
								paginatedBlogs.map((blog) => (
									<tr
										key={blog.id}
										className={`${colors.hover} transition-colors`}
									>
										<td className="px-6 py-4">
											<div
												className={`text-sm font-medium ${colors.foreground}`}
											>
												{blog.title}
											</div>
											<div className="flex items-center gap-2 mt-1">
												{blog.tags.slice(0, 3).map((tag, idx) => (
													<span
														key={idx}
														className={`text-xs px-2 py-0.5 rounded border ${
															theme === "dark" ? scheme.chipDark : scheme.chip
														}`}
													>
														{tag}
													</span>
												))}
											</div>
										</td>
										<td className="px-6 py-4">
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
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{blog.category}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
													blog.status
												)}`}
											>
												{blog.status === "Published" ? (
													<CheckCircle2 className="w-3 h-3 mr-1" />
												) : (
													<Clock className="w-3 h-3 mr-1" />
												)}
												{blog.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{formatDate(blog.publishDate)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div
												className={`flex items-center gap-1 text-sm ${colors.textSecondary}`}
											>
												<Eye className={`w-4 h-4 ${colors.textMuted}`} />
												{blog.views.toLocaleString()}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right">
											<button
												className={`p-1 ${colors.hoverSecondary} rounded transition-colors`}
											>
												<MoreHorizontal
													className={`w-5 h-5 ${colors.mutedForeground}`}
												/>
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

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
							<button
								onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
								disabled={currentPage === 1}
								className={`p-2 border ${colors.border} rounded-xl ${colors.hoverSecondary} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
							>
								<ChevronLeft className={`w-4 h-4 ${colors.foreground}`} />
							</button>
							<div className="flex items-center gap-1">
								{Array.from({ length: totalPages }, (_, i) => i + 1).map(
									(page) => (
										<button
											key={page}
											onClick={() => setCurrentPage(page)}
											className={`px-3 py-1 rounded-xl text-sm ${
												currentPage === page
													? `${scheme.primary} ${scheme.primaryForeground}`
													: `${colors.textSecondary} ${colors.hoverSecondary}`
											}`}
										>
											{page}
										</button>
									)
								)}
							</div>
							<button
								onClick={() =>
									setCurrentPage((prev) => Math.min(totalPages, prev + 1))
								}
								disabled={currentPage === totalPages}
								className={`p-2 border ${colors.border} rounded-xl ${colors.hoverSecondary} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
							>
								<ChevronRight className={`w-4 h-4 ${colors.foreground}`} />
							</button>
						</div>
					</div>
				)}
			</div>

			{/* Newsletter Subscribers */}
			<div
				className={`${colors.card} border ${colors.border} rounded-xl ${colors.shadow} overflow-hidden`}
			>
				<div className={`p-6 border-b ${colors.border}`}>
					<h2 className={`text-lg font-semibold ${colors.foreground}`}>
						Newsletter Subscribers
					</h2>
					<p className={`text-sm ${colors.mutedForeground} mt-1`}>
						Users subscribed to your newsletter
					</p>
				</div>

				{/* Table */}
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead className={`${colors.muted} border-b ${colors.border}`}>
							<tr>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Subscriber
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Email
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Subscription Date
								</th>
								<th
									className={`px-6 py-3 text-left text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Status
								</th>
								<th
									className={`px-6 py-3 text-right text-xs font-medium ${colors.mutedForeground} uppercase tracking-wider`}
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className={`${colors.card} divide-y ${colors.border}`}>
							{subscribers.length === 0 ? (
								<tr>
									<td colSpan="5" className="px-6 py-12 text-center">
										<p className={colors.mutedForeground}>
											No subscribers found
										</p>
									</td>
								</tr>
							) : (
								subscribers.map((subscriber) => (
									<tr
										key={subscriber.id}
										className={`${colors.hover} transition-colors`}
									>
										<td className="px-6 py-4">
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
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{subscriber.email}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className={`text-sm ${colors.textSecondary}`}>
												{formatDate(subscriber.subscribedDate)}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
													theme === "dark"
														? "bg-green-900/30 text-green-400 border border-green-800/50"
														: "bg-green-100 text-green-800"
												}`}
											>
												<CheckCircle2 className="w-3 h-3 mr-1" />
												{subscriber.status}
											</span>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right">
											<button
												className={`p-1 ${colors.hoverSecondary} rounded transition-colors`}
											>
												<MoreHorizontal
													className={`w-5 h-5 ${colors.mutedForeground}`}
												/>
											</button>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* Add Blog Modal */}
			{isAddModalOpen && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
					onClick={handleCloseModal}
				>
					<div
						className={`${colors.card} rounded-xl ${colors.shadow} max-w-4xl w-full max-h-[90vh] overflow-y-auto`}
						onClick={(e) => e.stopPropagation()}
					>
						{/* Modal Header */}
						<div
							className={`flex items-center justify-between p-6 border-b ${colors.border}`}
						>
							<div>
								<h2 className={`text-xl font-semibold ${colors.foreground}`}>
									Add New Blog Post
								</h2>
								<p className={`text-sm ${colors.mutedForeground} mt-1`}>
									Create a new blog post with content and details
								</p>
							</div>
							<button
								onClick={handleCloseModal}
								className={`p-2 ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								<X className={`w-5 h-5 ${colors.mutedForeground}`} />
							</button>
						</div>

						{/* Modal Body */}
						<div className="p-6 space-y-4">
							{/* Title */}
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Blog Title <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									name="title"
									value={newBlog.title}
									onChange={handleInputChange}
									placeholder="Enter blog title..."
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${
										theme === "dark"
											? "focus:ring-zinc-50"
											: "focus:ring-zinc-900"
									} focus:border-transparent placeholder:${
										colors.textTertiary
									}`}
								/>
							</div>

							{/* Author and Category */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Author <span className="text-red-500">*</span>
									</label>
									<div className="relative">
										<User
											className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
										/>
										<input
											type="text"
											name="author"
											value={newBlog.author}
											onChange={handleInputChange}
											placeholder="Author name"
											className={`w-full pl-10 pr-4 py-2 ${
												colors.background
											} border ${colors.border} rounded-xl text-sm ${
												colors.foreground
											} focus:outline-none focus:ring-2 ${getFocusRingClass(
												colorScheme
											)} focus:border-transparent placeholder:${
												colors.textTertiary
											}`}
										/>
									</div>
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Category <span className="text-red-500">*</span>
									</label>
									<select
										name="category"
										value={newBlog.category}
										onChange={handleInputChange}
										className={`w-full px-4 py-2 ${colors.background} border ${
											colors.border
										} rounded-xl text-sm ${
											colors.foreground
										} focus:outline-none focus:ring-2 ${getFocusRingClass(
											colorScheme
										)} focus:border-transparent`}
									>
										<option value="Technology">Technology</option>
										<option value="Design">Design</option>
										<option value="Backend">Backend</option>
										<option value="Frontend">Frontend</option>
										<option value="Business">Business</option>
										<option value="Marketing">Marketing</option>
									</select>
								</div>
							</div>

							{/* Content */}
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Content <span className="text-red-500">*</span>
								</label>
								<textarea
									name="content"
									value={newBlog.content}
									onChange={handleInputChange}
									placeholder="Write your blog content here..."
									rows="8"
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${
										colorScheme === "blue"
											? "focus:ring-blue-600 dark:focus:ring-blue-500"
											: colorScheme === "green"
											? "focus:ring-green-600 dark:focus:ring-green-500"
											: colorScheme === "purple"
											? "focus:ring-purple-600 dark:focus:ring-purple-500"
											: colorScheme === "orange"
											? "focus:ring-orange-600 dark:focus:ring-orange-500"
											: colorScheme === "red"
											? "focus:ring-red-600 dark:focus:ring-red-500"
											: colorScheme === "pink"
											? "focus:ring-pink-600 dark:focus:ring-pink-500"
											: colorScheme === "indigo"
											? "focus:ring-indigo-600 dark:focus:ring-indigo-500"
											: "focus:ring-zinc-900 dark:focus:ring-zinc-50"
									} focus:border-transparent resize-none placeholder:${
										colors.textTertiary
									}`}
								/>
								<p className={`text-xs ${colors.textMuted} mt-1`}>
									You can use markdown or HTML for formatting
								</p>
							</div>

							{/* Excerpt */}
							<div>
								<label
									className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
								>
									Excerpt
								</label>
								<textarea
									name="excerpt"
									value={newBlog.excerpt}
									onChange={handleInputChange}
									placeholder="Short description of the blog post..."
									rows="3"
									className={`w-full px-4 py-2 ${colors.background} border ${
										colors.border
									} rounded-xl text-sm ${
										colors.foreground
									} focus:outline-none focus:ring-2 ${
										colorScheme === "blue"
											? "focus:ring-blue-600 dark:focus:ring-blue-500"
											: colorScheme === "green"
											? "focus:ring-green-600 dark:focus:ring-green-500"
											: colorScheme === "purple"
											? "focus:ring-purple-600 dark:focus:ring-purple-500"
											: colorScheme === "orange"
											? "focus:ring-orange-600 dark:focus:ring-orange-500"
											: colorScheme === "red"
											? "focus:ring-red-600 dark:focus:ring-red-500"
											: colorScheme === "pink"
											? "focus:ring-pink-600 dark:focus:ring-pink-500"
											: colorScheme === "indigo"
											? "focus:ring-indigo-600 dark:focus:ring-indigo-500"
											: "focus:ring-zinc-900 dark:focus:ring-zinc-50"
									} focus:border-transparent resize-none placeholder:${
										colors.textTertiary
									}`}
								/>
								<p className={`text-xs ${colors.textMuted} mt-1`}>
									Brief summary shown in blog listings
								</p>
							</div>

							{/* Tags and Featured Image */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Tags
									</label>
									<div className="relative">
										<Tag
											className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
										/>
										<input
											type="text"
											name="tags"
											value={newBlog.tags}
											onChange={handleInputChange}
											placeholder="React, JavaScript, Frontend (comma separated)"
											className={`w-full pl-10 pr-4 py-2 ${
												colors.background
											} border ${colors.border} rounded-xl text-sm ${
												colors.foreground
											} focus:outline-none focus:ring-2 ${getFocusRingClass(
												colorScheme
											)} focus:border-transparent placeholder:${
												colors.textTertiary
											}`}
										/>
									</div>
									<p className={`text-xs ${colors.textMuted} mt-1`}>
										Separate tags with commas
									</p>
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Featured Image URL
									</label>
									<div className="relative">
										<ImageIcon
											className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
										/>
										<input
											type="url"
											name="featuredImage"
											value={newBlog.featuredImage}
											onChange={handleInputChange}
											placeholder="https://example.com/image.jpg"
											className={`w-full pl-10 pr-4 py-2 ${
												colors.background
											} border ${colors.border} rounded-xl text-sm ${
												colors.foreground
											} focus:outline-none focus:ring-2 ${getFocusRingClass(
												colorScheme
											)} focus:border-transparent placeholder:${
												colors.textTertiary
											}`}
										/>
									</div>
								</div>
							</div>

							{/* Publish Date and Status */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Publish Date
									</label>
									<div className="relative">
										<Calendar
											className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
										/>
										<input
											type="date"
											name="publishDate"
											value={newBlog.publishDate}
											onChange={handleInputChange}
											className={`w-full pl-10 pr-4 py-2 ${
												colors.background
											} border ${colors.border} rounded-xl text-sm ${
												colors.foreground
											} focus:outline-none focus:ring-2 ${getFocusRingClass(
												colorScheme
											)} focus:border-transparent`}
										/>
									</div>
									<p className={`text-xs ${colors.textMuted} mt-1`}>
										Leave empty to use current date
									</p>
								</div>
								<div>
									<label
										className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
									>
										Status <span className="text-red-500">*</span>
									</label>
									<select
										name="status"
										value={newBlog.status}
										onChange={handleInputChange}
										className={`w-full px-4 py-2 ${colors.background} border ${
											colors.border
										} rounded-xl text-sm ${
											colors.foreground
										} focus:outline-none focus:ring-2 ${getFocusRingClass(
											colorScheme
										)} focus:border-transparent`}
									>
										<option value="Draft">Draft</option>
										<option value="Published">Published</option>
									</select>
								</div>
							</div>
						</div>

						{/* Modal Footer */}
						<div
							className={`flex items-center justify-end gap-3 p-6 border-t ${colors.border}`}
						>
							<button
								onClick={handleCloseModal}
								className={`px-4 py-2 text-sm font-medium ${colors.textSecondary} ${colors.secondary} ${colors.hoverSecondary} rounded-xl transition-colors`}
							>
								Cancel
							</button>
							<button
								onClick={handleAddBlog}
								className={`px-4 py-2 text-sm font-medium ${scheme.primaryForeground} ${scheme.primary} ${scheme.primaryHover} rounded-xl transition-colors`}
							>
								Add Blog Post
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ContentManagementSystem;
