import { createFileRoute } from "@tanstack/react-router";
import Webhooks from "@/app/Webhooks";

function Page() {
  return <Webhooks />;
}

export const Route = createFileRoute("/webhooks")({
  component: Page,
});
