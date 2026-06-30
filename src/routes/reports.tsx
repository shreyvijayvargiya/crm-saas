import { createFileRoute } from "@tanstack/react-router";
import Reports from "@/app/Reports";

function Page() {
return <Reports />;
}

export const Route = createFileRoute("/reports")({
  component: Page,
});
