import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
	Bell,
	Bot,
	Users2,
	LogOutIcon,
	Menu,
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
import { overlayBackdrop, panelSurface } from "@/lib/themeTokens";
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
	"h-9 w-9 shrink-0 rounded-xl border border-border bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground";

const iconBtnActiveClass =
	"border-primary/30 bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary";

const Navbar = ({ open, setOpen, setDrawerOpen, aiChatOpen, onToggleAiChat }) => {
	const router = useRouter();
	const [searchModalOpen, setSearchModalOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const modalSearchInputRef = useRef(null);

	const { theme, toggleTheme } = useTheme();
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

	useEffect(() => {
		if (!searchModalOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
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

	const searchModal =
		searchModalOpen && typeof document !== "undefined"
			? createPortal(
					<div
						role="presentation"
						className={cn(
							"fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[min(20vh,7rem)] sm:p-6",
							overlayBackdrop
						)}
						onClick={handleCloseModal}
					>
						<div
							role="dialog"
							aria-modal="true"
							aria-label="Search pages"
							className={cn(
								"w-full max-w-2xl overflow-hidden rounded-xl shadow-2xl",
								panelSurface
							)}
							onClick={(e) => e.stopPropagation()}
						>
							<div className="border-b border-border p-3">
								<div className="flex items-center gap-2">
									<div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-input bg-muted/40 px-3 py-0.5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
										<Search
											className="h-4 w-4 shrink-0 text-muted-foreground"
											strokeWidth={1.75}
										/>
										<Input
											ref={modalSearchInputRef}
											type="text"
											placeholder="Search pages..."
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className="h-9 outline-none focus:outline-none flex-1 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
										/>
									</div>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										className="h-9 w-9 shrink-0"
										onClick={handleCloseModal}
										aria-label="Close search"
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
							</div>
							<div className="max-h-[min(60vh,28rem)] overflow-y-auto p-2">
								<div className="space-y-2">
									{groupedFilteredNavItems.length > 0 ? (
										groupedFilteredNavItems.map((section) => (
											<div key={section.key} className="space-y-1">
												<div className="px-2 text-xs font-semibold tracking-wide text-muted-foreground">
													{section.label}
												</div>
												<div className="p-1">
													{section.items.map((item) => {
														const Icon = lucideIcons[item.icon];
														return (
															<Button
																key={item.id}
																variant="ghost"
																className="h-auto w-full justify-between gap-3 px-2 py-2 text-left"
																onClick={() => handleNavigate(item.route)}
															>
																<div className="flex min-w-0 items-center gap-3">
																	{Icon && (
																		<Icon
																			size={16}
																			className="shrink-0 text-muted-foreground"
																		/>
																	)}
																	<span className="truncate text-sm text-foreground">
																		{item.label}
																	</span>
																</div>
																<span className="shrink-0 rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground">
																	{item.route}
																</span>
															</Button>
														);
													})}
												</div>
											</div>
										))
									) : (
										<div className="py-8 text-center text-sm text-muted-foreground">
											<p>No results found</p>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>,
					document.body
				)
			: null;

	return (
		<header
			className={cn(
				"sticky top-0 z-30 flex w-full items-center justify-between gap-3 border-b border-border bg-background/95 px-3 py-2.5 backdrop-blur-sm sm:px-4"
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
				<span className="hidden text-[10px] text-muted-foreground md:inline">⌘K</span>
			</div>

			{/* Desktop: full action row */}
			<div className="hidden shrink-0 items-center gap-2 md:flex">
				<Button
					type="button"
					variant="ghost"
					size="icon"
					onClick={toggleCustomizer}
					className={cn(iconBtnClass, customizerOpen && iconBtnActiveClass)}
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
					className="h-9 w-9 rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
					className="relative h-9 w-9 rounded-xl text-muted-foreground hover:bg-accent hover:text-accent-foreground"
					onClick={() => router.push("/notifications")}
					aria-label="Notifications"
				>
					<Bell className="h-4 w-4" strokeWidth={1.75} />
					<Badge className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center border-2 border-background bg-destructive px-1 text-[9px] font-semibold text-destructive-foreground hover:bg-destructive">
						3
					</Badge>
				</Button>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="h-9 w-9 rounded-full p-0 ring-2 ring-border"
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
						<div className="border-b border-border p-3">
							<div className="flex items-center gap-3">
								<Image
									src="/people/person-1.png"
									alt="User Avatar"
									width={40}
									height={40}
									className="rounded-full"
								/>
								<div className="min-w-0">
									<p className="truncate text-sm font-semibold text-foreground">
										John Doe
									</p>
									<p className="truncate text-xs text-muted-foreground">john@doe.com</p>
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
					className={cn(iconBtnClass, aiChatOpen && iconBtnActiveClass)}
					aria-label={aiChatOpen ? "Close AI assistant" : "Open AI assistant"}
					aria-pressed={aiChatOpen}
				>
					<Bot className="h-4 w-4" strokeWidth={1.75} />
				</Button>
			</div>

			{/* Mobile: actions collapsed into bars menu */}
			<div className="md:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className={iconBtnClass}
							aria-label="Open menu"
						>
							<Menu className="h-4 w-4" strokeWidth={1.75} />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-56">
						<div className="border-b border-border p-3">
							<div className="flex items-center gap-3">
								<Image
									src="/people/person-1.png"
									alt="User Avatar"
									width={40}
									height={40}
									className="rounded-full"
								/>
								<div className="min-w-0">
									<p className="truncate text-sm font-semibold text-foreground">
										John Doe
									</p>
									<p className="truncate text-xs text-muted-foreground">
										john@doe.com
									</p>
								</div>
							</div>
						</div>
						<DropdownMenuItem
							onClick={toggleCustomizer}
							className={cn(customizerOpen && "bg-primary/10 text-primary")}
						>
							<Palette size={14} />
							Theme customizer
						</DropdownMenuItem>
						<DropdownMenuItem onClick={toggleTheme}>
							{theme === "light" ? <Moon size={14} /> : <Sun size={14} />}
							{theme === "light" ? "Dark mode" : "Light mode"}
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => router.push("/notifications")}>
							<Bell size={14} />
							<span className="flex flex-1 items-center justify-between gap-2">
								Notifications
								<Badge className="flex h-5 min-w-5 items-center justify-center border-0 bg-destructive px-1.5 text-[10px] font-semibold text-destructive-foreground hover:bg-destructive">
									3
								</Badge>
							</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={onToggleAiChat}
							className={cn(aiChatOpen && "bg-primary/10 text-primary")}
						>
							<Bot size={14} />
							{aiChatOpen ? "Close AI assistant" : "AI assistant"}
						</DropdownMenuItem>
						<DropdownMenuSeparator />
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
			</div>

			{searchModal}
		</header>
	);
};
export default Navbar;
