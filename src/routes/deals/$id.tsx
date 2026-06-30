import { createFileRoute } from "@tanstack/react-router";
import { DealDetail } from "@/app";

function Page() {
return <DealDetail />;
}

export const Route = createFileRoute("/deals/$id")({
  component: Page,
});
