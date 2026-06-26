import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useTheme } from "./useTheme";
import {
	CUSTOMIZER_STORAGE_KEY,
	defaultCustomizerState,
	applyBaseColorVars,
	applyAccentVars,
	applyRadiusVar,
	applyFontVars,
	applyChartColorVar,
	applyStylePreset,
	applyFontSizeVar,
	applyUiScaleVar,
	accentToColorScheme,
	stylePresets,
	radiusPresets,
} from "./themeCustomizer";

const ThemeCustomizerContext = createContext(null);

export function ThemeCustomizerProvider({ children }) {
	const { setColorScheme, theme } = useTheme();
	const [settings, setSettings] = useState(defaultCustomizerState);
	const [hydrated, setHydrated] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		try {
			const saved = localStorage.getItem(CUSTOMIZER_STORAGE_KEY);
			if (saved) {
				setSettings({ ...defaultCustomizerState, ...JSON.parse(saved) });
			}
		} catch {
			/* ignore */
		}
		setHydrated(true);
	}, []);

	const applyAll = useCallback(
		(next, mode = theme) => {
			applyStylePreset(next.style);
			applyBaseColorVars(next.baseColor, mode);
			applyAccentVars(next.accent);
			applyRadiusVar(next.radius);
			applyFontVars(next.bodyFont, next.headingFont);
			applyChartColorVar(next.chartColor);
			applyFontSizeVar(next.fontSize);
			applyUiScaleVar(next.uiScale);
			const schemeKey = accentToColorScheme[next.accent] ?? "blue";
			setColorScheme(schemeKey);
		},
		[setColorScheme, theme]
	);

	useEffect(() => {
		if (!hydrated) return;
		applyAll(settings, theme);
		localStorage.setItem(CUSTOMIZER_STORAGE_KEY, JSON.stringify(settings));
	}, [settings, hydrated, applyAll, theme]);

	const updateSetting = (key, value) => {
		setSettings((prev) => {
			const next = { ...prev, [key]: value };
			if (key === "style") {
				const styleRadius = stylePresets[value]?.radius;
				const radiusKey = Object.entries(radiusPresets).find(
					([, preset]) => preset.value === styleRadius
				)?.[0];
				if (radiusKey) next.radius = radiusKey;
			}
			return next;
		});
	};

	const resetSettings = () => setSettings(defaultCustomizerState);
	const toggleCustomizer = () => setOpen((v) => !v);

	return (
		<ThemeCustomizerContext.Provider
			value={{
				settings,
				updateSetting,
				resetSettings,
				hydrated,
				open,
				setOpen,
				toggleCustomizer,
			}}
		>
			{children}
		</ThemeCustomizerContext.Provider>
	);
}

export function useThemeCustomizer() {
	const ctx = useContext(ThemeCustomizerContext);
	if (!ctx) {
		throw new Error("useThemeCustomizer must be used within ThemeCustomizerProvider");
	}
	return ctx;
}
