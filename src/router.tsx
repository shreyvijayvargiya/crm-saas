import { createRouter } from "@tanstack/react-router";
import { NotFoundPage } from "./components/NotFoundPage";
import { routeTree } from "./routeTree.gen";
import "../globals.css";

export function getRouter() {
	const router = createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultNotFoundComponent: NotFoundPage,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
