import { createFileRoute } from "@tanstack/react-router";
import Support from "@/app/Support";

function Page() {
return <Support />;
}

export const Route = createFileRoute("/support")({
  component: Page,
});
