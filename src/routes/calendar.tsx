import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "@/app";

function Page() {
  return <Calendar />;
}

export const Route = createFileRoute("/calendar")({
  component: Page,
});
