import React, { useState } from "react";
import { toast } from "react-toastify";
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
	const [newTask, setNewTask] = useState({ name: "", icon: "" });

	const handleDragStart = (event, task) => {
		event.dataTransfer.setData("text/plain", task.id);
		event.target.style.opacity = "0.5";
	};

	const handleDragEnd = (event) => {
		event.target.style.opacity = "1";
	};

	const handleDrop = (event, sectionId) => {
		event.preventDefault();
		const taskId = event.dataTransfer.getData("text/plain");
		const taskToMove = taskSections
			.flatMap((section) => section.tasks)
			.find((task) => task.id === taskId);

		if (taskToMove) {
			setTaskSections((prevSections) => {
				const updatedSections = prevSections.map((section) => {
					if (section.id === sectionId) {
						return {
							...section,
							tasks: [...section.tasks, taskToMove],
						};
					}
					return {
						...section,
						tasks: section.tasks.filter((task) => task.id !== taskId),
					};
				});
				return updatedSections;
			});
			toast.success(`Task "${taskToMove.name}" moved to "${sectionId}"`); // Show toast notification
		}
	};

	const handleDragOver = (event) => {
		event.preventDefault();
	};

	const handleAddNewTask = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setNewTask({ name: "", icon: "" });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newTask.name && newTask.icon) {
			const newTaskId = Date.now().toString();
			setTaskSections((prevSections) => {
				const updatedSections = prevSections.map((section) => {
					if (section.id === "to-do") {
						return {
							...section,
							tasks: [...section.tasks, { id: newTaskId, ...newTask }],
						};
					}
					return section;
				});
				return updatedSections;
			});
			toast.success(`Task "${newTask.name}" added!`);
			handleCloseModal();
		}
	};

	return (
		<div className={`${colors.background} transition-colors`}>
			<div className="flex items-center justify-between my-4 px-4">
				<p className={colors.foreground}>Task Kanban board</p>
				<button
					className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded text-xs px-4 py-2 transition-all duration-100 ease-in hover:px-6`}
					onClick={handleAddNewTask}
				>
					Add new
				</button>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div
						className={`modal-content ${colors.card} rounded-xl ${colors.shadow} p-6 border ${colors.border}`}
					>
						<div className="flex justify-between items-center">
							<p className={colors.foreground}>Add new task</p>
							<span
								className={`close cursor-pointer ${colors.textMuted} ${colors.hoverSecondary} transition-colors`}
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
							<button
								type="submit"
								className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} rounded text-xs px-4 py-2 transition-all duration-100 ease-in hover:px-6`}
							>
								Submit
							</button>
						</form>
					</div>
				</div>
			)}

			<div className="flex flex-col md:flex-row gap-4 px-4">
				{taskSections.map((section) => (
					<div
						key={section.id}
						className={`py-4 w-full ${colors.card} rounded-xl p-4 border ${colors.border} ${colors.hover} hover:px-5 transition-all duration-100 ease-in`}
						onDrop={(event) => handleDrop(event, section.id)}
						onDragOver={handleDragOver}
					>
						<p
							className={`font-semibold text-lg ${colors.foreground} mb-4 flex justify-between items-center`}
						>
							{section.name}
							<span className={`text ${colors.textSecondary}`}>
								{section.tasks.length}
							</span>
						</p>
						{section.tasks.map((task) => {
							let bgColor = colors.muted; // Default color
							if (section.name === "To Do") {
								bgColor = theme === "dark" ? "bg-blue-900/30" : "bg-blue-50";
							} else if (section.name === "In Progress") {
								bgColor = theme === "dark" ? "bg-pink-900/30" : "bg-pink-50";
							} else if (section.name === "Completed") {
								bgColor = theme === "dark" ? "bg-green-900/30" : "bg-green-50";
							}
							return (
								<div
									key={task.id}
									className={`border ${colors.border} rounded-xl p-3 my-2 ${bgColor} transition-all duration-200 ease-in-out ${colors.shadow} ${colors.hoverSecondary}`}
									draggable
									onDragStart={(event) => handleDragStart(event, task)}
									onDragEnd={handleDragEnd}
								>
									<div className="flex items-center">
										<span className="mr-2">{task.icon}</span>
										<div className="flex-1">
											<div className={`font-medium ${colors.foreground}`}>
												{task.name}
											</div>
											<div className={`text-sm ${colors.textSecondary}`}>
												Status: {task.progress}
											</div>
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
