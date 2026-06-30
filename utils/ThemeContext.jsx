import React, { createContext, useContext, useState, useEffect } from "react";
import { colorSchemes, themeColors } from "./theme";

/** Used when no Provider is above (e.g. Fast Refresh / duplicate context module in dev). Avoids crashes. */
const fallbackThemeContext = {
	theme: "light",
	setTheme: () => {},
	colorScheme: "blue",
	setColorScheme: () => {},
	toggleTheme: () => {},
	colors: themeColors.light,
	scheme: colorSchemes.blue.light,
};

const ThemeContext = createContext(fallbackThemeContext);

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState("light");
	const [colorScheme, setColorScheme] = useState("blue");

	// Restore persisted theme after mount — never read localStorage during SSR
	// or the first client render, or hydration will mismatch the server HTML.
	useEffect(() => {
		try {
			const savedTheme = localStorage.getItem("cms-theme");
			const savedScheme = localStorage.getItem("cms-color-scheme");
			if (savedTheme === "light" || savedTheme === "dark") {
				setTheme(savedTheme);
			}
			if (savedScheme && colorSchemes[savedScheme]) {
				setColorScheme(savedScheme);
			}
		} catch {
			/* ignore */
		}
	}, []);

	// Apply light/dark mode + accent palette to document (shadcn CSS vars)
	useEffect(() => {
		if (typeof window === "undefined") return;

		const root = document.documentElement;
		const body = document.body;

		if (theme === "dark") {
			root.classList.add("dark");
			body.style.backgroundColor = "#09090b"; // zinc-950
		} else {
			root.classList.remove("dark");
			body.style.backgroundColor = "#f4f4f5"; // zinc-100
		}

		// Accent/primary tokens owned by ThemeCustomizerProvider

		localStorage.setItem("cms-theme", theme);
		localStorage.setItem("cms-color-scheme", colorScheme);
	}, [theme, colorScheme]);

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	// Get current theme colors
	const colors = themeColors[theme];

	// Get current color scheme
	const scheme = colorSchemes[colorScheme][theme];

	const value = {
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

export const useTheme = () => useContext(ThemeContext);
