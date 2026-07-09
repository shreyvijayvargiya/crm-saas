import React, { useState, useMemo } from "react";
import { toast } from "sonner";
import {
	Search,
	ChevronDown,
	Plus,
	GripVertical,
	Paperclip,
	MessageCircle,
	PlusIcon,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import { useCrmData } from "../../utils/CrmDataContext";

const defaultTaskExtras = () => ({
	description: "",
	progressPercent: 0,
	priority: "Medium",
	attachments: 0,
	comments: 0,
	assignees: [],
});

const TaskProgressRing = ({ percent, className = "" }) => {
	const size = 36;
	const stroke = 3;
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const offset = c - (Math.min(100, Math.max(0, percent)) / 100) * c;
	const done = percent >= 100;
	return (
		<div className={`flex items-center gap-1.5 shrink-0 ${className}`}>
			<svg width={size} height={size} className="shrink-0 -rotate-90">
				<circle
					cx={size / 2}
					cy={size / 2}
					r={r}
					fill="none"
					className="stroke-zinc-200 dark:stroke-zinc-600"
					strokeWidth={stroke}
				/>
				<circle
					cx={size / 2}
					cy={size / 2}
					r={r}
					fill="none"
					strokeWidth={stroke}
					strokeLinecap="round"
					strokeDasharray={c}
					strokeDashoffset={offset}
					className={
						done
							? "stroke-emerald-500"
							: "stroke-amber-500"
					}
				/>
			</svg>
			<span
				className={`text-xs font-semibold tabular-nums ${
					done ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-600 dark:text-zinc-300"
				}`}
			>
				{Math.round(percent)}%
			</span>
		</div>
	);
};

const getTaskProgressPercent = (task) => {
	if (typeof task.progressPercent === "number") return task.progressPercent;
	if (task.progress === "Completed") return 100;
	if (task.progress === "In Progress") return 40;
	return 0;
};

const assigneeToneClasses = [
	"bg-violet-200 dark:bg-violet-900/60 text-violet-900 dark:text-violet-100",
	"bg-amber-200 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100",
	"bg-sky-200 dark:bg-sky-900/50 text-sky-900 dark:text-sky-100",
	"bg-emerald-200 dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-100",
];

const AssigneeStack = ({ assignees }) => {
	if (!assignees?.length) return null;
	return (
		<div className="flex items-center -space-x-2">
			{assignees.slice(0, 4).map((a, i) => (
				<div
					key={i}
					className={`relative ring-2 ring-white dark:ring-zinc-900 rounded-full overflow-hidden shrink-0 w-7 h-7 flex items-center justify-center text-[10px] font-bold ${assigneeToneClasses[i % assigneeToneClasses.length]}`}
					style={{ zIndex: assignees.length - i }}
					title={a.initials}
				>
					{a.initials}
				</div>
			))}
		</div>
	);
};

const Tasks = () => {
	// Theme hook
	const { colors } = useTheme();

	const { taskSections, setTaskSections } = useCrmData();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [editingSectionId, setEditingSectionId] = useState(null);
	const [newTask, setNewTask] = useState({
		name: "",
		icon: "",
		progress: "",
		description: "",
		priority: "Medium",
	});
	const [targetSectionId, setTargetSectionId] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isDragging, setIsDragging] = useState(false);

	const handleDragStart = (event, task) => {
		setIsDragging(true);
		event.dataTransfer.setData("text/plain", task.id);
		event.target.style.opacity = "0.5";
	};

	const handleDragEnd = (event) => {
		event.target.style.opacity = "1";
		setTimeout(() => setIsDragging(false), 100);
	};

	const handleDrop = (event, sectionId) => {
		event.preventDefault();
		const taskId = event.dataTransfer.getData("text/plain");

		// Find the task and its current section
		let taskToMove = null;
		let currentSectionId = null;

		taskSections.forEach((section) => {
			const task = section.tasks.find((task) => task.id === taskId);
			if (task) {
				taskToMove = task;
				currentSectionId = section.id;
			}
		});

		if (taskToMove) {
			// Check if dropping in the same section - if so, do nothing
			if (currentSectionId === sectionId) {
				return;
			}

			setTaskSections((prevSections) => {
				const updatedSections = prevSections.map((section) => {
					if (section.id === sectionId) {
						// Add task to target section (only if not already present)
						const taskExists = section.tasks.some((task) => task.id === taskId);
						if (!taskExists) {
							return {
								...section,
								tasks: [...section.tasks, taskToMove],
							};
						}
					}
					// Remove task from its original section
					if (section.id === currentSectionId) {
						return {
							...section,
							tasks: section.tasks.filter((task) => task.id !== taskId),
						};
					}
					return section;
				});
				return updatedSections;
			});

			const targetSection = taskSections.find((s) => s.id === sectionId);
			toast.success(
				`Task "${taskToMove.name}" moved to "${
					targetSection?.name || sectionId
				}"`
			);
		}
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleAddNewTask = (sectionId = null) => {
		setIsEditMode(false);
		setTargetSectionId(sectionId);
		setNewTask({
			name: "",
			icon: "",
			progress: "",
			description: "",
			priority: "Medium",
		});
		setIsModalOpen(true);
	};

	const handleEditTask = (task, sectionId) => {
		setIsEditMode(true);
		setEditingTaskId(task.id);
		setEditingSectionId(sectionId);
		setNewTask({
			name: task.name,
			icon: task.icon,
			progress: task.progress,
			description: task.description || "",
			priority: task.priority || "Medium",
		});
		setIsModalOpen(true);
	};

	const handleDeleteTask = (taskId, sectionId) => {
		setTaskSections((prevSections) => {
			const updatedSections = prevSections.map((section) => {
				if (section.id === sectionId) {
					return {
						...section,
						tasks: section.tasks.filter((task) => task.id !== taskId),
					};
				}
				return section;
			});
			return updatedSections;
		});
		toast.success("Task deleted!");
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setIsEditMode(false);
		setNewTask({
			name: "",
			icon: "",
			progress: "",
			description: "",
			priority: "Medium",
		});
		setTargetSectionId(null);
		setEditingTaskId(null);
		setEditingSectionId(null);
	};

	const progressPercentFor = (progressValue) => {
		if (progressValue === "Completed") return 100;
		if (progressValue === "In Progress") return 40;
		return 0;
	};

	const handleSubmit = () => {
		if (!newTask.name?.trim() || !newTask.icon?.trim()) return;

		if (isEditMode) {
			const progressValue = newTask.progress || "Not Started";
			setTaskSections((prevSections) =>
				prevSections.map((section) => {
					if (section.id === editingSectionId) {
						return {
							...section,
							tasks: section.tasks.map((task) =>
								task.id === editingTaskId
									? {
											...task,
											...newTask,
											progress: progressValue,
											progressPercent: progressPercentFor(progressValue),
									  }
									: task
							),
						};
					}
					return section;
				})
			);
			toast.success(`Task "${newTask.name}" updated!`);
		} else {
			const newTaskId = Date.now().toString();
			const sectionToAddTo = targetSectionId || "to-do";
			const progressValue =
				newTask.progress ||
				(sectionToAddTo === "to-do"
					? "Not Started"
					: sectionToAddTo === "in-progress"
					? "In Progress"
					: "Completed");
			setTaskSections((prevSections) =>
				prevSections.map((section) => {
					if (section.id === sectionToAddTo) {
						return {
							...section,
							tasks: [
								...section.tasks,
								{
									id: newTaskId,
									...defaultTaskExtras(),
									...newTask,
									progress: progressValue,
									progressPercent: progressPercentFor(progressValue),
								},
							],
						};
					}
					return section;
				})
			);
			toast.success(`Task "${newTask.name}" added!`);
		}
		handleCloseModal();
	};

	const handleDeleteFromModal = () => {
		if (!editingTaskId || !editingSectionId) return;
		handleDeleteTask(editingTaskId, editingSectionId);
		handleCloseModal();
	};

	// Filter and search logic
	const filteredSections = useMemo(() => {
		let filtered = taskSections.map((section) => ({
			...section,
			tasks: section.tasks.filter((task) => {
				// Search filter
				const q = searchTerm.toLowerCase();
				const matchesSearch =
					!searchTerm ||
					task.name.toLowerCase().includes(q) ||
					(task.description &&
						task.description.toLowerCase().includes(q));

				// Status filter
				let matchesFilter = true;
				if (filterStatus !== "all") {
					if (filterStatus === "to-dos") {
						matchesFilter = section.id === "to-do";
					} else if (filterStatus === "progress") {
						matchesFilter = section.id === "in-progress";
					} else if (filterStatus === "completed") {
						matchesFilter = section.id === "completed";
					}
				}

				return matchesSearch && matchesFilter;
			}),
		}));

		// If filter is set to a specific status, only show that section
		if (filterStatus !== "all") {
			if (filterStatus === "to-dos") {
				filtered = filtered.filter((section) => section.id === "to-do");
			} else if (filterStatus === "progress") {
				filtered = filtered.filter((section) => section.id === "in-progress");
			} else if (filterStatus === "completed") {
				filtered = filtered.filter((section) => section.id === "completed");
			}
		}

		return filtered;
	}, [taskSections, searchTerm, filterStatus]);

	return (
		<div className={`transition-all duration-100 ease-in`}>
			<div className="flex flex-col md:flex-row items-center justify-between gap-4 my-4 px-4">
				<p className={`${colors.foreground} text-xl font-semibold`}>
					Task Kanban board
				</p>
				<div className="flex items-center gap-3 w-full md:w-auto">
					<div className="relative flex-1 md:flex-initial md:min-w-[250px]">
						<Search
							className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none"
						/>
						<Input
							type="text"
							placeholder="Search tasks..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-9"
						/>
					</div>

					{/* Filter Dropdown */}
					<div className="relative">
						<Button
							type="button"
							variant="outline"
							onClick={() => setIsFilterOpen(!isFilterOpen)}
							className="gap-2"
						>
							<span>
								{filterStatus === "all"
									? "All Tasks"
									: filterStatus === "to-dos"
									? "Backlog"
									: filterStatus === "progress"
									? "In Progress"
									: "Done"}
							</span>
							<ChevronDown
								className={cn(
									"w-4 h-4 transition-transform",
									isFilterOpen && "rotate-180"
								)}
							/>
						</Button>
						{isFilterOpen && (
							<>
								<div
									className="fixed inset-0 z-10"
									onClick={() => setIsFilterOpen(false)}
								></div>
								<div
									className={`absolute right-0 mt-2 w-48 ${colors.card} border ${colors.border} rounded-xl shadow-lg z-20 py-2`}
								>
									{[
										{ value: "all", label: "All Tasks" },
										{ value: "to-dos", label: "Backlog" },
										{ value: "progress", label: "In Progress" },
										{ value: "completed", label: "Done" },
									].map(({ value, label }) => (
										<Button
											key={value}
											type="button"
											variant={filterStatus === value ? "default" : "ghost"}
											className="w-full justify-start rounded-none h-auto py-2 px-4 font-normal"
											onClick={() => {
												setFilterStatus(value);
												setIsFilterOpen(false);
											}}
										>
											{label}
										</Button>
									))}
								</div>
							</>
						)}
					</div>

					<Button onClick={handleAddNewTask} className="gap-1 whitespace-nowrap">
						<PlusIcon className="w-4 h-4" />
						Add new
					</Button>
				</div>
			</div>

			<FormModal
				open={isModalOpen}
				onClose={handleCloseModal}
				title={isEditMode ? "Edit task" : "Add new task"}
				subtitle={
					targetSectionId && !isEditMode
						? `Adding to ${taskSections.find((s) => s.id === targetSectionId)?.name}`
						: isEditMode
						? "Update details or delete this task"
						: "Create a task for your board"
				}
				onSubmit={handleSubmit}
				saveLabel={isEditMode ? "Save changes" : "Add task"}
				showDelete={isEditMode}
				onDelete={handleDeleteFromModal}
				deleteLabel="Delete task"
				maxWidth="max-w-lg"
			>
				<FormField label="Task name" htmlFor="task-name" required>
					<Input
						id="task-name"
						type="text"
						placeholder="e.g. Prepare presentation"
						value={newTask.name}
						onChange={(e) =>
							setNewTask({ ...newTask, name: e.target.value })
						}
						required
					/>
				</FormField>
				<FormField label="Icon" htmlFor="task-icon" required hint="Emoji or short label">
					<Input
						id="task-icon"
						type="text"
						placeholder="📝"
						value={newTask.icon}
						onChange={(e) =>
							setNewTask({ ...newTask, icon: e.target.value })
						}
						required
					/>
				</FormField>
				<FormField label="Description" htmlFor="task-description">
					<textarea
						id="task-description"
						rows={3}
						placeholder="What needs to be done?"
						value={newTask.description}
						onChange={(e) =>
							setNewTask({ ...newTask, description: e.target.value })
						}
						className={cn(
							"flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
						)}
					/>
				</FormField>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<FormField label="Status" htmlFor="task-progress">
						<FormSelect
							id="task-progress"
							value={newTask.progress}
							onChange={(e) =>
								setNewTask({ ...newTask, progress: e.target.value })
							}
							options={["Not Started", "In Progress", "Completed"]}
						/>
					</FormField>
					<FormField label="Priority" htmlFor="task-priority">
						<FormSelect
							id="task-priority"
							value={newTask.priority}
							onChange={(e) =>
								setNewTask({ ...newTask, priority: e.target.value })
							}
							options={["High", "Medium", "Low"]}
						/>
					</FormField>
				</div>
			</FormModal>

			<div className="flex flex-col lg:flex-row gap-5 px-4 pb-10 max-w-7xl items-start">
				{filteredSections.map((section) => (
					<div
						key={section.id}
						className="w-full lg:flex-1 lg:min-w-0 rounded-2xl border border-zinc-200/90 dark:border-zinc-700/80 bg-zinc-100/90 dark:bg-zinc-900/45 p-4 shadow-sm"
						onDrop={(event) => handleDrop(event, section.id)}
						onDragOver={handleDragOver}
					>
						<div className="flex items-center justify-between gap-3 mb-4">
							<div className="flex items-center gap-2 min-w-0">
								<h3
									className={`font-bold text-[15px] sm:text-base tracking-tight truncate ${colors.foreground}`}
								>
									{section.name}
								</h3>
								<Badge variant="secondary" className="h-7 min-w-[1.75rem] px-1.5 justify-center font-semibold">
									{section.tasks.length}
								</Badge>
							</div>
							<div className="flex items-center gap-1 shrink-0">
								<Button
									type="button"
									variant="ghost"
									size="icon"
									title="Reorder column"
									aria-label="Reorder column"
									className="cursor-grab active:cursor-grabbing"
								>
									<GripVertical className="w-4 h-4" />
								</Button>
								<Button
									type="button"
									variant="outline"
									size="icon"
									className="rounded-full"
									onClick={() => handleAddNewTask(section.id)}
									title="Add task"
									aria-label="Add task"
								>
									<Plus className="w-4 h-4" strokeWidth={2.25} />
								</Button>
							</div>
						</div>
						<div className="space-y-3">
							{section.tasks.map((task) => {
								const pct = getTaskProgressPercent(task);
								const priority = task.priority || "Medium";
								const attachments = task.attachments ?? 0;
								const comments = task.comments ?? 0;
								const description =
									task.description ||
									"Add a short description to give the team more context.";
								return (
									<div
										key={task.id}
										className={`rounded-2xl border ${colors.border} ${colors.card} shadow-sm p-4 transition-all duration-200 cursor-pointer hover:shadow-md`}
										draggable
										onDragStart={(event) => handleDragStart(event, task)}
										onDragEnd={handleDragEnd}
										onClick={() => {
											if (!isDragging) {
												handleEditTask(task, section.id);
											}
										}}
									>
										<p
											className={`font-semibold text-[15px] leading-snug ${colors.foreground} pr-1`}
										>
											{task.name}
										</p>
										<p
											className={`mt-1.5 text-sm leading-relaxed line-clamp-2 ${colors.textSecondary}`}
										>
											{description}
										</p>
										<div className="flex items-center justify-between gap-3 mt-4">
											<AssigneeStack assignees={task.assignees} />
											<TaskProgressRing percent={pct} />
										</div>
										<div
											className={`mt-4 pt-3  flex items-center justify-between gap-2`}
										>
											<Badge
												variant={
													priority === "High"
														? "high"
														: priority === "Low"
														? "low"
														: "medium"
												}
												className="text-xs font-medium"
											>
												{priority}
											</Badge>
											<div
												className={`flex items-center gap-4 text-xs ${colors.textMuted}`}
											>
												<span className="inline-flex items-center gap-1">
													<Paperclip className="w-3.5 h-3.5" />
													{attachments}
												</span>
												<span className="inline-flex items-center gap-1">
													<MessageCircle className="w-3.5 h-3.5" />
													{comments}
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
export default Tasks;
