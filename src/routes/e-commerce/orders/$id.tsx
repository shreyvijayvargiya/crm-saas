import { createFileRoute } from "@tanstack/react-router";
import ECommerceOrderDetail from "@/app/ECommerce/Orders/OrderDetail";

function Page() {
return <ECommerceOrderDetail />;
}

export const Route = createFileRoute("/e-commerce/orders/$id")({
  component: Page,
});
