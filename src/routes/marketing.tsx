import { createFileRoute } from "@tanstack/react-router";
import { Marketing } from "@/app";

function Page() {
return <Marketing />;
}

export const Route = createFileRoute("/marketing")({
  component: Page,
});
