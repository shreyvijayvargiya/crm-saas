import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/app";

function Page() {
return <Login />;
}

export const Route = createFileRoute("/login")({
  component: Page,
});
