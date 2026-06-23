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

export const chartColorPresets = {
	blue: { label: "Blue", swatch: "hsl(221 83% 53%)", value: "221.2 83.2% 53.3%" },
	green: { label: "Green", swatch: "hsl(142 76% 36%)", value: "142.1 76.2% 36.3%" },
	red: { label: "Red", swatch: "hsl(0 72% 51%)", value: "0 72.2% 50.6%" },
	purple: { label: "Purple", swatch: "hsl(271 81% 56%)", value: "271.5 81.3% 55.9%" },
	orange: { label: "Orange", swatch: "hsl(21 90% 48%)", value: "20.5 90.2% 48.2%" },
	teal: { label: "Teal", swatch: "hsl(173 80% 40%)", value: "173 80% 40%" },
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
	root.style.setProperty("--chart-1", preset.value);
	root.style.setProperty("--chart-2", preset.value);
	root.dataset.chartColor = chartColorKey;
}

export function applyStylePreset(styleKey) {
	const preset = stylePresets[styleKey] ?? stylePresets.vega;
	if (typeof document === "undefined") return;
	document.documentElement.style.setProperty("--radius", preset.radius);
	document.documentElement.dataset.style = styleKey;
}

export const CUSTOMIZER_STORAGE_KEY = "cms-theme-customizer";

export const defaultCustomizerState = {
	style: "vega",
	baseColor: "mist",
	accent: "blue",
	chartColor: "blue",
	radius: "default",
	bodyFont: "inter",
	headingFont: "figtree",
};
