import { createFileRoute } from "@tanstack/react-router";
import { Teams } from "@/app";

function Page() {
return <Teams />;
}

export const Route = createFileRoute("/teams")({
  component: Page,
});
