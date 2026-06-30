import { createFileRoute } from "@tanstack/react-router";
import AgencyPricingPage from "@/app/AgencySite/pages/PricingPage";

const Page = AgencyPricingPage;

export const Route = createFileRoute("/pricing")({
  staticData: { skipLayout: true },
  component: Page,
});
