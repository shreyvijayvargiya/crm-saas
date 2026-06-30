import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/app";
import { getAboutPageData } from "../../server/about.functions";

function AboutPage() {
	const props = Route.useLoaderData();
	return <About {...props} />;
}

export const Route = createFileRoute("/about")({
	loader: () => getAboutPageData(),
	component: AboutPage,
});
