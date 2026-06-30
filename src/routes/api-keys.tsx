import { createFileRoute } from "@tanstack/react-router";
import ApiKeys from "@/app/ApiKeys";

function Page() {
  return <ApiKeys />;
}

export const Route = createFileRoute("/api-keys")({
  component: Page,
});
