import { createFileRoute } from "@tanstack/react-router";
import { PipelineDealDetail } from "@/app";

function Page() {
return <PipelineDealDetail />;
}

export const Route = createFileRoute("/pipelines/$id")({
  component: Page,
});
