import { createFileRoute } from "@tanstack/react-router";
import { Integrations } from "@/app";

function Page() {
  return <Integrations />;
}

export const Route = createFileRoute("/integrations")({
  component: Page,
});
