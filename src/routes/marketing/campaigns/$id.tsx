import { createFileRoute } from "@tanstack/react-router";
import { MarketingCampaignDetail } from "@/app";

function Page() {
return <MarketingCampaignDetail />;
}

export const Route = createFileRoute("/marketing/campaigns/$id")({
  component: Page,
});
