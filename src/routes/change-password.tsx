import { createFileRoute } from "@tanstack/react-router";
import { ChangePassword } from "@/app";

function Page() {
return <ChangePassword />;
}

export const Route = createFileRoute("/change-password")({
  component: Page,
});
