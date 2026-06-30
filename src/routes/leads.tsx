import { createFileRoute } from "@tanstack/react-router";
import { Leads } from "@/app";

function Page() {
  return <Leads />;
}

export const Route = createFileRoute("/leads")({
  component: Page,
});
