import { createFileRoute } from "@tanstack/react-router";
import { InvoiceDetail } from "@/app";

function Page() {
return <InvoiceDetail />;
}

export const Route = createFileRoute("/invoices/$id")({
  component: Page,
});
