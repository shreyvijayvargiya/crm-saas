import { createFileRoute } from "@tanstack/react-router";
import { ProjectDetail } from "@/app";

function Page() {
return <ProjectDetail />;
}

export const Route = createFileRoute("/projects/$id")({
  component: Page,
});
