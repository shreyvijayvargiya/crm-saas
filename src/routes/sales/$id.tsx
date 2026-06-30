import { createFileRoute } from "@tanstack/react-router";
import { SaleDetail } from "@/app";

function Page() {
return <SaleDetail />;
}

export const Route = createFileRoute("/sales/$id")({
  component: Page,
});
