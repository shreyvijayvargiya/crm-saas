import React, { useState, useRef, useEffect } from "react";
import {
	Bell,
	Bot,
	Users2,
	LogOutIcon,
	PanelLeft,
	Search,
	SettingsIcon,
	X,
	Moon,
	Sun,
	Palette,
} from "lucide-react";
import Image from "next/image";
import * as lucideIcons from "lucide-react";
import { useRouter } from "next/router";
import { useTheme } from "../../utils/useTheme";
import { useThemeCustomizer } from "../../utils/ThemeCustomizerContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	filterSearchNavItems,
	getSearchNavItems,
	groupSearchNavItems,
} from "../navConfig";

const iconBtnClass =
	"h-9 w-9 shrink-0 rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100";

const Navbar = ({ open, setOpen, setDrawerOpen, aiChatOpen, onToggleAiChat }) => {
	const router = useRouter();
	const [searchModalOpen, setSearchModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const modalSearchInputRef = useRef(null);

	const { theme, toggleTheme, colors } = useTheme();
	const { open: customizerOpen, toggleCustomizer } = useThemeCustomizer();

	const searchNavItems = getSearchNavItems();

	const handleKeyDown = (event) => {
		if ((event.ctrlKey || event.metaKey) && event.key === "k") {
			event.preventDefault();
			setSearchModalOpen(true);
		}
		if (event.key === "Escape" && searchModalOpen) {
			setSearchModalOpen(false);
			setSearchTerm("");
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [searchModalOpen]);

	useEffect(() => {
		if (searchModalOpen && modalSearchInputRef.current) {
			modalSearchInputRef.current.focus();
		}
	}, [searchModalOpen]);

	const handleSearchClick = () => {
		setSearchModalOpen(true);
	};

	const handleCloseModal = () => {
		setSearchModalOpen(false);
		setSearchTerm("");
	};

	const handleNavigate = (route) => {
		router.push(route);
		handleCloseModal();
	};

	const filteredNavItems = filterSearchNavItems(searchNavItems, searchTerm);
	const groupedFilteredNavItems = groupSearchNavItems(filteredNavItems);

	return (
		<header
			className={cn(
				"sticky top-0 z-30 flex w-full items-center justify-between gap-3 border-b px-3 py-2.5 sm:px-4",
				"border-zinc-200/80 bg-white/95 backdrop-blur-sm",
				"dark:border-zinc-800 dark:bg-zinc-950/95"
			)}
		>
			<div className="flex min-w-0 items-center gap-2">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className={iconBtnClass}
					onClick={() => {
						if (open) setOpen(false);
						else {
							setOpen(true);
							setDrawerOpen(true);
						}
					}}
					aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
				>
					<PanelLeft className="h-4 w-4" strokeWidth={1.75} />
				</Button>

				<Button
					type="button"
					variant="ghost"
					size="icon"
					className={iconBtnClass}
					onClick={handleSearchClick}
					aria-label="Search"
				>
					<Search className="h-4 w-4" strokeWidth={1.75} />
				</Button>
				<span className="hidden text-[10px] text-zinc-400 md:inline">⌘K</span>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={toggleCustomizer}
					className={cn(
						iconBtnClass,
						customizerOpen &&
							"border-zinc-300 bg-zinc-200 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
					)}
					aria-label="Open theme customizer"
					aria-pressed={customizerOpen}
				>
					<Palette className="h-4 w-4" strokeWidth={1.75} />
				</Button>

				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={toggleTheme}
					className="h-9 w-9 rounded-xl text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
					aria-label="Toggle theme"
				>
					{theme === "light" ? (
						<Moon className="h-4 w-4" strokeWidth={1.75} />
					) : (
						<Sun className="h-4 w-4" strokeWidth={1.75} />
					)}
				</Button>

				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="relative h-9 w-9 rounded-xl text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
					onClick={() => router.push("/notifications")}
					aria-label="Notifications"
				>
					<Bell className="h-4 w-4" strokeWidth={1.75} />
					<Badge className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center border-2 border-white bg-red-500 px-1 text-[9px] font-semibold text-white hover:bg-red-500 dark:border-zinc-950">
						3
					</Badge>
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-9 w-9 rounded-full p-0 ring-2 ring-zinc-100 dark:ring-zinc-800"
							aria-label="User menu"
						>
							<Image
								src="/people/person-1.png"
								alt="User Avatar"
								width={36}
								height={36}
								className="rounded-full object-cover"
							/>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-52">
						<div className="border-b border-zinc-200 p-3 dark:border-zinc-800">
							<div className="flex items-center gap-3">
								<Image
									src="/people/person-1.png"
									alt="User Avatar"
									width={40}
									height={40}
									className="rounded-full"
								/>
								<div className="min-w-0">
									<p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
										John Doe
									</p>
									<p className="truncate text-xs text-zinc-500">john@doe.com</p>
								</div>
							</div>
						</div>
						<DropdownMenuItem onClick={() => router.push("/settings")}>
							<Users2 size={14} />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => router.push("/settings")}>
							<SettingsIcon size={14} />
							Settings
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogOutIcon size={14} />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={onToggleAiChat}
					className={cn(
						iconBtnClass,
						aiChatOpen &&
							"border-zinc-300 bg-zinc-200 text-zinc-900 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
					)}
					aria-label={aiChatOpen ? "Close AI assistant" : "Open AI assistant"}
					aria-pressed={aiChatOpen}
				>
					<Bot className="h-4 w-4" strokeWidth={1.75} />
				</Button>
			</div>

			{/* Search Modal */}
			{searchModalOpen && (
				<div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 pt-20">
					<div
						className={`${colors.card} border-2 ${colors.border} rounded-xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-auto`}
					>
						<div
							className={`flex items-center justify-between p-2 border-b-2 ${colors.border}`}
						>
							<div className="flex items-center gap-2 flex-1">
								<Search className={colors.mutedForeground} size={18} />
								<Input
									ref={modalSearchInputRef}
									type="text"
									placeholder="Search pages..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
								/>
							</div>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={handleCloseModal}
								aria-label="Close search"
							>
								<X size={18} />
							</Button>
						</div>
						<div className="p-2 overflow-y-auto max-h-[60vh]">
							<div className="space-y-2">
								{groupedFilteredNavItems.length > 0 ? (
									groupedFilteredNavItems.map((section) => (
										<div key={section.key} className="space-y-1">
											<div
												className={`px-2 text-xs font-semibold tracking-wide  ${colors.textMuted}`}
											>
												{section.label}
											</div>
											<div className={`p-1`}>
												{section.items.map((item) => {
													const Icon = lucideIcons[item.icon];
													return (
														<Button
															key={item.id}
															variant="ghost"
															className="w-full justify-between gap-3 px-2 py-1 text-left h-auto"
															onClick={() => handleNavigate(item.route)}
														>
															<div className="flex items-center gap-3 min-w-0">
																{Icon && (
																	<Icon
																		size={16}
																		className={colors.textSecondary}
																	/>
																)}
																<span
																	className={`${colors.textSecondary} text-sm truncate`}
																>
																	{item.label}
																</span>
															</div>
															<span
																className={`text-xs px-2 py-0.5 rounded-md border ${colors.border} ${colors.textMuted}`}
															>
																{item.route}
															</span>
														</Button>
													);
												})}
											</div>
										</div>
									))
								) : (
									<div className={`text-center py-8 ${colors.mutedForeground}`}>
										<p>No results found</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</header>
	);
};
export default Navbar;
