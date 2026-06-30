import { createFileRoute } from "@tanstack/react-router";
import AgencyContactPage from "@/app/AgencySite/pages/ContactPage";

const Page = AgencyContactPage;

export const Route = createFileRoute("/contact")({
  staticData: { skipLayout: true },
  component: Page,
});
