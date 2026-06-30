import { createFileRoute } from "@tanstack/react-router";
import CmsLayout from "@/app/Content Management System/CmsLayout";
import BlogDetail from "@/app/Content Management System/BlogDetail";

function Page() {
return (
		<CmsLayout>
			<BlogDetail />
		</CmsLayout>
	);
}

export const Route = createFileRoute("/cms/blogs/$id")({
  component: Page,
});
