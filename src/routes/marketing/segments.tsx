import { createFileRoute } from "@tanstack/react-router";
import { MarketingSegments } from "@/app";

function Page() {
return <MarketingSegments />;
}

export const Route = createFileRoute("/marketing/segments")({
  component: Page,
});
