import { createFileRoute } from "@tanstack/react-router";
import { Analytics } from "@/app";

function Page() {
return <Analytics />;
}

export const Route = createFileRoute("/analytics")({
  component: Page,
});
