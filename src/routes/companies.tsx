import { createFileRoute } from "@tanstack/react-router";
import { Companies } from "@/app";

function Page() {
  return <Companies />;
}

export const Route = createFileRoute("/companies")({
  component: Page,
});
