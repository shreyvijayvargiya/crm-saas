import { createFileRoute } from "@tanstack/react-router";
import Roles from "@/app/Roles";

function Page() {
return <Roles />;
}

export const Route = createFileRoute("/roles")({
  component: Page,
});
