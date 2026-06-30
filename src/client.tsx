import "../globals.css";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

function ensureDevStylesheet() {
	if (!import.meta.env.DEV) return;
	if (document.querySelector('link[href="/app.css"]')) return;
	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = "/app.css";
	document.head.appendChild(link);
}

ensureDevStylesheet();

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<StartClient />
		</StrictMode>
	);
});
