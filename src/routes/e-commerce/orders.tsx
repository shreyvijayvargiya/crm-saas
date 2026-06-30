import { createFileRoute } from "@tanstack/react-router";
import ECommerceOrders from "@/app/ECommerce/Orders";

function Page() {
return <ECommerceOrders />;
}

export const Route = createFileRoute("/e-commerce/orders")({
  component: Page,
});
