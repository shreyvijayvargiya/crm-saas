import { createFileRoute } from "@tanstack/react-router";
import { MarketingForms } from "@/app";

function Page() {
return <MarketingForms />;
}

export const Route = createFileRoute("/marketing/forms")({
  component: Page,
});
