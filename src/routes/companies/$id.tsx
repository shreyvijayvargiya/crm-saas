import { createFileRoute } from "@tanstack/react-router";
import { CompanyDetail } from "@/app";

function Page() {
return <CompanyDetail />;
}

export const Route = createFileRoute("/companies/$id")({
  component: Page,
});
