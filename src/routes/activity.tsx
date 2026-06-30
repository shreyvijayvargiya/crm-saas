import { createFileRoute } from "@tanstack/react-router";
import Activity from "@/app/Activity";

function Page() {
return <Activity />;
}

export const Route = createFileRoute("/activity")({
  component: Page,
});
