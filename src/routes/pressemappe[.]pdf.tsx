import { createFileRoute } from "@tanstack/react-router";
import { ForbiddenPage } from "~/components/401";

export const Route = createFileRoute("/pressemappe.pdf")({
  component: ForbiddenPage,
});
