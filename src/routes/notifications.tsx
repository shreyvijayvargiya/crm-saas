import { createFileRoute } from "@tanstack/react-router";
import { Notifications } from "@/app";

function Page() {
return <Notifications />;
}

export const Route = createFileRoute("/notifications")({
  component: Page,
});
