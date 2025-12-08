import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { Search, ChevronDown, Plus, GripVertical, Trash2 } from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Tasks = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

	const [taskSections, setTaskSections] = useState([
		{
			id: "to-do",
			name: "To Do",
			tasks: [
				{
					id: "201",
					name: "Prepare presentation",
					progress: "Not Started",
					icon: "📝",
				},
				{
					id: "202",
					name: "Send email updates",
					progress: "In Progress",
					icon: "📧",
				},
				{
					id: "205",
					name: "Research new tools",
					progress: "Not Started",
					icon: "🔍",
				},
				{
					id: "206",
					name: "Plan team meeting",
					progress: "Not Started",
					icon: "📅",
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
					progress: "In Progress",
					icon: "💻",
				},
				{
					id: "207",
					name: "Write documentation",
					progress: "In Progress",
					icon: "📖",
				},
				{
					id: "208",
					name: "Test application",
					progress: "In Progress",
					icon: "🧪",
				},
			],
		},
		{
			id: "completed",
			name: "Completed",
			tasks: [
				{
					id: "204",
					name: "Fix bugs",
					progress: "Completed",
					icon: "✅",
				},
				{
					id: "209",
					name: "Deploy application",
					progress: "Completed",
					icon: "🚀",
				},
				{
					id: "210",
					name: "Conduct user training",
					progress: "Completed",
					icon: "👩‍🏫",
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
				setTaskSections((prevSections) => {
					const updatedSections = prevSections.map((section) => {
						if (section.id === sectionToAddTo) {
							return {
								...section,
								tasks: [
									...section.tasks,
									{ id: newTaskId, ...newTask, progress: progressValue },
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
				const matchesSearch =
					!searchTerm ||
					task.name.toLowerCase().includes(searchTerm.toLowerCase());

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
		<div className={`${colors.background} transition-colors`}>
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
									? "To-Dos"
									: filterStatus === "progress"
									? "In Progress"
									: "Completed"}
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
										className={`w-full text-left px-4 py-2 text-sm ${
											colors.foreground
										} hover:${colors.hoverSecondary} transition-colors ${
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
										className={`w-full text-left px-4 py-2 text-sm ${
											colors.foreground
										} hover:${colors.hoverSecondary} transition-colors ${
											filterStatus === "to-dos"
												? `${scheme.primary} ${scheme.primaryForeground}`
												: ""
										}`}
									>
										To-Dos
									</button>
									<button
										onClick={() => {
											setFilterStatus("progress");
											setIsFilterOpen(false);
										}}
										className={`w-full text-left px-4 py-2 text-sm ${
											colors.foreground
										} hover:${colors.hoverSecondary} transition-colors ${
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
										className={`w-full text-left px-4 py-2 text-sm ${
											colors.foreground
										} hover:${colors.hoverSecondary} transition-colors ${
											filterStatus === "completed"
												? `${scheme.primary} ${scheme.primaryForeground}`
												: ""
										}`}
									>
										Completed
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

			<div className="flex flex-col md:flex-row gap-4 px-4 max-w-5xl">
				{filteredSections.map((section) => (
					<div
						key={section.id}
						className={`py-4 w-full mx-auto ${colors.muted} rounded-xl p-4 border ${colors.border} ${colors.hover} hover:px-5 transition-all duration-100 ease-in`}
						onDrop={(event) => handleDrop(event, section.id)}
						onDragOver={handleDragOver}
					>
						<div
							className={`font-semibold text-lg ${colors.foreground} mb-4 flex justify-between items-center`}
						>
							<div className="flex items-center gap-2">
								<span>{section.name}</span>
								<span className={`text-sm ${colors.textSecondary}`}>
									{section.tasks.length}
								</span>
							</div>
							<div className="flex items-center gap-2">
								<button
									onClick={() => handleAddNewTask(section.id)}
									className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors ${colors.textMuted} hover:${colors.foreground}`}
									title="Add task"
								>
									<Plus className="w-4 h-4" />
								</button>
								<button
									className={`p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors ${colors.textMuted} hover:${colors.foreground} cursor-grab active:cursor-grabbing`}
									title="Drag column"
								>
									<GripVertical className="w-4 h-4" />
								</button>
							</div>
						</div>
						{section.tasks.map((task) => {
							return (
								<div
									key={task.id}
									className={`border ${colors.border} rounded-xl p-3 my-2 transition-all duration-200 ease-in-out ${colors.background} cursor-pointer hover:${colors.hoverSecondary}`}
									draggable
									onDragStart={(event) => handleDragStart(event, task)}
									onDragEnd={handleDragEnd}
									onClick={(e) => {
										// Don't open modal if clicking on drag handle
										if (!e.target.closest(".drag-handle") && !isDragging) {
											handleEditTask(task, section.id);
										}
									}}
								>
									<div className="flex items-start gap-2">
										<div className="flex items-center gap-2 flex-1">
											<span className="text-lg">{task.icon}</span>
											<div className="flex-1">
												<div className={`font-medium ${colors.foreground}`}>
													{task.name}
												</div>
												<div className={`text-sm ${colors.textSecondary}`}>
													Status: {task.progress}
												</div>
											</div>
										</div>
										<div
											className={`drag-handle p-1.5 rounded-xl ${colors.hoverSecondary} transition-colors ${colors.textMuted} cursor-grab active:cursor-grabbing`}
											onMouseDown={(e) => {
												e.stopPropagation();
											}}
											onClick={(e) => {
												e.stopPropagation();
											}}
											title="Drag task"
										>
											<GripVertical className="w-4 h-4" />
										</div>
									</div>
								</div>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
};
export default Tasks;
