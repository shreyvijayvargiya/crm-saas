import { createFileRoute } from "@tanstack/react-router";
import Home from "@/app/Home";

const Page = Home;

export const Route = createFileRoute("/demo")({
  component: Page,
});
