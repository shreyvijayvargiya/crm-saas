import React, { createContext, useContext, useState, useEffect } from "react";
import { colorSchemes, themeColors } from "./theme";

const ThemeContext = createContext();

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

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
};
