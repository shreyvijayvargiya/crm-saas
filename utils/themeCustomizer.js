/** Light-mode shadcn-style presets for the theme customizer panel. */

export const stylePresets = {
	vega: {
		label: "Vega",
		description: "Default balanced look",
		radius: "0.5rem",
	},
	nova: {
		label: "Nova",
		description: "Compact, sharp corners",
		radius: "0.25rem",
	},
	maia: {
		label: "Maia",
		description: "Soft, rounded surfaces",
		radius: "0.75rem",
	},
	lyra: {
		label: "Lyra",
		description: "Wide radius, airy feel",
		radius: "1rem",
	},
	mira: {
		label: "Mira",
		description: "Minimal, tight radius",
		radius: "0.375rem",
	},
};

export const baseColorPresets = {
	zinc: {
		label: "Zinc",
		swatch: "hsl(240 5% 65%)",
		vars: {
			background: "0 0% 100%",
			foreground: "240 10% 3.9%",
			muted: "240 4.8% 95.9%",
			"muted-foreground": "240 3.8% 46.1%",
			popover: "0 0% 100%",
			"popover-foreground": "240 10% 3.9%",
			border: "240 5.9% 90%",
			input: "240 5.9% 90%",
			card: "0 0% 100%",
			"card-foreground": "240 10% 3.9%",
			secondary: "240 4.8% 95.9%",
			"secondary-foreground": "240 5.9% 10%",
			accent: "240 4.8% 95.9%",
			"accent-foreground": "240 5.9% 10%",
		},
	},
	slate: {
		label: "Slate",
		swatch: "hsl(215 16% 65%)",
		vars: {
			background: "0 0% 100%",
			foreground: "222.2 84% 4.9%",
			muted: "210 40% 96.1%",
			"muted-foreground": "215.4 16.3% 46.9%",
			popover: "0 0% 100%",
			"popover-foreground": "222.2 84% 4.9%",
			border: "214.3 31.8% 91.4%",
			input: "214.3 31.8% 91.4%",
			card: "0 0% 100%",
			"card-foreground": "222.2 84% 4.9%",
			secondary: "210 40% 96.1%",
			"secondary-foreground": "222.2 47.4% 11.2%",
			accent: "210 40% 96.1%",
			"accent-foreground": "222.2 47.4% 11.2%",
		},
	},
	stone: {
		label: "Stone",
		swatch: "hsl(25 5% 65%)",
		vars: {
			background: "0 0% 100%",
			foreground: "20 14.3% 4.1%",
			muted: "60 4.8% 95.9%",
			"muted-foreground": "25 5.3% 44.7%",
			popover: "0 0% 100%",
			"popover-foreground": "20 14.3% 4.1%",
			border: "20 5.9% 90%",
			input: "20 5.9% 90%",
			card: "0 0% 100%",
			"card-foreground": "20 14.3% 4.1%",
			secondary: "60 4.8% 95.9%",
			"secondary-foreground": "24 9.8% 10%",
			accent: "60 4.8% 95.9%",
			"accent-foreground": "24 9.8% 10%",
		},
	},
	gray: {
		label: "Gray",
		swatch: "hsl(220 9% 65%)",
		vars: {
			background: "0 0% 100%",
			foreground: "224 71.4% 4.1%",
			muted: "220 14.3% 95.9%",
			"muted-foreground": "220 8.9% 46.1%",
			popover: "0 0% 100%",
			"popover-foreground": "224 71.4% 4.1%",
			border: "220 13% 91%",
			input: "220 13% 91%",
			card: "0 0% 100%",
			"card-foreground": "224 71.4% 4.1%",
			secondary: "220 14.3% 95.9%",
			"secondary-foreground": "220.9 39.3% 11%",
			accent: "220 14.3% 95.9%",
			"accent-foreground": "220.9 39.3% 11%",
		},
	},
	neutral: {
		label: "Neutral",
		swatch: "hsl(0 0% 65%)",
		vars: {
			background: "0 0% 100%",
			foreground: "0 0% 3.9%",
			muted: "0 0% 96.1%",
			"muted-foreground": "0 0% 45.1%",
			popover: "0 0% 100%",
			"popover-foreground": "0 0% 3.9%",
			border: "0 0% 89.8%",
			input: "0 0% 89.8%",
			card: "0 0% 100%",
			"card-foreground": "0 0% 3.9%",
			secondary: "0 0% 96.1%",
			"secondary-foreground": "0 0% 9%",
			accent: "0 0% 96.1%",
			"accent-foreground": "0 0% 9%",
		},
	},
	mist: {
		label: "Mist",
		swatch: "hsl(210 20% 70%)",
		vars: {
			background: "210 20% 98%",
			foreground: "215 25% 15%",
			muted: "210 25% 95%",
			"muted-foreground": "215 15% 45%",
			popover: "210 20% 98%",
			"popover-foreground": "215 25% 15%",
			border: "210 20% 88%",
			input: "210 20% 88%",
			card: "0 0% 100%",
			"card-foreground": "215 25% 15%",
			secondary: "210 25% 94%",
			"secondary-foreground": "215 25% 20%",
			accent: "210 25% 94%",
			"accent-foreground": "215 25% 20%",
		},
	},
};

/** Dark-mode surface tokens per base palette */
export const baseColorDarkVars = {
	zinc: {
		background: "240 10% 3.9%",
		foreground: "0 0% 98%",
		muted: "240 3.7% 15.9%",
		"muted-foreground": "240 5% 64.9%",
		popover: "240 10% 3.9%",
		"popover-foreground": "0 0% 98%",
		border: "240 3.7% 15.9%",
		input: "240 3.7% 15.9%",
		card: "240 10% 3.9%",
		"card-foreground": "0 0% 98%",
		secondary: "240 3.7% 15.9%",
		"secondary-foreground": "0 0% 98%",
		accent: "240 3.7% 15.9%",
		"accent-foreground": "0 0% 98%",
	},
	slate: {
		background: "222.2 84% 4.9%",
		foreground: "210 40% 98%",
		muted: "217.2 32.6% 17.5%",
		"muted-foreground": "215 20.2% 65.1%",
		popover: "222.2 84% 4.9%",
		"popover-foreground": "210 40% 98%",
		border: "217.2 32.6% 17.5%",
		input: "217.2 32.6% 17.5%",
		card: "222.2 84% 4.9%",
		"card-foreground": "210 40% 98%",
		secondary: "217.2 32.6% 17.5%",
		"secondary-foreground": "210 40% 98%",
		accent: "217.2 32.6% 17.5%",
		"accent-foreground": "210 40% 98%",
	},
	stone: {
		background: "20 14.3% 4.1%",
		foreground: "60 9.1% 97.8%",
		muted: "12 6.5% 15.1%",
		"muted-foreground": "24 5.4% 63.9%",
		popover: "20 14.3% 4.1%",
		"popover-foreground": "60 9.1% 97.8%",
		border: "12 6.5% 15.1%",
		input: "12 6.5% 15.1%",
		card: "20 14.3% 4.1%",
		"card-foreground": "60 9.1% 97.8%",
		secondary: "12 6.5% 15.1%",
		"secondary-foreground": "60 9.1% 97.8%",
		accent: "12 6.5% 15.1%",
		"accent-foreground": "60 9.1% 97.8%",
	},
	gray: {
		background: "224 71.4% 4.1%",
		foreground: "210 20% 98%",
		muted: "215 27.9% 16.9%",
		"muted-foreground": "217.9 10.6% 64.9%",
		popover: "224 71.4% 4.1%",
		"popover-foreground": "210 20% 98%",
		border: "215 27.9% 16.9%",
		input: "215 27.9% 16.9%",
		card: "224 71.4% 4.1%",
		"card-foreground": "210 20% 98%",
		secondary: "215 27.9% 16.9%",
		"secondary-foreground": "210 20% 98%",
		accent: "215 27.9% 16.9%",
		"accent-foreground": "210 20% 98%",
	},
	neutral: {
		background: "0 0% 3.9%",
		foreground: "0 0% 98%",
		muted: "0 0% 14.9%",
		"muted-foreground": "0 0% 63.9%",
		popover: "0 0% 3.9%",
		"popover-foreground": "0 0% 98%",
		border: "0 0% 14.9%",
		input: "0 0% 14.9%",
		card: "0 0% 3.9%",
		"card-foreground": "0 0% 98%",
		secondary: "0 0% 14.9%",
		"secondary-foreground": "0 0% 98%",
		accent: "0 0% 14.9%",
		"accent-foreground": "0 0% 98%",
	},
	mist: {
		background: "215 25% 8%",
		foreground: "210 20% 98%",
		muted: "215 20% 14%",
		"muted-foreground": "215 15% 65%",
		popover: "215 25% 8%",
		"popover-foreground": "210 20% 98%",
		border: "215 20% 18%",
		input: "215 20% 18%",
		card: "215 25% 10%",
		"card-foreground": "210 20% 98%",
		secondary: "215 20% 14%",
		"secondary-foreground": "210 20% 98%",
		accent: "215 20% 14%",
		"accent-foreground": "210 20% 98%",
	},
};

export const accentPresets = {
	blue: { label: "Blue", swatch: "hsl(221 83% 53%)", primary: "221.2 83.2% 53.3%", primaryForeground: "0 0% 100%" },
	green: { label: "Green", swatch: "hsl(142 76% 36%)", primary: "142.1 76.2% 36.3%", primaryForeground: "0 0% 100%" },
	emerald: { label: "Emerald", swatch: "hsl(160 84% 39%)", primary: "160 84% 39%", primaryForeground: "0 0% 100%" },
	purple: { label: "Purple", swatch: "hsl(271 81% 56%)", primary: "271.5 81.3% 55.9%", primaryForeground: "0 0% 100%" },
	orange: { label: "Orange", swatch: "hsl(21 90% 48%)", primary: "20.5 90.2% 48.2%", primaryForeground: "0 0% 100%" },
	red: { label: "Red", swatch: "hsl(0 72% 51%)", primary: "0 72.2% 50.6%", primaryForeground: "0 0% 100%" },
	pink: { label: "Pink", swatch: "hsl(347 77% 50%)", primary: "346.8 77.2% 49.8%", primaryForeground: "0 0% 100%" },
	indigo: { label: "Indigo", swatch: "hsl(243 75% 59%)", primary: "243.4 75.4% 58.6%", primaryForeground: "0 0% 100%" },
	violet: { label: "Violet", swatch: "hsl(262 83% 58%)", primary: "262.1 83.3% 57.8%", primaryForeground: "0 0% 100%" },
	teal: { label: "Teal", swatch: "hsl(173 80% 40%)", primary: "173 80% 40%", primaryForeground: "0 0% 100%" },
	cyan: { label: "Cyan", swatch: "hsl(189 94% 43%)", primary: "189 94% 43%", primaryForeground: "0 0% 100%" },
	amber: { label: "Amber", swatch: "hsl(38 92% 50%)", primary: "38 92% 50%", primaryForeground: "0 0% 100%" },
	zinc: { label: "Zinc", swatch: "hsl(240 6% 10%)", primary: "240 5.9% 10%", primaryForeground: "0 0% 100%" },
};

/** Maps customizer accent keys to existing colorScheme keys in theme.js */
export const accentToColorScheme = {
	blue: "blue",
	green: "green",
	emerald: "green",
	purple: "purple",
	orange: "orange",
	red: "red",
	pink: "pink",
	indigo: "indigo",
	violet: "purple",
	teal: "green",
	cyan: "blue",
	amber: "orange",
	zinc: "zinc",
};

export const radiusPresets = {
	none: { label: "None", value: "0rem" },
	sm: { label: "Small", value: "0.25rem" },
	default: { label: "Default", value: "0.5rem" },
	md: { label: "Medium", value: "0.75rem" },
	lg: { label: "Large", value: "1rem" },
	xl: { label: "Extra Large", value: "1.5rem" },
};

export const borderStylePresets = {
	solid: { label: "Solid", value: "solid", preview: "border-solid" },
	dashed: { label: "Dashed", value: "dashed", preview: "border-dashed" },
	dotted: { label: "Dotted", value: "dotted", preview: "border-dotted" },
	double: { label: "Double", value: "double", preview: "border-double" },
	none: { label: "None", value: "none", preview: "border-none" },
};

export const borderWidthPresets = {
	hairline: { label: "Hairline", value: "0.5px", description: "0.5px — subtle dividers" },
	thin: { label: "Thin", value: "1px", description: "1px — default UI" },
	medium: { label: "Medium", value: "2px", description: "2px — emphasis" },
	thick: { label: "Thick", value: "3px", description: "3px — strong outlines" },
};

export const shadowPresets = {
	none: {
		label: "None",
		value: "none",
		description: "Flat surfaces",
	},
	xs: {
		label: "Extra Small",
		value: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
		description: "Subtle lift",
	},
	sm: {
		label: "Small",
		value: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
		description: "Cards default",
	},
	md: {
		label: "Medium",
		value: "0 4px 6px -1px rgb(0 0 0 / 0.08), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
		description: "Dropdowns, popovers",
	},
	lg: {
		label: "Large",
		value: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.06)",
		description: "Modals, panels",
	},
	xl: {
		label: "Extra Large",
		value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.08)",
		description: "Floating overlays",
	},
};

export const spacingPresets = {
	compact: { label: "Compact", value: "0.875", description: "Tighter page rhythm" },
	default: { label: "Default", value: "1", description: "Standard spacing" },
	comfortable: { label: "Comfortable", value: "1.125", description: "More breathing room" },
	spacious: { label: "Spacious", value: "1.25", description: "Airy layouts" },
};

export const lineHeightPresets = {
	tight: { label: "Tight", value: "1.35", description: "Headings, dense UI" },
	normal: { label: "Normal", value: "1.5", description: "Body default" },
	relaxed: { label: "Relaxed", value: "1.625", description: "Readable prose" },
	loose: { label: "Loose", value: "1.75", description: "Marketing copy" },
};

export const letterSpacingPresets = {
	tighter: { label: "Tighter", value: "-0.02em" },
	normal: { label: "Normal", value: "0em" },
	wide: { label: "Wide", value: "0.025em" },
	wider: { label: "Wider", value: "0.05em" },
};

export const ringWidthPresets = {
	thin: { label: "Thin", value: "1px", description: "Subtle focus ring" },
	default: { label: "Default", value: "2px", description: "Standard focus" },
	thick: { label: "Thick", value: "3px", description: "High-contrast focus" },
};

export const backdropBlurPresets = {
	none: { label: "None", value: "0px" },
	sm: { label: "Small", value: "4px" },
	md: { label: "Medium", value: "8px" },
	lg: { label: "Large", value: "16px" },
	xl: { label: "Extra Large", value: "24px" },
};

export const fontSizePresets = {
	"2xl": { label: "Extra Large", value: "20px", preview: "Aa" },
	lg: { label: "Large", value: "18px", preview: "Aa" },
	default: { label: "Default", value: "16px", preview: "Aa" },
	sm: { label: "Small", value: "14px", preview: "Aa" },
	xs: { label: "Extra Small", value: "13px", preview: "Aa" },
	compact: { label: "Compact", value: "12px", preview: "Aa" },
};

export const uiScalePresets = {
	default: { label: "Default", value: "1", description: "Standard buttons & inputs" },
	compact: { label: "Compact", value: "0.925", description: "Slightly smaller controls" },
	dense: { label: "Dense", value: "0.85", description: "Tighter buttons & inputs" },
	mini: { label: "Mini", value: "0.8", description: "Smallest controls" },
};

export const fontPresets = {
	inter: {
		label: "Inter",
		family: "Inter, ui-sans-serif, system-ui, sans-serif",
		google: "Inter:wght@400;500;600;700",
	},
	raleway: {
		label: "Raleway",
		family: "Raleway, ui-sans-serif, system-ui, sans-serif",
		google: "Raleway:wght@400;500;600;700",
	},
	figtree: {
		label: "Figtree",
		family: "Figtree, ui-sans-serif, system-ui, sans-serif",
		google: "Figtree:wght@400;500;600;700",
	},
	nunito: {
		label: "Nunito",
		family: "Nunito, ui-sans-serif, system-ui, sans-serif",
		google: "Nunito:wght@400;500;600;700",
	},
	"dm-sans": {
		label: "DM Sans",
		family: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
		google: "DM+Sans:wght@400;500;600;700",
	},
	"plus-jakarta": {
		label: "Plus Jakarta Sans",
		family: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
		google: "Plus+Jakarta+Sans:wght@400;500;600;700",
	},
	system: {
		label: "System UI",
		family: "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
		google: null,
	},
};

/** Full chart series palettes (chart-1 … chart-5) driven by the customizer. */
export const chartColorPresets = {
	blue: {
		label: "Blue",
		swatch: "hsl(221 83% 53%)",
		value: "221.2 83.2% 53.3%",
		colors: [
			"221.2 83.2% 53.3%",
			"262.1 83.3% 57.8%",
			"173 80% 40%",
			"24.6 95% 53.1%",
			"189 94% 43%",
		],
	},
	green: {
		label: "Green",
		swatch: "hsl(142 76% 36%)",
		value: "142.1 76.2% 36.3%",
		colors: [
			"142.1 76.2% 36.3%",
			"160 84% 39%",
			"173 80% 40%",
			"84 70% 45%",
			"43 96% 56%",
		],
	},
	red: {
		label: "Red",
		swatch: "hsl(0 72% 51%)",
		value: "0 72.2% 50.6%",
		colors: [
			"0 72.2% 50.6%",
			"20.5 90.2% 48.2%",
			"346.8 77.2% 49.8%",
			"38 92% 50%",
			"271.5 81.3% 55.9%",
		],
	},
	purple: {
		label: "Purple",
		swatch: "hsl(271 81% 56%)",
		value: "271.5 81.3% 55.9%",
		colors: [
			"271.5 81.3% 55.9%",
			"243.4 75.4% 58.6%",
			"330.4 81.2% 60.4%",
			"221.2 83.2% 53.3%",
			"189 94% 43%",
		],
	},
	orange: {
		label: "Orange",
		swatch: "hsl(21 90% 48%)",
		value: "20.5 90.2% 48.2%",
		colors: [
			"20.5 90.2% 48.2%",
			"38 92% 50%",
			"0 72.2% 50.6%",
			"142.1 76.2% 36.3%",
			"221.2 83.2% 53.3%",
		],
	},
	teal: {
		label: "Teal",
		swatch: "hsl(173 80% 40%)",
		value: "173 80% 40%",
		colors: [
			"173 80% 40%",
			"189 94% 43%",
			"221.2 83.2% 53.3%",
			"142.1 76.2% 36.3%",
			"262.1 83.3% 57.8%",
		],
	},
};

const FONT_LINK_ID = "theme-customizer-fonts";

export function loadGoogleFonts(...fontKeys) {
	if (typeof document === "undefined") return;
	const families = fontKeys
		.map((key) => fontPresets[key]?.google)
		.filter(Boolean);
	if (families.length === 0) return;

	const href = `https://fonts.googleapis.com/css2?${families
		.map((f) => `family=${f}`)
		.join("&")}&display=swap`;

	let link = document.getElementById(FONT_LINK_ID);
	if (!link) {
		link = document.createElement("link");
		link.id = FONT_LINK_ID;
		link.rel = "stylesheet";
		document.head.appendChild(link);
	}
	link.href = href;
}

export function applyAccentVars(accentKey) {
	if (typeof document === "undefined") return;
	const preset = accentPresets[accentKey] ?? accentPresets.blue;
	const root = document.documentElement;
	root.style.setProperty("--primary", preset.primary);
	root.style.setProperty("--primary-foreground", preset.primaryForeground);
	root.style.setProperty("--ring", preset.primary);
	root.dataset.accent = accentKey;
}

export function applyBaseColorVars(baseColorKey, mode = "light") {
	if (typeof document === "undefined") return;
	const preset = baseColorPresets[baseColorKey] ?? baseColorPresets.mist;
	const vars =
		mode === "dark"
			? baseColorDarkVars[baseColorKey] ?? baseColorDarkVars.zinc
			: preset.vars;
	const root = document.documentElement;
	Object.entries(vars).forEach(([key, value]) => {
		root.style.setProperty(`--${key}`, value);
	});
	root.dataset.baseColor = baseColorKey;
}

export function applyRadiusVar(radiusKey) {
	if (typeof document === "undefined") return;
	const preset = radiusPresets[radiusKey] ?? radiusPresets.default;
	document.documentElement.style.setProperty("--radius", preset.value);
	document.documentElement.dataset.radius = radiusKey;
}

export function applyFontVars(bodyFontKey, headingFontKey) {
	if (typeof document === "undefined") return;
	const body = fontPresets[bodyFontKey] ?? fontPresets.inter;
	const heading = fontPresets[headingFontKey] ?? fontPresets.inter;
	const root = document.documentElement;
	root.style.setProperty("--font-sans", body.family);
	root.style.setProperty("--font-heading", heading.family);
	root.dataset.bodyFont = bodyFontKey;
	root.dataset.headingFont = headingFontKey;
	loadGoogleFonts(bodyFontKey, headingFontKey);
}

export function applyChartColorVar(chartColorKey) {
	if (typeof document === "undefined") return;
	const preset = chartColorPresets[chartColorKey] ?? chartColorPresets.blue;
	const root = document.documentElement;
	const colors = preset.colors ?? [preset.value];
	for (let i = 0; i < 5; i++) {
		root.style.setProperty(`--chart-${i + 1}`, colors[i] ?? colors[i % colors.length]);
	}
	root.dataset.chartColor = chartColorKey;
}

export function applyFontSizeVar(fontSizeKey) {
	if (typeof document === "undefined") return;
	const preset = fontSizePresets[fontSizeKey] ?? fontSizePresets.default;
	document.documentElement.style.setProperty("--font-size-base", preset.value);
	document.documentElement.dataset.fontSize = fontSizeKey;
}

export function applyUiScaleVar(uiScaleKey) {
	if (typeof document === "undefined") return;
	const preset = uiScalePresets[uiScaleKey] ?? uiScalePresets.default;
	document.documentElement.style.setProperty("--ui-scale", preset.value);
	document.documentElement.dataset.uiScale = uiScaleKey;
}

export function applyBorderStyleVar(borderStyleKey) {
	if (typeof document === "undefined") return;
	const preset = borderStylePresets[borderStyleKey] ?? borderStylePresets.solid;
	document.documentElement.style.setProperty("--border-style", preset.value);
	document.documentElement.dataset.borderStyle = borderStyleKey;
}

export function applyBorderWidthVar(borderWidthKey) {
	if (typeof document === "undefined") return;
	const preset = borderWidthPresets[borderWidthKey] ?? borderWidthPresets.thin;
	document.documentElement.style.setProperty("--border-width", preset.value);
	document.documentElement.dataset.borderWidth = borderWidthKey;
}

export function applyShadowVar(shadowKey) {
	if (typeof document === "undefined") return;
	const preset = shadowPresets[shadowKey] ?? shadowPresets.sm;
	document.documentElement.style.setProperty("--shadow-elevation", preset.value);
	document.documentElement.dataset.shadow = shadowKey;
}

export function applySpacingVar(spacingKey) {
	if (typeof document === "undefined") return;
	const preset = spacingPresets[spacingKey] ?? spacingPresets.default;
	document.documentElement.style.setProperty("--spacing-scale", preset.value);
	document.documentElement.dataset.spacing = spacingKey;
}

export function applyLineHeightVar(lineHeightKey) {
	if (typeof document === "undefined") return;
	const preset = lineHeightPresets[lineHeightKey] ?? lineHeightPresets.normal;
	document.documentElement.style.setProperty("--line-height-base", preset.value);
	document.documentElement.dataset.lineHeight = lineHeightKey;
}

export function applyLetterSpacingVar(letterSpacingKey) {
	if (typeof document === "undefined") return;
	const preset = letterSpacingPresets[letterSpacingKey] ?? letterSpacingPresets.normal;
	document.documentElement.style.setProperty("--letter-spacing", preset.value);
	document.documentElement.dataset.letterSpacing = letterSpacingKey;
}

export function applyRingWidthVar(ringWidthKey) {
	if (typeof document === "undefined") return;
	const preset = ringWidthPresets[ringWidthKey] ?? ringWidthPresets.default;
	document.documentElement.style.setProperty("--ring-width", preset.value);
	document.documentElement.dataset.ringWidth = ringWidthKey;
}

export function applyBackdropBlurVar(backdropBlurKey) {
	if (typeof document === "undefined") return;
	const preset = backdropBlurPresets[backdropBlurKey] ?? backdropBlurPresets.none;
	document.documentElement.style.setProperty("--backdrop-blur", preset.value);
	document.documentElement.dataset.backdropBlur = backdropBlurKey;
}

export function applyStylePreset(styleKey) {
	const preset = stylePresets[styleKey] ?? stylePresets.vega;
	if (typeof document === "undefined") return;
	document.documentElement.style.setProperty("--radius", preset.radius);
	document.documentElement.dataset.style = styleKey;
}

export const CUSTOMIZER_STORAGE_KEY = "cms-theme-customizer";

/** Named CRM themes: each maps to a full customizer settings bundle. */
export const themePresets = {
	default: {
		label: "Default",
		swatches: ["#f4f7fa", "#1e293b", "#3b82f6", "#94a3b8"],
		settings: {
			style: "vega",
			baseColor: "mist",
			accent: "blue",
			chartColor: "blue",
			radius: "default",
			bodyFont: "inter",
			headingFont: "figtree",
			fontSize: "default",
			uiScale: "default",
			borderStyle: "solid",
			borderWidth: "thin",
			shadow: "sm",
			spacing: "default",
			lineHeight: "normal",
			letterSpacing: "normal",
			ringWidth: "default",
			backdropBlur: "none",
		},
	},
	notebook: {
		label: "Notebook",
		swatches: ["#faf8f5", "#292524", "#a8a29e", "#78716c"],
		settings: {
			style: "mira",
			baseColor: "stone",
			accent: "zinc",
			chartColor: "blue",
			radius: "sm",
			bodyFont: "inter",
			headingFont: "figtree",
			fontSize: "default",
			uiScale: "default",
			borderStyle: "solid",
			borderWidth: "thin",
			shadow: "xs",
			spacing: "comfortable",
			lineHeight: "relaxed",
			letterSpacing: "normal",
			ringWidth: "default",
			backdropBlur: "none",
		},
	},
	"neo-brutalism": {
		label: "Neo Brutalism",
		swatches: ["#ffffff", "#0a0a0a", "#ef4444", "#fbbf24"],
		settings: {
			style: "nova",
			baseColor: "neutral",
			accent: "red",
			chartColor: "orange",
			radius: "none",
			bodyFont: "plus-jakarta",
			headingFont: "plus-jakarta",
			fontSize: "default",
			uiScale: "default",
			borderStyle: "solid",
			borderWidth: "medium",
			shadow: "none",
			spacing: "default",
			lineHeight: "normal",
			letterSpacing: "wide",
			ringWidth: "thick",
			backdropBlur: "none",
		},
	},
	nature: {
		label: "Nature",
		swatches: ["#f0fdf4", "#14532d", "#16a34a", "#86efac"],
		settings: {
			style: "maia",
			baseColor: "stone",
			accent: "green",
			chartColor: "green",
			radius: "md",
			bodyFont: "nunito",
			headingFont: "nunito",
			fontSize: "default",
			uiScale: "default",
			borderStyle: "solid",
			borderWidth: "thin",
			shadow: "sm",
			spacing: "comfortable",
			lineHeight: "relaxed",
			letterSpacing: "normal",
			ringWidth: "default",
			backdropBlur: "none",
		},
	},
	"northern-lights": {
		label: "Northern Lights",
		swatches: ["#0f172a", "#22d3ee", "#a78bfa", "#34d399"],
		settings: {
			style: "lyra",
			baseColor: "slate",
			accent: "violet",
			chartColor: "teal",
			radius: "lg",
			bodyFont: "dm-sans",
			headingFont: "raleway",
			fontSize: "default",
			uiScale: "default",
			borderStyle: "solid",
			borderWidth: "thin",
			shadow: "md",
			spacing: "comfortable",
			lineHeight: "normal",
			letterSpacing: "normal",
			ringWidth: "default",
			backdropBlur: "sm",
		},
	},
	"pastel-dreams": {
		label: "Pastel Dreams",
		swatches: ["#fdf2f8", "#831843", "#ec4899", "#f9a8d4"],
		settings: {
			style: "lyra",
			baseColor: "gray",
			accent: "pink",
			chartColor: "purple",
			radius: "xl",
			bodyFont: "nunito",
			headingFont: "raleway",
			fontSize: "default",
			uiScale: "default",
			borderStyle: "solid",
			borderWidth: "hairline",
			shadow: "sm",
			spacing: "spacious",
			lineHeight: "relaxed",
			letterSpacing: "wide",
			ringWidth: "thin",
			backdropBlur: "md",
		},
	},
	ocean: {
		label: "Ocean",
		swatches: ["#ecfeff", "#164e63", "#0891b2", "#67e8f9"],
		settings: {
			style: "maia",
			baseColor: "slate",
			accent: "cyan",
			chartColor: "teal",
			radius: "md",
			bodyFont: "dm-sans",
			headingFont: "figtree",
			fontSize: "default",
			uiScale: "default",
			borderStyle: "solid",
			borderWidth: "thin",
			shadow: "sm",
			spacing: "default",
			lineHeight: "normal",
			letterSpacing: "normal",
			ringWidth: "default",
			backdropBlur: "none",
		},
	},
	sunset: {
		label: "Sunset",
		swatches: ["#fff7ed", "#9a3412", "#f97316", "#fdba74"],
		settings: {
			style: "vega",
			baseColor: "stone",
			accent: "orange",
			chartColor: "orange",
			radius: "default",
			bodyFont: "plus-jakarta",
			headingFont: "raleway",
			fontSize: "default",
			uiScale: "default",
			borderStyle: "solid",
			borderWidth: "thin",
			shadow: "md",
			spacing: "default",
			lineHeight: "normal",
			letterSpacing: "normal",
			ringWidth: "default",
			backdropBlur: "none",
		},
	},
	midnight: {
		label: "Midnight",
		swatches: ["#09090b", "#e4e4e7", "#6366f1", "#a1a1aa"],
		settings: {
			style: "mira",
			baseColor: "zinc",
			accent: "indigo",
			chartColor: "purple",
			radius: "sm",
			bodyFont: "inter",
			headingFont: "dm-sans",
			fontSize: "sm",
			uiScale: "compact",
			borderStyle: "solid",
			borderWidth: "thin",
			shadow: "lg",
			spacing: "compact",
			lineHeight: "tight",
			letterSpacing: "tighter",
			ringWidth: "default",
			backdropBlur: "sm",
		},
	},
};

export const defaultCustomizerState = {
	themeId: "default",
	...themePresets.default.settings,
};
