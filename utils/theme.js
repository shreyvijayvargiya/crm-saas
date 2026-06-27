// Color scheme definitions
export const colorSchemes = {
	blue: {
		light: {
			primary: "bg-blue-600",
			primaryForeground: "text-white",
			primaryHover: "hover:bg-blue-700",
			primaryRing: "ring-blue-600",
			chip: "bg-blue-100 text-blue-800",
			chipDark: "bg-blue-900/30 text-blue-400 border-blue-800/50",
		},
		dark: {
			primary: "bg-blue-500",
			primaryForeground: "text-blue-950",
			primaryHover: "hover:bg-blue-400",
			primaryRing: "ring-blue-500",
			chip: "bg-blue-900/30 text-blue-400 border-blue-800/50",
			chipDark: "bg-blue-900/30 text-blue-400 border-blue-800/50",
		},
	},
	green: {
		light: {
			primary: "bg-green-600",
			primaryForeground: "text-white",
			primaryHover: "hover:bg-green-700",
			primaryRing: "ring-green-600",
			chip: "bg-green-100 text-green-800",
			chipDark: "bg-green-900/30 text-green-400 border-green-800/50",
		},
		dark: {
			primary: "bg-green-500",
			primaryForeground: "text-green-950",
			primaryHover: "hover:bg-green-400",
			primaryRing: "ring-green-500",
			chip: "bg-green-900/30 text-green-400 border-green-800/50",
			chipDark: "bg-green-900/30 text-green-400 border-green-800/50",
		},
	},
	purple: {
		light: {
			primary: "bg-purple-600",
			primaryForeground: "text-white",
			primaryHover: "hover:bg-purple-700",
			primaryRing: "ring-purple-600",
			chip: "bg-purple-100 text-purple-800",
			chipDark: "bg-purple-900/30 text-purple-400 border-purple-800/50",
		},
		dark: {
			primary: "bg-purple-500",
			primaryForeground: "text-purple-950",
			primaryHover: "hover:bg-purple-400",
			primaryRing: "ring-purple-500",
			chip: "bg-purple-900/30 text-purple-400 border-purple-800/50",
			chipDark: "bg-purple-900/30 text-purple-400 border-purple-800/50",
		},
	},
	orange: {
		light: {
			primary: "bg-orange-600",
			primaryForeground: "text-white",
			primaryHover: "hover:bg-orange-700",
			primaryRing: "ring-orange-600",
			chip: "bg-orange-100 text-orange-800",
			chipDark: "bg-orange-900/30 text-orange-400 border-orange-800/50",
		},
		dark: {
			primary: "bg-orange-500",
			primaryForeground: "text-orange-950",
			primaryHover: "hover:bg-orange-400",
			primaryRing: "ring-orange-500",
			chip: "bg-orange-900/30 text-orange-400 border-orange-800/50",
			chipDark: "bg-orange-900/30 text-orange-400 border-orange-800/50",
		},
	},
	red: {
		light: {
			primary: "bg-red-600",
			primaryForeground: "text-white",
			primaryHover: "hover:bg-red-700",
			primaryRing: "ring-red-600",
			chip: "bg-red-100 text-red-800",
			chipDark: "bg-red-900/30 text-red-400 border-red-800/50",
		},
		dark: {
			primary: "bg-red-500",
			primaryForeground: "text-red-950",
			primaryHover: "hover:bg-red-400",
			primaryRing: "ring-red-500",
			chip: "bg-red-900/30 text-red-400 border-red-800/50",
			chipDark: "bg-red-900/30 text-red-400 border-red-800/50",
		},
	},
	pink: {
		light: {
			primary: "bg-pink-600",
			primaryForeground: "text-white",
			primaryHover: "hover:bg-pink-700",
			primaryRing: "ring-pink-600",
			chip: "bg-pink-100 text-pink-800",
			chipDark: "bg-pink-900/30 text-pink-400 border-pink-800/50",
		},
		dark: {
			primary: "bg-pink-500",
			primaryForeground: "text-pink-950",
			primaryHover: "hover:bg-pink-400",
			primaryRing: "ring-pink-500",
			chip: "bg-pink-900/30 text-pink-400 border-pink-800/50",
			chipDark: "bg-pink-900/30 text-pink-400 border-pink-800/50",
		},
	},
	indigo: {
		light: {
			primary: "bg-indigo-600",
			primaryForeground: "text-white",
			primaryHover: "hover:bg-indigo-700",
			primaryRing: "ring-indigo-600",
			chip: "bg-indigo-100 text-indigo-800",
			chipDark: "bg-indigo-900/30 text-indigo-400 border-indigo-800/50",
		},
		dark: {
			primary: "bg-indigo-500",
			primaryForeground: "text-indigo-950",
			primaryHover: "hover:bg-indigo-400",
			primaryRing: "ring-indigo-500",
			chip: "bg-indigo-900/30 text-indigo-400 border-indigo-800/50",
			chipDark: "bg-indigo-900/30 text-indigo-400 border-indigo-800/50",
		},
	},
	zinc: {
		light: {
			primary: "bg-zinc-900",
			primaryForeground: "text-white",
			primaryHover: "hover:bg-zinc-800",
			primaryRing: "ring-zinc-900",
			chip: "bg-zinc-100 text-zinc-800",
			chipDark: "bg-zinc-800 text-zinc-300 border-zinc-700",
		},
		dark: {
			primary: "bg-zinc-50",
			primaryForeground: "text-zinc-900",
			primaryHover: "hover:bg-zinc-100",
			primaryRing: "ring-zinc-50",
			chip: "bg-zinc-800 text-zinc-300 border-zinc-700",
			chipDark: "bg-zinc-800 text-zinc-300 border-zinc-700",
		},
	},
};

// Semantic tokens — follow CSS variables from globals.css / theme customizer
const semanticColors = {
	primaryBackground: "bg-background",
	background: "bg-background",
	foreground: "text-foreground",
	muted: "bg-muted",
	mutedForeground: "text-muted-foreground",
	mutedBackground: "bg-muted",
	border: "border-border",
	input: "border-input",
	card: "bg-card",
	cardForeground: "text-card-foreground",
	primary: "bg-primary",
	primaryForeground: "text-primary-foreground",
	secondary: "bg-secondary",
	secondaryForeground: "text-secondary-foreground",
	accent: "bg-accent",
	accentForeground: "text-accent-foreground",
	hover: "hover:bg-accent",
	hoverPrimary: "hover:bg-primary/90",
	hoverSecondary: "hover:bg-accent",
	ring: "ring-ring ring-themed",
	shadow: "shadow-elevation",
	focusRing:
		"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-themed",
	radius: "rounded-lg",
	radiusXl: "rounded-xl",
	radius2xl: "rounded-2xl",
	overlay: "bg-black/50 backdrop-themed",
	paddingPage: "p-page",
	gapSection: "gap-section",
	tracking: "tracking-base",
	leading: "leading-base",
	cardSurface: "rounded-2xl border bg-card text-card-foreground shadow-sm",
	popoverSurface: "rounded-xl border bg-popover text-popover-foreground shadow-md",
	panelSurface: "rounded-xl border bg-background shadow-lg",
	textMuted: "text-muted-foreground",
	textSecondary: "text-foreground",
	textTertiary: "text-muted-foreground",
};

// Shadcn color theme object (light & dark share tokens; CSS vars switch via .dark)
export const themeColors = {
	light: semanticColors,
	dark: semanticColors,
};

/** HSL tokens for shadcn CSS vars — synced when navbar accent picker changes. */
export const schemeCssVars = {
	blue: {
		light: {
			primary: "221.2 83.2% 53.3%",
			primaryForeground: "0 0% 100%",
			ring: "221.2 83.2% 53.3%",
		},
		dark: {
			primary: "217.2 91.2% 59.8%",
			primaryForeground: "228.6 84% 4.9%",
			ring: "217.2 91.2% 59.8%",
		},
	},
	green: {
		light: {
			primary: "142.1 76.2% 36.3%",
			primaryForeground: "0 0% 100%",
			ring: "142.1 76.2% 36.3%",
		},
		dark: {
			primary: "142.1 70.6% 45.3%",
			primaryForeground: "144.9 80.4% 10%",
			ring: "142.1 70.6% 45.3%",
		},
	},
	purple: {
		light: {
			primary: "271.5 81.3% 55.9%",
			primaryForeground: "0 0% 100%",
			ring: "271.5 81.3% 55.9%",
		},
		dark: {
			primary: "271.5 91% 65.1%",
			primaryForeground: "274.3 86.8% 12.9%",
			ring: "271.5 91% 65.1%",
		},
	},
	orange: {
		light: {
			primary: "20.5 90.2% 48.2%",
			primaryForeground: "0 0% 100%",
			ring: "20.5 90.2% 48.2%",
		},
		dark: {
			primary: "24.6 95% 53.1%",
			primaryForeground: "13 81.1% 14.5%",
			ring: "24.6 95% 53.1%",
		},
	},
	red: {
		light: {
			primary: "0 72.2% 50.6%",
			primaryForeground: "0 0% 100%",
			ring: "0 72.2% 50.6%",
		},
		dark: {
			primary: "0 84.2% 60.2%",
			primaryForeground: "0 74.7% 15.5%",
			ring: "0 84.2% 60.2%",
		},
	},
	pink: {
		light: {
			primary: "346.8 77.2% 49.8%",
			primaryForeground: "0 0% 100%",
			ring: "346.8 77.2% 49.8%",
		},
		dark: {
			primary: "330.4 81.2% 60.4%",
			primaryForeground: "343.4 81.2% 14.9%",
			ring: "330.4 81.2% 60.4%",
		},
	},
	indigo: {
		light: {
			primary: "243.4 75.4% 58.6%",
			primaryForeground: "0 0% 100%",
			ring: "243.4 75.4% 58.6%",
		},
		dark: {
			primary: "238.7 83.5% 66.7%",
			primaryForeground: "244.3 47.1% 20.2%",
			ring: "238.7 83.5% 66.7%",
		},
	},
	zinc: {
		light: {
			primary: "240 5.9% 10%",
			primaryForeground: "0 0% 100%",
			ring: "240 5.9% 10%",
		},
		dark: {
			primary: "0 0% 98%",
			primaryForeground: "240 5.9% 10%",
			ring: "0 0% 98%",
		},
	},
};

/** Push accent palette into shadcn CSS custom properties on :root. */
export const applySchemeCssVars = (colorScheme, theme) => {
	if (typeof document === "undefined") return;
	const vars =
		schemeCssVars[colorScheme]?.[theme] ?? schemeCssVars.blue[theme];
	const root = document.documentElement;
	root.style.setProperty("--primary", vars.primary);
	root.style.setProperty("--primary-foreground", vars.primaryForeground);
	root.style.setProperty("--ring", vars.ring);
	root.dataset.colorScheme = colorScheme;
};

/** Focus ring wired to CSS customizer (--ring, --ring-width). */
export const getFocusRingClass = (_colorScheme) =>
	"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-themed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
