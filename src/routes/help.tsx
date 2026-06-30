import { createFileRoute } from "@tanstack/react-router";
import Help from "@/app/Help";

function Page() {
return <Help />;
}

export const Route = createFileRoute("/help")({
  component: Page,
});
