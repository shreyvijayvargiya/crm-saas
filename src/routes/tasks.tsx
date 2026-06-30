import { createFileRoute } from "@tanstack/react-router";
import { Tasks } from "@/app";

function Page() {
  return <Tasks />;
}

export const Route = createFileRoute("/tasks")({
  component: Page,
});
