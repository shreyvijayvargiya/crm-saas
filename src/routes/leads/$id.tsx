import { createFileRoute } from "@tanstack/react-router";
import { LeadDetail } from "@/app";

function Page() {
return <LeadDetail />;
}

export const Route = createFileRoute("/leads/$id")({
  component: Page,
});
