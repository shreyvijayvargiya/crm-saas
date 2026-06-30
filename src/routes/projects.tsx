import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@/app";

function Page() {
  return <Projects />;
}

export const Route = createFileRoute("/projects")({
  component: Page,
});
