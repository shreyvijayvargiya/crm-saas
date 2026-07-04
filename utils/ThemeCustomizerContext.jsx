import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useTheme } from "./useTheme";
import {
	CUSTOMIZER_STORAGE_KEY,
	defaultCustomizerState,
	themePresets,
	applyBaseColorVars,
	applyAccentVars,
	applyRadiusVar,
	applyFontVars,
	applyChartColorVar,
	applyStylePreset,
	applyFontSizeVar,
	applyUiScaleVar,
	applyBorderStyleVar,
	applyBorderWidthVar,
	applyShadowVar,
	applySpacingVar,
	applyLineHeightVar,
	applyLetterSpacingVar,
	applyRingWidthVar,
	applyBackdropBlurVar,
	applyNamedThemeCssVars,
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
				const parsed = JSON.parse(saved);
				setSettings({
					...defaultCustomizerState,
					...parsed,
					themeId: parsed.themeId ?? "custom",
				});
			}
		} catch {
			/* ignore */
		}
		setHydrated(true);
	}, []);

	const applyAll = useCallback(
		(next, mode = theme) => {
			// Layout / density tokens always come from settings
			applyFontSizeVar(next.fontSize);
			applyUiScaleVar(next.uiScale);
			applyBorderStyleVar(next.borderStyle);
			applyBorderWidthVar(next.borderWidth);
			applySpacingVar(next.spacing);
			applyLineHeightVar(next.lineHeight);
			applyRingWidthVar(next.ringWidth);
			applyBackdropBlurVar(next.backdropBlur);

			// Full :root packs (e.g. Claude) override color/font/radius/chart tokens
			const usedCssPack = applyNamedThemeCssVars(next.themeId, mode);
			if (!usedCssPack) {
				applyStylePreset(next.style);
				applyBaseColorVars(next.baseColor, mode);
				applyAccentVars(next.accent);
				applyRadiusVar(next.radius);
				applyFontVars(next.bodyFont, next.headingFont);
				applyChartColorVar(next.chartColor);
				applyShadowVar(next.shadow);
				applyLetterSpacingVar(next.letterSpacing);
			}

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
			// Manual token tweaks leave named theme selection
			if (key !== "themeId") next.themeId = "custom";
			return next;
		});
	};

	const applyThemePreset = (themeId) => {
		const preset = themePresets[themeId];
		if (!preset) return;
		setSettings({
			...defaultCustomizerState,
			...preset.settings,
			themeId,
		});
	};

	const resetSettings = () => setSettings(defaultCustomizerState);
	const toggleCustomizer = () => setOpen((v) => !v);

	return (
		<ThemeCustomizerContext.Provider
			value={{
				settings,
				updateSetting,
				applyThemePreset,
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
