import { createFileRoute } from "@tanstack/react-router";
import { Invoices } from "@/app";

function Page() {
  return <Invoices />;
}

export const Route = createFileRoute("/invoices")({
  component: Page,
});
