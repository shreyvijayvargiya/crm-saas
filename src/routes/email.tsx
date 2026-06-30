import { createFileRoute } from "@tanstack/react-router";
import { Email } from "@/app";

function Page() {
return <Email />;
}

export const Route = createFileRoute("/email")({
  component: Page,
});
