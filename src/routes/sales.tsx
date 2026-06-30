import { createFileRoute } from "@tanstack/react-router";
import { Sales } from "@/app";

function Page() {
  return <Sales />;
}

export const Route = createFileRoute("/sales")({
  component: Page,
});
