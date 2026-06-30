import { createFileRoute } from "@tanstack/react-router";
import Users from "@/app/Users";

function Page() {
return <Users />;
}

export const Route = createFileRoute("/users")({
  component: Page,
});
