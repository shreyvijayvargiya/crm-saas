/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"app/**/*.{js,jsx}",
		"components/**/*.{js,jsx,ts,tsx}",
		"modules/**/*.{js,jsx}",
		"pages/**/*.{js,jsx}",
		"utils/**/*.{js,jsx}",
		"lib/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)"],
				heading: ["var(--font-heading)"],
			},
			lineHeight: {
				base: "var(--line-height-base)",
			},
			letterSpacing: {
				base: "var(--letter-spacing)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				xl: "calc(var(--radius) + 4px)",
				"2xl": "calc(var(--radius) + 8px)",
				"3xl": "calc(var(--radius) + 12px)",
			},
			boxShadow: {
				sm: "var(--shadow-elevation)",
				DEFAULT: "var(--shadow-elevation)",
				md: "var(--shadow-elevation)",
				lg: "var(--shadow-elevation)",
				xl: "var(--shadow-elevation)",
				"2xl": "var(--shadow-elevation)",
			},
			ringWidth: {
				DEFAULT: "var(--ring-width)",
				0: "0px",
				1: "calc(var(--ring-width) * 0.5)",
				2: "var(--ring-width)",
				4: "calc(var(--ring-width) * 2)",
			},
			spacing: {
				page: "var(--page-padding)",
				section: "var(--section-gap)",
			},
			height: {
				ui: "calc(2.5rem * var(--ui-scale, 1))",
				"ui-sm": "calc(2.25rem * var(--ui-scale, 1))",
				"ui-xs": "calc(2rem * var(--ui-scale, 1))",
				"ui-lg": "calc(2.75rem * var(--ui-scale, 1))",
				"ui-icon": "calc(2.25rem * var(--ui-scale, 1))",
			},
			minHeight: {
				ui: "calc(2.5rem * var(--ui-scale, 1))",
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
