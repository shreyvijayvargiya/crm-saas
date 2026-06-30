import { createFileRoute } from "@tanstack/react-router";
import { ForgotPassword } from "@/app";

function Page() {
return <ForgotPassword />;
}

export const Route = createFileRoute("/forgot-password")({
  component: Page,
});
