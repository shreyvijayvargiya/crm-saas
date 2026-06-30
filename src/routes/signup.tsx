import { createFileRoute } from "@tanstack/react-router";
import { Signup } from "@/app";

function Page() {
return <Signup />;
}

export const Route = createFileRoute("/signup")({
  component: Page,
});
