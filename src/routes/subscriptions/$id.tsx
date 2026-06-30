import { createFileRoute } from "@tanstack/react-router";
import { SubscriptionDetail } from "@/app";

function Page() {
return <SubscriptionDetail />;
}

export const Route = createFileRoute("/subscriptions/$id")({
  component: Page,
});
