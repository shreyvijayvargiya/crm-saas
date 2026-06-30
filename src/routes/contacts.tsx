import { createFileRoute } from "@tanstack/react-router";
import { Contacts } from "@/app";

function Page() {
  return <Contacts />;
}

export const Route = createFileRoute("/contacts")({
  component: Page,
});
