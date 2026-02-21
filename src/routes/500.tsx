import { Link } from "@tanstack/react-router";
import { Vote } from "lucide-react";

export function ServerErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-destructive/20 via-background to-destructive/10 px-6">
      <div className="text-center space-y-8 max-w-2xl">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <Vote className="w-24 h-24 text-destructive/20 absolute blur-xl" />
            <Vote className="w-24 h-24 text-destructive relative" />
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground">
            Serverfehler.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Ein Fehler ist aufgetreten. Bitte kehre zur Startseite zurück und
            versuche es erneut.
          </p>
        </div>

        {/* Button */}
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-card hover:bg-card/80 text-foreground rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border border-border">
            <span className="font-medium">Zurück zur Startseite</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
