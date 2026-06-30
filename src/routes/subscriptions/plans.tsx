import { createFileRoute } from "@tanstack/react-router";
import { SubscriptionPlans } from "@/app";

function Page() {
return <SubscriptionPlans />;
}

export const Route = createFileRoute("/subscriptions/plans")({
  component: Page,
});
