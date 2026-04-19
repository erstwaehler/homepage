import { ChevronDown } from "lucide-react";
import { memo, useState } from "react";
import type { CycleDetail, TimelineRow } from "./types";

type CycleRowProps = {
  row: Extract<TimelineRow, { kind: "cycle" }>;
};

const CycleRow = memo(function CycleRow({ row }: CycleRowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredDetail, setHoveredDetail] = useState<string | null>(null);

  return (
    <div className="timeline-row">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className={[
          "w-full grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_220px]",
          "gap-0 text-left transition-colors hover:bg-accent/40",
          isOpen ? "bg-accent/50" : "",
        ].join(" ")}
      >
        <span className="px-6 py-5 align-top whitespace-nowrap font-medium">
          {row.time}
        </span>
        <span className="px-6 py-5 align-top text-muted-foreground">
          {row.room}
        </span>
        <span className="px-6 py-5 align-top">
          <div className="flex items-center gap-3">
            <span className="font-medium">{row.title}</span>
            <ChevronDown
              className={[
                "w-4 h-4 text-muted-foreground transition-transform duration-300",
                isOpen ? "rotate-180" : "",
              ].join(" ")}
            />
          </div>
        </span>
      </button>

      <div
        className={[
          "grid transition-all duration-300 overflow-hidden",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        ].join(" ")}
      >
        <div className="min-h-0">
          {row.details.map((detail, detailIndex) => {
            const detailKey = `${row.time}-${detailIndex}`;
            const isExpanded = hoveredDetail === detailKey;

            return (
              <DetailRow
                key={detail.label}
                detail={detail}
                detailIndex={detailIndex}
                isExpanded={isExpanded}
                onHover={() => setHoveredDetail(detailKey)}
                onBlur={() => setHoveredDetail(null)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
});

type DetailRowProps = {
  detail: CycleDetail;
  detailIndex: number;
  isExpanded: boolean;
  onHover: () => void;
  onBlur: () => void;
};

const DetailRow = memo(function DetailRow({
  detail,
  detailIndex,
  isExpanded,
  onHover,
  onBlur,
}: DetailRowProps) {
  return (
    <button
      type="button"
      className={[
        "group w-full grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_220px]",
        "gap-0 border-t border-border/60 bg-muted/10 text-left",
        "transition-colors hover:bg-accent/20 focus:bg-accent/20",
        detailIndex === 0 ? "border-t-0" : "",
      ].join(" ")}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      onFocus={onHover}
      onBlur={onBlur}
    >
      <div className="px-6 py-4 align-top whitespace-nowrap font-medium">
        {detail.duration}
      </div>
      <div className="px-6 py-4 align-top text-muted-foreground">
        {detail.label}
      </div>
      <div className="px-6 py-4 align-top md:col-span-2 text-left">
        <p
          className={[
            "max-w-[30ch] overflow-hidden text-sm text-muted-foreground transition-all duration-300 text-left",
            isExpanded ? "max-w-none whitespace-normal" : "truncate",
          ].join(" ")}
        >
          {detail.description}
        </p>
      </div>
    </button>
  );
});

export default CycleRow;
