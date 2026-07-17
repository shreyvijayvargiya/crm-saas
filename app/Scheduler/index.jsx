import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	List,
	Plus,
	Search,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import { DatePicker } from "@/components/ui/date-picker";
import {
	SCHEDULER_PLATFORMS,
	emptyContentForPlatform,
	getPlatform,
	postPreviewTitle,
} from "./platforms";
import { INITIAL_SCHEDULED_POSTS } from "./schedulerSeedData";

function formatDate(date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function formatDisplayDate(dateString) {
	const date = new Date(`${dateString}T12:00:00`);
	return date.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

function isToday(date) {
	const today = new Date();
	return (
		date.getDate() === today.getDate() &&
		date.getMonth() === today.getMonth() &&
		date.getFullYear() === today.getFullYear()
	);
}

const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const STATUS_OPTIONS = [
	{ value: "draft", label: "Draft" },
	{ value: "scheduled", label: "Scheduled" },
];

function PlatformChip({ platformId, title, time, onClick, compact = false }) {
	const platform = getPlatform(platformId);
	if (!platform) return null;
	const { Icon, chipClass, label } = platform;

	return (
		<button
			type="button"
			onClick={(e) => {
				e.stopPropagation();
				onClick?.();
			}}
			className={cn(
				"flex w-full items-center gap-1.5 rounded-lg px-1.5 py-1 text-left text-[10px] sm:text-xs transition hover:opacity-90",
				chipClass
			)}
			title={`${label}${title ? `: ${title}` : ""}`}
		>
			<span
				className={cn(
					"flex h-4 w-4 shrink-0 items-center justify-center rounded-md",
					platform.color
				)}
			>
				<Icon className="h-2.5 w-2.5" />
			</span>
			{!compact && (
				<span className="min-w-0 flex-1 truncate font-medium">
					{time ? `${time} · ` : ""}
					{title || label}
				</span>
			)}
		</button>
	);
}

function PlatformAddMenu({ dateString, onSelectPlatform }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100 data-[state=open]:opacity-100"
					aria-label={`Schedule content on ${dateString}`}
					onClick={(e) => e.stopPropagation()}
				>
					<Plus className="h-3.5 w-3.5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="w-56 z-[80]">
				<DropdownMenuLabel className="text-xs">Schedule for platform</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{SCHEDULER_PLATFORMS.map((platform) => {
					const { Icon } = platform;
					return (
						<DropdownMenuItem
							key={platform.id}
							className="gap-2.5 text-xs"
							onSelect={() => onSelectPlatform(platform.id, dateString)}
						>
							<span
								className={cn(
									"flex h-6 w-6 shrink-0 items-center justify-center rounded-md",
									platform.color
								)}
							>
								<Icon className="h-3.5 w-3.5" />
							</span>
							{platform.label}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

function PlatformFields({ platform, content, onChange }) {
	if (!platform) return null;

	return (
		<div className="space-y-4">
			{platform.fields.map((field) => {
				const value = content?.[field.key] ?? "";
				const id = `sch-field-${platform.id}-${field.key}`;

				if (field.type === "textarea") {
					const len = String(value).length;
					const limit = platform.charLimit;
					return (
						<FormField
							key={field.key}
							label={field.label}
							htmlFor={id}
							required={field.required}
						>
							<Textarea
								id={id}
								value={value}
								onChange={(e) => onChange(field.key, e.target.value)}
								placeholder={field.placeholder}
								rows={4}
								required={field.required}
								maxLength={limit || undefined}
							/>
							{limit ? (
								<p className="mt-1 text-[11px] text-muted-foreground text-right">
									{len}/{limit}
								</p>
							) : null}
						</FormField>
					);
				}

				if (field.type === "select") {
					return (
						<FormField
							key={field.key}
							label={field.label}
							htmlFor={id}
							required={field.required}
						>
							<FormSelect
								id={id}
								value={value}
								onChange={(e) => onChange(field.key, e.target.value)}
								options={(field.options || []).map((opt) => ({
									value: opt,
									label: opt,
								}))}
							/>
						</FormField>
					);
				}

				return (
					<FormField
						key={field.key}
						label={field.label}
						htmlFor={id}
						required={field.required}
					>
						<Input
							id={id}
							type="text"
							value={value}
							onChange={(e) => onChange(field.key, e.target.value)}
							placeholder={field.placeholder}
							required={field.required}
						/>
					</FormField>
				);
			})}
		</div>
	);
}

const Scheduler = () => {
	const { colors } = useTheme();
	const [posts, setPosts] = useState(INITIAL_SCHEDULED_POSTS);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [viewMode, setViewMode] = useState("calendar");
	const [search, setSearch] = useState("");
	const [editingPost, setEditingPost] = useState(null);
	const [modalOpen, setModalOpen] = useState(false);

	const calendarDays = useMemo(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();
		const days = [];

		const prevMonth = new Date(year, month, 0);
		const prevMonthDays = prevMonth.getDate();
		for (let i = startingDayOfWeek - 1; i >= 0; i--) {
			days.push({
				date: new Date(year, month - 1, prevMonthDays - i),
				isCurrentMonth: false,
			});
		}

		for (let day = 1; day <= daysInMonth; day++) {
			days.push({ date: new Date(year, month, day), isCurrentMonth: true });
		}

		const remaining = 42 - days.length;
		for (let day = 1; day <= remaining; day++) {
			days.push({
				date: new Date(year, month + 1, day),
				isCurrentMonth: false,
			});
		}

		return days;
	}, [currentDate]);

	const filteredPosts = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return posts;
		return posts.filter((post) => {
			const platform = getPlatform(post.platform);
			const haystack = [
				platform?.label,
				post.status,
				post.date,
				post.time,
				postPreviewTitle(post),
				...Object.values(post.content ?? {}),
			]
				.join(" ")
				.toLowerCase();
			return haystack.includes(q);
		});
	}, [posts, search]);

	const getPostsForDate = (date) => {
		const dateString = formatDate(date);
		return filteredPosts.filter((p) => p.date === dateString);
	};

	const listPosts = useMemo(() => {
		return [...filteredPosts].sort((a, b) => {
			const byDate = a.date.localeCompare(b.date);
			if (byDate !== 0) return byDate;
			return String(a.time || "").localeCompare(String(b.time || ""));
		});
	}, [filteredPosts]);

	const openNewPost = (platformId, dateString) => {
		const platform = getPlatform(platformId);
		if (!platform) return;

		const draft = {
			id: `sch-${Date.now()}`,
			platform: platformId,
			date: dateString,
			time: "10:00",
			status: "draft",
			content: emptyContentForPlatform(platformId),
			_isNew: true,
		};

		setPosts((prev) => [...prev, draft]);
		setEditingPost(draft);
		setModalOpen(true);
		toast.message(`${platform.label} chip added`, {
			description: "Fill in the content to schedule.",
		});
	};

	const openEditPost = (post) => {
		setEditingPost({ ...post, content: { ...post.content } });
		setModalOpen(true);
	};

	const closeModal = () => {
		setPosts((prev) =>
			prev.filter((p) => {
				if (!editingPost || p.id !== editingPost.id) return true;
				if (!editingPost._isNew) return true;
				const hasContent = Object.values(editingPost.content ?? {}).some(
					(v) => String(v ?? "").trim().length > 0
				);
				return hasContent;
			})
		);
		setModalOpen(false);
		setEditingPost(null);
	};

	const updateEditingField = (key, value) => {
		setEditingPost((prev) =>
			prev
				? {
						...prev,
						content: { ...prev.content, [key]: value },
					}
				: prev
		);
	};

	const validatePost = (post) => {
		const platform = getPlatform(post.platform);
		if (!platform) return "Unknown platform";
		if (!post.date) return "Pick a date";
		for (const field of platform.fields) {
			if (field.required && !String(post.content?.[field.key] ?? "").trim()) {
				return `${field.label} is required`;
			}
		}
		return null;
	};

	const persistPost = (nextStatus) => {
		if (!editingPost) return;
		const next = {
			...editingPost,
			status: nextStatus ?? editingPost.status ?? "scheduled",
		};
		const error = validatePost(next);
		if (error) {
			toast.error(error);
			return;
		}

		const saved = { ...next };
		delete saved._isNew;

		setPosts((prev) =>
			prev.map((p) => (p.id === saved.id ? saved : p))
		);
		toast.success(
			saved.status === "scheduled" ? "Post scheduled" : "Draft saved"
		);
		setModalOpen(false);
		setEditingPost(null);
	};

	const handleSave = () => persistPost(editingPost?.status || "scheduled");

	const handleDelete = () => {
		if (!editingPost) return;
		setPosts((prev) => prev.filter((p) => p.id !== editingPost.id));
		toast.success("Scheduled post removed");
		setModalOpen(false);
		setEditingPost(null);
	};

	const editingPlatform = editingPost
		? getPlatform(editingPost.platform)
		: null;

	return (
		<div className="p-4 sm:p-6 transition-all duration-100 ease-in">
			<div className="mb-5 flex flex-col gap-4">
				<div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
					<div>
						<h1 className={`text-xl sm:text-2xl font-semibold tracking-tight ${colors.foreground}`}>
							Content scheduler
						</h1>
						<p className={`text-sm mt-1 ${colors.mutedForeground}`}>
							Plan posts across social platforms — pick a date, choose a
							channel, edit platform-specific fields.
						</p>
					</div>
					<div className="flex items-center gap-2">
						<div
							className={cn(
								"inline-flex rounded-xl border p-0.5",
								colors.border
							)}
							role="tablist"
							aria-label="Scheduler view"
						>
							<Button
								type="button"
								variant={viewMode === "calendar" ? "default" : "ghost"}
								size="sm"
								className="h-8 gap-1.5 px-2.5"
								onClick={() => setViewMode("calendar")}
								aria-pressed={viewMode === "calendar"}
							>
								<CalendarIcon className="h-3.5 w-3.5" />
								Calendar
							</Button>
							<Button
								type="button"
								variant={viewMode === "list" ? "default" : "ghost"}
								size="sm"
								className="h-8 gap-1.5 px-2.5"
								onClick={() => setViewMode("list")}
								aria-pressed={viewMode === "list"}
							>
								<List className="h-3.5 w-3.5" />
								List
							</Button>
						</div>
					</div>
				</div>

				<div className="relative max-w-md">
					<Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Search posts, platforms, captions…"
						className="pl-9"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>

			{viewMode === "calendar" ? (
				<>
					<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
						<div className="flex items-center gap-2">
							<h2 className={`text-lg font-semibold ${colors.foreground}`}>
								{MONTH_NAMES[currentDate.getMonth()]}{" "}
								{currentDate.getFullYear()}
							</h2>
							<div className="flex items-center gap-1">
								<Button
									variant="ghost"
									size="icon"
									onClick={() =>
										setCurrentDate(
											new Date(
												currentDate.getFullYear(),
												currentDate.getMonth() - 1,
												1
											)
										)
									}
									aria-label="Previous month"
								>
									<ChevronLeft className="h-4 w-4" />
								</Button>
								<Button
									variant="ghost"
									size="icon"
									onClick={() =>
										setCurrentDate(
											new Date(
												currentDate.getFullYear(),
												currentDate.getMonth() + 1,
												1
											)
										)
									}
									aria-label="Next month"
								>
									<ChevronRight className="h-4 w-4" />
								</Button>
							</div>
						</div>
						<Button
							variant="outline"
							size="sm"
							onClick={() => setCurrentDate(new Date())}
						>
							Today
						</Button>
					</div>

					<div className="-mx-1 overflow-x-auto px-1">
						<Card className="overflow-hidden min-w-[720px] sm:min-w-0">
							<div className={`grid grid-cols-7 border-b ${colors.border}`}>
								{DAY_NAMES.map((day) => (
									<div
										key={day}
										className={`p-2 sm:p-3 text-center text-xs sm:text-sm font-semibold ${colors.foreground} border-r ${colors.border} last:border-r-0`}
									>
										{day}
									</div>
								))}
							</div>

							<div className="grid grid-cols-7 gap-0.5 sm:gap-1 p-0.5 sm:p-1">
								{calendarDays.map((day, index) => {
									const dateString = formatDate(day.date);
									const dayPosts = getPostsForDate(day.date);
									const today = isToday(day.date);

									return (
										<div
											key={index}
											className={cn(
												"group relative min-h-[96px] sm:min-h-[112px] rounded-xl border p-1.5 sm:p-2 transition-colors",
												colors.border,
												day.isCurrentMonth ? colors.background : colors.muted,
												today && "ring-2 ring-foreground/80"
											)}
										>
											<div className="mb-1 flex items-center justify-between gap-1">
												<span
													className={cn(
														"text-xs sm:text-sm font-medium",
														day.isCurrentMonth
															? colors.foreground
															: colors.mutedForeground,
														today && "font-bold"
													)}
												>
													{day.date.getDate()}
												</span>
												<PlatformAddMenu
													dateString={dateString}
													onSelectPlatform={openNewPost}
												/>
											</div>

											<div className="space-y-1">
												{dayPosts.slice(0, 3).map((post) => (
													<PlatformChip
														key={post.id}
														platformId={post.platform}
														title={postPreviewTitle(post)}
														time={post.time}
														onClick={() => openEditPost(post)}
													/>
												))}
												{dayPosts.length > 3 && (
													<p
														className={`px-1 text-[10px] ${colors.mutedForeground}`}
													>
														+{dayPosts.length - 3} more
													</p>
												)}
											</div>
										</div>
									);
								})}
							</div>
						</Card>
					</div>

					<div className="mt-4 flex flex-wrap gap-2">
						{SCHEDULER_PLATFORMS.map((p) => {
							const { Icon } = p;
							return (
								<span
									key={p.id}
									className={cn(
										"inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px]",
										colors.border,
										colors.mutedForeground
									)}
								>
									<span
										className={cn(
											"flex h-4 w-4 items-center justify-center rounded",
											p.color
										)}
									>
										<Icon className="h-2.5 w-2.5" />
									</span>
									{p.label}
								</span>
							);
						})}
					</div>
				</>
			) : (
				<Card className="overflow-hidden">
					<div
						className={`grid grid-cols-[auto_1fr_auto_auto] gap-3 border-b px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide ${colors.border} ${colors.mutedForeground}`}
					>
						<span>Platform</span>
						<span>Content</span>
						<span className="hidden sm:block">When</span>
						<span>Status</span>
					</div>
					{listPosts.length === 0 ? (
						<div className={`px-4 py-12 text-center text-sm ${colors.mutedForeground}`}>
							No scheduled posts match your search.
						</div>
					) : (
						<ul className={`divide-y ${colors.border}`}>
							{listPosts.map((post) => {
								const platform = getPlatform(post.platform);
								const Icon = platform?.Icon;
								return (
									<li key={post.id}>
										<button
											type="button"
											onClick={() => openEditPost(post)}
											className={cn(
												"grid w-full grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-4 py-3 text-left transition",
												colors.hoverSecondary
											)}
										>
											<span
												className={cn(
													"flex h-8 w-8 items-center justify-center rounded-lg",
													platform?.color
												)}
											>
												{Icon ? <Icon className="h-4 w-4" /> : null}
											</span>
											<div className="min-w-0">
												<p
													className={`truncate text-sm font-medium ${colors.foreground}`}
												>
													{postPreviewTitle(post)}
												</p>
												<p
													className={`truncate text-xs ${colors.mutedForeground}`}
												>
													{platform?.label}
													<span className="sm:hidden">
														{" "}
														· {post.date} {post.time}
													</span>
												</p>
											</div>
											<div
												className={`hidden sm:block text-xs tabular-nums ${colors.mutedForeground}`}
											>
												<div>{formatDisplayDate(post.date)}</div>
												<div>{post.time || "—"}</div>
											</div>
											<Badge
												variant={
													post.status === "scheduled" ? "default" : "secondary"
												}
												className="capitalize"
											>
												{post.status}
											</Badge>
										</button>
									</li>
								);
							})}
						</ul>
					)}
				</Card>
			)}

			<FormModal
				open={modalOpen && !!editingPost}
				onClose={closeModal}
				title={
					editingPlatform
						? `${editingPost?._isNew ? "New" : "Edit"} ${editingPlatform.label} post`
						: "Edit post"
				}
				subtitle={
					editingPost
						? `${formatDisplayDate(editingPost.date)}${editingPost.time ? ` · ${editingPost.time}` : ""}`
						: undefined
				}
				onSubmit={handleSave}
				saveLabel={
					editingPost?.status === "draft" ? "Save draft" : "Schedule"
				}
				showDelete
				onDelete={handleDelete}
				deleteLabel="Remove"
				maxWidth="max-w-lg"
			>
				{editingPost && editingPlatform && (
					<>
						<div className="flex items-center gap-2 mb-1">
							<span
								className={cn(
									"flex h-8 w-8 items-center justify-center rounded-lg",
									editingPlatform.color
								)}
							>
								{(() => {
									const PlatformIcon = editingPlatform.Icon;
									return <PlatformIcon className="h-4 w-4" />;
								})()}
							</span>
							<div>
								<p className={`text-sm font-medium ${colors.foreground}`}>
									{editingPlatform.label}
								</p>
								<p className={`text-xs ${colors.mutedForeground}`}>
									Fields adapt to this platform
								</p>
							</div>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<FormField label="Date" htmlFor="sch-date" required>
								<DatePicker
									id="sch-date"
									value={editingPost.date}
									onChange={(date) =>
										setEditingPost((prev) =>
											prev ? { ...prev, date } : prev
										)
									}
									className="w-full"
								/>
							</FormField>
							<FormField label="Time" htmlFor="sch-time">
								<Input
									id="sch-time"
									type="time"
									value={editingPost.time || ""}
									onChange={(e) =>
										setEditingPost((prev) =>
											prev ? { ...prev, time: e.target.value } : prev
										)
									}
								/>
							</FormField>
						</div>

						<div className="space-y-2">
							<Label htmlFor="sch-status">Status</Label>
							<FormSelect
								id="sch-status"
								value={editingPost.status}
								onChange={(e) =>
									setEditingPost((prev) =>
										prev ? { ...prev, status: e.target.value } : prev
									)
								}
								options={STATUS_OPTIONS}
							/>
						</div>

						<PlatformFields
							platform={editingPlatform}
							content={editingPost.content}
							onChange={updateEditingField}
						/>

						<div className="flex flex-wrap gap-2 pt-1">
							<Button
								type="button"
								variant="outline"
								size="sm"
								onClick={() => persistPost("draft")}
							>
								Save as draft
							</Button>
							<Button
								type="button"
								size="sm"
								onClick={() => persistPost("scheduled")}
							>
								Schedule
							</Button>
						</div>
					</>
				)}
			</FormModal>
		</div>
	);
};

export default Scheduler;
