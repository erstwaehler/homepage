import { m } from "#p";
import { ErrorPage } from "./errorPage";

export function ForbiddenPage() {
  return (
    <ErrorPage
      tailwindGradientBlurSourceColour="destructive"
      title={m.error_401_title()}
      description={m.error_401_message()}
      cta={m.error_401_cta()}
      ctaHref="/"
    />
  );
}
