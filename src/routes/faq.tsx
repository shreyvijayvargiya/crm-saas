import { createFileRoute } from "@tanstack/react-router";
import AgencyFaqPage from "@/app/AgencySite/pages/FaqPage";

const Page = AgencyFaqPage;

export const Route = createFileRoute("/faq")({
  staticData: { skipLayout: true },
  component: Page,
});
