import { createFileRoute } from "@tanstack/react-router";
import AuditLog from "@/app/AuditLog";

function Page() {
return <AuditLog />;
}

export const Route = createFileRoute("/audit-log")({
  component: Page,
});
