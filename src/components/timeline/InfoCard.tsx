import type { ReactNode } from "react";
import { memo } from "react";

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const InfoCard = memo(function InfoCard({
  icon,
  title,
  description,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h2 className="font-semibold">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
});

export default InfoCard;
