import { createFileRoute } from "@tanstack/react-router";
import FilesLayout from "@/app/Files/FilesLayout";
import FileDetail from "@/app/Files/FileDetail";

function Page() {
return (
		<FilesLayout>
			<FileDetail />
		</FilesLayout>
	);
}

export const Route = createFileRoute("/files/$id")({
  component: Page,
});
