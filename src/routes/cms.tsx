import { createFileRoute } from "@tanstack/react-router";
import CmsLayout from "@/app/Content Management System/CmsLayout";
import { ContentManagementSystem } from "@/app";

function Page() {
  return (
    <CmsLayout>
      <ContentManagementSystem />
    </CmsLayout>
  );
}

export const Route = createFileRoute("/cms")({
  component: Page,
});
