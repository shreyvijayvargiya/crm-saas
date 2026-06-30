import { createFileRoute } from "@tanstack/react-router";
import { Settings } from "@/app";

function Page() {
  return <Settings />;
}

export const Route = createFileRoute("/settings")({
  component: Page,
});
