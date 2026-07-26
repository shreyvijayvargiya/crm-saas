import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
	Home,
	LayoutDashboard,
	Sparkles,
	CreditCard,
	Sun,
	Moon,
	BookOpen,
	LayoutTemplate,
	LogIn,
	LogOut,
	FolderKanban,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAgencyTheme } from "../AgencyThemeContext";
import { useAuth } from "@/utils/AuthContext";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TABS = [
	{ id: "home", label: "Home", href: "/", icon: Home },
	{ id: "demo", label: "Demo", href: "/demo", icon: LayoutDashboard },
	{ id: "templates", label: "Free CRMs", href: "/templates", icon: LayoutTemplate },
	{ id: "blueprint", label: "Builder", href: "/blueprint", icon: Sparkles },
	{ id: "blog", label: "Blog", href: "/blog", icon: BookOpen },
	{ id: "pricing", label: "Pricing", href: "/pricing", icon: CreditCard },
];

const PILL_SPRING = { type: "spring", stiffness: 440, damping: 34, mass: 0.75 };

function isActiveRoute(pathname, href) {
	if (href === "/") return pathname === "/";
	return pathname === href || pathname.startsWith(`${href}/`);
}

function UserAvatarButton({ isLight }) {
	const router = useRouter();
	const { user, logOut, loading } = useAuth();

	if (loading) {
		return (
			<div
				className={cn(
					"h-9 w-9 shrink-0 animate-pulse rounded-full",
					isLight ? "bg-zinc-200" : "bg-zinc-800"
				)}
			/>
		);
	}

	if (!user) return null;

	const label = user.displayName || user.email || "Account";
	const initial = (user.displayName || user.email || "?").charAt(0).toUpperCase();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					className={cn(
						"flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border transition",
						isLight
							? "border-zinc-200 bg-zinc-100 hover:ring-2 hover:ring-zinc-300"
							: "border-zinc-700 bg-zinc-800 hover:ring-2 hover:ring-zinc-600"
					)}
					aria-label="Account menu"
				>
					{user.photoURL ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={user.photoURL}
							alt=""
							className="h-full w-full object-cover"
							referrerPolicy="no-referrer"
						/>
					) : (
						<span
							className={cn(
								"text-xs font-semibold",
								isLight ? "text-zinc-700" : "text-zinc-200"
							)}
						>
							{initial}
						</span>
					)}
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col gap-0.5">
						<span className="truncate text-sm font-medium">{label}</span>
						{user.email ? (
							<span className="truncate text-xs text-muted-foreground">
								{user.email}
							</span>
						) : null}
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onSelect={() => router.push("/workspace")}>
					<FolderKanban className="mr-2 h-4 w-4" />
					My CRMs
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onSelect={async () => {
						await logOut();
						router.push("/");
					}}
				>
					<LogOut className="mr-2 h-4 w-4" />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export default function DynamicIslandNav() {
	const router = useRouter();
	const { isLight, toggleTheme } = useAgencyTheme();
	const { isAuthenticated, openLogin, loading: authLoading } = useAuth();

	return (
		<div
			className={cn(
				"pointer-events-none relative inset-x-0 top-0.5 z-50 flex",
				"justify-stretch sm:justify-center sm:pb-6"
			)}
		>
			<motion.nav
				layout
				initial={{ opacity: 0, y: 24, scale: 0.96 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ type: "spring", stiffness: 380, damping: 28 }}
				className={cn(
					"pointer-events-auto flex w-1/2 items-center sm:w-auto sm:gap-1 rounded-full sm:rounded-full sm:border sm:px-2 sm:py-2",
					"justify-between gap-0 border-t px-1 pt-2",
					"pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:pb-2",
					isLight
						? "border-zinc-200/50 bg-white/20 sm:bg-white/20"
						: "border-zinc-800/90 bg-zinc-950/90 shadow-black/50 sm:bg-zinc-950/75"
				)}
				aria-label="Site navigation"
			>
				<div className="flex flex-1 items-center justify-between gap-0 sm:flex-none sm:justify-start sm:gap-0.5">
					{TABS.map((tab) => {
						const Icon = tab.icon;
						const active = isActiveRoute(router.pathname, tab.href);

						return (
							<Link key={tab.id} href={tab.href} passHref>
								<motion.a
									layout
									whileTap={{ scale: 0.94 }}
									transition={PILL_SPRING}
									className={cn(
										"relative flex h-11 items-center justify-center gap-0 rounded-full px-2 transition-colors duration-200 sm:h-10 sm:gap-2 sm:px-2.5",
										active && "border border-zinc-200",
										!active &&
											(isLight
												? "text-zinc-500 hover:text-zinc-800"
												: "text-zinc-500 hover:text-zinc-200")
									)}
									aria-label={tab.label}
									aria-current={active ? "page" : undefined}
								>
									{active ? (
										<motion.span
											layoutId="island-active-pill"
											className={cn(
												"absolute inset-0 rounded-full",
												isLight
													? "bg-zinc-100 text-zinc-900 shadow-zinc-100/20"
													: "bg-zinc-50 text-zinc-900 shadow-white/10"
											)}
											transition={PILL_SPRING}
										/>
									) : null}
									<Icon
										className={cn(
											"relative z-10 h-[18px] w-[18px] shrink-0 transition-colors duration-200",
											active
												? isLight
													? "text-black"
													: "text-zinc-900"
												: isLight
													? "text-zinc-500"
													: "text-zinc-500"
										)}
										strokeWidth={active ? 1.75 : 1.5}
									/>
									<span
										className={cn(
											"relative z-10 hidden overflow-hidden whitespace-nowrap text-sm tracking-tight sm:inline",
											active
												? isLight
													? "text-black font-semibold"
													: "text-zinc-900 font-semibold"
												: isLight
													? "text-zinc-600 font-light"
													: "text-zinc-400 font-light"
										)}
									>
										{tab.label}
									</span>
								</motion.a>
							</Link>
						);
					})}

					<div
						className={cn(
							"mx-1 hidden h-5 w-px sm:block",
							isLight ? "bg-zinc-200" : "bg-zinc-700"
						)}
						aria-hidden
					/>

					<motion.button
						type="button"
						layout
						whileTap={{ scale: 0.94 }}
						onClick={toggleTheme}
						className={cn(
							"flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 sm:h-10 sm:w-10",
							isLight
								? "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
								: "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
						)}
						aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
					>
						{isLight ? (
							<Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
						) : (
							<Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
						)}
					</motion.button>

					{!authLoading && !isAuthenticated ? (
						<motion.button
							type="button"
							layout
							whileTap={{ scale: 0.94 }}
							onClick={openLogin}
							className={cn(
								"ml-0.5 flex h-11 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-sm font-medium transition-colors sm:h-10 sm:px-3",
								isLight
									? "bg-zinc-900 text-white hover:bg-zinc-800"
									: "bg-zinc-50 text-zinc-900 hover:bg-white"
							)}
							aria-label="Log in"
						>
							<LogIn className="h-4 w-4" strokeWidth={1.75} />
							<span className="hidden sm:inline">Log in</span>
						</motion.button>
					) : null}

					{isAuthenticated ? (
						<div className="ml-0.5 flex items-center gap-1">
							<Link href="/workspace" passHref>
								<motion.a
									whileTap={{ scale: 0.94 }}
									className={cn(
										"hidden h-10 items-center gap-1.5 rounded-full px-2.5 text-sm transition sm:inline-flex",
										isActiveRoute(router.pathname, "/workspace")
											? isLight
												? "bg-zinc-100 font-semibold text-zinc-900"
												: "bg-zinc-50 font-semibold text-zinc-900"
											: isLight
												? "text-zinc-600 hover:bg-zinc-100"
												: "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
									)}
									aria-label="My CRMs"
								>
									<FolderKanban className="h-4 w-4" />
									<span>My CRMs</span>
								</motion.a>
							</Link>
							<UserAvatarButton isLight={isLight} />
						</div>
					) : null}
				</div>
			</motion.nav>
		</div>
	);
}
