import { createFileRoute } from "@tanstack/react-router";
import CmsLayout from "@/app/Content Management System/CmsLayout";
import NewsletterDetail from "@/app/Content Management System/NewsletterDetail";

function Page() {
return (
		<CmsLayout>
			<NewsletterDetail />
		</CmsLayout>
	);
}

export const Route = createFileRoute("/cms/newsletter/$id")({
  component: Page,
});
