import { memo, useState } from "react";
import type { TimelineRow } from "./types";

type TimelineRowItemProps = {
  row: Extract<TimelineRow, { kind: "section" | "end" }>;
  isEnd: boolean;
};

const TimelineRowItem = memo(function TimelineRowItem({
  row,
  isEnd,
}: TimelineRowItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const detail = row.details ?? "—";

  return (
    <div className="timeline-row grid grid-cols-1 md:grid-cols-[160px_1fr_1fr_220px] gap-0 hover:bg-accent/30 transition-colors">
      <div className="px-6 py-5 align-top whitespace-nowrap font-medium">
        {row.time}
      </div>
      <div className="px-6 py-5 align-top text-muted-foreground">
        {row.room}
      </div>
      <div className="px-6 py-5 align-top">
        <span className={isEnd ? "font-medium text-primary" : "font-medium"}>
          {row.title}
        </span>
      </div>
      <button
        type="button"
        className="px-6 py-5 align-top hidden md:block text-left text-muted-foreground group"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
      >
        <p
          className={[
            "max-w-[30ch] overflow-hidden text-sm transition-all duration-300",
            isExpanded ? "max-w-none whitespace-normal" : "truncate",
          ].join(" ")}
        >
          {detail}
        </p>
      </button>
    </div>
  );
});

export default TimelineRowItem;
