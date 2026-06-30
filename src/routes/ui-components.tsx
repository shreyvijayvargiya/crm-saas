import { createFileRoute } from "@tanstack/react-router";
import { UiShowcase } from "@/app";

function Page() {
return <UiShowcase />;
}

export const Route = createFileRoute("/ui-components")({
  component: Page,
});
