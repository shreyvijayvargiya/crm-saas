import { createFileRoute } from "@tanstack/react-router";
import AgencyHomePage from "@/app/AgencySite/pages/HomePage";

const Page = AgencyHomePage;

export const Route = createFileRoute("/")({
  staticData: { skipLayout: true },
  component: Page,
});
