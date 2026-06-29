import React, { createContext, useContext, useEffect, useState } from "react";
import { AGENCY_THEME_KEY } from "./agencyConfig";

const AgencyThemeContext = createContext({
	theme: "dark",
	isLight: false,
	toggleTheme: () => {},
});

export function AgencyThemeProvider({ children }) {
	const [theme, setTheme] = useState("dark");

	useEffect(() => {
		try {
			const stored = localStorage.getItem(AGENCY_THEME_KEY);
			if (stored === "light" || stored === "dark") setTheme(stored);
		} catch {
			/* ignore */
		}
	}, []);

	function toggleTheme() {
		setTheme((prev) => {
			const next = prev === "light" ? "dark" : "light";
			try {
				localStorage.setItem(AGENCY_THEME_KEY, next);
			} catch {
				/* ignore */
			}
			return next;
		});
	}

	return (
		<AgencyThemeContext.Provider
			value={{ theme, isLight: theme === "light", toggleTheme }}
		>
			{children}
		</AgencyThemeContext.Provider>
	);
}

export function useAgencyTheme() {
	return useContext(AgencyThemeContext);
}
