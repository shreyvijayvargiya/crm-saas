import { createFileRoute } from "@tanstack/react-router";
import { Products } from "@/app";

function Page() {
  return <Products />;
}

export const Route = createFileRoute("/products")({
  component: Page,
});
