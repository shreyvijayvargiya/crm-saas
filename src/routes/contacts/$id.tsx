import { createFileRoute } from "@tanstack/react-router";
import { ContactDetail } from "@/app";

function Page() {
return <ContactDetail />;
}

export const Route = createFileRoute("/contacts/$id")({
  component: Page,
});
