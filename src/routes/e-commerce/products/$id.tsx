import { createFileRoute } from "@tanstack/react-router";
import { ECommerceProductDetail } from "@/app";

function Page() {
return <ECommerceProductDetail />;
}

export const Route = createFileRoute("/e-commerce/products/$id")({
  component: Page,
});
