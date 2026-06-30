import { createFileRoute } from "@tanstack/react-router";
import { Payments } from "@/app";

function Page() {
  return <Payments />;
}

export const Route = createFileRoute("/payments")({
  component: Page,
});
