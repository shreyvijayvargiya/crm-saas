/**
 * Shared Tailwind class fragments wired to CSS customizer :root variables.
 * Import these in UI components so border, radius, shadow, ring, and blur
 * all respond to the Design tokens panel.
 */
export const focusRing =
	"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-themed";

export const focusRingInteractive =
	"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-themed";

export const overlayBackdrop = "bg-black/50 backdrop-themed";

export const popoverSurface =
	"rounded-xl border bg-popover text-popover-foreground shadow-md";

export const popoverSurfaceElevated =
	"rounded-xl border bg-popover text-popover-foreground shadow-lg";

export const cardSurface =
	"rounded-2xl border bg-card text-card-foreground shadow-sm";

export const inputBase =
	"rounded-lg border border-input bg-background ring-offset-background";

export const menuItemInteractive = "rounded-lg outline-none transition-colors";

export const panelSurface = "rounded-xl border bg-background shadow-lg";

export const toastSurface =
	"rounded-lg border bg-background text-foreground shadow-lg";
