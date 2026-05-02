import { m } from "#p";
import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/20 via-background to-primary/10 px-6">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Logo className="w-24 h-24 text-primary/20 absolute blur-xl dark:invert" />
            <Logo className="w-24 h-24 text-primary relative dark:invert" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            {m.error_404_title()}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            {m.error_404_message()}
          </p>
        </div>

        {/* Button */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-card hover:bg-card/80 text-foreground rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-border"
          >
            <span className="font-medium">{m.error_404_cta()}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
