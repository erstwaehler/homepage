import { m } from "#p";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorPage } from "~/components/errorPage";

export const Route = createFileRoute("/pressemappe.pdf")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ErrorPage
      title={m.pressemappe_error_title()}
      description={m.pressemappe_error_message()}
      cta={m.pressemappe_error_cta()}
      ctaHref="/kontakt"
      backToHomepageCta
      tailwindGradientBlurSourceColour="destructive"
    />
  );
}
