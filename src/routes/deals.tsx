import { createFileRoute } from "@tanstack/react-router";
import { Deals } from "@/app";

function Page() {
return <Deals />;
}

export const Route = createFileRoute("/deals")({
  component: Page,
});
