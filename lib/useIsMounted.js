import { useEffect, useState } from "react";

/** True only after the client has mounted — use to gate browser-only UI during SSR/hydration. */
export function useIsMounted() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted;
}
