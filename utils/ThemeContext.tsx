import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { colorSchemes, themeColors } from "./theme";

interface ThemeContextType {
	theme: "light" | "dark";
	setTheme: (theme: "light" | "dark") => void;
	colorScheme: string;
	setColorScheme: (scheme: string) => void;
	toggleTheme: () => void;
	colors: typeof themeColors.light;
	scheme: typeof colorSchemes.blue.light;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	// Initialize with default values to prevent hydration mismatch
	const [theme, setTheme] = useState<"light" | "dark">("light");
	const [colorScheme, setColorScheme] = useState<string>("blue");
	const [mounted, setMounted] = useState<boolean>(false);

	// Load saved preferences after mount
	useEffect(() => {
		setMounted(true);
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("cms-theme");
			const savedScheme = localStorage.getItem("cms-color-scheme");
			if (savedTheme) {
				setTheme(savedTheme as "light" | "dark");
			}
			if (savedScheme) {
				setColorScheme(savedScheme);
			}
		}
	}, []);

	// Apply theme to document (only after mount to prevent hydration mismatch)
	useEffect(() => {
		if (!mounted || typeof window === "undefined") return;
		const root = document.documentElement;
		const body = document.body;
		if (theme === "dark") {
			root.classList.add("dark");
			body.style.backgroundColor = "#09090b"; // zinc-950
		} else {
			root.classList.remove("dark");
			body.style.backgroundColor = "#f4f4f5"; // zinc-100
		}
		localStorage.setItem("cms-theme", theme);
	}, [theme, mounted]);

	// Save color scheme (only after mount to prevent hydration mismatch)
	useEffect(() => {
		if (!mounted || typeof window === "undefined") return;
		localStorage.setItem("cms-color-scheme", colorScheme);
	}, [colorScheme, mounted]);

	const toggleTheme = (): void => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	// Get current theme colors
	const colors = themeColors[theme];

	// Get current color scheme
	const scheme =
		colorSchemes[colorScheme as keyof typeof colorSchemes]?.[theme] ||
		colorSchemes.blue[theme];

	const value: ThemeContextType = {
		theme,
		setTheme,
		colorScheme,
		setColorScheme,
		toggleTheme,
		colors,
		scheme,
	};

	return (
		<ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
