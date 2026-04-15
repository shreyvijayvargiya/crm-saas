import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
	Search,
	ChevronDown,
	Plus,
	GripVertical,
	Trash2,
	Paperclip,
	MessageCircle,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

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
	const { colorScheme, colors, scheme } = useTheme();

	const [taskSections, setTaskSections] = useState([
		{
			id: "to-do",
			name: "Backlog",
			tasks: [
				{
					id: "201",
					name: "Prepare presentation",
					description:
						"Draft slides for Q4 review and align with stakeholders on messaging...",
					progress: "Not Started",
					icon: "📝",
					progressPercent: 0,
					priority: "High",
					attachments: 2,
					comments: 4,
					assignees: [{ initials: "JD" }, { initials: "EC" }, { initials: "GR" }],
				},
				{
					id: "202",
					name: "Send email updates",
					description:
						"Weekly summary to the team including blockers and next steps...",
					progress: "In Progress",
					icon: "📧",
					progressPercent: 40,
					priority: "Medium",
					attachments: 1,
					comments: 2,
					assignees: [{ initials: "AK" }, { initials: "LM" }],
				},
				{
					id: "205",
					name: "Research new tools",
					description:
						"Evaluate CRM integrations and shortlist vendors for pilot...",
					progress: "Not Started",
					icon: "🔍",
					progressPercent: 15,
					priority: "Medium",
					attachments: 0,
					comments: 3,
					assignees: [{ initials: "JD" }],
				},
				{
					id: "206",
					name: "Plan team meeting",
					description:
						"Schedule agenda, book room, and invite cross-functional owners...",
					progress: "Not Started",
					icon: "📅",
					progressPercent: 0,
					priority: "Low",
					attachments: 0,
					comments: 1,
					assignees: [{ initials: "MV" }, { initials: "SO" }],
				},
			],
		},
		{
			id: "in-progress",
			name: "In Progress",
			tasks: [
				{
					id: "203",
					name: "Develop new feature",
					description:
						"Implement Kanban board filters and API wiring for task moves...",
					progress: "In Progress",
					icon: "💻",
					progressPercent: 65,
					priority: "High",
					attachments: 3,
					comments: 8,
					assignees: [{ initials: "EC" }, { initials: "GR" }, { initials: "NT" }],
				},
				{
					id: "207",
					name: "Write documentation",
					description:
						"Developer onboarding guide and API reference for internal teams...",
					progress: "In Progress",
					icon: "📖",
					progressPercent: 40,
					priority: "Medium",
					attachments: 1,
					comments: 2,
					assignees: [{ initials: "SR" }],
				},
				{
					id: "208",
					name: "Test application",
					description:
						"Regression pass on critical flows before the release candidate...",
					progress: "In Progress",
					icon: "🧪",
					progressPercent: 55,
					priority: "High",
					attachments: 2,
					comments: 5,
					assignees: [{ initials: "QA" }, { initials: "PM" }],
				},
			],
		},
		{
			id: "completed",
			name: "Done",
			tasks: [
				{
					id: "204",
					name: "Fix bugs",
					description:
						"Resolved P1 issues from the last sprint and verified in staging...",
					progress: "Completed",
					icon: "✅",
					progressPercent: 100,
					priority: "High",
					attachments: 4,
					comments: 6,
					assignees: [{ initials: "EC" }, { initials: "FB" }],
				},
				{
					id: "209",
					name: "Deploy application",
					description:
						"Production rollout completed with monitoring and rollback plan...",
					progress: "Completed",
					icon: "🚀",
					progressPercent: 100,
					priority: "Medium",
					attachments: 1,
					comments: 3,
					assignees: [{ initials: "OP" }],
				},
				{
					id: "210",
					name: "Conduct user training",
					description:
						"Recorded session and shared materials with the customer success team...",
					progress: "Completed",
					icon: "👩‍🏫",
					progressPercent: 100,
					priority: "Low",
					attachments: 0,
					comments: 1,
					assignees: [{ initials: "TR" }, { initials: "CS" }],
				},
			],
		},
	]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [editingSectionId, setEditingSectionId] = useState(null);
	const [newTask, setNewTask] = useState({ name: "", icon: "", progress: "" });
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
		setNewTask({ name: "", icon: "", progress: "" });
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
		setNewTask({ name: "", icon: "", progress: "" });
		setTargetSectionId(null);
		setEditingTaskId(null);
		setEditingSectionId(null);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newTask.name && newTask.icon) {
			if (isEditMode) {
				// Update existing task
				setTaskSections((prevSections) => {
					const updatedSections = prevSections.map((section) => {
						if (section.id === editingSectionId) {
							return {
								...section,
								tasks: section.tasks.map((task) =>
									task.id === editingTaskId ? { ...task, ...newTask } : task
								),
							};
						}
						return section;
					});
					return updatedSections;
				});
				toast.success(`Task "${newTask.name}" updated!`);
			} else {
				// Add new task
				const newTaskId = Date.now().toString();
				const sectionToAddTo = targetSectionId || "to-do";
				const progressValue =
					newTask.progress ||
					(sectionToAddTo === "to-do"
						? "Not Started"
						: sectionToAddTo === "in-progress"
						? "In Progress"
						: "Completed");
				const progressPercent =
					progressValue === "Completed"
						? 100
						: progressValue === "In Progress"
						? 40
						: 0;
				setTaskSections((prevSections) => {
					const updatedSections = prevSections.map((section) => {
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
										progressPercent,
									},
								],
							};
						}
						return section;
					});
					return updatedSections;
				});
				toast.success(`Task "${newTask.name}" added!`);
			}
			handleCloseModal();
		}
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
					{/* Search Bar */}
					<div className="relative flex-1 md:flex-initial md:min-w-[250px]">
						<Search
							className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${colors.mutedForeground}`}
						/>
						<input
							type="text"
							placeholder="Search tasks..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className={`w-full pl-10 pr-4 py-2 ${colors.background} border ${
								colors.border
							} rounded-xl text-sm ${
								colors.foreground
							} focus:outline-none focus:ring-2 ${getFocusRingClass(
								colorScheme
							)} focus:border-transparent placeholder:${colors.textTertiary}`}
						/>
					</div>

					{/* Filter Dropdown */}
					<div className="relative">
						<button
							onClick={() => setIsFilterOpen(!isFilterOpen)}
							className={`flex items-center gap-2 px-4 py-2 border ${colors.border} ${colors.card} rounded-xl text-sm ${colors.foreground} hover:${colors.hoverSecondary} transition-colors`}
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
								className={`w-4 h-4 transition-transform ${
									isFilterOpen ? "rotate-180" : ""
								}`}
							/>
						</button>
						{isFilterOpen && (
							<>
								<div
									className="fixed inset-0 z-10"
									onClick={() => setIsFilterOpen(false)}
								></div>
								<div
									className={`absolute right-0 mt-2 w-48 ${colors.card} border ${colors.border} rounded-xl shadow-lg z-20 py-2`}
								>
									<button
										onClick={() => {
											setFilterStatus("all");
											setIsFilterOpen(false);
										}}
										className={`w-full text-left px-4 py-2 text-sm hover:${colors.hoverSecondary} transition-colors ${
											filterStatus === "all"
												? `${scheme.primary} ${scheme.primaryForeground}`
												: ""
										}`}
									>
										All Tasks
									</button>
									<button
										onClick={() => {
											setFilterStatus("to-dos");
											setIsFilterOpen(false);
										}}
										className={`w-full text-left px-4 py-2 text-sm hover:${colors.hoverSecondary} transition-colors ${
											filterStatus === "to-dos"
												? `${scheme.primary} ${scheme.primaryForeground}`
												: ""
										}`}
									>
										Backlog
									</button>
									<button
										onClick={() => {
											setFilterStatus("progress");
											setIsFilterOpen(false);
										}}
										className={`w-full text-left px-4 py-2 text-sm hover:${colors.hoverSecondary} transition-colors ${
											filterStatus === "progress"
												? `${scheme.primary} ${scheme.primaryForeground}`
												: ""
										}`}
									>
										In Progress
									</button>
									<button
										onClick={() => {
											setFilterStatus("completed");
											setIsFilterOpen(false);
										}}
										className={`w-full text-left px-4 py-2 text-sm hover:${colors.hoverSecondary} transition-colors ${
											filterStatus === "completed"
												? `${scheme.primary} ${scheme.primaryForeground}`
												: ""
										}`}
									>
										Done
									</button>
								</div>
							</>
						)}
					</div>

					{/* Add New Button */}
					<button
						className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded-xl text-xs px-4 py-2.5 transition-all duration-100 ease-in hover:px-6 whitespace-nowrap`}
						onClick={handleAddNewTask}
					>
						Add new
					</button>
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div
						className={`modal-content ${colors.card} rounded-xl ${colors.shadow} p-6 border ${colors.border} w-full max-w-md`}
					>
						<div className="flex justify-between items-center mb-4">
							<p className={colors.foreground}>
								{isEditMode ? "Edit task" : "Add new task"}
								{targetSectionId && !isEditMode && (
									<span className={`text-sm ${colors.textSecondary} ml-2`}>
										to{" "}
										{taskSections.find((s) => s.id === targetSectionId)?.name}
									</span>
								)}
							</p>
							<span
								className={`close cursor-pointer px-2 rounded-xl ${colors.textMuted} ${colors.hoverSecondary} transition-colors`}
								onClick={handleCloseModal}
							>
								&times;
							</span>
						</div>
						<form onSubmit={handleSubmit} className="mt-4">
							<input
								type="text"
								placeholder="Task Name"
								value={newTask.name}
								onChange={(e) =>
									setNewTask({ ...newTask, name: e.target.value })
								}
								required
								className={`border ${colors.border} ${
									colors.input
								} rounded px-2 py-1 ${
									colors.hoverSecondary
								} w-full mb-4 outline-none ${colors.background} ${
									colors.foreground
								} placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
							/>
							<input
								type="text"
								placeholder="Task Icon"
								value={newTask.icon}
								onChange={(e) =>
									setNewTask({ ...newTask, icon: e.target.value })
								}
								required
								className={`border ${colors.border} ${
									colors.input
								} rounded px-2 py-1 ${
									colors.hoverSecondary
								} w-full mb-4 outline-none ${colors.background} ${
									colors.foreground
								} placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
							/>
							<select
								value={newTask.progress}
								onChange={(e) =>
									setNewTask({ ...newTask, progress: e.target.value })
								}
								className={`border ${colors.border} ${
									colors.input
								} rounded px-2 py-1 ${
									colors.hoverSecondary
								} w-full mb-4 outline-none ${colors.background} ${
									colors.foreground
								} ${getFocusRingClass(colorScheme)}`}
							>
								<option value="Not Started">Not Started</option>
								<option value="In Progress">In Progress</option>
								<option value="Completed">Completed</option>
							</select>
							<div className="flex items-center gap-3">
								<button
									type="submit"
									className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded text-xs px-4 py-2 transition-all duration-100 ease-in hover:px-6`}
								>
									{isEditMode ? "Update" : "Submit"}
								</button>
								{isEditMode && (
									<button
										type="button"
										onClick={() => {
											handleDeleteTask(editingTaskId, editingSectionId);
											handleCloseModal();
										}}
										className={`flex items-center gap-2 px-4 py-2 rounded text-xs transition-all duration-100 ease-in bg-red-500 hover:bg-red-600 text-white`}
									>
										<Trash2 className="w-4 h-4" />
										Delete
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			)}

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
								<span
									className="inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full text-xs font-semibold tabular-nums bg-white/90 dark:bg-zinc-800/90 text-zinc-600 dark:text-zinc-300 border border-zinc-200/90 dark:border-zinc-600/90 shadow-sm"
								>
									{section.tasks.length}
								</span>
							</div>
							<div className="flex items-center gap-1 shrink-0">
								<button
									type="button"
									className={`p-2 rounded-xl ${colors.hoverSecondary} transition-colors ${colors.textMuted} hover:${colors.foreground} cursor-grab active:cursor-grabbing`}
									title="Reorder column"
									aria-label="Reorder column"
								>
									<GripVertical className="w-4 h-4" />
								</button>
								<button
									type="button"
									onClick={() => handleAddNewTask(section.id)}
									className={`flex items-center justify-center w-9 h-9 rounded-full border ${colors.border} bg-white/90 dark:bg-zinc-800/90 ${colors.hoverSecondary} transition-colors ${colors.textMuted} hover:${colors.foreground}`}
									title="Add task"
									aria-label="Add task"
								>
									<Plus className="w-4 h-4" strokeWidth={2.25} />
								</button>
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
										className={`rounded-2xl border ${colors.border} ${colors.card} shadow-sm p-4 transition-all duration-200 cursor-grab active:cursor-grabbing hover:shadow-md`}
										draggable
										onDragStart={(event) => handleDragStart(event, task)}
										onDragEnd={handleDragEnd}
										onClick={(e) => {
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
											className={`mt-4 pt-3 border-t ${colors.border} flex items-center justify-between gap-2`}
										>
											<span
												className={`inline-flex items-center rounded-full border ${colors.border} px-2.5 py-1 text-xs font-medium ${colors.foreground}`}
											>
												{priority}
											</span>
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
