import { createFileRoute } from "@tanstack/react-router";
import { Subscriptions } from "@/app";

function Page() {
return <Subscriptions />;
}

export const Route = createFileRoute("/subscriptions")({
  component: Page,
});
