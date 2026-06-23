import React, { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import {
	ChevronLeft,
	ChevronRight,
	ChevronDown,
	Plus,
} from "lucide-react";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormModal, FormField } from "../../lib/ui/modal";
import FormSelect from "../../lib/ui/FormSelect";
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
	useDroppable,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const EVENT_COLOR_OPTIONS = [
	{ value: "blue", label: "Blue" },
	{ value: "green", label: "Green" },
	{ value: "purple", label: "Purple" },
	{ value: "pink", label: "Pink" },
	{ value: "orange", label: "Orange" },
	{ value: "indigo", label: "Indigo" },
	{ value: "teal", label: "Teal" },
	{ value: "yellow", label: "Yellow" },
];

const Calendar = () => {
	const { theme, colors } = useTheme();
	const [currentDate, setCurrentDate] = useState(new Date());
	const [events, setEvents] = useState([]);
	const [viewMode, setViewMode] = useState("Month");
	const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
	const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [editEvent, setEditEvent] = useState({
		title: "",
		time: "",
		date: "",
		color: "blue",
	});
	const [newEvent, setNewEvent] = useState({
		title: "",
		time: "",
		date: "",
		color: "blue",
	});
	const [activeId, setActiveId] = useState(null);
	const [loading, setLoading] = useState(true);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
		useSensor(KeyboardSensor)
	);

	// Fetch events from MockAPI
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				setLoading(true);
				// Using MockAPI - you can replace this with your actual endpoint
				const response = await fetch(
					"https://65f5c5c441d90c1c5e0a0e5a.mockapi.io/api/v1/events"
				);
				if (response.ok) {
					const data = await response.json();
					// Transform the data to match our event structure
					const transformedEvents = data.map((event) => ({
						id: event.id || `event-${Date.now()}-${Math.random()}`,
						title: event.title || event.name || "Untitled Event",
						time: event.time || event.startTime || "10am",
						date: event.date || event.startDate || getTodayDateString(),
						color: event.color || getRandomColor(),
					}));
					setEvents(transformedEvents);
				} else {
					// If API fails, use dummy data
					generateDummyEvents();
				}
			} catch (error) {
				console.error("Error fetching events:", error);
				// Fallback to dummy data
				generateDummyEvents();
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []);

	const generateDummyEvents = () => {
		const today = new Date();
		const currentMonth = today.getMonth();
		const currentYear = today.getFullYear();
		const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

		const dummyEvents = [
			{
				id: "1",
				title: "Team Meeting",
				time: "10am",
				date: formatDate(new Date(currentYear, currentMonth, 8)),
				color: "blue",
			},
			{
				id: "2",
				title: "Product Launch",
				time: "12pm",
				date: formatDate(new Date(currentYear, currentMonth, 11)),
				color: "purple",
			},
			{
				id: "3",
				title: "Sales Conference",
				time: "2:30pm",
				date: formatDate(new Date(currentYear, currentMonth, 15)),
				color: "green",
			},
			{
				id: "4",
				title: "Lunch with Client",
				time: "12pm",
				date: formatDate(new Date(currentYear, currentMonth, 11)),
				color: "pink",
			},
			{
				id: "5",
				title: "Marketing Strategy Session",
				time: "9am",
				date: formatDate(new Date(currentYear, currentMonth, 13)),
				color: "orange",
			},
			{
				id: "6",
				title: "Annual Shareholders Meeting",
				time: "3pm",
				date: formatDate(new Date(currentYear, currentMonth, 20)),
				color: "indigo",
			},
			{
				id: "7",
				title: "Product Development Workshop",
				time: "11am",
				date: formatDate(new Date(currentYear, currentMonth, 13)),
				color: "teal",
			},
			{
				id: "8",
				title: "Client Presentation",
				time: "2pm",
				date: formatDate(new Date(currentYear, currentMonth, 13)),
				color: "yellow",
			},
		];

		setEvents(dummyEvents);
	};

	const getRandomColor = () => {
		const colors = [
			"blue",
			"green",
			"purple",
			"pink",
			"orange",
			"indigo",
			"teal",
		];
		return colors[Math.floor(Math.random() * colors.length)];
	};

	const formatDate = (date) => {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0");
		const day = String(date.getDate()).padStart(2, "0");
		return `${year}-${month}-${day}`;
	};

	const getTodayDateString = () => {
		return formatDate(new Date());
	};

	// Calendar grid generation
	const calendarDays = useMemo(() => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const firstDay = new Date(year, month, 1);
		const lastDay = new Date(year, month + 1, 0);
		const daysInMonth = lastDay.getDate();
		const startingDayOfWeek = firstDay.getDay();

		const days = [];

		// Previous month's trailing days
		const prevMonth = new Date(year, month - 1, 0);
		const prevMonthDays = prevMonth.getDate();
		for (let i = startingDayOfWeek - 1; i >= 0; i--) {
			days.push({
				date: new Date(year, month - 1, prevMonthDays - i),
				isCurrentMonth: false,
			});
		}

		// Current month's days
		for (let day = 1; day <= daysInMonth; day++) {
			days.push({
				date: new Date(year, month, day),
				isCurrentMonth: true,
			});
		}

		// Next month's leading days
		const remainingDays = 42 - days.length; // 6 weeks * 7 days
		for (let day = 1; day <= remainingDays; day++) {
			days.push({
				date: new Date(year, month + 1, day),
				isCurrentMonth: false,
			});
		}

		return days;
	}, [currentDate]);

	const getEventsForDate = (date) => {
		const dateString = formatDate(date);
		return events.filter((event) => event.date === dateString);
	};

	const isToday = (date) => {
		const today = new Date();
		return (
			date.getDate() === today.getDate() &&
			date.getMonth() === today.getMonth() &&
			date.getFullYear() === today.getFullYear()
		);
	};

	const goToToday = () => {
		setCurrentDate(new Date());
	};

	const goToPreviousMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
		);
	};

	const goToNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
		);
	};

	const monthNames = [
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

	const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	const getColorClasses = (color) => {
		const colorMap = {
			blue:
				theme === "dark"
					? "bg-blue-900/40 text-blue-100"
					: "bg-blue-100 text-blue-800",
			green:
				theme === "dark"
					? "bg-green-900/40 text-green-100"
					: "bg-green-100 text-green-800",
			purple:
				theme === "dark"
					? "bg-purple-900/40 text-purple-100"
					: "bg-purple-100 text-purple-800",
			pink:
				theme === "dark"
					? "bg-pink-900/40 text-pink-100"
					: "bg-pink-100 text-pink-800",
			orange:
				theme === "dark"
					? "bg-orange-900/40 text-orange-100"
					: "bg-orange-100 text-orange-800",
			indigo:
				theme === "dark"
					? "bg-indigo-900/40 text-indigo-100"
					: "bg-indigo-100 text-indigo-800",
			teal:
				theme === "dark"
					? "bg-teal-900/40 text-teal-100"
					: "bg-teal-100 text-teal-800",
			yellow:
				theme === "dark"
					? "bg-yellow-900/40 text-yellow-100"
					: "bg-yellow-100 text-yellow-800",
		};
		return colorMap[color] || colorMap.blue;
	};

	const handleDragStart = (event) => {
		setActiveId(event.active.id);
	};

	const handleDragEnd = (event) => {
		const { active, over } = event;
		setActiveId(null);

		if (!over) return;

		const activeEvent = events.find((e) => e.id === active.id);
		if (!activeEvent) return;

		// Get the date from the drop target
		const targetDateString = over.id;
		if (targetDateString && targetDateString.startsWith("date-")) {
			const dateString = targetDateString.replace("date-", "");
			if (dateString !== activeEvent.date) {
				// Update event date
				setEvents((prevEvents) =>
					prevEvents.map((event) =>
						event.id === active.id ? { ...event, date: dateString } : event
					)
				);
				toast.success(
					`Event "${activeEvent.title}" moved to ${formatDisplayDate(
						dateString
					)}`
				);
			}
		}
	};

	const formatDisplayDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	const handleAddEvent = () => {
		if (newEvent.title && newEvent.time && newEvent.date) {
			const newEventObj = {
				id: `event-${Date.now()}-${Math.random()}`,
				title: newEvent.title,
				time: newEvent.time,
				date: newEvent.date,
				color: newEvent.color,
			};
			setEvents([...events, newEventObj]);
			toast.success("Event added successfully!");
			setIsNewEventModalOpen(false);
			setNewEvent({ title: "", time: "", date: "", color: "blue" });
		}
	};

	const openEventDetails = (event) => {
		setSelectedEvent(event);
		setEditEvent({
			title: event.title,
			time: event.time,
			date: event.date,
			color: event.color,
		});
		setIsEventDetailsModalOpen(true);
	};

	const closeEventDetails = () => {
		setIsEventDetailsModalOpen(false);
		setSelectedEvent(null);
		setEditEvent({ title: "", time: "", date: "", color: "blue" });
	};

	const handleSaveEventDetails = () => {
		if (!selectedEvent) return;
		if (!editEvent.title?.trim() || !editEvent.time?.trim() || !editEvent.date) {
			toast.error("Please fill title, time, and date.");
			return;
		}

		const updatedEvent = {
			...selectedEvent,
			title: editEvent.title.trim(),
			time: editEvent.time.trim(),
			date: editEvent.date,
			color: editEvent.color,
		};

		setEvents((prevEvents) =>
			prevEvents.map((event) =>
				event.id === selectedEvent.id ? updatedEvent : event
			)
		);
		setSelectedEvent(updatedEvent);
		toast.success("Event updated successfully!");
		closeEventDetails();
	};

	const handleDeleteEvent = () => {
		if (!selectedEvent) return;
		setEvents((prevEvents) =>
			prevEvents.filter((event) => event.id !== selectedEvent.id)
		);
		toast.success("Event deleted.");
		closeEventDetails();
	};

	const EventItem = ({ event, dateString }) => {
		const {
			attributes,
			listeners,
			setNodeRef,
			transform,
			transition,
			isDragging,
		} = useSortable({
			id: event.id,
			data: {
				type: "event",
				event,
				dateString,
			},
		});

		const style = {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? 0.5 : 1,
		};

		return (
			<div
				ref={setNodeRef}
				style={style}
				{...attributes}
				{...listeners}
				onClick={() => openEventDetails(event)}
				className={`${getColorClasses(
					event.color
				)} text-xs px-2 py-1 rounded-xl mb-1 cursor-pointer hover:opacity-80 transition-opacity leading-tight`}
				role="button"
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						openEventDetails(event);
					}
				}}
			>
				<span className="font-medium">{event.time}</span>{" "}
				<span className="line-clamp-2 break-words">{event.title}</span>
			</div>
		);
	};

	const CalendarDay = ({ day, dateEvents }) => {
		const dateString = formatDate(day.date);
		const isCurrentDay = isToday(day.date);
		const { setNodeRef, isOver } = useDroppable({
			id: `date-${dateString}`,
		});

		return (
			<div
				ref={setNodeRef}
				className={`min-h-[84px] sm:min-h-[100px] border ${colors.border} p-1.5 sm:p-2 rounded-xl ${
					day.isCurrentMonth ? colors.background : colors.muted
				} ${isCurrentDay ? "ring-2 ring-black dark:ring-white" : ""} ${
					isOver ? "bg-primary/10 ring-1 ring-primary/30" : ""
				} transition-colors duration-100 ease-in`}
			>
				<div
					className={`text-xs sm:text-sm font-medium mb-1 ${
						day.isCurrentMonth ? colors.foreground : colors.mutedForeground
					} ${isCurrentDay ? "font-bold" : ""}`}
				>
					{day.date.getDate()}
				</div>
				<div className="space-y-1">
					{dateEvents.slice(0, 3).map((event) => (
						<EventItem key={event.id} event={event} dateString={dateString} />
					))}
					{dateEvents.length > 3 && (
						<div className={`text-xs ${colors.mutedForeground} px-2`}>
							+ {dateEvents.length - 3} more
						</div>
					)}
				</div>
			</div>
		);
	};

	if (loading) {
		return (
			<div className={`p-4`}>
				<div className={`${colors.foreground} text-center`}>
					Loading calendar...
				</div>
			</div>
		);
	}

	return (
		<div className={`transition-all duration-100 ease-in p-2 sm:p-4`}>
			{/* Header */}
			<div className="mb-4 sm:mb-6 flex justify-between flex-wrap gap-3">
				<div className="flex items-center justify-start gap-2">
					<h2 className={`text-lg sm:text-xl font-semibold ${colors.foreground}`}>
						{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
					</h2>
					<div className="flex items-center gap-1.5 sm:gap-2">
						<Button
							variant="ghost"
							size="icon"
							onClick={goToPreviousMonth}
							aria-label="Previous month"
						>
							<ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
						</Button>
						<Button
							variant="ghost"
							size="icon"
							onClick={goToNextMonth}
							aria-label="Next month"
						>
							<ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
						</Button>
					</div>
				</div>

				<div className="flex flex-wrap items-center gap-2 sm:gap-3">
					<Button variant="outline" size="sm" onClick={goToToday}>
						Today
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline" size="sm">
								{viewMode}
								<ChevronDown className="w-4 h-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-40">
							{["Month", "Week", "Day", "Agenda"].map((view) => (
								<DropdownMenuItem
									key={view}
									onClick={() => setViewMode(view)}
									className={cn(
										viewMode === view && "bg-primary text-primary-foreground focus:bg-primary focus:text-primary-foreground"
									)}
								>
									{view}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button size="sm" onClick={() => setIsNewEventModalOpen(true)}>
						<Plus className="w-4 h-4" />
						New event
					</Button>
				</div>
			</div>

			{/* Calendar Grid */}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div className="-mx-1 overflow-x-auto px-1">
					<Card className="overflow-hidden min-w-[680px] sm:min-w-0">
					{/* Day Headers */}
					<div className={`grid grid-cols-7 border-b ${colors.border}`}>
						{dayNames.map((day) => (
							<div
								key={day}
								className={`p-2 sm:p-3 text-center text-xs sm:text-sm font-semibold ${colors.foreground} border-r ${colors.border} last:border-r-0`}
							>
								{day}
							</div>
						))}
					</div>

					{/* Calendar Days */}
					<div className="grid grid-cols-7 py-1 sm:py-2 gap-0.5 sm:gap-1">
						{calendarDays.map((day, index) => {
							const dateEvents = getEventsForDate(day.date);
							return (
								<CalendarDay key={index} day={day} dateEvents={dateEvents} />
							);
						})}
					</div>
				</Card>
				</div>

				<DragOverlay>
					{activeId ? (
						<div
							className={`${getColorClasses(
								events.find((e) => e.id === activeId)?.color || "blue"
							)} text-xs px-2 py-1 rounded-xl shadow-xl`}
						>
							{events.find((e) => e.id === activeId)?.title}
						</div>
					) : null}
				</DragOverlay>
			</DndContext>

			<FormModal
				open={isNewEventModalOpen}
				onClose={() => {
					setIsNewEventModalOpen(false);
					setNewEvent({ title: "", time: "", date: "", color: "blue" });
				}}
				title="New event"
				subtitle="Add an event to your calendar"
				onSubmit={handleAddEvent}
				saveLabel="Add event"
				maxWidth="max-w-md"
			>
				<FormField label="Event title" htmlFor="new-event-title" required>
					<Input
						id="new-event-title"
						type="text"
						value={newEvent.title}
						onChange={(e) =>
							setNewEvent({ ...newEvent, title: e.target.value })
						}
						required
						placeholder="Enter event title"
					/>
				</FormField>
				<FormField label="Time" htmlFor="new-event-time" required>
					<Input
						id="new-event-time"
						type="text"
						value={newEvent.time}
						onChange={(e) =>
							setNewEvent({ ...newEvent, time: e.target.value })
						}
						required
						placeholder="e.g., 10am, 2:30pm"
					/>
				</FormField>
				<FormField label="Date" htmlFor="new-event-date" required>
					<Input
						id="new-event-date"
						type="date"
						value={newEvent.date}
						onChange={(e) =>
							setNewEvent({ ...newEvent, date: e.target.value })
						}
						required
					/>
				</FormField>
				<FormField label="Color" htmlFor="new-event-color">
					<FormSelect
						id="new-event-color"
						value={newEvent.color}
						onChange={(e) =>
							setNewEvent({ ...newEvent, color: e.target.value })
						}
						options={EVENT_COLOR_OPTIONS}
					/>
				</FormField>
			</FormModal>

			<FormModal
				open={isEventDetailsModalOpen && !!selectedEvent}
				onClose={closeEventDetails}
				title="Event details"
				subtitle={
					selectedEvent
						? formatDisplayDate(selectedEvent.date)
						: undefined
				}
				onSubmit={handleSaveEventDetails}
				saveLabel="Save changes"
				showDelete
				onDelete={handleDeleteEvent}
				deleteLabel="Delete event"
				maxWidth="max-w-md"
			>
				{selectedEvent && (
					<Badge
						className={cn(
							"mb-2 capitalize border-0",
							getColorClasses(editEvent.color)
						)}
					>
						{editEvent.color}
					</Badge>
				)}
				<FormField label="Title" htmlFor="edit-event-title" required>
					<Input
						id="edit-event-title"
						type="text"
						value={editEvent.title}
						onChange={(e) =>
							setEditEvent((prev) => ({ ...prev, title: e.target.value }))
						}
						required
					/>
				</FormField>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<FormField label="Time" htmlFor="edit-event-time" required>
						<Input
							id="edit-event-time"
							type="text"
							value={editEvent.time}
							onChange={(e) =>
								setEditEvent((prev) => ({ ...prev, time: e.target.value }))
							}
							required
							placeholder="10am"
						/>
					</FormField>
					<FormField label="Date" htmlFor="edit-event-date" required>
						<Input
							id="edit-event-date"
							type="date"
							value={editEvent.date}
							onChange={(e) =>
								setEditEvent((prev) => ({ ...prev, date: e.target.value }))
							}
							required
						/>
					</FormField>
				</div>
				<FormField label="Color" htmlFor="edit-event-color">
					<FormSelect
						id="edit-event-color"
						value={editEvent.color}
						onChange={(e) =>
							setEditEvent((prev) => ({ ...prev, color: e.target.value }))
						}
						options={EVENT_COLOR_OPTIONS}
					/>
				</FormField>
			</FormModal>
		</div>
	);
};

export default Calendar;
