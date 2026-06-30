import { createFileRoute } from "@tanstack/react-router";
import FilesLayout from "@/app/Files/FilesLayout";
import Files from "@/app/Files";

function Page() {
  return (
    <FilesLayout>
      <Files />
    </FilesLayout>
  );
}

export const Route = createFileRoute("/files")({
  component: Page,
});
