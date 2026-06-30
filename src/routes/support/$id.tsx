import { createFileRoute } from "@tanstack/react-router";
import TicketDetail from "@/app/Support/TicketDetail";

function Page() {
return <TicketDetail />;
}

export const Route = createFileRoute("/support/$id")({
  component: Page,
});
