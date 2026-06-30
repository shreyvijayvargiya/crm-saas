import { createFileRoute } from "@tanstack/react-router";
import { ECommerce } from "@/app";

function Page() {
return <ECommerce />;
}

export const Route = createFileRoute("/e-commerce")({
  component: Page,
});
