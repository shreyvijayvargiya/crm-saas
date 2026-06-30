import { createFileRoute } from "@tanstack/react-router";
import ApiLogs from "@/app/ApiLogs";

function Page() {
return <ApiLogs />;
}

export const Route = createFileRoute("/api-logs")({
  component: Page,
});
