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
	// Theme state
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined") {
			const savedTheme = localStorage.getItem("cms-theme");
			return savedTheme || "light";
		}
		return "light";
	});

	// Color scheme state
	const [colorScheme, setColorScheme] = useState(() => {
		if (typeof window !== "undefined") {
			const savedScheme = localStorage.getItem("cms-color-scheme");
			return savedScheme || "blue";
		}
		return "blue";
	});

	// Apply theme to document
	useEffect(() => {
		if (typeof window !== "undefined") {
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
		}
	}, [theme]);

	// Save color scheme
	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("cms-color-scheme", colorScheme);
		}
	}, [colorScheme]);

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
