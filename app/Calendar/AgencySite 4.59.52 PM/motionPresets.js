/** SSR-safe motion presets — content stays visible before client hydration. */
export const fadeUp = {
	initial: false,
	animate: { opacity: 1, y: 0 },
	transition: { duration: 0.45 },
};

export function fadeUpWithDelay(delay) {
	return {
		initial: false,
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.45, delay },
	};
}
