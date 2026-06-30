import { createFileRoute } from "@tanstack/react-router";
import { SaasDashboard } from "@/app";

function Page() {
return <SaasDashboard />;
}

export const Route = createFileRoute("/saas-dashboard")({
  component: Page,
});
