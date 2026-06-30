import { createServerFn } from "@tanstack/react-start";
import { loadAboutProps } from "./about-data.js";

export const getAboutPageData = createServerFn({ method: "GET" }).handler(
	async () => loadAboutProps()
);
