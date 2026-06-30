import { createFileRoute } from "@tanstack/react-router";
import { Pipelines } from "@/app";

function Page() {
return <Pipelines />;
}

export const Route = createFileRoute("/pipelines")({
  component: Page,
});
